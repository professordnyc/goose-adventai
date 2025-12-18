# Day 10: Festival Themed Poster Generator

**Challenge:** <https://adventofai.dev/challenges/10>  
**Advent of AI:** <https://adventofai.dev/>

## Overview

A goose recipe that generates customized HTML festival posters with conditional styling based on event type and winter festive decorations.

## Usage

Run the recipe with required parameters:

```bash
goose recipe run festival-themed-poster.yaml \
  --param event_name="Kid's Storytelling Hour" \
  --param event_datetime="December 17, 3pm-4pm" \
  --param location="Storytelling Tent" \
  --param event_type="Kids"
```

Generated posters are saved to `output/[event-name].html`

## Event Types

- **food** - Warm cream/brown color scheme with gingerbread theme
- **kids** - Light cyan/teal/pink with playful snowmen
- **performance** - Elegant gray with silver/gold sparkles
- **competition** - Orange/red with energetic burst patterns
- **workshop** - Purple/indigo with crafty snowflake patterns

## Success Criteria Fulfilled

✅ **Parameters:** Event name, date/time, location, event type  
✅ **Conditional Logic:** Different styling applied based on event type  
✅ **Winter Theme:** Snowflakes (❄ ✨ ⛄), festive borders, text shadows, gradients  
✅ **HTML Output:** Complete HTML5 documents with embedded CSS  
✅ **File Naming:** Automated based on event name (lowercase, hyphenated)  
✅ **Type-Specific Styling:** 5 distinct color schemes with matching decorative elements

## Example Output

View `output/kids-storytelling-hour.html` in a web browser to see the generated poster with:
- Pink headings and teal text
- Playful snowman and snowflake decorations
- "Winter Festival 2025" subtitle
- Animated sparkle effects
- Rounded winter character border style
