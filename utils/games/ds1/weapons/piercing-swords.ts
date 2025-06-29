// Thrusting Sword weapons data for Dark Souls 1
// This file contains all thrusting sword weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const thrustingSwords: Weapon[] = [
  {
    icon: "/weapons/thrusting-swords/rapier.png",
    name: "Rapier",
    weaponType: "thrusting-sword",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 7,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 110,
    weight: 1.5,
    damage: {
      physical: 73,
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
    icon: "/weapons/thrusting-swords/estoc.png",
    name: "Estoc",
    weaponType: "thrusting-sword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 10,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 3.0,
    damage: {
      physical: 75,
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
    icon: "/weapons/thrusting-swords/ricards-rapier.png",
    name: "Ricard's Rapier",
    weaponType: "thrusting-sword",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 8,
      dexterity: 20,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 2.0,
    damage: {
      physical: 70,
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
    icon: "/weapons/thrusting-swords/velkas-rapier.png",
    name: "Velka's Rapier",
    weaponType: "thrusting-sword",
    attackType: {
      regular: true,
      thrust: true,
    },
    requirements: {
      strength: 8,
      dexterity: 16,
      intelligence: 16,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 2.0,
    damage: {
      physical: 62,
      magic: 104,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 110,
      divine: 0,
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/thrusting-swords/mail-breaker.png",
    name: "Mail Breaker",
    weaponType: "thrusting-sword",
    attackType: {
      thrust: true,
    },
    requirements: {
      strength: 5,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 120,
    weight: 0.5,
    damage: {
      physical: 57,
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
