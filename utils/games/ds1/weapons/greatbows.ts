// Greatbow weapons data for Dark Souls 1
// This file contains all greatbow weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const greatbows: Weapon[] = [
  {
    icon: "/weapons/greatbows/dragonslayer-greatbow.png",
    name: "Dragonslayer Greatbow",
    weaponType: "greatbow",
    twoHanded: false,
    requiredTwoHanded: true,
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 20,
      dexterity: 20,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 10.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      special: {
        physical: 90,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.64,
        dexterity: 0.64,
      },
    },
    upgradePath: "special",
  },
  {
    icon: "/weapons/greatbows/gough-greatbow.png",
    name: "Gough's Greatbow",
    weaponType: "greatbow",
    twoHanded: false,
    requiredTwoHanded: true,
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 27,
      dexterity: 20,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 13.0,
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    damageByPath: {
      special: {
        physical: 85,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
    },
    scaling: {
      special: {
        strength: 0.84,
        dexterity: 0.64,
      },
    },
    upgradePath: "special",
  },
];
