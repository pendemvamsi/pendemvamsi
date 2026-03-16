import fs from "fs";
import path from "path";

// Load player state
const profilePath = path.resolve(process.cwd(), "profile.json");
const profile = JSON.parse(fs.readFileSync(profilePath, "utf8"));

// ----------------- GAME LOGIC -----------------

const lootTable = [
  { name: "🛡️ Steel Shield", type: "armor", defense: 5 },
  { name: "🗡️ Iron Sword", type: "weapon", attack: 5 },
  { name: "🧪 Health Potion", type: "potion", heal: 50 },
  { name: "🧪 Mana Potion", type: "potion", mana: 30 },
  { name: "⚔️ Shadow Dagger", type: "weapon", attack: 12 }
];

function levelUp() {
  profile.level += 1;
  profile.xp -= profile.nextLevelXP;
  profile.nextLevelXP = Math.floor(profile.nextLevelXP * 1.6);
  profile.health += 25;
  profile.mana += 15;
  profile.attack += 7;
  profile.defense += 4;
  console.log(`LEVEL UP! Now Level ${profile.level}`);
}

function gainXP(amount) {
  profile.xp += amount;
  while (profile.xp >= profile.nextLevelXP) {
    levelUp();
  }
}

// Simulate Daily Activity
const dailyXP = Math.floor(Math.random() * 45) + 15;
gainXP(dailyXP);

// 20% chance for loot
if (Math.random() > 0.8) {
  const item = lootTable[Math.floor(Math.random() * lootTable.length)];
  profile.inventory.push(item);
}

// Handle Quests (Complete old ones, add new one)
profile.quests.forEach(q => q.completed = true); 
if (profile.quests.length > 5) profile.quests.shift(); // Keep list clean

const newQuest = {
  id: Date.now(),
  name: `Slay ${Math.floor(Math.random() * 5) + 2} E-Rank Goblins`,
  reward: Math.floor(Math.random() * 30) + 10,
  completed: false
};
profile.quests.push(newQuest);

// Save State
fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2));

// ----------------- README GEN -----------------

const progressPercent = Math.min(100, Math.floor((profile.xp / profile.nextLevelXP) * 100));
const progressBar = `![XP](https://progress-bar.dev/${progressPercent}/?title=XP&width=400&color=6a0dad)`;

const inventoryList = profile.inventory.length > 0 
  ? profile.inventory.map(i => `| ${i.name} | ${i.type} |`).join("\n")
  : "| Empty | - |";

const questList = profile.quests.map(q => 
  `- ${q.completed ? "✅" : "⏳"} ${q.name} (Reward: ${q.reward} XP)`
).join("\n");

const content = `
# 🗡️ Solo Leveling: GitHub Chronicles

### 👤 Player: ${profile.name} 
**Class:** ${profile.class} | **Rank:** ${profile.level > 10 ? 'B-Rank' : 'E-Rank'}

---

### 📊 Stats
| Stat | Value |
| :--- | :--- |
| **Level** | ${profile.level} |
| **Health** | ${profile.health} |
| **Mana** | ${profile.mana} |
| **Attack** | ${profile.attack} |
| **Defense** | ${profile.defense} |

**Experience Points:**
${profile.xp} / ${profile.nextLevelXP}
${progressBar}

---

### 🎒 Inventory
| Item | Type |
| :--- | :--- |
${inventoryList}

---

### 📜 Active Quests
${questList}

---

*Last Updated: ${new Date().toUTCString()}*
*Automated via GitHub Actions*
`;

fs.writeFileSync(path.resolve(process.cwd(), "README.md"), content);
