// Great Hammer weapons data for Dark Souls 1
// This file contains all great hammer weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const greatHammers: Weapon[] = [
  {
    icon: "/weapons/great-hammers/great-club.png",
    name: "Great Club",
    weaponType: "great-hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 28,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 12.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      regular: {
        physical: 135,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 232,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 297,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 243,
        magic: 0,
        fire: 0,
        lightning: 243,
      },
      magic: {
        physical: 151,
        magic: 165,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 202,
        magic: 216,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 136,
        magic: 166,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 186,
        magic: 202,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 175,
        magic: 0,
        fire: 175,
        lightning: 0,
      },
      chaos: {
        physical: 212,
        magic: 0,
        fire: 244,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.88,
      },
      raw: {
        strength: 0.66,
      },
      crystal: {
        strength: 0.88,
      },
      magic: {
        strength: 0.25,
        intelligence: 0.63,
      },
      enchanted: {
        strength: 0.18,
        intelligence: 0.62,
      },
      divine: {
        strength: 0.34,
        faith: 0.63,
      },
      occult: {
        strength: 0.32,
        faith: 0.74,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/great-hammers/large-club.png",
    name: "Large Club",
    weaponType: "great-hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 26,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 11.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 180,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      regular: {
        physical: 120,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 207,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 264,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 216,
        magic: 0,
        fire: 0,
        lightning: 216,
      },
      magic: {
        physical: 135,
        magic: 147,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 180,
        magic: 192,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 121,
        magic: 148,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 164,
        magic: 180,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 156,
        magic: 0,
        fire: 156,
        lightning: 0,
      },
      chaos: {
        physical: 189,
        magic: 0,
        fire: 217,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 1.03,
      },
      raw: {
        strength: 0.78,
      },
      crystal: {
        strength: 1.03,
      },
      magic: {
        strength: 0.29,
        intelligence: 0.74,
      },
      enchanted: {
        strength: 0.2,
        intelligence: 0.72,
      },
      divine: {
        strength: 0.39,
        faith: 0.74,
      },
      occult: {
        strength: 0.37,
        faith: 0.87,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/great-hammers/demons-great-hammer.png",
    name: "Demon's Great Hammer",
    weaponType: "great-hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 46,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 22.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      regular: {
        physical: 138,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 238,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 303,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 248,
        magic: 0,
        fire: 0,
        lightning: 248,
      },
      magic: {
        physical: 156,
        magic: 168,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 208,
        magic: 220,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 139,
        magic: 171,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 190,
        magic: 208,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 179,
        magic: 0,
        fire: 179,
        lightning: 0,
      },
      chaos: {
        physical: 216,
        magic: 0,
        fire: 248,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.81,
      },
      raw: {
        strength: 0.6,
      },
      crystal: {
        strength: 0.81,
      },
      magic: {
        strength: 0.23,
        intelligence: 0.58,
      },
      enchanted: {
        strength: 0.16,
        intelligence: 0.57,
      },
      divine: {
        strength: 0.31,
        faith: 0.58,
      },
      occult: {
        strength: 0.29,
        faith: 0.68,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/great-hammers/dragon-tooth.png",
    name: "Dragon Tooth",
    weaponType: "great-hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 40,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 18.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      dragon: {
        physical: 290,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      dragon: {
        strength: 0.35,
      },
    },
    upgradePath: "dragon",
  },
  {
    icon: "/weapons/great-hammers/smoughs-hammer.png",
    name: "Smough's Hammer",
    weaponType: "great-hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 58,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 28.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      boss: {
        physical: 300,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        strength: 0.5,
      },
    },
    upgradePath: "boss",
  },
  {
    icon: "/weapons/great-hammers/grant.png",
    name: "Grant",
    weaponType: "great-hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 50,
      dexterity: 0,
      intelligence: 0,
      faith: 30,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 24.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 130,
    },
    damageByPath: {
      special: {
        physical: 130,
        magic: 130,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.84,
        faith: 1.16,
      },
    },
    upgradePath: "special",
  },
];
