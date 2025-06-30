import type { Ring } from "~/types/game/ds1/rings";

export const statBoost: Ring[] = [
  {
    icon: "/rings/stat-boost/ring-of-favor-and-protection.png",
    name: "Ring of Favor and Protection",
    ringType: "stat-boost",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        maxHp: 20,
        staminaBonus: 20,
        equipLoadBonus: 20,
      },
    },
    description:
      "Increases max HP, stamina, and equip load by 20%. Breaks if removed.",
    location: "Lautrec of Carim",
    weight: 0,
  },
  {
    icon: "/rings/stat-boost/wolf-ring.png",
    name: "Wolf Ring",
    ringType: "stat-boost",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        poise: 40,
      },
    },
    description: "Increases poise by 40 points.",
    location: "Darkroot Garden",
    weight: 0,
  },
  {
    icon: "/rings/stat-boost/hawk-ring.png",
    name: "Hawk Ring",
    ringType: "stat-boost",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        bowRange: 50,
      },
    },
    description:
      "Increases bow range by 50%. Enhanced zooming: bows and binoculars",
    location: "Anor Londo",
    weight: 0,
  },
  {
    icon: "/rings/stat-boost/east-wood-grain-ring.png",
    name: "East Wood Grain Ring",
    ringType: "stat-boost",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        durability: 50,
      },
    },
    description: "Decreases durability loss except for weapon arts.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/stat-boost/covetous-gold-serpent-ring.png",
    name: "Covetous Gold Serpent Ring",
    ringType: "stat-boost",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        itemDiscovery: 200,
      },
    },
    description: "Increases item discovery by 200 points.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/stat-boost/covetous-silver-serpent-ring.png",
    name: "Covetous Silver Serpent Ring",
    ringType: "stat-boost",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        soulGain: 20,
      },
    },
    description: "Increases soul gain by 20%.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/stat-boost/darkmoon-seance-ring.png",
    name: "Darkmoon Seance Ring",
    ringType: "stat-boost",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        attunement: 1,
      },
    },
    covenant: "blade-of-darkmoon",
    description:
      "Increases attunement slots by 1. Grants entrance to Darkmoon Blades covenant at Anor Londo.",
    location: "Blade of the Darkmoon covenant reward",
    weight: 0,
  },
  {
    icon: "/rings/stat-boost/white-seance-ring.png",
    name: "White Seance Ring",
    ringType: "stat-boost",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      attunementSlots: 1,
    },
    description: "Increases attunement slots by 1.",
    location: "Tomb of the Giants",
    weight: 0,
  },
  {
    icon: "/rings/stat-boost/tiny-beings-ring.png",
    name: "Tiny Being's Ring",
    ringType: "stat-boost",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      maxHp: 5,
    },
    description: "Raises maximum HP by 5%.",
    location: "Starting gift",
    weight: 0,
  },
];
