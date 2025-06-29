import type { Ring } from "~/types/game/ds1/rings";

export const defense: Ring[] = [
  {
    icon: "/rings/defensive/ring-of-steel-protection.png",
    name: "Ring of Steel Protection",
    ringType: "defensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        resistance: 10,
      },
    },
    description: "Increases physical defense by 10%.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/defensive/ring-of-steel-protection.png",
    name: "Ring of Steel Protection",
    ringType: "defensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        phsyicalDefense: 50,
      },
    },
    description: "Increases physical defense by 50 points.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/defensive/spell-stoneplate-ring.png",
    name: "Spell Stoneplate Ring",
    ringType: "defensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        magicDefense: 50,
      },
    },
    description: "Increases magic defense by 50 points.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/defensive/thunder-stoneplate-ring.png",
    name: "Thunder Stoneplate Ring",
    ringType: "defensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        lightningDefense: 50,
      },
    },
    description: "Increases lightning defense by 50 points.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/defensive/flame-stoneplate-ring.png",
    name: "Flame Stoneplate Ring",
    ringType: "defensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        fireDefense: 50,
      },
    },
    description: "Increases fire defense by 50 points.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/defensive/speckled-stoneplate-ring.png",
    name: "Speckled Stoneplate Ring",
    ringType: "defensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        fireDefense: 25,
        magicDefense: 25,
        lightningDefense: 25,
      },
    },
    description: "Increases fire, magic, and lightning defense by 25 points.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/defensive/bloodbite-ring.png",
    name: "Bloodbite Ring",
    ringType: "defensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        bleedResist: 400,
      },
    },
    description: "Increases bleed resistance by 400%.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/defensive/poisonbite-ring.png",
    name: "Poisonbite Ring",
    ringType: "defensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        poisonResist: 400,
      },
    },
    description: "Increases poison resistance by 400%.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/defensive/cursebite-ring.png",
    name: "Cursebite Ring",
    ringType: "defensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        curseResist: 400,
      },
    },
    description: "Increases curse resistance by 400%.",
    location: "Sen's Fortress",
    weight: 0,
  },
  {
    icon: "/rings/defensive/blue-tearstone-ring.png",
    name: "Blue Tearstone Ring",
    ringType: "defensive",
    requirements: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    effect: {
      statBonus: {
        defense: 50,
      },
    },
    description: "Increases defense by 50% when HP is below 50%.",
    location: "Sen's Fortress",
    weight: 0,
  },
];
