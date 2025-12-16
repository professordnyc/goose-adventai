# Day 6: GitHub Actions Issue Triage

**Challenge**: [Advent of AI - Day 6](https://adventofai.dev/challenges/6)  
**Website**: [adventofai.dev](https://adventofai.dev)

## Overview

Automated GitHub Actions workflow that intelligently triages new issues by analyzing their content, applying appropriate labels, and posting helpful comments.

## Features

### Core Functionality
- **Automatic Classification**: Analyzes issue title and body to categorize as bug, enhancement, or question
- **Smart Labeling**: Applies category labels with priority order (bug > enhancement > question)
- **Template Comments**: Posts contextual responses using predefined templates
- **Priority Detection**: Assigns priority-high/medium/low based on urgency keywords
- **Sentiment Analysis**: Flags issues needing attention based on emotional indicators

### Labels Applied
- **Category**: `bug`, `enhancement`, `question`
- **Priority**: `priority-high`, `priority-medium`, `priority-low`
- **Sentiment**: `needs-attention`

### Bonus Features
- High-priority notification with issue summary
- Slack webhook integration (commented out, ready to enable)

## Usage

### Installation
1. The workflow is located at `.github/workflows/triage.yml` (repo root)
2. No additional setup required - uses built-in `GITHUB_TOKEN`

### Automatic Triage
When a new issue is opened, the workflow automatically:
1. Analyzes the issue content
2. Applies appropriate labels
3. Posts a helpful comment based on the category

### Comment Templates
- **Bug**: "Thanks for reporting this bug. We'll investigate and update this issue soon."
- **Enhancement**: "Thanks for the idea! We'll review this enhancement request."
- **Question**: "Thanks for your question. We'll follow up with clarification."

## Classification Rules

### Category Detection
- **Bug** (highest priority): "error", "exception", "fails", "broken", "not working", "steps to reproduce"
- **Enhancement**: "feature", "enhancement", "improvement", "add support", "proposal"
- **Question**: "?", "how do i", "help", "clarify", "docs unclear"

### Priority Detection
- **High**: "urgent", "critical", "blocker", "asap", "immediately"
- **Medium**: "important", "soon", "needed"
- **Low**: default

### Sentiment Detection
- **Needs Attention**: "frustrated", "unacceptable", "angry", "disappointed"

## Test Files

Example issues in `festival-feedback/`:
- `advent-ai-issue1.txt` → `bug` + `priority-high` (heating system broken, ASAP)
- `advent-ai-issue2.txt` → `enhancement` + `priority-low` (photo booth suggestion)
- `advent-ai-issue3.txt` → `question` + `priority-low` (lost and found location)

## Optional: Slack Notifications

To enable Slack notifications for high-priority issues:

1. Create a Slack webhook at https://api.slack.com/messaging/webhooks
2. Add as repository secret: `SLACK_WEBHOOK_URL` (Settings > Secrets and variables > Actions)
3. Uncomment the "Notify Slack on High Priority" step in `triage.yml`

## Technical Details

- **Trigger**: `on: issues: types: [opened]`
- **Runner**: `ubuntu-latest`
- **Action**: `actions/github-script@v7`
- **Permissions**: `issues: write`
- **Self-contained**: All classification logic embedded inline, no external dependencies
