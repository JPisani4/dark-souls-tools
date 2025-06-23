// Curved Greatsword weapons data for Dark Souls 1
// This file contains all curved greatsword weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const curvedGreatswords: Weapon[] = [
  {
    icon: "/weapons/curved-greatswords/murakumo.png",
    name: "Murakumo",
    weaponType: "curved-greatsword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 28,
      dexterity: 13,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 12.0,
    damage: {
      physical: 113,
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
    icon: "/weapons/curved-greatswords/gravelord-sword.png",
    name: "Gravelord Sword",
    weaponType: "curved-greatsword",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 24,
      dexterity: 13,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 10.0,
    damage: {
      physical: 265,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 333,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath: "boss",
  },
  {
    icon: "/weapons/curved-greatswords/server.png",
    name: "Server",
    weaponType: "curved-greatsword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 24,
      dexterity: 13,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 10.0,
    damage: {
      physical: 107,
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
];
