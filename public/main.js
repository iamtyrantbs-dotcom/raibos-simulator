let gameState = {
    activeSkills: {
        charges: 0,
        timer: 0,
        unlocked: {}, // skillId -> count
        equipped: [], // array of up to 2 skillIds
        active: null,
        activeDuration: 0,
        cooldowns: {}, // skillId -> remaining seconds
        totalSkillsUsed: 0,
        totalSkillPulls: 0
    },
    raibos: 0,
    totalRaibos: 0, 
    totalClicks: 0,
    clickPower: 1,
    idlePower: 0,
    upgradeLevels: {},
    rebirthPoints: 0,
    achievements: [],
    timeSkipsUsed: 0,
    constellation: {},
    asteroids: {
        totalPulls: 0,
        inventory: {} // asteroidId -> count
    },
    invasion: {
        energy: 0,
        energyMax: 10000,
        energyRegen: 25,
        currentPlanet: 0,
        regionProgress: {}, // regionId -> 0-100
        conqueredRegions: [], // list of regionIds in current multiverse
        retainedConqueredRegions: [] // list of regionIds retained from past multiverses
    },
    multiverse: 1, // new multiverse counter
    buffNerf: 1 // multiplier for non‑energy buffs (1 = no nerf)
};

const ASTEROID_POOL = [
    { id: 'ast_stony', name: 'Stony Chondrite', rarity: 'Common', color: '#aaaaaa', baseWeight: 60000000, icon: '🪨', desc: '+1% Click & Idle Power (soft-caps with count)', effect: (count) => ({ click: Math.pow(count, 0.75) * 0.01, idle: Math.pow(count, 0.75) * 0.01 }) },
    { id: 'ast_metallic', name: 'Iron Meteorite', rarity: 'Uncommon', color: '#00ddff', baseWeight: 25000000, icon: '⚙️', desc: '+0.5% Global Multiplier (soft-caps with count)', effect: (count) => ({ global: Math.pow(count, 0.75) * 0.005 }) },
    { id: 'ast_crystal', name: 'Crystal Pallasite', rarity: 'Rare', color: '#ffcc00', baseWeight: 10000000, icon: '💎', desc: '+1% Rebirth Points Gained (soft-caps with count)', effect: (count) => ({ rp: Math.pow(count, 0.75) * 0.01 }) },
    { id: 'ast_plasma', name: 'Plasma Comet', rarity: 'Epic', color: '#ff55ff', baseWeight: 4000000, icon: '🔥', desc: '+1.6% Max Energy & Regen (soft-caps with count)', effect: (count) => ({ energyMax: Math.pow(count, 0.75) * 0.016, energyRegen: Math.pow(count, 0.75) * 0.016 }) },
    { id: 'ast_darkmatter', name: 'Dark Matter Asteroid', rarity: 'Legendary', color: '#aa00ff', baseWeight: 990000, icon: '🌌', desc: '+5% All Production (soft-caps with count)', effect: (count) => ({ global: Math.pow(count, 0.75) * 0.05 }) },
    { id: 'ast_astral_pulsar', name: 'Astral Pulsar Meteor', rarity: 'Fabled', color: '#38ef7d', baseWeight: 300000, icon: '💫', desc: '+7.5% Production & +5% RP (soft-caps with count)', effect: (count) => ({ global: Math.pow(count, 0.75) * 0.075, rp: Math.pow(count, 0.75) * 0.05 }) },
    { id: 'ast_singularity', name: 'Singularity Core', rarity: 'Mythic', color: '#ff0055', baseWeight: 50000, icon: '👑', desc: '+10% Global Multiplier & +10% RP Gain', effect: (count) => ({ global: Math.pow(count, 0.75) * 0.10, rp: Math.pow(count, 0.75) * 0.10 }) },
    
    // NEW CORES (Between Mythic & Transcendent)
    { id: 'ast_hypernova', name: 'Hypernova Remnant Core', rarity: 'Cosmic (1/100K)', color: '#ffaa00', baseWeight: 1000, icon: '💥', desc: '+20% Click & Idle Power & +5% Energy Regen', effect: (count) => ({ click: Math.pow(count, 0.75) * 0.20, idle: Math.pow(count, 0.75) * 0.20, energyRegen: Math.pow(count, 0.75) * 0.05 }) },
    { id: 'ast_chronos', name: 'Temporal Chrono Fragment', rarity: 'Eternal (1/1M)', color: '#00ffaa', baseWeight: 100, icon: '⌛', desc: '+40% Global Multiplier & +20% RP Gain', effect: (count) => ({ global: Math.pow(count, 0.75) * 0.40, rp: Math.pow(count, 0.75) * 0.20 }) },
    { id: 'ast_void_heart', name: 'Heart of the Void', rarity: 'Divine (1/10M)', color: '#7928ca', baseWeight: 10, icon: '🖤', desc: '+100% All Production & +40% Max Energy', effect: (count) => ({ global: Math.pow(count, 0.75) * 1.0, energyMax: Math.pow(count, 0.75) * 0.40 }) },
    { id: 'ast_genesis', name: 'Genesis Spark Fragment', rarity: 'Celestia (1/50M)', color: '#ff007f', baseWeight: 2, icon: '✨', desc: 'x1.2 Global Multiplier & +60% RP Gain', effect: (count) => ({ globalMultScale: Math.pow(1.2, Math.pow(count, 0.75)), rp: Math.pow(count, 0.75) * 0.60 }) },

    // TOP TRANSCENDENT CORE
    { id: 'ast_primordial', name: 'Omniverse Primordial Core', rarity: 'Transcendent (1/100M)', color: '#00ffff', baseWeight: 1, icon: '🌟', desc: 'x1.8 Global Multiplier & +100% RP Gain per level', effect: (count) => ({ globalMultScale: Math.pow(1.8, Math.pow(count, 0.75)), rp: Math.pow(count, 0.75) * 1.0 }) }
];


const constellationData = [
    // Tier 1 (Base Cost ~10 RP)
    {
        id: 'c_click',
        name: 'Starlight Resonance',
        desc: '+50% Click Power per level',
        maxLevel: 25,
        baseCost: 10,
        costGrowth: 1.5,
        requires: [],
        effect: (level) => 1 + (level * 0.5)
    },
    {
        id: 'c_idle',
        name: 'Void Harvester',
        desc: '+50% Idle Power per level',
        maxLevel: 25,
        baseCost: 10,
        costGrowth: 1.5,
        requires: [],
        effect: (level) => 1 + (level * 0.5)
    },
    {
        id: 'c_energy_start',
        name: 'Cosmic Battery',
        desc: 'Start with +10% Max Energy after Rebirth',
        maxLevel: 10,
        baseCost: 10,
        costGrowth: 2.0,
        requires: [],
        effect: (level) => level * 0.1
    },

    // Tier 2 (Base Cost ~100 RP)
    {
        id: 'c_cost',
        name: 'Quantum Efficiency',
        desc: '-2% all Upgrade Costs per level',
        maxLevel: 25,
        baseCost: 100,
        costGrowth: 1.3,
        requires: ['c_click'],
        effect: (level) => Math.max(0.1, 1 - (level * 0.02))
    },
    {
        id: 'c_regen',
        name: 'Dark Matter Reactor',
        desc: '+1 Base Energy Regen per sec per level',
        maxLevel: 50,
        baseCost: 120,
        costGrowth: 1.3,
        requires: ['c_energy_start'],
        effect: (level) => level * 1
    },
    {
        id: 'c_rp',
        name: 'Celestial Harvest',
        desc: '+10% RP gained on each Rebirth per level',
        maxLevel: 20,
        baseCost: 100,
        costGrowth: 1.6,
        requires: ['c_idle'],
        effect: (level) => 1 + (level * 0.1)
    },
    {
        id: 'c_global',
        name: 'Nebula Amplifier',
        desc: '+5% Global Multiplier per level (permanent)',
        maxLevel: 30,
        baseCost: 150,
        costGrowth: 1.4,
        requires: ['c_click', 'c_idle'],
        effect: (level) => level * 0.05
    },

    // Tier 3 (Base Cost ~500 RP)
    {
        id: 'c_invasion_cost',
        name: 'Warp Infiltration',
        desc: '-2% Invasion Energy Cost per level',
        maxLevel: 30,
        baseCost: 500,
        costGrowth: 1.4,
        requires: ['c_regen'],
        effect: (level) => Math.max(0.1, 1 - level * 0.02)
    },
    {
        id: 'c_energy_max',
        name: 'Stellar Capacitor',
        desc: '+5% Max Energy Capacity per level',
        maxLevel: 20,
        baseCost: 500,
        costGrowth: 1.5,
        requires: ['c_regen'],
        effect: (level) => 1 + (level * 0.05)
    },
    {
        id: 'c_invasion_progress',
        name: 'Quantum Strike',
        desc: '+5% min invasion progress per level',
        maxLevel: 10,
        baseCost: 600,
        costGrowth: 2.0,
        requires: ['c_invasion_cost'],
        effect: (level) => level * 5
    },
    {
        id: 'c_offline',
        name: 'Chrono Echo',
        desc: '+10% Offline Production Gain per level',
        maxLevel: 20,
        baseCost: 450,
        costGrowth: 1.5,
        requires: ['c_rp'],
        effect: (level) => 1 + (level * 0.1)
    },
    {
        id: 'c_click_idle_sync',
        name: 'Harmonic Resonance',
        desc: '+1% of Idle Power added as Click Power per level',
        maxLevel: 25,
        baseCost: 500,
        costGrowth: 1.5,
        requires: ['c_global'],
        effect: (level) => level * 0.01
    },

    // Tier 4 (Base Cost ~2,500 RP)
    {
        id: 'c_rp_mult_decay',
        name: 'Eternal Covenant',
        desc: 'Each RP gives +0.1% more to Global Multiplier per level',
        maxLevel: 10,
        baseCost: 2500,
        costGrowth: 2.5,
        requires: ['c_global'],
        effect: (level) => 0.05 + (level * 0.001)
    },
    {
        id: 'c_timeskip',
        name: 'Temporal Rift',
        desc: '+1 minute added to each Time Skip per level',
        maxLevel: 10,
        baseCost: 2000,
        costGrowth: 2.0,
        requires: ['c_offline'],
        effect: (level) => level * 60
    },
    {
        id: 'c_achv_bonus',
        name: 'Cosmic Record',
        desc: '+5% Achievement bonus multiplier per level',
        maxLevel: 15,
        baseCost: 2200,
        costGrowth: 1.7,
        requires: ['c_global'],
        effect: (level) => 1 + (level * 0.05)
    },
    {
        id: 'c_region_rp',
        name: 'Conquest Dividend',
        desc: '+2 RP earned per conquered region on Rebirth per level',
        maxLevel: 20,
        baseCost: 2500,
        costGrowth: 1.6,
        requires: ['c_invasion_progress'],
        effect: (level) => level * 2
    },
    {
        id: 'c_energy_on_conquest',
        name: 'Spoils of War',
        desc: '+5% Max Energy restored on each region conquest per level',
        maxLevel: 10,
        baseCost: 3000,
        costGrowth: 1.8,
        requires: ['c_energy_max'],
        effect: (level) => level * 0.05
    },

    // Tier 5 (Base Cost ~10,000 RP)
    {
        id: 'c_click_multiplier_spike',
        name: 'Nova Burst',
        desc: '+10% chance per level to double click power',
        maxLevel: 10,
        baseCost: 10000,
        costGrowth: 2.0,
        requires: ['c_click_idle_sync'],
        effect: (level) => level * 0.10
    },
    {
        id: 'c_idle_floor',
        name: 'Void Anchor',
        desc: 'Prevents Idle Power from dropping on Rebirth',
        maxLevel: 5,
        baseCost: 12000,
        costGrowth: 2.5,
        requires: ['c_offline'],
        effect: (level) => level * 1
    },
    {
        id: 'c_upgrade_speed',
        name: 'Warp Fabrication',
        desc: '+3% Raibos production bonus per total upgrade level owned',
        maxLevel: 10,
        baseCost: 10000,
        costGrowth: 1.8,
        requires: ['c_cost'],
        effect: (level) => level * 0.03
    },
    {
        id: 'c_conquest_chain',
        name: 'Orbital Chain',
        desc: '+1% Global Multiplier per conquered region per level',
        maxLevel: 10,
        baseCost: 15000,
        costGrowth: 2.2,
        requires: ['c_region_rp'],
        effect: (level) => level * 0.01
    },
    {
        id: 'c_rebirth_head_start',
        name: 'Cosmic Inertia',
        desc: 'Start each Rebirth with 0.5% of previous total Raibos per level',
        maxLevel: 10,
        baseCost: 12000,
        costGrowth: 2.2,
        requires: ['c_rp_mult_decay'],
        effect: (level) => level * 0.005
    },
    {
        id: 'c_energy_regen_mult',
        name: 'Pulsar Overdrive',
        desc: '+10% Energy Regen rate per level (permanent)',
        maxLevel: 20,
        baseCost: 15000,
        costGrowth: 1.7,
        requires: ['c_energy_on_conquest'],
        effect: (level) => 1 + (level * 0.1)
    },

    // Tier 6 (Base Cost ~50,000 RP)
    {
        id: 'c_super_click',
        name: 'Cosmic Singularity Click',
        desc: '+100% Click Power multiplier per level',
        maxLevel: 25,
        baseCost: 50000,
        costGrowth: 1.8,
        requires: ['c_click_multiplier_spike'],
        effect: (level) => 1 + (level * 1.0)
    },
    {
        id: 'c_super_idle',
        name: 'Hyperdrive Automation',
        desc: '+100% Idle Power multiplier per level',
        maxLevel: 25,
        baseCost: 50000,
        costGrowth: 1.8,
        requires: ['c_idle_floor'],
        effect: (level) => 1 + (level * 1.0)
    },
    {
        id: 'c_conquest_energy_mastery',
        name: 'Galactic Overlord',
        desc: '+2 Base Energy Regen per sec per planet cleared',
        maxLevel: 15,
        baseCost: 60000,
        costGrowth: 1.8,
        requires: ['c_energy_regen_mult'],
        effect: (level) => level * 2 * (gameState.invasion ? gameState.invasion.currentPlanet : 0)
    },

    // Tier 7 (Base Cost ~250,000 RP)
    {
        id: 'c_multiverse_power',
        name: 'Multiverse Synergy',
        desc: '+50% All Production per Multiverse cleared per level',
        maxLevel: 20,
        baseCost: 250000,
        costGrowth: 2.0,
        requires: ['c_super_click', 'c_super_idle'],
        effect: (level) => 1 + ((gameState.multiverse || 1) - 1) * level * 0.5
    },
    {
        id: 'c_multiverse_cost_mitigation',
        name: 'Diminishing Singularity',
        desc: 'Reduces the Multiverse cost scale increase by -2% per level',
        maxLevel: 15,
        baseCost: 300000,
        costGrowth: 2.0,
        requires: ['c_conquest_energy_mastery'],
        effect: (level) => Math.max(0.5, 1 - (level * 0.02))
    },
    {
        id: 'c_buff_nerf_shield',
        name: 'Dimensional Anchor',
        desc: 'Mitigates Multiverse non-energy buff nerf by +2% per level',
        maxLevel: 10,
        baseCost: 500000,
        costGrowth: 2.5,
        requires: ['c_multiverse_power'],
        effect: (level) => level * 0.02
    },

    // Tier 8 (Base Cost ~1,000,000 RP)
    {
        id: 'c_t8_click_fury',
        name: 'Astral Click Catalyst',
        desc: '+150% Click Power & +5% Click Crit Chance per level',
        maxLevel: 20,
        baseCost: 1000000,
        costGrowth: 2.2,
        requires: ['c_multiverse_power'],
        effect: (level) => 1 + (level * 1.5)
    },
    {
        id: 'c_t8_idle_reactor',
        name: 'Sub-space Engine',
        desc: '+150% Idle Power per level',
        maxLevel: 20,
        baseCost: 1000000,
        costGrowth: 2.2,
        requires: ['c_multiverse_power'],
        effect: (level) => 1 + (level * 1.5)
    },

    // Tier 9 (Base Cost ~5,000,000 RP)
    {
        id: 'c_t9_energy_overload',
        name: 'Hyper-Charged Core',
        desc: '+5% Energy Max & +5% Energy Regen per level',
        maxLevel: 15,
        baseCost: 5000000,
        costGrowth: 2.4,
        requires: ['c_multiverse_cost_mitigation'],
        effect: (level) => 1 + (level * 0.05)
    },
    {
        id: 'c_t9_rp_overflow',
        name: 'Soul Synthesis',
        desc: '+50% RP gained on Rebirth per level',
        maxLevel: 15,
        baseCost: 5000000,
        costGrowth: 2.5,
        requires: ['c_buff_nerf_shield'],
        effect: (level) => 1 + (level * 0.5)
    },

    // Tier 10 (Base Cost ~25,000,000 RP)
    {
        id: 'c_t10_cosmic_multiplier',
        name: 'Event Horizon Multiplier',
        desc: 'Global Multiplier x2 per level',
        maxLevel: 10,
        baseCost: 25000000,
        costGrowth: 3.0,
        requires: ['c_t8_click_fury', 'c_t8_idle_reactor'],
        effect: (level) => Math.pow(2, level)
    },
    {
        id: 'c_t10_cosmic_battery_overcharge',
        name: 'Hyperdrive Battery Core',
        desc: '+10% Max Energy Capacity & +5% Energy Regen per level',
        maxLevel: 10,
        baseCost: 30000000,
        costGrowth: 2.8,
        requires: ['c_t9_energy_overload'],
        effect: (level) => 1 + (level * 0.10)
    },

    // Tier 11 (Base Cost ~100,000,000 RP)
    {
        id: 'c_t11_conquest_frenzy',
        name: 'Universal Conquest Force',
        desc: '+10% Invasion progress gain per level',
        maxLevel: 15,
        baseCost: 100000000,
        costGrowth: 2.8,
        requires: ['c_t9_energy_overload'],
        effect: (level) => 1 + (level * 0.1)
    },
    {
        id: 'c_t11_temporal_mastery',
        name: 'Chrono Warp Drive',
        desc: '+2 minutes added to Time Skip per level',
        maxLevel: 10,
        baseCost: 100000000,
        costGrowth: 3.0,
        requires: ['c_t9_rp_overflow'],
        effect: (level) => level * 120
    },

    // Tier 12 (Base Cost ~500,000,000 RP)
    {
        id: 'c_t12_stellar_fusion',
        name: 'Stellar Fusion Matrix',
        desc: '+300% Click Power & Idle Power per level',
        maxLevel: 15,
        baseCost: 500000000,
        costGrowth: 2.8,
        requires: ['c_t10_cosmic_multiplier'],
        effect: (level) => 1 + (level * 3.0)
    },
    {
        id: 'c_t12_singularity_harvester',
        name: 'Singularity Harvester',
        desc: '+100% Rebirth Points gained per level',
        maxLevel: 10,
        baseCost: 600000000,
        costGrowth: 3.0,
        requires: ['c_t10_cosmic_battery_overcharge'],
        effect: (level) => 1 + (level * 1.0)
    },

    // Tier 13 (Base Cost ~2,500,000,000 RP)
    {
        id: 'c_t13_quantum_god',
        name: 'Quantum Omnipotence',
        desc: 'All Upgrade Costs reduced by -5% per level',
        maxLevel: 10,
        baseCost: 2500000000,
        costGrowth: 3.5,
        requires: ['c_t12_stellar_fusion'],
        effect: (level) => Math.max(0.01, 1 - level * 0.05)
    },
    {
        id: 'c_t13_hyper_conquest_efficiency',
        name: 'Interstellar Vanguard',
        desc: '-10% Invasion Energy Cost per level',
        maxLevel: 8,
        baseCost: 3000000000,
        costGrowth: 3.2,
        requires: ['c_t11_conquest_frenzy', 'c_t12_singularity_harvester'],
        effect: (level) => Math.max(0.1, 1 - level * 0.10)
    },

    // Tier 14 (Base Cost ~10,000,000,000 RP)
    {
        id: 'c_t14_multiverse_dominator',
        name: 'Multiverse Dominator',
        desc: '+100% All Production per Multiverse per level',
        maxLevel: 15,
        baseCost: 10000000000,
        costGrowth: 3.0,
        requires: ['c_t11_conquest_frenzy', 'c_t12_stellar_fusion'],
        effect: (level) => 1 + ((gameState.multiverse || 1) - 1) * level * 1.0
    },

    // Tier 15 (Base Cost ~50,000,000,000 RP)
    {
        id: 'c_t15_infinity_core',
        name: 'Infinity Core',
        desc: 'Global Multiplier x3 per level',
        maxLevel: 10,
        baseCost: 50000000000,
        costGrowth: 3.5,
        requires: ['c_t13_quantum_god'],
        effect: (level) => Math.pow(3, level)
    },
    {
        id: 'c_t15_infinity_time_nexus',
        name: 'Chrono Infinity Nexus',
        desc: '+5 minutes added to Time Skip per level',
        maxLevel: 10,
        baseCost: 60000000000,
        costGrowth: 3.5,
        requires: ['c_t13_hyper_conquest_efficiency'],
        effect: (level) => level * 300
    },

    // Tier 16 (Base Cost ~250,000,000,000 RP)
    {
        id: 'c_t16_dark_energy_hyperdrive',
        name: 'Dark Energy Engine',
        desc: '+10% Base Energy Regen & Max Energy per level',
        maxLevel: 10,
        baseCost: 250000000000,
        costGrowth: 4.0,
        requires: ['c_t14_multiverse_dominator'],
        effect: (level) => 1 + (level * 0.10)
    },

    // Tier 17 (Base Cost ~1,000,000,000,000 RP)
    {
        id: 'c_t17_transcendence',
        name: 'Transcendence Spark',
        desc: '+500% Click Power & Idle Power per level',
        maxLevel: 10,
        baseCost: 1000000000000,
        costGrowth: 4.0,
        requires: ['c_t15_infinity_core'],
        effect: (level) => 1 + (level * 5.0)
    },
    {
        id: 'c_t17_omniverse_resonance',
        name: 'Omniverse Resonance',
        desc: '+200% All Production per Multiverse cleared per level',
        maxLevel: 10,
        baseCost: 1200000000000,
        costGrowth: 4.2,
        requires: ['c_t15_infinity_time_nexus'],
        effect: (level) => 1 + ((gameState.multiverse || 1) - 1) * level * 2.0
    },

    // Tier 18 (Base Cost ~5,000,000,000,000 RP)
    {
        id: 'c_t18_omniverse_warp',
        name: 'Omniverse Warp',
        desc: '+200% RP Gain per level',
        maxLevel: 10,
        baseCost: 5000000000000,
        costGrowth: 4.5,
        requires: ['c_t16_dark_energy_hyperdrive', 'c_t17_transcendence'],
        effect: (level) => 1 + (level * 2.0)
    },

    // Tier 19 (Base Cost ~25,000,000,000,000 RP)
    {
        id: 'c_t19_primordial_singularity',
        name: 'Primordial Singularity',
        desc: 'Global Multiplier x5 per level',
        maxLevel: 10,
        baseCost: 25000000000000,
        costGrowth: 5.0,
        requires: ['c_t18_omniverse_warp'],
        effect: (level) => Math.pow(5, level)
    },
    {
        id: 'c_t19_godhead_harvest',
        name: 'Godhead Rebirth Harvest',
        desc: '+500% RP gained on Rebirth per level',
        maxLevel: 10,
        baseCost: 30000000000000,
        costGrowth: 5.0,
        requires: ['c_t17_omniverse_resonance'],
        effect: (level) => 1 + (level * 5.0)
    },

    // Tier 20 (Base Cost ~100,000,000,000,000 RP - Cosmic Godhood Apex)
    {
        id: 'c_t20_absolute_apex',
        name: 'Absolute Cosmic Apex',
        desc: 'Global Multiplier x10 & All Production x10 per level',
        maxLevel: 10,
        baseCost: 100000000000000,
        costGrowth: 6.0,
        requires: ['c_t19_primordial_singularity'],
        effect: (level) => Math.pow(10, level)
    },
    {
        id: 'c_t20_infinity_overlord',
        name: 'Infinity Overlord Sovereign',
        desc: '+25% Energy Regen & Max Energy per level',
        maxLevel: 10,
        baseCost: 150000000000000,
        costGrowth: 6.0,
        requires: ['c_t19_godhead_harvest'],
        effect: (level) => 1 + (level * 0.25)
    }
];

function getConstellationLevel(id) {
    if (!gameState.constellation) gameState.constellation = {};
    return gameState.constellation[id] || 0;
}

function getConstellationEffect(id) {
    const level = getConstellationLevel(id);
    const skill = constellationData.find(s => s.id === id);
    if (!skill) return 0;
    return skill.effect(level);
}

function getConstellationCost(id) {
    const level = getConstellationLevel(id);
    const skill = constellationData.find(s => s.id === id);
    if (!skill) return 999999;
    return Math.floor(skill.baseCost * Math.pow(skill.costGrowth, level));
}

function isSkillUnlocked(skill) {
    if (!skill.requires || skill.requires.length === 0) return true;
    // Unlocked if AT LEAST ONE prerequisite skill has been upgraded (level >= 1)
    return skill.requires.some(reqId => getConstellationLevel(reqId) >= 1);
}

function buyMaxConstellation() {
    let totalBought = 0;
    let boughtAnyInLoop = true;

    while (boughtAnyInLoop) {
        boughtAnyInLoop = false;
        for (const skill of constellationData) {
            if (!isSkillUnlocked(skill)) continue;
            const level = getConstellationLevel(skill.id);
            if (level < skill.maxLevel) {
                const cost = getConstellationCost(skill.id);
                if (gameState.rebirthPoints >= cost) {
                    gameState.rebirthPoints -= cost;
                    gameState.constellation[skill.id] = level + 1;
                    totalBought++;
                    boughtAnyInLoop = true;
                }
            }
        }
    }

    if (totalBought > 0) {
        showToast(`BUY MAX SKILLS!`, `Upgraded ${totalBought} skill levels!`);
        renderConstellation();
        recalculatePowers();
        updateUI();
        saveGame();
    }
}

function renderConstellation() {
    document.getElementById('constellation-rp').innerText = formatNumber(gameState.rebirthPoints);
    const container = document.getElementById('constellation-nodes-container');
    container.innerHTML = '';
    
    // Group skills by tier / prerequisites depth
    const tiers = {};
    const skillTierMap = {};

    function getSkillTier(skill) {
        if (skillTierMap[skill.id] !== undefined) return skillTierMap[skill.id];
        if (!skill.requires || skill.requires.length === 0) {
            skillTierMap[skill.id] = 1;
            return 1;
        }
        let maxReqTier = 0;
        skill.requires.forEach(reqId => {
            const reqSkill = constellationData.find(s => s.id === reqId);
            if (reqSkill) {
                maxReqTier = Math.max(maxReqTier, getSkillTier(reqSkill));
            }
        });
        const tier = maxReqTier + 1;
        skillTierMap[skill.id] = tier;
        return tier;
    }

    constellationData.forEach(skill => {
        const tier = getSkillTier(skill);
        if (!tiers[tier]) tiers[tier] = [];
        tiers[tier].push(skill);
    });

    const maxTier = Math.max(...Object.keys(tiers).map(Number));

    for (let t = 1; t <= maxTier; t++) {
        const tierRow = document.createElement('div');
        tierRow.style.display = 'flex';
        tierRow.style.justifyContent = 'center';
        tierRow.style.flexWrap = 'wrap';
        tierRow.style.gap = '15px';
        tierRow.style.marginBottom = '25px';
        tierRow.style.position = 'relative';

        const tierHeader = document.createElement('div');
        tierHeader.style.width = '100%';
        tierHeader.style.textAlign = 'center';
        tierHeader.style.color = '#ffcc00';
        tierHeader.style.fontSize = '0.9rem';
        tierHeader.style.letterSpacing = '1px';
        tierHeader.style.marginBottom = '8px';
        tierHeader.style.textTransform = 'uppercase';
        tierHeader.style.opacity = '0.8';
        tierHeader.innerText = i18n.t('constellation_tier').replace('{0}', t);
        tierRow.appendChild(tierHeader);

        (tiers[t] || []).forEach(skill => {
            const level = getConstellationLevel(skill.id);
            const cost = getConstellationCost(skill.id);
            const isMax = level >= skill.maxLevel;
            const unlocked = isSkillUnlocked(skill);

            const reqSkillNames = (skill.requires || []).map(reqId => {
                const s = constellationData.find(item => item.id === reqId);
                return s ? i18n.getSkillName(s) : reqId;
            });

            const node = document.createElement('div');
            node.className = 'constellation-node' + (isMax ? ' max-level' : '') + (!unlocked ? ' locked' : '');
            node.style.minWidth = '240px';
            node.style.maxWidth = '280px';
            node.style.background = unlocked ? (level > 0 ? 'rgba(157, 80, 187, 0.25)' : 'rgba(20, 20, 45, 0.9)') : 'rgba(10, 10, 20, 0.6)';
            node.style.border = unlocked ? (level > 0 ? '1px solid #00f2ff' : '1px solid #9d50bb') : '1px dashed #444';
            node.style.opacity = unlocked ? '1' : '0.5';
            node.style.borderRadius = '12px';
            node.style.padding = '12px';
            node.style.display = 'flex';
            node.style.flexDirection = 'column';
            node.style.justifyContent = 'space-between';

            const sName = i18n.getSkillName(skill);
            const sDesc = i18n.getSkillDesc(skill);
            const reqJoiner = i18n.lang === 'ko' ? ' 또는 ' : ' OR ';

            node.innerHTML = `
                <div class="c-node-info">
                    <h3 style="color: ${unlocked ? (level > 0 ? '#00f2ff' : '#ffcc00') : '#777'}; margin: 0 0 5px 0;">${sName}</h3>
                    <p style="font-size: 0.8rem; color: #bbb; margin-bottom: 8px;">${sDesc}</p>
                    ${!unlocked ? `<div style="color:#ff6666; font-size:0.75rem; margin-bottom:5px;">${i18n.t('constellation_requires')}${reqSkillNames.join(reqJoiner)}</div>` : ''}
                    <div class="c-node-level" style="font-size:0.85rem; font-weight:bold; color: #ffaa00;">${i18n.t('constellation_level').replace('{0}', level).replace('{1}', skill.maxLevel)}</div>
                </div>
                <div class="c-node-action" style="margin-top: 10px;">
                    ${!unlocked ? `<span style="color:#666; font-size:0.85rem;">${i18n.t('constellation_locked')}</span>` : (isMax ? `<span style="color:#00f2ff; font-weight:bold;">${i18n.t('constellation_maxed')}</span>` : `
                        <span class="c-node-cost" style="display:block; font-size:0.85rem; margin-bottom:5px;">${i18n.t('constellation_cost').replace('{0}', formatNumber(cost))}</span>
                        <div style="display:flex; gap:5px;">
                            <button class="action-btn c-buy-one-btn" style="flex:1;" ${gameState.rebirthPoints < cost ? 'disabled' : ''}>${i18n.t('constellation_buy_one')}</button>
                            <button class="action-btn c-buy-max-btn" style="flex:1; background:rgba(255,204,0,0.2); border:1px solid #ffcc00; color:#ffcc00;" ${gameState.rebirthPoints < cost ? 'disabled' : ''}>${i18n.t('constellation_buy_max')}</button>
                        </div>
                    `)}
                </div>
            `;

            if (unlocked && !isMax) {
                const buyOneBtn = node.querySelector('.c-buy-one-btn');
                const buyMaxBtn = node.querySelector('.c-buy-max-btn');

                if (buyOneBtn) {
                    buyOneBtn.onclick = () => {
                        const c = getConstellationCost(skill.id);
                        if (gameState.rebirthPoints >= c) {
                            gameState.rebirthPoints -= c;
                            gameState.constellation[skill.id] = level + 1;
                            showToast(`${skill.name} upgraded!`, 'success');
                            renderConstellation();
                            recalculatePowers();
                            updateUI();
                            saveGame();
                        }
                    };
                }

                if (buyMaxBtn) {
                    buyMaxBtn.onclick = () => {
                        let bought = 0;
                        while (true) {
                            const curLevel = getConstellationLevel(skill.id);
                            if (curLevel >= skill.maxLevel) break;
                            const c = getConstellationCost(skill.id);
                            if (gameState.rebirthPoints >= c) {
                                gameState.rebirthPoints -= c;
                                gameState.constellation[skill.id] = curLevel + 1;
                                bought++;
                            } else {
                                break;
                            }
                        }
                        if (bought > 0) {
                            showToast(`${skill.name} +${bought} Levels!`, 'success');
                            renderConstellation();
                            recalculatePowers();
                            updateUI();
                            saveGame();
                        }
                    };
                }
            }

            tierRow.appendChild(node);
        });

        container.appendChild(tierRow);
    }

    const buyMaxSkillsBtn = document.getElementById('buy-max-skills-btn');
    if (buyMaxSkillsBtn) {
        buyMaxSkillsBtn.onclick = buyMaxConstellation;
    }
}

const planetsData = [
    {
        id: 'earth',
        name: 'Earth',
        color: '#00f2ff',
        energyMax: 100,
        energyRegen: 12.5,
        regions: [
            { id: 'asia',       name: 'Asia',            buff: 'Click Power +50%',          type: 'click',      value: 0.5,  cost: 10,   d: "M138,15 L175,15 L188,35 L180,55 L165,72 L140,68 L128,50 L130,30 Z" },
            { id: 'europe',     name: 'Europe',          buff: 'Upgrade Cost -5%',           type: 'cost',       value: 0.05, cost: 20,   d: "M95,12 L120,10 L128,28 L115,38 L100,35 L90,25 Z" },
            { id: 'na',        name: 'North America',    buff: 'Idle Power +50%',            type: 'idle',       value: 0.5,  cost: 30,   d: "M12,10 L68,10 L75,28 L70,48 L52,58 L22,55 L8,38 Z" },
            { id: 'sa',        name: 'South America',    buff: 'RP Gain +20%',               type: 'rp',         value: 0.2,  cost: 40,   d: "M38,62 L65,60 L72,80 L65,94 L48,96 L35,82 Z" },
            { id: 'africa',    name: 'Africa',           buff: 'Energy Regen +50%',          type: 'energy',     value: 0.5,  cost: 50,   d: "M98,50 L122,48 L130,68 L125,88 L108,92 L94,78 L92,60 Z" },
            { id: 'oceania',   name: 'Oceania',          buff: 'Global Multiplier +10%',     type: 'mult',       value: 0.1,  cost: 60,   d: "M162,68 L185,65 L190,82 L178,90 L162,84 Z" },
            { id: 'antarctica',name: 'Antarctica',       buff: 'Global Multiplier x1.1',     type: 'mult_total', value: 1.1,  cost: 70,   d: "M40,90 L160,90 L165,98 L35,98 Z" },
            { id: 'atlantis',  name: 'Atlantis',         buff: 'All Production x1.2',        type: 'all_prod',   value: 1.2,  cost: 80,   d: "M75,35 L90,30 L95,50 L80,55 Z" },
            { id: 'lemuria',   name: 'Lemuria',          buff: 'Click Power +100%',          type: 'click',      value: 1.0,  cost: 90,   d: "M130,70 L150,75 L155,90 L135,85 Z" },
            { id: 'mu',        name: 'Mu',               buff: 'Global Multiplier x1.2',     type: 'mult_total', value: 1.2,  cost: 100,  d: "M10,60 L30,55 L35,75 L15,80 Z" }
        ]
    },
    {
        id: 'mars',
        name: 'Mars',
        color: '#ff6633',
        energyMax: 500,
        energyRegen: 12.5,
        regions: [
            { id: 'valles',     name: 'Valles Marineris',  buff: 'Global Multiplier x1.3',     type: 'mult_total',   value: 1.3,  cost: 120,  d: "M25,45 L80,32 L135,42 L165,62 L145,80 L75,72 Z" },
            { id: 'olympus',    name: 'Olympus Mons',      buff: 'Click Power +150%',           type: 'click',        value: 1.5,  cost: 150,  d: "M78,15 L115,8 L128,25 L110,38 L82,35 Z" },
            { id: 'utopia',     name: 'Utopia Planitia',   buff: 'Idle Power +150%',            type: 'idle',         value: 1.5,  cost: 200,  d: "M138,15 L180,22 L175,45 L145,48 L132,32 Z" },
            { id: 'hellas',     name: 'Hellas Planitia',   buff: 'Rebirth Points +50%',         type: 'rp',           value: 0.5,  cost: 250,  d: "M38,62 L78,55 L88,82 L65,90 L40,85 Z" },
            { id: 'mars_poles', name: 'North Polar Cap',   buff: 'Energy Regen x5',           type: 'energy_mult',  value: 2.5,  cost: 300,  d: "M60,5 L145,5 L148,14 L58,14 Z" },
            { id: 'south_pole', name: 'South Polar Cap',   buff: 'Energy Regen x5',           type: 'energy_mult',  value: 2.5,  cost: 350,  d: "M55,90 L148,90 L150,98 L52,98 Z" },
            { id: 'elysium',    name: 'Elysium Planitia',  buff: 'All Production x1.3',         type: 'all_prod',     value: 1.3,  cost: 400,  d: "M148,48 L182,40 L188,68 L162,72 L145,65 Z" },
            { id: 'argyre',     name: 'Argyre Basin',      buff: 'Upgrade Cost -10%',           type: 'cost',         value: 0.1,  cost: 450,  d: "M30,70 L68,65 L72,85 L42,90 Z" },
            { id: 'tharsis',    name: 'Tharsis Bulge',     buff: 'Click Power +200%',           type: 'click',        value: 2.0,  cost: 480,  d: "M38,35 L78,30 L82,55 L42,58 Z" },
            { id: 'mars_core',  name: 'Martian Core',      buff: 'Global Multiplier x1.5',      type: 'mult_total',   value: 1.5,  cost: 500,  d: "M82,55 L135,42 L145,65 L88,82 L72,68 Z" }
        ]
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        color: '#ffcc99',
        energyMax: 2000,
        energyRegen: 12.5,
        regions: [
            { id: 'grs',        name: 'Great Red Spot',         buff: 'Global Multiplier x2',     type: 'mult_total',  value: 2.0,  cost: 600,  d: "M72,45 Q100,28 145,48 T108,70 Z" },
            { id: 'europa',     name: 'Europa',                 buff: 'All Production x1.5',      type: 'all_prod',    value: 1.5,  cost: 700,  d: "M25,28 L60,18 L70,48 L38,58 Z" },
            { id: 'ganymede',   name: 'Ganymede',               buff: 'Upgrade Cost -15%',        type: 'cost',        value: 0.15, cost: 800,  d: "M128,15 L162,25 L155,55 L118,48 Z" },
            { id: 'io',         name: 'Io',                     buff: 'Click Power +300%',        type: 'click',       value: 3.0,  cost: 900,  d: "M45,68 L80,62 L85,88 L52,94 Z" },
            { id: 'callisto',   name: 'Callisto',               buff: 'Idle Power +300%',         type: 'idle',        value: 3.0,  cost: 1000, d: "M150,62 L185,55 L188,82 L162,88 Z" },
            { id: 'band_north', name: 'Northern Bands',         buff: 'Energy Regen x3',        type: 'energy_mult', value: 3.0,  cost: 1200, d: "M8,12 L192,12 L190,25 L10,25 Z" },
            { id: 'band_south', name: 'Southern Bands',         buff: 'Energy Regen x3',        type: 'energy_mult', value: 3.0,  cost: 1400, d: "M8,75 L192,75 L190,88 L10,88 Z" },
            { id: 'polar_hex',  name: 'Polar Hexagon',          buff: 'Global Multiplier x2.5',   type: 'mult_total',  value: 2.5,  cost: 1600, d: "M80,5 L120,5 L140,15 L120,25 L80,25 L60,15 Z" },
            { id: 'storm_belt', name: 'Equatorial Storm Belt',  buff: 'Click Power +400%',        type: 'click',       value: 4.0,  cost: 1800, d: "M10,38 L190,38 L188,52 L12,52 Z" },
            { id: 'jupiter_core',name:'Metallic Core',          buff: 'Global Multiplier x3',     type: 'mult_total',  value: 3.0,  cost: 1900, d: "M70,28 L130,28 L140,55 L105,75 L65,55 Z" },
            { id: 'amalthea',   name: 'Amalthea',               buff: 'RP Gain x1.5',             type: 'rp_mult',     value: 1.5,  cost: 2000, d: "M165,28 L188,22 L190,38 L170,42 Z" }
        ]
    },
    {
        id: 'saturn',
        name: 'Saturn',
        color: '#e6e600',
        energyMax: 8000,
        energyRegen: 12.5,
        regions: [
            { id: 'rings_a',    name: 'A Ring',              buff: 'Global Multiplier x3.5',  type: 'mult_total', value: 3.5,  cost: 2500,  d: "M8,45 Q50,15 192,45 L190,52 Q50,22 10,52 Z" },
            { id: 'rings_b',    name: 'B Ring (Brightest)',   buff: 'Global Multiplier x4',    type: 'mult_total', value: 4.0,  cost: 3000,  d: "M12,55 Q55,28 188,55 L186,62 Q52,35 14,62 Z" },
            { id: 'rings_c',    name: 'C Ring',              buff: 'Idle Power +500%',         type: 'idle',       value: 5.0,  cost: 3500,  d: "M15,38 Q55,8 185,38 L183,45 Q52,15 17,45 Z" },
            { id: 'titan',      name: 'Titan',               buff: 'Idle Power +600%',         type: 'idle',       value: 6.0,  cost: 4000,  d: "M35,18 L72,12 L85,42 L48,48 Z" },
            { id: 'enceladus',  name: 'Enceladus',           buff: 'Energy Regen x2',        type: 'energy_mult',value: 2.0,  cost: 4500,  d: "M118,58 L150,52 L158,82 L128,88 Z" },
            { id: 'mimas',      name: 'Mimas',               buff: 'Upgrade Cost -20%',        type: 'cost',       value: 0.2,  cost: 5000,  d: "M158,15 L182,10 L188,30 L165,35 Z" },
            { id: 'rhea',       name: 'Rhea',                buff: 'Click Power +600%',        type: 'click',      value: 6.0,  cost: 5500,  d: "M38,68 L70,62 L75,88 L42,92 Z" },
            { id: 'dione',      name: 'Dione',               buff: 'RP Gain x2',               type: 'rp_mult',    value: 2.0,  cost: 6000,  d: "M155,62 L182,58 L185,80 L158,85 Z" },
            { id: 'saturn_poles',name:'Saturn Storm Poles',  buff: 'All Production x2',        type: 'all_prod',   value: 2.0,  cost: 7000,  d: "M70,5 L132,5 L135,15 L68,15 Z" },
            { id: 'cassini_div',name: 'Cassini Division',    buff: 'Global Multiplier x5',     type: 'mult_total', value: 5.0,  cost: 7500,  d: "M12,62 Q55,35 188,62 L186,68 Q52,42 14,68 Z" },
            { id: 'saturn_core',name: 'Saturn Core',         buff: 'Global Multiplier x6',     type: 'mult_total', value: 6.0,  cost: 8000,  d: "M72,25 L128,25 L140,68 L100,80 L60,68 Z" }
        ]
    },
    {
        id: 'neptune',
        name: 'Neptune',
        color: '#3366ff',
        energyMax: 25000,
        energyRegen: 12.5,
        regions: [
            { id: 'triton',      name: 'Triton',               buff: 'RP Gain x2.5',             type: 'rp_mult',    value: 2.5,  cost: 9000,  d: "M45,38 L85,28 L98,58 L58,68 Z" },
            { id: 'darkspot',    name: 'Great Dark Spot',       buff: 'Global Multiplier x8',     type: 'mult_total', value: 8.0,  cost: 10000, d: "M105,38 Q128,18 172,38 T132,58 Z" },
            { id: 'neptune_core',name: 'Frozen Core',           buff: 'All Costs -25%',           type: 'cost',       value: 0.25, cost: 12000, d: "M75,68 L125,68 L122,94 L78,94 Z" },
            { id: 'nereid',      name: 'Nereid',                buff: 'Click Power +1000%',        type: 'click',      value: 10.0, cost: 14000, d: "M155,20 L182,15 L188,38 L162,42 Z" },
            { id: 'proteus',     name: 'Proteus',               buff: 'Idle Power +1000%',         type: 'idle',       value: 10.0, cost: 16000, d: "M15,50 L48,44 L52,68 L18,72 Z" },
            { id: 'polar_vortex',name: 'Polar Vortex',          buff: 'Energy Regen x2',         type: 'energy_mult',value: 2.0,  cost: 18000, d: "M72,5 L128,5 L132,18 L68,18 Z" },
            { id: 'nep_ring',    name: 'Adams Ring',            buff: 'Global Multiplier x7',     type: 'mult_total', value: 7.0,  cost: 20000, d: "M10,32 Q50,5 190,32 L188,40 Q48,12 12,40 Z" },
            { id: 'storm_bands', name: 'Methane Storm Bands',   buff: 'All Production x2.5',      type: 'all_prod',   value: 2.5,  cost: 22000, d: "M10,45 L190,45 L188,58 L12,58 Z" },
            { id: 'nep_magnetic',name: 'Magnetic Pole',         buff: 'Global Multiplier x10',    type: 'mult_total', value: 10.0, cost: 24000, d: "M72,88 L128,88 L132,98 L68,98 Z" },
            { id: 'deep_ocean',  name: 'Water-Ice Mantle',      buff: 'Global Multiplier x3',     type: 'mult_total', value: 3.0,  cost: 25000, d: "M48,20 L152,20 L165,68 L100,80 L35,68 Z" }
        ]
    },
    {
        id: 'pluto',
        name: 'Pluto (Outer Rim)',
        color: '#ccccff',
        energyMax: 80000,
        energyRegen: 12.5,
        regions: [
            { id: 'charon',    name: 'Charon',                      buff: 'Final Multiplier x12',    type: 'mult_total', value: 12.0, cost: 30000, d: "M25,25 L65,25 L65,62 L25,62 Z" },
            { id: 'heart',     name: 'Tombaugh Regio (The Heart)',   buff: 'All Production x3',       type: 'all_prod',   value: 3.0,  cost: 40000, d: "M95,38 Q118,18 142,38 L100,78 L58,38 Q82,18 95,38 Z" },
            { id: 'norgay',    name: 'Norgay Montes',               buff: 'Click Power +2000%',       type: 'click',      value: 20.0, cost: 50000, d: "M148,55 L182,48 L188,75 L158,80 Z" },
            { id: 'sputnik',   name: 'Sputnik Planitia',            buff: 'Idle Power +2000%',        type: 'idle',       value: 20.0, cost: 60000, d: "M58,38 L95,38 L100,78 L50,70 Z" },
            { id: 'pluto_poles',name:'Polar Ice Plains',             buff: 'Energy Regen x2',       type: 'energy_mult',value: 2.0, cost: 70000, d: "M40,5 L165,5 L168,18 L38,18 Z" },
            { id: 'hydra',     name: 'Hydra Moon',                  buff: 'RP Gain x3',               type: 'rp_mult',    value: 3.0,  cost: 75000, d: "M165,22 L190,18 L192,40 L168,44 Z" },
            { id: 'nix_moon',  name: 'Nix Moon',                    buff: 'Global Multiplier x4',     type: 'mult_total', value: 4.0,  cost: 78000, d: "M10,30 L35,25 L38,50 L12,54 Z" },
            { id: 'pluto_core',name: 'Ancient Frozen Core',         buff: 'Global Multiplier x15',    type: 'mult_total', value: 15.0, cost: 80000, d: "M65,25 L142,38 L158,80 L100,92 L40,70 L25,62 Z" }
        ]
    },
    {
        id: 'interstellar',
        name: 'Interstellar Space',
        color: '#aaaaaa',
        energyMax: 200000,
        energyRegen: 12.5,
        regions: [
            { id: 'oort_cloud',     name: 'The Oort Cloud',            buff: 'Global Multiplier x5',     type: 'mult_total', value: 5.0,  cost: 100000, d: "M10,10 Q50,0 100,10 T190,10 L190,90 Q150,100 100,90 T10,90 Z" },
            { id: 'voyager_zone',   name: 'Voyager Deadzone',          buff: 'All Production x4',        type: 'all_prod',   value: 4.0,  cost: 120000, d: "M20,40 L60,35 L65,65 L25,70 Z" },
            { id: 'rogue_planet',   name: 'Wandering Rogue Planet',    buff: 'Click Power +5000%',       type: 'click',      value: 50.0, cost: 150000, d: "M140,40 L180,35 L185,65 L145,70 Z" },
            { id: 'heliopause',     name: 'Heliopause Border',         buff: 'Energy Regen x2',       type: 'energy_mult',value: 2.0, cost: 180000, d: "M70,20 L130,20 L135,80 L65,80 Z" },
            { id: 'dark_matter_sea',name: 'Dark Matter Sea',           buff: 'Global Multiplier x10',    type: 'mult_total', value: 10.0, cost: 200000, d: "M80,30 L120,30 L125,70 L75,70 Z" }
        ]
    },
    {
        id: 'alpha_centauri',
        name: 'Alpha Centauri System',
        color: '#ffcc66',
        energyMax: 450000,
        energyRegen: 12.5,
        regions: [
            { id: 'proxima_b',      name: 'Proxima Centauri b',      buff: 'Global Multiplier x15',     type: 'mult_total', value: 15.0, cost: 250000, d: "M30,30 Q60,10 90,30 L85,70 Q55,90 25,70 Z" },
            { id: 'alpha_a',        name: 'Centauri A Core',         buff: 'Idle Power +10000%',        type: 'idle',       value: 100.0,cost: 300000, d: "M110,30 Q140,10 170,30 L165,70 Q135,90 105,70 Z" },
            { id: 'alpha_b',        name: 'Centauri B Core',         buff: 'Click Power +10000%',       type: 'click',      value: 100.0,cost: 350000, d: "M90,30 L110,30 L105,70 L85,70 Z" },
            { id: 'binary_bridge',  name: 'Binary Star Bridge',      buff: 'All Production x5',         type: 'all_prod',   value: 5.0,  cost: 400000, d: "M70,40 L130,40 L125,60 L65,60 Z" },
            { id: 'centauri_dyson', name: 'Dyson Sphere Prototype',  buff: 'Global Multiplier x25',     type: 'mult_total', value: 25.0, cost: 450000, d: "M50,15 L150,15 L155,85 L45,85 Z" }
        ]
    },
    {
        id: 'galactic_center',
        name: 'The Galactic Center',
        color: '#ff33ff',
        energyMax: 750000,
        energyRegen: 12.5,
        regions: [
            { id: 'orion_nebula',     name: 'Orion Nebula',                  buff: 'All Production x6',            type: 'all_prod',   value: 6.0,  cost: 500000, d: "M10,20 Q60,5 110,20 L105,40 Q55,25 5,40 Z" },
            { id: 'pillars_creation', name: 'Pillars of Creation',           buff: 'Global Multiplier x35',        type: 'mult_total', value: 35.0, cost: 550000, d: "M130,10 L160,10 L165,90 L125,90 Z" },
            { id: 'neutron_star',     name: 'Pulsar Matrix',                 buff: 'RP Gain x10',                  type: 'rp_mult',    value: 10.0, cost: 600000, d: "M20,60 L80,55 L85,85 L15,90 Z" },
            { id: 'accretion_disk',   name: 'Accretion Disk',                buff: 'Energy Regen x2',           type: 'energy_mult',value: 2.0, cost: 650000, d: "M40,30 Q100,10 160,30 L155,70 Q95,90 35,70 Z" },
            { id: 'sagittarius_a',    name: 'Sagittarius A*',                buff: 'Global Multiplier x50',        type: 'mult_total', value: 50.0, cost: 750000, d: "M70,30 A30,30 0 1,1 130,70 A30,30 0 1,1 70,30 Z" }
        ]
    },
    {
        id: 'andromeda',
        name: 'Andromeda Galaxy',
        color: '#ff00aa',
        energyMax: 1000000,
        energyRegen: 12.5,
        regions: [
            { id: 'andromeda_edge',   name: 'Andromeda Edge',                buff: 'Energy Regen x2',           type: 'energy_mult',value: 2.0, cost: 800000, d: "M20,20 Q50,0 80,20 T140,20 L140,80 Q110,100 80,80 T20,80 Z" },
            { id: 'm32',              name: 'M32 Satellite',                 buff: 'All Production x8',            type: 'all_prod',   value: 8.0,  cost: 850000, d: "M150,15 L180,10 L185,40 L155,45 Z" },
            { id: 'm110',             name: 'M110 Satellite',                buff: 'Global Multiplier x60',        type: 'mult_total', value: 60.0, cost: 900000, d: "M10,80 L40,75 L45,95 L15,100 Z" },
            { id: 'andromeda_arms',   name: 'Spiral Arms',                   buff: 'Idle Power +20000%',           type: 'idle',       value: 200.0,cost: 930000, d: "M50,50 A40,40 0 0,1 130,50 A40,40 0 0,1 50,50" },
            { id: 'andromeda_core',   name: 'Andromeda Core',                buff: 'RP Gain x20',                  type: 'rp_mult',    value: 20.0, cost: 960000, d: "M80,40 L100,40 L105,60 L75,60 Z" },
            { id: 'supermassive',     name: 'Supermassive Black Hole',       buff: 'Click Power +20000%',          type: 'click',      value: 200.0,cost: 980000, d: "M85,45 A5,5 0 1,1 95,45 A5,5 0 1,1 85,45" },
            { id: 'universal_nexus',  name: 'Universal Nexus',               buff: 'Global Multiplier x100',       type: 'mult_total', value: 100.0,cost: 1000000,d: "M0,0 L200,0 L200,100 L0,100 Z" }
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
    // --- [클릭 분야: a1 ~ a5] ---
    {
        id: 'a1',
        title: 'First Spark',
        req: () => gameState.totalClicks >= 1,
        desc: 'Click the Raibos 1 time',
        rewardDesc: '+100 Starting Raibos & +1 Skill Pull',
        onUnlock: () => {
            gameState.raibos += 100;
            gameState.totalRaibos += 100;
            if (gameState.activeSkills) gameState.activeSkills.charges += 1;
        }
    },
    {
        id: 'a2',
        title: 'Click Apprentice',
        req: () => gameState.totalClicks >= 100,
        desc: 'Click 100 times',
        rewardDesc: 'Instant 30s Click Production & +3 Skill Pulls',
        onUnlock: () => {
            const gain = (gameState.clickPower || 1) * 30;
            gameState.raibos += gain;
            gameState.totalRaibos += gain;
            if (gameState.activeSkills) gameState.activeSkills.charges += 3;
        }
    },
    {
        id: 'a3',
        title: 'Finger of Light',
        req: () => gameState.totalClicks >= 1000,
        desc: 'Click 1,000 times',
        rewardDesc: 'Free Click Upgrades (+5 Levels to c1~c3)',
        onUnlock: () => {
            ['c1', 'c2', 'c3'].forEach(id => {
                gameState.upgradeLevels[id] = (gameState.upgradeLevels[id] || 0) + 5;
            });
            recalculatePowers();
        }
    },
    {
        id: 'a4',
        title: 'Tachyon Tapper',
        req: () => gameState.totalClicks >= 5000,
        desc: 'Click 5,000 times',
        rewardDesc: '+500 Invasion Energy & +5 Skill Pulls',
        onUnlock: () => {
            if (gameState.invasion) gameState.invasion.energy = Math.min(gameState.invasion.energyMax, (gameState.invasion.energy || 0) + 500);
            if (gameState.activeSkills) gameState.activeSkills.charges += 5;
        }
    },
    {
        id: 'a5',
        title: 'God of Touch',
        req: () => gameState.totalClicks >= 25000,
        desc: 'Click 25,000 times',
        rewardDesc: 'Free Rare Asteroid (Crystal Pallasite) & +10 Skill Pulls',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_crystal'] = (gameState.asteroids.inventory['ast_crystal'] || 0) + 1;
            }
            if (gameState.activeSkills) gameState.activeSkills.charges += 10;
        }
    },

    // --- [자산 및 생산 분야: a6 ~ a14] ---
    {
        id: 'a6',
        title: 'Pocket Change',
        req: () => gameState.totalRaibos >= 1000,
        desc: 'Earn 1,000 Raibos total',
        rewardDesc: 'Instant +500 Raibos Bonus',
        onUnlock: () => {
            gameState.raibos += 500;
            gameState.totalRaibos += 500;
        }
    },
    {
        id: 'a7',
        title: 'Cosmic Millionaire',
        req: () => gameState.totalRaibos >= 1e6,
        desc: 'Earn 1 Million Raibos',
        rewardDesc: '+50 Rebirth Points & +100 Max Energy Boost',
        onUnlock: () => {
            gameState.rebirthPoints += 50;
            if (gameState.invasion) gameState.invasion.energy = (gameState.invasion.energy || 0) + 100;
        }
    },
    {
        id: 'a8',
        title: 'Billionaire Orbit',
        req: () => gameState.totalRaibos >= 1e9,
        desc: 'Earn 1 Billion Raibos',
        rewardDesc: '1 Free Stony Chondrite Asteroid & +2 Skill Pulls',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_stony'] = (gameState.asteroids.inventory['ast_stony'] || 0) + 1;
            }
            if (gameState.activeSkills) gameState.activeSkills.charges += 2;
        }
    },
    {
        id: 'a9',
        title: 'Trillion Galactic Core',
        req: () => gameState.totalRaibos >= 1e12,
        desc: 'Earn 1 Trillion Raibos',
        rewardDesc: '+1,000 Rebirth Points & Instant 60s Production',
        onUnlock: () => {
            gameState.rebirthPoints += 1000;
            const gain = (gameState.idlePower || 0) * 60;
            gameState.raibos += gain;
            gameState.totalRaibos += gain;
        }
    },
    {
        id: 'a10',
        title: 'Quadrillion Supercluster',
        req: () => gameState.totalRaibos >= 1e15,
        desc: 'Earn 1 Quadrillion Raibos',
        rewardDesc: '1 Free Iron Meteorite & Instant Energy Fill',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_metallic'] = (gameState.asteroids.inventory['ast_metallic'] || 0) + 1;
            }
            if (gameState.invasion) gameState.invasion.energy = gameState.invasion.energyMax;
        }
    },
    {
        id: 'a11',
        title: 'Quintillion Nebula',
        req: () => gameState.totalRaibos >= 1e18,
        desc: 'Earn 1 Quintillion Raibos',
        rewardDesc: '1 Free Epic Plasma Comet & +5,000 RP',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_plasma'] = (gameState.asteroids.inventory['ast_plasma'] || 0) + 1;
            }
            gameState.rebirthPoints += 5000;
        }
    },
    {
        id: 'a12',
        title: 'Sextillion Void',
        req: () => gameState.totalRaibos >= 1e21,
        desc: 'Earn 1 Sextillion Raibos',
        rewardDesc: 'Instant 10-Minute Time Skip Production',
        onUnlock: () => {
            const gain = (gameState.idlePower || 0) * 600;
            gameState.raibos += gain;
            gameState.totalRaibos += gain;
        }
    },
    {
        id: 'a13',
        title: 'Septillion Apex',
        req: () => gameState.totalRaibos >= 1e24,
        desc: 'Earn 1 Septillion Raibos',
        rewardDesc: '+50,000 RP & +15 Skill Pulls',
        onUnlock: () => {
            gameState.rebirthPoints += 50000;
            if (gameState.activeSkills) gameState.activeSkills.charges += 15;
        }
    },
    {
        id: 'a14',
        title: 'Decillion Absolute',
        req: () => gameState.totalRaibos >= 1e33,
        desc: 'Earn 1 Decillion Raibos',
        rewardDesc: '1 Free Fabled Astral Pulsar Meteor & +100,000 RP',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_astral_pulsar'] = (gameState.asteroids.inventory['ast_astral_pulsar'] || 0) + 1;
            }
            gameState.rebirthPoints += 100000;
        }
    },

    // --- [방치 자동화 분야: a15 ~ a19] ---
    {
        id: 'a15',
        title: 'Autonomous Engine',
        req: () => gameState.idlePower >= 1000,
        desc: 'Reach 1,000 Raibos/sec',
        rewardDesc: 'Free Idle Upgrades (+5 Levels to i1~i2)',
        onUnlock: () => {
            ['i1', 'i2'].forEach(id => {
                gameState.upgradeLevels[id] = (gameState.upgradeLevels[id] || 0) + 5;
            });
            recalculatePowers();
        }
    },
    {
        id: 'a16',
        title: 'Perpetual Motion',
        req: () => gameState.idlePower >= 1e6,
        desc: 'Reach 1M Raibos/sec',
        rewardDesc: '+250 Invasion Energy & Instant 30s Idle Production',
        onUnlock: () => {
            if (gameState.invasion) gameState.invasion.energy = Math.min(gameState.invasion.energyMax, (gameState.invasion.energy || 0) + 250);
            const gain = (gameState.idlePower || 0) * 30;
            gameState.raibos += gain;
            gameState.totalRaibos += gain;
        }
    },
    {
        id: 'a17',
        title: 'Stellar Dyson Core',
        req: () => gameState.idlePower >= 1e9,
        desc: 'Reach 1B Raibos/sec',
        rewardDesc: '+500 RP & 1 Free Stony Chondrite Asteroid',
        onUnlock: () => {
            gameState.rebirthPoints += 500;
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_stony'] = (gameState.asteroids.inventory['ast_stony'] || 0) + 1;
            }
        }
    },
    {
        id: 'a18',
        title: 'Galactic Industrialist',
        req: () => gameState.idlePower >= 1e12,
        desc: 'Reach 1T Raibos/sec',
        rewardDesc: '+1 Free Rare Crystal Pallasite & +5 Skill Pulls',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_crystal'] = (gameState.asteroids.inventory['ast_crystal'] || 0) + 1;
            }
            if (gameState.activeSkills) gameState.activeSkills.charges += 5;
        }
    },
    {
        id: 'a19',
        title: 'Omnipresent Factory',
        req: () => gameState.idlePower >= 1e15,
        desc: 'Reach 1Qd Raibos/sec',
        rewardDesc: 'Instant 15-Minute Massive Production Surplus',
        onUnlock: () => {
            const gain = (gameState.idlePower || 0) * 900;
            gameState.raibos += gain;
            gameState.totalRaibos += gain;
        }
    },

    // --- [상점 업그레이드 분야: a20 ~ a23] ---
    {
        id: 'a20',
        title: 'First Investment',
        req: () => Object.values(gameState.upgradeLevels || {}).reduce((a, b) => a + b, 0) >= 10,
        desc: 'Purchase 10 upgrades total',
        rewardDesc: 'Instant 10x Current Click Power Raibos',
        onUnlock: () => {
            const gain = (gameState.clickPower || 1) * 10;
            gameState.raibos += gain;
            gameState.totalRaibos += gain;
        }
    },
    {
        id: 'a21',
        title: 'Expansionist',
        req: () => Object.values(gameState.upgradeLevels || {}).reduce((a, b) => a + b, 0) >= 100,
        desc: 'Purchase 100 upgrades total',
        rewardDesc: '+100 Invasion Energy & +3 Skill Pulls',
        onUnlock: () => {
            if (gameState.invasion) gameState.invasion.energy = Math.min(gameState.invasion.energyMax, (gameState.invasion.energy || 0) + 100);
            if (gameState.activeSkills) gameState.activeSkills.charges += 3;
        }
    },
    {
        id: 'a22',
        title: 'Infrastructure Lord',
        req: () => Object.values(gameState.upgradeLevels || {}).reduce((a, b) => a + b, 0) >= 500,
        desc: 'Purchase 500 upgrades total',
        rewardDesc: '+5 Free Random Click & Idle Upgrade Levels',
        onUnlock: () => {
            ['c4', 'c5', 'i3', 'i4'].forEach(id => {
                gameState.upgradeLevels[id] = (gameState.upgradeLevels[id] || 0) + 5;
            });
            recalculatePowers();
        }
    },
    {
        id: 'a23',
        title: 'Omega Builder',
        req: () => Object.values(gameState.upgradeLevels || {}).reduce((a, b) => a + b, 0) >= 1500,
        desc: 'Purchase 1,500 upgrades total',
        rewardDesc: '+2,500 RP & Instant Energy Full Recharge',
        onUnlock: () => {
            gameState.rebirthPoints += 2500;
            if (gameState.invasion) gameState.invasion.energy = gameState.invasion.energyMax;
        }
    },

    // --- [환생 및 별자리 스킬 분야: a24 ~ a29] ---
    {
        id: 'a24',
        title: 'New Horizon',
        req: () => (gameState.rebirthCount || 0) >= 1 || gameState.rebirthPoints > 0,
        desc: 'Rebirth for the first time',
        rewardDesc: '+50 Extra Rebirth Points Starting Grant',
        onUnlock: () => {
            gameState.rebirthPoints += 50;
        }
    },
    {
        id: 'a25',
        title: 'Ascension Cycle',
        req: () => (gameState.rebirthCount || 0) >= 5,
        desc: 'Rebirth 5 times',
        rewardDesc: '+250 RP & +3 Skill Pulls',
        onUnlock: () => {
            gameState.rebirthPoints += 250;
            if (gameState.activeSkills) gameState.activeSkills.charges += 3;
        }
    },
    {
        id: 'a26',
        title: 'Rebirth Veteran',
        req: () => (gameState.rebirthCount || 0) >= 20,
        desc: 'Rebirth 20 times',
        rewardDesc: '+1,500 RP & 1 Free Uncommon Iron Meteorite',
        onUnlock: () => {
            gameState.rebirthPoints += 1500;
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_metallic'] = (gameState.asteroids.inventory['ast_metallic'] || 0) + 1;
            }
        }
    },
    {
        id: 'a27',
        title: 'RP Hoarder',
        req: () => gameState.rebirthPoints >= 10000,
        desc: 'Accumulate 10,000 Rebirth Points',
        rewardDesc: '+2,000 Extra RP Dividend',
        onUnlock: () => {
            gameState.rebirthPoints += 2000;
        }
    },
    {
        id: 'a28',
        title: 'Stargazer',
        req: () => Object.values(gameState.constellation || {}).reduce((a, b) => a + b, 0) >= 10,
        desc: 'Unlock 10 Constellation skill levels',
        rewardDesc: '+1 Free Level to Starlight Resonance (c_click)',
        onUnlock: () => {
            gameState.constellation['c_click'] = (gameState.constellation['c_click'] || 0) + 1;
            recalculatePowers();
        }
    },
    {
        id: 'a29',
        title: 'Constellation Weaver',
        req: () => Object.values(gameState.constellation || {}).reduce((a, b) => a + b, 0) >= 50,
        desc: 'Unlock 50 Constellation skill levels',
        rewardDesc: '+1 Free Level to Void Harvester (c_idle) & +5,000 RP',
        onUnlock: () => {
            gameState.constellation['c_idle'] = (gameState.constellation['c_idle'] || 0) + 1;
            gameState.rebirthPoints += 5000;
            recalculatePowers();
        }
    },

    // --- [소행성 추출 분야: a30 ~ a33] ---
    {
        id: 'a30',
        title: 'Cosmic Prospector',
        req: () => (gameState.asteroids && gameState.asteroids.totalPulls >= 1),
        desc: 'Extract an Asteroid 1 time',
        rewardDesc: '+2 Free Stony Chondrite Asteroids',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_stony'] = (gameState.asteroids.inventory['ast_stony'] || 0) + 2;
                recalculatePowers();
            }
        }
    },
    {
        id: 'a31',
        title: 'Meteor Hunter',
        req: () => (gameState.asteroids && gameState.asteroids.totalPulls >= 50),
        desc: 'Extract 50 Asteroids',
        rewardDesc: '+1 Free Rare Crystal Pallasite & +100 Energy',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_crystal'] = (gameState.asteroids.inventory['ast_crystal'] || 0) + 1;
                recalculatePowers();
            }
            if (gameState.invasion) gameState.invasion.energy = Math.min(gameState.invasion.energyMax, (gameState.invasion.energy || 0) + 100);
        }
    },
    {
        id: 'a32',
        title: 'Asteroid Belt Miner',
        req: () => (gameState.asteroids && gameState.asteroids.totalPulls >= 250),
        desc: 'Extract 250 Asteroids',
        rewardDesc: '1 Free Legendary Dark Matter Asteroid',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_darkmatter'] = (gameState.asteroids.inventory['ast_darkmatter'] || 0) + 1;
                recalculatePowers();
            }
        }
    },
    {
        id: 'a33',
        title: 'Collector of the Stars',
        req: () => (gameState.asteroids && Object.keys(gameState.asteroids.inventory || {}).length >= 5),
        desc: 'Own 5 different types of Asteroids',
        rewardDesc: '+1 Free Epic Plasma Comet & +3 Skill Pulls',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_plasma'] = (gameState.asteroids.inventory['ast_plasma'] || 0) + 1;
                recalculatePowers();
            }
            if (gameState.activeSkills) gameState.activeSkills.charges += 3;
        }
    },

    // --- [행성 침략 및 멀티버스 분야: a34 ~ a38] ---
    {
        id: 'a34',
        title: 'First Drop',
        req: () => (gameState.invasion && (gameState.invasion.conqueredRegions || []).length >= 1),
        desc: 'Conquer your first region',
        rewardDesc: '+200 Invasion Energy Immediate Injection',
        onUnlock: () => {
            if (gameState.invasion) gameState.invasion.energy = Math.min(gameState.invasion.energyMax, (gameState.invasion.energy || 0) + 200);
        }
    },
    {
        id: 'a35',
        title: 'Terran Overlord',
        req: () => (gameState.invasion && (gameState.invasion.conqueredRegions || []).length >= 10),
        desc: 'Conquer 10 regions',
        rewardDesc: '+500 Invasion Energy & +300 RP',
        onUnlock: () => {
            if (gameState.invasion) gameState.invasion.energy = Math.min(gameState.invasion.energyMax, (gameState.invasion.energy || 0) + 500);
            gameState.rebirthPoints += 300;
        }
    },
    {
        id: 'a36',
        title: 'System Conqueror',
        req: () => (gameState.invasion && (gameState.invasion.conqueredRegions || []).length >= 25),
        desc: 'Conquer 25 regions',
        rewardDesc: 'Instant +20% Progress to Current Selected Region',
        onUnlock: () => {
            if (gameState.invasion && selectedRegionId) {
                let prog = (gameState.invasion.regionProgress[selectedRegionId] || 0) + 20;
                if (prog >= 100) {
                    prog = 100;
                    if (!gameState.invasion.conqueredRegions.includes(selectedRegionId)) {
                        gameState.invasion.conqueredRegions.push(selectedRegionId);
                        recalculatePowers();
                        checkPlanetClear();
                    }
                }
                gameState.invasion.regionProgress[selectedRegionId] = prog;
                updateInvasionUI();
            }
        }
    },
    {
        id: 'a37',
        title: 'Planetary Purge',
        req: () => (gameState.invasion && gameState.invasion.currentPlanet >= 1),
        desc: 'Advance past Earth to Mars',
        rewardDesc: '+1,000 Invasion Energy & +1,000 RP',
        onUnlock: () => {
            if (gameState.invasion) gameState.invasion.energy = Math.min(gameState.invasion.energyMax, (gameState.invasion.energy || 0) + 1000);
            gameState.rebirthPoints += 1000;
        }
    },
    {
        id: 'a38',
        title: 'Multiverse Jumper',
        req: () => (gameState.multiverse || 1) >= 2,
        desc: 'Jump to Multiverse 2 for the first time',
        rewardDesc: '1 Free Fabled Astral Pulsar Meteor & +10,000 RP',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_astral_pulsar'] = (gameState.asteroids.inventory['ast_astral_pulsar'] || 0) + 1;
                recalculatePowers();
            }
            gameState.rebirthPoints += 10000;
        }
    },

    // --- [액티브 스킬 분야: a39 ~ a40] ---
    {
        id: 'a39',
        title: 'Skill Awakened',
        req: () => (gameState.activeSkills && gameState.activeSkills.totalSkillsUsed >= 1),
        desc: 'Activate an Active Skill for the first time',
        rewardDesc: '+3 Skill Pulls & Instant Cooldown Reset',
        onUnlock: () => {
            if (gameState.activeSkills) {
                gameState.activeSkills.charges += 3;
                gameState.activeSkills.cooldowns = {};
            }
        }
    },
    {
        id: 'a40',
        title: 'Skill Conductor',
        req: () => (gameState.activeSkills && gameState.activeSkills.totalSkillsUsed >= 25),
        desc: 'Activate Active Skills 25 times',
        rewardDesc: 'Instant 2-Minute Production Time Skip & Cooldowns Cleared',
        onUnlock: () => {
            const gain = (gameState.idlePower || 0) * 120;
            gameState.raibos += gain;
            gameState.totalRaibos += gain;
            if (gameState.activeSkills) gameState.activeSkills.cooldowns = {};
        }
    },

    // --- [히든 업적: h1 ~ h10] ---
    {
        id: 'h1',
        title: 'Speed of Sound',
        req: () => gameState.totalClicks >= 100 && (gameState.totalRaibos < 5000),
        desc: 'Click 100 times before earning 5,000 Raibos',
        rewardDesc: '+500 Starting Raibos & +2 Skill Pulls',
        onUnlock: () => {
            gameState.raibos += 500;
            gameState.totalRaibos += 500;
            if (gameState.activeSkills) gameState.activeSkills.charges += 2;
        },
        hidden: true
    },
    {
        id: 'h2',
        title: 'Chrono Hunter',
        req: () => (gameState.timeSkipsUsed || 0) >= 3,
        desc: 'Catch the Golden Chrono-Raibos 3 times',
        rewardDesc: 'Instant 5-Minute Golden Production Blast',
        onUnlock: () => {
            const gain = (gameState.idlePower || 0) * 300;
            gameState.raibos += gain;
            gameState.totalRaibos += gain;
        },
        hidden: true
    },
    {
        id: 'h3',
        title: 'Legendary Summoner',
        req: () => (gameState.activeSkills && (gameState.activeSkills.unlocked['sk_supernova'] > 0 || gameState.activeSkills.unlocked['sk_genesis'] > 0)),
        desc: 'Extract a Legendary Active Skill (0.1% chance)',
        rewardDesc: '1 Free Legendary Dark Matter Asteroid & +5,000 RP',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_darkmatter'] = (gameState.asteroids.inventory['ast_darkmatter'] || 0) + 1;
                recalculatePowers();
            }
            gameState.rebirthPoints += 5000;
        },
        hidden: true
    },
    {
        id: 'h4',
        title: 'Void Weaver',
        req: () => (gameState.activeSkills && gameState.activeSkills.unlocked['sk_blackhole'] > 0),
        desc: 'Extract the Epic Skill Black Hole Graviton',
        rewardDesc: '+1,000 Invasion Energy & +3 Skill Pulls',
        onUnlock: () => {
            if (gameState.invasion) gameState.invasion.energy = Math.min(gameState.invasion.energyMax, (gameState.invasion.energy || 0) + 1000);
            if (gameState.activeSkills) gameState.activeSkills.charges += 3;
        },
        hidden: true
    },
    {
        id: 'h5',
        title: 'Clean Slate',
        req: () => (gameState.activeSkills && gameState.activeSkills.totalSkillPulls >= 50),
        desc: 'Pull Active Skills 50 times',
        rewardDesc: '+10,000 RP & Instant Full Energy Recharge',
        onUnlock: () => {
            gameState.rebirthPoints += 10000;
            if (gameState.invasion) gameState.invasion.energy = gameState.invasion.energyMax;
        },
        hidden: true
    },
    {
        id: 'h6',
        title: 'Red Storm',
        req: () => (gameState.invasion && gameState.invasion.currentPlanet >= 2),
        desc: 'Reach Jupiter in invasion',
        rewardDesc: '+1,500 Invasion Energy & +2,000 RP',
        onUnlock: () => {
            if (gameState.invasion) gameState.invasion.energy = Math.min(gameState.invasion.energyMax, (gameState.invasion.energy || 0) + 1500);
            gameState.rebirthPoints += 2000;
        },
        hidden: true
    },
    {
        id: 'h7',
        title: 'Ring Conqueror',
        req: () => (gameState.invasion && gameState.invasion.currentPlanet >= 3),
        desc: 'Reach Saturn in invasion',
        rewardDesc: '1 Free Epic Plasma Comet & +5,000 RP',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_plasma'] = (gameState.asteroids.inventory['ast_plasma'] || 0) + 1;
                recalculatePowers();
            }
            gameState.rebirthPoints += 5000;
        },
        hidden: true
    },
    {
        id: 'h8',
        title: 'Deep Space Apex',
        req: () => (gameState.invasion && gameState.invasion.currentPlanet >= 4),
        desc: 'Reach Uranus in invasion',
        rewardDesc: '+10,000 RP & Instant 10-Minute Production',
        onUnlock: () => {
            gameState.rebirthPoints += 10000;
            const gain = (gameState.idlePower || 0) * 600;
            gameState.raibos += gain;
            gameState.totalRaibos += gain;
        },
        hidden: true
    },
    {
        id: 'h9',
        title: 'Solar Dominion',
        req: () => (gameState.invasion && gameState.invasion.currentPlanet === 5 && planetsData[5].regions.every(r => (gameState.invasion.conqueredRegions || []).includes(r.id))),
        desc: 'Conquer the entire Solar System',
        rewardDesc: '1 Free Fabled Astral Pulsar Meteor & +50,000 RP',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_astral_pulsar'] = (gameState.asteroids.inventory['ast_astral_pulsar'] || 0) + 1;
                recalculatePowers();
            }
            gameState.rebirthPoints += 50000;
            if (gameState.invasion) gameState.invasion.energy = gameState.invasion.energyMax;
        },
        hidden: true
    },
    {
        id: 'h10',
        title: 'Multiverse Sovereign',
        req: () => (gameState.multiverse || 1) >= 3,
        desc: 'Reach Multiverse 3',
        rewardDesc: '1 Free Mythic Singularity Core & +100,000 RP',
        onUnlock: () => {
            if (gameState.asteroids) {
                gameState.asteroids.inventory['ast_singularity'] = (gameState.asteroids.inventory['ast_singularity'] || 0) + 1;
                recalculatePowers();
            }
            gameState.rebirthPoints += 100000;
        },
        hidden: true
    }
];

// ==========================================
// Internationalization (i18n) System (KO / EN)
// ==========================================
const i18n = {
    lang: localStorage.getItem('raibos_lang') || 'ko', // 한국어 기본값

    t(key) {
        if (this.lang === 'ko' && this.strings.ko[key] !== undefined) {
            return this.strings.ko[key];
        }
        return this.strings.en[key] !== undefined ? this.strings.en[key] : key;
    },

    toggle() {
        this.lang = this.lang === 'ko' ? 'en' : 'ko';
        localStorage.setItem('raibos_lang', this.lang);
        this.apply();
        showToast(
            this.lang === 'ko' ? '🌐 언어 변경' : '🌐 Language Changed',
            this.lang === 'ko' ? '한국어로 변경되었습니다.' : 'Switched to English.'
        );
    },

    strings: {
        en: {
            title: 'Raibos Simulator',
            currency: 'Raibos',
            per_sec: 'Raibos / sec',
            per_click: 'Raibos / click',
            global_mult: 'Global Multiplier',
            rebirth_badge: 'Rebirth: ',
            menu: 'Menu',
            hard_reset_btn: 'Hard Reset ⚠️',
            hard_reset_confirm: 'Are you sure you want to RESET EVERYTHING? All your progress, RP, constellation, asteroids and invasion data will be permanently wiped!',
            
            // Tabs
            tab_click: 'Click',
            tab_idle: 'Idle',
            tab_gacha: 'Gacha ☄️',
            tab_rebirth: 'Rebirth',
            tab_trophies: 'Trophies',
            tab_invasion: 'Invasion',
            tab_ranking: 'Ranking',

            // Asteroid Gacha
            gacha_title: '☄️ Asteroid Core Extraction',
            gacha_desc: 'Spend Raibos to extract Rare Asteroids! Higher rarity asteroids grant game-wide permanent buffs.',
            gacha_placeholder: 'Extract an Asteroid',
            gacha_cost_scaling: 'Cost scaling with total extractions',
            gacha_luck_mult: '🌌 Multiverse Luck Multiplier: ',
            gacha_btn_extract: 'Extract 1x',
            gacha_btn_auto: 'Auto-Extract: ',
            gacha_collection: 'Extracted Asteroids Collection',

            // Rebirth
            rebirth_title: 'Ascend to Next Realm',
            rebirth_desc: 'Ascending resets your current progress but grants <span style="color:#ffaa00; font-weight:bold;">Rebirth Points</span> which multiply all future gains.',
            rebirth_curr_rp: 'Current Points: ',
            rebirth_earn_rp: 'Points to Earn: ',
            rebirth_req_label: 'Entry Requirement: ',
            rebirth_ascend_btn: 'ASCEND (+{0} RP)',
            rebirth_need_btn: 'NEED {0} RAIBOS ({1}%)',
            rebirth_confirm: 'Do you want to rebirth? All progress will be reset and you will receive {0} RP.',
            rebirth_toast_title: 'Ascension Complete!',
            rebirth_toast_desc: 'You earned +{0} RP! Cosmic power grows.',
            constellation_box_title: 'Constellation (Skill Tree)',
            constellation_box_desc: 'Spend RP on permanent cosmic abilities. Note: Spending RP reduces your base multiplier!',
            constellation_open_btn: 'OPEN CONSTELLATION SKILL TREE 🌌',

            // Constellation Modal
            constellation_modal_title: 'Constellation',
            constellation_available_rp: 'Available RP: ',
            constellation_close_btn: 'Close',
            constellation_tier: 'Tier {0}',
            constellation_cost: 'Cost: {0} RP',
            constellation_level: 'Level {0} / {1}',
            constellation_locked: 'LOCKED',
            constellation_maxed: 'MAXED',
            constellation_buy_one: '+1 Level',
            constellation_buy_max: 'MAX',
            constellation_requires: '🔒 Requires: ',

            // Invasion
            invasion_energy_label: 'Invasion Energy',
            planet_conquest_in_progress: 'Conquest in progress...',
            planet_fully_conquered: '✨ Fully Conquered! (You can navigate freely)',
            multiverse_jump_btn: '🌌 MULTIVERSE JUMP 🌌',
            mv_jump_confirm: 'Are you sure you want to jump to Multiverse {0}? Planets and invasion progress will reset, but non-energy buffs and all previous progress will be retained!',
            select_region: 'Select a Region',
            reward_label: 'Reward: ',
            region_conquered: 'Conquered',
            region_cost: 'Cost: {0}',
            invade_btn: 'INVADE ({0})',
            invade_conquered_btn: 'CONQUERED',
            invade_energy_btn: 'ENERGY: {0}',

            // Offline Modal
            offline_title: 'Welcome Back!',
            offline_text1: 'While you were away for ',
            offline_text2: 'The Raibos worked hard:',
            offline_btn: 'Awesome!',

            // BGM
            bgm_track_arcade: '👾 8-Bit Arcade',
            bgm_track_ambient: '🌌 Cosmic Ambient'
        },
        ko: {
            title: '라이보스 시뮬레이터',
            currency: '라이보스',
            per_sec: '초당 라이보스',
            per_click: '클릭당 라이보스',
            global_mult: '전역 배수',
            rebirth_badge: '환생: ',
            menu: '메뉴',
            hard_reset_btn: '전체 초기화 ⚠️',
            hard_reset_confirm: '정말 모든 데이터를 초기화하시겠습니까? 보유 라이보스, 환생 포인트, 별자리 스킬, 소행성 및 침략 데이터가 영구적으로 삭제됩니다!',

            // Tabs
            tab_click: '클릭',
            tab_idle: '방치 (자동)',
            tab_gacha: '소행성 ☄️',
            tab_rebirth: '환생',
            tab_trophies: '업적',
            tab_invasion: '행성 침략',
            tab_ranking: '랭킹',

            // Asteroid Gacha
            gacha_title: '☄️ 소행성 코어 추출',
            gacha_desc: '라이보스를 소모해 희귀 소행성을 추출하세요! 높은 등급의 소행성은 게임 전체에 강력한 영구 버프를 부여합니다.',
            gacha_placeholder: '소행성을 추출하세요',
            gacha_cost_scaling: '추출 횟수에 따라 비용이 증가합니다',
            gacha_luck_mult: '🌌 멀티버스 행운 배수: ',
            gacha_btn_extract: '1회 추출',
            gacha_btn_auto: '자동 추출: ',
            gacha_collection: '보유 소행성 목록',

            // Rebirth
            rebirth_title: '다음 차원으로 환생',
            rebirth_desc: '환생하면 현재 진행도가 초기화되지만, 모든 미래 생산량을 영구 증폭시키는 <span style="color:#ffaa00; font-weight:bold;">환생 포인트(RP)</span>를 획득합니다.',
            rebirth_curr_rp: '현재 보유 RP: ',
            rebirth_earn_rp: '획득 가능 RP: ',
            rebirth_req_label: '최소 요구치: ',
            rebirth_ascend_btn: '환생하기 (+{0} RP)',
            rebirth_need_btn: '{0} 라이보스 필요 ({1}%)',
            rebirth_confirm: '환생하시겠습니까? 현재 진행도가 초기화되고 {0} RP를 획득합니다.',
            rebirth_toast_title: '환생 완료!',
            rebirth_toast_desc: '+{0} RP 획득! 우주적 힘이 강화되었습니다.',
            constellation_box_title: '별자리 (스킬 트리)',
            constellation_box_desc: 'RP를 소모해 영구적인 우주 능력을 해금하세요. (RP를 소모하면 기본 배수가 감소합니다!)',
            constellation_open_btn: '별자리 스킬 트리 열기 🌌',

            // Constellation Modal
            constellation_modal_title: '별자리 스킬 트리',
            constellation_available_rp: '보유 RP: ',
            constellation_close_btn: '닫기',
            constellation_tier: '티어 {0}',
            constellation_cost: '비용: {0} RP',
            constellation_level: '레벨 {0} / {1}',
            constellation_locked: '잠김',
            constellation_maxed: '최대 레벨',
            constellation_buy_one: '+1 레벨',
            constellation_buy_max: '최대',
            constellation_requires: '🔒 선행 스킬: ',

            // Invasion
            invasion_energy_label: '침략 에너지',
            planet_conquest_in_progress: '정복 진행 중...',
            planet_fully_conquered: '✨ 완전 정복 완료! (자유롭게 이동 가능)',
            multiverse_jump_btn: '🌌 멀티버스 도약 🌌',
            mv_jump_confirm: '멀티버스 {0}(으)로 도약하시겠습니까? 행성과 침략 진행도는 초기화되지만, 비에너지 버프 및 이전의 모든 진행도는 보존됩니다!',
            select_region: '지역을 선택하세요',
            reward_label: '보상: ',
            region_conquered: '정복 완료',
            region_cost: '비용: {0}',
            invade_btn: '침략하기 ({0})',
            invade_conquered_btn: '정복 완료',
            invade_energy_btn: '에너지 부족: {0}',

            // Offline Modal
            offline_title: '돌아오신 것을 환영합니다!',
            offline_text1: '자리를 비운 ',
            offline_text2: '라이보스들이 열심히 일했습니다:',
            offline_btn: '확인',

            // BGM
            bgm_track_arcade: '👾 8비트 아케이드',
            bgm_track_ambient: '🌌 우주 앰비언트'
        }
    },

    planetsKo: {
        'Earth': '지구',
        'Moon': '달',
        'Mars': '화성',
        'Jupiter': '목성',
        'Saturn': '토성',
        'Neptune': '해왕성',
        'Pluto': '명왕성',
        'Sun': '태양',
        'Proxima Centauri': '프록시마 센타우리',
        'Sirius': '시리우스',
        'Vega': '베가',
        'Polaris': '북극성',
        'Betelgeuse': '베텔게우스',
        'Canopus': '카노푸스',
        'Rigel': '리겔',
        'Cygnus X-1': '백조자리 X-1',
        'Sagittarius A*': '궁수자리 A*',
        'Andromeda': '안드로메다 은하'
    },
    getPlanetName(planet) {
        if (this.lang === 'ko' && this.planetsKo[planet.name]) {
            return this.planetsKo[planet.name];
        }
        return planet.name;
    },

    regionsKo: {
        'Asia': '아시아', 'Europe': '유럽', 'North America': '북아메리카', 'South America': '남아메리카', 'Africa': '아프리카', 'Oceania': '오세아니아', 'Antarctica': '남극',
        'Sea of Tranquility': '고요의 바다', 'Ocean of Storms': '폭풍의 대양', 'Copernicus Crater': '코페르니쿠스 분화구', 'Tycho Crater': '티코 분화구',
        'Olympus Mons': '올림푸스 화산', 'Valles Marineris': '매리너 계곡', 'Hellas Planitia': '헬라스 평원', 'Gale Crater': '게일 분화구', 'Tharsis Rise': '타르시스 고원',
        'Great Red Spot': '대적점', 'North Temperate Belt': '북온대 띠', 'South Equatorial Belt': '남적도 띠', 'Io Plasma Torus': '이오 플라즈마 토러스', 'Callisto Basin': '칼리스토 분지',
        'Titan Dunes': '타이탄 사구', 'Enceladus Plumes': '엔켈라두스 간헐천', 'Ring Sector Alpha': 'A고리 구역', 'Hexagon Storm': '육각형 제트기류', 'Rhea Crater': '레아 크레이터',
        'Great Dark Spot': '대암점', 'Triton Cryogeysers': '트리톤 얼음간헐천', 'Scooter Cloud': '스쿠터 구름', 'South Pole Vortex': '남극 와류',
        'Tombaugh Regio': '톰보 지역 (하트)', 'Cthulhu Macula': '크툴루 흑반', 'Sputnik Planitia': '스푸트니크 평원', 'Charon Chasm': '카론 협곡',
        'Corona Core': '코로나 코어', 'Solar Flare Belt': '플레어 벨트', 'Radiative Zone': '복사층', 'Convective Zone': '대류층',
        'Proxima b': '프록시마 b', 'Flare Zone': '플레어 지대', 'Dust Ring': '먼지 고리',
        'Sirius A Core': '시리우스 A 코어', 'Sirius B Dwarf': '시리우스 B 백색왜성', 'Binary Orbit': '연성 궤도',
        'Equatorial Bulge': '적도 팽창대', 'Debris Disk': '잔해 원반', 'Blue Ion Field': '청색 이온장',
        'Alpha Polaris': '북극성 알파', 'Cepheid Pulse': '세페이드 맥동', 'Supergiant Halo': '초거성 헤일로',
        'Atmospheric Shell': '대기 껍질', 'Convection Plume': '대류 플룸', 'Supernova Seed': '초신성 전구체',
        'Supergiant Core': '초거성 핵', 'Stellar Wind Field': '항성풍 지대', 'Golden Corona': '황금 코로나',
        'Blue Supergiant Core': '청색초거성 핵', 'Rigel Nebula': '리겔 성운', 'Radiation Tempest': '방사선 폭풍',
        'Accretion Disk': '강착 원반', 'Relativistic Jet': '상대론적 제트', 'Event Horizon': '사건의 지평선',
        'Supermassive Core': '초대질량 블랙홀', 'Photon Sphere': '광자구', 'Gravitational Singularity': '중력 특이점',
        'Galactic Nucleus': '은하핵', 'Spiral Arm Alpha': '알파 나선팔', 'Stellar Nursery': '항성 요람', 'Halo Clusters': '헤일로 성단'
    },
    getRegionName(region) {
        if (this.lang === 'ko' && this.regionsKo[region.name]) {
            return this.regionsKo[region.name];
        }
        return region.name;
    },
    getRegionBuff(region) {
        if (this.lang === 'ko') {
            return region.buff
                .replace('Click Power', '클릭 파워')
                .replace('Idle Power', '초당 생산량')
                .replace('Upgrade Cost', '업그레이드 비용')
                .replace('Global Multiplier', '전역 배수')
                .replace('Energy Regen', '에너지 회복 속도')
                .replace('Energy Max', '최대 에너지')
                .replace('All Production', '모든 생산량');
        }
        return region.buff;
    },

    asteroidsKo: {
        'ast_stony': { name: '구립 운석 (스토니)', rarity: '일반', desc: '클릭 및 초당 생산량 +1% (소프트캡)' },
        'ast_metallic': { name: '철질 운석', rarity: '고급', desc: '전역 배수 +0.5% (소프트캡)' },
        'ast_crystal': { name: '결정 팰러사이트', rarity: '희귀', desc: '환생 시 RP 획득량 +1% (소프트캡)' },
        'ast_plasma': { name: '플라즈마 혜성', rarity: '에픽', desc: '최대 침략 에너지 및 회복 속도 +1.6% (소프트캡)' },
        'ast_darkmatter': { name: '암흑 물질 소행성', rarity: '전설', desc: '모든 생산량 +5% (소프트캡)' },
        'ast_astral_pulsar': { name: '아스트랄 펄서 유성', rarity: '페이블 (신화급 이전)', desc: '모든 생산량 +7.5% & RP 획득량 +5%' },
        'ast_singularity': { name: '특이점 코어', rarity: '신화', desc: '전역 배수 +10% 및 RP 획득량 +10%' },
        'ast_hypernova': { name: '초신성 잔해 코어', rarity: '코스믹 (1/10만)', desc: '클릭 및 초당 생산량 +20% & 에너지 회복 +5%' },
        'ast_chronos': { name: '시간의 파편', rarity: '이터널 (1/100만)', desc: '전역 배수 +40% & RP 획득량 +20%' },
        'ast_void_heart': { name: '공허의 심장', rarity: '디바인 (1/1000만)', desc: '모든 생산량 +100% & 최대 에너지 +40%' },
        'ast_genesis': { name: '창세의 불꽃', rarity: '셀레스티아 (1/5000만)', desc: '전역 배수 x1.2 & RP 획득량 +60%' },
        'ast_primordial': { name: '태초의 옴니버스 코어', rarity: '초월 (1/1억)', desc: '전역 배수 x1.8 & RP 획득량 +100%' }
    },
    getAstName(ast) {
        return (this.lang === 'ko' && this.asteroidsKo[ast.id]) ? this.asteroidsKo[ast.id].name : ast.name;
    },
    getAstRarity(ast) {
        return (this.lang === 'ko' && this.asteroidsKo[ast.id]) ? this.asteroidsKo[ast.id].rarity : ast.rarity;
    },
    getAstDesc(ast) {
        return (this.lang === 'ko' && this.asteroidsKo[ast.id]) ? this.asteroidsKo[ast.id].desc : ast.desc;
    },

    constellationKo: {
        'c_click': { name: '별빛 공명', desc: '레벨당 클릭 파워 +50%' },
        'c_idle': { name: '공허 수확기', desc: '레벨당 초당 생산량 +50%' },
        'c_energy_start': { name: '우주 배터리', desc: '환생 시 최대 에너지 +10%로 시작' },
        'c_cost': { name: '양자 효율', desc: '레벨당 모든 업그레이드 비용 -2%' },
        'c_regen': { name: '암흑 물질 원자로', desc: '레벨당 초당 기본 에너지 회복 +1' },
        'c_rp': { name: '천상의 수확', desc: '레벨당 환생 시 RP 획득량 +10%' },
        'c_global': { name: '성운 증폭기', desc: '레벨당 영구 전역 배수 +5%' },
        'c_invasion_cost': { name: '워프 침투', desc: '레벨당 침략 에너지 소모량 -2%' },
        'c_energy_max': { name: '항성 축전기', desc: '레벨당 최대 에너지 용량 +5%' },
        'c_invasion_progress': { name: '양자 타격', desc: '레벨당 최소 침략 진행도 +5%' },
        'c_offline': { name: '시간의 메아리', desc: '레벨당 오프라인 생산량 +10%' },
        'c_click_idle_sync': { name: '조화 공명', desc: '레벨당 초당 생산량의 1%를 클릭 파워에 추가' },
        'c_rp_mult_decay': { name: '영원의 서약', desc: '레벨당 보유 RP 1개당 전역 배수 +0.1% 추가' },
        'c_timeskip': { name: '시간 균열', desc: '레벨당 타임스킵 +1분' },
        'c_achv_bonus': { name: '우주 기록보관소', desc: '레벨당 업적 배수 보너스 +5%' },
        'c_region_rp': { name: '정복 배당금', desc: '레벨당 정복한 지역 1곳당 환생 시 +2 RP 획득' },
        'c_energy_on_conquest': { name: '전리품 수탈', desc: '레벨당 지역 정복 시 최대 에너지의 5% 즉시 회복' },
        'c_click_multiplier_spike': { name: '초신성 폭발', desc: '레벨당 클릭 파워 2배 발동 확률 +10%' },
        'c_idle_floor': { name: '공허 닻', desc: '환생 시 초당 생산량 하한선 유지' },
        'c_upgrade_speed': { name: '워프 공정', desc: '업그레이드 비용 상승률 감소' },
        'c_conquest_chain': { name: '연쇄 정복', desc: '정복 지역당 전역 배수 보너스' },
        'c_rebirth_head_start': { name: '환생 도약', desc: '환생 시 이전 총 라이보스의 0.1% 보유 시작' },
        'c_energy_regen_mult': { name: '에너지 과충전', desc: '에너지 회복 속도 배수 증가' },
        'c_super_click': { name: '슈퍼 클릭', desc: '클릭 파워 대폭 폭발 (레벨당 x2)' },
        'c_super_idle': { name: '슈퍼 방치', desc: '초당 생산량 대폭 폭발 (레벨당 x2)' },
        'c_conquest_energy_mastery': { name: '정복 에너지 마스터리', desc: '에너지 효율 극대화' },
        'c_multiverse_power': { name: '멀티버스 시너지', desc: '멀티버스당 전역 파워 배수 +50%' },
        'c_multiverse_cost_mitigation': { name: '차원 안정화', desc: '멀티버스 침략 비용 증가 대폭 완화' },
        'c_buff_nerf_shield': { name: '차원 방벽', desc: '버프 감소 효과 방어' },
        'c_t8_click_fury': { name: '항성 분노', desc: '클릭 파워 x2' },
        'c_t8_idle_reactor': { name: '항성 노심', desc: '초당 생산량 x2' },
        'c_t9_energy_overload': { name: '에너지 과부하', desc: '최대 에너지 용량 2배' },
        'c_t9_rp_overflow': { name: '초차원 수확', desc: 'RP 획득량 +50%' },
        'c_t10_cosmic_multiplier': { name: '우주 초배수', desc: '전역 배수 x3' },
        'c_t10_cosmic_battery_overcharge': { name: '우주 전지 과충전', desc: '환생 시 시작 에너지 100%' },
        'c_t11_conquest_frenzy': { name: '광란의 정복', desc: '정복 속도 3배' },
        'c_t11_temporal_mastery': { name: '시간 마스터리', desc: '타임스킵 효과 극대화' },
        'c_t12_stellar_fusion': { name: '항성 융합', desc: '클릭 및 초당 생산량 x3' },
        'c_t12_singularity_harvester': { name: '특이점 수확기', desc: 'RP 획득량 2배' },
        'c_t13_quantum_god': { name: '양자 신격', desc: '모든 생산량 x5' },
        'c_t13_hyper_conquest_efficiency': { name: '초효율 정복', desc: '침략 에너지 소모 대폭 절감' },
        'c_t14_multiverse_dominator': { name: '멀티버스 지배자', desc: '멀티버스당 전역 배수 2배' },
        'c_t15_infinity_core': { name: '무한의 코어', desc: '전역 배수 x10' },
        'c_t15_infinity_time_nexus': { name: '무한의 시간 결절', desc: '오프라인 생산 100% 반영' },
        'c_t16_dark_energy_hyperdrive': { name: '암흑 에너지 초추진', desc: '에너지 회복 속도 5배' },
        'c_t17_transcendence': { name: '초월', desc: '모든 스탯 초월적 증폭' },
        'c_t17_omniverse_resonance': { name: '옴니버스 공명', desc: '멀티버스 파워 극대화' },
        'c_t18_omniverse_warp': { name: '옴니버스 워프', desc: 'RP 획득량 5배' },
        'c_t19_primordial_singularity': { name: '태초의 특이점', desc: '전역 배수 x50' },
        'c_t19_godhead_harvest': { name: '신성 수확', desc: 'RP 획득량 10배' },
        'c_t20_absolute_apex': { name: '절대 정점', desc: '궁극의 전역 배수 x100' },
        'c_t20_infinity_overlord': { name: '무한의 군주', desc: '전지전능: 모든 효과 극대화' }
    },
    getSkillName(skill) {
        return (this.lang === 'ko' && this.constellationKo[skill.id]) ? this.constellationKo[skill.id].name : skill.name;
    },
    getSkillDesc(skill) {
        return (this.lang === 'ko' && this.constellationKo[skill.id]) ? this.constellationKo[skill.id].desc : skill.desc;
    },

            achievementsKo: {
        'a1': { title: '첫 불꽃', desc: '라이보스 1회 클릭', rewardDesc: '+100 라이보스 & 스킬 뽑기 +1회' },
        'a2': { title: '클릭 견습생', desc: '100회 클릭하기', rewardDesc: '30초 클릭분 라이보스 & 스킬 뽑기 +3회' },
        'a3': { title: '빛의 손가락', desc: '1,000회 클릭하기', rewardDesc: '클릭 업그레이드(c1~c3) 무료 +5레벨' },
        'a4': { title: '타키온 태퍼', desc: '5,000회 클릭하기', rewardDesc: '침략 에너지 +500 & 스킬 뽑기 +5회' },
        'a5': { title: '터치의 신', desc: '25,000회 클릭하기', rewardDesc: '희귀 소행성(결정 팰러사이트) & 스킬 뽑기 +10회' },

        'a6': { title: '주머니 속 동전', desc: '총 1,000 라이보스 획득', rewardDesc: '+500 라이보스 보너스' },
        'a7': { title: '우주 백만장자', desc: '총 100만 라이보스 획득', rewardDesc: '+50 RP & 침략 에너지 +100' },
        'a8': { title: '억만장자 궤도', desc: '총 10억 라이보스 획득', rewardDesc: '구립 운석 소행성 1개 & 스킬 뽑기 +2회' },
        'a9': { title: '은하 중심 조만장자', desc: '총 1조 라이보스 획득', rewardDesc: '+1,000 RP & 60초 즉시 생산' },
        'a10': { title: '초은하단 경만장자', desc: '총 1경 라이보스 획득', rewardDesc: '철질 운석 소행성 1개 & 에너지 완전 충전' },
        'a11': { title: '성운 해만장자', desc: '총 1해 라이보스 획득', rewardDesc: '에픽 플라즈마 혜성 1개 & +5,000 RP' },
        'a12': { title: '자만장자 공허', desc: '총 1자 라이보스 획득', rewardDesc: '10분치 방치 생산량 즉시 획득' },
        'a13': { title: '양만장자 정점', desc: '총 1양 라이보스 획득', rewardDesc: '+50,000 RP & 스킬 뽑기 +15회' },
        'a14': { title: '데실리온의 절대자', desc: '총 1 데실리온(1e33) 라이보스 획득', rewardDesc: '아스트랄 펄서 유성 1개 & +100,000 RP' },

        'a15': { title: '자율 엔진', desc: '초당 1,000 라이보스 생산', rewardDesc: '방치 업그레이드(i1~i2) 무료 +5레벨' },
        'a16': { title: '영구 기관', desc: '초당 100만 라이보스 생산', rewardDesc: '침략 에너지 +250 & 30초치 방치 생산' },
        'a17': { title: '다이슨 스피어 코어', desc: '초당 10억 라이보스 생산', rewardDesc: '+500 RP & 구립 운석 1개' },
        'a18': { title: '은하 산업가', desc: '초당 1조 라이보스 생산', rewardDesc: '희귀 결정 팰러사이트 1개 & 스킬 뽑기 +5회' },
        'a19': { title: '전지전능 공장', desc: '초당 1경 라이보스 생산', rewardDesc: '15분치 방치 대량 생산 보너스' },

        'a20': { title: '첫 투자', desc: '업그레이드 10회 구매', rewardDesc: '클릭 파워 10배 라이보스 즉시 지급' },
        'a21': { title: '확장주의자', desc: '업그레이드 100회 구매', rewardDesc: '침략 에너지 +100 & 스킬 뽑기 +3회' },
        'a22': { title: '인프라의 군주', desc: '업그레이드 500회 구매', rewardDesc: '상위 업그레이드(c4~c5, i3~i4) 무료 +5레벨' },
        'a23': { title: '오메가 빌더', desc: '업그레이드 1,500회 구매', rewardDesc: '+2,500 RP & 에너지 완전 충전' },

        'a24': { title: '새로운 지평선', desc: '첫 환생 달성하기', rewardDesc: '환생 포인트 +50 RP 시작 보너스' },
        'a25': { title: '상승 주기', desc: '환생 5회 달성', rewardDesc: '+250 RP & 스킬 뽑기 +3회' },
        'a26': { title: '환생 베테랑', desc: '환생 20회 달성', rewardDesc: '+1,500 RP & 철질 운석 소행성 1개' },
        'a27': { title: 'RP 수집가', desc: '환생 포인트 10,000점 축적', rewardDesc: '+2,000 RP 추가 배당금' },
        'a28': { title: '별을 보는 자', desc: '별자리 스킬 레벨 합계 10 달성', rewardDesc: '별빛 공명(c_click) 스킬 무료 +1레벨' },
        'a29': { title: '별자리의 직조공', desc: '별자리 스킬 레벨 합계 50 달성', rewardDesc: '공허 수확기(c_idle) +1레벨 & +5,000 RP' },

        'a30': { title: '우주 탐사자', desc: '소행성 1회 추출', rewardDesc: '구립 운석 소행성 2개 지급' },
        'a31': { title: '운석 사냥꾼', desc: '소행성 50회 추출', rewardDesc: '결정 팰러사이트 1개 & 에너지 +100' },
        'a32': { title: '소행성대 채굴업자', desc: '소행성 250회 추출', rewardDesc: '전설 암흑 물질 소행성 1개 지급' },
        'a33': { title: '별들의 수집가', desc: '서로 다른 소행성 5종류 보유', rewardDesc: '에픽 플라즈마 혜성 1개 & 스킬 뽑기 +3회' },

        'a34': { title: '첫 강하', desc: '첫 번째 지역 정복', rewardDesc: '침략 에너지 +200 즉시 주입' },
        'a35': { title: '지구의 지배자', desc: '지역 10곳 정복', rewardDesc: '침략 에너지 +500 & +300 RP' },
        'a36': { title: '태양계 정복자', desc: '지역 25곳 정복', rewardDesc: '선택한 침략 지역 진행도 즉시 +20%' },
        'a37': { title: '행성 관통', desc: '지구를 넘어 화성으로 진격', rewardDesc: '침략 에너지 +1,000 & +1,000 RP' },
        'a38': { title: '멀티버스 도약자', desc: '멀티버스 2로 첫 도약', rewardDesc: '아스트랄 펄서 유성 1개 & +10,000 RP' },

        'a39': { title: '스킬의 각성', desc: '액티브 스킬 1회 발동', rewardDesc: '스킬 뽑기 +3회 & 쿨타임 즉시 초기화' },
        'a40': { title: '스킬 마에스트로', desc: '액티브 스킬 25회 발동', rewardDesc: '2분치 방치 생산량 & 쿨타임 즉시 초기화' },

        'h1': { title: '음속의 돌파', desc: '5,000 라이보스를 모으기 전에 100회 클릭', rewardDesc: '+500 라이보스 & 스킬 뽑기 +2회' },
        'h2': { title: '시간 사냥꾼', desc: '골든 크로노 라이보스 3회 포획', rewardDesc: '골든 라이보스 5분치 대량 생산 즉시 발동' },
        'h3': { title: '전설의 소환사', desc: '0.1% 확률의 레전더리 액티브 스킬 획득', rewardDesc: '전설 암흑 물질 소행성 1개 & +5,000 RP' },
        'h4': { title: '공허의 조련사', desc: '에픽 스킬 블랙홀 그라비톤 획득', rewardDesc: '침략 에너지 +1,000 & 스킬 뽑기 +3회' },
        'h5': { title: '풍요로운 인벤토리', desc: '액티브 스킬 50회 뽑기', rewardDesc: '+10,000 RP & 에너지 완전 충전' },
        'h6': { title: '붉은 폭풍', desc: '행성 침략에서 목성 도달', rewardDesc: '침략 에너지 +1,500 & +2,000 RP' },
        'h7': { title: '고리의 정복자', desc: '행성 침략에서 토성 도달', rewardDesc: '에픽 플라즈마 혜성 1개 & +5,000 RP' },
        'h8': { title: '심우주의 정점', desc: '행성 침략에서 천왕성 도달', rewardDesc: '+10,000 RP & 10분치 방치 생산' },
        'h9': { title: '태양계 전역 평정', desc: '명왕성을 포함한 태양계 전 행성 정복', rewardDesc: '아스트랄 펄서 유성 1개 & +50,000 RP & 에너지 충전' },
        'h10': { title: '다중우주의 절대 군주', desc: '멀티버스 3 도달', rewardDesc: '신화 특이점 코어 1개 & +100,000 RP' }
    },
    getAchTitle(ach) {
        return (this.lang === 'ko' && this.achievementsKo[ach.id]) ? this.achievementsKo[ach.id].title : ach.title;
    },
    getAchDesc(ach) {
        return (this.lang === 'ko' && this.achievementsKo[ach.id]) ? this.achievementsKo[ach.id].desc : ach.desc;
    },
    getAchReward(ach) {
        return (this.lang === 'ko' && this.achievementsKo[ach.id] && this.achievementsKo[ach.id].rewardDesc) ? this.achievementsKo[ach.id].rewardDesc : ach.rewardDesc;
    },

    upgradesKo: {
        'c1': '라이보스 클릭커', 'c2': '강화된 커서', 'c3': '메가 핑거', 'c4': '사이버 글러브',
        'c5': '양자 클릭커', 'c6': '플라즈마 포인터', 'c7': '네온 임팩트', 'c8': '초공간 탭',
        'c9': '반물질 터치', 'c10': '차원 분쇄기', 'c11': '암흑 에너지 펄스', 'c12': '오메가 엔드',
        'i1': '라이보스 작업자', 'i2': '라이보스 발전기', 'i3': '라이보스 농장', 'i4': '라이보스 공장',
        'i5': '라이보스 광산', 'i6': '라이보스 은행', 'i7': '라이보스 신전', 'i8': '마법 타워',
        'i9': '라이보스 우주선', 'i10': '연금술 연구소', 'i11': '라이보스 포털', 'i12': '타임머신',
        'i13': '반물질 응축기', 'i14': '라이보스 프리즘', 'i15': '영원의 다이나모'
    },
        skillsKo: {
        'sk_overcharge': { name: '양자 오버차지', rarity: '일반', desc: '8초간 클릭 시 +300% 추가 라이보스 및 초당 생산량의 5% 미니 펄스 발동' },
        'sk_chrono_burst': { name: '크로노 워프 드라이브', rarity: '고급', desc: '시공간 도약: 즉시 20초분의 초당 생산량 획득 및 5초간 에너지 회복 속도 5배' },
        'sk_orbital_strike': { name: '궤도 이온 캐논', rarity: '희귀', desc: '현재 침략 지역에 폭격: 침략 진행도 +15% 즉시 상승 & 에너지 250 즉시 충전' },
        'sk_blackhole': { name: '블랙홀 그라비톤', rarity: '에픽', desc: '10초간 미니 특이점 소환: 초당 15회 자동 클릭 & 전역 배수 3배 증폭' },
        'sk_supernova': { name: '초신성 카타클리즘', rarity: '레전더리 (0.1%)', desc: '12초간 전역 배수 10배 폭증 & 현재 행성의 모든 지역 진행도 즉시 +25%!' },
        'sk_genesis': { name: '창세의 빅뱅', rarity: '레전더리 (0.1%)', desc: '즉시 180초(3분)분의 초당 생산량 획득 & 다른 스킬의 쿨타임을 최대치의 50%만큼 감소! (창세의 빅뱅 제외)' }
    },
    getSkillObjName(skill) {
        return (this.lang === 'ko' && this.skillsKo[skill.id]) ? this.skillsKo[skill.id].name : skill.name;
    },
    getSkillObjRarity(skill) {
        return (this.lang === 'ko' && this.skillsKo[skill.id]) ? this.skillsKo[skill.id].rarity : skill.rarity;
    },
    getSkillObjDesc(skill) {
        return (this.lang === 'ko' && this.skillsKo[skill.id]) ? this.skillsKo[skill.id].desc : skill.desc;
    },

    getUpgradeName(upg) {
        if (this.lang === 'ko') {
            if (this.upgradesKo[upg.id]) return this.upgradesKo[upg.id];
            return upg.name.replace('Raibos ', '라이보스 ');
        }
        return upg.name;
    },
    getUpgradeDesc(upg) {
        if (this.lang === 'ko') {
            return upg.desc
                .replace('Raibos/click', '라이보스/클릭')
                .replace('Raibos/sec', '라이보스/초');
        }
        return upg.desc;
    },

    apply() {
                const tutReplayBtnText = document.getElementById('tutorial-btn-text');
        if (tutReplayBtnText) tutReplayBtnText.innerText = this.lang === 'ko' ? '튜토리얼 다시 보기' : 'Replay Tutorial';
        if (typeof tutorialManager !== 'undefined' && tutorialManager.active) tutorialManager.render();

        // 1. Language Toggle Button text
        const langBtnText = document.getElementById('lang-btn-text');
        if (langBtnText) langBtnText.innerText = this.lang === 'ko' ? '한국어' : 'English';

        // 2. Header and Stats
        const currLabel = document.querySelector('.currency-label');
        if (currLabel) currLabel.innerText = this.t('currency');

        const statLabels = document.querySelectorAll('.stat-label');
        if (statLabels[0]) statLabels[0].innerText = this.t('per_sec');
        if (statLabels[1]) statLabels[1].innerText = this.t('per_click');
        if (statLabels[2]) statLabels[2].innerText = this.t('global_mult');

        const panelTitle = document.querySelector('.panel-title');
        if (panelTitle) panelTitle.innerText = this.t('menu');

        const hrBtn = document.getElementById('hard-reset-btn');
        if (hrBtn) hrBtn.innerText = this.t('hard_reset_btn');

        // 3. Tabs
        const tabMap = {
            'click-upgrades': 'tab_click',
            'idle-upgrades': 'tab_idle',
            'asteroid-gacha-panel': 'tab_gacha',
            'rebirth-panel': 'tab_rebirth',
            'achievements-panel': 'tab_trophies',
            'invasion-panel': 'tab_invasion',
            'ranking-upgrades': 'tab_ranking'
        };
        document.querySelectorAll('.tab').forEach(tab => {
            const target = tab.getAttribute('data-target');
            if (tabMap[target]) tab.innerText = this.t(tabMap[target]);
        });

        // 4. Gacha Panel static text
        const gTitle = document.querySelector('#asteroid-gacha-panel h3');
        if (gTitle) gTitle.innerText = this.t('gacha_title');
        const gDesc = document.querySelector('#asteroid-gacha-panel p');
        if (gDesc) gDesc.innerText = this.t('gacha_desc');
        const gCol = document.querySelector('#asteroid-gacha-panel h4');
        if (gCol) gCol.innerText = this.t('gacha_collection');

        // 5. Rebirth Panel static text
        const rbTitle = document.querySelector('.rebirth-info h3');
        if (rbTitle) rbTitle.innerText = this.t('rebirth_title');
        const rbDesc = document.querySelector('.rebirth-info p');
        if (rbDesc) rbDesc.innerHTML = this.t('rebirth_desc');
        const cBoxTitle = document.querySelector('.constellation-entry h4');
        if (cBoxTitle) cBoxTitle.innerText = this.t('constellation_box_title');
        const cBoxDesc = document.querySelector('.constellation-entry p');
        if (cBoxDesc) cBoxDesc.innerText = this.t('constellation_box_desc');
        const cOpenBtn = document.getElementById('open-constellation-btn');
        if (cOpenBtn) cOpenBtn.innerText = this.t('constellation_open_btn');

        // 6. Constellation Modal static text
        const cModalH2 = document.querySelector('#constellation-modal h2');
        if (cModalH2) cModalH2.innerText = this.t('constellation_modal_title');
        const cCloseBtn = document.getElementById('close-constellation-btn');
        if (cCloseBtn) cCloseBtn.innerText = this.t('constellation_close_btn');

        // 7. Offline Modal static text
        const offH2 = document.querySelector('#offline-modal h2');
        if (offH2) offH2.innerText = this.t('offline_title');
        const offBtn = document.getElementById('offline-close-btn');
        if (offBtn) offBtn.innerText = this.t('offline_btn');

        // 8. Invasion Panel static text
        const invEnergyHdr = document.querySelector('.energy-header span:first-child');
        if (invEnergyHdr) invEnergyHdr.innerText = this.t('invasion_energy_label');

        // 9. BGM Track select options
        const trackSelect = document.getElementById('bgm-track-select');
        if (trackSelect && trackSelect.options.length >= 2) {
            trackSelect.options[0].text = this.t('bgm_track_arcade');
            trackSelect.options[1].text = this.t('bgm_track_ambient');
        }

        // 10. Re-render dynamic components
        if (typeof renderLists === 'function') renderLists();
        if (typeof renderAchievements === 'function') renderAchievements();
        if (typeof updateInvasionUI === 'function') updateInvasionUI();
if (typeof tutorialManager !== "undefined") tutorialManager.init();

        if (typeof updateGachaUI === 'function') updateGachaUI();
        if (typeof updateRebirthUI === 'function') updateRebirthUI();
        const cModal = document.getElementById('constellation-modal');
        if (cModal && cModal.style.display !== 'none' && typeof renderConstellation === 'function') {
            renderConstellation();
        }
    },

    init() {
        const toggleBtn = document.getElementById('lang-toggle-btn');
        if (toggleBtn) {
            toggleBtn.onclick = (e) => {
                e.stopPropagation();
                this.toggle();
            };
        }
        this.apply();
    }
};

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
    
    // Global Cost Reduction from Regions (scaled by Multiverse)
    let costReduction = 0;
    const allConquered = Array.from(new Set([...(gameState.invasion.conqueredRegions || []), ...(gameState.invasion.retainedConqueredRegions || [])]));
    const multiverseScale = 1 + 0.5 * ((gameState.multiverse || 1) - 1);
    allConquered.forEach(regionId => {
        const region = getAllRegions().find(r => r.id === regionId);
        if (region && region.type === 'cost') costReduction += region.value * multiverseScale;
    });
    
    scaling = Math.max(1.05, scaling - costReduction);
    
    return Math.floor(upg.baseCost * Math.pow(scaling, level));
}

function getAllRegions() {
    return planetsData.flatMap(p => p.regions);
}

function formatNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return '0';
    if (!isFinite(num)) return 'Infinity';
    if (num < 0) return '-' + formatNumber(-num);
    if (num < 1e3) return Math.floor(num).toLocaleString();
    
    const suffixes = ['k', 'M', 'B', 'T', 'Qd', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
    const exp = Math.floor(Math.log10(Math.max(1, num)) / 3);
    
    if (exp <= 11) {
        const suffix = suffixes[exp - 1];
        return (num / Math.pow(10, exp * 3)).toFixed(2) + suffix;
    } else {
        // Alphabetic notation: aa, ab, ac... up to zz
        let alphaIndex = exp - 12; // 12th power of 1000 is 10^36
        if (alphaIndex > 26 * 26 - 1) {
            alphaIndex = 26 * 26 - 1; // cap at zz
        }
        let char1 = String.fromCharCode(97 + Math.floor(alphaIndex / 26));
        let char2 = String.fromCharCode(97 + (alphaIndex % 26));
        return (num / Math.pow(10, exp * 3)).toFixed(2) + char1 + char2;
    }
}

function formatTime(sec) {
    if (sec < 60) return sec.toFixed(1) + (i18n.lang === 'ko' ? '초' : 's');
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return i18n.lang === 'ko' ? `${m}분 ${s}초` : `${m}m ${s}s`;
}

const REBIRTH_MIN_REQ = 1000000; // 1,000,000 (1M) Raibos (초반 진입장벽 대폭 완화)

function getPointsToEarn(total) {
    if (total < REBIRTH_MIN_REQ) return 0;
    // 1M -> 10 RP, 10M -> 28 RP, 100M -> 79 RP, 1B -> 223 RP, 100B -> 1,778 RP, 1T -> 5,011 RP...
    let base = total / REBIRTH_MIN_REQ;
    let points = 10 * Math.pow(base, 0.45);
    return Math.floor(points);
}

function getAsteroidBuffs() {
    let buffs = { click: 1, idle: 1, globalAdd: 0, globalScale: 1, rp: 1, energyMax: 1, energyRegen: 1 };
    if (!gameState.asteroids || !gameState.asteroids.inventory) return buffs;

    ASTEROID_POOL.forEach(ast => {
        const count = gameState.asteroids.inventory[ast.id] || 0;
        if (count > 0 && ast.effect) {
            const eff = ast.effect(count);
            if (eff.click) buffs.click += eff.click;
            if (eff.idle) buffs.idle += eff.idle;
            if (eff.global) buffs.globalAdd += eff.global;
            if (eff.globalMultScale) buffs.globalScale *= eff.globalMultScale;
            if (eff.rp) buffs.rp += eff.rp;
            if (eff.energyMax) buffs.energyMax += eff.energyMax;
            if (eff.energyRegen) buffs.energyRegen += eff.energyRegen;
        }
    });
    return buffs;
}

// Core Logic
function getGlobalMultiplier() {
    let mult = 1.0;
    const rpRate = getConstellationEffect('c_rp_mult_decay') || 0.05;
    mult += gameState.rebirthPoints * rpRate;
    mult += getConstellationEffect('c_global'); // Nebula Amplifier
    const chainBonus = getConstellationEffect('c_conquest_chain') || 0;
    mult += chainBonus * (gameState.invasion.conqueredRegions.length || 0);
    
    // Asteroid Global Multiplier Buffs
    const astBuffs = getAsteroidBuffs();
    mult += astBuffs.globalAdd;

    gameState.achievements.forEach(achId => {
        const ach = achievementsData.find(a => a.id === achId);
        if (ach && ach.bonus) {
            const achvBoostMult = getConstellationEffect('c_achv_bonus') || 1;
            mult += ach.bonus * achvBoostMult;
        }
    });

    // Multiverse Synergy Skill & Dominator & Omniverse Resonance
    const multiverseSynergy = (getConstellationEffect('c_multiverse_power') || 1) * (getConstellationEffect('c_t14_multiverse_dominator') || 1) * (getConstellationEffect('c_t17_omniverse_resonance') || 1);
    mult *= multiverseSynergy;

    // High Tier Multipliers (Tier 10, 15, 19, 20) & Asteroid Scaling
    mult *= (getConstellationEffect('c_t10_cosmic_multiplier') || 1);
    mult *= (getConstellationEffect('c_t15_infinity_core') || 1);
    mult *= (getConstellationEffect('c_t19_primordial_singularity') || 1);
    mult *= (getConstellationEffect('c_t20_absolute_apex') || 1);
    mult *= astBuffs.globalScale;

    // Multiverse scaling for region rewards (Multiverse 2부터 50%씩 증가: MV1=1.0, MV2=1.5, MV3=2.0...)
    const multiverseScale = 1 + 0.5 * ((gameState.multiverse || 1) - 1);

    // Regional Multipliers (Current Multiverse conquered + Past Multiverse retained non-energy)
    const currentConquered = gameState.invasion.conqueredRegions || [];
    const retainedConquered = gameState.invasion.retainedConqueredRegions || [];
    const allConquered = Array.from(new Set([...currentConquered, ...retainedConquered]));
    const allRegions = getAllRegions();

    allConquered.forEach(regionId => {
        const region = allRegions.find(r => r.id === regionId);
        if (region && region.type !== 'energy' && region.type !== 'energy_mult') {
            if (region.type === 'mult') mult += region.value * multiverseScale;
            if (region.type === 'mult_total') mult *= (1 + (region.value - 1) * multiverseScale);
        }
    });

    // Active Skills Multiplier Boosts
    if (isSkillEffectActive('sk_blackhole')) {
        mult *= 3; // Black Hole Graviton: x3 Global Multiplier
    }
    if (isSkillEffectActive('sk_supernova')) {
        mult *= 10; // Supernova Cataclysm: x10 Global Multiplier
    }

    return mult;
}

function recalculatePowers() {
    let cp = 1;
    let ip = 0;
    
    clickUpgrades.forEach(u => { cp += u.value * (gameState.upgradeLevels[u.id] || 0); });
    idleUpgrades.forEach(u => { ip += u.value * (gameState.upgradeLevels[u.id] || 0); });
    
    // Apply Super Click & Super Idle & High-tier Skills & Asteroid Buffs
    const astBuffs = getAsteroidBuffs();
    const superClick = (getConstellationEffect('c_super_click') || 1) * (getConstellationEffect('c_t8_click_fury') || 1) * (getConstellationEffect('c_t12_stellar_fusion') || 1) * (getConstellationEffect('c_t17_transcendence') || 1) * astBuffs.click;
    const superIdle = (getConstellationEffect('c_super_idle') || 1) * (getConstellationEffect('c_t8_idle_reactor') || 1) * (getConstellationEffect('c_t12_stellar_fusion') || 1) * (getConstellationEffect('c_t17_transcendence') || 1) * astBuffs.idle;
    cp *= superClick;
    ip *= superIdle;

    const multiverseScale = 1 + 0.5 * ((gameState.multiverse || 1) - 1);
    const currentConquered = gameState.invasion.conqueredRegions || [];
    const retainedConquered = gameState.invasion.retainedConqueredRegions || [];
    const allConquered = Array.from(new Set([...currentConquered, ...retainedConquered]));
    const allRegions = getAllRegions();

    allConquered.forEach(regionId => {
        const region = allRegions.find(r => r.id === regionId);
        if (region && region.type !== 'energy' && region.type !== 'energy_mult') {
            if (region.type === 'click') cp *= (1 + region.value * multiverseScale);
            if (region.type === 'idle') ip *= (1 + region.value * multiverseScale);
            if (region.type === 'all_prod') { cp *= (1 + (region.value - 1) * multiverseScale); ip *= (1 + (region.value - 1) * multiverseScale); }
        }
    });

    const mult = getGlobalMultiplier();
    
    const syncBonus = getConstellationEffect('c_click_idle_sync') || 0;
    gameState.idlePower = ip * mult;
    gameState.clickPower = (cp + ip * syncBonus) * mult;
}


// ==========================================
// Active Skills System
// ==========================================
const ACTIVE_SKILL_POOL = [
    {
        id: 'sk_overcharge',
        name: 'Quantum Overcharge',
        rarity: 'Common',
        color: '#aaaaaa',
        weight: 50.0,
        icon: '⚡',
        cooldown: 15,
        duration: 8,
        desc: 'Overcharges clicks for 8s: Clicks generate +300% Raibos and trigger mini-pulses of +5% Idle Power.',
        onActivate: () => {
            showToast('⚡ Quantum Overcharge!', 'Clicks enhanced with massive surge for 8 seconds!');
        }
    },
    {
        id: 'sk_chrono_burst',
        name: 'Chrono Warp Drive',
        rarity: 'Uncommon',
        color: '#00ddff',
        weight: 30.0,
        icon: '⏳',
        cooldown: 20,
        duration: 0,
        desc: 'Warps spacetime forward: Instantly grants 20 seconds of idle production and accelerates energy regen by 5x for 5s.',
        onActivate: () => {
            const gain = (gameState.idlePower || 0) * 20;
            gameState.raibos += gain;
            gameState.totalRaibos += gain;
            showToast('⏳ Chrono Warp!', `Instant Time Skip: +${formatNumber(gain)} Raibos gained!`);
        }
    },
    {
        id: 'sk_orbital_strike',
        name: 'Orbital Ion Cannon',
        rarity: 'Rare',
        color: '#ffcc00',
        weight: 14.8,
        icon: '🛰️',
        cooldown: 25,
        duration: 0,
        desc: 'Fires an orbital bombardment into current invasion region: Instantly grants +15% conquest progress & fills 250 Energy.',
        onActivate: () => {
            if (gameState.invasion) {
                gameState.invasion.energy = Math.min(gameState.invasion.energyMax, (gameState.invasion.energy || 0) + 250);
                const planetData = planetsData[gameState.invasion.currentPlanet];
                if (planetData && selectedRegionId) {
                    let prog = (gameState.invasion.regionProgress[selectedRegionId] || 0) + 15;
                    if (prog >= 100) {
                        prog = 100;
                        if (!gameState.invasion.conqueredRegions.includes(selectedRegionId)) {
                            gameState.invasion.conqueredRegions.push(selectedRegionId);
                            showToast('Region Conquered!', `Orbital strike pulverized ${selectedRegionId}!`);
                            recalculatePowers();
                            checkPlanetClear();
                        }
                    }
                    gameState.invasion.regionProgress[selectedRegionId] = prog;
                }
            }
            showToast('🛰️ Orbital Ion Cannon!', 'Massive laser blasted current planet territory!');
        }
    },
    {
        id: 'sk_blackhole',
        name: 'Black Hole Graviton',
        rarity: 'Epic',
        color: '#ff55ff',
        weight: 5.0,
        icon: '🕳️',
        cooldown: 30,
        duration: 10,
        desc: 'Summons a miniature singularity for 10s: Automatically pulls clicks at 15 clicks/sec with x2 Click Power and x3 Global Multiplier.',
        onActivate: () => {
            showToast('🕳️ Black Hole Graviton!', 'Singularity vortex sucking Raibos from dimensions for 10s!');
        }
    },
    {
        id: 'sk_supernova',
        name: 'Supernova Cataclysm',
        rarity: 'Legendary',
        color: '#ff9900',
        weight: 0.1, // 0.1%
        icon: '💥',
        cooldown: 30,
        duration: 12,
        desc: 'Legendary stellar explosion for 12s: x10 Global Multiplier, instant +25% Invasion Progress to ALL regions on current planet!',
        onActivate: () => {
            if (gameState.invasion) {
                const planetData = planetsData[gameState.invasion.currentPlanet];
                if (planetData) {
                    planetData.regions.forEach(r => {
                        let prog = (gameState.invasion.regionProgress[r.id] || 0) + 25;
                        if (prog >= 100) {
                            prog = 100;
                            if (!gameState.invasion.conqueredRegions.includes(r.id)) {
                                gameState.invasion.conqueredRegions.push(r.id);
                            }
                        }
                        gameState.invasion.regionProgress[r.id] = prog;
                    });
                    recalculatePowers();
                    checkPlanetClear();
                }
            }
            showToast('💥 SUPERNOVA CATACLYSM!', 'LEGENDARY NOVA EXPLODED! x10 Global Multiplier for 12s & planet regions devastated!');
        }
    },
    {
        id: 'sk_genesis',
        name: 'Genesis Divine Big Bang',
        rarity: 'Legendary',
        color: '#00ffff',
        weight: 0.1, // 0.1%
        icon: '🌌',
        cooldown: 30,
        duration: 15,
        desc: 'Legendary Genesis recreation: x20 Click & Idle Power, instant 180s (3 min) production time skip, and reduces all other skills cooldown by half of their max cooldown!',
        onActivate: () => {
            const gain = (gameState.idlePower || 0) * 180; // 3 minutes production
            gameState.raibos += gain;
            gameState.totalRaibos += gain;
            if (gameState.activeSkills && gameState.activeSkills.cooldowns) {
                ACTIVE_SKILL_POOL.forEach(s => {
                    if (s.id !== 'sk_genesis') {
                        const currentCd = gameState.activeSkills.cooldowns[s.id] || 0;
                        if (currentCd > 0) {
                            const halfMax = (s.cooldown || 30) / 2;
                            gameState.activeSkills.cooldowns[s.id] = Math.max(0, currentCd - halfMax);
                        }
                    }
                });
            }
            showToast('🌌 GENESIS BIG BANG!', `LEGENDARY CREATION! Instant 3 Minutes production (+${formatNumber(gain)}) & other cooldowns reduced by 50% max!`);
        }
    }
];

function pullActiveSkill() {
    if (!gameState.activeSkills) {
        gameState.activeSkills = { charges: 0, timer: 0, unlocked: {}, active: null, activeDuration: 0, cooldowns: {}, totalSkillsUsed: 0, totalSkillPulls: 0 };
    }
    if (gameState.activeSkills.charges <= 0) {
        showToast('No Skill Pulls!', i18n.lang === 'ko' ? '스킬 뽑기 횟수가 부족합니다! 30초마다 1회 충전되거나 업적으로 획득하세요.' : 'No skill pull charges left! Charges gain every 30s or via achievements.');
        return;
    }

    gameState.activeSkills.charges--;
    gameState.activeSkills.totalSkillPulls = (gameState.activeSkills.totalSkillPulls || 0) + 1;

    // Weighted roll: 50%, 30%, 14.8%, 5.0%, 0.1%, 0.1%
    const totalWeight = ACTIVE_SKILL_POOL.reduce((acc, s) => acc + s.weight, 0);
    const rand = Math.random() * totalWeight;
    let cum = 0;
    let selectedSkill = ACTIVE_SKILL_POOL[0];

    for (const skill of ACTIVE_SKILL_POOL) {
        cum += skill.weight;
        if (rand <= cum) {
            selectedSkill = skill;
            break;
        }
    }

    if (!gameState.activeSkills.unlocked) gameState.activeSkills.unlocked = {};
        if (!Array.isArray(gameState.activeSkills.equipped)) gameState.activeSkills.equipped = [];
    gameState.activeSkills.unlocked[selectedSkill.id] = (gameState.activeSkills.unlocked[selectedSkill.id] || 0) + 1;

    const sName = i18n.getSkillObjName ? i18n.getSkillObjName(selectedSkill) : selectedSkill.name;
    const sRarity = i18n.getSkillObjRarity ? i18n.getSkillObjRarity(selectedSkill) : selectedSkill.rarity;
    
    showToast(
        selectedSkill.rarity === 'Legendary' ? '🌟 LEGENDARY SKILL OBTAINED! 🌟' : 'Active Skill Extracted!',
        `${selectedSkill.icon} ${sName} (${sRarity})`
    );

    updateSkillsUI();
    checkAchievements();
    saveGame();
}

function toggleEquipSkill(skillId) {
    if (!gameState.activeSkills) return;
    if (!Array.isArray(gameState.activeSkills.equipped)) gameState.activeSkills.equipped = [];

    const idx = gameState.activeSkills.equipped.indexOf(skillId);
    if (idx !== -1) {
        // Unequip
        gameState.activeSkills.equipped.splice(idx, 1);
        showToast('Skill Unequipped', i18n.lang === 'ko' ? '스킬 장착이 해제되었습니다.' : 'Skill unequipped.');
    } else {
        // Equip (Max 2)
        if (gameState.activeSkills.equipped.length >= 2) {
            showToast('Equip Limit Reached', i18n.lang === 'ko' ? '액티브 스킬은 최대 2개까지만 장착할 수 있습니다! 기존 스킬을 해제 후 장착하세요.' : 'You can only equip up to 2 active skills! Unequip one first.');
            return;
        }
        gameState.activeSkills.equipped.push(skillId);
        showToast('Skill Equipped (Slot ' + gameState.activeSkills.equipped.length + '/2)', i18n.lang === 'ko' ? '스킬이 장착되었습니다! (최대 2개)' : 'Skill equipped! (Max 2)');
    }

    updateSkillsUI();
    saveGame();
}

function isSkillEffectActive(skillId) {
    if (!gameState || !gameState.activeSkills) return false;
    if (gameState.activeSkills.activeEffects && gameState.activeSkills.activeEffects[skillId] > 0) return true;
    return gameState.activeSkills.active === skillId;
}

function activateActiveSkill(skillId) {
    if (!gameState.activeSkills) return;
    if (!Array.isArray(gameState.activeSkills.equipped) || !gameState.activeSkills.equipped.includes(skillId)) {
        showToast('Skill Not Equipped', i18n.lang === 'ko' ? '장착된 스킬만 사용할 수 있습니다! (최대 2개 장착 가능)' : 'Only equipped skills can be used! (Max 2)');
        return;
    }

    const skill = ACTIVE_SKILL_POOL.find(s => s.id === skillId);
    if (!skill) return;

    const cd = (gameState.activeSkills.cooldowns && gameState.activeSkills.cooldowns[skillId]) || 0;
    if (cd > 0) {
        showToast('Skill on Cooldown', `${skill.name} is on cooldown for ${cd.toFixed(1)}s`);
        return;
    }

    // Set cooldown (max 30s as defined by skill.cooldown)
    if (!gameState.activeSkills.cooldowns) gameState.activeSkills.cooldowns = {};
    gameState.activeSkills.cooldowns[skillId] = skill.cooldown;

    if (skill.duration > 0) {
        if (!gameState.activeSkills.activeEffects) gameState.activeSkills.activeEffects = {};
        gameState.activeSkills.activeEffects[skillId] = skill.duration;
        gameState.activeSkills.active = skillId;
        gameState.activeSkills.activeDuration = skill.duration;
    }

    gameState.activeSkills.totalSkillsUsed = (gameState.activeSkills.totalSkillsUsed || 0) + 1;

    if (skill.onActivate) {
        skill.onActivate();
    }

    recalculatePowers();
    updateUI();
    updateSkillsUI();
    checkAchievements();
    saveGame();
}

function updateSkillSlotDisplays() {
    if (!gameState.activeSkills) return;
    const isKo = (typeof i18n !== 'undefined' && i18n.lang === 'ko');

    for (let i = 0; i < 2; i++) {
        const slotBox = document.getElementById('skill-slot-btn-' + i);
        if (!slotBox) continue;

        const skillId = (gameState.activeSkills.equipped && gameState.activeSkills.equipped[i]) || null;
        if (skillId) {
            const skill = ACTIVE_SKILL_POOL.find(s => s.id === skillId);
            const cd = (gameState.activeSkills.cooldowns && gameState.activeSkills.cooldowns[skillId]) || 0;
            const isActive = isSkillEffectActive(skillId);

            slotBox.style.border = '1px solid ' + (skill ? skill.color : '#00f2ff');
            slotBox.style.background = isActive ? 'rgba(0, 255, 170, 0.25)' : 'rgba(0, 20, 40, 0.7)';
            slotBox.style.cursor = cd > 0 ? 'not-allowed' : 'pointer';
            slotBox.style.opacity = cd > 0 ? '0.6' : '1.0';

            const statusEl = slotBox.querySelector('.slot-status-text');
            if (statusEl) {
                if (cd > 0) {
                    statusEl.innerHTML = '<span style="color:#ff5555; font-weight:bold;">⏳ ' + cd.toFixed(1) + 's</span>';
                } else if (isActive) {
                    statusEl.innerHTML = '<span style="color:#00ffaa; font-weight:bold; animation:pulse 1s infinite;">🔥 ACTIVE</span>';
                } else {
                    statusEl.innerHTML = '<span style="color:#00ffff; font-weight:bold;">⚡ [USE]</span>';
                }
            }
        } else {
            slotBox.style.border = '1px dashed rgba(255,255,255,0.2)';
            slotBox.style.background = 'rgba(0,0,0,0.4)';
            slotBox.style.cursor = 'default';
            slotBox.style.opacity = '1.0';
        }
    }
}

function updateSkillsUI() {
    const chargesDisp = document.getElementById('skill-charges-count');
    const timerDisp = document.getElementById('skill-timer-disp');
    const pullBtn = document.getElementById('skill-pull-btn');
    const listContainer = document.getElementById('active-skills-buttons-container');

    if (!gameState.activeSkills) return;
    if (!Array.isArray(gameState.activeSkills.equipped)) gameState.activeSkills.equipped = [];

    // Auto-equip first available skills if equipped is empty but skills unlocked
    if (gameState.activeSkills.equipped.length === 0 && gameState.activeSkills.unlocked) {
        const unlockedIds = Object.keys(gameState.activeSkills.unlocked).filter(id => gameState.activeSkills.unlocked[id] > 0);
        unlockedIds.slice(0, 2).forEach(id => gameState.activeSkills.equipped.push(id));
    }

    if (chargesDisp) chargesDisp.innerText = gameState.activeSkills.charges || 0;
    if (timerDisp) {
        const remaining = Math.max(0, 30 - (gameState.activeSkills.timer || 0));
        timerDisp.innerText = remaining.toFixed(0) + 's';
    }
    if (pullBtn) {
        pullBtn.disabled = (gameState.activeSkills.charges || 0) <= 0;
        pullBtn.style.opacity = (gameState.activeSkills.charges || 0) > 0 ? '1' : '0.5';
    }

    if (listContainer) {
        listContainer.innerHTML = '';
        const isKo = (typeof i18n !== 'undefined' && i18n.lang === 'ko');

        // 1. Equipped Skills Quick Activation Bar (Max 2 Slots)
        const equippedSection = document.createElement('div');
        equippedSection.style.cssText = 'display:flex; flex-direction:column; gap:6px; background:rgba(0,242,255,0.06); border:1px solid rgba(0,242,255,0.3); border-radius:10px; padding:8px;';
        
        const equippedHeader = document.createElement('div');
        equippedHeader.style.cssText = 'display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; font-weight:bold; color:#00f2ff; margin-bottom:2px;';
        equippedHeader.innerHTML = `
            <span>${isKo ? '⚡ 장착된 스킬 (활성화)' : '⚡ EQUIPPED SKILLS (ACTIVE)'}</span>
            <span style="color:#ffcc00;">${gameState.activeSkills.equipped.length} / 2</span>
        `;
        equippedSection.appendChild(equippedHeader);

        const slotContainer = document.createElement('div');
        slotContainer.style.cssText = 'display:flex; gap:8px;';

        for (let i = 0; i < 2; i++) {
            const currentSlotIndex = i;
            const skillId = gameState.activeSkills.equipped[currentSlotIndex];
            const slotBox = document.createElement('div');
            slotBox.id = 'skill-slot-btn-' + currentSlotIndex;
            slotBox.style.cssText = 'flex:1; min-height:55px; border-radius:8px; border:1px dashed rgba(255,255,255,0.2); background:rgba(0,0,0,0.4); display:flex; flex-direction:column; justify-content:center; align-items:center; position:relative; overflow:hidden; padding:4px; user-select:none;';

            if (skillId) {
                const skill = ACTIVE_SKILL_POOL.find(s => s.id === skillId);
                const cd = (gameState.activeSkills.cooldowns && gameState.activeSkills.cooldowns[skillId]) || 0;
                const isActive = isSkillEffectActive(skillId);

                slotBox.style.border = '1px solid ' + (skill ? skill.color : '#00f2ff');
                slotBox.style.background = isActive ? 'rgba(0, 255, 170, 0.25)' : 'rgba(0, 20, 40, 0.7)';
                slotBox.style.cursor = cd > 0 ? 'not-allowed' : 'pointer';
                slotBox.style.opacity = cd > 0 ? '0.6' : '1.0';

                const sName = skill ? (i18n.getSkillObjName ? i18n.getSkillObjName(skill) : skill.name) : skillId;

                slotBox.innerHTML = `
                    <div style="font-size:1.2rem; filter:drop-shadow(0 0 5px ${skill ? skill.color : '#fff'});">${skill ? skill.icon : '⚡'}</div>
                    <div style="font-size:0.75rem; font-weight:bold; color:${skill ? skill.color : '#fff'}; max-width:130px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${sName}</div>
                    <div class="slot-status-text" style="font-size:0.75rem; font-weight:bold; margin-top:2px;">
                        ${cd > 0 ? `<span style="color:#ff5555;">⏳ ${cd.toFixed(1)}s</span>` : (isActive ? `<span style="color:#00ffaa; animation:pulse 1s infinite;">🔥 ACTIVE</span>` : `<span style="color:#00ffff;">⚡ [USE]</span>`)}
                    </div>
                `;

                // Persistent click listener that directly checks current skill's cooldown at the moment of click
                slotBox.onclick = (e) => {
                    e.stopPropagation();
                    const targetSkillId = (gameState.activeSkills.equipped && gameState.activeSkills.equipped[currentSlotIndex]);
                    if (!targetSkillId) return;
                    const currentCd = (gameState.activeSkills.cooldowns && gameState.activeSkills.cooldowns[targetSkillId]) || 0;
                    if (currentCd > 0) {
                        const skObj = ACTIVE_SKILL_POOL.find(s => s.id === targetSkillId);
                        showToast('Skill on Cooldown', (skObj ? skObj.name : targetSkillId) + ' is on cooldown for ' + currentCd.toFixed(1) + 's');
                        return;
                    }
                    activateActiveSkill(targetSkillId);
                };
            } else {
                slotBox.innerHTML = `<span style="color:#666; font-size:0.75rem;">${isKo ? '+ 빈 슬롯' : '+ Empty Slot'}</span>`;
            }

            slotContainer.appendChild(slotBox);
        }
        equippedSection.appendChild(slotContainer);
        listContainer.appendChild(equippedSection);

        // 2. Collection & Equip Management Section
        const collectionTitle = document.createElement('div');
        collectionTitle.style.cssText = 'font-size:0.75rem; color:#888; font-weight:bold; margin-top:4px; display:flex; justify-content:space-between; align-items:center;';
        collectionTitle.innerHTML = `
            <span>${isKo ? '보유한 스킬 목록 (클릭하여 장착/해제)' : 'UNLOCKED SKILLS (Click to Equip/Unequip)'}</span>
        `;
        listContainer.appendChild(collectionTitle);

        let hasAny = false;
        ACTIVE_SKILL_POOL.forEach(skill => {
            const count = (gameState.activeSkills.unlocked && gameState.activeSkills.unlocked[skill.id]) || 0;
            if (count > 0) {
                hasAny = true;
                const isEquipped = gameState.activeSkills.equipped.includes(skill.id);
                const sName = i18n.getSkillObjName ? i18n.getSkillObjName(skill) : skill.name;
                const sDesc = i18n.getSkillObjDesc ? i18n.getSkillObjDesc(skill) : skill.desc;

                const itemRow = document.createElement('div');
                itemRow.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: ${isEquipped ? 'rgba(0, 242, 255, 0.12)' : 'rgba(0,0,0,0.45)'};
                    border: 1px solid ${isEquipped ? '#00f2ff' : 'rgba(255,255,255,0.1)'};
                    border-radius: 8px;
                    padding: 6px 10px;
                    gap: 8px;
                    transition: all 0.2s ease;
                `;

                itemRow.innerHTML = `
                    <div style="display:flex; align-items:center; gap:8px; text-align:left; flex:1;">
                        <span style="font-size:1.3rem;">${skill.icon}</span>
                        <div>
                            <div style="font-weight:bold; font-size:0.8rem; color:${skill.color};">
                                ${sName} <span style="font-size:0.65rem; color:#aaa;">(${skill.rarity})</span>
                            </div>
                            <div style="font-size:0.68rem; color:#bbb; line-height:1.2; max-width:210px;">${sDesc}</div>
                        </div>
                    </div>
                    <button class="action-btn" style="padding:4px 8px; font-size:0.75rem; border-radius:6px; font-weight:bold; background:${isEquipped ? 'rgba(255,85,85,0.2)' : 'rgba(0,255,170,0.2)'}; border:1px solid ${isEquipped ? '#ff5555' : '#00ffaa'}; color:${isEquipped ? '#ff5555' : '#00ffaa'}; cursor:pointer; min-width:55px;">
                        ${isEquipped ? (isKo ? '해제' : 'Unequip') : (isKo ? '장착' : 'Equip')}
                    </button>
                `;

                const equipBtn = itemRow.querySelector('button');
                equipBtn.onclick = (e) => {
                    e.stopPropagation();
                    toggleEquipSkill(skill.id);
                };

                listContainer.appendChild(itemRow);
            }
        });

        if (!hasAny) {
            const emptyNotice = document.createElement('div');
            emptyNotice.style.cssText = 'text-align:center; padding:12px; color:#777; font-size:0.8rem;';
            emptyNotice.innerText = isKo ? '보유한 액티브 스킬이 없습니다. 뽑기 버튼을 눌러보세요!' : 'No active skills unlocked yet. Click Extract!';
            listContainer.appendChild(emptyNotice);
        }
    }
}

function getGachaCost() {
    const total = (gameState.asteroids && gameState.asteroids.totalPulls) || 0;
    // Cost starts at 1,000 and scales with total pulls (growth significantly reduced from 1.25 to 1.05)
    return Math.floor(1000 * Math.pow(1.05, total));
}

function getMultiverseEnergyScale() {
    const rawMultiverseScale = Math.pow(1.35, (gameState.multiverse || 1) - 1);
    const costMitigation = getConstellationEffect('c_multiverse_cost_mitigation') || 1;
    return 1 + (rawMultiverseScale - 1) * costMitigation;
}

function getMultiverseLuckMultiplier() {
    const mv = gameState.multiverse || 1;
    // Luck multiplier = 1 + (Multiverse Level - 1) * 1.0 (e.g. MV 1 = x1.0, MV 2 = x2.0, MV 3 = x3.0...)
    return 1 + (mv - 1);
}

function pullAsteroid(isAuto = false) {
    const cost = getGachaCost();
    if (gameState.raibos < cost) {
        if (!isAuto) {
            showToast('Not Enough Raibos!', `You need ${formatNumber(cost)} Raibos to extract an Asteroid.`);
        }
        return false;
    }

    gameState.raibos -= cost;
    if (!gameState.asteroids) {
        gameState.asteroids = { totalPulls: 0, inventory: {}, autoEnabled: false };
    }
    gameState.asteroids.totalPulls = (gameState.asteroids.totalPulls || 0) + 1;

    // Multiverse Luck boost on rarity weights
    const luckMult = getMultiverseLuckMultiplier();
    
    // Calculate total weighted luck for extraction
    let totalWeight = 0;
    const weightedPool = ASTEROID_POOL.map(ast => {
        // Higher rarity items get luck multiplier
        let weight = ast.baseWeight;
        if (ast.id !== 'ast_stony') {
            weight *= luckMult;
        }
        totalWeight += weight;
        return { ...ast, weight };
    });

    const rand = Math.random() * totalWeight;
    let cumulative = 0;
    let pulledAsteroid = weightedPool[0];

    for (const ast of weightedPool) {
        cumulative += ast.weight;
        if (rand <= cumulative) {
            pulledAsteroid = ast;
            break;
        }
    }

    gameState.asteroids.inventory[pulledAsteroid.id] = (gameState.asteroids.inventory[pulledAsteroid.id] || 0) + 1;

    // UI Feedback
    const iconEl = document.getElementById('gacha-icon');
    const nameEl = document.getElementById('gacha-name');
    const buffEl = document.getElementById('gacha-buff');

    if (iconEl) iconEl.innerText = pulledAsteroid.icon;
    if (nameEl) {
        nameEl.innerText = `${pulledAsteroid.name} (${pulledAsteroid.rarity})`;
        nameEl.style.color = pulledAsteroid.color;
    }
    if (buffEl) buffEl.innerText = pulledAsteroid.desc;

    if (!isAuto || pulledAsteroid.id === 'ast_primordial' || pulledAsteroid.id === 'ast_singularity') {
        showToast('Asteroid Extracted!', `${pulledAsteroid.icon} Got ${pulledAsteroid.name} (${pulledAsteroid.rarity})!`);
    }
    
    recalculatePowers();
    updateUI();
    saveGame();
    return true;
}

function toggleAutoGacha() {
    if (!gameState.asteroids) {
        gameState.asteroids = { totalPulls: 0, inventory: {}, autoEnabled: false };
    }
    gameState.asteroids.autoEnabled = !gameState.asteroids.autoEnabled;
    showToast('Auto-Extract Toggled', `Auto Extraction is now ${gameState.asteroids.autoEnabled ? 'ON' : 'OFF'}.`);
    updateGachaUI();
    saveGame();
}

function updateGachaUI() {
    const costBtn = document.getElementById('gacha-cost-1');
    const pullBtn = document.getElementById('gacha-pull-1-btn');
    const autoStatus = document.getElementById('gacha-auto-status');
    const luckMultEl = document.getElementById('gacha-luck-mult');
    const cost = getGachaCost();
    const luckMult = getMultiverseLuckMultiplier();

    if (costBtn) costBtn.innerText = `${formatNumber(cost)} ${i18n.t('currency')}`;
    if (pullBtn) {
        pullBtn.disabled = gameState.raibos < cost;
        pullBtn.style.opacity = gameState.raibos >= cost ? '1' : '0.5';
    }
    if (luckMultEl) {
        luckMultEl.innerText = `x${luckMult.toFixed(2)}`;
    }
    if (autoStatus) {
        const isAuto = gameState.asteroids && gameState.asteroids.autoEnabled;
        autoStatus.innerText = isAuto ? 'ON' : 'OFF';
        autoStatus.style.color = isAuto ? '#00ffaa' : '#ff5555';
    }

    const container = document.getElementById('asteroid-inventory');
    if (container) {
        container.innerHTML = '';
        let hasAny = false;

        ASTEROID_POOL.forEach(ast => {
            const owned = (gameState.asteroids && gameState.asteroids.inventory[ast.id]) || 0;
            if (owned > 0) {
                hasAny = true;
                const div = document.createElement('div');
                div.style.cssText = `display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.4); padding:8px 12px; border-radius:8px; border:1px solid ${ast.color};`;
                const aName = i18n.getAstName(ast);
                const aRarity = i18n.getAstRarity(ast);
                const aDesc = i18n.getAstDesc(ast);
                div.innerHTML = `
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-size:1.4rem;">${ast.icon}</span>
                        <div>
                            <div style="font-weight:bold; color:${ast.color}; font-size:0.9rem;">${aName} <span style="font-size:0.75rem; color:#aaa;">(${aRarity})</span></div>
                            <div style="font-size:0.75rem; color:#ddd;">${aDesc}</div>
                        </div>
                    </div>
                    <div style="font-weight:bold; color:#ffcc00; font-size:1rem; margin-left:10px;">x${owned}</div>
                `;
                container.appendChild(div);
            }
        });

        if (!hasAny) {
            container.innerHTML = `<div style="text-align:center; padding:15px; color:#888; font-size:0.85rem;">${i18n.lang === 'ko' ? '아직 추출된 소행성이 없습니다. 운을 시험해보세요!' : 'No asteroids extracted yet. Try your luck!'}</div>`;
        }
    }
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
    updateGachaUI();
}

function createUpgradeElement(upg, isClick) {
    const div = document.createElement('div');
    div.id = `upg-${upg.id}`;
    div.className = 'upgrade-item';
    const uName = i18n.getUpgradeName(upg);
    const uDesc = i18n.getUpgradeDesc(upg);
    div.innerHTML = `
        <div class="upgrade-info">
            <span class="upgrade-name">${uName}</span>
            <span class="upgrade-desc">${uDesc}</span>
            <span class="upgrade-level">Lv. 0</span>
        </div>
        <div class="upgrade-cost-area" style="display:flex; flex-direction:column; align-items:flex-end; gap:5px;">
            <span class="upgrade-cost">0</span>
            <button class="buy-max-single-btn" style="background: rgba(255,204,0,0.2); border: 1px solid #ffcc00; color: #ffcc00; border-radius: 4px; font-size: 0.75rem; padding: 2px 6px; cursor: pointer; pointer-events: auto;">MAX</button>
        </div>
    `;
    
    const maxBtn = div.querySelector('.buy-max-single-btn');
    if (maxBtn) {
        const handleMax = (e) => {
            e.stopPropagation();
            buyUpgradeMax(upg);
        };
        maxBtn.onclick = handleMax;
    }

    const handleBuy = (e) => {
        if (e.target && e.target.classList.contains('buy-max-single-btn')) return;
        buyUpgrade(upg);
    };

    div.onclick = handleBuy;
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

function buyUpgradeMax(upg) {
    let bought = 0;
    while (true) {
        const cost = getUpgradeCost(upg);
        if (gameState.raibos >= cost) {
            gameState.raibos -= cost;
            gameState.upgradeLevels[upg.id] = (gameState.upgradeLevels[upg.id] || 0) + 1;
            bought++;
        } else {
            break;
        }
    }
    if (bought > 0) {
        recalculatePowers();
        updateUI();
        saveGame();
    }
}

elements.btn.addEventListener('mousedown', (e) => {
    let earned = gameState.clickPower;

    // Active Skill Effects on Click
    if (isSkillEffectActive('sk_overcharge')) {
        earned *= 4; // +300% (total 4x)
        if (gameState.idlePower > 0) {
            earned += gameState.idlePower * 0.05;
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
            if (ach.onUnlock) {
                try { ach.onUnlock(); } catch (e) { console.error('Ach onUnlock error:', e); }
            }
            const rewardText = i18n.getAchReward ? i18n.getAchReward(ach) : (ach.rewardDesc || 'Reward granted!');
            showToast('Achievement Unlocked!', `${i18n.getAchTitle(ach)} [${rewardText}]`);
            unlocked = true;
        }
    });
    if (unlocked) {
        recalculatePowers();
        renderAchievements();
        if (typeof updateSkillsUI === 'function') updateSkillsUI();
        saveGame();
    }
}

function renderAchievements() {
    elements.achievementsList.innerHTML = '';
    achievementsData.forEach(ach => {
        const isUnlocked = gameState.achievements.includes(ach.id);
        
        let dispTitle = i18n.getAchTitle(ach);
        let dispDesc = i18n.getAchDesc(ach);
        let dispReward = i18n.getAchReward ? i18n.getAchReward(ach) : (ach.rewardDesc || '');
        if (ach.hidden && !isUnlocked) {
            dispTitle = "???";
            dispDesc = i18n.lang === 'ko' ? "조건 불명 (히든 업적)" : "Condition Unknown (Hidden Achievement)";
            dispReward = "???";
        }
        
        const div = document.createElement('div');
        div.className = `ach-item ${isUnlocked ? 'unlocked' : ''}`;
        div.innerHTML = `
            <div>
                <span class="ach-title" ${ach.hidden && isUnlocked ? 'style="color:#ff00ff; text-shadow:0 0 5px magenta;"' : ''}>${dispTitle}</span>
                <span class="ach-desc">${dispDesc}</span>
            </div>
            <div class="ach-reward" style="font-size:0.8rem; font-weight:bold; color:#00f2ff; text-align:right;">${dispReward}</div>
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

    const reqDisp = document.getElementById('rebirth-req-disp');
    if (reqDisp) {
        reqDisp.innerText = `${formatNumber(REBIRTH_MIN_REQ)} ${i18n.t('currency')}`;
    }
    
    const btn = document.getElementById('rebirth-btn');
    if (pointsToEarn > 0) {
        btn.disabled = false;
        btn.innerText = i18n.t('rebirth_ascend_btn').replace('{0}', formatNumber(pointsToEarn));
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    } else {
        btn.disabled = true;
        const currentTotal = gameState.totalRaibos || 0;
        const progressPct = Math.min(99.9, ((currentTotal / REBIRTH_MIN_REQ) * 100)).toFixed(1);
        btn.innerText = i18n.t('rebirth_need_btn').replace('{0}', formatNumber(REBIRTH_MIN_REQ)).replace('{1}', progressPct);
        btn.style.opacity = '0.6';
        btn.style.cursor = 'not-allowed';
    }
}

document.getElementById('rebirth-btn').addEventListener('click', () => {
    let earned = getPointsToEarn(gameState.totalRaibos);
    if (earned <= 0) return;
    
    if (confirm(i18n.t('rebirth_confirm').replace('{0}', formatNumber(earned)))) {
        const astBuffs = getAsteroidBuffs();
        const rpMult = (getConstellationEffect('c_rp') || 1) * (getConstellationEffect('c_t9_rp_overflow') || 1) * (getConstellationEffect('c_t12_singularity_harvester') || 1) * (getConstellationEffect('c_t18_omniverse_warp') || 1) * (getConstellationEffect('c_t19_godhead_harvest') || 1) * astBuffs.rp;
        const regionBonus = getConstellationEffect('c_region_rp') || 0;
        const regionBonusRP = regionBonus * (gameState.invasion.conqueredRegions.length || 0);
        const totalEarnedRP = Math.floor((earned + regionBonusRP) * rpMult);
        gameState.rebirthPoints += totalEarnedRP;
        gameState.rebirthCount = (gameState.rebirthCount || 0) + 1;

        const startE = gameState.invasion.energyMax * getConstellationEffect('c_energy_start');
        const headStartFraction = getConstellationEffect('c_rebirth_head_start') || 0;
        let startingRaibos = 0;
        if (headStartFraction > 0) {
            const prevTotal = gameState.totalRaibos || 0;
            startingRaibos = Math.floor(prevTotal * headStartFraction);
        }
        gameState.invasion.energy = startE;
        
        // Reset everything else (applying startingRaibos from head start if unlocked)
        gameState.raibos = startingRaibos;
        gameState.totalRaibos = startingRaibos;
        gameState.upgradeLevels = {};
        
        syncRaibosRankings(); 
        recalculatePowers();
        updateUI();
        saveGame();
        
        // Visual effect
        document.body.style.background = 'white';
        setTimeout(() => { document.body.style.background = ''; }, 500);
        showToast(i18n.t('rebirth_toast_title'), i18n.t('rebirth_toast_desc').replace('{0}', formatNumber(totalEarnedRP)));
    }
});

// Loop & Events
let lastTime = performance.now();
let autoInvTimer = 0;
let timeSkipTimer = 0;
let autoGachaTimer = 0;
let nextTimeSkipStr = Math.random() * 120 + 60; // Next spawn in 60-180s

function gameLoop(currentTime) {
    const dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    // Active Skills Charge Timer (1 charge every 30 seconds)
    if (gameState.activeSkills) {
        gameState.activeSkills.timer = (gameState.activeSkills.timer || 0) + dt;
        if (gameState.activeSkills.timer >= 30) {
            gameState.activeSkills.timer = 0;
            gameState.activeSkills.charges = (gameState.activeSkills.charges || 0) + 1;
            showToast('Skill Charge Ready!', i18n.lang === 'ko' ? '액티브 스킬 뽑기 횟수 +1 충전 완료!' : '+1 Active Skill Pull Charge generated!');
            if (typeof updateSkillsUI === 'function') updateSkillsUI();
        }

        // Active Skill Active Duration Countdown (supports concurrent independent active buffs)
        if (!gameState.activeSkills.activeEffects) gameState.activeSkills.activeEffects = {};
        if (gameState.activeSkills.active && gameState.activeSkills.activeDuration > 0) {
            gameState.activeSkills.activeDuration -= dt;
            if (gameState.activeSkills.activeDuration <= 0) {
                gameState.activeSkills.active = null;
            }
        }
        let anyEffectExpired = false;
        for (const effId in gameState.activeSkills.activeEffects) {
            if (gameState.activeSkills.activeEffects[effId] > 0) {
                gameState.activeSkills.activeEffects[effId] -= dt;
                if (gameState.activeSkills.activeEffects[effId] <= 0) {
                    delete gameState.activeSkills.activeEffects[effId];
                    anyEffectExpired = true;
                }
            }
        }
        if (anyEffectExpired) {
            recalculatePowers();
            updateUI();
            if (typeof updateSkillsUI === 'function') updateSkillsUI();
        }

        // Black Hole Graviton Auto-Clicking Effect during duration
        if (isSkillEffectActive('sk_blackhole')) {
            const autoClickGain = (gameState.clickPower || 1) * 2 * 15 * dt;
            gameState.raibos += autoClickGain;
            gameState.totalRaibos += autoClickGain;
        }

        // Skill Cooldowns countdown (independent cooldowns per skill)
        if (gameState.activeSkills.cooldowns) {
            let cdChanged = false;
            let anyCdFinished = false;
            for (const skId in gameState.activeSkills.cooldowns) {
                if (gameState.activeSkills.cooldowns[skId] > 0) {
                    gameState.activeSkills.cooldowns[skId] = Math.max(0, gameState.activeSkills.cooldowns[skId] - dt);
                    cdChanged = true;
                    if (gameState.activeSkills.cooldowns[skId] === 0) {
                        anyCdFinished = true;
                    }
                }
            }
            if (cdChanged) {
                if (typeof updateSkillSlotDisplays === 'function') {
                    updateSkillSlotDisplays();
                } else if (typeof updateSkillsUI === 'function') {
                    updateSkillsUI();
                }
                if (anyCdFinished && typeof updateSkillsUI === 'function') {
                    updateSkillsUI();
                }
            }
        }
    }
    
    // Auto-Extract Gacha Loop (10 times per second = Every 0.1s if enabled and affordable)
    if (gameState.asteroids && gameState.asteroids.autoEnabled) {
        autoGachaTimer += dt;
        if (autoGachaTimer >= 0.1) {
            autoGachaTimer = 0;
            pullAsteroid(true);
        }
    }
    
    // Invasion Energy Regen
    const astBuffs = getAsteroidBuffs();
    const currentPlanetData = planetsData[gameState.invasion.currentPlanet];
    const mvEnergyScale = getMultiverseEnergyScale();
    const rawMax = Math.floor((currentPlanetData ? currentPlanetData.energyMax : 10000) * mvEnergyScale);
    const darkEnergyBoost = (getConstellationEffect('c_t9_energy_overload') || 1) * (getConstellationEffect('c_t10_cosmic_battery_overcharge') || 1) * (getConstellationEffect('c_t16_dark_energy_hyperdrive') || 1) * (getConstellationEffect('c_t20_infinity_overlord') || 1);
    const maxE = Math.floor(rawMax * (getConstellationEffect('c_energy_max') || 1) * darkEnergyBoost * astBuffs.energyMax);
    const regenMultiplier = (getConstellationEffect('c_energy_regen_mult') || 1) * darkEnergyBoost * astBuffs.energyRegen;
    const baseRegen = ((currentPlanetData ? currentPlanetData.energyRegen : 25) + getConstellationEffect('c_regen')) * regenMultiplier;
    gameState.invasion.energyMax = maxE;       // enforce to fix legacy saves
    gameState.invasion.energyRegen = baseRegen; // enforce to fix legacy saves

    let regen = baseRegen;
    gameState.invasion.conqueredRegions.forEach(rid => {
        const r = getAllRegions().find(x => x.id === rid);
        if (r && r.type === 'energy') regen *= (1 + r.value);                  // e.g. +50% regen
        if (r && r.type === 'energy_mult') regen *= (1 + (r.value - 1) * 0.5); // halved multiplier boost (e.g. x2 -> x1.5)
    });

    gameState.invasion.energy = Math.min(maxE, (gameState.invasion.energy || 0) + regen * dt);

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

// Constellation UI Listeners
const openCBtn = document.getElementById('open-constellation-btn');
if (openCBtn) {
    openCBtn.addEventListener('click', () => {
        document.getElementById('constellation-modal').style.display = 'flex';
        renderConstellation();
    });
}
const closeCBtn = document.getElementById('close-constellation-btn');
if (closeCBtn) {
    closeCBtn.addEventListener('click', () => {
        document.getElementById('constellation-modal').style.display = 'none';
        updateUI();
    });
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
                energy: 0,
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
        if (!gameState.activeSkills) gameState.activeSkills = { charges: 0, timer: 0, unlocked: {}, active: null, activeDuration: 0, cooldowns: {}, totalSkillsUsed: 0, totalSkillPulls: 0 };
        if (!gameState.activeSkills.unlocked) gameState.activeSkills.unlocked = {};
        if (!gameState.activeSkills.cooldowns) gameState.activeSkills.cooldowns = {};
        
        // Remove gamepasses if they exist in save
        delete gameState.gamepasses;
        delete gameState.invasionPerks;
        delete gameState.invasionCount;
        
        // Calculate Offline Progress
        
        // Force update energyMax for legacy saves
        
        if (gameState.invasion && planetsData[gameState.invasion.currentPlanet]) {
            let maxUnlocked = gameState.invasion.maxPlanetUnlocked || 0;
            planetsData.forEach((p, idx) => {
                const cleared = p.regions.every(r => gameState.invasion.conqueredRegions.includes(r.id));
                if (cleared) {
                    if (idx + 1 > maxUnlocked && idx + 1 < planetsData.length) {
                        maxUnlocked = idx + 1;
                    } else if (idx === planetsData.length - 1) {
                        maxUnlocked = idx;
                    }
                }
            });
            gameState.invasion.maxPlanetUnlocked = Math.max(maxUnlocked, gameState.invasion.currentPlanet);
            gameState.invasion.energyMax = planetsData[gameState.invasion.currentPlanet].energyMax;
        }


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
const gachaPullBtn = document.getElementById('gacha-pull-1-btn');
if (gachaPullBtn) {
    gachaPullBtn.addEventListener('click', () => pullAsteroid(false));
}
const gachaAutoBtn = document.getElementById('gacha-auto-toggle-btn');
if (gachaAutoBtn) {
    gachaAutoBtn.addEventListener('click', toggleAutoGacha);
}

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
    document.getElementById('selected-region-name').innerText = i18n.getRegionName(region);
    document.getElementById('selected-region-buff').innerText = `${i18n.t('reward_label')}${i18n.getRegionBuff(region)}`;
    
    updateInvasionUI();
}

function updateInvasionUI() {
    const planet = planetsData[gameState.invasion.currentPlanet];
    if (!planet) return;

    const multiverseScale = getMultiverseEnergyScale();
    gameState.invasion.energyMax = Math.floor(planet.energyMax * multiverseScale);

    document.getElementById('planet-name').innerText = `${i18n.getPlanetName(planet)} (MV ${gameState.multiverse || 1})`;
    document.getElementById('planet-name').style.color = planet.color;

    // Prev / Next button states
    const prevBtn = document.getElementById('prev-planet-btn');
    const nextBtn = document.getElementById('next-planet-btn');
    if (prevBtn) {
        prevBtn.disabled = gameState.invasion.currentPlanet <= 0;
        prevBtn.onclick = () => {
            if (gameState.invasion.currentPlanet > 0) {
                gameState.invasion.currentPlanet--;
                selectedRegionId = null;
                updateInvasionUI();
                saveGame();
            }
        };
    }
    if (nextBtn) {
        // Unlock next planet if current planet is fully conquered or maxPlanetUnlocked allows it
        const currentPlanetCleared = planet.regions.every(r => gameState.invasion.conqueredRegions.includes(r.id));
        const maxUnlocked = gameState.invasion.maxPlanetUnlocked || 0;
        const canGoNext = gameState.invasion.currentPlanet < planetsData.length - 1 && 
                          (currentPlanetCleared || gameState.invasion.currentPlanet < maxUnlocked);
        nextBtn.disabled = !canGoNext;
        nextBtn.onclick = () => {
            if (canGoNext) {
                gameState.invasion.currentPlanet++;
                if (gameState.invasion.currentPlanet > (gameState.invasion.maxPlanetUnlocked || 0)) {
                    gameState.invasion.maxPlanetUnlocked = gameState.invasion.currentPlanet;
                }
                selectedRegionId = null;
                updateInvasionUI();
                saveGame();
            }
        };
    }

    // Multiverse Jump Button visibility
    const mvJumpBtn = document.getElementById('multiverse-jump-btn');
    if (mvJumpBtn) {
        const lastPlanet = planetsData[planetsData.length - 1];
        const lastPlanetCleared = lastPlanet.regions.every(r => gameState.invasion.conqueredRegions.includes(r.id));
        if (lastPlanetCleared) {
            mvJumpBtn.style.display = 'block';
            mvJumpBtn.innerText = i18n.t('multiverse_jump_btn');
            mvJumpBtn.onclick = triggerMultiverseJump;
        } else {
            mvJumpBtn.style.display = 'none';
        }
    }

    const energy = gameState.invasion.energy;
    const maxEnergy = gameState.invasion.energyMax;
    document.getElementById('energy-value').innerText = `${Math.floor(energy)} / ${maxEnergy}`;
    document.getElementById('energy-bar-fill').style.width = `${Math.min(100, (energy / maxEnergy) * 100)}%`;

    // Planet Status text update
    const planetStatusEl = document.getElementById('planet-status');
    const isPlanetCleared = planet.regions.every(r => gameState.invasion.conqueredRegions.includes(r.id));
    if (planetStatusEl) {
        if (isPlanetCleared) {
            planetStatusEl.innerText = i18n.t('planet_fully_conquered');
            planetStatusEl.style.color = '#00ffaa';
        } else {
            planetStatusEl.innerText = i18n.t('planet_conquest_in_progress');
            planetStatusEl.style.color = 'var(--text-secondary)';
        }
    }

    // Auto select first unconquered region if none selected or selected is conquered
    if (!selectedRegionId || gameState.invasion.conqueredRegions.includes(selectedRegionId)) {
        const firstUnconquered = planet.regions.find(r => !gameState.invasion.conqueredRegions.includes(r.id));
        if (firstUnconquered) {
            selectedRegionId = firstUnconquered.id;
            document.getElementById('region-details').style.display = 'block';
            document.getElementById('selected-region-name').innerText = i18n.getRegionName(firstUnconquered);
            document.getElementById('selected-region-buff').innerText = `${i18n.t('reward_label')}${i18n.getRegionBuff(firstUnconquered)}`;
        }
    }

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
            
            const onSelect = (e) => {
                if (e) e.stopPropagation();
                selectRegion(r.id);
            };
            path.onclick = onSelect;
            path.onpointerdown = onSelect;
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
            
            const invasionCostMult = getConstellationEffect('c_invasion_cost') || 1;
            const actualCost = Math.floor(r.cost * invasionCostMult * multiverseScale);
            const rName = i18n.getRegionName(r);
            const rStatus = isConquered ? i18n.t('region_conquered') : i18n.t('region_cost').replace('{0}', actualCost);

            div.innerHTML = `
                <div class="region-list-item-name">${rName}</div>
                <div>${rStatus}</div>
            `;
            
            const onSelect = (e) => {
                if (e) e.stopPropagation();
                selectRegion(r.id);
            };
            div.onclick = onSelect;
            div.onpointerdown = onSelect;
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
            const invasionCostMult = getConstellationEffect('c_invasion_cost') || 1;
            const actualCost = Math.floor(region.cost * invasionCostMult * multiverseScale);
            
            if (isConquered) {
                btn.disabled = true;
                btn.innerText = i18n.t('invade_conquered_btn');
            } else if (gameState.invasion.energy < actualCost) {
                btn.disabled = true;
                btn.innerText = i18n.t('invade_energy_btn').replace('{0}', actualCost);
            } else {
                btn.disabled = false;
                btn.innerText = i18n.t('invade_btn').replace('{0}', actualCost);
            }

            const triggerInvasion = (e) => {
                if (e) e.stopPropagation();
                if (!selectedRegionId) return;
                const planetData = planetsData[gameState.invasion.currentPlanet];
                if (!planetData) return;
                const rData = planetData.regions.find(r => r.id === selectedRegionId);
                if (!rData) return;
                
                const mScale = getMultiverseEnergyScale();
                const invCostM = getConstellationEffect('c_invasion_cost') || 1;
                const actCost = Math.floor(rData.cost * invCostM * mScale);
                
                if (gameState.invasion.energy < actCost) return;
                
                gameState.invasion.energy -= actCost;
                gameState.invasion.energyMax = Math.floor(planetData.energyMax * mScale);
                
                let progress = gameState.invasion.regionProgress[rData.id] || 0;
                const conquestBoost = getConstellationEffect('c_t11_conquest_frenzy') || 1;
                const progressGain = Math.floor((Math.floor(Math.random() * 30) + 1) * conquestBoost);
                progress += progressGain;
                if (progress > 100) progress = 100;
                if (progress >= 100) {
                    progress = 100;
                    if (!gameState.invasion.conqueredRegions.includes(rData.id)) {
                        gameState.invasion.conqueredRegions.push(rData.id);
                        showToast('Region Conquered!', `${rData.name} has fallen. Buff applied: ${rData.buff}`);
                        recalculatePowers();
                        updateUI();
                        updateInvasionUI();
                        checkPlanetClear();
                    }
                }
                
                gameState.invasion.regionProgress[rData.id] = progress;
                updateInvasionUI();
                saveGame();
            };

            btn.onclick = triggerInvasion;
            btn.onpointerdown = triggerInvasion;
        }
    }
}

function triggerMultiverseJump() {
    if (confirm(i18n.t('mv_jump_confirm').replace('{0}', (gameState.multiverse || 1) + 1))) {
        document.getElementById('invasion-panel').classList.add('hyperdrive-active');
        setTimeout(() => {
            const allRegions = getAllRegions();
            if (!gameState.invasion.retainedConqueredRegions) {
                gameState.invasion.retainedConqueredRegions = [];
            }
            
            // Retain non-energy conquered regions from the current multiverse
            (gameState.invasion.conqueredRegions || []).forEach(rid => {
                const r = allRegions.find(x => x.id === rid);
                if (r && r.type !== 'energy' && r.type !== 'energy_mult') {
                    if (!gameState.invasion.retainedConqueredRegions.includes(rid)) {
                        gameState.invasion.retainedConqueredRegions.push(rid);
                    }
                }
            });

            gameState.multiverse = (gameState.multiverse || 1) + 1;
            gameState.invasion.currentPlanet = 0;
            gameState.invasion.maxPlanetUnlocked = 0;
            gameState.invasion.regionProgress = {};
            gameState.invasion.conqueredRegions = [];
            gameState.invasion.energy = 0;

            document.getElementById('invasion-panel').classList.remove('hyperdrive-active');
            recalculatePowers();
            updateInvasionUI();
            saveGame();
            showToast('Welcome to Multiverse ' + gameState.multiverse, 'All planets reset! All non-energy regional buffs have been permanently retained and scaled up!');
        }, 1500);
    }
}

function checkPlanetClear() {
    const planet = planetsData[gameState.invasion.currentPlanet];
    const allConquered = planet.regions.every(r => gameState.invasion.conqueredRegions.includes(r.id));
    
    if (allConquered) {
        showToast('Planet Secured!', `${planet.name} is now under Raibos control.`);
        if (gameState.invasion.currentPlanet < planetsData.length - 1) {
            // Unlock next planet
            if (gameState.invasion.currentPlanet + 1 > (gameState.invasion.maxPlanetUnlocked || 0)) {
                gameState.invasion.maxPlanetUnlocked = gameState.invasion.currentPlanet + 1;
            }
            setTimeout(() => {
                if (confirm(`${planet.name} cleared! Move to next planet immediately?`)) {
                    document.getElementById('invasion-panel').classList.add('hyperdrive-active');
                    setTimeout(() => {
                        gameState.invasion.currentPlanet++;
                        document.getElementById('invasion-panel').classList.remove('hyperdrive-active');
                        selectedRegionId = null;
                        updateInvasionUI();
                        saveGame();
                    }, 1500);
                }
            }, 1000);
        } else {
            // Last planet (Andromeda Galaxy) cleared!
            setTimeout(() => {
                showToast('Multiverse Conquered!', `All planets in Multiverse ${gameState.multiverse || 1} secured! Use the Multiverse Jump button or navigate completed planets freely!`);
                updateInvasionUI();
            }, 1000);
        }
    }
}

// SVG click listeners are now handled dynamically in updateInvasionUI()

document.addEventListener('dblclick', e => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT' && !e.target.closest('.action-btn')) {
        e.preventDefault();
    }
}, { passive: false });

const crBtn = document.getElementById('chrono-raibos');
if (crBtn) {
    crBtn.addEventListener('mousedown', () => {
        crBtn.style.display = 'none';
        if (gameState.idlePower <= 0) {
            showToast('Time Skip Failed', 'You need Idle Production for Time Skips to work!');
            return;
        }
        
        // Base 5 min + c_timeskip + c_t11_temporal_mastery
        const extraSeconds = (getConstellationEffect('c_timeskip') || 0) + (getConstellationEffect('c_t11_temporal_mastery') || 0);
        const seconds = 300 + extraSeconds; 
        const gain = gameState.idlePower * seconds;
        
        gameState.raibos += gain;
        gameState.totalRaibos += gain;
        gameState.timeSkipsUsed = (gameState.timeSkipsUsed || 0) + 1;
        
        showToast(`TIME SKIP!`, `You found a Golden Chrono-Raibos! Gained ${(seconds/60).toFixed(1)} Minutes of production: +${formatNumber(gain)} Raibos`);
        
        // Massive glow effect
        document.body.style.boxShadow = "inset 0 0 100px gold";
        setTimeout(() => { document.body.style.boxShadow = "none"; }, 500);
        updateUI();
    });
}

// 리셋 버튼은 최하단 로직에서 분리하여 안전하게 관리

// ==========================================
// ==========================================
// AAA-Quality Dynamic Spotlight & Interactive Tutorial System
// ==========================================
const tutorialManager = {
    step: 0,
    active: false,
    cardPlacement: 'bottom-right',
    steps: [
        {
            avatar: '👆',
            titleEn: '1. Click to Produce Raibos',
            titleKo: '1. 라이보스 수동 생산',
            descEn: 'Tap or click the central glowing "R" Raibos button to synthesize your initial cosmic currency!',
            descKo: '화면 중앙의 빛나는 "R" 라이보스 버튼을 직접 클릭해 첫 우주 통화를 생산해보세요!',
            hintEn: '👉 Try clicking the glowing "R" button right now!',
            hintKo: '👉 중앙의 빛나는 "R" 버튼을 직접 3회 이상 클릭해보세요!',
            targetId: 'raibos-button',
            arrowPos: 'top', // arrow points down from above target
            cardPos: 'right', // place card to right or bottom
            tab: null,
            interactTrigger: 'click'
        },
        {
            avatar: '🛒',
            titleEn: '2. Upgrades & Automation',
            titleKo: '2. 생산 업그레이드 및 자동화',
            descEn: 'Spend your Raibos on Click upgrades to multiply manual production, and Idle generators to produce Raibos automatically while doing nothing!',
            descKo: '모은 라이보스로 클릭당 생산량을 폭증시키거나, 가만히 있어도 초당 라이보스를 무한 생산하는 방치형 발전기를 구매하세요.',
            hintEn: '👉 Purchase an upgrade from Click or Idle list!',
            hintKo: '👉 Click 탭이나 Idle 탭에서 원하는 업그레이드를 구매해보세요!',
            targetId: 'click-upgrades',
            arrowPos: 'left',
            cardPos: 'left-center',
            tab: 'click-upgrades'
        },
        {
            avatar: '⚡',
            titleEn: '3. Active Skills (2 Equip Slots)',
            titleKo: '3. 액티브 스킬 & 2개 장착 슬롯',
            descEn: 'Gain free skill pull charges every 30s! Pull unique skills from Common up to 0.1% Legendary. You can equip up to 2 skills in the quick slots!',
            descKo: '30초마다 스킬 뽑기 횟수가 1회 충전됩니다! 최대 2개의 스킬을 퀵슬롯에 장착하여 원할 때 강력한 액티브 효과를 발동할 수 있습니다.',
            hintEn: '👉 Extract a skill and equip it to your quick slots!',
            hintKo: '👉 스킬을 뽑고 최대 2개까지 자유롭게 장착/발동해보세요!',
            targetId: 'active-skills-wrapper',
            arrowPos: 'top',
            cardPos: 'right-bottom',
            tab: null
        },
        {
            avatar: '☄️',
            titleEn: '4. Asteroid Gacha & Invasion',
            titleKo: '4. 소행성 코어 추출 & 행성 침략',
            descEn: 'Extract rare Asteroids for permanent passive buffs across all dimensions, and build up invasion energy to conquer the Solar System planet by planet!',
            descKo: 'Gacha 탭에서 소행성을 추출해 전역 영구 버프를 획득하고, Invasion 탭에서 에너지를 모아 지구부터 태양계 행성들을 점령하세요!',
            hintEn: '👉 Check out Gacha and Invasion in the shop tabs!',
            hintKo: '👉 메뉴 상단의 Gacha(소행성) 및 Invasion(침략) 탭을 확인하세요!',
            targetId: 'asteroid-gacha-panel',
            arrowPos: 'left',
            cardPos: 'left-center',
            tab: 'asteroid-gacha-panel'
        },
        {
            avatar: '🌌',
            titleEn: '5. Rebirth & Constellation Tree',
            titleKo: '5. 차원 환생 & 별자리 스킬 트리',
            descEn: 'When you hit 1 Million Raibos, Ascend to earn Rebirth Points (RP) and unlock over 50 deep celestial perks in the Constellation Skill Tree!',
            descKo: '100만 라이보스를 달성하면 환생을 통해 RP를 얻고, 50개 이상의 방대한 별자리 스킬 트리를 열어 영구적인 신적 능력을 완성하세요!',
            hintEn: '👉 Check Rebirth tab to see your next realm ascension!',
            hintKo: '👉 Rebirth 탭에서 다음 차원 도약 목표를 확인해보세요!',
            targetId: 'rebirth-panel',
            arrowPos: 'left',
            cardPos: 'left-center',
            tab: 'rebirth-panel'
        }
    ],

    init() {
        const replayBtn = document.getElementById('tutorial-replay-btn');
        if (replayBtn) {
            replayBtn.onclick = (e) => {
                e.stopPropagation();
                this.start(true);
            };
        }

        const skipBtn = document.getElementById('tut-skip-btn');
        if (skipBtn) {
            skipBtn.onclick = (e) => {
                e.stopPropagation();
                this.finish();
            };
        }

        const nextBtn = document.getElementById('tut-next-btn');
        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.stopPropagation();
                this.next();
            };
        }

        const prevBtn = document.getElementById('tut-prev-btn');
        if (prevBtn) {
            prevBtn.onclick = (e) => {
                e.stopPropagation();
                this.prev();
            };
        }

        window.addEventListener('resize', () => {
            if (this.active) this.updatePositioning();
        });

        // Auto start if not completed
        const completed = localStorage.getItem('raibos_tutorial_completed');
        if (!completed) {
            setTimeout(() => this.start(), 400);
        }
    },

    start(force = false) {
        this.step = 0;
        this.active = true;
        
        const overlay = document.getElementById('tutorial-overlay');
        const spotlightSvg = document.getElementById('tutorial-spotlight-svg');
        const spotlightFrame = document.getElementById('tut-spotlight-frame');
        const arrowEl = document.getElementById('tut-floating-arrow');

        if (overlay) overlay.style.display = 'block';
        if (spotlightSvg) spotlightSvg.style.display = 'block';
        if (spotlightFrame) spotlightFrame.style.display = 'block';
        if (arrowEl) arrowEl.style.display = 'flex';

        this.render();
    },

    next() {
        if (this.step < this.steps.length - 1) {
            this.step++;
            this.render();
        } else {
            this.finish();
        }
    },

    prev() {
        if (this.step > 0) {
            this.step--;
            this.render();
        }
    },

    finish() {
        this.active = false;
        localStorage.setItem('raibos_tutorial_completed', 'true');

        const overlay = document.getElementById('tutorial-overlay');
        const spotlightSvg = document.getElementById('tutorial-spotlight-svg');
        const spotlightFrame = document.getElementById('tut-spotlight-frame');
        const arrowEl = document.getElementById('tut-floating-arrow');

        if (overlay) overlay.style.display = 'none';
        if (spotlightSvg) spotlightSvg.style.display = 'none';
        if (spotlightFrame) spotlightFrame.style.display = 'none';
        if (arrowEl) arrowEl.style.display = 'none';

        this.clearInteractiveTarget();
        showToast('Tutorial Complete! 🎉', i18n.lang === 'ko' ? '튜토리얼을 마쳤습니다. 라이보스 우주를 정복해보세요!' : 'Tutorial complete! Have fun conquering the cosmos!');
    },

    clearInteractiveTarget() {
        document.querySelectorAll('.tutorial-interactive-target').forEach(el => {
            el.classList.remove('tutorial-interactive-target');
        });
    },

    render() {
        if (!this.active) return;
        const s = this.steps[this.step];
        if (!s) return;

        const isKo = i18n.lang === 'ko';
        const titleEl = document.getElementById('tut-title');
        const descEl = document.getElementById('tut-desc');
        const hintEl = document.getElementById('tut-hint-text');
        const avatarEl = document.getElementById('tut-step-icon');
        const badgeEl = document.getElementById('tut-step-badge');
        const fillEl = document.getElementById('tut-progress-fill');
        const nextBtn = document.getElementById('tut-next-btn');
        const prevBtn = document.getElementById('tut-prev-btn');
        const skipBtn = document.getElementById('tut-skip-btn');

        if (titleEl) titleEl.innerText = isKo ? s.titleKo : s.titleEn;
        if (descEl) descEl.innerText = isKo ? s.descKo : s.descEn;
        if (hintEl) hintEl.innerText = isKo ? s.hintKo : s.hintEn;
        if (avatarEl) avatarEl.innerText = s.avatar;
        if (badgeEl) badgeEl.innerText = `${this.step + 1} / ${this.steps.length}`;
        if (fillEl) fillEl.style.width = `${((this.step + 1) / this.steps.length) * 100}%`;

        if (prevBtn) {
            prevBtn.style.display = this.step > 0 ? 'block' : 'none';
            prevBtn.innerText = isKo ? '◀ 이전' : '◀ Prev';
        }
        if (nextBtn) {
            const isLast = this.step === this.steps.length - 1;
            nextBtn.innerHTML = isLast ? (isKo ? '<span>완료 🎉</span>' : '<span>Finish 🎉</span>') : (isKo ? '<span>다음</span> <span class="tut-btn-arrow">▶</span>' : '<span>Next</span> <span class="tut-btn-arrow">▶</span>');
        }
        if (skipBtn) {
            skipBtn.innerText = isKo ? '스킵 ⏭️' : 'Skip ⏭️';
        }

        // Auto switch tab if required
        if (s.tab) {
            const tabBtn = document.querySelector(`.tab[data-target="${s.tab}"]`);
            if (tabBtn) tabBtn.click();
        }

        // Setup Target Element & Spotlight
        this.clearInteractiveTarget();
        setTimeout(() => this.updatePositioning(), 50);
    },

    updatePositioning() {
        if (!this.active) return;
        const s = this.steps[this.step];
        if (!s) return;

        const targetEl = s.targetId ? document.getElementById(s.targetId) : null;
        const holeRect = document.getElementById('tut-mask-hole');
        const frameEl = document.getElementById('tut-spotlight-frame');
        const arrowEl = document.getElementById('tut-floating-arrow');
        const cardEl = document.getElementById('tutorial-card');

        if (targetEl) {
            targetEl.classList.add('tutorial-interactive-target');
            const rect = targetEl.getBoundingClientRect();
            const padding = 10;

            const x = Math.max(0, rect.left - padding);
            const y = Math.max(0, rect.top - padding);
            const width = rect.width + padding * 2;
            const height = rect.height + padding * 2;

            // 1. Cut hole in SVG mask
            if (holeRect) {
                holeRect.setAttribute('x', x);
                holeRect.setAttribute('y', y);
                holeRect.setAttribute('width', width);
                holeRect.setAttribute('height', height);
            }

            // 2. Position Glowing Frame
            if (frameEl) {
                frameEl.style.display = 'block';
                frameEl.style.left = `${x}px`;
                frameEl.style.top = `${y}px`;
                frameEl.style.width = `${width}px`;
                frameEl.style.height = `${height}px`;
            }

            // 3. Position Guiding Arrow
            if (arrowEl) {
                arrowEl.style.display = 'flex';
                if (s.arrowPos === 'top') {
                    // Above the target, pointing down
                    arrowEl.style.left = `${rect.left + rect.width / 2 - 16}px`;
                    arrowEl.style.top = `${Math.max(10, rect.top - 65)}px`;
                    const icon = arrowEl.querySelector('.tut-arrow-icon');
                    if (icon) icon.innerText = '👇';
                } else if (s.arrowPos === 'left') {
                    // Left of target pointing right
                    arrowEl.style.left = `${Math.max(10, rect.left - 65)}px`;
                    arrowEl.style.top = `${rect.top + rect.height / 2 - 25}px`;
                    const icon = arrowEl.querySelector('.tut-arrow-icon');
                    if (icon) icon.innerText = '👉';
                } else {
                    arrowEl.style.left = `${rect.left + rect.width / 2 - 16}px`;
                    arrowEl.style.top = `${rect.bottom + 15}px`;
                    const icon = arrowEl.querySelector('.tut-arrow-icon');
                    if (icon) icon.innerText = '👆';
                }
            }

            // 4. Position Dialog Card Smartly so it doesn't obscure target
            if (cardEl) {
                const winW = window.innerWidth;
                const winH = window.innerHeight;

                if (s.cardPos === 'left-center') {
                    // Position to the left of the shop area
                    cardEl.style.left = `${Math.max(20, rect.left - 460)}px`;
                    cardEl.style.top = `${Math.min(winH - 260, Math.max(40, rect.top))}px`;
                } else if (s.cardPos === 'right') {
                    cardEl.style.left = `${Math.min(winW - 460, rect.right + 30)}px`;
                    cardEl.style.top = `${Math.max(40, rect.top)}px`;
                } else if (s.cardPos === 'right-bottom') {
                    cardEl.style.left = `${Math.min(winW - 460, rect.right + 30)}px`;
                    cardEl.style.top = `${Math.min(winH - 260, rect.bottom - 120)}px`;
                } else {
                    // Default bottom-center
                    cardEl.style.left = '50%';
                    cardEl.style.top = `${winH - 240}px`;
                    cardEl.style.transform = 'translateX(-50%)';
                }
            }
        } else {
            // No specific target, center spotlight
            if (holeRect) {
                holeRect.setAttribute('width', 0);
                holeRect.setAttribute('height', 0);
            }
            if (frameEl) frameEl.style.display = 'none';
            if (arrowEl) arrowEl.style.display = 'none';
            if (cardEl) {
                cardEl.style.left = '50%';
                cardEl.style.top = '50%';
                cardEl.style.transform = 'translate(-50%, -50%)';
            }
        }
    }
};


if (elements.hrBtn) {
    elements.hrBtn.onmousedown = (e) => {
        e.stopPropagation();
        if (confirm(i18n.t('hard_reset_confirm'))) {
            isResetting = true; // 저장 방지 플래그 활성화
            localStorage.clear(); 
            location.reload();
        }
    };
}

// Init
i18n.init();
loadGame();
updateUI();
updateInvasionUI();
if (typeof updateSkillsUI === 'function') updateSkillsUI();

const skillPullBtnEl = document.getElementById('skill-pull-btn');
if (skillPullBtnEl) {
    skillPullBtnEl.addEventListener('click', (e) => {
        e.stopPropagation();
        pullActiveSkill();
    });
}

// Tab navigation
elements.tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        elements.tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const targetId = tab.getAttribute('data-target');
        document.querySelectorAll('.upgrade-list').forEach(panel => {
            panel.classList.remove('active');
        });
        
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
        
        if (targetId === 'ranking-upgrades') {
            fetchRaibosLeaderboard();
        }
    });
});

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

// --- BGM System (8-Bit Retro Space Arcade Default + Cosmic Ambient) ---
const bgmManager = {
    isPlaying: false,
    volume: 0.3,
    currentTrack: 'track3', // 8-Bit Arcade as default!
    audioEl: document.getElementById('game-bgm'),
    toggleBtn: document.getElementById('bgm-toggle-btn'),
    trackSelect: document.getElementById('bgm-track-select'),
    volSlider: document.getElementById('bgm-volume'),
    audioCtx: null,
    synthGain: null,
    synthInterval: null,

    init() {
        const savedVol = localStorage.getItem('raibos_bgm_volume');
        if (savedVol !== null) {
            this.volume = parseFloat(savedVol);
            if (this.volSlider) this.volSlider.value = this.volume;
        }
        if (this.audioEl) this.audioEl.volume = this.volume;

        const savedTrack = localStorage.getItem('raibos_bgm_track');
        if (savedTrack && savedTrack !== 'track1') {
            this.currentTrack = savedTrack;
        } else {
            this.currentTrack = 'track3';
        }
        if (this.trackSelect) this.trackSelect.value = this.currentTrack;

        if (this.volSlider) {
            this.volSlider.addEventListener('input', (e) => {
                this.setVolume(parseFloat(e.target.value));
            });
        }

        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => {
                this.toggle();
            });
        }

        if (this.trackSelect) {
            this.trackSelect.addEventListener('change', (e) => {
                this.switchTrack(e.target.value);
            });
        }

        // Resume playback on user's first interaction if previously enabled
        const savedPlaying = localStorage.getItem('raibos_bgm_enabled');
        if (savedPlaying === 'true') {
            const onFirstClick = () => {
                if (!this.isPlaying && localStorage.getItem('raibos_bgm_enabled') === 'true') {
                    this.start();
                }
                window.removeEventListener('click', onFirstClick);
                window.removeEventListener('keydown', onFirstClick);
            };
            window.addEventListener('click', onFirstClick);
            window.addEventListener('keydown', onFirstClick);
        }
    },

    setVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
        if (this.audioEl) this.audioEl.volume = this.volume;
        if (this.synthGain && this.audioCtx) {
            this.synthGain.gain.setTargetAtTime(this.volume * 0.25, this.audioCtx.currentTime, 0.05);
        }
        localStorage.setItem('raibos_bgm_volume', this.volume);
    },

    switchTrack(trackId) {
        this.currentTrack = trackId;
        localStorage.setItem('raibos_bgm_track', trackId);
        if (this.isPlaying) {
            this.stopAllAudio();
            this.playCurrentTrack();
        }
    },

    toggle() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.start();
        }
    },

    start() {
        this.isPlaying = true;
        localStorage.setItem('raibos_bgm_enabled', 'true');
        if (this.toggleBtn) {
            this.toggleBtn.innerText = '🎵 BGM: ON';
            this.toggleBtn.style.color = '#00ffaa';
            this.toggleBtn.style.borderColor = '#00ffaa';
        }
        this.playCurrentTrack();
    },

    playCurrentTrack() {
        if (this.currentTrack === 'track2') {
            // Track 2: Cosmic Ambient Pad
            this.startCosmicSynth();
        } else {
            // Default Track 3: 8-Bit Space Arcade Chiptune
            this.startChiptuneSynth();
        }
    },

    stopAllAudio() {
        if (this.audioEl) {
            this.audioEl.pause();
        }
        this.stopSynths();
    },

    stop() {
        this.isPlaying = false;
        localStorage.setItem('raibos_bgm_enabled', 'false');
        if (this.toggleBtn) {
            this.toggleBtn.innerText = '🎵 BGM: OFF';
            this.toggleBtn.style.color = '#fff';
            this.toggleBtn.style.borderColor = 'var(--accent-primary)';
        }
        this.stopAllAudio();
    },

    ensureAudioContext() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return false;
        if (!this.audioCtx) {
            this.audioCtx = new AudioContext();
        }
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        if (!this.synthGain) {
            this.synthGain = this.audioCtx.createGain();
            this.synthGain.connect(this.audioCtx.destination);
        }
        this.synthGain.gain.setValueAtTime(this.volume * 0.25, this.audioCtx.currentTime);
        return true;
    },

    startCosmicSynth() {
        if (!this.ensureAudioContext()) return;
        this.stopSynths();

        const chords = [
            [130.81, 155.56, 196.00, 293.66], // C minor 9
            [103.83, 130.81, 155.56, 207.65], // Ab major 7
            [155.56, 196.00, 233.08, 293.66], // Eb major 7
            [116.54, 174.61, 233.08, 261.63]  // Bb sus2
        ];
        let chordIdx = 0;

        const playChord = () => {
            if (!this.isPlaying || this.currentTrack !== 'track2') return;
            const now = this.audioCtx.currentTime;
            const chord = chords[chordIdx % chords.length];
            chordIdx++;

            chord.forEach((freq, i) => {
                const osc = this.audioCtx.createOscillator();
                const noteGain = this.audioCtx.createGain();
                const filter = this.audioCtx.createBiquadFilter();

                osc.type = i === 0 ? 'triangle' : 'sine';
                osc.frequency.setValueAtTime(freq, now);

                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(450 + Math.random() * 200, now);

                noteGain.gain.setValueAtTime(0.001, now);
                noteGain.gain.exponentialRampToValueAtTime(0.08 / chord.length, now + 1.2);
                noteGain.gain.exponentialRampToValueAtTime(0.001, now + 4.8);

                osc.connect(filter);
                filter.connect(noteGain);
                noteGain.connect(this.synthGain);

                osc.start(now);
                osc.stop(now + 5.0);
            });

            // Twinkle bell
            if (Math.random() < 0.75) {
                const twinkle = this.audioCtx.createOscillator();
                const twGain = this.audioCtx.createGain();
                const twFreqs = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
                twinkle.type = 'sine';
                twinkle.frequency.setValueAtTime(twFreqs[Math.floor(Math.random() * twFreqs.length)], now + 1.5);
                twGain.gain.setValueAtTime(0.001, now + 1.5);
                twGain.gain.exponentialRampToValueAtTime(0.03, now + 1.8);
                twGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

                twinkle.connect(twGain);
                twGain.connect(this.synthGain);
                twinkle.start(now + 1.5);
                twinkle.stop(now + 3.3);
            }
        };

        playChord();
        this.synthInterval = setInterval(playChord, 4500);
    },

    startChiptuneSynth() {
        if (!this.ensureAudioContext()) return;
        this.stopSynths();

        // 8-Bit Space Adventure Theme - Full 1-Minute Composition (400 steps @ 150ms = 60.0s)
        const N = {
            R: 0,
            C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
            C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
            C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, GS4: 415.30, A4: 440.00, B4: 493.88,
            C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, GS5: 830.61, A5: 880.00, B5: 987.77,
            C6: 1046.50, D6: 1174.66, E6: 1318.51, F6: 1396.91, G6: 1567.98, A6: 1760.00, B6: 1975.53
        };

        // Part 1: Cosmic Intro (64 steps, 0:00 - 0:09.6)
        const leadIntro = [
            N.C4, N.E4, N.G4, N.C5, N.G4, N.E4, N.C4, N.E4, N.C4, N.E4, N.G4, N.C5, N.E5, N.C5, N.G4, N.E4,
            N.A3, N.C4, N.E4, N.A4, N.E4, N.C4, N.A3, N.C4, N.A3, N.C4, N.E4, N.A4, N.C5, N.A4, N.E4, N.C4,
            N.F3, N.A3, N.C4, N.F4, N.C4, N.A3, N.F3, N.A3, N.F3, N.A3, N.C4, N.F4, N.A4, N.F4, N.C4, N.A3,
            N.G3, N.B3, N.D4, N.G4, N.D4, N.B3, N.G3, N.B3, N.G3, N.B3, N.D4, N.G4, N.B4, N.D5, N.G5, N.R
        ];
        const bassIntro = [
            N.C3, N.R, N.C3, N.R, N.C3, N.R, N.C3, N.C3, N.C3, N.R, N.C3, N.R, N.C3, N.R, N.G3, N.R,
            N.A2, N.R, N.A2, N.R, N.A2, N.R, N.A2, N.A2, N.A2, N.R, N.A2, N.R, N.A2, N.R, N.E3, N.R,
            N.F2, N.R, N.F2, N.R, N.F2, N.R, N.F2, N.F2, N.F2, N.R, N.F2, N.R, N.F2, N.R, N.C3, N.R,
            N.G2, N.R, N.G2, N.R, N.G2, N.R, N.G2, N.G2, N.G2, N.R, N.G2, N.R, N.G2, N.R, N.D3, N.R
        ];
        const drumsIntro = [
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            3, 0, 1, 0, 0, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1, 0,
            3, 0, 1, 0, 0, 0, 1, 0, 3, 0, 1, 0, 2, 0, 2, 2
        ];

        // Part 2: Main Theme A (96 steps, 0:09.6 - 0:24.0)
        const leadThemeA = [
            N.C5, N.R, N.G4, N.C5, N.E5, N.R, N.D5, N.C5, N.D5, N.E5, N.D5, N.C5, N.G4, N.R, N.G4, N.B4,
            N.C5, N.R, N.E5, N.A5, N.G5, N.E5, N.D5, N.C5, N.D5, N.C5, N.A4, N.G4, N.A4, N.C5, N.D5, N.E5,
            N.F5, N.E5, N.D5, N.C5, N.A4, N.C5, N.F5, N.G5, N.A5, N.G5, N.F5, N.E5, N.D5, N.C5, N.D5, N.F5,
            N.G5, N.F5, N.E5, N.D5, N.B4, N.D5, N.G5, N.A5, N.B5, N.A5, N.G5, N.F5, N.E5, N.D5, N.C5, N.D5,
            N.E5, N.G5, N.B5, N.G5, N.E5, N.B4, N.G4, N.B4, N.C5, N.E5, N.A5, N.C6, N.B5, N.A5, N.G5, N.E5,
            N.F5, N.A5, N.C6, N.A5, N.F5, N.D5, N.C5, N.A4, N.B4, N.D5, N.G5, N.B5, N.D6, N.B5, N.G5, N.D5
        ];
        const bassThemeA = [
            N.C3, N.C3, N.G3, N.C3, N.C3, N.C3, N.G3, N.C3, N.C3, N.C3, N.G3, N.C3, N.C3, N.C3, N.G3, N.C3,
            N.A2, N.A2, N.E3, N.A2, N.A2, N.A2, N.E3, N.A2, N.A2, N.A2, N.E3, N.A2, N.A2, N.A2, N.E3, N.A2,
            N.F2, N.F2, N.C3, N.F2, N.F2, N.F2, N.C3, N.F2, N.F2, N.F2, N.C3, N.F2, N.F2, N.F2, N.C3, N.F2,
            N.G2, N.G2, N.D3, N.G2, N.G2, N.G2, N.D3, N.G2, N.G2, N.G2, N.D3, N.G2, N.G2, N.G2, N.D3, N.G2,
            N.E2, N.E2, N.B2, N.E2, N.E2, N.E2, N.B2, N.E2, N.A2, N.A2, N.E3, N.A2, N.A2, N.A2, N.E3, N.A2,
            N.F2, N.F2, N.C3, N.F2, N.F2, N.F2, N.C3, N.F2, N.G2, N.G2, N.D3, N.G2, N.G2, N.G2, N.D3, N.G2
        ];
        const drumBarA = [3, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0];
        const drumsThemeA = [
            ...drumBarA, ...drumBarA, ...drumBarA, ...drumBarA, ...drumBarA,
            3, 0, 1, 0, 2, 0, 1, 0, 3, 2, 3, 2, 2, 2, 2, 2
        ];

        // Part 3: Variation Theme B (96 steps, 0:24.0 - 0:38.4)
        const leadThemeB = [
            N.A5, N.R, N.E5, N.R, N.A5, N.B5, N.C6, N.B5, N.A5, N.G5, N.E5, N.D5, N.E5, N.R, N.G5, N.R,
            N.F5, N.R, N.C5, N.R, N.F5, N.G5, N.A5, N.G5, N.F5, N.E5, N.C5, N.D5, N.E5, N.R, N.F5, N.R,
            N.D5, N.R, N.F5, N.R, N.A5, N.R, N.D6, N.R, N.C6, N.B5, N.A5, N.G5, N.F5, N.E5, N.D5, N.R,
            N.E5, N.GS4, N.B4, N.E5, N.GS5, N.E5, N.B4, N.GS4, N.E5, N.B4, N.E5, N.GS5, N.B5, N.R, N.B5, N.R,
            N.C6, N.B5, N.A5, N.G5, N.A5, N.R, N.E5, N.R, N.G5, N.F5, N.E5, N.D5, N.E5, N.R, N.G4, N.R,
            N.A4, N.C5, N.F5, N.A5, N.C6, N.A5, N.F5, N.C5, N.B4, N.D5, N.G5, N.B5, N.D6, N.B5, N.G5, N.D5
        ];
        const bassThemeB = [
            N.A2, N.R, N.A2, N.A3, N.A2, N.R, N.A2, N.A3, N.A2, N.R, N.A2, N.A3, N.A2, N.R, N.A2, N.E3,
            N.F2, N.R, N.F2, N.F3, N.F2, N.R, N.F2, N.F3, N.F2, N.R, N.F2, N.F3, N.F2, N.R, N.F2, N.C3,
            N.D2, N.R, N.D2, N.D3, N.D2, N.R, N.D2, N.D3, N.D2, N.R, N.D2, N.D3, N.D2, N.R, N.D2, N.A2,
            N.E2, N.R, N.E2, N.E3, N.E2, N.R, N.E2, N.E3, N.E2, N.R, N.E2, N.E3, N.E2, N.R, N.E2, N.B2,
            N.A2, N.R, N.A2, N.A3, N.A2, N.R, N.A2, N.A3, N.G2, N.R, N.G2, N.G3, N.G2, N.R, N.G2, N.D3,
            N.F2, N.R, N.F2, N.F3, N.F2, N.R, N.F2, N.F3, N.G2, N.R, N.G2, N.G3, N.G2, N.R, N.G2, N.D3
        ];
        const drumBarB = [3, 0, 1, 3, 2, 0, 1, 0, 3, 1, 3, 0, 2, 0, 1, 2];
        const drumsThemeB = [
            ...drumBarB, ...drumBarB, ...drumBarB, ...drumBarB, ...drumBarB,
            3, 0, 1, 3, 2, 0, 2, 0, 3, 2, 3, 2, 2, 2, 2, 2
        ];

        // Part 4: Bridge / Cosmic Breakdown (64 steps, 0:38.4 - 0:48.0)
        const leadBridge = [
            N.C6, N.R, N.R, N.R, N.G5, N.R, N.R, N.R, N.E5, N.R, N.R, N.R, N.B4, N.R, N.C5, N.R,
            N.A5, N.R, N.R, N.R, N.F5, N.R, N.R, N.R, N.C5, N.R, N.R, N.R, N.E5, N.R, N.D5, N.R,
            N.F5, N.R, N.R, N.R, N.D5, N.R, N.R, N.R, N.A4, N.R, N.R, N.R, N.C5, N.R, N.B4, N.R,
            N.G4, N.B4, N.D5, N.G5, N.A4, N.C5, N.E5, N.A5, N.B4, N.D5, N.G5, N.B5, N.C5, N.E5, N.G5, N.C6
        ];
        const bassBridge = [
            N.C2, N.R, N.R, N.R, N.C3, N.R, N.R, N.R, N.C2, N.R, N.R, N.R, N.G2, N.R, N.C3, N.R,
            N.F2, N.R, N.R, N.R, N.F3, N.R, N.R, N.R, N.F2, N.R, N.R, N.R, N.C3, N.R, N.F2, N.R,
            N.D2, N.R, N.R, N.R, N.D3, N.R, N.R, N.R, N.D2, N.R, N.R, N.R, N.A2, N.R, N.D2, N.R,
            N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.G2, N.G2
        ];
        const drumsBridge = [
            3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
        ];

        // Part 5: Climax & Finale Loop (80 steps, 0:48.0 - 1:00.0)
        const leadClimax = [
            N.C5, N.E5, N.G5, N.C6, N.E6, N.C6, N.G5, N.E5, N.C5, N.G4, N.C5, N.E5, N.G5, N.C6, N.E6, N.G6,
            N.A5, N.E5, N.C5, N.A4, N.E5, N.A5, N.C6, N.E6, N.A6, N.E6, N.C6, N.A5, N.E5, N.C5, N.A4, N.C5,
            N.F5, N.A5, N.C6, N.F6, N.E6, N.D6, N.C6, N.A5, N.F5, N.C5, N.F5, N.A5, N.C6, N.D6, N.E6, N.F6,
            N.G6, N.F6, N.D6, N.B5, N.G5, N.D5, N.B4, N.G4, N.G5, N.B5, N.D6, N.F6, N.G6, N.B6, N.D6, N.B5,
            N.C6, N.R, N.G5, N.R, N.E5, N.R, N.C5, N.R, N.G4, N.R, N.E4, N.R, N.C4, N.R, N.R, N.R
        ];
        const bassClimax = [
            N.C3, N.G3, N.C4, N.G3, N.C3, N.G3, N.C4, N.G3, N.C3, N.G3, N.C4, N.G3, N.C3, N.G3, N.C4, N.G3,
            N.A2, N.E3, N.A3, N.E3, N.A2, N.E3, N.A3, N.E3, N.A2, N.E3, N.A3, N.E3, N.A2, N.E3, N.A3, N.E3,
            N.F2, N.C3, N.F3, N.C3, N.F2, N.C3, N.F3, N.C3, N.F2, N.C3, N.F3, N.C3, N.F2, N.C3, N.F3, N.C3,
            N.G2, N.D3, N.G3, N.D3, N.G2, N.D3, N.G3, N.D3, N.G2, N.D3, N.G3, N.D3, N.G2, N.D3, N.G3, N.D3,
            N.C3, N.R, N.G2, N.R, N.E2, N.R, N.C2, N.R, N.C3, N.R, N.C3, N.R, N.C3, N.R, N.R, N.R
        ];
        const drumBarClimax = [3, 1, 3, 1, 2, 1, 3, 1, 3, 1, 3, 1, 2, 1, 2, 1];
        const drumsClimax = [
            ...drumBarClimax, ...drumBarClimax, ...drumBarClimax, ...drumBarClimax,
            3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0
        ];

        // Combined 400 steps (60.0s total at 150ms per step)
        const leadNotes = [...leadIntro, ...leadThemeA, ...leadThemeB, ...leadBridge, ...leadClimax];
        const bassNotes = [...bassIntro, ...bassThemeA, ...bassThemeB, ...bassBridge, ...bassClimax];
        const drumHits = [...drumsIntro, ...drumsThemeA, ...drumsThemeB, ...drumsBridge, ...drumsClimax];

        let step = 0;

        const tick = () => {
            if (!this.isPlaying || this.currentTrack !== 'track3') return;
            const now = this.audioCtx.currentTime;
            const idx = step % leadNotes.length;
            step++;

            // 1. Lead Melody (Square Wave)
            const leadFreq = leadNotes[idx];
            if (leadFreq > 0) {
                const leadOsc = this.audioCtx.createOscillator();
                const leadGain = this.audioCtx.createGain();
                leadOsc.type = 'square';
                leadOsc.frequency.setValueAtTime(leadFreq, now);

                leadGain.gain.setValueAtTime(0.035, now);
                leadGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.13);

                leadOsc.connect(leadGain);
                leadGain.connect(this.synthGain);
                leadOsc.start(now);
                leadOsc.stop(now + 0.14);
            }

            // 2. Chiptune Bassline (Triangle Wave)
            const bassFreq = bassNotes[idx];
            if (bassFreq > 0) {
                const bassOsc = this.audioCtx.createOscillator();
                const bassGain = this.audioCtx.createGain();
                bassOsc.type = 'triangle';
                bassOsc.frequency.setValueAtTime(bassFreq, now);

                bassGain.gain.setValueAtTime(0.065, now);
                bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

                bassOsc.connect(bassGain);
                bassGain.connect(this.synthGain);
                bassOsc.start(now);
                bassOsc.stop(now + 0.15);
            }

            // 3. Rhythm & Percussion (Kick, Snare, Hi-hat)
            const drum = drumHits[idx];
            if (drum === 3) {
                // Kick
                const kickOsc = this.audioCtx.createOscillator();
                const kickGain = this.audioCtx.createGain();
                kickOsc.type = 'triangle';
                kickOsc.frequency.setValueAtTime(130, now);
                kickOsc.frequency.exponentialRampToValueAtTime(32, now + 0.08);

                kickGain.gain.setValueAtTime(0.07, now);
                kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

                kickOsc.connect(kickGain);
                kickGain.connect(this.synthGain);
                kickOsc.start(now);
                kickOsc.stop(now + 0.1);
            } else if (drum === 2) {
                // Snare
                const snareOsc = this.audioCtx.createOscillator();
                const snareGain = this.audioCtx.createGain();
                snareOsc.type = 'sawtooth';
                snareOsc.frequency.setValueAtTime(220, now);
                snareOsc.frequency.exponentialRampToValueAtTime(70, now + 0.06);

                snareGain.gain.setValueAtTime(0.035, now);
                snareGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.07);

                snareOsc.connect(snareGain);
                snareGain.connect(this.synthGain);
                snareOsc.start(now);
                snareOsc.stop(now + 0.08);
            } else if (drum === 1) {
                // Hi-Hat Click
                const hatOsc = this.audioCtx.createOscillator();
                const hatGain = this.audioCtx.createGain();
                hatOsc.type = 'square';
                hatOsc.frequency.setValueAtTime(1100, now);

                hatGain.gain.setValueAtTime(0.012, now);
                hatGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

                hatOsc.connect(hatGain);
                hatGain.connect(this.synthGain);
                hatOsc.start(now);
                hatOsc.stop(now + 0.04);
            }
        };

        tick();
        this.synthInterval = setInterval(tick, 150); // 150ms per step * 400 = 60s total loop
    },

    stopSynths() {
        if (this.synthInterval) {
            clearInterval(this.synthInterval);
            this.synthInterval = null;
        }
    }
};

bgmManager.init();

requestAnimationFrame(gameLoop);
