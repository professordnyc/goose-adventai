# Winter Festival Website – Sprint Plan (Day 4)

## Goal
Create a promotional website for next year’s Winter Festival that showcases highlights from Days 1–3 (fortune teller, storytelling, championship visualization) and meets the MUST HAVE requirements.

## MUST HAVE Requirements
- Landing page with festival information
- Highlights from this year (fortune telling, storytelling, cocoa!)
- Beautiful winter theme (snowflakes, cozy vibes)
- Mobile-responsive design
- Deployed and live with a shareable URL

## Sprint Duration
40 minutes

---

## Tasks

### 1. Content Gathering
- Extract summaries from:
  - `../day1/README.md` → Fortune Teller activity
  - `../day2/README.md` → Storytelling activity
  - `../day3/README.md` → Championship visualization activity
- Identify key visuals or artifacts (images, charts, text snippets) to include.

### 2. Information Architecture
- **Header**: Festival title and navigation links.
- **Landing Section**: Introductory text about Winter Festival.
- **Highlights Section**: Three subsections for Day 1–3 activities.
- **Footer**: Festival contact info, links to repo, and Netlify deployment URL.

### 3. Design & Theme
- Apply a winter aesthetic:
  - Snowflake motifs
  - Cozy color palette (whites, blues, warm accents)
- Ensure consistent typography and spacing.

### 4. Responsiveness
- Use CSS media queries for mobile layouts.
- Ensure text and images scale properly on small screens.
- Test on desktop and mobile viewport sizes.

### 5. Deployment
- Configure `netlify.toml` in repo root:
  ```toml
  [build]
    publish = "day4"
- Deploy site via Netlify MCP extension.
- Verify live URL is accessible and shareable.

Deliverables
- index.html and style.css in day4/
- Responsive design verified locally
- Public Netlify URL
- Updated README.md with deployment link.
--End of plan creation
