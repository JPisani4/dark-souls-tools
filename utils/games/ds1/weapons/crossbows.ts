// Crossbow weapons data for Dark Souls 1
// This file contains all crossbow weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const crossbows: Weapon[] = [
  {
    icon: "/weapons/crossbows/light-crossbow.png",
    name: "Light Crossbow",
    weaponType: "crossbow",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 10,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 3.0,
    damage: {
      physical: 50,
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
    upgradePath: "regular,crystal,fire,lightning,magic,divine",
  },
  {
    icon: "/weapons/crossbows/heavy-crossbow.png",
    name: "Heavy Crossbow",
    weaponType: "crossbow",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 14,
      dexterity: 8,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 5.0,
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
    upgradePath: "regular,crystal,fire,lightning,magic,divine",
  },
  {
    icon: "/weapons/crossbows/sniper-crossbow.png",
    name: "Sniper Crossbow",
    weaponType: "crossbow",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 20,
      dexterity: 16,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 8.0,
    damage: {
      physical: 52,
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
    upgradePath: "regular,crystal,fire,lightning,magic,divine",
  },
  {
    icon: "/weapons/crossbows/avelyn.png",
    name: "Avelyn",
    weaponType: "crossbow",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 16,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 6.0,
    damage: {
      physical: 37,
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
    upgradePath: "regular,crystal,fire,lightning,magic,divine",
  },
];
