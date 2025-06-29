// Character stats utilities for Dark Souls 1
// This file handles HP, Stamina, Equip Load calculations and dodge roll mechanics

import type { CharacterStats } from "~/types/game/ds1/characters";

// Base stats for calculations
export const BASE_HP = 300; // Base HP at level 1
export const BASE_STAMINA = 80; // Base stamina at level 1
export const BASE_EQUIP_LOAD = 50; // Base equip load at endurance level 10

// HP calculation constants
export const HP_PER_VITALITY = 30; // HP gained per vitality level
export const HP_SOFT_CAP_1 = 30; // First soft cap for vitality
export const HP_SOFT_CAP_2 = 50; // Second soft cap for vitality
export const HP_REDUCTION_AFTER_CAP_1 = 0.5; // HP gain reduction after first cap
export const HP_REDUCTION_AFTER_CAP_2 = 0.25; // HP gain reduction after second cap

// Stamina calculation constants
export const STAMINA_PER_ENDURANCE = 2; // Stamina gained per endurance level
export const STAMINA_SOFT_CAP = 40; // Soft cap for endurance
export const STAMINA_REDUCTION_AFTER_CAP = 0.5; // Stamina gain reduction after cap

// Equip Load calculation constants
export const EQUIP_LOAD_PER_ENDURANCE = 1; // Equip load gained per endurance level
export const EQUIP_LOAD_START_LEVEL = 10; // Endurance level where equip load starts

// Starting class endurance values
export const STARTING_CLASS_ENDURANCE: Record<string, number> = {
  warrior: 12,
  knight: 11,
  wanderer: 10,
  thief: 12,
  bandit: 14,
  hunter: 11,
  sorcerer: 8,
  pyromancer: 12,
  cleric: 10,
  deprived: 11,
};

// Dodge roll thresholds and mechanics
export interface DodgeRoll {
  name: string;
  equipLoadThreshold: number; // Percentage of equip load (0-100)
  iframes: number; // Invincibility frames
  recoveryFrames: number; // Recovery frames after iframes end
  instabilityFrames: number; // Instability frames (1.4x damage taken)
  endRecoveryFrames: number; // Recovery frames at end of animation
  totalFrames: number; // Total animation frames
  description: string;
}

export const DODGE_ROLLS: DodgeRoll[] = [
  // Ninja Flip (requires Dark Wood Grain Ring)
  {
    name: "Ninja Flip (0%)",
    equipLoadThreshold: 0,
    iframes: 13,
    recoveryFrames: 0,
    instabilityFrames: 0,
    endRecoveryFrames: 8,
    totalFrames: 19,
    description:
      "Fastest roll with most iframes. Requires Dark Wood Grain Ring.",
  },
  {
    name: "Ninja Flip (8.3%)",
    equipLoadThreshold: 8.3,
    iframes: 13,
    recoveryFrames: 0,
    instabilityFrames: 0,
    endRecoveryFrames: 7,
    totalFrames: 20,
    description:
      "Fastest roll with most iframes. Requires Dark Wood Grain Ring.",
  },
  {
    name: "Ninja Flip (16.6%)",
    equipLoadThreshold: 16.6,
    iframes: 13,
    recoveryFrames: 0,
    instabilityFrames: 0,
    endRecoveryFrames: 8,
    totalFrames: 21,
    description:
      "Fastest roll with most iframes. Requires Dark Wood Grain Ring.",
  },
  {
    name: "Ninja Flip (25%)",
    equipLoadThreshold: 25,
    iframes: 13,
    recoveryFrames: 0,
    instabilityFrames: 0,
    endRecoveryFrames: 9,
    totalFrames: 22,
    description:
      "Fastest roll with most iframes. Requires Dark Wood Grain Ring.",
  },
  // Fast Roll
  {
    name: "Fast Roll (0%)",
    equipLoadThreshold: 0,
    iframes: 11,
    recoveryFrames: 3,
    instabilityFrames: 7,
    endRecoveryFrames: 0,
    totalFrames: 21,
    description: "Fast roll with good iframes. Best for evading attacks.",
  },
  {
    name: "Fast Roll (8.3%)",
    equipLoadThreshold: 8.3,
    iframes: 11,
    recoveryFrames: 3,
    instabilityFrames: 8,
    endRecoveryFrames: 0,
    totalFrames: 22,
    description: "Fast roll with good iframes. Best for evading attacks.",
  },
  {
    name: "Fast Roll (16.6%)",
    equipLoadThreshold: 16.6,
    iframes: 11,
    recoveryFrames: 3,
    instabilityFrames: 8,
    endRecoveryFrames: 1,
    totalFrames: 23,
    description: "Fast roll with good iframes. Best for evading attacks.",
  },
  {
    name: "Fast Roll (25%)",
    equipLoadThreshold: 25,
    iframes: 11,
    recoveryFrames: 3,
    instabilityFrames: 8,
    endRecoveryFrames: 2,
    totalFrames: 24,
    description: "Fast roll with good iframes. Best for evading attacks.",
  },
  // Mid Roll
  {
    name: "Mid Roll (33.3%)",
    equipLoadThreshold: 33.3,
    iframes: 11,
    recoveryFrames: 4,
    instabilityFrames: 14,
    endRecoveryFrames: 2,
    totalFrames: 31,
    description: "Medium speed roll with good iframes. Balanced option.",
  },
  {
    name: "Mid Roll (41.6%)",
    equipLoadThreshold: 41.6,
    iframes: 11,
    recoveryFrames: 4,
    instabilityFrames: 14,
    endRecoveryFrames: 3,
    totalFrames: 32,
    description: "Medium speed roll with good iframes. Balanced option.",
  },
  {
    name: "Mid Roll (50%)",
    equipLoadThreshold: 50,
    iframes: 11,
    recoveryFrames: 4,
    instabilityFrames: 14,
    endRecoveryFrames: 4,
    totalFrames: 33,
    description: "Medium speed roll with good iframes. Balanced option.",
  },
  // Fat Roll
  {
    name: "Fat Roll (66.6%)",
    equipLoadThreshold: 66.6,
    iframes: 11,
    recoveryFrames: 9,
    instabilityFrames: 25,
    endRecoveryFrames: 1,
    totalFrames: 46,
    description: "Slow roll with fewer iframes. Poor for evasion.",
  },
  {
    name: "Fat Roll (83.3%)",
    equipLoadThreshold: 83.3,
    iframes: 11,
    recoveryFrames: 9,
    instabilityFrames: 25,
    endRecoveryFrames: 2,
    totalFrames: 47,
    description: "Slow roll with fewer iframes. Poor for evasion.",
  },
  {
    name: "Fat Roll (100%)",
    equipLoadThreshold: 100,
    iframes: 11,
    recoveryFrames: 9,
    instabilityFrames: 25,
    endRecoveryFrames: 3,
    totalFrames: 48,
    description: "Slow roll with fewer iframes. Poor for evasion.",
  },
];

/**
 * Get starting endurance for a character class
 * @param characterClass - The character class name
 * @returns The starting endurance value
 */
export function getStartingEndurance(characterClass: string): number {
  return STARTING_CLASS_ENDURANCE[characterClass.toLowerCase()] || 11;
}

/**
 * Calculate HP based on vitality level
 * @param vitality - The character's vitality level
 * @returns The calculated HP value
 */
export function calculateHP(vitality: number): number {
  if (vitality <= 0) return BASE_HP;

  let hp = BASE_HP;

  if (vitality <= HP_SOFT_CAP_1) {
    // Before first soft cap
    hp += vitality * HP_PER_VITALITY;
  } else if (vitality <= HP_SOFT_CAP_2) {
    // Between first and second soft cap
    hp += HP_SOFT_CAP_1 * HP_PER_VITALITY;
    const additionalVitality = vitality - HP_SOFT_CAP_1;
    hp += additionalVitality * HP_PER_VITALITY * HP_REDUCTION_AFTER_CAP_1;
  } else {
    // After second soft cap
    hp += HP_SOFT_CAP_1 * HP_PER_VITALITY;
    const secondCapVitality = HP_SOFT_CAP_2 - HP_SOFT_CAP_1;
    hp += secondCapVitality * HP_PER_VITALITY * HP_REDUCTION_AFTER_CAP_1;
    const additionalVitality = vitality - HP_SOFT_CAP_2;
    hp += additionalVitality * HP_PER_VITALITY * HP_REDUCTION_AFTER_CAP_2;
  }

  return Math.floor(hp);
}

/**
 * Calculate stamina based on endurance level
 * @param endurance - The character's endurance level
 * @returns The calculated stamina value
 */
export function calculateStamina(endurance: number): number {
  if (endurance <= 0) return BASE_STAMINA;

  let stamina = BASE_STAMINA;

  if (endurance <= STAMINA_SOFT_CAP) {
    // Before soft cap
    stamina += endurance * STAMINA_PER_ENDURANCE;
  } else {
    // After soft cap
    stamina += STAMINA_SOFT_CAP * STAMINA_PER_ENDURANCE;
    const additionalEndurance = endurance - STAMINA_SOFT_CAP;
    stamina +=
      additionalEndurance * STAMINA_PER_ENDURANCE * STAMINA_REDUCTION_AFTER_CAP;
  }

  return Math.floor(stamina);
}

/**
 * Calculate equip load based on endurance level
 * @param endurance - The character's endurance level
 * @returns The calculated equip load value
 */
export function calculateEquipLoad(endurance: number): number {
  if (endurance < EQUIP_LOAD_START_LEVEL) {
    return BASE_EQUIP_LOAD;
  }

  const additionalEndurance = endurance - EQUIP_LOAD_START_LEVEL;
  return BASE_EQUIP_LOAD + additionalEndurance * EQUIP_LOAD_PER_ENDURANCE;
}

/**
 * Calculate stamina regeneration rate
 * @param endurance - The character's endurance level
 * @param equipmentBonuses - Bonuses from equipped items (armor, rings, shields)
 * @returns The stamina regeneration rate (stamina per second)
 */
export function calculateStaminaRegen(
  endurance: number,
  equipmentBonuses: {
    armor?: number;
    rings?: number;
    shields?: number;
  } = {}
): number {
  // Base stamina regen is 45 per second
  const baseRegen = 45;

  // Endurance provides a small bonus to stamina regen
  const enduranceBonus = endurance * 0.5;

  // Equipment bonuses
  const armorBonus = equipmentBonuses.armor || 0;
  const ringBonus = equipmentBonuses.rings || 0;
  const shieldBonus = equipmentBonuses.shields || 0;

  return baseRegen + enduranceBonus + armorBonus + ringBonus + shieldBonus;
}

/**
 * Get the dodge roll type based on equip load percentage
 * @param equipLoadPercentage - The percentage of equip load being used (0-100)
 * @param hasDarkWoodGrainRing - Whether the character has the Dark Wood Grain Ring equipped
 * @returns The dodge roll information
 */
export function getDodgeRoll(
  equipLoadPercentage: number,
  hasDarkWoodGrainRing: boolean = false
): DodgeRoll {
  // If Dark Wood Grain Ring is equipped and equip load is 25% or less, use Ninja Flip
  if (hasDarkWoodGrainRing && equipLoadPercentage <= 25) {
    for (const roll of DODGE_ROLLS) {
      if (
        roll.name.startsWith("Ninja Flip") &&
        equipLoadPercentage <= roll.equipLoadThreshold
      ) {
        return roll;
      }
    }
  }

  // Otherwise, use normal rolls
  for (const roll of DODGE_ROLLS) {
    if (
      !roll.name.startsWith("Ninja Flip") &&
      equipLoadPercentage <= roll.equipLoadThreshold
    ) {
      return roll;
    }
  }

  // Fallback to worst roll if somehow above all thresholds
  return DODGE_ROLLS[DODGE_ROLLS.length - 1];
}

/**
 * Calculate equip load percentage
 * @param equippedWeight - The total weight of equipped items
 * @param totalEquipLoad - The character's total equip load capacity
 * @returns The percentage of equip load being used (0-100)
 */
export function calculateEquipLoadPercentage(
  equippedWeight: number,
  totalEquipLoad: number
): number {
  if (totalEquipLoad <= 0) return 100;
  return Math.min((equippedWeight / totalEquipLoad) * 100, 100);
}

/**
 * Calculate all derived stats for a character
 * @param stats - The character's base stats
 * @returns The character stats with derived values calculated
 */
export function calculateDerivedStats(stats: CharacterStats): CharacterStats {
  return {
    ...stats,
    hp: calculateHP(stats.vitality),
    stamina: calculateStamina(stats.endurance),
    equipLoad: calculateEquipLoad(stats.endurance),
  };
}

/**
 * Get the minimum endurance level needed for a specific dodge roll
 * @param targetRoll - The desired dodge roll type
 * @param equippedWeight - The weight of equipped items
 * @returns The minimum endurance level needed, or null if impossible
 */
export function getMinEnduranceForRoll(
  targetRoll: string,
  equippedWeight: number
): number | null {
  const roll = DODGE_ROLLS.find((r) => r.name === targetRoll);
  if (!roll) return null;

  // Calculate required equip load capacity
  const requiredEquipLoad = (equippedWeight / roll.equipLoadThreshold) * 100;

  // Calculate required endurance level
  if (requiredEquipLoad <= BASE_EQUIP_LOAD) {
    return EQUIP_LOAD_START_LEVEL;
  }

  const additionalEquipLoad = requiredEquipLoad - BASE_EQUIP_LOAD;
  const additionalEndurance = Math.ceil(
    additionalEquipLoad / EQUIP_LOAD_PER_ENDURANCE
  );

  return EQUIP_LOAD_START_LEVEL + additionalEndurance;
}

/**
 * Get the next endurance level that would improve dodge roll
 * @param currentEndurance - Current endurance level
 * @param equippedWeight - Weight of equipped items
 * @param hasDarkWoodGrainRing - Whether the character has the Dark Wood Grain Ring
 * @returns The next endurance level that improves dodge roll, or null if at best
 */
export function getNextEnduranceForBetterRoll(
  currentEndurance: number,
  equippedWeight: number,
  hasDarkWoodGrainRing: boolean = false
): number | null {
  const currentEquipLoad = calculateEquipLoad(currentEndurance);
  const currentPercentage = calculateEquipLoadPercentage(
    equippedWeight,
    currentEquipLoad
  );
  const currentRoll = getDodgeRoll(currentPercentage, hasDarkWoodGrainRing);

  // Find the next better roll
  const currentRollIndex = DODGE_ROLLS.findIndex(
    (r) => r.name === currentRoll.name
  );
  if (currentRollIndex <= 0) return null; // Already at best roll

  const nextRoll = DODGE_ROLLS[currentRollIndex - 1];
  return getMinEnduranceForRoll(nextRoll.name, equippedWeight);
}

/**
 * Calculate total weight of equipped items
 * @param items - Array of equipped items with weight properties
 * @returns Total weight
 */
export function calculateTotalWeight(items: Array<{ weight: number }>): number {
  return items.reduce((total, item) => total + (item.weight || 0), 0);
}
