# 🚀 Quick Start Guide

Get your Winter Fairy Wishbox running in just 3 simple steps!

---

## Step 1: Start the Server

Open a terminal in the project directory and run:

```bash
npm run dev
```

You should see:
```
✨════════════════════════════════════════════════✨
   🎁  Winter Fairy Wishbox Server Started  🎁
✨════════════════════════════════════════════════✨

🌟 Server running on: http://localhost:3000
🔮 MCP Endpoint: http://localhost:3000/mcp
```

Leave this terminal running - the server needs to stay active!

---

## Step 2: Add to Goose Desktop

1. Open **Goose Desktop**
2. Click **Settings** (⚙️ in top right)
3. Go to **Extensions** tab
4. Click **Add Extension** or **+**
5. Fill in these details:

   - **Type**: `streamable_http`
   - **Name**: `Winter Fairy Wishbox`
   - **Description**: `A magical MCP-UI wishbox built for Day 17 adventofai`
   - **URI**: `http://localhost:3000/mcp`

6. Click **Save** or **Add**
7. **⚠️ CRITICAL: Completely quit and restart Goose Desktop**
   - Don't just close the window - fully quit the application
   - Reopen Goose Desktop from your applications
8. Start a new conversation

### ⚠️ Why Restart is Required

Goose Desktop **must** be fully restarted after adding a new MCP extension to properly initialize the MCP-UI rendering engine. 

**Without restarting:**
- ❌ You'll see "Unexpected response type" errors
- ❌ No beautiful UI - just error messages  
- ❌ Tools won't work properly

**After restarting:**
- ✅ Beautiful winter-themed gradient UI
- ✅ Animated wish cards with glow effects
- ✅ Full HTML rendering  
- ✅ Everything works perfectly!

---

## Step 3: Test It Out!

In Goose, try these commands:

### Add your first wish:
```
Add a wish "I want to build a snowman" with category toy and priority hopeful
```

You should see a beautiful card appear with your wish!

### View all wishes:
```
Show me all wishes in the wishbox
```

You'll see the full magical interface with statistics, magic level bar, and all your wishes!

### Grant a wish:
```
Grant wish wish_1
```

Watch the wish transform with sparkles and get marked as granted! ✨

---

## 🎯 Example Commands

**Add different types of wishes:**
- "Add a wish for a telescope with category toy and priority dream"
- "I wish for a day at the beach, category experience, priority hopeful"
- "Add a wish to volunteer at an animal shelter, kindness category, small priority"
- "I wish I could fly, category magic, priority dream"

**Filter wishes:**
- "Show me all dream wishes"
- "List kindness wishes"
- "Show granted wishes only"
- "Show me experience wishes"

**Manage wishes:**
- "Grant wish wish_2"
- "Remove wish wish_3"

---

## 🧪 Test Server (Optional)

You can test the server independently before or after adding to Goose:

### Using PowerShell Scripts:

```powershell
# Test the MCP protocol
./test-mcp.ps1

# List wishes and save UI to HTML file
./list-wishes.ps1
```

The `list-wishes.ps1` script will:
- Query all wishes
- Save the HTML UI to `wishbox-ui.html`  
- Open the file in your browser so you can see what Goose will display!

### Using curl:

```bash
# Health check
curl http://localhost:3000

# Test MCP initialize
curl -X POST http://localhost:3000/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}'
```

---

## 🎨 What to Expect

When you use the tools in Goose (after restarting!), you'll see:

- ✨ **Beautiful winter-themed UI** with blue-to-purple gradients
- ❄️ **Snowflake decorations** in the header
- 🎁 **Color-coded wish cards** with category and priority badges
- 👑 **"Wish of the Day"** highlighted with golden glow animation
- 📊 **Statistics dashboard** showing total, granted, and pending counts
- 🌈 **Magic Level bar** - visual progress from 0% to 100%
- 💫 **Smooth animations** and hover effects on cards
- 🔘 **Interactive buttons** to grant or remove wishes

It looks exactly like the example screenshot - magical and beautiful!

---

## 🛑 Stop the Server

When you're done:
- Press `Ctrl+C` in the terminal where the server is running
- Or close the terminal window

The server data is in-memory, so restarting clears all wishes.

---

## ❓ Troubleshooting

### Server won't start?

**Port already in use:**
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill that process (replace PID)
taskkill /PID <PID> /F
```

**Dependencies missing:**
```bash
npm install
```

### Goose shows errors?

**"Unexpected response type" or similar:**
1. **Did you restart Goose Desktop?** This is the #1 fix!
2. Check server is running: `curl http://localhost:3000`
3. Verify URI is exactly `http://localhost:3000/mcp`
4. Check server terminal for error messages
5. Test with PowerShell: `./test-mcp.ps1`

### No beautiful UI?

**Seeing text instead of the winter interface:**
1. **Restart Goose Desktop!** (can't stress this enough)
2. Make sure you saved the extension configuration
3. Try the test script to see the HTML: `./list-wishes.ps1`

### No wishes showing?

**Empty wishbox:**
- You need to add wishes first using the `addWish` tool
- Server data is in-memory - restarting clears everything
- Test: `./list-wishes.ps1` to see current state

---

## 💡 Pro Tips

1. **Keep the server terminal visible** - you can see requests coming in
2. **Use the test scripts** - they're great for debugging
3. **View wishbox-ui.html in browser** - see exactly what Goose will render
4. **Add multiple wishes** - the UI looks best with several wishes!
5. **Try the Wish of the Day feature** - it automatically highlights important wishes

---

## 🎁 Next Steps

Once everything is working:

1. **Read USAGE_EXAMPLES.md** - Comprehensive examples and workflows
2. **Explore the UI** - Try different categories and priorities
3. **Create your wishlist** - Add real wishes and track them!
4. **Grant wishes** - Watch the magic level increase to 100%
5. **Experiment with filters** - See wishes by category or priority

---

**🎄 Ready to make some magical wishes! 🌟**

Need more help? Check out:
- **README.md** - Full documentation
- **USAGE_EXAMPLES.md** - Detailed examples and scenarios  
- **PROJECT_SUMMARY.md** - Technical details and architecture
