// Pyromancy types for Dark Souls 1
// This defines the complete pyromancy structure used throughout the application

export interface PyromancyRequirements {
  // Pyromancies don't have stat requirements, but some may have attunement requirements
  attunement?: number;
  // Some pyromancies may have covenant requirements
  covenant?: string;
}

export interface PyromancyEffect {
  damage?: number;
  fireDamage?: number;
  poisonDamage?: number;
  toxicDamage?: number;
  acidDamage?: number;
  buff?: string;
  duration?: number;
  range?: number;
  area?: number;
  tracking?: boolean;
  // Special effects for pyromancies
  weaponDegradation?: boolean;
  armorDegradation?: boolean;
  lavaPools?: boolean;
  statusEffect?: string;
}

export interface Pyromancy {
  icon: string;
  name: string;
  pyromancyType: string;
  requirements: PyromancyRequirements;
  attunementSlots: number;
  effect: PyromancyEffect;
  description: string;
  location: string;
  covenant?: string;
  special?: boolean;
  uses: number;
  // Pyromancy-specific fields
  type?: "fire" | "poison" | "toxic" | "acid" | "physical" | "support";
  affinity?: string;
}

// Pyromancy category types for organization
export type PyromancyCategory = "offensive" | "support" | "status" | "special";

// Collection of pyromancies by category
export interface PyromancyCollection {
  [category: string]: Pyromancy[];
}

// All pyromancies in the game
export type AllPyromancies = {
  [K in PyromancyCategory]: Pyromancy[];
};

// Utility function to get pyromancy with default values
export const getPyromancyWithDefaults = (
  pyromancy: Partial<Pyromancy>
): Pyromancy => {
  return {
    icon: pyromancy.icon || "",
    name: pyromancy.name || "",
    pyromancyType: pyromancy.pyromancyType || "fire",
    requirements: {
      attunement: pyromancy.requirements?.attunement || 0,
      covenant: pyromancy.requirements?.covenant,
    },
    attunementSlots: pyromancy.attunementSlots || 1,
    effect: pyromancy.effect || {},
    description: pyromancy.description || "",
    location: pyromancy.location || "",
    covenant: pyromancy.covenant,
    special: pyromancy.special || false,
    uses: pyromancy.uses || 1,
    type: pyromancy.type || "fire",
    affinity: pyromancy.affinity || "fire",
  };
};
