// Thrusting Sword weapons data for Dark Souls 1
// This file contains all thrusting sword weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const thrustingSwords: Weapon[] = [
  {
    icon: "/weapons/thrusting-swords/rapier.png",
    name: "Rapier",
    weaponType: "thrusting-sword",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 7,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 110,
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
        physical: 73,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 126,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 160,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 131,
        magic: 0,
        fire: 0,
        lightning: 131,
      },
      magic: {
        physical: 82,
        magic: 88,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 110,
        magic: 116,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 73,
        magic: 90,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 100,
        magic: 110,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 94,
        magic: 0,
        fire: 94,
        lightning: 0,
      },
      chaos: {
        physical: 113,
        magic: 0,
        fire: 131,
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
  {
    icon: "/weapons/thrusting-swords/estoc.png",
    name: "Estoc",
    weaponType: "thrusting-sword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 10,
      dexterity: 12,
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
        physical: 75,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 129,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 165,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 135,
        magic: 0,
        fire: 0,
        lightning: 135,
      },
      magic: {
        physical: 84,
        magic: 91,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 112,
        magic: 120,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 76,
        magic: 93,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 104,
        magic: 112,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 97,
        magic: 0,
        fire: 97,
        lightning: 0,
      },
      chaos: {
        physical: 117,
        magic: 0,
        fire: 135,
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
  {
    icon: "/weapons/thrusting-swords/ricards-rapier.png",
    name: "Ricard's Rapier",
    weaponType: "thrusting-sword",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 8,
      dexterity: 20,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
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
        physical: 77,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 121,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 154,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 126,
        magic: 0,
        fire: 0,
        lightning: 126,
      },
      magic: {
        physical: 79,
        magic: 85,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 106,
        magic: 112,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 70,
        magic: 87,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 96,
        magic: 106,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 91,
        magic: 0,
        fire: 91,
        lightning: 0,
      },
      chaos: {
        physical: 109,
        magic: 0,
        fire: 127,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.06,
        dexterity: 0.85,
      },
      raw: {
        strength: 0.04,
        dexterity: 0.64,
      },
      crystal: {
        strength: 0.06,
        dexterity: 0.85,
      },
      magic: {
        strength: 0.02,
        dexterity: 0.23,
        intelligence: 0.66,
      },
      enchanted: {
        strength: 0.01,
        dexterity: 0.17,
        intelligence: 0.64,
      },
      divine: {
        strength: 0.02,
        dexterity: 0.33,
        faith: 0.65,
      },
      occult: {
        strength: 0.02,
        dexterity: 0.31,
        faith: 0.76,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/thrusting-swords/velkas-rapier.png",
    name: "Velka's Rapier",
    weaponType: "thrusting-sword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 8,
      dexterity: 16,
      intelligence: 16,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 2.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 110,
      divine: 0,
    },
    damageByPath: {
      special: {
        physical: 62,
        magic: 104,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.05,
        dexterity: 0.53,
        intelligence: 0.97,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/thrusting-swords/mail-breaker.png",
    name: "Mail Breaker",
    weaponType: "thrusting-sword",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 5,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 120,
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
        physical: 57,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 99,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 125,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 102,
        magic: 0,
        fire: 0,
        lightning: 102,
      },
      magic: {
        physical: 64,
        magic: 69,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 86,
        magic: 92,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 57,
        magic: 70,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 78,
        magic: 86,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 74,
        magic: 0,
        fire: 74,
        lightning: 0,
      },
      chaos: {
        physical: 88,
        magic: 0,
        fire: 102,
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
