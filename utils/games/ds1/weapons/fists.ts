// Fist weapons data for Dark Souls 1
// This file contains all fist weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const fists: Weapon[] = [
  {
    icon: "/weapons/fists/caestus.png",
    name: "Caestus",
    weaponType: "fist",
    twoHanded: false,
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 5,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 0.5,
    damage: {
      physical: 66,
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
    icon: "/weapons/fists/claws.png",
    name: "Claws",
    weaponType: "fist",
    twoHanded: false,
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 6,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.0,
    damage: {
      physical: 72,
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
    icon: "/weapons/fists/dragon-bone-fist.png",
    name: "Dragon Bone Fist",
    weaponType: "fist",
    twoHanded: false,
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 20,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 8.0,
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
    upgradePath: "dragon",
  },
  {
    icon: "/weapons/fists/dark-hand.png",
    name: "Dark Hand",
    weaponType: "fist",
    twoHanded: false,
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 120,
    weight: 0.5,
    damage: {
      physical: 200,
      magic: 0,
      fire: 0,
      lightning: 0,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 130,
      divine: 0,
    },
  },
];
