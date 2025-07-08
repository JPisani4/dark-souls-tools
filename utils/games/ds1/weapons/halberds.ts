// Halberd weapons data for Dark Souls 1
// This file contains all halberd weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const halberds: Weapon[] = [
  {
    icon: "/weapons/halberds/halberd.png",
    name: "Halberd",
    weaponType: "halberd",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 16,
      dexterity: 12,
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
    icon: "/weapons/halberds/lucerne.png",
    name: "Lucerne",
    weaponType: "halberd",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 15,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 5.5,
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
    icon: "/weapons/halberds/scythe.png",
    name: "Scythe",
    weaponType: "halberd",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 14,
      dexterity: 12,
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
        strength: 0.15,
        dexterity: 0.72,
      },
      raw: {
        strength: 0.11,
        dexterity: 0.55,
      },
      crystal: {
        strength: 0.15,
        dexterity: 0.72,
      },
      magic: {
        strength: 0.04,
        dexterity: 0.21,
        intelligence: 0.63,
      },
      enchanted: {
        strength: 0.03,
        dexterity: 0.15,
        intelligence: 0.61,
      },
      divine: {
        strength: 0.06,
        dexterity: 0.28,
        faith: 0.62,
      },
      occult: {
        strength: 0.05,
        dexterity: 0.26,
        faith: 0.73,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/halberds/gargoyle-halberd.png",
    name: "Gargoyle's Halberd",
    weaponType: "halberd",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 16,
      dexterity: 12,
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
        physical: 126,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 198,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 253,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 207,
        magic: 0,
        fire: 0,
        lightning: 207,
      },
      magic: {
        physical: 129,
        magic: 137,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 172,
        magic: 184,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 117,
        magic: 142,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 158,
        magic: 172,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 149,
        magic: 0,
        fire: 149,
        lightning: 0,
      },
      chaos: {
        physical: 180,
        magic: 0,
        fire: 208,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.39,
        dexterity: 0.4,
      },
      raw: {
        strength: 0.3,
        dexterity: 0.3,
      },
      crystal: {
        strength: 0.39,
        dexterity: 0.4,
      },
      magic: {
        strength: 0.11,
        dexterity: 0.11,
        intelligence: 0.57,
      },
      enchanted: {
        strength: 0.08,
        dexterity: 0.08,
        intelligence: 0.55,
      },
      divine: {
        strength: 0.15,
        dexterity: 0.15,
        faith: 0.56,
      },
      occult: {
        strength: 0.14,
        dexterity: 0.14,
        faith: 0.66,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/halberds/black-knight-halberd.png",
    name: "Black Knight Halberd",
    weaponType: "halberd",
    attackType: {
      slash: true,
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
        physical: 245,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.44,
        dexterity: 0.02,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/halberds/great-scythe.png",
    name: "Great Scythe",
    weaponType: "halberd",
    attackType: {
      slash: true,
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
    icon: "/weapons/halberds/lifehunt-scythe.png",
    name: "Lifehunt Scythe",
    weaponType: "halberd",
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
      bleed: 500,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      boss: {
        physical: 180,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        strength: 0.08,
        dexterity: 0.94,
      },
    },
    upgradePath: "boss",
  },
  {
    icon: "/weapons/halberds/titanite-catch-pole.png",
    name: "Titanite Catch Pole",
    weaponType: "halberd",
    attackType: {
      regular: true,
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
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      special: {
        physical: 125,
        magic: 145,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.25,
        dexterity: 0.45,
        intelligence: 0.4,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/halberds/giant-halberd.png",
    name: "Giant's Halberd",
    weaponType: "halberd",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 36,
      dexterity: 12,
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
        physical: 140,
        magic: 0,
        fire: 0,
        lightning: 135,
      },
    },
    scaling: {
      special: {
        strength: 0.38,
        dexterity: 0.5,
      },
    },
    upgradePath: "special",
  },
];
