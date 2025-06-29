// Character types for Dark Souls 1
// This defines the complete character structure used throughout the application

export interface CharacterStats {
  level: number;
  vitality: number;
  attunement: number;
  endurance: number;
  strength: number;
  dexterity: number;
  resistance: number;
  intelligence: number;
  faith: number;
  // Derived stats
  hp: number;
  stamina: number;
  equipLoad: number;
}

export interface CharacterEquipment {
  weapon: string;
  shield: string;
  armor: {
    head: string;
    chest: string;
    hands: string;
    legs: string;
  };
  rings: string[];
  items: string[];
}

export interface CharacterSpells {
  miracles: string[];
  sorceries: string[];
  pyromancies: string[];
}

export interface StartingCharacter {
  name: string;
  class: string;
  description: string;
  icon: string;
  startingLevel: number;
  stats: CharacterStats;
  equipment: CharacterEquipment;
  spells: CharacterSpells;
  startingSouls: number;
  humanity: number;
  covenant?: string;
  specialAbilities?: string[];
  startingGift?: string;
  notes?: string;
}

// Character class types for organization
export type CharacterClass =
  | "warrior"
  | "knight"
  | "wanderer"
  | "thief"
  | "bandit"
  | "hunter"
  | "sorcerer"
  | "pyromancer"
  | "cleric"
  | "deprived";

// Collection of characters by class (loose type, not canonical)
export interface CharacterCollection {
  [key: string]: StartingCharacter[];
}

// All characters in the game
export type AllCharacters = Record<CharacterClass, StartingCharacter[]>;

// Starting gift types
export type StartingGift =
  | "none"
  | "binoculars"
  | "black-firebomb"
  | "twin-humanities"
  | "master-key"
  | "tiny-being-ring"
  | "old-witch-ring"
  | "divine-blessing"
  | "purging-stone";

// Covenant types
export type Covenant =
  | "none"
  | "way-of-white"
  | "princess-guard"
  | "warriors-of-sunlight"
  | "darkwraith"
  | "path-of-dragon"
  | "gravelord-servant"
  | "forest-hunter"
  | "chaos-servant"
  | "blade-of-darkmoon";
