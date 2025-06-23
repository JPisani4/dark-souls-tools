// Thief starting character data for Dark Souls 1
// This file contains the thief class with complete starting stats and equipment

import type { StartingCharacter } from "~/types/game/ds1/characters";

export const thief: StartingCharacter = {
  name: "Thief",
  class: "thief",
  description:
    "A thief who excels in stealth and critical attacks. High dexterity and critical damage bonus.",
  icon: "/characters/thief.png",
  startingLevel: 5,
  stats: {
    level: 5,
    vitality: 9,
    attunement: 11,
    endurance: 9,
    strength: 9,
    dexterity: 15,
    resistance: 10,
    intelligence: 12,
    faith: 11,
  },
  equipment: {
    weapon: "Bandit's Knife",
    shield: "Target Shield",
    armor: {
      head: "Thief Mask",
      chest: "Black Leather Armor",
      hands: "Black Leather Gloves",
      legs: "Black Leather Boots",
    },
    rings: [],
    items: ["Master Key"],
  },
  spells: {
    miracles: [],
    sorceries: [],
    pyromancies: [],
  },
  startingSouls: 0,
  humanity: 0,
  startingGift: "master-key",
  notes:
    "Specialized class with high critical damage and the Master Key. Good for experienced players.",
};
