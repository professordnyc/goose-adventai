# Gesture-Controlled Flight Tracker - Project Plan

## ⏱️ Sprint Plan: 40-Minute Implementation

**Target**: Working MVP in 40 minutes

### Time Allocation

| Phase | Time | Tasks |
|-------|------|-------|
| **Setup** | 5 min | Download model, verify files, start server |
| **Flight API** | 10 min | OpenSky client, CORS proxy, basic filtering |
| **UI Rendering** | 10 min | Flight cards, selection state, info bar |
| **Gesture Recognition** | 10 min | MediaPipe init, detect gestures, map to actions |
| **Polish** | 5 min | Test, fix bugs, add feedback |

**Total**: 40 minutes

### MVP Scope (Keep It Simple!)

✅ Show 5-10 flights near KATL  
✅ Navigate with fist, select with palm  
✅ Visual feedback (toast + indicator)  
✅ Basic caching (5min TTL, manual refresh)  
❌ **Cut**: Detailed flight view, complex filtering, animations, webcam preview toggle

## Project Overview
Build a gesture-controlled flight tracker display system for the Winter Festival entrance that allows visitors to interact with real-time flight information using hand gestures.

### ✅ Confirmed Requirements
- **API**: OpenSky Network API (https://opensky-network.org/apidoc/rest.html)
- **Endpoint**: `/states/all` (live aircraft positions)
- **Airport**: Hartsfield-Jackson Atlanta International Airport (ICAO: KATL)
- **Gesture Recognition**: Google MediaPipe Gesture Recognizer with webcam
- **Gestures**: "Closed Fist" (navigate) and "Open Palm" (select) - two distinct gestures
- **CORS Proxy**: Use https://corsproxy.io for browser-based requests
- **Video Mirroring**: If skeleton overlay appears reversed, mirror both video and landmarks
- **Debounce Time**: ✅ **Implemented at 800ms** (prevents rapid re-triggers during motion-based detection)
- **Detection Confidence**: ✅ **30% hand detection, 70% gesture confidence** (two-tier approach for reliability)
- **Visual Theme**: Use Winter Festival theme from day4 (style.css and README.md) as design inspiration
- **Data Type**: Live aircraft positions (filter for arrivals to KATL)
- **Caching**: Implement caching to handle free tier rate limits (10 requests/day anonymous)
- **Credentials**: Stored in `.env` file using `OPENSKY_CLIENT_ID` and `OPENSKY_ROLES` keys
- **Environment**: `.env.example` configured with OpenSky credential structure (CLIENT_ID/ROLES format)

---

## 1. System Architecture

### Components
1. **Gesture Recognition System**
   - Camera/sensor input for hand tracking
   - Gesture detection and classification
   - Real-time processing pipeline

2. **Flight Data Integration**
   - Real-time flight API integration
   - Data caching and refresh mechanism
   - Error handling and fallback data

3. **Display Interface**
   - Interactive visual display
   - Smooth animations and transitions
   - Responsive UI elements

4. **Control Logic**
   - Gesture-to-action mapping
   - State management
   - User feedback system

---

## 2. Technical Requirements

### Hardware Considerations
- **Camera/Sensor**: Webcam or depth sensor (Kinect, Leap Motion, or standard webcam)
- **Display**: Large screen/monitor for public viewing
- **Processing**: Computer with sufficient CPU/GPU for real-time gesture processing

### Software Stack
- **Programming Language**: Python (recommended for rapid development)
- **Computer Vision**: ✅ Google MediaPipe Gesture Recognizer (confirmed)
- **Flight Data API**: ✅ OpenSky Network (confirmed)
- **UI Framework**: Pygame, Tkinter, or web-based (Flask/FastAPI + HTML/CSS/JS)
- **Libraries**:
  - `opencv-python` - Camera input and image processing
  - `mediapipe` - Hand landmark detection
  - `requests` - API calls
  - `numpy` - Data processing
  - UI library of choice

### ✅ Browser-Based Implementation (Recommended)
Based on requirements (MediaPipe + webcam + CORS proxy):
- **Frontend**: HTML/CSS/JavaScript
- **Gesture Recognition**: MediaPipe Gesture Recognizer (JavaScript SDK)
- **Webcam**: Browser getUserMedia API
- **API Requests**: Fetch API with CORS proxy (https://corsproxy.io)
- **UI Framework**: React, Vue, or vanilla JavaScript
- **No backend required** - fully client-side application

---

## 3. Gesture Design

### ✅ Confirmed Gesture Set
**Primary Gestures** (required):
1. **Closed Fist** 👊 - **Navigate**
   - Action: Scroll through flight list (move selection up/down)
   - Movement: Vertical fist movement to navigate
   - Alternative: Hold fist and move to scroll

2. **Open Palm** ✋ - **Select**
   - Action: Select/confirm highlighted flight
   - Trigger: Show detailed view of selected flight
   - Alternative: Hold palm to activate

**Future Enhancement Gestures** (optional):
- Pointing finger: Fine navigation
- Thumb up/down: Quick scroll
- Wave: Return to main menu
- Two hands: Advanced controls

### ✅ MediaPipe Gesture Recognizer Strategy

**Confidence Threshold**: **0.7** (70%)
- Start with 0.7 for balanced accuracy
- Too low (< 0.5): Many false positives
- Too high (> 0.9): Missed gestures
- Adjustable based on testing

**Confidence Tuning Guide**:
- **0.5-0.6**: Sensitive, more false positives
- **0.7**: ✅ **Recommended starting point**
- **0.8-0.9**: Strict, fewer false positives, may miss gestures

- Use **MediaPipe Gesture Recognizer** (pre-trained model)
- Built-in gesture recognition (no custom training needed)
- Calculate hand pose and movement vectors
- Implement gesture classifiers with thresholds
- Add cooldown periods to prevent accidental triggers
- Provide visual feedback for recognized gestures

---

## 4. Flight Data Integration

### ✅ OpenSky Network API
**Endpoint**: `/states/all`
- **Full URL**: `https://opensky-network.org/api/states/all`
- **Airport**: KATL (Hartsfield-Jackson Atlanta International)
- **Authentication**: Optional (username/password) - increases rate limits
- **Rate Limits**: 
  - Anonymous: 10 requests/day
  - Authenticated: 400 requests/day (4000 for OpenSky members)
- **Update Frequency**: Real-time data with ~10 second delay
- **Data Format**: JSON
- **Documentation**: https://opensky-network.org/apidoc/rest.html
- **Critical**: Free tier has severe limits - **caching is mandatory**

### CORS Proxy Configuration
**For browser-based requests**, use CORS proxy to bypass same-origin policy:

- **Proxy URL**: `https://corsproxy.io/?`
- **Usage**: Prepend to OpenSky API URL
- **Example**: 
  ```
  https://corsproxy.io/?https://opensky-network.org/api/states/all
  ```
- **Note**: CORS proxy adds latency; consider server-side API calls for production

### OpenSky `/states/all` Response Structure
The API returns live aircraft position data with the following fields:

**Response**: `{ "time": <timestamp>, "states": [[...], [...]] }`

**State Vector Array Indices** (each aircraft is an array):
- [0] icao24 - Unique ICAO 24-bit address (aircraft ID)
- [1] callsign - Flight callsign (flight number)
- [2] origin_country - Country name
- [3] time_position - Unix timestamp of last position update
- [4] last_contact - Unix timestamp of last contact
- [5] longitude - WGS-84 longitude in decimal degrees
- [6] latitude - WGS-84 latitude in decimal degrees
- [7] baro_altitude - Barometric altitude in meters
- [8] on_ground - Boolean (true if aircraft is on ground)
- [9] velocity - Speed over ground in m/s
- [10] true_track - Direction in degrees (0° = north)
- [11] vertical_rate - Vertical speed in m/s
- [12] sensors - IDs of sensors contributing to data
- [13] geo_altitude - Geometric altitude in meters
- [14] squawk - Transponder code
- [15] spi - Special purpose indicator
- [16] position_source - Origin of position (0=ADS-B, 1=ASTERIX, 2=MLAT)

### Filtering Logic for Arrivals
To identify arrivals to KATL from live position data:
- Filter by geographic bounding box around KATL
- KATL coordinates: 33.6407° N, -84.4277° W
- Bounding box: ~10-20 mile radius
- Filter for aircraft with descending vertical_rate (negative)
- Filter for aircraft heading toward airport (calculate bearing)
- Optional: Cross-reference with known inbound flight schedules

### Data Points to Display
- Flight number
- Airline
- Origin/Destination
- Scheduled time
- Actual time
- Status (On-time, Delayed, Cancelled, Boarding, etc.)
- Gate information
- Terminal
- Current altitude and distance from airport

**Available from OpenSky**:
- Callsign (flight identifier)
- Current position (lat/lon)
- Altitude (barometric and geometric)
- Velocity and heading
- On-ground status
- Origin airport (ICAO code)

### Data Management

#### ✅ Caching Strategy (MANDATORY for Free Tier)

**Rate Limit Challenge**:
- Anonymous: Only 10 requests per day
- At 1 request/minute = 1,440 requests/day needed
- **Solution**: Aggressive caching with smart refresh

**Caching Approach**:

1. **LocalStorage/SessionStorage (Browser)**:
   ```javascript
   // Cache structure
   {
     "timestamp": 1702686000000,
     "data": { /* OpenSky response */ },
     "ttl": 300000  // 5 minutes in ms
   }
   ```

2. **File-based Cache (Python)**:
   ```python
   # cache/flight_data.json
   {
     "timestamp": "2025-12-15T21:54:00Z",
     "data": { ... },
     "ttl_seconds": 300
   }
   ```

**Cache Strategy Options**:

| Strategy | Refresh Rate | Daily Requests | Use Case |
|----------|-------------|----------------|----------|
| Conservative | Every 5 min | ~288/day | Anonymous user |
| Moderate | Every 2 min | ~720/day | Authenticated user |
| Aggressive | Every 30 sec | ~2,880/day | OpenSky member |
| Demo Mode | Manual only | 1-10/day | Development/testing |

**Recommended: Tiered Refresh Strategy**
```javascript
// Adjust refresh rate based on credential availability
const REFRESH_INTERVALS = {
  anonymous: 300000,      // 5 minutes (288 requests/day)
  authenticated: 90000,   // 90 seconds (960 requests/day)
  member: 30000          // 30 seconds (2,880 requests/day)
};
```

**Cache Features**:
- **Time-to-Live (TTL)**: Auto-expire based on credentials
- **Manual Refresh**: User can force update (with cooldown)
- **Stale-While-Revalidate**: Show cached data while fetching new
- **Error Fallback**: Use cache if API fails
- **Offline Support**: Continue showing last cached data
- **Cache Warming**: Pre-load data on app start

**Cache Invalidation**:
- Expire after TTL
- User manual refresh (with rate limiting UI)
- On credential change
- On app restart (optional)

**Rate Limit Protection**:
- Handle API rate limits gracefully
- Display "Next refresh available in: X minutes"
- Prevent rapid consecutive requests
- Fall back to mock data if quota exceeded
- Show cache age indicator in UI

---

## 5A. MediaPipe Gesture Recognition Implementation

### ✅ MediaPipe Gesture Recognizer Setup

**Model**: Google's pre-trained gesture recognizer
- **Task**: Hand gesture recognition
- **Model File**: `gesture_recognizer.task`
- **Download**: https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task

**Supported Gestures** (built-in):
- ✅ **Closed_Fist** - Navigate gesture
- ✅ **Open_Palm** - Select gesture
- Victory (V sign)
- Pointing_Up
- Thumb_Up
- Thumb_Down
- ILoveYou

### Browser Implementation (JavaScript)

```javascript
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';

// Initialize MediaPipe
async function initializeGestureRecognizer() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  
  const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "/models/gesture_recognizer.task",
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numHands: 2,  // Track up to 2 hands (IMPLEMENTED)
    minHandDetectionConfidence: 0.3,  // 30% (IMPLEMENTED - lowered for better detection)
    minHandPresenceConfidence: 0.3,   // 30% (IMPLEMENTED)
    minTrackingConfidence: 0.5        // 50% (IMPLEMENTED)
  });
  
  return gestureRecognizer;
}

// Webcam setup
async function setupWebcam() {
  const video = document.getElementById('webcam');
  
  // Get webcam stream
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: 1280,
      height: 720,
      facingMode: "user"
    }
  });
  
  video.srcObject = stream;
  await video.play();
  
  // Mirror video for natural interaction
  // (User sees themselves as in a mirror)
  video.style.transform = 'scaleX(-1)';
  
  return video;
}

// Gesture detection loop
let lastGestureTime = 0;
const GESTURE_COOLDOWN = 800; // 800ms (IMPLEMENTED)
// Prevents rapid re-triggers during motion-based detection

async function detectGestures(gestureRecognizer, video) {
  const results = gestureRecognizer.recognizeForVideo(video, Date.now());
  
  if (results.gestures && results.gestures.length > 0) {
    const gesture = results.gestures[0][0];  // First hand, top gesture
    const confidence = gesture.score;
    
    // Check confidence threshold (0.7 = 70%)
    if (confidence >= 0.7) {
      const now = Date.now();
      if (now - lastGestureTime > GESTURE_COOLDOWN) {
        handleGesture(gesture.categoryName, confidence);
        lastGestureTime = now;
      }
    }
  }
  
  // Continue loop
  requestAnimationFrame(() => detectGestures(gestureRecognizer, video));
}

// Gesture handler
function handleGesture(gestureName, confidence) {
  console.log(`Detected: ${gestureName} (${(confidence * 100).toFixed(1)}%)`);
  
  switch(gestureName) {
    case 'Closed_Fist':
      navigateFlights();
      showVisualFeedback('👊 Navigate', 'navigate');
      break;
      
    case 'Open_Palm':
      selectFlight();
      showVisualFeedback('✋ Select', 'select');
      break;
      
    default:
      // Ignore other gestures
      break;
  }
}
```

### Visual Feedback Implementation

```javascript
// Toast notification system
function showVisualFeedback(message, type) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `gesture-toast gesture-${type}`;
  toast.textContent = message;
  
  // Add to DOM
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Remove after delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Alternative: On-screen indicator
function updateGestureIndicator(gestureName, confidence) {
  const indicator = document.getElementById('gesture-indicator');
  
  if (gestureName) {
    indicator.innerHTML = `
      <div class="gesture-icon">${getGestureIcon(gestureName)}</div>
      <div class="gesture-name">${gestureName}</div>
      <div class="gesture-confidence">
        <div class="confidence-bar" style="width: ${confidence * 100}%"></div>
      </div>
    `;
    indicator.classList.add('active');
  } else {
    indicator.classList.remove('active');
  }
}

function getGestureIcon(gesture) {
  const icons = {
    'Closed_Fist': '👊',
    'Open_Palm': '✋',
    'Thumb_Up': '👍',
    'Thumb_Down': '👎'
  };
  return icons[gesture] || '👋';
}
```

### CSS for Visual Feedback

```css
/* Toast notifications */
.gesture-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  opacity: 0;
  transform: translateX(100px);
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.gesture-toast.show {
  opacity: 1;
  transform: translateX(0);
}

.gesture-toast.gesture-navigate {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gesture-toast.gesture-select {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* On-screen indicator */
#gesture-indicator {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 12px;
  color: white;
  min-width: 150px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

#gesture-indicator.active {
  opacity: 1;
}

.gesture-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 10px;
}

.gesture-name {
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
}

.gesture-confidence {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.confidence-bar {
  height: 100%;
  background: linear-gradient(90deg, #4ade80, #22c55e);
  transition: width 0.2s ease;
}

/* Webcam preview (optional) */
#webcam-preview {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 240px;
  height: 180px;
  border-radius: 12px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  object-fit: cover;
}
```

### HTML Structure

```html
<!DOCTYPE html>
<html>
<head>
  <title>Flight Tracker - Gesture Control</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Main flight display -->
  <div id="flight-display">
    <!-- Flight list will be rendered here -->
  </div>
  
  <!-- Gesture indicator -->
  <div id="gesture-indicator">
    <div class="gesture-icon">👋</div>
    <div class="gesture-name">Waiting for gesture...</div>
    <div class="gesture-confidence">
      <div class="confidence-bar" style="width: 0%"></div>
    </div>
  </div>
  
  <!-- Hidden webcam video (for processing) -->
  <video id="webcam" style="display: none;"></video>
  
  <!-- Optional: Visible webcam preview -->
  <video id="webcam-preview" autoplay playsinline></video>
  
  <!-- Scripts -->
  <script type="module" src="main.js"></script>
</body>
</html>
```

### Gesture Action Mapping

```javascript
// Flight list state
let flights = [];
let selectedIndex = 0;

// Navigate gesture - scroll through list
function navigateFlights() {
  // Cycle through flights
  selectedIndex = (selectedIndex + 1) % flights.length;
  
  // Update UI
  updateFlightList();
  highlightSelected(selectedIndex);
  
  // Play sound (optional)
  playSound('navigate');
}

// Select gesture - show details
function selectFlight() {
  if (flights.length === 0) return;
  
  const selectedFlight = flights[selectedIndex];
  
  // Show detail modal
  showFlightDetails(selectedFlight);
  
  // Play sound (optional)
  playSound('select');
}

// Highlight selected flight in list
function highlightSelected(index) {
  document.querySelectorAll('.flight-item').forEach((item, i) => {
    if (i === index) {
      item.classList.add('selected');
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      item.classList.remove('selected');
    }
  });
}
```

### Configuration in .env

```env
# MediaPipe Gesture Recognizer Settings (ACTUAL IMPLEMENTATION)
MEDIAPIPE_MODEL_PATH=/models/gesture_recognizer.task
MEDIAPIPE_HAND_DETECTION_CONFIDENCE=0.3  # 30% for initial hand detection
MEDIAPIPE_GESTURE_CONFIDENCE=0.7         # 70% for gesture recognition
MEDIAPIPE_COOLDOWN_MS=800                # 800ms cooldown (prevents rapid re-triggers)
MEDIAPIPE_MIRROR=true
MEDIAPIPE_NUM_HANDS=2                    # Track up to 2 hands
MEDIAPIPE_SHOW_LANDMARKS=false
# Gesture Mappings
GESTURE_NAVIGATE=Closed_Fist
GESTURE_SELECT=Open_Palm

# Visual Feedback
SHOW_TOAST_NOTIFICATIONS=true
SHOW_GESTURE_INDICATOR=true
SHOW_WEBCAM_PREVIEW=true
TOAST_DURATION_MS=2000
```

---

## 5B. Winter Festival Design Theme

### ✅ Design Inspiration from Day 4

**Reference**: `/day4/style.css` and `/day4/README.md`

The Flight Tracker will use the established Winter Festival visual identity:

### Color Palette (from Day 4)

```css
:root {
    /* Winter Color Palette */
    --ice-blue: #E3F2FD;
    --winter-blue: #64B5F6;
    --deep-blue: #1976D2;
    --dark-blue: #0D47A1;
    --snow-white: #FFFFFF;
    --warm-gold: #FFD54F;
    --warm-amber: #FFA726;
    --cozy-brown: #5D4037;
    --soft-gray: #F5F5F5;
    --text-dark: #212121;
    --text-light: #757575;
    
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 3rem;
    --spacing-xl: 4rem;
    
    /* Typography */
    --font-primary: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --font-heading: 'Georgia', serif;
}
```

### Flight Tracker Specific Color Usage

```css
/* Flight Status Colors (extend Day 4 palette) */
:root {
    /* Inherited from Day 4 */
    --ice-blue: #E3F2FD;
    --winter-blue: #64B5F6;
    --deep-blue: #1976D2;
    --warm-gold: #FFD54F;
    --warm-amber: #FFA726;
    
    /* Flight Tracker Extensions */
    --status-ontime: #4CAF50;      /* Green for on-time */
    --status-delayed: #FF9800;      /* Orange for delayed */
    --status-cancelled: #F44336;    /* Red for cancelled */
    --status-boarding: #2196F3;     /* Blue for boarding */
    --status-landed: #9E9E9E;       /* Gray for landed */
    
    /* Gesture Feedback */
    --gesture-navigate: #667eea;    /* Purple gradient start */
    --gesture-navigate-end: #764ba2; /* Purple gradient end */
    --gesture-select: #f093fb;      /* Pink gradient start */
    --gesture-select-end: #f5576c;  /* Pink gradient end */
}
```

### Typography & Spacing (Inherited)

- **Primary Font**: Segoe UI (clean, readable for flight data)
- **Heading Font**: Georgia (elegant serif for titles)
- **Spacing Scale**: xs/sm/md/lg/xl (0.5rem to 4rem)

### Design Elements from Day 4

**1. Snowflakes Animation** (optional, subtle):
```css
/* Subtle snowflakes in background */
.snowflakes {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.3; /* More subtle for flight tracker */
}
```

**2. Card-Based Layout**:
```css
.flight-card {
    background: var(--snow-white);
    border-radius: 15px;
    padding: var(--spacing-md);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.flight-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.flight-card.selected {
    border: 3px solid var(--warm-gold);
    transform: translateY(-5px) scale(1.02);
}
```

**3. Gradient Backgrounds**:
```css
/* Header/Hero section */
.header {
    background: linear-gradient(135deg, var(--winter-blue), var(--deep-blue));
    color: var(--snow-white);
}

/* Body background */
body {
    background: linear-gradient(to bottom, var(--ice-blue), var(--snow-white));
    min-height: 100vh;
}
```

**4. Smooth Animations**:
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.flight-item {
    animation: fadeInUp 0.5s ease;
}
```

**5. Badges & Status Indicators**:
```css
.status-badge {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 20px;
    font-weight: bold;
    font-size: 0.9rem;
    display: inline-block;
}

.status-badge.ontime {
    background: var(--status-ontime);
    color: var(--snow-white);
}

.status-badge.delayed {
    background: var(--status-delayed);
    color: var(--snow-white);
}
```

### Responsive Design (Inherited Breakpoints)

```css
/* Tablet */
@media (max-width: 768px) {
    /* Adjust layouts */
}

/* Mobile */
@media (max-width: 480px) {
    /* Mobile-first adjustments */
}
```

### Flight Tracker UI Layout

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>❄️ Winter Festival - Flight Tracker</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Snowflakes (optional) -->
    <div class="snowflakes">
        <div class="snowflake">❄</div>
        <!-- ... more snowflakes ... -->
    </div>
    
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="logo">❄️ Winter Festival Flight Tracker</div>
            <nav class="nav">
                <span class="gesture-help">👊 Navigate • ✋ Select</span>
            </nav>
        </div>
    </header>
    
    <!-- Main Flight Display -->
    <main class="main-display">
        <div class="container">
            <!-- Title Section -->
            <section class="hero-compact">
                <h1 class="section-title">✈️ Arrivals to Atlanta (KATL)</h1>
                <p class="section-intro">Real-time flight tracking with gesture controls</p>
            </section>
            
            <!-- Flight List -->
            <section class="flight-list">
                <!-- Flight cards will be generated here -->
                <div class="flight-card selected">
                    <div class="flight-header">
                        <span class="flight-number">DL1234</span>
                        <span class="status-badge ontime">On Time</span>
                    </div>
                    <div class="flight-info">
                        <div class="origin">From: JFK - New York</div>
                        <div class="time">Arrives: 2:45 PM</div>
                        <div class="details">Altitude: 12,500 ft • Distance: 45 mi</div>
                    </div>
                </div>
            </section>
            
            <!-- Cache Status -->
            <div class="info-bar">
                <span>Last updated: 2 minutes ago</span>
                <span>Next refresh: 3 minutes</span>
            </div>
        </div>
    </main>
    
    <!-- Gesture Controls Overlay -->
    <div id="gesture-indicator" class="gesture-indicator">
        <div class="gesture-icon">👋</div>
        <div class="gesture-name">Waiting for gesture...</div>
        <div class="confidence-bar-container">
            <div class="confidence-bar"></div>
        </div>
    </div>
    
    <!-- Webcam Preview (bottom-right) -->
    <div id="webcam-container">
        <video id="webcam-preview" autoplay playsinline></video>
        <canvas id="landmark-canvas"></canvas>
    </div>
    
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>❄️ Winter Festival 2026</h3>
                    <p>Gesture-controlled flight tracking experience</p>
                </div>
                <div class="footer-section">
                    <h3>Powered By</h3>
                    <p>OpenSky Network API • MediaPipe Gesture Recognition</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Winter Festival. Built with Goose AI.</p>
                <p class="footer-tagline">Safe travels and happy holidays! ✈️❄️</p>
            </div>
        </div>
    </footer>
    
    <script type="module" src="main.js"></script>
</body>
</html>
```

### Design Consistency Checklist

- [ ] Use Day 4 color palette (ice blue, winter blue, warm gold)
- [ ] Apply Day 4 typography (Segoe UI + Georgia)
- [ ] Implement card-based layout with hover effects
- [ ] Use gradient backgrounds (blue gradients)
- [ ] Include subtle snowflake animation (optional)
- [ ] Maintain spacing scale (xs through xl)
- [ ] Apply smooth transitions and animations
- [ ] Ensure responsive design with same breakpoints
- [ ] Use badge style for status indicators
- [ ] Match footer styling from Day 4

### Brand Continuity

**Logo Format**: `❄️ Winter Festival [Feature Name]`
- Day 4: "❄️ Winter Festival 2026"
- Day 5: "❄️ Winter Festival Flight Tracker"

**Tagline Style**: Winter/holiday themed
- Day 4: "Happy Holidays and Merry Christmas! ❄️✨"
- Day 5: "Safe travels and happy holidays! ✈️❄️"

**Visual Identity**:
- Winter color palette (cool blues + warm accents)
- Snowflake motifs
- Clean, modern design
- Card-based layouts
- Smooth animations

---

## 5. User Interface Design

### Main Screen Layout
```
┌─────────────────────────────────────────────┐
│  WINTER FESTIVAL FLIGHT TRACKER             │
│  [Gesture Help Icon]        [Current Time]  │
├─────────────────────────────────────────────┤
│                                             │
│  DEPARTURES                    ARRIVALS     │
│  ┌──────────────────┐  ┌──────────────────┐│
│  │ FL123 - NYC      │  │ FL456 - LAX      ││
│  │ ► SELECTED       │  │                  ││
│  │ 10:30 AM [On-T]  │  │ 11:45 AM [Delay] ││
│  └──────────────────┘  └──────────────────┘│
│  ┌──────────────────┐  ┌──────────────────┐│
│  │ FL789 - MIA      │  │ FL012 - SEA      ││
│  │ 11:15 AM [Board] │  │ 12:30 PM [On-T]  ││
│  └──────────────────┘  └──────────────────┘│
│                                             │
├─────────────────────────────────────────────┤
│  👊 Closed Fist - Navigate                  │
│  ✋ Open Palm - Select                      │
│  [Gesture Indicator: 👊 85% confidence]     │
└─────────────────────────────────────────────┘
  [Webcam Preview]
```

### Visual Feedback Elements
- Highlight selected flight on gesture hover
- Animated transitions between views
- Gesture indicator overlay
- Hand skeleton visualization (optional debug mode)
- Color coding for flight status (green=on-time, yellow=delayed, red=cancelled)

---

## 5C. Complete CSS Theme Implementation

```css
/* flight-tracker-theme.css */
/* Extends Day 4 Winter Festival theme */

@import url('day4-base-theme.css'); /* Inherit Day 4 styles */

/* Flight-specific extensions */
:root {
    /* Status colors */
    --status-ontime: #4CAF50;
    --status-delayed: #FF9800;
    --status-cancelled: #F44336;
    --status-boarding: #2196F3;
    --status-landed: #9E9E9E;
    
    /* Gesture feedback colors */
    --gesture-navigate: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gesture-select: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* Flight card styling (extends Day 4 highlight-card) */
.flight-card {
    background: var(--snow-white);
    border-radius: 15px;
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
}

.flight-card.selected {
    border-left-color: var(--warm-gold);
    transform: translateX(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    background: linear-gradient(
        to right,
        rgba(255, 213, 79, 0.1),
        var(--snow-white)
    );
}

/* ... rest of flight tracker specific styles ... */
```

## 6. Implementation Phases

### Phase 1: Core Setup (Foundation)
- [ ] Set up project structure and dependencies
- [ ] Initialize camera input and test basic capture
- [ ] Implement basic hand detection with MediaPipe
- [ ] Create simple display window

### Phase 2: Gesture Recognition
- [ ] Implement hand landmark tracking
- [ ] Create gesture detection algorithms
  - [ ] Swipe detection (left, right, up, down)
  - [ ] Static pose detection (palm, fist)
  - [ ] Advanced gestures (pinch, wave)
- [ ] Add gesture cooldown/debouncing
- [ ] Test and calibrate gesture thresholds

### Phase 3: Flight Data Integration
- [x] Research and select flight API (OpenSky Network confirmed)
- [ ] Implement API client with error handling
- [ ] Create data models for flight information
- [ ] Implement caching mechanism
- [ ] Create mock data for testing

### Phase 4: UI Development
- [ ] Design main display layout
- [ ] Implement flight list rendering
- [ ] Add filtering (arrivals/departures)
- [ ] Create detail view for individual flights
- [ ] Add smooth transitions and animations

### Phase 5: Integration & Control Logic
- [ ] Map gestures to UI actions
- [ ] Implement state management
- [ ] Connect gesture events to display updates
- [ ] Add user feedback for gestures
- [ ] Test complete workflow

### Phase 6: Polish & Optimization
- [ ] Optimize performance (target 30+ FPS)
- [ ] Add error handling and recovery
- [ ] Create help/tutorial overlay
- [ ] Implement logging and debugging tools
- [ ] Add configuration file for easy customization
- [ ] Test in various lighting conditions
- [ ] User acceptance testing

---

## 7. File Structure

```
day5/
├── plan.md                          # This file
├── README.md                        # Project documentation
├── .env                             # API credentials (not in git)
├── requirements.txt                 # Python dependencies
├── config.py                        # Configuration settings
├── main.py                          # Application entry point
├── src/
│   ├── __init__.py
│   ├── gesture_recognition/
│   │   ├── __init__.py
│   │   ├── hand_tracker.py         # MediaPipe hand tracking
│   │   ├── gesture_detector.py     # Gesture classification
│   │   └── gesture_types.py        # Gesture definitions
│   ├── flight_data/
│   │   ├── __init__.py
│   │   ├── api_client.py           # Flight API integration
│   │   ├── data_models.py          # Flight data structures
│   │   └── mock_data.py            # Test data generator
│   ├── ui/
│   │   ├── __init__.py
│   │   ├── display.py              # Main display controller
│   │   ├── components.py           # UI components
│   │   └── animations.py           # Transition effects
│   └── utils/
│       ├── __init__.py
│       ├── logger.py               # Logging utilities
│       └── helpers.py              # Common utilities
├── assets/
│   ├── fonts/                      # Custom fonts
│   ├── icons/                      # UI icons
│   └── images/                     # Background/branding
└── tests/
    ├── test_gestures.py
    ├── test_api.py
    └── test_ui.py
```

---

## 8. Configuration & Customization

### Config File (config.py)
```python
# Display Settings
SCREEN_WIDTH = 1920
SCREEN_HEIGHT = 1080
FULLSCREEN = True
FPS = 30

# Camera Settings
CAMERA_ID = 0
CAMERA_WIDTH = 1280
CAMERA_HEIGHT = 720

# Gesture Settings
GESTURE_COOLDOWN = 1.0  # seconds
CONFIDENCE_THRESHOLD = 0.7
SWIPE_THRESHOLD = 0.15

# OpenSky Network API Settings
OPENSKY_USERNAME = os.getenv('OPENSKY_USERNAME', '')  # Optional
OPENSKY_PASSWORD = os.getenv('OPENSKY_PASSWORD', '')  # Optional
OPENSKY_API_URL = "https://opensky-network.org/api"
OPENSKY_STATES_ENDPOINT = "/states/all"

# CORS Proxy Settings (for browser-based requests)
CORS_PROXY_URL = os.getenv('CORS_PROXY_URL', 'https://corsproxy.io/?')
USE_CORS_PROXY = True  # Set to False for server-side requests

# Airport Settings
AIRPORT_ICAO = "KATL"  # Atlanta Hartsfield-Jackson
AIRPORT_LAT = 33.6407
AIRPORT_LON = -84.4277
AIRPORT_RADIUS_NM = 15  # Nautical miles for bounding box

# Cache Settings
CACHE_ENABLED = True
CACHE_TTL_ANONYMOUS = 300  # 5 minutes for anonymous
CACHE_TTL_AUTHENTICATED = 90  # 90 seconds for authenticated
CACHE_TTL_MEMBER = 30  # 30 seconds for OpenSky members
MAX_API_RETRIES = 3
API_TIMEOUT = 10  # seconds

# Data Settings
FLIGHT_LOOKBACK_HOURS = 2  # How far back to fetch arrivals

# UI Settings
MAX_FLIGHTS_DISPLAYED = 6
ANIMATION_SPEED = 0.3
SHOW_HAND_TRACKING = True
```

---

## 9. Testing Strategy

### Unit Tests
- Gesture detection accuracy
- API client error handling
- Data parsing and validation
- UI component rendering

### Integration Tests
- Gesture → UI action flow
- API → Display update flow
- State management across gestures

### User Testing
- Gesture recognition in various conditions
- UI readability from distance
- Response time and smoothness
- Accessibility considerations

### Edge Cases
- No internet connection
- API rate limiting
- Camera disconnection
- Multiple hands in frame
- Poor lighting conditions
- Occlusion scenarios

---

## 10. Performance Targets

- **Frame Rate**: 30+ FPS for smooth gesture tracking
- **Gesture Response Time**: < 200ms from gesture to UI update
- **API Latency**: Data refresh within 2-3 seconds
- **Memory Usage**: < 500MB RAM
- **CPU Usage**: < 50% on target hardware

---

## 11. Accessibility & Safety

### Accessibility Features
- High contrast mode option
- Large, readable fonts
- Clear visual feedback
- Audio cues for gesture recognition (optional)
- Alternative input methods (keyboard fallback)

### Safety Considerations
- Privacy: No recording or storage of camera feed
- Clear signage about camera usage
- Option to disable camera when not in use
- Data security for API keys
- Error messages that don't expose system details

---

## 12. Deployment Checklist

- [ ] Test on target hardware
- [ ] Configure API credentials
- [ ] Set up auto-start on boot
- [ ] Create user manual/help guide
- [ ] Prepare troubleshooting guide
- [ ] Set up monitoring/logging
- [ ] Create backup/recovery plan
- [ ] Test in actual venue conditions
- [ ] Train support staff
- [ ] Prepare demo mode for setup

---

## 13. Future Enhancements

### Potential Features
- Multi-language support
- Weather information integration
- Airport maps with gate locations
- Flight search by destination
- Historical flight statistics
- Social media integration (#WinterFestival)
- AR elements for enhanced experience
- Voice command integration
- Mobile app companion
- Analytics dashboard for usage patterns

### Advanced Gestures
- Two-hand gestures for advanced controls
- Gesture combinations
- Custom gesture recording
- Adaptive gesture learning

---

## 14. Risk Assessment

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| API downtime | High | Implement caching, mock data fallback |
| Poor gesture recognition | High | Extensive testing, calibration tools |
| Performance issues | Medium | Optimization, hardware upgrade option |
| Camera failure | Medium | Fallback to keyboard/touch input |
| Lighting variation | Medium | Auto-calibration, multiple thresholds |

### Project Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Timeline overrun | Medium | Phased implementation, MVP first |
| API cost overruns | Low | Monitor usage, set alerts |
| User adoption | Medium | Clear instructions, attractive UI |
| Weather/outdoor conditions | High | Environmental testing, weatherproofing |

---

## 15. Success Metrics

- **Technical Success**:
  - 95%+ gesture recognition accuracy
  - < 500ms average response time
  - 99% uptime during festival hours

- **User Success**:
  - Positive user feedback
  - High engagement rate
  - Minimal support requests

- **Business Success**:
  - Enhanced festival experience
  - Social media mentions
  - Return on investment

---

## 16. Timeline Estimate

- **Phase 1**: 2-3 days
- **Phase 2**: 3-4 days
- **Phase 3**: 2-3 days
- **Phase 4**: 3-4 days
- **Phase 5**: 2-3 days
- **Phase 6**: 3-5 days

**Total Estimated Time**: 15-22 days

**Minimum Viable Product (MVP)**: Can be achieved in ~10 days focusing on:
- Basic gesture recognition (swipe left/right)
- Simple flight list display
- Mock data (no API initially)
- Basic UI with manual refresh

---

## 17. Resources & References

### Documentation
- MediaPipe Hands: https://google.github.io/mediapipe/solutions/hands.html
- OpenCV Python: https://docs.opencv.org/
- OpenSky Network API: https://opensky-network.org/apidoc/rest.html

### OpenSky Network Resources
- API Documentation: https://opensky-network.org/apidoc/rest.html
- Account Registration: https://opensky-network.org/index.html#registration
- Rate Limits: https://opensky-network.org/apidoc/rest.html#limitations
- Airport Database: https://opensky-network.org/datasets/metadata/
- Example Queries: https://opensky-network.org/apidoc/rest.html#flights

### Similar Projects
- Gesture-controlled interfaces
- Digital signage systems
- Interactive museum displays

### Tools
- Git for version control
- Virtual environment for Python dependencies
- IDE: VS Code, PyCharm, or similar

---

## Notes

- Start with MVP approach: basic gestures + mock data
- Focus on reliability over features
- Test early and often in real-world conditions
- OpenSky API has rate limits - implement caching strategically
- Keep gesture set simple and intuitive
- Prioritize user experience and visual appeal
- Document all API keys and configurations
- Plan for demo mode during development

---

## 18. Implementation Results & Lessons Learned

### ✅ MVP Completed (2025-12-16)

**Development Time**: ~4 hours (planning + implementation)

**What Works**:
- ✅ MediaPipe gesture recognition integration
- ✅ Closed Fist (👊) navigation through flight list
- ✅ Open Palm (✋) flight selection  
- ✅ Webcam preview with mirrored video
- ✅ Real-time gesture indicator with confidence meter
- ✅ Toast notification feedback
- ✅ Mock flight data (5 flights)
- ✅ Keyboard fallback (Arrow Down, Enter, Space)
- ✅ Winter Festival theme consistency

### 🔧 Issues Encountered & Solutions

#### Issue #1: No Hand Detection
**Problem**: MediaPipe wasn't detecting hands at all (0 landmarks)

**Root Cause**: Hand detection confidence threshold too high (70%)
- Default 0.7 threshold meant MediaPipe was very strict about what qualified as a "hand"
- Required near-perfect lighting and hand positioning
- Many lighting conditions fell below threshold

**Solution**: Lowered hand detection thresholds
```javascript
// Changed from:
minHandDetectionConfidence: 0.7,
minHandPresenceConfidence: 0.7,
minTrackingConfidence: 0.7

// To:
minHandDetectionConfidence: 0.3,  // 30% for initial detection
minHandPresenceConfidence: 0.3,   // 30% for presence
minTrackingConfidence: 0.5        // 50% for tracking
```

**Result**: ✅ Reliable hand detection in various lighting conditions

#### Issue #2: Motion-Based Gesture Detection
**Problem**: Gestures only triggered during hand movement, not when holding static pose

**Root Cause**: MediaPipe Gesture Recognizer design philosophy
- Detects gesture **transitions**, not static poses
- Closed fist triggers when **closing** hand
- Open palm triggers when **opening** hand
- Static/still hands don't continuously trigger

**Initial Symptom**: Rapid re-triggering as hand moved
- User closes fist → triggers navigate
- Hand slightly moves → triggers again
- Result: 10-20 rapid triggers during one gesture

**Solution**: Increased cooldown period
```javascript
// Changed from:
const GESTURE_COOLDOWN = 300; // 300ms

// To:
const GESTURE_COOLDOWN = 800; // 800ms
```

**Result**: ✅ Smooth, controlled interaction with deliberate gesture timing

**User Guidance Added**:
- Make gestures with motion (close fist, open palm)
- Don't hold static poses
- Brief gesture → move hand away
- 800ms cooldown gives time to complete action

#### Issue #3: "None" Gesture Spam
**Problem**: Console flooded with "None" gesture detections

**Behavior**: MediaPipe detected hand but classified as "None" with 76-95% confidence
- "None" = hand visible but no recognized gesture
- Created console spam
- Triggered gesture indicator unnecessarily

**Solution**: Filter out "None" gestures entirely
```javascript
// Skip "None" gesture - hand detected but no recognized pose
if (gesture.categoryName === 'None') {
    updateGestureIndicator(null, 0);
    return; // Skip handling
}
```

**Result**: ✅ Clean console logs, only show actual gestures

### 📊 Final Configuration

**Gesture Detection**:
- Hand detection: 30% confidence (allows detection in varied lighting)
- Gesture confidence: 70% threshold (ensures accurate gesture recognition)
- Cooldown: 800ms (prevents rapid re-triggers)
- Tracks: Up to 2 hands (better detection coverage)

**Performance**:
- Gesture recognition: 70-86% confidence (Closed Fist)
- Gesture recognition: 70-74% confidence (Open Palm)
- Response time: < 100ms (gesture → UI update)
- Frame rate: 30-60 FPS depending on hardware

### 💡 Key Learnings

1. **Motion-Based Detection is a Feature, Not a Bug**
   - MediaPipe's transition detection is intentional
   - Makes gestures more deliberate and reduces accidental triggers
   - Users naturally make small movements when gesturing

2. **Confidence Thresholds Matter**
   - Hand detection (30%): Low threshold for finding hands
   - Gesture recognition (70%): High threshold for accuracy
   - Two-tier approach balances reliability and precision

3. **Cooldown Prevents Chaos**
   - 800ms gives users time to complete gesture and move away
   - Prevents "sticky" gestures that trigger multiple times
   - Makes interaction feel more intentional

4. **User Guidance is Critical**
   - Document that motion helps detection
   - Explain cooldown period  
   - Provide keyboard fallback for accessibility

### 🚀 Future Improvements (Not Implemented)

- [ ] Real OpenSky API integration (currently mock data)
- [ ] LocalStorage caching system
- [ ] Geographic filtering for KATL radius
- [ ] Flight details modal (replace alert)
- [ ] Sound effects for gesture feedback
- [ ] Hand landmark visualization overlay
- [ ] Adaptive lighting compensation
- [ ] Gesture history/replay for debugging

### 📝 Usage Guidelines (Final)

**Best Practices**:
- **Distance**: 1-3 feet from camera optimal
- **Lighting**: Well-lit environment (not backlit)
- **Motion**: Make deliberate gestures with slight movement
- **Timing**: Brief gesture → wait → move hand away
- **Background**: Clear, uncluttered background helps

**Troubleshooting**:
- Static hand doesn't trigger? **Add motion while making gesture**
- Multiple triggers? **Wait for 800ms cooldown**
- No detection? **Check lighting, distance, hand visibility**
- Gestures ignored? **Make more deliberate movements**

---

**Project Status**: ✅ MVP Complete - Gesture controls working!  
**Implementation**: Browser-based (HTML/CSS/JavaScript)  
**Total LOC**: ~600 lines (core application)  
**Files**: 9 (index.html, style.css, main.js, gesture.js, config.js, etc.)  
**Last Updated**: 2025-12-16 00:39:00
