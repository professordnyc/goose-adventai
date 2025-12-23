# ❄️ Winter Festival Countdown App

A beautiful, festive countdown timer for the Winter Festival 2026, featuring a magical winter theme with frosted-glass UI elements, rotating fun facts, and email signup functionality.

## 🔗 Links

- **Goose Advent of AI Day 16 Challenge**: <https://adventofai.dev/challenges/16>
- **Goose Advent of AI Website**: <https://adventofai.dev/>
- **Winter Festival 2026 App**: <https://winterfestivalapp.netlify.app>


## ✨ Features

### 🎯 Core Functionality
- **Real-time Countdown Timer**: Live countdown to December 1, 2026 at 10:00 AM
  - Displays days, hours, minutes, and seconds
  - Updates every second with smooth transitions
  - Animated number changes for visual appeal

- **Rotating Fun Facts**: Festival trivia that rotates every 6 seconds
  - Smooth fade transitions between facts
  - 6 interesting facts about the Winter Festival
  - Keeps visitors engaged while browsing

- **Email Signup Form**: Stay updated on festival news
  - Client-side email validation
  - Success/error messaging
  - Emails stored in browser localStorage
  - Responsive form layout (stacked on mobile, horizontal on desktop)

### 🎨 Design Features
- **Winter-Themed UI**:
  - Icy blue gradient background
  - Frosted-glass panels with backdrop blur effects
  - Soft shadows and rounded corners
  - High-contrast, readable typography
  
- **Snowfall Animation**:
  - CSS-based falling snowflakes
  - Multiple snowflakes at different speeds
  - Subtle and non-intrusive
  
- **Responsive Design**:
  - Mobile-first approach
  - Scales beautifully from 320px to 4K displays
  - Touch-friendly interface
  
- **Accessibility**:
  - WCAG AA compliant color contrast
  - Screen reader friendly with ARIA labels
  - Keyboard navigation support
  - Respects `prefers-reduced-motion` for animations

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely client-side!

### Installation

1. **Clone or download this repository**
   ```bash
   git clone <https://github.com/professordnyc/goose-adventai.git>
   cd day16
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (with http-server)
     npx http-server
     ```

3. **Visit the app**
   - Local file: `file:///path/to/day16/index.html`
   - Local server: `http://localhost:8000`

## 📁 Project Structure

```
day16/
├── index.html              # Main HTML structure
├── css/
│   └── styles.css         # All styling (mobile-first, winter theme)
├── js/
│   └── main.js            # Countdown, fun facts, email signup logic
├── assets/                # (Reserved for future images/icons)
├── README.md              # This file
├── PLAN.md                # Detailed project planning document
├── TODO.md                # Task tracking checklist
└── .goosehints            # Development conventions
```

## 🎯 How It Works

### Countdown Timer
- Calculates time difference between now and December 1, 2026 10:00 AM
- Updates every 1000ms (1 second)
- Adds CSS transition classes for smooth number changes
- Handles countdown completion gracefully

### Fun Facts Rotation
- Array of 6 pre-defined festival facts
- Uses `setInterval` to rotate every 6 seconds
- CSS fade-in/fade-out transitions for smooth changes
- Circular index tracking (loops back to start)

### Email Signup
- HTML5 form validation + custom JavaScript validation
- Regex pattern check for valid email format
- Stores emails in `localStorage` as JSON array
- Prevents duplicate signups
- Auto-hides messages after 5 seconds

## 🎨 Customization

### Change Target Date
Edit `js/main.js` line 8:
```javascript
const targetDate = new Date('December 1, 2026 10:00:00').getTime();
```

### Modify Fun Facts
Edit the `festivalFacts` array in `js/main.js` (lines 127-134):
```javascript
const festivalFacts = [
    "Your custom fact here!",
    // Add more facts...
];
```

### Adjust Color Palette
Edit CSS variables in `css/styles.css` (lines 8-16):
```css
:root {
    --color-ice-blue: #A8D8EA;
    --color-sky-blue: #87CEEB;
    --color-deep-blue: #4682B4;
    /* Customize colors... */
}
```

### Change Snowfall Speed
Edit `css/styles.css` animation durations (lines 418-425):
```css
.snowfall::before {
    animation-duration: 12s; /* Adjust speed */
}
```

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

**Note**: Backdrop-filter requires modern browser support. Fallbacks are included for older browsers.

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of `<header>`, `<section>`, `<footer>`, etc.
- **ARIA Labels**: Screen reader announcements for dynamic content
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **High Contrast**: Text meets WCAG AA standards (4.5:1 ratio)
- **Reduced Motion**: Respects user's motion preferences
- **Focus States**: Clear visual indicators for keyboard users

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (default, mobile-first)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔮 Future Enhancements

Potential additions for the "Ultimate Challenge":

- [ ] **Multi-Page Site**:
  - Schedule page (event timeline)
  - Vendors page (marketplace listings)
  - Photo gallery (past festivals)
  - Contact page (FAQ, location map)

- [ ] **Advanced Features**:
  - Dark mode toggle
  - Sound effects with mute option
  - Backend integration for email storage
  - Admin panel for managing content
  - Social media share buttons
  - Live chat support

- [ ] **Deployment**:
  - Host on Netlify: `winterfestivalapp.netlify.app`
  - Custom domain setup
  - CI/CD pipeline
  - Performance optimization

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, flexbox, grid, animations, backdrop-filter
- **Vanilla JavaScript**: ES6+ features, DOM manipulation, localStorage
- **No frameworks or libraries** - Pure, lightweight code!

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Inspired by Day 4 and Day 5 winter-themed projects
- Design inspired by modern glassmorphism trends
- Built as part of the Goose AdventAI challenge

---

## 📸 Screenshots

### Desktop View
The app displays beautifully on large screens with generous spacing and large, readable text.

### Mobile View
Fully responsive design with stacked layout elements optimized for touch interaction.

### Accessibility
High contrast text on winter-themed backgrounds ensures readability for all users.

---

**Built with ❄️ by the Winter Festival Team**

*Last updated: December 2025*
