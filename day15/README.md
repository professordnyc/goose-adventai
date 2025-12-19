# Day 15: The Social Media Blitz

**Challenge Link**: https://adventofai.dev/challenges/15

## Overview

A social media campaign orchestration system that generates platform-specific content for Instagram, Twitter/X, and Facebook using a main orchestrator recipe that calls specialized sub-recipes.

This solution automates the creation of customized social media content for festival events, allowing you to input event details once and receive perfectly formatted content for all three platforms instantly.

## Architecture

The system consists of 4 recipes:

### Sub-Recipes (Platform-Specific)
- **instagram-post.yaml** - Generates Instagram captions with strategic hashtags and emoji
- **twitter-thread.yaml** - Creates concise Twitter/X threads (3-5 tweets) that build excitement
- **facebook-event.yaml** - Produces detailed Facebook event descriptions with logistics

### Main Orchestrator
- **social-campaign.yaml** - Coordinates all three sub-recipes to generate a complete campaign

## Usage

### Import the Recipe

1. Open Goose Desktop application
2. Navigate to the Recipes section
3. Click "Import Recipe"
4. Select `social-campaign.yaml` from the day15 folder
5. The orchestrator will automatically detect and import the sub-recipes

### Run a Campaign

Execute the main recipe with the required parameters:

```yaml
event_name: "Grand Ice Sculpture Unveiling"
event_date: "December 21, 2025 at 6:00 PM"
event_description: "Experience breathtaking ice sculptures created by world-renowned artists at our Winter Festival's most anticipated event."
target_audience: "Art enthusiasts, families, and winter festival lovers"
call_to_action: "RSVP now at winterfestival.com/sculptures"
```

The system will generate:
- ✅ Instagram post with caption and hashtags
- ✅ Twitter/X thread (3-5 tweets)
- ✅ Facebook event description

## Features

- **Platform-Authentic Content**: Each sub-recipe generates content tailored to its platform's unique style and tone
- **Consistent Messaging**: All platforms share core event information while adapting format and presentation
- **Reusable System**: Use for any festival event by simply changing the input parameters
- **Time-Saving**: Generate complete multi-platform campaigns in seconds instead of manually crafting each post

## Success Criteria

✅ 4 working recipe files (3 sub-recipes + 1 main orchestrator)  
✅ Each sub-recipe generates platform-specific content  
✅ Main recipe successfully calls all 3 sub-recipes  
✅ Compatible with Goose Desktop UI import system  
✅ All YAML files validated  

## Example Output

### Sample Campaign: Grand Ice Sculpture Unveiling

**Event Details:**
- Event: Grand Ice Sculpture Unveiling
- Date: December 21, 2025
- Description: A grand day of artistic sculpting, followed by exquisite unveiling
- Target Audience: Families, artists, fans of quirky, investors
- Call to Action: Bring your enthusiasm and cameras for a snap-worthy time!

**Generated Content:**

#### 📸 Instagram Post
- Engaging 2-3 paragraph caption with visual, community-focused tone
- Strategic use of emoji throughout (✨🧊🎨📷❄️)
- 15 targeted hashtags: #IceSculpture #WinterArt #GrandUnveiling #ArtisticMagic #FamilyFun #QuirkyEvents #DecemberEvents #IceSculpting #WinterWonderland #ArtLovers #FrozenArt #SculptureArt #CommunityEvents #SnapWorthy #December2025

#### 🐦 Twitter/X Thread
- 5-tweet thread optimized for engagement
- Tweet 1: Hook announcement (under 280 chars)
- Tweets 2-4: Build excitement with key details
- Tweet 5: Strong call to action with hashtags
- Strategic emoji usage (1-2 per tweet max)
- Hashtags: #IceSculpture #WinterArt #December2025

#### 📘 Facebook Event Description
- Comprehensive 5-paragraph event description
- Welcoming, informative tone as if written by friendly organizer
- Clear sections: Introduction, What to Expect, Who Should Attend, What to Bring, Important Details
- Professional emoji usage for readability
- Community-focused messaging with clear logistics

---

The campaign generator produces properly formatted content for:
- Instagram: Captivating visual-focused captions with emoji and strategic hashtags
- Twitter/X: Concise, punchy threads that build momentum and engagement
- Facebook: Detailed, informative descriptions with logistics and community focus

## Requirements

- Goose Desktop application
- Access to an LLM provider (Claude, GPT-4, etc.)

## Learn More

- [Recipe Reference - Sub-recipes](https://block.github.io/goose/plugins/using-plugins.html#sub-recipes)
- [Goose Recipes Guide](https://block.github.io/goose/guidance/recipes.html)
- [Advanced Recipe Tips](https://www.youtube.com/watch?v=example)

