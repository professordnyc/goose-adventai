# Festival Lost & Found Management System

A complete lost and found processing system for the Winter Wonderland Festival, featuring intelligent deduplication, categorization, urgency detection, and an interactive web dashboard.

## 🎯 Features

### Data Processing
- **Smart Deduplication**: Merges duplicate entries based on description and location similarity
- **Location Normalization**: Standardizes location names (e.g., "cocoa booth" → "Hot Cocoa Stand")
- **Intelligent Categorization**: 7 categories (Electronics, Jewelry, Eyewear, Clothing, Accessories, Personal Items, Other)
- **Urgency Detection**: Flags items requiring immediate attention (Critical, High, Medium, Low)
- **Pair Identification**: Detects items that come in pairs (gloves, mittens, earrings, shoes)
- **Duplicate Tracking**: Counts potential matches for each unique item

### Web Dashboard
- **Summary Overview**: Real-time statistics for items, categories, locations, urgency levels, and pairs
- **Interactive Table**: Sortable columns with color-coded urgency levels
- **Advanced Filtering**: Search by text, category, location, and urgency level
- **Visual Indicators**: Color coding (red/orange/yellow/white), badges for pairs and matches
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📁 Project Structure

```
day7/
├── README.md                      # This file
├── QUICKSTART.md                  # Quick reference guide
├── PROJECT_STATUS.md              # Development status
├── recipe.yaml                    # Goose recipe for automation
├── process_lost_found.py          # Main processing script
├── start_server.ps1               # PowerShell server launcher
├── start_server.bat               # Batch file server launcher
├── setup.ps1                      # Project setup script
├── data/
│   └── day2_peak_crowd.txt       # Raw input data (35 entries)
├── output/
│   ├── processed_data.json       # Structured JSON output
│   └── report.txt                # Summary report
└── web/
    ├── index.html                # Dashboard HTML
    ├── style.css                 # Dashboard CSS
    ├── app.js                    # Dashboard JavaScript
    └── processed_data.json       # Copy of JSON for web access
```

## 🚀 Quick Start

### Prerequisites
- Python 3.6+ (no external dependencies)
- Web browser

### Step 1: Process the Data

```bash
python process_lost_found.py
```

**Output:** Processes 35 entries → 26 unique items with deduplication, categorization, and urgency flagging.

### Step 2: Start the Server

**PowerShell:**
```powershell
.\start_server.ps1
```

**Batch:**
```cmd
.\start_server.bat
```

**Manual:**
```bash
cd web
python -m http.server 8000
```

### Step 3: View Dashboard

Open: **http://localhost:8000**

### Step 4: Stop Server

Press `Ctrl+C` in the server terminal.

**Note:** When running servers via Goose shell tool, background processes may not persist. Start the server in a separate terminal window for reliable operation.

## 📊 Sample Results

### Deduplication Example

**Before:** 2 entries
```
silver macbook pro, hot cocoa stand - URGENT
MacBook (silver) found at cocoa booth
```

**After:** 1 unique item
```json
{
  "id": "LF001",
  "description": "MacBook silver found at cocoa booth",
  "location": "Hot Cocoa Stand",
  "category": "Electronics",
  "urgency": "High",
  "potential_matches": 1
}
```

### Typical Results (Day 2 data)
- **26 unique items** from 35 raw entries
- **5 urgent items** flagged
- **9 items** deduplicated
- **6 categories** organized
- **Electronics**: 4 items | **Jewelry**: 2 items | **Eyewear**: 2 items
- **Clothing**: 7 items | **Accessories**: 4 items | **Personal**: 1 item

## 🔧 Customization

### Deduplication Sensitivity

Edit `process_lost_found.py`, line ~175:
```python
if similarity > 0.4:  # Adjust threshold (0.0-1.0)
```

### Add Categories

Edit `CATEGORY_KEYWORDS` in `process_lost_found.py`:
```python
CATEGORY_KEYWORDS = {
    'YourCategory': ['keyword1', 'keyword2'],
    ...
}
```

### Urgency Keywords

Edit `URGENCY_KEYWORDS` in `process_lost_found.py`:
```python
URGENCY_KEYWORDS = {
    'critical': ['urgent!!!', 'very urgent', 'custom_keyword'],
    ...
}
```

### Dashboard Colors

Edit `web/style.css`:
```css
tr.urgency-critical { background: #ffe0e0 !important; }
tr.urgency-high { background: #fff3cd !important; }
```

## 🤖 Using the Goose Recipe

```bash
goose run --recipe recipe.yaml -s
```

The recipe automates:
1. Project structure verification
2. Data processing
3. Results review
4. Web dashboard testing
5. Validation and summary

## 📝 How It Works

### Duplicate Detection
- **Location Matching**: Only compares items from same location
- **Text Similarity**: Jaccard similarity on tokenized descriptions
- **Threshold**: >40% word overlap = duplicate
- **Merging**: Keeps most detailed description + highest urgency

### Urgency Flagging
- **Critical**: "URGENT!!!", "VERY URGENT", "crying", "passport", "medical"
- **High**: "URGENT", "please help"
- **Medium**: "important"
- **Low**: Everything else

### Location Normalization
| Raw Input | Normalized |
|-----------|------------|
| cocoa booth, hot cocoa stand | Hot Cocoa Stand |
| ice rink, skating area | Ice Skating Rink |
| story tent, storytelling tent | Storytelling Tent |

## 🐛 Troubleshooting

### Server won't start via Goose
Run server in a separate terminal window manually. Background processes through Goose shell tool may not persist reliably.

### "Failed to load data" in dashboard
1. Run `python process_lost_found.py` first
2. Verify `output/processed_data.json` exists
3. Ensure serving from `web/` directory

### Port already in use
```bash
python -m http.server 8080  # Use different port
```

## 🎓 Learning Points

- Text processing and normalization in Python
- Deduplication algorithms using similarity metrics
- Data categorization with keyword matching
- JSON data structures for web consumption
- Responsive web design with HTML/CSS/JavaScript
- Interactive dashboards with filtering and sorting
- Goose recipes for workflow automation

## 📜 License

Demonstration project for the Goose Advent AI challenge.

## 🤝 Enhancement Ideas

- Multi-day tracking (Days 1, 2, 3)
- Export to PDF/CSV
- Email notifications for urgent items
- Owner contact database
- Image upload for visual ID
- QR code generation
- Festival staff app integration

---

**Made with ❤️ for the Winter Wonderland Festival** 🎪❄️
