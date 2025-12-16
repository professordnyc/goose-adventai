// Configuration for Day 5 Flight Tracker
// Load from environment variables or use defaults

export const CONFIG = {
  // OpenSky Network API
  api: {
    baseUrl: 'https://opensky-network.org/api',
    statesEndpoint: '/states/all',
    corsProxy: 'https://corsproxy.io/?',
    clientId: '', // Optional - set from OPENSKY_CLIENT_ID in .env
    roles: '',    // Optional - set from OPENSKY_ROLES in .env
    timeout: 10000, // 10 seconds
    maxRetries: 3
  },

  // Airport configuration
  airport: {
    icao: 'KATL', // Hartsfield-Jackson Atlanta International
    name: 'Atlanta Hartsfield-Jackson',
    coordinates: {
      lat: 33.6407,
      lon: -84.4277
    },
    radiusNauticalMiles: 15, // Bounding box radius
    radiusMeters: 27780 // ~15 nautical miles
  },

  // Cache settings
  cache: {
    enabled: true,
    ttl: {
      anonymous: 300000,      // 5 minutes - CACHE_TTL_ANONYMOUS
      authenticated: 90000,   // 90 seconds - CACHE_TTL_AUTHENTICATED
      member: 30000          // 30 seconds - CACHE_TTL_MEMBER
    },
    storageKey: 'flight_tracker_cache',
    maxAge: 600000 // 10 minutes max cache age
  },

  // MediaPipe Gesture Recognition
  gesture: {
    modelPath: '/models/gesture_recognizer.task',
    confidence: {
      default: 0.7,           // MEDIAPIPE_CONFIDENCE
      closedFist: 0.7,        // GESTURE_CONFIDENCE_CLOSED_FIST
      openPalm: 0.75          // GESTURE_CONFIDENCE_OPEN_PALM
    },
    debounce: {
      default: 300,           // MEDIAPIPE_DEBOUNCE_MS
      closedFist: 250,        // GESTURE_DEBOUNCE_CLOSED_FIST
      openPalm: 400           // GESTURE_DEBOUNCE_OPEN_PALM
    },
    tracking: {
      minDetectionConfidence: 0.7,  // MEDIAPIPE_CONFIDENCE
      minPresenceConfidence: 0.7,
      minTrackingConfidence: 0.7,
      numHands: 1                   // MEDIAPIPE_NUM_HANDS
    },
    video: {
      mirror: true,                 // MEDIAPIPE_MIRROR
      width: 1280,
      height: 720
    }
  },

  // Visual feedback
  ui: {
    showToast: true,                // SHOW_TOAST_NOTIFICATIONS
    showGestureIndicator: true,     // SHOW_GESTURE_INDICATOR
    showWebcamPreview: true,        // SHOW_WEBCAM_PREVIEW
    showLandmarkOverlay: false,     // SHOW_LANDMARK_OVERLAY
    showConfidenceMeter: true,      // SHOW_CONFIDENCE_METER
    toastDuration: 2000,            // TOAST_DURATION_MS
    maxFlightsDisplayed: 6,         // MAX_FLIGHTS_DISPLAYED
    animationSpeed: 300,            // ANIMATION_SPEED_MS
    autoScrollToSelected: true      // AUTO_SCROLL_TO_SELECTED
  },

  // Gesture mappings
  gestures: {
    navigate: 'Closed_Fist',
    select: 'Open_Palm'
  },

  // Development settings
  dev: {
    debug: false,               // DEBUG_MODE
    logApiCalls: true,         // LOG_API_CALLS
    logGestureEvents: true,    // LOG_GESTURE_EVENTS
    mockDataMode: false        // MOCK_DATA_MODE
  }
};

// Load environment variables from root .env (if available in browser context)
// Note: In browser, you'd typically inject these at build time or use a backend
export function loadEnvConfig(envVars = {}) {
  if (envVars.OPENSKY_CLIENT_ID) CONFIG.api.clientId = envVars.OPENSKY_CLIENT_ID;
  if (envVars.OPENSKY_ROLES) CONFIG.api.roles = envVars.OPENSKY_ROLES;
  if (envVars.MEDIAPIPE_CONFIDENCE) CONFIG.gesture.confidence.default = parseFloat(envVars.MEDIAPIPE_CONFIDENCE);
  if (envVars.MEDIAPIPE_DEBOUNCE_MS) CONFIG.gesture.debounce.default = parseInt(envVars.MEDIAPIPE_DEBOUNCE_MS);
  if (envVars.CACHE_TTL_ANONYMOUS) CONFIG.cache.ttl.anonymous = parseInt(envVars.CACHE_TTL_ANONYMOUS);
  if (envVars.CACHE_TTL_AUTHENTICATED) CONFIG.cache.ttl.authenticated = parseInt(envVars.CACHE_TTL_AUTHENTICATED);
  if (envVars.CACHE_TTL_MEMBER) CONFIG.cache.ttl.member = parseInt(envVars.CACHE_TTL_MEMBER);
  
  return CONFIG;
}

export default CONFIG;
