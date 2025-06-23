// Shield types for Dark Souls 1
// This defines the complete shield structure used throughout the application

export interface ShieldRequirements {
  strength: number;
  dexterity: number;
  intelligence: number;
  faith: number;
}

export interface ShieldDefense {
  physical: number;
  magic: number;
  fire: number;
  lightning: number;
  stability: number;
}

export interface ShieldEffect {
  parry?: boolean;
  bash?: boolean;
  special?: string;
  weightReduction?: number;
}

export interface Shield {
  icon: string;
  name: string;
  shieldType: string;
  requirements: ShieldRequirements;
  weight: number;
  defense: ShieldDefense;
  effect: ShieldEffect;
  upgradePath?: string;
  twoHanded?: boolean;
}

// Shield category types for organization
export type ShieldCategory =
  | "small-shields"
  | "standard-shields"
  | "greatshields";

// Collection of shields by category
export interface ShieldCollection {
  [category: string]: Shield[];
}

// All shields in the game
export type AllShields = {
  [K in ShieldCategory]: Shield[];
};

// Utility function to get shield with default values
export const getShieldWithDefaults = (shield: Partial<Shield>): Shield => {
  return {
    icon: shield.icon || "",
    name: shield.name || "",
    shieldType: shield.shieldType || "",
    requirements: shield.requirements || {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    weight: shield.weight || 0,
    defense: shield.defense || {
      physical: 0,
      magic: 0,
      fire: 0,
      lightning: 0,
      stability: 0,
    },
    effect: shield.effect || {
      parry: false,
      bash: false,
      special: "",
      weightReduction: 0,
    },
    upgradePath: shield.upgradePath,
    twoHanded: shield.twoHanded ?? false,
  };
};
