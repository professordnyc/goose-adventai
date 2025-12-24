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

---

## 🔧 Configuration for Goose Desktop

### Adding the MCP Extension

1. Open **Goose Desktop**
2. Go to **Settings** (top right menu)
3. Navigate to **Extensions** section
4. Click **Add Extension**
5. Configure with the following settings:

```json
{
  "type": "streamable_http",
  "name": "Winter Fairy Wishbox",
  "description": "A magical MCP-UI wishbox built for Day 17",
  "uri": "http://localhost:3000/mcp"
}
```

6. **Save** and the extension will be available in Goose

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
```

---

### 3. `grantWish`

Grant a wish by marking it as fulfilled with fairy magic.

**Parameters:**
- `id` (string, required): The unique ID of the wish (e.g., `wish_1`)

**Example:**
```
Grant wish wish_1
```

---

### 4. `removeWish`

Remove a wish from the wishbox.

**Parameters:**
- `id` (string, required): The unique ID of the wish to remove

**Example:**
```
Remove wish wish_1
```

---

## 🎨 UI Features

### Visual Theme

- **Color Palette**: Deep winter blues, ice white, sparkle gold, frost silver, magic purple
- **Animations**: Shimmer effects, glow animations, smooth transitions
- **Card Design**: Rounded corners, gradient backgrounds, hover effects
- **Special Effects**: "Wish of the Day" glow animation with crown badge

### Layout Components

- **Header**: Magical title with snowflake decorations
- **Statistics Bar**: Total, granted, and pending wish counts
- **Magic Level Bar**: Visual progress indicator (0-100%)
- **Wish Cards**: Individual cards with category, priority, and status badges
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

The highest-scoring ungranted wish is highlighted with a special glow effect and crown badge.

---

## 🏗️ Project Structure

```
day17-wishbox-final/
├── src/
│   ├── server.ts          # Main Express server
│   ├── mcp/
│   │   ├── handler.ts     # MCP protocol handler
│   │   ├── tools.ts       # Tool definitions with JSON schemas
│   │   └── ui.ts          # MCP-UI HTML generation
│   ├── store/
│   │   └── wishlist.ts    # In-memory wishlist storage
│   └── types/
│       └── wish.ts        # TypeScript type definitions
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## 🧪 Testing

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

---

## 🎯 Technical Details

### MCP Protocol

- **Version**: 2024-11-05
- **Transport**: HTTP (streamable_http)
- **Endpoint**: POST `/mcp`
- **Format**: JSON-RPC 2.0

### Data Storage

- **Type**: In-memory (data persists only while server is running)
- **Structure**: Array of Wish objects
- **ID Generation**: Auto-incrementing with `wish_` prefix

### TypeScript

- **Target**: ES2022
- **Module**: NodeNext
- **Strict Mode**: Enabled
- **Type Safety**: Full type coverage with interfaces

---

## 🌈 Future Enhancements

Potential features for future versions:

- **Persistent Storage**: Save wishes to database or file
- **User Authentication**: Multi-user support with private wishlists
- **Wish Sharing**: Share wishes with friends
- **Reminders**: Notifications for old wishes
- **Themes**: Additional seasonal themes (spring, summer, autumn)
- **Export/Import**: Download/upload wishlists as JSON
- **Search**: Full-text search across wishes
- **Tags**: Custom tags for better organization

---

## 📝 Development

### Scripts

- `npm run dev` - Start server in development mode with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled server

### Environment Variables

- `PORT` - Server port (default: 3000)

---

## 🎄 About This Project

This project was created as an original implementation for Day 17, inspired by the concept of magical wishlists but built entirely from scratch. Every line of code, UI design, and feature implementation is unique and original.

### Key Differentiators

- **100% Original Code**: No code copied from reference repositories
- **Custom UI Design**: Unique winter fairy theme with custom CSS animations
- **Enhanced Features**: Wish of the Day algorithm, Magic Level tracker, rich statistics
- **Clean Architecture**: Well-structured TypeScript with clear separation of concerns
- **MCP-UI Focus**: Designed specifically for beautiful rendering in Goose Desktop

---

## 📄 License

MIT License - Feel free to use and modify for your own magical projects!

---

## ✨ Credits

Created with ❄️ winter magic and ✨ fairy sparkles for Day 17.

**Tech Stack:**
- TypeScript
- Express.js
- MCP Protocol SDK
- Pure CSS Animations

---

**May all your wishes come true! 🌟**
