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
            gameOver: false,
            victory: false
        };

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
        this.enemySection = document.getElementById('enemySection');
        this.enemyPortrait = document.getElementById('enemyPortrait');
        this.enemyName = document.getElementById('enemyName');
        this.enemyRole = document.getElementById('enemyRole');
        this.enemyHPBar = document.getElementById('enemyHealthBar');
        this.enemyHPText = document.getElementById('enemyHP');
        this.roomDescription = document.getElementById('roomDescription');
        this.damageIndicator = document.getElementById('damageIndicator');
        this.gameOverModal = document.getElementById('gameOverModal');

        this.btnExplore = document.getElementById('btnExplore');
        this.btnFight = document.getElementById('btnFight');
        this.btnRun = document.getElementById('btnRun');
        this.btnQuit = document.getElementById('btnQuit');
        this.btnRestart = document.getElementById('btnRestart');

        this.updateUI();
    }

    setupEventListeners() {
        this.btnExplore.addEventListener('click', () => this.exploreRoom());
        this.btnFight.addEventListener('click', () => this.attackEnemy());
        this.btnRun.addEventListener('click', () => this.runAway());
        this.btnQuit.addEventListener('click', () => this.quitGame());
        this.btnRestart.addEventListener('click', () => location.reload());
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
        const monsters = [
            { name: 'Goblin', hp: 6, damage: 2, xp: 10, loot: 5, emoji: '👺' },
            { name: 'Orc', hp: 12, damage: 3, xp: 20, loot: 15, emoji: '🗡️' },
            { name: 'Skeleton', hp: 10, damage: 2, xp: 15, loot: 10, emoji: '💀' },
            { name: 'Cave Spider', hp: 8, damage: 3, xp: 12, loot: 8, emoji: '🕷️' },
            { name: 'Shadow Beast', hp: 14, damage: 4, xp: 25, loot: 20, emoji: '🐺' },
            { name: 'Flame Elemental', hp: 11, damage: 4, xp: 22, loot: 18, emoji: '🔥' },
            { name: 'Frost Wraith', hp: 9, damage: 3, xp: 18, loot: 12, emoji: '❄️' },
            { name: 'Stone Golem', hp: 18, damage: 3, xp: 35, loot: 30, emoji: '🪨' }
        ];

        const monster = monsters[Math.floor(Math.random() * monsters.length)];
        this.battleState = {
            inBattle: true,
            enemyName: monster.name,
            enemyHP: monster.hp,
            maxEnemyHP: monster.hp,
            enemyDamage: monster.damage,
            enemyXP: monster.xp,
            enemyLoot: monster.loot,
            enemyType: 'monster',
            emoji: monster.emoji,
            role: `A menacing ${monster.name} appears!`
        };

        this.narrate(`Something STIRS in the darkness! A ${monster.name} EMERGES!`);
        this.showBattle();
        this.btnFight.style.display = 'flex';
        this.btnRun.style.display = 'flex';
    }

    spawnBoss() {
        const bosses = [
            { name: 'Fernando', hp: 12, damage: 3, xp: 50, loot: 15, emoji: '🎭', role: 'The Charmer' },
            { name: 'Astle', hp: 18, damage: 4, xp: 70, loot: 30, emoji: '⚔️', role: 'The Warrior' },
            { name: 'Felizian', hp: 25, damage: 5, xp: 100, loot: 50, emoji: '🧙', role: 'The Sorcerer' },
            { name: 'Irene', hp: 16, damage: 4, xp: 75, loot: 35, emoji: '🗡️', role: 'The Assassin' },
            { name: 'Darko', hp: 35, damage: 7, xp: 150, loot: 100, emoji: '👿', role: 'The Dark Lord' },
            { name: 'Meera', hp: 28, damage: 6, xp: 120, loot: 75, emoji: '⚡', role: 'The Betrayer' }
        ];

        const boss = bosses[Math.floor(Math.random() * bosses.length)];
        this.battleState = {
            inBattle: true,
            enemyName: boss.name,
            enemyHP: boss.hp,
            maxEnemyHP: boss.hp,
            enemyDamage: boss.damage,
            enemyXP: boss.xp,
            enemyLoot: boss.loot,
            enemyType: 'boss',
            emoji: boss.emoji,
            role: boss.role
        };

        this.narrate(`AT LAST! A figure of POWER emerges from the shadows! It's ${boss.name}, ${boss.role}!`);
        this.showBattle();
        this.btnFight.style.display = 'flex';
        this.btnRun.style.display = 'flex';
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

    attackEnemy() {
        if (!this.battleState.inBattle) return;

        // Player attack
        const playerDamage = this.gameState.baseDamage + Math.floor(Math.random() * 5);
        this.battleState.enemyHP -= playerDamage;

        this.showDamage(playerDamage, 'player');
        this.addLog(`You dealt ${playerDamage} damage to ${this.battleState.enemyName}!`, 'combat');

        if (this.battleState.enemyHP <= 0) {
            this.defeatEnemy();
            return;
        }

        this.updateEnemyHealth();

        // Enemy counter-attack
        setTimeout(() => {
            const enemyDamage = Math.max(1, this.battleState.enemyDamage + Math.floor(Math.random() * 3) - 1);
            this.gameState.playerHP -= enemyDamage;

            this.showDamage(enemyDamage, 'enemy');
            this.addLog(`${this.battleState.enemyName} dealt ${enemyDamage} damage to you!`, 'combat');

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

        this.narrate(`LEVEL UP! You are now level ${this.gameState.level}! Your power increases!`);
        this.addLog(`⬆️ LEVEL UP! Now level ${this.gameState.level}!`, 'victory');
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
        this.btnFight.disabled = true;
        this.btnRun.disabled = true;
        this.btnQuit.disabled = true;
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
        this.enemyRole.textContent = this.battleState.role;
        this.updateEnemyHealth();
    }

    showExplore() {
        this.enemySection.style.display = 'none';
        this.btnFight.style.display = 'none';
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
