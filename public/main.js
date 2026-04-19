// Game State
let gameState = {
    raibos: 0,
    totalRaibos: 0, // lifetime raibos earned (for achievements)
    totalClicks: 0,
    clickPower: 1,
    idlePower: 0,
    upgradeLevels: {},
    rebirthPoints: 0,
    achievements: [],
    timeSkipsUsed: 0,
    invasionPerks: { sectors: 0, coreFragments: 0, mindControl: 0, annihilations: 0 },
    invasionCount: 0,
    gamepasses: [],
    migratedInvasionPasses: false,
    username: null, // Global Leaderboard Username
    lastSaveTime: Date.now()
};

const SAVE_KEY = 'raibosSimulatorSave';

// Upgrade Definitions
const clickUpgrades = [
    { id: 'c1', name: 'Strong Finger', desc: '+1 Raibos/click', baseCost: 10, costMul: 1.20, value: 1 },
    { id: 'c2', name: 'Focused Mind', desc: '+5 Raibos/click', baseCost: 100, costMul: 1.22, value: 5 },
    { id: 'c3', name: 'Raibos Synergy', desc: '+30 Raibos/click', baseCost: 1000, costMul: 1.25, value: 30 },
    { id: 'c4', name: 'Quantum Click', desc: '+200 Raibos/click', baseCost: 15000, costMul: 1.28, value: 200 },
    { id: 'c5', name: 'Auto-Tapper', desc: '+1,500 Raibos/click', baseCost: 200000, costMul: 1.30, value: 1500 },
    { id: 'c6', name: 'Neural Link', desc: '+10,000 Raibos/click', baseCost: 2500000, costMul: 1.35, value: 10000 },
    { id: 'c7', name: 'Raibos Essence', desc: '+80,000 Raibos/click', baseCost: 50000000, costMul: 1.40, value: 80000 },
    { id: 'c8', name: 'Click Dimension', desc: '+500k Raibos/click', baseCost: 1000000000, costMul: 1.45, value: 500000 },
    { id: 'c9', name: 'Multiverse Tap', desc: '+5M Raibos/click', baseCost: 50000000000, costMul: 1.50, value: 5000000 },
    { id: 'c10', name: 'Timeline Collapse', desc: '+80M Raibos/click', baseCost: 5000000000000, costMul: 1.55, value: 80000000 },
    { id: 'c11', name: 'Alpha Shift', desc: '+2B Raibos/click', baseCost: 500000000000000, costMul: 1.60, value: 2000000000 },
    { id: 'c12', name: 'Omega End', desc: '+100B Raibos/click', baseCost: 100000000000000000, costMul: 1.65, value: 100000000000 },
    { id: 'c13', name: 'Cyber Pulse', desc: '+2T Raibos/click', baseCost: 1e19, costMul: 1.62, value: 2e12 },
    { id: 'c14', name: 'Electron Burst', desc: '+50T Raibos/click', baseCost: 8e20, costMul: 1.60, value: 5e13 },
    { id: 'c15', name: 'Vector Force', desc: '+1Qd Raibos/click', baseCost: 5e22, costMul: 1.58, value: 1e15 },
    { id: 'c16', name: 'Kinetic Warp', desc: '+25Qd Raibos/click', baseCost: 4e24, costMul: 1.56, value: 2.5e16 },
    { id: 'c17', name: 'Ion Striker', desc: '+600Qd Raibos/click', baseCost: 3e26, costMul: 1.54, value: 6e17 },
    { id: 'c18', name: 'Molecular Split', desc: '+15Qi Raibos/click', baseCost: 2e28, costMul: 1.52, value: 1.5e19 },
    { id: 'c19', name: 'Atomic Tap', desc: '+400Qi Raibos/click', baseCost: 1e30, costMul: 1.50, value: 4e20 },
    { id: 'c20', name: 'Subatomic Click', desc: '+10Sx Raibos/click', baseCost: 8e31, costMul: 1.48, value: 1e22 },
    { id: 'c21', name: 'Quark Force', desc: '+250Sx Raibos/click', baseCost: 6e33, costMul: 1.46, value: 2.5e23 },
    { id: 'c22', name: 'Neutron Smasher', desc: '+6Sp Raibos/click', baseCost: 5e35, costMul: 1.44, value: 6e24 },
    { id: 'c23', name: 'Hadron Collider', desc: '+150Sp Raibos/click', baseCost: 4e37, costMul: 1.42, value: 1.5e26 },
    { id: 'c24', name: 'Gluon Bond', desc: '+4Oc Raibos/click', baseCost: 3e39, costMul: 1.40, value: 4e27 },
    { id: 'c25', name: 'Gravity Well', desc: '+100Oc Raibos/click', baseCost: 2e41, costMul: 1.38, value: 1e29 },
    { id: 'c26', name: 'Event Horizon', desc: '+2No Raibos/click', baseCost: 1e43, costMul: 1.36, value: 2e30 },
    { id: 'c27', name: 'Singularity Tap', desc: '+50No Raibos/click', baseCost: 8e44, costMul: 1.35, value: 5e31 },
    { id: 'c28', name: 'Black Hole Click', desc: '+1Dc Raibos/click', baseCost: 6e46, costMul: 1.34, value: 1e33 },
    { id: 'c29', name: 'White Hole Pulse', desc: '+25Dc Raibos/click', baseCost: 5e48, costMul: 1.33, value: 2.5e34 },
    { id: 'c30', name: 'Anti-Matter Strike', desc: '+600Dc Raibos/click', baseCost: 4e50, costMul: 1.32, value: 6e35 },
    { id: 'c31', name: 'Dark Energy Tap', desc: '+15aa Raibos/click', baseCost: 3e52, costMul: 1.31, value: 1.5e37 },
    { id: 'c32', name: 'Vacuum Energy', desc: '+400aa Raibos/click', baseCost: 2e54, costMul: 1.30, value: 4e38 },
    { id: 'c33', name: 'Higgs Field Tap', desc: '+10ab Raibos/click', baseCost: 1e56, costMul: 1.29, value: 1e40 },
    { id: 'c34', name: 'Superstring Vibration', desc: '+250ab Raibos/click', baseCost: 8e57, costMul: 1.28, value: 2.5e41 },
    { id: 'c35', name: 'Universal Origin', desc: '+6ac Raibos/click', baseCost: 6e59, costMul: 1.27, value: 6e42 }
];

const idleUpgrades = [
    { id: 'i1', name: 'Raibos Worker', desc: '+1 Raibos/sec', baseCost: 15, costMul: 1.20, value: 1 },
    { id: 'i2', name: 'Raibos Generator', desc: '+10 Raibos/sec', baseCost: 150, costMul: 1.22, value: 10 },
    { id: 'i3', name: 'Raibos Farm', desc: '+50 Raibos/sec', baseCost: 1200, costMul: 1.25, value: 50 },
    { id: 'i4', name: 'Raibos Factory', desc: '+250 Raibos/sec', baseCost: 8000, costMul: 1.25, value: 250 },
    { id: 'i5', name: 'Raibos Mine', desc: '+1,500 Raibos/sec', baseCost: 50000, costMul: 1.28, value: 1500 },
    { id: 'i6', name: 'Raibos Bank', desc: '+8,000 Raibos/sec', baseCost: 400000, costMul: 1.30, value: 8000 },
    { id: 'i7', name: 'Raibos Temple', desc: '+50,000 Raibos/sec', baseCost: 3500000, costMul: 1.32, value: 50000 },
    { id: 'i8', name: 'Raibos Portal', desc: '+300k Raibos/sec', baseCost: 25000000, costMul: 1.35, value: 300000 },
    { id: 'i9', name: 'Raibos Planet', desc: '+2M Raibos/sec', baseCost: 200000000, costMul: 1.38, value: 2000000 },
    { id: 'i10', name: 'Raibos Galaxy', desc: '+15M Raibos/sec', baseCost: 2500000000, costMul: 1.40, value: 15000000 },
    { id: 'i11', name: 'Raibos Universe', desc: '+100M Raibos/sec', baseCost: 30000000000, costMul: 1.45, value: 100000000 },
    { id: 'i12', name: 'Raibos Multiverse', desc: '+2B Raibos/sec', baseCost: 100000000000, costMul: 1.50, value: 2000000000 },
    { id: 'i13', name: 'Dimensional Rift', desc: '+50B Raibos/sec', baseCost: 10000000000000, costMul: 1.55, value: 50000000000 },
    { id: 'i14', name: 'Singularity', desc: '+1T Raibos/sec', baseCost: 1000000000000000, costMul: 1.60, value: 1000000000000 },
    { id: 'i15', name: 'Omega Core', desc: '+50T Raibos/sec', baseCost: 500000000000000000, costMul: 1.65, value: 50000000000000 },
    { id: 'i16', name: 'Satellite Network', desc: '+1Qd Raibos/sec', baseCost: 1e20, costMul: 1.62, value: 1e15 },
    { id: 'i17', name: 'Moon Colony', desc: '+25Qd Raibos/sec', baseCost: 8e21, costMul: 1.60, value: 2.5e16 },
    { id: 'i18', name: 'Solar Swarm', desc: '+600Qd Raibos/sec', baseCost: 5e23, costMul: 1.58, value: 6e17 },
    { id: 'i19', name: 'Dyson Sphere', desc: '+15Qi Raibos/sec', baseCost: 4e25, costMul: 1.56, value: 1.5e19 },
    { id: 'i20', name: 'Star Forge', desc: '+400Qi Raibos/sec', baseCost: 3e27, costMul: 1.54, value: 4e20 },
    { id: 'i21', name: 'Pulsar Battery', desc: '+10Sx Raibos/sec', baseCost: 2e29, costMul: 1.52, value: 1e22 },
    { id: 'i22', name: 'Neutron Star Mine', desc: '+250Sx Raibos/sec', baseCost: 1e31, costMul: 1.50, value: 2.5e23 },
    { id: 'i23', name: 'Quasar Engine', desc: '+6Sp Raibos/sec', baseCost: 8e32, costMul: 1.48, value: 6e24 },
    { id: 'i24', name: 'Galactic Core', desc: '+150Sp Raibos/sec', baseCost: 6e34, costMul: 1.46, value: 1.5e26 },
    { id: 'i25', name: 'Supercluster Hub', desc: '+4Oc Raibos/sec', baseCost: 5e36, costMul: 1.44, value: 4e27 },
    { id: 'i26', name: 'Great Attractor', desc: '+100Oc Raibos/sec', baseCost: 4e38, costMul: 1.42, value: 1e29 },
    { id: 'i27', name: 'Cosmic Web', desc: '+2No Raibos/sec', baseCost: 3e40, costMul: 1.40, value: 2e30 },
    { id: 'i28', name: 'Dimension Breach', desc: '+50No Raibos/sec', baseCost: 2e42, costMul: 1.38, value: 5e31 },
    { id: 'i29', name: 'Parallel Reality', desc: '+1Dc Raibos/sec', baseCost: 1e44, costMul: 1.36, value: 1e33 },
    { id: 'i30', name: 'Multiverse Bridge', desc: '+25Dc Raibos/sec', baseCost: 8e45, costMul: 1.35, value: 2.5e34 },
    { id: 'i31', name: 'Infinite Library', desc: '+600Dc Raibos/sec', baseCost: 6e47, costMul: 1.34, value: 6e35 },
    { id: 'i32', name: 'Timeless Archive', desc: '+15aa Raibos/sec', baseCost: 5e49, costMul: 1.33, value: 1.5e37 },
    { id: 'i33', name: 'Laws of Physics', desc: '+400aa Raibos/sec', baseCost: 4e51, costMul: 1.32, value: 4e38 },
    { id: 'i34', name: 'Void Construction', desc: '+10ab Raibos/sec', baseCost: 3e53, costMul: 1.31, value: 1e40 },
    { id: 'i35', name: 'Entropy Siphon', desc: '+250ab Raibos/sec', baseCost: 2e55, costMul: 1.30, value: 2.5e41 },
    { id: 'i36', name: 'Conceptual Engine', desc: '+6ac Raibos/sec', baseCost: 1e57, costMul: 1.29, value: 6e42 },
    { id: 'i37', name: 'Final Theorem', desc: '+150ac Raibos/sec', baseCost: 8e58, costMul: 1.28, value: 1.5e44 },
    { id: 'i38', name: 'The Great Design', desc: '+4ad Raibos/sec', baseCost: 6e60, costMul: 1.27, value: 4e45 },
    { id: 'i39', name: 'Eternal Cycle', desc: '+100ad Raibos/sec', baseCost: 5e62, costMul: 1.26, value: 1e47 },
    { id: 'i40', name: 'Absolute End', desc: '+2ae Raibos/sec', baseCost: 4e64, costMul: 1.25, value: 2e48 }
];

const gamepassData = [
    { id: 'gp1', title: 'VIP Autoclicker', desc: 'Auto-clicks 5 times every second.', price: '$4.99' },
    { id: 'gp2', title: 'Invasion Intelligence', desc: 'Invasion cost scales at x1.003 instead of x1.01.', price: '$9.99' },
    { id: 'gp3', title: 'Double Rebirth Boost', desc: 'Multiplies Rebirth Point (RP) gains by x2 permanently.', price: '$14.99' },
    { id: 'gp4', title: 'Chrono Mastery', desc: 'Time Skips grant 1 hour of production instead of 5 minutes.', price: '$19.99' },
    { id: 'gp6', title: 'Quantum Dispatch', desc: 'Auto-Invasion dispatches every 0.25s. Removes animation delay.', price: '$29.99' },
    { id: 'gp5', title: 'Absolute Ruler', desc: 'Base Global Multiplier x50. You become a Golden God.', price: '$49.99' },
    { id: 'gp7', title: 'Quantum Crunch', desc: '2% chance on click to gain 1 minute of production instantly.', price: '$24.99' },
    { id: 'gp8', title: 'Infinite Wisdom', desc: 'Upgrade price scaling is 50% slower.', price: '$39.99' },
    { id: 'gp9', title: 'Raibos Magnet', desc: '10% chance on click to gain 10x Raibos.', price: '$24.99' },
    { id: 'gp10', title: 'Emperor of Raibos', desc: '+1x Global Multiplier for every 100 total upgrade levels.', price: '$59.99' }
];

const achievementsData = [
    { id: 'a1', title: 'First Steps', req: () => gameState.totalClicks >= 10, desc: 'Click 10 times', bonus: 0.05 },
    { id: 'a2', title: 'Getting Serious', req: () => gameState.totalClicks >= 100, desc: 'Click 100 times', bonus: 0.1 },
    { id: 'a3', title: 'Click Maniac', req: () => gameState.totalClicks >= 1000, desc: 'Click 1,000 times', bonus: 0.2 },
    { id: 'a4', title: 'Wealthy', req: () => gameState.totalRaibos >= 10000, desc: 'Earn 10,000 Raibos total', bonus: 0.1 },
    { id: 'a5', title: 'Millionaire', req: () => gameState.totalRaibos >= 1000000, desc: 'Earn 1M Raibos total', bonus: 1.0 },
    { id: 'a6', title: 'Billionaire', req: () => gameState.totalRaibos >= 1000000000, desc: 'Earn 1B Raibos total', bonus: 5.0 },
    { id: 'a7', title: 'Industrialist', req: () => gameState.idlePower >= 10000, desc: 'Reach 10k Raibos/sec', bonus: 0.5 },
    { id: 'a8', title: 'Ascended', req: () => gameState.rebirthPoints > 0, desc: 'Rebirth for the first time', bonus: 1.0 },
    
    // Extended Normal Achievements
    { id: 'a9', title: 'Click God', req: () => gameState.totalClicks >= 10000, desc: 'Click 10,000 times', bonus: 1.0 },
    { id: 'a10', title: 'Trillionaire', req: () => gameState.totalRaibos >= 1e12, desc: 'Earn 1 Trillion Raibos', bonus: 10.0 },
    { id: 'a11', title: 'Quadrillionaire', req: () => gameState.totalRaibos >= 1e15, desc: 'Earn 1 Quadrillion Raibos', bonus: 20.0 },
    { id: 'a12', title: 'Cosmic Tycoon', req: () => gameState.totalRaibos >= 1e18, desc: 'Earn 1 Quintillion Raibos', bonus: 50.0 },
    { id: 'a13', title: 'Automation Rookie', req: () => gameState.idlePower >= 1000000, desc: 'Reach 1M Raibos/sec', bonus: 2.0 },
    { id: 'a14', title: 'Automation Master', req: () => gameState.idlePower >= 1e9, desc: 'Reach 1B Raibos/sec', bonus: 5.0 },
    { id: 'a15', title: 'Rebirth Master', req: () => gameState.rebirthPoints >= 1000, desc: 'Accumulate 1,000 Rebirth Points', bonus: 10.0 },
    { id: 'a16', title: 'Fleet Commander', req: () => gameState.invasionCount >= 10, desc: 'Dispatch 10 Earth Invasions', bonus: 2.0 },
    { id: 'a17', title: 'Whale', req: () => gameState.gamepasses && gameState.gamepasses.length >= 1, desc: 'Buy any Gamepass', bonus: 5.0 },

    // Hidden Achievements (10)
    { id: 'h1', title: 'Doomsday', req: () => gameState.invasionPerks && gameState.invasionPerks.annihilations >= 1, desc: 'Roll the 0.001% Earth Annihilation.', bonus: 50.0, hidden: true },
    { id: 'h2', title: 'P2W God', req: () => gameState.gamepasses && gameState.gamepasses.length === 5, desc: 'Purchase every single Gamepass.', bonus: 100.0, hidden: true },
    { id: 'h3', title: 'Pinnacle of Idle', req: () => gameState.upgradeLevels['i15'] >= 1, desc: 'Unlock the Omega Core.', bonus: 25.0, hidden: true },
    { id: 'h4', title: 'Time Traveler', req: () => gameState.timeSkipsUsed >= 5, desc: 'Catch the Golden Chrono-Raibos 5 times.', bonus: 10.0, hidden: true },
    { id: 'h5', title: 'Hardcore Grinder', req: () => gameState.rebirthPoints >= 100000, desc: 'Reach 100,000 Rebirth Points.', bonus: 200.0, hidden: true },
    { id: 'h6', title: 'Mind Controller', req: () => gameState.invasionPerks && gameState.invasionPerks.mindControl >= 5, desc: 'Accumulate 5 Mind Control perks.', bonus: 30.0, hidden: true },
    { id: 'h7', title: 'Click Omega', req: () => gameState.upgradeLevels['c12'] >= 1, desc: 'Unlock the Omega End click upgrade.', bonus: 25.0, hidden: true },
    { id: 'h8', title: 'Absolute Zero', req: () => gameState.upgradeLevels['c1'] >= 100, desc: 'Reach level 100 on the first Click Upgrade.', bonus: 15.0, hidden: true },
    { id: 'h9', title: 'Gacha Addict', req: () => gameState.invasionCount >= 50, desc: 'Perform 50 Earth Invasions.', bonus: 30.0, hidden: true },
    { id: 'h10', title: 'The Chosen One', req: () => (gameState.gamepasses && gameState.gamepasses.includes('gp5')) && (gameState.invasionPerks && gameState.invasionPerks.annihilations >= 1), desc: 'Be the Absolute Ruler AND obtain Earth Annihilation.', bonus: 500.0, hidden: true }
];

// DOM Elements
const elements = {
    count: document.getElementById('raibos-count'),
    perSec: document.getElementById('raibos-per-sec'),
    perClick: document.getElementById('raibos-per-click'),
    globalMult: document.getElementById('global-multiplier'),
    btn: document.getElementById('raibos-button'),
    glow: document.getElementById('clicker-glow'),
    particles: document.getElementById('particles'),
    tabs: document.querySelectorAll('.tab'),
    clickList: document.getElementById('click-upgrades'),
    idleList: document.getElementById('idle-upgrades'),
    rebirthBadge: document.getElementById('rebirth-badge'),
    rebirthDisp: document.getElementById('rebirth-count-disp'),
    achievementsList: document.getElementById('achievements-container'),
    toastCont: document.getElementById('toast-container'),
    offModal: document.getElementById('offline-modal'),
    offTime: document.getElementById('offline-time'),
    offAmt: document.getElementById('offline-amount'),
    offClose: document.getElementById('offline-close-btn'),
    rbMinReq: document.getElementById('rb-min-req'),
    hrBtn: document.getElementById('hard-reset-btn')
};

// Utility
function getUpgradeCost(upg) {
    const level = gameState.upgradeLevels[upg.id] || 0;
    // 밸런스 조정: 기본 가격 상승폭을 약 15% 상향 (1.2 -> 1.38 등)
    let scaling = upg.costMul * 1.15;
    
    // gp8: 무한한 지혜 (가격 상승폭 50% 완화)
    if (gameState.gamepasses && gameState.gamepasses.includes('gp8')) {
        scaling = 1 + (scaling - 1) * 0.5;
    }
    
    return Math.floor(upg.baseCost * Math.pow(scaling, level));
}

function formatNumber(num) {
    if (num < 1e3) return Math.floor(num).toLocaleString();
    
    const suffixes = ['k', 'M', 'B', 'T', 'Qd', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
    const exp = Math.floor(Math.log10(num) / 3);
    
    if (exp <= 11) {
        const suffix = suffixes[exp - 1];
        return (num / Math.pow(10, exp * 3)).toFixed(2) + suffix;
    } else {
        // Alphabetic notation: aa, ab, ac...
        let alphaIndex = exp - 12; // 12th power of 1000 is 10^36
        let char1 = String.fromCharCode(97 + Math.floor(alphaIndex / 26));
        let char2 = String.fromCharCode(97 + (alphaIndex % 26));
        return (num / Math.pow(10, exp * 3)).toFixed(2) + char1 + char2;
    }
}

function formatTime(sec) {
    if (sec < 60) return sec.toFixed(1) + 's';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}m ${s}s`;
}

function getPointsToEarn(total) {
    if (total < 1000000000) return 0;
    // 대폭 너프: 지수를 0.34에서 0.22로 대폭 하향, 최소 요구치 10억으로 상향
    // Formula: (Total / 1B) ^ 0.22
    let base = total / 1000000000;
    let points = Math.pow(base, 0.22);
    return Math.floor(points);
}

// Core Logic
function getGlobalMultiplier() {
    let mult = 1.0;
    // 1 Rebirth Point = +5% (0.05) [너프 적용됨]
    mult += gameState.rebirthPoints * 0.05;
    
    // Achievements bonus
    gameState.achievements.forEach(achId => {
        const ach = achievementsData.find(a => a.id === achId);
        if (ach) mult += ach.bonus;
    });

    if (gameState.invasionPerks && gameState.invasionPerks.mindControl > 0) {
        mult += gameState.invasionPerks.mindControl * 50.0; // +5000%
    }

    if (gameState.invasionPerks && gameState.invasionPerks.annihilations > 0) {
        mult *= (100 * gameState.invasionPerks.annihilations);
    }
    
    // Absolute Ruler Gamepass
    if (gameState.gamepasses && gameState.gamepasses.includes('gp5')) {
        mult *= 50.0;
    }

    // gp10: 엠페러 오브 라이보스 (총 레벨 100당 +1x)
    const totalLevels = Object.values(gameState.upgradeLevels).reduce((a, b) => a + b, 0);
    if (gameState.gamepasses && gameState.gamepasses.includes('gp10')) {
        mult += Math.floor(totalLevels / 100) * 1.0;
    }

    return mult;
}

function recalculatePowers() {
    let cp = 1;
    let ip = 0;
    
    clickUpgrades.forEach(u => { cp += u.value * (gameState.upgradeLevels[u.id] || 0); });
    idleUpgrades.forEach(u => { ip += u.value * (gameState.upgradeLevels[u.id] || 0); });
    
    if (gameState.invasionPerks) {
        if (gameState.invasionPerks.sectors) cp *= (1 + 0.2 * gameState.invasionPerks.sectors);
        if (gameState.invasionPerks.coreFragments) ip *= (1 + 10 * gameState.invasionPerks.coreFragments);
    }

    const mult = getGlobalMultiplier();
    
    gameState.clickPower = cp * mult;
    gameState.idlePower = ip * mult;
}

// UI
function updateUI() {
    elements.count.innerText = formatNumber(gameState.raibos);
    elements.perSec.innerText = formatNumber(gameState.idlePower);
    elements.perClick.innerText = formatNumber(gameState.clickPower);
    const gm = getGlobalMultiplier();
    elements.globalMult.innerText = 'x' + (gm >= 1000 ? formatNumber(gm) : gm.toFixed(2));
    
    if (gameState.rebirthPoints > 0) {
        elements.rebirthBadge.style.display = 'block';
        elements.rebirthDisp.innerText = formatNumber(gameState.rebirthPoints);
    } else {
        elements.rebirthBadge.style.display = 'none';
    }

    if (gameState.gamepasses && gameState.gamepasses.includes('gp5')) {
        elements.btn.style.background = 'linear-gradient(45deg, gold, yellow)';
        elements.btn.style.boxShadow = '0 0 50px gold';
        elements.btn.style.color = '#fff';
        document.querySelector('.title').style.color = 'gold';
        document.querySelector('.title').style.textShadow = '0 0 10px gold';
    }

    [...clickUpgrades, ...idleUpgrades].forEach(upg => {
        const itemEl = document.getElementById(`upg-${upg.id}`);
        if (itemEl) {
            const cost = getUpgradeCost(upg);
            itemEl.querySelector('.upgrade-cost').innerText = formatNumber(cost);
            itemEl.querySelector('.upgrade-level').innerText = `Lv. ${gameState.upgradeLevels[upg.id] || 0}`;
            itemEl.className = `upgrade-item ${gameState.raibos >= cost ? '' : 'disabled'}`;
        }
    });

    updateRebirthUI();
    renderAchievements();
    renderInvasionUI();
    renderGamepasses();
}

function createUpgradeElement(upg, isClick) {
    const div = document.createElement('div');
    div.id = `upg-${upg.id}`;
    div.innerHTML = `
        <div class="upgrade-info">
            <span class="upgrade-name">${upg.name}</span>
            <span class="upgrade-desc">${upg.desc} (base)</span>
            <span class="upgrade-level">Lv. 0</span>
        </div>
        <div class="upgrade-cost-area">
            <span class="upgrade-cost">0</span>
        </div>
    `;
    div.addEventListener('mousedown', () => buyUpgrade(upg));
    (isClick ? elements.clickList : elements.idleList).appendChild(div);
}

function renderLists() {
    elements.clickList.innerHTML = '';
    elements.idleList.innerHTML = '';
    clickUpgrades.forEach(u => createUpgradeElement(u, true));
    idleUpgrades.forEach(u => createUpgradeElement(u, false));
    renderGamepasses();
}

function renderGamepasses() {
    const cont = document.getElementById('gamepass-container');
    if(!cont) return;
    cont.innerHTML = '';
    gamepassData.forEach(gp => {
        const isOwned = gameState.gamepasses && gameState.gamepasses.includes(gp.id);
        const div = document.createElement('div');
        div.className = `gamepass-item ${isOwned ? 'owned' : ''}`;
        div.innerHTML = `
            <div class="gamepass-info">
                <span class="gamepass-title">${gp.title}</span>
                <span class="gamepass-desc">${gp.desc}</span>
            </div>
            <button class="action-btn" style="padding: 5px 15px; font-size: 0.9rem;" disabled>
                ${isOwned ? 'OWNED' : 'LOCKED (Invasion)'}
            </button>
        `;
        cont.appendChild(div);
    });
}

// Actions
function buyUpgrade(upg) {
    const cost = getUpgradeCost(upg);
    if (gameState.raibos >= cost) {
        gameState.raibos -= cost;
        gameState.upgradeLevels[upg.id] = (gameState.upgradeLevels[upg.id] || 0) + 1;
        recalculatePowers();
        updateUI();
        saveGame();
    }
}

elements.btn.addEventListener('mousedown', (e) => {
    let earned = gameState.clickPower;
    
    // gp9: 라이보스 자석 (10% 확률로 10배)
    if (gameState.gamepasses && gameState.gamepasses.includes('gp9')) {
        if (Math.random() < 0.10) {
            earned *= 10;
            showToast('LUCKY!', 'Raibos Magnet triggered! x10 Luck!');
        }
    }

    // gp7: 퀀텀 크런치 (2% 확률로 1분치 생산량)
    if (gameState.gamepasses && gameState.gamepasses.includes('gp7')) {
        if (Math.random() < 0.02) {
            const bonus = gameState.idlePower * 60;
            gameState.raibos += bonus;
            gameState.totalRaibos += bonus;
            showToast('QUANTUM CRUNCH!', '+1 Minute of Production!');
            createFloatingText(e, bonus);
        }
    }

    gameState.raibos += earned;
    gameState.totalRaibos += earned;
    gameState.totalClicks += 1;
    
    // Animate Glow
    elements.glow.style.transform = `scale(${1 + Math.random()*0.5})`;
    elements.glow.style.opacity = '0.3';
    setTimeout(() => { elements.glow.style.transform = 'scale(1)'; elements.glow.style.opacity = '0.1'; }, 100);

    createFloatingText(e, earned);
    checkAchievements();
    updateUI();
});

function createFloatingText(e, amount) {
    const text = document.createElement('div');
    text.className = 'floating-text';
    text.innerText = `+${formatNumber(amount)}`;
    
    let x, y;
    if (e.clientX !== undefined) {
        x = e.clientX + (Math.random() - 0.5) * 40;
        y = e.clientY - 20;
    } else {
        const rect = elements.btn.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
    }
    text.style.left = `${x}px`; text.style.top = `${y}px`;
    elements.particles.appendChild(text);
    setTimeout(() => text.remove(), 1000);
}

// Achievements
function checkAchievements() {
    let unlocked = false;
    achievementsData.forEach(ach => {
        if (!gameState.achievements.includes(ach.id) && ach.req()) {
            gameState.achievements.push(ach.id);
            showToast('Achievement Unlocked!', `${ach.title} (+${(ach.bonus*100).toFixed(0)}% Boost)`);
            unlocked = true;
        }
    });
    if (unlocked) {
        recalculatePowers();
        renderAchievements();
        saveGame();
    }
}

function renderAchievements() {
    elements.achievementsList.innerHTML = '';
    achievementsData.forEach(ach => {
        const isUnlocked = gameState.achievements.includes(ach.id);
        
        // Hide details if it's a hidden achievement and not yet unlocked
        let dispTitle = ach.title;
        let dispDesc = ach.desc;
        if(ach.hidden && !isUnlocked) {
            dispTitle = "???";
            dispDesc = "Condition Unknown (Hidden Achievement)";
        }
        
        const div = document.createElement('div');
        div.className = `ach-item ${isUnlocked ? 'unlocked' : ''}`;
        div.innerHTML = `
            <div>
                <span class="ach-title" ${ach.hidden && isUnlocked ? 'style="color:#ff00ff; text-shadow:0 0 5px magenta;"' : ''}>${dispTitle}</span>
                <span class="ach-desc">${dispDesc}</span>
            </div>
            <div class="ach-reward">+${(ach.bonus*100).toFixed(0)}%</div>
        `;
        elements.achievementsList.appendChild(div);
    });
}

function showToast(title, body) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-title">${title}</span><span class="toast-body">${body}</span>`;
    elements.toastCont.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Rebirth
function updateRebirthUI() {
    // 밸런스 조정: RP 획득량 하향
    let pointsToEarn = getPointsToEarn(gameState.totalRaibos);
    if(gameState.gamepasses && gameState.gamepasses.includes('gp3')) pointsToEarn *= 2;
    document.getElementById('current-rp').innerText = formatNumber(gameState.rebirthPoints);
    document.getElementById('earn-rp').innerText = "+" + formatNumber(pointsToEarn);
    if (elements.rbMinReq) elements.rbMinReq.innerText = "1,000,000,000 Raibos";
    
    const btn = document.getElementById('rebirth-btn');
    if (pointsToEarn > 0) {
        btn.disabled = false;
        btn.innerText = `ASCEND (+${formatNumber(pointsToEarn)} RP)`;
    } else {
        btn.disabled = true;
        btn.innerText = `NEED MORE RAIBOS`;
    }
}

document.getElementById('rebirth-btn').addEventListener('click', () => {
    let earned = getPointsToEarn(gameState.totalRaibos);
    if(gameState.gamepasses && gameState.gamepasses.includes('gp3')) earned *= 2;
    if (earned <= 0) return;
    
    if (confirm(`환생하시겠습니까? 모든 진행 상황이 초기화되고 ${formatNumber(earned)} RP를 얻습니다.`)) {
        gameState.rebirthPoints += earned;
        
        // Reset everything else
        gameState.raibos = 0;
        gameState.totalRaibos = 0;
        gameState.upgradeLevels = {};
        
        syncRaibosRankings(); // RP 업데이트 즉시 동기화
        recalculatePowers();
        updateUI();
        saveGame();
        
        // Visual effect
        document.body.style.background = 'white';
        setTimeout(() => { document.body.style.background = ''; }, 500);
    }
});

// Loop & Events
let lastTime = performance.now();
let autoInvTimer = 0;
let timeSkipTimer = 0;
let nextTimeSkipStr = Math.random() * 120 + 60; // Next spawn in 60-180s

function gameLoop(currentTime) {
    const dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    
    // Auto Clicker from Gamepass (5 clicks/sec)
    if (gameState.gamepasses && gameState.gamepasses.includes('gp1')) {
        const clickGains = gameState.clickPower * 5 * dt;
        gameState.raibos += clickGains;
        gameState.totalRaibos += clickGains;
    }
    
    // Auto Clicker from Mind Control
    if (gameState.invasionPerks && gameState.invasionPerks.mindControl > 0) {
        const clickGains = gameState.clickPower * 10 * dt; // 10 clicks per second
        gameState.raibos += clickGains;
        gameState.totalRaibos += clickGains;
    }

    if (gameState.idlePower > 0) {
        const gain = gameState.idlePower * dt;
        gameState.raibos += gain;
        gameState.totalRaibos += gain;
        
        // We only check achievements occasionally in the loop to save performance
        if (Math.random() < 0.05) checkAchievements();
        updateUI();
    } else if ((gameState.invasionPerks && gameState.invasionPerks.mindControl > 0) || (gameState.gamepasses && gameState.gamepasses.includes('gp1'))) {
        updateUI();
    }
    
    // Auto Invasion Toggle
    const autoInvEl = document.getElementById('auto-invasion-toggle');
    if (autoInvEl && autoInvEl.checked) {
        autoInvTimer += dt;
        const invInterval = (gameState.gamepasses && gameState.gamepasses.includes('gp6')) ? 0.25 : 1.5;
        if (autoInvTimer >= invInterval) {
            autoInvTimer = 0;
            const cost = getInvasionCost();
            if (gameState.raibos >= cost && !document.getElementById('invasion-btn').disabled) {
                document.getElementById('invasion-btn').click();
            }
        }
    }

    // Time Skip Spawn
    timeSkipTimer += dt;
    if (timeSkipTimer >= nextTimeSkipStr) {
        timeSkipTimer = 0;
        nextTimeSkipStr = Math.random() * 120 + 60;
        const cr = document.getElementById('chrono-raibos');
        if (cr && cr.style.display === 'none') {
            cr.style.left = (Math.random() * 80 + 10) + '%';
            cr.style.top = (Math.random() * 80 + 10) + '%';
            cr.style.display = 'block';
            setTimeout(() => { cr.style.display = 'none'; }, 10000);
        }
    }
    
    // Save current time for offline progress
    gameState.lastSaveTime = Date.now();
    requestAnimationFrame(gameLoop);
}

// Data
let isResetting = false; 
function saveGame() {
    if (isResetting) return; // 리셋 중에는 저장하지 않음
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    syncRaibosRankings(); // 주기적 저장 시 동기화
}

function loadGame() {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
        gameState = { ...gameState, ...JSON.parse(saved) };
        if (!gameState.upgradeLevels) gameState.upgradeLevels = {};
        if (!gameState.achievements) gameState.achievements = [];
        if (!gameState.gamepasses) gameState.gamepasses = [];
        
        // Remove old illegally bought passes
        if (!gameState.migratedInvasionPasses) {
            gameState.gamepasses = [];
            gameState.migratedInvasionPasses = true;
        }
        
        // Calculate Offline Progress
        const now = Date.now();
        const offlineSecs = (now - gameState.lastSaveTime) / 1000;
        
        recalculatePowers(); // need idle power first
        
        // If away for more than 60 seconds
        if (offlineSecs > 60 && gameState.idlePower > 0) {
            const gain = gameState.idlePower * offlineSecs;
            gameState.raibos += gain;
            gameState.totalRaibos += gain;
            
            elements.offTime.innerText = formatTime(offlineSecs);
            elements.offAmt.innerText = formatNumber(gain);
            elements.offModal.style.display = 'flex';
        }
    }
    recalculatePowers();
}

// Events
elements.offClose.addEventListener('click', () => {
    elements.offModal.style.display = 'none';
});

elements.tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        elements.tabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.upgrade-list').forEach(l => l.classList.remove('active'));
        
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);
        
        if (targetPanel) {
            targetPanel.classList.add('active');
        }

        if (targetId === 'ranking-upgrades') {
            if (!gameState.username) {
                const success = setRaibosUsername();
                if (!success) {
                    const container = document.getElementById('ranking-container-raibos');
                    if (container) container.innerHTML = '<div style="text-align:center; padding:20px; color:#ffcc00;">닉네임을 설정해야 랭킹을 이용할 수 있습니다.</div>';
                    return;
                }
            }
            fetchRaibosLeaderboard();
        }
    });
});

const API_BASE = "/api";

function setRaibosUsername() {
    const name = prompt("랭킹 보드에 사용될 닉네임을 입력해 주세요 (최대 12자):");
    if (name && name.trim().length > 0) {
        gameState.username = name.trim().substring(0, 12);
        saveGame();
        syncRaibosRankings();
        return true;
    }
    return false;
}

async function syncRaibosRankings() {
    if (!gameState.username) return;

    try {
        await fetch(`${API_BASE}/rank/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: gameState.username,
                stats: {
                    raibos_raibos: { value: gameState.raibos },
                    raibos_rp: { value: gameState.rebirthPoints },
                    raibos_clicks: { value: gameState.totalClicks },
                    raibos_achievements: { value: gameState.achievements.length },
                    raibos_invasions: { value: gameState.invasionCount || 0 }
                }
            })
        });
    } catch (e) {
        console.warn("Ranking server not reachable");
    }
}

async function fetchRaibosLeaderboard() {
    const container = document.getElementById('ranking-container-raibos');
    const category = document.getElementById('ranking-category-raibos').value;
    
    try {
        const res = await fetch(`${API_BASE}/rank/leaderboard`);
        const data = await res.json();
        renderRaibosLeaderboard(data[category], category);
    } catch (e) {
        container.innerHTML = '<div style="text-align:center; padding:20px; color:#ff6666;">Server Offline</div>';
    }
}

function renderRaibosLeaderboard(list, category) {
    const container = document.getElementById('ranking-container-raibos');
    container.innerHTML = '';

    if (!list || list.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:20px; color:#666;">No data available</div>';
        return;
    }

    list.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'rank-item';
        
        let displayValue = item.value.toLocaleString();
        if (category === 'raibos_raibos') displayValue = formatNumber(item.value);
        
        div.innerHTML = `
            <div class="rank-num">${index + 1}</div>
            <div class="rank-info">
                <span class="rank-username">${item.username}</span>
                <span class="rank-value">${displayValue}</span>
                ${item.extra ? `<span class="rank-extra">${item.extra}</span>` : ''}
            </div>
        `;
        container.appendChild(div);
    });
}


// Earth Invasion Handlers
function getInvasionCost() {
    const isIntelligent = gameState.gamepasses && gameState.gamepasses.includes('gp2');
    const scaleFactor = isIntelligent ? 1.003 : 1.01;
    return Math.floor(1000000 * Math.pow(scaleFactor, gameState.invasionCount || 0));
}

const invBtn = document.getElementById('invasion-btn');

function renderInvasionUI() {
    const cost = getInvasionCost();
    const costDisp = document.getElementById('invasion-cost-disp');
    if (costDisp) costDisp.innerText = formatNumber(cost);

    if (gameState.raibos < cost) {
        invBtn.disabled = true;
        invBtn.style.filter = 'grayscale(1)';
    } else {
        invBtn.disabled = false;
        invBtn.style.filter = 'none';
    }

    const perks = gameState.invasionPerks || {};
    const list = document.getElementById('invasion-relics-list');
    if (list) {
        list.innerHTML = `
            ${perks.annihilations > 0 ? `<li style="color:#ff00ff; text-shadow:0 0 5px #ff00ff; margin-bottom:5px;">❖ 지구 말살 (Earth Annihilation) x${perks.annihilations}<br><small>ㄴ 효과: 전역 배수 x100 중첩 적용</small></li>` : ''}
            ${perks.mindControl > 0 ? `<li style="color:#ffaa00; margin-bottom:5px;">❖ 정신 제어 (Mind Control) x${perks.mindControl}<br><small>ㄴ 효과: 자동 클릭 활성화 및 전역 배수 +5000%</small></li>` : ''}
            ${perks.coreFragments > 0 ? `<li style="color:#00ffcc; margin-bottom:5px;">❖ 행성 핵 조각 (Core Fragments) x${perks.coreFragments}<br><small>ㄴ 효과: 아이들 생산량 +1000%</small></li>` : ''}
            ${perks.sectors > 0 ? `<li style="color:#00aaff; margin-bottom:5px;">❖ 점령된 구역 (Captured Sectors) x${perks.sectors}<br><small>ㄴ 효과: 클릭 위력 +20% 중첩</small></li>` : ''}
            ${(!perks.sectors && !perks.coreFragments && !perks.mindControl && !perks.annihilations) ? '<li>아직 획득한 유물이 없습니다.</li>' : ''}
        `;
    }
}

if (invBtn) {
    invBtn.addEventListener('click', () => {
        const cost = getInvasionCost();
        if (gameState.raibos < cost) {
            showToast('Error', 'Insufficient Fleet Resources.');
            return;
        }
        
        gameState.raibos -= cost;
        gameState.invasionCount = (gameState.invasionCount || 0) + 1;
        updateUI();
        
        const resDiv = document.getElementById('invasion-result');
        resDiv.innerHTML = '<span style="color:#fff; animation: blink 0.1s infinite;">Rerolling fate...</span>';
        invBtn.disabled = true;
        
        const isQuantum = gameState.gamepasses && gameState.gamepasses.includes('gp6');
        const delay = isQuantum ? 200 : 800;
        
        setTimeout(() => {
            const rng = Math.random() * 100;
            let msg = '';
            let color = '#555';
            
            if (!gameState.invasionPerks) gameState.invasionPerks = { sectors: 0, coreFragments: 0, mindControl: 0, annihilations: 0 };
            
            if (rng < 0.001) {
                gameState.invasionPerks.annihilations++;
                msg = "EARTH ANNIHILATION! (x100 Multiplier)";
                color = "#ff00ff";
            } else if (rng < 0.006) {
                if(!gameState.gamepasses.includes('gp5')) { gameState.gamepasses.push('gp5'); msg = "PASS FOUND: Absolute Ruler!"; }
                else { gameState.rebirthPoints += 1000; msg = "Duplicate Pass -> +1000 RP"; }
                color = "gold";
            } else if (rng < 0.016) { 
                gameState.invasionPerks.mindControl++;
                msg = "Global Mind Control! (Auto Tap + 5000%)";
                color = "#ffaa00";
            } else if (rng < 0.026) { 
                if(!gameState.gamepasses.includes('gp6')) { gameState.gamepasses.push('gp6'); msg = "PASS FOUND: Quantum Dispatch!"; }
                else { gameState.rebirthPoints += 300; msg = "Duplicate Pass -> +300 RP"; }
                color = "#44ff44";
            } else if (rng < 0.046) { 
                if(!gameState.gamepasses.includes('gp4')) { gameState.gamepasses.push('gp4'); msg = "PASS FOUND: Chrono Mastery!"; }
                else { gameState.rebirthPoints += 200; msg = "Duplicate Pass -> +200 RP"; }
                color = "#00ffff";
            } else if (rng < 0.076) { 
                if(!gameState.gamepasses.includes('gp3')) { gameState.gamepasses.push('gp3'); msg = "PASS FOUND: Double Rebirth!"; }
                else { gameState.rebirthPoints += 150; msg = "Duplicate Pass -> +150 RP"; }
                color = "#ffff00";
            } else if (rng < 0.116) { 
                if(!gameState.gamepasses.includes('gp2')) { gameState.gamepasses.push('gp2'); msg = "PASS FOUND: Invasion Intelligence!"; }
                else { gameState.rebirthPoints += 100; msg = "Duplicate Pass -> +100 RP"; }
                color = "#ffaa00";
            } else if (rng < 0.166) { 
                if(!gameState.gamepasses.includes('gp1')) { gameState.gamepasses.push('gp1'); msg = "PASS FOUND: VIP Autoclicker!"; }
                else { gameState.rebirthPoints += 50; msg = "Duplicate Pass -> +50 RP"; }
                color = "#00ffcc";
            } else if (rng < 0.196) { 
                if(!gameState.gamepasses.includes('gp7')) { gameState.gamepasses.push('gp7'); msg = "PASS FOUND: Quantum Crunch!"; }
                else { gameState.rebirthPoints += 200; msg = "Duplicate Pass -> +200 RP"; }
                color = "#39ff14";
            } else if (rng < 0.226) { 
                if(!gameState.gamepasses.includes('gp8')) { gameState.gamepasses.push('gp8'); msg = "PASS FOUND: Infinite Wisdom!"; }
                else { gameState.rebirthPoints += 300; msg = "Duplicate Pass -> +300 RP"; }
                color = "#ffff00";
            } else if (rng < 0.256) { 
                if(!gameState.gamepasses.includes('gp9')) { gameState.gamepasses.push('gp9'); msg = "PASS FOUND: Raibos Magnet!"; }
                else { gameState.rebirthPoints += 250; msg = "Duplicate Pass -> +250 RP"; }
                color = "#ffaa00";
            } else if (rng < 0.276) { 
                if(!gameState.gamepasses.includes('gp10')) { gameState.gamepasses.push('gp10'); msg = "PASS FOUND: Emperor of Raibos!"; }
                else { gameState.rebirthPoints += 500; msg = "Duplicate Pass -> +500 RP"; }
                color = "#ff00ff";
            } else if (rng < 0.376) { 
                gameState.invasionPerks.coreFragments++;
                msg = "Earth Core Fragment! (+1000% Idle)";
                color = "#00ffcc";
            } else if (rng < 0.766) { 
                const gain = Math.floor(gameState.rebirthPoints * 0.1);
                gameState.rebirthPoints += gain;
                msg = `Command Destroyed! (+${formatNumber(gain)} RP)`;
                color = "#ffff00";
            } else if (rng < 2.766) { 
                gameState.invasionPerks.sectors++;
                msg = "Sector Captured! (+20% Click)";
                color = "#00aaff";
            } else if (rng < 22.766) { 
                gameState.raibos += cost * 3;
                gameState.totalRaibos += cost * 3;
                msg = "Supply Raid! (3x Refund)";
                color = "#33cc33";
            } else {
                msg = "Operation Failed.";
                color = "#555";
            }
            
            resDiv.innerHTML = `<span style="color:${color}; text-shadow:0 0 10px ${color}; font-size:1.3rem;">${msg}</span>`;
            if (color !== '#555') showToast('Invasion Success', msg);
            
            recalculatePowers();
            saveGame();
            updateUI();
        }, delay);
    });
}

setInterval(saveGame, 10000); // 5초에서 10초로 간격 상향
document.addEventListener('dblclick', e => e.preventDefault(), { passive: false });

const crBtn = document.getElementById('chrono-raibos');
if (crBtn) {
    crBtn.addEventListener('mousedown', () => {
        crBtn.style.display = 'none';
        if (gameState.idlePower <= 0) {
            showToast('Time Skip Failed', 'You need Idle Production for Time Skips to work!');
            return;
        }
        const isMaster = gameState.gamepasses && gameState.gamepasses.includes('gp4');
        const seconds = isMaster ? 3600 : 300; // 1시간 or 5분
        const gain = gameState.idlePower * seconds;
        
        gameState.raibos += gain;
        gameState.totalRaibos += gain;
        gameState.timeSkipsUsed = (gameState.timeSkipsUsed || 0) + 1;
        
        const timeStr = isMaster ? "1시간" : "5분";
        showToast(`TIME SKIP!`, `황금시계를 획득했습니다! ${timeStr} 분량의 생산량 획득: +${formatNumber(gain)} 라이보스`);
        
        // Massive glow effect
        document.body.style.boxShadow = "inset 0 0 100px gold";
        setTimeout(() => { document.body.style.boxShadow = "none"; }, 500);
        updateUI();
    });
}

// 리셋 버튼은 최하단 로직에서 분리하여 안전하게 관리
if (elements.hrBtn) {
    elements.hrBtn.onmousedown = (e) => {
        e.stopPropagation();
        if (confirm("⚠️ 경고: 모든 진행 상황을 완전히 삭제하시겠습니까?")) {
            if (confirm("정말 확실합니까? 저장된 모든 데이터가 영구적으로 사라집니다.")) {
                isResetting = true; // 저장 방지 플래그 활성화
                localStorage.clear(); 
                location.reload();
            }
        }
    };
}

// Init
renderLists();
loadGame();
updateUI();

// Ranking Events
const refreshRankBtn = document.getElementById('refresh-ranking-raibos');
if (refreshRankBtn) refreshRankBtn.addEventListener('click', fetchRaibosLeaderboard);
const rankCatSelect = document.getElementById('ranking-category-raibos');
if (rankCatSelect) rankCatSelect.addEventListener('change', fetchRaibosLeaderboard);

const rankHelpBtn = document.getElementById('ranking-help-btn');
if (rankHelpBtn) {
    rankHelpBtn.addEventListener('click', () => {
        alert(`[서버 활성화 가이드]\n\n랭킹 보드를 이용하려면 서버가 켜져 있어야 합니다.\n\n방법: 다음 경로에서 'run_server.bat' 파일을 더블 클릭하세요.\n\n경로:\nc:\\Users\\dogye\\.gemini\\antigravity\\scratch\\sols-rng-web\\run_server.bat`);
    });
}

requestAnimationFrame(gameLoop);
