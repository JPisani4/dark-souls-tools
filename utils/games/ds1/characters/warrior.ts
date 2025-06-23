// Warrior starting character data for Dark Souls 1
// This file contains the warrior class with complete starting stats and equipment

import type { StartingCharacter } from "~/types/game/ds1/characters";

export const warrior: StartingCharacter = {
  name: "Warrior",
  class: "warrior",
  description:
    "A warrior who has long trained with the sword. High strength and dexterity, but low magic resistance.",
  icon: "/characters/warrior.png",
  startingLevel: 4,
  stats: {
    level: 4,
    vitality: 11,
    attunement: 8,
    endurance: 12,
    strength: 13,
    dexterity: 13,
    resistance: 11,
    intelligence: 9,
    faith: 9,
  },
  equipment: {
    weapon: "Longsword",
    shield: "Heater Shield",
    armor: {
      head: "Warrior Helm",
      chest: "Warrior Armor",
      hands: "Warrior Gauntlets",
      legs: "Warrior Leggings",
    },
    rings: [],
    items: [],
  },
  spells: {
    miracles: [],
    sorceries: [],
    pyromancies: [],
  },
  startingSouls: 0,
  humanity: 0,
  notes:
    "Well-rounded starting class with good physical stats. Excellent for beginners and melee-focused builds.",
};
