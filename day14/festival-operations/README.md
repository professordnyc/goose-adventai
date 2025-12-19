```markdown
# Advent of AI – Day 14 🎪
[Advent of AI Website](https://block.github.io/goose/advent)  
[Day 14 Challenge – Festival Operations Skill](https://block.github.io/goose/advent/day14)

---

## Overview
For Day 14, we created a new Goose skill called **festival-operations**.  
This skill equips Goose with expert knowledge for running winter festival operations, covering:

- **Customer Experience (Madame Zelda)** – handling frustrated guests, adapting fortune‑telling styles, managing wait times.
- **Security & Vendor Relations (Marcus)** – vendor permits, dispute mediation, payment schedules, emergency codes.
- **Lost & Found (Maria)** – intake procedures, verification protocols, common lost item patterns.
- **Marketing & Communications (Elena)** – poster/social media requests, emergency communications, sponsor logo management.

The skill is defined in `skill.yaml` (minimal YAML frontmatter with `name` and `description`) and documented in detail in `SKILL.md`.

---

## File Structure
```text
~/.config/goose/skills/festival-operations/
├── SKILL.md                 # Human-readable documentation/playbook
├── skill.yaml               # Minimal manifest (name + description)
├── checklists/              # Operational checklists
│   ├── opening.md           # Opening procedures
│   └── closing.md           # Closing procedures
└── templates/               # Reusable templates
    └── incident-report.md   # Incident reporting template
```

---

## Usage
With Goose Desktop running and **Developer Tools** + **Skills** enabled:

```powershell
# Check available skills
goose term run "what skills do you have?"

# Use the skill
goose term run "use festival-operations to draft a 3-day festival schedule"
```

> Note: Due to a Windows CLI bug in Goose 1.17.0, these commands were executed in Goose Desktop rather than CLI. The skill loaded successfully and produced expected responses.

## How to Run Locally

To test this skill on your own system:

- Copy the `festival-operations/` folder from `day14/` in this repo into your Goose skills directory:
  ~/.config/goose/skills/

- Ensure Goose Desktop has **Skills** enabled in **Settings → Extensions**.
- Restart Goose Desktop.
- In Goose chat, run:
  what skills do you have?

- You should see `festival-operations` listed.
- Try prompts such as:
  use festival-operations to handle a lost child situation use festival-operations to draft a social media post for a weather delay
---

## Troubleshooting
Several issues were encountered during setup:

- **Error: Session not found**  
  Goose CLI on Windows 11 (v1.17.0) repeatedly failed to start sessions (`goose session`, `goose configure`, `goose version`).  
  - **Resolution**: Reset Goose’s config directories (`%APPDATA%\Block\goose` and `%LOCALAPPDATA%\Block\goose`) and reinstalled Goose Desktop.  
  - **Workaround**: Completed the challenge in Goose Desktop, documenting intended CLI commands in the repo.

---
