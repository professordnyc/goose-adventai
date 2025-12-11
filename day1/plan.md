# Day 1 Challenge Plan: Winter Fortunes with Madame Zelda

## 🎯 Challenge Overview

**Mission**: Help Madame Zelda, the mystical fortune teller, generate enchanting winter fortunes using Goose CLI to serve her customers during the winter season.

**Theme**: Winter fortunes with seasonal magic and mystical elements delivered by Madame Zelda's unique personality.

---

## 📋 Requirements Breakdown

### Core Requirements

#### 1. Generate At Least 3 Fortunes with Different Moods

**Required Moods**: grumpy, poetic, festive, sarcastic, mysterious

**Approach**:
- Create individual fortune files for each required mood
- Ensure each mood has a distinct personality and tone
- Madame Zelda's character should adapt to each mood while remaining recognizable
- Store all fortunes in `outputs/` directory with descriptive filenames

**Implementation Strategy**:
- Generate 5 core fortunes covering all required moods
- Add 6 additional creative moods to exceed expectations (11 total)
- Each fortune will be crafted with unique prompt structures
- All fortunes will feature Madame Zelda as the fortune teller

**Success Criteria**:
- ✅ Minimum 3 fortunes (targeting 11 for excellence)
- ✅ All required moods represented
- ✅ Each mood has distinct characteristics
- ✅ Fortunes saved as separate files

#### 2. Visual Appeal Requirements

**Required Elements**: ASCII art, emojis, borders

**Approach**:
- **ASCII Art Borders**: Use box-drawing characters (╔═══╗, ║, ╚═══╝) to create elegant frames
- **Emojis**: Select mood-appropriate emojis that enhance the theme
  - Festive: 🎄 ❄️ ✨ 🎁 🌟
  - Mysterious: 🌙 🔮 🌨️ ⭐ 🦉
  - Grumpy: 😤 ☕ 💢 ❄️
  - Poetic: 📜 🌙 ✨ ❄️
  - Sarcastic: 🙄 💁 😏 ❄️
- **Borders**: Consistent header and footer with decorative separators

**Design Elements**:
- Professional formatting with proper indentation
- Clear visual hierarchy with headers and sections
- Spacing for readability
- Mood indicator in the header

**Success Criteria**:
- ✅ ASCII borders on all fortunes
- ✅ Mood-specific emoji sets
- ✅ Consistent, professional formatting
- ✅ Visual polish that delights readers

#### 3. Seasonal and Magical Elements

**Seasonal Requirements**: Winter themes throughout

**Approach**:
- **Winter Imagery**: Snow, frost, ice, blizzards, frozen landscapes, icicles
- **Winter Activities**: Sledding, ice skating, snowball fights, hot cocoa
- **Winter Atmosphere**: Cold winds, long nights, cozy fires, blankets
- **Seasonal Metaphors**: Dormancy, transformation, hibernation, renewal

**Magical Requirements**: Mystical and supernatural elements

**Approach**:
- **Madame Zelda's Tools**: Crystal ball, tarot cards, mystical symbols
- **Supernatural Elements**: Spirits, omens, visions, prophecies
- **Fortune-Telling Devices**: Lucky elements, fortune levels, blessings, warnings
- **Stage Directions**: Show Madame Zelda's mystical actions (gazing into ball, candles flickering)

**Success Criteria**:
- ✅ Every fortune includes winter imagery
- ✅ Every fortune has magical elements
- ✅ Madame Zelda's mystical presence throughout
- ✅ Balance of seasonal and supernatural themes

---

## 🏆 Bonus Challenges

### Beginner Bonus: 5+ Different Fortune Styles with Themes

**Requirement**: Create 5+ different fortune styles, experimenting with prompt structures and themes (spooky, romantic, adventurous)

**Approach**:

#### Required Themes (3):
1. **Spooky** - Winter horror, chilling warnings, eerie atmosphere
2. **Romantic** - Love themes, tender connections, cozy winter scenes
3. **Adventurous** - Bold quests, winter expeditions, daring challenges

#### Core Required Moods (5):
4. **Festive** - Joyful celebration, holiday cheer
5. **Mysterious** - Cryptic messages, ancient wisdom
6. **Grumpy** - Irritable complaints, reluctant advice
7. **Poetic** - Lyrical verses, flowing language
8. **Sarcastic** - Witty mockery, eye-rolling humor

#### Additional Creative Styles (3):
9. **Wise** - Philosophical teachings, ancient knowledge
10. **Playful** - Childlike joy, permission to have fun
11. **Whimsical** - Impossible magic, fantastical nonsense

**Prompt Experimentation Strategy**:

Each style will use a different structural approach:

1. **Festive**: Emphasis on celebration language with enthusiastic exclamations
2. **Mysterious**: Focus on cryptic verses with ominous warnings
3. **Grumpy**: Reluctant tone with obvious observations
4. **Poetic**: Verse-based with multiple stanzas and rhyme schemes
5. **Sarcastic**: Ironic language with air quotes and exaggeration
6. **Romantic**: Love-focused with tender imagery and soft language
7. **Adventurous**: Action-oriented with quest terminology
8. **Spooky**: Horror elements with suspense-building structure
9. **Wise**: Teaching-focused with contemplative pacing
10. **Playful**: Permission-giving with energetic, exclamatory style
11. **Whimsical**: Nonsensical structure with backwards logic

**Thematic Variation**:
- Each mood has unique emoji sets
- Different fortune elements (levels, omens, blessings, warnings)
- Varied stage directions showing Madame Zelda's actions
- Distinct vocabulary and tone for each style

**Success Criteria**:
- ✅ Minimum 5 styles (targeting 11 for excellence)
- ✅ All 3 required themes included (spooky, romantic, adventurous)
- ✅ Each style has unique prompt structure
- ✅ Clear experimentation with different approaches
- ✅ Sample fortune generated for each style

---

### Intermediate Bonus: PowerShell Wrapper Script

**Requirement**: Fill in `scripts/run_fortune.ps1` with a script that wraps `goose run`, accepts mood arguments, and pipes output to `outputs/fortune.txt`

**Approach**:

#### Script Structure:
```powershell
1. Parameter Definition
   - Accept mood argument with validation
   - Default to "festive"
   - Use ValidateSet for 11 moods

2. Path Configuration
   - Define script directory
   - Set output paths
   - Ensure output directory exists

3. Prompt Library
   - Create hashtable with 11 mood-specific prompts
   - Each prompt includes detailed instructions
   - Instructions specify Madame Zelda persona

4. Goose CLI Integration
   - Check if Goose is installed
   - Wrap `goose run` command
   - Pass mood-specific prompt
   - Capture output

5. Output Handling
   - Pipe output to outputs/fortune.txt
   - Display in console with colors
   - Handle errors gracefully
```

**Key Features**:
- **Mood Validation**: Only accepts valid mood values
- **Error Handling**: Checks for Goose CLI installation before running
- **User Feedback**: Colorful console messages showing progress
- **Help Documentation**: Comprehensive comment-based help with examples
- **Flexibility**: Works with all 11 mood variations

**Technical Implementation**:
- Use PowerShell's `param()` with `ValidateSet` attribute
- Leverage `& goose run` for command execution
- Pipe output using PowerShell's pipeline operators
- Use `Out-File` with UTF8 encoding for proper emoji support
- Implement try-catch for error handling

**Success Criteria**:
- ✅ Script wraps `goose run` command properly
- ✅ Accepts mood arguments (11 moods supported)
- ✅ Validates input with clear error messages
- ✅ Pipes output to outputs/fortune.txt
- ✅ Displays user-friendly console feedback
- ✅ Includes comprehensive help documentation
- ✅ Handles errors gracefully

---

### Advanced Bonus: GitHub Actions Automation

**Requirement**: Replace the placeholder in `.github/workflows/fortune.yml` with a valid GitHub Actions workflow to automate daily fortune generation

**Approach**:

#### Workflow Structure:

**1. Triggers**:
```yaml
- Scheduled: Daily at 9 AM UTC using cron syntax
- Manual: workflow_dispatch with mood dropdown (11 options)
```

**2. Environment Setup**:
```yaml
- Checkout repository with GITHUB_TOKEN
- Set up Python 3.11 with pip caching
- Install Goose CLI via pip
- Verify installation
```

**3. Mood Selection Logic**:
```yaml
- For scheduled runs: Randomly select from 11 moods
- For manual runs: Use user-selected mood from dropdown
- Store selected mood in output variable
```

**4. Fortune Generation**:
```yaml
- Use bash case statement with 11 mood conditions
- Each case has mood-specific prompt
- Call `goose run` with prompt
- Save output to day1/outputs/fortune.txt
- Add metadata header with timestamp and mood
```

**5. Git Automation**:
```yaml
- Configure git user as github-actions[bot]
- Stage fortune.txt file
- Commit only if changes exist (smart commits)
- Push to repository
```

**6. Fortune Archiving**:
```yaml
- Create archive directory if needed
- Copy fortune to archive with timestamp
- Commit and push archive
```

**Workflow Features**:
- **Daily Automation**: Runs automatically every day without manual intervention
- **Random Variety**: Each scheduled run picks a random mood for diversity
- **Manual Control**: Users can manually trigger with specific moods
- **Smart Commits**: Only commits when fortune content actually changes
- **Historical Archive**: Preserves all generated fortunes with timestamps
- **Error Resilience**: Handles failures gracefully with fallback commands

**Technical Implementation**:
- Use GitHub Actions YAML syntax (v3/v4 actions)
- Implement conditional logic with bash scripting
- Use GitHub context variables for event detection
- Leverage GitHub secrets for authentication
- Implement proper error handling with `||` fallbacks

**Success Criteria**:
- ✅ Valid YAML syntax
- ✅ Daily scheduled runs at 9 AM UTC
- ✅ Manual trigger with 11-mood dropdown
- ✅ Random mood selection for automation
- ✅ Proper Goose CLI installation and execution
- ✅ Automatic git commits and pushes
- ✅ Fortune archiving with timestamps
- ✅ Smart commits (no unnecessary commits)

---

## 🎨 Design Philosophy

### Madame Zelda Character Consistency

**Core Character Traits**:
- Mystical and mysterious
- Professional fortune teller
- Caring but direct with customers
- Uses crystal ball for visions
- Shows personality through stage directions

**Personality Adaptation**:
- Each mood shows a different facet of Madame Zelda
- Character remains recognizable across all moods
- Stage directions show her physical actions and emotions
- Speaking style adapts to mood while maintaining voice

### Visual Design Principles

**Consistency**:
- All fortunes use same ASCII border style
- Headers always include "MADAME ZELDA'S WINTER FORTUNES"
- Mood clearly indicated in each fortune
- Structured layout with clear sections

**Mood Expression**:
- Emojis reinforce the mood theme
- Language and tone match the mood
- Stage directions show mood-appropriate actions
- Fortune elements align with mood (blessing, warning, etc.)

### Prompt Engineering Strategy

**Structure Variation**:
- Different instruction ordering for each mood
- Varied emphasis on different elements
- Unique combinations of requirements
- Experimentation with directive vs. descriptive language

**Content Guidance**:
- Clear specifications for each mood's characteristics
- Specific emoji suggestions for visual coherence
- Stage direction examples to show personality
- Balance of structure and creative freedom

---

## 📁 File Organization

### Directory Structure:
```
day1/
├── outputs/
│   ├── fortune.txt              # Latest generated fortune
│   ├── fortune_festive.txt      # Sample: Festive mood
│   ├── fortune_mysterious.txt   # Sample: Mysterious mood
│   ├── fortune_grumpy.txt       # Sample: Grumpy mood
│   ├── fortune_poetic.txt       # Sample: Poetic mood
│   ├── fortune_sarcastic.txt    # Sample: Sarcastic mood
│   ├── fortune_romantic.txt     # Sample: Romantic mood (bonus)
│   ├── fortune_adventurous.txt  # Sample: Adventurous mood (bonus)
│   ├── fortune_spooky.txt       # Sample: Spooky mood (bonus)
│   ├── fortune_wise.txt         # Sample: Wise mood (extra)
│   ├── fortune_playful.txt      # Sample: Playful mood (extra)
│   ├── fortune_whimsical.txt    # Sample: Whimsical mood (extra)
│   └── archive/                 # Historical fortunes (created by workflow)
├── scripts/
│   └── run_fortune.ps1          # PowerShell wrapper script (intermediate bonus)
├── .github/
│   └── workflows/
│       └── fortune.yml          # GitHub Actions workflow (advanced bonus)
├── plan.md                      # This file - detailed challenge plan
├── project_board.md             # Task tracking and project management
└── README.md                    # Comprehensive project documentation
```

### File Purposes:

**Sample Fortunes** (`outputs/fortune_*.txt`):
- Demonstrate each mood's unique characteristics
- Serve as examples for users
- Show visual design implementation
- Prove prompt structure experimentation

**PowerShell Script** (`scripts/run_fortune.ps1`):
- Provides local fortune generation capability
- Wraps Goose CLI for ease of use
- Demonstrates intermediate bonus completion
- Offers command-line interface with help

**GitHub Actions** (`.github/workflows/fortune.yml`):
- Automates daily fortune generation
- Demonstrates advanced bonus completion
- Provides manual trigger capability
- Archives fortune history

**Documentation Files**:
- `plan.md`: Detailed strategy and approach (this file)
- `project_board.md`: Task breakdown and tracking
- `README.md`: User-facing documentation and guide

---

## 🎯 Success Metrics

### Quantitative Goals:

| Metric | Target | Stretch Goal |
|--------|--------|--------------|
| Core Fortunes | 3+ | 11 |
| Fortune Styles | 5+ (beginner bonus) | 11 |
| Bonus Themes | 3 (spooky, romantic, adventurous) | ✓ |
| Script Functionality | Wraps goose run | ✓ |
| Mood Arguments | Accept & validate | 11 moods |
| GitHub Actions | Valid workflow | Daily + Manual |
| Visual Elements | ASCII, emojis, borders | All fortunes |
| Seasonal Elements | Winter themes | All fortunes |
| Magical Elements | Mystical themes | All fortunes |

### Qualitative Goals:

**User Experience**:
- Fortunes are delightful to read
- Visual design enhances the content
- Madame Zelda's personality shines through
- Each mood feels distinct and authentic

**Technical Quality**:
- Clean, well-documented code
- Proper error handling
- User-friendly interfaces
- Reliable automation

**Creative Excellence**:
- Unique prompt structures
- Varied thematic approaches
- Surprising and engaging content
- Professional polish

---

## 🚀 Implementation Timeline

### Phase 1: Core Requirements
1. ✅ Generate 5 core mood fortunes (festive, mysterious, grumpy, poetic, sarcastic)
2. ✅ Ensure all have ASCII art, emojis, and borders
3. ✅ Verify winter and magical themes throughout

### Phase 2: Beginner Bonus
1. ✅ Add 3 required bonus themes (romantic, adventurous, spooky)
2. ✅ Add 3 extra creative moods (wise, playful, whimsical)
3. ✅ Experiment with 11 different prompt structures
4. ✅ Generate sample fortunes for all 11 styles

### Phase 3: Intermediate Bonus
1. ✅ Create PowerShell script structure
2. ✅ Implement mood parameter with validation
3. ✅ Add prompt library for all 11 moods
4. ✅ Wrap goose run command
5. ✅ Pipe output to fortune.txt
6. ✅ Add error handling and help documentation

### Phase 4: Advanced Bonus
1. ✅ Create GitHub Actions workflow file
2. ✅ Configure scheduled trigger (daily 9 AM UTC)
3. ✅ Add manual trigger with mood dropdown
4. ✅ Implement random mood selection
5. ✅ Set up Python and Goose CLI installation
6. ✅ Add fortune generation logic with 11 moods
7. ✅ Configure git automation
8. ✅ Implement fortune archiving

### Phase 5: Documentation & Polish
1. ✅ Create comprehensive README.md
2. ✅ Write detailed plan.md (this file)
3. ✅ Fill project_board.md with tasks
4. ✅ Final review and testing

---

## 📚 Learning Objectives

### Technical Skills:
- Goose CLI integration and prompt engineering
- PowerShell scripting and parameter handling
- GitHub Actions workflow creation
- YAML syntax and configuration
- Git automation and smart commits
- Error handling and user feedback

### Creative Skills:
- Character voice consistency across moods
- Prompt structure experimentation
- Visual design with ASCII and emojis
- Thematic variation and mood expression
- Storytelling through fortune-telling

### Project Management:
- Requirement analysis and breakdown
- Bonus challenge planning
- File organization and structure
- Documentation creation
- Quality assurance and testing

---

## 🎓 Challenge Completion Criteria

### Must Have (Core):
- ✅ 3+ fortunes with different moods
- ✅ Visual appeal (ASCII, emojis, borders)
- ✅ Seasonal winter themes
- ✅ Magical mystical elements

### Should Have (Bonuses):
- ✅ 5+ fortune styles with varied prompts (beginner)
- ✅ All 3 required themes: spooky, romantic, adventurous (beginner)
- ✅ PowerShell script wrapping goose run (intermediate)
- ✅ GitHub Actions workflow for automation (advanced)

### Nice to Have (Excellence):
- ✅ 11 total fortune styles (exceeding all requirements)
- ✅ Comprehensive documentation
- ✅ Fortune archiving system
- ✅ Error handling and user-friendly interfaces
- ✅ Madame Zelda character consistency

---

## 🔮 Madame Zelda Says...

*"This plan is written with clarity and purpose, dear one. Follow these steps, and the spirits shall guide you to create fortunes that warm hearts throughout the winter season. Each mood, each style, each mystical element has been carefully considered. The path is clear - now walk it with confidence and creativity!"* ✨❄️🌟

---

**Status**: ✅ **PLAN COMPLETE - ALL PHASES IMPLEMENTED**

**Result**: All core requirements and all three bonus challenges achieved with excellence, delivering 11 fortune styles (366% of core requirement, 220% of beginner bonus), complete automation, and comprehensive documentation.
