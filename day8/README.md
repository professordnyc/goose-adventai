# Day 8: Data Cleaning with Goose CLI

**Challenge Link:** [Advent of AI - Day 8](https://adventofai.dev/challenges/8)
**Goose Advent of AI Link:** [Advent of AI](https://adventofai.dev)

## Overview

Day 8's challenge focused on transforming messy, unstructured vendor data into clean, machine-readable JSON format. The task simulated a real-world scenario where vendor information was hastily scribbled on napkins with hot cocoa stains, requiring data cleaning and normalization.

## Challenge Description

The goal was to:
- Read a messy vendor list from a text file
- Clean and normalize the vendor information
- Structure the data into consistent fields:
  - Vendor name
  - Category
  - Location
  - Contact info
- Output the result as machine-readable JSON

## Files

- **`messy-vendor-list.txt`** - Source data: Dmitri's napkin notes with inconsistent formatting, random capitalization, and mixed delimiters
- **`txt-to-json.md`** - Instructions file used with Goose CLI's `--instructions` flag
- **`hot-cocoa-stain-free-data.json`** - Final output: Clean, structured vendor data in JSON format

## Solution Approach

### Goose CLI Usage

The challenge was solved using the Goose CLI with two key flags:

```bash
goose run --instructions txt-to-json.md --output-format json > hot-cocoa-stain-free-data.json
```

**Key CLI Features Used:**

1. **`--instructions`**: Provided the task instructions from `txt-to-json.md`
2. **`--output-format json`**: Ensured the output was formatted as valid JSON

### Data Transformation

**Before (Messy):**
```
║  Joes hot cocoa - main plaza - hot drinks & pastries     ║
║  TACO TRUCK DEL FUEGO!!! north entrance mexican food     ║
║  sweet treats bakery, near the ice rink... cookies       ║
```

**After (Clean):**
```json
{
  "vendors": [
    {
      "vendor_name": "Joe's Hot Cocoa",
      "category": "Hot Drinks & Pastries",
      "location": "Main Plaza",
      "contact_info": null
    },
    {
      "vendor_name": "Taco Truck Del Fuego",
      "category": "Mexican Food",
      "location": "North Entrance",
      "contact_info": null
    }
  ]
}
```

### Cleaning Steps Performed

1. **Removed decorative elements** - ASCII art borders and header lines
2. **Normalized capitalization** - Proper title case for vendor names
3. **Parsed delimiters** - Extracted information from various separators (-, commas, spaces)
4. **Structured fields** - Mapped raw text to consistent schema
5. **Handled missing data** - Set `contact_info` to `null` where unavailable

## Results

Successfully cleaned and structured **10 vendors** from Dmitri's napkin notes:

- Joe's Hot Cocoa
- Taco Truck Del Fuego
- Sweet Treats Bakery
- Pierogi Palace
- Waffle Wonderland
- Mama's Meatballs
- The Pretzel Pretender
- Curry in a Hurry
- Sushi on Ice
- Pizza Palace

## Post-Processing

The raw JSON output from Goose included metadata about the conversation (messages, token counts, etc.). These metadata lines were manually removed to produce the final clean `hot-cocoa-stain-free-data.json` file containing only the vendor data.

## Key Learnings

1. **Goose CLI Flags**: The `--instructions` and `--output-format` flags enable automated, structured data processing
2. **Data Normalization**: AI agents can effectively clean and normalize messy real-world data
3. **JSON Structuring**: Goose can transform unstructured text into well-formatted JSON schemas
4. **Metadata Handling**: Output files may need post-processing to extract just the desired data

## Technologies Used

- **Goose CLI** - AI agent for data processing
- **JSON** - Output format for structured data
- **Markdown** - Instruction format

---

*Challenge completed as part of [Advent of AI 2025](https://adventofai.dev/)*🎄
