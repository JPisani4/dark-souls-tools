// Greataxe weapons data for Dark Souls 1
// This file contains all greataxe weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const greataxes: Weapon[] = [
  {
    icon: "/weapons/greataxes/greataxe.png",
    name: "Greataxe",
    weaponType: "greataxe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 32,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 14.0,
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
        physical: 140,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 241,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 308,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 252,
        magic: 0,
        fire: 0,
        lightning: 252,
      },
      magic: {
        physical: 157,
        magic: 171,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 210,
        magic: 224,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 142,
        magic: 174,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 192,
        magic: 210,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 182,
        magic: 0,
        fire: 182,
        lightning: 0,
      },
      chaos: {
        physical: 219,
        magic: 0,
        fire: 252,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.68,
        dexterity: 0.11,
      },
      raw: {
        strength: 0.52,
        dexterity: 0.08,
      },
      crystal: {
        strength: 0.68,
        dexterity: 0.11,
      },
      magic: {
        strength: 0.19,
        dexterity: 0.03,
        intelligence: 0.57,
      },
      enchanted: {
        strength: 0.14,
        dexterity: 0.02,
        intelligence: 0.55,
      },
      divine: {
        strength: 0.27,
        dexterity: 0.04,
        faith: 0.56,
      },
      occult: {
        strength: 0.24,
        dexterity: 0.04,
        faith: 0.56,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/greataxes/demons-greataxe.png",
    name: "Demon's Greataxe",
    weaponType: "greataxe",
    attackType: {
      regular: true,
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
        physical: 114,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 196,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 250,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 205,
        magic: 0,
        fire: 0,
        lightning: 205,
      },
      magic: {
        physical: 129,
        magic: 139,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 172,
        magic: 182,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 115,
        magic: 141,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 156,
        magic: 172,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 148,
        magic: 0,
        fire: 148,
        lightning: 0,
      },
      chaos: {
        physical: 180,
        magic: 0,
        fire: 205,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 1.25,
      },
      raw: {
        strength: 0.94,
      },
      crystal: {
        strength: 1.25,
      },
      magic: {
        strength: 0.35,
        intelligence: 0.9,
      },
      enchanted: {
        strength: 0.24,
        intelligence: 0.88,
      },
      divine: {
        strength: 0.48,
        faith: 0.89,
      },
      occult: {
        strength: 0.45,
        faith: 1.05,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/greataxes/dragon-king-greataxe.png",
    name: "Dragon King Greataxe",
    weaponType: "greataxe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 50,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
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
      divine: 0,
    },
    damageByPath: {
      dragon: {
        physical: 380,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    upgradePath: "dragon",
  },
  {
    icon: "/weapons/greataxes/black-knight-greataxe.png",
    name: "Black Knight Greataxe",
    weaponType: "greataxe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 36,
      dexterity: 18,
      intelligence: 0,
      faith: 0,
    },
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
      special: {
        physical: 229,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.9,
        dexterity: 0.04,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/greataxes/stone-greataxe.png",
    name: "Stone Greataxe",
    weaponType: "greataxe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 48,
      dexterity: 10,
      intelligence: 0,
      faith: 0,
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
      divine: 0,
    },
    damageByPath: {
      special: {
        physical: 190,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.96,
        dexterity: 0.1,
      },
    },
    upgradePath: "special",
  },
];
