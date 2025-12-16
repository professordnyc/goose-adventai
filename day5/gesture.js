// Gesture Recognition Module
// Handles MediaPipe gesture detection and webcam setup

import { GestureRecognizer, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14';
import CONFIG from './config.js';

let gestureRecognizer = null;
let webcamStream = null;
let lastGestureTime = 0;
let isDetecting = false;

const GESTURE_COOLDOWN = 800; // 800ms cooldown to prevent rapid re-triggers
const CONFIDENCE_THRESHOLD = 0.7; // 70% confidence minimum

/**
 * Initialize MediaPipe Gesture Recognizer
 */
export async function initializeGestureRecognizer() {
    try {
        console.log('🤚 Initializing MediaPipe Gesture Recognizer...');
        
        // Load MediaPipe vision tasks
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        
        // Create gesture recognizer
        gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: "/models/gesture_recognizer.task",
                delegate: "GPU"
            },
            runningMode: "VIDEO",
            numHands: 2,  // Track up to 2 hands
            minHandDetectionConfidence: 0.3,  // Lowered to 30%
            minHandPresenceConfidence: 0.3,   // Lowered to 30%
            minTrackingConfidence: 0.5        // 50% for tracking
        });
        
        console.log('✅ Gesture recognizer initialized');
        return gestureRecognizer;
        
    } catch (error) {
        console.error('❌ Failed to initialize gesture recognizer:', error);
        throw error;
    }
}

/**
 * Setup webcam and start video stream
 */
export async function setupWebcam() {
    try {
        console.log('📹 Setting up webcam...');
        
        const video = document.getElementById('webcam');
        if (!video) {
            throw new Error('Webcam video element not found');
        }
        
        // Request webcam access
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: "user"
            }
        });
        
        video.srcObject = stream;
        webcamStream = stream;
        
        // Wait for video to be ready
        await new Promise((resolve) => {
            video.onloadedmetadata = () => {
                video.play();
                resolve();
            };
        });
        
        console.log('✅ Webcam ready');
        return video;
        
    } catch (error) {
        console.error('❌ Failed to setup webcam:', error);
        
        // Show user-friendly error
        if (error.name === 'NotAllowedError') {
            window.app?.showToast('Please allow camera access to use gestures', 'error', 5000);
        } else if (error.name === 'NotFoundError') {
            window.app?.showToast('No camera found', 'error', 5000);
        } else {
            window.app?.showToast('Failed to access camera', 'error', 5000);
        }
        
        throw error;
    }
}

/**
 * Start gesture detection loop
 */
export function startGestureDetection(video, onGesture) {
    if (!gestureRecognizer || !video) {
        console.error('❌ Cannot start detection: missing recognizer or video');
        return;
    }
    
    isDetecting = true;
    console.log('👁️ Starting gesture detection loop');
    
    // Detection loop
    const detectFrame = () => {
        if (!isDetecting) return;
        
        try {
            // Run gesture recognition on current video frame
            const results = gestureRecognizer.recognizeForVideo(video, performance.now());
            
            // Process results
            if (results.gestures && results.gestures.length > 0) {
                const gesture = results.gestures[0][0]; // First hand, top gesture
                const confidence = gesture.score;
                
                // Skip "None" gesture - hand detected but no recognized pose
                if (gesture.categoryName === 'None') {
                    updateGestureIndicator(null, 0);
                } else {
                    // Update gesture indicator UI for valid gestures
                    updateGestureIndicator(gesture.categoryName, confidence);
                    
                    // Check if gesture meets confidence threshold
                    if (confidence >= CONFIDENCE_THRESHOLD) {
                        const now = Date.now();
                        
                        // Debounce - only trigger if enough time has passed
                        if (now - lastGestureTime > GESTURE_COOLDOWN) {
                            handleGesture(gesture.categoryName, confidence, onGesture);
                            lastGestureTime = now;
                        }
                    }
                }
            } else {
                // No gesture detected
                updateGestureIndicator(null, 0);
            }
            
            // Draw hand landmarks (optional)
            if (results.landmarks && CONFIG.dev?.showLandmarks) {
                drawLandmarks(results.landmarks[0]);
            }
            
        } catch (error) {
            console.error('Error in gesture detection:', error);
        }
        
        // Continue loop
        requestAnimationFrame(detectFrame);
    };
    
    // Start the loop
    detectFrame();
}

/**
 * Stop gesture detection
 */
export function stopGestureDetection() {
    isDetecting = false;
    console.log('⏸️ Stopped gesture detection');
}

/**
 * Handle detected gesture
 */
function handleGesture(gestureName, confidence, callback) {
    // Skip "None" gesture (double-check)
    if (gestureName === 'None') {
        return;
    }
    
    console.log(`👋 Detected: ${gestureName} (${(confidence * 100).toFixed(1)}%)`);
    
    // Map gesture to action
    switch(gestureName) {
        case 'Closed_Fist':
            console.log('👊 Navigate gesture');
            if (callback) callback('navigate', confidence);
            break;
            
        case 'Open_Palm':
            console.log('✋ Select gesture');
            if (callback) callback('select', confidence);
            break;
            
        default:
            // Ignore other gestures (but log them)
            console.log(`ℹ️ Ignoring gesture: ${gestureName}`);
            break;
    }
}

/**
 * Update gesture indicator UI
 */
function updateGestureIndicator(gestureName, confidence) {
    const indicator = document.getElementById('gesture-indicator');
    if (!indicator) return;
    
    const iconEl = indicator.querySelector('.gesture-icon');
    const nameEl = indicator.querySelector('.gesture-name');
    const barEl = indicator.querySelector('.confidence-bar');
    const valueEl = indicator.querySelector('.confidence-value');
    
    // Only show indicator for valid gestures above threshold, excluding "None"
    if (gestureName && gestureName !== 'None' && confidence >= CONFIDENCE_THRESHOLD) {
        // Active gesture
        const icon = getGestureIcon(gestureName);
        const name = getGestureName(gestureName);
        
        if (iconEl) iconEl.textContent = icon;
        if (nameEl) nameEl.textContent = name;
        if (barEl) barEl.style.width = `${confidence * 100}%`;
        if (valueEl) valueEl.textContent = `${(confidence * 100).toFixed(0)}%`;
        
        indicator.classList.add('active');
        
        // Add gesture-specific class for styling
        indicator.classList.remove('navigate', 'select');
        if (gestureName === 'Closed_Fist') {
            indicator.classList.add('navigate');
        } else if (gestureName === 'Open_Palm') {
            indicator.classList.add('select');
        }
        
    } else {
        // No gesture or low confidence
        if (iconEl) iconEl.textContent = '👋';
        if (nameEl) nameEl.textContent = 'Waiting for gesture...';
        if (barEl) barEl.style.width = '0%';
        if (valueEl) valueEl.textContent = '0%';
        
        indicator.classList.remove('active', 'navigate', 'select');
    }
}

/**
 * Get emoji icon for gesture
 */
function getGestureIcon(gesture) {
    const icons = {
        'Closed_Fist': '👊',
        'Open_Palm': '✋',
        'Thumb_Up': '👍',
        'Thumb_Down': '👎',
        'Victory': '✌️',
        'Pointing_Up': '☝️'
    };
    return icons[gesture] || '👋';
}

/**
 * Get display name for gesture
 */
function getGestureName(gesture) {
    const names = {
        'Closed_Fist': 'Navigate',
        'Open_Palm': 'Select',
        'Thumb_Up': 'Like',
        'Thumb_Down': 'Dislike',
        'Victory': 'Victory',
        'Pointing_Up': 'Point'
    };
    return names[gesture] || gesture.replace('_', ' ');
}

/**
 * Draw hand landmarks on canvas (debug/visual feature)
 */
function drawLandmarks(landmarks) {
    const canvas = document.getElementById('landmark-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const video = document.getElementById('webcam');
    
    // Match canvas size to video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!landmarks) return;
    
    // Draw connections between landmarks
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;
    
    // Draw points
    ctx.fillStyle = '#FF0000';
    landmarks.forEach(landmark => {
        const x = landmark.x * canvas.width;
        const y = landmark.y * canvas.height;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}

/**
 * Cleanup resources
 */
export function cleanup() {
    stopGestureDetection();
    
    if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
        webcamStream = null;
    }
    
    if (gestureRecognizer) {
        gestureRecognizer.close();
        gestureRecognizer = null;
    }
    
    console.log('🧹 Gesture recognition cleaned up');
}

export default {
    initializeGestureRecognizer,
    setupWebcam,
    startGestureDetection,
    stopGestureDetection,
    cleanup
};
