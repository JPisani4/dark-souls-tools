// Character stats utilities for Dark Souls 1
// This file handles HP, Stamina, Equip Load calculations and dodge roll mechanics

import type { CharacterStats } from "~/types/game/ds1/characters";
import { vitalityHp } from "~/utils/games/ds1/vitalityHp";
import { calculateStamina } from "~/utils/games/ds1/enduranceStamina";
import {
  HP_PER_VITALITY,
  STAMINA_PER_ENDURANCE,
  EQUIP_LOAD_PER_ENDURANCE,
  EQUIP_LOAD_START_LEVEL,
} from "~/utils/constants";

// Base stats for calculations
export const BASE_HP = 300; // Base HP at level 1
export const BASE_STAMINA = 80; // Base stamina at level 1
export const BASE_EQUIP_LOAD = 50; // Base equip load at endurance level 10

// HP calculation constants
export const HP_SOFT_CAP_1 = 30; // First soft cap for vitality
export const HP_SOFT_CAP_2 = 50; // Second soft cap for vitality
export const HP_REDUCTION_AFTER_CAP_1 = 0.5; // HP gain reduction after first cap
export const HP_REDUCTION_AFTER_CAP_2 = 0.25; // HP gain reduction after second cap

// Stamina calculation constants
export const STAMINA_SOFT_CAP = 40; // Soft cap for endurance (stamina stops increasing here)
export const STAMINA_REDUCTION_AFTER_CAP = 0.5; // Stamina gain reduction after cap (unused now)

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

export interface MovementSpeed {
  weightClass: string;
  speed: string;
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

// Movement speed thresholds and mechanics
export const MOVEMENT_SPEEDS: MovementSpeed[] = [
  {
    weightClass: "Light",
    speed: "Fastest",
    description: "25% or less equip load - optimal movement speed",
  },
  {
    weightClass: "Medium",
    speed: "Moderate",
    description: "Between 25% and 50% equip load - standard movement speed",
  },
  {
    weightClass: "Heavy",
    speed: "Slow",
    description: "Between 50% and 100% equip load - reduced movement speed",
  },
  {
    weightClass: "Over-encumbered",
    speed: "Slowest",
    description: "More than 100% equip load - cannot roll, very slow movement",
  },
];

/**
 * Get movement speed based on equip load percentage
 * @param equipLoadPercentage - The percentage of equip load being used (0-100+)
 * @returns The movement speed information
 */
export function getMovementSpeed(equipLoadPercentage: number): MovementSpeed {
  if (equipLoadPercentage <= 25) {
    return MOVEMENT_SPEEDS[0]; // Light
  } else if (equipLoadPercentage <= 50) {
    return MOVEMENT_SPEEDS[1]; // Medium
  } else if (equipLoadPercentage <= 100) {
    return MOVEMENT_SPEEDS[2]; // Heavy
  } else {
    return MOVEMENT_SPEEDS[3]; // Over-encumbered
  }
}

/**
 * Get starting endurance for a character class
 * @param characterClass - The character class name
 * @returns The starting endurance value
 */
export function getStartingEndurance(characterClass: string): number {
  return STARTING_CLASS_ENDURANCE[characterClass.toLowerCase()] || 11;
}

/**
 * Calculate HP based on vitality level using exact game values
 * @param vitality - The character's vitality level
 * @returns The calculated HP value
 */
export function calculateHP(vitality: number): number {
  if (vitality <= 0) return vitalityHp[1] || 400;
  if (vitality > 99) return vitalityHp[99] || 1900;
  return vitalityHp[vitality] || 400;
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
  // Base stamina regen is 45 per second (endurance does not affect this in DS1)
  const baseRegen = 45;

  // Equipment bonuses
  const armorBonus = equipmentBonuses.armor || 0;
  const ringBonus = equipmentBonuses.rings || 0;
  const shieldBonus = equipmentBonuses.shields || 0;

  return baseRegen + armorBonus + ringBonus + shieldBonus;
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
 * @param equipmentBonuses - Bonuses from equipped items
 * @returns The minimum endurance level needed, or null if impossible
 */
export function getMinEnduranceForRoll(
  targetRoll: string,
  equippedWeight: number,
  equipmentBonuses: { equipLoadMultipliers: number[] }
): number | null {
  const roll = DODGE_ROLLS.find((r) => r.name === targetRoll);
  if (!roll) return null;

  // Calculate the minimum equip load needed for this roll threshold
  const minEquipLoad = equippedWeight / (roll.equipLoadThreshold / 100);

  // Find the minimum endurance such that calculateEquipLoadWithBonuses(endurance, equipmentBonuses) >= minEquipLoad
  for (let endurance = EQUIP_LOAD_START_LEVEL; endurance <= 99; endurance++) {
    if (
      calculateEquipLoadWithBonuses(endurance, equipmentBonuses) >= minEquipLoad
    ) {
      return endurance;
    }
  }
  return null; // Not possible
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
  return getMinEnduranceForRoll(nextRoll.name, equippedWeight, {
    equipLoadMultipliers: [],
  });
}

/**
 * Calculate total weight of equipped items
 * @param items - Array of equipped items with weight properties
 * @returns Total weight
 */
export function calculateTotalWeight(items: Array<{ weight: number }>): number {
  const totalWeight = items.reduce(
    (total, item) => total + (item.weight || 0),
    0
  );
  // Round to the nearest tenth
  return Math.round(totalWeight * 10) / 10;
}

/**
 * Calculate equipment bonuses from all equipped items
 * @param weapons - Array of equipped weapons
 * @param shields - Array of equipped shields
 * @param armor - Array of equipped armor
 * @param rings - Array of equipped rings
 * @returns Combined equipment bonuses
 */
export function calculateEquipmentBonuses(
  weapons: Array<{ effect?: any }> = [],
  shields: Array<{ effect?: any }> = [],
  armor: Array<{ effect?: any; staminaRegenReduction?: number }> = [],
  rings: Array<{ effect?: any }> = []
) {
  const bonuses = {
    hpBonus: 0,
    staminaBonus: 0,
    staminaRegenBonus: 0,
    equipLoadMultipliers: [] as number[], // Store as separate multipliers
    hasDarkWoodGrainRing: false,
  };

  // Calculate bonuses from rings
  rings.forEach((ring) => {
    if (ring.effect) {
      // Handle direct effect properties
      bonuses.hpBonus += ring.effect.hpBonus || 0;
      bonuses.staminaBonus += ring.effect.staminaBonus || 0;
      bonuses.staminaRegenBonus += ring.effect.staminaRegenBonus || 0;

      // Store equip load bonuses as separate multipliers
      if (ring.effect.equipLoadBonus) {
        bonuses.equipLoadMultipliers.push(1 + ring.effect.equipLoadBonus / 100);
      }

      // Handle statBonus object (for rings like Ring of Favor and Protection)
      if (ring.effect.statBonus) {
        bonuses.hpBonus += ring.effect.statBonus.maxHp || 0;
        bonuses.staminaBonus += ring.effect.statBonus.staminaBonus || 0;
        if (ring.effect.statBonus.equipLoadBonus) {
          bonuses.equipLoadMultipliers.push(
            1 + ring.effect.statBonus.equipLoadBonus / 100
          );
        }
      }

      // Check for Dark Wood Grain Ring
      if (ring.effect.special === "dark-wood-grain-ring") {
        bonuses.hasDarkWoodGrainRing = true;
      }
    }
  });

  // Calculate bonuses from armor
  armor.forEach((piece) => {
    if (piece.effect) {
      bonuses.staminaRegenBonus += piece.effect.staminaRegenBonus || 0;
      if (piece.effect.equipLoadBonus) {
        bonuses.equipLoadMultipliers.push(
          1 + piece.effect.equipLoadBonus / 100
        );
      }
      // Add maxHpBonus from armor effects
      if (piece.effect.maxHpBonus) {
        bonuses.hpBonus += piece.effect.maxHpBonus;
      }
    }
    // Handle stamina regeneration reduction from armor weight
    if (piece.staminaRegenReduction) {
      bonuses.staminaRegenBonus -= piece.staminaRegenReduction;
    }
  });

  // Calculate bonuses from shields
  shields.forEach((shield) => {
    if (shield.effect) {
      bonuses.staminaRegenBonus += shield.effect.staminaRegenBonus || 0;
    }
  });

  return bonuses;
}

/**
 * Calculate max HP with equipment bonuses
 * @param vitality - Character's vitality level
 * @param equipmentBonuses - Bonuses from equipped items
 * @returns Maximum HP
 */
export function calculateMaxHp(
  vitality: number,
  equipmentBonuses: { hpBonus: number } = { hpBonus: 0 }
): number {
  const baseHp = calculateHP(vitality);
  // Handle percentage-based bonuses (like Ring of Favor and Protection)
  const percentageBonus = baseHp * (equipmentBonuses.hpBonus / 100);
  return baseHp + percentageBonus;
}

/**
 * Calculate max stamina with equipment bonuses
 * @param endurance - Character's endurance level
 * @param equipmentBonuses - Bonuses from equipped items
 * @returns Maximum stamina
 */
export function calculateMaxStamina(
  endurance: number,
  equipmentBonuses: { staminaBonus: number } = { staminaBonus: 0 }
): number {
  const baseStamina = calculateStamina(endurance);
  // Handle percentage-based bonuses (like Ring of Favor and Protection)
  const percentageBonus = baseStamina * (equipmentBonuses.staminaBonus / 100);
  return baseStamina + percentageBonus;
}

/**
 * Calculate stamina regeneration with equipment bonuses
 * @param endurance - Character's endurance level
 * @param equipmentBonuses - Bonuses from equipped items
 * @returns Stamina regeneration rate
 */
export function calculateStaminaRegenWithBonuses(
  endurance: number,
  equipmentBonuses: { staminaRegenBonus: number } = { staminaRegenBonus: 0 }
): number {
  const baseRegen = calculateStaminaRegen(endurance);
  const totalBonus = equipmentBonuses.staminaRegenBonus || 0;
  const totalRegen = Math.max(0, baseRegen + totalBonus); // Ensure stamina regen doesn't go below 0
  return Math.round(totalRegen); // Round to whole number to avoid decimal display
}

/**
 * Calculate equip load with equipment bonuses
 * @param endurance - Character's endurance level
 * @param equipmentBonuses - Bonuses from equipped items
 * @returns Equip load capacity
 */
export function calculateEquipLoadWithBonuses(
  endurance: number,
  equipmentBonuses: { equipLoadMultipliers: number[] } = {
    equipLoadMultipliers: [],
  }
): number {
  const baseEquipLoad = calculateEquipLoad(endurance);

  // Apply bonuses multiplicatively to match in-game behavior
  // In-game: Havel's Ring (+50%) is applied first, then Ring of Favor and Protection (+20%)
  // So with both rings: base * 1.5 * 1.2 = base * 1.8
  // The equipLoadMultipliers are the separate multipliers (1.5 and 1.2)
  // We need to calculate the total multiplier
  const totalMultiplier = equipmentBonuses.equipLoadMultipliers.reduce(
    (total, multiplier) => total * multiplier,
    1
  );
  return baseEquipLoad * totalMultiplier;
}

/**
 * Calculate dodge roll type based on equip load percentage and equipment
 * @param equipLoadPercentage - Percentage of equip load being used
 * @param hasDarkWoodGrainRing - Whether the character has the Dark Wood Grain Ring
 * @returns Dodge roll type name
 */
export function calculateDodgeRollType(
  equipLoadPercentage: number,
  hasDarkWoodGrainRing: boolean = false
): string {
  const dodgeRoll = getDodgeRoll(equipLoadPercentage, hasDarkWoodGrainRing);
  return dodgeRoll.name;
}

/**
 * Calculate all derived stats for a character with equipment
 * @param stats - Base character stats
 * @param weapons - Equipped weapons
 * @param shields - Equipped shields
 * @param armor - Equipped armor
 * @param rings - Equipped rings
 * @returns Character stats with derived values calculated
 */
export function calculateAllDerivedStats(
  stats: CharacterStats,
  weapons: Array<{ weight: number; effect?: any } | any> = [],
  shields: Array<{ weight: number; effect?: any } | any> = [],
  armor: Array<
    | {
        weight: number;
        effect?: any;
        staminaRegenReduction?: number;
      }
    | any
  > = [],
  rings: Array<{ effect?: any } | any> = []
): CharacterStats {
  // Calculate equipment bonuses
  const equipmentBonuses = calculateEquipmentBonuses(
    weapons,
    shields,
    armor,
    rings
  );

  // Calculate total equipped weight
  const allItems = [
    ...weapons.filter(
      (item) => item && typeof item === "object" && "weight" in item
    ),
    ...shields.filter(
      (item) => item && typeof item === "object" && "weight" in item
    ),
    ...armor.filter(
      (item) => item && typeof item === "object" && "weight" in item
    ),
  ];
  const equippedWeight = calculateTotalWeight(allItems);

  // Calculate base derived stats
  const baseDerivedStats = calculateDerivedStats(stats);

  // Calculate enhanced derived stats with equipment bonuses
  const maxHp = Math.floor(calculateMaxHp(stats.vitality, equipmentBonuses));
  const maxStamina =
    Math.round(calculateMaxStamina(stats.endurance, equipmentBonuses) * 10) /
    10;
  const staminaRegen =
    Math.round(
      calculateStaminaRegenWithBonuses(stats.endurance, equipmentBonuses) * 10
    ) / 10;
  const equipLoad =
    Math.floor(
      calculateEquipLoadWithBonuses(stats.endurance, equipmentBonuses) * 10
    ) / 10;

  // Calculate equip load percentage
  const equipLoadPercentage =
    Math.round(calculateEquipLoadPercentage(equippedWeight, equipLoad) * 10) /
    10;

  // Calculate dodge roll type
  const dodgeRoll = calculateDodgeRollType(
    equipLoadPercentage,
    equipmentBonuses.hasDarkWoodGrainRing
  );

  // Calculate movement speed
  const movementSpeed = getMovementSpeed(equipLoadPercentage);

  return {
    ...baseDerivedStats,
    maxHp,
    maxStamina,
    staminaRegen,
    equipLoad,
    dodgeRoll,
    equippedWeight: Math.round(equippedWeight * 10) / 10,
    equipLoadPercentage,
    movementSpeed: movementSpeed.speed,
    weightClass: movementSpeed.weightClass,
  };
}
