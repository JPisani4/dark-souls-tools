// Spear weapons data for Dark Souls 1
// This file contains all spear weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const spears: Weapon[] = [
  {
    icon: "/weapons/spears/spear.png",
    name: "Spear",
    weaponType: "spear",
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
    icon: "/weapons/spears/winged-spear.png",
    name: "Winged Spear",
    weaponType: "spear",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 13,
      dexterity: 15,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 4.5,
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
        physical: 86,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 148,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 189,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 154,
        magic: 0,
        fire: 0,
        lightning: 154,
      },
      magic: {
        physical: 97,
        magic: 105,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 130,
        magic: 138,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 87,
        magic: 106,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 118,
        magic: 130,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 111,
        magic: 0,
        fire: 111,
        lightning: 0,
      },
      chaos: {
        physical: 135,
        magic: 0,
        fire: 156,
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
    icon: "/weapons/spears/partizan.png",
    name: "Partizan",
    weaponType: "spear",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 13,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 4.5,
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
    icon: "/weapons/spears/demons-spear.png",
    name: "Demon's Spear",
    weaponType: "spear",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 12,
      dexterity: 10,
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
      boss: {
        physical: 100,
        magic: 0,
        fire: 0,
        lightning: 120,
      },
    },
    scaling: {
      boss: {
        strength: 0.6,
        dexterity: 0.6,
      },
    },
    upgradePath: "boss",
  },
  {
    icon: "/weapons/spears/pike.png",
    name: "Pike",
    weaponType: "spear",
    attackType: {
      thrust: true,
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
        physical: 86,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 148,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 189,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 154,
        magic: 0,
        fire: 0,
        lightning: 154,
      },
      magic: {
        physical: 97,
        magic: 105,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 130,
        magic: 138,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 87,
        magic: 106,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 118,
        magic: 130,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 111,
        magic: 0,
        fire: 111,
        lightning: 0,
      },
      chaos: {
        physical: 135,
        magic: 0,
        fire: 156,
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
    icon: "/weapons/spears/silver-knight-spear.png",
    name: "Silver Knight Spear",
    weaponType: "spear",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 16,
      dexterity: 22,
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
      divine: 110,
    },
    damageByPath: {
      special: {
        physical: 163,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.04,
        dexterity: 0.6,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/spears/moonlight-butterfly-horn.png",
    name: "Moonlight Butterfly Horn",
    weaponType: "spear",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 12,
      dexterity: 0,
      intelligence: 14,
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
      boss: {
        physical: 0,
        magic: 120,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        intelligence: 1.0,
      },
    },
    upgradePath: "boss",
  },
  {
    icon: "/weapons/spears/dragonslayer-spear.png",
    name: "Dragonslayer Spear",
    weaponType: "spear",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 24,
      dexterity: 24,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
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
        physical: 95,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      boss: {
        strength: 0.6,
        dexterity: 1.0,
        faith: 1.0,
      },
    },
    upgradePath: "boss",
  },
  {
    icon: "/weapons/spears/four-pronged-plow.png",
    name: "Four-Pronged Plow",
    weaponType: "spear",
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
        physical: 118,
        magic: 0,
        fire: 135,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.4,
        dexterity: 0.72,
      },
      raw: {
        strength: 0.3,
        dexterity: 0.54,
      },
      crystal: {
        strength: 0.4,
        dexterity: 0.72,
      },
      magic: {
        strength: 0.11,
        dexterity: 0.2,
        intelligence: 0.81,
      },
      enchanted: {
        strength: 0.08,
        dexterity: 0.14,
        intelligence: 0.79,
      },
      divine: {
        strength: 0.15,
        dexterity: 0.28,
        faith: 0.8,
      },
      occult: {
        strength: 0.14,
        dexterity: 0.26,
        faith: 0.94,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/spears/channeler-trident.png",
    name: "Channeler's Trident",
    weaponType: "spear",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 16,
      dexterity: 16,
      intelligence: 24,
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
        physical: 70,
        magic: 115,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.11,
        dexterity: 0.55,
        intelligence: 0.88,
      },
    },
    upgradePath: "special",
  },
];
