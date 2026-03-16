import fs from "fs";
import path from "path";

const profilePath = path.resolve(process.cwd(), "profile.json");
const profile = JSON.parse(fs.readFileSync(profilePath, "utf8"));

// --- 1. LEVELING & SCALING LOGIC ---
const dailyXP = Math.floor(Math.random() * 50) + 20;
profile.xp += dailyXP;
while (profile.xp >= profile.nextLevelXP) {
    profile.level += 1;
    profile.xp -= profile.nextLevelXP;
    profile.nextLevelXP = Math.floor(profile.nextLevelXP * 1.5);
    profile.stats.strength += 2;
    profile.stats.intelligence += 2;
}

// --- 2. GENERATE MASSIVE CONTENT SECTIONS ---

// Skill Tree Generator (Fills space with lore and technical skills)
const skillTree = [
    { name: "Node.js Core", rank: "S", desc: "Asynchronous I/O Mastery" },
    { name: "React Phase", rank: "A", desc: "Virtual DOM Manipulation" },
    { name: "PostgreSQL Gate", rank: "B", desc: "Relational Data Extraction" },
    { name: "AWS Cloud Sovereign", rank: "S", desc: "Serverless Architecture" }
];

const skillMarkup = skillTree.map(s => `
#### 💠 ${s.name} [RANK: ${s.rank}]
- **Description:** ${s.desc}
- **Mastery:** ████████████████████ 100%
`).join("\n");

// Shadow Army (Your Projects)
const shadows = [
    { name: "Igris (AI Finance)", origin: "Streamlit Project", power: "Elite Knight" },
    { name: "Tank (Video Conf)", origin: "WebRTC Project", power: "Heavy Knight" },
    { name: "Kaisel (Location Tracker)", origin: "Firebase Project", power: "Wyvern" }
];

const shadowArmyMarkup = shadows.map(sh => `
| unit_id | unit_name | unit_class | origin_source |
| :--- | :--- | :--- | :--- |
| ${Math.random().toString(36).substring(7)} | ${sh.name} | ${sh.power} | ${sh.origin} |
`).join("\n");

// --- 3. THE FULL README TEMPLATE (The "2000 Line" Structure) ---
const readmeContent = `
# 🗡️ [ SYSTEM INTERFACE: PENDEM VAMSI ]

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=32&duration=4200&pause=1200&color=00FFFF&center=true&vCenter=true&width=600&lines=SYSTEM+AWAKENING...;Shadow+Monarch+Ascending;Current+Level%3A+${profile.level};Extracting+Project+Shadows..." />
</p>

## 🆔 PLAYER STATUS WINDOW
\`\`\`text
NAME          →  PENDEM VAMSI
JOB           →  SHADOW MONARCH (Full-Stack Developer)
LEVEL         →  ${profile.level}
RANK          →  S-RANK
FATIGUE       →  0
─────── CORE STATS ───────
STRENGTH      [${profile.stats.strength}]  ████████████████
AGILITY       [${profile.stats.agility}]   ██████████████░░
SENSE         [${profile.stats.sense}]     ████████████████
INTELLIGENCE  [${profile.stats.intelligence}] ████████████████
VITALITY      [${profile.stats.vitality}]  ████████████░░░░
\`\`\`

---

## 📜 QUEST LOG: ACADEMIC DUNGEONS
> **[QUEST: THE PATH TO ENGINEERING]** - STATUS: **CLEARED**
* **St. Ann’s College of Engineering** (2020-2024) - B.Tech CSE
* **Sri Medhavi Junior College** (2018-2020) - Intermediate
* **Sri Geethanjali High School** (2017-2018) - SSC

---

## 🛡️ SKILL TREE: AWAKENED ABILITIES
${skillMarkup}

---

## 👥 SHADOW ARMY (PROJECT ARCHIVES)
> *"Arise."*
${shadowArmyMarkup}

---

## 📊 SYSTEM ANALYTICS
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&hide_border=true" width="48%" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical&hide_border=true" width="48%" />
</p>

---

## 📞 UPLINK (CONTACT)
- 📧 **Gmail:** pendem.vamsi12@gmail.com
- 🔗 **LinkedIn:** /in/vamsipendem
- 📱 **Voice:** +91 9032552849

<p align="center">
  「If you hesitate, you die.」<br/>
  <i>System Synchronized: ${new Date().toISOString()}</i>
</p>
`;

fs.writeFileSync(path.join(process.cwd(), "README.md"), readmeContent);
fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2));
