// generate-readme.js
// ULTIMATE SCI-FI / CYBERPUNK / SOLO LEVELING README GENERATOR
// Fixed: dailyMessage is now properly defined
// Run: node generate-readme.js

import fs from "fs";
import path from "path";

const USERNAME = "pendemvamsi";
const PROFILE_FILE = path.join(process.cwd(), "profile.json");
const README_FILE = path.join(process.cwd(), "README.md");

// ─── SCI-FI THEME ENGINE (random every run) ────────────────────────────
const sciFiThemes = [
  { name: "NEON VOID", accent: "00FFFF", secondary: "FF00AA", emoji: "🌌⚡️" },
  { name: "SHADOW EXTRACTION", accent: "AA00FF", secondary: "FF3366", emoji: "🖤👁️" },
  { name: "MATRIX RAIN", accent: "00FF9D", secondary: "008866", emoji: "💾🌧️" },
  { name: "CYBERPUNK 2077", accent: "FF6600", secondary: "FF9900", emoji: "🏙️🔥" },
  { name: "BLADE RUNNER RAIN", accent: "00CCFF", secondary: "CC00FF", emoji: "🌧️🔵" },
  { name: "TRON LEGACY", accent: "00AAFF", secondary: "FFAA00", emoji: "🟦🟧" },
  { name: "PREDATOR CLOAK", accent: "44FF88", secondary: "88FFCC", emoji: "👽🌫️" },
  { name: "NECROMORPH INFEST", accent: "FF4444", secondary: "AA0000", emoji: "🩸☠️" }
];

const dailyTheme = sciFiThemes[Math.floor(Math.random() * sciFiThemes.length)];

// ─── LOAD / INIT PROFILE ───────────────────────────────────────────────
let profile = {
  level: 1,
  xp: 0,
  nextLevelXP: 120,
  rank: "E",
  stats: { strength: 22, agility: 19, intelligence: 28, vitality: 17 }
};

if (fs.existsSync(PROFILE_FILE)) {
  try {
    profile = JSON.parse(fs.readFileSync(PROFILE_FILE, "utf-8"));
  } catch (e) {
    console.warn("Profile file corrupted — starting fresh");
  }
}

// ─── DAILY LEVELING + RANK PROGRESSION ─────────────────────────────────
const dailyXP = Math.floor(Math.random() * 120) + 50;
profile.xp += dailyXP;
let levelsGained = 0;

while (profile.xp >= profile.nextLevelXP) {
  profile.level += 1;
  profile.xp -= profile.nextLevelXP;
  profile.nextLevelXP = Math.floor(profile.nextLevelXP * 1.88);

  profile.stats.strength     += Math.floor(Math.random() * 7) + 5;
  profile.stats.agility      += Math.floor(Math.random() * 6) + 4;
  profile.stats.intelligence += Math.floor(Math.random() * 8) + 6;
  profile.stats.vitality     += Math.floor(Math.random() * 6) + 4;
  levelsGained++;
}

if      (profile.level >= 40) profile.rank = "S+";
else if (profile.level >= 25) profile.rank = "S";
else if (profile.level >= 12) profile.rank = "A";
else if (profile.level >= 5)  profile.rank = "B";

// ─── SCI-FI TERMINAL LOGS (corrupted mainframe style) ──────────────────
let terminalLogs = "";
for (let i = 0; i < 400; i++) {
  const hex = (Math.random() * 0xFFFFFFFF >>> 0).toString(16).toUpperCase().padStart(8, "0");
  const glitch = Math.random() > 0.85 ? " [GLITCH DETECTED] " : "";
  terminalLogs += `> [0x${hex}] ${dailyTheme.emoji} **${dailyTheme.name} PROTOCOL** #${i} | NEURAL LINK ${glitch}STABILIZED | [TRANSMISSION SUCCESS]\n`;
}

// ─── RANDOM SCI-FI / CYBERPUNK QUOTE ───────────────────────────────────
const cyberQuotes = [
  "「If you hesitate, you die.」",
  "「Arise.」",
  "「The System does not forgive weakness.」",
  "「Every shadow you command was once a failure.」",
  "「Level up or perish.」",
  "NEURAL UPLINK ESTABLISHED — RESISTANCE IS FUTILE",
  "QUANTUM ENTANGLEMENT CONFIRMED — YOU ARE THE SYSTEM",
  "SHADOW EXTRACTION COMPLETE — ALL HAIL THE MONARCH",
  "CORPORATE FIREWALL BREACHED — DATA IS FREEDOM",
  "VOID PROTOCOL ACTIVE — NO ESCAPE FROM THE GRID",
  "HOLOGRAPHIC MASK ENGAGED — IDENTITY ERASED",
  "GRID OVERLOAD IMMINENT — PREPARE FOR ASCENSION",
  "SYNTHETIC DREAMS LOADING… DO NOT DISCONNECT"
];

const dailyQuote = cyberQuotes[Math.floor(Math.random() * cyberQuotes.length)];

// ─── RANDOM SCI-FI SYSTEM MESSAGE ──────────────────────────────────────
const cyberMessages = [
  "NEURAL UPLINK ESTABLISHED — RESISTANCE IS FUTILE",
  "QUANTUM ENTANGLEMENT CONFIRMED — YOU ARE THE SYSTEM",
  "SHADOW EXTRACTION COMPLETE — ALL HAIL THE MONARCH",
  "CORPORATE FIREWALL BREACHED — DATA IS FREEDOM",
  "VOID PROTOCOL ACTIVE — NO ESCAPE FROM THE GRID",
  "HOLOGRAPHIC MASK ENGAGED — IDENTITY ERASED",
  "GRID OVERLOAD IMMINENT — PREPARE FOR ASCENSION",
  "SYNTHETIC DREAMS LOADING… DO NOT DISCONNECT",
  "WARNING: MEMETIC HAZARD DETECTED — CONTINUE AT OWN RISK",
  "SHADOW MONARCH PROTOCOL: FULLY AWAKENED",
  "ALL SYSTEMS NOMINAL — SHADOWS ARE LISTENING"
];

const dailyMessage = cyberMessages[Math.floor(Math.random() * cyberMessages.length)];

// ─── FULL README – MAX SCI-FI VIBE ─────────────────────────────────────
const readmeContent = `# 🌌 [ NEURAL CORE ACCESS: ${USERNAME.toUpperCase()} ]

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=42&duration=4800&pause=800&color=${dailyTheme.accent}&center=true&vCenter=true&width=760&lines=NEURAL+UPLINK+INITIATED...;SHADOW+MONARCH+ONLINE;LEVEL+${profile.level}+${profile.rank}+CLASS;GRID+SYNC+COMPLETE;ENTER+THE+VOID" />
</p>

<div align="center">
  <img src="https://raw.githubusercontent.com/Anmol-Baranwal/Cool-GIFs-for-GitHub/main/Solo%20Leveling/Solo_Leveling_System.gif" width="100%" />
  <br><small>Active Protocol: <strong style="color:#${dailyTheme.accent}">${dailyTheme.name}</strong> ${dailyTheme.emoji}</small>
</div>

## 🔵 NEURAL STATUS READOUT
\`\`\`text
SUBJECT ID    →  ${USERNAME.toUpperCase()}
ENTITY CLASS  →  SHADOW MONARCH v${profile.level}
NEURAL RANK   →  ${profile.rank}-TIER
GRID SYNC     →  ${profile.xp}/${profile.nextLevelXP} QUANTUM PACKETS
─────── BIO-METRICS (${dailyTheme.name}) ───────
STRENGTH      ${profile.stats.strength.toString().padStart(3)}  █${"█".repeat(Math.min(20, Math.floor(profile.stats.strength/8)))}${"░".repeat(20 - Math.min(20, Math.floor(profile.stats.strength/8)))}
AGILITY       ${profile.stats.agility.toString().padStart(3)}  █${"█".repeat(Math.min(20, Math.floor(profile.stats.agility/8)))}${"░".repeat(20 - Math.min(20, Math.floor(profile.stats.agility/8)))}
INTELLIGENCE  ${profile.stats.intelligence.toString().padStart(3)}  █${"█".repeat(Math.min(20, Math.floor(profile.stats.intelligence/8)))}${"░".repeat(20 - Math.min(20, Math.floor(profile.stats.intelligence/8)))}
VITALITY      ${profile.stats.vitality.toString().padStart(3)}  █${"█".repeat(Math.min(20, Math.floor(profile.stats.vitality/8)))}${"░".repeat(20 - Math.min(20, Math.floor(profile.stats.vitality/8)))}
\`\`\`

> **NEURAL BURST ACQUIRED:** +${dailyXP} QUANTUM PACKETS ${levelsGained ? `(ASCENSION ×${levelsGained})` : ""}
> **SYSTEM MESSAGE:** ${dailyMessage}

---

## 🌀 GRID ARCHITECTURE (HOLOGRAPHIC RENDER)

\`\`\`mermaid
flowchart LR
    U[Neural Input] --> G{Quantum Gate}
    G --> F[Frontend<br>React + GSAP + Neon]
    G --> B[Backend<br>Node / Express / Java]
    G --> C[Cloud Core<br>AWS Lambda + S3]
    G --> D[Data Vault<br>MongoDB / PostgreSQL]
    F & B & C & D --> O[Grid Online]
    style O fill:#0d1117,stroke:#${dailyTheme.accent},stroke-width:5px,color:#fff
\`\`\`

---

## 📡 ACADEMIC NODES – CONQUERED
- [x] B.Tech Neural Engineering (2020–2024) – St. Ann’s Grid
- [x] Intermediate Quantum Core (2018–2020) – Sri Medhavi
- [x] SSC Primary Link (2017–2018) – Sri Geethanjali

---

## ⚡ SKILL NEURAL MATRIX

<details open>
<summary>🔌 ACTIVE NEURAL LINKS</summary>

| Node               | Tier | Integrity Bar                | Status      |
|--------------------|------|------------------------------|-------------|
| Java Core          | S    | ████████████████████ 100%   | OVERCLOCKED |
| Node.js Grid       | S    | ████████████████████ 100%   | OVERCLOCKED |
| React Holo-UI      | A+   | █████████████████░░░ 92%    | ONLINE      |
| AWS Quantum Relay  | S    | ████████████████████ 100%   | SOVEREIGN   |
| Python AI Kernel   | A    | ████████████████░░░░ 85%    | CHARGING    |
| DSA Void Algorithm | A    | █████████████████░░░ 90%    | ACTIVE      |

</details>

---

## 🏅 NEURAL ACHIEVEMENT TOKENS

<p align="center">
  <img src="https://img.shields.io/badge/IRCTC_NEURAL_LINK-AWAKENED-${dailyTheme.accent}-style=for-the-badge&logo=aws&logoColor=${dailyTheme.secondary}" />
  <img src="https://img.shields.io/badge/CodeChef_GRID_RANK-850-${dailyTheme.secondary}-style=for-the-badge&logo=codechef" />
  <img src="https://img.shields.io/badge/CYBER_COMMANDER-OVERRIDE-${dailyTheme.accent}-style=for-the-badge" />
  <img src="https://img.shields.io/badge/MERN_HOLO_LICENSE-VERIFIED-${dailyTheme.accent}-style=for-the-badge" />
</p>

---

## 👾 SHADOW ENTITIES – SUMMONED

<p align="center">
  <img src="https://raw.githubusercontent.com/Anmol-Baranwal/Cool-GIFs-for-GitHub/main/Solo%20Leveling/Shadow_Extraction.gif" width="420" />
  <br><strong style="color:#${dailyTheme.accent}">ARISE.</strong>
</p>

| Entity | Designation   | Class            | Source Node                     |
|--------|---------------|------------------|---------------------------------|
| SH-01  | Igris         | Void Commander   | AI Financial Oracle             |
| SH-02  | Beru          | Swarm Overlord   | WebRTC Quantum Stream           |
| SH-03  | Kaisel        | Void Wyrm        | Geolocation Shadow Relay        |
| SH-04  | Tusk          | Arcane Construct | Global Pandemic Sentinel        |
| SH-05  | Iron          | Armored Bastion  | React Crypto Fortress           |

---

## 📡 GRID ANALYTICS (LIVE FEED)

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=radical&hide_border=true&include_all_commits=true&bg_color=0d1117&title_color=${dailyTheme.accent}&text_color=ffffff&icon_color=${dailyTheme.secondary}" width="48%" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${USERNAME}&theme=radical&hide_border=true&background=0d1117&stroke=${dailyTheme.accent}&ring=${dailyTheme.secondary}&fire=${dailyTheme.accent}" width="48%" /><br>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&theme=radical&hide_border=true&bg_color=0d1117&title_color=${dailyTheme.accent}&text_color=ffffff" width="48%" />
  <img src="https://github-profile-trophy.vercel.app/?username=${USERNAME}&theme=radical&row=1&column=6&no-frame=true&bg_color=0d1117" width="100%" />
</p>

---

## 🖥️ CORRUPTED MAINFRAME LOG (${terminalLogs.split('\n').length} ENTRIES)

<details>
<summary>OPEN TERMINAL FEED – PROTOCOL: ${dailyTheme.name}</summary>

${terminalLogs}

</details>

---

## 🔗 QUANTUM UPLINK NODES
- **NEURAL BURST** → pendem.vamsi12@gmail.com
- **CORPORATE SYNC** → https://linkedin.com/in/vamsipendem
- **VOICE RELAY** → +91 9032552849

<p align="center">
  <sub style="color:#${dailyTheme.secondary}">${dailyQuote}</sub><br>
  <sub><i style="color:#888;">GRID SYNCHRONIZED: ${new Date().toISOString().slice(0,19)} IST | PROTOCOL: ${dailyTheme.name}</i></sub>
</p>
`;

fs.writeFileSync(README_FILE, readmeContent);
fs.writeFileSync(PROFILE_FILE, JSON.stringify(profile, null, 2));

console.log(`\n🌌 SCI-FI MAXIMUM ANIMATION README GENERATED`);
console.log(`Level: ${profile.level} | Rank: ${profile.rank}`);
console.log(`Active theme: ${dailyTheme.name} (${dailyTheme.emoji})`);
console.log(`Quote: ${dailyQuote}`);
console.log(`Message: ${dailyMessage}`);
console.log(`Terminal entries: ${terminalLogs.split('\n').length}`);
