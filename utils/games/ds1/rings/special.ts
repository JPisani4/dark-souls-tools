import type { Ring } from "~/types/game/ds1/rings";

export const special: Ring[] = [
  {
    icon: "/rings/special/dark-wood-grain-ring.png",
    name: "Dark Wood Grain Ring",
    ringType: "special",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "dark-wood-grain-ring",
    },
    description:
      "Changes roll animation to ninja flip when equip load is 25% or less.",
    location: "Forest Hunter Covenant",
    weight: 0,
  },
  {
    icon: "/rings/special/covenant-of-artorias.png",
    name: "Covenant of Artorias",
    ringType: "special",
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
  },
  {
    icon: "/rings/special/old-witch-ring.png",
    name: "Old Witch Ring",
    ringType: "special",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "understand_quelaan",
    },
    description:
      "Allows the player to talk to Quelaag's Sister, Daughter of Chaos.",
    location: "Starting gift or trade with Snuggly",
    weight: 0,
  },
  {
    icon: "/rings/special/ring-of-fog.png",
    name: "Ring of Fog",
    ringType: "special",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "invisibility",
    },
    description: "Turns the player transparent making them un-targetable",
    location: "Forest Hunter Covenant",
    weight: 0,
  },
  {
    icon: "/rings/special/calamity-ring.png",
    name: "Calamity Ring",
    ringType: "special",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      special: "double_damage",
    },
    description:
      "The player receives twice the amount of damage they normally would",
    location: "Forest Hunter Covenant",
    weight: 0,
  },
];
