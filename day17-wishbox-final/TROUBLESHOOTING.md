# 🔧 Troubleshooting Guide

Complete troubleshooting guide for the Winter Fairy Wishbox MCP-UI extension.

---

## 🚨 Most Common Issue: "Unexpected response type"

### Problem

When you try to use the wishbox tools in Goose, you see:
```
The tool call returned the following error:
-32603: -32603: Unexpected response type
```

### Solution

**⚠️ You MUST restart Goose Desktop completely!**

1. **Quit Goose Desktop entirely** (not just close the window)
2. **Reopen Goose Desktop** from your applications
3. **Start a new conversation**

### Why This Happens

Goose Desktop needs to fully restart after adding a new MCP extension to initialize the MCP-UI rendering engine. The extension is loaded in the configuration, but the rendering engine isn't initialized until restart.

**This is not a bug - it's by design!**

---

## 📋 Checklist Before Asking for Help

Run through this checklist:

- [ ] Server is running (`npm run dev`)
- [ ] Server shows no errors in terminal
- [ ] Extension is added in Goose Settings → Extensions
- [ ] Extension URI is exactly `http://localhost:3000/mcp`
- [ ] **Goose Desktop has been completely restarted**
- [ ] You're in a new conversation (not an old one)

If all checked and still having issues, continue below.

---

## 🖥️ Server Issues

### Server Won't Start

**Error: Port 3000 already in use**

```powershell
# Windows PowerShell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill that process (replace 12345 with actual PID)
taskkill /PID 12345 /F

# Try starting server again
npm run dev
```

**Error: Cannot find module**

```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Try again  
npm run dev
```

**Error: TypeScript compilation errors**

```bash
# Clean build
npm run build

# If that fails, check Node.js version
node --version
# Should be 18 or higher

# Reinstall with correct Node version
nvm use 18  # if using nvm
npm install
npm run dev
```

### Server Crashes or Stops

**Check the terminal for error messages:**
- Syntax errors in TypeScript
- Port conflicts
- Missing dependencies

**Solution:**
1. Stop server (Ctrl+C)
2. Fix any code issues
3. Restart: `npm run dev`

### Server Runs But No Response

**Test with curl:**
```bash
curl http://localhost:3000
```

**Expected response:**
```
🎄 Winter Fairy Wishbox Server is running! ❄️
MCP Endpoint: POST /mcp
```

**If no response:**
- Check firewall settings
- Verify localhost resolution
- Try `curl http://127.0.0.1:3000`

---

## 🔌 Extension Connection Issues

### Extension Not Showing in Goose

**Check configuration:**
1. Open Goose Desktop
2. Go to Settings → Extensions
3. Look for "Winter Fairy Wishbox"
4. Should show as "enabled: true"

**If not there:**
- Re-add the extension with exact configuration
- Restart Goose Desktop

### Tools Not Available

**Check in Goose:**
```
What tools do you have available?
```

Should list: `addWish`, `listWishes`, `grantWish`, `removeWish`

**If not listed:**
1. Check server is running
2. Verify extension URI in settings
3. Restart Goose Desktop
4. Check server logs for connection attempts

### "Unexpected response type" Error

**This is the #1 most common issue!**

**Solution:**
1. **Completely quit Goose Desktop**
2. **Reopen it**
3. **Start a NEW conversation**

**Why:**
- MCP-UI rendering engine not initialized
- Old conversation cache
- Extension added but not loaded properly

**Still not working?**
1. Remove extension from Goose settings
2. Restart Goose  
3. Re-add extension with exact config
4. Restart Goose again
5. New conversation

---

## 🎨 UI Rendering Issues

### Seeing Text Instead of Beautiful UI

**Problem:** Tools work but show plain text, not the winter-themed UI

**Causes:**
1. Goose Desktop not restarted
2. Old conversation loaded
3. MCP-UI not supported in your Goose version

**Solutions:**
1. **Restart Goose Desktop** (solves 90% of cases)
2. Start a new conversation
3. Update to latest Goose Desktop version
4. Check compatibility: MCP-UI requires recent Goose versions

### HTML Shows as Text

**Problem:** You see raw HTML code instead of rendered UI

**This means:**
- MCP-UI renderer is not active
- Extension not properly loaded

**Solution:**
- Restart Goose Desktop completely
- Check you're using `streamable_http` type (not just `http`)

### Partial UI Rendering

**Problem:** Some parts render, others don't

**Solution:**
1. Clear browser cache (if viewing in browser)
2. Check console for CSS/JS errors
3. Verify HTML is complete (no truncation)

---

## 🧪 Testing and Debugging

### Test the Server Independently

**Use PowerShell Scripts:**

```powershell
# Test MCP protocol
./test-mcp.ps1

# Should show:
# ✅ Initialize Response
# ✅ Tools List Response  
# ✅ Add Wish Response
```

```powershell
# Test wishbox and view UI
./list-wishes.ps1

# Should:
# - Query wishes successfully
# - Save wishbox-ui.html
# - Open in browser
```

**If scripts fail:**
- Server not running
- Server on different port
- PowerShell execution policy blocked

### View Generated HTML

```powershell
# Generate UI HTML file
./list-wishes.ps1

# Opens wishbox-ui.html in browser
# This shows EXACTLY what Goose should render
```

**If HTML looks good in browser but not in Goose:**
- Goose needs restart
- MCP-UI not enabled

### Check Server Logs

Watch the server terminal while using tools:

```
You should see:
📬 POST /mcp - tools/call - addWish
📬 POST /mcp - tools/call - listWishes
```

**If no logs when using tools:**
- Goose not connecting to server
- Wrong URI in extension config
- Server not running

---

## 📝 Common Configuration Mistakes

### Wrong URI

**❌ Incorrect:**
- `http://localhost:3000` (missing `/mcp`)
- `http://127.0.0.1:3000/mcp` (use localhost)
- `https://localhost:3000/mcp` (should be http, not https)
- `localhost:3000/mcp` (missing http://)

**✅ Correct:**
```
http://localhost:3000/mcp
```

### Wrong Extension Type

**❌ Incorrect:**
- `http` (should be streamable_http)
- `sse` (server-sent events, not for this project)

**✅ Correct:**
```
streamable_http
```

### Extension Disabled

**Check in Goose Settings:**
- Extension should show `enabled: true`
- Toggle it on if it's off

---

## 🔍 Advanced Debugging

### Check Extension Configuration File

```powershell
# View Goose config
notepad C:/Users/<YourUsername>/AppData/Roaming/Block/goose/config/config.yaml
```

Look for:
```yaml
winterfairywishbox:
  enabled: true
  type: streamable_http
  name: Winter Fairy Wishbox
  description: A magical MCP-UI wishbox built for Day 17 adventofai
  uri: http://localhost:3000/mcp
```

**If missing or incorrect:**
1. Edit manually
2. Save
3. Restart Goose

### Test MCP Protocol Manually

```powershell
# PowerShell
$body = @{
    jsonrpc = "2.0"
    id = 1
    method = "initialize"
    params = @{}
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/mcp" -Method Post -Body $body -ContentType "application/json"
```

**Expected response:**
```
protocolVersion : 2024-11-05
serverInfo      : @{name=Winter Fairy Wishbox; version=1.0.0}
capabilities    : @{tools=}
```

**If error:**
- Server issue
- Wrong endpoint
- Server not accepting connections

### Check Network/Firewall

```powershell
# Test server is accessible
Test-NetConnection -ComputerName localhost -Port 3000

# Should show: TcpTestSucceeded : True
```

**If fails:**
- Firewall blocking port 3000
- Server not listening on correct interface

---

## 💾 Data Issues

### No Wishes Showing

**Check if wishes exist:**
```powershell
./list-wishes.ps1
```

**If empty:**
- Normal! Server starts with empty wishbox
- Add wishes using `addWish` tool
- Data is in-memory only

### Wishes Disappeared

**Cause:** Server was restarted

**Explanation:**
- Data is stored in-memory
- Restarting server clears all wishes
- This is by design (not a bug)

**Solution for persistence:**
- Keep server running
- Or implement database storage (future enhancement)

### Wrong Wish IDs

**IDs are auto-incremented:**
- wish_1, wish_2, wish_3, etc.
- Restart server → IDs start over from wish_1

---

## 🚀 Performance Issues

### Slow Response Times

**Causes:**
- Server overloaded
- Large wishlist (100+ wishes)
- Network latency

**Solutions:**
- Restart server
- Reduce wish count
- Check system resources

### Server Using Too Much Memory

**Cause:** Large number of wishes in memory

**Solution:**
- Remove old wishes
- Restart server to clear memory

---

## 📞 Still Need Help?

### Information to Collect

Before asking for help, gather:

1. **Server status:**
   ```bash
   curl http://localhost:3000
   ```

2. **Test script results:**
   ```powershell
   ./test-mcp.ps1
   ```

3. **Goose config:**
   - Extension settings
   - Goose version

4. **Error messages:**
   - Exact error text
   - Server logs
   - Console output

5. **Environment:**
   - OS version (Windows 10/11)
   - Node.js version (`node --version`)
   - Goose Desktop version

### Quick Diagnostic

Run this complete diagnostic:

```powershell
# 1. Check Node.js
node --version

# 2. Check server
curl http://localhost:3000

# 3. Test MCP
./test-mcp.ps1

# 4. List wishes
./list-wishes.ps1

# 5. Check port
netstat -ano | findstr :3000
```

Share the results when asking for help.

---

## ✅ Success Indicators

### Everything Working Correctly

**You should see:**

1. **Server terminal:**
   ```
   ✨════════════════════════════════════════════════✨
      🎁  Winter Fairy Wishbox Server Started  🎁
   ✨════════════════════════════════════════════════✨
   
   🌟 Server running on: http://localhost:3000
   🔮 MCP Endpoint: http://localhost:3000/mcp
   ```

2. **Goose chat (after adding wish):**
   - Beautiful blue-to-purple gradient UI
   - Wish card with category/priority badges
   - No error messages

3. **Goose chat (after listing wishes):**
   - Full wishbox interface
   - Statistics bar
   - Magic level bar
   - All wishes as cards
   - Wish of the day highlighted

4. **Test scripts:**
   - All pass with ✅ green checkmarks
   - HTML file opens in browser
   - UI renders perfectly

**If you see all of these: Congratulations! Everything is working! 🎉**

---

## 🎯 Prevention

### Avoid Common Issues

**Always remember:**
1. ✅ Start server before adding extension
2. ✅ Use exact URI: `http://localhost:3000/mcp`
3. ✅ **Restart Goose Desktop after adding extension**
4. ✅ Start new conversation to test
5. ✅ Keep server running while using

**Never:**
1. ❌ Add extension before starting server
2. ❌ Forget to restart Goose Desktop
3. ❌ Use old conversation after adding extension
4. ❌ Stop server while using extension
5. ❌ Modify config.yaml while Goose is running

---

**🎄 May your wishbox always work magically! ✨**
