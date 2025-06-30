// Armor types for Dark Souls 1
// This defines the complete armor structure used throughout the application

export interface ArmorDefense {
  normal: number;
  strike: number;
  slash: number;
  thrust: number;
  magic: number;
  fire: number;
  lightning: number;
  bleed: number;
  poison: number;
  curse: number;
}

export interface ArmorEffect {
  poise?: number;
  weight?: number;
  staminaRegenBonus?: number; // Stamina regeneration bonus (per second)
  maxHpBonus?: number;
  special?: string;
  description?: string;
  equipLoadBonus?: number;
}

export interface Armor {
  icon: string;
  name: string;
  armorType: string;
  slot: "head" | "chest" | "hands" | "legs";
  weight: number;
  staminaRegenReduction?: number;
  defense: ArmorDefense;
  effect: ArmorEffect;
  upgradePath?: string;
  gender?: "male" | "female" | "both";
  covenant?: string;
  special?: boolean;
  set?: string; // Reference to armor set name
}

// New armor set interface
export interface ArmorSet {
  id: string;
  name: string;
  description?: string;
  armorType: string;
  pieces: {
    head?: Armor;
    chest?: Armor;
    hands?: Armor;
    legs?: Armor;
  };
  totalWeight: number;
  totalDefense: ArmorDefense;
  totalPoise: number;
  setBonus?: string;
  special?: boolean;
  covenant?: string;
  gender?: "male" | "female" | "both";
}

export type ArmorCategory =
  | "light-armor"
  | "medium-armor"
  | "heavy-armor"
  | "special-armor";

export interface ArmorCollection {
  [category: string]: Armor[];
}

export interface ArmorSetCollection {
  [category: string]: ArmorSet[];
}

export type AllArmor = {
  [K in ArmorCategory]: Armor[];
};

export type AllArmorSets = {
  [K in ArmorCategory]: ArmorSet[];
};

export const getArmorWithDefaults = (armor: Partial<Armor>): Armor => {
  return {
    icon: armor.icon || "/armor/default.png",
    name: armor.name || "Unknown Armor",
    armorType: armor.armorType || "light-armor",
    slot: armor.slot || "chest",
    weight: armor.weight || 0,
    defense: {
      normal: armor.defense?.normal || 0,
      strike: armor.defense?.strike || 0,
      slash: armor.defense?.slash || 0,
      thrust: armor.defense?.thrust || 0,
      magic: armor.defense?.magic || 0,
      fire: armor.defense?.fire || 0,
      lightning: armor.defense?.lightning || 0,
      bleed: armor.defense?.bleed || 0,
      poison: armor.defense?.poison || 0,
      curse: armor.defense?.curse || 0,
    },
    effect: {
      poise: armor.effect?.poise || 0,
      weight: armor.effect?.weight || 0,
      staminaRegenBonus: armor.effect?.staminaRegenBonus || 0,
      special: armor.effect?.special || undefined,
    },
    upgradePath: armor.upgradePath || "regular",
    gender: armor.gender || "both",
    covenant: armor.covenant || undefined,
    special: armor.special || false,
    set: armor.set || undefined,
  };
};

export const getArmorSetWithDefaults = (
  armorSet: Partial<ArmorSet>
): ArmorSet => {
  return {
    id: armorSet.id || "unknown-set",
    name: armorSet.name || "Unknown Set",
    description: armorSet.description || "",
    armorType: armorSet.armorType || "light-armor",
    pieces: armorSet.pieces || {},
    totalWeight: armorSet.totalWeight || 0,
    totalDefense: {
      normal: armorSet.totalDefense?.normal || 0,
      strike: armorSet.totalDefense?.strike || 0,
      slash: armorSet.totalDefense?.slash || 0,
      thrust: armorSet.totalDefense?.thrust || 0,
      magic: armorSet.totalDefense?.magic || 0,
      fire: armorSet.totalDefense?.fire || 0,
      lightning: armorSet.totalDefense?.lightning || 0,
      bleed: armorSet.totalDefense?.bleed || 0,
      poison: armorSet.totalDefense?.poison || 0,
      curse: armorSet.totalDefense?.curse || 0,
    },
    totalPoise: armorSet.totalPoise || 0,
    setBonus: armorSet.setBonus || undefined,
    special: armorSet.special || false,
    covenant: armorSet.covenant || undefined,
    gender: armorSet.gender || "both",
  };
};
