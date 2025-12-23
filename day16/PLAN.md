# PLAN.md
# Winter Festival Countdown App — Planning Document
# IMPORTANT: This document defines the plan ONLY.
# Goose must NOT write any code during planning or inside this file.

---

## 1. Purpose of This Plan
This PLAN.md defines the structure, features, design system, and implementation steps for the Winter Festival Countdown App.  
It is a **planning-only** document.  
Goose will use this plan to guide implementation later, but **must not generate any code** until explicitly instructed.

---

## 2. Rules for Goose During Planning
To maintain a clean workflow:

1. **Do NOT write any code in this PLAN.md.**
2. **Do NOT create files yet.**
3. **Do NOT scaffold directories.**
4. **Do NOT generate HTML, CSS, or JavaScript.**
5. **Do NOT begin implementation.**
6. **Only describe structure, decisions, and steps.**

All code generation will occur **after human approval of this plan**.

---

## 3. Project Overview
The Winter Festival Countdown App is a festive, mobile-responsive web application that includes:

- A real-time countdown to **December 1, 2026 at 10:00 AM**
- Rotating fun facts about the Winter Festival
- An email signup form
- A winter-themed design inspired by Day 4 and Day 5 projects
- Optional enhancements such as snowfall animation and dark mode

The app will follow the conventions and design preferences defined in `.goosehints`.

---

## 4. Tech Stack
- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Styling:** Mobile-first CSS, winter theme, frosted-glass UI, gradients, snowfall animation
- **JavaScript:** Modular functions, minimal globals, readable comments
- **No backend** unless explicitly added later
- **Optional:** LocalStorage for email signups

---

## 5. Planned File Structure
This section defines the intended structure.  
No files should be created yet.
day16/
  index.html
  css/
    styles.css
  js/
    main.js
  assets/
    (images, icons, optional snowflake assets)
  README.md
  .goosehints
  PLAN.md
  TODO.md (optional)
  INSTRUCTIONS.md (optional)

---

## 6. Feature Breakdown

### 6.1 Countdown Timer
- Target date: December 1, 2026, 10:00 AM
- Updates every second
- Displays days, hours, minutes, seconds
- Smooth transitions for number changes
- Large, readable typography

### 6.2 Rotating Fun Facts
- Rotate every 6–10 seconds
- Fade transition
- Use provided festival facts + optional additional facts
- Display in a frosted-glass panel

### 6.3 Email Signup Form
- Basic email validation
- Clear success/error messages
- No backend unless requested
- Optional: store emails in localStorage
- Optional: integrate EmailJS in a later phase

### 6.4 Winter-Themed Design
Inspired by Day 4 and Day 5:

- frosted glass UI
- icy blues and whites
- soft gradients
- rounded corners
- snowfall animation
- festive icons (snowflakes, stars, trees)

### 6.5 Responsiveness
- Mobile-first layout
- Flexible scaling for tablet and desktop
- Use flexbox and grid for layout

---

## 7. Implementation Steps (High-Level)
These steps will be executed **after** planning is complete.

1. Create project folder structure  
2. Generate base HTML layout  
3. Implement countdown logic  
4. Implement fun fact rotation  
5. Add email signup form  
6. Apply winter theme styling  
7. Add animations (snowfall, fades)  
8. Make layout responsive  
9. Test across devices  
10. Prepare for optional deployment to Netlify  

---

## 8. Optional Extensions (For Ultimate Challenge)
If expanding into a full festival website:

- Multi-page site (schedule, vendors, gallery, contact)
- Admin panel for editing fun facts
- Backend for email storage
- Analytics integration
- Deployment to: https://winterfestivalapp.netlify.app

---

## 9. Final Reminder to Goose
**Do NOT generate code in this PLAN.md.**  
Once this plan is human-approved, Goose may proceed with implementation in a separate step.
