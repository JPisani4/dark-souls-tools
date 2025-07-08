// Greatsword weapons data for Dark Souls 1
// This file contains all greatsword weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const greatswords: Weapon[] = [
  {
    icon: "/weapons/greatswords/claymore.png",
    name: "Claymore",
    weaponType: "greatsword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 16,
      dexterity: 10,
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
      regular: {
        physical: 103,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 226,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 185,
        magic: 0,
        fire: 0,
        lightning: 185,
      },
      raw: {
        physical: 177,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      magic: {
        physical: 115,
        magic: 126,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 154,
        magic: 164,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 105,
        magic: 127,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 142,
        magic: 154,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 133,
        magic: 0,
        fire: 133,
        lightning: 0,
      },
      chaos: {
        physical: 162,
        magic: 0,
        fire: 187,
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
    icon: "/weapons/greatswords/bastard-sword.png",
    name: "Bastard Sword",
    weaponType: "greatsword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 16,
      dexterity: 10,
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
      regular: {
        physical: 105,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 181,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 231,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 189,
        magic: 0,
        fire: 0,
        lightning: 189,
      },
      magic: {
        physical: 118,
        magic: 127,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 158,
        magic: 168,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 106,
        magic: 130,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 144,
        magic: 158,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 136,
        magic: 0,
        fire: 136,
        lightning: 0,
      },
      chaos: {
        physical: 163,
        magic: 0,
        fire: 189,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.51,
        dexterity: 0.51,
      },
      raw: {
        strength: 0.38,
        dexterity: 0.38,
      },
      crystal: {
        strength: 0.51,
        dexterity: 0.51,
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
    icon: "/weapons/greatswords/man-serpent-greatsword.png",
    name: "Man-Serpent Greatsword",
    weaponType: "greatsword",
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
        physical: 110,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 190,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 242,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 198,
        magic: 0,
        fire: 0,
        lightning: 198,
      },
      magic: {
        physical: 124,
        magic: 133,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 166,
        magic: 176,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 111,
        magic: 136,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 152,
        magic: 166,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 143,
        magic: 0,
        fire: 143,
        lightning: 0,
      },
      chaos: {
        physical: 172,
        magic: 0,
        fire: 198,
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
    icon: "/weapons/greatswords/flamberge.png",
    name: "Flamberge",
    weaponType: "greatsword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 16,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
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
      regular: {
        physical: 100,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 172,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 220,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 180,
        magic: 0,
        fire: 0,
        lightning: 180,
      },
      magic: {
        physical: 112,
        magic: 121,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 150,
        magic: 160,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 102,
        magic: 124,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 138,
        magic: 150,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 130,
        magic: 0,
        fire: 130,
        lightning: 0,
      },
      chaos: {
        physical: 156,
        magic: 0,
        fire: 181,
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
    icon: "/weapons/greatswords/stone-greatsword.png",
    name: "Stone Greatsword",
    weaponType: "greatsword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 40,
      dexterity: 10,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
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
      special: {
        physical: 148,
        magic: 100,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.6,
        dexterity: 0.55,
        intelligence: 0.15,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/greatswords/moonlight-greatsword.png",
    name: "Moonlight Greatsword",
    weaponType: "greatsword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 16,
      dexterity: 10,
      intelligence: 28,
      faith: 0,
    },
    weaponArt: true,
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
      dragon: {
        physical: 0,
        magic: 132,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      dragon: {
        intelligence: 1.36,
      },
    },
    upgradePath: "dragon",
  },
  {
    icon: "/weapons/greatswords/artorias-greatsword.png",
    name: "Greatsword of Artorias",
    weaponType: "greatsword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 24,
      dexterity: 18,
      intelligence: 20,
      faith: 20,
    },
    criticalDamage: 100,
    weight: 10.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 140,
    },
    damageByPath: {
      boss: {
        physical: 120,
        magic: 85,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        strength: 0.55,
        dexterity: 0.55,
        intelligence: 0.85,
        faith: 0.85,
      },
    },
    upgradePath: "boss",
  },
  {
    icon: "/weapons/greatswords/abyss-greatsword.png",
    name: "Abyss Greatsword",
    weaponType: "greatsword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 22,
      dexterity: 18,
      intelligence: 18,
      faith: 18,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 9.0,
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
        physical: 160,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        strength: 0.55,
        dexterity: 0.55,
      },
    },
    upgradePath: "boss",
    humanityScaling: {
      physical: [19, 26, 35, 41, 47, 53, 59, 68, 74, 80],
    },
  },
  {
    icon: "/weapons/greatswords/artorias-greatsword-cursed.png",
    name: "Greatsword of Artorias (Cursed)",
    weaponType: "greatsword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 24,
      dexterity: 18,
      intelligence: 18,
      faith: 18,
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
      boss: {
        physical: 178,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        strength: 0.6,
        dexterity: 0.6,
        intelligence: 0.6,
        faith: 0.6,
      },
    },
    upgradePath: "boss",
  },
  {
    icon: "/weapons/greatswords/great-lord-greatsword.png",
    name: "Great Lord Greatsword",
    weaponType: "greatsword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 20,
      dexterity: 10,
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
      boss: {
        physical: 256,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        strength: 0.23,
        dexterity: 0.24,
      },
    },
    upgradePath: "boss",
  },
  {
    icon: "/weapons/greatswords/crystal-greatsword.png",
    name: "Crystal Greatsword",
    weaponType: "greatsword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 20,
      dexterity: 10,
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
      crystal: {
        physical: 190,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      crystal: {
        strength: 0.51,
        dexterity: 0.51,
      },
    },
  },
  {
    icon: "/weapons/greatswords/black-knight-sword.png",
    name: "Black Knight Sword",
    weaponType: "greatsword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 20,
      dexterity: 18,
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
      special: {
        physical: 220,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.58,
        dexterity: 0.07,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/greatswords/obsidian-greatsword.png",
    name: "Obsidian Greatsword",
    weaponType: "greatsword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 20,
      dexterity: 16,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
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
        physical: 320,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    upgradePath: "dragon",
  },
];
