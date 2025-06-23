import type { Miracle } from "~/types/game/ds1/miracles";

export const special: Miracle[] = [
  {
    icon: "/miracles/special/tranquil-walk-of-peace.png",
    name: "Tranquil Walk of Peace",
    miracleType: "special",
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
    icon: "/miracles/special/karmic-justice.png",
    name: "Karmic Justice",
    miracleType: "special",
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
    miracleType: "special",
    uses: 2,
    requirements: {
      faith: 30,
    },
    attunementSlots: 1,
    effect: {
      buff: "silence_magic",
      duration: 45,
      area: 20,
    },
    description: "Prevents all magic casting in a large area.",
    location: "Blade of the Darkmoon covenant reward",
    special: true,
  },
];
