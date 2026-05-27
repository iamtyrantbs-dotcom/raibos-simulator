// ==========================================
// RAIBOS SIMULATOR - MASSIVE QUANTUM EXPANSION DATA
// OVER 3000+ LINES OF PROCEDURAL DATA
// ==========================================

var clickUpgrades = [
    {
        "id": "c1",
        "name": "Raibos Neural Spark",
        "desc": "+5 Raibos/click",
        "baseCost": 100,
        "costMul": 1.35,
        "value": 5
    },
    {
        "id": "c2",
        "name": "Raibos Kinetic Surge",
        "desc": "+50 Raibos/click",
        "baseCost": 1500,
        "costMul": 1.355,
        "value": 50
    },
    {
        "id": "c3",
        "name": "Raibos Static Eruption",
        "desc": "+500 Raibos/click",
        "baseCost": 22500,
        "costMul": 1.36,
        "value": 500
    },
    {
        "id": "c4",
        "name": "Raibos Bio Fracture",
        "desc": "+5000 Raibos/click",
        "baseCost": 337500,
        "costMul": 1.365,
        "value": 5000
    },
    {
        "id": "c5",
        "name": "Raibos Sonic Swarm",
        "desc": "+50000 Raibos/click",
        "baseCost": 5062500,
        "costMul": 1.37,
        "value": 50000
    },
    {
        "id": "c6",
        "name": "Raibos Optical Torpedo",
        "desc": "+500000 Raibos/click",
        "baseCost": 75937500,
        "costMul": 1.375,
        "value": 500000
    },
    {
        "id": "c7",
        "name": "Raibos Thermal Rift",
        "desc": "+5.00e+6 Raibos/click",
        "baseCost": 1139062500,
        "costMul": 1.3800000000000001,
        "value": 5000000
    },
    {
        "id": "c8",
        "name": "Raibos Magnetic Flash",
        "desc": "+5.00e+7 Raibos/click",
        "baseCost": 17085937500,
        "costMul": 1.385,
        "value": 50000000
    },
    {
        "id": "c9",
        "name": "Raibos Plasma Collapse",
        "desc": "+5.00e+8 Raibos/click",
        "baseCost": 256289062500,
        "costMul": 1.3900000000000001,
        "value": 500000000
    },
    {
        "id": "c10",
        "name": "Raibos Atomic Sweep",
        "desc": "+5.00e+9 Raibos/click",
        "baseCost": 3844335937500,
        "costMul": 1.395,
        "value": 5000000000
    },
    {
        "id": "c11",
        "name": "Raibos Molecular Cleave",
        "desc": "+2.50e+11 Raibos/click",
        "baseCost": 576650390625000,
        "costMul": 1.4000000000000001,
        "value": 250000000000
    },
    {
        "id": "c12",
        "name": "Raibos Gravitational Acceleration",
        "desc": "+2.50e+12 Raibos/click",
        "baseCost": 8649755859375000,
        "costMul": 1.405,
        "value": 2500000000000
    },
    {
        "id": "c13",
        "name": "Raibos Quantum Wrath",
        "desc": "+2.50e+13 Raibos/click",
        "baseCost": 129746337890625000,
        "costMul": 1.4100000000000001,
        "value": 25000000000000
    },
    {
        "id": "c14",
        "name": "Raibos Nano Barrage",
        "desc": "+2.50e+14 Raibos/click",
        "baseCost": 1946195068359374800,
        "costMul": 1.415,
        "value": 250000000000000
    },
    {
        "id": "c15",
        "name": "Raibos Cyber Bind",
        "desc": "+2.50e+15 Raibos/click",
        "baseCost": 29192926025390620000,
        "costMul": 1.4200000000000002,
        "value": 2500000000000000
    },
    {
        "id": "c16",
        "name": "Raibos Ion Shadow",
        "desc": "+2.50e+16 Raibos/click",
        "baseCost": 437893890380859300000,
        "costMul": 1.425,
        "value": 25000000000000000
    },
    {
        "id": "c17",
        "name": "Raibos Photon Dawn",
        "desc": "+2.50e+17 Raibos/click",
        "baseCost": 6.56840835571289e+21,
        "costMul": 1.4300000000000002,
        "value": 250000000000000000
    },
    {
        "id": "c18",
        "name": "Raibos Tachyon Eclipse",
        "desc": "+2.50e+18 Raibos/click",
        "baseCost": 9.852612533569336e+22,
        "costMul": 1.435,
        "value": 2500000000000000000
    },
    {
        "id": "c19",
        "name": "Raibos Antimatter Dream",
        "desc": "+2.50e+19 Raibos/click",
        "baseCost": 1.4778918800354004e+24,
        "costMul": 1.4400000000000002,
        "value": 25000000000000000000
    },
    {
        "id": "c20",
        "name": "Raibos Void Prophecy",
        "desc": "+2.50e+20 Raibos/click",
        "baseCost": 2.2168378200531005e+25,
        "costMul": 1.445,
        "value": 250000000000000000000
    },
    {
        "id": "c21",
        "name": "Raibos Nebula Cataclysm",
        "desc": "+1.25e+22 Raibos/click",
        "baseCost": 3.325256730079651e+27,
        "costMul": 1.4500000000000002,
        "value": 1.25e+22
    },
    {
        "id": "c22",
        "name": "Raibos Stellar Ruin",
        "desc": "+1.25e+23 Raibos/click",
        "baseCost": 4.987885095119476e+28,
        "costMul": 1.455,
        "value": 1.25e+23
    },
    {
        "id": "c23",
        "name": "Raibos Supernova Obliteration",
        "desc": "+1.25e+24 Raibos/click",
        "baseCost": 7.481827642679214e+29,
        "costMul": 1.4600000000000002,
        "value": 1.2499999999999998e+24
    },
    {
        "id": "c24",
        "name": "Raibos Quasar Purge",
        "desc": "+1.25e+25 Raibos/click",
        "baseCost": 1.122274146401882e+31,
        "costMul": 1.465,
        "value": 1.2499999999999998e+25
    },
    {
        "id": "c25",
        "name": "Raibos Pulsar Resurrection",
        "desc": "+1.25e+26 Raibos/click",
        "baseCost": 1.6834112196028232e+32,
        "costMul": 1.4700000000000002,
        "value": 1.2499999999999998e+26
    },
    {
        "id": "c26",
        "name": "Raibos Gamma Mutation",
        "desc": "+1.25e+27 Raibos/click",
        "baseCost": 2.5251168294042349e+33,
        "costMul": 1.475,
        "value": 1.25e+27
    },
    {
        "id": "c27",
        "name": "Raibos Black Hole Transmutation",
        "desc": "+1.25e+28 Raibos/click",
        "baseCost": 3.7876752441063523e+34,
        "costMul": 1.48,
        "value": 1.25e+28
    },
    {
        "id": "c28",
        "name": "Raibos Event Horizon Fusion",
        "desc": "+1.25e+29 Raibos/click",
        "baseCost": 5.681512866159528e+35,
        "costMul": 1.485,
        "value": 1.2499999999999998e+29
    },
    {
        "id": "c29",
        "name": "Raibos Singularity Radiation",
        "desc": "+1.25e+30 Raibos/click",
        "baseCost": 8.522269299239293e+36,
        "costMul": 1.4900000000000002,
        "value": 1.2499999999999998e+30
    },
    {
        "id": "c30",
        "name": "Raibos Wormhole Reflection",
        "desc": "+1.25e+31 Raibos/click",
        "baseCost": 1.2783403948858939e+38,
        "costMul": 1.495,
        "value": 1.2499999999999998e+31
    },
    {
        "id": "c31",
        "name": "Raibos Dark Energy Interference",
        "desc": "+6.25e+32 Raibos/click",
        "baseCost": 1.917510592328841e+40,
        "costMul": 1.5,
        "value": 6.25e+32
    },
    {
        "id": "c32",
        "name": "Raibos Cosmic Frequency",
        "desc": "+6.25e+33 Raibos/click",
        "baseCost": 2.8762658884932616e+41,
        "costMul": 1.5050000000000001,
        "value": 6.25e+33
    },
    {
        "id": "c33",
        "name": "Raibos Galactic Phase",
        "desc": "+6.25e+34 Raibos/click",
        "baseCost": 4.314398832739893e+42,
        "costMul": 1.51,
        "value": 6.249999999999999e+34
    },
    {
        "id": "c34",
        "name": "Raibos Universal Encryption",
        "desc": "+6.25e+35 Raibos/click",
        "baseCost": 6.471598249109839e+43,
        "costMul": 1.5150000000000001,
        "value": 6.249999999999999e+35
    },
    {
        "id": "c35",
        "name": "Raibos Multiverse Reception",
        "desc": "+6.25e+36 Raibos/click",
        "baseCost": 9.707397373664758e+44,
        "costMul": 1.52,
        "value": 6.249999999999999e+36
    },
    {
        "id": "c36",
        "name": "Raibos Dimensional Spark",
        "desc": "+6.25e+37 Raibos/click",
        "baseCost": 1.4561096060497137e+46,
        "costMul": 1.5250000000000001,
        "value": 6.249999999999999e+37
    },
    {
        "id": "c37",
        "name": "Raibos Time Surge",
        "desc": "+6.25e+38 Raibos/click",
        "baseCost": 2.1841644090745704e+47,
        "costMul": 1.53,
        "value": 6.249999999999999e+38
    },
    {
        "id": "c38",
        "name": "Raibos Reality Eruption",
        "desc": "+6.25e+39 Raibos/click",
        "baseCost": 3.276246613611856e+48,
        "costMul": 1.5350000000000001,
        "value": 6.249999999999999e+39
    },
    {
        "id": "c39",
        "name": "Raibos Chrono Fracture",
        "desc": "+6.25e+40 Raibos/click",
        "baseCost": 4.914369920417783e+49,
        "costMul": 1.54,
        "value": 6.249999999999999e+40
    },
    {
        "id": "c40",
        "name": "Raibos Space Swarm",
        "desc": "+6.25e+41 Raibos/click",
        "baseCost": 7.371554880626675e+50,
        "costMul": 1.5450000000000002,
        "value": 6.249999999999999e+41
    },
    {
        "id": "c41",
        "name": "Raibos Entropy Torpedo",
        "desc": "+3.12e+43 Raibos/click",
        "baseCost": 1.1057332320940012e+53,
        "costMul": 1.55,
        "value": 3.125e+43
    },
    {
        "id": "c42",
        "name": "Raibos Absolute Rift",
        "desc": "+3.12e+44 Raibos/click",
        "baseCost": 1.658599848141002e+54,
        "costMul": 1.5550000000000002,
        "value": 3.125e+44
    },
    {
        "id": "c43",
        "name": "Raibos Infinity Flash",
        "desc": "+3.13e+45 Raibos/click",
        "baseCost": 2.4878997722115025e+55,
        "costMul": 1.56,
        "value": 3.125e+45
    },
    {
        "id": "c44",
        "name": "Raibos Astral Collapse",
        "desc": "+3.13e+46 Raibos/click",
        "baseCost": 3.7318496583172536e+56,
        "costMul": 1.5650000000000002,
        "value": 3.125e+46
    },
    {
        "id": "c45",
        "name": "Raibos Celestial Sweep",
        "desc": "+3.13e+47 Raibos/click",
        "baseCost": 5.59777448747588e+57,
        "costMul": 1.57,
        "value": 3.1250000000000002e+47
    },
    {
        "id": "c46",
        "name": "Raibos Meteor Cleave",
        "desc": "+3.13e+48 Raibos/click",
        "baseCost": 8.39666173121382e+58,
        "costMul": 1.5750000000000002,
        "value": 3.125e+48
    },
    {
        "id": "c47",
        "name": "Raibos Comet Acceleration",
        "desc": "+3.12e+49 Raibos/click",
        "baseCost": 1.259499259682073e+60,
        "costMul": 1.58,
        "value": 3.125e+49
    },
    {
        "id": "c48",
        "name": "Raibos Asteroid Wrath",
        "desc": "+3.12e+50 Raibos/click",
        "baseCost": 1.8892488895231097e+61,
        "costMul": 1.5850000000000002,
        "value": 3.125e+50
    },
    {
        "id": "c49",
        "name": "Raibos Planet Barrage",
        "desc": "+3.12e+51 Raibos/click",
        "baseCost": 2.8338733342846643e+62,
        "costMul": 1.59,
        "value": 3.125e+51
    },
    {
        "id": "c50",
        "name": "Raibos Solar Bind",
        "desc": "+3.13e+52 Raibos/click",
        "baseCost": 4.250810001426996e+63,
        "costMul": 1.5950000000000002,
        "value": 3.125e+52
    },
    {
        "id": "c51",
        "name": "Raibos Constellation Shadow",
        "desc": "+1.56e+54 Raibos/click",
        "baseCost": 6.3762150021404945e+65,
        "costMul": 1.6,
        "value": 1.5625e+54
    },
    {
        "id": "c52",
        "name": "Raibos Zodiac Dawn",
        "desc": "+1.56e+55 Raibos/click",
        "baseCost": 9.564322503210741e+66,
        "costMul": 1.605,
        "value": 1.5625e+55
    },
    {
        "id": "c53",
        "name": "Raibos Orbital Eclipse",
        "desc": "+1.56e+56 Raibos/click",
        "baseCost": 1.4346483754816113e+68,
        "costMul": 1.61,
        "value": 1.5625000000000001e+56
    },
    {
        "id": "c54",
        "name": "Raibos Satellite Dream",
        "desc": "+1.56e+57 Raibos/click",
        "baseCost": 2.151972563222417e+69,
        "costMul": 1.6150000000000002,
        "value": 1.5625000000000001e+57
    },
    {
        "id": "c55",
        "name": "Raibos Zenith Prophecy",
        "desc": "+1.56e+58 Raibos/click",
        "baseCost": 3.2279588448336254e+70,
        "costMul": 1.62,
        "value": 1.5625000000000002e+58
    },
    {
        "id": "c56",
        "name": "Raibos Nadir Cataclysm",
        "desc": "+1.56e+59 Raibos/click",
        "baseCost": 4.841938267250438e+71,
        "costMul": 1.625,
        "value": 1.5625000000000001e+59
    },
    {
        "id": "c57",
        "name": "Raibos Eclipse Ruin",
        "desc": "+1.56e+60 Raibos/click",
        "baseCost": 7.262907400875657e+72,
        "costMul": 1.6300000000000001,
        "value": 1.5625000000000002e+60
    },
    {
        "id": "c58",
        "name": "Raibos Equinox Obliteration",
        "desc": "+1.56e+61 Raibos/click",
        "baseCost": 1.0894361101313485e+74,
        "costMul": 1.6350000000000002,
        "value": 1.5625000000000004e+61
    },
    {
        "id": "c59",
        "name": "Raibos Solstice Purge",
        "desc": "+1.56e+62 Raibos/click",
        "baseCost": 1.6341541651970227e+75,
        "costMul": 1.6400000000000001,
        "value": 1.5625000000000003e+62
    },
    {
        "id": "c60",
        "name": "Raibos Genesis Resurrection",
        "desc": "+1.56e+63 Raibos/click",
        "baseCost": 2.451231247795534e+76,
        "costMul": 1.645,
        "value": 1.5625000000000004e+63
    },
    {
        "id": "c61",
        "name": "Raibos Omega Mutation",
        "desc": "+7.81e+64 Raibos/click",
        "baseCost": 3.676846871693301e+78,
        "costMul": 1.6500000000000001,
        "value": 7.812500000000001e+64
    },
    {
        "id": "c62",
        "name": "Raibos Alpha Transmutation",
        "desc": "+7.81e+65 Raibos/click",
        "baseCost": 5.515270307539951e+79,
        "costMul": 1.655,
        "value": 7.812500000000001e+65
    },
    {
        "id": "c63",
        "name": "Raibos Eternity Fusion",
        "desc": "+7.81e+66 Raibos/click",
        "baseCost": 8.272905461309927e+80,
        "costMul": 1.6600000000000001,
        "value": 7.8125e+66
    },
    {
        "id": "c64",
        "name": "Raibos Abyss Radiation",
        "desc": "+7.81e+67 Raibos/click",
        "baseCost": 1.2409358191964891e+82,
        "costMul": 1.665,
        "value": 7.8125e+67
    },
    {
        "id": "c65",
        "name": "Raibos Aether Reflection",
        "desc": "+7.81e+68 Raibos/click",
        "baseCost": 1.8614037287947337e+83,
        "costMul": 1.6700000000000002,
        "value": 7.8125e+68
    },
    {
        "id": "c66",
        "name": "Raibos Chaos Interference",
        "desc": "+7.81e+69 Raibos/click",
        "baseCost": 2.7921055931921007e+84,
        "costMul": 1.675,
        "value": 7.812500000000001e+69
    },
    {
        "id": "c67",
        "name": "Raibos Order Frequency",
        "desc": "+7.81e+70 Raibos/click",
        "baseCost": 4.188158389788151e+85,
        "costMul": 1.6800000000000002,
        "value": 7.812500000000001e+70
    },
    {
        "id": "c68",
        "name": "Raibos Primal Phase",
        "desc": "+7.81e+71 Raibos/click",
        "baseCost": 6.282237584682227e+86,
        "costMul": 1.685,
        "value": 7.812500000000001e+71
    },
    {
        "id": "c69",
        "name": "Raibos Apex Encryption",
        "desc": "+7.81e+72 Raibos/click",
        "baseCost": 9.42335637702334e+87,
        "costMul": 1.6900000000000002,
        "value": 7.812500000000001e+72
    },
    {
        "id": "c70",
        "name": "Raibos Nova Reception",
        "desc": "+7.81e+73 Raibos/click",
        "baseCost": 1.413503456553501e+89,
        "costMul": 1.695,
        "value": 7.8125e+73
    },
    {
        "id": "c71",
        "name": "Raibos Hyper Spark",
        "desc": "+3.91e+75 Raibos/click",
        "baseCost": 2.1202551848302512e+91,
        "costMul": 1.7000000000000002,
        "value": 3.906250000000001e+75
    },
    {
        "id": "c72",
        "name": "Raibos Ultra Surge",
        "desc": "+3.91e+76 Raibos/click",
        "baseCost": 3.1803827772453765e+92,
        "costMul": 1.705,
        "value": 3.9062500000000005e+76
    },
    {
        "id": "c73",
        "name": "Raibos Macro Eruption",
        "desc": "+3.91e+77 Raibos/click",
        "baseCost": 4.7705741658680645e+93,
        "costMul": 1.71,
        "value": 3.9062500000000005e+77
    },
    {
        "id": "c74",
        "name": "Raibos Micro Fracture",
        "desc": "+3.91e+78 Raibos/click",
        "baseCost": 7.155861248802097e+94,
        "costMul": 1.715,
        "value": 3.9062500000000005e+78
    },
    {
        "id": "c75",
        "name": "Raibos Subatomic Swarm",
        "desc": "+3.91e+79 Raibos/click",
        "baseCost": 1.0733791873203145e+96,
        "costMul": 1.7200000000000002,
        "value": 3.9062500000000005e+79
    },
    {
        "id": "c76",
        "name": "Raibos Proton Torpedo",
        "desc": "+3.91e+80 Raibos/click",
        "baseCost": 1.6100687809804717e+97,
        "costMul": 1.725,
        "value": 3.9062500000000006e+80
    },
    {
        "id": "c77",
        "name": "Raibos Neutron Rift",
        "desc": "+3.91e+81 Raibos/click",
        "baseCost": 2.4151031714707075e+98,
        "costMul": 1.73,
        "value": 3.906250000000001e+81
    },
    {
        "id": "c78",
        "name": "Raibos Electron Flash",
        "desc": "+3.91e+82 Raibos/click",
        "baseCost": 3.622654757206061e+99,
        "costMul": 1.735,
        "value": 3.9062500000000014e+82
    },
    {
        "id": "c79",
        "name": "Raibos Quark Collapse",
        "desc": "+3.91e+83 Raibos/click",
        "baseCost": 5.433982135809092e+100,
        "costMul": 1.7400000000000002,
        "value": 3.906250000000001e+83
    },
    {
        "id": "c80",
        "name": "Raibos Gluon Sweep",
        "desc": "+3.91e+84 Raibos/click",
        "baseCost": 8.150973203713637e+101,
        "costMul": 1.745,
        "value": 3.9062500000000016e+84
    },
    {
        "id": "c81",
        "name": "Raibos Boson Cleave",
        "desc": "+1.95e+86 Raibos/click",
        "baseCost": 1.2226459805570457e+104,
        "costMul": 1.75,
        "value": 1.9531250000000008e+86
    },
    {
        "id": "c82",
        "name": "Raibos Fermion Acceleration",
        "desc": "+1.95e+87 Raibos/click",
        "baseCost": 1.8339689708355685e+105,
        "costMul": 1.7550000000000001,
        "value": 1.9531250000000008e+87
    },
    {
        "id": "c83",
        "name": "Raibos Lepton Wrath",
        "desc": "+1.95e+88 Raibos/click",
        "baseCost": 2.750953456253353e+106,
        "costMul": 1.7600000000000002,
        "value": 1.953125000000001e+88
    },
    {
        "id": "c84",
        "name": "Raibos Muon Barrage",
        "desc": "+1.95e+89 Raibos/click",
        "baseCost": 4.1264301843800296e+107,
        "costMul": 1.7650000000000001,
        "value": 1.953125000000001e+89
    },
    {
        "id": "c85",
        "name": "Raibos Tau Bind",
        "desc": "+1.95e+90 Raibos/click",
        "baseCost": 6.189645276570044e+108,
        "costMul": 1.77,
        "value": 1.953125000000001e+90
    },
    {
        "id": "c86",
        "name": "Raibos Neutrino Shadow",
        "desc": "+1.95e+91 Raibos/click",
        "baseCost": 9.284467914855067e+109,
        "costMul": 1.7750000000000001,
        "value": 1.953125000000001e+91
    },
    {
        "id": "c87",
        "name": "Raibos Graviton Dawn",
        "desc": "+1.95e+92 Raibos/click",
        "baseCost": 1.39267018722826e+111,
        "costMul": 1.78,
        "value": 1.9531250000000012e+92
    },
    {
        "id": "c88",
        "name": "Raibos Tachyon Eclipse",
        "desc": "+1.95e+93 Raibos/click",
        "baseCost": 2.08900528084239e+112,
        "costMul": 1.7850000000000001,
        "value": 1.9531250000000013e+93
    },
    {
        "id": "c89",
        "name": "Raibos Axion Dream",
        "desc": "+1.95e+94 Raibos/click",
        "baseCost": 3.133507921263585e+113,
        "costMul": 1.79,
        "value": 1.9531250000000013e+94
    },
    {
        "id": "c90",
        "name": "Raibos Dilaton Prophecy",
        "desc": "+1.95e+95 Raibos/click",
        "baseCost": 4.7002618818953773e+114,
        "costMul": 1.7950000000000002,
        "value": 1.9531250000000012e+95
    },
    {
        "id": "c91",
        "name": "Raibos Inflaton Cataclysm",
        "desc": "+9.77e+96 Raibos/click",
        "baseCost": 7.050392822843066e+116,
        "costMul": 1.8,
        "value": 9.765625000000006e+96
    },
    {
        "id": "c92",
        "name": "Raibos Preon Ruin",
        "desc": "+9.77e+97 Raibos/click",
        "baseCost": 1.05755892342646e+118,
        "costMul": 1.8050000000000002,
        "value": 9.765625000000006e+97
    },
    {
        "id": "c93",
        "name": "Raibos Skyrmion Obliteration",
        "desc": "+9.77e+98 Raibos/click",
        "baseCost": 1.5863383851396899e+119,
        "costMul": 1.81,
        "value": 9.765625000000006e+98
    },
    {
        "id": "c94",
        "name": "Raibos Pomeron Purge",
        "desc": "+9.77e+99 Raibos/click",
        "baseCost": 2.3795075777095348e+120,
        "costMul": 1.8150000000000002,
        "value": 9.765625000000006e+99
    },
    {
        "id": "c95",
        "name": "Raibos Odderon Resurrection",
        "desc": "+9.77e+100 Raibos/click",
        "baseCost": 3.5692613665643023e+121,
        "costMul": 1.82,
        "value": 9.765625000000006e+100
    },
    {
        "id": "c96",
        "name": "Raibos Sphaleron Mutation",
        "desc": "+9.77e+101 Raibos/click",
        "baseCost": 5.3538920498464536e+122,
        "costMul": 1.8250000000000002,
        "value": 9.765625000000007e+101
    },
    {
        "id": "c97",
        "name": "Raibos Instanton Transmutation",
        "desc": "+9.77e+102 Raibos/click",
        "baseCost": 8.030838074769681e+123,
        "costMul": 1.83,
        "value": 9.765625000000007e+102
    },
    {
        "id": "c98",
        "name": "Raibos Magnetic Monopole Fusion",
        "desc": "+9.77e+103 Raibos/click",
        "baseCost": 1.2046257112154521e+125,
        "costMul": 1.835,
        "value": 9.765625000000006e+103
    },
    {
        "id": "c99",
        "name": "Raibos String Radiation",
        "desc": "+9.77e+104 Raibos/click",
        "baseCost": 1.8069385668231783e+126,
        "costMul": 1.84,
        "value": 9.765625000000005e+104
    },
    {
        "id": "c100",
        "name": "Raibos Brane Reflection",
        "desc": "+9.77e+105 Raibos/click",
        "baseCost": 2.7104078502347675e+127,
        "costMul": 1.8450000000000002,
        "value": 9.765625000000006e+105
    }
];

var idleUpgrades = [
    {
        "id": "i1",
        "name": "Raibos Dust Collector",
        "desc": "+1 Raibos/sec",
        "baseCost": 15,
        "costMul": 1.2,
        "value": 1
    },
    {
        "id": "i2",
        "name": "Raibos Scrap Turbine",
        "desc": "+12 Raibos/sec",
        "baseCost": 225,
        "costMul": 1.208,
        "value": 12
    },
    {
        "id": "i3",
        "name": "Raibos Manual Core",
        "desc": "+144 Raibos/sec",
        "baseCost": 3375,
        "costMul": 1.216,
        "value": 144
    },
    {
        "id": "i4",
        "name": "Raibos Pedal Trap",
        "desc": "+1728 Raibos/sec",
        "baseCost": 50625,
        "costMul": 1.224,
        "value": 1728
    },
    {
        "id": "i5",
        "name": "Raibos Water Catch",
        "desc": "+20736 Raibos/sec",
        "baseCost": 759375,
        "costMul": 1.232,
        "value": 20736
    },
    {
        "id": "i6",
        "name": "Raibos Wind Matrix",
        "desc": "+248832 Raibos/sec",
        "baseCost": 11390625,
        "costMul": 1.24,
        "value": 248832
    },
    {
        "id": "i7",
        "name": "Raibos Solar Structure",
        "desc": "+2.99e+6 Raibos/sec",
        "baseCost": 170859375,
        "costMul": 1.248,
        "value": 2985984
    },
    {
        "id": "i8",
        "name": "Raibos Bio-Gas Catcher",
        "desc": "+3.58e+7 Raibos/sec",
        "baseCost": 2562890625,
        "costMul": 1.256,
        "value": 35831808
    },
    {
        "id": "i9",
        "name": "Raibos Geothermal Generator",
        "desc": "+4.30e+8 Raibos/sec",
        "baseCost": 38443359375,
        "costMul": 1.264,
        "value": 429981696
    },
    {
        "id": "i10",
        "name": "Raibos Coal Node",
        "desc": "+5.16e+9 Raibos/sec",
        "baseCost": 576650390625,
        "costMul": 1.272,
        "value": 5159780352
    },
    {
        "id": "i11",
        "name": "Raibos Oil Network",
        "desc": "+4.95e+11 Raibos/sec",
        "baseCost": 103797070312500,
        "costMul": 1.28,
        "value": 495338913792
    },
    {
        "id": "i12",
        "name": "Raibos Nuclear Platform",
        "desc": "+5.94e+12 Raibos/sec",
        "baseCost": 1556956054687500,
        "costMul": 1.288,
        "value": 5944066965504
    },
    {
        "id": "i13",
        "name": "Raibos Thorium Ecosphere",
        "desc": "+7.13e+13 Raibos/sec",
        "baseCost": 23354340820312500,
        "costMul": 1.296,
        "value": 71328803586048
    },
    {
        "id": "i14",
        "name": "Raibos Fusion Mesosphere",
        "desc": "+8.56e+14 Raibos/sec",
        "baseCost": 350315112304687500,
        "costMul": 1.304,
        "value": 855945643032576
    },
    {
        "id": "i15",
        "name": "Raibos Plasma Interstellar Medium",
        "desc": "+1.03e+16 Raibos/sec",
        "baseCost": 5254726684570313000,
        "costMul": 1.312,
        "value": 10271347716390912
    },
    {
        "id": "i16",
        "name": "Raibos Anti-Matter Supercluster",
        "desc": "+1.23e+17 Raibos/sec",
        "baseCost": 78820900268554680000,
        "costMul": 1.3199999999999998,
        "value": 123256172596690940
    },
    {
        "id": "i17",
        "name": "Raibos Dark Matter Planetary System",
        "desc": "+1.48e+18 Raibos/sec",
        "baseCost": 1.1823135040283203e+21,
        "costMul": 1.3279999999999998,
        "value": 1479074071160291300
    },
    {
        "id": "i18",
        "name": "Raibos Void Kuiper Belt",
        "desc": "+1.77e+19 Raibos/sec",
        "baseCost": 1.7734702560424806e+22,
        "costMul": 1.3359999999999999,
        "value": 17748888853923496000
    },
    {
        "id": "i19",
        "name": "Raibos Star Circumstellar Disk",
        "desc": "+2.13e+20 Raibos/sec",
        "baseCost": 2.6602053840637207e+23,
        "costMul": 1.3439999999999999,
        "value": 212986666247081950000
    },
    {
        "id": "i20",
        "name": "Raibos Dyson Circumsextuple Disk",
        "desc": "+2.56e+21 Raibos/sec",
        "baseCost": 3.990308076095581e+24,
        "costMul": 1.3519999999999999,
        "value": 2.5558399949649834e+21
    },
    {
        "id": "i21",
        "name": "Raibos Nebula Collector",
        "desc": "+2.45e+23 Raibos/sec",
        "baseCost": 7.182554536972046e+26,
        "costMul": 1.3599999999999999,
        "value": 2.453606395166384e+23
    },
    {
        "id": "i22",
        "name": "Raibos Supernova Turbine",
        "desc": "+2.94e+24 Raibos/sec",
        "baseCost": 1.077383180545807e+28,
        "costMul": 1.3679999999999999,
        "value": 2.944327674199661e+24
    },
    {
        "id": "i23",
        "name": "Raibos Pulsar Core",
        "desc": "+3.53e+25 Raibos/sec",
        "baseCost": 1.6160747708187105e+29,
        "costMul": 1.376,
        "value": 3.533193209039593e+25
    },
    {
        "id": "i24",
        "name": "Raibos Quasar Trap",
        "desc": "+4.24e+26 Raibos/sec",
        "baseCost": 2.4241121562280657e+30,
        "costMul": 1.384,
        "value": 4.239831850847512e+26
    },
    {
        "id": "i25",
        "name": "Raibos Black Hole Catch",
        "desc": "+5.09e+27 Raibos/sec",
        "baseCost": 3.6361682343420984e+31,
        "costMul": 1.392,
        "value": 5.087798221017014e+27
    },
    {
        "id": "i26",
        "name": "Raibos Event Horizon Matrix",
        "desc": "+6.11e+28 Raibos/sec",
        "baseCost": 5.4542523515131476e+32,
        "costMul": 1.4,
        "value": 6.105357865220417e+28
    },
    {
        "id": "i27",
        "name": "Raibos Singularity Structure",
        "desc": "+7.33e+29 Raibos/sec",
        "baseCost": 8.181378527269721e+33,
        "costMul": 1.408,
        "value": 7.3264294382645e+29
    },
    {
        "id": "i28",
        "name": "Raibos Wormhole Catcher",
        "desc": "+8.79e+30 Raibos/sec",
        "baseCost": 1.2272067790904583e+35,
        "costMul": 1.416,
        "value": 8.7917153259174e+30
    },
    {
        "id": "i29",
        "name": "Raibos Warp Drive Generator",
        "desc": "+1.06e+32 Raibos/sec",
        "baseCost": 1.8408101686356875e+36,
        "costMul": 1.424,
        "value": 1.055005839110088e+32
    },
    {
        "id": "i30",
        "name": "Raibos Fold Space Node",
        "desc": "+1.27e+33 Raibos/sec",
        "baseCost": 2.7612152529535312e+37,
        "costMul": 1.432,
        "value": 1.2660070069321056e+33
    },
    {
        "id": "i31",
        "name": "Raibos Teleporter Network",
        "desc": "+1.22e+35 Raibos/sec",
        "baseCost": 4.970187455316357e+39,
        "costMul": 1.44,
        "value": 1.2153667266548214e+35
    },
    {
        "id": "i32",
        "name": "Raibos Replicator Platform",
        "desc": "+1.46e+36 Raibos/sec",
        "baseCost": 7.455281182974535e+40,
        "costMul": 1.448,
        "value": 1.4584400719857857e+36
    },
    {
        "id": "i33",
        "name": "Raibos Nano Ecosphere",
        "desc": "+1.75e+37 Raibos/sec",
        "baseCost": 1.1182921774461803e+42,
        "costMul": 1.456,
        "value": 1.7501280863829428e+37
    },
    {
        "id": "i34",
        "name": "Raibos Mega Mesosphere",
        "desc": "+2.10e+38 Raibos/sec",
        "baseCost": 1.6774382661692705e+43,
        "costMul": 1.464,
        "value": 2.1001537036595314e+38
    },
    {
        "id": "i35",
        "name": "Raibos Orbital Interstellar Medium",
        "desc": "+2.52e+39 Raibos/sec",
        "baseCost": 2.5161573992539056e+44,
        "costMul": 1.472,
        "value": 2.5201844443914375e+39
    },
    {
        "id": "i36",
        "name": "Raibos Space Supercluster",
        "desc": "+3.02e+40 Raibos/sec",
        "baseCost": 3.774236098880858e+45,
        "costMul": 1.48,
        "value": 3.024221333269725e+40
    },
    {
        "id": "i37",
        "name": "Raibos Moon Planetary System",
        "desc": "+3.63e+41 Raibos/sec",
        "baseCost": 5.661354148321287e+46,
        "costMul": 1.488,
        "value": 3.62906559992367e+41
    },
    {
        "id": "i38",
        "name": "Raibos Asteroid Kuiper Belt",
        "desc": "+4.35e+42 Raibos/sec",
        "baseCost": 8.49203122248193e+47,
        "costMul": 1.496,
        "value": 4.354878719908404e+42
    },
    {
        "id": "i39",
        "name": "Raibos Comet Circumstellar Disk",
        "desc": "+5.23e+43 Raibos/sec",
        "baseCost": 1.2738046833722895e+49,
        "costMul": 1.504,
        "value": 5.225854463890085e+43
    },
    {
        "id": "i40",
        "name": "Raibos Planetary Circumsextuple Disk",
        "desc": "+6.27e+44 Raibos/sec",
        "baseCost": 1.9107070250584343e+50,
        "costMul": 1.512,
        "value": 6.271025356668102e+44
    },
    {
        "id": "i41",
        "name": "Raibos Core Collector",
        "desc": "+6.02e+46 Raibos/sec",
        "baseCost": 3.439272645105182e+52,
        "costMul": 1.52,
        "value": 6.020184342401378e+46
    },
    {
        "id": "i42",
        "name": "Raibos Magma Turbine",
        "desc": "+7.22e+47 Raibos/sec",
        "baseCost": 5.158908967657773e+53,
        "costMul": 1.528,
        "value": 7.224221210881654e+47
    },
    {
        "id": "i43",
        "name": "Raibos Tectonic Core",
        "desc": "+8.67e+48 Raibos/sec",
        "baseCost": 7.73836345148666e+54,
        "costMul": 1.536,
        "value": 8.669065453057985e+48
    },
    {
        "id": "i44",
        "name": "Raibos Weather Trap",
        "desc": "+1.04e+50 Raibos/sec",
        "baseCost": 1.160754517722999e+56,
        "costMul": 1.544,
        "value": 1.0402878543669582e+50
    },
    {
        "id": "i45",
        "name": "Raibos Atmosphere Catch",
        "desc": "+1.25e+51 Raibos/sec",
        "baseCost": 1.7411317765844987e+57,
        "costMul": 1.552,
        "value": 1.2483454252403499e+51
    },
    {
        "id": "i46",
        "name": "Raibos Terraformer Matrix",
        "desc": "+1.50e+52 Raibos/sec",
        "baseCost": 2.611697664876748e+58,
        "costMul": 1.56,
        "value": 1.49801451028842e+52
    },
    {
        "id": "i47",
        "name": "Raibos Bio-Sphere Structure",
        "desc": "+1.80e+53 Raibos/sec",
        "baseCost": 3.917546497315122e+59,
        "costMul": 1.568,
        "value": 1.797617412346104e+53
    },
    {
        "id": "i48",
        "name": "Raibos Gene Catcher",
        "desc": "+2.16e+54 Raibos/sec",
        "baseCost": 5.8763197459726824e+60,
        "costMul": 1.576,
        "value": 2.1571408948153246e+54
    },
    {
        "id": "i49",
        "name": "Raibos Cloning Generator",
        "desc": "+2.59e+55 Raibos/sec",
        "baseCost": 8.814479618959024e+61,
        "costMul": 1.584,
        "value": 2.5885690737783894e+55
    },
    {
        "id": "i50",
        "name": "Raibos Brain Bank Node",
        "desc": "+3.11e+56 Raibos/sec",
        "baseCost": 1.3221719428438536e+63,
        "costMul": 1.592,
        "value": 3.106282888534067e+56
    },
    {
        "id": "i51",
        "name": "Raibos Hive Mind Network",
        "desc": "+2.98e+58 Raibos/sec",
        "baseCost": 2.3799094971189365e+65,
        "costMul": 1.6,
        "value": 2.9820315729927044e+58
    },
    {
        "id": "i52",
        "name": "Raibos Neural Network Platform",
        "desc": "+3.58e+59 Raibos/sec",
        "baseCost": 3.569864245678405e+66,
        "costMul": 1.608,
        "value": 3.5784378875912453e+59
    },
    {
        "id": "i53",
        "name": "Raibos AI Ecosphere",
        "desc": "+4.29e+60 Raibos/sec",
        "baseCost": 5.354796368517607e+67,
        "costMul": 1.616,
        "value": 4.294125465109494e+60
    },
    {
        "id": "i54",
        "name": "Raibos Quantum Computer Mesosphere",
        "desc": "+5.15e+61 Raibos/sec",
        "baseCost": 8.032194552776411e+68,
        "costMul": 1.6239999999999999,
        "value": 5.152950558131393e+61
    },
    {
        "id": "i55",
        "name": "Raibos Matrioshka Interstellar Medium",
        "desc": "+6.18e+62 Raibos/sec",
        "baseCost": 1.2048291829164617e+70,
        "costMul": 1.632,
        "value": 6.1835406697576715e+62
    },
    {
        "id": "i56",
        "name": "Raibos Stellar Supercluster",
        "desc": "+7.42e+63 Raibos/sec",
        "baseCost": 1.8072437743746926e+71,
        "costMul": 1.64,
        "value": 7.420248803709206e+63
    },
    {
        "id": "i57",
        "name": "Raibos Galactic Planetary System",
        "desc": "+8.90e+64 Raibos/sec",
        "baseCost": 2.710865661562039e+72,
        "costMul": 1.648,
        "value": 8.904298564451047e+64
    },
    {
        "id": "i58",
        "name": "Raibos Universal Kuiper Belt",
        "desc": "+1.07e+66 Raibos/sec",
        "baseCost": 4.066298492343058e+73,
        "costMul": 1.656,
        "value": 1.0685158277341257e+66
    },
    {
        "id": "i59",
        "name": "Raibos Multiverse Circumstellar Disk",
        "desc": "+1.28e+67 Raibos/sec",
        "baseCost": 6.099447738514588e+74,
        "costMul": 1.664,
        "value": 1.2822189932809509e+67
    },
    {
        "id": "i60",
        "name": "Raibos Dimensional Circumsextuple Disk",
        "desc": "+1.54e+68 Raibos/sec",
        "baseCost": 9.149171607771881e+75,
        "costMul": 1.672,
        "value": 1.538662791937141e+68
    },
    {
        "id": "i61",
        "name": "Raibos Time Collector",
        "desc": "+1.48e+70 Raibos/sec",
        "baseCost": 1.6468508893989385e+78,
        "costMul": 1.68,
        "value": 1.4771162802596554e+70
    },
    {
        "id": "i62",
        "name": "Raibos Reality Turbine",
        "desc": "+1.77e+71 Raibos/sec",
        "baseCost": 2.4702763340984077e+79,
        "costMul": 1.688,
        "value": 1.7725395363115866e+71
    },
    {
        "id": "i63",
        "name": "Raibos Chrono Core",
        "desc": "+2.13e+72 Raibos/sec",
        "baseCost": 3.7054145011476115e+80,
        "costMul": 1.696,
        "value": 2.127047443573904e+72
    },
    {
        "id": "i64",
        "name": "Raibos Space-Time Trap",
        "desc": "+2.55e+73 Raibos/sec",
        "baseCost": 5.558121751721417e+81,
        "costMul": 1.704,
        "value": 2.5524569322886847e+73
    },
    {
        "id": "i65",
        "name": "Raibos Entropy Catch",
        "desc": "+3.06e+74 Raibos/sec",
        "baseCost": 8.337182627582126e+82,
        "costMul": 1.712,
        "value": 3.062948318746422e+74
    },
    {
        "id": "i66",
        "name": "Raibos Absolute Zero Matrix",
        "desc": "+3.68e+75 Raibos/sec",
        "baseCost": 1.250577394137319e+84,
        "costMul": 1.72,
        "value": 3.675537982495707e+75
    },
    {
        "id": "i67",
        "name": "Raibos Infinity Structure",
        "desc": "+4.41e+76 Raibos/sec",
        "baseCost": 1.8758660912059786e+85,
        "costMul": 1.728,
        "value": 4.410645578994848e+76
    },
    {
        "id": "i68",
        "name": "Raibos Astral Catcher",
        "desc": "+5.29e+77 Raibos/sec",
        "baseCost": 2.813799136808968e+86,
        "costMul": 1.736,
        "value": 5.292774694793817e+77
    },
    {
        "id": "i69",
        "name": "Raibos Celestial Generator",
        "desc": "+6.35e+78 Raibos/sec",
        "baseCost": 4.220698705213453e+87,
        "costMul": 1.744,
        "value": 6.3513296337525804e+78
    },
    {
        "id": "i70",
        "name": "Raibos Divine Node",
        "desc": "+7.62e+79 Raibos/sec",
        "baseCost": 6.331048057820179e+88,
        "costMul": 1.752,
        "value": 7.621595560503096e+79
    },
    {
        "id": "i71",
        "name": "Raibos God Network",
        "desc": "+7.32e+81 Raibos/sec",
        "baseCost": 1.1395886504076322e+91,
        "costMul": 1.76,
        "value": 7.316731738082972e+81
    },
    {
        "id": "i72",
        "name": "Raibos Omni Platform",
        "desc": "+8.78e+82 Raibos/sec",
        "baseCost": 1.7093829756114484e+92,
        "costMul": 1.768,
        "value": 8.780078085699567e+82
    },
    {
        "id": "i73",
        "name": "Raibos Meta Ecosphere",
        "desc": "+1.05e+84 Raibos/sec",
        "baseCost": 2.5640744634171727e+93,
        "costMul": 1.776,
        "value": 1.053609370283948e+84
    },
    {
        "id": "i74",
        "name": "Raibos Hyper Mesosphere",
        "desc": "+1.26e+85 Raibos/sec",
        "baseCost": 3.846111695125759e+94,
        "costMul": 1.7839999999999998,
        "value": 1.2643312443407377e+85
    },
    {
        "id": "i75",
        "name": "Raibos Ultra Interstellar Medium",
        "desc": "+1.52e+86 Raibos/sec",
        "baseCost": 5.769167542688639e+95,
        "costMul": 1.7919999999999998,
        "value": 1.5171974932088852e+86
    },
    {
        "id": "i76",
        "name": "Raibos Macro Supercluster",
        "desc": "+1.82e+87 Raibos/sec",
        "baseCost": 8.65375131403296e+96,
        "costMul": 1.7999999999999998,
        "value": 1.8206369918506623e+87
    },
    {
        "id": "i77",
        "name": "Raibos Micro Planetary System",
        "desc": "+2.18e+88 Raibos/sec",
        "baseCost": 1.2980626971049439e+98,
        "costMul": 1.8079999999999998,
        "value": 2.1847643902207948e+88
    },
    {
        "id": "i78",
        "name": "Raibos Subatomic Kuiper Belt",
        "desc": "+2.62e+89 Raibos/sec",
        "baseCost": 1.947094045657416e+99,
        "costMul": 1.8159999999999998,
        "value": 2.621717268264954e+89
    },
    {
        "id": "i79",
        "name": "Raibos String Circumstellar Disk",
        "desc": "+3.15e+90 Raibos/sec",
        "baseCost": 2.920641068486124e+100,
        "costMul": 1.8239999999999998,
        "value": 3.1460607219179445e+90
    },
    {
        "id": "i80",
        "name": "Raibos Brane Circumsextuple Disk",
        "desc": "+3.78e+91 Raibos/sec",
        "baseCost": 4.380961602729186e+101,
        "costMul": 1.8319999999999999,
        "value": 3.775272866301533e+91
    },
    {
        "id": "i81",
        "name": "Raibos Bulk Collector",
        "desc": "+3.62e+93 Raibos/sec",
        "baseCost": 7.885730884912534e+103,
        "costMul": 1.8399999999999999,
        "value": 3.624261951649472e+93
    },
    {
        "id": "i82",
        "name": "Raibos Tesseract Turbine",
        "desc": "+4.35e+94 Raibos/sec",
        "baseCost": 1.18285963273688e+105,
        "costMul": 1.8479999999999999,
        "value": 4.349114341979367e+94
    },
    {
        "id": "i83",
        "name": "Raibos Hypercube Core",
        "desc": "+5.22e+95 Raibos/sec",
        "baseCost": 1.7742894491053199e+106,
        "costMul": 1.8559999999999999,
        "value": 5.21893721037524e+95
    },
    {
        "id": "i84",
        "name": "Raibos Hypersphere Trap",
        "desc": "+6.26e+96 Raibos/sec",
        "baseCost": 2.6614341736579798e+107,
        "costMul": 1.8639999999999999,
        "value": 6.262724652450288e+96
    },
    {
        "id": "i85",
        "name": "Raibos Hyperspace Catch",
        "desc": "+7.52e+97 Raibos/sec",
        "baseCost": 3.99215126048697e+108,
        "costMul": 1.8719999999999999,
        "value": 7.515269582940346e+97
    },
    {
        "id": "i86",
        "name": "Raibos Warp Matrix",
        "desc": "+9.02e+98 Raibos/sec",
        "baseCost": 5.988226890730455e+109,
        "costMul": 1.88,
        "value": 9.018323499528414e+98
    },
    {
        "id": "i87",
        "name": "Raibos Slipstream Structure",
        "desc": "+1.08e+100 Raibos/sec",
        "baseCost": 8.982340336095683e+110,
        "costMul": 1.888,
        "value": 1.0821988199434098e+100
    },
    {
        "id": "i88",
        "name": "Raibos Phase Catcher",
        "desc": "+1.30e+101 Raibos/sec",
        "baseCost": 1.3473510504143525e+112,
        "costMul": 1.896,
        "value": 1.2986385839320918e+101
    },
    {
        "id": "i89",
        "name": "Raibos Flux Generator",
        "desc": "+1.56e+102 Raibos/sec",
        "baseCost": 2.0210265756215286e+113,
        "costMul": 1.904,
        "value": 1.55836630071851e+102
    },
    {
        "id": "i90",
        "name": "Raibos Tachyon Node",
        "desc": "+1.87e+103 Raibos/sec",
        "baseCost": 3.031539863432293e+114,
        "costMul": 1.912,
        "value": 1.8700395608622118e+103
    },
    {
        "id": "i91",
        "name": "Raibos Graviton Network",
        "desc": "+1.80e+105 Raibos/sec",
        "baseCost": 5.456771754178127e+116,
        "costMul": 1.92,
        "value": 1.7952379784277233e+105
    },
    {
        "id": "i92",
        "name": "Raibos Neutrino Platform",
        "desc": "+2.15e+106 Raibos/sec",
        "baseCost": 8.18515763126719e+117,
        "costMul": 1.928,
        "value": 2.1542855741132678e+106
    },
    {
        "id": "i93",
        "name": "Raibos Dark Energy Ecosphere",
        "desc": "+2.59e+107 Raibos/sec",
        "baseCost": 1.2277736446900786e+119,
        "costMul": 1.936,
        "value": 2.5851426889359213e+107
    },
    {
        "id": "i94",
        "name": "Raibos Cosmic Ray Mesosphere",
        "desc": "+3.10e+108 Raibos/sec",
        "baseCost": 1.8416604670351178e+120,
        "costMul": 1.944,
        "value": 3.1021712267231057e+108
    },
    {
        "id": "i95",
        "name": "Raibos Gamma Ray Interstellar Medium",
        "desc": "+3.72e+109 Raibos/sec",
        "baseCost": 2.7624907005526767e+121,
        "costMul": 1.952,
        "value": 3.722605472067727e+109
    },
    {
        "id": "i96",
        "name": "Raibos X-Ray Supercluster",
        "desc": "+4.47e+110 Raibos/sec",
        "baseCost": 4.143736050829015e+122,
        "costMul": 1.96,
        "value": 4.467126566481272e+110
    },
    {
        "id": "i97",
        "name": "Raibos Ultraviolet Planetary System",
        "desc": "+5.36e+111 Raibos/sec",
        "baseCost": 6.215604076243523e+123,
        "costMul": 1.968,
        "value": 5.360551879777526e+111
    },
    {
        "id": "i98",
        "name": "Raibos Infrared Kuiper Belt",
        "desc": "+6.43e+112 Raibos/sec",
        "baseCost": 9.323406114365285e+124,
        "costMul": 1.976,
        "value": 6.432662255733031e+112
    },
    {
        "id": "i99",
        "name": "Raibos Microwave Circumstellar Disk",
        "desc": "+7.72e+113 Raibos/sec",
        "baseCost": 1.3985109171547928e+126,
        "costMul": 1.984,
        "value": 7.719194706879638e+113
    },
    {
        "id": "i100",
        "name": "Raibos Radio Circumsextuple Disk",
        "desc": "+9.26e+114 Raibos/sec",
        "baseCost": 2.097766375732189e+127,
        "costMul": 1.992,
        "value": 9.263033648255566e+114
    }
];

var planetsData = [
    {
        "id": "planet_0",
        "name": "Earth",
        "color": "#00f2ff",
        "regions": [
            {
                "id": "p0_r0",
                "name": "Sector 0-A",
                "buff": "Final Click Power x1.50",
                "type": "click_mult",
                "value": 1.5,
                "cost": 20,
                "d": "M56,78 L67,74 L63,40 L86,25 L94,89 L35,58 L17,46 L117,47 Z"
            },
            {
                "id": "p0_r1",
                "name": "Sector 0-B",
                "buff": "Final Click Power x1.50",
                "type": "click_mult",
                "value": 1.5,
                "cost": 23,
                "d": "M50,61 L46,80 L181,32 L38,71 L175,20 Z"
            },
            {
                "id": "p0_r2",
                "name": "Sector 0-C",
                "buff": "Global Multiplier +20%",
                "type": "mult",
                "value": 0.2,
                "cost": 26,
                "d": "M159,67 L37,60 L70,65 L86,16 L23,83 L135,57 L150,42 L131,34 Z"
            },
            {
                "id": "p0_r3",
                "name": "Sector 0-D",
                "buff": "Rebirth Points +20%",
                "type": "rp",
                "value": 0.2,
                "cost": 30,
                "d": "M177,89 L65,38 L95,62 L60,48 L185,55 Z"
            },
            {
                "id": "p0_r4",
                "name": "Sector 0-E",
                "buff": "Click Power +50%",
                "type": "click",
                "value": 0.5,
                "cost": 34,
                "d": "M104,39 L41,78 L29,15 L155,20 L46,68 Z"
            },
            {
                "id": "p0_r5",
                "name": "Sector 0-F",
                "buff": "Energy Regen +50%",
                "type": "energy",
                "value": 0.5,
                "cost": 40,
                "d": "M56,18 L149,12 L119,66 L178,18 L108,47 L165,53 L142,51 L23,34 L15,33 Z"
            }
        ]
    },
    {
        "id": "planet_1",
        "name": "Mars",
        "color": "#ff4d4d",
        "regions": [
            {
                "id": "p1_r0",
                "name": "Sector 1-A",
                "buff": "Upgrade Cost Reduction -25%",
                "type": "cost",
                "value": 0.25,
                "cost": 46,
                "d": "M32,65 L117,34 L79,62 L84,77 L129,32 L78,26 L145,10 L133,43 L149,49 Z"
            },
            {
                "id": "p1_r1",
                "name": "Sector 1-B",
                "buff": "Click Power +70%",
                "type": "click",
                "value": 0.7,
                "cost": 53,
                "d": "M149,63 L151,75 L38,10 L106,71 L44,80 Z"
            },
            {
                "id": "p1_r2",
                "name": "Sector 1-C",
                "buff": "Final Idle Power x1.60",
                "type": "idle_mult",
                "value": 1.6,
                "cost": 61,
                "d": "M68,83 L90,34 L60,75 L95,28 L48,87 Z"
            },
            {
                "id": "p1_r3",
                "name": "Sector 1-D",
                "buff": "Upgrade Cost Reduction -25%",
                "type": "cost",
                "value": 0.25,
                "cost": 70,
                "d": "M39,77 L75,39 L15,86 L26,33 L109,19 Z"
            },
            {
                "id": "p1_r4",
                "name": "Sector 1-E",
                "buff": "Final Global Multiplier x1.30",
                "type": "mult_total",
                "value": 1.3,
                "cost": 80,
                "d": "M162,83 L187,49 L118,33 L155,66 L57,85 L67,64 L32,58 Z"
            },
            {
                "id": "p1_r5",
                "name": "Sector 1-F",
                "buff": "Global Multiplier +40%",
                "type": "mult",
                "value": 0.4,
                "cost": 93,
                "d": "M30,78 L171,62 L60,46 L168,12 L69,88 L132,49 Z"
            },
            {
                "id": "p1_r6",
                "name": "Sector 1-G",
                "buff": "Final Idle Power x1.60",
                "type": "idle_mult",
                "value": 1.6,
                "cost": 107,
                "d": "M56,41 L71,81 L145,86 L54,13 L154,20 L130,28 L146,74 Z"
            },
            {
                "id": "p1_r7",
                "name": "Sector 1-H",
                "buff": "Idle Power +70%",
                "type": "idle",
                "value": 0.7,
                "cost": 123,
                "d": "M166,78 L142,25 L52,45 L123,62 L73,17 Z"
            },
            {
                "id": "p1_r8",
                "name": "Sector 1-I",
                "buff": "Final Idle Power x1.60",
                "type": "idle_mult",
                "value": 1.6,
                "cost": 141,
                "d": "M165,46 L165,88 L150,31 L132,66 L56,48 Z"
            },
            {
                "id": "p1_r9",
                "name": "Sector 1-J",
                "buff": "Final Click Power x1.60",
                "type": "click_mult",
                "value": 1.6,
                "cost": 162,
                "d": "M102,27 L176,76 L62,13 L150,78 L110,54 Z"
            }
        ]
    },
    {
        "id": "planet_2",
        "name": "Jupiter",
        "color": "#ffcc00",
        "regions": [
            {
                "id": "p2_r0",
                "name": "Sector 2-A",
                "buff": "Final Global Multiplier x1.40",
                "type": "mult_total",
                "value": 1.4,
                "cost": 187,
                "d": "M160,49 L20,16 L132,33 L78,87 L50,47 L19,39 L86,72 Z"
            },
            {
                "id": "p2_r1",
                "name": "Sector 2-B",
                "buff": "Final Global Multiplier x1.40",
                "type": "mult_total",
                "value": 1.4,
                "cost": 215,
                "d": "M91,30 L165,35 L48,64 L143,13 L109,35 L79,31 L10,85 L28,50 L140,84 Z"
            },
            {
                "id": "p2_r2",
                "name": "Sector 2-C",
                "buff": "Final Idle Power x1.70",
                "type": "idle_mult",
                "value": 1.7,
                "cost": 247,
                "d": "M130,19 L99,55 L180,29 L165,47 L124,41 L130,45 L147,34 L11,36 L18,40 Z"
            },
            {
                "id": "p2_r3",
                "name": "Sector 2-D",
                "buff": "Idle Power +90%",
                "type": "idle",
                "value": 0.9,
                "cost": 284,
                "d": "M102,23 L182,69 L108,43 L69,56 L140,88 L120,84 L145,81 L56,85 L98,80 Z"
            },
            {
                "id": "p2_r4",
                "name": "Sector 2-E",
                "buff": "Idle Power +90%",
                "type": "idle",
                "value": 0.9,
                "cost": 327,
                "d": "M177,83 L181,13 L87,71 L52,67 L129,42 L158,47 Z"
            },
            {
                "id": "p2_r5",
                "name": "Sector 2-F",
                "buff": "Energy Regen +90%",
                "type": "energy",
                "value": 0.9,
                "cost": 376,
                "d": "M98,57 L104,72 L59,27 L157,39 L99,62 L36,82 L42,26 L83,30 Z"
            },
            {
                "id": "p2_r6",
                "name": "Sector 2-G",
                "buff": "Upgrade Cost Reduction -45%",
                "type": "cost",
                "value": 0.45,
                "cost": 432,
                "d": "M140,21 L187,73 L19,63 L99,82 L126,53 Z"
            },
            {
                "id": "p2_r7",
                "name": "Sector 2-H",
                "buff": "Idle Power +90%",
                "type": "idle",
                "value": 0.9,
                "cost": 497,
                "d": "M110,12 L90,32 L127,30 L112,87 L117,86 L51,20 L116,55 L61,47 L27,63 Z"
            },
            {
                "id": "p2_r8",
                "name": "Sector 2-I",
                "buff": "Rebirth Points +60%",
                "type": "rp",
                "value": 0.6000000000000001,
                "cost": 572,
                "d": "M126,45 L123,86 L75,23 L16,39 L88,40 Z"
            },
            {
                "id": "p2_r9",
                "name": "Sector 2-J",
                "buff": "Energy Regen +90%",
                "type": "energy",
                "value": 0.9,
                "cost": 658,
                "d": "M24,89 L72,64 L73,17 L159,74 L127,34 Z"
            }
        ]
    },
    {
        "id": "planet_3",
        "name": "Saturn",
        "color": "#ffaa00",
        "regions": [
            {
                "id": "p3_r0",
                "name": "Sector 3-A",
                "buff": "Click Power +110%",
                "type": "click",
                "value": 1.1,
                "cost": 757,
                "d": "M134,80 L106,43 L42,35 L178,13 L69,52 L44,55 Z"
            },
            {
                "id": "p3_r1",
                "name": "Sector 3-B",
                "buff": "Final Global Multiplier x1.50",
                "type": "mult_total",
                "value": 1.5,
                "cost": 870,
                "d": "M24,80 L153,42 L148,77 L92,72 L97,53 L24,87 L40,55 Z"
            },
            {
                "id": "p3_r2",
                "name": "Sector 3-C",
                "buff": "Click Power +110%",
                "type": "click",
                "value": 1.1,
                "cost": 1001,
                "d": "M150,20 L78,37 L20,56 L128,39 L138,18 Z"
            },
            {
                "id": "p3_r3",
                "name": "Sector 3-D",
                "buff": "Energy Regen +110%",
                "type": "energy",
                "value": 1.1,
                "cost": 1151,
                "d": "M88,17 L69,13 L38,22 L113,89 L175,12 L168,27 L99,59 L97,12 L178,37 Z"
            },
            {
                "id": "p3_r4",
                "name": "Sector 3-E",
                "buff": "Global Multiplier +80%",
                "type": "mult",
                "value": 0.8,
                "cost": 1324,
                "d": "M67,30 L110,48 L26,45 L175,15 L28,52 L51,87 L72,68 L136,65 Z"
            },
            {
                "id": "p3_r5",
                "name": "Sector 3-F",
                "buff": "Final Idle Power x1.80",
                "type": "idle_mult",
                "value": 1.8,
                "cost": 1522,
                "d": "M112,50 L158,44 L157,15 L141,46 L88,22 L43,27 L162,13 L10,77 Z"
            }
        ]
    },
    {
        "id": "planet_4",
        "name": "Uranus",
        "color": "#00ffff",
        "regions": [
            {
                "id": "p4_r0",
                "name": "Sector 4-A",
                "buff": "Click Power +130%",
                "type": "click",
                "value": 1.3,
                "cost": 1751,
                "d": "M112,27 L100,21 L98,85 L136,66 L125,58 Z"
            },
            {
                "id": "p4_r1",
                "name": "Sector 4-B",
                "buff": "Energy Regen +130%",
                "type": "energy",
                "value": 1.3,
                "cost": 2013,
                "d": "M147,18 L27,61 L74,28 L87,74 L24,29 L40,57 L182,31 L121,74 L138,30 Z"
            },
            {
                "id": "p4_r2",
                "name": "Sector 4-C",
                "buff": "Click Power +130%",
                "type": "click",
                "value": 1.3,
                "cost": 2316,
                "d": "M72,42 L105,18 L165,35 L118,30 L64,77 L42,52 L39,40 Z"
            },
            {
                "id": "p4_r3",
                "name": "Sector 4-D",
                "buff": "Click Power +130%",
                "type": "click",
                "value": 1.3,
                "cost": 2663,
                "d": "M71,77 L69,38 L96,19 L105,75 L114,27 L139,85 Z"
            },
            {
                "id": "p4_r4",
                "name": "Sector 4-E",
                "buff": "Idle Power +130%",
                "type": "idle",
                "value": 1.3,
                "cost": 3063,
                "d": "M50,44 L158,63 L59,76 L26,44 L173,70 L30,16 L115,47 L18,64 Z"
            },
            {
                "id": "p4_r5",
                "name": "Sector 4-F",
                "buff": "Rebirth Points +100%",
                "type": "rp",
                "value": 1,
                "cost": 3522,
                "d": "M72,13 L167,58 L98,38 L149,53 L38,76 L92,44 L53,28 Z"
            },
            {
                "id": "p4_r6",
                "name": "Sector 4-G",
                "buff": "Final Idle Power x1.90",
                "type": "idle_mult",
                "value": 1.9,
                "cost": 4050,
                "d": "M153,61 L26,72 L160,12 L24,42 L62,47 L88,60 L71,22 L94,61 Z"
            },
            {
                "id": "p4_r7",
                "name": "Sector 4-H",
                "buff": "Final Global Multiplier x1.60",
                "type": "mult_total",
                "value": 1.6,
                "cost": 4658,
                "d": "M65,33 L71,53 L109,64 L170,37 L76,60 Z"
            },
            {
                "id": "p4_r8",
                "name": "Sector 4-I",
                "buff": "Global Multiplier +100%",
                "type": "mult",
                "value": 1,
                "cost": 5357,
                "d": "M156,59 L112,10 L16,17 L150,67 L167,49 Z"
            },
            {
                "id": "p4_r9",
                "name": "Sector 4-J",
                "buff": "Energy Regen +130%",
                "type": "energy",
                "value": 1.3,
                "cost": 6160,
                "d": "M181,18 L63,84 L116,83 L84,38 L73,64 L181,65 L173,62 L15,67 L146,81 Z"
            }
        ]
    },
    {
        "id": "planet_5",
        "name": "Neptune",
        "color": "#0000ff",
        "regions": [
            {
                "id": "p5_r0",
                "name": "Sector 5-A",
                "buff": "Final Click Power x2.00",
                "type": "click_mult",
                "value": 2,
                "cost": 7084,
                "d": "M157,53 L64,67 L31,16 L170,27 L93,64 L181,20 L71,24 L139,33 Z"
            },
            {
                "id": "p5_r1",
                "name": "Sector 5-B",
                "buff": "Energy Regen +150%",
                "type": "energy",
                "value": 1.5,
                "cost": 8147,
                "d": "M128,18 L163,51 L174,53 L82,54 L164,18 L119,55 L41,30 L165,12 L36,30 Z"
            },
            {
                "id": "p5_r2",
                "name": "Sector 5-C",
                "buff": "Upgrade Cost Reduction -105%",
                "type": "cost",
                "value": 1.05,
                "cost": 9369,
                "d": "M145,74 L155,41 L143,33 L159,38 L29,60 Z"
            },
            {
                "id": "p5_r3",
                "name": "Sector 5-D",
                "buff": "Energy Regen +150%",
                "type": "energy",
                "value": 1.5,
                "cost": 10775,
                "d": "M19,29 L160,47 L166,16 L164,35 L55,64 Z"
            },
            {
                "id": "p5_r4",
                "name": "Sector 5-E",
                "buff": "Global Multiplier +120%",
                "type": "mult",
                "value": 1.2,
                "cost": 12391,
                "d": "M37,13 L14,48 L185,84 L147,74 L23,74 Z"
            }
        ]
    },
    {
        "id": "planet_6",
        "name": "Pluto",
        "color": "#cccccc",
        "regions": [
            {
                "id": "p6_r0",
                "name": "Sector 6-A",
                "buff": "Final Idle Power x2.10",
                "type": "idle_mult",
                "value": 2.1,
                "cost": 14250,
                "d": "M70,41 L165,85 L61,20 L31,60 L187,17 L179,73 L93,81 Z"
            },
            {
                "id": "p6_r1",
                "name": "Sector 6-B",
                "buff": "Rebirth Points +140%",
                "type": "rp",
                "value": 1.4000000000000001,
                "cost": 16388,
                "d": "M93,61 L82,17 L62,49 L157,47 L63,38 L83,18 L20,80 Z"
            },
            {
                "id": "p6_r2",
                "name": "Sector 6-C",
                "buff": "Rebirth Points +140%",
                "type": "rp",
                "value": 1.4000000000000001,
                "cost": 18846,
                "d": "M66,74 L48,85 L158,73 L158,70 L89,69 Z"
            },
            {
                "id": "p6_r3",
                "name": "Sector 6-D",
                "buff": "Click Power +170%",
                "type": "click",
                "value": 1.7000000000000002,
                "cost": 21673,
                "d": "M107,33 L93,70 L101,78 L94,16 L14,41 L168,89 L123,87 Z"
            },
            {
                "id": "p6_r4",
                "name": "Sector 6-E",
                "buff": "Final Idle Power x2.10",
                "type": "idle_mult",
                "value": 2.1,
                "cost": 24924,
                "d": "M86,44 L159,17 L65,49 L137,43 L45,11 L141,29 L21,89 L122,33 Z"
            },
            {
                "id": "p6_r5",
                "name": "Sector 6-F",
                "buff": "Final Click Power x2.10",
                "type": "click_mult",
                "value": 2.1,
                "cost": 28662,
                "d": "M55,29 L31,82 L67,73 L111,55 L108,73 L151,46 L183,86 L83,13 L122,73 Z"
            },
            {
                "id": "p6_r6",
                "name": "Sector 6-G",
                "buff": "Final Global Multiplier x1.80",
                "type": "mult_total",
                "value": 1.8,
                "cost": 32962,
                "d": "M124,76 L115,80 L109,35 L55,56 L125,13 L91,86 Z"
            },
            {
                "id": "p6_r7",
                "name": "Sector 6-H",
                "buff": "Final Global Multiplier x1.80",
                "type": "mult_total",
                "value": 1.8,
                "cost": 37906,
                "d": "M131,46 L157,58 L187,52 L148,31 L156,36 Z"
            },
            {
                "id": "p6_r8",
                "name": "Sector 6-I",
                "buff": "Final Click Power x2.10",
                "type": "click_mult",
                "value": 2.1,
                "cost": 43592,
                "d": "M37,33 L44,42 L179,68 L155,11 L189,62 L30,26 Z"
            }
        ]
    },
    {
        "id": "planet_7",
        "name": "Proxima Centauri b",
        "color": "#ff6666",
        "regions": [
            {
                "id": "p7_r0",
                "name": "Sector 7-A",
                "buff": "Global Multiplier +160%",
                "type": "mult",
                "value": 1.6,
                "cost": 50131,
                "d": "M59,23 L91,70 L102,28 L42,13 L82,23 L48,41 Z"
            },
            {
                "id": "p7_r1",
                "name": "Sector 7-B",
                "buff": "Final Click Power x2.20",
                "type": "click_mult",
                "value": 2.2,
                "cost": 57651,
                "d": "M186,49 L11,56 L86,42 L82,36 L44,74 L95,16 L21,61 L55,35 Z"
            },
            {
                "id": "p7_r2",
                "name": "Sector 7-C",
                "buff": "Final Idle Power x2.20",
                "type": "idle_mult",
                "value": 2.2,
                "cost": 66298,
                "d": "M167,89 L184,80 L155,27 L37,84 L64,88 L175,65 L55,66 Z"
            },
            {
                "id": "p7_r3",
                "name": "Sector 7-D",
                "buff": "Final Global Multiplier x1.90",
                "type": "mult_total",
                "value": 1.9,
                "cost": 76243,
                "d": "M167,50 L92,17 L170,24 L123,88 L28,18 Z"
            },
            {
                "id": "p7_r4",
                "name": "Sector 7-E",
                "buff": "Upgrade Cost Reduction -145%",
                "type": "cost",
                "value": 1.4500000000000002,
                "cost": 87679,
                "d": "M136,58 L108,54 L103,70 L121,77 L140,79 L177,18 L31,15 L137,72 L98,45 Z"
            },
            {
                "id": "p7_r5",
                "name": "Sector 7-F",
                "buff": "Upgrade Cost Reduction -145%",
                "type": "cost",
                "value": 1.4500000000000002,
                "cost": 100831,
                "d": "M89,79 L123,49 L11,42 L160,12 L54,58 L24,28 L40,35 Z"
            },
            {
                "id": "p7_r6",
                "name": "Sector 7-G",
                "buff": "Rebirth Points +160%",
                "type": "rp",
                "value": 1.6,
                "cost": 115956,
                "d": "M113,40 L110,34 L165,88 L38,44 L182,58 Z"
            },
            {
                "id": "p7_r7",
                "name": "Sector 7-H",
                "buff": "Rebirth Points +160%",
                "type": "rp",
                "value": 1.6,
                "cost": 133350,
                "d": "M76,38 L164,38 L16,54 L65,86 L31,77 Z"
            },
            {
                "id": "p7_r8",
                "name": "Sector 7-I",
                "buff": "Global Multiplier +160%",
                "type": "mult",
                "value": 1.6,
                "cost": 153352,
                "d": "M41,16 L173,50 L45,64 L93,34 L164,84 L146,31 L135,31 L130,19 L170,30 Z"
            }
        ]
    },
    {
        "id": "planet_8",
        "name": "TRAPPIST-1e",
        "color": "#cc3333",
        "regions": [
            {
                "id": "p8_r0",
                "name": "Sector 8-A",
                "buff": "Final Global Multiplier x2.00",
                "type": "mult_total",
                "value": 2,
                "cost": 176355,
                "d": "M97,73 L131,47 L96,49 L49,61 L141,58 L23,52 Z"
            },
            {
                "id": "p8_r1",
                "name": "Sector 8-B",
                "buff": "Final Idle Power x2.30",
                "type": "idle_mult",
                "value": 2.3,
                "cost": 202809,
                "d": "M62,33 L12,72 L48,77 L158,71 L166,41 L15,47 L188,58 Z"
            },
            {
                "id": "p8_r2",
                "name": "Sector 8-C",
                "buff": "Rebirth Points +180%",
                "type": "rp",
                "value": 1.8,
                "cost": 233230,
                "d": "M35,77 L30,26 L167,29 L46,52 L74,44 L153,59 L77,87 Z"
            },
            {
                "id": "p8_r3",
                "name": "Sector 8-D",
                "buff": "Final Idle Power x2.30",
                "type": "idle_mult",
                "value": 2.3,
                "cost": 268215,
                "d": "M12,55 L15,70 L52,68 L25,39 L39,65 L43,30 L139,12 L15,54 Z"
            },
            {
                "id": "p8_r4",
                "name": "Sector 8-E",
                "buff": "Final Global Multiplier x2.00",
                "type": "mult_total",
                "value": 2,
                "cost": 308447,
                "d": "M44,38 L55,63 L65,63 L21,74 L21,70 L124,21 L51,49 L115,80 L156,71 Z"
            },
            {
                "id": "p8_r5",
                "name": "Sector 8-F",
                "buff": "Energy Regen +210%",
                "type": "energy",
                "value": 2.1,
                "cost": 354714,
                "d": "M126,54 L99,76 L115,72 L47,67 L29,46 L54,33 Z"
            }
        ]
    },
    {
        "id": "planet_9",
        "name": "Kepler-186f",
        "color": "#33cc33",
        "regions": [
            {
                "id": "p9_r0",
                "name": "Sector 9-A",
                "buff": "Idle Power +229%",
                "type": "idle",
                "value": 2.3,
                "cost": 407921,
                "d": "M68,79 L49,63 L161,89 L39,65 L15,10 L82,79 Z"
            },
            {
                "id": "p9_r1",
                "name": "Sector 9-B",
                "buff": "Rebirth Points +200%",
                "type": "rp",
                "value": 2,
                "cost": 469109,
                "d": "M79,19 L27,62 L75,58 L149,77 L145,46 Z"
            },
            {
                "id": "p9_r2",
                "name": "Sector 9-C",
                "buff": "Final Idle Power x2.40",
                "type": "idle_mult",
                "value": 2.4,
                "cost": 539476,
                "d": "M183,84 L157,16 L83,31 L172,84 L78,87 Z"
            },
            {
                "id": "p9_r3",
                "name": "Sector 9-D",
                "buff": "Click Power +229%",
                "type": "click",
                "value": 2.3,
                "cost": 620397,
                "d": "M188,64 L185,46 L124,31 L14,15 L21,66 Z"
            },
            {
                "id": "p9_r4",
                "name": "Sector 9-E",
                "buff": "Energy Regen +229%",
                "type": "energy",
                "value": 2.3,
                "cost": 713457,
                "d": "M121,30 L126,33 L177,84 L59,24 L21,47 L166,31 Z"
            },
            {
                "id": "p9_r5",
                "name": "Sector 9-F",
                "buff": "Final Click Power x2.40",
                "type": "click_mult",
                "value": 2.4,
                "cost": 820475,
                "d": "M31,76 L93,87 L28,64 L185,33 L78,29 L67,15 L118,65 L169,37 Z"
            },
            {
                "id": "p9_r6",
                "name": "Sector 9-G",
                "buff": "Global Multiplier +200%",
                "type": "mult",
                "value": 2,
                "cost": 943547,
                "d": "M112,70 L59,25 L175,70 L43,22 L13,22 Z"
            },
            {
                "id": "p9_r7",
                "name": "Sector 9-H",
                "buff": "Upgrade Cost Reduction -185%",
                "type": "cost",
                "value": 1.85,
                "cost": 1085079,
                "d": "M126,30 L170,28 L117,87 L168,34 L89,18 L154,56 L35,61 Z"
            },
            {
                "id": "p9_r8",
                "name": "Sector 9-I",
                "buff": "Upgrade Cost Reduction -185%",
                "type": "cost",
                "value": 1.85,
                "cost": 1247841,
                "d": "M58,68 L119,37 L149,45 L84,54 L25,82 Z"
            },
            {
                "id": "p9_r9",
                "name": "Sector 9-J",
                "buff": "Global Multiplier +200%",
                "type": "mult",
                "value": 2,
                "cost": 1435017,
                "d": "M169,74 L73,82 L156,57 L187,64 L115,47 L97,47 L131,52 L115,78 L134,24 Z"
            }
        ]
    },
    {
        "id": "planet_10",
        "name": "Gliese 581g",
        "color": "#66cc66",
        "regions": [
            {
                "id": "p10_r0",
                "name": "Sector 10-A",
                "buff": "Global Multiplier +220%",
                "type": "mult",
                "value": 2.2,
                "cost": 1650270,
                "d": "M164,81 L84,81 L54,11 L74,36 L23,36 L52,52 L115,40 L174,82 Z"
            },
            {
                "id": "p10_r1",
                "name": "Sector 10-B",
                "buff": "Idle Power +250%",
                "type": "idle",
                "value": 2.5,
                "cost": 1897810,
                "d": "M109,88 L58,38 L14,20 L142,68 L158,71 Z"
            },
            {
                "id": "p10_r2",
                "name": "Sector 10-C",
                "buff": "Energy Regen +250%",
                "type": "energy",
                "value": 2.5,
                "cost": 2182482,
                "d": "M116,76 L63,47 L66,75 L11,39 L61,35 Z"
            },
            {
                "id": "p10_r3",
                "name": "Sector 10-D",
                "buff": "Final Idle Power x2.50",
                "type": "idle_mult",
                "value": 2.5,
                "cost": 2509854,
                "d": "M106,12 L38,13 L25,53 L173,31 L118,34 L126,25 L121,71 L66,31 Z"
            },
            {
                "id": "p10_r4",
                "name": "Sector 10-E",
                "buff": "Final Click Power x2.50",
                "type": "click_mult",
                "value": 2.5,
                "cost": 2886332,
                "d": "M43,78 L84,65 L111,75 L68,11 L97,63 L16,52 Z"
            }
        ]
    },
    {
        "id": "planet_11",
        "name": "HD 209458 b",
        "color": "#99cc99",
        "regions": [
            {
                "id": "p11_r0",
                "name": "Sector 11-A",
                "buff": "Rebirth Points +240%",
                "type": "rp",
                "value": 2.4000000000000004,
                "cost": 3319282,
                "d": "M181,46 L107,50 L68,64 L162,17 L89,12 L161,88 L131,85 L151,36 Z"
            },
            {
                "id": "p11_r1",
                "name": "Sector 11-B",
                "buff": "Global Multiplier +240%",
                "type": "mult",
                "value": 2.4000000000000004,
                "cost": 3817175,
                "d": "M127,51 L158,78 L49,52 L164,76 L108,49 L122,60 Z"
            },
            {
                "id": "p11_r2",
                "name": "Sector 11-C",
                "buff": "Global Multiplier +240%",
                "type": "mult",
                "value": 2.4000000000000004,
                "cost": 4389751,
                "d": "M61,21 L80,86 L186,20 L150,73 L46,19 L110,19 L25,77 L12,65 L13,77 Z"
            },
            {
                "id": "p11_r3",
                "name": "Sector 11-D",
                "buff": "Click Power +270%",
                "type": "click",
                "value": 2.7,
                "cost": 5048214,
                "d": "M39,26 L116,89 L37,66 L14,74 L47,48 Z"
            },
            {
                "id": "p11_r4",
                "name": "Sector 11-E",
                "buff": "Upgrade Cost Reduction -225%",
                "type": "cost",
                "value": 2.25,
                "cost": 5805446,
                "d": "M185,79 L14,32 L88,33 L14,28 L134,40 L122,59 Z"
            }
        ]
    },
    {
        "id": "planet_12",
        "name": "51 Pegasi b",
        "color": "#cccc99",
        "regions": [
            {
                "id": "p12_r0",
                "name": "Sector 12-A",
                "buff": "Idle Power +290%",
                "type": "idle",
                "value": 2.9000000000000004,
                "cost": 6676263,
                "d": "M112,72 L99,26 L20,55 L46,51 L177,74 L20,14 Z"
            },
            {
                "id": "p12_r1",
                "name": "Sector 12-B",
                "buff": "Final Idle Power x2.70",
                "type": "idle_mult",
                "value": 2.7,
                "cost": 7677703,
                "d": "M129,53 L28,82 L90,89 L64,78 L34,85 L15,15 Z"
            },
            {
                "id": "p12_r2",
                "name": "Sector 12-C",
                "buff": "Idle Power +290%",
                "type": "idle",
                "value": 2.9000000000000004,
                "cost": 8829358,
                "d": "M127,36 L136,76 L52,78 L21,62 L102,62 Z"
            },
            {
                "id": "p12_r3",
                "name": "Sector 12-D",
                "buff": "Rebirth Points +260%",
                "type": "rp",
                "value": 2.6000000000000005,
                "cost": 10153762,
                "d": "M71,26 L86,69 L51,17 L143,46 L54,76 L134,84 L166,58 L20,50 Z"
            },
            {
                "id": "p12_r4",
                "name": "Sector 12-E",
                "buff": "Global Multiplier +260%",
                "type": "mult",
                "value": 2.6000000000000005,
                "cost": 11676826,
                "d": "M47,31 L172,64 L55,60 L15,28 L132,28 L60,19 L31,26 Z"
            },
            {
                "id": "p12_r5",
                "name": "Sector 12-F",
                "buff": "Upgrade Cost Reduction -245%",
                "type": "cost",
                "value": 2.45,
                "cost": 13428350,
                "d": "M90,17 L64,57 L89,53 L13,57 L139,68 L141,22 L174,67 L64,11 L111,41 Z"
            },
            {
                "id": "p12_r6",
                "name": "Sector 12-G",
                "buff": "Upgrade Cost Reduction -245%",
                "type": "cost",
                "value": 2.45,
                "cost": 15442603,
                "d": "M16,16 L42,10 L90,55 L32,50 L153,52 L109,64 L106,59 L158,14 L172,76 Z"
            },
            {
                "id": "p12_r7",
                "name": "Sector 12-H",
                "buff": "Click Power +290%",
                "type": "click",
                "value": 2.9000000000000004,
                "cost": 17758993,
                "d": "M24,50 L139,84 L155,79 L184,42 L113,27 L114,35 L175,81 L126,31 L187,48 Z"
            },
            {
                "id": "p12_r8",
                "name": "Sector 12-I",
                "buff": "Idle Power +290%",
                "type": "idle",
                "value": 2.9000000000000004,
                "cost": 20422842,
                "d": "M183,42 L60,56 L145,46 L21,34 L143,47 L86,24 L111,17 Z"
            },
            {
                "id": "p12_r9",
                "name": "Sector 12-J",
                "buff": "Final Click Power x2.70",
                "type": "click_mult",
                "value": 2.7,
                "cost": 23486269,
                "d": "M176,53 L70,37 L14,40 L105,12 L14,80 Z"
            }
        ]
    },
    {
        "id": "planet_13",
        "name": "WASP-12b",
        "color": "#ffff99",
        "regions": [
            {
                "id": "p13_r0",
                "name": "Sector 13-A",
                "buff": "Final Global Multiplier x2.50",
                "type": "mult_total",
                "value": 2.5,
                "cost": 27009209,
                "d": "M29,71 L73,81 L27,76 L187,61 L106,85 L151,46 L181,80 Z"
            },
            {
                "id": "p13_r1",
                "name": "Sector 13-B",
                "buff": "Idle Power +310%",
                "type": "idle",
                "value": 3.1,
                "cost": 31060590,
                "d": "M85,17 L83,36 L26,18 L183,77 L59,85 Z"
            },
            {
                "id": "p13_r2",
                "name": "Sector 13-C",
                "buff": "Idle Power +310%",
                "type": "idle",
                "value": 3.1,
                "cost": 35719679,
                "d": "M28,80 L66,71 L128,18 L61,35 L39,40 L35,30 Z"
            },
            {
                "id": "p13_r3",
                "name": "Sector 13-D",
                "buff": "Final Click Power x2.80",
                "type": "click_mult",
                "value": 2.8,
                "cost": 41077631,
                "d": "M141,57 L19,63 L53,48 L132,23 L169,26 L176,70 Z"
            },
            {
                "id": "p13_r4",
                "name": "Sector 13-E",
                "buff": "Global Multiplier +280%",
                "type": "mult",
                "value": 2.8000000000000003,
                "cost": 47239275,
                "d": "M101,16 L36,64 L47,25 L126,53 L44,49 L74,47 L117,78 Z"
            },
            {
                "id": "p13_r5",
                "name": "Sector 13-F",
                "buff": "Global Multiplier +280%",
                "type": "mult",
                "value": 2.8000000000000003,
                "cost": 54325167,
                "d": "M16,26 L17,30 L118,67 L58,17 L62,46 L162,68 L47,42 L11,34 L43,47 Z"
            }
        ]
    },
    {
        "id": "planet_14",
        "name": "PSR B1257+12 B",
        "color": "#ffcc66",
        "regions": [
            {
                "id": "p14_r0",
                "name": "Sector 14-A",
                "buff": "Click Power +330%",
                "type": "click",
                "value": 3.3000000000000003,
                "cost": 62473942,
                "d": "M112,13 L146,53 L163,59 L146,65 L120,39 L46,87 L183,67 Z"
            },
            {
                "id": "p14_r1",
                "name": "Sector 14-B",
                "buff": "Final Global Multiplier x2.60",
                "type": "mult_total",
                "value": 2.6,
                "cost": 71845033,
                "d": "M39,73 L128,37 L25,65 L143,59 L75,44 L159,34 Z"
            },
            {
                "id": "p14_r2",
                "name": "Sector 14-C",
                "buff": "Energy Regen +330%",
                "type": "energy",
                "value": 3.3000000000000003,
                "cost": 82621788,
                "d": "M165,23 L142,42 L51,35 L43,74 L130,27 L95,16 Z"
            },
            {
                "id": "p14_r3",
                "name": "Sector 14-D",
                "buff": "Upgrade Cost Reduction -285%",
                "type": "cost",
                "value": 2.85,
                "cost": 95015057,
                "d": "M27,63 L157,61 L123,50 L79,63 L142,55 L47,53 L47,44 L39,31 L151,36 Z"
            },
            {
                "id": "p14_r4",
                "name": "Sector 14-E",
                "buff": "Final Click Power x2.90",
                "type": "click_mult",
                "value": 2.9000000000000004,
                "cost": 109267315,
                "d": "M187,30 L150,79 L63,35 L86,62 L35,83 L80,77 L58,51 Z"
            },
            {
                "id": "p14_r5",
                "name": "Sector 14-F",
                "buff": "Global Multiplier +300%",
                "type": "mult",
                "value": 3.0000000000000004,
                "cost": 125657413,
                "d": "M31,27 L29,26 L118,68 L144,11 L126,68 L150,58 Z"
            },
            {
                "id": "p14_r6",
                "name": "Sector 14-G",
                "buff": "Rebirth Points +300%",
                "type": "rp",
                "value": 3.0000000000000004,
                "cost": 144506025,
                "d": "M76,36 L83,40 L24,17 L94,69 L87,26 L42,52 L86,77 Z"
            },
            {
                "id": "p14_r7",
                "name": "Sector 14-H",
                "buff": "Click Power +330%",
                "type": "click",
                "value": 3.3000000000000003,
                "cost": 166181929,
                "d": "M93,21 L33,45 L57,11 L104,78 L80,29 L156,33 L175,29 L79,29 Z"
            },
            {
                "id": "p14_r8",
                "name": "Sector 14-I",
                "buff": "Rebirth Points +300%",
                "type": "rp",
                "value": 3.0000000000000004,
                "cost": 191109218,
                "d": "M86,83 L76,81 L124,16 L11,52 L129,80 L26,26 L43,11 L79,39 Z"
            },
            {
                "id": "p14_r9",
                "name": "Sector 14-J",
                "buff": "Click Power +330%",
                "type": "click",
                "value": 3.3000000000000003,
                "cost": 219775601,
                "d": "M51,38 L10,14 L140,53 L60,63 L180,86 L101,22 Z"
            }
        ]
    },
    {
        "id": "planet_15",
        "name": "Milky Way Core",
        "color": "#ff9933",
        "regions": [
            {
                "id": "p15_r0",
                "name": "Sector 15-A",
                "buff": "Rebirth Points +320%",
                "type": "rp",
                "value": 3.2,
                "cost": 252741941,
                "d": "M74,15 L114,15 L23,67 L49,70 L68,29 L55,20 L170,62 Z"
            },
            {
                "id": "p15_r1",
                "name": "Sector 15-B",
                "buff": "Energy Regen +350%",
                "type": "energy",
                "value": 3.5,
                "cost": 290653232,
                "d": "M117,53 L161,79 L116,35 L160,83 L130,75 L135,10 L51,77 L63,79 Z"
            },
            {
                "id": "p15_r2",
                "name": "Sector 15-C",
                "buff": "Upgrade Cost Reduction -305%",
                "type": "cost",
                "value": 3.05,
                "cost": 334251217,
                "d": "M128,26 L84,63 L152,14 L108,62 L79,77 Z"
            },
            {
                "id": "p15_r3",
                "name": "Sector 15-D",
                "buff": "Final Click Power x3.00",
                "type": "click_mult",
                "value": 3,
                "cost": 384388900,
                "d": "M144,81 L79,83 L74,48 L38,20 L113,43 Z"
            },
            {
                "id": "p15_r4",
                "name": "Sector 15-E",
                "buff": "Click Power +350%",
                "type": "click",
                "value": 3.5,
                "cost": 442047235,
                "d": "M106,59 L13,42 L76,31 L98,21 L46,55 L97,72 L151,83 L98,22 Z"
            },
            {
                "id": "p15_r5",
                "name": "Sector 15-F",
                "buff": "Energy Regen +350%",
                "type": "energy",
                "value": 3.5,
                "cost": 508354320,
                "d": "M155,24 L14,41 L164,81 L100,64 L11,49 Z"
            },
            {
                "id": "p15_r6",
                "name": "Sector 15-G",
                "buff": "Final Global Multiplier x2.70",
                "type": "mult_total",
                "value": 2.7,
                "cost": 584607468,
                "d": "M97,30 L79,38 L153,81 L154,32 L179,16 L50,85 L54,24 Z"
            },
            {
                "id": "p15_r7",
                "name": "Sector 15-H",
                "buff": "Final Click Power x3.00",
                "type": "click_mult",
                "value": 3,
                "cost": 672298588,
                "d": "M181,18 L59,43 L111,88 L47,45 L162,72 L52,82 L24,84 L109,20 Z"
            }
        ]
    },
    {
        "id": "planet_16",
        "name": "Andromeda",
        "color": "#ff6600",
        "regions": [
            {
                "id": "p16_r0",
                "name": "Sector 16-A",
                "buff": "Final Click Power x3.10",
                "type": "click_mult",
                "value": 3.1,
                "cost": 773143376,
                "d": "M133,87 L68,72 L71,45 L143,48 L84,56 Z"
            },
            {
                "id": "p16_r1",
                "name": "Sector 16-B",
                "buff": "Final Click Power x3.10",
                "type": "click_mult",
                "value": 3.1,
                "cost": 889114883,
                "d": "M182,37 L141,10 L30,72 L160,13 L104,30 L175,54 L163,32 L48,50 L32,42 Z"
            },
            {
                "id": "p16_r2",
                "name": "Sector 16-C",
                "buff": "Upgrade Cost Reduction -325%",
                "type": "cost",
                "value": 3.25,
                "cost": 1022482115,
                "d": "M138,86 L126,43 L35,68 L55,39 L69,38 Z"
            },
            {
                "id": "p16_r3",
                "name": "Sector 16-D",
                "buff": "Energy Regen +370%",
                "type": "energy",
                "value": 3.7,
                "cost": 1175854433,
                "d": "M141,82 L22,43 L144,56 L148,42 L38,48 L34,55 Z"
            },
            {
                "id": "p16_r4",
                "name": "Sector 16-E",
                "buff": "Energy Regen +370%",
                "type": "energy",
                "value": 3.7,
                "cost": 1352232598,
                "d": "M92,51 L69,65 L93,79 L164,71 L66,52 L54,78 L44,21 L26,44 L132,51 Z"
            },
            {
                "id": "p16_r5",
                "name": "Sector 16-F",
                "buff": "Energy Regen +370%",
                "type": "energy",
                "value": 3.7,
                "cost": 1555067488,
                "d": "M64,89 L100,27 L45,15 L34,31 L61,84 L83,27 L106,56 L169,10 L11,50 Z"
            }
        ]
    },
    {
        "id": "planet_17",
        "name": "Triangulum",
        "color": "#ff3300",
        "regions": [
            {
                "id": "p17_r0",
                "name": "Sector 17-A",
                "buff": "Click Power +390%",
                "type": "click",
                "value": 3.9000000000000004,
                "cost": 1788327611,
                "d": "M186,19 L120,62 L63,69 L107,89 L20,60 Z"
            },
            {
                "id": "p17_r1",
                "name": "Sector 17-B",
                "buff": "Click Power +390%",
                "type": "click",
                "value": 3.9000000000000004,
                "cost": 2056576752,
                "d": "M29,85 L27,22 L40,70 L98,21 L84,39 L160,78 L44,55 Z"
            },
            {
                "id": "p17_r2",
                "name": "Sector 17-C",
                "buff": "Final Click Power x3.20",
                "type": "click_mult",
                "value": 3.2,
                "cost": 2365063265,
                "d": "M179,20 L151,89 L167,55 L182,14 L123,72 L146,35 L44,15 L19,88 L169,42 Z"
            },
            {
                "id": "p17_r3",
                "name": "Sector 17-D",
                "buff": "Final Idle Power x3.20",
                "type": "idle_mult",
                "value": 3.2,
                "cost": 2719822755,
                "d": "M106,81 L42,10 L26,58 L170,32 L185,59 L75,11 Z"
            },
            {
                "id": "p17_r4",
                "name": "Sector 17-E",
                "buff": "Click Power +390%",
                "type": "click",
                "value": 3.9000000000000004,
                "cost": 3127796169,
                "d": "M159,71 L90,53 L23,79 L120,79 L15,37 Z"
            },
            {
                "id": "p17_r5",
                "name": "Sector 17-F",
                "buff": "Idle Power +390%",
                "type": "idle",
                "value": 3.9000000000000004,
                "cost": 3596965594,
                "d": "M180,70 L60,72 L175,51 L24,85 L146,83 Z"
            },
            {
                "id": "p17_r6",
                "name": "Sector 17-G",
                "buff": "Upgrade Cost Reduction -345%",
                "type": "cost",
                "value": 3.45,
                "cost": 4136510433,
                "d": "M134,19 L125,79 L130,73 L159,73 L86,11 Z"
            },
            {
                "id": "p17_r7",
                "name": "Sector 17-H",
                "buff": "Final Click Power x3.20",
                "type": "click_mult",
                "value": 3.2,
                "cost": 4756986998,
                "d": "M132,60 L109,69 L23,53 L70,29 L154,64 L60,73 L42,67 L23,35 L30,23 Z"
            },
            {
                "id": "p17_r8",
                "name": "Sector 17-I",
                "buff": "Click Power +390%",
                "type": "click",
                "value": 3.9000000000000004,
                "cost": 5470535048,
                "d": "M133,81 L53,86 L163,39 L122,21 L110,23 Z"
            },
            {
                "id": "p17_r9",
                "name": "Sector 17-J",
                "buff": "Global Multiplier +360%",
                "type": "mult",
                "value": 3.6000000000000005,
                "cost": 6291115305,
                "d": "M38,45 L107,70 L145,46 L110,45 L131,83 L117,85 Z"
            }
        ]
    },
    {
        "id": "planet_18",
        "name": "Sombrero",
        "color": "#cc0000",
        "regions": [
            {
                "id": "p18_r0",
                "name": "Sector 18-A",
                "buff": "Final Idle Power x3.30",
                "type": "idle_mult",
                "value": 3.3,
                "cost": 7234782601,
                "d": "M106,18 L106,36 L65,80 L27,25 L146,16 L36,44 Z"
            },
            {
                "id": "p18_r1",
                "name": "Sector 18-B",
                "buff": "Global Multiplier +380%",
                "type": "mult",
                "value": 3.8000000000000003,
                "cost": 8319999992,
                "d": "M17,70 L19,21 L129,44 L131,88 L143,34 Z"
            },
            {
                "id": "p18_r2",
                "name": "Sector 18-C",
                "buff": "Rebirth Points +380%",
                "type": "rp",
                "value": 3.8000000000000003,
                "cost": 9567999990,
                "d": "M99,78 L133,59 L117,43 L24,33 L101,72 L102,71 L47,54 L155,29 L20,87 Z"
            },
            {
                "id": "p18_r3",
                "name": "Sector 18-D",
                "buff": "Energy Regen +409%",
                "type": "energy",
                "value": 4.1,
                "cost": 11003199989,
                "d": "M54,42 L123,54 L137,10 L154,63 L15,47 L165,58 L150,36 L50,12 L129,57 Z"
            },
            {
                "id": "p18_r4",
                "name": "Sector 18-E",
                "buff": "Final Click Power x3.30",
                "type": "click_mult",
                "value": 3.3,
                "cost": 12653679987,
                "d": "M11,75 L50,86 L17,55 L11,85 L126,68 L87,85 L36,17 L44,85 L53,41 Z"
            },
            {
                "id": "p18_r5",
                "name": "Sector 18-F",
                "buff": "Final Global Multiplier x3.00",
                "type": "mult_total",
                "value": 3,
                "cost": 14551731986,
                "d": "M122,12 L118,63 L134,24 L184,42 L113,89 L64,82 L116,28 L90,34 Z"
            },
            {
                "id": "p18_r6",
                "name": "Sector 18-G",
                "buff": "Idle Power +409%",
                "type": "idle",
                "value": 4.1,
                "cost": 16734491784,
                "d": "M64,73 L70,62 L146,75 L105,37 L83,77 L79,53 L142,25 L50,26 Z"
            },
            {
                "id": "p18_r7",
                "name": "Sector 18-H",
                "buff": "Rebirth Points +380%",
                "type": "rp",
                "value": 3.8000000000000003,
                "cost": 19244665551,
                "d": "M25,15 L152,18 L24,57 L22,30 L143,44 L113,12 L115,69 Z"
            },
            {
                "id": "p18_r8",
                "name": "Sector 18-I",
                "buff": "Upgrade Cost Reduction -365%",
                "type": "cost",
                "value": 3.65,
                "cost": 22131365384,
                "d": "M162,14 L102,58 L125,55 L154,42 L137,87 Z"
            },
            {
                "id": "p18_r9",
                "name": "Sector 18-J",
                "buff": "Click Power +409%",
                "type": "click",
                "value": 4.1,
                "cost": 25451070192,
                "d": "M143,31 L174,89 L175,44 L79,46 L46,70 L137,35 L119,54 L130,74 Z"
            }
        ]
    },
    {
        "id": "planet_19",
        "name": "Whirlpool",
        "color": "#990000",
        "regions": [
            {
                "id": "p19_r0",
                "name": "Sector 19-A",
                "buff": "Rebirth Points +400%",
                "type": "rp",
                "value": 4,
                "cost": 29268730720,
                "d": "M183,48 L134,10 L86,66 L141,34 L107,36 L56,74 L15,22 L184,80 Z"
            },
            {
                "id": "p19_r1",
                "name": "Sector 19-B",
                "buff": "Rebirth Points +400%",
                "type": "rp",
                "value": 4,
                "cost": 33659040329,
                "d": "M148,55 L131,82 L170,72 L60,44 L126,75 L160,80 L94,18 Z"
            },
            {
                "id": "p19_r2",
                "name": "Sector 19-C",
                "buff": "Idle Power +430%",
                "type": "idle",
                "value": 4.300000000000001,
                "cost": 38707896378,
                "d": "M62,53 L102,18 L55,52 L66,61 L17,18 L32,84 Z"
            },
            {
                "id": "p19_r3",
                "name": "Sector 19-D",
                "buff": "Click Power +430%",
                "type": "click",
                "value": 4.300000000000001,
                "cost": 44514080835,
                "d": "M102,11 L151,19 L86,57 L14,83 L61,45 L127,51 Z"
            },
            {
                "id": "p19_r4",
                "name": "Sector 19-E",
                "buff": "Idle Power +430%",
                "type": "idle",
                "value": 4.300000000000001,
                "cost": 51191192960,
                "d": "M33,27 L28,83 L166,17 L83,36 L189,72 Z"
            },
            {
                "id": "p19_r5",
                "name": "Sector 19-F",
                "buff": "Final Idle Power x3.40",
                "type": "idle_mult",
                "value": 3.4000000000000004,
                "cost": 58869871904,
                "d": "M61,25 L39,56 L43,46 L111,54 L186,79 L78,80 L104,21 L78,51 L43,49 Z"
            },
            {
                "id": "p19_r6",
                "name": "Sector 19-G",
                "buff": "Rebirth Points +400%",
                "type": "rp",
                "value": 4,
                "cost": 67700352690,
                "d": "M36,88 L117,74 L180,18 L130,49 L135,14 Z"
            },
            {
                "id": "p19_r7",
                "name": "Sector 19-H",
                "buff": "Final Global Multiplier x3.10",
                "type": "mult_total",
                "value": 3.1,
                "cost": 77855405593,
                "d": "M113,64 L68,61 L156,53 L20,42 L188,52 L18,69 L138,12 L41,65 Z"
            },
            {
                "id": "p19_r8",
                "name": "Sector 19-I",
                "buff": "Upgrade Cost Reduction -385%",
                "type": "cost",
                "value": 3.85,
                "cost": 89533716432,
                "d": "M109,89 L154,76 L189,58 L164,71 L70,85 Z"
            }
        ]
    },
    {
        "id": "planet_20",
        "name": "Pinwheel",
        "color": "#660000",
        "regions": [
            {
                "id": "p20_r0",
                "name": "Sector 20-A",
                "buff": "Energy Regen +450%",
                "type": "energy",
                "value": 4.5,
                "cost": 102963773897,
                "d": "M32,78 L126,29 L77,86 L112,69 L15,28 L138,17 L18,45 Z"
            },
            {
                "id": "p20_r1",
                "name": "Sector 20-B",
                "buff": "Final Click Power x3.50",
                "type": "click_mult",
                "value": 3.5,
                "cost": 118408339982,
                "d": "M77,40 L21,10 L50,58 L64,44 L125,13 L165,30 L132,71 L179,61 Z"
            },
            {
                "id": "p20_r2",
                "name": "Sector 20-C",
                "buff": "Energy Regen +450%",
                "type": "energy",
                "value": 4.5,
                "cost": 136169590979,
                "d": "M85,55 L123,52 L165,21 L11,87 L100,28 L90,23 Z"
            },
            {
                "id": "p20_r3",
                "name": "Sector 20-D",
                "buff": "Idle Power +450%",
                "type": "idle",
                "value": 4.5,
                "cost": 156595029626,
                "d": "M187,51 L137,34 L90,24 L145,53 L129,29 L151,65 L150,25 L53,47 Z"
            },
            {
                "id": "p20_r4",
                "name": "Sector 20-E",
                "buff": "Upgrade Cost Reduction -405%",
                "type": "cost",
                "value": 4.05,
                "cost": 180084284070,
                "d": "M93,79 L139,31 L154,39 L128,75 L161,55 L10,69 L130,79 Z"
            }
        ]
    },
    {
        "id": "planet_21",
        "name": "Cartwheel",
        "color": "#330000",
        "regions": [
            {
                "id": "p21_r0",
                "name": "Sector 21-A",
                "buff": "Global Multiplier +440%",
                "type": "mult",
                "value": 4.4,
                "cost": 207096926681,
                "d": "M92,23 L68,88 L118,89 L169,11 L66,38 L65,39 Z"
            },
            {
                "id": "p21_r1",
                "name": "Sector 21-B",
                "buff": "Final Global Multiplier x3.30",
                "type": "mult_total",
                "value": 3.3,
                "cost": 238161465683,
                "d": "M154,22 L157,22 L181,74 L44,24 L34,49 L38,79 L109,20 L151,39 L80,57 Z"
            },
            {
                "id": "p21_r2",
                "name": "Sector 21-C",
                "buff": "Upgrade Cost Reduction -425%",
                "type": "cost",
                "value": 4.25,
                "cost": 273885685535,
                "d": "M160,37 L81,24 L188,62 L144,83 L121,17 L144,52 L111,59 L71,76 L154,35 Z"
            },
            {
                "id": "p21_r3",
                "name": "Sector 21-D",
                "buff": "Rebirth Points +440%",
                "type": "rp",
                "value": 4.4,
                "cost": 314968538365,
                "d": "M65,25 L185,38 L183,17 L113,23 L141,51 Z"
            },
            {
                "id": "p21_r4",
                "name": "Sector 21-E",
                "buff": "Final Global Multiplier x3.30",
                "type": "mult_total",
                "value": 3.3,
                "cost": 362213819120,
                "d": "M32,13 L99,51 L25,83 L129,50 L102,59 L61,69 L83,25 L163,74 L93,22 Z"
            },
            {
                "id": "p21_r5",
                "name": "Sector 21-F",
                "buff": "Upgrade Cost Reduction -425%",
                "type": "cost",
                "value": 4.25,
                "cost": 416545891989,
                "d": "M54,38 L175,88 L92,25 L114,16 L37,15 Z"
            }
        ]
    },
    {
        "id": "planet_22",
        "name": "Laniakea",
        "color": "#000000",
        "regions": [
            {
                "id": "p22_r0",
                "name": "Sector 22-A",
                "buff": "Global Multiplier +460%",
                "type": "mult",
                "value": 4.6000000000000005,
                "cost": 479027775787,
                "d": "M97,32 L74,79 L41,29 L133,61 L18,47 L84,45 L35,59 L108,80 Z"
            },
            {
                "id": "p22_r1",
                "name": "Sector 22-B",
                "buff": "Final Idle Power x3.70",
                "type": "idle_mult",
                "value": 3.7,
                "cost": 550881942155,
                "d": "M64,77 L173,43 L148,70 L80,52 L85,67 L106,42 L13,76 Z"
            },
            {
                "id": "p22_r2",
                "name": "Sector 22-C",
                "buff": "Global Multiplier +460%",
                "type": "mult",
                "value": 4.6000000000000005,
                "cost": 633514233478,
                "d": "M157,76 L24,61 L80,23 L10,80 L111,40 Z"
            },
            {
                "id": "p22_r3",
                "name": "Sector 22-D",
                "buff": "Final Idle Power x3.70",
                "type": "idle_mult",
                "value": 3.7,
                "cost": 728541368500,
                "d": "M33,69 L53,15 L103,76 L142,38 L139,38 L30,39 L158,40 L121,55 Z"
            },
            {
                "id": "p22_r4",
                "name": "Sector 22-E",
                "buff": "Global Multiplier +460%",
                "type": "mult",
                "value": 4.6000000000000005,
                "cost": 837822573775,
                "d": "M10,47 L155,61 L97,41 L155,33 L16,82 L23,73 L18,26 L118,26 L112,44 Z"
            }
        ]
    },
    {
        "id": "planet_23",
        "name": "Great Attractor",
        "color": "#333333",
        "regions": [
            {
                "id": "p23_r0",
                "name": "Sector 23-A",
                "buff": "Click Power +510%",
                "type": "click",
                "value": 5.1000000000000005,
                "cost": 963495959842,
                "d": "M131,32 L139,88 L114,80 L119,30 L184,22 L70,71 Z"
            },
            {
                "id": "p23_r1",
                "name": "Sector 23-B",
                "buff": "Idle Power +510%",
                "type": "idle",
                "value": 5.1000000000000005,
                "cost": 1108020353818,
                "d": "M107,87 L127,64 L24,32 L161,53 L26,39 L23,29 Z"
            },
            {
                "id": "p23_r2",
                "name": "Sector 23-C",
                "buff": "Upgrade Cost Reduction -465%",
                "type": "cost",
                "value": 4.65,
                "cost": 1274223406891,
                "d": "M71,61 L76,69 L84,36 L22,10 L35,19 L69,59 L95,48 L156,18 L37,56 Z"
            },
            {
                "id": "p23_r3",
                "name": "Sector 23-D",
                "buff": "Click Power +510%",
                "type": "click",
                "value": 5.1000000000000005,
                "cost": 1465356917924,
                "d": "M58,35 L170,26 L117,36 L155,36 L152,32 L155,37 L176,48 L177,40 L185,67 Z"
            },
            {
                "id": "p23_r4",
                "name": "Sector 23-E",
                "buff": "Final Idle Power x3.80",
                "type": "idle_mult",
                "value": 3.8000000000000003,
                "cost": 1685160455613,
                "d": "M100,77 L130,41 L89,16 L34,22 L34,22 L136,36 L116,10 L38,67 L96,20 Z"
            }
        ]
    },
    {
        "id": "planet_24",
        "name": "Raibos Zenith",
        "color": "#666666",
        "regions": [
            {
                "id": "p24_r0",
                "name": "Sector 24-A",
                "buff": "Final Global Multiplier x3.60",
                "type": "mult_total",
                "value": 3.6000000000000005,
                "cost": 1937934523955,
                "d": "M189,10 L85,54 L82,41 L67,32 L21,50 L75,35 L102,31 L49,18 Z"
            },
            {
                "id": "p24_r1",
                "name": "Sector 24-B",
                "buff": "Energy Regen +530%",
                "type": "energy",
                "value": 5.300000000000001,
                "cost": 2228624702548,
                "d": "M180,38 L164,77 L80,77 L150,80 L176,79 L161,87 Z"
            },
            {
                "id": "p24_r2",
                "name": "Sector 24-C",
                "buff": "Rebirth Points +500%",
                "type": "rp",
                "value": 5.000000000000001,
                "cost": 2562918407931,
                "d": "M134,23 L41,22 L169,50 L138,85 L90,39 L165,68 Z"
            },
            {
                "id": "p24_r3",
                "name": "Sector 24-D",
                "buff": "Idle Power +530%",
                "type": "idle",
                "value": 5.300000000000001,
                "cost": 2947356169120,
                "d": "M140,12 L161,31 L167,30 L164,33 L180,87 L47,51 L97,53 L75,85 Z"
            },
            {
                "id": "p24_r4",
                "name": "Sector 24-E",
                "buff": "Final Idle Power x3.90",
                "type": "idle_mult",
                "value": 3.9000000000000004,
                "cost": 3389459594488,
                "d": "M49,14 L98,89 L130,80 L10,18 L43,37 L168,87 L58,10 L181,14 Z"
            },
            {
                "id": "p24_r5",
                "name": "Sector 24-F",
                "buff": "Click Power +530%",
                "type": "click",
                "value": 5.300000000000001,
                "cost": 3897878533662,
                "d": "M167,43 L36,10 L96,13 L20,26 L104,77 L134,68 Z"
            },
            {
                "id": "p24_r6",
                "name": "Sector 24-G",
                "buff": "Idle Power +530%",
                "type": "idle",
                "value": 5.300000000000001,
                "cost": 4482560313711,
                "d": "M126,10 L24,87 L159,72 L48,25 L125,68 L44,30 Z"
            }
        ]
    }
];

var artifactsData = [
    {
        "id": "art1",
        "name": "Raibos Relic 1",
        "desc": "Global Mult x1.15 per letter suffix.",
        "cost": 3000,
        "type": "suffix_mult",
        "value": 1.15
    },
    {
        "id": "art2",
        "name": "Raibos Relic 2",
        "desc": "Invasion attack cost -5%.",
        "cost": 3900,
        "type": "invasion_cost",
        "value": 0.15000000000000002
    },
    {
        "id": "art3",
        "name": "Raibos Relic 3",
        "desc": "Rebirth Point gain x2.",
        "cost": 5070,
        "type": "rp_mult",
        "value": 2.2
    },
    {
        "id": "art4",
        "name": "Raibos Relic 4",
        "desc": "1% chance on click to grant production.",
        "cost": 6591,
        "type": "click_proc",
        "value": 120.3
    },
    {
        "id": "art5",
        "name": "Raibos Relic 5",
        "desc": "All Production x5.",
        "cost": 8568,
        "type": "all_prod",
        "value": 5.4
    },
    {
        "id": "art6",
        "name": "Raibos Relic 6",
        "desc": "Energy Max x2.",
        "cost": 11138,
        "type": "energy_max",
        "value": 2.5
    },
    {
        "id": "art7",
        "name": "Raibos Relic 7",
        "desc": "Upgrade cost scaling -0.01.",
        "cost": 14480,
        "type": "cost_scale",
        "value": 0.6100000000000001
    },
    {
        "id": "art8",
        "name": "Raibos Relic 8",
        "desc": "Click Power x10.",
        "cost": 18824,
        "type": "click_mult",
        "value": 10.7
    },
    {
        "id": "art9",
        "name": "Raibos Relic 9",
        "desc": "Every Artifact owned gives x1.1 All Production.",
        "cost": 24471,
        "type": "art_mult",
        "value": 1.9000000000000001
    },
    {
        "id": "art10",
        "name": "Raibos Relic 10",
        "desc": "Energy Regen x2.",
        "cost": 31813,
        "type": "energy_mult",
        "value": 2.9
    },
    {
        "id": "art11",
        "name": "Raibos Relic 11",
        "desc": "Final Multiplier x10.",
        "cost": 41357,
        "type": "mult_total",
        "value": 11
    },
    {
        "id": "art12",
        "name": "Raibos Relic 12",
        "desc": "Cosmic Shard drop rate x2.",
        "cost": 53764,
        "type": "shard_rate",
        "value": 3.1
    },
    {
        "id": "art13",
        "name": "Raibos Relic 13",
        "desc": "Global Mult x1.15 per letter suffix.",
        "cost": 69894,
        "type": "suffix_mult",
        "value": 2.35
    },
    {
        "id": "art14",
        "name": "Raibos Relic 14",
        "desc": "Invasion attack cost -5%.",
        "cost": 90862,
        "type": "invasion_cost",
        "value": 1.35
    },
    {
        "id": "art15",
        "name": "Raibos Relic 15",
        "desc": "Rebirth Point gain x2.",
        "cost": 118121,
        "type": "rp_mult",
        "value": 3.4000000000000004
    },
    {
        "id": "art16",
        "name": "Raibos Relic 16",
        "desc": "1% chance on click to grant production.",
        "cost": 153557,
        "type": "click_proc",
        "value": 121.5
    },
    {
        "id": "art17",
        "name": "Raibos Relic 17",
        "desc": "All Production x5.",
        "cost": 199624,
        "type": "all_prod",
        "value": 6.6
    },
    {
        "id": "art18",
        "name": "Raibos Relic 18",
        "desc": "Energy Max x2.",
        "cost": 259512,
        "type": "energy_max",
        "value": 3.7
    },
    {
        "id": "art19",
        "name": "Raibos Relic 19",
        "desc": "Upgrade cost scaling -0.01.",
        "cost": 337366,
        "type": "cost_scale",
        "value": 1.81
    },
    {
        "id": "art20",
        "name": "Raibos Relic 20",
        "desc": "Click Power x10.",
        "cost": 438576,
        "type": "click_mult",
        "value": 11.9
    },
    {
        "id": "art21",
        "name": "Raibos Relic 21",
        "desc": "Every Artifact owned gives x1.1 All Production.",
        "cost": 570148,
        "type": "art_mult",
        "value": 3.1
    },
    {
        "id": "art22",
        "name": "Raibos Relic 22",
        "desc": "Energy Regen x2.",
        "cost": 741193,
        "type": "energy_mult",
        "value": 4.1
    },
    {
        "id": "art23",
        "name": "Raibos Relic 23",
        "desc": "Final Multiplier x10.",
        "cost": 963551,
        "type": "mult_total",
        "value": 12.2
    },
    {
        "id": "art24",
        "name": "Raibos Relic 24",
        "desc": "Cosmic Shard drop rate x2.",
        "cost": 1252617,
        "type": "shard_rate",
        "value": 4.300000000000001
    },
    {
        "id": "art25",
        "name": "Raibos Relic 25",
        "desc": "Global Mult x1.15 per letter suffix.",
        "cost": 1628402,
        "type": "suffix_mult",
        "value": 3.5500000000000003
    },
    {
        "id": "art26",
        "name": "Raibos Relic 26",
        "desc": "Invasion attack cost -5%.",
        "cost": 2116923,
        "type": "invasion_cost",
        "value": 2.55
    },
    {
        "id": "art27",
        "name": "Raibos Relic 27",
        "desc": "Rebirth Point gain x2.",
        "cost": 2751999,
        "type": "rp_mult",
        "value": 4.6
    },
    {
        "id": "art28",
        "name": "Raibos Relic 28",
        "desc": "1% chance on click to grant production.",
        "cost": 3577599,
        "type": "click_proc",
        "value": 122.7
    },
    {
        "id": "art29",
        "name": "Raibos Relic 29",
        "desc": "All Production x5.",
        "cost": 4650879,
        "type": "all_prod",
        "value": 7.800000000000001
    },
    {
        "id": "art30",
        "name": "Raibos Relic 30",
        "desc": "Energy Max x2.",
        "cost": 6046143,
        "type": "energy_max",
        "value": 4.9
    },
    {
        "id": "art31",
        "name": "Raibos Relic 31",
        "desc": "Upgrade cost scaling -0.01.",
        "cost": 7859986,
        "type": "cost_scale",
        "value": 3.01
    },
    {
        "id": "art32",
        "name": "Raibos Relic 32",
        "desc": "Click Power x10.",
        "cost": 10217983,
        "type": "click_mult",
        "value": 13.1
    },
    {
        "id": "art33",
        "name": "Raibos Relic 33",
        "desc": "Every Artifact owned gives x1.1 All Production.",
        "cost": 13283377,
        "type": "art_mult",
        "value": 4.300000000000001
    },
    {
        "id": "art34",
        "name": "Raibos Relic 34",
        "desc": "Energy Regen x2.",
        "cost": 17268391,
        "type": "energy_mult",
        "value": 5.300000000000001
    },
    {
        "id": "art35",
        "name": "Raibos Relic 35",
        "desc": "Final Multiplier x10.",
        "cost": 22448908,
        "type": "mult_total",
        "value": 13.4
    },
    {
        "id": "art36",
        "name": "Raibos Relic 36",
        "desc": "Cosmic Shard drop rate x2.",
        "cost": 29183581,
        "type": "shard_rate",
        "value": 5.5
    },
    {
        "id": "art37",
        "name": "Raibos Relic 37",
        "desc": "Global Mult x1.15 per letter suffix.",
        "cost": 37938655,
        "type": "suffix_mult",
        "value": 4.75
    },
    {
        "id": "art38",
        "name": "Raibos Relic 38",
        "desc": "Invasion attack cost -5%.",
        "cost": 49320252,
        "type": "invasion_cost",
        "value": 3.75
    },
    {
        "id": "art39",
        "name": "Raibos Relic 39",
        "desc": "Rebirth Point gain x2.",
        "cost": 64116328,
        "type": "rp_mult",
        "value": 5.800000000000001
    },
    {
        "id": "art40",
        "name": "Raibos Relic 40",
        "desc": "1% chance on click to grant production.",
        "cost": 83351226,
        "type": "click_proc",
        "value": 123.9
    },
    {
        "id": "art41",
        "name": "Raibos Relic 41",
        "desc": "All Production x5.",
        "cost": 108356594,
        "type": "all_prod",
        "value": 9
    },
    {
        "id": "art42",
        "name": "Raibos Relic 42",
        "desc": "Energy Max x2.",
        "cost": 140863572,
        "type": "energy_max",
        "value": 6.1000000000000005
    },
    {
        "id": "art43",
        "name": "Raibos Relic 43",
        "desc": "Upgrade cost scaling -0.01.",
        "cost": 183122644,
        "type": "cost_scale",
        "value": 4.21
    },
    {
        "id": "art44",
        "name": "Raibos Relic 44",
        "desc": "Click Power x10.",
        "cost": 238059437,
        "type": "click_mult",
        "value": 14.3
    },
    {
        "id": "art45",
        "name": "Raibos Relic 45",
        "desc": "Every Artifact owned gives x1.1 All Production.",
        "cost": 309477269,
        "type": "art_mult",
        "value": 5.5
    },
    {
        "id": "art46",
        "name": "Raibos Relic 46",
        "desc": "Energy Regen x2.",
        "cost": 402320450,
        "type": "energy_mult",
        "value": 6.5
    },
    {
        "id": "art47",
        "name": "Raibos Relic 47",
        "desc": "Final Multiplier x10.",
        "cost": 523016585,
        "type": "mult_total",
        "value": 14.600000000000001
    },
    {
        "id": "art48",
        "name": "Raibos Relic 48",
        "desc": "Cosmic Shard drop rate x2.",
        "cost": 679921560,
        "type": "shard_rate",
        "value": 6.7
    },
    {
        "id": "art49",
        "name": "Raibos Relic 49",
        "desc": "Global Mult x1.15 per letter suffix.",
        "cost": 883898028,
        "type": "suffix_mult",
        "value": 5.950000000000001
    },
    {
        "id": "art50",
        "name": "Raibos Relic 50",
        "desc": "Invasion attack cost -5%.",
        "cost": 1149067437,
        "type": "invasion_cost",
        "value": 4.95
    },
    {
        "id": "art51",
        "name": "Raibos Relic 51",
        "desc": "Rebirth Point gain x2.",
        "cost": 1493787668,
        "type": "rp_mult",
        "value": 7
    },
    {
        "id": "art52",
        "name": "Raibos Relic 52",
        "desc": "1% chance on click to grant production.",
        "cost": 1941923969,
        "type": "click_proc",
        "value": 125.1
    },
    {
        "id": "art53",
        "name": "Raibos Relic 53",
        "desc": "All Production x5.",
        "cost": 2524501160,
        "type": "all_prod",
        "value": 10.2
    },
    {
        "id": "art54",
        "name": "Raibos Relic 54",
        "desc": "Energy Max x2.",
        "cost": 3281851508,
        "type": "energy_max",
        "value": 7.300000000000001
    },
    {
        "id": "art55",
        "name": "Raibos Relic 55",
        "desc": "Upgrade cost scaling -0.01.",
        "cost": 4266406961,
        "type": "cost_scale",
        "value": 5.41
    },
    {
        "id": "art56",
        "name": "Raibos Relic 56",
        "desc": "Click Power x10.",
        "cost": 5546329049,
        "type": "click_mult",
        "value": 15.5
    },
    {
        "id": "art57",
        "name": "Raibos Relic 57",
        "desc": "Every Artifact owned gives x1.1 All Production.",
        "cost": 7210227764,
        "type": "art_mult",
        "value": 6.700000000000001
    },
    {
        "id": "art58",
        "name": "Raibos Relic 58",
        "desc": "Energy Regen x2.",
        "cost": 9373296093,
        "type": "energy_mult",
        "value": 7.7
    },
    {
        "id": "art59",
        "name": "Raibos Relic 59",
        "desc": "Final Multiplier x10.",
        "cost": 12185284922,
        "type": "mult_total",
        "value": 15.8
    },
    {
        "id": "art60",
        "name": "Raibos Relic 60",
        "desc": "Cosmic Shard drop rate x2.",
        "cost": 15840870398,
        "type": "shard_rate",
        "value": 7.9
    },
    {
        "id": "art61",
        "name": "Raibos Relic 61",
        "desc": "Global Mult x1.15 per letter suffix.",
        "cost": 20593131518,
        "type": "suffix_mult",
        "value": 7.15
    },
    {
        "id": "art62",
        "name": "Raibos Relic 62",
        "desc": "Invasion attack cost -5%.",
        "cost": 26771070973,
        "type": "invasion_cost",
        "value": 6.15
    },
    {
        "id": "art63",
        "name": "Raibos Relic 63",
        "desc": "Rebirth Point gain x2.",
        "cost": 34802392265,
        "type": "rp_mult",
        "value": 8.2
    },
    {
        "id": "art64",
        "name": "Raibos Relic 64",
        "desc": "1% chance on click to grant production.",
        "cost": 45243109945,
        "type": "click_proc",
        "value": 126.3
    },
    {
        "id": "art65",
        "name": "Raibos Relic 65",
        "desc": "All Production x5.",
        "cost": 58816042929,
        "type": "all_prod",
        "value": 11.4
    },
    {
        "id": "art66",
        "name": "Raibos Relic 66",
        "desc": "Energy Max x2.",
        "cost": 76460855807,
        "type": "energy_max",
        "value": 8.5
    },
    {
        "id": "art67",
        "name": "Raibos Relic 67",
        "desc": "Upgrade cost scaling -0.01.",
        "cost": 99399112550,
        "type": "cost_scale",
        "value": 6.61
    },
    {
        "id": "art68",
        "name": "Raibos Relic 68",
        "desc": "Click Power x10.",
        "cost": 129218846315,
        "type": "click_mult",
        "value": 16.7
    },
    {
        "id": "art69",
        "name": "Raibos Relic 69",
        "desc": "Every Artifact owned gives x1.1 All Production.",
        "cost": 167984500210,
        "type": "art_mult",
        "value": 7.9
    },
    {
        "id": "art70",
        "name": "Raibos Relic 70",
        "desc": "Energy Regen x2.",
        "cost": 218379850273,
        "type": "energy_mult",
        "value": 8.9
    },
    {
        "id": "art71",
        "name": "Raibos Relic 71",
        "desc": "Final Multiplier x10.",
        "cost": 283893805355,
        "type": "mult_total",
        "value": 17
    },
    {
        "id": "art72",
        "name": "Raibos Relic 72",
        "desc": "Cosmic Shard drop rate x2.",
        "cost": 369061946961,
        "type": "shard_rate",
        "value": 9.100000000000001
    },
    {
        "id": "art73",
        "name": "Raibos Relic 73",
        "desc": "Global Mult x1.15 per letter suffix.",
        "cost": 479780531050,
        "type": "suffix_mult",
        "value": 8.35
    },
    {
        "id": "art74",
        "name": "Raibos Relic 74",
        "desc": "Invasion attack cost -5%.",
        "cost": 623714690365,
        "type": "invasion_cost",
        "value": 7.3500000000000005
    },
    {
        "id": "art75",
        "name": "Raibos Relic 75",
        "desc": "Rebirth Point gain x2.",
        "cost": 810829097474,
        "type": "rp_mult",
        "value": 9.4
    },
    {
        "id": "art76",
        "name": "Raibos Relic 76",
        "desc": "1% chance on click to grant production.",
        "cost": 1054077826717,
        "type": "click_proc",
        "value": 127.5
    },
    {
        "id": "art77",
        "name": "Raibos Relic 77",
        "desc": "All Production x5.",
        "cost": 1370301174732,
        "type": "all_prod",
        "value": 12.600000000000001
    },
    {
        "id": "art78",
        "name": "Raibos Relic 78",
        "desc": "Energy Max x2.",
        "cost": 1781391527152,
        "type": "energy_max",
        "value": 9.7
    },
    {
        "id": "art79",
        "name": "Raibos Relic 79",
        "desc": "Upgrade cost scaling -0.01.",
        "cost": 2315808985298,
        "type": "cost_scale",
        "value": 7.8100000000000005
    },
    {
        "id": "art80",
        "name": "Raibos Relic 80",
        "desc": "Click Power x10.",
        "cost": 3010551680887,
        "type": "click_mult",
        "value": 17.9
    },
    {
        "id": "art81",
        "name": "Raibos Relic 81",
        "desc": "Every Artifact owned gives x1.1 All Production.",
        "cost": 3913717185153,
        "type": "art_mult",
        "value": 9.1
    },
    {
        "id": "art82",
        "name": "Raibos Relic 82",
        "desc": "Energy Regen x2.",
        "cost": 5087832340700,
        "type": "energy_mult",
        "value": 10.1
    },
    {
        "id": "art83",
        "name": "Raibos Relic 83",
        "desc": "Final Multiplier x10.",
        "cost": 6614182042910,
        "type": "mult_total",
        "value": 18.200000000000003
    },
    {
        "id": "art84",
        "name": "Raibos Relic 84",
        "desc": "Cosmic Shard drop rate x2.",
        "cost": 8598436655783,
        "type": "shard_rate",
        "value": 10.3
    },
    {
        "id": "art85",
        "name": "Raibos Relic 85",
        "desc": "Global Mult x1.15 per letter suffix.",
        "cost": 11177967652518,
        "type": "suffix_mult",
        "value": 9.55
    },
    {
        "id": "art86",
        "name": "Raibos Relic 86",
        "desc": "Invasion attack cost -5%.",
        "cost": 14531357948273,
        "type": "invasion_cost",
        "value": 8.55
    },
    {
        "id": "art87",
        "name": "Raibos Relic 87",
        "desc": "Rebirth Point gain x2.",
        "cost": 18890765332755,
        "type": "rp_mult",
        "value": 10.6
    },
    {
        "id": "art88",
        "name": "Raibos Relic 88",
        "desc": "1% chance on click to grant production.",
        "cost": 24557994932582,
        "type": "click_proc",
        "value": 128.7
    },
    {
        "id": "art89",
        "name": "Raibos Relic 89",
        "desc": "All Production x5.",
        "cost": 31925393412357,
        "type": "all_prod",
        "value": 13.8
    },
    {
        "id": "art90",
        "name": "Raibos Relic 90",
        "desc": "Energy Max x2.",
        "cost": 41503011436064,
        "type": "energy_max",
        "value": 10.9
    },
    {
        "id": "art91",
        "name": "Raibos Relic 91",
        "desc": "Upgrade cost scaling -0.01.",
        "cost": 53953914866883,
        "type": "cost_scale",
        "value": 9.01
    },
    {
        "id": "art92",
        "name": "Raibos Relic 92",
        "desc": "Click Power x10.",
        "cost": 70140089326948,
        "type": "click_mult",
        "value": 19.1
    },
    {
        "id": "art93",
        "name": "Raibos Relic 93",
        "desc": "Every Artifact owned gives x1.1 All Production.",
        "cost": 91182116125033,
        "type": "art_mult",
        "value": 10.3
    },
    {
        "id": "art94",
        "name": "Raibos Relic 94",
        "desc": "Energy Regen x2.",
        "cost": 118536750962543,
        "type": "energy_mult",
        "value": 11.3
    },
    {
        "id": "art95",
        "name": "Raibos Relic 95",
        "desc": "Final Multiplier x10.",
        "cost": 154097776251306,
        "type": "mult_total",
        "value": 19.4
    },
    {
        "id": "art96",
        "name": "Raibos Relic 96",
        "desc": "Cosmic Shard drop rate x2.",
        "cost": 200327109126698,
        "type": "shard_rate",
        "value": 11.5
    },
    {
        "id": "art97",
        "name": "Raibos Relic 97",
        "desc": "Global Mult x1.15 per letter suffix.",
        "cost": 260425241864708,
        "type": "suffix_mult",
        "value": 10.750000000000002
    },
    {
        "id": "art98",
        "name": "Raibos Relic 98",
        "desc": "Invasion attack cost -5%.",
        "cost": 338552814424121,
        "type": "invasion_cost",
        "value": 9.750000000000002
    },
    {
        "id": "art99",
        "name": "Raibos Relic 99",
        "desc": "Rebirth Point gain x2.",
        "cost": 440118658751357,
        "type": "rp_mult",
        "value": 11.8
    },
    {
        "id": "art100",
        "name": "Raibos Relic 100",
        "desc": "1% chance on click to grant production.",
        "cost": 572154256376764,
        "type": "click_proc",
        "value": 129.9
    }
];

var achievementsData = [
    { id: 'a1', title: 'Milestone 1', req: () => gameState.totalClicks >= 10 || gameState.totalRaibos >= 1000000, desc: 'Achieve massive growth milestone 1', bonus: 0.5 },
    { id: 'a2', title: 'Milestone 2', req: () => gameState.totalClicks >= 20 || gameState.totalRaibos >= 10000000, desc: 'Achieve massive growth milestone 2', bonus: 1 },
    { id: 'a3', title: 'Milestone 3', req: () => gameState.totalClicks >= 40 || gameState.totalRaibos >= 100000000, desc: 'Achieve massive growth milestone 3', bonus: 1.5 },
    { id: 'a4', title: 'Milestone 4', req: () => gameState.totalClicks >= 80 || gameState.totalRaibos >= 1000000000, desc: 'Achieve massive growth milestone 4', bonus: 2 },
    { id: 'a5', title: 'Milestone 5', req: () => gameState.totalClicks >= 160 || gameState.totalRaibos >= 10000000000, desc: 'Achieve massive growth milestone 5', bonus: 2.5 },
    { id: 'a6', title: 'Milestone 6', req: () => gameState.totalClicks >= 320 || gameState.totalRaibos >= 100000000000, desc: 'Achieve massive growth milestone 6', bonus: 3 },
    { id: 'a7', title: 'Milestone 7', req: () => gameState.totalClicks >= 640 || gameState.totalRaibos >= 1000000000000, desc: 'Achieve massive growth milestone 7', bonus: 3.5 },
    { id: 'a8', title: 'Milestone 8', req: () => gameState.totalClicks >= 1280 || gameState.totalRaibos >= 10000000000000, desc: 'Achieve massive growth milestone 8', bonus: 4 },
    { id: 'a9', title: 'Milestone 9', req: () => gameState.totalClicks >= 2560 || gameState.totalRaibos >= 100000000000000, desc: 'Achieve massive growth milestone 9', bonus: 4.5 },
    { id: 'a10', title: 'Milestone 10', req: () => gameState.totalClicks >= 5120 || gameState.totalRaibos >= 1000000000000000, desc: 'Achieve massive growth milestone 10', bonus: 5 },
    { id: 'a11', title: 'Milestone 11', req: () => gameState.totalClicks >= 10240 || gameState.totalRaibos >= 10000000000000000, desc: 'Achieve massive growth milestone 11', bonus: 5.5 },
    { id: 'a12', title: 'Milestone 12', req: () => gameState.totalClicks >= 20480 || gameState.totalRaibos >= 100000000000000000, desc: 'Achieve massive growth milestone 12', bonus: 6 },
    { id: 'a13', title: 'Milestone 13', req: () => gameState.totalClicks >= 40960 || gameState.totalRaibos >= 1000000000000000000, desc: 'Achieve massive growth milestone 13', bonus: 6.5 },
    { id: 'a14', title: 'Milestone 14', req: () => gameState.totalClicks >= 81920 || gameState.totalRaibos >= 10000000000000000000, desc: 'Achieve massive growth milestone 14', bonus: 7 },
    { id: 'a15', title: 'Milestone 15', req: () => gameState.totalClicks >= 163840 || gameState.totalRaibos >= 100000000000000000000, desc: 'Achieve massive growth milestone 15', bonus: 7.5 },
    { id: 'a16', title: 'Milestone 16', req: () => gameState.totalClicks >= 327680 || gameState.totalRaibos >= 1e+21, desc: 'Achieve massive growth milestone 16', bonus: 8 },
    { id: 'a17', title: 'Milestone 17', req: () => gameState.totalClicks >= 655360 || gameState.totalRaibos >= 1e+22, desc: 'Achieve massive growth milestone 17', bonus: 8.5 },
    { id: 'a18', title: 'Milestone 18', req: () => gameState.totalClicks >= 1310720 || gameState.totalRaibos >= 1e+23, desc: 'Achieve massive growth milestone 18', bonus: 9 },
    { id: 'a19', title: 'Milestone 19', req: () => gameState.totalClicks >= 2621440 || gameState.totalRaibos >= 1e+24, desc: 'Achieve massive growth milestone 19', bonus: 9.5 },
    { id: 'a20', title: 'Milestone 20', req: () => gameState.totalClicks >= 5242880 || gameState.totalRaibos >= 1e+25, desc: 'Achieve massive growth milestone 20', bonus: 10 },
    { id: 'a21', title: 'Milestone 21', req: () => gameState.totalClicks >= 10485760 || gameState.totalRaibos >= 1e+26, desc: 'Achieve massive growth milestone 21', bonus: 10.5 },
    { id: 'a22', title: 'Milestone 22', req: () => gameState.totalClicks >= 20971520 || gameState.totalRaibos >= 1e+27, desc: 'Achieve massive growth milestone 22', bonus: 11 },
    { id: 'a23', title: 'Milestone 23', req: () => gameState.totalClicks >= 41943040 || gameState.totalRaibos >= 1e+28, desc: 'Achieve massive growth milestone 23', bonus: 11.5 },
    { id: 'a24', title: 'Milestone 24', req: () => gameState.totalClicks >= 83886080 || gameState.totalRaibos >= 1.0000000000000001e+29, desc: 'Achieve massive growth milestone 24', bonus: 12 },
    { id: 'a25', title: 'Milestone 25', req: () => gameState.totalClicks >= 167772160 || gameState.totalRaibos >= 1e+30, desc: 'Achieve massive growth milestone 25', bonus: 12.5 },
    { id: 'a26', title: 'Milestone 26', req: () => gameState.totalClicks >= 335544320 || gameState.totalRaibos >= 1.0000000000000001e+31, desc: 'Achieve massive growth milestone 26', bonus: 13 },
    { id: 'a27', title: 'Milestone 27', req: () => gameState.totalClicks >= 671088640 || gameState.totalRaibos >= 1e+32, desc: 'Achieve massive growth milestone 27', bonus: 13.5 },
    { id: 'a28', title: 'Milestone 28', req: () => gameState.totalClicks >= 1342177280 || gameState.totalRaibos >= 1e+33, desc: 'Achieve massive growth milestone 28', bonus: 14 },
    { id: 'a29', title: 'Milestone 29', req: () => gameState.totalClicks >= 2684354560 || gameState.totalRaibos >= 1e+34, desc: 'Achieve massive growth milestone 29', bonus: 14.5 },
    { id: 'a30', title: 'Milestone 30', req: () => gameState.totalClicks >= 5368709120 || gameState.totalRaibos >= 1e+35, desc: 'Achieve massive growth milestone 30', bonus: 15 },
    { id: 'a31', title: 'Milestone 31', req: () => gameState.totalClicks >= 10737418240 || gameState.totalRaibos >= 1e+36, desc: 'Achieve massive growth milestone 31', bonus: 15.5 },
    { id: 'a32', title: 'Milestone 32', req: () => gameState.totalClicks >= 21474836480 || gameState.totalRaibos >= 1e+37, desc: 'Achieve massive growth milestone 32', bonus: 16 },
    { id: 'a33', title: 'Milestone 33', req: () => gameState.totalClicks >= 42949672960 || gameState.totalRaibos >= 1e+38, desc: 'Achieve massive growth milestone 33', bonus: 16.5 },
    { id: 'a34', title: 'Milestone 34', req: () => gameState.totalClicks >= 85899345920 || gameState.totalRaibos >= 1e+39, desc: 'Achieve massive growth milestone 34', bonus: 17 },
    { id: 'a35', title: 'Milestone 35', req: () => gameState.totalClicks >= 171798691840 || gameState.totalRaibos >= 9.999999999999999e+39, desc: 'Achieve massive growth milestone 35', bonus: 17.5 },
    { id: 'a36', title: 'Milestone 36', req: () => gameState.totalClicks >= 343597383680 || gameState.totalRaibos >= 1e+41, desc: 'Achieve massive growth milestone 36', bonus: 18 },
    { id: 'a37', title: 'Milestone 37', req: () => gameState.totalClicks >= 687194767360 || gameState.totalRaibos >= 1e+42, desc: 'Achieve massive growth milestone 37', bonus: 18.5 },
    { id: 'a38', title: 'Milestone 38', req: () => gameState.totalClicks >= 1374389534720 || gameState.totalRaibos >= 1e+43, desc: 'Achieve massive growth milestone 38', bonus: 19 },
    { id: 'a39', title: 'Milestone 39', req: () => gameState.totalClicks >= 2748779069440 || gameState.totalRaibos >= 9.999999999999999e+43, desc: 'Achieve massive growth milestone 39', bonus: 19.5 },
    { id: 'a40', title: 'Milestone 40', req: () => gameState.totalClicks >= 5497558138880 || gameState.totalRaibos >= 1e+45, desc: 'Achieve massive growth milestone 40', bonus: 20 }
];
