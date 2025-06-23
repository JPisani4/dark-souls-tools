// Sorcerer starting character data for Dark Souls 1
// This file contains the sorcerer class with complete starting stats and equipment

import type { StartingCharacter } from "~/types/game/ds1/characters";

export const sorcerer: StartingCharacter = {
  name: "Sorcerer",
  class: "sorcerer",
  description:
    "A class adept at sorcery. High intelligence and attunement, starts with a catalyst and a sorcery spell.",
  icon: "/characters/sorcerer.png",
  startingLevel: 3,
  stats: {
    level: 3,
    vitality: 8,
    attunement: 15,
    endurance: 8,
    strength: 9,
    dexterity: 11,
    resistance: 8,
    intelligence: 15,
    faith: 8,
  },
  equipment: {
    weapon: "Dagger",
    shield: "Small Leather Shield",
    armor: {
      head: "Sorcerer Hood",
      chest: "Sorcerer Cloak",
      hands: "Sorcerer Manchette",
      legs: "Sorcerer Boots",
    },
    rings: [],
    items: ["Sorcerer's Catalyst"],
  },
  spells: {
    miracles: [],
    sorceries: ["Soul Arrow"],
    pyromancies: [],
  },
  startingSouls: 0,
  humanity: 0,
  notes:
    "Best starting class for magic builds. High attunement and intelligence, starts with a catalyst and Soul Arrow.",
};
