// Wanderer starting character data for Dark Souls 1
// This file contains the wanderer class with complete starting stats and equipment

import type { StartingCharacter } from "~/types/game/ds1/characters";

export const wanderer: StartingCharacter = {
  name: "Wanderer",
  class: "wanderer",
  description:
    "A wanderer who has traveled far and wide. High dexterity and attunement, good for magic users.",
  icon: "/characters/wanderer.png",
  startingLevel: 3,
  stats: {
    level: 3,
    vitality: 10,
    attunement: 11,
    endurance: 10,
    strength: 10,
    dexterity: 14,
    resistance: 12,
    intelligence: 11,
    faith: 8,
  },
  equipment: {
    weapon: "Scimitar",
    shield: "Leather Shield",
    armor: {
      head: "Wanderer Hood",
      chest: "Wanderer Coat",
      hands: "Wanderer Manchette",
      legs: "Wanderer Boots",
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
    "Balanced class with good dexterity and attunement. Excellent starting point for hybrid builds.",
};
