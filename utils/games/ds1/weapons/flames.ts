// Talisman weapons data for Dark Souls 1
// This file contains all talisman weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const talismans: Weapon[] = [
  {
    icon: "/weapons/flames/pyromancy-flame.png",
    name: "Pyromancy Flame",
    weaponType: "flame",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 4,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 0,
    weight: 0,
    damage: {
      physical: 0,
      magic: 0,
      fire: 40,
      lightning: 0,
      magicAdjust: 100,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
  },
  {
    icon: "/weapons/flames/ascended-pyromancy-flame.png",
    name: "Ascended Pyromancy Flame",
    weaponType: "flame",
    attackType: {
      strike: true,
    },
    requirements: {
      strength: 4,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 0,
    weight: 0,
    damage: {
      physical: 0,
      magic: 0,
      fire: 60,
      lightning: 0,
      magicAdjust: 196,
    },
    auxillaryDamage: {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
  },
];
