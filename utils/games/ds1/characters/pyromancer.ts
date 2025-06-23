// Pyromancer starting character data for Dark Souls 1
// This file contains the pyromancer class with complete starting stats and equipment

import type { StartingCharacter } from "~/types/game/ds1/characters";

export const pyromancer: StartingCharacter = {
  name: "Pyromancer",
  class: "pyromancer",
  description:
    "A class adept at pyromancy. Balanced stats, starts with a hand axe and a pyromancy flame.",
  icon: "/characters/pyromancer.png",
  startingLevel: 1,
  stats: {
    level: 1,
    vitality: 10,
    attunement: 12,
    endurance: 11,
    strength: 12,
    dexterity: 9,
    resistance: 12,
    intelligence: 10,
    faith: 8,
  },
  equipment: {
    weapon: "Hand Axe",
    shield: "Cracked Round Shield",
    armor: {
      head: "Pyromancer Hood",
      chest: "Pyromancer Garb",
      hands: "Pyromancer Wraps",
      legs: "Pyromancer Trousers",
    },
    rings: [],
    items: ["Pyromancy Flame"],
  },
  spells: {
    miracles: [],
    sorceries: [],
    pyromancies: ["Fireball"],
  },
  startingSouls: 0,
  humanity: 0,
  notes:
    "Best starting class for pyromancy builds. Starts at level 1, making it the most flexible for min-maxing.",
};
