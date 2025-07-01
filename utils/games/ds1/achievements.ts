// Achievement data for Dark Souls 1
// This file contains all achievement requirements and metadata

import type {
  Achievement,
  AchievementCategory,
  AllAchievements,
} from "~/types/game/ds1/achievements";

// Knight's Honor Achievement - Collect all rare weapons
const knightsHonor: Achievement = {
  id: "knights-honor",
  name: "Knight's Honor",
  description: "Acquire all rare weapons",
  icon: "i-heroicons-shield-check",
  category: "weapons",
  ngRequired: true,
  totalRequired: 50,
  requirements: [
    // Boss Weapons (from +10 weapons + boss souls)
    {
      id: "greatsword-of-artorias",
      name: "Greatsword of Artorias",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Broken Straight Sword", "Straight Sword Hilt"],
      bossSoul: "Soul of Artorias",
    },
    {
      id: "greatsword-of-artorias-cursed",
      name: "Greatsword of Artorias (Cursed)",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Dagger", "Greatsword", "Straight Sword"],
      bossSoul: "Soul of Artorias",
    },
    {
      id: "greatshield-of-artorias",
      name: "Greatshield of Artorias",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Shield"],
      bossSoul: "Soul of Artorias",
    },
    {
      id: "chaos-blade",
      name: "Chaos Blade",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Katana"],
      bossSoul: "Soul of Quelaag",
    },
    {
      id: "quelaags-fury-sword",
      name: "Quelaag's Fury Sword",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Curved Sword"],
      bossSoul: "Soul of Quelaag",
    },
    {
      id: "crystal-ring-shield",
      name: "Crystal Ring Shield",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Shield"],
      bossSoul: "Soul of the Moonlight Butterfly",
    },
    {
      id: "moonlight-butterfly-horn",
      name: "Moonlight Butterfly Horn",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Spear", "Thrusting Sword"],
      bossSoul: "Soul of the Moonlight Butterfly",
    },
    {
      id: "darkmoon-bow",
      name: "Darkmoon Bow",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Bow"],
      bossSoul: "Soul of Gwyndolin",
    },
    {
      id: "darkmoon-catalyst",
      name: "Darkmoon Catalyst",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Catalyst"],
      bossSoul: "Soul of Gwyndolin",
    },
    {
      id: "dragon-bone-fist",
      name: "Dragon Bone Fist",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Fist"],
      bossSoul: "Soul of an Iron Giant",
    },
    {
      id: "dragonslayer-spear",
      name: "Dragonslayer Spear",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Spear", "Thrusting Sword"],
      bossSoul: "Soul of Ornstein",
    },
    {
      id: "golem-axe",
      name: "Golem Axe",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Axe"],
      bossSoul: "Soul of an Iron Giant",
    },
    {
      id: "great-lord-greatsword",
      name: "Great Lord Greatsword",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Dagger", "Greatsword", "Straight Sword"],
      bossSoul: "Soul of Gwyn, Lord of Cinder",
    },
    {
      id: "lifehunt-scythe",
      name: "Lifehunt Scythe",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Halberd", "Whip"],
      bossSoul: "Soul of Priscilla",
    },
    {
      id: "smoughs-hammer",
      name: "Smough's Hammer",
      category: "boss",
      location: "Giant Blacksmith",
      ascendsFrom: ["Greathammer", "Hammer"],
      bossSoul: "Soul of Smough",
    },

    // Loot
    {
      id: "astoras-straight-sword",
      name: "Astora's Straight Sword",
      category: "loot",
      location:
        "On a corpse near the Undead Dragon in the Valley of Drakes (you will aggro it)",
    },
    {
      id: "dragon-crest-shield",
      name: "Dragon Crest Shield",
      category: "loot",
      location: "On a corpse near the Undead Dragon",
    },
    {
      id: "havels-greatshield",
      name: "Havel's Greatshield",
      category: "loot",
      location:
        "Found in Havel's room, behind an illusory wall in a fireplace in Anor Londo",
    },
    {
      id: "dragon-tooth",
      name: "Dragon Tooth",
      category: "loot",
      location: "Found in Havel's room",
    },
    {
      id: "dragonslayer-greatbow",
      name: "Dragon Tooth",
      category: "loot",
      location:
        "On a corpse in Anor Londo found by traversing the broken glass window before the O&S fogwall",
    },
    {
      id: "velkas-rapier",
      name: "Velka's Rapier",
      category: "loot",
      location: "On a corpse in Ariamis. The Annex Key is needed",
    },
    {
      id: "bloodshield",
      name: "Bloodshield",
      category: "loot",
      location: "On a corpse near the Undead Dragon in Ariamis",
    },
    {
      id: "effigy-shield",
      name: "Effigy Shield",
      category: "loot",
      location: "On a corpse in the Tomb of the Giants",
    },
    {
      id: "black-iron-greatshield",
      name: "Black Iron Greatshield",
      category: "loot",
      location: "On a corpse next to the painting of Ariamis in Anor Londo",
    },

    // Covenant Weapons
    {
      id: "gravelord-sword",
      name: "Gravelord Sword",
      category: "covenant",
      location:
        "Join the Gravelord Servant covenant by waiting in the coffin in front of the titanite demon in the catacombs. Bring an eye of death (can be found behind said demon)",
    },
    {
      id: "dark-hand-sword",
      name: "Dark Hand Sword",
      category: "covenant",
      location:
        "Join the Darkwraith covenant by retrieving the Lordvessel and killing the Four Kings without talking to Frampt; in the abyss, talk to Kaathe. It is also a rare drop from darkwraiths",
    },

    // Tail Cutoffs
    {
      id: "moonlight-greatsword",
      name: "Moonlight Greatsword",
      category: "tail",
      tail: "Seath the Scaleless",
    },
    {
      id: "drake-sword",
      name: "Drake Sword",
      category: "tail",
      tail: "Hellkite Dragon",
    },
    {
      id: "gargoyle-tail-axe",
      name: "Gargoyle Tail Axe",
      category: "tail",
      tail: "Gargoyle (Undead Parish, Anor Londo)",
    },
    {
      id: "priscillas-dagger",
      name: "Priscilla's Dagger",
      category: "tail",
      tail: "Priscilla",
    },
    {
      id: "dragon-king-greataxe",
      name: "Dragon King Greataxe",
      category: "tail",
      location: "Giant Blacksmith",
      tail: "Gaping Dragon",
    },

    // Enemy Drops
    {
      id: "black-knight-greatsword",
      name: "Black Knight Greatsword",
      category: "drop",
      dropRate: "1/5",
      location:
        "Greatsword Black Knights (Undead Parish, Kiln of the First Flame)",
    },
    {
      id: "demons-catalyst",
      name: "Demon's Catalyst",
      category: "drop",
      location: "Dropped by the Demon Firesage in the Demon Ruins",
    },
    {
      id: "izalith-catalyst",
      name: "Izalith Catalyst",
      category: "drop",
      location:
        "Dropped by the Chaos Pyromancer in Lost Izalith, in front of the Bed of Chaos boss door",
    },
    {
      id: "grant",
      name: "Grant",
      category: "drop",
      location: "Dropped by Black Phantom Paladin Leeroy in Tomb of the Giants",
    },
    {
      id: "black-knight-greataxe",
      name: "Black Knight Greataxe",
      category: "drop",
      dropRate: "1/5",
      location:
        "Greataxe Black Knights (The Catacombs, Kiln of the First Flame)",
    },
    {
      id: "black-knight-halberd",
      name: "Black Knight Halberd",
      category: "drop",
      dropRate: "1/5",
      location:
        "Halberd Black Knights (Darkroot Basin, Tomb of the Giants, Kiln of the First Flame)",
    },
    {
      id: "giants-halberd",
      name: "Giant's Halberd",
      category: "drop",
      dropRate: "1/50",
      location:
        "Dropped by Sentinels in daylight Anor Londo or sold by the Giant Blacksmith",
    },
    {
      id: "black-knight-sword",
      name: "Black Knight Sword",
      category: "drop",
      dropRate: "1/5",
      location:
        "Sword Black Knights (Undead Burg, Northern Undead Asylum, Kiln of the First Flame)",
    },
    {
      id: "black-knight-shield",
      name: "Black Knight Shield",
      category: "drop",
      dropRate: "1/20",
      location:
        "All Black Knights (Undead Parish, The Catacombs, Darkroot Basin, Tomb of the Giants, Undead Burg, Northern Undead Asylum, Kiln of the First Flame)",
    },
    {
      id: "channelers-trident",
      name: "Channeler's Trident",
      category: "drop",
      dropRate: "1/100",
      location: "The Channeler (Undead Parish, Depths, The Duke's Archives)",
    },
    {
      id: "crescent-axe",
      name: "Crescent Axe",
      category: "drop",
      location: "Dropped by or sold by Patches",
    },
    {
      id: "crest-shield",
      name: "Crest Shield",
      category: "drop",
      location: "Dropped by Oscar on the return to Undead Asylum",
    },
    {
      id: "silver-knight-straight-sword",
      name: "Silver Knight Straight Sword",
      category: "drop",
      dropRate: "1/50",
      location: "Silver Knight (Anor Londo)",
    },
    {
      id: "silver-knight-spear",
      name: "Silver Knight Spear",
      category: "drop",
      dropRate: "1/50",
      location: "Silver Knight (Anor Londo)",
    },
    {
      id: "silver-knight-shield",
      name: "Silver Knight Shield",
      category: "drop",
      dropRate: "1/100",
      location: "Silver Knight (Anor Londo)",
    },
    {
      id: "stone-greatsword",
      name: "Stone Greatsword",
      category: "drop",
      dropRate: "1/50",
      location: "Stone Guardian (Darkroot Garden)",
    },
    {
      id: "stone-greatshield",
      name: "Stone Greatshield",
      category: "drop",
      dropRate: "1/50",
      location: "Stone Guardian (Darkroot Garden)",
    },
  ],
};

// Wisdom of a Sage Achievement - Collect all sorceries
const wisdomOfASage: Achievement = {
  id: "wisdom-of-a-sage",
  name: "Wisdom of a Sage",
  description: "Acquire all sorceries",
  icon: "i-heroicons-academic-cap",
  category: "magic",
  ngRequired: true,
  totalRequired: 24,
  questNPC: "Big Hat Logan",
  requirements: [
    // Logan's Sorceries
    {
      id: "soul-arrow",
      name: "Soul Arrow",
      category: "purchase",
      price: 1000,
      logansQuest: true,
      location: [
        "Big Hat Logan (Firelink, Duke's Archives, 15+ INT Required)",
        "Griggs of Vinheim (Firelink)",
      ],
    },
    {
      id: "heavy-soul-arrow",
      name: "Heavy Soul Arrow",
      category: "purchase",
      price: 2000,
      logansQuest: true,
      location: [
        "Big Hat Logan (Firelink, Duke's Archives, 15+ INT Required)",
        "Griggs of Vinheim (Firelink)",
      ],
    },
    {
      id: "great-soul-arrow",
      name: "Great Soul Arrow",
      category: "purchase",
      logansQuest: true,
      price: 6000,
      location: [
        "Big Hat Logan (Firelink, Duke's Archives, 15+ INT Required)",
        "Griggs of Vinheim (Firelink)",
      ],
    },
    {
      id: "great-heavy-soul-arrow",
      name: "Great Heavy Soul Arrow",
      category: "purchase",
      logansQuest: true,
      price: 8000,
      location: [
        "Big Hat Logan (Firelink, Duke's Archives, 15+ INT Required)",
        "Griggs of Vinheim (Firelink)",
      ],
    },
    {
      id: "magic-weapon",
      name: "Magic Weapon",
      category: "purchase",
      price: 3000,
      logansQuest: true,
      location: [
        "Big Hat Logan (Firelink, Duke's Archives, 15+ INT Required)",
        "Griggs of Vinheim (Firelink)",
      ],
    },
    {
      id: "magic-shield",
      name: "Magic Shield",
      category: "purchase",
      price: 3000,
      logansQuest: true,
      location: [
        "Big Hat Logan (Firelink, Duke's Archives, 15+ INT Required)",
        "Griggs of Vinheim (Firelink)",
      ],
    },
    {
      id: "homing-soulmass",
      name: "Homing Soulmass",
      category: "purchase",
      price: 20000,
      logansQuest: true,
      location: "Big Hat Logan (Firelink, Duke's Archives, 15+ INT Required)",
    },
    {
      id: "soul-spear",
      name: "Soul Spear",
      category: "purchase",
      price: 40000,
      logansQuest: true,
      location: "Big Hat Logan (Firelink, Duke's Archives, 15+ INT Required)",
    },
    {
      id: "homing-crystal-soulmass",
      name: "Homings Crystal Soulmass",
      category: "purchase",
      price: 30000,
      logansQuest: true,
      location: "Big Hat Logan (Firelink, Duke's Archives, 15+ INT Required)",
    },
    {
      id: "crystal-soul-spear",
      name: "Crystal Soul Spear",
      category: "purchase",
      price: 50000,
      logansQuest: true,
      location: "Big Hat Logan (Firelink, Duke's Archives, 15+ INT Required)",
    },
    {
      id: "crystal-magic-weapon",
      name: "Crystal Magic Weapon",
      category: "purchase",
      price: 20000,
      logansQuest: true,
      location: "Big Hat Logan (Firelink, Duke's Archives, 15+ INT Required)",
    },

    // Grigg's Sorceries
    {
      id: "fall-control",
      name: "Fall Control",
      category: "purchase",
      price: 1500,
      location: "Griggs of Vinheim (Firelink)",
    },
    {
      id: "aural-decoy",
      name: "Aural Decoy",
      category: "purchase",
      price: 1000,
      location: "Griggs of Vinheim (Firelink)",
    },

    // Quest Sorceries
    {
      id: "white-dragon-breath",
      name: "White Dragon Breath",
      category: "quest",
      logansQuest: true,
      location:
        "After completing Big Hat Logan's questline, Seath the Scaleless original boss room",
    },

    // Dusk of Oolacile's Sorceries
    {
      id: "hidden-body",
      name: "Hidden Body",
      category: "purchase",
      price: 2000,
      location:
        "Dusk of Oolacile (Summon sign beside a boulder at the hydra lake)",
    },
    {
      id: "hidden-weapon",
      name: "Hidden Weapon",
      category: "purchase",
      price: 2000,
      location:
        "Dusk of Oolacile (Summon sign beside a boulder at the hydra lake)",
    },
    {
      id: "repair",
      name: "Repair",
      category: "purchase",
      price: 10000,
      location:
        "Dusk of Oolacile (Summon sign beside a boulder at the hydra lake)",
    },
    {
      id: "cast-light",
      name: "Cast Light",
      category: "purchase",
      price: 1000,
      location:
        "Dusk of Oolacile (Summon sign beside a boulder at the hydra lake)",
    },
    {
      id: "chameleon",
      name: "Chameleon",
      category: "purchase",
      price: 3000,
      location:
        "Dusk of Oolacile (Summon sign beside a boulder at the hydra lake)",
    },

    // Ingward's Sorceries
    {
      id: "resist-curse",
      name: "Resist Curse",
      category: "purchase",
      price: 5000,
      location: "Ingward (New Londo Ruins roof)",
    },

    // Loot
    {
      id: "great-magic-weapon",
      name: "Great Magic Weapon",
      category: "loot",
      location:
        "In Anor Londo, cut the chandelier chain while navigating the rafters, then pick this item up in front of the painting of Ariamis",
    },
    {
      id: "hush",
      name: "Hush",
      category: "loot",
      location: "Rickert of Vinheim (New Londo Ruins)",
    },
    {
      id: "strong-magic-shield",
      name: "Strong Magic Shield",
      category: "loot",
      location: "In a chest in the Duke's Archives",
    },
    {
      id: "remedy",
      name: "Remedy",
      category: "loot",
      location:
        "In a chest across the branch at the top of the waterwheel in Blightown",
    },
  ],
};

// Bond of a Pyromancer Achievement - Collect all pyromancies
const bondOfAPyromancer: Achievement = {
  id: "bond-of-a-pyromancer",
  name: "Bond of a Pyromancer",
  description: "Acquire all pyromancies",
  icon: "i-heroicons-fire",
  category: "pyromancy",
  ngRequired: false,
  totalRequired: 19,
  questNPC: "Quelana of Izalith",
  requirements: [
    // Laurentius' Pyromancies
    {
      id: "iron-flesh",
      name: "Iron Flesh",
      category: "purchase",
      cost: 2000,
      location: "Laurentius of the Great Swamp (Firelink)",
    },
    {
      id: "flash-sweat",
      name: "Flash Sweat",
      category: "purchase",
      cost: 2000,
      location: "Laurentius of the Great Swamp (Firelink)",
    },

    // Quelana's Pyromancies
    {
      id: "fireball",
      name: "Fireball",
      category: "purchase",
      cost: 800,
      quest: true,
      location: [
        "Laurentius of the Great Swamp (Firelink)",
        "Quelana of Izalith (Blighttown)",
      ],
    },
    {
      id: "fire-orb",
      name: "Fire Orb",
      category: "purchase",
      cost: 8000,
      quest: true,
      location: [
        "Laurentius of the Great Swamp (Firelink)",
        "Quelana of Izalith (Blighttown)",
      ],
    },
    {
      id: "combustion",
      name: "Combustion",
      category: "purchase",
      cost: 500,
      quest: true,
      location: [
        "Laurentius of the Great Swamp (Firelink)",
        "Quelana of Izalith (Blighttown)",
      ],
    },
    {
      id: "great-fireball",
      name: "Great Fireball",
      category: "purchase",
      cost: 20000,
      quest: true,
      location:
        "Quelana of Izalith (Blighttown, +10 Pyromancy Flame required, Bed of Chaos must be alive)",
    },
    {
      id: "undead-rapport",
      name: "Undead Rapport",
      category: "purchase",
      cost: 10000,
      quest: true,
      location:
        "Quelana of Izalith (Blighttown, +10 Pyromancy Flame required, Bed of Chaos must be alive)",
    },
    {
      id: "firestorm",
      name: "Firestorm",
      category: "purchase",
      cost: 30000,
      quest: true,
      location:
        "Quelana of Izalith (Blighttown, +10 Pyromancy Flame required, Bed of Chaos must be alive)",
    },
    {
      id: "fire-whip",
      name: "Fire Whip",
      category: "purchase",
      cost: 10000,
      quest: true,
      location:
        "Quelana of Izalith (Blighttown, +10 Pyromancy Flame required, Bed of Chaos must be alive)",
    },
    {
      id: "great-combustion",
      name: "Great Combustion",
      category: "purchase",
      cost: 5000,
      quest: true,
      location:
        "Quelana of Izalith (Blighttown, +10 Pyromancy Flame required, Bed of Chaos must be alive)",
    },
    {
      id: "toxic-mist",
      name: "Toxic Mist",
      category: "purchase",
      cost: 25000,
      location:
        "Eingyi (Behind an illusory wall near the second bell, must be infected with Egg Head)",
    },

    // Quest Rewards
    {
      id: "fire-tempest",
      name: "Fire Tempest",
      category: "quest",
      location:
        "Obtained from Quelana after finishing her questline or after killing her",
    },

    // Loot
    {
      id: "power-within",
      name: "Power Within",
      category: "loot",
      location: "Behind the large parasite in Blightown",
    },
    {
      id: "acid-surge",
      name: "Acid Surge",
      category: "loot",
      location:
        "On a corpse near the edge of the graveyard cliff in the Painted World",
    },
    {
      id: "fire-surge",
      name: "Fire Surge",
      category: "loot",
      location:
        "Dropped by a toxic zombie behind an illusory wall near the Bonewheels in the Painted World",
    },
    {
      id: "poison-mist",
      name: "Poison Mist",
      category: "loot",
      location:
        "On a corpse across the swamp below Blightown. Can also be bought from Eingyi for 10k",
    },
    {
      id: "chaos-fire-whip",
      name: "Chaos Fire Whip",
      category: "loot",
      location:
        "In a chest to the right of the long corridor leading to the Bed of Chaos",
    },

    // Covenant Pyromancies
    {
      id: "great-chaos-fireball",
      name: "Great Chaos Fireball",
      category: "covenant",
      location: "Obtained upon joining the Chaos Servant covenant",
    },
    {
      id: "chaos-storm",
      name: "Chaos Storm",
      category: "covenant",
      location: "Gain 2 ranks as a chaos servant by offering 30 humanity",
    },
  ],
};

// Prayer of a Maiden Achievement - Collect all miracles
const prayerOfAMaiden: Achievement = {
  id: "prayer-of-a-maiden",
  name: "Prayer of a Maiden",
  description: "Acquire all miracles",
  icon: "i-heroicons-heart",
  category: "miracles",
  ngRequired: true,
  totalRequired: 23,
  requirements: [
    // Reah's Miracles
    {
      id: "heal",
      name: "Heal",
      category: "purchase",
      cost: {
        petrus: 4000,
        reah: 1000,
      },
      location: [
        "Petrus of Thorolund (Firelink)",
        "Reah of Thorolund (Undead Parish)",
        "Patches (Firelink)",
      ],
    },
    {
      id: "great-heal-excerpt",
      name: "Great Heal Excerpt",
      category: "purchase",
      cost: {
        petrus: 10000,
        reah: 2000,
      },
      location: [
        "Petrus of Thorolund (Firelink)",
        "Reah of Thorolund (Undead Parish)",
        "Patches (Firelink)",
      ],
    },
    {
      id: "homeward",
      name: "Homeward",
      category: "purchase",
      cost: {
        petrus: 8000,
        reah: 1000,
      },
      location: [
        "Petrus of Thorolund (Firelink)",
        "Reah of Thorolund (Undead Parish)",
      ],
    },
    {
      id: "force",
      name: "Force",
      category: "purchase",
      cost: {
        petrus: 4000,
        reah: 1000,
      },
      location: [
        "Petrus of Thorolund (Firelink)",
        "Reah of Thorolund (Undead Parish)",
      ],
    },
    {
      id: "seek-guidance",
      name: "Seek Guidance",
      category: "purchase",
      cost: {
        petrus: 2000,
        reah: 500,
      },
      location: [
        "Petrus of Thorolund (Firelink)",
        "Reah of Thorolund (Undead Parish)",
      ],
    },
    {
      id: "wrath-of-the-gods",
      name: "Wrath of the Gods",
      category: "purchase",
      cost: 10000,
      location: "Rhea of Thorolund (Undead Parish)",
    },
    {
      id: "magic-barrier",
      name: "Magic Barrier",
      category: "purchase",
      cost: 6000,
      location: "Reah of Thorolund (Undead Parish)",
    },
    {
      id: "great-heal",
      name: "Great Heal",
      category: "purchase",
      cost: 10000,
      location: "Reah of Thorolund (Undead Parish)",
    },

    // Oswald of Carim's Miracles
    {
      id: "karmic-justice",
      name: "Karmic Justice",
      category: "purchase",
      cost: 40000,
      location: "Oswald of Carim (Undead Parish)",
    },

    // Quest Rewards
    {
      id: "emit-force",
      name: "Emit Force",
      category: "miracles",
      location: "Kill Reah's hollowed bodyguards in the Tomb of the Giants",
    },
    {
      id: "replenishment",
      name: "Replenishment",
      category: "miracles",
      location:
        "Help Siegmeyer in Sen's Fortress, then Anor Londo, then speak to him at Firelink",
    },

    // Loot
    {
      id: "soothing-sunlight",
      name: "Soothing Sunlight",
      category: "loot",
      location: "Dropped by a Pisaca",
    },
    {
      id: "bountiful-sunlight",
      name: "Bountiful Sunlight",
      category: "loot",
      location: "Dropped by a Picasa",
    },
    {
      id: "tranquil-walk-of-peace",
      name: "Tranquil Walk of Peace",
      category: "loot",
      location: "On a corpse in the upper floor of the Catacombs",
    },
    {
      id: "vow-of-silence",
      name: "Vow of Silence",
      category: "loot",
      location:
        "In the Painted World, on top of the tower the Annex Key is used on; guarded by multiple crow demons",
    },
    {
      id: "great-magic-barrier",
      name: "Great Magic Barrier",
      category: "loot",
      location:
        "At the second tree in Ash Lake, drop off halfway around the branch around the back into a jutting hollow log",
    },
    {
      id: "sunlight-blade",
      name: "Sunlight Blade",
      category: "loot",
      location: "Found in a chest after defeating Gwyndolin",
    },

    // Covenant Miracles
    {
      id: "lightning-spear",
      name: "Lightning Spear",
      category: "covenant",
      location: "Granted upon joining the Warriors of Sunlight covenant",
    },
    {
      id: "great-lightning-spear",
      name: "Great Lightning Spear",
      category: "covenant",
      location: "Gain 1 rank as a sunbro by offering 10 sunlight medals",
    },
    {
      id: "sunlight-spear",
      name: "Sunlight Spear",
      category: "covenant",
      location:
        "Offer the soul of Gwyn at the sunlight altar after ranking up once as a sunbro",
    },
    {
      id: "gravelord-sword-dance",
      name: "Gravelord Sword Dance",
      category: "covenant",
      location: "Granted upon joining the Gravelord Servant covenant",
    },
    {
      id: "gravelord-greatsword-dance",
      name: "Gravelord Greatsword Dance",
      category: "covenant",
      location:
        "Gain 1 rank as a gravelord servant by giving Nito 10 eyes of death",
    },
    {
      id: "darkmoon-blade",
      name: "Darkmoon Blade",
      category: "covenant",
      location:
        "Gain 1 rank in Gwyndolin's covent by offering 10 souvenirs of reprisal",
    },
  ],
};

// Achievement data organized by category
const achievementData: AllAchievements = {
  weapons: [knightsHonor],
  magic: [wisdomOfASage],
  pyromancy: [bondOfAPyromancer],
  miracles: [prayerOfAMaiden],
  covenants: [],
  bosses: [],
  exploration: [],
  multiplayer: [],
};

// Get all achievements
export const getAllAchievements = (): AllAchievements => achievementData;

// Get achievements by category
export const getAchievementsByCategory = (
  category: AchievementCategory
): Achievement[] => {
  return achievementData[category] || [];
};

// Get achievement by ID
export const getAchievementById = (id: string): Achievement | null => {
  for (const category of Object.values(achievementData)) {
    const achievement = category.find((a) => a.id === id);
    if (achievement) return achievement;
  }
  return null;
};

// Get achievements by difficulty
export const getAchievementsByDifficulty = (): Achievement[] => {
  const achievements: Achievement[] = [];
  for (const category of Object.values(achievementData)) {
    achievements.push(...category.filter((a) => a));
  }
  return achievements;
};

// Get achievement categories
export const getAchievementCategories = (): AchievementCategory[] => {
  return Object.keys(achievementData) as AchievementCategory[];
};

// Search achievements by name (partial match)
export const searchAchievements = (query: string): Achievement[] => {
  const achievements: Achievement[] = [];
  const lowerQuery = query.toLowerCase();

  for (const category of Object.values(achievementData)) {
    achievements.push(
      ...category.filter((a) => a.name.toLowerCase().includes(lowerQuery))
    );
  }

  return achievements;
};

// Get total requirements for an achievement
export const getAchievementProgress = (
  achievementId: string,
  completedRequirements: string[]
): { completed: number; total: number; percentage: number } => {
  const achievement = getAchievementById(achievementId);
  if (!achievement) {
    return { completed: 0, total: 0, percentage: 0 };
  }

  const completed = completedRequirements.length;
  const total = achievement.totalRequired;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
};

// Export individual achievements for direct access
export { knightsHonor, wisdomOfASage, bondOfAPyromancer, prayerOfAMaiden };
