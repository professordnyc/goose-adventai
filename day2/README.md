# ❄️ The Winter Path Home

A text-based choose-your-own-adventure game with winter magic, mysterious riddles, and multiple endings.

**Submission for Day 2 of the Goose Advent of AI Challenge**  
🔗 https://adventofai.dev/challenges/2

---

## 🎮 Play the Game

### Quick Start

```bash
# Navigate to project directory
cd day2

# Start local server
python -m http.server 8000

# Open browser to http://localhost:8000
```

### Requirements
- Python 3.x (for local server)
- Modern web browser (Chrome, Firefox, Edge, Safari)

---

## 📖 Story

You're a student leaving school on a snowy afternoon when you discover a mysterious glowing path. A cloaked figure challenges you to solve riddles to find your way home. Will you uncover the truth... or was it all a dream?

### Features

- 🎯 **Interactive Story** - 3 choice points with forced progression loops
- 🧩 **2 Riddles** - Test your wit with winter-themed puzzles
- 🏆 **2 Endings** - Success ending or mysterious dream ending with artifact
- 💾 **Auto-Save** - Resume your adventure anytime with localStorage
- 📊 **Stats Tracking** - Monitor turns, correct answers, and score
- ❄️ **Festive Design** - Ice blue gradients, falling snowflakes, smooth animations
- 📱 **Responsive** - Plays beautifully on desktop, tablet, and mobile

---

## 🎯 Gameplay

### The Riddles

**Riddle 1: Winter's Gift**  
*"I fall from the sky without ever getting hurt. I am white and cold, yet I warm hearts and bring joy. What am I?"*

**Riddle 2: Dreams**  
*"I exist only when you are not awake, yet I can feel more real than reality itself. I can take you anywhere, show you anything. What am I?"*

### Endings

- **Success Ending** - Find your way home safely (0-1 correct answers)
- **Dream Ending** - Unlock the crystalline snowflake artifact (2/2 correct answers)

---

## 🛠️ Technical Details

### Built With

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, animations, responsive design
- **Vanilla JavaScript** - ES6 modules, no frameworks
- **localStorage API** - Client-side persistence

### Project Structure

```
day2/
├── index.html          # Game structure + modal
├── css/
│   └── style.css       # Winter theme + animations
├── js/
│   ├── main.js         # Game engine
│   └── story.js        # Story nodes (12 total)
├── plan.md             # Project documentation
└── README.md           # This file
```

### Architecture

- **Node-Based Story Graph** - 12 interconnected story nodes
- **State Management** - Tracks current position, score, turns, correct answers
- **Modal System** - Custom continue/new game dialog on reload
- **Visual Feedback** - Green (correct) / Red (incorrect) riddle responses
- **Falling Snowflakes** - 20 animated elements with randomized properties

---

## 🎨 Design

### Color Palette
- Ice Blue: `#E3F2FD`
- Winter Blue: `#64B5F6`
- Gold Accent: `#FFD54F` (artifact)
- Success Green: `#81C784`
- Error Red: `#E57373`

### Typography
- Story: Merriweather (serif) - Literary feel
- UI: Inter (sans-serif) - Modern clarity

### Animations
- Fade-in text and buttons
- Pulse effect for correct answers
- Shake effect for incorrect answers
- Falling snowflakes throughout

---

## 📊 Stats

- **Total Lines of Code:** ~550
- **Story Nodes:** 12
- **Development Time:** Single day build
- **Play Time:** 3-5 minutes per playthrough

---

## 🧪 Testing

1. Start server: `python -m http.server 8000`
2. Navigate to: `http://localhost:8000`
3. Play through both endings:
   - Wrong answers → Success ending
   - "Snow" + "Dream" → Dream ending with artifact
4. Test persistence: Play midway → Refresh → Continue

---

## 🏆 Challenge Constraints Met

✅ Text-based adventure game  
✅ Multiple choice points  
✅ Story branching and consequences  
✅ Multiple endings  
✅ Single-day build scope  
✅ No deployment dependencies (static files)

---

## 📝 License

Created for the Goose Advent of AI Challenge - Day 2  
Free to use and modify for learning purposes.

---

## 🎄 Acknowledgments

Built with [Goose](https://github.com/block/goose) - An AI coding agent by Block  
Challenge hosted at [Advent of AI](https://adventofai.dev/)

**Happy Holidays and Merry Christmas! ❄️✨**
