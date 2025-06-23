// Soft cap mapping for Dark Souls 1 character stats
// This file defines the soft cap breakpoints for each character stat

import type { CharacterStats } from "~/types/game/ds1/characters";

export interface SoftCapMapping {
  stat: keyof CharacterStats;
  caps: number[];
  maxLevel: number;
}

// Soft cap breakpoints for each stat in Dark Souls 1
export const SOFT_CAP_MAPPING: SoftCapMapping[] = [
  { stat: "vitality", caps: [30, 50], maxLevel: 99 },
  { stat: "attunement", caps: [50], maxLevel: 99 },
  { stat: "endurance", caps: [40], maxLevel: 99 },
  { stat: "strength", caps: [27, 40], maxLevel: 99 }, // 27 for two-handing, 40 for one-handing
  { stat: "dexterity", caps: [40, 45], maxLevel: 99 },
  { stat: "resistance", caps: [15, 30], maxLevel: 99 },
  { stat: "intelligence", caps: [40, 45, 50], maxLevel: 99 },
  { stat: "faith", caps: [40, 50], maxLevel: 99 },
];

/**
 * Get the soft caps for a specific stat
 * @param stat - The character stat to check
 * @param isTwoHanded - Whether the weapon is being two-handed (affects strength soft cap)
 * @returns Array of soft cap levels for the stat
 */
export function getSoftCaps(
  stat: keyof CharacterStats,
  isTwoHanded: boolean = false
): number[] {
  const mapping = SOFT_CAP_MAPPING.find((m) => m.stat === stat);
  if (!mapping) return [];

  // For strength, return different caps based on two-handing
  if (stat === "strength" && isTwoHanded) {
    return [27]; // Only the first soft cap when two-handing
  }

  return mapping.caps;
}

/**
 * Get the next soft cap level for a stat
 * @param stat - The character stat to check
 * @param currentLevel - The current level of the stat
 * @param isTwoHanded - Whether the weapon is being two-handed (affects strength soft cap)
 * @returns The next soft cap level, or null if at max
 */
export function getNextSoftCap(
  stat: keyof CharacterStats,
  currentLevel: number,
  isTwoHanded: boolean = false
): number | null {
  const caps = getSoftCaps(stat, isTwoHanded);
  const nextCap = caps.find((cap) => cap > currentLevel);
  return nextCap || null;
}

/**
 * Get the current soft cap tier for a stat
 * @param stat - The character stat to check
 * @param currentLevel - The current level of the stat
 * @param isTwoHanded - Whether the weapon is being two-handed (affects strength soft cap)
 * @returns The current soft cap tier (0 = before first cap, 1 = at first cap, etc.)
 */
export function getCurrentSoftCapTier(
  stat: keyof CharacterStats,
  currentLevel: number,
  isTwoHanded: boolean = false
): number {
  const caps = getSoftCaps(stat, isTwoHanded);
  for (let i = 0; i < caps.length; i++) {
    if (currentLevel < caps[i]) {
      return i;
    }
  }
  return caps.length; // At or beyond the last soft cap
}

/**
 * Check if a stat is at a soft cap
 * @param stat - The character stat to check
 * @param currentLevel - The current level of the stat
 * @param isTwoHanded - Whether the weapon is being two-handed (affects strength soft cap)
 * @returns True if the stat is exactly at a soft cap level
 */
export function isAtSoftCap(
  stat: keyof CharacterStats,
  currentLevel: number,
  isTwoHanded: boolean = false
): boolean {
  const caps = getSoftCaps(stat, isTwoHanded);
  return caps.includes(currentLevel);
}

/**
 * Check if a stat is at or beyond all soft caps
 * @param stat - The character stat to check
 * @param currentLevel - The current level of the stat
 * @param isTwoHanded - Whether the weapon is being two-handed (affects strength soft cap)
 * @returns True if the stat is at or beyond the final soft cap
 */
export function isAtMaxSoftCap(
  stat: keyof CharacterStats,
  currentLevel: number,
  isTwoHanded: boolean = false
): boolean {
  const caps = getSoftCaps(stat, isTwoHanded);
  return caps.length > 0 && currentLevel >= caps[caps.length - 1];
}

/**
 * Get the maximum level for a stat
 * @param stat - The character stat to check
 * @returns The maximum level for the stat
 */
export function getMaxLevel(stat: keyof CharacterStats): number {
  const mapping = SOFT_CAP_MAPPING.find((m) => m.stat === stat);
  return mapping ? mapping.maxLevel : 99;
}

/**
 * Get all soft cap breakpoints for all stats
 * @param isTwoHanded - Whether the weapon is being two-handed (affects strength soft cap)
 * @returns Object with stat names as keys and arrays of soft caps as values
 */
export function getAllSoftCaps(
  isTwoHanded: boolean = false
): Record<keyof CharacterStats, number[]> {
  const result: Partial<Record<keyof CharacterStats, number[]>> = {};

  SOFT_CAP_MAPPING.forEach((mapping) => {
    result[mapping.stat] = getSoftCaps(mapping.stat, isTwoHanded);
  });

  return result as Record<keyof CharacterStats, number[]>;
}
