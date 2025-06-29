import type { Ring } from "~/types/game/ds1/rings";

export const offense: Ring[] = [
  {
    icon: "/rings/offensive/red-tearstone-ring.png",
    name: "Red Tearstone Ring",
    ringType: "offensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        attackPower: 50,
      },
    },
    description: "Increases attack power by 50% when HP is below 20%.",
    location: "Undead Burg",
    weight: 0,
  },
  {
    icon: "/rings/offensive/leo-ring.png",
    name: "Leo Ring",
    ringType: "offensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        counterDamage: 40,
      },
    },
    description: "Increases counter damage with thrusting weapons by 40%.",
    location: "Ornstein in Anor Londo",
    weight: 0,
  },
  {
    icon: "/rings/offensive/hornet-ring.png",
    name: "Hornet Ring",
    ringType: "offensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        criticalDamage: 30,
      },
    },
    description: "Increases critical hit damage by 30%.",
    location: "Sif in Darkroot Garden",
    weight: 0,
  },
  {
    icon: "/rings/offensive/bellowing-dragoncrest-ring.png",
    name: "Bellowing Dragoncrest Ring",
    ringType: "offensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        magicDamage: 26,
      },
    },
    description: "Increases sorcery damage by 20-26% depending on the spell.",
    location: "Griggs of Vinheim in Lower Undead Burg",
    weight: 0,
  },
  {
    icon: "/rings/offensive/lingering-dragoncrest-ring.png",
    name: "Lingering Dragoncrest Ring",
    ringType: "offensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        magicEffectLength: 50,
      },
    },
    description: "Increases sorcery effect length by 50%.",
    location: "Griggs of Vinheim in Lower Undead Burg",
    weight: 0,
  },
  {
    icon: "/rings/offensive/dusk-crown-ring.png",
    name: "Dusk Crown Ring",
    ringType: "offensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        miracleUses: 50,
        maxHp: -50,
      },
    },
    description: "Increases miarcle uses by 50% and decreases max HP by 50%.",
    location: "Griggs of Vinheim in Lower Undead Burg",
    weight: 0,
  },
  {
    icon: "/rings/offensive/ring-of-the-suns-firstborn.png",
    name: "Ring of the Sun's Firstborn",
    ringType: "offensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        miraclePower: 20,
      },
    },
    description: "Increases miracle power by 20%.",
    location: "Griggs of Vinheim in Lower Undead Burg",
    weight: 0,
  },
  {
    icon: "/rings/offensive/ring-of-the-sun-princess.png",
    name: "Ring of the Sun Princess",
    ringType: "offensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      miracleSynergy: 5,
    },
    description: "Boosts miracle synergy.",
    location: "",
    weight: 0,
  },
];
