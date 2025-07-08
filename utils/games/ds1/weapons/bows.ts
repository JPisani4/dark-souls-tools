// Bow weapons data for Dark Souls 1
// This file contains all bow weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const bows: Weapon[] = [
  {
    icon: "/weapons/bows/short-bow.png",
    name: "Short Bow",
    weaponType: "bow",
    requiredTwoHanded: true,
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 10,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 0.5,
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
        physical: 31,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 54,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 68,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 114,
        magic: 0,
        fire: 0,
        lightning: 127,
      },
      magic: {
        physical: 34,
        magic: 37,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 46,
        magic: 50,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 31,
        magic: 39,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 42,
        magic: 46,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 55,
        magic: 0,
        fire: 55,
        lightning: 0,
      },
      chaos: {
        physical: 67,
        magic: 0,
        fire: 83,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.38,
        dexterity: 1.4,
      },
      raw: {
        strength: 0.29,
        dexterity: 1.05,
      },
      crystal: {
        strength: 0.38,
        dexterity: 1.4,
      },
      magic: {
        strength: 0.11,
        dexterity: 0.39,
        intelligence: 1.28,
      },
      enchanted: {
        strength: 0.08,
        dexterity: 0.28,
        intelligence: 1.25,
      },
      divine: {
        strength: 0.15,
        dexterity: 0.54,
        faith: 1.27,
      },
      occult: {
        strength: 0.14,
        dexterity: 0.5,
        faith: 1.5,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/bows/long-bow.png",
    name: "Long Bow",
    weaponType: "bow",
    requiredTwoHanded: true,
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 9,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.0,
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
        physical: 36,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 61,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 79,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 133,
        magic: 0,
        fire: 0,
        lightning: 147,
      },
      magic: {
        physical: 40,
        magic: 43,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 54,
        magic: 58,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 36,
        magic: 45,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 50,
        magic: 54,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 64,
        magic: 0,
        fire: 64,
        lightning: 0,
      },
      chaos: {
        physical: 80,
        magic: 0,
        fire: 97,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.38,
        dexterity: 1.4,
      },
      raw: {
        strength: 0.29,
        dexterity: 1.05,
      },
      crystal: {
        strength: 0.38,
        dexterity: 1.4,
      },
      magic: {
        strength: 0.11,
        dexterity: 0.39,
        intelligence: 1.28,
      },
      enchanted: {
        strength: 0.08,
        dexterity: 0.28,
        intelligence: 1.25,
      },
      divine: {
        strength: 0.15,
        dexterity: 0.54,
        faith: 1.27,
      },
      occult: {
        strength: 0.14,
        dexterity: 0.5,
        faith: 1.5,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/bows/composite-bow.png",
    name: "Composite Bow",
    weaponType: "bow",
    twoHanded: false,
    requiredTwoHanded: true,
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 11,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.0,
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
        physical: 55,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 94,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 121,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 132,
        magic: 0,
        fire: 0,
        lightning: 154,
      },
      magic: {
        physical: 61,
        magic: 67,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 82,
        magic: 88,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 55,
        magic: 67,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 76,
        magic: 82,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 82,
        magic: 0,
        fire: 82,
        lightning: 0,
      },
      chaos: {
        physical: 91,
        magic: 0,
        fire: 117,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.6,
        dexterity: 0.6,
      },
      raw: {
        strength: 0.45,
        dexterity: 0.45,
      },
      crystal: {
        strength: 0.6,
        dexterity: 0.6,
      },
      magic: {
        strength: 0.0174,
        dexterity: 0.17,
        intelligence: 0.86,
      },
      enchanted: {
        strength: 0.12,
        dexterity: 0.12,
        intelligence: 0.84,
      },
      divine: {
        strength: 0.23,
        dexterity: 0.23,
        faith: 0.86,
      },
      occult: {
        strength: 0.22,
        dexterity: 0.22,
        faith: 1.01,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/bows/black-bow-of-pharis.png",
    name: "Black Bow of Pharis",
    weaponType: "bow",
    requiredTwoHanded: true,
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 9,
      dexterity: 18,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.0,
    damageByPath: {
      regular: {
        physical: 37,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 58,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 74,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 125,
        magic: 0,
        fire: 0,
        lightning: 139,
      },
      magic: {
        physical: 39,
        magic: 42,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 52,
        magic: 54,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 34,
        magic: 42,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 46,
        magic: 52,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 61,
        magic: 0,
        fire: 61,
        lightning: 0,
      },
      chaos: {
        physical: 75,
        magic: 0,
        fire: 91,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.13,
        dexterity: 1.65,
      },
      raw: {
        strength: 0.1,
        dexterity: 1.24,
      },
      crystal: {
        strength: 0.13,
        dexterity: 1.65,
      },
      magic: {
        strength: 0.04,
        dexterity: 0.46,
        intelligence: 1.28,
      },
      enchanted: {
        strength: 0.03,
        dexterity: 0.33,
        intelligence: 1.25,
      },
      divine: {
        strength: 0.05,
        dexterity: 0.64,
        faith: 1.27,
      },
      occult: {
        strength: 0.05,
        dexterity: 0.59,
        faith: 1.5,
      },
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/bows/darkmoon-bow.png",
    name: "Darkmoon Bow",
    weaponType: "bow",
    requiredTwoHanded: true,
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 7,
      dexterity: 16,
      intelligence: 0,
      faith: 16,
    },
    criticalDamage: 100,
    weight: 1.0,
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
        physical: 85,
        magic: 85,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        strength: 0.18,
        dexterity: 0.32,
        faith: 0.5,
      },
    },
    upgradePath: "boss",
  },
];
