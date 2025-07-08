// Straight Sword weapons data for Dark Souls 1
// This file contains all straight sword weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const straightSwords: Weapon[] = [
  {
    icon: "/weapons/straight-swords/broadsword.png",
    name: "Broadsword",
    weaponType: "straight-sword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 10,
      dexterity: 10,
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
        physical: 82,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 141,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 180,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 147,
        magic: 0,
        fire: 0,
        lightning: 147,
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
        physical: 82,
        magic: 102,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 112,
        magic: 124,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 106,
        magic: 0,
        fire: 106,
        lightning: 0,
      },
      chaos: {
        physical: 129,
        magic: 0,
        fire: 147,
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
    icon: "/weapons/straight-swords/longsword.png",
    name: "Longsword",
    weaponType: "straight-sword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 10,
      dexterity: 10,
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
    icon: "/weapons/straight-swords/shortsword.png",
    name: "Shortsword",
    weaponType: "straight-sword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 8,
      dexterity: 10,
      intelligence: 0,
      faith: 0,
    },
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
        physical: 78,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 135,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 171,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 140,
        magic: 0,
        fire: 0,
        lightning: 140,
      },
      magic: {
        physical: 88,
        magic: 94,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 118,
        magic: 124,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 79,
        magic: 96,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 108,
        magic: 118,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 101,
        magic: 0,
        fire: 101,
        lightning: 0,
      },
      chaos: {
        physical: 122,
        magic: 0,
        fire: 140,
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
    icon: "/weapons/straight-swords/astoras-straight-sword.png",
    name: "Astora's Straight Sword",
    weaponType: "straight-sword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 10,
      dexterity: 10,
      intelligence: 0,
      faith: 14,
    },
    criticalDamage: 100,
    weight: 3.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 120,
    },
    damageByPath: {
      special: {
        physical: 80,
        magic: 80,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.51,
        dexterity: 0.51,
        faith: 0.51,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/straight-swords/balder-side-sword.png",
    name: "Balder Side Sword",
    weaponType: "straight-sword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 10,
      dexterity: 14,
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
    icon: "/weapons/straight-swords/barbed-straight-sword.png",
    name: "Barbed Straight Sword",
    weaponType: "straight-sword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 10,
      dexterity: 10,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 3.0,
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
    icon: "/weapons/straight-swords/darksword.png",
    name: "Dark Sword",
    weaponType: "straight-sword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 16,
      dexterity: 16,
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
        physical: 82,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 141,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 180,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 147,
        magic: 0,
        fire: 0,
        lightning: 147,
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
        physical: 82,
        magic: 102,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 112,
        magic: 124,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 106,
        magic: 0,
        fire: 106,
        lightning: 0,
      },
      chaos: {
        physical: 129,
        magic: 0,
        fire: 147,
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
    icon: "/weapons/straight-swords/sunlight-straight-sword.png",
    name: "Sunlight Straight Sword",
    weaponType: "straight-sword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 12,
      dexterity: 12,
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
        physical: 82,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 141,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 180,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 147,
        magic: 0,
        fire: 0,
        lightning: 147,
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
        physical: 82,
        magic: 102,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 112,
        magic: 124,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 106,
        magic: 0,
        fire: 106,
        lightning: 0,
      },
      chaos: {
        physical: 129,
        magic: 0,
        fire: 147,
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
    icon: "/weapons/straight-swords/crystal-straight-sword.png",
    name: "Crystal Straight Sword",
    weaponType: "straight-sword",
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
      crystal: {
        physical: 150,
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
    icon: "/weapons/straight-swords/silver-knight-straight-sword.png",
    name: "Silver Knight Straight Sword",
    weaponType: "straight-sword",
    attackType: {
      regular: true,
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
      divine: 0,
    },
    damageByPath: {
      special: {
        physical: 175,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.08,
        dexterity: 0.52,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/straight-swords/drake-sword.png",
    name: "Drake Sword",
    weaponType: "straight-sword",
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
      dragon: {
        physical: 200,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    upgradePath: "dragon",
  },
  {
    icon: "/weapons/straight-swords/broken-straight-sword.png",
    name: "Broken Straight Sword",
    weaponType: "straight-sword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 8,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
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
        physical: 40,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 69,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 88,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 72,
        magic: 0,
        fire: 0,
        lightning: 72,
      },
      magic: {
        physical: 45,
        magic: 49,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 60,
        magic: 64,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 40,
        magic: 49,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 54,
        magic: 60,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 52,
        magic: 0,
        fire: 52,
        lightning: 0,
      },
      chaos: {
        physical: 63,
        magic: 0,
        fire: 73,
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
    icon: "/weapons/straight-swords/straight-sword-hilt.png",
    name: "Straight Sword Hilt",
    weaponType: "straight-sword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 6,
      dexterity: 6,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.0,
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
        physical: 20,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      raw: {
        physical: 34,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      crystal: {
        physical: 44,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      lightning: {
        physical: 36,
        magic: 0,
        fire: 0,
        lightning: 36,
      },
      magic: {
        physical: 22,
        magic: 24,
        fire: 0,
        lightning: 0,
      },
      enchanted: {
        physical: 30,
        magic: 32,
        fire: 0,
        lightning: 0,
      },
      divine: {
        physical: 21,
        magic: 25,
        fire: 0,
        lightning: 0,
      },
      occult: {
        physical: 28,
        magic: 30,
        fire: 0,
        lightning: 0,
      },
      fire: {
        physical: 26,
        magic: 0,
        fire: 26,
        lightning: 0,
      },
      chaos: {
        physical: 32,
        magic: 0,
        fire: 36,
        lightning: 0,
      },
    },
    scaling: {
      regular: {
        strength: 0.08,
        dexterity: 0.07,
      },
      raw: {
        strength: 0.06,
        dexterity: 0.06,
      },
      crystal: {
        strength: 0.08,
        dexterity: 0.07,
      },
      magic: {
        strength: 0.03,
        dexterity: 0.02,
        intelligence: 0.11,
      },
      enchanted: {
        strength: 0.01,
        dexterity: 0.01,
        intelligence: 0.11,
      },
      divine: {
        strength: 0.03,
        dexterity: 0.03,
        faith: 0.11,
      },
      occult: {
        strength: 0.03,
        dexterity: 0.03,
        faith: 0.13,
      },
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
];
