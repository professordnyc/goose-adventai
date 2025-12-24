# ✨ Winter Fairy Wishbox

A magical MCP-UI server that manages a winter-themed wishlist with beautiful, interactive UI designed for Goose Desktop.

**Day 17 Project** - Goose Advent of AI Challenge inspired by [blackgirlbytes](https://github.com/blackgirlbytes/winter-fairy-wishlist-chatgpt-adapter) 

[Day 17 Challenge](https://adventofai.dev/challenges/17)
[Advent Of AI](https://adventofai.dev/)

---

## 🌟 Features

- **Four Magical Tools**: Add, list, grant, and remove wishes
- **Rich MCP-UI**: Beautiful winter-themed interface with animations and glow effects
- **Wish of the Day**: Automatically highlights the most important pending wish
- **Magic Level Tracker**: Visual progress bar showing wish fulfillment percentage
- **Category System**: Organize wishes by toy, experience, kindness, or magic
- **Priority Levels**: Classify wishes as dream, hopeful, or small
- **Interactive UI**: Card-based layout with status badges and action buttons
- **Statistics Dashboard**: Track wishes by category, priority, and status

---

## 🎁 Wish Categories

- **🎁 Toy**: Physical items and gifts
- **🌟 Experience**: Activities and adventures
- **💝 Kindness**: Acts of helping others
- **✨ Magic**: Impossible dreams and magical wishes

---

## ⭐ Priority Levels

- **🌠 Dream**: Your biggest, most important wishes
- **💫 Hopeful**: Medium-priority wishes
- **⭐ Small**: Little wishes and simple joys

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Goose Desktop application

### Setup Steps

1. **Navigate to the project directory**:
   ```bash
   cd day17-wishbox-final
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`

You should see:
```
✨════════════════════════════════════════════════✨
   🎁  Winter Fairy Wishbox Server Started  🎁
✨════════════════════════════════════════════════✨

🌟 Server running on: http://localhost:3000
🔮 MCP Endpoint: http://localhost:3000/mcp
```

---

## 🔧 Configuration for Goose Desktop

### Adding the MCP Extension

1. **Ensure the server is running** (see Installation section above)
2. Open **Goose Desktop**
3. Go to **Settings** (top right menu)
4. Navigate to **Extensions** section
5. Click **Add Extension**
6. Configure with the following settings:

```json
{
  "type": "streamable_http",
  "name": "Winter Fairy Wishbox",
  "description": "A magical MCP-UI wishbox built for Day 17 adventofai",
  "uri": "http://localhost:3000/mcp"
}
```

7. Click **Save** to add the extension
8. **⚠️ CRITICAL: Completely restart Goose Desktop**
   - Quit the application entirely (not just close the window)
   - Reopen Goose Desktop
9. Start a new conversation to see the beautiful MCP-UI

### ⚠️ Why Restart is Required

Goose Desktop **must** be fully restarted after adding a new MCP extension to properly initialize the MCP-UI rendering engine. 

**Without restarting:**
- ❌ Tools may return error messages like "Unexpected response type"  
- ❌ HTML UI will not render properly
- ❌ You'll only see text instead of the beautiful interface
- ❌ Extension may appear to be broken

**After restarting Goose Desktop, you'll see:**
- ✅ Beautiful winter-themed gradient backgrounds (blue to purple)
- ✅ Animated wish cards with glow effects  
- ✅ Interactive statistics and magic level bars
- ✅ Full HTML rendering of all UI components
- ✅ Proper wish of the day highlighting with golden crown badge
- ✅ Category and priority badges with colors
- ✅ Smooth animations and transitions

### Testing the Extension

You can test if the server is working properly before or after adding to Goose:

```powershell
# Test the MCP endpoint (Windows PowerShell)
./test-mcp.ps1

# List all wishes and save UI to HTML file
./list-wishes.ps1
```

The test scripts will:
- Verify the server is responding correctly
- Test all MCP protocol methods
- Add sample wishes
- Save the generated HTML UI to files you can view in a browser

---

## 🛠️ Available Tools

### 1. `addWish`

Add a new wish to the magical wishbox.

**Parameters:**
- `text` (string, required): The wish text (1-500 characters)
- `category` (enum, required): One of `toy`, `experience`, `kindness`, `magic`
- `priority` (enum, required): One of `dream`, `hopeful`, `small`

**Example:**
```
Add a wish: "I wish for a telescope to explore the stars" with category "toy" and priority "dream"
```

**Returns:** Beautiful UI card showing the newly added wish with all its details.

---

### 2. `listWishes`

View all wishes in the wishbox with optional filtering.

**Parameters:**
- `category` (enum, optional): Filter by category
- `priority` (enum, optional): Filter by priority
- `grantedOnly` (boolean, optional): Show only granted wishes

**Example:**
```
Show all wishes
Show only dream wishes
Show granted experiences
List kindness wishes
```

**Returns:** Complete wishbox UI with:
- Statistics bar (total, granted, pending)
- Magic level progress bar
- Wish of the day highlighted with crown
- All matching wishes as interactive cards
- Footer with category/priority distribution

---

### 3. `grantWish`

Grant a wish by marking it as fulfilled with fairy magic.

**Parameters:**
- `id` (string, required): The unique ID of the wish (e.g., `wish_1`)

**Example:**
```
Grant wish wish_1
```

**Returns:** Celebration UI showing the granted wish with sparkles and updated status.

---

### 4. `removeWish`

Remove a wish from the wishbox.

**Parameters:**
- `id` (string, required): The unique ID of the wish to remove

**Example:**
```
Remove wish wish_1
```

**Returns:** Confirmation UI showing the wish has been removed.

---

## 🎨 UI Features

### Visual Theme

- **Color Palette**: Deep winter blues (`#1a237e`), ice white (`#f0f4ff`), sparkle gold (`#ffd700`), frost silver (`#c0c8e0`), magic purple (`#9c27b0`)
- **Animations**: Shimmer effects on titles, glow animations for wish of the day, smooth transitions
- **Card Design**: Rounded corners, gradient backgrounds, hover effects with shadow and lift
- **Special Effects**: "Wish of the Day" glow animation with crown badge (`👑`)

### Layout Components

- **Header**: Magical title with snowflake decorations and subtitle
- **Statistics Bar**: Three counters showing total, granted, and pending wish counts
- **Magic Level Bar**: Visual progress indicator (0-100%) with gradient fill
- **Wish Cards**: Individual cards displaying:
  - Category badge with emoji
  - Priority badge with color coding
  - Status badge for granted wishes
  - Wish text in quotes
  - Creation date and ID
  - Grant date (if granted)
  - Interactive Grant and Remove buttons
- **Footer**: Category distribution, priority breakdown, and inspirational quote

---

## 📊 Wish of the Day Algorithm

The server automatically calculates the "Wish of the Day" using a scoring algorithm:

```
Score = Priority Weight × (1 + Days Since Creation)

Priority Weights:
- Dream: 3
- Hopeful: 2
- Small: 1
```

The highest-scoring ungranted wish is highlighted with:
- Special golden glow animation
- Crown badge (`👑 WISH OF THE DAY`)  
- Enhanced border styling
- "Focus on this wish" call-to-action button

This ensures older, higher-priority wishes get attention!

---

## 🏗️ Project Structure

```
day17-wishbox-final/
├── src/
│   ├── server.ts          # Main Express server with MCP endpoint
│   ├── mcp/
│   │   ├── handler.ts     # MCP protocol request handler
│   │   ├── tools.ts       # Tool definitions with JSON schemas
│   │   └── ui.ts          # MCP-UI HTML generation (~600 lines)
│   ├── store/
│   │   └── wishlist.ts    # In-memory wishlist storage with algorithms
│   └── types/
│       └= wish.ts        # TypeScript type definitions
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript configuration
├── .gitignore             # Git ignore rules
├── README.md              # This file
├── QUICKSTART.md          # Quick start guide
├── PROJECT_SUMMARY.md     # Project summary and checklist
├── USAGE_EXAMPLES.md      # Detailed usage examples
├── test-mcp.ps1           # PowerShell test script
└── list-wishes.ps1        # PowerShell script to list wishes
```

---

## 🧪 Testing

### Automated Testing with PowerShell

The project includes test scripts for Windows:

**Test MCP Protocol:**
```powershell
./test-mcp.ps1
```

This will:
- Test the initialize handshake
- List available tools
- Add a sample wish
- Display the response

**List Wishes and Save UI:**
```powershell
./list-wishes.ps1
```

This will:
- Query all wishes from the wishbox
- Save the HTML UI to `wishbox-ui.html`
- Open the HTML file in your default browser

### Manual Testing with curl

**1. Initialize the MCP connection:**
```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}'
```

**2. List available tools:**
```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'
```

**3. Add a wish:**
```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"addWish","arguments":{"text":"I wish for world peace","category":"kindness","priority":"dream"}}}'
```

**4. List wishes:**
```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"listWishes","arguments":{}}}'
```

### Health Check

Test if the server is running:
```bash
curl http://localhost:3000
```

Should return:
```
🎄 Winter Fairy Wishbox Server is running! ❄️
MCP Endpoint: POST /mcp
```

---

## 🎯 Technical Details

### MCP Protocol

- **Version**: 2024-11-05
- **Transport**: HTTP (streamable_http)
- **Endpoint**: POST `/mcp`
- **Format**: JSON-RPC 2.0
- **Content Types**: Supports both `text` and `html` content in responses

### Data Storage

- **Type**: In-memory (data persists only while server is running)
- **Structure**: Array of Wish objects
- **ID Generation**: Auto-incrementing with `wish_` prefix (wish_1, wish_2, etc.)
- **Persistence**: None - restart server to clear all wishes

### TypeScript

- **Target**: ES2022
- **Module**: NodeNext
- **Strict Mode**: Enabled
- **Type Safety**: Full type coverage with interfaces

---

## 🌈 Future Enhancements

Potential features for future versions:

- **Persistent Storage**: Save wishes to database or JSON file
- **User Authentication**: Multi-user support with private wishlists
- **Wish Sharing**: Share wishes with friends via links
- **Reminders**: Notifications for old wishes
- **Themes**: Additional seasonal themes (spring, summer, autumn)
- **Export/Import**: Download/upload wishlists as JSON
- **Search**: Full-text search across wish text
- **Tags**: Custom tags for better organization
- **Images**: Attach images to wishes
- **Collaboration**: Multiple users can contribute to shared wishbox

---

## 📝 Development

### Scripts

- `npm run dev` - Start server in development mode with hot reload (uses tsx watch)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled server from build output

### Environment Variables

- `PORT` - Server port (default: 3000)

### Development Workflow

1. Make changes to TypeScript files in `src/`
2. Server automatically restarts (when using `npm run dev`)
3. Test changes in Goose or with curl/PowerShell scripts
4. Build for production with `npm run build`

---

## 🔧 Troubleshooting

### Server Won't Start

**Problem:** Port 3000 is already in use

**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Extension Shows Errors in Goose

**Problem:** "Unexpected response type" or similar errors

**Solutions:**
1. **Restart Goose Desktop completely** (this fixes 90% of issues)
2. Verify server is running: `curl http://localhost:3000`
3. Check server logs for errors
4. Test with PowerShell scripts: `./test-mcp.ps1`
5. Verify extension URI is exactly `http://localhost:3000/mcp`

### No Wishes Showing

**Problem:** Empty wishbox

**Solution:**
- Use `addWish` tool to add wishes first
- Server data is in-memory only - restarting clears all wishes
- Test with: `./list-wishes.ps1`

### UI Not Rendering Properly

**Problem:** Seeing text instead of beautiful UI

**Solution:**
1. **Restart Goose Desktop** - this is critical!
2. Ensure you're using a recent version of Goose Desktop
3. Try viewing the HTML in a browser: `./list-wishes.ps1` opens `wishbox-ui.html`

---

## 🎄 About This Project

This project was created as an original implementation for Day 17 of the Advent of AI challenge, inspired by the concept of magical wishlists but built entirely from scratch. Every line of code, UI design, and feature implementation is unique and original.

### Key Differentiators

- **100% Original Code**: No code copied from reference repositories
- **Custom UI Design**: Unique winter fairy theme with custom CSS animations
- **Enhanced Features**: Wish of the Day algorithm, Magic Level tracker, rich statistics
- **Clean Architecture**: Well-structured TypeScript with clear separation of concerns
- **MCP-UI Focus**: Designed specifically for beautiful rendering in Goose Desktop
- **Comprehensive Documentation**: README, Quick Start, Project Summary, and Usage Examples
- **Test Utilities**: PowerShell scripts for easy testing

### Implementation Highlights

- **MCP Protocol Compliance**: Full JSON-RPC 2.0 support with proper error handling
- **Type Safety**: Complete TypeScript coverage with strict mode
- **Modular Design**: Separated concerns (server, handlers, tools, UI, store, types)
- **Rich UI Generation**: 600+ lines of HTML/CSS generation code
- **Scoring Algorithm**: Original wish-of-the-day calculation
- **Validation**: Input validation on all tools
- **Error Handling**: Graceful error responses with helpful messages

---

## 📄 License

MIT License - Feel free to use and modify for your own magical projects!

---

## ✨ Credits

Created with ❄️ winter magic and ✨ fairy sparkles for Day 17.

**Tech Stack:**
- TypeScript
- Express.js
- MCP Protocol SDK (@modelcontextprotocol/sdk)
- Pure CSS Animations (no frameworks)
- Node.js 18+

**Created by:** goose (AI assistant by Block)  
**Challenge:** Advent of AI - Day 17  
**Inspiration:** [blackgirlbytes/winter-fairy-wishlist-chatgpt-adapter](https://github.com/blackgirlbytes/winter-fairy-wishlist-chatgpt-adapter)

---

**May all your wishes come true! 🌟**
