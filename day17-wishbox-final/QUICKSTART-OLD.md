# 🚀 Quick Start Guide

Get your Winter Fairy Wishbox running in 3 simple steps!

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
...
```

---

## Step 2: Add to Goose Desktop

1. Open **Goose Desktop**
2. Click **Settings** (⚙️ in top right)
3. Go to **Extensions** tab
4. Click **Add Extension** or **+**
5. Fill in these details:

   - **Type**: `streamable_http`
   - **Name**: `Winter Fairy Wishbox`
   - **Description**: `A magical MCP-UI wishbox built for Day 17`
   - **URI**: `http://localhost:3000/mcp`

6. Click **Save** or **Add**

---

## Step 3: Test It Out!

In Goose, try these commands:

### Add your first wish:
```
Add a wish "I want to build a snowman" with category toy and priority hopeful
```

### View all wishes:
```
Show me all wishes in the wishbox
```

### Grant a wish:
```
Grant wish wish_1
```

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

**Manage wishes:**
- "Grant wish wish_2"
- "Remove wish wish_3"

---

## 🧪 Test Server (Optional)

To test the server independently before adding to Goose:

```powershell
./test-server.ps1
```

Or use curl/Postman to send requests to `http://localhost:3000/mcp`

---

## 🎨 What to Expect

When you use the tools in Goose, you'll see:

- ✨ **Beautiful winter-themed UI** with snowflakes and gradients
- 🎁 **Color-coded wish cards** with category and priority badges
- 👑 **"Wish of the Day"** highlighting with golden glow
- 📊 **Statistics dashboard** showing totals and magic level
- 🌈 **Smooth animations** and hover effects

---

## 🛑 Stop the Server

When you're done, press `Ctrl+C` in the terminal to stop the server.

---

## ❓ Troubleshooting

**Server won't start?**
- Make sure port 3000 is not in use
- Run `npm install` again if dependencies are missing

**Goose can't connect?**
- Verify server is running on http://localhost:3000
- Check the URI is exactly `http://localhost:3000/mcp`
- Try restarting both server and Goose

**No wishes showing?**
- Use `listWishes` first to see if any exist
- Add a wish with `addWish` tool

---

**🎄 Ready to make some wishes! 🌟**
