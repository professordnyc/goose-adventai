# Gift Tag Generator 🎁

**Day 9 Challenge:** [Advent of AI - Day 9: The Gift Tag Dilemma](https://adventofai.dev)  
**Website:** [adventofai.dev](https://adventofai.dev)

## Overview

A Goose recipe that generates beautiful, print-ready HTML gift tags with dynamic styling, multilingual support, personalized poems, and QR code integration.

## Features

- **4 Dynamic Styles:** Elegant, playful, minimalist, festive
- **3 Size Options:** Small (3.5"×2"), Medium (4"×2.5"), Large (5"×3")
- **Multilingual Support:** English, Spanish, French
- **Personalized Poems:** Context-aware 3-5 line poems
- **QR Code Integration:** Scannable QR codes when URL provided
- **Print-Ready:** Complete HTML with inline CSS and print optimization

## Usage

### Generate a New Tag

1. **Open the recipe:**
   ```bash
   goose recipe open gift-tag-generator.yaml
   ```

2. **Fill in the form fields** in Goose Desktop

3. **Click "Start Recipe"** - the tag generates automatically!

4. **Find your tag** in `output/gift-tag-[recipient-name].html`

5. **Open in browser and print**

## Parameters

| Parameter | Type | Required | Options/Default | Description |
|-----------|------|----------|-----------------|-------------|
| `recipient_name` | string | Yes | - | Gift recipient's name |
| `gift_description` | string | Yes | - | What the gift is |
| `sender_name` | string | Yes | - | Who the gift is from |
| `tag_style` | select | Yes | elegant, playful, minimalist, festive | Visual style theme |
| `include_poem` | boolean | Yes | - | Include personalized poem |
| `gift_size` | select | Yes | small, medium, large | Tag dimensions |
| `qr_message_url` | string | No | (empty) | URL for QR code |
| `favorite_color` | string | No | "blue" | Accent color |
| `language` | select | No | English, Spanish, French | Greeting language |
| `tone` | select | No | formal, casual, humorous, heartfelt | Poem/greeting tone |

## Example Tags Included

Three pre-generated examples in `output/`:

1. **gift-tag.html** - Festive style
   - Recipient: Sarah Chen
   - Gift: Handmade scarf
   - Style: Festive, red accent, medium size, English

2. **gift-tag-elegant.html** - Elegant style
   - Recipient: Marcus Rodriguez
   - Gift: Professional microphone
   - Style: Elegant, navy blue, medium size, Spanish, with QR code

3. **gift-tag-minimalist.html** - Minimalist style
   - Recipient: Emma Thompson
   - Gift: Artisan chocolate collection
   - Style: Minimalist, gold accent, small size, French, with QR code

## Recipe Validation

```bash
goose recipe validate gift-tag-generator.yaml
```

## Success Criteria Met ✅

- ✅ Working gift-tag-generator.yaml recipe
- ✅ All required parameters (10 total)
- ✅ Adaptive layout, styling, content, and poems
- ✅ Working QR code embedding
- ✅ Print-ready HTML output
- ✅ 3 generated example tags

---

*Built with [Goose](https://github.com/block/goose) for Advent of AI 2025*
