let gameState = {
    raibos: 0,
    totalRaibos: 0, 
    totalClicks: 0,
    clickPower: 1,
    idlePower: 0,
    upgradeLevels: {},
    rebirthPoints: 0,
    achievements: [],
    timeSkipsUsed: 0,
    invasion: {
        energy: 100,
        energyMax: 100,
        energyRegen: 1,
        currentPlanet: 0,
        regionProgress: {}, // regionId -> 0-100
        conqueredRegions: [] // list of regionIds
    },
    username: null,
    lastSaveTime: Date.now()
};

const planetsData = [
    {
        id: 'earth',
        name: 'Earth',
        color: '#00f2ff',
        regions: [
            { id: 'asia', name: 'Asia', buff: 'Click Power +50%', type: 'click', value: 0.5, cost: 20, d: "M140,20 L180,20 L190,50 L160,80 L130,60 Z" },
            { id: 'europe', name: 'Europe', buff: 'Upgrade Cost -5%', type: 'cost', value: 0.05, cost: 25, d: "M100,20 L130,20 L135,40 L110,50 L95,40 Z" },
            { id: 'na', name: 'North America', buff: 'Idle Power +50%', type: 'idle', value: 0.5, cost: 30, d: "M20,20 L70,20 L80,50 L50,60 L10,50 Z" },
            { id: 'sa', name: 'South America', buff: 'RP Gain +20%', type: 'rp', value: 0.2, cost: 35, d: "M40,65 L70,65 L75,90 L50,95 Z" },
            { id: 'africa', name: 'Africa', buff: 'Energy Regen +50%', type: 'energy', value: 0.5, cost: 40, d: "M100,55 L125,55 L130,85 L105,90 L95,75 Z" },
            { id: 'oceania', name: 'Oceania', buff: 'Global Multiplier +50%', type: 'mult', value: 0.5, cost: 50, d: "M165,70 L185,70 L190,85 L170,90 Z" },
            { id: 'antarctica', name: 'Antarctica', buff: 'Global Multiplier x1.5', type: 'mult_total', value: 1.5, cost: 80, d: "M50,90 L150,90 L160,98 L40,98 Z" }
        ]
    },
    {
        id: 'mars',
        name: 'Mars',
        color: '#ff4d4d',
        regions: [
            { id: 'valles', name: 'Valles Marineris', buff: 'Global Multiplier x2', type: 'mult_total', value: 2, cost: 120, d: "M30,40 L70,30 L120,40 L160,60 L140,80 L80,70 Z" },
            { id: 'olympus', name: 'Olympus Mons', buff: 'Click Power +200%', type: 'click', value: 2.0, cost: 180, d: "M80,20 L120,10 L130,30 L90,40 Z" },
            { id: 'utopia', name: 'Utopia Planitia', buff: 'Idle Power +200%', type: 'idle', value: 2.0, cost: 240, d: "M140,20 L180,30 L170,50 L130,40 Z" },
            { id: 'hellas', name: 'Hellas Planitia', buff: 'Rebirth Points +100%', type: 'rp', value: 1.0, cost: 300, d: "M40,60 L80,55 L90,85 L50,90 Z" },
            { id: 'mars_poles', name: 'Polar Caps', buff: 'Energy Regen x2', type: 'energy_mult', value: 2, cost: 400, d: "M20,10 L180,10 L170,15 L30,15 Z" }
        ]
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        color: '#ffcc99',
        regions: [
            { id: 'grs', name: 'Great Red Spot', buff: 'Global Multiplier x10', type: 'mult_total', value: 10, cost: 600, d: "M80,50 Q100,30 140,50 T100,70 Z" },
            { id: 'europa', name: 'Europa', buff: 'All Production x5', type: 'all_prod', value: 5, cost: 800, d: "M30,30 L60,20 L70,50 L40,60 Z" },
            { id: 'ganymede', name: 'Ganymede', buff: 'Upgrade Cost -20%', type: 'cost', value: 0.2, cost: 1000, d: "M130,20 L160,30 L150,60 L120,50 Z" },
            { id: 'io', name: 'Io', buff: 'Click Power +500%', type: 'click', value: 5.0, cost: 1200, d: "M50,70 L80,65 L85,90 L55,95 Z" }
        ]
    },
    {
        id: 'saturn',
        name: 'Saturn',
        color: '#e6e600',
        regions: [
            { id: 'rings', name: 'Celestial Rings', buff: 'Global Multiplier x50', type: 'mult_total', value: 50, cost: 2500, d: "M10,50 Q50,20 190,50 T10,50 M30,50 Q60,35 170,50 T30,50" },
            { id: 'titan', name: 'Titan', buff: 'Idle Power +1000%', type: 'idle', value: 10, cost: 3000, d: "M40,20 L80,15 L90,45 L50,50 Z" },
            { id: 'enceladus', name: 'Enceladus', buff: 'Energy Regen x3', type: 'energy_mult', value: 3, cost: 3500, d: "M120,60 L150,55 L160,85 L130,90 Z" }
        ]
    },
    {
        id: 'neptune',
        name: 'Neptune',
        color: '#4d4dff',
        regions: [
            { id: 'triton', name: 'Triton', buff: 'RP Gain x5', type: 'rp_mult', value: 5, cost: 5000, d: "M50,40 L90,30 L100,60 L60,70 Z" },
            { id: 'darkspot', name: 'Great Dark Spot', buff: 'Global Multiplier x500', type: 'mult_total', value: 500, cost: 7500, d: "M110,40 Q130,20 170,40 T130,60 Z" },
            { id: 'neptune_core', name: 'Frozen Core', buff: 'All Costs -50%', type: 'cost', value: 0.5, cost: 10000, d: "M80,70 L120,70 L120,95 L80,95 Z" }
        ]
    },
    {
        id: 'pluto',
        name: 'Pluto (Outer Rim)',
        color: '#ffffff',
        regions: [
            { id: 'charon', name: 'Charon', buff: 'Final Multiplier x1000', type: 'mult_total', value: 1000, cost: 20000, d: "M30,30 L60,30 L60,60 L30,60 Z" },
            { id: 'heart', name: 'The Heart', buff: 'Raibos Masterpiece: x10^6 Power', type: 'mult_total', value: 1000000, cost: 50000, d: "M100,40 Q120,20 140,40 L100,80 L60,40 Q80,20 100,40 Z" }
        ]
    }
];

const SAVE_KEY = 'raibosSimulatorSave';

// Upgrade Definitions
const clickUpgrades = [
    {
        "id": "c1",
        "name": "Raibos Finger",
        "desc": "+10 Raibos/click",
        "baseCost": 25,
        "costMul": 1.35,
        "value": 10
    },
    {
        "id": "c2",
        "name": "Raibos Focus",
        "desc": "+100 Raibos/click",
        "baseCost": 300,
        "costMul": 1.38,
        "value": 100
    },
    {
        "id": "c3",
        "name": "Raibos Synergy",
        "desc": "+1,000 Raibos/click",
        "baseCost": 4000,
        "costMul": 1.4,
        "value": 1000
    },
    {
        "id": "c4",
        "name": "Raibos Quantum Click",
        "desc": "+10k Raibos/click",
        "baseCost": 50000,
        "costMul": 1.42,
        "value": 10000
    },
    {
        "id": "c5",
        "name": "Raibos Auto-Tapper",
        "desc": "+100k Raibos/click",
        "baseCost": 750000,
        "costMul": 1.45,
        "value": 100000
    },
    {
        "id": "c6",
        "name": "Raibos Neural Link",
        "desc": "+1M Raibos/click",
        "baseCost": 10000000,
        "costMul": 1.48,
        "value": 1000000
    },
    {
        "id": "c7",
        "name": "Raibos Essence",
        "desc": "+8M Raibos/click",
        "baseCost": 150000000,
        "costMul": 1.5,
        "value": 8000000
    },
    {
        "id": "c8",
        "name": "Raibos Click Dimension",
        "desc": "+100M Raibos/click",
        "baseCost": 2000000000,
        "costMul": 1.52,
        "value": 100000000
    },
    {
        "id": "c9",
        "name": "Raibos Multiverse Tap",
        "desc": "+1B Raibos/click",
        "baseCost": 100000000000,
        "costMul": 1.55,
        "value": 1000000000
    },
    {
        "id": "c10",
        "name": "Raibos Timeline Collapse",
        "desc": "+20B Raibos/click",
        "baseCost": 10000000000000,
        "costMul": 1.58,
        "value": 20000000000
    },
    {
        "id": "c11",
        "name": "Raibos Alpha Shift",
        "desc": "+500B Raibos/click",
        "baseCost": 1000000000000000,
        "costMul": 1.6,
        "value": 500000000000
    },
    {
        "id": "c12",
        "name": "Raibos Omega End",
        "desc": "+25T Raibos/click",
        "baseCost": 1e+17,
        "costMul": 1.62,
        "value": 25000000000000
    },
    {
        "id": "c13",
        "name": "Raibos Divine Pulse",
        "desc": "+25.0aa Raibos/click",
        "baseCost": 1e+21,
        "costMul": 1.54,
        "value": 2.5e+16
    },
    {
        "id": "c14",
        "name": "Raibos Absolute Pulse",
        "desc": "+1.3ab Raibos/click",
        "baseCost": 1e+23,
        "costMul": 1.53,
        "value": 1.25e+18
    },
    {
        "id": "c15",
        "name": "Raibos Eternal Pulse",
        "desc": "+63.0ab Raibos/click",
        "baseCost": 1e+25,
        "costMul": 1.52,
        "value": 6.25e+19
    },
    {
        "id": "c16",
        "name": "Raibos Primal Pulse",
        "desc": "+3.1ac Raibos/click",
        "baseCost": 1e+27,
        "costMul": 1.51,
        "value": 3.125e+21
    },
    {
        "id": "c17",
        "name": "Raibos Ancient Pulse",
        "desc": "+156ac Raibos/click",
        "baseCost": 1e+29,
        "costMul": 1.5,
        "value": 1.5625e+23
    },
    {
        "id": "c18",
        "name": "Raibos Transcendent Pulse",
        "desc": "+7.8ad Raibos/click",
        "baseCost": 1e+31,
        "costMul": 1.49,
        "value": 7.8125e+24
    },
    {
        "id": "c19",
        "name": "Raibos Final Pulse",
        "desc": "+390ad Raibos/click",
        "baseCost": 1e+33,
        "costMul": 1.48,
        "value": 3.90625e+26
    },
    {
        "id": "c20",
        "name": "Raibos Nebula Pulse",
        "desc": "+19.5ae Raibos/click",
        "baseCost": 1e+35,
        "costMul": 1.47,
        "value": 1.953125e+28
    }
];,
    {
        "id": "c21",
        "name": "Raibos Star Pulse 21",
        "desc": "+9.8e+29 Raibos/click",
        "baseCost": 1e+37,
        "costMul": 1.482,
        "value": 9.765625e+29
    },
    {
        "id": "c22",
        "name": "Raibos Galaxy Pulse 22",
        "desc": "+4.9e+31 Raibos/click",
        "baseCost": 1e+39,
        "costMul": 1.474,
        "value": 4.8828125e+31
    },
    {
        "id": "c23",
        "name": "Raibos Universe Pulse 23",
        "desc": "+2.4e+33 Raibos/click",
        "baseCost": 1e+41,
        "costMul": 1.466,
        "value": 2.44140625e+33
    },
    {
        "id": "c24",
        "name": "Raibos Multiverse Pulse 24",
        "desc": "+1.2e+35 Raibos/click",
        "baseCost": 1e+43,
        "costMul": 1.458,
        "value": 1.220703125e+35
    },
    {
        "id": "c25",
        "name": "Raibos Dimension Pulse 25",
        "desc": "+6.1e+36 Raibos/click",
        "baseCost": 1.0000000000000001e+45,
        "costMul": 1.45,
        "value": 6.103515625e+36
    },
    {
        "id": "c26",
        "name": "Raibos Chrono Pulse 26",
        "desc": "+3.1e+38 Raibos/click",
        "baseCost": 1e+47,
        "costMul": 1.442,
        "value": 3.0517578125e+38
    },
    {
        "id": "c27",
        "name": "Raibos Void Pulse 27",
        "desc": "+1.5e+40 Raibos/click",
        "baseCost": 1.0000000000000001e+49,
        "costMul": 1.434,
        "value": 1.52587890625e+40
    },
    {
        "id": "c28",
        "name": "Raibos Infinity Pulse 28",
        "desc": "+7.6e+41 Raibos/click",
        "baseCost": 1e+51,
        "costMul": 1.426,
        "value": 7.62939453125e+41
    },
    {
        "id": "c29",
        "name": "Raibos Singularity Pulse 29",
        "desc": "+3.8e+43 Raibos/click",
        "baseCost": 1e+53,
        "costMul": 1.418,
        "value": 3.814697265625e+43
    },
    {
        "id": "c30",
        "name": "Raibos Cosmic Pulse 30",
        "desc": "+7.6e+45 Raibos/click",
        "baseCost": 5e+55,
        "costMul": 1.41,
        "value": 7.62939453125e+45
    },
    {
        "id": "c31",
        "name": "Raibos Astral Pulse 31",
        "desc": "+1.5e+48 Raibos/click",
        "baseCost": 2.5000000000000002e+58,
        "costMul": 1.402,
        "value": 1.52587890625e+48
    },
    {
        "id": "c32",
        "name": "Raibos Ethereal Pulse 32",
        "desc": "+3.1e+50 Raibos/click",
        "baseCost": 1.25e+61,
        "costMul": 1.394,
        "value": 3.0517578125e+50
    },
    {
        "id": "c33",
        "name": "Raibos Divine Pulse 33",
        "desc": "+6.1e+52 Raibos/click",
        "baseCost": 6.25e+63,
        "costMul": 1.386,
        "value": 6.103515625e+52
    },
    {
        "id": "c34",
        "name": "Raibos Absolute Pulse 34",
        "desc": "+1.2e+55 Raibos/click",
        "baseCost": 3.125e+66,
        "costMul": 1.378,
        "value": 1.220703125e+55
    },
    {
        "id": "c35",
        "name": "Raibos Eternal Pulse 35",
        "desc": "+2.4e+57 Raibos/click",
        "baseCost": 1.5624999999999999e+69,
        "costMul": 1.37,
        "value": 2.44140625e+57
    },
    {
        "id": "c36",
        "name": "Raibos Primal Pulse 36",
        "desc": "+4.9e+59 Raibos/click",
        "baseCost": 7.8125e+71,
        "costMul": 1.362,
        "value": 4.8828125e+59
    },
    {
        "id": "c37",
        "name": "Raibos Ancient Pulse 37",
        "desc": "+9.8e+61 Raibos/click",
        "baseCost": 3.90625e+74,
        "costMul": 1.354,
        "value": 9.765625e+61
    },
    {
        "id": "c38",
        "name": "Raibos Transcendent Pulse 38",
        "desc": "+2.0e+64 Raibos/click",
        "baseCost": 1.953125e+77,
        "costMul": 1.346,
        "value": 1.953125e+64
    },
    {
        "id": "c39",
        "name": "Raibos Final Pulse 39",
        "desc": "+3.9e+66 Raibos/click",
        "baseCost": 9.765625e+79,
        "costMul": 1.338,
        "value": 3.90625e+66
    },
    {
        "id": "c40",
        "name": "Raibos Nebula Pulse 40",
        "desc": "+7.8e+68 Raibos/click",
        "baseCost": 4.8828125e+82,
        "costMul": 1.33,
        "value": 7.8125e+68
    },
    {
        "id": "c41",
        "name": "Raibos Star Pulse 41",
        "desc": "+1.6e+71 Raibos/click",
        "baseCost": 2.44140625e+85,
        "costMul": 1.322,
        "value": 1.5625e+71
    },
    {
        "id": "c42",
        "name": "Raibos Galaxy Pulse 42",
        "desc": "+3.1e+73 Raibos/click",
        "baseCost": 1.220703125e+88,
        "costMul": 1.314,
        "value": 3.125e+73
    },
    {
        "id": "c43",
        "name": "Raibos Universe Pulse 43",
        "desc": "+6.2e+75 Raibos/click",
        "baseCost": 6.103515625e+90,
        "costMul": 1.306,
        "value": 6.25e+75
    },
    {
        "id": "c44",
        "name": "Raibos Multiverse Pulse 44",
        "desc": "+1.2e+78 Raibos/click",
        "baseCost": 3.0517578125e+93,
        "costMul": 1.298,
        "value": 1.25e+78
    },
    {
        "id": "c45",
        "name": "Raibos Dimension Pulse 45",
        "desc": "+6.2e+80 Raibos/click",
        "baseCost": 3.0517578125e+96,
        "costMul": 1.29,
        "value": 6.25e+80
    },
    {
        "id": "c46",
        "name": "Raibos Chrono Pulse 46",
        "desc": "+3.1e+83 Raibos/click",
        "baseCost": 3.0517578125e+99,
        "costMul": 1.282,
        "value": 3.125e+83
    },
    {
        "id": "c47",
        "name": "Raibos Void Pulse 47",
        "desc": "+1.6e+86 Raibos/click",
        "baseCost": 3.0517578125e+102,
        "costMul": 1.274,
        "value": 1.5625e+86
    },
    {
        "id": "c48",
        "name": "Raibos Infinity Pulse 48",
        "desc": "+7.8e+88 Raibos/click",
        "baseCost": 3.0517578125e+105,
        "costMul": 1.266,
        "value": 7.8125e+88
    },
    {
        "id": "c49",
        "name": "Raibos Singularity Pulse 49",
        "desc": "+3.9e+91 Raibos/click",
        "baseCost": 3.0517578125e+108,
        "costMul": 1.258,
        "value": 3.90625e+91
    },
    {
        "id": "c50",
        "name": "Raibos Cosmic Pulse 50",
        "desc": "+2.0e+94 Raibos/click",
        "baseCost": 3.0517578125e+111,
        "costMul": 1.25,
        "value": 1.953125e+94
    },
    {
        "id": "c51",
        "name": "Raibos Astral Pulse 51",
        "desc": "+9.8e+96 Raibos/click",
        "baseCost": 3.0517578125e+114,
        "costMul": 1.242,
        "value": 9.765625e+96
    },
    {
        "id": "c52",
        "name": "Raibos Ethereal Pulse 52",
        "desc": "+4.9e+99 Raibos/click",
        "baseCost": 3.0517578125e+117,
        "costMul": 1.234,
        "value": 4.8828125e+99
    },
    {
        "id": "c53",
        "name": "Raibos Divine Pulse 53",
        "desc": "+2.4e+102 Raibos/click",
        "baseCost": 3.0517578125e+120,
        "costMul": 1.226,
        "value": 2.44140625e+102
    },
    {
        "id": "c54",
        "name": "Raibos Absolute Pulse 54",
        "desc": "+1.2e+105 Raibos/click",
        "baseCost": 3.0517578125e+123,
        "costMul": 1.218,
        "value": 1.220703125e+105
    },
    {
        "id": "c55",
        "name": "Raibos Eternal Pulse 55",
        "desc": "+6.1e+107 Raibos/click",
        "baseCost": 3.0517578125e+126,
        "costMul": 1.21,
        "value": 6.103515625e+107
    },
    {
        "id": "c56",
        "name": "Raibos Primal Pulse 56",
        "desc": "+3.1e+110 Raibos/click",
        "baseCost": 3.0517578125e+129,
        "costMul": 1.202,
        "value": 3.0517578125e+110
    },
    {
        "id": "c57",
        "name": "Raibos Ancient Pulse 57",
        "desc": "+1.5e+113 Raibos/click",
        "baseCost": 3.0517578125e+132,
        "costMul": 1.194,
        "value": 1.52587890625e+113
    },
    {
        "id": "c58",
        "name": "Raibos Transcendent Pulse 58",
        "desc": "+7.6e+115 Raibos/click",
        "baseCost": 3.0517578125e+135,
        "costMul": 1.186,
        "value": 7.62939453125e+115
    },
    {
        "id": "c59",
        "name": "Raibos Final Pulse 59",
        "desc": "+3.8e+118 Raibos/click",
        "baseCost": 3.0517578125e+138,
        "costMul": 1.178,
        "value": 3.814697265625e+118
    },
    {
        "id": "c60",
        "name": "Raibos Nebula Pulse 60",
        "desc": "+1.9e+121 Raibos/click",
        "baseCost": 3.0517578125e+141,
        "costMul": 1.17,
        "value": 1.9073486328125e+121
    },
    {
        "id": "c61",
        "name": "Raibos Star Pulse 61",
        "desc": "+9.5e+123 Raibos/click",
        "baseCost": 3.0517578125e+144,
        "costMul": 1.162,
        "value": 9.5367431640625e+123
    },
    {
        "id": "c62",
        "name": "Raibos Galaxy Pulse 62",
        "desc": "+4.8e+126 Raibos/click",
        "baseCost": 3.0517578125e+147,
        "costMul": 1.154,
        "value": 4.76837158203125e+126
    },
    {
        "id": "c63",
        "name": "Raibos Universe Pulse 63",
        "desc": "+2.4e+129 Raibos/click",
        "baseCost": 3.0517578125e+150,
        "costMul": 1.15,
        "value": 2.384185791015625e+129
    },
    {
        "id": "c64",
        "name": "Raibos Multiverse Pulse 64",
        "desc": "+1.2e+132 Raibos/click",
        "baseCost": 3.0517578125e+153,
        "costMul": 1.15,
        "value": 1.1920928955078125e+132
    },
    {
        "id": "c65",
        "name": "Raibos Dimension Pulse 65",
        "desc": "+6.0e+134 Raibos/click",
        "baseCost": 3.0517578125e+156,
        "costMul": 1.15,
        "value": 5.960464477539062e+134
    }
];

const idleUpgrades = [
    {
        "id": "i1",
        "name": "Raibos Worker",
        "desc": "+1 Raibos/sec",
        "baseCost": 15,
        "costMul": 1.2,
        "value": 1
    },
    {
        "id": "i2",
        "name": "Raibos Generator",
        "desc": "+15 Raibos/sec",
        "baseCost": 150,
        "costMul": 1.22,
        "value": 15
    },
    {
        "id": "i3",
        "name": "Raibos Farm",
        "desc": "+80 Raibos/sec",
        "baseCost": 1200,
        "costMul": 1.25,
        "value": 80
    },
    {
        "id": "i4",
        "name": "Raibos Factory",
        "desc": "+400 Raibos/sec",
        "baseCost": 8000,
        "costMul": 1.25,
        "value": 400
    },
    {
        "id": "i5",
        "name": "Raibos Mine",
        "desc": "+2.5k Raibos/sec",
        "baseCost": 50000,
        "costMul": 1.28,
        "value": 2500
    },
    {
        "id": "i6",
        "name": "Raibos Chrono Reactor 6",
        "desc": "+6.0e+5 Raibos/sec",
        "baseCost": 32000000,
        "costMul": 1.37,
        "value": 600000
    },
    {
        "id": "i7",
        "name": "Raibos Void Reactor 7",
        "desc": "+2.4e+7 Raibos/sec",
        "baseCost": 2560000000,
        "costMul": 1.365,
        "value": 24000000
    },
    {
        "id": "i8",
        "name": "Raibos Infinity Reactor 8",
        "desc": "+9.6e+8 Raibos/sec",
        "baseCost": 204800000000,
        "costMul": 1.36,
        "value": 960000000
    },
    {
        "id": "i9",
        "name": "Raibos Singularity Reactor 9",
        "desc": "+3.8e+10 Raibos/sec",
        "baseCost": 16384000000000,
        "costMul": 1.355,
        "value": 38400000000
    },
    {
        "id": "i10",
        "name": "Raibos Cosmic Reactor 10",
        "desc": "+1.5e+12 Raibos/sec",
        "baseCost": 1310720000000000,
        "costMul": 1.35,
        "value": 1536000000000
    },
    {
        "id": "i11",
        "name": "Raibos Astral Reactor 11",
        "desc": "+6.1e+13 Raibos/sec",
        "baseCost": 104857600000000000,
        "costMul": 1.345,
        "value": 61440000000000
    },
    {
        "id": "i12",
        "name": "Raibos Ethereal Reactor 12",
        "desc": "+2.5e+15 Raibos/sec",
        "baseCost": 8388608000000000000,
        "costMul": 1.34,
        "value": 2457600000000000
    },
    {
        "id": "i13",
        "name": "Raibos Divine Reactor 13",
        "desc": "+9.8e+16 Raibos/sec",
        "baseCost": 671088640000000000000,
        "costMul": 1.335,
        "value": 98304000000000000
    },
    {
        "id": "i14",
        "name": "Raibos Absolute Reactor 14",
        "desc": "+3.9e+18 Raibos/sec",
        "baseCost": 5.36870912e+22,
        "costMul": 1.33,
        "value": 3932160000000000000
    },
    {
        "id": "i15",
        "name": "Raibos Eternal Reactor 15",
        "desc": "+1.6e+20 Raibos/sec",
        "baseCost": 4.294967296e+24,
        "costMul": 1.325,
        "value": 157286400000000000000
    },
    {
        "id": "i16",
        "name": "Raibos Primal Reactor 16",
        "desc": "+6.3e+21 Raibos/sec",
        "baseCost": 3.4359738368e+26,
        "costMul": 1.32,
        "value": 6.291456e+21
    },
    {
        "id": "i17",
        "name": "Raibos Ancient Reactor 17",
        "desc": "+2.5e+23 Raibos/sec",
        "baseCost": 2.74877906944e+28,
        "costMul": 1.315,
        "value": 2.5165824e+23
    },
    {
        "id": "i18",
        "name": "Raibos Transcendent Reactor 18",
        "desc": "+1.0e+25 Raibos/sec",
        "baseCost": 2.199023255552e+30,
        "costMul": 1.31,
        "value": 1.00663296e+25
    },
    {
        "id": "i19",
        "name": "Raibos Final Reactor 19",
        "desc": "+4.0e+26 Raibos/sec",
        "baseCost": 1.7592186044416e+32,
        "costMul": 1.305,
        "value": 4.02653184e+26
    },
    {
        "id": "i20",
        "name": "Raibos Nebula Reactor 20",
        "desc": "+4.0e+28 Raibos/sec",
        "baseCost": 3.5184372088832e+34,
        "costMul": 1.3,
        "value": 4.02653184e+28
    },
    {
        "id": "i21",
        "name": "Raibos Star Reactor 21",
        "desc": "+4.0e+30 Raibos/sec",
        "baseCost": 7.0368744177664e+36,
        "costMul": 1.295,
        "value": 4.02653184e+30
    },
    {
        "id": "i22",
        "name": "Raibos Galaxy Reactor 22",
        "desc": "+4.0e+32 Raibos/sec",
        "baseCost": 1.40737488355328e+39,
        "costMul": 1.29,
        "value": 4.02653184e+32
    },
    {
        "id": "i23",
        "name": "Raibos Universe Reactor 23",
        "desc": "+4.0e+34 Raibos/sec",
        "baseCost": 2.81474976710656e+41,
        "costMul": 1.285,
        "value": 4.02653184e+34
    },
    {
        "id": "i24",
        "name": "Raibos Multiverse Reactor 24",
        "desc": "+4.0e+36 Raibos/sec",
        "baseCost": 5.62949953421312e+43,
        "costMul": 1.28,
        "value": 4.02653184e+36
    },
    {
        "id": "i25",
        "name": "Raibos Dimension Reactor 25",
        "desc": "+4.0e+38 Raibos/sec",
        "baseCost": 1.125899906842624e+46,
        "costMul": 1.275,
        "value": 4.02653184e+38
    },
    {
        "id": "i26",
        "name": "Raibos Chrono Reactor 26",
        "desc": "+4.0e+40 Raibos/sec",
        "baseCost": 2.251799813685248e+48,
        "costMul": 1.27,
        "value": 4.02653184e+40
    },
    {
        "id": "i27",
        "name": "Raibos Void Reactor 27",
        "desc": "+4.0e+42 Raibos/sec",
        "baseCost": 4.503599627370496e+50,
        "costMul": 1.265,
        "value": 4.02653184e+42
    },
    {
        "id": "i28",
        "name": "Raibos Infinity Reactor 28",
        "desc": "+4.0e+44 Raibos/sec",
        "baseCost": 9.007199254740992e+52,
        "costMul": 1.26,
        "value": 4.02653184e+44
    },
    {
        "id": "i29",
        "name": "Raibos Singularity Reactor 29",
        "desc": "+4.0e+46 Raibos/sec",
        "baseCost": 1.8014398509481983e+55,
        "costMul": 1.255,
        "value": 4.02653184e+46
    },
    {
        "id": "i30",
        "name": "Raibos Cosmic Reactor 30",
        "desc": "+4.0e+48 Raibos/sec",
        "baseCost": 3.602879701896397e+57,
        "costMul": 1.25,
        "value": 4.02653184e+48
    },
    {
        "id": "i31",
        "name": "Raibos Astral Reactor 31",
        "desc": "+4.0e+50 Raibos/sec",
        "baseCost": 7.205759403792794e+59,
        "costMul": 1.245,
        "value": 4.02653184e+50
    },
    {
        "id": "i32",
        "name": "Raibos Ethereal Reactor 32",
        "desc": "+4.0e+52 Raibos/sec",
        "baseCost": 1.4411518807585588e+62,
        "costMul": 1.24,
        "value": 4.02653184e+52
    },
    {
        "id": "i33",
        "name": "Raibos Divine Reactor 33",
        "desc": "+4.0e+54 Raibos/sec",
        "baseCost": 2.8823037615171176e+64,
        "costMul": 1.235,
        "value": 4.02653184e+54
    },
    {
        "id": "i34",
        "name": "Raibos Absolute Reactor 34",
        "desc": "+4.0e+56 Raibos/sec",
        "baseCost": 5.764607523034235e+66,
        "costMul": 1.23,
        "value": 4.02653184e+56
    },
    {
        "id": "i35",
        "name": "Raibos Eternal Reactor 35",
        "desc": "+4.0e+58 Raibos/sec",
        "baseCost": 1.152921504606847e+69,
        "costMul": 1.225,
        "value": 4.02653184e+58
    },
    {
        "id": "i36",
        "name": "Raibos Primal Reactor 36",
        "desc": "+4.0e+60 Raibos/sec",
        "baseCost": 2.305843009213694e+71,
        "costMul": 1.22,
        "value": 4.02653184e+60
    },
    {
        "id": "i37",
        "name": "Raibos Ancient Reactor 37",
        "desc": "+4.0e+62 Raibos/sec",
        "baseCost": 4.611686018427388e+73,
        "costMul": 1.215,
        "value": 4.02653184e+62
    },
    {
        "id": "i38",
        "name": "Raibos Transcendent Reactor 38",
        "desc": "+4.0e+64 Raibos/sec",
        "baseCost": 9.223372036854776e+75,
        "costMul": 1.21,
        "value": 4.02653184e+64
    },
    {
        "id": "i39",
        "name": "Raibos Final Reactor 39",
        "desc": "+4.0e+66 Raibos/sec",
        "baseCost": 1.8446744073709553e+78,
        "costMul": 1.205,
        "value": 4.02653184e+66
    },
    {
        "id": "i40",
        "name": "Raibos Nebula Reactor 40",
        "desc": "+1.6e+69 Raibos/sec",
        "baseCost": 1.4757395258967643e+81,
        "costMul": 1.2,
        "value": 1.610612736e+69
    },
    {
        "id": "i41",
        "name": "Raibos Star Reactor 41",
        "desc": "+6.4e+71 Raibos/sec",
        "baseCost": 1.1805916207174114e+84,
        "costMul": 1.195,
        "value": 6.442450944e+71
    },
    {
        "id": "i42",
        "name": "Raibos Galaxy Reactor 42",
        "desc": "+2.6e+74 Raibos/sec",
        "baseCost": 9.444732965739291e+86,
        "costMul": 1.19,
        "value": 2.5769803776e+74
    },
    {
        "id": "i43",
        "name": "Raibos Universe Reactor 43",
        "desc": "+1.0e+77 Raibos/sec",
        "baseCost": 7.555786372591433e+89,
        "costMul": 1.185,
        "value": 1.03079215104e+77
    },
    {
        "id": "i44",
        "name": "Raibos Multiverse Reactor 44",
        "desc": "+4.1e+79 Raibos/sec",
        "baseCost": 6.044629098073146e+92,
        "costMul": 1.18,
        "value": 4.12316860416e+79
    },
    {
        "id": "i45",
        "name": "Raibos Dimension Reactor 45",
        "desc": "+1.6e+82 Raibos/sec",
        "baseCost": 4.835703278458517e+95,
        "costMul": 1.175,
        "value": 1.649267441664e+82
    },
    {
        "id": "i46",
        "name": "Raibos Chrono Reactor 46",
        "desc": "+6.6e+84 Raibos/sec",
        "baseCost": 3.868562622766813e+98,
        "costMul": 1.17,
        "value": 6.597069766656e+84
    },
    {
        "id": "i47",
        "name": "Raibos Void Reactor 47",
        "desc": "+2.6e+87 Raibos/sec",
        "baseCost": 3.0948500982134505e+101,
        "costMul": 1.165,
        "value": 2.6388279066624e+87
    },
    {
        "id": "i48",
        "name": "Raibos Infinity Reactor 48",
        "desc": "+1.1e+90 Raibos/sec",
        "baseCost": 2.4758800785707605e+104,
        "costMul": 1.16,
        "value": 1.0555311626649602e+90
    },
    {
        "id": "i49",
        "name": "Raibos Singularity Reactor 49",
        "desc": "+4.2e+92 Raibos/sec",
        "baseCost": 1.9807040628566084e+107,
        "costMul": 1.155,
        "value": 4.222124650659841e+92
    },
    {
        "id": "i50",
        "name": "Raibos Cosmic Reactor 50",
        "desc": "+1.7e+95 Raibos/sec",
        "baseCost": 1.5845632502852866e+110,
        "costMul": 1.15,
        "value": 1.6888498602639362e+95
    },
    {
        "id": "i51",
        "name": "Raibos Astral Reactor 51",
        "desc": "+6.8e+97 Raibos/sec",
        "baseCost": 1.2676506002282293e+113,
        "costMul": 1.15,
        "value": 6.755399441055745e+97
    },
    {
        "id": "i52",
        "name": "Raibos Ethereal Reactor 52",
        "desc": "+2.7e+100 Raibos/sec",
        "baseCost": 1.0141204801825834e+116,
        "costMul": 1.15,
        "value": 2.702159776422298e+100
    },
    {
        "id": "i53",
        "name": "Raibos Divine Reactor 53",
        "desc": "+1.1e+103 Raibos/sec",
        "baseCost": 8.112963841460666e+118,
        "costMul": 1.15,
        "value": 1.0808639105689192e+103
    },
    {
        "id": "i54",
        "name": "Raibos Absolute Reactor 54",
        "desc": "+4.3e+105 Raibos/sec",
        "baseCost": 6.490371073168533e+121,
        "costMul": 1.15,
        "value": 4.323455642275677e+105
    },
    {
        "id": "i55",
        "name": "Raibos Eternal Reactor 55",
        "desc": "+1.7e+108 Raibos/sec",
        "baseCost": 5.192296858534826e+124,
        "costMul": 1.15,
        "value": 1.7293822569102706e+108
    },
    {
        "id": "i56",
        "name": "Raibos Primal Reactor 56",
        "desc": "+6.9e+110 Raibos/sec",
        "baseCost": 4.153837486827861e+127,
        "costMul": 1.15,
        "value": 6.917529027641082e+110
    },
    {
        "id": "i57",
        "name": "Raibos Ancient Reactor 57",
        "desc": "+2.8e+113 Raibos/sec",
        "baseCost": 3.323069989462289e+130,
        "costMul": 1.15,
        "value": 2.767011611056433e+113
    },
    {
        "id": "i58",
        "name": "Raibos Transcendent Reactor 58",
        "desc": "+1.1e+116 Raibos/sec",
        "baseCost": 2.658455991569831e+133,
        "costMul": 1.15,
        "value": 1.1068046444225731e+116
    },
    {
        "id": "i59",
        "name": "Raibos Final Reactor 59",
        "desc": "+4.4e+118 Raibos/sec",
        "baseCost": 2.1267647932558648e+136,
        "costMul": 1.15,
        "value": 4.427218577690293e+118
    },
    {
        "id": "i60",
        "name": "Raibos Nebula Reactor 60",
        "desc": "+1.8e+121 Raibos/sec",
        "baseCost": 1.7014118346046917e+139,
        "costMul": 1.15,
        "value": 1.770887431076117e+121
    },
    {
        "id": "i61",
        "name": "Raibos Star Reactor 61",
        "desc": "+7.1e+123 Raibos/sec",
        "baseCost": 1.3611294676837533e+142,
        "costMul": 1.15,
        "value": 7.083549724304469e+123
    },
    {
        "id": "i62",
        "name": "Raibos Galaxy Reactor 62",
        "desc": "+2.8e+126 Raibos/sec",
        "baseCost": 1.0889035741470026e+145,
        "costMul": 1.15,
        "value": 2.8334198897217874e+126
    },
    {
        "id": "i63",
        "name": "Raibos Universe Reactor 63",
        "desc": "+1.1e+129 Raibos/sec",
        "baseCost": 8.71122859317602e+147,
        "costMul": 1.15,
        "value": 1.133367955888715e+129
    },
    {
        "id": "i64",
        "name": "Raibos Multiverse Reactor 64",
        "desc": "+4.5e+131 Raibos/sec",
        "baseCost": 6.968982874540817e+150,
        "costMul": 1.15,
        "value": 4.53347182355486e+131
    },
    {
        "id": "i65",
        "name": "Raibos Dimension Reactor 65",
        "desc": "+1.8e+134 Raibos/sec",
        "baseCost": 5.575186299632653e+153,
        "costMul": 1.15,
        "value": 1.813388729421944e+134
    },
    {
        "id": "i66",
        "name": "Raibos Chrono Reactor 66",
        "desc": "+7.3e+136 Raibos/sec",
        "baseCost": 4.4601490397061224e+156,
        "costMul": 1.15,
        "value": 7.253554917687776e+136
    },
    {
        "id": "i67",
        "name": "Raibos Void Reactor 67",
        "desc": "+2.9e+139 Raibos/sec",
        "baseCost": 3.568119231764898e+159,
        "costMul": 1.15,
        "value": 2.90142196707511e+139
    },
    {
        "id": "i68",
        "name": "Raibos Infinity Reactor 68",
        "desc": "+1.2e+142 Raibos/sec",
        "baseCost": 2.8544953854119187e+162,
        "costMul": 1.15,
        "value": 1.160568786830044e+142
    },
    {
        "id": "i69",
        "name": "Raibos Singularity Reactor 69",
        "desc": "+4.6e+144 Raibos/sec",
        "baseCost": 2.283596308329535e+165,
        "costMul": 1.15,
        "value": 4.642275147320176e+144
    },
    {
        "id": "i70",
        "name": "Raibos Cosmic Reactor 70",
        "desc": "+1.9e+147 Raibos/sec",
        "baseCost": 1.8268770466636279e+168,
        "costMul": 1.15,
        "value": 1.8569100589280706e+147
    }
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
    let scaling = upg.costMul * 1.15;
    
    // Global Cost Reduction from Regions
    let costReduction = 0;
    gameState.invasion.conqueredRegions.forEach(regionId => {
        const region = getAllRegions().find(r => r.id === regionId);
        if (region && region.type === 'cost') costReduction += region.value;
    });
    
    scaling = Math.max(1.05, scaling - costReduction);
    
    return Math.floor(upg.baseCost * Math.pow(scaling, level));
}

function getAllRegions() {
    return planetsData.flatMap(p => p.regions);
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
    mult += gameState.rebirthPoints * 0.05;
    
    gameState.achievements.forEach(achId => {
        const ach = achievementsData.find(a => a.id === achId);
        if (ach) mult += ach.bonus;
    });

    // Regional Multipliers
    const allConquered = gameState.invasion.conqueredRegions;
    const allRegions = getAllRegions();

    allConquered.forEach(regionId => {
        const region = allRegions.find(r => r.id === regionId);
        if (region) {
            if (region.type === 'mult') mult += region.value;
            if (region.type === 'mult_total') mult *= region.value;
        }
    });

    return mult;
}

function recalculatePowers() {
    let cp = 1;
    let ip = 0;
    
    clickUpgrades.forEach(u => { cp += u.value * (gameState.upgradeLevels[u.id] || 0); });
    idleUpgrades.forEach(u => { ip += u.value * (gameState.upgradeLevels[u.id] || 0); });
    
    const allConquered = gameState.invasion.conqueredRegions;
    const allRegions = getAllRegions();

    allConquered.forEach(regionId => {
        const region = allRegions.find(r => r.id === regionId);
        if (region) {
            if (region.type === 'click') cp *= (1 + region.value);
            if (region.type === 'idle') ip *= (1 + region.value);
            if (region.type === 'all_prod') { cp *= region.value; ip *= region.value; }
        }
    });

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
    updateInvasionUI();
}

function createUpgradeElement(upg, isClick) {
    const div = document.createElement('div');
    div.id = `upg-${upg.id}`;
    div.className = 'upgrade-item';
    div.innerHTML = `
        <div class="upgrade-info">
            <span class="upgrade-name">${upg.name}</span>
            <span class="upgrade-desc">${upg.desc}</span>
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
    let pointsToEarn = getPointsToEarn(gameState.totalRaibos);
    document.getElementById('current-rp').innerText = formatNumber(gameState.rebirthPoints);
    document.getElementById('earn-rp').innerText = "+" + formatNumber(pointsToEarn);
    
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
    if (earned <= 0) return;
    
    if (confirm(`Do you want to rebirth? All progress will be reset and you will receive ${formatNumber(earned)} RP.`)) {
        gameState.rebirthPoints += earned;
        
        // Reset everything else
        gameState.raibos = 0;
        gameState.totalRaibos = 0;
        gameState.upgradeLevels = {};
        
        syncRaibosRankings(); 
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
    
    // Invasion Energy Regen
    let regen = gameState.invasion.energyRegen || 1;
    gameState.invasion.conqueredRegions.forEach(rid => {
        const r = getAllRegions().find(x => x.id === rid);
        if (r && r.type === 'energy') regen *= (1 + r.value);
    });
    
    gameState.invasion.energy = Math.min(gameState.invasion.energyMax || 100, (gameState.invasion.energy || 0) + regen * dt);

    if (gameState.idlePower > 0) {
        const gain = gameState.idlePower * dt;
        gameState.raibos += gain;
        gameState.totalRaibos += gain;
        
        if (Math.random() < 0.05) checkAchievements();
        updateUI();
    } else {
        updateUI();
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
        const parsed = JSON.parse(saved);
        
        // Migration to Invasion 2.0
        if (!parsed.invasion) {
            parsed.invasion = {
                energy: 100,
                energyMax: 100,
                energyRegen: 1,
                currentPlanet: 0,
                regionProgress: {},
                conqueredRegions: []
            };
        }
        
        gameState = { ...gameState, ...parsed };
        if (!gameState.upgradeLevels) gameState.upgradeLevels = {};
        if (!gameState.achievements) gameState.achievements = [];
        
        // Remove gamepasses if they exist in save
        delete gameState.gamepasses;
        delete gameState.invasionPerks;
        delete gameState.invasionCount;
        
        // Calculate Offline Progress
        const now = Date.now();
        const offlineSecs = (now - gameState.lastSaveTime) / 1000;
        
        recalculatePowers();
        
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
                    if (container) container.innerHTML = '<div style="text-align:center; padding:20px; color:#ffcc00;">You must set a nickname to use the rankings.</div>';
                    return;
                }
            }
            fetchRaibosLeaderboard();
        }
    });
});

const API_BASE = "/api";

function setRaibosUsername() {
    const name = prompt("Please enter a nickname for the leaderboard (max 12 characters):");
    if (name && name.trim().length > 0) {
        gameState.username = name.trim().substring(0, 12);
        saveGame();
        syncRaibosRankings();
        return true;
    }
    return false;
}

// --- Security Layers ---
const _k = [114,65,105,66,111,83,95,115,69,99,82,101,84,95,107,69,121,95,50,48,50,54,95,33,64,35];
const _gK = () => String.fromCharCode(..._k);

async function _h256(msg, key) {
    try {
        const enc = new TextEncoder();
        const keyData = enc.encode(key);
        const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
        const signature = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(msg));
        return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch(e) { return ""; }
}

function _xE(str, key) {
    const utf8Bytes = new TextEncoder().encode(str);
    const keyBytes = new TextEncoder().encode(key);
    const res = new Uint8Array(utf8Bytes.length);
    for(let i=0; i<utf8Bytes.length; i++) {
        res[i] = utf8Bytes[i] ^ keyBytes[i % keyBytes.length];
    }
    let binary = '';
    for(let i=0; i<res.byteLength; i++) {
        binary += String.fromCharCode(res[i]);
    }
    return btoa(binary);
}

async function syncRaibosRankings() {
    if (!gameState.username) return;

    try {
        const statsObj = {
            raibos_raibos: { value: gameState.raibos || 0 },
            raibos_rp: { value: gameState.rebirthPoints || 0 },
            raibos_clicks: { value: gameState.totalClicks || 0 },
            raibos_achievements: { value: (gameState.achievements || []).length },
            raibos_invasions: { value: gameState.invasionCount || 0 },
            raibos_admin_tokens: { value: 0 } // Honeypot
        };

        const rawJson = JSON.stringify({
            username: gameState.username,
            stats: statsObj
        });

        const kStr = _gK();
        const payloadStr = _xE(rawJson, kStr);
        const ts = Date.now();
        const dataToSign = ts + payloadStr;
        
        const sig = await _h256(dataToSign, kStr);
        if (!sig) return; // Crypto not supported in this browser context (e.g. non-HTTPS sometimes)

        await fetch(`${API_BASE}/rank/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                payload: payloadStr,
                signature: sig,
                timestamp: ts
            })
        });
    } catch (e) {
        console.warn("Ranking server not reachable or crypto error.");
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


// Invasion Engine 2.0 Logic
let selectedRegionId = null;

function selectRegion(regionId) {
    selectedRegionId = regionId;
    const region = getAllRegions().find(r => r.id === regionId);
    if (!region) return;

    document.getElementById('region-details').style.display = 'block';
    document.getElementById('selected-region-name').innerText = region.name;
    document.getElementById('selected-region-buff').innerText = `Reward: ${region.buff}`;
    
    updateInvasionUI();
}

function updateInvasionUI() {
    const planet = planetsData[gameState.invasion.currentPlanet];
    if (!planet) return;

    document.getElementById('planet-name').innerText = planet.name;
    document.getElementById('planet-name').style.color = planet.color;

    const energy = gameState.invasion.energy;
    const maxEnergy = gameState.invasion.energyMax;
    document.getElementById('energy-value').innerText = `${Math.floor(energy)} / ${maxEnergy}`;
    document.getElementById('energy-bar-fill').style.width = `${(energy / maxEnergy) * 100}%`;

    // Map coloring
    planet.regions.forEach(r => {
        const el = document.getElementById(`region-${r.id}`);
        if (el) {
            const isConquered = gameState.invasion.conqueredRegions.includes(r.id);
            if (isConquered) {
                el.classList.add('conquered');
            } else {
                el.classList.remove('conquered');
            }
        }
    });

    if (selectedRegionId) {
        const region = planet.regions.find(r => r.id === selectedRegionId);
        if (region) {
            const progress = gameState.invasion.regionProgress[region.id] || 0;
            document.getElementById('selected-region-progress').innerText = `${Math.floor(progress)}%`;
            
            const btn = document.getElementById('start-invasion-btn');
            const isConquered = gameState.invasion.conqueredRegions.includes(region.id);
            
            if (isConquered) {
                btn.disabled = true;
                btn.innerText = 'CONQUERED';
            } else if (gameState.invasion.energy < region.cost) {
                btn.disabled = true;
                btn.innerText = `ENERGY: ${region.cost}`;
            } else {
                btn.disabled = false;
                btn.innerText = `INVADE (${region.cost})`;
            }
        }
    }
}

document.getElementById('start-invasion-btn').addEventListener('click', () => {
    if (!selectedRegionId) return;
    const region = getAllRegions().find(r => r.id === selectedRegionId);
    if (!region || gameState.invasion.energy < region.cost) return;

    gameState.invasion.energy -= region.cost;
    let progress = gameState.invasion.regionProgress[region.id] || 0;
    
    // Invasion power based on clickPower
    progress += 20; // 5 hits to conquer for now, can be scaled
    
    if (progress >= 100) {
        progress = 100;
        if (!gameState.invasion.conqueredRegions.includes(region.id)) {
            gameState.invasion.conqueredRegions.push(region.id);
            showToast('Region Conquered!', `${region.name} has fallen. Buff applied: ${region.buff}`);
            recalculatePowers();
            checkPlanetClear();
        }
    }
    
    gameState.invasion.regionProgress[region.id] = progress;
    updateInvasionUI();
    saveGame();
});

function checkPlanetClear() {
    const planet = planetsData[gameState.invasion.currentPlanet];
    const allConquered = planet.regions.every(r => gameState.invasion.conqueredRegions.includes(r.id));
    
    if (allConquered) {
        showToast('Planet Secured!', `${planet.name} is now under Raibos control.`);
        if (gameState.invasion.currentPlanet < planetsData.length - 1) {
            setTimeout(() => {
                if (confirm(`${planet.name} cleared! Prepare for hyperspace jump to the next planet?`)) {
                    document.getElementById('invasion-panel').classList.add('hyperdrive-active');
                    setTimeout(() => {
                        gameState.invasion.currentPlanet++;
                        document.getElementById('invasion-panel').classList.remove('hyperdrive-active');
                        updateInvasionUI();
                        saveGame();
                    }, 1500);
                }
            }, 1000);
        }
    }
}

// Add SVG listeners
planetsData.forEach(p => {
    p.regions.forEach(r => {
        const el = document.getElementById(`region-${r.id}`);
        if (el) el.addEventListener('click', () => selectRegion(r.id));
    });
});

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
        
        // Standardized to 5 minutes for everyone now
        const seconds = 300; 
        const gain = gameState.idlePower * seconds;
        
        gameState.raibos += gain;
        gameState.totalRaibos += gain;
        gameState.timeSkipsUsed = (gameState.timeSkipsUsed || 0) + 1;
        
        showToast(`TIME SKIP!`, `You found a Golden Chrono-Raibos! Gained 5 Minutes of production: +${formatNumber(gain)} Raibos`);
        
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
        if (confirm("⚠️ WARNING: Do you want to completely delete all progress?")) {
            if (confirm("Are you sure? All saved data will be permanently lost.")) {
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
updateInvasionUI();

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
