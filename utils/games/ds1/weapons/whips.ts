// Whip weapons data for Dark Souls 1
// This file contains all whip weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const whips: Weapon[] = [
  {
    icon: "/weapons/whips/whip.png",
    name: "Whip",
    weaponType: "whip",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 7,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.5,
    damage: {
      physical: 80,
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
    icon: "/weapons/whips/notched-whip.png",
    name: "Notched Whip",
    weaponType: "whip",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 8,
      dexterity: 16,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 2.0,
    damage: {
      physical: 76,
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
    icon: "/weapons/whips/guardian-tail.png",
    name: "Guardian Tail",
    weaponType: "whip",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 15,
      dexterity: 10,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 5.0,
    damage: {
      physical: 84,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 176,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
];
