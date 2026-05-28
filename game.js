// ============ COSMIC QUEST - FRONTEND GAME LOGIC ============

class CosmicQuestGame {
    constructor() {
        this.gameState = {
            playerHP: 100,
            maxHP: 100,
            gold: 0,
            level: 1,
            xp: 0,
            xpToNextLevel: 100,
            baseDamage: 4,
            roomCount: 0,
            kills: [],
            bosses: [],
            elementalUses: { fire: 3, water: 3, earth: 3, air: 3 },
            maxElementalUses: 3,
            leaderboard: [],
            gameOver: false,
            victory: false
        };
        this.leaderboardRecorded = false;

        this.battleState = {
            inBattle: false,
            enemyName: '',
            enemyHP: 0,
            maxEnemyHP: 0,
            enemyDamage: 0,
            enemyType: '', // 'monster' or 'boss'
            emoji: '👹'
        };

        this.initializeUI();
        this.setupEventListeners();
    }

    initializeUI() {
        this.narrator = document.getElementById('narratorText');
        this.storyLog = document.getElementById('storyLog');
        this.playerHPText = document.getElementById('playerHP');
        this.playerHPBar = document.getElementById('playerHealthBar');
        this.playerLevelText = document.getElementById('playerLevel');
        this.playerExpText = document.getElementById('playerExp');
        this.playerExpBar = document.getElementById('playerExpBar');
        this.playerGoldText = document.getElementById('playerGold');
        this.playerDamageText = document.getElementById('playerDamage');
        this.roomCountText = document.getElementById('roomCount');
        this.killsList = document.getElementById('killsList');
        this.leaderboardList = document.getElementById('leaderboardList');
        this.enemySection = document.getElementById('enemySection');
        this.attackEffect = document.getElementById('attackEffect');
        this.enemyPortrait = document.getElementById('enemyPortrait');
        this.enemyName = document.getElementById('enemyName');
        this.enemyRole = document.getElementById('enemyRole');
        this.enemyHPBar = document.getElementById('enemyHealthBar');
        this.enemyHPText = document.getElementById('enemyHP');
        this.roomDescription = document.getElementById('roomDescription');
        this.damageIndicator = document.getElementById('damageIndicator');
        this.gameOverModal = document.getElementById('gameOverModal');
        this.shopModal = document.getElementById('shopModal');
        this.shopItemsContainer = document.getElementById('shopItems');
        this.shopGoldDisplay = document.getElementById('shopGold');

        this.btnExplore = document.getElementById('btnExplore');
        this.btnShop = document.getElementById('btnShop');
        this.btnAttackGeneral = document.getElementById('btnAttackGeneral');
        this.btnAttackFire = document.getElementById('btnAttackFire');
        this.btnAttackWater = document.getElementById('btnAttackWater');
        this.btnAttackEarth = document.getElementById('btnAttackEarth');
        this.btnAttackAir = document.getElementById('btnAttackAir');
        this.attackCountGeneral = document.getElementById('attackCountGeneral');
        this.attackCountFire = document.getElementById('attackCountFire');
        this.attackCountWater = document.getElementById('attackCountWater');
        this.attackCountEarth = document.getElementById('attackCountEarth');
        this.attackCountAir = document.getElementById('attackCountAir');
        this.btnRun = document.getElementById('btnRun');
        this.btnQuit = document.getElementById('btnQuit');
        this.btnRestart = document.getElementById('btnRestart');
        this.btnSaveScore = document.getElementById('btnSaveScore');
        this.leaderboardNameInput = document.getElementById('leaderboardNameInput');
        this.leaderboardSaveFeedback = document.getElementById('leaderboardSaveFeedback');

        this.loadLeaderboard();
        this.updateUI();
    }

    setupEventListeners() {
        this.btnExplore.addEventListener('click', () => this.exploreRoom());
        this.btnShop.addEventListener('click', () => this.openShop());
        this.btnAttackGeneral.addEventListener('click', () => this.attackEnemy('general'));
        this.btnAttackFire.addEventListener('click', () => this.attackEnemy('fire'));
        this.btnAttackWater.addEventListener('click', () => this.attackEnemy('water'));
        this.btnAttackEarth.addEventListener('click', () => this.attackEnemy('earth'));
        this.btnAttackAir.addEventListener('click', () => this.attackEnemy('air'));
        this.btnRun.addEventListener('click', () => this.runAway());
        this.btnQuit.addEventListener('click', () => this.quitGame());
        this.btnRestart.addEventListener('click', () => location.reload());
        this.btnSaveScore.addEventListener('click', () => this.saveScore());
        const btnCloseShop = document.getElementById('btnCloseShop');
        if (btnCloseShop) {
            btnCloseShop.addEventListener('click', () => this.closeShop());
        }
        this.leaderboardNameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.saveScore();
            }
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(event) {
        const key = event.key.toLowerCase();
        
        // Shop keyboard navigation
        if (document.getElementById('shopModal')?.style.display === 'flex') {
            this.handleShopKeyboard(event);
            return;
        }

        // Main game keyboard shortcuts
        if (key === 'e') this.exploreRoom();
        if (this.battleState.inBattle) {
            if (key === 'f' || key === '1') this.attackEnemy('general');
            if (key === '2') this.attackEnemy('fire');
            if (key === '3') this.attackEnemy('water');
            if (key === '4') this.attackEnemy('earth');
            if (key === '5') this.attackEnemy('air');
        }
        if (key === 'r') this.runAway();
        if (key === 's') this.openShop?.();
        if (key === 'q') this.quitGame();
    }

    handleShopKeyboard(event) {
        if (event.key === 'Escape') {
            this.closeShop();
        }
    }

    // ============ STORE ITEMS ============
    getStoreItems() {
        return [
            { id: 'health_boost_1', name: 'Health Elixir', icon: '🩹', cost: 50, level: 1, effect: 'maxHP +30', action: () => { this.gameState.maxHP += 30; this.gameState.playerHP = this.gameState.maxHP; } },
            { id: 'damage_boost_1', name: 'Strength Potion', icon: '💪', cost: 75, level: 2, effect: 'Base Damage +2', action: () => { this.gameState.baseDamage += 2; } },
            { id: 'elemental_recharge_1', name: 'Elemental Core', icon: '⚡', cost: 100, level: 3, effect: 'Elemental Uses +3', action: () => { this.gameState.maxElementalUses += 3; this.gameState.elementalUses.fire += 3; this.gameState.elementalUses.water += 3; this.gameState.elementalUses.earth += 3; } },
            { id: 'health_boost_2', name: 'Supreme Elixir', icon: '🌟', cost: 150, level: 5, effect: 'maxHP +50', action: () => { this.gameState.maxHP += 50; this.gameState.playerHP = this.gameState.maxHP; } },
            { id: 'damage_boost_2', name: 'Warrior\'s Blessing', icon: '⚔️', cost: 200, level: 7, effect: 'Base Damage +4', action: () => { this.gameState.baseDamage += 4; } },
            { id: 'regeneration', name: 'Healing Aura', icon: '✨', cost: 250, level: 10, effect: 'Restore 50 HP', action: () => { this.gameState.playerHP = Math.min(this.gameState.playerHP + 50, this.gameState.maxHP); } },
        ];
    }

    openShop() {
        if (this.battleState.inBattle) {
            this.addLog('You cannot shop while in battle!', 'warning');
            return;
        }

        this.shopModal.style.display = 'flex';
        this.renderShopItems();
    }

    closeShop() {
        this.shopModal.style.display = 'none';
    }

    renderShopItems() {
        const items = this.getStoreItems();
        const playerLevel = this.gameState.level;
        const playerGold = this.gameState.gold;

        let html = '';
        items.forEach(item => {
            const unlocked = playerLevel >= item.level;
            const canAfford = playerGold >= item.cost;
            const disabled = !unlocked || !canAfford;
            const reasonNotAvailable = !unlocked ? `Unlocks at Level ${item.level}` : !canAfford ? `Need ${item.cost - playerGold} more gold` : '';

            html += `
                <div class="shop-item ${disabled ? 'disabled' : 'available'}">
                    <div class="shop-item-icon">${item.icon}</div>
                    <div class="shop-item-details">
                        <div class="shop-item-name">${item.name}</div>
                        <div class="shop-item-effect">${item.effect}</div>
                        ${reasonNotAvailable ? `<div class="shop-item-locked">${reasonNotAvailable}</div>` : ''}
                    </div>
                    <div class="shop-item-cost">${item.cost}g</div>
                    <button class="btn shop-item-btn" ${disabled ? 'disabled' : ''} onclick="window.game.purchaseItem('${item.id}')">
                        ${unlocked ? canAfford ? 'Buy' : 'Poor' : 'Locked'}
                    </button>
                </div>
            `;
        });

        this.shopItemsContainer.innerHTML = html;
        this.shopGoldDisplay.textContent = this.gameState.gold;
    }

    purchaseItem(itemId) {
        const items = this.getStoreItems();
        const item = items.find(i => i.id === itemId);

        if (!item) return;

        if (this.gameState.level < item.level) {
            this.addLog(`This item is locked until level ${item.level}!`, 'warning');
            return;
        }

        if (this.gameState.gold < item.cost) {
            this.addLog(`You don't have enough gold! Need ${item.cost - this.gameState.gold} more.`, 'warning');
            return;
        }

        this.gameState.gold -= item.cost;
        item.action();
        this.addLog(`✨ Purchased ${item.name}! ${item.effect}`, 'victory');
        this.renderShopItems();
        this.updateUI();
    }

    // ============ GAME FLOW ============

    exploreRoom() {
        if (this.battleState.inBattle) return;
        
        this.gameState.roomCount++;
        this.updateUI();
        
        // Determine what happens
        const encounters = [
            'treasure',
            'monster',
            'boss',
            'empty'
        ];

        // Weighted random encounter
        const roll = Math.random();
        let encounter;
        if (roll < 0.5) encounter = 'monster';
        else if (roll < 0.75) encounter = 'treasure';
        else if (roll < 0.9) encounter = 'empty';
        else encounter = 'boss';

        setTimeout(() => {
            if (encounter === 'monster') this.spawnMonster();
            else if (encounter === 'treasure') this.findTreasure();
            else if (encounter === 'boss') this.spawnBoss();
            else this.findEmptyRoom();
        }, 500);
    }

    spawnMonster() {
        // Base monster stats
        const baseMonsters = [
            { name: 'Goblin', hp: 6, damage: 2, xp: 10, loot: 5, emoji: '👺', element: 'earth' },
            { name: 'Orc', hp: 12, damage: 3, xp: 20, loot: 15, emoji: '🗡️', element: 'earth' },
            { name: 'Skeleton', hp: 10, damage: 2, xp: 15, loot: 10, emoji: '💀', element: 'fire' },
            { name: 'Cave Spider', hp: 8, damage: 3, xp: 12, loot: 8, emoji: '🕷️', element: 'earth' },
            { name: 'Shadow Beast', hp: 14, damage: 4, xp: 25, loot: 20, emoji: '🐺', element: 'water' },
            { name: 'Flame Elemental', hp: 11, damage: 4, xp: 22, loot: 18, emoji: '🔥', element: 'fire' },
            { name: 'Frost Wraith', hp: 9, damage: 3, xp: 18, loot: 12, emoji: '❄️', element: 'water' },
            { name: 'Stone Golem', hp: 18, damage: 3, xp: 35, loot: 30, emoji: '🪨', element: 'earth' },
            { name: 'Air Sprite', hp: 7, damage: 3, xp: 16, loot: 14, emoji: '💨', element: 'air' }
        ];

        const baseMonster = baseMonsters[Math.floor(Math.random() * baseMonsters.length)];
        
        // Scale monster stats based on player level
        const levelScale = Math.max(1, 0.5 + (this.gameState.level - 1) * 0.15);
        const monster = {
            name: baseMonster.name,
            hp: Math.ceil(baseMonster.hp * levelScale),
            damage: Math.ceil(baseMonster.damage * levelScale),
            xp: Math.ceil(baseMonster.xp * levelScale),
            loot: Math.ceil(baseMonster.loot * levelScale),
            emoji: baseMonster.emoji,
            element: baseMonster.element
        };

        this.battleState = {
            inBattle: true,
            enemyName: monster.name,
            enemyHP: monster.hp,
            maxEnemyHP: monster.hp,
            enemyDamage: monster.damage,
            enemyXP: monster.xp,
            enemyLoot: monster.loot,
            enemyType: 'monster',
            element: monster.element,
            emoji: monster.emoji,
            role: `A menacing ${monster.name} appears! (Level ${this.gameState.level} Encounter)`
        };

        this.narrate(`Something STIRS in the darkness! A ${monster.name} EMERGES!`);
        this.showBattle();
    }

    spawnBoss() {
        // Base boss stats with ±10% variation
        const baseBosses = [
            { name: 'Fernando', hp: 20, damage: 5, xp: 80, loot: 40, emoji: '🎭', role: 'The Charmer', element: 'fire' },
            { name: 'Astle', hp: 22, damage: 5, xp: 90, loot: 45, emoji: '⚔️', role: 'The Warrior', element: 'earth' },
            { name: 'Felizian', hp: 24, damage: 5, xp: 100, loot: 50, emoji: '🧙', role: 'The Sorcerer', element: 'water' },
            { name: 'Irene', hp: 21, damage: 5, xp: 85, loot: 42, emoji: '🗡️', role: 'The Assassin', element: 'fire' },
            { name: 'Darko', hp: 26, damage: 6, xp: 120, loot: 60, emoji: '👿', role: 'The Dark Lord', element: 'earth' },
            { name: 'Meera', hp: 23, damage: 5, xp: 95, loot: 48, emoji: '⚡', role: 'The Betrayer', element: 'water' }
        ];

        const baseBoss = baseBosses[Math.floor(Math.random() * baseBosses.length)];
        
        // Add ±10% random variation to base stats
        const variation = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
        
        // Scale boss stats based on player level
        const levelScale = Math.max(1, 0.5 + (this.gameState.level - 1) * 0.2);
        const boss = {
            name: baseBoss.name,
            hp: Math.ceil(baseBoss.hp * variation * levelScale),
            damage: Math.ceil(baseBoss.damage * variation * levelScale),
            xp: Math.ceil(baseBoss.xp * variation * levelScale),
            loot: Math.ceil(baseBoss.loot * variation * levelScale),
            emoji: baseBoss.emoji,
            role: baseBoss.role,
            element: baseBoss.element
        };

        this.battleState = {
            inBattle: true,
            enemyName: boss.name,
            enemyHP: boss.hp,
            maxEnemyHP: boss.hp,
            enemyDamage: boss.damage,
            enemyXP: boss.xp,
            enemyLoot: boss.loot,
            enemyType: 'boss',
            element: boss.element,
            emoji: boss.emoji,
            role: boss.role
        };

        this.narrate(`AT LAST! A figure of POWER emerges from the shadows! It's ${boss.name}, ${boss.role}! (Level ${this.gameState.level} Encounter)`);
        this.showBattle();
    }

    findTreasure() {
        const treasureAmounts = [10, 25, 50, 75, 100];
        const amount = treasureAmounts[Math.floor(Math.random() * treasureAmounts.length)];
        this.gameState.gold += amount;

        this.narrate(`YOU FIND TREASURE! +${amount} GOLD GAINED!`);
        this.roomDescription.innerHTML = `✨ You discover a chest containing <strong>${amount} gold coins</strong>! Your fortune grows!`;
        this.addLog(`Found ${amount} gold coins!`, 'victory');
        this.updateUI();
        this.showExplore();
    }

    findEmptyRoom() {
        const descriptions = [
            'The room is empty and silent. Only dust and shadows remain.',
            'A vast chamber stretches before you, utterly barren.',
            'Nothing here but the echo of your footsteps.',
            'An empty hall, waiting for what comes next.',
            'Silence. Pure, absolute silence.'
        ];

        const desc = descriptions[Math.floor(Math.random() * descriptions.length)];
        this.narrate('An empty chamber...');
        this.roomDescription.innerHTML = desc;
        this.addLog('Explored an empty room', 'narrator');
        this.showExplore();
    }

    attackEnemy(attackType = 'general') {
        if (!this.battleState.inBattle) return;

        const elementName = this.battleState.element || 'none';
        const enemyName = this.battleState.enemyName;
        const typeLabel = attackType === 'general'
            ? 'Basic Strike'
            : `${attackType.charAt(0).toUpperCase() + attackType.slice(1)} Attack`;

        if (attackType !== 'general') {
            const remaining = this.gameState.elementalUses[attackType];
            if (!remaining || remaining <= 0) {
                this.addLog(`No ${attackType} attacks remaining!`, 'warning');
                return;
            }
            this.gameState.elementalUses[attackType] -= 1;
        }

        let damage = this.gameState.baseDamage + (attackType === 'general'
            ? Math.floor(Math.random() * 4)
            : 3 + Math.floor(Math.random() * 5));
        let effectiveness = '';

        if (attackType !== 'general' && attackType === elementName) {
            // Same element attack is WEAK (25% damage) instead of strong
            damage = Math.ceil(damage * 0.25);
            effectiveness = ' The enemy\'s defense is too strong against this type!';
        } else if (attackType !== 'general' && elementName !== 'none') {
            // Check for element advantage
            const hasAdvantage = (attackType === 'fire' && elementName === 'earth') || 
                                (attackType === 'water' && elementName === 'fire') ||
                                (attackType === 'earth' && elementName === 'water') ||
                                (attackType === 'air' && elementName === 'earth') ||
                                (attackType === 'earth' && elementName === 'air');
            if (hasAdvantage) {
                damage = Math.ceil(damage * 1.5);
                effectiveness = ' It is super effective!';
            }
        }


        this.battleState.enemyHP -= damage;
        this.showAttackAnimation(attackType);
        this.showDamage(damage, 'player');
        this.addLog(`You used ${typeLabel} and dealt ${damage} damage to ${enemyName}!${effectiveness}`, 'combat');
        this.updateEnemyHealth();
        this.updateUI();

        if (this.battleState.enemyHP <= 0) {
            setTimeout(() => {
                this.defeatEnemy();
            }, 700);
            return;
        }

        // Enemy counter-attack
        setTimeout(() => {
            const enemyDamage = Math.max(1, this.battleState.enemyDamage + Math.floor(Math.random() * 3) - 1);
            this.gameState.playerHP -= enemyDamage;

            this.showDamage(enemyDamage, 'enemy');
            this.addLog(`${enemyName} dealt ${enemyDamage} damage to you!`, 'combat');

            if (this.gameState.playerHP <= 0) {
                this.playerDeath();
            } else {
                this.updateUI();
            }
        }, 500);
    }

    defeatEnemy() {
        const enemyName = this.battleState.enemyName;
        const xpGain = this.battleState.enemyXP;
        const lootGain = this.battleState.enemyLoot;

        this.gameState.gold += lootGain;
        this.gameState.xp += xpGain;
        this.gameState.kills.push(enemyName);

        if (this.battleState.enemyType === 'boss') {
            this.gameState.bosses.push(enemyName);
        }

        // Check for level up
        while (this.gameState.xp >= this.gameState.xpToNextLevel) {
            this.levelUp();
        }

        this.narrate(`VICTORY! ${enemyName} falls! +${xpGain} XP, +${lootGain} GOLD!`);
        this.roomDescription.innerHTML = `You have defeated <strong>${enemyName}</strong>! You gain <strong>${xpGain} XP</strong> and <strong>${lootGain} gold</strong>.`;
        
        this.addLog(`Defeated ${enemyName}! +${xpGain} XP, +${lootGain} gold`, 'victory');
        
        this.battleState.inBattle = false;
        this.updateUI();
        this.showExplore();
    }

    runAway() {
        if (!this.battleState.inBattle) return;

        const successChance = 0.6 - (this.gameState.level * 0.05);
        const escaped = Math.random() < successChance;

        if (escaped) {
            this.narrate(`You FLEE from ${this.battleState.enemyName}!`);
            this.roomDescription.innerHTML = `You manage to escape, breathless and unharmed!`;
            this.addLog(`Escaped from ${this.battleState.enemyName}`, 'narrator');
        } else {
            const damage = Math.max(5, this.battleState.enemyDamage * 2);
            this.gameState.playerHP -= damage;
            this.narrate(`${this.battleState.enemyName} CATCHES YOU!`);
            this.roomDescription.innerHTML = `You failed to escape! ${this.battleState.enemyName} catches you and deals ${damage} damage!`;
            this.addLog(`Failed to escape! Took ${damage} damage`, 'combat');
            this.showDamage(damage, 'enemy');

            if (this.gameState.playerHP <= 0) {
                this.playerDeath();
                return;
            }
        }

        this.battleState.inBattle = false;
        this.updateUI();
        this.showExplore();
    }

    levelUp() {
        this.gameState.level++;
        this.gameState.baseDamage += 1;
        this.gameState.xp -= this.gameState.xpToNextLevel;
        this.gameState.xpToNextLevel = Math.floor(this.gameState.xpToNextLevel * 1.1);
        this.restockElementalAttacks();

        this.narrate(`LEVEL UP! You are now level ${this.gameState.level}! Your power increases!`);
        this.addLog(`⬆️ LEVEL UP! Now level ${this.gameState.level}! Elemental attacks have been restocked.`, 'victory');
    }

    playerDeath() {
        this.gameState.gameOver = true;
        this.narrate(`NO! You have been DEFEATED! Your journey ends here...`);
        this.showGameOver(false);
    }

    quitGame() {
        this.gameState.gameOver = true;
        this.gameState.victory = true;
        this.narrate(`You FLEE the dungeon and escape with your life!`);
        this.showGameOver(true);
    }

    showGameOver(victory) {
        this.leaderboardRecorded = false;
        if (this.leaderboardNameInput) {
            this.leaderboardNameInput.value = '';
        }
        if (this.btnSaveScore) {
            this.btnSaveScore.disabled = false;
        }
        if (this.leaderboardSaveFeedback) {
            this.leaderboardSaveFeedback.textContent = '';
        }

        this.gameOverModal.style.display = 'flex';
        const titleEl = document.getElementById('gameOverTitle');
        const messageEl = document.getElementById('gameOverMessage');

        if (victory) {
            titleEl.textContent = '⚔️ YOU ESCAPED!';
            titleEl.style.color = '#00d99f';
            messageEl.innerHTML = `You survived the dungeon and escaped with your life and fortune intact. Your legend will be remembered...`;
        } else {
            titleEl.textContent = '💀 GAME OVER';
            titleEl.style.color = '#ff0051';
            messageEl.innerHTML = `You have fallen in the depths of the dungeon. Your story has ended, but the dungeon remains eternal...`;
        }

        document.getElementById('finalLevel').textContent = this.gameState.level;
        document.getElementById('finalGold').textContent = this.gameState.gold;
        document.getElementById('finalKills').textContent = this.gameState.kills.length;
        document.getElementById('finalBosses').textContent = this.gameState.bosses.length;

        // Disable buttons
        this.btnExplore.disabled = true;
        this.btnAttackGeneral.disabled = true;
        this.btnAttackFire.disabled = true;
        this.btnAttackWater.disabled = true;
        this.btnAttackEarth.disabled = true;
        this.btnRun.disabled = true;
        this.btnQuit.disabled = true;
    }

    recordLeaderboardEntry(victory, name = 'Anonymous') {
        if (this.leaderboardRecorded) return;
        this.leaderboardRecorded = true;

        const entryName = name.trim() || 'Anonymous';
        const entry = {
            date: new Date().toISOString(),
            name: entryName,
            result: victory ? 'Escaped' : 'Fallen',
            level: this.gameState.level,
            gold: this.gameState.gold,
            kills: this.gameState.kills.length,
            bosses: this.gameState.bosses.length
        };

        this.gameState.leaderboard.push(entry);
        this.gameState.leaderboard.sort((a, b) => {
            if (b.level !== a.level) return b.level - a.level;
            if (b.gold !== a.gold) return b.gold - a.gold;
            if (b.kills !== a.kills) return b.kills - a.kills;
            return new Date(b.date) - new Date(a.date);
        });
        this.gameState.leaderboard = this.gameState.leaderboard.slice(0, 5);
        this.saveLeaderboard();
        this.updateLeaderboardUI();
    }

    saveScore() {
        if (this.leaderboardRecorded) return;
        const name = this.leaderboardNameInput ? this.leaderboardNameInput.value : 'Anonymous';
        this.recordLeaderboardEntry(this.gameState.victory, name);
        if (this.btnSaveScore) this.btnSaveScore.disabled = true;
        if (this.leaderboardSaveFeedback) this.leaderboardSaveFeedback.textContent = 'Score saved!';
    }

    restockElementalAttacks() {
        this.gameState.elementalUses.fire = this.gameState.maxElementalUses;
        this.gameState.elementalUses.water = this.gameState.maxElementalUses;
        this.gameState.elementalUses.earth = this.gameState.maxElementalUses;
        this.gameState.elementalUses.air = this.gameState.maxElementalUses;
        this.updateUI();
    }

    loadLeaderboard() {
        try {
            const stored = localStorage.getItem('cosmicQuestLeaderboard');
            this.gameState.leaderboard = stored ? JSON.parse(stored) : [];
        } catch (error) {
            this.gameState.leaderboard = [];
        }
        this.updateLeaderboardUI();
    }

    saveLeaderboard() {
        try {
            localStorage.setItem('cosmicQuestLeaderboard', JSON.stringify(this.gameState.leaderboard));
        } catch (error) {
            console.warn('Unable to save leaderboard:', error);
        }
    }

    updateLeaderboardUI() {
        if (!this.leaderboardList) return;

        if (this.gameState.leaderboard.length === 0) {
            this.leaderboardList.innerHTML = '<div class="leaderboard-empty">No leaderboard entries yet. Finish a run to record your score!</div>';
            return;
        }

        const html = this.gameState.leaderboard.map((entry, index) => {
            const dateLabel = new Date(entry.date).toLocaleString();
            const name = entry.name || 'Anonymous';
            return `
                <div class="leaderboard-item">
                    <div>
                        <span class="leaderboard-rank">#${index + 1}</span>
                        <strong>${name}</strong> • ${entry.result} • ${dateLabel}
                        <span class="leaderboard-meta">Level ${entry.level} • ${entry.gold} gold • ${entry.kills} kills • ${entry.bosses} bosses</span>
                    </div>
                    <div class="leaderboard-score">${entry.level}L</div>
                </div>
            `;
        }).join('');

        this.leaderboardList.innerHTML = html;
    }

    // ============ UI UPDATES ============

    updateUI() {
        // Health
        const hpPercent = (this.gameState.playerHP / this.gameState.maxHP) * 100;
        this.playerHPBar.style.width = hpPercent + '%';
        this.playerHPText.textContent = `${this.gameState.playerHP}/${this.gameState.maxHP}`;

        // Level and XP
        this.playerLevelText.textContent = this.gameState.level;
        const expPercent = (this.gameState.xp / this.gameState.xpToNextLevel) * 100;
        this.playerExpBar.style.width = expPercent + '%';
        this.playerExpText.textContent = `${this.gameState.xp}/${this.gameState.xpToNextLevel}`;

        // Gold and Damage
        this.playerGoldText.textContent = this.gameState.gold;
        this.playerDamageText.textContent = this.gameState.baseDamage;

        // Room count
        this.roomCountText.textContent = this.gameState.roomCount;

        // Elemental attack counts
        if (this.attackCountGeneral) this.attackCountGeneral.textContent = '∞';
        if (this.attackCountFire) this.attackCountFire.textContent = this.gameState.elementalUses.fire;
        if (this.attackCountWater) this.attackCountWater.textContent = this.gameState.elementalUses.water;
        if (this.attackCountEarth) this.attackCountEarth.textContent = this.gameState.elementalUses.earth;
        if (this.attackCountAir) this.attackCountAir.textContent = this.gameState.elementalUses.air;
        if (this.btnAttackFire) this.btnAttackFire.disabled = this.gameState.elementalUses.fire <= 0;
        if (this.btnAttackWater) this.btnAttackWater.disabled = this.gameState.elementalUses.water <= 0;
        if (this.btnAttackEarth) this.btnAttackEarth.disabled = this.gameState.elementalUses.earth <= 0;
        if (this.btnAttackAir) this.btnAttackAir.disabled = this.gameState.elementalUses.air <= 0;

        // Update kills list
        this.updateKillsList();
    }

    updateEnemyHealth() {
        const healthPercent = (this.battleState.enemyHP / this.battleState.maxEnemyHP) * 100;
        this.enemyHPBar.style.width = healthPercent + '%';
        this.enemyHPText.textContent = `${Math.max(0, this.battleState.enemyHP)}/${this.battleState.maxEnemyHP}`;
    }

    updateKillsList() {
        if (this.gameState.kills.length === 0) {
            this.killsList.innerHTML = '<div style="color: #666; text-align: center;">No defeats yet...</div>';
            return;
        }

        const killGroups = {};
        this.gameState.kills.forEach(kill => {
            killGroups[kill] = (killGroups[kill] || 0) + 1;
        });

        let html = '';
        Object.entries(killGroups).forEach(([name, count]) => {
            html += `<div class="kills-list-item"><span>${name}</span><span class="xp">×${count}</span></div>`;
        });
        this.killsList.innerHTML = html;
    }

    showBattle() {
        this.enemySection.style.display = 'block';
        this.enemyPortrait.textContent = this.battleState.emoji;
        this.enemyName.textContent = this.battleState.enemyName;
        const elementLabel = this.battleState.element ? `${this.battleState.element.toUpperCase()}-type` : '';
        this.enemyRole.textContent = `${this.battleState.role}${elementLabel ? ` • ${elementLabel}` : ''}`;
        this.updateEnemyHealth();

        this.btnAttackGeneral.style.display = 'flex';
        this.btnAttackFire.style.display = 'flex';
        this.btnAttackWater.style.display = 'flex';
        this.btnAttackEarth.style.display = 'flex';
        this.btnAttackAir.style.display = 'flex';
        this.btnRun.style.display = 'flex';
        this.btnExplore.style.display = 'none';
    }

    showExplore() {
        this.enemySection.style.display = 'none';
        this.btnAttackGeneral.style.display = 'none';
        this.btnAttackFire.style.display = 'none';
        this.btnAttackWater.style.display = 'none';
        this.btnAttackEarth.style.display = 'none';
        this.btnAttackAir.style.display = 'none';
        this.btnRun.style.display = 'none';
        this.btnExplore.style.display = 'flex';
    }

    showDamage(amount, source) {
        const indicator = this.damageIndicator;
        indicator.textContent = `-${amount}`;
        indicator.style.color = source === 'enemy' ? '#ff0051' : '#00d99f';
        indicator.style.left = source === 'enemy' ? '50%' : '25%';
        indicator.style.top = '30%';
        indicator.animation = 'none';
        setTimeout(() => {
            indicator.animation = 'floatUp 1s ease-out forwards';
        }, 10);

        if (source === 'player') {
            this.animateEnemyHealthbar();
        }
    }

    showAttackAnimation(attackType) {
        const effect = this.attackEffect;
        if (!effect) return;

        const cleanup = () => {
            effect.classList.remove('fire', 'water', 'earth', 'air', 'general', 'active');
            effect.removeEventListener('animationend', cleanup);
        };

        effect.classList.remove('fire', 'water', 'earth', 'air', 'general', 'active');
        void effect.offsetWidth;

        if (attackType === 'fire') {
            effect.classList.add('fire', 'active');
        } else if (attackType === 'water') {
            effect.classList.add('water', 'active');
        } else if (attackType === 'earth') {
            effect.classList.add('earth', 'active');
        } else if (attackType === 'air') {
            effect.classList.add('air', 'active');
        } else {
            effect.classList.add('general', 'active');
        }

        effect.addEventListener('animationend', cleanup);

        setTimeout(() => {
            cleanup();
        }, 700);
    }

    animateEnemyHealthbar() {
        const bar = this.enemyHPBar;
        if (!bar) return;
        bar.classList.remove('damage-rattle');
        void bar.offsetWidth;
        bar.classList.add('damage-rattle');
    }

    narrate(text) {
        this.narrator.textContent = text;
    }

    addLog(message, type = 'normal') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = message;
        this.storyLog.appendChild(entry);
        this.storyLog.scrollTop = this.storyLog.scrollHeight;
    }
}

// ============ INITIALIZE GAME ============
window.addEventListener('DOMContentLoaded', () => {
    window.game = new CosmicQuestGame();
    
    // Welcome message
    setTimeout(() => {
        window.game.narrate('Welcome to COSMIC QUEST! Your adventure in the dungeon awaits...');
    }, 500);
});
