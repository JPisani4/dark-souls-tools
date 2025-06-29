// Great Hammer weapons data for Dark Souls 1
// This file contains all great hammer weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const greatHammers: Weapon[] = [
  {
    icon: "/weapons/great-hammers/great-club.png",
    name: "Great Club",
    weaponType: "great-hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 28,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 12.0,
    damage: {
      physical: 135,
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
    icon: "/weapons/great-hammers/large-club.png",
    name: "Large Club",
    weaponType: "great-hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 26,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 11.0,
    damage: {
      physical: 120,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 180,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath:
      "regular,raw,crystal,enchanted,chaos,fire,lightning,magic,divine,occult",
  },
  {
    icon: "/weapons/great-hammers/demons-great-hammer.png",
    name: "Demon's Great Hammer",
    weaponType: "great-hammer",
    attackType: {
      strike: true,
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
      physical: 138,
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
    icon: "/weapons/great-hammers/dragon-tooth.png",
    name: "Dragon Tooth",
    weaponType: "great-hammer",
    attackType: {
      strike: true,
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
      physical: 290,
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
    icon: "/weapons/great-hammers/smoughs-hammer.png",
    name: "Smough's Hammer",
    weaponType: "great-hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 58,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 28.0,
    damage: {
      physical: 300,
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
    icon: "/weapons/great-hammers/grant.png",
    name: "Grant",
    weaponType: "great-hammer",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 50,
      dexterity: 0,
      intelligence: 0,
      faith: 30,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 24.0,
    damage: {
      physical: 130,
      magic: 130,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 130,
    },
    upgradePath: "special",
  },
];
