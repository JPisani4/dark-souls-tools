import type { Sorcery } from "~/types/game/ds1/sorceries";

export const covenant: Sorcery[] = [
  {
    icon: "/sorceries/covenant/dark-bead.png",
    name: "Dark Bead",
    sorceryType: "covenant",
    uses: 6,
    requirements: {
      intelligence: 16,
    },
    attunementSlots: 1,
    effect: {
      damage: 400,
      magicDamage: 400,
      range: 8,
      area: 6,
      tracking: false,
    },
    description: "Fires multiple dark orbs in a spread pattern.",
    location: "Darkwraith covenant reward",
    covenant: "darkwraith",
  },
  {
    icon: "/sorceries/covenant/dark-fog.png",
    name: "Dark Fog",
    sorceryType: "covenant",
    uses: 2,
    requirements: {
      intelligence: 18,
    },
    attunementSlots: 1,
    effect: {
      damage: 0,
      buff: "poison_cloud",
      duration: 30,
      area: 10,
    },
    description: "Creates a cloud of dark fog that poisons enemies.",
    location: "Darkwraith covenant reward",
    covenant: "darkwraith",
  },
  {
    icon: "/sorceries/covenant/pursuers.png",
    name: "Pursuers",
    sorceryType: "covenant",
    uses: 3,
    requirements: {
      intelligence: 32,
    },
    attunementSlots: 2,
    effect: {
      damage: 300,
      magicDamage: 300,
      range: 25,
      tracking: true,
    },
    description: "Summons dark orbs that track and pursue enemies.",
    location: "Darkwraith covenant reward (Rank 2)",
    covenant: "darkwraith",
  },
  {
    icon: "/sorceries/covenant/dark-orb.png",
    name: "Dark Orb",
    sorceryType: "covenant",
    uses: 12,
    requirements: {
      intelligence: 16,
    },
    attunementSlots: 1,
    effect: {
      damage: 300,
      magicDamage: 300,
      range: 25,
      tracking: true,
    },
    description: "Fires a dark orb that tracks and pursues enemies.",
    location: "Darkwraith covenant reward",
    covenant: "darkwraith",
  },
];
