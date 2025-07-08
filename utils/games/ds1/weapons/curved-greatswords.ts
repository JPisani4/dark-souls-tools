// Curved Greatsword weapons data for Dark Souls 1
// This file contains all curved greatsword weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const curvedGreatswords: Weapon[] = [
  {
    icon: "/weapons/curved-greatswords/murakumo.png",
    name: "Murakumo",
    weaponType: "curved-greatsword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 28,
      dexterity: 13,
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
        physical: 113,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 195,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 248,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 203,
        magic: 0,
        fire: 0,
        lightning: 203,
      },
      magic: {
        physical: 127,
        magic: 138,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 170,
        magic: 180,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 114,
        magic: 139,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 156,
        magic: 170,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 146,
        magic: 0,
        fire: 146,
        lightning: 0,
      },
      chaos: {
        physical: 178,
        magic: 0,
        fire: 203,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.13,
        dexterity: 0.85,
      },
      raw: {
        strength: 0.1,
        dexterity: 0.64,
      },
      crystal: {
        strength: 0.13,
        dexterity: 0.85,
      },
      magic: {
        strength: 0.04,
        dexterity: 0.24,
        intelligence: 0.71,
      },
      enchanted: {
        strength: 0.03,
        dexterity: 0.17,
        intelligence: 0.69,
      },
      divine: {
        strength: 0.05,
        dexterity: 0.33,
        faith: 0.7,
      },
      occult: {
        strength: 0.05,
        dexterity: 0.31,
        faith: 0.82,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/curved-greatswords/gravelord-sword.png",
    name: "Gravelord Sword",
    weaponType: "curved-greatsword",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 24,
      dexterity: 13,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 10.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 333,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      boss: {
        physical: 265,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        strength: 0.13,
        dexterity: 0.13,
      },
    },
    upgradePath: "boss",
  },
  {
    icon: "/weapons/curved-greatswords/server.png",
    name: "Server",
    weaponType: "curved-greatsword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 24,
      dexterity: 13,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 10.0,
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
        physical: 107,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 184,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 235,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 192,
        magic: 0,
        fire: 0,
        lightning: 192,
      },
      magic: {
        physical: 120,
        magic: 130,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 160,
        magic: 172,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 108,
        magic: 132,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 148,
        magic: 160,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 139,
        magic: 0,
        fire: 139,
        lightning: 0,
      },
      chaos: {
        physical: 167,
        magic: 0,
        fire: 192,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.15,
        dexterity: 0.72,
      },
      raw: {
        strength: 0.11,
        dexterity: 0.55,
      },
      crystal: {
        strength: 0.15,
        dexterity: 0.72,
      },
      magic: {
        strength: 0.04,
        dexterity: 0.21,
        intelligence: 0.63,
      },
      enchanted: {
        strength: 0.03,
        dexterity: 0.15,
        intelligence: 0.61,
      },
      divine: {
        strength: 0.06,
        dexterity: 0.28,
        faith: 0.62,
      },
      occult: {
        strength: 0.05,
        dexterity: 0.26,
        faith: 0.73,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
];
