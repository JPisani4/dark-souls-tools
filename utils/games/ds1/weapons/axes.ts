// Axe weapons data for Dark Souls 1
// This file contains all axe weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const axes: Weapon[] = [
  {
    icon: "/weapons/axes/hand-axe.png",
    name: "Hand Axe",
    weaponType: "axe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 8,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 2.0,
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
    icon: "/weapons/axes/battle-axe.png",
    name: "Battle Axe",
    weaponType: "axe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 12,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 4.0,
    damage: {
      physical: 95,
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
    icon: "/weapons/axes/butcher-knife.png",
    name: "Butcher Knife",
    weaponType: "axe",
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
    damage: {
      physical: 90,
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
    icon: "/weapons/axes/golem-axe.png",
    name: "Golem Axe",
    weaponType: "axe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 36,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 16.0,
    damage: {
      physical: 170,
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
    upgradePath: "boss",
  },
  {
    icon: "/weapons/axes/crescent-axe.png",
    name: "Crescent Axe",
    weaponType: "axe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 18,
      dexterity: 12,
      intelligence: 0,
      faith: 16,
    },
    criticalDamage: 100,
    weight: 7.0,
    damage: {
      physical: 115,
      magic: 115,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 120,
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/axes/gargoyle-tail-axe.png",
    name: "Gargoyle Tail Axe",
    weaponType: "axe",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 14,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 5.0,
    damage: {
      physical: 93,
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
