import type { Miracle } from "~/types/game/ds1/miracles";

export const healing: Miracle[] = [
  {
    icon: "/miracles/healing/heal.png",
    name: "Heal",
    miracleType: "healing",
    uses: 5,
    requirements: {
      faith: 12,
    },
    attunementSlots: 1,
    effect: {
      healing: 400,
      range: 0,
    },
    description:
      "Restores a moderate amount of HP. Cannot be used while moving.",
    location: "Petrus of Thorolund in Firelink Shrine",
  },
  {
    icon: "/miracles/healing/great-heal.png",
    name: "Great Heal",
    miracleType: "healing",
    uses: 3,
    requirements: {
      faith: 18,
    },
    attunementSlots: 1,
    effect: {
      healing: 800,
      range: 0,
    },
    description: "Restores a large amount of HP. Cannot be used while moving.",
    location: "Rhea of Thorolund in The Duke's Archives",
  },
  {
    icon: "/miracles/healing/great-heal-excerpt.png",
    name: "Great Heal Excerpt",
    miracleType: "healing",
    uses: 1,
    requirements: {
      faith: 14,
    },
    attunementSlots: 1,
    effect: {
      healing: 600,
      range: 0,
    },
    description:
      "Restores a moderate amount of HP. Faster casting than Great Heal.",
    location: "Rhea of Thorolund in The Duke's Archives",
  },
  {
    icon: "/miracles/healing/soothing-sunlight.png",
    name: "Soothing Sunlight",
    miracleType: "healing",
    uses: 3,
    requirements: {
      faith: 48,
    },
    attunementSlots: 2,
    effect: {
      healing: 1200,
      range: 0,
    },
    description:
      "Restores a massive amount of HP. Cannot be used while moving.",
    location: "Gwynevere in Anor Londo",
  },
  {
    icon: "/miracles/healing/bountiful-sunlight.png",
    name: "Bountiful Sunlight",
    miracleType: "healing",
    uses: 1,
    requirements: {
      faith: 36,
    },
    attunementSlots: 2,
    effect: {
      healing: 0,
      buff: "gradual_healing",
      duration: 60,
      area: 10,
    },
    description: "Gradually restores HP over time for you and nearby allies.",
    location: "Gwynevere in Anor Londo",
  },
  {
    icon: "/miracles/healing/replenishment.png",
    name: "Replenishment",
    miracleType: "healing",
    uses: 2,
    requirements: {
      faith: 14,
    },
    attunementSlots: 1,
    effect: {
      healing: 0,
      buff: "gradual_healing",
      duration: 30,
    },
    description: "Gradually restores HP over time.",
    location: "Petrus of Thorolund in Firelink Shrine",
  },
  {
    icon: "/miracles/healing/seek-guidance.png",
    name: "Seek Guidance",
    miracleType: "healing",
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
];
