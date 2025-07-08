// Axe weapons data for Dark Souls 1
// This file contains all axe weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const axes: Weapon[] = [
  {
    icon: "/weapons/axes/hand-axe.png",
    name: "Hand Axe",
    weaponType: "axe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 8,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 2.0,
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
        strength: 0.6,
        dexterity: 0.3,
      },
      raw: {
        strength: 0.45,
        dexterity: 0.23,
      },
      crystal: {
        strength: 0.6,
        dexterity: 0.3,
      },
      magic: {
        strength: 0.17,
        dexterity: 0.08,
        intelligence: 0.65,
      },
      enchanted: {
        strength: 0.12,
        dexterity: 0.06,
        intelligence: 0.63,
      },
      divine: {
        strength: 0.23,
        dexterity: 0.12,
        faith: 0.64,
      },
      occult: {
        strength: 0.22,
        dexterity: 0.11,
        faith: 0.76,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/axes/battle-axe.png",
    name: "Battle Axe",
    weaponType: "axe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 12,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 4.0,
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
        physical: 95,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 163,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 209,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 171,
        magic: 0,
        fire: 0,
        lightning: 171,
      },
      magic: {
        physical: 106,
        magic: 115,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 142,
        magic: 152,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 96,
        magic: 117,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 130,
        magic: 142,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 123,
        magic: 0,
        fire: 123,
        lightning: 0,
      },
      chaos: {
        physical: 149,
        magic: 0,
        fire: 171,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.6,
        dexterity: 0.3,
      },
      raw: {
        strength: 0.45,
        dexterity: 0.23,
      },
      crystal: {
        strength: 0.6,
        dexterity: 0.3,
      },
      magic: {
        strength: 0.17,
        dexterity: 0.08,
        intelligence: 0.65,
      },
      enchanted: {
        strength: 0.12,
        dexterity: 0.06,
        intelligence: 0.63,
      },
      divine: {
        strength: 0.23,
        dexterity: 0.12,
        faith: 0.64,
      },
      occult: {
        strength: 0.22,
        dexterity: 0.11,
        faith: 0.76,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/axes/butcher-knife.png",
    name: "Butcher Knife",
    weaponType: "axe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 24,
      dexterity: 0,
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
        physical: 90,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 156,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 198,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 162,
        magic: 0,
        fire: 0,
        lightning: 162,
      },
      magic: {
        physical: 102,
        magic: 109,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 136,
        magic: 144,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 91,
        magic: 111,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 124,
        magic: 136,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 116,
        magic: 0,
        fire: 116,
        lightning: 0,
      },
      chaos: {
        physical: 140,
        magic: 0,
        fire: 162,
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
    icon: "/weapons/axes/golem-axe.png",
    name: "Golem Axe",
    weaponType: "axe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 36,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 16.0,
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
        physical: 170,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        strength: 0.74,
        dexterity: 0.16,
      },
    },
    upgradePath: "boss",
  },
  {
    icon: "/weapons/axes/crescent-axe.png",
    name: "Crescent Axe",
    weaponType: "axe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 18,
      dexterity: 12,
      intelligence: 0,
      faith: 16,
    },
    criticalDamage: 100,
    weight: 7.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 120,
    },
    damageByPath: {
      special: {
        physical: 115,
        magic: 115,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.24,
        dexterity: 0.21,
        faith: 0.82,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/axes/gargoyle-tail-axe.png",
    name: "Gargoyle Tail Axe",
    weaponType: "axe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 14,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 5.0,
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
        physical: 93,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 160,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 204,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 167,
        magic: 0,
        fire: 0,
        lightning: 167,
      },
      magic: {
        physical: 105,
        magic: 114,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 140,
        magic: 148,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 94,
        magic: 115,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 128,
        magic: 140,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 120,
        magic: 0,
        fire: 120,
        lightning: 0,
      },
      chaos: {
        physical: 145,
        magic: 0,
        fire: 167,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.22,
        dexterity: 0.7,
      },
      raw: {
        strength: 0.17,
        dexterity: 0.53,
      },
      crystal: {
        strength: 0.22,
        dexterity: 0.7,
      },
      magic: {
        strength: 0.06,
        dexterity: 0.2,
        intelligence: 0.66,
      },
      enchanted: {
        strength: 0.04,
        dexterity: 0.14,
        intelligence: 0.65,
      },
      divine: {
        strength: 0.08,
        dexterity: 0.27,
        faith: 0.66,
      },
      occult: {
        strength: 0.08,
        dexterity: 0.25,
        faith: 0.77,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
];
