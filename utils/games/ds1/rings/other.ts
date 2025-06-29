import type { Ring } from "~/types/game/ds1/rings";

export const covenant: Ring[] = [
  {
    icon: "/rings/other/dark-wood-grain-ring.png",
    name: "Dark Wood Grain Ring",
    ringType: "other",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "enhanced_rolling",
    },
    covenant: "forest-hunter",
    description: "Enhances rolling and backflip abilities.",
    location: "Forest Hunter covenant reward",
    weight: 0,
  },
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
  {
    icon: "/rings/other/covenant-of-artorias.png",
    name: "Covenant of Artorias",
    ringType: "other",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "abyss_walking",
    },
    description: "Allows walking in the Abyss without falling.",
    location: "Sif in Darkroot Garden",
    weight: 0,
    special: true,
  },
  {
    icon: "/rings/other/old-witch-ring.png",
    name: "Old Witch Ring",
    ringType: "other",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "understand_quelaan",
    },
    description: "Allows understanding of Quelaan's speech.",
    location: "Starting gift or trade with Snuggly",
    weight: 0,
    special: true,
  },
  {
    icon: "/rings/other/ring-of-fog.png",
    name: "Ring of Fog",
    ringType: "other",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "",
    },
    description: "Turns the player transparent making them un-targetable",
    location: "Forest Hunter Covenant",
    weight: 0,
  },
  {
    icon: "/rings/other/calamity-ring.png",
    name: "Calamity Ring",
    ringType: "other",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "",
    },
    description:
      "The player receives twice the amount of damage they normally would",
    location: "Forest Hunter Covenant",
    weight: 0,
  },
];
