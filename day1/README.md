🔮 Madame Zelda's Winter Fortunes

This project is part of the Advent of AI challenge. It generates daily winter fortunes from Madame Zelda, the mystical fortune teller, using Goose CLI.

✨ Features

11 moods: festive, mysterious, grumpy, poetic, sarcastic, romantic, adventurous, spooky, wise, playful, whimsical

Consolidated output: one outputs/fortune.txt per run, with a table of contents and sections for each mood

Automation: GitHub Actions runs daily at 9 AM UTC, commits the latest fortunes, and archives past runs

Local script: scripts/run_fortune.ps1 mirrors the workflow, so local runs produce the same consolidated file

📂 Project Structure

.github/workflows/fortune.yml   # GitHub Actions workflow
scripts/run_fortune.ps1         # PowerShell script to generate fortunes
outputs/fortune.txt             # Latest consolidated fortunes
outputs/archive/                # Archived copies with timestamps

🚀 Usage

Local

Run all moods locally:

pwsh scripts/run_fortune.ps1

This generates outputs/fortune.txt with all moods and saves a timestamped copy in outputs/archive/.

GitHub Actions

Scheduled run: Daily at 9:00 AM UTC

Manual run: Trigger from the Actions tab

Output: Consolidated fortune.txt committed to the repo

Archive: Timestamped copy saved automatically

📊 Status

Madame Zelda now delivers all 11 moods every day, with fortunes archived for posterity. ❄️🔮