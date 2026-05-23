# 🎮 COSMIC QUEST UI LAYOUT & DESIGN REFERENCE

## Complete Visual Interface

```
╔════════════════════════════════════════════════════════════════════════════╗
║                  🎬 COSMIC QUEST: THE DUNGEON RECKONING 🎬               ║
║                   A Tale of Passion, Betrayal, and Redemption              ║
╚════════════════════════════════════════════════════════════════════════════╝

┌──────────────────────┬────────────────────────────┬──────────────────────────┐
│                      │                            │                          │
│   ⚔️ HERO STATS      │   🎮 MAIN GAME AREA       │   📜 STORY LOG           │
│                      │                            │                          │
│ ┌──────────────────┐ │ ┌──────────────────────┐  │ ┌────────────────────┐  │
│ │ ❤️ HEALTH        │ │ │ 📖 NARRATOR          │  │ │ Game Events:       │  │
│ │ ████████░░ 80/100│ │ │                      │  │ │                    │  │
│ │                  │ │ │ "Your adventure in  │  │ │ > Explored Room 5  │  │
│ │ Level: 5         │ │ │  the dungeon begins │  │ │ > Found 50 gold    │  │
│ │ EXP: 45/150      │ │ │  NOW!"               │  │ │ > Defeated Goblin  │  │
│ │ GOLD: 250 🪙      │ │ └──────────────────────┘  │ │ > Level Up! (→ 6)  │  │
│ │ DAMAGE: 8 ⚔️     │ │                            │ │ > Boss Appeared!   │  │
│ │ ROOM: 12         │ │ ┌──────────────────────┐  │ │ > Victory!         │  │
│ │                  │ │ │ 👹 ENEMY             │  │ │                    │  │
│ │ DEFEATS:         │ │ │ Orc - The Brute     │  │ │ [scrollable]        │  │
│ │ • Goblin  ×5    │ │ │                      │  │ │                    │  │
│ │ • Orc     ×3    │ │ │ ███░░░░ 18/25 HP    │  │ │ • Timestamp logs   │  │
│ │ • Skeleton ×2   │ │ └──────────────────────┘  │ │ • Color coded      │  │
│ │ • Shadow Beast×1│ │                            │ │ • Auto-scroll      │  │
│ │                  │ │ ┌──────────────────────┐  │ └────────────────────┘  │
│ │                  │ │ │ 📜 DESCRIPTION       │  │                          │
│ │                  │ │ │                      │  │                          │
│ │                  │ │ │ You enter a dark    │  │                          │
│ │                  │ │ │ chamber. Suddenly,  │  │                          │
│ │                  │ │ │ a figure emerges    │  │                          │
│ │                  │ │ │ from the shadows!   │  │                          │
│ │                  │ │ └──────────────────────┘  │                          │
│ │                  │ │                            │                          │
│ │                  │ │ ┌──────────────────────┐  │                          │
│ │                  │ │ │ [🔍Explore] [⚔️Fight]│  │                          │
│ │                  │ │ │ [🏃 Run] [❌ Quit]   │  │                          │
│ │                  │ │ └──────────────────────┘  │                          │
│ │                  │ │                            │                          │
└──────────────────────┴────────────────────────────┴──────────────────────────┘
```

## Component Breakdown

### 🎬 Header
```
═══════════════════════════════════════════════════════════════════════
        🎬 COSMIC QUEST: THE DUNGEON RECKONING 🎬
           A Tale of Passion, Betrayal, and Redemption
═══════════════════════════════════════════════════════════════════════

Style: Purple gradient background
Glow: Pink neon shadow effect
Font: Large, bold, letter-spaced
Animation: Subtle pulsing glow
```

### 📊 Left Panel: Stats

```
┌─ ⚔️ HERO ─────────────────────┐
│                                │
│ ┌─ HEALTH ─────────────────┐  │
│ │ ████████░░ 80/100        │  │
│ │ ❤️                        │  │
│ └───────────────────────────┘  │
│                                │
│ ┌─ LEVEL ───────────────────┐  │
│ │ 5                         │  │
│ └───────────────────────────┘  │
│                                │
│ ┌─ EXP ─────────────────────┐  │
│ │ ███░░░░░░ 45/150         │  │
│ └───────────────────────────┘  │
│                                │
│ ┌─ GOLD ────────────────────┐  │
│ │ 250 🪙                     │  │
│ └───────────────────────────┘  │
│                                │
│ ┌─ DAMAGE ──────────────────┐  │
│ │ 8 ⚔️                       │  │
│ └───────────────────────────┘  │
│                                │
│ ┌─ ROOM ────────────────────┐  │
│ │ 12                        │  │
│ └───────────────────────────┘  │
│                                │
│ ┌─ Defeated Foes ───────────┐  │
│ │ • Goblin        ×5        │  │
│ │ • Orc           ×3        │  │
│ │ • Skeleton      ×2        │  │
│ │ • Shadow Beast  ×1        │  │
│ │ • Flame Elemental ×1      │  │
│ └───────────────────────────┘  │
│                                │
└────────────────────────────────┘

Colors:
- Labels: Light gray
- Values: Cyan for health, orange for damage, gold for gold
- Borders: Purple dotted
- Background: Dark semi-transparent
```

### 🎮 Center Panel: Game Area

#### Narrator Box
```
┌─────────────────────────────────────────────┐
│ 📖  "Something STIRS in the darkness!       │
│     A Goblin EMERGES from the shadows!"     │
│                                             │
│     Its eyes glow with malicious intent.    │
│     You feel the weight of impending doom.  │
└─────────────────────────────────────────────┘

Style: Gradient purple-to-pink background
Glow: Pulsing magenta border glow
Animation: Typewriter fade-in
Font: Dramatic uppercase with quoted text
```

#### Enemy Display (When in Battle)
```
┌─────────────────────────────────────────────┐
│  ┌──────┐  Enemy Name                       │
│  │ 👹   │  Role: The Brute               │
│  │      │  Health: ███░░░░░░ 18/25 HP    │
│  └──────┘                                   │
└─────────────────────────────────────────────┘

Enemy Portrait:
- Large emoji (2x size)
- Colored background (red for enemies)
- Glowing border
- Bounce-in animation

Health Bar:
- Green to red gradient
- Smooth width transition
- Glowing shadow

Role:
- Orange italic text
- Describes their type
```

#### Room Description
```
┌─────────────────────────────────────────────┐
│ You stand in a vast chamber. Ancient        │
│ markings cover the walls, pulsing with      │
│ otherworldly energy. A treasure chest       │
│ sits in the corner, its lock glowing with   │
│ magical runes.                              │
└─────────────────────────────────────────────┘

Style: Dark background with subtle border
Font: Monospace, line-spaced
Animation: Slide down fade-in
Color: Light gray text
```

#### Action Buttons
```
┌──────────┬──────────┬──────────┬──────────┐
│ 🔍       │ ⚔️       │ 🏃       │ ❌       │
│ EXPLORE  │ FIGHT    │ RUN      │ QUIT     │
└──────────┴──────────┴──────────┴──────────┘

Button Styles:
- Icon on top, text below
- Purple gradient with borders
- Glow effect on hover
- Smooth transitions
- Disabled state: 50% opacity

Colors:
- Explore: Cyan border & glow
- Fight: Red border & glow  
- Run: Orange border & glow
- Quit: Red border & glow
```

### 📜 Right Panel: Story Log

```
┌──────────────────────────────────────┐
│ 📜 STORY LOG                         │
├──────────────────────────────────────┤
│ • You started your journey          │
│ • Explored Room 1                   │
│ • Found 25 gold coins! ✨          │
│ • Explored Room 2                   │
│ • Encountered Goblin! ⚔️           │
│ • You dealt 15 damage               │
│ • Goblin dealt 8 damage             │
│ • Defeated Goblin! Victory! 🎉      │
│ • Gained 10 XP and 5 gold          │
│ • Explored Room 3                   │
│ • Found an empty chamber            │
│ • Explored Room 4                   │
│ • BOSS APPEARED!                    │
└──────────────────────────────────────┘

Log Entries:
- Timestamp-like format (first → last)
- Color coded:
  * Gray: Normal events
  * Red: Combat damage
  * Green: Victories
  * Purple: Narrator messages
- Font: Monospace, smaller
- Auto-scroll to bottom
- Smooth slide-in animation
```

## Game States Visual Flow

### Initial State
```
Header
  ↓
Narrator: "Welcome to COSMIC QUEST"
  ↓
Room Description: "You stand at dungeon entrance"
  ↓
Only [🔍 EXPLORE] and [❌ QUIT] buttons visible
  ↓
No enemy section visible
```

### Exploration State
```
Narrator: Random room message
  ↓
Room Description: What happened (treasure, empty, etc)
  ↓
Update Stats: Gold, XP, Level
  ↓
Update Log: New entry added
```

### Battle State
```
Narrator: "Enemy EMERGES!"
  ↓
Enemy Section: Visible with portrait, name, role, HP
  ↓
Room Description: Battle narration
  ↓
[🔍 EXPLORE] hidden
[⚔️ FIGHT] visible
[🏃 RUN] visible
[❌ QUIT] visible
  ↓
Combat Loop: Attack → Damage → Counter-attack → Repeat
```

### Victory/Defeat Modal
```
Entire Screen: Dark overlay
  ↓
Modal Center: Game over message
  ↓
Stats Box: Final achievements
  ↓
[🔄 PLAY AGAIN] button
```

## Color Palette Reference

### Primary Colors
```
Dark Purple:    #2a0845  (backgrounds, primary)
Magenta:        #6f00d2  (borders, secondary accents)
Neon Pink:      #ff006e  (highlights, enemy text)
Cyan:           #00d99f  (player health, success)
Orange:         #ffa500  (warnings, roles)
Red:            #ff0051  (danger, enemy health)
```

### UI Element Colors
```
Text (Primary):       #e0e0e0 (light gray)
Text (Dark):          #1a1a2e (very dark)
Backgrounds:          #0f0f1e (almost black)
Borders:              #4a148c (dark purple)
Success Text:         #00d99f (cyan)
Damage Text:          #ff0051 (red)
Gold Text:            #ffd700 (yellow)
```

## Animation Effects

### Starfield Background
```
Scrolls: Down continuously
Twinkles: Stars fade in/out slowly
Speed: 20s per cycle
Opacity: 0.5 → 1.0 → 0.5
```

### Narrator Box
```
Glow: Pulsing effect every 2 seconds
Text: Fade-in animation on update
Border: Glowing shadow effect
```

### Enemy Appearance
```
Scale: 0.8 → 1.0
Translation: -50px → 0
Duration: 500ms
Timing: ease-out
```

### Damage Numbers
```
Float Up: +100px
Fade Out: 1.0 → 0.0
Duration: 1 second
Position: Floating at battle area
```

### Button Hover
```
Lift: -3px (translateY)
Glow: +10px glow radius
Border: Color brightening
Duration: 300ms
```

## Responsive Breakpoints

### Desktop (1920px+)
```
┌──────────┬─────────────┬──────────┐
│ Stats    │   Game      │ Log      │
│ (1/4)    │   (1/2)     │ (1/4)    │
└──────────┴─────────────┴──────────┘
```

### Tablet (1200px)
```
┌──────────────────────────┐
│   Game Area (centered)   │
├──────────────────────────┤
│   Stats Hidden           │
│   Log Hidden             │
└──────────────────────────┘
```

### Mobile (768px)
```
┌──────────────────┐
│   Game Area      │
├──────────────────┤
│  Buttons (2x2)   │
└──────────────────┘
```

## Font Family Hierarchy

```
Body:        'Courier New', monospace  (retro feel)
Size Base:   16px

Headings:    1.3-2.5em (larger at top)
Labels:      0.85em   (smaller, uppercase)
Values:      1.2em    (prominent stats)
Log:         0.85em   (dense history)
```

## Shadow & Depth Effects

```
Header:         0 0 20px rgba(111, 0, 210, 0.5)
Panels:         inset 0 0 20px rgba(111, 0, 210, 0.2)
Buttons:        0 0 10px rgba(111, 0, 210, 0.3)
Hover Buttons:  0 0 20px rgba(111, 0, 210, 0.6)
Narrator:       0 0 20px rgba(111, 0, 210, 0.3) [pulsing]
Enemy:          0 0 20px rgba(255, 0, 110, 0.5)
Modal:          0 0 40px rgba(111, 0, 210, 0.8)
```

---

This visual guide shows exactly how your Cosmic Quest frontend is designed and laid out!
