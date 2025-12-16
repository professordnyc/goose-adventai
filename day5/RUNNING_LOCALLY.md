# 🚀 Running the Flight Tracker Locally

**Comprehensive guide to set up and run the Day 5 Flight Tracker project on your local machine.**

🎄 [Advent of AI Challenge](https://adventofai.dev/) • [Day 5: Flight Tracker](https://adventofai.dev/challenges/5)

---

## ⚡ Quick Start (TL;DR)

```bash
# 1. Clone and navigate
git clone https://github.com/professordnyc/goose-adventai.git
cd goose-adventai/day5

# 2. Download MediaPipe model
mkdir models
curl -o models/gesture_recognizer.task https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task

# 3. Start server
python -m http.server 8000

# 4. Open browser
# Navigate to http://localhost:8000
```

**Time**: 5-10 minutes

---

## 📋 Prerequisites

### Required
- ✅ **Modern Web Browser** (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- ✅ **Webcam** (built-in or external USB camera)
- ✅ **Internet Connection** (for flight data API)
- ✅ **Local Web Server** - Choose one:
  - **Python 3** (recommended - usually pre-installed)
  - **Node.js** (for `npx serve`)
  - **VS Code** with Live Server extension

### Optional (for increased API limits)
- OpenSky Network account (free registration)

### System Requirements
- **OS**: Windows 10/11, macOS 10.14+, Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: ~50MB for project files + model

---

## 🛠️ Detailed Setup Instructions

### Step 1: Clone the Repository

**Using Git:**
```bash
# Clone the entire project
git clone https://github.com/professordnyc/goose-adventai.git

# Navigate to Day 5 folder
cd goose-adventai/day5
```

**Alternative - Download ZIP:**
1. Go to https://github.com/professordnyc/goose-adventai
2. Click "Code" → "Download ZIP"
3. Extract and navigate to the `day5` folder

---

### Step 2: Download MediaPipe Model

The gesture recognizer requires a pre-trained model file (~10MB).

**⚠️ Important**: This file is NOT included in the repository due to size.

#### Option A: Using curl (Mac/Linux/Git Bash on Windows)

```bash
# Create models directory
mkdir models

# Download the model file
curl -o models/gesture_recognizer.task \
  https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task
```

#### Option B: Using PowerShell (Windows)

```powershell
# Create models directory
New-Item -ItemType Directory -Force -Path models

# Download the model file
Invoke-WebRequest `
  -Uri "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task" `
  -OutFile "models/gesture_recognizer.task"
```

#### Option C: Using wget (Linux)

```bash
mkdir models
wget -O models/gesture_recognizer.task \
  https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task
```

#### Option D: Manual Download

1. Create a `models` folder in the `day5` directory
2. Visit: https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task
3. Save the file as `gesture_recognizer.task` in the `models` folder

**Verify**: The file should be ~10MB. If it's much smaller, the download failed.

---

### Step 3: Configure Environment (Optional but Recommended)

**⚠️ Critical**: All environment variables are in the **repository root ONLY**.

**There is NO `env.example` in the `/day5` folder** - all configuration is at the root level.

**To increase API rate limits from 10 to 400 requests/day**:

1. **Create an OpenSky account** (free):
   - Visit: https://opensky-network.org/index.html#registration
   - Sign up and verify your email

2. **Navigate to repository root**:
   ```bash
   # If you're in day5 folder, go up one level
   cd ..
   
   # You should now be in: /goose-adventai/
   # Verify env.example exists here
   ls env.example  # Mac/Linux
   dir env.example # Windows
   ```

3. **Create `.env` file from root `env.example`**:
   ```bash
   
   # Copy the example template to .env
   cp env.example .env
   ```

4. **Edit the root `.env` file**:
   ```bash
   # Add your credentials
   OPENSKY_CLIENT_ID=your_client_id_here
   OPENSKY_ROLES=your_roles_here
   ```

**Note**: Without authentication, you're limited to 10 API requests per day, which is insufficient even with caching.

---

### Step 4: Start a Local Web Server

**⚠️ Critical**: You MUST use a local web server. Simply opening `index.html` in your browser will NOT work due to:
- ES6 module imports
- Webcam API security requirements
- CORS policies

#### Method 1: Python (Recommended)

**Python 3** (most common):
```bash
python -m http.server 8000
```

**Python 2** (if you only have Python 2):
```bash
python -m SimpleHTTPServer 8000
```

**Check Python version**:
```bash
python --version
# or
python3 --version
```

#### Method 2: Node.js / NPM

**Using npx** (no installation needed):
```bash
npx serve -p 8000
```

**Using http-server** (install globally):
```bash
# Install once
npm install -g http-server

# Run
http-server -p 8000
```

#### Method 3: VS Code Live Server

1. Open `day5` folder in VS Code
2. Install "Live Server" extension (by Ritwick Dey)
3. Right-click `index.html`
4. Select "Open with Live Server"
5. Server starts automatically (usually port 5500)

#### Method 4: PHP (if installed)

```bash
php -S localhost:8000
```

#### Method 5: Other Options

**Browser Sync**:
```bash
npx browser-sync start --server --files "*.html, *.css, *.js" --port 8000
```

**Caddy** (if installed):
```bash
caddy file-server --listen :8000
```

---

### Step 5: Open in Browser

1. **Start your web server** (using one of the methods above)
2. **Open your browser**
3. **Navigate to**: http://localhost:8000
   - Or http://localhost:5500 (if using VS Code Live Server)
   - Or whichever port your server is using

4. **Allow webcam access**:
   - Browser will prompt for camera permission
   - Click "Allow" or "Permit"

5. **Position yourself**:
   - Sit 1-3 feet from the camera
   - Ensure good lighting
   - Face the camera directly

6. **Test gestures**:
   - 👊 **Closed Fist** - Navigate
   - ✋ **Open Palm** - Select

---

## 🖥️ Platform-Specific Instructions

### Windows

**Command Prompt:**
```cmd
cd C:\Users\YourName\Documents\goose-adventai\day5
python -m http.server 8000
```

**PowerShell:**
```powershell
cd C:\Users\YourName\Documents\goose-adventai\day5
python -m http.server 8000
```

**Git Bash:**
```bash
cd /c/Users/YourName/Documents/goose-adventai/day5
python -m http.server 8000
```

### macOS

**Terminal:**
```bash
cd ~/Documents/goose-adventai/day5
python3 -m http.server 8000
```

### Linux (Ubuntu/Debian)

```bash
cd ~/Documents/goose-adventai/day5
python3 -m http.server 8000
```

---

## ✅ Verification Checklist

After starting the server and opening the browser, verify:

- [ ] Page loads without 404 errors
- [ ] Browser console shows no critical errors (press F12)
- [ ] Browser prompts for webcam permission
- [ ] Webcam preview appears (bottom-right corner)
- [ ] Gesture indicator visible (bottom-left corner)
- [ ] Header shows "❄️ Winter Festival Flight Tracker"
- [ ] Footer displays correctly
- [ ] No CORS errors in console
- [ ] "Loading flight data..." message appears

**If all checked**: ✅ You're ready to go!

---

## 🔧 Troubleshooting

### Problem: "python: command not found"

**Solution**:
- **Windows**: 
  1. Install Python from https://python.org/downloads
  2. **Important**: Check "Add Python to PATH" during installation
  3. Restart terminal
  
- **Mac**: Try `python3` instead of `python`

- **Alternative**: Use Node.js method or VS Code Live Server

---

### Problem: "Port 8000 already in use"

**Solution**:
```bash
# Use a different port
python -m http.server 8080

# Then open http://localhost:8080
```

**Or find and kill the process**:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8000 | xargs kill
```

---

### Problem: "Module not found" errors in console

**Cause**: Opening `index.html` directly instead of using a web server

**Solution**:
- ❌ DON'T: `file:///C:/Users/name/day5/index.html`
- ✅ DO: `http://localhost:8000`

Ensure you're running a web server and accessing via `http://localhost`.

---

### Problem: Webcam not working

**Solutions**:
1. **Check permissions**:
   - Chrome: chrome://settings/content/camera
   - Firefox: about:preferences#privacy → Permissions → Camera
   
2. **Camera in use by another app**:
   - Close Zoom, Teams, Skype, etc.
   - Restart browser

3. **HTTPS required**:
   - Some browsers require HTTPS for webcam
   - Use a local HTTPS server or try Chrome/Firefox

4. **Hardware check**:
   ```bash
   # Test camera with native app
   # Windows: Camera app
   # Mac: Photo Booth
   ```

---

### Problem: CORS errors for OpenSky API

**This is normal!** The app uses `https://corsproxy.io` to handle CORS.

**Verify**:
- Check internet connection
- Open browser console (F12) → Network tab
- Look for requests to `corsproxy.io`

**If still failing**:
- Check if corsproxy.io is accessible
- Try again later (service may be down)
- Check for firewall/proxy blocking

---

### Problem: No flight data appearing

**Possible causes**:

1. **API rate limit reached**:
   - Anonymous: 10 requests/day (very limited!)
   - Solution: Add OpenSky credentials to `.env`

2. **No flights in area**:
   - Check time of day (fewer flights at night)
   - Verify KATL has arriving traffic

3. **Caching issue**:
   - Check "Cache:" indicator in info bar
   - Clear browser localStorage:
     ```javascript
     // In console (F12)
     localStorage.clear();
     location.reload();
     ```

4. **API down**:
   - Check https://opensky-network.org status
   - Check browser console for errors

---

### Problem: Poor gesture recognition

**Solutions**:
1. **Improve lighting** - Face a light source
2. **Adjust distance** - Move to 1-3 feet from camera
3. **Make clear gestures** - Deliberate, slow movements
4. **Check confidence meter** - Should be >70%
5. **Clean camera lens**
6. **Reduce background clutter** - Plain background helps

---

## 🌐 Accessing from Mobile/Tablet (Optional)

To test on mobile devices on your local network:

### Step 1: Find Your Local IP

**Windows (Command Prompt)**:
```cmd
ipconfig
# Look for "IPv4 Address" under your active connection
```

**Mac/Linux (Terminal)**:
```bash
ifconfig
# or
ip addr show
# Look for inet address (e.g., 192.168.1.100)
```

### Step 2: Start Server on All Interfaces

```bash
python -m http.server 8000 --bind 0.0.0.0
```

### Step 3: Access from Mobile

On your phone/tablet browser:
```
http://YOUR_LOCAL_IP:8000

Example: http://192.168.1.100:8000
```

**Requirements**:
- Mobile device on same WiFi network
- Firewall allows incoming connections on port 8000

---

## 📦 Complete First-Time Setup Script

**Copy-paste this into your terminal for automatic setup:**

### Mac/Linux

```bash
#!/bin/bash
# Day 5 Flight Tracker Setup Script

echo "📥 Cloning repository..."
git clone https://github.com/professordnyc/goose-adventai.git
cd goose-adventai/day5

echo "📦 Downloading MediaPipe model..."
mkdir -p models
curl -o models/gesture_recognizer.task \
  https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task

echo "📝 Creating .env template..."
cp env.example .env
echo "⚠️  Edit .env to add your OpenSky credentials (optional)"

echo "✅ Setup complete!"
echo "🚀 Starting server..."
python3 -m http.server 8000
```

### Windows (PowerShell)

```powershell
# Day 5 Flight Tracker Setup Script

Write-Host "📥 Cloning repository..." -ForegroundColor Green
git clone https://github.com/professordnyc/goose-adventai.git
Set-Location goose-adventai\day5

Write-Host "📦 Downloading MediaPipe model..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path models
Invoke-WebRequest `
  -Uri "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task" `
  -OutFile "models/gesture_recognizer.task"

Write-Host "📝 Creating .env template..." -ForegroundColor Green
Copy-Item env.example .env
Write-Host "⚠️  Edit .env to add your OpenSky credentials (optional)" -ForegroundColor Yellow

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host "🚀 Starting server..." -ForegroundColor Green
python -m http.server 8000
```

---

## 🔄 Daily Usage (After Initial Setup)

Once set up, you only need:

```bash
# 1. Navigate to project
cd goose-adventai/day5

# 2. Start server
python -m http.server 8000

# 3. Open http://localhost:8000 in browser

# That's it!
```

**Time**: 30 seconds ⚡

---

## 🎯 Success Criteria

You'll know everything is working when:

✅ Webcam preview shows your face (mirrored)  
✅ Gesture indicator responds to your hand  
✅ Making a fist shows "👊 Navigate" toast  
✅ Opening palm shows "✋ Select" toast  
✅ Confidence meter shows >70% when gesturing  
✅ Flight list appears (or "Loading..." message)  
✅ No errors in browser console (F12)  

---

## 📞 Need Help?

If you're still stuck:

1. **Check the Troubleshooting section** above
2. **Open browser console** (F12) and look for error messages
3. **Verify all files are present**:
   ```bash
   ls -la
   # Should see: index.html, style.css, main.js, config.js, models/
   ```
4. **Check file permissions** (Mac/Linux):
   ```bash
   chmod +r *.html *.css *.js
   ```

---

## 🎉 You're Ready!

Once the server is running and the page loads:

1. **Position yourself** 1-3 feet from camera
2. **Make a fist** 👊 to navigate flights
3. **Open your palm** ✋ to select a flight
4. **Watch the indicators** for feedback

**Enjoy your gesture-controlled flight tracker!** ✈️❄️

---

## 🔗 Helpful Links

- **Advent of AI**: https://adventofai.dev/
- **Day 5 Challenge**: https://adventofai.dev/challenges/5
- **Project Repository**: https://github.com/professordnyc/goose-adventai
- **Goose AI**: https://github.com/block/goose

---

**Last Updated**: 2025-12-15 22:09:51
