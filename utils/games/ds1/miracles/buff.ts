import type { Miracle } from "~/types/game/ds1/miracles";

export const buff: Miracle[] = [
  {
    icon: "/miracles/buff/sunlight-blade.png",
    name: "Sunlight Blade",
    miracleType: "buff",
    uses: 1,
    requirements: {
      faith: 30,
    },
    attunementSlots: 1,
    effect: {
      buff: "lightning_weapon",
      duration: 60,
    },
    description: "Temporarily imbues your weapon with lightning damage.",
    location: "Gwynevere in Anor Londo",
  },
  {
    icon: "/miracles/buff/darkmoon-blade.png",
    name: "Darkmoon Blade",
    miracleType: "buff",
    uses: 1,
    requirements: {
      faith: 30,
    },
    attunementSlots: 1,
    effect: {
      buff: "magic_weapon",
      duration: 60,
    },
    description: "Temporarily imbues your weapon with magic damage.",
    location: "Blade of the Darkmoon covenant reward",
  },
  {
    icon: "/miracles/buff/homeward.png",
    name: "Homeward",
    miracleType: "buff",
    uses: 1,
    requirements: {
      faith: 18,
    },
    attunementSlots: 1,
    effect: {
      buff: "return_to_bonfire",
      duration: 0,
    },
    description: "Returns you to the last bonfire rested at.",
    location: "Rhea of Thorolund in The Duke's Archives",
  },
  {
    icon: "/miracles/buff/magic-barrier.png",
    name: "Magic Barrier",
    miracleType: "buff",
    uses: 4,
    requirements: {
      faith: 14,
    },
    attunementSlots: 1,
    effect: {
      buff: "magic_barrier",
      duration: 30,
    },
    description: "Creates a barrier of magic that protects the caster.",
    location: "Rhea of Thorolund in The Duke's Archives",
  },
  {
    icon: "/miracles/buff/great-magic-barrier.png",
    name: "Great Magic Barrier",
    miracleType: "buff",
    uses: 2,
    requirements: {
      faith: 24,
    },
    attunementSlots: 1,
    effect: {
      buff: "great_magic_barrier",
      duration: 30,
    },
    description:
      "Creates a stronger barrier of magic that protects the caster.",
    location: "Rhea of Thorolund in The Duke's Archives",
  },
];
