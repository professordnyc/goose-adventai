import json
import re
from collections import defaultdict
from difflib import SequenceMatcher

# Location normalization mapping
LOCATION_MAP = {
    'hot cocoa stand': 'Hot Cocoa Stand',
    'cocoa booth': 'Hot Cocoa Stand',
    'cocoa stand': 'Hot Cocoa Stand',
    'parking lot': 'Parking Lot',
    'parking': 'Parking Lot',
    'parking area': 'Parking Lot',
    'storytelling tent': 'Storytelling Tent',
    'story tent': 'Storytelling Tent',
    'story area': 'Storytelling Tent',
    'ice rink': 'Ice Skating Rink',
    'ice skating area': 'Ice Skating Rink',
    'skating area': 'Ice Skating Rink',
    'ice skating': 'Ice Skating Rink',
    'fortune teller': 'Fortune Teller Tent',
    'fortune tent': 'Fortune Teller Tent',
}

# Category keywords
CATEGORY_KEYWORDS = {
    'Electronics': ['macbook', 'phone', 'charger', 'camera', 'tesla', 'key fob', 'iphone', 'canon', 'dslr', 'laptop'],
    'Accessories': ['scarf', 'hat', 'umbrella', 'backpack', 'wallet', 'beanie', 'water bottle', 'bottle'],
    'Jewelry': ['ring', 'bracelet', 'necklace', 'earring', 'wedding ring', 'band'],
    'Clothing': ['jacket', 'coat', 'gloves', 'mittens'],
    'Eyewear': ['sunglasses', 'glasses', 'eyeglasses', 'ray-ban', 'rayban'],
    'Personal Items': ['teddy bear', 'stuffed animal', 'toy'],
}

# Urgent keywords
URGENT_KEYWORDS = ['urgent', 'crying', 'passport', 'medical', 'please help', 'very urgent']

# Pair keywords
PAIR_KEYWORDS = ['pair', 'both', 'gloves', 'mittens', 'two']

def clean_location(location):
    """Clean location by removing urgency markers."""
    # Remove urgency markers from location
    location = re.sub(r'\s*-\s*(URGENT|VERY URGENT)!*', '', location, flags=re.IGNORECASE)
    location = re.sub(r'\s*-\s*(kid crying|child lost it|please help.*?)!*$', '', location, flags=re.IGNORECASE)
    return location.strip()

def normalize_location(location):
    """Normalize location names."""
    # First clean the location
    cleaned = clean_location(location)
    location_lower = cleaned.lower().strip()
    return LOCATION_MAP.get(location_lower, cleaned.title())

def is_urgent(description, location):
    """Check if item is urgent based on keywords."""
    text = (description + ' ' + location).lower()
    return any(keyword in text for keyword in URGENT_KEYWORDS)

def categorize_item(description):
    """Categorize item based on keywords."""
    desc_lower = description.lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(keyword in desc_lower for keyword in keywords):
            return category
    return 'Other'

def is_pair(description):
    """Check if item is a pair."""
    desc_lower = description.lower()
    return any(keyword in desc_lower for keyword in PAIR_KEYWORDS)

def similarity(a, b):
    """Calculate similarity ratio between two strings."""
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def parse_line(line):
    """Parse a line into description and location."""
    line = line.strip()
    if not line or line.startswith('Busiest'):
        return None
    
    # Split by last comma to separate description from location
    parts = line.rsplit(',', 1)
    if len(parts) == 2:
        description = parts[0].strip()
        location = parts[1].strip()
        return {'description': description, 'location': location}
    return None

def clean_description(desc):
    """Clean description by removing urgency markers."""
    # Remove URGENT and similar markers
    desc = re.sub(r'\s*-\s*(URGENT|VERY URGENT|please help.*?)!*$', '', desc, flags=re.IGNORECASE)
    desc = re.sub(r'\s*-\s*kid crying!*$', '', desc, flags=re.IGNORECASE)
    desc = re.sub(r'\s*-\s*child lost it!*$', '', desc, flags=re.IGNORECASE)
    return desc.strip()

def deduplicate_items(items):
    """Deduplicate items based on description and location similarity."""
    unique_items = []
    seen = []
    
    for item in items:
        is_duplicate = False
        clean_desc = clean_description(item['description'])
        
        for seen_item in seen:
            seen_desc = clean_description(seen_item['description'])
            
            # Check if descriptions are similar and locations match
            if (similarity(clean_desc, seen_desc) > 0.7 and 
                item['normalized_location'] == seen_item['normalized_location']):
                is_duplicate = True
                # Keep the more urgent one or the more detailed one
                if item['urgent'] and not seen_item['urgent']:
                    # Replace with urgent version
                    unique_items.remove(seen_item)
                    seen.remove(seen_item)
                    is_duplicate = False
                break
        
        if not is_duplicate:
            unique_items.append(item)
            seen.append(item)
    
    return unique_items

def process_lost_found_data(input_file):
    """Process the lost and found data."""
    with open(input_file, 'r') as f:
        lines = f.readlines()
    
    # Parse all items
    items = []
    for line in lines:
        parsed = parse_line(line)
        if parsed:
            normalized_loc = normalize_location(parsed['location'])
            urgent = is_urgent(parsed['description'], parsed['location'])
            category = categorize_item(parsed['description'])
            pair = is_pair(parsed['description'])
            
            items.append({
                'description': parsed['description'],
                'location': parsed['location'],
                'normalized_location': normalized_loc,
                'urgent': urgent,
                'category': category,
                'is_pair': pair
            })
    
    # Deduplicate items
    unique_items = deduplicate_items(items)
    
    # Add IDs
    for i, item in enumerate(unique_items, 1):
        item['id'] = i
    
    # Generate summary statistics
    total_items = len(unique_items)
    urgent_count = sum(1 for item in unique_items if item['urgent'])
    pairs_count = sum(1 for item in unique_items if item['is_pair'])
    
    category_counts = defaultdict(int)
    location_counts = defaultdict(int)
    
    for item in unique_items:
        category_counts[item['category']] += 1
        location_counts[item['normalized_location']] += 1
    
    summary = {
        'total_items': total_items,
        'urgent_items': urgent_count,
        'pairs': pairs_count,
        'categories': dict(category_counts),
        'locations': dict(location_counts)
    }
    
    return {
        'summary': summary,
        'items': unique_items
    }

def main():
    # Process data
    print("Processing lost and found data...")
    data = process_lost_found_data('data/day2_peak_crowd.txt')
    
    # Create output directory if it doesn't exist
    import os
    os.makedirs('output', exist_ok=True)
    
    # Write JSON output
    with open('output/processed_data.json', 'w') as f:
        json.dump(data, f, indent=2)
    print("[OK] Generated output/processed_data.json")
    
    # Write text report
    with open('output/report.txt', 'w') as f:
        f.write("=" * 60 + "\n")
        f.write("LOST & FOUND REPORT - Day 2 Peak Crowd\n")
        f.write("=" * 60 + "\n\n")
        
        f.write(f"Total Items: {data['summary']['total_items']}\n")
        f.write(f"Urgent Items: {data['summary']['urgent_items']}\n")
        f.write(f"Pairs: {data['summary']['pairs']}\n\n")
        
        f.write("-" * 60 + "\n")
        f.write("ITEMS BY CATEGORY\n")
        f.write("-" * 60 + "\n")
        for category, count in sorted(data['summary']['categories'].items()):
            f.write(f"{category:20s}: {count:3d}\n")
        
        f.write("\n" + "-" * 60 + "\n")
        f.write("ITEMS BY LOCATION\n")
        f.write("-" * 60 + "\n")
        for location, count in sorted(data['summary']['locations'].items()):
            f.write(f"{location:25s}: {count:3d}\n")
        
        f.write("\n" + "-" * 60 + "\n")
        f.write("URGENT ITEMS\n")
        f.write("-" * 60 + "\n")
        urgent_items = [item for item in data['items'] if item['urgent']]
        for item in urgent_items:
            f.write(f"[ID {item['id']:3d}] {item['description']}\n")
            f.write(f"          Location: {item['normalized_location']}\n")
            f.write(f"          Category: {item['category']}\n\n")
    
    print("[OK] Generated output/report.txt")
    
    print(f"\nProcessed {data['summary']['total_items']} unique items")
    print(f"Found {data['summary']['urgent_items']} urgent items")
    print(f"Found {data['summary']['pairs']} pairs")

if __name__ == '__main__':
    main()
