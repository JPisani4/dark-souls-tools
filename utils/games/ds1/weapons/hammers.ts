// Hammer weapons data for Dark Souls 1
// This file contains all hammer weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const hammers: Weapon[] = [
  {
    icon: "/weapons/hammers/club.png",
    name: "Club",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 10,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 3.0,
    damage: {
      physical: 87,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/hammers/mace.png",
    name: "Mace",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 12,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 4.0,
    damage: {
      physical: 91,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/hammers/morning-star.png",
    name: "Morning Star",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 11,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 4.0,
    damage: {
      physical: 83,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 300,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/hammers/reinforced-club.png",
    name: "Reinforced Club",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 12,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 4.0,
    damage: {
      physical: 97,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 300,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/hammers/pickaxe.png",
    name: "Pickaxe",
    weaponType: "hammer",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 14,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 5.0,
    damage: {
      physical: 89,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/hammers/blacksmith-giant-hammer.png",
    name: "Blacksmith Giant Hammer",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 16,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 6.0,
    damage: {
      physical: 120,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/hammers/warpick.png",
    name: "Warpick",
    weaponType: "hammer",
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
    weight: 5.0,
    damage: {
      physical: 91,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/hammers/blacksmith-hammer.png",
    name: "Blacksmith Hammer",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 14,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 5.0,
    damage: {
      physical: 87,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/hammers/hammer-of-vamos.png",
    name: "Hammer of Vamos",
    weaponType: "hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 14,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 12.0,
    damage: {
      physical: 105,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath: "special",
  },
];
