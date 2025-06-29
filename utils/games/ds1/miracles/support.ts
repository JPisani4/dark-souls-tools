import type { Miracle } from "~/types/game/ds1/miracles";

export const special: Miracle[] = [
  {
    icon: "/miracles/special/tranquil-walk-of-peace.png",
    name: "Tranquil Walk of Peace",
    miracleType: "support",
    uses: 5,
    requirements: {
      faith: 18,
    },
    attunementSlots: 1,
    effect: {
      buff: "slow_movement",
      duration: 30,
      area: 15,
    },
    description: "Slows the movement of all nearby enemies and players.",
    location: "Blade of the Darkmoon covenant reward",
    special: true,
  },
  {
    icon: "/miracles/buff/magic-barrier.png",
    name: "Magic Barrier",
    miracleType: "support",
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
    miracleType: "support",
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
  {
    icon: "/miracles/healing/seek-guidance.png",
    name: "Seek Guidance",
    miracleType: "support",
    uses: 5,
    requirements: {
      faith: 12,
    },
    attunementSlots: 1,
    effect: {
      buff: "message_guidance",
      duration: 300,
    },
    description:
      "Reveals more messages and bloodstains. Also shows more summon signs.",
    location: "Petrus of Thorolund in Firelink Shrine",
  },
  {
    icon: "/miracles/special/karmic-justice.png",
    name: "Karmic Justice",
    miracleType: "support",
    uses: 4,
    requirements: {
      faith: 20,
    },
    attunementSlots: 1,
    effect: {
      damage: 800,
      range: 0,
      area: 8,
    },
    description: "Explodes when you take damage, damaging nearby enemies.",
    location: "Blade of the Darkmoon covenant reward",
    special: true,
  },
  {
    icon: "/miracles/special/vow-of-silence.png",
    name: "Vow of Silence",
    miracleType: "support",
    uses: 2,
    requirements: {
      faith: 30,
    },
    attunementSlots: 2,
    effect: {
      buff: "silence_magic",
      duration: 45,
      area: 20,
    },
    description: "Prevents all magic casting in a large area.",
    location: "Blade of the Darkmoon covenant reward",
    special: true,
  },
  {
    icon: "/miracles/buff/homeward.png",
    name: "Homeward",
    miracleType: "support",
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
];
