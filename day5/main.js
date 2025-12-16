// Main application entry point
// Day 5: Gesture-Controlled Flight Tracker

import CONFIG from './config.js';
import * as gesture from './gesture.js';

console.log('❄️ Winter Festival Flight Tracker - Initializing...');
console.log('Configuration loaded:', CONFIG);

// Application state
const state = {
    flights: [],
    selectedIndex: 0,
    gestureRecognizer: null,
    webcamStream: null,
    cacheManager: null,
    lastUpdate: null,
    isLoading: false
};

// Mock flight data for testing
const MOCK_FLIGHTS = [
    {
        callsign: 'DL1234',
        origin: 'JFK - New York',
        altitude: '12,500 ft',
        distance: '45 mi',
        speed: '450 mph',
        status: 'ontime',
        statusText: 'On Time'
    },
    {
        callsign: 'AA5678',
        origin: 'LAX - Los Angeles',
        altitude: '18,000 ft',
        distance: '120 mi',
        speed: '520 mph',
        status: 'ontime',
        statusText: 'On Time'
    },
    {
        callsign: 'UA9012',
        origin: 'ORD - Chicago',
        altitude: '8,200 ft',
        distance: '30 mi',
        speed: '380 mph',
        status: 'delayed',
        statusText: 'Delayed 15 min'
    },
    {
        callsign: 'SW3456',
        origin: 'DEN - Denver',
        altitude: '15,400 ft',
        distance: '85 mi',
        speed: '495 mph',
        status: 'ontime',
        statusText: 'On Time'
    },
    {
        callsign: 'JB7890',
        origin: 'BOS - Boston',
        altitude: '22,000 ft',
        distance: '180 mi',
        speed: '540 mph',
        status: 'ontime',
        statusText: 'On Time'
    }
];

// Initialize application
async function init() {
    try {
        console.log('🚀 Starting initialization...');
        
        // Show loading state
        updateLoadingState(true);
        
        // Initialize webcam and gesture recognition
        console.log('📹 Setting up webcam...');
        const video = await gesture.setupWebcam();
        
        console.log('🤚 Initializing gesture recognition...');
        await gesture.initializeGestureRecognizer();
        
        console.log('👁️ Starting gesture detection...');
        gesture.startGestureDetection(video, handleGestureAction);
        
        console.log('✈️ Loading flight data...');
        // Use mock data for now
        state.flights = MOCK_FLIGHTS;
        renderFlightList(state.flights);
        
        console.log('🎨 Setting up UI...');
        setupUI();
        
        console.log('✅ Initialization complete!');
        updateLoadingState(false);
        
        // Show welcome message
        showToast('Welcome! Use gestures to navigate flights', 'info', 3000);
        
    } catch (error) {
        console.error('❌ Initialization failed:', error);
        showError('Failed to initialize application. Please check camera permissions.');
        updateLoadingState(false);
    }
}

// Handle gesture actions
function handleGestureAction(action, confidence) {
    console.log(`🎯 Gesture action: ${action} (${(confidence * 100).toFixed(1)}%)`);
    
    switch(action) {
        case 'navigate':
            navigateFlights();
            break;
        case 'select':
            selectFlight();
            break;
        default:
            console.log(`Unknown action: ${action}`);
    }
}

// Setup UI event listeners
function setupUI() {
    // Toggle webcam preview
    const toggleButton = document.getElementById('toggle-webcam');
    const webcamContainer = document.getElementById('webcam-container');
    
    if (toggleButton && webcamContainer) {
        toggleButton.addEventListener('click', () => {
            webcamContainer.classList.toggle('hidden');
            showToast(
                webcamContainer.classList.contains('hidden') ? 
                'Webcam hidden' : 'Webcam visible',
                'info',
                1000
            );
        });
    }
    
    // Keyboard shortcuts (fallback for gestures)
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowDown':
            case 'j':
                navigateFlights();
                break;
            case 'Enter':
            case ' ':
                selectFlight();
                e.preventDefault();
                break;
            case 'r':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    refreshFlightData();
                }
                break;
        }
    });
    
    console.log('✅ UI event listeners configured');
}

// Update loading state
function updateLoadingState(isLoading) {
    state.isLoading = isLoading;
    const loadingState = document.querySelector('.loading-state');
    
    if (loadingState) {
        loadingState.style.display = isLoading ? 'block' : 'none';
    }
}

// Navigate through flights (gesture: Closed Fist)
function navigateFlights() {
    if (state.flights.length === 0) return;
    
    // Cycle to next flight
    state.selectedIndex = (state.selectedIndex + 1) % state.flights.length;
    
    console.log(`📍 Navigated to flight ${state.selectedIndex + 1}/${state.flights.length}`);
    
    // Update UI
    updateFlightSelection();
    
    // Show feedback
    showToast('👊 Navigate', 'navigate', 1000);
    playSound('navigate');
}

// Select flight (gesture: Open Palm)
function selectFlight() {
    if (state.flights.length === 0) return;
    
    const selectedFlight = state.flights[state.selectedIndex];
    
    console.log('✋ Selected flight:', selectedFlight);
    
    // Show detailed view (to be implemented)
    showFlightDetails(selectedFlight);
    
    // Show feedback
    showToast('✋ Select', 'select', 1000);
    playSound('select');
}

// Update flight selection in UI
function updateFlightSelection() {
    const flightCards = document.querySelectorAll('.flight-card');
    
    flightCards.forEach((card, index) => {
        if (index === state.selectedIndex) {
            card.classList.add('selected');
            // Scroll into view
            if (CONFIG.ui.autoScrollToSelected) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            card.classList.remove('selected');
        }
    });
}

// Show flight details modal
function showFlightDetails(flight) {
    console.log('Showing details for flight:', flight);
    showToast(`Flight ${flight.callsign} from ${flight.origin}`, 'info', 3000);
}

// Refresh flight data
async function refreshFlightData() {
    console.log('🔄 Refreshing flight data...');
    showToast('Refreshing...', 'info', 1000);
    
    // Re-render with mock data
    renderFlightList(state.flights);
}

// Show toast notification
function showToast(message, type = 'info', duration = 2000) {
    if (!CONFIG.ui.showToast) return;
    
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Show error message
function showError(message) {
    showToast(`❌ ${message}`, 'error', 5000);
    console.error(message);
}

// Play sound feedback (optional)
function playSound(type) {
    if (CONFIG.dev.debug) {
        console.log(`🔊 Sound: ${type}`);
    }
}

// Update info bar
function updateInfoBar(lastUpdate, nextRefresh, cacheStatus) {
    const lastUpdateEl = document.getElementById('last-update');
    const nextRefreshEl = document.getElementById('next-refresh');
    const cacheStatusEl = document.getElementById('cache-status');
    
    if (lastUpdateEl) lastUpdateEl.textContent = `Last updated: ${lastUpdate}`;
    if (nextRefreshEl) nextRefreshEl.textContent = `Next refresh: ${nextRefresh}`;
    if (cacheStatusEl) cacheStatusEl.textContent = `Cache: ${cacheStatus}`;
}

// Render flight list
function renderFlightList(flights) {
    const flightList = document.getElementById('flight-list');
    if (!flightList) return;
    
    // Clear existing
    flightList.innerHTML = '';
    
    if (flights.length === 0) {
        flightList.innerHTML = `
            <div class="no-flights">
                <p>No flights currently arriving to Atlanta (KATL)</p>
                <p>Data will refresh automatically</p>
            </div>
        `;
        return;
    }
    
    // Render each flight
    flights.forEach((flight, index) => {
        const card = createFlightCard(flight, index);
        flightList.appendChild(card);
    });
    
    // Select first flight by default
    if (flights.length > 0) {
        updateFlightSelection();
    }
}

// Create flight card element
function createFlightCard(flight, index) {
    const card = document.createElement('div');
    card.className = 'flight-card';
    card.dataset.index = index;
    
    card.innerHTML = `
        <div class="flight-header">
            <span class="flight-number">${flight.callsign || 'N/A'}</span>
            <span class="status-badge ${flight.status || 'ontime'}">${flight.statusText || 'On Time'}</span>
        </div>
        <div class="flight-info">
            <div>
                <strong>Origin:</strong>
                ${flight.origin || 'Unknown'}
            </div>
            <div>
                <strong>Altitude:</strong>
                ${flight.altitude || 'N/A'}
            </div>
            <div>
                <strong>Distance:</strong>
                ${flight.distance || 'N/A'}
            </div>
            <div>
                <strong>Speed:</strong>
                ${flight.speed || 'N/A'}
            </div>
        </div>
    `;
    
    return card;
}

// Export for use in modules
window.app = {
    state,
    navigateFlights,
    selectFlight,
    showToast,
    updateInfoBar,
    renderFlightList
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export default {
    init,
    navigateFlights,
    selectFlight,
    showToast,
    renderFlightList
};
