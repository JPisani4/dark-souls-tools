// Dagger weapons data for Dark Souls 1
// This file contains all dagger weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const daggers: Weapon[] = [
  {
    icon: "/weapons/daggers/dagger.png",
    name: "Dagger",
    weaponType: "dagger",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 5,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 131,
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
        physical: 56,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 96,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 123,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 100,
        magic: 0,
        fire: 0,
        lightning: 100,
      },
      magic: {
        physical: 63,
        magic: 69,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 84,
        magic: 90,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 57,
        magic: 69,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 76,
        magic: 84,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 72,
        magic: 0,
        fire: 72,
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
    icon: "/weapons/daggers/bandit-knife.png",
    name: "Bandit's Knife",
    weaponType: "dagger",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 6,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 147,
    weight: 1.0,
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
        physical: 56,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 96,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 123,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 100,
        magic: 0,
        fire: 0,
        lightning: 100,
      },
      magic: {
        physical: 63,
        magic: 69,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 84,
        magic: 90,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 57,
        magic: 69,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 76,
        magic: 84,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 72,
        magic: 0,
        fire: 72,
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
    icon: "/weapons/daggers/parrying-dagger.png",
    name: "Parrying Dagger",
    weaponType: "dagger",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 5,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 131,
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
        physical: 54,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 93,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 118,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 97,
        magic: 0,
        fire: 0,
        lightning: 97,
      },
      magic: {
        physical: 61,
        magic: 66,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 82,
        magic: 86,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 54,
        magic: 67,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 74,
        magic: 82,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 70,
        magic: 0,
        fire: 70,
        lightning: 0,
      },
      chaos: {
        physical: 84,
        magic: 0,
        fire: 99,
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
    icon: "/weapons/daggers/ghost-blade.png",
    name: "Ghost Blade",
    weaponType: "dagger",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 5,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 127,
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
      special: {
        physical: 110,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.12,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/daggers/priscillas-dagger.png",
    name: "Priscilla's Dagger",
    weaponType: "dagger",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 6,
      dexterity: 20,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.0,
    auxillaryDamage: {
      bleed: 500,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 110,
      divine: 0,
    },
    damageByPath: {
      dragon: {
        physical: 80,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      dragon: {
        dexterity: 1.22,
      },
    },
    upgradePath: "dragon",
  },
  {
    icon: "/weapons/daggers/dark-silver-tracer.png",
    name: "Dark Silver Tracer",
    weaponType: "dagger",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 6,
      dexterity: 25,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 160,
    weight: 1.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 360,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      special: {
        physical: 75,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.1,
        dexterity: 1.45,
      },
    },
    upgradePath: "special",
  },
];
