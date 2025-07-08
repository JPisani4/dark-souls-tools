// Katana weapons data for Dark Souls 1
// This file contains all katana weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const katanas: Weapon[] = [
  {
    icon: "/weapons/katanas/uchigatana.png",
    name: "Uchigatana",
    weaponType: "katana",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 14,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 5.0,
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
    icon: "/weapons/katanas/washing-pole.png",
    name: "Washing Pole",
    weaponType: "katana",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 20,
      dexterity: 16,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 8.0,
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
        strength: 0.38,
        dexterity: 0.5,
      },
      raw: {
        strength: 0.29,
        dexterity: 0.38,
      },
      crystal: {
        strength: 0.38,
        dexterity: 0.5,
      },
      magic: {
        strength: 0.11,
        dexterity: 0.14,
        intelligence: 0.63,
      },
      enchanted: {
        strength: 0.08,
        dexterity: 0.1,
        intelligence: 0.62,
      },
      divine: {
        strength: 0.15,
        dexterity: 0.19,
        faith: 0.63,
      },
      occult: {
        strength: 0.14,
        dexterity: 0.18,
        faith: 0.74,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/katanas/chaos-blade.png",
    name: "Chaos Blade",
    weaponType: "katana",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 16,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 6.0,
    auxillaryDamage: {
      bleed: 300,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      boss: {
        physical: 144,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        dexterity: 0.85,
      },
    },
    upgradePath: "boss",
    humanityScaling: {
      physical: [20, 30, 40, 46, 53, 59, 65, 71, 78, 84],
    },
  },
  {
    icon: "/weapons/katanas/iaito.png",
    name: "Iaito",
    weaponType: "katana",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 14,
      dexterity: 20,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 5.0,
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
        physical: 88,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 151,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 193,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 158,
        magic: 0,
        fire: 0,
        lightning: 158,
      },
      magic: {
        physical: 99,
        magic: 108,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 132,
        magic: 140,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 88,
        magic: 109,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 120,
        magic: 132,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 114,
        magic: 0,
        fire: 114,
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
];
