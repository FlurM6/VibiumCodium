# 🎮 Cosmic Quest - Visual Frontend

A stunning visual web-based interface for the Cosmic Quest dungeon RPG game!

## Features

✨ **Beautiful UI Design**
- Dark, atmospheric theme with cosmic aesthetics
- Animated starfield background
- Glowing neon effects and smooth transitions
- Responsive design for all screen sizes

⚔️ **Interactive Gameplay**
- Real-time health and status bars with animations
- Dynamic enemy encounters with unique emojis
- Combat system with damage indicators
- Level progression system with XP tracking

📊 **Game Statistics**
- Player stats panel (HP, Level, XP, Gold, Damage)
- Enemy information with role descriptions
- Story log tracking all events
- Kill counter showing defeated enemies

🎭 **Rich Narrative**
- Dynamic narrator text
- Dramatic room descriptions
- Combat messages and victory announcements
- Game over modal with final statistics

## Files

- **index.html** - Main game interface structure
- **styles.css** - Complete styling with animations and effects
- **game.js** - Game logic, state management, and gameplay mechanics
- **server.py** - Simple HTTP server to run the game

## How to Play

### Option 1: Using Python Server (Recommended)

```bash
cd "M6_Floor Game"
python server.py
```

Then open your browser and navigate to: **http://localhost:8000**

### Option 2: Using Python's Built-in Server

```bash
cd "M6_Floor Game"
python -m http.server 8000
```

Then open: **http://localhost:8000**

### Option 3: Direct File Opening

Simply open `index.html` in your web browser.

## Game Controls

| Button | Action |
|--------|--------|
| 🔍 **Explore** | Enter a new room and encounter enemies/treasure |
| ⚔️ **Fight** | Attack the current enemy |
| 🏃 **Run** | Attempt to escape from battle |
| ❌ **Quit** | Exit the dungeon (end game) |

## Game Mechanics

### Combat System
- **Attack:** Deal random damage (base + 0-5 bonus)
- **Enemy Counter:** Enemy automatically counter-attacks after player attack
- **Health:** Both player and enemy have health bars
- **Escape:** Chance to escape increases with player level

### Progression
- **XP System:** Earn experience from defeating enemies
- **Leveling:** Automatically level up when reaching XP threshold
- **Stat Growth:** Damage increases with each level
- **Bosses:** Rare, powerful encounters with higher rewards

### Encounters
- **Monsters:** Common enemies with low to medium difficulty
- **Treasure:** Find gold throughout the dungeon
- **Empty Rooms:** Safe exploration with no threats
- **Bosses:** Rare legendary characters with massive rewards

## UI Components

### Left Panel
- Player health, level, and experience
- Gold and damage stats
- Room counter
- Kill list (defeated enemies)

### Center Panel
- Narrator voice delivering dramatic messages
- Enemy encounter display with emoji portraits
- Room descriptions and story text
- Action buttons

### Right Panel
- Story log tracking all events
- Color-coded message types:
  - **Combat:** Red (damage/battle info)
  - **Victory:** Green (wins and rewards)
  - **Narrator:** Purple (dramatic moments)

## Visual Effects

🌟 **Animations**
- Starfield scrolling background
- Twinkling stars
- Narrator glow effect
- Enemy appearance animations
- Damage number floating effects
- Button hover and click effects
- Page transitions and modals

✨ **Color Scheme**
- Primary Purple: `#2a0845`
- Secondary Magenta: `#6f00d2`
- Accent Pink: `#ff006e`
- Success Green: `#00d99f`
- Warning Orange: `#ffa500`
- Danger Red: `#ff0051`

## Responsive Design

- **Desktop:** Full three-panel layout
- **Tablets (1200px):** Single column layout
- **Mobile (768px):** Optimized button grid

## Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

## Technical Details

- **Pure JavaScript:** No frameworks required
- **CSS3 Animations:** Smooth, performant effects
- **Responsive Grid:** Flexible layout system
- **No Dependencies:** Completely self-contained

## Customization

### Change Colors
Edit `:root` variables in `styles.css`:
```css
:root {
    --primary: #2a0845;
    --secondary: #6f00d2;
    /* ... etc ... */
}
```

### Adjust Game Balance
Edit game constants in `game.js`:
- Monster stats and loot
- Boss stats and rewards
- XP scaling
- Damage calculations

### Add New Encounters
Expand the monsters/bosses arrays in `game.js`:
```javascript
const monsters = [
    { name: 'New Monster', hp: 20, damage: 5, xp: 30, loot: 25, emoji: '🆕' }
];
```

## Performance

- Lightweight HTML/CSS/JS
- Optimized animations using CSS transforms
- Smooth 60fps gameplay
- Minimal memory footprint
- Works on any device with a modern browser

## Credits

Frontend created for **Cosmic Quest: The Dungeon Reckoning**
A tale of passion, betrayal, and redemption in the depths of darkness.

---

**Enjoy your adventure in the dungeon! 🎮✨**
