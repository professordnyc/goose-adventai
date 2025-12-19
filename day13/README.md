# Goose Advent of AI – Day 13  
[Goose Advent of AI](https://goose.ai/advent-of-ai) 
[Day 13 Challenge](https://goose.ai/advent-of-ai/day13)

---

## 📖 Challenge Overview
Day 13 asked us to use Goose’s **terminal integration** to query staff availability, assign roles, and generate a complete schedule for the festival. The final step was to produce a simple HTML/CSS website that displays the schedule clearly.

⚠️ **Note on environment:**  
Attempts to run Goose CLI in PowerShell and WSL led to persistent `Session not found` and token limit errors. To stay on track, the challenge was completed using **Goose Desktop’s terminal panel**. This ensured queries ran smoothly without risking configuration changes, while still demonstrating Goose’s contextual scheduling capabilities.

---

## ✅ Generated Schedule Highlights
- Emma (First Aid) assigned to **every single shift (9am–5pm daily)** as required  
- David (Photo Booth) scheduled **Mon–Wed (10am–5pm)** when available  
- All staff members have clear assignments matching their availability  
- **Maximum capacity Mon–Wed** with 6–7 staff members per day  
- Training scheduled for **Lisa on Wednesday with Sarah**

---

## 🎯 Important Planning Notes
- Major events should be scheduled **Monday–Wednesday** for full coverage:
  - Security (Marcus)  
  - Photo Booth (David)  
  - Main Stage Sound (Jake)  
  - Full team availability  
- ⚠️ **Thursday–Sunday** are limited capacity:
  - No photo booth, security, or main stage sound available

---

## 📋 Schedule Features
- Individual shift assignments  
- Daily breakdowns  
- Staffing level comparisons  
- Emergency contact reminders  
- Recommendations for event planning  
- Everyone has specific assignments and can see exactly when they’re scheduled to work

---

## ✨ Website Features
### Visual Design
- Gradient header and **color‑coded day sections**  
- Hover effects on staff cards and day sections  
- Color coding:
  - 🔵 Blue headers → full‑capacity days (Mon–Wed)  
  - 🟠 Orange headers → limited capacity (Thu, Sun)  
  - 🔴 Red headers → minimal capacity (Fri, Sat)

### Information Display
- Weekly overview showing staff count and capabilities at a glance  
- Staff cards with role, hours, and special badges  
- Special highlighting:
  - 🔴 Red badge → Emma (required at all events)  
  - 🟡 Yellow badge → David (photo booth expert)  
  - 🔵 Blue badge → other important notes

### Responsive Design
- Works on desktop, tablet, and mobile  
- Grid layouts automatically adjust to screen size

### Key Information
- Critical requirements alert at the top  
- Notes for limited capacity days  
- Clear shift breakdowns (morning/afternoon)  
- Staff capabilities summary for each day

---

## 📂 Viewing the Schedule
Once pushed to the repo, navigate to:
