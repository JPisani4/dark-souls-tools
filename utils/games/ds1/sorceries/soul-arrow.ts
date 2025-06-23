import type { Sorcery } from "~/types/game/ds1/sorceries";

export const soulArrow: Sorcery[] = [
  {
    icon: "/sorceries/soul-arrow/soul-arrow.png",
    name: "Soul Arrow",
    sorceryType: "soul-arrow",
    uses: 30,
    requirements: {
      intelligence: 10,
    },
    attunementSlots: 1,
    effect: {
      damage: 100,
      magicDamage: 100,
      range: 20,
      tracking: false,
    },
    description: "Basic sorcery that hurls a soul arrow at enemies.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/soul-arrow/great-soul-arrow.png",
    name: "Great Soul Arrow",
    sorceryType: "soul-arrow",
    uses: 20,
    requirements: {
      intelligence: 14,
    },
    attunementSlots: 1,
    effect: {
      damage: 150,
      magicDamage: 150,
      range: 25,
      tracking: false,
    },
    description: "More powerful version of Soul Arrow with increased damage.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/soul-arrow/heavy-soul-arrow.png",
    name: "Heavy Soul Arrow",
    sorceryType: "soul-arrow",
    uses: 12,
    requirements: {
      intelligence: 12,
    },
    attunementSlots: 1,
    effect: {
      damage: 200,
      magicDamage: 200,
      range: 22,
      tracking: false,
    },
    description: "Slow but powerful soul arrow with high damage.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/soul-arrow/great-heavy-soul-arrow.png",
    name: "Great Heavy Soul Arrow",
    sorceryType: "soul-arrow",
    uses: 8,
    requirements: {
      intelligence: 16,
    },
    attunementSlots: 1,
    effect: {
      damage: 250,
      magicDamage: 250,
      range: 25,
      tracking: false,
    },
    description: "The most powerful soul arrow variant with maximum damage.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/soul-arrow/homing-soulmass.png",
    name: "Homing Soulmass",
    sorceryType: "soul-arrow",
    uses: 10,
    requirements: {
      intelligence: 18,
    },
    attunementSlots: 1,
    effect: {
      damage: 100,
      magicDamage: 100,
      range: 15,
      tracking: true,
    },
    description: "Creates multiple soul arrows that orbit around the caster.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/soul-arrow/homing-crystal-soulmass.png",
    name: "Homing Crystal Soulmass",
    sorceryType: "soul-arrow",
    uses: 10,
    requirements: {
      intelligence: 24,
    },
    attunementSlots: 1,
    effect: {
      damage: 150,
      magicDamage: 150,
      range: 18,
      tracking: true,
    },
    description: "Crystal version of Homing Soulmass with increased damage.",
    location: "Big Hat Logan in The Duke's Archives",
  },
];
