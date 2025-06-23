// Deprived starting character data for Dark Souls 1
// This file contains the deprived class with complete starting stats and equipment

import type { StartingCharacter } from "~/types/game/ds1/characters";

export const deprived: StartingCharacter = {
  name: "Deprived",
  class: "deprived",
  description:
    "A class with no equipment and balanced stats. Starts at level 6 with all stats at 11.",
  icon: "/characters/deprived.png",
  startingLevel: 6,
  stats: {
    level: 6,
    vitality: 11,
    attunement: 11,
    endurance: 11,
    strength: 11,
    dexterity: 11,
    resistance: 11,
    intelligence: 11,
    faith: 11,
  },
  equipment: {
    weapon: "Club",
    shield: "Plank Shield",
    armor: {
      head: "None",
      chest: "None",
      hands: "None",
      legs: "None",
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
    "No armor and all stats at 11. For players seeking a challenge or maximum flexibility.",
};
