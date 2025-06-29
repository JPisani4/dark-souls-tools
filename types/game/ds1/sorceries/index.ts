// Sorcery types for Dark Souls 1
// This defines the complete sorcery structure used throughout the application

export interface SorceryRequirements {
  intelligence: number;
  faith?: number;
  attunement?: number;
}

export interface SorceryEffect {
  damage?: number;
  magicDamage?: number;
  fireDamage?: number;
  lightningDamage?: number;
  buff?: string;
  duration?: number;
  range?: number;
  area?: number;
  tracking?: boolean;
}

export interface Sorcery {
  icon: string;
  name: string;
  sorceryType: string;
  requirements: SorceryRequirements;
  attunementSlots: number;
  effect: SorceryEffect;
  description: string;
  location: string;
  covenant?: string;
  special?: boolean;
  uses: number;
}

// Sorcery category types for organization
export type SorceryCategory = "offensive" | "weapon-buff" | "support";

// Collection of sorceries by category
export interface SorceryCollection {
  [category: string]: Sorcery[];
}

// All sorceries in the game
export type AllSorceries = {
  [K in SorceryCategory]: Sorcery[];
};

// Utility function to get sorcery with default values
export const getSorceryWithDefaults = (sorcery: Partial<Sorcery>): Sorcery => {
  return {
    icon: sorcery.icon || "",
    name: sorcery.name || "",
    sorceryType: sorcery.sorceryType || "soul-arrow",
    requirements: {
      intelligence: sorcery.requirements?.intelligence || 0,
      faith: sorcery.requirements?.faith || 0,
      attunement: sorcery.requirements?.attunement || 0,
    },
    attunementSlots: sorcery.attunementSlots || 1,
    effect: sorcery.effect || {},
    description: sorcery.description || "",
    location: sorcery.location || "",
    covenant: sorcery.covenant,
    special: sorcery.special || false,
    uses: sorcery.uses || 1,
  };
};
