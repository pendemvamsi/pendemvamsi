// profile-generator.js
// Solo Leveling themed GitHub README generator for Pendem Vamsi
// Run with: node profile-generator.js

import fs from "fs";
import path from "path";

// ─── CONFIG ────────────────────────────────────────────────
const USERNAME = "pendemvamsi";
const PROFILE_FILE = path.join(process.cwd(), "profile.json");
const README_FILE  = path.join(process.cwd(), "README.md");

// ─── LOAD OR INITIALIZE PROFILE ────────────────────────────
let profile;

if (fs.existsSync(PROFILE_FILE)) {
  try {
    profile = JSON.parse(fs.readFileSync(PROFILE_FILE, "utf-8"));
  } catch (err) {
    console.error("Invalid profile.json → creating new one", err.message);
    profile = null;
  }
}

if (!profile || !profile.level) {
  profile = {
    level: 1,
    xp: 0,
    nextLevelXP: 100,
    stats: {
      strength:     20,   // Backend / Java
      agility:      18,   // Frontend / React speed
      sense:        22,   // Logic / DSA / debugging
      intelligence: 21,   // Architecture / R&D / AWS
      vitality:     15    // Endurance / long projects
    }
  };
  console.log("→ New hunter profile awakened");
}

// ─── 1. DAILY LEVELING LOGIC ───────────────────────────────
const dailyXP = Math.floor(Math.random() * 60) + 25; // 25–84 XP
profile.xp += dailyXP;

let levelsGained = 0;

while (profile.xp >= profile.nextLevelXP) {
  profile.level += 1;
  profile.xp -= profile.nextLevelXP;
  profile.nextLevelXP = Math.floor(profile.nextLevelXP * 1.55); // ~golden ratio-ish curve

  // Stat growth per level
  profile.stats.strength     += Math.floor(Math.random() * 3) + 2;
  profile.stats.agility      += Math.floor(Math.random() * 3) + 1;
  profile.stats.sense        += Math.floor(Math.random() * 4) + 2;
  profile.stats.intelligence += Math.floor(Math.random() * 3) + 2;
  profile.stats.vitality     += Math.floor(Math.random() * 3) + 1;

  levelsGained++;
}

if (levelsGained > 0) {
  console.log(`→ Level up! Now Level ${profile.level} (+${levelsGained} today)`);
} else {
  console.log(`→ +${dailyXP} XP gained (progress: ${profile.xp}/${profile.nextLevelXP})`);
}

// ─── 2. CONTENT GENERATORS ─────────────────────────────────

const skillTree = [
  { name: "Node.js Sovereign",        rank: "S", desc: "Event Loop & Async Mastery" },
  { name: "React Shadow Monarch",     rank: "S", desc: "Hooks • Context • Suspense" },
  { name: "Java Core Monarch",        rank: "A+", desc: "Multithreading • Streams • JVM" },
  { name: "AWS Cloud Gatekeeper",     rank: "A",  desc: "EC2 • S3 • Lambda • Rekognition" },
  { name: "DSA Shadow Extraction",    rank: "A",  desc: "Graph • DP • Binary Search" },
  { name: "MongoDB Realm Ruler",      rank: "B+", desc: "Aggregation • Indexing • Sharding" }
];

const skillMarkup = skillTree.map(s => `
### 💠 ${s.name}  **[RANK: ${s.rank}]**
**Description:** ${s.desc}  
**Mastery Progress:** ████████████████████ **100%**  
`).join("\n");

const shadowArmy = [
  { name: "Igris",     origin: "AI Financial Advisor (Streamlit + ARIMA)",          power: "Elite Knight – Sentiment & Forecasting" },
  { name: "Beru",      origin: "Seamless Video Conference (WebRTC + Socket.io)",    power: "Insect Lord – Real-time Multi-user" },
  { name: "Kaisel",    origin: "Live Location Tracker (Firebase + Geolocation)",    power: "Wyvern Mount – Coordinate Shadow Sync" },
  { name: "Tusk",      origin: "COVID-19 Global Monitor (disease.sh API)",          power: "Mage – Data Visualization" },
  { name: "Iron",      origin: "React Password Generator (Make Skilled)",           power: "Heavy Tank – Crypto Logic" }
];

const shadowArmyMarkup = shadowArmy.map((sh, i) => `
| #${i+1} | ${sh.name.padEnd(10)} | ${sh.power} | ${sh.origin} |
`).join("\n");

// ─── 3. FULL README TEMPLATE ────────────────────────────────
const readmeContent = `# 🗡️ SYSTEM INTERFACE – PENDEM VAMSI

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=34&duration=4500&pause=1000&color=00FFFF&center=true&vCenter=true&width=620&lines=SYSTEM+AWAKENING...;Shadow+Monarch+Protocol+Active;Hunter+Rank%3A+S;Level+${profile.level};Arise." alt="Typing SVG" />
</p>

## 🆔 PLAYER STATUS WINDOW

\`\`\`text
PLAYER          →  PENDEM VAMSI
CLASS           →  SHADOW MONARCH (Full-Stack Developer)
LEVEL           →  ${profile.level}
XP              →  ${profile.xp} / ${profile.nextLevelXP}
RANK            →  S-RANK
FATIGUE         →  0%

───── CORE STATS ─────
STRENGTH     ${profile.stats.strength.toString().padStart(3)}  █${"█".repeat(Math.min(18, Math.floor(profile.stats.strength/6)))}░░░░
AGILITY      ${profile.stats.agility.toString().padStart(3)}  █${"█".repeat(Math.min(18, Math.floor(profile.stats.agility/6)))}░░░░
SENSE        ${profile.stats.sense.toString().padStart(3)}  █${"█".repeat(Math.min(18, Math.floor(profile.stats.sense/6)))}░░░░
INTELLIGENCE ${profile.stats.intelligence.toString().padStart(3)}  █${"█".repeat(Math.min(18, Math.floor(profile.stats.intelligence/6)))}░░░░
VITALITY     ${profile.stats.vitality.toString().padStart(3)}  █${"█".repeat(Math.min(18, Math.floor(profile.stats.vitality/6)))}░░░░
\`\`\`

> **Daily Quest Reward:** +${dailyXP} XP ${levelsGained > 0 ? `(Level Up ×${levelsGained})` : ""}

---

## 📜 QUEST LOG – ACADEMIC DUNGEONS CLEARED

- **B.Tech Computer Science & Engineering** (2020–2024)  
  St. Ann’s College of Engineering and Technology  
  **Status:** CLEARED

- **Intermediate (MPC)** (2018–2020)  
  Sri Medhavi Junior College  
  **Status:** CLEARED

- **SSC** (2017–2018)  
  Sri Geethanjali High School  
  **Status:** CLEARED

---

## 🛡️ AWAKENED SKILL TREE

${skillMarkup}

---

## 👥 SHADOW ARMY – PROJECT ARCHIVES

> *"Arise."*

| No | Shadow Name     | Class / Power                        | Origin Source                          |
|----|-----------------|--------------------------------------|----------------------------------------|
${shadowArmyMarkup}

---

## 📊 SYSTEM ANALYTICS

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=radical&hide_border=true&include_all_commits=true" width="48%" alt="stats" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${USERNAME}&theme=radical&hide_border=true" width="48%" alt="streak" />
</p>

---

## 📡 UPLINK CHANNELS – OPEN COMMS

- **Email** → pendem.vamsi12@gmail.com
- **LinkedIn** → https://linkedin.com/in/vamsipendem
- **Voice** → +91 90325 52849

<p align="center">
  <sub>「If you hesitate, you die.」</sub><br>
  <sub><i>System synchronized: ${new Date().toISOString().replace("T", " ").split(".")[0]} IST</i></sub>
</p>
`;

// ─── SAVE FILES ─────────────────────────────────────────────
fs.writeFileSync(README_FILE, readmeContent, "utf-8");
fs.writeFileSync(PROFILE_FILE, JSON.stringify(profile, null, 2), "utf-8");

console.log(`→ README.md & profile.json updated successfully.`);
console.log(`Current level: ${profile.level} | XP: ${profile.xp}/${profile.nextLevelXP}`);
