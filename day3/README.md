# Day 3: Hot Cocoa Championship Crisis

## Challenge Overview
The Winter Festival’s Hot Cocoa Championship has concluded. My task is to create **3+ presentation‑ready visualizations** from the tournament data so that someone could understand the championship results just from the charts.

✅ **Done When:**
- Auto‑Visualiser extension is enabled
- 3+ charts are created from `day3/hotcocoa_results.txt`
- Charts clearly tell the story of the tournament

---

## Links
- [Day 3 Challenge](https://adventofai.dev/challenges/3)  
- [Advent of AI](https://adventofai.dev)

---

## Approach
- Referenced the dataset directly from `day3/hotcocoa_results.txt` in Goose Desktop.
- Used **layered prompts** to avoid token burn and keep context lean.
- Generated charts one at a time, capturing screenshots for each.
- Focused on the Beginner challenge (minimum 3 charts).

---

## Visualizations

### 1. Tournament Bracket
Prompt:  
> Use the data at day3/hotcocoa_results.txt  
> Generate a tournament bracket chart showing progression of recipes through each round and the final winner.

![Bracket Chart](https://github.com/professordnyc/goose-adventai/blob/main/day3/images/bracket.png)



---

### 2. Vote Distribution
Prompt:  
> Use the data at day3/hotcocoa_results.txt  
> Create a bar chart showing the number of votes each recipe received in each round.

![Vote Chart](https://github.com/professordnyc/goose-adventai/blob/main/day3/images/votes.png)


---

### 3. Recipe Attribute Comparison
Prompt:  
> Use the data at day3/hotcocoa_results.txt  
> Make a radar chart comparing sweetness, richness, and spice for the finalist recipes.

![Radar Chart](https://github.com/professordnyc/goose-adventai/blob/main/day3/images/attributes.png)
