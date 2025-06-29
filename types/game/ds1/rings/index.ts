// Ring types for Dark Souls 1
// This defines the complete ring structure used throughout the application

export interface RingRequirements {
  strength: number;
  dexterity: number;
  intelligence: number;
  faith: number;
}

export interface RingEffect {
  statBonus?: {
    vitality?: number;
    attunement?: number;
    endurance?: number;
    strength?: number;
    dexterity?: number;
    resistance?: number;
    intelligence?: number;
    faith?: number;
    phsyicalDefense?: number;
    magicDefense?: number;
    fireDefense?: number;
    lightningDefense?: number;
    bleedResist?: number;
    poisonResist?: number;
    curseResist?: number;
    attackPower?: number;
    defense?: number;
    magicEffectLength?: number;
    magicDamage?: number;
    miracleUses?: number;
    maxHp?: number;
    miraclePower?: number;
    counterDamage?: number;
    poise?: number;
    bowRange?: number;
    criticalDamage?: number;
    durability?: number;
    itemDiscovery?: number;
    soulGain?: number;
    staminaBonus?: number;
    equipLoadBonus?: number;
  };
  equipLoadBonus?: number;
  staminaBonus?: number;
  staminaRegenBonus?: number;
  hpBonus?: number;
  special?: string;
  attunementSlots?: number;
  maxHp?: number;
  miracleSynergy?: number;
}

export interface Ring {
  icon: string;
  name: string;
  ringType: string;
  requirements: RingRequirements;
  effect: RingEffect;
  covenant?: string;
  special?: boolean;
  description: string;
  location: string;
  weight?: number;
}

export type RingCategory =
  | "stat-boost"
  | "defense"
  | "offense"
  | "utility"
  | "covenant"
  | "special";

export interface RingCollection {
  [category: string]: Ring[];
}

export type AllRings = {
  [K in RingCategory]: Ring[];
};

export const getRingWithDefaults = (ring: Partial<Ring>): Ring => {
  return {
    icon: ring.icon || "/rings/default.png",
    name: ring.name || "Unknown Ring",
    ringType: ring.ringType || "utility",
    requirements: {
      strength: ring.requirements?.strength || 0,
      dexterity: ring.requirements?.dexterity || 0,
      intelligence: ring.requirements?.intelligence || 0,
      faith: ring.requirements?.faith || 0,
    },
    effect: {
      statBonus: ring.effect?.statBonus || {},
      equipLoadBonus: ring.effect?.equipLoadBonus || 0,
      staminaBonus: ring.effect?.staminaBonus || 0,
      staminaRegenBonus: ring.effect?.staminaRegenBonus || 0,
      hpBonus: ring.effect?.hpBonus || 0,
      special: ring.effect?.special || undefined,
    },
    covenant: ring.covenant || undefined,
    special: ring.special || false,
    description:
      ring.description || "A mysterious ring with unknown properties.",
    location: ring.location || "Unknown location",
    weight: ring.weight || 0,
  };
};
