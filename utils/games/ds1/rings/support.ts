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
];
