// Bow weapons data for Dark Souls 1
// This file contains all bow weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const bows: Weapon[] = [
  {
    icon: "/weapons/bows/short-bow.png",
    name: "Short Bow",
    weaponType: "bow",
    requiredTwoHanded: true,
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 10,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 0.5,
    damage: {
      physical: 31,
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
    icon: "/weapons/bows/longbow.png",
    name: "Longbow",
    weaponType: "bow",
    requiredTwoHanded: true,
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 9,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.0,
    damage: {
      physical: 36,
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
    icon: "/weapons/bows/composite-bow.png",
    name: "Composite Bow",
    weaponType: "bow",
    twoHanded: false,
    requiredTwoHanded: true,
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 11,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.0,
    damage: {
      physical: 55,
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
    icon: "/weapons/bows/black-bow-of-pharis.png",
    name: "Black Bow of Pharis",
    weaponType: "bow",
    requiredTwoHanded: true,
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 9,
      dexterity: 18,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.0,
    damage: {
      physical: 34,
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
    icon: "/weapons/bows/darkmoon-bow.png",
    name: "Darkmoon Bow",
    weaponType: "bow",
    requiredTwoHanded: true,
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 7,
      dexterity: 16,
      intelligence: 0,
      faith: 16,
    },
    criticalDamage: 100,
    weight: 1.0,
    damage: {
      physical: 80,
      magic: 80,
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
    upgradePath: "boss",
  },
];
