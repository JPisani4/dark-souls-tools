import type { Miracle } from "~/types/game/ds1/miracles";

export const offensive: Miracle[] = [
  {
    icon: "/miracles/offensive/lightning-spear.png",
    name: "Lightning Spear",
    miracleType: "offensive",
    uses: 10,
    requirements: {
      faith: 20,
    },
    attunementSlots: 1,
    effect: {
      damage: 300,
      lightningDamage: 300,
      range: 15,
    },
    description:
      "Hurls a lightning spear at enemies. Effective against dragons and undead.",
    location: "Warrior of Sunlight covenant reward",
  },
  {
    icon: "/miracles/offensive/great-lightning-spear.png",
    name: "Great Lightning Spear",
    miracleType: "offensive",
    uses: 10,
    requirements: {
      faith: 30,
    },
    attunementSlots: 1,
    effect: {
      damage: 400,
      lightningDamage: 400,
      range: 20,
    },
    description:
      "Hurls a powerful lightning spear. More damage than Lightning Spear.",
    location: "Warrior of Sunlight covenant reward (Rank 1)",
  },
  {
    icon: "/miracles/offensive/sunlight-spear.png",
    name: "Sunlight Spear",
    miracleType: "offensive",
    uses: 5,
    requirements: {
      faith: 50,
    },
    attunementSlots: 2,
    effect: {
      damage: 500,
      lightningDamage: 500,
      range: 25,
    },
    description: "The ultimate lightning miracle. Massive damage and range.",
    location: "Warrior of Sunlight covenant reward (Rank 2)",
  },
  {
    icon: "/miracles/offensive/wrath-of-the-gods.png",
    name: "Wrath of the Gods",
    miracleType: "offensive",
    uses: 3,
    requirements: {
      faith: 28,
    },
    attunementSlots: 1,
    effect: {
      damage: 600,
      range: 0,
      area: 8,
    },
    description:
      "Creates a powerful explosion that damages all nearby enemies.",
    location: "Rhea of Thorolund in The Duke's Archives",
  },
  {
    icon: "/miracles/offensive/emit-force.png",
    name: "Emit Force",
    miracleType: "offensive",
    uses: 6,
    requirements: {
      faith: 18,
    },
    attunementSlots: 1,
    effect: {
      damage: 200,
      range: 12,
      area: 3,
    },
    description: "Creates a force wave that damages and knocks back enemies.",
    location: "Petrus of Thorolund in Firelink Shrine",
  },
  {
    icon: "/miracles/offensive/force.png",
    name: "Force",
    miracleType: "offensive",
    uses: 21,
    requirements: {
      faith: 12,
    },
    attunementSlots: 1,
    effect: {
      damage: 0,
      range: 0,
      area: 5,
    },
    description:
      "Creates a force wave that knocks back enemies without damage.",
    location: "Petrus of Thorolund in Firelink Shrine",
  },
  {
    icon: "/miracles/offensive/gravelord-sword-dance.png",
    name: "Gravelord Sword Dance",
    miracleType: "offensive",
    uses: 40,
    requirements: {
      faith: 0,
    },
    attunementSlots: 1,
    effect: {
      damage: 0,
      range: 0,
      area: 5,
    },
    description:
      "Creates a force wave that knocks back enemies without damage.",
    location: "Petrus of Thorolund in Firelink Shrine",
  },
  {
    icon: "/miracles/offensive/gravelord-greatsword-dance.png",
    name: "Gravelord Greatsword Dance",
    miracleType: "offensive",
    uses: 40,
    requirements: {
      faith: 0,
    },
    attunementSlots: 1,
    effect: {
      damage: 0,
      range: 0,
      area: 5,
    },
    description:
      "Creates a force wave that knocks back enemies without damage.",
    location: "Petrus of Thorolund in Firelink Shrine",
  },
];
