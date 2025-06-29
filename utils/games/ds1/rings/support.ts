import type { Ring } from "~/types/game/ds1/rings";

export const utility: Ring[] = [
  {
    icon: "/rings/support/cloranthy-ring.png",
    name: "Cloranthy Ring",
    ringType: "support",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      staminaRegenBonus: 20,
    },
    description:
      "Increases stamina regeneration speed by 20 points per second.",
    location: "Great Hollow",
    weight: 0,
  },
  {
    icon: "/rings/support/dark-wood-grain-ring.png",
    name: "Dark Wood Grain Ring",
    ringType: "support",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "ninja_flip",
    },
    description:
      "Changes roll animation to ninja flip when equip load is 25% or less.",
    location: "Forest Hunter Covenant",
    weight: 0,
  },
  {
    icon: "/rings/support/havel-ring.png",
    name: "Havel's Ring",
    ringType: "support",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      equipLoadBonus: 50,
    },
    description: "Increases maximum equip load by 50%.",
    location: "Havel the Rock",
    weight: 0,
  },
  {
    icon: "/rings/support/slumbering-dragoncrest-ring.png",
    name: "Slumbering Dragoncrest Ring",
    ringType: "support",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "silent_movement",
    },
    description: "Makes your movements silent.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/support/ring-of-the-cat.png",
    name: "Ring of the Cat",
    ringType: "support",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "no_fall_damage",
    },
    description: "Eliminates fall damage.",
    location: "Forest Hunter Covenant",
    weight: 0,
  },
  {
    icon: "/rings/support/orange-charred-ring.png",
    name: "Orange Charred Ring",
    ringType: "support",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "walk_on_lava",
    },
    description: "Reduces lava damage. Adds fire element to kick motion.",
    location: "Centipede Demon",
    weight: 0,
  },
  {
    icon: "/rings/support/rusted-iron-ring.png",
    name: "Rusted Iron Ring",
    ringType: "support",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "move_freely_in_water",
    },
    description: "Allows normal movement in water and mud.",
    location: "Undead Asylum",
    weight: 0,
  },
  {
    icon: "/rings/support/ring-of-the-sun-princess.png",
    name: "Ring of the Sun Princess",
    ringType: "support",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "gradual_hp_regeneration",
    },
    description: "Gradually restores HP over time.",
    location: "Gwynevere",
    weight: 0,
  },
  {
    icon: "/rings/support/ring-of-the-evil-eye.png",
    name: "Ring of the Evil Eye",
    ringType: "support",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "restores_hp_on_kill",
    },
    description: "Restores 30 HP when you defeat an enemy.",
    location: "Depths",
    weight: 0,
  },
  {
    icon: "/rings/support/ring-of-sacrifice.png",
    name: "Ring of Sacrifice",
    ringType: "support",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "prevents_soul_loss",
    },
    description: "Prevents soul loss upon death. Breaks after use.",
    location: "Various locations",
    weight: 0,
  },
  {
    icon: "/rings/support/rare-ring-of-sacrifice.png",
    name: "Rare Ring of Sacrifice",
    ringType: "support",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "prevents_soul_loss_and_curse",
    },
    description:
      "Prevents soul loss and cure curse upon death. Breaks after use.",
    location: "Various locations",
    weight: 0,
  },
  {
    icon: "/rings/support/tiny-beings-ring.png",
    name: "Tiny Being's Ring",
    ringType: "support",
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
    location: "",
  },
  {
    icon: "/rings/support/white-seance-ring.png",
    name: "White Seance Ring",
    ringType: "support",
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
    location: "",
  },
  {
    icon: "/rings/support/darkmoon-seance-ring.png",
    name: "Darkmoon Seance Ring",
    ringType: "support",
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
    icon: "/rings/support/wolf-ring.png",
    name: "Wolf Ring",
    ringType: "support",
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
    location: "",
    weight: 0,
  },
  {
    icon: "/rings/support/hawk-ring.png",
    name: "Wolf Ring",
    ringType: "support",
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
    location: "",
    weight: 0,
  },
  {
    icon: "/rings/support/east-wood-grain-ring.png",
    name: "East Wood Grain Ring",
    ringType: "support",
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
    location: "",
    weight: 0,
  },
  {
    icon: "/rings/support/covetous-gold-serpent-ring.png",
    name: "East Wood Grain Ring",
    ringType: "support",
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
    location: "",
    weight: 0,
  },
  {
    icon: "/rings/support/covetous-silver-serpent-ring.png",
    name: "East Wood Grain Ring",
    ringType: "support",
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
    location: "",
    weight: 0,
  },
  {
    icon: "/rings/support/ring-of-favor-and-protection.png",
    name: "Ring of Favor and Protection",
    ringType: "support",
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
];
