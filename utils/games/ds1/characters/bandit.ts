// Bandit starting character data for Dark Souls 1
// This file contains the bandit class with complete starting stats and equipment

import type { StartingCharacter } from "~/types/game/ds1/characters";

export const bandit: StartingCharacter = {
  name: "Bandit",
  class: "bandit",
  description:
    "A bandit who wields heavy weapons. High strength and vitality, but low attunement.",
  icon: "/characters/bandit.png",
  startingLevel: 4,
  stats: {
    level: 4,
    vitality: 12,
    attunement: 8,
    endurance: 14,
    strength: 14,
    dexterity: 9,
    resistance: 11,
    intelligence: 8,
    faith: 10,
  },
  equipment: {
    weapon: "Battle Axe",
    shield: "Spider Shield",
    armor: {
      head: "Bandit Mask",
      chest: "Bandit Armor",
      hands: "Bandit Gauntlets",
      legs: "Bandit Leggings",
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
    "Strength-focused class with high vitality and endurance. Good for heavy weapon builds.",
};
