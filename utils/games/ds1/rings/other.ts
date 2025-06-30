import type { Ring } from "~/types/game/ds1/rings";

export const covenant: Ring[] = [
  {
    icon: "/rings/other/cat-covenant-ring.png",
    name: "Cat Covenant Ring",
    ringType: "other",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "forest_invasion",
    },
    covenant: "forest-hunter",
    description: "Allows invasion in Darkroot Garden.",
    location: "Forest Hunter covenant reward",
    weight: 0,
  },
  {
    icon: "/rings/other/darkmoon-blade-covenant-ring.png",
    name: "Darkmoon Blade Covenant Ring",
    ringType: "other",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "dark_anor_londo_invasion",
    },
    covenant: "blade-of-darkmoon",
    description: "Allows invasion in dark Anor Londo.",
    location: "Blade of the Darkmoon covenant reward",
    weight: 0,
  },
];
