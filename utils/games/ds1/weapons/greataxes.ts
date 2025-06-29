// Greataxe weapons data for Dark Souls 1
// This file contains all greataxe weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const greataxes: Weapon[] = [
  {
    icon: "/weapons/greataxes/greataxe.png",
    name: "Greataxe",
    weaponType: "greataxe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 32,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 14.0,
    damage: {
      physical: 140,
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
    icon: "/weapons/greataxes/demons-greataxe.png",
    name: "Demon's Greataxe",
    weaponType: "greataxe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 46,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 22.0,
    damage: {
      physical: 114,
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
    icon: "/weapons/greataxes/dragon-king-greataxe.png",
    name: "Dragon King Greataxe",
    weaponType: "greataxe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 50,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 24.0,
    damage: {
      physical: 380,
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
  {
    icon: "/weapons/greataxes/black-knight-greataxe.png",
    name: "Black Knight Greataxe",
    weaponType: "greataxe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 36,
      dexterity: 18,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 16.0,
    damage: {
      physical: 229,
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
    icon: "/weapons/greataxes/stone-greataxe.png",
    name: "Stone Greataxe",
    weaponType: "greataxe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 48,
      dexterity: 10,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 24.0,
    damage: {
      physical: 190,
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
