// Hunter starting character data for Dark Souls 1
// This file contains the hunter class with complete starting stats and equipment

import type { StartingCharacter } from "~/types/game/ds1/characters";

export const hunter: StartingCharacter = {
  name: "Hunter",
  class: "hunter",
  description:
    "A hunter who specializes in ranged combat. High dexterity and good for bow and crossbow builds.",
  icon: "/characters/hunter.png",
  startingLevel: 4,
  stats: {
    level: 4,
    vitality: 11,
    attunement: 9,
    endurance: 11,
    strength: 12,
    dexterity: 14,
    resistance: 11,
    intelligence: 9,
    faith: 9,
  },
  equipment: {
    weapon: "Short Bow",
    shield: "Leather Shield",
    armor: {
      head: "Hunter Hat",
      chest: "Hunter Armor",
      hands: "Hunter Gloves",
      legs: "Hunter Boots",
    },
    rings: [],
    items: ["Standard Arrows"],
  },
  spells: {
    miracles: [],
    sorceries: [],
    pyromancies: [],
  },
  startingSouls: 0,
  humanity: 0,
  notes:
    "Ranged combat specialist with high dexterity. Excellent for bow and crossbow focused builds.",
};
