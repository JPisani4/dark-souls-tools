import type { Sorcery } from "~/types/game/ds1/sorceries";

export const soulSpear: Sorcery[] = [
  {
    icon: "/sorceries/soul-spear/soul-spear.png",
    name: "Soul Spear",
    sorceryType: "soul-spear",
    uses: 4,
    requirements: {
      intelligence: 36,
    },
    attunementSlots: 1,
    effect: {
      damage: 400,
      magicDamage: 400,
      range: 30,
      tracking: false,
    },
    description: "Powerful sorcery that hurls a massive soul spear at enemies.",
    location: "Big Hat Logan in The Duke's Archives",
  },
  {
    icon: "/sorceries/soul-spear/crystal-soul-spear.png",
    name: "Crystal Soul Spear",
    sorceryType: "soul-spear",
    uses: 4,
    requirements: {
      intelligence: 44,
    },
    attunementSlots: 1,
    effect: {
      damage: 500,
      magicDamage: 500,
      range: 35,
      tracking: false,
    },
    description: "Crystal version of Soul Spear with maximum damage and range.",
    location: "Big Hat Logan in The Duke's Archives",
  },
  {
    icon: "/sorceries/soul-spear/white-dragon-breath.png",
    name: "White Dragon Breath",
    sorceryType: "soul-spear",
    uses: 20,
    requirements: {
      intelligence: 50,
    },
    attunementSlots: 1,
    effect: {
      damage: 600,
      magicDamage: 600,
      range: 25,
      area: 8,
      tracking: false,
    },
    description:
      "Creates a cone of crystal breath that damages all enemies in range.",
    location: "Big Hat Logan in The Duke's Archives",
  },
];
