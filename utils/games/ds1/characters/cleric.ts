// Cleric starting character data for Dark Souls 1
// This file contains the cleric class with complete starting stats and equipment

import type { StartingCharacter } from "~/types/game/ds1/characters";

export const cleric: StartingCharacter = {
  name: "Cleric",
  class: "cleric",
  description:
    "A class adept at miracles. High faith and attunement, starts with a talisman and a miracle spell.",
  icon: "/characters/cleric.png",
  startingLevel: 2,
  stats: {
    level: 2,
    vitality: 11,
    attunement: 11,
    endurance: 9,
    strength: 12,
    dexterity: 8,
    resistance: 11,
    intelligence: 8,
    faith: 14,
  },
  equipment: {
    weapon: "Mace",
    shield: "Cracked Round Shield",
    armor: {
      head: "Cleric Helm",
      chest: "Cleric Armor",
      hands: "Cleric Gauntlets",
      legs: "Cleric Leggings",
    },
    rings: [],
    items: ["Talisman"],
  },
  spells: {
    miracles: ["Heal"],
    sorceries: [],
    pyromancies: [],
  },
  startingSouls: 0,
  humanity: 0,
  notes:
    "Best starting class for miracle builds. High faith and starts with a healing miracle.",
};
