// Katana weapons data for Dark Souls 1
// This file contains all katana weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const katanas: Weapon[] = [
  {
    icon: "/weapons/katanas/uchigatana.png",
    name: "Uchigatana",
    weaponType: "katana",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 14,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 5.0,
    damage: {
      physical: 90,
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
    icon: "/weapons/katanas/washing-pole.png",
    name: "Washing Pole",
    weaponType: "katana",
    attackType: {
      slash: true,
      thrust: true,
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
      physical: 90,
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
    icon: "/weapons/katanas/chaos-blade.png",
    name: "Chaos Blade",
    weaponType: "katana",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 16,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    weaponArt: true,
    criticalDamage: 100,
    weight: 6.0,
    damage: {
      physical: 133,
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
    upgradePath: "boss",
  },
  {
    icon: "/weapons/katanas/iaito.png",
    name: "Iaito",
    weaponType: "katana",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 14,
      dexterity: 20,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 5.0,
    damage: {
      physical: 88,
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
];
