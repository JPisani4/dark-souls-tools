// Miracle types for Dark Souls 1
// This defines the complete miracle structure used throughout the application

export interface MiracleRequirements {
  faith: number;
  intelligence?: number;
  attunement?: number;
}

export interface MiracleEffect {
  damage?: number;
  lightningDamage?: number;
  fireDamage?: number;
  healing?: number;
  buff?: string;
  duration?: number;
  range?: number;
  area?: number;
}

export interface Miracle {
  icon: string;
  name: string;
  miracleType: string;
  requirements: MiracleRequirements;
  attunementSlots: number;
  effect: MiracleEffect;
  description: string;
  location: string;
  covenant?: string;
  special?: boolean;
  uses: number;
}

// Miracle category types for organization
export type MiracleCategory = "healing" | "offensive" | "buff" | "special";

// Collection of miracles by category
export interface MiracleCollection {
  [category: string]: Miracle[];
}

// All miracles in the game
export type AllMiracles = {
  [K in MiracleCategory]: Miracle[];
};

// Utility function to get miracle with default values
export const getMiracleWithDefaults = (miracle: Partial<Miracle>): Miracle => {
  return {
    icon: miracle.icon || "",
    name: miracle.name || "",
    miracleType: miracle.miracleType || "healing",
    requirements: {
      faith: miracle.requirements?.faith || 0,
      intelligence: miracle.requirements?.intelligence || 0,
      attunement: miracle.requirements?.attunement || 0,
    },
    attunementSlots: miracle.attunementSlots || 1,
    effect: miracle.effect || {},
    description: miracle.description || "",
    location: miracle.location || "",
    covenant: miracle.covenant,
    special: miracle.special || false,
    uses: miracle.uses || 1,
  };
};
