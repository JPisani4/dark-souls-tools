import type { Pyromancy } from "~/types/game/ds1/pyromancies";

const support: Pyromancy[] = [
  {
    icon: "/pyromancies/flash-sweat.png",
    name: "Flash Sweat",
    pyromancyType: "support",
    uses: 3,
    requirements: {},
    attunementSlots: 1,
    effect: {
      buff: "fire_resistance",
      duration: 60,
    },
    description: "Covers the player in water, drastically reducing fire damage",
    location: "Laurentius of the Great Swamp",
    type: "support",
    affinity: "water",
  },
  {
    icon: "/pyromancies/iron-flesh.png",
    name: "Iron Flesh",
    pyromancyType: "support",
    uses: 3,
    requirements: {},
    attunementSlots: 1,
    effect: {
      buff: "iron_flesh",
      duration: 30,
    },
    description:
      "Turns the players body to solid metal. Increases physical and fire defense. Player is, however, greatly encumbered and cannot run or dodge.",
    location: "Laurentius of the Great Swamp",
    type: "support",
    affinity: "physical",
  },
  {
    icon: "/pyromancies/power-within.png",
    name: "Power Within",
    pyromancyType: "support",
    uses: 1,
    requirements: {},
    attunementSlots: 1,
    effect: {
      buff: "power_within",
      duration: 100,
    },
    description:
      "Increases attack and defense but constantly drains health of the player",
    location: "Blighttown",
    type: "support",
    affinity: "physical",
  },
  {
    icon: "/pyromancies/undead-rapport.png",
    name: "Undead Rapport",
    pyromancyType: "support",
    uses: 7,
    requirements: {},
    attunementSlots: 1,
    effect: {
      buff: "undead_control",
      duration: 30,
      range: 10,
    },
    description: "Turns Undead into allies for a short time",
    location: "Quelana of Izalith",
    type: "support",
    affinity: "physical",
  },
];

export default support;
