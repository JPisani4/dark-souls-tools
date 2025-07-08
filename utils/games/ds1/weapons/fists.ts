// Fist weapons data for Dark Souls 1
// This file contains all fist weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const fists: Weapon[] = [
  {
    icon: "/weapons/fists/caestus.png",
    name: "Caestus",
    weaponType: "fist",
    twoHanded: false,
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 5,
      dexterity: 8,
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
        physical: 66,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 145,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 118,
        magic: 0,
        fire: 0,
        lightning: 118,
      },
      raw: {
        physical: 114,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      magic: {
        physical: 75,
        magic: 81,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 100,
        magic: 106,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 67,
        magic: 82,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 90,
        magic: 100,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 85,
        magic: 0,
        fire: 85,
        lightning: 0,
      },
      chaos: {
        physical: 102,
        magic: 0,
        fire: 118,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.51,
        dexterity: 0.51,
      },
      crystal: {
        strength: 0.51,
        dexterity: 0.51,
      },
      raw: {
        strength: 0.38,
        dexterity: 0.38,
      },
      magic: {
        strength: 0.14,
        dexterity: 0.14,
        intelligence: 0.73,
      },
      enchanted: {
        strength: 0.1,
        dexterity: 0.1,
        intelligence: 0.72,
      },
      divine: {
        strength: 0.2,
        dexterity: 0.2,
        faith: 0.73,
      },
      occult: {
        strength: 0.18,
        dexterity: 0.18,
        faith: 0.86,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/fists/claw.png",
    name: "Claw",
    weaponType: "fist",
    twoHanded: false,
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 6,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
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
        physical: 72,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 124,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 158,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 129,
        magic: 0,
        fire: 0,
        lightning: 129,
      },
      magic: {
        physical: 81,
        magic: 87,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 108,
        magic: 114,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 72,
        magic: 88,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 100,
        magic: 108,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 93,
        magic: 0,
        fire: 93,
        lightning: 0,
      },
      chaos: {
        physical: 113,
        magic: 0,
        fire: 129,
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
    icon: "/weapons/fists/dragon-bone-fist.png",
    name: "Dragon Bone Fist",
    weaponType: "fist",
    twoHanded: false,
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 20,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 8.0,
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
        physical: 95,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      dragon: {
        strength: 1.2,
      },
    },
    upgradePath: "dragon",
  },
  {
    icon: "/weapons/fists/dark-hand.png",
    name: "Dark Hand",
    weaponType: "fist",
    twoHanded: false,
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 120,
    weight: 0.5,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 130,
      divine: 0,
    },
    damageByPath: {
      regular: {
        physical: 200,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
  },
];
