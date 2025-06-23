// Dagger weapons data for Dark Souls 1
// This file contains all dagger weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const daggers: Weapon[] = [
  {
    icon: "/weapons/daggers/dagger.png",
    name: "Dagger",
    weaponType: "dagger",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 5,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 131,
    weight: 0.5,
    damage: {
      physical: 56,
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
    icon: "/weapons/daggers/bandit-knife.png",
    name: "Bandit's Knife",
    weaponType: "dagger",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 6,
      dexterity: 12,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 147,
    weight: 1.0,
    damage: {
      physical: 56,
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
    icon: "/weapons/daggers/parrying-dagger.png",
    name: "Parrying Dagger",
    weaponType: "dagger",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 5,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 131,
    weight: 0.5,
    damage: {
      physical: 54,
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
    icon: "/weapons/daggers/ghost-blade.png",
    name: "Ghost Blade",
    weaponType: "dagger",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 5,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 127,
    weight: 0.5,
    damage: {
      physical: 110,
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
    icon: "/weapons/daggers/priscillas-dagger.png",
    name: "Priscilla's Dagger",
    weaponType: "dagger",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 6,
      dexterity: 20,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.0,
    damage: {
      physical: 80,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 500,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 110,
      divine: 0,
    },
    upgradePath: "boss",
  },
  {
    icon: "/weapons/daggers/dark-silver-tracer.png",
    name: "Dark Silver Tracer",
    weaponType: "dagger",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 6,
      dexterity: 25,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.0,
    damage: {
      physical: 80,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 360,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath: "special",
  },
];
