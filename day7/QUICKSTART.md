# Quick Start Guide

## 🚀 Run the System in 4 Steps

### Step 1: Process the Data
```bash
python process_lost_found.py
```

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
cd web && python -m http.server 8000
```

### Step 3: View the Dashboard
Open: **http://localhost:8000**

### Step 4: Stop the Server
Press `Ctrl+C` in server terminal

---

## 🤖 Using the Goose Recipe

**Preview:**
```bash
goose run --recipe recipe.yaml --explain
```

**Interactive:**
```bash
goose run --recipe recipe.yaml -s
```

**With prompt:**
```bash
goose run --recipe recipe.yaml -t "Process the lost and found data"
```

---

## ✅ Expected Results

- **26 unique items** from 35 raw entries
- **5 urgent items** flagged for attention
- **9 items** successfully deduplicated
- **6 categories** organized
- **Interactive dashboard** with search and filters

---

## 📊 Sample Output

```
Reading data from data/day2_peak_crowd.txt...
Parsed 35 entries
Deduplicating items...
Deduplicated to 26 unique items
JSON output saved to output/processed_data.json
JSON also copied to web/processed_data.json for web dashboard
Text report saved to output/report.txt
Processing complete!
```

---

## 🎯 Dashboard Features

✅ Summary cards with statistics  
✅ Color-coded urgency levels (red/orange/yellow/white)  
✅ Search and filter controls  
✅ Sortable columns  
✅ Badges for pairs and matches  

---

**Made with ❤️ for the Winter Wonderland Festival** 🎪❄️
