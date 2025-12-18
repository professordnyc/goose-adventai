# 🎄 Fun House Photo Booth 📸

**Links:**
- [Advent of AI Day 11 Challenge](https://adventofai.dev/challenges/11)
- [Advent of AI Homepage](https://adventofai.dev)

---

## 🎅 Overview

Welcome to the **Fun House Photo Booth** - a festive web application that brings holiday cheer to your photos! This interactive photo booth uses real-time face detection to apply fun winter-themed filters, allowing you to capture and download memorable snapshots with your friends and family.

Built as part of the Advent of AI Day 11 challenge, this project demonstrates the power of web technologies combined with machine learning for creating engaging user experiences.

---

## ✨ Features

### 🎨 Three Festive Filters

1. **✨ Sparkle Filter**
   - Dynamic sparkle effects that orbit around your face
   - Shimmering gold particles with smooth animations
   - Creates a magical, festive atmosphere

2. **⛄ Snowman Filter**
   - Classic carrot nose overlay
   - Coal button decorations on your chest
   - Coal eyes for that authentic snowman look

3. **🎄 Christmas Tree Hat**
   - Festive Christmas tree positioned above your head
   - Golden star topper
   - Colorful ornament decorations
   - Wooden trunk for authenticity

### 📷 Core Functionality

- **Real-time Camera Access**: Utilizes device camera (front-facing preferred)
- **Face Detection**: Powered by MediaPipe Face Detection for accurate facial landmark tracking
- **Dual View Display**: 
  - **Left Panel**: Live preview with real-time filter application
  - **Right Panel**: Last captured photo for review
- **Photo Capture**: Take snapshots with your chosen filter applied
  - Visual flash effect on capture
  - Success toast notification
- **Photo Download**: Save your festive photos to your device with timestamped filenames
  - Warning if attempting to download without capturing first
  - Success confirmation toast
- **Filter Switching**: Seamlessly toggle between filters in real-time
- **Toast Notifications**: User-friendly feedback for all actions
- **Mobile Responsive**: Works beautifully on desktop, tablet, and mobile devices

### 🎨 Winter-Themed Design

- Beautiful winter color palette (ice blue, snow white, warm gold)
- **Falling Snowflakes**: Animated snowflakes cascading down the screen at varying speeds
- Smooth, professional UI with rounded corners and shadows
- Responsive layout that adapts to all screen sizes
- Frosted glass effects with backdrop blur

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A device with a camera
- Internet connection (for MediaPipe CDN)

### Installation

1. **Clone or download this repository:**
   ```bash
   git clone <repository-url>
   cd fun-house-photo-booth
   ```

2. **Open the application:**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended for best performance):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```
   - Navigate to `http://localhost:8000` in your browser

3. **Allow camera permissions:**
   - When prompted, click "Allow" to grant camera access
   - The application requires camera permissions to function

---

## 📖 Usage Guide

### Step-by-Step Instructions

1. **Open the App**
   - Launch `index.html` in your browser
   - Grant camera permissions when prompted
   - You'll see two panels: **Live Preview** (left) and **Last Captured Photo** (right)

2. **Choose Your Filter**
   - Click on one of the filter buttons:
     - **None**: No filter applied (plain camera view)
     - **✨ Sparkle**: Adds magical sparkle effects around your face
     - **⛄ Snowman**: Transforms you into a snowman with carrot nose and coal buttons
     - **🎄 Tree Hat**: Adds a festive Christmas tree hat above your head
   - Watch the live preview update in real-time with your selected filter

3. **Position Yourself**
   - Make sure your face is clearly visible in the live preview
   - The face detection works best in good lighting
   - Center your face in the frame for best results
   - Enjoy watching the falling snowflakes in the background!

4. **Capture Your Photo**
   - Click the **"📷 Capture Photo"** button
   - You'll see:
     - A brief flash effect on the live preview
     - A success toast notification: "📸 Photo captured successfully!"
     - Your photo will appear in the right panel (Last Captured Photo)
     - The download button will become enabled

5. **Download Your Photo**
   - Click the **"💾 Download Photo"** button
   - If you haven't captured a photo yet, you'll see a warning: "⚠️ Please capture a photo first!"
   - Your photo will be saved with a timestamp filename
   - Success toast will confirm: "💾 Photo downloaded successfully!"
   - Example filename: `fun-house-photo-2025-12-18T16-22-45-123Z.png`

### Tips for Best Results

- **Lighting**: Use good, even lighting for best face detection
- **Distance**: Position yourself 2-3 feet from the camera
- **Movement**: Try to stay relatively still for clearer photos
- **Angles**: Experiment with different angles for fun effects
- **Multiple People**: Some filters work with multiple faces detected!

---

## 🛠️ Technical Architecture

### Project Structure

```
fun-house-photo-booth/
├── index.html          # Main HTML structure with dual view panels
├── app.js              # Core application logic and filters
├── style.css           # Winter-themed styling with snowflakes
├── tests/
│   └── test.html      # Test suite
├── README.md           # This file
└── plan.md            # Project planning document
```

### Technology Stack

#### Frontend
- **HTML5**: Semantic markup and Canvas API
- **CSS3**: Modern styling with animations and responsive design
- **Vanilla JavaScript**: No framework dependencies for lightweight performance

#### Libraries & APIs
- **MediaPipe Face Detection**: Real-time face detection and landmark tracking
  - Model: 'short' (optimized for speed)
  - Confidence threshold: 0.5
  - CDN: `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/`
- **getUserMedia API**: Camera access
- **Canvas API**: Real-time video rendering and filter application

#### Key Features Implementation

**Dual Canvas System:**
```javascript
1. Live Preview Canvas - Real-time rendering with filters
2. Captured Photo Canvas - Shows last captured image
3. Hidden video element feeds both canvases
```

**Face Detection Pipeline:**
```javascript
1. Initialize MediaPipe Face Detection
2. Process video frames (every 3 frames for performance)
3. Detect faces and extract bounding boxes
4. Apply filters based on face landmarks
5. Render to canvas at 30+ FPS
```

**Filter Rendering:**
- **Sparkle**: Particle system with orbital animation
- **Snowman**: Geometric shapes positioned using face landmarks
- **Tree Hat**: Layered canvas drawings with dynamic positioning

**User Feedback System:**
- **Toast Notifications**: Success, warning, and info messages
- **Visual Effects**: Flash animation on capture
- **Progressive Enhancement**: Graceful degradation if features unavailable

**Performance Optimizations:**
- Face detection runs every 3rd frame
- `requestAnimationFrame` for smooth rendering
- Efficient canvas drawing operations
- Minimal DOM manipulation

### Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |

---

## 🧪 Testing

The project includes a comprehensive test suite to validate functionality.

### Running Tests

1. Open `tests/test.html` in your browser
2. Click **"▶️ Run All Tests"** to execute the full suite
3. Or run individual test categories:
   - **Camera Access Tests**: Verify camera permissions and stream initialization
   - **Filter Tests**: Validate filter toggle and face detection
   - **Capture & Download Tests**: Test photo capture and download functionality
   - **Responsive Design Tests**: Ensure mobile compatibility

### Test Categories

**📷 Camera Access Tests (3 tests)**
- Camera permission request works
- Video stream initialization
- Error handling for denied permissions

**✨ Filter Tests (5 tests)**
- Face detection library loads
- Sparkle filter toggle works
- Snowman filter toggle works
- Christmas tree filter toggle works
- Filter switching works smoothly

**📸 Capture & Download Tests (4 tests)**
- Capture button creates snapshot
- Download button enables after capture
- Download triggers file save
- Visual feedback on capture

**📱 Responsive Design Tests (3 tests)**
- Layout works on mobile viewports
- Buttons are touch-friendly
- Canvas resizes appropriately

---

## 🎯 Development Notes

### Performance Considerations

- **Target FPS**: 30+ frames per second
- **Face Detection**: Processed every 3 frames to maintain performance
- **Canvas Size**: Dynamically adjusted based on video stream dimensions
- **Memory Management**: Proper cleanup of video streams and animation frames

### Recent Enhancements

**Version 1.1 Updates:**
- Added dual view system (live preview + captured photo)
- Implemented toast notification system for user feedback
- Added falling snowflakes animation
- Improved visual feedback on photo capture (flash effect)
- Enhanced download protection (warns if no photo captured)
- Better mobile responsiveness with single-column layout

### Known Limitations

- Face detection accuracy depends on lighting conditions
- Some filters may not align perfectly with all face shapes
- Mobile devices may experience slightly reduced performance
- Requires internet connection for MediaPipe library (CDN)

### Future Enhancements

Potential improvements for future versions:
- Add more filter options (Santa hat, reindeer antlers, etc.)
- Implement filter intensity controls
- Add photo gallery to view captured photos
- Support for video recording with filters
- Offline mode with bundled MediaPipe
- Social sharing functionality
- Custom filter creator

---

## 🐛 Troubleshooting

### Camera Not Working

**Problem**: Camera feed doesn't appear
- **Solution 1**: Check browser permissions (look for camera icon in address bar)
- **Solution 2**: Ensure no other application is using the camera
- **Solution 3**: Try a different browser
- **Solution 4**: Restart your browser and try again

### Sparkle Filter Not Showing

**Problem**: Sparkle filter button pressed but no sparkles visible
- **Solution 1**: Make sure your face is detected (good lighting helps)
- **Solution 2**: Move closer to the camera
- **Solution 3**: Wait a moment for face detection to initialize
- **Solution 4**: Try the "None" filter then switch back to "Sparkle"

### Face Detection Not Working

**Problem**: Filters not appearing or misaligned
- **Solution 1**: Ensure good lighting conditions
- **Solution 2**: Position your face clearly in the frame
- **Solution 3**: Try moving closer or farther from the camera
- **Solution 4**: Check browser console for errors (F12)

### Poor Performance

**Problem**: Choppy video or slow filter rendering
- **Solution 1**: Close other browser tabs and applications
- **Solution 2**: Try using a different browser (Chrome recommended)
- **Solution 3**: Ensure you have a stable internet connection
- **Solution 4**: Reduce browser zoom level to 100%

### Download Not Working

**Problem**: Download button doesn't save the photo
- **Solution 1**: Capture a photo first (look for the toast notification)
- **Solution 2**: Check browser download permissions
- **Solution 3**: Check your downloads folder
- **Solution 4**: Try a different browser

### Toast Notifications Not Appearing

**Problem**: Success/warning messages not showing
- **Solution 1**: Check if browser zoom is affecting positioning
- **Solution 2**: Ensure JavaScript is enabled
- **Solution 3**: Try refreshing the page
- **Solution 4**: Check browser console for errors

### Mobile Issues

**Problem**: App not working on mobile device
- **Solution 1**: Use HTTPS (required for camera access on mobile)
- **Solution 2**: Grant camera permissions when prompted
- **Solution 3**: Try rotating device to portrait mode for better view
- **Solution 4**: Clear browser cache and reload

---

## 📄 License

This project was created for the Advent of AI challenge. Feel free to use, modify, and distribute as needed for personal or educational purposes.

---

## 🙏 Acknowledgments

- **Advent of AI**: For the inspiring challenge and community
- **MediaPipe**: For the excellent face detection library
- **Winter Theme Inspiration**: Adapted from day4/day5 Advent of AI projects
- **Community**: Thanks to all the creators and testers

---

## 📞 Support

If you encounter issues or have questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [Usage Guide](#-usage-guide)
3. Run the [Test Suite](#-testing) to identify issues
4. Visit [Advent of AI](https://adventofai.dev) for community support

---

## 🎄 Happy Holidays! 🎅

Enjoy creating festive memories with the Fun House Photo Booth! Share your creative photos and spread the holiday cheer! ⛄✨🎄

---

**Created with ❄️ for Advent of AI Day 11**
