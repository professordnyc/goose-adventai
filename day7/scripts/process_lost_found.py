#!/usr/bin/env python3
"""
Lost & Found Data Processing Script
Processes festival lost and found entries, deduplicates, categorizes, and flags urgent items.
"""

import json
import re
from collections import defaultdict
from pathlib import Path


class LostFoundProcessor:
    """Process lost and found items from festival data."""
    
    # Location normalization mapping
    LOCATION_MAP = {
        'cocoa booth': 'Hot Cocoa Stand',
        'hot cocoa stand': 'Hot Cocoa Stand',
        'cocoa stand': 'Hot Cocoa Stand',
        'ice rink': 'Ice Skating Rink',
        'ice skating': 'Ice Skating Rink',
        'ice skating area': 'Ice Skating Rink',
        'skating area': 'Ice Skating Rink',
        'skating': 'Ice Skating Rink',
        'story tent': 'Storytelling Tent',
        'storytelling tent': 'Storytelling Tent',
        'story area': 'Storytelling Tent',
        'fortune teller': 'Fortune Teller Tent',
        'fortune tent': 'Fortune Teller Tent',
        'parking lot': 'Parking Lot',
        'parking area': 'Parking Lot',
        'parking': 'Parking Lot',
    }
    
    # Category keywords for classification
    CATEGORY_KEYWORDS = {
        'Electronics': [
            'macbook', 'laptop', 'phone', 'charger', 'camera', 'iphone', 
            'android', 'tablet', 'ipad', 'kindle', 'headphones', 'airpods',
            'key fob', 'tesla'
        ],
        'Jewelry': [
            'ring', 'bracelet', 'necklace', 'earring', 'watch', 'jewelry'
        ],
        'Eyewear': [
            'glasses', 'sunglasses', 'eyeglasses', 'spectacles'
        ],
        'Clothing': [
            'jacket', 'coat', 'scarf', 'hat', 'beanie', 'gloves', 'mittens',
            'sweater', 'shirt', 'pants', 'shoes', 'boots'
        ],
        'Accessories': [
            'backpack', 'bag', 'purse', 'wallet', 'umbrella', 'water bottle'
        ],
        'Personal Items': [
            'stuffed animal', 'teddy bear', 'toy', 'book', 'keys'
        ],
    }
    
    # Urgency keywords
    URGENCY_KEYWORDS = {
        'critical': ['urgent!!!', 'very urgent', 'crying', 'passport', 'medical', 'medication'],
        'high': ['urgent', 'please help'],
        'medium': ['important'],
    }
    
    # Pair indicators
    PAIR_KEYWORDS = ['pair', 'both', 'gloves', 'mittens', 'earrings', 'shoes', 'boots']
    
    def __init__(self, input_file, output_json, output_report):
        """Initialize processor with file paths."""
        self.input_file = Path(input_file)
        self.output_json = Path(output_json)
        self.output_report = Path(output_report)
        self.items = []
        self.item_id_counter = 1
        
    def normalize_location(self, location):
        """Normalize location names to standard format."""
        location_lower = location.lower().strip()
        return self.LOCATION_MAP.get(location_lower, location.title())
    
    def categorize_item(self, description):
        """Categorize item based on keywords in description."""
        desc_lower = description.lower()
        for category, keywords in self.CATEGORY_KEYWORDS.items():
            if any(keyword in desc_lower for keyword in keywords):
                return category
        return 'Other'
    
    def determine_urgency(self, raw_text):
        """Determine urgency level based on keywords."""
        text_lower = raw_text.lower()
        
        for keyword in self.URGENCY_KEYWORDS['critical']:
            if keyword in text_lower:
                return 'Critical'
        
        for keyword in self.URGENCY_KEYWORDS['high']:
            if keyword in text_lower:
                return 'High'
        
        for keyword in self.URGENCY_KEYWORDS['medium']:
            if keyword in text_lower:
                return 'Medium'
        
        return 'Low'
    
    def is_pair(self, description):
        """Check if item is a pair."""
        desc_lower = description.lower()
        return any(keyword in desc_lower for keyword in self.PAIR_KEYWORDS)
    
    def parse_entry(self, line):
        """Parse a single entry line into components."""
        if not line.strip() or 'busiest day' in line.lower():
            return None
        
        # Split by commas to extract description and location
        parts = [p.strip() for p in line.split(',')]
        if len(parts) < 2:
            return None
        
        # Last part is usually location (after the last comma)
        location_raw = parts[-1]
        
        # Remove urgency markers from location
        location_clean = re.sub(r'\s*-\s*(URGENT|VERY URGENT|urgent|kid crying|child lost it|please help find owner).*$', '', location_raw, flags=re.IGNORECASE)
        location = self.normalize_location(location_clean)
        
        # Everything before location is description
        description_parts = parts[:-1]
        description = ', '.join(description_parts).strip()
        
        # Clean up description formatting
        description = re.sub(r'\s+', ' ', description)
        description = description.replace('(', '').replace(')', '')
        
        return {
            'raw': line,
            'description': description,
            'location': location,
            'urgency': self.determine_urgency(line),
            'category': self.categorize_item(description),
            'is_pair': self.is_pair(description)
        }
    
    def calculate_similarity(self, desc1, desc2):
        """Calculate simple similarity between two descriptions."""
        # Normalize descriptions
        d1 = set(re.findall(r'\w+', desc1.lower()))
        d2 = set(re.findall(r'\w+', desc2.lower()))
        
        if not d1 or not d2:
            return 0.0
        
        intersection = len(d1 & d2)
        union = len(d1 | d2)
        
        return intersection / union if union > 0 else 0.0
    
    def deduplicate_items(self, parsed_items):
        """Deduplicate items based on description and location similarity."""
        unique_items = []
        used_indices = set()
        
        for i, item1 in enumerate(parsed_items):
            if i in used_indices:
                continue
            
            # Create merged item starting with item1
            merged = {
                'id': f'LF{self.item_id_counter:03d}',
                'description': item1['description'],
                'location': item1['location'],
                'category': item1['category'],
                'urgency': item1['urgency'],
                'is_pair': item1['is_pair'],
                'raw_entries': [item1['raw']]
            }
            
            used_indices.add(i)
            
            # Look for duplicates
            for j, item2 in enumerate(parsed_items[i+1:], start=i+1):
                if j in used_indices:
                    continue
                
                # Check if same location and similar description
                if item1['location'] == item2['location']:
                    similarity = self.calculate_similarity(item1['description'], item2['description'])
                    
                    if similarity > 0.4:  # Threshold for considering items as duplicates
                        # Merge - take the more detailed description
                        if len(item2['description']) > len(merged['description']):
                            merged['description'] = item2['description']
                        
                        # Take highest urgency
                        urgency_order = ['Critical', 'High', 'Medium', 'Low']
                        if urgency_order.index(item2['urgency']) < urgency_order.index(merged['urgency']):
                            merged['urgency'] = item2['urgency']
                        
                        merged['raw_entries'].append(item2['raw'])
                        used_indices.add(j)
            
            merged['potential_matches'] = len(merged['raw_entries']) - 1
            unique_items.append(merged)
            self.item_id_counter += 1
        
        return unique_items
    
    def process(self):
        """Main processing function."""
        print(f"Reading data from {self.input_file}...")
        
        with open(self.input_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        # Parse all entries
        parsed_items = []
        for line in lines:
            parsed = self.parse_entry(line)
            if parsed:
                parsed_items.append(parsed)
        
        print(f"Parsed {len(parsed_items)} entries")
        
        # Deduplicate
        print("Deduplicating items...")
        self.items = self.deduplicate_items(parsed_items)
        
        print(f"Deduplicated to {len(self.items)} unique items")
        
        # Generate outputs
        self.generate_json()
        self.generate_report()
        
        print("Processing complete!")
    
    def generate_json(self):
        """Generate JSON output."""
        # Calculate summary statistics
        category_counts = defaultdict(int)
        location_counts = defaultdict(int)
        urgency_counts = defaultdict(int)
        pair_count = 0
        
        for item in self.items:
            category_counts[item['category']] += 1
            location_counts[item['location']] += 1
            urgency_counts[item['urgency']] += 1
            if item['is_pair']:
                pair_count += 1
        
        output_data = {
            'summary': {
                'total_items': len(self.items),
                'categories': dict(category_counts),
                'locations': dict(location_counts),
                'urgency_levels': dict(urgency_counts),
                'pairs': pair_count
            },
            'items': self.items
        }
        
        self.output_json.parent.mkdir(parents=True, exist_ok=True)
        with open(self.output_json, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2)
        
        print(f"JSON output saved to {self.output_json}")
        
        # Also copy to web directory for easy serving
        web_json = self.output_json.parent.parent / 'web' / 'processed_data.json'
        web_json.parent.mkdir(parents=True, exist_ok=True)
        with open(web_json, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2)
        print(f"JSON also copied to {web_json} for web dashboard")
    
    def generate_report(self):
        """Generate text report."""
        report_lines = []
        report_lines.append("=" * 80)
        report_lines.append("LOST & FOUND PROCESSING REPORT")
        report_lines.append("=" * 80)
        report_lines.append("")
        
        # Summary
        report_lines.append(f"Total Unique Items: {len(self.items)}")
        report_lines.append("")
        
        # By Category
        report_lines.append("ITEMS BY CATEGORY:")
        report_lines.append("-" * 40)
        category_counts = defaultdict(int)
        for item in self.items:
            category_counts[item['category']] += 1
        
        for category in sorted(category_counts.keys()):
            report_lines.append(f"  {category:20s}: {category_counts[category]:3d}")
        report_lines.append("")
        
        # By Location
        report_lines.append("ITEMS BY LOCATION:")
        report_lines.append("-" * 40)
        location_counts = defaultdict(int)
        for item in self.items:
            location_counts[item['location']] += 1
        
        for location in sorted(location_counts.keys()):
            report_lines.append(f"  {location:25s}: {location_counts[location]:3d}")
        report_lines.append("")
        
        # By Urgency
        report_lines.append("ITEMS BY URGENCY:")
        report_lines.append("-" * 40)
        urgency_counts = defaultdict(int)
        for item in self.items:
            urgency_counts[item['urgency']] += 1
        
        for urgency in ['Critical', 'High', 'Medium', 'Low']:
            if urgency in urgency_counts:
                report_lines.append(f"  {urgency:15s}: {urgency_counts[urgency]:3d}")
        report_lines.append("")
        
        # Pairs
        pair_count = sum(1 for item in self.items if item['is_pair'])
        report_lines.append(f"Items That Are Pairs: {pair_count}")
        report_lines.append("")
        
        # Urgent Items Detail
        urgent_items = [item for item in self.items if item['urgency'] in ['Critical', 'High']]
        if urgent_items:
            report_lines.append("URGENT ITEMS REQUIRING ATTENTION:")
            report_lines.append("-" * 40)
            for item in sorted(urgent_items, key=lambda x: ['Critical', 'High'].index(x['urgency'])):
                report_lines.append(f"  [{item['urgency']:8s}] {item['id']}: {item['description']}")
                report_lines.append(f"               Location: {item['location']}")
                if item['potential_matches'] > 0:
                    report_lines.append(f"               Potential Matches: {item['potential_matches']}")
                report_lines.append("")
        
        report_lines.append("=" * 80)
        report_lines.append("END OF REPORT")
        report_lines.append("=" * 80)
        
        self.output_report.parent.mkdir(parents=True, exist_ok=True)
        with open(self.output_report, 'w', encoding='utf-8') as f:
            f.write('\n'.join(report_lines))
        
        print(f"Text report saved to {self.output_report}")


def main():
    """Main entry point."""
    # Set up paths
    base_dir = Path(__file__).parent.parent
    input_file = base_dir / 'data' / 'day2_peak_crowd.txt'
    output_json = base_dir / 'output' / 'processed_data.json'
    output_report = base_dir / 'output' / 'report.txt'
    
    # Process data
    processor = LostFoundProcessor(input_file, output_json, output_report)
    processor.process()


if __name__ == '__main__':
    main()
