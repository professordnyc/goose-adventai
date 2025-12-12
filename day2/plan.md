# The Winter Path Home - Project Plan 🌨️
**Day 2: Goose Advent AI Challenge**

---

## ✅ PROJECT STATUS: COMPLETE

**Built:** December 12, 2025  
**Location:** `C:\Users\profe\Documents\projects\goose-adventai\day2\`

---

## 🎯 How to Play

**Start Server:**
```bash
cd C:/Users/profe/Documents/projects/goose-adventai/day2
python -m http.server 8000
```

**Open Browser:** Navigate to `http://localhost:8000`

**Stop Server:** Press `Ctrl+C`

---

## 🆕 New Features

### Modal Dialog
- Replaces browser confirm() with custom modal
- Appears on page reload if saved game exists
- Options: "Continue Adventure" or "Start New Game"

### Stats Display
- **Turns:** Total choices made
- **Correct:** Correct riddle answers on first attempt
- **Score:** Current riddle score (0-2)
- Displayed in header after first choice

### Enhanced Snowflakes
- 20 falling snowflakes across screen
- Random positions, speeds, and sizes
- Visible but non-distracting

### Artifact Image
- SVG snowflake icon appears with dream ending
- Blue crystalline design with golden glow
- Displayed above artifact message

---

## 📁 Files

```
day2/
├── index.html          (Modal + Stats added)
├── css/style.css       (Modal, stats, snowflakes, artifact image)
├── js/main.js          (Modal logic, stats tracking, snowflake creation)
└── js/story.js         (Unchanged)
```

---

## 🎮 Game Flow

**Start** → Teacher choice → Path choice → Accept riddles → Riddle 1 (Snow) → Riddle 2 (Dream) → Ending

**Loops:** help_loop, usual_loop, refuse_loop (force progression)

**Endings:**
- **Success** (score < 2): Safe home, warm sunset
- **Dream** (score = 2): Classroom awakening + crystalline snowflake artifact

---

## 🧩 Riddles

**Riddle 1:** "I fall from the sky... white and cold... warm hearts..." → **Snow**  
**Riddle 2:** "Only when not awake... more real than reality..." → **Dream**

---

## 💾 Persistence

**Saved Data:**
```json
{
  "node": "riddle_1",
  "score": 1,
  "turns": 3,
  "correct": 1
}
```

**Auto-save:** After every choice  
**Load:** Modal on page reload  
**Clear:** On restart

---

## 🎨 Design

**Colors:** Ice blue gradient, winter blue accents, gold artifact  
**Fonts:** Merriweather (story), Inter (UI)  
**Animations:** Fade-in, pulse (correct), shake (incorrect), falling snow

---

## ✅ Testing

1. Start server: `python -m http.server 8000`
2. Open: `http://localhost:8000`
3. Play to riddle_1, refresh → Modal appears
4. Click "Continue" → Resume from riddle_1
5. Answer both riddles correctly → Dream ending + snowflake image
6. Click restart → Stats reset, new game

---

**Ready to play!** 🎄✨
