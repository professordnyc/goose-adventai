# Day 6: GitHub Actions Issue Triage Workflow

## Prompt
Create a GitHub Actions workflow that automatically triages new issues by analyzing content, applying labels, and posting appropriate comments.

## Requirements
- Trigger: `on: issues: types: [opened]`
- Classify into: bug, enhancement, or question
- Use exact comment templates
- Add priority labels (high/medium/low) and sentiment flags
- Include Slack notification option (commented out)

## Implementation
Created `.github/workflows/triage.yml` at repo root with:

### Classification Logic (priority order: bug > enhancement > question)
- **Bug**: error, exception, fails, broken, not working, steps to reproduce
- **Enhancement**: feature, enhancement, improvement, add support, proposal
- **Question**: ?, how do i, help, clarify, docs unclear, where is

### Labels Applied
- Category: `bug`, `enhancement`, `question`
- Priority: `priority-high`, `priority-medium`, `priority-low`
- Sentiment: `needs-attention`

### Test Files Mapping
- `advent-ai-issue1.txt` → bug + priority-high
- `advent-ai-issue2.txt` → enhancement + priority-low
- `advent-ai-issue3.txt` → question + priority-low

## Result
Self-contained workflow using `actions/github-script@v7` with embedded classification logic. High-priority issues trigger additional notification comment. Slack webhook included as commented-out step with setup instructions.
