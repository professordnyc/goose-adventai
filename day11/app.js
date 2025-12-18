// Fun House Photo Booth - Core App with Filters
// Camera access, face detection, filters, capture, and download functionality
// Mobile-optimized for iOS Safari and DuckDuckGo

class PhotoBoothApp {
    constructor() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.capturedCanvas = document.getElementById('captured-canvas');
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: false });
        this.capturedCtx = this.capturedCanvas.getContext('2d', { willReadFrequently: false });
        this.captureBtn = document.getElementById('capture-btn');
        this.downloadBtn = document.getElementById('download-btn');
        this.errorMessage = document.getElementById('error-message');
        this.toast = document.getElementById('toast');
        this.noPhotoMessage = document.getElementById('no-photo-message');
        
        this.currentFilter = 'none';
        this.capturedImage = null;
        this.capturedImageData = null;
        this.stream = null;
        this.faceDetection = null;
        this.detectedFaces = [];
        this.animationFrameId = null;
        
        // Sparkle filter properties
        this.sparkles = [];
        this.sparkleCount = 20;
        
        // Mobile/browser detection
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        this.init();
    }

    async init() {
        console.log('Browser detection:', {
            isSafari: this.isSafari,
            isIOS: this.isIOS,
            isMobile: this.isMobile,
            userAgent: navigator.userAgent
        });
        
        await this.setupCamera();
        this.setupCanvas();
        this.setupEventListeners();
        await this.setupFaceDetection();
        this.startRendering();
    }

    async setupCamera() {
        try {
            // More compatible constraints for mobile browsers
            const constraints = {
                video: { 
                    facingMode: 'user',
                    width: { ideal: 1280, max: 1920 },
                    height: { ideal: 720, max: 1080 }
                },
                audio: false
            };
            
            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            this.video.srcObject = this.stream;
            this.video.setAttribute('playsinline', '');
            this.video.setAttribute('autoplay', '');
            this.video.setAttribute('muted', '');
            
            // Explicitly play for iOS Safari
            await this.video.play();
            
            // Wait for video to be ready with timeout
            await Promise.race([
                new Promise((resolve) => {
                    this.video.onloadedmetadata = () => {
                        console.log('Video loaded:', this.video.videoWidth, 'x', this.video.videoHeight);
                        resolve();
                    };
                }),
                new Promise((_, reject) => setTimeout(() => reject('Video load timeout'), 10000))
            ]);
            
            this.hideError();
        } catch (error) {
            this.showError('Camera access denied or not available. Please allow camera permissions and refresh the page.');
            console.error('Camera error:', error);
        }
    }

    setupCanvas() {
        // Set canvas size to match video
        const updateCanvasSize = () => {
            if (this.video.videoWidth > 0 && this.video.videoHeight > 0) {
                this.canvas.width = this.video.videoWidth;
                this.canvas.height = this.video.videoHeight;
                this.capturedCanvas.width = this.video.videoWidth;
                this.capturedCanvas.height = this.video.videoHeight;
                console.log('Canvas size updated:', this.canvas.width, 'x', this.canvas.height);
            }
        };

        this.video.addEventListener('loadedmetadata', updateCanvasSize);
        this.video.addEventListener('canplay', updateCanvasSize);
        window.addEventListener('resize', updateCanvasSize);
        
        // Initial size update
        setTimeout(updateCanvasSize, 500);
    }

    async setupFaceDetection() {
        try {
            // Check if FaceDetection is available
            if (typeof FaceDetection === 'undefined') {
                console.warn('FaceDetection library not loaded, filters may not work optimally');
                return;
            }
            
            this.faceDetection = new FaceDetection({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
                }
            });
            
            this.faceDetection.setOptions({
                model: 'short',
                minDetectionConfidence: 0.5
            });
            
            this.faceDetection.onResults((results) => {
                this.detectedFaces = results.detections || [];
            });
            
            await this.faceDetection.initialize();
            console.log('Face detection initialized');
        } catch (error) {
            console.error('Face detection setup error:', error);
            // Continue without face detection
        }
    }

    async processFaceDetection() {
        if (this.faceDetection && this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            try {
                await this.faceDetection.send({ image: this.video });
            } catch (error) {
                // Silently handle face detection errors
            }
        }
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const filterId = e.target.id.replace('filter-', '');
                this.currentFilter = filterId;
                
                // Reset sparkles when switching to sparkle filter
                if (filterId === 'sparkle') {
                    this.sparkles = [];
                }
            });
        });

        // Capture button
        this.captureBtn.addEventListener('click', () => this.capturePhoto());

        // Download button
        this.downloadBtn.addEventListener('click', () => this.downloadPhoto());
    }

    startRendering() {
        let frameCount = 0;
        const render = () => {
            if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
                // Draw video frame
                this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
                
                // Process face detection every 3 frames for performance
                if (frameCount % 3 === 0) {
                    this.processFaceDetection();
                }
                
                // Apply current filter
                this.applyFilter();
                
                frameCount++;
            }
            
            this.animationFrameId = requestAnimationFrame(render);
        };
        
        render();
    }

    applyFilter() {
        if (this.currentFilter === 'sparkle') {
            this.applySparkleFilter();
        } else if (this.currentFilter === 'snowman') {
            this.applySnowmanFilter();
        } else if (this.currentFilter === 'tree') {
            this.applyTreeFilter();
        }
    }

    // ===== SPARKLE FILTER =====
    initSparkles() {
        this.sparkles = [];
        for (let i = 0; i < this.sparkleCount; i++) {
            this.sparkles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                opacity: Math.random(),
                opacityDirection: Math.random() > 0.5 ? 1 : -1
            });
        }
    }

    applySparkleFilter() {
        if (this.detectedFaces.length === 0) {
            // If no face detected, show sparkles randomly
            if (this.sparkles.length === 0) {
                this.initSparkles();
            }
            this.drawSparkles();
            return;
        }

        // Draw sparkles around each detected face
        this.detectedFaces.forEach(face => {
            const bbox = face.boundingBox;
            const centerX = (bbox.xCenter * this.canvas.width);
            const centerY = (bbox.yCenter * this.canvas.height);
            const width = bbox.width * this.canvas.width;
            const height = bbox.height * this.canvas.height;

            // Initialize sparkles around face if needed
            if (this.sparkles.length === 0) {
                for (let i = 0; i < this.sparkleCount; i++) {
                    const angle = (Math.PI * 2 * i) / this.sparkleCount;
                    const distance = width * 0.7;
                    this.sparkles.push({
                        x: centerX + Math.cos(angle) * distance,
                        y: centerY + Math.sin(angle) * distance,
                        baseAngle: angle,
                        distance: distance,
                        size: Math.random() * 5 + 3,
                        opacity: Math.random(),
                        opacityDirection: Math.random() > 0.5 ? 0.05 : -0.05,
                        rotation: Math.random() * Math.PI * 2
                    });
                }
            }

            // Update and draw sparkles
            this.sparkles.forEach((sparkle, index) => {
                // Orbit around face
                const angle = sparkle.baseAngle + Date.now() * 0.001;
                sparkle.x = centerX + Math.cos(angle) * sparkle.distance;
                sparkle.y = centerY + Math.sin(angle) * sparkle.distance;

                // Update opacity
                sparkle.opacity += sparkle.opacityDirection;
                if (sparkle.opacity >= 1 || sparkle.opacity <= 0) {
                    sparkle.opacityDirection *= -1;
                }

                // Update rotation
                sparkle.rotation += 0.1;

                // Draw sparkle
                this.ctx.save();
                this.ctx.translate(sparkle.x, sparkle.y);
                this.ctx.rotate(sparkle.rotation);
                this.ctx.globalAlpha = Math.max(0, Math.min(1, sparkle.opacity));

                // Draw star shape
                this.ctx.fillStyle = '#FFD700';
                this.ctx.strokeStyle = '#FFF';
                this.ctx.lineWidth = 1;
                this.drawStar(0, 0, 5, sparkle.size, sparkle.size / 2);

                this.ctx.restore();
            });
        });
    }

    drawSparkles() {
        this.sparkles.forEach(sparkle => {
            // Update position
            sparkle.x += sparkle.speedX;
            sparkle.y += sparkle.speedY;

            // Wrap around canvas
            if (sparkle.x < 0) sparkle.x = this.canvas.width;
            if (sparkle.x > this.canvas.width) sparkle.x = 0;
            if (sparkle.y < 0) sparkle.y = this.canvas.height;
            if (sparkle.y > this.canvas.height) sparkle.y = 0;

            // Update opacity
            sparkle.opacity += sparkle.opacityDirection * 0.02;
            if (sparkle.opacity >= 1 || sparkle.opacity <= 0) {
                sparkle.opacityDirection *= -1;
            }

            // Draw sparkle
            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, Math.min(1, sparkle.opacity));
            this.ctx.fillStyle = '#FFD700';
            this.ctx.strokeStyle = '#FFF';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.restore();
        });
    }

    drawStar(x, y, points, outerRadius, innerRadius) {
        this.ctx.beginPath();
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI * i) / points - Math.PI / 2;
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            if (i === 0) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    // ===== SNOWMAN FILTER =====
    applySnowmanFilter() {
        if (this.detectedFaces.length === 0) return;

        this.detectedFaces.forEach(face => {
            const bbox = face.boundingBox;
            const centerX = bbox.xCenter * this.canvas.width;
            const centerY = bbox.yCenter * this.canvas.height;
            const width = bbox.width * this.canvas.width;
            const height = bbox.height * this.canvas.height;

            // Draw carrot nose
            const noseX = centerX;
            const noseY = centerY + height * 0.05;
            const noseWidth = width * 0.15;
            const noseHeight = height * 0.12;

            this.ctx.save();
            this.ctx.fillStyle = '#FF8C00';
            this.ctx.strokeStyle = '#D2691E';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(noseX, noseY);
            this.ctx.lineTo(noseX + noseWidth, noseY - noseHeight / 2);
            this.ctx.lineTo(noseX + noseWidth, noseY + noseHeight / 2);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.restore();

            // Draw coal buttons (on chest area below face)
            const buttonRadius = width * 0.04;
            const buttonY1 = centerY + height * 0.7;
            const buttonY2 = centerY + height * 0.9;
            const buttonY3 = centerY + height * 1.1;

            this.ctx.save();
            this.ctx.fillStyle = '#000';
            this.ctx.strokeStyle = '#333';
            this.ctx.lineWidth = 1;

            // Top button
            this.ctx.beginPath();
            this.ctx.arc(centerX, buttonY1, buttonRadius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();

            // Middle button
            this.ctx.beginPath();
            this.ctx.arc(centerX, buttonY2, buttonRadius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();

            // Bottom button
            this.ctx.beginPath();
            this.ctx.arc(centerX, buttonY3, buttonRadius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.restore();

            // Draw coal eyes
            const eyeRadius = width * 0.03;
            const eyeY = centerY - height * 0.15;
            const eyeSpacing = width * 0.15;

            this.ctx.save();
            this.ctx.fillStyle = '#000';

            // Left eye
            this.ctx.beginPath();
            this.ctx.arc(centerX - eyeSpacing, eyeY, eyeRadius, 0, Math.PI * 2);
            this.ctx.fill();

            // Right eye
            this.ctx.beginPath();
            this.ctx.arc(centerX + eyeSpacing, eyeY, eyeRadius, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    // ===== CHRISTMAS TREE HAT FILTER =====
    applyTreeFilter() {
        if (this.detectedFaces.length === 0) return;

        this.detectedFaces.forEach(face => {
            const bbox = face.boundingBox;
            const centerX = bbox.xCenter * this.canvas.width;
            const topY = (bbox.yCenter - bbox.height / 2) * this.canvas.height;
            const width = bbox.width * this.canvas.width;

            // Tree dimensions
            const treeHeight = width * 0.8;
            const treeWidth = width * 0.7;
            const treeTop = topY - treeHeight;

            // Draw tree (triangle)
            this.ctx.save();
            this.ctx.fillStyle = '#228B22';
            this.ctx.strokeStyle = '#006400';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, treeTop);
            this.ctx.lineTo(centerX - treeWidth / 2, topY);
            this.ctx.lineTo(centerX + treeWidth / 2, topY);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.restore();

            // Draw tree layers (zigzag pattern)
            this.ctx.save();
            this.ctx.strokeStyle = '#006400';
            this.ctx.lineWidth = 2;
            const layers = 3;
            for (let i = 1; i <= layers; i++) {
                const layerY = treeTop + (treeHeight / (layers + 1)) * i;
                const layerWidth = (treeWidth / (layers + 1)) * (layers - i + 1);
                this.ctx.beginPath();
                this.ctx.moveTo(centerX - layerWidth / 2, layerY);
                this.ctx.lineTo(centerX + layerWidth / 2, layerY);
                this.ctx.stroke();
            }
            this.ctx.restore();

            // Draw star on top
            const starSize = width * 0.1;
            this.ctx.save();
            this.ctx.fillStyle = '#FFD700';
            this.ctx.strokeStyle = '#FFA500';
            this.ctx.lineWidth = 2;
            this.drawStar(centerX, treeTop - starSize * 0.5, 5, starSize, starSize / 2);
            this.ctx.restore();

            // Draw ornaments
            const ornamentRadius = width * 0.03;
            const ornamentColors = ['#FF0000', '#0000FF', '#FFD700', '#FF69B4'];
            
            this.ctx.save();
            for (let i = 0; i < 6; i++) {
                const ornamentX = centerX + (Math.random() - 0.5) * treeWidth * 0.6;
                const ornamentY = treeTop + Math.random() * treeHeight * 0.8;
                const color = ornamentColors[i % ornamentColors.length];
                
                this.ctx.fillStyle = color;
                this.ctx.strokeStyle = '#FFF';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(ornamentX, ornamentY, ornamentRadius, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();
            }
            this.ctx.restore();

            // Draw tree trunk
            const trunkWidth = width * 0.15;
            const trunkHeight = width * 0.1;
            this.ctx.save();
            this.ctx.fillStyle = '#8B4513';
            this.ctx.strokeStyle = '#654321';
            this.ctx.lineWidth = 2;
            this.ctx.fillRect(
                centerX - trunkWidth / 2,
                topY,
                trunkWidth,
                trunkHeight
            );
            this.ctx.strokeRect(
                centerX - trunkWidth / 2,
                topY,
                trunkWidth,
                trunkHeight
            );
            this.ctx.restore();
        });
    }

    capturePhoto() {
        try {
            console.log('Capturing photo...');
            
            // Method 1: Direct canvas-to-canvas copy (best for Safari iOS)
            // This bypasses the image element entirely
            this.capturedCtx.drawImage(this.canvas, 0, 0, this.capturedCanvas.width, this.capturedCanvas.height);
            
            // Store as data URL for download
            try {
                this.capturedImage = this.capturedCanvas.toDataURL('image/png');
                console.log('Captured image data URL length:', this.capturedImage.length);
            } catch (error) {
                console.error('toDataURL error:', error);
                // Fallback: try with lower quality JPEG
                this.capturedImage = this.capturedCanvas.toDataURL('image/jpeg', 0.9);
            }
            
            // Hide the "no photo" message
            if (this.noPhotoMessage) {
                this.noPhotoMessage.style.display = 'none';
            }
            
            // Force a repaint on iOS Safari
            if (this.isIOS || this.isSafari) {
                this.capturedCanvas.style.display = 'none';
                void this.capturedCanvas.offsetHeight; // Force reflow
                this.capturedCanvas.style.display = 'block';
            }
            
            // Enable download button
            this.downloadBtn.disabled = false;
            
            // Visual feedback - flash effect on live canvas
            this.canvas.classList.add('flash');
            setTimeout(() => {
                this.canvas.classList.remove('flash');
            }, 500);
            
            // Show success toast
            this.showToast('📸 Photo captured successfully!', 'success');
            
            console.log('Photo captured successfully!');
        } catch (error) {
            console.error('Capture error:', error);
            this.showToast('❌ Failed to capture photo. Please try again.', 'warning');
        }
    }

    downloadPhoto() {
        if (!this.capturedImage) {
            this.showToast('⚠️ Please capture a photo first!', 'warning');
            return;
        }

        try {
            // Create download link
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            link.download = `fun-house-photo-${timestamp}.png`;
            link.href = this.capturedImage;
            
            // For mobile browsers, especially iOS Safari and DuckDuckGo
            link.setAttribute('target', '_blank');
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success toast
            this.showToast('💾 Photo downloaded successfully!', 'success');
            
            console.log('Photo downloaded!');
        } catch (error) {
            console.error('Download error:', error);
            this.showToast('❌ Download failed. Please try again.', 'warning');
        }
    }

    showToast(message, type = 'info') {
        if (!this.toast) return;
        
        this.toast.textContent = message;
        this.toast.className = 'toast show ' + type;
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }

    showError(message) {
        if (!this.errorMessage) return;
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
    }

    hideError() {
        if (!this.errorMessage) return;
        this.errorMessage.style.display = 'none';
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    window.photoBoothApp = new PhotoBoothApp();
});
