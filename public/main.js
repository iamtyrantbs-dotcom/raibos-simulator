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
        energy: 10000,
        energyMax: 10000,
        energyRegen: 5,
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
        energyMax: 10000,
        energyRegen: 5,
        regions: [
            { id: 'asia', name: 'Asia', buff: 'Click Power +50%', type: 'click', value: 0.5, cost: 10, d: "M138,15 L175,15 L188,35 L180,55 L165,72 L140,68 L128,50 L130,30 Z" },
            { id: 'europe', name: 'Europe', buff: 'Upgrade Cost -5%', type: 'cost', value: 0.05, cost: 50, d: "M95,12 L120,10 L128,28 L115,38 L100,35 L90,25 Z" },
            { id: 'na', name: 'North America', buff: 'Idle Power +50%', type: 'idle', value: 0.5, cost: 200, d: "M12,10 L68,10 L75,28 L70,48 L52,58 L22,55 L8,38 Z" },
            { id: 'sa', name: 'South America', buff: 'RP Gain +20%', type: 'rp', value: 0.2, cost: 500, d: "M38,62 L65,60 L72,80 L65,94 L48,96 L35,82 Z" },
            { id: 'africa', name: 'Africa', buff: 'Energy Regen +50%', type: 'energy', value: 0.5, cost: 1000, d: "M98,50 L122,48 L130,68 L125,88 L108,92 L94,78 L92,60 Z" },
            { id: 'oceania', name: 'Oceania', buff: 'Global Multiplier +50%', type: 'mult', value: 0.5, cost: 2500, d: "M162,68 L185,65 L190,82 L178,90 L162,84 Z" },
            { id: 'antarctica', name: 'Antarctica', buff: 'Global Multiplier x1.5', type: 'mult_total', value: 1.5, cost: 5000, d: "M40,90 L160,90 L165,98 L35,98 Z" },
            { id: 'atlantis', name: 'Atlantis', buff: 'All Production x2', type: 'all_prod', value: 2.0, cost: 7000, d: "M75,35 L90,30 L95,50 L80,55 Z" },
            { id: 'lemuria', name: 'Lemuria', buff: 'Click Power +200%', type: 'click', value: 2.0, cost: 8500, d: "M130,70 L150,75 L155,90 L135,85 Z" },
            { id: 'mu', name: 'Mu', buff: 'Global Multiplier x3', type: 'mult_total', value: 3.0, cost: 10000, d: "M10,60 L30,55 L35,75 L15,80 Z" }
        ]
    },
    {
        id: 'mars',
        name: 'Mars',
        color: '#ff6633',
        energyMax: 25000,
        energyRegen: 5,
        regions: [
            { id: 'valles', name: 'Valles Marineris', buff: 'Global Multiplier x2', type: 'mult_total', value: 2, cost: 1200, d: "M25,45 L80,32 L135,42 L165,62 L145,80 L75,72 Z" },
            { id: 'olympus', name: 'Olympus Mons', buff: 'Click Power +200%', type: 'click', value: 2.0, cost: 1800, d: "M78,15 L115,8 L128,25 L110,38 L82,35 Z" },
            { id: 'utopia', name: 'Utopia Planitia', buff: 'Idle Power +200%', type: 'idle', value: 2.0, cost: 2400, d: "M138,15 L180,22 L175,45 L145,48 L132,32 Z" },
            { id: 'hellas', name: 'Hellas Planitia', buff: 'Rebirth Points +100%', type: 'rp', value: 1.0, cost: 3000, d: "M38,62 L78,55 L88,82 L65,90 L40,85 Z" },
            { id: 'mars_poles', name: 'North Polar Cap', buff: 'Energy Regen x2', type: 'energy_mult', value: 2, cost: 4000, d: "M60,5 L145,5 L148,14 L58,14 Z" },
            { id: 'south_pole', name: 'South Polar Cap', buff: 'Energy Regen x2', type: 'energy_mult', value: 2, cost: 4000, d: "M55,90 L148,90 L150,98 L52,98 Z" },
            { id: 'elysium', name: 'Elysium Planitia', buff: 'All Production x1.5', type: 'all_prod', value: 1.5, cost: 3500, d: "M148,48 L182,40 L188,68 L162,72 L145,65 Z" },
            { id: 'argyre', name: 'Argyre Basin', buff: 'Upgrade Cost -15%', type: 'cost', value: 0.15, cost: 5000, d: "M30,70 L68,65 L72,85 L42,90 Z" },
            { id: 'tharsis', name: 'Tharsis Bulge', buff: 'Click Power +300%', type: 'click', value: 3.0, cost: 6000, d: "M38,35 L78,30 L82,55 L42,58 Z" },
            { id: 'mars_core', name: 'Martian Core', buff: 'Global Multiplier x5', type: 'mult_total', value: 5, cost: 9000, d: "M82,55 L135,42 L145,65 L88,82 L72,68 Z" }
        ]
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        color: '#ffcc99',
        energyMax: 60000,
        energyRegen: 5,
        regions: [
            { id: 'grs', name: 'Great Red Spot', buff: 'Global Multiplier x10', type: 'mult_total', value: 10, cost: 6000, d: "M72,45 Q100,28 145,48 T108,70 Z" },
            { id: 'europa', name: 'Europa', buff: 'All Production x5', type: 'all_prod', value: 5, cost: 8000, d: "M25,28 L60,18 L70,48 L38,58 Z" },
            { id: 'ganymede', name: 'Ganymede', buff: 'Upgrade Cost -20%', type: 'cost', value: 0.2, cost: 9999, d: "M128,15 L162,25 L155,55 L118,48 Z" },
            { id: 'io', name: 'Io', buff: 'Click Power +500%', type: 'click', value: 5.0, cost: 9999, d: "M45,68 L80,62 L85,88 L52,94 Z" },
            { id: 'callisto', name: 'Callisto', buff: 'Idle Power +500%', type: 'idle', value: 5.0, cost: 9999, d: "M150,62 L185,55 L188,82 L162,88 Z" },
            { id: 'band_north', name: 'Northern Bands', buff: 'Energy Regen x2.5', type: 'energy_mult', value: 2.5, cost: 9999, d: "M8,12 L192,12 L190,25 L10,25 Z" },
            { id: 'band_south', name: 'Southern Bands', buff: 'Energy Regen x2.5', type: 'energy_mult', value: 2.5, cost: 9999, d: "M8,75 L192,75 L190,88 L10,88 Z" },
            { id: 'polar_hex', name: 'Polar Hexagon', buff: 'Global Multiplier x15', type: 'mult_total', value: 15, cost: 9999, d: "M80,5 L120,5 L140,15 L120,25 L80,25 L60,15 Z" },
            { id: 'storm_belt', name: 'Equatorial Storm Belt', buff: 'Click Power +800%', type: 'click', value: 8.0, cost: 9999, d: "M10,38 L190,38 L188,52 L12,52 Z" },
            { id: 'jupiter_core', name: 'Metallic Core', buff: 'Global Multiplier x25', type: 'mult_total', value: 25, cost: 9999, d: "M70,28 L130,28 L140,55 L105,75 L65,55 Z" },
            { id: 'amalthea', name: 'Amalthea', buff: 'RP Gain x2', type: 'rp_mult', value: 2, cost: 9999, d: "M165,28 L188,22 L190,38 L170,42 Z" }
        ]
    },
    {
        id: 'saturn',
        name: 'Saturn',
        color: '#e6e600',
        energyMax: 120000,
        energyRegen: 5,
        regions: [
            { id: 'rings_a', name: 'A Ring', buff: 'Global Multiplier x30', type: 'mult_total', value: 30, cost: 9999, d: "M8,45 Q50,15 192,45 L190,52 Q50,22 10,52 Z" },
            { id: 'rings_b', name: 'B Ring (Brightest)', buff: 'Global Multiplier x50', type: 'mult_total', value: 50, cost: 9999, d: "M12,55 Q55,28 188,55 L186,62 Q52,35 14,62 Z" },
            { id: 'rings_c', name: 'C Ring', buff: 'Idle Power +800%', type: 'idle', value: 8.0, cost: 9999, d: "M15,38 Q55,8 185,38 L183,45 Q52,15 17,45 Z" },
            { id: 'titan', name: 'Titan', buff: 'Idle Power +1000%', type: 'idle', value: 10, cost: 9999, d: "M35,18 L72,12 L85,42 L48,48 Z" },
            { id: 'enceladus', name: 'Enceladus', buff: 'Energy Regen x3', type: 'energy_mult', value: 3, cost: 9999, d: "M118,58 L150,52 L158,82 L128,88 Z" },
            { id: 'mimas', name: 'Mimas', buff: 'Upgrade Cost -25%', type: 'cost', value: 0.25, cost: 9999, d: "M158,15 L182,10 L188,30 L165,35 Z" },
            { id: 'rhea', name: 'Rhea', buff: 'Click Power +1000%', type: 'click', value: 10.0, cost: 9999, d: "M38,68 L70,62 L75,88 L42,92 Z" },
            { id: 'dione', name: 'Dione', buff: 'RP Gain x3', type: 'rp_mult', value: 3, cost: 9999, d: "M155,62 L182,58 L185,80 L158,85 Z" },
            { id: 'saturn_poles', name: 'Saturn Storm Poles', buff: 'All Production x3', type: 'all_prod', value: 3, cost: 9999, d: "M70,5 L132,5 L135,15 L68,15 Z" },
            { id: 'cassini_div', name: 'Cassini Division', buff: 'Global Multiplier x80', type: 'mult_total', value: 80, cost: 9999, d: "M12,62 Q55,35 188,62 L186,68 Q52,42 14,68 Z" },
            { id: 'saturn_core', name: 'Saturn Core', buff: 'Global Multiplier x100', type: 'mult_total', value: 100, cost: 9999, d: "M72,25 L128,25 L140,68 L100,80 L60,68 Z" }
        ]
    },
    {
        id: 'neptune',
        name: 'Neptune',
        color: '#3366ff',
        energyMax: 250000,
        energyRegen: 5,
        regions: [
            { id: 'triton', name: 'Triton', buff: 'RP Gain x5', type: 'rp_mult', value: 5, cost: 9999, d: "M45,38 L85,28 L98,58 L58,68 Z" },
            { id: 'darkspot', name: 'Great Dark Spot', buff: 'Global Multiplier x500', type: 'mult_total', value: 500, cost: 9999, d: "M105,38 Q128,18 172,38 T132,58 Z" },
            { id: 'neptune_core', name: 'Frozen Core', buff: 'All Costs -50%', type: 'cost', value: 0.5, cost: 9999, d: "M75,68 L125,68 L122,94 L78,94 Z" },
            { id: 'nereid', name: 'Nereid', buff: 'Click Power +2000%', type: 'click', value: 20.0, cost: 9999, d: "M155,20 L182,15 L188,38 L162,42 Z" },
            { id: 'proteus', name: 'Proteus', buff: 'Idle Power +2000%', type: 'idle', value: 20.0, cost: 9999, d: "M15,50 L48,44 L52,68 L18,72 Z" },
            { id: 'polar_vortex', name: 'Polar Vortex', buff: 'Energy Regen x5', type: 'energy_mult', value: 5, cost: 9999, d: "M72,5 L128,5 L132,18 L68,18 Z" },
            { id: 'nep_ring', name: 'Adams Ring', buff: 'Global Multiplier x300', type: 'mult_total', value: 300, cost: 9999, d: "M10,32 Q50,5 190,32 L188,40 Q48,12 12,40 Z" },
            { id: 'storm_bands', name: 'Methane Storm Bands', buff: 'All Production x8', type: 'all_prod', value: 8, cost: 9999, d: "M10,45 L190,45 L188,58 L12,58 Z" },
            { id: 'nep_magnetic', name: 'Magnetic Pole', buff: 'Global Multiplier x800', type: 'mult_total', value: 800, cost: 9999, d: "M72,88 L128,88 L132,98 L68,98 Z" },
            { id: 'deep_ocean', name: 'Water-Ice Mantle', buff: 'Global Multiplier x10', type: 'mult_total', value: 10, cost: 9999, d: "M48,20 L152,20 L165,68 L100,80 L35,68 Z" }
        ]
    },
    {
        id: 'pluto',
        name: 'Pluto (Outer Rim)',
        color: '#ccccff',
        energyMax: 500000,
        energyRegen: 5,
        regions: [
            { id: 'charon', name: 'Charon', buff: 'Final Multiplier x1000', type: 'mult_total', value: 1000, cost: 9999, d: "M25,25 L65,25 L65,62 L25,62 Z" },
            { id: 'heart', name: 'Tombaugh Regio (The Heart)', buff: 'All Production x100', type: 'all_prod', value: 100, cost: 9999, d: "M95,38 Q118,18 142,38 L100,78 L58,38 Q82,18 95,38 Z" },
            { id: 'norgay', name: 'Norgay Montes', buff: 'Click Power +5000%', type: 'click', value: 50.0, cost: 9999, d: "M148,55 L182,48 L188,75 L158,80 Z" },
            { id: 'sputnik', name: 'Sputnik Planitia', buff: 'Idle Power +5000%', type: 'idle', value: 50.0, cost: 9999, d: "M58,38 L95,38 L100,78 L50,70 Z" },
            { id: 'pluto_poles', name: 'Polar Ice Plains', buff: 'Energy Regen x10', type: 'energy_mult', value: 10, cost: 9999, d: "M40,5 L165,5 L168,18 L38,18 Z" },
            { id: 'hydra', name: 'Hydra Moon', buff: 'RP Gain x10', type: 'rp_mult', value: 10, cost: 9999, d: "M165,22 L190,18 L192,40 L168,44 Z" },
            { id: 'nix_moon', name: 'Nix Moon', buff: 'Global Multiplier x10', type: 'mult_total', value: 10, cost: 9999, d: "M10,30 L35,25 L38,50 L12,54 Z" },
            { id: 'pluto_core', name: 'Ancient Frozen Core', buff: 'Global Multiplier x1000', type: 'mult_total', value: 1000, cost: 9999, d: "M65,25 L142,38 L158,80 L100,92 L40,70 L25,62 Z" }
        ]
    },
    {
        id: 'interstellar',
        name: 'Interstellar Space',
        color: '#aaaaaa',
        energyMax: 2000000,
        energyRegen: 10,
        regions: [
            { id: 'oort_cloud', name: 'The Oort Cloud', buff: 'Global Multiplier x10', type: 'mult_total', value: 10, cost: 9999, d: "M10,10 Q50,0 100,10 T190,10 L190,90 Q150,100 100,90 T10,90 Z" },
            { id: 'voyager_zone', name: 'Voyager Deadzone', buff: 'All Production x500', type: 'all_prod', value: 500, cost: 9999, d: "M20,40 L60,35 L65,65 L25,70 Z" },
            { id: 'rogue_planet', name: 'Wandering Rogue Planet', buff: 'Click Power +20,000%', type: 'click', value: 200.0, cost: 9999, d: "M140,40 L180,35 L185,65 L145,70 Z" },
            { id: 'heliopause', name: 'Heliopause Border', buff: 'Energy Regen x20', type: 'energy_mult', value: 20, cost: 9999, d: "M70,20 L130,20 L135,80 L65,80 Z" },
            { id: 'dark_matter_sea', name: 'Dark Matter Sea', buff: 'Global Multiplier x50', type: 'mult_total', value: 50, cost: 9999, d: "M80,30 L120,30 L125,70 L75,70 Z" }
        ]
    },
    {
        id: 'alpha_centauri',
        name: 'Alpha Centauri System',
        color: '#ffcc66',
        energyMax: 10000000,
        energyRegen: 50,
        regions: [
            { id: 'proxima_b', name: 'Proxima Centauri b', buff: 'Global Multiplier x200', type: 'mult_total', value: 200, cost: 9999, d: "M30,30 Q60,10 90,30 L85,70 Q55,90 25,70 Z" },
            { id: 'alpha_a', name: 'Centauri A Core', buff: 'Idle Power +100,000%', type: 'idle', value: 1000.0, cost: 9999, d: "M110,30 Q140,10 170,30 L165,70 Q135,90 105,70 Z" },
            { id: 'alpha_b', name: 'Centauri B Core', buff: 'Click Power +100,000%', type: 'click', value: 1000.0, cost: 9999, d: "M90,30 L110,30 L105,70 L85,70 Z" },
            { id: 'binary_bridge', name: 'Binary Star Bridge', buff: 'All Production x10', type: 'all_prod', value: 10, cost: 9999, d: "M70,40 L130,40 L125,60 L65,60 Z" },
            { id: 'centauri_dyson', name: 'Dyson Sphere Prototype', buff: 'Global Multiplier x1,000', type: 'mult_total', value: 1000, cost: 9999, d: "M50,15 L150,15 L155,85 L45,85 Z" }
        ]
    },
    {
        id: 'galactic_center',
        name: 'The Galactic Center',
        color: '#ff33ff',
        energyMax: 50000000,
        energyRegen: 200,
        regions: [
            { id: 'orion_nebula', name: 'Orion Nebula Birthplace', buff: 'All Production x25', type: 'all_prod', value: 25, cost: 9999, d: "M10,20 Q60,5 110,20 L105,40 Q55,25 5,40 Z" },
            { id: 'pillars_creation', name: 'Pillars of Creation', buff: 'Global Multiplier x5,000', type: 'mult_total', value: 5000, cost: 9999, d: "M130,10 L160,10 L165,90 L125,90 Z" },
            { id: 'neutron_star', name: 'Pulsar Matrix', buff: 'RP Gain x100', type: 'rp_mult', value: 100, cost: 9999, d: "M20,60 L80,55 L85,85 L15,90 Z" },
            { id: 'accretion_disk', name: 'Accretion Disk', buff: 'Energy Regen x100', type: 'energy_mult', value: 100, cost: 9999, d: "M40,30 Q100,10 160,30 L155,70 Q95,90 35,70 Z" },
            { id: 'sagittarius_a', name: 'Sagittarius A* (Supermassive)', buff: 'Global Multiplier x100,000', type: 'mult_total', value: 100000, cost: 9999, d: "M70,30 A30,30 0 1,1 130,70 A30,30 0 1,1 70,30 Z" }
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
    },
    {
        "id": "c21",
        "name": "Raibos Knuckle Strike",
        "desc": "+9.8e+29 Raibos/click",
        "baseCost": 1e+37,
        "costMul": 1.482,
        "value": 9.765625e+29
    },
    {
        "id": "c22",
        "name": "Raibos Thunder Clap",
        "desc": "+4.9e+31 Raibos/click",
        "baseCost": 1e+39,
        "costMul": 1.474,
        "value": 4.8828125e+31
    },
    {
        "id": "c23",
        "name": "Raibos Shockwave",
        "desc": "+2.4e+33 Raibos/click",
        "baseCost": 1e+41,
        "costMul": 1.466,
        "value": 2.44140625e+33
    },
    {
        "id": "c24",
        "name": "Raibos Gravity Well",
        "desc": "+1.2e+35 Raibos/click",
        "baseCost": 1e+43,
        "costMul": 1.458,
        "value": 1.220703125e+35
    },
    {
        "id": "c25",
        "name": "Raibos Rift Breaker",
        "desc": "+6.1e+36 Raibos/click",
        "baseCost": 1.0000000000000001e+45,
        "costMul": 1.45,
        "value": 6.103515625e+36
    },
    {
        "id": "c26",
        "name": "Raibos Time Slicer",
        "desc": "+3.1e+38 Raibos/click",
        "baseCost": 1e+47,
        "costMul": 1.442,
        "value": 3.0517578125e+38
    },
    {
        "id": "c27",
        "name": "Raibos Void Fist",
        "desc": "+1.5e+40 Raibos/click",
        "baseCost": 1.0000000000000001e+49,
        "costMul": 1.434,
        "value": 1.52587890625e+40
    },
    {
        "id": "c28",
        "name": "Raibos Infinite Touch",
        "desc": "+7.6e+41 Raibos/click",
        "baseCost": 1e+51,
        "costMul": 1.426,
        "value": 7.62939453125e+41
    },
    {
        "id": "c29",
        "name": "Raibos Collapse Strike",
        "desc": "+3.8e+43 Raibos/click",
        "baseCost": 1e+53,
        "costMul": 1.418,
        "value": 3.814697265625e+43
    },
    {
        "id": "c30",
        "name": "Raibos Cosmic Hammer",
        "desc": "+7.6e+45 Raibos/click",
        "baseCost": 5e+55,
        "costMul": 1.41,
        "value": 7.62939453125e+45
    },
    {
        "id": "c31",
        "name": "Raibos Astral Impact",
        "desc": "+1.5e+48 Raibos/click",
        "baseCost": 2.5000000000000002e+58,
        "costMul": 1.402,
        "value": 1.52587890625e+48
    },
    {
        "id": "c32",
        "name": "Raibos Ethereal Smash",
        "desc": "+3.1e+50 Raibos/click",
        "baseCost": 1.25e+61,
        "costMul": 1.394,
        "value": 3.0517578125e+50
    },
    {
        "id": "c33",
        "name": "Raibos Divine Judgement",
        "desc": "+6.1e+52 Raibos/click",
        "baseCost": 6.25e+63,
        "costMul": 1.386,
        "value": 6.103515625e+52
    },
    {
        "id": "c34",
        "name": "Raibos Absolute Obliteration",
        "desc": "+1.2e+55 Raibos/click",
        "baseCost": 3.125e+66,
        "costMul": 1.378,
        "value": 1.220703125e+55
    },
    {
        "id": "c35",
        "name": "Raibos Eternal Barrage",
        "desc": "+2.4e+57 Raibos/click",
        "baseCost": 1.5624999999999999e+69,
        "costMul": 1.37,
        "value": 2.44140625e+57
    },
    {
        "id": "c36",
        "name": "Raibos Primal Upheaval",
        "desc": "+4.9e+59 Raibos/click",
        "baseCost": 7.8125e+71,
        "costMul": 1.362,
        "value": 4.8828125e+59
    },
    {
        "id": "c37",
        "name": "Raibos Ancient Detonation",
        "desc": "+9.8e+61 Raibos/click",
        "baseCost": 3.90625e+74,
        "costMul": 1.354,
        "value": 9.765625e+61
    },
    {
        "id": "c38",
        "name": "Raibos Transcendent Eruption",
        "desc": "+2.0e+64 Raibos/click",
        "baseCost": 1.953125e+77,
        "costMul": 1.346,
        "value": 1.953125e+64
    },
    {
        "id": "c39",
        "name": "Raibos Cataclysm",
        "desc": "+3.9e+66 Raibos/click",
        "baseCost": 9.765625e+79,
        "costMul": 1.338,
        "value": 3.90625e+66
    },
    {
        "id": "c40",
        "name": "Raibos Nebula Crash",
        "desc": "+7.8e+68 Raibos/click",
        "baseCost": 4.8828125e+82,
        "costMul": 1.33,
        "value": 7.8125e+68
    },
    {
        "id": "c41",
        "name": "Raibos Stellar Desolation",
        "desc": "+1.6e+71 Raibos/click",
        "baseCost": 2.44140625e+85,
        "costMul": 1.322,
        "value": 1.5625e+71
    },
    {
        "id": "c42",
        "name": "Raibos Galactic Rupture",
        "desc": "+3.1e+73 Raibos/click",
        "baseCost": 1.220703125e+88,
        "costMul": 1.314,
        "value": 3.125e+73
    },
    {
        "id": "c43",
        "name": "Raibos Universal Collapse",
        "desc": "+6.2e+75 Raibos/click",
        "baseCost": 6.103515625e+90,
        "costMul": 1.306,
        "value": 6.25e+75
    },
    {
        "id": "c44",
        "name": "Raibos Multiverse Fracture",
        "desc": "+1.2e+78 Raibos/click",
        "baseCost": 3.0517578125e+93,
        "costMul": 1.298,
        "value": 1.25e+78
    },
    {
        "id": "c45",
        "name": "Raibos Dimension Shatter",
        "desc": "+6.2e+80 Raibos/click",
        "baseCost": 3.0517578125e+96,
        "costMul": 1.29,
        "value": 6.25e+80
    },
    {
        "id": "c46",
        "name": "Raibos Chrono Annihilation",
        "desc": "+3.1e+83 Raibos/click",
        "baseCost": 3.0517578125e+99,
        "costMul": 1.282,
        "value": 3.125e+83
    },
    {
        "id": "c47",
        "name": "Raibos Void Armageddon",
        "desc": "+1.6e+86 Raibos/click",
        "baseCost": 3.0517578125e+102,
        "costMul": 1.274,
        "value": 1.5625e+86
    },
    {
        "id": "c48",
        "name": "Raibos Infinite Recursion",
        "desc": "+7.8e+88 Raibos/click",
        "baseCost": 3.0517578125e+105,
        "costMul": 1.266,
        "value": 7.8125e+88
    },
    {
        "id": "c49",
        "name": "Raibos Event Horizon",
        "desc": "+3.9e+91 Raibos/click",
        "baseCost": 3.0517578125e+108,
        "costMul": 1.258,
        "value": 3.90625e+91
    },
    {
        "id": "c50",
        "name": "Raibos Cosmic Reckoning",
        "desc": "+2.0e+94 Raibos/click",
        "baseCost": 3.0517578125e+111,
        "costMul": 1.25,
        "value": 1.953125e+94
    },
    {
        "id": "c51",
        "name": "Raibos Astral Extinction",
        "desc": "+9.8e+96 Raibos/click",
        "baseCost": 3.0517578125e+114,
        "costMul": 1.242,
        "value": 9.765625e+96
    },
    {
        "id": "c52",
        "name": "Raibos Ethereal Devastation",
        "desc": "+4.9e+99 Raibos/click",
        "baseCost": 3.0517578125e+117,
        "costMul": 1.234,
        "value": 4.8828125e+99
    },
    {
        "id": "c53",
        "name": "Raibos God Slayer",
        "desc": "+2.4e+102 Raibos/click",
        "baseCost": 3.0517578125e+120,
        "costMul": 1.226,
        "value": 2.44140625e+102
    },
    {
        "id": "c54",
        "name": "Raibos Absolute Dominion",
        "desc": "+1.2e+105 Raibos/click",
        "baseCost": 3.0517578125e+123,
        "costMul": 1.218,
        "value": 1.220703125e+105
    },
    {
        "id": "c55",
        "name": "Raibos Eternal Conquest",
        "desc": "+6.1e+107 Raibos/click",
        "baseCost": 3.0517578125e+126,
        "costMul": 1.21,
        "value": 6.103515625e+107
    },
    {
        "id": "c56",
        "name": "Raibos Primal Sovereignty",
        "desc": "+3.1e+110 Raibos/click",
        "baseCost": 3.0517578125e+129,
        "costMul": 1.202,
        "value": 3.0517578125e+110
    },
    {
        "id": "c57",
        "name": "Raibos Ancient Supremacy",
        "desc": "+1.5e+113 Raibos/click",
        "baseCost": 3.0517578125e+132,
        "costMul": 1.194,
        "value": 1.52587890625e+113
    },
    {
        "id": "c58",
        "name": "Raibos Transcendent Mastery",
        "desc": "+7.6e+115 Raibos/click",
        "baseCost": 3.0517578125e+135,
        "costMul": 1.186,
        "value": 7.62939453125e+115
    },
    {
        "id": "c59",
        "name": "Raibos Final Apotheosis",
        "desc": "+3.8e+118 Raibos/click",
        "baseCost": 3.0517578125e+138,
        "costMul": 1.178,
        "value": 3.814697265625e+118
    },
    {
        "id": "c60",
        "name": "Raibos Nebula Genesis",
        "desc": "+1.9e+121 Raibos/click",
        "baseCost": 3.0517578125e+141,
        "costMul": 1.17,
        "value": 1.9073486328125e+121
    },
    {
        "id": "c61",
        "name": "Raibos Star Forge",
        "desc": "+9.5e+123 Raibos/click",
        "baseCost": 3.0517578125e+144,
        "costMul": 1.162,
        "value": 9.5367431640625e+123
    },
    {
        "id": "c62",
        "name": "Raibos Galaxy Forge",
        "desc": "+4.8e+126 Raibos/click",
        "baseCost": 3.0517578125e+147,
        "costMul": 1.154,
        "value": 4.76837158203125e+126
    },
    {
        "id": "c63",
        "name": "Raibos Universe Engine",
        "desc": "+2.4e+129 Raibos/click",
        "baseCost": 3.0517578125e+150,
        "costMul": 1.15,
        "value": 2.384185791015625e+129
    },
    {
        "id": "c64",
        "name": "Raibos Multiverse Engine",
        "desc": "+1.2e+132 Raibos/click",
        "baseCost": 3.0517578125e+153,
        "costMul": 1.15,
        "value": 1.1920928955078125e+132
    },
    {
        "id": "c65",
        "name": "Raibos Omnipotence",
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
        "name": "Raibos Temporal Engine",
        "desc": "+6.0e+5 Raibos/sec",
        "baseCost": 32000000,
        "costMul": 1.37,
        "value": 600000
    },
    {
        "id": "i7",
        "name": "Raibos Void Harvester",
        "desc": "+2.4e+7 Raibos/sec",
        "baseCost": 2560000000,
        "costMul": 1.365,
        "value": 24000000
    },
    {
        "id": "i8",
        "name": "Raibos Infinity Core",
        "desc": "+9.6e+8 Raibos/sec",
        "baseCost": 204800000000,
        "costMul": 1.36,
        "value": 960000000
    },
    {
        "id": "i9",
        "name": "Raibos Singularity Engine",
        "desc": "+3.8e+10 Raibos/sec",
        "baseCost": 16384000000000,
        "costMul": 1.355,
        "value": 38400000000
    },
    {
        "id": "i10",
        "name": "Raibos Cosmic Turbine",
        "desc": "+1.5e+12 Raibos/sec",
        "baseCost": 1310720000000000,
        "costMul": 1.35,
        "value": 1536000000000
    },
    {
        "id": "i11",
        "name": "Raibos Astral Furnace",
        "desc": "+6.1e+13 Raibos/sec",
        "baseCost": 104857600000000000,
        "costMul": 1.345,
        "value": 61440000000000
    },
    {
        "id": "i12",
        "name": "Raibos Ethereal Condenser",
        "desc": "+2.5e+15 Raibos/sec",
        "baseCost": 8388608000000000000,
        "costMul": 1.34,
        "value": 2457600000000000
    },
    {
        "id": "i13",
        "name": "Raibos Divine Incubator",
        "desc": "+9.8e+16 Raibos/sec",
        "baseCost": 671088640000000000000,
        "costMul": 1.335,
        "value": 98304000000000000
    },
    {
        "id": "i14",
        "name": "Raibos Absolute Refinery",
        "desc": "+3.9e+18 Raibos/sec",
        "baseCost": 5.36870912e+22,
        "costMul": 1.33,
        "value": 3932160000000000000
    },
    {
        "id": "i15",
        "name": "Raibos Eternal Dynamo",
        "desc": "+1.6e+20 Raibos/sec",
        "baseCost": 4.294967296e+24,
        "costMul": 1.325,
        "value": 157286400000000000000
    },
    {
        "id": "i16",
        "name": "Raibos Primal Catalyst",
        "desc": "+6.3e+21 Raibos/sec",
        "baseCost": 3.4359738368e+26,
        "costMul": 1.32,
        "value": 6.291456e+21
    },
    {
        "id": "i17",
        "name": "Raibos Ancient Accelerator",
        "desc": "+2.5e+23 Raibos/sec",
        "baseCost": 2.74877906944e+28,
        "costMul": 1.315,
        "value": 2.5165824e+23
    },
    {
        "id": "i18",
        "name": "Raibos Transcendent Collider",
        "desc": "+1.0e+25 Raibos/sec",
        "baseCost": 2.199023255552e+30,
        "costMul": 1.31,
        "value": 1.00663296e+25
    },
    {
        "id": "i19",
        "name": "Raibos Perpetual Reactor",
        "desc": "+4.0e+26 Raibos/sec",
        "baseCost": 1.7592186044416e+32,
        "costMul": 1.305,
        "value": 4.02653184e+26
    },
    {
        "id": "i20",
        "name": "Raibos Nebula Incinerator",
        "desc": "+4.0e+28 Raibos/sec",
        "baseCost": 3.5184372088832e+34,
        "costMul": 1.3,
        "value": 4.02653184e+28
    },
    {
        "id": "i21",
        "name": "Raibos Star Igniter",
        "desc": "+4.0e+30 Raibos/sec",
        "baseCost": 7.0368744177664e+36,
        "costMul": 1.295,
        "value": 4.02653184e+30
    },
    {
        "id": "i22",
        "name": "Raibos Galaxy Converter",
        "desc": "+4.0e+32 Raibos/sec",
        "baseCost": 1.40737488355328e+39,
        "costMul": 1.29,
        "value": 4.02653184e+32
    },
    {
        "id": "i23",
        "name": "Raibos Universe Transformer",
        "desc": "+4.0e+34 Raibos/sec",
        "baseCost": 2.81474976710656e+41,
        "costMul": 1.285,
        "value": 4.02653184e+34
    },
    {
        "id": "i24",
        "name": "Raibos Multiverse Superconductor",
        "desc": "+4.0e+36 Raibos/sec",
        "baseCost": 5.62949953421312e+43,
        "costMul": 1.28,
        "value": 4.02653184e+36
    },
    {
        "id": "i25",
        "name": "Raibos Dimension Splitter",
        "desc": "+4.0e+38 Raibos/sec",
        "baseCost": 1.125899906842624e+46,
        "costMul": 1.275,
        "value": 4.02653184e+38
    },
    {
        "id": "i26",
        "name": "Raibos Chrono Amplifier",
        "desc": "+4.0e+40 Raibos/sec",
        "baseCost": 2.251799813685248e+48,
        "costMul": 1.27,
        "value": 4.02653184e+40
    },
    {
        "id": "i27",
        "name": "Raibos Void Reactor Zero",
        "desc": "+4.0e+42 Raibos/sec",
        "baseCost": 4.503599627370496e+50,
        "costMul": 1.265,
        "value": 4.02653184e+42
    },
    {
        "id": "i28",
        "name": "Raibos Boundless Reactor",
        "desc": "+4.0e+44 Raibos/sec",
        "baseCost": 9.007199254740992e+52,
        "costMul": 1.26,
        "value": 4.02653184e+44
    },
    {
        "id": "i29",
        "name": "Raibos Black Hole Tap",
        "desc": "+4.0e+46 Raibos/sec",
        "baseCost": 1.8014398509481983e+55,
        "costMul": 1.255,
        "value": 4.02653184e+46
    },
    {
        "id": "i30",
        "name": "Raibos Big Bang Harvester",
        "desc": "+4.0e+48 Raibos/sec",
        "baseCost": 3.602879701896397e+57,
        "costMul": 1.25,
        "value": 4.02653184e+48
    },
    {
        "id": "i31",
        "name": "Raibos Astral Web",
        "desc": "+4.0e+50 Raibos/sec",
        "baseCost": 7.205759403792794e+59,
        "costMul": 1.245,
        "value": 4.02653184e+50
    },
    {
        "id": "i32",
        "name": "Raibos Phantom Mill",
        "desc": "+4.0e+52 Raibos/sec",
        "baseCost": 1.4411518807585588e+62,
        "costMul": 1.24,
        "value": 4.02653184e+52
    },
    {
        "id": "i33",
        "name": "Raibos Holy Forge",
        "desc": "+4.0e+54 Raibos/sec",
        "baseCost": 2.8823037615171176e+64,
        "costMul": 1.235,
        "value": 4.02653184e+54
    },
    {
        "id": "i34",
        "name": "Raibos Absolute Foundry",
        "desc": "+4.0e+56 Raibos/sec",
        "baseCost": 5.764607523034235e+66,
        "costMul": 1.23,
        "value": 4.02653184e+56
    },
    {
        "id": "i35",
        "name": "Raibos Eternal Matrix",
        "desc": "+4.0e+58 Raibos/sec",
        "baseCost": 1.152921504606847e+69,
        "costMul": 1.225,
        "value": 4.02653184e+58
    },
    {
        "id": "i36",
        "name": "Raibos Primal Nexus",
        "desc": "+4.0e+60 Raibos/sec",
        "baseCost": 2.305843009213694e+71,
        "costMul": 1.22,
        "value": 4.02653184e+60
    },
    {
        "id": "i37",
        "name": "Raibos Ancient Grid",
        "desc": "+4.0e+62 Raibos/sec",
        "baseCost": 4.611686018427388e+73,
        "costMul": 1.215,
        "value": 4.02653184e+62
    },
    {
        "id": "i38",
        "name": "Raibos Transcendent Array",
        "desc": "+4.0e+64 Raibos/sec",
        "baseCost": 9.223372036854776e+75,
        "costMul": 1.21,
        "value": 4.02653184e+64
    },
    {
        "id": "i39",
        "name": "Raibos Omega Reactor",
        "desc": "+4.0e+66 Raibos/sec",
        "baseCost": 1.8446744073709553e+78,
        "costMul": 1.205,
        "value": 4.02653184e+66
    },
    {
        "id": "i40",
        "name": "Raibos Nebula Crucible",
        "desc": "+1.6e+69 Raibos/sec",
        "baseCost": 1.4757395258967643e+81,
        "costMul": 1.2,
        "value": 1.610612736e+69
    },
    {
        "id": "i41",
        "name": "Raibos Pulsar Array",
        "desc": "+6.4e+71 Raibos/sec",
        "baseCost": 1.1805916207174114e+84,
        "costMul": 1.195,
        "value": 6.442450944e+71
    },
    {
        "id": "i42",
        "name": "Raibos Quasar Tap",
        "desc": "+2.6e+74 Raibos/sec",
        "baseCost": 9.444732965739291e+86,
        "costMul": 1.19,
        "value": 2.5769803776e+74
    },
    {
        "id": "i43",
        "name": "Raibos Dark Matter Conduit",
        "desc": "+1.0e+77 Raibos/sec",
        "baseCost": 7.555786372591433e+89,
        "costMul": 1.185,
        "value": 1.03079215104e+77
    },
    {
        "id": "i44",
        "name": "Raibos Quantum Weave",
        "desc": "+4.1e+79 Raibos/sec",
        "baseCost": 6.044629098073146e+92,
        "costMul": 1.18,
        "value": 4.12316860416e+79
    },
    {
        "id": "i45",
        "name": "Raibos Tesseract Engine",
        "desc": "+1.6e+82 Raibos/sec",
        "baseCost": 4.835703278458517e+95,
        "costMul": 1.175,
        "value": 1.649267441664e+82
    },
    {
        "id": "i46",
        "name": "Raibos Temporal Distillery",
        "desc": "+6.6e+84 Raibos/sec",
        "baseCost": 3.868562622766813e+98,
        "costMul": 1.17,
        "value": 6.597069766656e+84
    },
    {
        "id": "i47",
        "name": "Raibos Dark Energy Siphon",
        "desc": "+2.6e+87 Raibos/sec",
        "baseCost": 3.0948500982134505e+101,
        "costMul": 1.165,
        "value": 2.6388279066624e+87
    },
    {
        "id": "i48",
        "name": "Raibos Möbius Generator",
        "desc": "+1.1e+90 Raibos/sec",
        "baseCost": 2.4758800785707605e+104,
        "costMul": 1.16,
        "value": 1.0555311626649602e+90
    },
    {
        "id": "i49",
        "name": "Raibos Hawking Radiator",
        "desc": "+4.2e+92 Raibos/sec",
        "baseCost": 1.9807040628566084e+107,
        "costMul": 1.155,
        "value": 4.222124650659841e+92
    },
    {
        "id": "i50",
        "name": "Raibos Cosmic Web Weaver",
        "desc": "+1.7e+95 Raibos/sec",
        "baseCost": 1.5845632502852866e+110,
        "costMul": 1.15,
        "value": 1.6888498602639362e+95
    },
    {
        "id": "i51",
        "name": "Raibos Astral Vortex",
        "desc": "+6.8e+97 Raibos/sec",
        "baseCost": 1.2676506002282293e+113,
        "costMul": 1.15,
        "value": 6.755399441055745e+97
    },
    {
        "id": "i52",
        "name": "Raibos Spirit Engine",
        "desc": "+2.7e+100 Raibos/sec",
        "baseCost": 1.0141204801825834e+116,
        "costMul": 1.15,
        "value": 2.702159776422298e+100
    },
    {
        "id": "i53",
        "name": "Raibos Heaven Furnace",
        "desc": "+1.1e+103 Raibos/sec",
        "baseCost": 8.112963841460666e+118,
        "costMul": 1.15,
        "value": 1.0808639105689192e+103
    },
    {
        "id": "i54",
        "name": "Raibos Origin Reactor",
        "desc": "+4.3e+105 Raibos/sec",
        "baseCost": 6.490371073168533e+121,
        "costMul": 1.15,
        "value": 4.323455642275677e+105
    },
    {
        "id": "i55",
        "name": "Raibos Perpetual Sun",
        "desc": "+1.7e+108 Raibos/sec",
        "baseCost": 5.192296858534826e+124,
        "costMul": 1.15,
        "value": 1.7293822569102706e+108
    },
    {
        "id": "i56",
        "name": "Raibos Ur-Reactor",
        "desc": "+6.9e+110 Raibos/sec",
        "baseCost": 4.153837486827861e+127,
        "costMul": 1.15,
        "value": 6.917529027641082e+110
    },
    {
        "id": "i57",
        "name": "Raibos Ancient Colossus",
        "desc": "+2.8e+113 Raibos/sec",
        "baseCost": 3.323069989462289e+130,
        "costMul": 1.15,
        "value": 2.767011611056433e+113
    },
    {
        "id": "i58",
        "name": "Raibos Apex Turbine",
        "desc": "+1.1e+116 Raibos/sec",
        "baseCost": 2.658455991569831e+133,
        "costMul": 1.15,
        "value": 1.1068046444225731e+116
    },
    {
        "id": "i59",
        "name": "Raibos Final Crucible",
        "desc": "+4.4e+118 Raibos/sec",
        "baseCost": 2.1267647932558648e+136,
        "costMul": 1.15,
        "value": 4.427218577690293e+118
    },
    {
        "id": "i60",
        "name": "Raibos Nebula Heart",
        "desc": "+1.8e+121 Raibos/sec",
        "baseCost": 1.7014118346046917e+139,
        "costMul": 1.15,
        "value": 1.770887431076117e+121
    },
    {
        "id": "i61",
        "name": "Raibos Stellar Womb",
        "desc": "+7.1e+123 Raibos/sec",
        "baseCost": 1.3611294676837533e+142,
        "costMul": 1.15,
        "value": 7.083549724304469e+123
    },
    {
        "id": "i62",
        "name": "Raibos Galactic Chorus",
        "desc": "+2.8e+126 Raibos/sec",
        "baseCost": 1.0889035741470026e+145,
        "costMul": 1.15,
        "value": 2.8334198897217874e+126
    },
    {
        "id": "i63",
        "name": "Raibos Universal Hum",
        "desc": "+1.1e+129 Raibos/sec",
        "baseCost": 8.71122859317602e+147,
        "costMul": 1.15,
        "value": 1.133367955888715e+129
    },
    {
        "id": "i64",
        "name": "Raibos Omniversal Pulse",
        "desc": "+4.5e+131 Raibos/sec",
        "baseCost": 6.968982874540817e+150,
        "costMul": 1.15,
        "value": 4.53347182355486e+131
    },
    {
        "id": "i65",
        "name": "Raibos The Final Reactor",
        "desc": "+1.8e+134 Raibos/sec",
        "baseCost": 5.575186299632653e+153,
        "costMul": 1.15,
        "value": 1.813388729421944e+134
    },
    {
        "id": "i66",
        "name": "Raibos Chrono Singularity Plant",
        "desc": "+7.3e+136 Raibos/sec",
        "baseCost": 4.4601490397061224e+156,
        "costMul": 1.15,
        "value": 7.253554917687776e+136
    },
    {
        "id": "i67",
        "name": "Raibos Void Sector Omega",
        "desc": "+2.9e+139 Raibos/sec",
        "baseCost": 3.568119231764898e+159,
        "costMul": 1.15,
        "value": 2.90142196707511e+139
    },
    {
        "id": "i68",
        "name": "Raibos Infinite Loop Station",
        "desc": "+1.2e+142 Raibos/sec",
        "baseCost": 2.8544953854119187e+162,
        "costMul": 1.15,
        "value": 1.160568786830044e+142
    },
    {
        "id": "i69",
        "name": "Raibos Singularity Supernova",
        "desc": "+4.6e+144 Raibos/sec",
        "baseCost": 2.283596308329535e+165,
        "costMul": 1.15,
        "value": 4.642275147320176e+144
    },
    {
        "id": "i70",
        "name": "Raibos The Eternal Heartbeat",
        "desc": "+1.9e+147 Raibos/sec",
        "baseCost": 1.8268770466636279e+168,
        "costMul": 1.15,
        "value": 1.8569100589280706e+147
    }
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
    { id: 'a16', title: 'Vanguard', req: () => gameState.invasion.conqueredRegions.length >= 5, desc: 'Conquer 5 Regions', bonus: 2.0 },
    { id: 'a17', title: 'Galactic Pioneer', req: () => gameState.invasion.currentPlanet >= 1, desc: 'Conquer your first planet (Earth)', bonus: 5.0 },
    { id: 'a18', title: 'Imperial Fleet', req: () => gameState.invasion.conqueredRegions.length >= 25, desc: 'Conquer 25 Regions across the solar system', bonus: 15.0 },
    { id: 'a19', title: 'Universal Wealth', req: () => gameState.totalRaibos >= 1e33, desc: 'Earn 1 Decillion (1e33) Raibos', bonus: 100.0 },
 
    // Hidden Achievements
    { id: 'h1', title: 'Red Conquest', req: () => gameState.invasion.currentPlanet >= 2, desc: 'Conquer Mars.', bonus: 50.0, hidden: true },
    { id: 'h2', title: 'Jovian Giant', req: () => gameState.invasion.currentPlanet >= 3, desc: 'Conquer Jupiter.', bonus: 100.0, hidden: true },
    { id: 'h3', title: 'Pinnacle of Idle', req: () => gameState.upgradeLevels['i15'] >= 1, desc: 'Unlock the Eternal Dynamo.', bonus: 25.0, hidden: true },
    { id: 'h4', title: 'Time Traveler', req: () => gameState.timeSkipsUsed >= 5, desc: 'Catch the Golden Chrono-Raibos 5 times.', bonus: 10.0, hidden: true },
    { id: 'h5', title: 'Hardcore Grinder', req: () => gameState.rebirthPoints >= 100000, desc: 'Reach 100,000 Rebirth Points.', bonus: 200.0, hidden: true },
    { id: 'h6', title: 'Lord of the Rings', req: () => gameState.invasion.currentPlanet >= 4, desc: 'Conquer Saturn.', bonus: 30.0, hidden: true },
    { id: 'h7', title: 'Click Omega', req: () => gameState.upgradeLevels['c12'] >= 1, desc: 'Unlock the Omega End click upgrade.', bonus: 25.0, hidden: true },
    { id: 'h8', title: 'Absolute Zero', req: () => gameState.upgradeLevels['c1'] >= 100, desc: 'Reach level 100 on the first Click Upgrade.', bonus: 15.0, hidden: true },
    { id: 'h9', title: 'Neptunian Depth', req: () => gameState.invasion.currentPlanet >= 5, desc: 'Conquer Neptune.', bonus: 30.0, hidden: true },
    { id: 'h10', title: 'System Sovereign', req: () => gameState.invasion.currentPlanet === 5 && planetsData[5].regions.every(r => gameState.invasion.conqueredRegions.includes(r.id)), desc: 'Conquer the entire Solar System (Pluto).', bonus: 500.0, hidden: true }
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
    
    gameState.invasion.energy = Math.min(gameState.invasion.energyMax || 10000, (gameState.invasion.energy || 0) + regen * dt);

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
                energy: 10000,
                energyMax: 10000,
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
    const region = planetsData[gameState.invasion.currentPlanet].regions.find(r => r.id === regionId);
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

    // Dynamic map generation
    const mapSvg = document.getElementById('invasion-map-svg');
    if (mapSvg) {
        mapSvg.innerHTML = '';
        planet.regions.forEach(r => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('id', `region-${r.id}`);
            path.setAttribute('d', r.d);
            path.setAttribute('class', 'region-path');
            
            const isConquered = gameState.invasion.conqueredRegions.includes(r.id);
            if (isConquered) {
                path.classList.add('conquered');
            }
            if (selectedRegionId === r.id) {
                path.classList.add('selected');
            }
            
            path.addEventListener('click', () => selectRegion(r.id));
            mapSvg.appendChild(path);
        });
    }

    // Dynamic region list generation
    const listContainer = document.getElementById('region-list-container');
    if (listContainer) {
        listContainer.innerHTML = '';
        planet.regions.forEach(r => {
            const div = document.createElement('div');
            div.className = 'region-list-item';
            
            const isConquered = gameState.invasion.conqueredRegions.includes(r.id);
            if (isConquered) {
                div.classList.add('conquered');
            }
            if (selectedRegionId === r.id) {
                div.classList.add('selected');
            }
            
            div.innerHTML = `
                <div class="region-list-item-name">${r.name}</div>
                <div>${isConquered ? 'Conquered' : `Cost: ${r.cost}`}</div>
            `;
            
            div.addEventListener('click', () => selectRegion(r.id));
            listContainer.appendChild(div);
        });
    }

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
    const region = planetsData[gameState.invasion.currentPlanet].regions.find(r => r.id === selectedRegionId);
    if (!region || gameState.invasion.energy < region.cost) return;

    gameState.invasion.energy -= region.cost;
    let progress = gameState.invasion.regionProgress[region.id] || 0;
    
    // Random invasion progress between 1 and 30
    const progressGain = Math.floor(Math.random() * 30) + 1;
    progress += progressGain;
    
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

// SVG click listeners are now handled dynamically in updateInvasionUI()

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
