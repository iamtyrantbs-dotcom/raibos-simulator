let gameState = {
    raibos: 0,
    totalRaibos: 0, 
    totalClicks: 0,
    clickPower: 1,
    idlePower: 0,
    upgradeLevels: {},
    rebirthPoints: 0,
    artifactShards: 0,
    unlockedArtifacts: [],
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
    },
    {
        id: 'kuiper',
        name: 'Kuiper Belt',
        color: '#aaddff',
        regions: [
            { id: 'comet_grave', name: 'Comet Graveyard', buff: 'Click Power x100', type: 'click', value: 100, cost: 1e5, d: "M20,20 L50,20 L40,50 Z" },
            { id: 'deep_frozen', name: 'Deep Frozen', buff: 'Idle Power x100', type: 'idle', value: 100, cost: 2e5, d: "M120,20 L150,20 L140,50 Z" },
            { id: 'rim_shard', name: 'Rim Shard', buff: 'All Production x50', type: 'all_prod', value: 50, cost: 5e5, d: "M70,70 L130,70 L100,95 Z" }
        ]
    },
    {
        id: 'oort',
        name: 'Oort Cloud',
        color: '#cccccc',
        regions: [
            { id: 'void_shell', name: 'Void Shell', buff: 'Global Multiplier x10^9', type: 'mult_total', value: 1e9, cost: 1e6, d: "M10,10 L190,10 L190,190 L10,190 Z" },
            { id: 'dark_matter_node', name: 'Dark Matter Node', buff: 'RP Gain x100', type: 'rp_mult', value: 100, cost: 5e6, d: "M80,80 L120,80 L120,120 L80,120 Z" }
        ]
    },
    {
        id: 'andromeda',
        name: 'Andromeda Core',
        color: '#ff00ff',
        regions: [
            { id: 'reality_fold', name: 'Reality Fold', buff: 'Final Masterpiece: x10^15 Power', type: 'mult_total', value: 1e15, cost: 1e7, d: "M100,10 Q190,100 100,190 Q10,100 100,10 Z" }
        ]
    }
];

const SAVE_KEY = 'raibosSimulatorSave';

// Upgrade Definitions
const clickUpgrades = [
    { id: "c1", name: "Raibos Neural Impulse", desc: "+5 Raibos/click", baseCost: 100, costMul: 1.35, value: 5 },
    { id: "c2", name: "Raibos Kinetic Spark", desc: "+50 Raibos/click", baseCost: 1200, costMul: 1.38, value: 50 },
    { id: "c3", name: "Raibos Static Discharge", desc: "+400 Raibos/click", baseCost: 15000, costMul: 1.4, value: 400 },
    { id: "c4", name: "Raibos Bio-Pulse", desc: "+2.5k Raibos/click", baseCost: 1.5e5, costMul: 1.42, value: 2500 },
    { id: "c5", name: "Raibos Sonic Resonance", desc: "+15k Raibos/click", baseCost: 1e6, costMul: 1.45, value: 15000 },
    { id: "c6", name: "Raibos Optical Beam", desc: "+100k Raibos/click", baseCost: 1.5e7, costMul: 1.48, value: 100000 },
    { id: "c7", name: "Raibos Thermal Flare", desc: "+1M Raibos/click", baseCost: 2e8, costMul: 1.5, value: 1000000 },
    { id: "c8", name: "Raibos Magnetic Pull", desc: "+10M Raibos/click", baseCost: 3e9, costMul: 1.52, value: 10000000 },
    { id: "c9", name: "Raibos Plasma Arc", desc: "+100M Raibos/click", baseCost: 5e10, costMul: 1.55, value: 100000000 },
    { id: "c10", name: "Raibos Atomic Vibration", desc: "+1B Raibos/click", baseCost: 1e12, costMul: 1.58, value: 1e9 },
    { id: "c11", name: "Raibos Molecular Bond", desc: "+10B Raibos/click", baseCost: 2.5e13, costMul: 1.6, value: 1e10 },
    { id: "c12", name: "Raibos Gravitational Tug", desc: "+100B Raibos/click", baseCost: 5e14, costMul: 1.62, value: 1e11 },
    { id: "c13", name: "Raibos Quantum Flicker", desc: "+1aa Raibos/click", baseCost: 1e16, costMul: 1.64, value: 1e15 },
    { id: "c14", name: "Raibos Nano-Assembler", desc: "+10aa Raibos/click", baseCost: 2.5e17, costMul: 1.66, value: 1e16 },
    { id: "c15", name: "Raibos Cyber-Link", desc: "+100aa Raibos/click", baseCost: 5e18, costMul: 1.68, value: 1e17 },
    { id: "c16", name: "Raibos Neural Network", desc: "+1ab Raibos/click", baseCost: 1e20, costMul: 1.7, value: 1e18 },
    { id: "c17", name: "Raibos Artificial Ego", desc: "+10ab Raibos/click", baseCost: 2.5e21, costMul: 1.72, value: 1e19 },
    { id: "c18", name: "Raibos Digital Ghost", desc: "+100ab Raibos/click", baseCost: 5e22, costMul: 1.74, value: 1e20 },
    { id: "c19", name: "Raibos Binary Storm", desc: "+1ac Raibos/click", baseCost: 1e24, costMul: 1.76, value: 1e21 },
    { id: "c20", name: "Raibos Data Breach", desc: "+10ac Raibos/click", baseCost: 2.5e25, costMul: 1.78, value: 1e22 },
    { id: "c21", name: "Raibos Firewall Breach", desc: "+100ac Raibos/click", baseCost: 5e26, costMul: 1.8, value: 1e23 },
    { id: "c22", name: "Raibos System Overload", desc: "+1ad Raibos/click", baseCost: 1e28, costMul: 1.82, value: 1e24 },
    { id: "c23", name: "Raibos Kernel Panic", desc: "+10ad Raibos/click", baseCost: 2.5e29, costMul: 1.84, value: 1e25 },
    { id: "c24", name: "Raibos Logic Bomb", desc: "+100ad Raibos/click", baseCost: 5e30, costMul: 1.86, value: 1e26 },
    { id: "c25", name: "Raibos Zero Day", desc: "+1ae Raibos/click", baseCost: 1e32, costMul: 1.88, value: 1e27 },
    { id: "c26", name: "Raibos Root Access", desc: "+10ae Raibos/click", baseCost: 2.5e33, costMul: 1.9, value: 1e28 },
    { id: "c27", name: "Raibos Cloud Burst", desc: "+100ae Raibos/click", baseCost: 5e34, costMul: 1.92, value: 1e29 },
    { id: "c28", name: "Raibos Server Farm", desc: "+1af Raibos/click", baseCost: 1e36, costMul: 1.94, value: 1e30 },
    { id: "c29", name: "Raibos Mainframe Warp", desc: "+10af Raibos/click", baseCost: 2.5e37, costMul: 1.96, value: 1e31 },
    { id: "c30", name: "Raibos Virtual Reality", desc: "+100af Raibos/click", baseCost: 5e38, costMul: 1.98, value: 1e32 },
    { id: "c31", name: "Raibos Augmented Sight", desc: "+1ag Raibos/click", baseCost: 1e40, costMul: 2.0, value: 1e33 },
    { id: "c32", name: "Raibos Holo-Projection", desc: "+10ag Raibos/click", baseCost: 2.5e41, costMul: 2.0, value: 1e34 },
    { id: "c33", name: "Raibos Laser Focus", desc: "+100ag Raibos/click", baseCost: 5e42, costMul: 2.0, value: 1e35 },
    { id: "c34", name: "Raibos Prism Split", desc: "+1ah Raibos/click", baseCost: 1e44, costMul: 2.0, value: 1e36 },
    { id: "c35", name: "Raibos Refraction", desc: "+10ah Raibos/click", baseCost: 2.5e45, costMul: 2.0, value: 1e37 },
    { id: "c36", name: "Raibos Reflection", desc: "+100ah Raibos/click", baseCost: 5e46, costMul: 2.0, value: 1e38 },
    { id: "c37", name: "Raibos Mirror Image", desc: "+1ai Raibos/click", baseCost: 1e48, costMul: 2.0, value: 1e39 },
    { id: "c38", name: "Raibos Shadow Walk", desc: "+10ai Raibos/click", baseCost: 2.5e49, costMul: 2.0, value: 1e40 },
    { id: "c39", name: "Raibos Stealth Mode", desc: "+100ai Raibos/click", baseCost: 5e50, costMul: 2.0, value: 1e41 },
    { id: "c40", name: "Raibos Ghost Protocol", desc: "+1aj Raibos/click", baseCost: 1e52, costMul: 2.0, value: 1e42 },
    { id: "c41", name: "Raibos Dark Web", desc: "+10aj Raibos/click", baseCost: 2.5e53, costMul: 2.0, value: 1e43 },
    { id: "c42", name: "Raibos Encryption Key", desc: "+100aj Raibos/click", baseCost: 5e54, costMul: 2.0, value: 1e44 },
    { id: "c43", name: "Raibos Decryption Alg", desc: "+1ak Raibos/click", baseCost: 1e56, costMul: 2.0, value: 1e45 },
    { id: "c44", name: "Raibos Hash Power", desc: "+10ak Raibos/click", baseCost: 2.5e57, costMul: 2.0, value: 1e46 },
    { id: "c45", name: "Raibos Crypto Mine", desc: "+100ak Raibos/click", baseCost: 5e58, costMul: 2.0, value: 1e47 },
    { id: "c46", name: "Raibos Blockchain Link", desc: "+1al Raibos/click", baseCost: 1e60, costMul: 2.0, value: 1e48 },
    { id: "c47", name: "Raibos Smart Contract", desc: "+10al Raibos/click", baseCost: 2.5e61, costMul: 2.0, value: 1e49 },
    { id: "c48", name: "Raibos Token Burn", desc: "+100al Raibos/click", baseCost: 5e62, costMul: 2.0, value: 1e50 },
    { id: "c49", name: "Raibos Moon Shot", desc: "+1am Raibos/click", baseCost: 1e64, costMul: 2.0, value: 1e51 },
    { id: "c50", name: "Raibos Diamond Hands", desc: "+10am Raibos/click", baseCost: 2.5e65, costMul: 2.0, value: 1e52 },
    { id: "c51", name: "Raibos Paper Hands", desc: "+100am Raibos/click", baseCost: 5e66, costMul: 2.0, value: 1e53 },
    { id: "c52", name: "Raibos Hodl Logic", desc: "+1an Raibos/click", baseCost: 1e68, costMul: 2.0, value: 1e54 },
    { id: "c53", name: "Raibos FOMO Trigger", desc: "+10an Raibos/click", baseCost: 2.5e69, costMul: 2.0, value: 1e55 },
    { id: "c54", name: "Raibos Whale Splash", desc: "+100an Raibos/click", baseCost: 5e70, costMul: 2.0, value: 1e56 },
    { id: "c55", name: "Raibos Market Manip", desc: "+1ao Raibos/click", baseCost: 1e72, costMul: 2.0, value: 1e57 },
    { id: "c56", name: "Raibos Bull Run", desc: "+10ao Raibos/click", baseCost: 2.5e73, costMul: 2.0, value: 1e58 },
    { id: "c57", name: "Raibos Bear Trap", desc: "+100ao Raibos/click", baseCost: 5e74, costMul: 2.0, value: 1e59 },
    { id: "c58", name: "Raibos Margin Call", desc: "+1ap Raibos/click", baseCost: 1e76, costMul: 2.0, value: 1e60 },
    { id: "c59", name: "Raibos Liquid Assets", desc: "+10ap Raibos/click", baseCost: 2.5e77, costMul: 2.0, value: 1e61 },
    { id: "c60", name: "Raibos Venture Cap", desc: "+100ap Raibos/click", baseCost: 5e78, costMul: 2.0, value: 1e62 }
];

const idleUpgrades = [
    { id: "i1", name: "Raibos Dust Collector", desc: "+1 Raibos/sec", baseCost: 15, costMul: 1.2, value: 1 },
    { id: "i2", name: "Raibos Scrap Magnet", desc: "+15 Raibos/sec", baseCost: 200, costMul: 1.22, value: 15 },
    { id: "i3", name: "Raibos Manual Crank", desc: "+120 Raibos/sec", baseCost: 2500, costMul: 1.25, value: 120 },
    { id: "i4", name: "Raibos Pedal Power", desc: "+800 Raibos/sec", baseCost: 25000, costMul: 1.28, value: 800 },
    { id: "i5", name: "Raibos Water Wheel", desc: "+5k Raibos/sec", baseCost: 2e5, costMul: 1.3, value: 5000 },
    { id: "i6", name: "Raibos Wind Turbine", desc: "+30k Raibos/sec", baseCost: 1.5e6, costMul: 1.32, value: 30000 },
    { id: "i7", name: "Raibos Solar Panel", desc: "+200k Raibos/sec", baseCost: 1e7, costMul: 1.34, value: 200000 },
    { id: "i8", name: "Raibos Bio-Gas Plant", desc: "+1.5M Raibos/sec", baseCost: 8e7, costMul: 1.36, value: 1500000 },
    { id: "i9", name: "Raibos Geothermal Tap", desc: "+10M Raibos/sec", baseCost: 5e8, costMul: 1.38, value: 10000000 },
    { id: "i10", name: "Raibos Coal Plant", desc: "+80M Raibos/sec", baseCost: 4e9, costMul: 1.4, value: 80000000 },
    { id: "i11", name: "Raibos Oil Rig", desc: "+600M Raibos/sec", baseCost: 3e10, costMul: 1.42, value: 600000000 },
    { id: "i12", name: "Raibos Nuclear Core", desc: "+5B Raibos/sec", baseCost: 2.5e11, costMul: 1.44, value: 5e9 },
    { id: "i13", name: "Raibos Thorium Reactor", desc: "+40B Raibos/sec", baseCost: 2e12, costMul: 1.46, value: 4e10 },
    { id: "i14", name: "Raibos Fusion Coil", desc: "+300B Raibos/sec", baseCost: 1.5e13, costMul: 1.48, value: 3e11 },
    { id: "i15", name: "Raibos Plasma Cell", desc: "+2.5T Raibos/sec", baseCost: 1e14, costMul: 1.5, value: 2.5e12 },
    { id: "i16", name: "Raibos Anti-Matter Jar", desc: "+20T Raibos/sec", baseCost: 8e14, costMul: 1.52, value: 2e13 },
    { id: "i17", name: "Raibos Dark Matter Trap", desc: "+150T Raibos/sec", baseCost: 6e15, costMul: 1.54, value: 1.5e14 },
    { id: "i18", name: "Raibos Void Siphon", desc: "+1aa Raibos/sec", baseCost: 5e16, costMul: 1.56, value: 1e15 },
    { id: "i19", name: "Raibos Star Harvester", desc: "+10aa Raibos/sec", baseCost: 4e17, costMul: 1.58, value: 1e16 },
    { id: "i20", name: "Raibos Dyson Swarm", desc: "+100aa Raibos/sec", baseCost: 3e18, costMul: 1.6, value: 1e17 },
    { id: "i21", name: "Raibos Nebula Cloud", desc: "+1ab Raibos/sec", baseCost: 2.5e19, costMul: 1.62, value: 1e18 },
    { id: "i22", name: "Raibos Supernova Catch", desc: "+10ab Raibos/sec", baseCost: 2e20, costMul: 1.64, value: 1e19 },
    { id: "i23", name: "Raibos Pulsar Pulse", desc: "+100ab Raibos/sec", baseCost: 1.5e21, costMul: 1.66, value: 1e20 },
    { id: "i24", name: "Raibos Quasar Beam", desc: "+1ac Raibos/sec", baseCost: 1e22, costMul: 1.68, value: 1e21 },
    { id: "i25", name: "Raibos Black Hole Gen", desc: "+10ac Raibos/sec", baseCost: 8e22, costMul: 1.7, value: 1e22 },
    { id: "i26", name: "Raibos Event Horizon", desc: "+100ac Raibos/sec", baseCost: 6e23, costMul: 1.72, value: 1e23 },
    { id: "i27", name: "Raibos Singularity", desc: "+1ad Raibos/sec", baseCost: 5e24, costMul: 1.74, value: 1e24 },
    { id: "i28", name: "Raibos Wormhole Link", desc: "+10ad Raibos/sec", baseCost: 4e25, costMul: 1.76, value: 1e25 },
    { id: "i29", name: "Raibos Warp Drive", desc: "+100ad Raibos/sec", baseCost: 3e26, costMul: 1.78, value: 1e26 },
    { id: "i30", name: "Raibos Fold Space", desc: "+1ae Raibos/sec", baseCost: 2.5e27, costMul: 1.8, value: 1e27 },
    { id: "i31", name: "Raibos Teleporter", desc: "+10ae Raibos/sec", baseCost: 2e28, costMul: 1.82, value: 1e28 },
    { id: "i32", name: "Raibos Replicator", desc: "+100ae Raibos/sec", baseCost: 1.5e29, costMul: 1.84, value: 1e29 },
    { id: "i33", name: "Raibos Nano-Factory", desc: "+1af Raibos/sec", baseCost: 1e30, costMul: 1.86, value: 1e30 },
    { id: "i34", name: "Raibos Mega-Structure", desc: "+10af Raibos/sec", baseCost: 8e30, costMul: 1.88, value: 1e31 },
    { id: "i35", name: "Raibos Orbital Ring", desc: "+100af Raibos/sec", baseCost: 6e31, costMul: 1.9, value: 1e32 },
    { id: "i36", name: "Raibos Space Elevator", desc: "+1ag Raibos/sec", baseCost: 5e32, costMul: 1.92, value: 1e33 },
    { id: "i37", name: "Raibos Moon Base", desc: "+10ag Raibos/sec", baseCost: 4e33, costMul: 1.94, value: 1e34 },
    { id: "i38", name: "Raibos Asteroid Mine", desc: "+100ag Raibos/sec", baseCost: 3e34, costMul: 1.96, value: 1e35 },
    { id: "i39", name: "Raibos Comet Catcher", desc: "+1ah Raibos/sec", baseCost: 2.5e35, costMul: 1.98, value: 1e36 },
    { id: "i40", name: "Raibos Planetary Drill", desc: "+10ah Raibos/sec", baseCost: 2e36, costMul: 2.0, value: 1e37 },
    { id: "i41", name: "Raibos Core Tap", desc: "+100ah Raibos/sec", baseCost: 1.5e37, costMul: 2.0, value: 1e38 },
    { id: "i42", name: "Raibos Magma Pump", desc: "+1ai Raibos/sec", baseCost: 1e38, costMul: 2.0, value: 1e39 },
    { id: "i43", name: "Raibos Tectonic Shift", desc: "+10ai Raibos/sec", baseCost: 8e38, costMul: 2.0, value: 1e40 },
    { id: "i44", name: "Raibos Weather Mod", desc: "+100ai Raibos/sec", baseCost: 6e39, costMul: 2.0, value: 1e41 },
    { id: "i45", name: "Raibos Atmosphere Gen", desc: "+1aj Raibos/sec", baseCost: 5e40, costMul: 2.0, value: 1e42 },
    { id: "i46", name: "Raibos Terraformer", desc: "+10aj Raibos/sec", baseCost: 4e41, costMul: 2.0, value: 1e43 },
    { id: "i47", name: "Raibos Bio-Sphere", desc: "+100aj Raibos/sec", baseCost: 3e42, costMul: 2.0, value: 1e44 },
    { id: "i48", name: "Raibos Gene Lab", desc: "+1ak Raibos/sec", baseCost: 2.5e43, costMul: 2.0, value: 1e45 },
    { id: "i49", name: "Raibos Cloning Vat", desc: "+10ak Raibos/sec", baseCost: 2e44, costMul: 2.0, value: 1e46 },
    { id: "i50", name: "Raibos Brain Bank", desc: "+100ak Raibos/sec", baseCost: 1.5e45, costMul: 2.0, value: 1e47 },
    { id: "i51", name: "Raibos Neural Cloud", desc: "+1al Raibos/sec", baseCost: 1e46, costMul: 2.0, value: 1e48 },
    { id: "i52", name: "Raibos Hive Mind", desc: "+10al Raibos/sec", baseCost: 8e46, costMul: 2.0, value: 1e49 },
    { id: "i53", name: "Raibos Collective Uncon", desc: "+100al Raibos/sec", baseCost: 6e47, costMul: 2.0, value: 1e50 },
    { id: "i54", name: "Raibos Ego Death", desc: "+1am Raibos/sec", baseCost: 5e48, costMul: 2.0, value: 1e51 },
    { id: "i55", name: "Raibos Transcendence", desc: "+10am Raibos/sec", baseCost: 4e49, costMul: 2.0, value: 1e52 },
    { id: "i56", name: "Raibos Ascension", desc: "+100am Raibos/sec", baseCost: 3e50, costMul: 2.0, value: 1e53 },
    { id: "i57", name: "Raibos Nirvana Gate", desc: "+1an Raibos/sec", baseCost: 2.5e51, costMul: 2.0, value: 1e54 },
    { id: "i58", name: "Raibos Omega Point", desc: "+10an Raibos/sec", baseCost: 2e52, costMul: 2.0, value: 1e55 },
    { id: "i59", name: "Raibos Big Bang Lab", desc: "+100an Raibos/sec", baseCost: 1.5e53, costMul: 2.0, value: 1e56 },
    { id: "i60", name: "Raibos Cosmic Inflation", desc: "+1ao Raibos/sec", baseCost: 1e54, costMul: 2.0, value: 1e57 }
];

const artifactsData = [
    { id: 'art1', name: 'Eye of Raibos', desc: 'Click power x2 permanent.', cost: 30, type: 'click_mult', value: 2 },
    { id: 'art2', name: 'Eternal Chronos', desc: 'Offline production 100% instead of 50%.', cost: 75, type: 'offline', value: 2 },
    { id: 'art3', name: 'Singularity Core', desc: 'All upgrade cost scaling -0.01.', cost: 150, type: 'cost_scale', value: 0.01 },
    { id: 'art4', name: 'Stardust Magnet', desc: 'Chance to get Cosmic Shards on click x2.', cost: 400, type: 'shard_rate', value: 2 },
    { id: 'art5', name: 'Galactic Engine', desc: 'Idle power x3 permanent.', cost: 800, type: 'idle_mult', value: 3 },
    { id: 'art6', name: 'Void Compass', desc: 'Energy Regen +50%.', cost: 1500, type: 'energy_regen', value: 0.5 },
    { id: 'art7', name: 'Alphabet Prism', desc: 'Global Mult x1.15 for every unique letter suffix unlocked.', cost: 3000, type: 'suffix_mult', value: 1.15 },
    { id: 'art8', name: 'Nebula Shroud', desc: 'Invasion attack cost -15%.', cost: 7000, type: 'invasion_cost', value: 0.15 },
    { id: 'art9', name: 'Quasar Lens', desc: 'Rebirth Point gain x2.', cost: 15000, type: 'rp_mult', value: 2 },
    { id: 'art10', name: 'Dimensional Tear', desc: 'Clicking has a 1% chance to grant 2 mins of production.', cost: 40000, type: 'click_proc', value: 120 },
    { id: 'art11', name: 'Raibos Legacy', desc: 'All Production x10.', cost: 100000, type: 'all_prod', value: 10 },
    { id: 'art12', name: 'Infinity Battery', desc: 'Energy Max x5.', cost: 250000, type: 'energy_max', value: 5 },
    { id: 'art13', name: 'Cosmic Calculator', desc: 'Upgrade cost scaling -0.02 (Total).', cost: 750000, type: 'cost_scale', value: 0.02 },
    { id: 'art14', name: 'Supernova Heart', desc: 'Click Power x100.', cost: 2e6, type: 'click_mult', value: 100 },
    { id: 'art15', name: 'Event Horizon Gate', desc: 'Unlocks "Hyper-Invasion" (Instant conquer regions if energy > 10x cost).', cost: 1e7, type: 'special_invasion', value: 1 },
    { id: 'art16', name: 'Raibos Omnipotence', desc: 'Final Multiplier x1,000.', cost: 5e7, type: 'mult_total', value: 1000 },
    { id: 'art17', name: 'Stellar Forge', desc: 'Every Artifact owned gives x1.5 All Production.', cost: 2e8, type: 'art_mult', value: 1.5 },
    { id: 'art18', name: 'Dark Energy Tap', desc: 'Energy Regen x10.', cost: 1e9, type: 'energy_mult', value: 10 },
    { id: 'art19', name: 'Universal Truth', desc: 'Rebirth Point gain x50.', cost: 5e9, type: 'rp_mult', value: 50 },
    { id: 'art20', name: 'The End of Raibos', desc: 'Final Masterpiece: x1,000,000 Power.', cost: 1e10, type: 'mult_total', value: 1000000 }
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
    { id: 'a17', title: 'Artifact Hunter', req: () => gameState.unlockedArtifacts.length >= 1, desc: 'Find your first Artifact', bonus: 5.0 }
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
    artifactList: document.getElementById('artifact-container'),
    shardDisp: document.getElementById('shard-amount'),
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

    // Artifact Scaling Reduction
    gameState.unlockedArtifacts.forEach(aid => {
        const art = artifactsData.find(a => a.id === aid);
        if (art && art.type === 'cost_scale') scaling -= art.value;
    });
    
    scaling = Math.max(1.01, scaling - costReduction);
    
    return Math.floor(upg.baseCost * Math.pow(scaling, level));
}

function getAllRegions() {
    return planetsData.flatMap(p => p.regions);
}

function formatNumber(num) {
    if (num < 1e3) return Math.floor(num).toLocaleString();
    
    const suffixes = ['k', 'M', 'B', 'T'];
    const exp = Math.floor(Math.log10(num) / 3);
    
    if (exp <= 4) {
        const suffix = suffixes[exp - 1];
        return (num / Math.pow(10, exp * 3)).toFixed(2) + suffix;
    } else {
        // Alphabetic notation: aa, ab, ac... (starting from 10^15)
        let alphaIndex = exp - 5; 
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
    let base = total / 1000000000;
    let points = Math.pow(base, 0.42);
    
    // Apply Regional Buffs
    const allConquered = gameState.invasion.conqueredRegions;
    const allRegions = getAllRegions();
    allConquered.forEach(rid => {
        const r = allRegions.find(x => x.id === rid);
        if (r) {
            if (r.type === 'rp') points *= (1 + r.value);
            if (r.type === 'rp_mult') points *= r.value;
        }
    });

    // Artifact RP Buffs
    gameState.unlockedArtifacts.forEach(aid => {
        const art = artifactsData.find(a => a.id === aid);
        if (art && art.type === 'rp_mult') points *= art.value;
    });
    
    return Math.floor(points);
}

// Core Logic
function getGlobalMultiplier() {
    let mult = 1.0;
    mult += gameState.rebirthPoints * 0.05;
    
    // Achievement multiplier
    gameState.achievements.forEach(id => {
        const ach = achievementsData.find(a => a.id === id);
        if (ach) mult += ach.bonus;
    });

    // Planetary Invasion Buffs
    gameState.invasion.conqueredRegions.forEach(regionId => {
        const region = getAllRegions().find(r => r.id === regionId);
        if (region) {
            if (region.type === 'mult') mult += region.value;
            if (region.type === 'mult_total') mult *= region.value;
            if (region.type === 'all_prod') mult *= region.value;
        }
    });

    // Artifact Buffs
    gameState.unlockedArtifacts.forEach(aid => {
        const art = artifactsData.find(a => a.id === aid);
        if (art) {
            if (art.type === 'all_prod') mult *= art.value;
            if (art.type === 'mult_total') mult *= art.value;
            if (art.type === 'suffix_mult') {
                const exp = Math.floor(Math.log10(gameState.raibos || 1) / 3);
                if (exp >= 5) mult *= Math.pow(art.value, exp - 4);
            }
            if (art.type === 'art_mult') mult *= Math.pow(art.value, gameState.unlockedArtifacts.length);
        }
    });

    return mult;
}

function updatePower() {
    let cp = 1;
    clickUpgrades.forEach(upg => {
        const level = gameState.upgradeLevels[upg.id] || 0;
        cp += upg.value * level;
    });

    let ip = 0;
    idleUpgrades.forEach(upg => {
        const level = gameState.upgradeLevels[upg.id] || 0;
        ip += upg.value * level;
    });

    // Planetary Power Buffs
    gameState.invasion.conqueredRegions.forEach(regionId => {
        const region = getAllRegions().find(r => r.id === regionId);
        if (region) {
            if (region.type === 'click') cp *= (1 + region.value);
            if (region.type === 'idle') ip *= (1 + region.value);
            if (region.type === 'all_prod') { cp *= region.value; ip *= region.value; }
        }
    });

    // Artifact Power Buffs
    gameState.unlockedArtifacts.forEach(aid => {
        const art = artifactsData.find(a => a.id === aid);
        if (art) {
            if (art.type === 'click_mult') cp *= art.value;
            if (art.type === 'idle_mult') ip *= art.value;
        }
    });

    const gm = getGlobalMultiplier();
    gameState.clickPower = cp * gm;
    gameState.idlePower = ip * gm;
}

function updateUI() {
    elements.count.textContent = formatNumber(gameState.raibos);
    elements.perSec.textContent = formatNumber(gameState.idlePower);
    elements.perClick.textContent = formatNumber(gameState.clickPower);
    elements.globalMult.textContent = getGlobalMultiplier().toFixed(2);
    elements.shardDisp.textContent = gameState.artifactShards.toLocaleString();
    
    // Tab switching
    elements.tabs.forEach(tab => {
        const content = document.getElementById(tab.dataset.tab);
        if (tab.classList.contains('active')) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    });

    renderUpgrades();
    renderInvasion();
    renderArtifacts();
    renderAchievements();
    
    // Rebirth badge
    const pEarn = getPointsToEarn(gameState.totalRaibos);
    if (pEarn > 0) {
        elements.rebirthBadge.classList.remove('hidden');
        elements.rebirthDisp.textContent = formatNumber(pEarn);
        elements.rbMinReq.classList.add('hidden');
    } else {
        elements.rebirthBadge.classList.add('hidden');
        elements.rbMinReq.classList.remove('hidden');
    }
}

function renderUpgrades() {
    renderUpgradeList(clickUpgrades, elements.clickList);
    renderUpgradeList(idleUpgrades, elements.idleList);
}

function renderUpgradeList(list, container) {
    container.innerHTML = '';
    list.forEach(upg => {
        const cost = getUpgradeCost(upg);
        const level = gameState.upgradeLevels[upg.id] || 0;
        const canAfford = gameState.raibos >= cost;

        const card = document.createElement('div');
        card.className = `upgrade-card ${canAfford ? '' : 'disabled'}`;
        card.onclick = () => buyUpgrade(upg);

        card.innerHTML = `
            <div class="upgrade-info">
                <div class="upgrade-name">${upg.name} <span class="level">Lv.${level}</span></div>
                <div class="upgrade-desc">${upg.desc}</div>
            </div>
            <div class="upgrade-cost">
                <img src="https://api.iconify.design/pixelarticons:coin.svg?color=%23f2ff00" width="16">
                ${formatNumber(cost)}
            </div>
        `;
        container.appendChild(card);
    });
}

function buyUpgrade(upg) {
    const cost = getUpgradeCost(upg);
    if (gameState.raibos >= cost) {
        gameState.raibos -= cost;
        gameState.upgradeLevels[upg.id] = (gameState.upgradeLevels[upg.id] || 0) + 1;
        updatePower();
        updateUI();
        saveGame();
        playClickSound(0.5);
    }
}

// Artifact System
function renderArtifacts() {
    const container = elements.artifactList;
    container.innerHTML = '';
    
    artifactsData.forEach(art => {
        const unlocked = gameState.unlockedArtifacts.includes(art.id);
        const canAfford = gameState.artifactShards >= art.cost;

        const el = document.createElement('div');
        el.className = `artifact-card ${unlocked ? 'unlocked' : (canAfford ? '' : 'disabled')}`;
        el.onclick = () => buyArtifact(art);
        
        el.innerHTML = `
            <div class="art-icon">${unlocked ? '✨' : '❔'}</div>
            <div class="art-info">
                <div class="art-name">${art.name}</div>
                <div class="art-desc">${art.desc}</div>
                ${unlocked ? '<div class="art-status">EQUIPPED</div>' : `<div class="art-cost">Cost: ${art.cost.toLocaleString()} Shards</div>`}
            </div>
        `;
        container.appendChild(el);
    });
}

function buyArtifact(art) {
    if (gameState.unlockedArtifacts.includes(art.id)) return;
    if (gameState.artifactShards >= art.cost) {
        gameState.artifactShards -= art.cost;
        gameState.unlockedArtifacts.push(art.id);
        updatePower();
        updateUI();
        saveGame();
        showToast(`Artifact Unlocked: ${art.name}`, "success");
        playClickSound(1.5);
    } else {
        showToast("Not enough shards!", "error");
    }
}

// Invasion System
function renderInvasion() {
    const planetIdx = gameState.invasion.currentPlanet;
    const planet = planetsData[planetIdx];
    if (!planet) return;

    const cont = document.getElementById('invasion-planet-container');
    cont.innerHTML = `
        <div class="planet-view" style="background: radial-gradient(circle, ${planet.color}44 0%, transparent 70%);">
            <h2 style="color: ${planet.color}; text-shadow: 0 0 10px ${planet.color};">${planet.name}</h2>
            <div class="energy-bar-cont">
                <div class="energy-fill" style="width: ${(gameState.invasion.energy / gameState.invasion.energyMax) * 100}%"></div>
                <div class="energy-text">Energy: ${Math.floor(gameState.invasion.energy)}/${gameState.invasion.energyMax}</div>
            </div>
            <div class="map-svg-cont">
                <svg viewBox="0 0 200 100" class="planet-map">
                    ${planet.regions.map(r => {
                        const conquered = gameState.invasion.conqueredRegions.includes(r.id);
                        const progress = gameState.invasion.regionProgress[r.id] || 0;
                        return `
                            <path d="${r.d}" 
                                  class="region ${conquered ? 'conquered' : ''}" 
                                  style="--progress: ${progress}%"
                                  onclick="attackRegion('${r.id}')">
                                <title>${r.name}\n${r.buff}\nCost: ${r.cost} Energy</title>
                            </path>
                        `;
                    }).join('')}
                </svg>
            </div>
        </div>
    `;

    const nav = document.getElementById('planet-nav');
    nav.innerHTML = planetsData.map((p, idx) => {
        const unlocked = idx <= gameState.invasion.currentPlanet || idx <= (gameState.invasion.conqueredRegions.length / 3);
        return `<button class="planet-btn ${idx === planetIdx ? 'active' : ''}" 
                        ${unlocked ? '' : 'disabled'} 
                        onclick="switchPlanet(${idx})">${p.name}</button>`;
    }).join('');
}

function switchPlanet(idx) {
    gameState.invasion.currentPlanet = idx;
    renderInvasion();
}

function attackRegion(rid) {
    const region = getAllRegions().find(r => r.id === rid);
    if (!region) return;
    if (gameState.invasion.conqueredRegions.includes(rid)) return;

    // Special Invasion Artifact
    const hasHyper = gameState.unlockedArtifacts.includes('art15');
    const actualCost = gameState.unlockedArtifacts.includes('art8') ? region.cost * 0.8 : region.cost;

    if (gameState.invasion.energy >= actualCost) {
        gameState.invasion.energy -= actualCost;
        let progGain = 10;
        if (hasHyper && gameState.invasion.energy > actualCost * 10) progGain = 100;

        let prog = (gameState.invasion.regionProgress[rid] || 0) + progGain;
        if (prog >= 100) {
            prog = 100;
            gameState.invasion.conqueredRegions.push(rid);
            gameState.artifactShards += Math.floor(region.cost / 2); // Shards from conquest
            showToast(`Conquered ${region.name}! (+${Math.floor(region.cost / 2)} Shards)`, "success");
            updatePower();
        }
        gameState.invasion.regionProgress[rid] = prog;
        renderInvasion();
        createInvasionEffect();
    } else {
        showToast("Not enough energy!", "error");
    }
}

function createInvasionEffect() {
    const overlay = document.createElement('div');
    overlay.className = 'invasion-overlay';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 500);
}

// Achievements
function renderAchievements() {
    const container = elements.achievementsList;
    container.innerHTML = '';
    
    achievementsData.forEach(ach => {
        const completed = gameState.achievements.includes(ach.id);
        if (ach.hidden && !completed) return;

        const el = document.createElement('div');
        el.className = `achievement-card ${completed ? 'completed' : ''}`;
        el.innerHTML = `
            <div class="ach-icon">${completed ? '🏆' : '🔒'}</div>
            <div class="ach-info">
                <div class="ach-title">${ach.title}</div>
                <div class="ach-desc">${ach.desc}</div>
                <div class="ach-bonus">Bonus: +${(ach.bonus * 100).toFixed(0)}% Mult</div>
            </div>
        `;
        container.appendChild(el);
    });
}

function checkAchievements() {
    achievementsData.forEach(ach => {
        if (!gameState.achievements.includes(ach.id) && ach.req()) {
            gameState.achievements.push(ach.id);
            showToast(`Achievement Unlocked: ${ach.title}`, "success");
            updatePower();
        }
    });
}

// Game Loop
let lastTick = Date.now();
function gameLoop() {
    const now = Date.now();
    const dt = (now - lastTick) / 1000;
    lastTick = now;

    const produced = gameState.idlePower * dt;
    gameState.raibos += produced;
    gameState.totalRaibos += produced;

    let regen = gameState.invasion.energyRegen;
    gameState.invasion.conqueredRegions.forEach(rid => {
        const r = getAllRegions().find(x => x.id === rid);
        if (r && r.type === 'energy') regen += r.value;
        if (r && r.type === 'energy_mult') regen *= r.value;
    });
    
    // Artifact Energy Regen
    gameState.unlockedArtifacts.forEach(aid => {
        const art = artifactsData.find(a => a.id === aid);
        if (art) {
            if (art.type === 'energy_regen') regen += art.value;
            if (art.type === 'energy_mult') regen *= art.value;
        }
    });

    let maxE = gameState.invasion.energyMax;
    gameState.unlockedArtifacts.forEach(aid => {
        const art = artifactsData.find(a => a.id === aid);
        if (art && art.type === 'energy_max') maxE *= art.value;
    });

    gameState.invasion.energy = Math.min(maxE, gameState.invasion.energy + regen * dt);

    checkAchievements();
    updateUI();
    
    if (now - gameState.lastSaveTime > 30000) {
        saveGame();
    }

    requestAnimationFrame(gameLoop);
}

// Interaction
elements.btn.onclick = (e) => {
    gameState.raibos += gameState.clickPower;
    gameState.totalRaibos += gameState.clickPower;
    gameState.totalClicks++;
    
    // Shard Drop
    let shardChance = 0.0002; // 1/5000
    gameState.unlockedArtifacts.forEach(aid => {
        const art = artifactsData.find(a => a.id === aid);
        if (art && art.type === 'shard_rate') shardChance *= art.value;
    });
    if (Math.random() < shardChance) {
        gameState.artifactShards++;
        showToast("Found a Cosmic Shard!", "info");
    }

    // Click Proc Artifact
    gameState.unlockedArtifacts.forEach(aid => {
        const art = artifactsData.find(a => a.id === aid);
        if (art && art.type === 'click_proc' && Math.random() < 0.01) {
            const gain = gameState.idlePower * art.value;
            gameState.raibos += gain;
            showToast("Dimensional Tear: Gained production!", "success");
        }
    });
    
    createParticle(e.clientX, e.clientY);
    elements.btn.style.transform = 'scale(0.95)';
    setTimeout(() => elements.btn.style.transform = 'scale(1)', 50);
    
    playClickSound(1.0);
};

function createParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'click-particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.textContent = '+' + formatNumber(gameState.clickPower);
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
}

elements.tabs.forEach(tab => {
    tab.onclick = () => {
        elements.tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        updateUI();
    };
});

function rebirth() {
    const points = getPointsToEarn(gameState.totalRaibos);
    if (points > 0) {
        if (confirm(`Rebirth now for ${formatNumber(points)} RP? You will lose all upgrades and Raibos, but gain a massive multiplier!`)) {
            gameState.rebirthPoints += points;
            gameState.raibos = 0;
            gameState.totalRaibos = 0;
            gameState.upgradeLevels = {};
            updatePower();
            updateUI();
            saveGame();
            showToast("World Reborn!", "success");
        }
    }
}

// System
function saveGame() {
    gameState.lastSaveTime = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(gameState, parsed);
        
        const offlineTime = (Date.now() - gameState.lastSaveTime) / 1000;
        if (offlineTime > 60) {
            updatePower();
            let rate = 0.5;
            if (gameState.unlockedArtifacts.includes('art2')) rate = 1.0;
            const amt = gameState.idlePower * offlineTime * rate;
            gameState.raibos += amt;
            gameState.totalRaibos += amt;
            showOfflineModal(offlineTime, amt);
        }
    }
    updatePower();
    updateUI();
}

function showOfflineModal(time, amt) {
    elements.offModal.classList.remove('hidden');
    elements.offTime.textContent = formatTime(time);
    elements.offAmt.textContent = formatNumber(amt);
}

elements.offClose.onclick = () => elements.offModal.classList.add('hidden');

function showToast(msg, type) {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    elements.toastCont.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

function playClickSound(vol) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440 + Math.random() * 200, ctx.currentTime);
    gain.gain.setValueAtTime(0.05 * vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
}

elements.hrBtn.onclick = () => {
    if (confirm("HARD RESET? All progress will be deleted forever!")) {
        localStorage.removeItem(SAVE_KEY);
        location.reload();
    }
};

loadGame();
gameLoop();
