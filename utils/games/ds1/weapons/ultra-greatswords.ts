// Ultra Greatsword weapons data for Dark Souls 1
// This file contains all ultra greatsword weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const ultraGreatswords: Weapon[] = [
  {
    icon: "/weapons/ultra-greatswords/zweihander.png",
    name: "Zweihander",
    weaponType: "ultra-greatsword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 24,
      dexterity: 10,
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
        physical: 130,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 225,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 286,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 234,
        magic: 0,
        fire: 0,
        lightning: 234,
      },
      magic: {
        physical: 147,
        magic: 159,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 196,
        magic: 208,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 132,
        magic: 160,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 178,
        magic: 196,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 169,
        magic: 0,
        fire: 169,
        lightning: 0,
      },
      chaos: {
        physical: 203,
        magic: 0,
        fire: 235,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.6,
        dexterity: 0.26,
      },
      raw: {
        strength: 0.45,
        dexterity: 0.19,
      },
      crystal: {
        strength: 0.6,
        dexterity: 0.26,
      },
      magic: {
        strength: 0.17,
        dexterity: 0.07,
        intelligence: 0.62,
      },
      enchanted: {
        strength: 0.13,
        dexterity: 0.05,
        intelligence: 0.6,
      },
      divine: {
        strength: 0.23,
        dexterity: 0.1,
        faith: 0.61,
      },
      occult: {
        strength: 0.22,
        dexterity: 0.09,
        faith: 0.72,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/ultra-greatswords/greatsword.png",
    name: "Greatsword",
    weaponType: "ultra-greatsword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 28,
      dexterity: 10,
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
      regular: {
        physical: 130,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 225,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 286,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 234,
        magic: 0,
        fire: 0,
        lightning: 234,
      },
      magic: {
        physical: 147,
        magic: 159,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 196,
        magic: 208,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 132,
        magic: 160,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 178,
        magic: 196,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 169,
        magic: 0,
        fire: 169,
        lightning: 0,
      },
      chaos: {
        physical: 203,
        magic: 0,
        fire: 235,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.6,
        dexterity: 0.26,
      },
      raw: {
        strength: 0.45,
        dexterity: 0.19,
      },
      crystal: {
        strength: 0.6,
        dexterity: 0.26,
      },
      magic: {
        strength: 0.17,
        dexterity: 0.07,
        intelligence: 0.62,
      },
      enchanted: {
        strength: 0.13,
        dexterity: 0.05,
        intelligence: 0.6,
      },
      divine: {
        strength: 0.23,
        dexterity: 0.1,
        faith: 0.61,
      },
      occult: {
        strength: 0.22,
        dexterity: 0.09,
        faith: 0.72,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/ultra-greatswords/black-knight-greatsword.png",
    name: "Black Knight Greatsword",
    weaponType: "ultra-greatsword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 32,
      dexterity: 18,
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
      special: {
        physical: 220,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.9,
        dexterity: 0.05,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/ultra-greatswords/demon-great-machete.png",
    name: "Demon Great Machete",
    weaponType: "ultra-greatsword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 40,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 18.0,
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
        physical: 133,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 229,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 292,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 239,
        magic: 0,
        fire: 0,
        lightning: 239,
      },
      magic: {
        physical: 150,
        magic: 162,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 200,
        magic: 212,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 135,
        magic: 165,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 182,
        magic: 200,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 172,
        magic: 0,
        fire: 172,
        lightning: 0,
      },
      chaos: {
        physical: 208,
        magic: 0,
        fire: 241,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.9,
      },
      raw: {
        strength: 0.68,
      },
      crystal: {
        strength: 0.9,
      },
      magic: {
        strength: 0.25,
        intelligence: 0.65,
      },
      enchanted: {
        strength: 0.18,
        intelligence: 0.63,
      },
      divine: {
        strength: 0.35,
        faith: 0.64,
      },
      occult: {
        strength: 0.33,
        faith: 0.76,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/ultra-greatswords/dragon-greatsword.png",
    name: "Dragon Greatsword",
    weaponType: "ultra-greatsword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 50,
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
      dragon: {
        physical: 390,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    upgradePath: "dragon",
  },
];
