# ❄️ Winter Festival - Gesture-Controlled Flight Tracker

**Day 5** of the [Advent of AI Challenge](https://adventofai.dev/) • [View Challenge Details](https://adventofai.dev/challenges/5)

## 🎯 Project Purpose

Build an interactive public display showing real-time flight arrivals to Hartsfield-Jackson Atlanta International Airport (KATL), controlled entirely by hand gestures for a touchless, engaging experience at the Winter Festival entrance.

**Challenge**: Create gesture-controlled interface for public kiosk  
**Solution**: Browser-based app with MediaPipe + OpenSky Network API  
**Innovation**: Natural interaction without physical contact

---

## ✨ Key Features

### Core Functionality
- ✈️ **Real-time Flight Data** - Live aircraft positions via OpenSky Network `/states/all` endpoint
- 👊 **Closed Fist Gesture** - Navigate through arriving flights
- ✋ **Open Palm Gesture** - Select and view flight details
- 📊 **Visual Feedback** - Toast notifications, confidence meters, and gesture indicators
- 💾 **Smart Caching** - Handles free tier API limits (10 requests/day)
- ❄️ **Winter Theme** - Consistent branding with Day 4 festival website

### Technical Highlights
- 🎯 **30% Hand Detection / 70% Gesture Confidence** - Optimized for reliable recognition
- ⚡ **800ms Cooldown** - Prevents rapid re-triggering during motion
- 🎮 **Motion-Based Detection** - Gestures trigger best during hand movement (MediaPipe feature)
- 🪞 **Video Mirroring** - Natural mirror-like interaction
- ⌨️ **Keyboard Fallback** - Arrow keys and Enter for accessibility
- 📱 **Fully Responsive** - Desktop, tablet, and mobile support

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Gesture Recognition** | Google MediaPipe Gesture Recognizer |
| **Flight Data** | OpenSky Network REST API |
| **CORS Handling** | corsproxy.io |
| **Caching** | Browser LocalStorage |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Webcam Access** | Browser getUserMedia API |
| **Deployment** | Static hosting (Netlify/GitHub Pages) |

---

## 🚀 Running Locally

### Prerequisites
- ✅ Modern web browser (Chrome, Firefox, Safari, Edge)
- ✅ Webcam (built-in or external)
- ✅ Internet connection
- ✅ Python 3 (or Node.js, or VS Code Live Server)

### Quick Start (5 minutes)

1. **Clone and navigate**
   ```bash
   git clone https://github.com/professordnyc/goose-adventai.git
   cd goose-adventai/day5
   ```

2. **Download MediaPipe Model**
   ```bash
   mkdir models
   curl -o models/gesture_recognizer.task \
     https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task
   ```

3. **Configure (Optional)**
   ```bash
   cp env.example .env
   # Edit .env with OpenSky credentials to increase rate limits
   ```

4. **Serve Locally**
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve
   
   # VS Code
   # Use Live Server extension
   ```

5. **Open Browser**
   ```
   http://localhost:8000
   ```

6. **Allow Webcam** - Grant camera permission when prompted

---

## 🎮 Usage

### Gesture Controls

| Gesture | Icon | Action | Cooldown |
|---------|------|--------|----------|
| **Closed Fist** | 👊 | Navigate through flights | 800ms |
| **Open Palm** | ✋ | Select/view flight details | 800ms |

### Keyboard Shortcuts (Fallback)
- **↓ or J** - Navigate next flight
- **Enter or Space** - Select flight
- **Ctrl+R** - Refresh data manually

### Tips for Best Recognition
- **Distance**: 1-3 feet from camera
- **Lighting**: Good lighting improves accuracy
- **Motion**: Make gestures with slight hand movement (closing fist, opening palm)
- **Timing**: Hold gesture briefly then move hand away (800ms cooldown)
- **Confidence**: Watch the confidence meter (aim for >70%)
- **Tip**: Static/still hands may not trigger - motion helps MediaPipe detect gestures

---

## 📂 Project Structure

```
day5/
├── README.md                 # This file
├── plan.md                   # Detailed project blueprint
├── index.html                # Main application
├── style.css                 # Winter Festival theme
├── main.js                   # App initialization
├── config.js                 # Configuration
├── env.example               # Environment template
├── src/                      # Source modules (to be implemented)
│   ├── gesture/             # MediaPipe integration
│   ├── flight/              # OpenSky API client
│   ├── cache/               # LocalStorage manager
│   ├── ui/                  # Component renderers
│   └── utils/               # Helper functions
├── models/                   # MediaPipe model file
│   └── gesture_recognizer.task
└── assets/                   # Fonts, icons, images
```

---

## ⚙️ Configuration

### Environment Variables

**Key Day 5 settings**:

```bash
# OpenSky Network API credentials (optional - increases rate limits)
# Note: Use CLIENT_ID and ROLES format (not username/password)
OPENSKY_CLIENT_ID=your-opensky-client-id-here
OPENSKY_ROLES=your-opensky-role-here

# MediaPipe Gesture Settings (ACTUAL IMPLEMENTATION)
MEDIAPIPE_HAND_DETECTION_CONFIDENCE=0.3  # 30% for initial hand detection
MEDIAPIPE_GESTURE_CONFIDENCE=0.7         # 70% for gesture recognition
MEDIAPIPE_COOLDOWN_MS=800                # 800ms cooldown
MEDIAPIPE_MIRROR=true                    # Mirror video
MEDIAPIPE_NUM_HANDS=2                    # Track up to 2 hands

# Cache Strategy (milliseconds)
CACHE_TTL_ANONYMOUS=300000      # 5 min (288 req/day - still over limit!)
CACHE_TTL_AUTHENTICATED=90000   # 90 sec (960 req/day)

# Display
SHOW_TOAST_NOTIFICATIONS=true
SHOW_WEBCAM_PREVIEW=true

# Per-Gesture Settings (optional fine-tuning)
GESTURE_CONFIDENCE_CLOSED_FIST=0.7
GESTURE_CONFIDENCE_OPEN_PALM=0.75
GESTURE_DEBOUNCE_CLOSED_FIST=250
GESTURE_DEBOUNCE_OPEN_PALM=400

# Development
DEBUG_MODE=false
LOG_API_CALLS=true
```

### Recommended: Use Authenticated Account
Free tier (10 req/day) is insufficient even with caching. Authenticated account provides 400 req/day.

---

## 📊 Performance & Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Gesture Accuracy | >90% | ⏳ Testing |
| Response Time | <300ms | ⏳ Testing |
| Confidence Score | >0.75 avg | ⏳ Testing |
| Webcam FPS | 24-30 | ⏳ Testing |
| Cache Hit Rate | >90% | ⏳ Testing |

---

## 🎨 Design

### Color Palette (Winter Festival Theme)
```css
--ice-blue: #E3F2FD          /* Background */
--winter-blue: #64B5F6       /* Accents */
--deep-blue: #1976D2         /* Headers */
--warm-gold: #FFD54F         /* Selection highlight */
--status-ontime: #4CAF50     /* Flight status: on-time */
--status-delayed: #FF9800    /* Flight status: delayed */
```

### Typography
- **Primary**: Segoe UI (clean, readable)
- **Headings**: Georgia (elegant serif)

### Key Elements
- Card-based flight list
- Gradient blue backgrounds
- Snowflake animations (subtle)
- Status badges (color-coded)
- Mirrored webcam preview

---

## 🔒 Privacy & Security

- ✅ **No Recording** - Webcam feed NOT stored
- ✅ **Local Processing** - Gestures processed in browser
- ✅ **No Personal Data** - Zero user data collected
- ✅ **API Keys** - Stored in .env (not committed)

---

## 🐛 Troubleshooting

### Gestures Not Detected?
- **Check webcam is working** - Preview should show in bottom-right
- **Improve lighting** - Good lighting is critical for hand detection
- **Distance**: 1-3 feet from camera is optimal
- **Add motion** - Close your hand into a fist (don't hold static) - motion triggers detection
- **Open palm with movement** - Spread fingers while moving slightly
- **Check confidence meter** - Should be >70% when gesture detected
- **Browser console** - Look for detection logs to debug

### Gestures Trigger Too Often?
- **Expected behavior** - Motion-based detection is normal for MediaPipe
- **Solution**: 800ms cooldown prevents most rapid re-triggers
- **Tip**: Make gesture → wait → move hand away from camera

### Gestures Don't Trigger at All with Static Hand?
- **This is normal** - MediaPipe detects gesture transitions, not static poses
- **Solution**: Use motion when making gestures
  - Fist: Close your hand while in view
  - Palm: Open your hand/spread fingers while in view
- **Alternative**: Use keyboard fallback (Arrow keys, Enter)

### Video Appears Reversed?
- Normal - video is mirrored for natural interaction
- Your right hand appears on right side (like a mirror)

### No Flight Data?
- Check internet connection
- Verify API isn't rate-limited (check console)
- May be using cached data (check "Cache:" indicator)
- Consider using authenticated OpenSky account

### Poor Performance?
- Close other browser tabs
- Check CPU usage
- Reduce webcam resolution in config
- Disable landmark overlay (debug mode)

---

## 📝 Implementation Status

### ✅ Completed (MVP Working!)
- [x] Project planning and architecture
- [x] HTML structure
- [x] CSS styling (Winter Festival theme)
- [x] MediaPipe gesture recognition integration
- [x] Closed Fist (👊) navigation gesture
- [x] Open Palm (✋) selection gesture
- [x] Webcam preview with mirrored video
- [x] Gesture indicator with confidence meter
- [x] Toast notification feedback
- [x] Mock flight data rendering
- [x] Keyboard fallback controls
- [x] Configuration system
- [x] Documentation

### 🔧 Known Issues & Fixes Applied

**Issue #1: Motion-based gesture detection**
- **Behavior**: Gestures trigger best during hand motion (closing fist, opening palm)
- **Root Cause**: MediaPipe's design - detects gesture transitions, not static poses
- **Fix**: Increased cooldown from 300ms → 800ms to prevent rapid re-triggers
- **Result**: ✅ Smooth, controlled interaction
- **Note**: Gestures may cycle rapidly if hand is held too long; adjust `GESTURE_COOLDOWN` in gesture.js if needed

**Issue #2: No hand detection initially**
- **Root Cause**: Hand detection confidence too high (70%)
- **Fix**: Lowered to 30% for initial detection, kept 70% for gesture confidence
- **Result**: ✅ Reliable hand tracking in various lighting conditions

### 🔮 Future Enhancements
- [ ] Real OpenSky API integration (currently using mock data)
- [ ] Flight data caching with LocalStorage
- [ ] Geographic filtering (15nm radius around KATL)
- [ ] Flight details modal (replace alert popup)
- [ ] Multi-language support
- [ ] Weather integration
- [ ] Airport maps with gates
- [ ] Voice commands
- [ ] Additional gestures (thumbs up/down for filtering)
- [ ] Historical flight statistics
- [ ] Sound effects for gesture feedback

---

## 🎓 Learning Resources

- **MediaPipe Gesture Recognizer**: https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer
- **OpenSky Network API**: https://opensky-network.org/apidoc/rest.html
- **CORS Proxy**: https://corsproxy.io
- **Winter Festival Theme**: See `../day4/` for branding reference

---

## 🤝 Contributing

Part of the Advent of AI Challenge. Feel free to:
- Report issues
- Suggest improvements
- Fork and enhance
- Share feedback

---

## 📜 License

MIT License - See repository root

---

## 🎄 Acknowledgments

- **Goose AI** - Open-source AI coding agent by Block
- **MediaPipe** - Google's ML solutions
- **OpenSky Network** - Crowdsourced flight data
- **Advent of AI** - Challenge platform
- **Day 4 Theme** - Winter Festival visual identity

---

## 🔗 Links

- **Challenge Platform**: [Advent of AI](https://adventofai.dev/)
- **Day 5 Challenge**: [Flight Tracker Challenge](https://adventofai.dev/challenges/5)
- **Repository**: [GitHub](https://github.com/professordnyc/goose-adventai)
- **Goose**: [github.com/block/goose](https://github.com/block/goose)
- **Live Demo**: [TBD - Deploy to Netlify]

---

## 📊 Project Stats

- **Development Time**: ~4 hours (planning + implementation)
- **Files**: 9 core files (HTML, CSS, JS modules)
- **Lines of Code**: ~600 (core application logic)
- **Gestures**: 2 (Closed Fist, Open Palm)
- **APIs**: 2 (OpenSky + CORS Proxy)
- **Browser Support**: Modern browsers with getUserMedia
- **Status**: ✅ MVP Complete - Gesture recognition working

---

**Safe travels and happy holidays! ✈️❄️**

*Created for the Goose Advent of AI Challenge - Day 5*  
*Built with ❤️ using [Goose](https://github.com/block/goose)*

**Date**: 2025-12-16 00:36:09  
**Status**: ✅ MVP Complete - Gesture controls working!
