// Knight starting character data for Dark Souls 1
// This file contains the knight class with complete starting stats and equipment

import type { StartingCharacter } from "~/types/game/ds1/characters";

export const knight: StartingCharacter = {
  name: "Knight",
  class: "knight",
  description:
    "A knight clad in heavy armor. High vitality and endurance, but slow movement due to heavy equipment.",
  icon: "/characters/knight.png",
  startingLevel: 5,
  stats: {
    level: 5,
    vitality: 14,
    attunement: 10,
    endurance: 10,
    strength: 11,
    dexterity: 11,
    resistance: 10,
    intelligence: 9,
    faith: 11,
  },
  equipment: {
    weapon: "Broadsword",
    shield: "Tower Kite Shield",
    armor: {
      head: "Knight Helm",
      chest: "Knight Armor",
      hands: "Knight Gauntlets",
      legs: "Knight Leggings",
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
    "Tanky starting class with high defense. Good for players who prefer a defensive playstyle.",
};
