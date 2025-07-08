// Whip weapons data for Dark Souls 1
// This file contains all whip weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const whips: Weapon[] = [
  {
    icon: "/weapons/whips/whip.png",
    name: "Whip",
    weaponType: "whip",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 7,
      dexterity: 14,
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
        dexterity: 0.85,
      },
      raw: {
        dexterity: 0.64,
      },
      crystal: {
        dexterity: 0.85,
      },
      magic: {
        dexterity: 0.23,
        intelligence: 0.61,
      },
      enchanted: {
        dexterity: 0.16,
        intelligence: 0.6,
      },
      divine: {
        dexterity: 0.32,
        faith: 0.61,
      },
      occult: {
        dexterity: 0.3,
        faith: 0.71,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/whips/notched-whip.png",
    name: "Notched Whip",
    weaponType: "whip",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 8,
      dexterity: 16,
      intelligence: 0,
      faith: 0,
    },
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
        dexterity: 0.85,
      },
      raw: {
        dexterity: 0.64,
      },
      crystal: {
        dexterity: 0.85,
      },
      magic: {
        dexterity: 0.23,
        intelligence: 0.61,
      },
      enchanted: {
        dexterity: 0.16,
        intelligence: 0.6,
      },
      divine: {
        dexterity: 0.32,
        faith: 0.61,
      },
      occult: {
        dexterity: 0.3,
        faith: 0.71,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/whips/guardian-tail.png",
    name: "Guardian Tail",
    weaponType: "whip",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 15,
      dexterity: 10,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 5.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 176,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      regular: {
        physical: 84,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 145,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 184,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 151,
        magic: 0,
        fire: 0,
        lightning: 151,
      },
      magic: {
        physical: 94,
        magic: 102,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 126,
        magic: 134,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 85,
        magic: 103,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 116,
        magic: 126,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 109,
        magic: 0,
        fire: 109,
        lightning: 0,
      },
      chaos: {
        physical: 133,
        magic: 0,
        fire: 151,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        dexterity: 0.6,
      },
      raw: {
        dexterity: 0.45,
      },
      crystal: {
        dexterity: 0.6,
      },
      magic: {
        dexterity: 0.17,
        intelligence: 0.43,
      },
      enchanted: {
        dexterity: 0.12,
        intelligence: 0.42,
      },
      divine: {
        dexterity: 0.23,
        faith: 0.43,
      },
      occult: {
        dexterity: 0.22,
        faith: 0.5,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
];
