// Hammer weapons data for Dark Souls 1
// This file contains all hammer weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const hammers: Weapon[] = [
  {
    icon: "/weapons/hammers/club.png",
    name: "Club",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 10,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 3.0,
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
        physical: 87,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 150,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 174,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 148,
        magic: 0,
        fire: 0,
        lightning: 148,
      },
      magic: {
        physical: 97,
        magic: 106,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 117,
        magic: 126,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 88,
        magic: 108,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 111,
        magic: 120,
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
        physical: 129,
        magic: 0,
        fire: 150,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 1.1,
      },
      raw: {
        strength: 0.82,
      },
      crystal: {
        strength: 1.1,
      },
      magic: {
        strength: 0.31,
        intelligence: 0.79,
      },
      enchanted: {
        strength: 0.22,
        intelligence: 0.77,
      },
      divine: {
        strength: 0.42,
        faith: 0.79,
      },
      occult: {
        strength: 0.39,
        faith: 0.92,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/hammers/mace.png",
    name: "Mace",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 12,
      dexterity: 0,
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
        physical: 91,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 157,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 200,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 163,
        magic: 0,
        fire: 0,
        lightning: 163,
      },
      magic: {
        physical: 102,
        magic: 111,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 136,
        magic: 146,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 91,
        magic: 112,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 126,
        magic: 136,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 118,
        magic: 0,
        fire: 118,
        lightning: 0,
      },
      chaos: {
        physical: 142,
        magic: 0,
        fire: 163,
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
    icon: "/weapons/hammers/morning-star.png",
    name: "Morning Star",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 11,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 4.0,
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
        physical: 83,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 142,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 182,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 149,
        magic: 0,
        fire: 0,
        lightning: 149,
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
        physical: 84,
        magic: 102,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 114,
        magic: 124,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 107,
        magic: 0,
        fire: 107,
        lightning: 0,
      },
      chaos: {
        physical: 131,
        magic: 0,
        fire: 149,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.75,
      },
      raw: {
        strength: 0.56,
      },
      crystal: {
        strength: 0.75,
      },
      magic: {
        strength: 0.21,
        intelligence: 0.54,
      },
      enchanted: {
        strength: 0.14,
        intelligence: 0.53,
      },
      divine: {
        strength: 0.29,
        faith: 0.54,
      },
      occult: {
        strength: 0.27,
        faith: 0.63,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/hammers/reinforced-club.png",
    name: "Reinforced Club",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 12,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 4.0,
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
        physical: 97,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 168,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 213,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 174,
        magic: 0,
        fire: 0,
        lightning: 174,
      },
      magic: {
        physical: 109,
        magic: 118,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 146,
        magic: 156,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 97,
        magic: 120,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 134,
        magic: 146,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 126,
        magic: 0,
        fire: 126,
        lightning: 0,
      },
      chaos: {
        physical: 153,
        magic: 0,
        fire: 174,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.75,
      },
      raw: {
        strength: 0.56,
      },
      crystal: {
        strength: 0.75,
      },
      magic: {
        strength: 0.21,
        intelligence: 0.54,
      },
      enchanted: {
        strength: 0.14,
        intelligence: 0.53,
      },
      divine: {
        strength: 0.29,
        faith: 0.54,
      },
      occult: {
        strength: 0.27,
        faith: 0.63,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/hammers/pickaxe.png",
    name: "Pickaxe",
    weaponType: "hammer",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 14,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
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
        physical: 89,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 153,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 195,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 160,
        magic: 0,
        fire: 0,
        lightning: 160,
      },
      magic: {
        physical: 100,
        magic: 108,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 134,
        magic: 142,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 90,
        magic: 109,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 122,
        magic: 134,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 115,
        magic: 0,
        fire: 115,
        lightning: 0,
      },
      chaos: {
        physical: 138,
        magic: 0,
        fire: 160,
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
    icon: "/weapons/hammers/blacksmith-giant-hammer.png",
    name: "Blacksmith Giant Hammer",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 16,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 6.0,
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
        physical: 120,
        magic: 0,
        fire: 0,
        lightning: 200,
      },
    },
    scaling: {
      special: {
        strength: 0.35,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/hammers/warpick.png",
    name: "Warpick",
    weaponType: "hammer",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 11,
      dexterity: 10,
      intelligence: 0,
      faith: 0,
    },
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
      regular: {
        physical: 91,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 157,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 200,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 163,
        magic: 0,
        fire: 0,
        lightning: 163,
      },
      magic: {
        physical: 102,
        magic: 111,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 136,
        magic: 146,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 91,
        magic: 112,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 126,
        magic: 136,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 118,
        magic: 0,
        fire: 118,
        lightning: 0,
      },
      chaos: {
        physical: 142,
        magic: 0,
        fire: 163,
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
    icon: "/weapons/hammers/blacksmith-hammer.png",
    name: "Blacksmith Hammer",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 14,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
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
        physical: 87,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 150,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 191,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 156,
        magic: 0,
        fire: 0,
        lightning: 156,
      },
      magic: {
        physical: 97,
        magic: 106,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 130,
        magic: 140,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 88,
        magic: 108,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 120,
        magic: 130,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 113,
        magic: 0,
        fire: 113,
        lightning: 0,
      },
      chaos: {
        physical: 136,
        magic: 0,
        fire: 158,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.75,
      },
      raw: {
        strength: 0.56,
      },
      crystal: {
        strength: 0.75,
      },
      magic: {
        strength: 0.21,
        intelligence: 0.54,
      },
      enchanted: {
        strength: 0.14,
        intelligence: 0.53,
      },
      divine: {
        strength: 0.29,
        faith: 0.54,
      },
      occult: {
        strength: 0.27,
        faith: 0.63,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/hammers/hammer-of-vamos.png",
    name: "Hammer of Vamos",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 14,
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
      special: {
        physical: 115,
        magic: 0,
        fire: 64,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.75,
      },
    },
    upgradePath: "special",
  },
];
