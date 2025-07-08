// Curved Sword weapons data for Dark Souls 1
// This file contains all curved sword weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const curvedSwords: Weapon[] = [
  {
    icon: "/weapons/curved-swords/scimitar.png",
    name: "Scimitar",
    weaponType: "curved-sword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 7,
      dexterity: 13,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.5,
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
        physical: 80,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 138,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 176,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 144,
        magic: 0,
        fire: 0,
        lightning: 144,
      },
      magic: {
        physical: 90,
        magic: 97,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 120,
        magic: 128,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 81,
        magic: 99,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 110,
        magic: 120,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 104,
        magic: 0,
        fire: 104,
        lightning: 0,
      },
      chaos: {
        physical: 126,
        magic: 0,
        fire: 144,
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
    icon: "/weapons/curved-swords/falchion.png",
    name: "Falchion",
    weaponType: "curved-sword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 9,
      dexterity: 13,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 2.5,
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
        physical: 82,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 141,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 180,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 147,
        magic: 0,
        fire: 0,
        lightning: 147,
      },
      magic: {
        physical: 93,
        magic: 100,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 124,
        magic: 132,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 82,
        magic: 102,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 112,
        magic: 124,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 106,
        magic: 0,
        fire: 106,
        lightning: 0,
      },
      chaos: {
        physical: 129,
        magic: 0,
        fire: 147,
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
    icon: "/weapons/curved-swords/shotel.png",
    name: "Shotel",
    weaponType: "curved-sword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 9,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 2.5,
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
        physical: 82,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 141,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 180,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 147,
        magic: 0,
        fire: 0,
        lightning: 147,
      },
      magic: {
        physical: 93,
        magic: 100,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 124,
        magic: 132,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 82,
        magic: 102,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 112,
        magic: 124,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 106,
        magic: 0,
        fire: 106,
        lightning: 0,
      },
      chaos: {
        physical: 129,
        magic: 0,
        fire: 147,
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
  {
    icon: "/weapons/curved-swords/painting-guardian-sword.png",
    name: "Painting Guardian Sword",
    weaponType: "curved-sword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 7,
      dexterity: 20,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.5,
    auxillaryDamage: {
      bleed: 300,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      regular: {
        physical: 76,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 130,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 167,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 136,
        magic: 0,
        fire: 0,
        lightning: 136,
      },
      magic: {
        physical: 85,
        magic: 93,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 114,
        magic: 122,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 76,
        magic: 94,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 104,
        magic: 114,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 98,
        magic: 0,
        fire: 98,
        lightning: 0,
      },
      chaos: {
        physical: 118,
        magic: 0,
        fire: 136,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.09,
        dexterity: 1.09,
      },
      raw: {
        strength: 0.07,
        dexterity: 0.81,
      },
      crystal: {
        strength: 0.09,
        dexterity: 1.09,
      },
      magic: {
        strength: 0.03,
        dexterity: 0.3,
        intelligence: 0.85,
      },
      enchanted: {
        strength: 0.02,
        dexterity: 0.22,
        intelligence: 0.83,
      },
      divine: {
        strength: 0.03,
        dexterity: 0.42,
        faith: 0.84,
      },
      occult: {
        strength: 0.03,
        dexterity: 0.39,
        faith: 0.99,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/curved-swords/quelaags-furysword.png",
    name: "Quelaag's Furysword",
    weaponType: "curved-sword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 11,
      dexterity: 13,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 3.5,
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
        physical: 60,
        magic: 0,
        fire: 170,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        strength: 0.08,
        dexterity: 0.94,
      },
    },
    upgradePath: "boss",
    humanityScaling: {
      physical: [2, 5, 7, 10, 12, 15, 17, 20, 22, 25],
      fire: [13, 20, 27, 31, 35, 39, 43, 48, 52, 56],
    },
  },
  {
    icon: "/weapons/curved-swords/jagged-ghost-blade.png",
    name: "Jagged Ghost Blade",
    weaponType: "curved-sword",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 7,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 1.5,
    auxillaryDamage: {
      bleed: 300,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      special: {
        physical: 155,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.13,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/curved-swords/gold-tracer.png",
    name: "Gold Tracer",
    weaponType: "curved-sword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 9,
      dexterity: 25,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 2.0,
    auxillaryDamage: {
      bleed: 300,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      special: {
        physical: 130,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.1,
        dexterity: 1.06,
      },
    },
    upgradePath: "special",
  },
];
