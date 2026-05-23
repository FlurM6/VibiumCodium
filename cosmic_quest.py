#!/usr/bin/env python3
"""
🎮 COSMIC QUEST - THE BLOCKBUSTER EXPERIENCE
A thrilling tale of betrayal, passion, and redemption in the depths of darkness.
"""

import random
import time
from enum import Enum
import os
import tempfile

try:
    from gtts import gTTS
    import pygame
    pygame.mixer.init()
    TTS_AVAILABLE = True
except (ImportError, Exception):
    TTS_AVAILABLE = False


# Character pool - the cast of our drama
CHARACTER_NAMES = [
    "Fernando", "Astle", "Felizian", "Irene", "Diego",
    "Darko", "Keano", "Kalin", "Max", "Marie",
    "Laura", "Meera", "Artur", "Sabih", "Marian"
]

# Dramatic backstories
BACKSTORIES = [
    "your former lover",
    "your betrayer",
    "your sworn enemy",
    "your lost sibling",
    "your mysterious doppelgänger",
    "the one who destroyed your empire",
    "your greatest disappointment",
    "the keeper of your darkest secret",
    "your past self",
    "your soulmate from another life"
]

# Narrator voice lines - MORE DRAMATIC AND ENERGETIC
NARRATOR_INTRO = [
    "Our hero awakens in DARKNESS! What waits in the DEPTHS?!",
    "Another soul ENTERS the abyss! Will they survive?!",
    "The dungeon CALLS! Your PAST demands ANSWERS!",
    "In DARKNESS we discover ourselves... or do we PERISH?!",
    "Every hero's journey begins NOW! One step into the UNKNOWN!",
]

NARRATOR_LEVEL_UP = [
    "YES! The warrior grows STRONGER! Power courses through them!",
    "INCREDIBLE! Experience TRANSFORMS them!",
    "They ASCEND! A new level of STRENGTH!",
    "The dungeon SENSES their growing power!",
    "POWER SURGE! They are no longer who they were!",
]

NARRATOR_BOSS_ENCOUNTER = [
    "AT LAST! A figure of POWER emerges from the shadows!",
    "HERE! One of the marked ones appears! This is FATE!",
    "The dungeon REVEALS a secret! This changes EVERYTHING!",
    "A PIVOTAL MOMENT! Destinies COLLIDE!",
    "BEHOLD! A test that will DEFINE their journey!",
]

NARRATOR_VICTORY = [
    "VICTORY! Against the odds, they PREVAILED!",
    "ANOTHER DEMON VANQUISHED! How many more await?!",
    "A HOLLOW VICTORY... but a victory NONETHELESS!",
    "They've tasted BLOOD! They HUNGER for more!",
    "The dungeon RESPECTS strength! They've earned their passage!",
]

NARRATOR_DEATH = [
    "NO! Another falls to the DARKNESS!",
    "The dungeon CLAIMS another soul! Such is ambition's price!",
    "In the END... we all return to SHADOW!",
    "The story ENDS! But the dungeon remains ETERNAL!",
    "Their chapter CLOSES... but the nightmare continues!",
]

NARRATOR_ESCAPE = [
    "They FLEE the abyss! FOREVER changed!",
    "The SURVIVOR escapes, carrying dungeon secrets!",
    "Do they truly ESCAPE? Or does it LET them go?!",
    "Another soul LEAVES marked! The dungeon NEVER releases!",
]

# Character discovery narration
CHARACTER_DISCOVERY = [
    "Their true identity is REVEALED!",
    "A face from the PAST emerges!",
    "Who IS this mysterious figure?!",
    "The TRUTH comes to LIGHT!",
    "An old RIVAL returns!",
]

# Character taunts with audio
CHARACTER_TAUNTS_AUDIO = [
    "I've been waiting for this moment!",
    "You should NEVER have come here!",
    "This ends NOW!",
    "I won't let you take ANYTHING from me!",
    "For the glory! FOR JUSTICE!",
    "You DESTROYED everything!",
    "This is PERSONAL!",
    "I'm going to make you PAY!",
    "Your time has ENDED!",
    "We meet at LAST!",
]

# Monster encounter narration
MONSTER_ENCOUNTER = [
    "Something STIRS in the darkness!",
    "A creature EMERGES!",
    "Watch OUT! Something approaches!",
    "The shadows TAKE FORM!",
    "A threat materializes!",
]

# Monster death narration
MONSTER_DEATH = [
    "The creature FALLS!",
    "Another beast VANQUISHED!",
    "It CRUMBLES to dust!",
    "VICTORY over the darkness!",
]

# Dramatic death scenes
DEATH_SCENES = [
    "falls to their knees, tears streaming down their face",
    "lets out an ear-piercing scream of defeat",
    "crumbles to dust, defeated",
    "laughs maniacally as they collapse",
    "whispers your name one last time",
    "explodes in a brilliant flash of light",
    "fades away into shadow",
    "reaches out desperately before vanishing"
]

# Post-battle drama
DRAMATIC_MOMENTS = [
    "As they fall, you realize... they were innocent all along.",
    "They drop an old photograph. It's YOU. From the future.",
    "Their dying breath reveals the REAL villain.",
    "An explosion rocks the dungeon walls!",
    "*dramatic pause* ...You hear crying from deeper in the dungeon.",
    "The walls begin to SHAKE. Something massive awakens.",
    "A mysterious voice echoes: 'You've made a grave mistake.'",
    "You find a letter addressed to YOU in their pocket.",
    "The ground cracks open, revealing ancient technology below.",
    "Time itself seems to slow as they breathe their last."
]


class Monster(Enum):
    """Generic monsters that spawn randomly throughout the dungeon"""
    GOBLIN = {"name": "Goblin", "hp": 6, "damage": 2, "xp": 10, "loot": 5}
    ORC = {"name": "Orc", "hp": 12, "damage": 3, "xp": 20, "loot": 15}
    SKELETON = {"name": "Skeleton", "hp": 10, "damage": 2, "xp": 15, "loot": 10}
    CAVE_SPIDER = {"name": "Cave Spider", "hp": 8, "damage": 3, "xp": 12, "loot": 8}
    SHADOW_BEAST = {"name": "Shadow Beast", "hp": 14, "damage": 4, "xp": 25, "loot": 20}
    CORRUPTED_KNIGHT = {"name": "Corrupted Knight", "hp": 16, "damage": 4, "xp": 30, "loot": 25}
    FLAME_ELEMENTAL = {"name": "Flame Elemental", "hp": 11, "damage": 4, "xp": 22, "loot": 18}
    FROST_WRAITH = {"name": "Frost Wraith", "hp": 9, "damage": 3, "xp": 18, "loot": 12}
    BLOOD_CULTIST = {"name": "Blood Cultist", "hp": 13, "damage": 3, "xp": 28, "loot": 22}
    STONE_GOLEM = {"name": "Stone Golem", "hp": 18, "damage": 3, "xp": 35, "loot": 30}


class Character(Enum):
    """Main bosses - rare, powerful encounters"""
    FERNANDO = {"name": "Fernando", "hp": 12, "damage": 3, "xp": 50, "loot": 15, "role": "The Charmer"}
    ASTLE = {"name": "Astle", "hp": 18, "damage": 4, "xp": 70, "loot": 30, "role": "The Warrior"}
    FELIZIAN = {"name": "Felizian", "hp": 25, "damage": 5, "xp": 100, "loot": 50, "role": "The Sorcerer"}
    IRENE = {"name": "Irene", "hp": 16, "damage": 4, "xp": 75, "loot": 35, "role": "The Assassin"}
    DIEGO = {"name": "Diego", "hp": 10, "damage": 2, "xp": 40, "loot": 20, "role": "The Traitor"}
    DARKO = {"name": "Darko", "hp": 35, "damage": 7, "xp": 150, "loot": 100, "role": "The Dark Lord"}
    KEANO = {"name": "Keano", "hp": 14, "damage": 3, "xp": 60, "loot": 25, "role": "The Mercenary"}
    KALIN = {"name": "Kalin", "hp": 20, "damage": 5, "xp": 90, "loot": 45, "role": "The Vengeful"}
    MAX = {"name": "Max", "hp": 8, "damage": 2, "xp": 35, "loot": 10, "role": "The Deceiver"}
    MARIE = {"name": "Marie", "hp": 22, "damage": 4, "xp": 85, "loot": 40, "role": "The Heartbreaker"}
    LAURA = {"name": "Laura", "hp": 19, "damage": 4, "xp": 80, "loot": 38, "role": "The Lost Soul"}
    MEERA = {"name": "Meera", "hp": 28, "damage": 6, "xp": 120, "loot": 75, "role": "The Betrayer"}
    ARTUR = {"name": "Artur", "hp": 15, "damage": 3, "xp": 65, "loot": 22, "role": "The Reluctant Foe"}
    SABIH = {"name": "Sabih", "hp": 26, "damage": 5, "xp": 110, "loot": 60, "role": "The Warlord"}
    MARIAN = {"name": "Marian", "hp": 17, "damage": 4, "xp": 78, "loot": 32, "role": "The Vigilante"}


class Game:
    def __init__(self):
        self.player_hp = 100
        self.max_hp = 100
        self.gold = 0
        self.room_count = 0
        self.game_over = False
        self.victory = False
        self.kills = []
        self.bosses_defeated = []
        self.betrayals_discovered = 0
        self.plot_twist_triggered = False
        self.available_characters = list(Character)
        random.shuffle(self.available_characters)
        
        # Level and XP system
        self.level = 1
        self.xp = 0
        self.xp_to_next_level = 100
        self.base_damage = 4
        
        # Text-to-speech setup
        self.audio_enabled = TTS_AVAILABLE
        self.temp_dir = tempfile.mkdtemp()  # For storing temp audio files

    def print_title(self):
        print("\n" + "="*70)
        print("      🎬 COSMIC QUEST: THE DUNGEON RECKONING 🎬".center(70))
        print("         A Tale of Passion, Betrayal, and Redemption".center(70))
        print("="*70 + "\n")

    def narrator(self, narration_list, energy="high"):
        """Display narrator voice with natural Google TTS and energy levels"""
        narration = random.choice(narration_list)
        print(f"\n   📖 NARRATOR: \"{narration}\"")
        
        # Speak the narration with natural voice if audio is available
        if self.audio_enabled:
            try:
                # Create audio using Google Text-to-Speech with energy level
                tts = gTTS(text=narration, lang='en', slow=(energy == "slow"))
                
                # Save to temporary file
                temp_file = os.path.join(self.temp_dir, f"narration_{random.randint(1000, 9999)}.mp3")
                tts.save(temp_file)
                
                # Play the audio using pygame
                pygame.mixer.music.load(temp_file)
                pygame.mixer.music.play()
                while pygame.mixer.music.get_busy():
                    time.sleep(0.1)
                
                # Clean up
                try:
                    os.remove(temp_file)
                except:
                    pass
                    
            except Exception as e:
                # Silently fail if internet is unavailable
                pass
        
        print()
        # Faster pacing for high energy
        time.sleep(0.2 if energy == "high" else 0.5)

    def character_voice(self, character_name, dialogue):
        """Play character dialogue with voice"""
        print(f"   🎤 {character_name}: \"{dialogue}\"")
        
        if self.audio_enabled:
            try:
                # Create audio for character dialogue
                tts = gTTS(text=dialogue, lang='en', slow=False)
                
                # Save to temporary file
                temp_file = os.path.join(self.temp_dir, f"char_{random.randint(1000, 9999)}.mp3")
                tts.save(temp_file)
                
                # Play the audio using pygame
                pygame.mixer.music.load(temp_file)
                pygame.mixer.music.play()
                while pygame.mixer.music.get_busy():
                    time.sleep(0.1)
                
                # Clean up
                try:
                    os.remove(temp_file)
                except:
                    pass
                    
            except Exception as e:
                pass
        
        time.sleep(0.3)

    def level_up(self):
        """Handle player level up"""
        self.level += 1
        self.xp = 0
        self.xp_to_next_level = int(self.xp_to_next_level * 1.15)
        self.max_hp += 15
        self.player_hp = self.max_hp
        self.base_damage += 2
        
        self.narrator(NARRATOR_LEVEL_UP, energy="high")
        
        print(f"   ✨✨✨ LEVEL UP! YOU ARE NOW LEVEL {self.level}! ✨✨✨")
        print(f"   💪 Damage increased to {self.base_damage}!")
        print(f"   ❤️  Max HP increased to {self.max_hp}!\n")
        time.sleep(1)

    def print_status(self):
        bar_length = 30
        hp_percent = self.player_hp / self.max_hp
        filled = int(bar_length * hp_percent)
        bar = "█" * filled + "░" * (bar_length - filled)
        
        # XP bar
        xp_percent = self.xp / self.xp_to_next_level
        xp_filled = int(bar_length * min(xp_percent, 1.0))
        xp_bar = "▓" * xp_filled + "░" * (bar_length - xp_filled)
        
        print(f"┌─ LEVEL {self.level} | HP: [{bar}] {self.player_hp}/{self.max_hp}")
        print(f"├─ XP: [{xp_bar}] {self.xp}/{self.xp_to_next_level}")
        print(f"├─ Gold: {self.gold} | Encounters: {self.room_count}")
        print(f"└─ Bosses Defeated: {len(self.bosses_defeated)}\n")

    def dramatic_intro(self, character_name, backstory, role):
        """Generate dramatic introduction"""
        self.narrator(NARRATOR_BOSS_ENCOUNTER, energy="high")
        self.narrator(CHARACTER_DISCOVERY, energy="high")
        
        print(f"\n{'*'*70}")
        time.sleep(0.3)
        print(f"⚡ A FIGURE EMERGES FROM THE SHADOWS ⚡".center(70))
        time.sleep(0.5)
        print(f"{'*'*70}\n")
        time.sleep(0.3)
        
        print(f"🎭 {character_name.upper()} - {role}")
        print(f"   (They are {backstory})\n")
        time.sleep(0.5)
        
        # Random dramatic setup
        dramatic_setup = [
            f"Their eyes lock with yours. After all these years...",
            f"A sinister grin spreads across their face.",
            f"They speak your name. The dungeon trembles.",
            f"An eerie wind sweeps through the chamber.",
            f"The air crackles with electricity.",
            f"Their breathing becomes heavy, violent.",
            f"'I've been waiting for you,' they hiss.",
            f"They draw a weapon with theatrical precision.",
            f"Blood drips from their knuckles.",
            f"They laugh—a sound of pure madness."
        ]
        setup = random.choice(dramatic_setup)
        print(f"   {setup}\n")
        time.sleep(0.8)
        
        taunt = random.choice(CHARACTER_TAUNTS_AUDIO)
        print(f"   💬 \"{taunt}\"\n")
        self.character_voice(character_name, taunt)
        time.sleep(0.5)

    def encounter_room(self):
        """Generate a dramatic room encounter - either a monster or a boss"""
        self.room_count += 1
        
        # 40% chance to encounter a boss, 60% to encounter a regular monster
        is_boss = random.random() < 0.4 and len(self.available_characters) > 0
        
        if is_boss:
            # If we've exhausted all characters, refresh the pool
            if not self.available_characters:
                self.available_characters = list(Character)
                random.shuffle(self.available_characters)
                print("\n   🌀 The dungeon shifts around you... new faces emerge from the darkness...\n")
                time.sleep(1)
            
            # Pick a character from available pool
            encounter = self.available_characters.pop(0)
            character = encounter.value
            backstory = random.choice(BACKSTORIES)
            self.dramatic_intro(character['name'], backstory, character['role'])
            return character, backstory, True  # is_boss = True
        else:
            # Regular monster encounter
            self.narrator(MONSTER_ENCOUNTER, energy="high")
            
            encounter = random.choice(list(Monster))
            monster = encounter.value
            print(f"\n⚔️  A wild {monster['name']} appears!")
            print(f"   HP: {monster['hp']} | Damage: {monster['damage']}\n")
            time.sleep(0.5)
            return monster, None, False  # is_boss = False

    def combat(self, character, backstory, is_boss):
        """Handle turn-based dramatic combat"""
        char_hp = character["hp"]
        your_damage = self.base_damage + random.randint(2, 4)
        char_damage = character["damage"]
        critical_counter = 0
        enemy_name = character['name']
        
        # Scale enemy stats based on player level
        char_hp = int(char_hp * (1 + (self.level - 1) * 0.1))
        char_damage = int(char_damage * (1 + (self.level - 1) * 0.05))

        while char_hp > 0 and self.player_hp > 0:
            print(f"   {enemy_name}: {char_hp} HP  |  YOU (Lv.{self.level}): {self.player_hp} HP")
            print("   ─" * 35)
            choice = input(f"   [F]ight [R]un [Q]uit?\n   > ").lower()

            if choice == "f":
                # Random critical hit chance for drama
                is_critical = random.random() < 0.2
                damage = random.randint(your_damage - 2, your_damage + 2)
                
                if is_critical:
                    damage = int(damage * 1.5)
                    print(f"\n   ⚡💥 CRITICAL HIT! ⚡💥")
                else:
                    hit_type = random.choice(["struck", "slashed", "blasted", "shattered"])
                    print(f"\n   💥 You {hit_type} them for {damage} damage!")

                char_hp -= damage

                if char_hp <= 0:
                    self.kill_drama(character, backstory, is_boss)
                    return True

                # Counterattack with drama
                damage_taken = random.randint(max(1, char_damage - 1), char_damage + 1)
                self.player_hp -= damage_taken
                
                attack_types = [
                    f"slams you with devastating force! {damage_taken} damage!",
                    f"SCREAMS and unleashes fury! {damage_taken} damage!",
                    f"moves with deadly precision! {damage_taken} damage!",
                    f"explodes in rage! {damage_taken} damage!"
                ]
                print(f"   🔥 {enemy_name} {random.choice(attack_types)}\n")

                if self.player_hp <= 0:
                    self.you_die(character)
                    return False

                # Dramatic dialogue
                if critical_counter % 2 == 0 and random.random() < 0.3:
                    dialogues = [
                        f"'{enemy_name}': Is that all you've got?!",
                        f"'{enemy_name}': You're weaker than I expected!",
                        f"'{enemy_name}': This dungeon will be your GRAVE!",
                        f"You feel the weight of your mistakes...",
                        f"The dungeon trembles with the fury of battle!"
                    ]
                    print(f"   > {random.choice(dialogues)}\n")
                
                critical_counter += 1

            elif choice == "r":
                print(f"\n   🏃 You desperately flee into the darkness!\n")
                print(f"   {enemy_name} laughs: 'You cannot escape your fate!'\n")
                return None

            elif choice == "q":
                print(f"\n   You abandon the battle and flee deeper into chaos...\n")
                return None

    def kill_drama(self, character, backstory, is_boss):
        """Dramatic death scene and XP reward"""
        if is_boss:
            self.narrator(NARRATOR_VICTORY, energy="high")
        
        print(f"\n   {'='*60}")
        print(f"   ✨ {character['name'].upper()} {random.choice(DEATH_SCENES)} ✨")
        print(f"   {'='*60}\n")
        
        time.sleep(1)
        
        # Add dramatic twist (more common for bosses)
        if is_boss or random.random() < 0.35:
            twist = random.choice(DRAMATIC_MOMENTS)
            print(f"   🎭 {twist}\n")
            time.sleep(1)
        
        reward_gold = character["loot"]
        reward_xp = character["xp"]
        self.gold += reward_gold
        self.xp += reward_xp
        self.kills.append(character['name'])
        
        if is_boss:
            self.bosses_defeated.append(character['name'])
            print(f"   👑 BOSS DEFEATED! {character['name']} {character['role'].upper()}")
        
        print(f"   💎 {character['name']} drops {reward_gold} gold!")
        print(f"   ⭐ You gained {reward_xp} XP!\n")
        
        # Check for level up
        if self.xp >= self.xp_to_next_level:
            self.level_up()
        
        print(f"   ✊ You stand victorious... but at what cost?\n")
        time.sleep(0.5)

    def you_die(self, character):
        """Your dramatic death"""
        self.narrator(NARRATOR_DEATH, energy="high")
        
        print(f"\n   {'='*60}")
        print(f"   💀 DEFEATED BY {character['name'].upper()}! 💀")
        print(f"   {'='*60}\n")
        print(f"   As darkness consumes your vision...")
        print(f"   You hear {character['name']}'s laughter echo through eternity...\n")

    def explore_treasure(self):
        """Find hidden treasure with drama"""
        rand = random.random()
        if rand < 0.25:
            treasure = random.randint(30, 80)
            findings = [
                f"✨ You discover ancient riches hidden in shadow: {treasure} gold!",
                f"🪙 A pile of glimmering coins catches your eye! +{treasure} gold!",
                f"💎 TREASURE! The walls glow as you claim {treasure} gold!",
                f"👑 Royal treasures! Worth {treasure} gold!"
            ]
            print(f"   {random.choice(findings)}\n")
            self.gold += treasure
        elif rand < 0.4:
            print(f"   📜 You find a cryptic note... but can't quite read it.\n")
        elif rand < 0.5:
            trap_dmg = random.randint(5, 15)
            print(f"   ⚠️ TRAP! A hidden mechanism triggers! {trap_dmg} damage!\n")
            self.player_hp -= trap_dmg

    def main_loop(self):
        """Main game loop"""
        self.print_title()
        
        # Display audio status
        audio_status = "🔊 AUDIO ENABLED" if self.audio_enabled else "🔇 AUDIO DISABLED (install pyttsx3)"
        print(f"[{audio_status}]\n")
        time.sleep(1)

        print("You awaken in darkness. The memories are fragmented.")
        print("A mysterious dungeon stretches before you—and within it,")
        print("the answers to everything. The people you love. The people you hate.")
        print("The truth you've been running from.\n")
        print("There is no turning back.\n")
        
        self.narrator(NARRATOR_INTRO, energy="high")
        time.sleep(1)

        while not self.game_over:
            self.print_status()

            if self.room_count == 0:
                choice = input("Press [E] to Enter the dungeon, [Q] to Quit\n> ").lower()
            else:
                choice = input(
                    "Press [E] to Face the next encounter, [Q] to Escape the dungeon\n> "
                ).lower()

            if choice == "e":
                character, backstory, is_boss = self.encounter_room()
                result = self.combat(character, backstory, is_boss)

                if result is True:  # Won combat
                    self.explore_treasure()
                elif result is False:  # Lost combat
                    self.game_over = True
                # If result is None, they ran away - continue loop

            elif choice == "q":
                if self.room_count == 0:
                    print("\nYou turn away from the dungeon.")
                    print("Your past remains unsolved. Your questions unanswered.\n")
                else:
                    self.victory = True
                self.game_over = True

        self.end_game()

    def end_game(self):
        """Handle game ending with drama"""
        if self.victory:
            self.narrator(NARRATOR_ESCAPE, energy="high")
        
        print("\n" + "="*70)
        if self.victory:
            print("🎬 THE END 🎬".center(70))
            print("="*70)
            print(f"\nYou escaped the dungeon at LEVEL {self.level} with {self.gold} gold.")
            print(f"Total Encounters: {len(self.kills)}")
            print(f"Bosses Defeated: {len(self.bosses_defeated)}")
            if self.bosses_defeated:
                print(f"\nBosses you vanquished:")
                for i, name in enumerate(self.bosses_defeated, 1):
                    print(f"   {i}. {name}")
            score = self.gold + (len(self.kills) * 50) + (self.level * 100)
            print(f"\n🏆 FINAL SCORE: {score} 🏆")
            print("\nThe dungeon was never just a place...")
            print("It was a reflection of your soul.")
            print("And you survived.\n")
        else:
            print("💀 GAME OVER 💀".center(70))
            print("="*70)
            print(f"\nYou reached LEVEL {self.level} before falling.")
            print(f"Encounters completed: {self.room_count}")
            print(f"Enemies defeated: {len(self.kills)}")
            print(f"Bosses defeated: {len(self.bosses_defeated)}")
            print(f"Gold earned: {self.gold}")
            print("\nThe dungeon consumes another soul...\n")
        
        print("="*70 + "\n")


if __name__ == "__main__":
    game = Game()
    game.main_loop()
