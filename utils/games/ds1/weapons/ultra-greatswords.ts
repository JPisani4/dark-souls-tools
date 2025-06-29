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
    damage: {
      physical: 130,
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
    damage: {
      physical: 130,
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
    damage: {
      physical: 220,
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
    damage: {
      physical: 133,
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
    damage: {
      physical: 390,
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
    upgradePath: "dragon",
  },
];
