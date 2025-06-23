// Curved Sword weapons data for Dark Souls 1
// This file contains all curved sword weapons with their complete stats

import type { Weapon } from "~/types/game/ds1/weapons";

export const curvedSwords: Weapon[] = [
  {
    icon: "/weapons/curved-swords/scimitar.png",
    name: "Scimitar",
    weaponType: "curved-sword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 7,
      dexterity: 13,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.5,
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
    icon: "/weapons/curved-swords/falchion.png",
    name: "Falchion",
    weaponType: "curved-sword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 9,
      dexterity: 13,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 2.5,
    damage: {
      physical: 82,
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
    icon: "/weapons/curved-swords/shotel.png",
    name: "Shotel",
    weaponType: "curved-sword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 9,
      dexterity: 14,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 2.5,
    damage: {
      physical: 82,
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
    icon: "/weapons/curved-swords/painting-guardian-sword.png",
    name: "Painting Guardian Sword",
    weaponType: "curved-sword",
    attackType: {
      regular: true,
    },
    requirements: {
      strength: 7,
      dexterity: 20,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.5,
    damage: {
      physical: 76,
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
    icon: "/weapons/curved-swords/quelaags-furysword.png",
    name: "Quelaag's Furysword",
    weaponType: "curved-sword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 11,
      dexterity: 13,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 3.5,
    damage: {
      physical: 60,
      magic: 0,
      fire: 170,
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
    icon: "/weapons/curved-swords/jagged-ghost-blade.png",
    name: "Jagged Ghost Blade",
    weaponType: "curved-sword",
    attackType: {
      slash: true,
      thrust: true,
    },
    requirements: {
      strength: 7,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 1.5,
    damage: {
      physical: 155,
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
    upgradePath: "special",
  },
  {
    icon: "/weapons/curved-swords/gold-tracer.png",
    name: "Gold Tracer",
    weaponType: "curved-sword",
    attackType: {
      slash: true,
    },
    requirements: {
      strength: 9,
      dexterity: 25,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: 100,
    weight: 2.0,
    damage: {
      physical: 130,
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
    upgradePath: "special",
  },
];
