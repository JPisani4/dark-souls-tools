import type { Sorcery } from "~/types/game/ds1/sorceries";

export const special: Sorcery[] = [
  {
    icon: "/sorceries/special/chameleon.png",
    name: "Chameleon",
    sorceryType: "special",
    uses: 11,
    requirements: {
      intelligence: 14,
    },
    attunementSlots: 1,
    effect: {
      buff: "disguise",
      duration: 300,
    },
    description:
      "Transforms you into an object to hide from enemies and players.",
    location: "Griggs of Vinheim in Lower Undead Burg",
    special: true,
  },
];
