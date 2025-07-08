// AR Calculation Lookup Tables for Dark Souls 1
// This file contains stat scaling multipliers, stat rating tables, humanity scaling, and scaling letter/percentage conversions.

// Scaling letter to percentage range
export const SCALING_LETTER_TO_RANGE = {
  E: { min: 0.01, max: 0.24 }, // 1%–24%
  D: { min: 0.25, max: 0.49 }, // 25%–49%
  C: { min: 0.5, max: 0.74 }, // 50%–74%
  B: { min: 0.75, max: 0.99 }, // 75%–99%
  A: { min: 1.0, max: 1.39 }, // 100%–139%
  S: { min: 1.4, max: 2.0 }, // 140%–200%
};

// Percentage to scaling letter (for display)
export function getScalingLetterFromValue(
  value: number
): keyof typeof SCALING_LETTER_TO_RANGE {
  if (value >= 1.4) return "S";
  if (value >= 1.0) return "A";
  if (value >= 0.75) return "B";
  if (value >= 0.5) return "C";
  if (value >= 0.25) return "D";
  return "E";
}

// Scaling letter to multiplier (for calculation, e.g., S = 1.4, A = 1.0, etc.)
export const SCALING_LETTER_TO_MULTIPLIER = {
  E: 0.12, // midpoint of 1%–24%
  D: 0.37, // midpoint of 25%–49%
  C: 0.62, // midpoint of 50%–74%
  B: 0.87, // midpoint of 75%–99%
  A: 1.195, // midpoint of 100%–139%
  S: 1.7, // midpoint of 140%–200%
};

// Stat Rating Table (for Strength, Dexterity, Intelligence, Faith)
// These are breakpoints; interpolate linearly between them for in-between values.
// Stat level : Rating (as a multiplier, e.g., 0.05 = 5%)
export const STAT_RATING_TABLE = [
  { level: 10, rating: 0.05 }, // 5%
  { level: 20, rating: 0.4 }, // 40%
  { level: 40, rating: 0.85 }, // 85%
  { level: 99, rating: 1.0 }, // 100%
];

/**
 * Get the stat rating multiplier for a given stat level.
 * Uses correct stepwise accumulation per the DS1 AR table.
 *
 * - 1–9: +0.55% per level (statLevel * 0.0055)
 * - 10–19: +3.5% per level above 9
 * - 20–39: +2.25% per level above 19
 * - 40–99: +0.25% per level above 39
 * - Capped at 100% at 99
 *
 * @param statLevel The stat level (1-99)
 * @returns The rating multiplier (0.0 - 1.0)
 */
export function getStatRating(statLevel: number): number {
  if (statLevel < 1) return 0;
  let rating = 0;
  // 1–9: +0.55% per level
  if (statLevel <= 9) {
    rating = statLevel * 0.0055;
  } else {
    // 1–9
    rating = 9 * 0.0055;
    // 10: 5% (hard-coded)
    if (statLevel >= 10) {
      rating = 0.05;
      // 11–19: +3.5% per level above 10
      if (statLevel <= 19) {
        rating += (statLevel - 10) * 0.035;
      } else {
        rating += 9 * 0.035;
        // 20–39
        if (statLevel <= 39) {
          rating += (statLevel - 19) * 0.0225;
        } else {
          rating += 20 * 0.0225;
          // 40–99
          rating += (Math.min(statLevel, 99) - 39) * 0.0025;
        }
      }
    }
  }
  if (rating > 1.0) rating = 1.0;
  return rating;
}

// Note: For Strength, if two-handing, use Math.floor(strength * 1.5) for the effective stat level.
// This modifier should be applied before calling getStatRating for strength.

// TODO: Add humanity scaling tables here as you provide them.

// Magic Stat Rating Table (for Intelligence, Faith)
// Stat level : Rating (as a multiplier, e.g., 0.05 = 5%)
export const MAGIC_STAT_RATING_TABLE = [
  { level: 10, rating: 0.05 }, // 5%
  { level: 30, rating: 0.5 }, // 50%
  { level: 50, rating: 0.8 }, // 80%
  { level: 99, rating: 1.0 }, // 100%
];

/**
 * Get the stat rating multiplier for a given stat level (Intelligence, Faith).
 * Uses correct stepwise accumulation per the DS1 AR table for magic stats.
 *
 * - 1–9: +0.55% per level (statLevel * 0.0055)
 * - 10–29: +2.25% per level above 9
 * - 30–49: +1.5% per level above 29
 * - 50–99: +0.41% per level above 49
 * - Capped at 100% at 99
 *
 * @param statLevel The stat level (1-99)
 * @returns The rating multiplier (0.0 - 1.0)
 */
export function getMagicStatRating(statLevel: number): number {
  if (statLevel < 1) return 0;
  let rating = 0;
  // 1–9: +0.55% per level
  if (statLevel <= 9) {
    rating = statLevel * 0.0055;
  } else {
    // 1–9
    rating = 9 * 0.0055;
    // 10: 5% (hard-coded)
    if (statLevel >= 10) {
      rating = 0.05;
      // 11–29: +2.25% per level above 10
      if (statLevel <= 29) {
        rating += (statLevel - 10) * 0.0225;
      } else {
        rating += 19 * 0.0225;
        // 30: 50% (hard-coded)
        if (statLevel >= 30) {
          rating = 0.5;
          // 31–49: +1.50% per level above 30
          if (statLevel <= 49) {
            rating += (statLevel - 30) * 0.015;
          } else {
            rating += 19 * 0.015;
            // 50: 80% (hard-coded)
            if (statLevel >= 50) {
              rating = 0.8;
              // 51–99: +0.41% per level above 50
              rating += (Math.min(statLevel, 99) - 50) * 0.0041;
            }
          }
        }
      }
    }
  }
  if (rating > 1.0) rating = 1.0;
  return rating;
}

/**
 * Get the stat rating multiplier for a given stat level (Strength, Dexterity only).
 * Uses correct stepwise accumulation per the DS1 AR table for physical stats.
 *
 * - 1–9: +0.55% per level (statLevel * 0.0055)
 * - 10–19: +3.5% per level above 9
 * - 20–39: +2.25% per level above 19
 * - 40–99: +0.25% per level above 39
 * - Capped at 100% at 99
 *
 * @param statLevel The stat level (1-99)
 * @returns The rating multiplier (0.0 - 1.0)
 */
// ... existing getStatRating function ...

// Humanity Scaling Table (Physical and Fire Bonus, for humanity 0-10)
// Values are multipliers (e.g., 0.051 = 5.1%) - Empirically verified for Chaos weapons
export const HUMANITY_SCALING_TABLE = [
  { humanity: 0, phys: 0.0, fire: 0.0 },
  { humanity: 1, phys: 0.051, fire: 0.051 },
  { humanity: 2, phys: 0.079, fire: 0.078 },
  { humanity: 3, phys: 0.101, fire: 0.1 },
  { humanity: 4, phys: 0.116, fire: 0.116 },
  { humanity: 5, phys: 0.131, fire: 0.133 },
  { humanity: 6, phys: 0.145, fire: 0.146 },
  { humanity: 7, phys: 0.16, fire: 0.159 },
  { humanity: 8, phys: 0.176, fire: 0.175 },
  { humanity: 9, phys: 0.191, fire: 0.191 },
  { humanity: 10, phys: 0.211, fire: 0.207 },
];

/**
 * Get humanity scaling multipliers for a given humanity value (0-10).
 * @param humanity The humanity value (0-10, capped)
 * @returns { phys: number, fire: number }
 */
export function getHumanityScaling(humanity: number): {
  phys: number;
  fire: number;
} {
  const capped = Math.max(0, Math.min(10, Math.floor(humanity)));
  return HUMANITY_SCALING_TABLE[capped] || { phys: 0, fire: 0 };
}

// Regular Upgrade Path Multipliers (for +0 to +15)
// Each entry corresponds to the upgrade level (0 = Regular, 1 = Regular +1, ..., 15 = Regular +15)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Regular path: +0 to +15 (2.2x multiplier at +15)
export const REGULAR_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.08,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.05,
    dex: 1.05,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 1.16,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.05,
    dex: 1.05,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 1.24,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.05,
    dex: 1.05,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 1.32,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.05,
    dex: 1.05,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 1.4,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.05,
    dex: 1.05,
    int: 1.0,
    fth: 1.0,
  }, // +5
  {
    phys: 1.48,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +6
  {
    phys: 1.56,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +7
  {
    phys: 1.64,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +8
  {
    phys: 1.72,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +9
  {
    phys: 1.8,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +10
  {
    phys: 1.88,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +11
  {
    phys: 1.96,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +12
  {
    phys: 2.04,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +13
  {
    phys: 2.12,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.0,
  }, // +14
  {
    phys: 2.2,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.0,
  }, // +15
];

/**
 * Get the regular upgrade multipliers for a given upgrade level (0-15).
 * @param level The upgrade level (0-15, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getRegularUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(15, Math.floor(level)));
  return REGULAR_UPGRADE_MULTIPLIERS[capped];
}

// Bow Regular Upgrade Path Multipliers (for +0 to +15)
// Each entry corresponds to the upgrade level (0 = Regular, 1 = Regular +1, ..., 15 = Regular +15)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Regular path: +0 to +15 (3.42x multiplier at +15 for phys)
export const BOW_REGULAR_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.16,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.05,
    dex: 1.05,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 1.32,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.05,
    dex: 1.05,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 1.48,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.05,
    dex: 1.05,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 1.65,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.05,
    dex: 1.05,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 1.81,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.05,
    dex: 1.05,
    int: 1.0,
    fth: 1.0,
  }, // +5
  {
    phys: 1.97,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +6
  {
    phys: 2.13,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +7
  {
    phys: 2.29,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +8
  {
    phys: 2.45,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +9
  {
    phys: 2.61,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +10
  {
    phys: 2.77,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +11
  {
    phys: 2.94,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +12
  {
    phys: 3.1,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +13
  {
    phys: 3.26,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.0,
  }, // +14
  {
    phys: 3.42,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.0,
  }, // +15
];

/**
 * Get the bow regular upgrade multipliers for a given upgrade level (0-15).
 * @param level The upgrade level (0-15, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBowRegularUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(15, Math.floor(level)));
  return BOW_REGULAR_UPGRADE_MULTIPLIERS[capped];
}

// Bow Crystal Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Crystal, 1 = Crystal +1, ..., 5 = Crystal +5)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Crystal path: +0 to +5 (3.97x multiplier at +5 for phys)
export const BOW_CRYSTAL_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 2.19,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 2.55,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 2.9,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 3.26,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 3.61,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 3.97,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the bow crystal upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBowCrystalUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return BOW_CRYSTAL_UPGRADE_MULTIPLIERS[capped];
}

// Bow Lightning Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Lightning, 1 = Lightning +1, ..., 5 = Lightning +5)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Lightning path: +0 to +5 (6.74x multiplier at +5 for phys, 7.32x for lght)
export const BOW_LIGHTNING_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 3.68,
    mag: 1.0,
    fire: 1.0,
    lght: 4.1,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 4.29,
    mag: 1.0,
    fire: 1.0,
    lght: 4.74,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 4.9,
    mag: 1.0,
    fire: 1.0,
    lght: 5.39,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 5.52,
    mag: 1.0,
    fire: 1.0,
    lght: 6.03,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 6.13,
    mag: 1.0,
    fire: 1.0,
    lght: 6.68,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 6.74,
    mag: 1.0,
    fire: 1.0,
    lght: 7.32,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the bow lightning upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBowLightningUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return BOW_LIGHTNING_UPGRADE_MULTIPLIERS[capped];
}

// Bow Raw Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Raw, 1 = Raw +1, ..., 5 = Raw +5)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Raw path: +0 to +5 (4.0x multiplier at +5 for phys)
export const BOW_RAW_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.74,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 2.19,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 2.65,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 3.1,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 3.55,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 4.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the bow raw upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBowRawUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return BOW_RAW_UPGRADE_MULTIPLIERS[capped];
}

// Bow Magic Upgrade Path Multipliers (for +0 to +10)
// Each entry corresponds to the upgrade level (0 = Magic, 1 = Magic +1, ..., 10 = Magic +10)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Magic path: +0 to +10 (2.06x multiplier at +10 for phys, 3.13x for mag)
export const BOW_MAGIC_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.1,
    mag: 1.19,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.1,
    fth: 1.0,
  }, // +0
  {
    phys: 1.19,
    mag: 1.39,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.1,
    fth: 1.0,
  }, // +1
  {
    phys: 1.29,
    mag: 1.58,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.1,
    fth: 1.0,
  }, // +2
  {
    phys: 1.39,
    mag: 1.77,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.1,
    fth: 1.0,
  }, // +3
  {
    phys: 1.48,
    mag: 1.97,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.1,
    fth: 1.0,
  }, // +4
  {
    phys: 1.58,
    mag: 2.16,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.15,
    fth: 1.0,
  }, // +5
  {
    phys: 1.68,
    mag: 2.35,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.15,
    fth: 1.0,
  }, // +6
  {
    phys: 1.77,
    mag: 2.55,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.15,
    fth: 1.0,
  }, // +7
  {
    phys: 1.87,
    mag: 2.74,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.15,
    fth: 1.0,
  }, // +8
  {
    phys: 1.97,
    mag: 2.94,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.2,
    fth: 1.0,
  }, // +9
  {
    phys: 2.06,
    mag: 3.13,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.2,
    fth: 1.0,
  }, // +10
];

/**
 * Get the bow magic upgrade multipliers for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBowMagicUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return BOW_MAGIC_UPGRADE_MULTIPLIERS[capped];
}

// Crystal Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Crystal, 1 = Crystal +1, ..., 5 = Crystal +5)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Crystal path: +0 to +5 (1.23x multiplier at +5)
export const CRYSTAL_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.046,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 1.092,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 1.138,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 1.184,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 1.23,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the crystal upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getCrystalUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return CRYSTAL_UPGRADE_MULTIPLIERS[capped];
}

// Lightning Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Lightning, 1 = Lightning +1, ..., 5 = Lightning +5)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Lightning path: +0 to +5 (1.43x multiplier at +5 for both phys and lght)
export const LIGHTNING_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.086,
    mag: 1.0,
    fire: 1.0,
    lght: 1.086,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 1.172,
    mag: 1.0,
    fire: 1.0,
    lght: 1.172,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 1.258,
    mag: 1.0,
    fire: 1.0,
    lght: 1.258,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 1.344,
    mag: 1.0,
    fire: 1.0,
    lght: 1.344,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 1.43,
    mag: 1.0,
    fire: 1.0,
    lght: 1.43,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the lightning upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getLightningUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return LIGHTNING_UPGRADE_MULTIPLIERS[capped];
}

// Raw Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Raw, 1 = Raw +1, ..., 5 = Raw +5)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Raw path: +0 to +5 (1.72x multiplier at +5)
export const RAW_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.144,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 1.288,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 1.432,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 1.576,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 1.72,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the raw upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getRawUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return RAW_UPGRADE_MULTIPLIERS[capped];
}

// Magic Upgrade Path Multipliers (for +0 to +10)
// Each entry corresponds to the upgrade level (0 = Magic, 1 = Magic +1, ..., 10 = Magic +10)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Magic path: +0 to +10 (1.67x multiplier at +10 for both phys and mag)
export const MAGIC_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.1,
    fth: 1.0,
  }, // +0
  {
    phys: 1.067,
    mag: 1.067,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.1,
    fth: 1.0,
  }, // +1
  {
    phys: 1.134,
    mag: 1.134,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.1,
    fth: 1.0,
  }, // +2
  {
    phys: 1.201,
    mag: 1.201,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.1,
    fth: 1.0,
  }, // +3
  {
    phys: 1.268,
    mag: 1.268,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.1,
    fth: 1.0,
  }, // +4
  {
    phys: 1.335,
    mag: 1.335,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.15,
    fth: 1.0,
  }, // +5
  {
    phys: 1.402,
    mag: 1.402,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.15,
    fth: 1.0,
  }, // +6
  {
    phys: 1.469,
    mag: 1.469,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.15,
    fth: 1.0,
  }, // +7
  {
    phys: 1.536,
    mag: 1.536,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.15,
    fth: 1.0,
  }, // +8
  {
    phys: 1.603,
    mag: 1.603,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.2,
    fth: 1.0,
  }, // +9
  {
    phys: 1.67,
    mag: 1.67,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.2,
    fth: 1.0,
  }, // +10
];

/**
 * Get the magic upgrade multipliers for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getMagicUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return MAGIC_UPGRADE_MULTIPLIERS[capped];
}

// Enchanted Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Enchanted, 1 = Enchanted +1, ..., 5 = Enchanted +5)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on analysis: Claymore 154/164→184/190 (19%/16% increase), Mace 136/146→163/169 (20%/16% increase), Winged Spear 130/138→156/160 (20%/16% increase)
export const ENCHANTED_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.15,
    fth: 1.0,
  }, // +0
  {
    phys: 1.039,
    mag: 1.024,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.28,
    fth: 1.0,
  }, // +1
  {
    phys: 1.078,
    mag: 1.055,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.41,
    fth: 1.0,
  }, // +2
  {
    phys: 1.117,
    mag: 1.085,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.54,
    fth: 1.0,
  }, // +3
  {
    phys: 1.156,
    mag: 1.116,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.67,
    fth: 1.0,
  }, // +4
  {
    phys: 1.195,
    mag: 1.159,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.8,
    fth: 1.0,
  }, // +5
];

// Special exception for Enchanted Club bug (loses damage at +1, then progresses from +1 base)
// This is a known game bug where Enchanted Club +1 has lower damage than +0
export const ENCHANTED_CLUB_EXCEPTION = {
  weaponName: "Club",
  upgradePath: "enchanted",
  // The actual damage values for each level (empirically verified)
  damageValues: {
    0: { phys: 117, mag: 126 },
    1: { phys: 113, mag: 121 }, // Bugged - loses damage
    2: { phys: 116, mag: 124 },
    3: { phys: 119, mag: 128 },
    4: { phys: 122, mag: 131 },
    5: { phys: 126, mag: 135 },
  } as Record<number, { phys: number; mag: number }>,
};

/**
 * Get the enchanted upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @param weaponName Optional weapon name for special exceptions
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getEnchantedUpgradeMultipliers(
  level: number,
  weaponName?: string
) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));

  // Check for Enchanted Club bug
  if (weaponName === "Club") {
    const clubDamage = ENCHANTED_CLUB_EXCEPTION.damageValues[capped];
    if (clubDamage) {
      // Calculate multipliers based on the actual damage values
      // Base damage for Club enchanted is 117/126
      return {
        phys: clubDamage.phys / 117, // 117 is the base physical damage
        mag: clubDamage.mag / 126, // 126 is the base magic damage
        fire: 1.0,
        lght: 1.0,
        str: 1.15,
        dex: 1.15,
        int: 1.28,
        fth: 1.0,
      };
    }
  }

  return ENCHANTED_UPGRADE_MULTIPLIERS[capped];
}

// Divine Upgrade Path Multipliers (for +0 to +10)
// Each entry corresponds to the upgrade level (0 = Divine, 1 = Divine +1, ..., 10 = Divine +10)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Divine path: +0 to +10 (1.67x multiplier at +10 for both phys and mag)
export const DIVINE_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.1,
  }, // +0
  {
    phys: 1.067,
    mag: 1.067,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.1,
  }, // +1
  {
    phys: 1.134,
    mag: 1.134,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.1,
  }, // +2
  {
    phys: 1.201,
    mag: 1.201,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.1,
  }, // +3
  {
    phys: 1.268,
    mag: 1.268,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.1,
  }, // +4
  {
    phys: 1.335,
    mag: 1.335,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.1,
  }, // +5
  {
    phys: 1.402,
    mag: 1.402,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +6
  {
    phys: 1.469,
    mag: 1.469,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +7
  {
    phys: 1.536,
    mag: 1.536,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +8
  {
    phys: 1.603,
    mag: 1.603,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.2,
  }, // +9
  {
    phys: 1.67,
    mag: 1.67,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.2,
  }, // +10
];

/**
 * Get the divine upgrade multipliers for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getDivineUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return DIVINE_UPGRADE_MULTIPLIERS[capped];
}

// Occult Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Occult, 1 = Occult +1, ..., 5 = Occult +5)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Occult path: +0 to +5 (1.3x multiplier at +5 for both phys and mag)
export const OCCULT_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +0
  {
    phys: 1.06,
    mag: 1.06,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +1
  {
    phys: 1.12,
    mag: 1.12,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +2
  {
    phys: 1.18,
    mag: 1.18,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +3
  {
    phys: 1.24,
    mag: 1.24,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.2,
  }, // +4
  {
    phys: 1.3,
    mag: 1.3,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.2,
  }, // +5
];

/**
 * Get the occult upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getOccultUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return OCCULT_UPGRADE_MULTIPLIERS[capped];
}

// Fire Upgrade Path Multipliers (for +0 to +10)
// Each entry corresponds to the upgrade level (0 = Fire, 1 = Fire +1, ..., 10 = Fire +10)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Fire path: +0 to +10 (1.86x multiplier at +10 for both phys and fire)
export const FIRE_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.086,
    mag: 1.0,
    fire: 1.086,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 1.172,
    mag: 1.0,
    fire: 1.172,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 1.258,
    mag: 1.0,
    fire: 1.258,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 1.344,
    mag: 1.0,
    fire: 1.344,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 1.43,
    mag: 1.0,
    fire: 1.43,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +5
  {
    phys: 1.516,
    mag: 1.0,
    fire: 1.516,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +6
  {
    phys: 1.602,
    mag: 1.0,
    fire: 1.602,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +7
  {
    phys: 1.688,
    mag: 1.0,
    fire: 1.688,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +8
  {
    phys: 1.774,
    mag: 1.0,
    fire: 1.774,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +9
  {
    phys: 1.86,
    mag: 1.0,
    fire: 1.86,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +10
];

/**
 * Get the fire upgrade multipliers for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getFireUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return FIRE_UPGRADE_MULTIPLIERS[capped];
}

// Chaos Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Chaos, 1 = Chaos +1, ..., 5 = Chaos +5)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Chaos path: +0 to +5 (1.28x multiplier at +5 for both phys and fire)
export const CHAOS_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.056,
    mag: 1.0,
    fire: 1.056,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 1.112,
    mag: 1.0,
    fire: 1.112,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 1.168,
    mag: 1.0,
    fire: 1.168,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 1.224,
    mag: 1.0,
    fire: 1.224,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 1.28,
    mag: 1.0,
    fire: 1.28,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the chaos upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getChaosUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return CHAOS_UPGRADE_MULTIPLIERS[capped];
}

// Special (Twinkling) Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Special, 1 = Special +1, ..., 5 = Special +5)
// All values are multipliers (e.g., 1.1 = +10%)
export const SPECIAL_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.1,
    mag: 1.1,
    fire: 1.1,
    lght: 1.1,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 1.2,
    mag: 1.2,
    fire: 1.2,
    lght: 1.2,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 1.3,
    mag: 1.3,
    fire: 1.3,
    lght: 1.3,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 1.4,
    mag: 1.4,
    fire: 1.4,
    lght: 1.4,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 1.5,
    mag: 1.5,
    fire: 1.5,
    lght: 1.5,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the special (twinkling) upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getSpecialUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return SPECIAL_UPGRADE_MULTIPLIERS[capped];
}

// Boss (Demon) Weapon Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Boss, 1 = Boss +1, ..., 5 = Boss +5)
// All values are multipliers (e.g., 1.1 = +10%)
export const BOSS_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.1,
    mag: 1.1,
    fire: 1.1,
    lght: 1.1,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 1.2,
    mag: 1.2,
    fire: 1.2,
    lght: 1.2,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 1.3,
    mag: 1.3,
    fire: 1.3,
    lght: 1.3,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 1.4,
    mag: 1.4,
    fire: 1.4,
    lght: 1.4,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 1.5,
    mag: 1.5,
    fire: 1.5,
    lght: 1.5,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the boss (demon) weapon upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBossUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return BOSS_UPGRADE_MULTIPLIERS[capped];
}

// Dragon (Dragon Scale) Weapon Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Dragon, 1 = Dragon +1, ..., 5 = Dragon +5)
// All values are multipliers (e.g., 1.1 = +10%)
export const DRAGON_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.1,
    mag: 1.1,
    fire: 1.1,
    lght: 1.1,
    str: 1.05,
    dex: 1.05,
    int: 1.05,
    fth: 1.05,
  }, // +1
  {
    phys: 1.2,
    mag: 1.2,
    fire: 1.2,
    lght: 1.2,
    str: 1.1,
    dex: 1.1,
    int: 1.1,
    fth: 1.1,
  }, // +2
  {
    phys: 1.3,
    mag: 1.3,
    fire: 1.3,
    lght: 1.3,
    str: 1.1,
    dex: 1.1,
    int: 1.1,
    fth: 1.1,
  }, // +3
  {
    phys: 1.4,
    mag: 1.4,
    fire: 1.4,
    lght: 1.4,
    str: 1.15,
    dex: 1.15,
    int: 1.15,
    fth: 1.15,
  }, // +4
  {
    phys: 1.5,
    mag: 1.5,
    fire: 1.5,
    lght: 1.5,
    str: 1.2,
    dex: 1.2,
    int: 1.2,
    fth: 1.2,
  }, // +5
];

/**
 * Get the dragon (dragon scale) weapon upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getDragonUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return DRAGON_UPGRADE_MULTIPLIERS[capped];
}

// Bow Enchanted Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Enchanted, 1 = Enchanted +1, ..., 5 = Enchanted +5)
// All values are multipliers (e.g., 1.1 = +10%)
export const BOW_ENCHANTED_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 2.0,
    mag: 2.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.05,
    fth: 1.0,
  }, // +0
  {
    phys: 2.08,
    mag: 2.06,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.12,
    fth: 1.0,
  }, // +1
  {
    phys: 2.16,
    mag: 2.12,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.19,
    fth: 1.0,
  }, // +2
  {
    phys: 2.24,
    mag: 2.18,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.26,
    fth: 1.0,
  }, // +3
  {
    phys: 2.32,
    mag: 2.24,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.33,
    fth: 1.0,
  }, // +4
  {
    phys: 2.4,
    mag: 2.32,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.4,
    fth: 1.0,
  }, // +5
];

/**
 * Get the bow enchanted upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBowEnchantedUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return BOW_ENCHANTED_UPGRADE_MULTIPLIERS[capped];
}

// Bow Divine Upgrade Path Multipliers (for +0 to +10)
// Each entry corresponds to the upgrade level (0 = Divine, 1 = Divine +1, ..., 10 = Divine +10)
// All values are multipliers (e.g., 1.1 = +10%)
export const BOW_DIVINE_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.5,
    mag: 1.5,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.1,
  }, // +0
  {
    phys: 1.6,
    mag: 1.6,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.1,
  }, // +1
  {
    phys: 1.7,
    mag: 1.7,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.1,
  }, // +2
  {
    phys: 1.8,
    mag: 1.8,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.1,
  }, // +3
  {
    phys: 1.9,
    mag: 1.9,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.1,
  }, // +4
  {
    phys: 2.0,
    mag: 2.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.1,
    dex: 1.1,
    int: 1.0,
    fth: 1.1,
  }, // +5
  {
    phys: 2.1,
    mag: 2.1,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +6
  {
    phys: 2.2,
    mag: 2.2,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +7
  {
    phys: 2.3,
    mag: 2.3,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +8
  {
    phys: 2.4,
    mag: 2.4,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.2,
  }, // +9
  {
    phys: 2.5,
    mag: 2.5,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.2,
  }, // +10
];

/**
 * Get the bow divine upgrade multipliers for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBowDivineUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return BOW_DIVINE_UPGRADE_MULTIPLIERS[capped];
}

// Bow Occult Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Occult, 1 = Occult +1, ..., 5 = Occult +5)
// All values are multipliers (e.g., 1.1 = +10%)
export const BOW_OCCULT_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 2.0,
    mag: 2.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +0
  {
    phys: 2.12,
    mag: 2.1,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +1
  {
    phys: 2.24,
    mag: 2.2,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +2
  {
    phys: 2.36,
    mag: 2.3,
    fire: 1.0,
    lght: 1.0,
    str: 1.15,
    dex: 1.15,
    int: 1.0,
    fth: 1.15,
  }, // +3
  {
    phys: 2.48,
    mag: 2.4,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.2,
  }, // +4
  {
    phys: 2.6,
    mag: 2.5,
    fire: 1.0,
    lght: 1.0,
    str: 1.2,
    dex: 1.2,
    int: 1.0,
    fth: 1.2,
  }, // +5
];

/**
 * Get the bow occult upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBowOccultUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return BOW_OCCULT_UPGRADE_MULTIPLIERS[capped];
}

// Bow Fire Upgrade Path Multipliers (for +0 to +10)
// Each entry corresponds to the upgrade level (0 = Fire, 1 = Fire +1, ..., 10 = Fire +10)
// All values are multipliers (e.g., 1.1 = +10%)
export const BOW_FIRE_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.8,
    mag: 1.0,
    fire: 1.8,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 2.07,
    mag: 1.0,
    fire: 2.07,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 2.34,
    mag: 1.0,
    fire: 2.34,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 2.61,
    mag: 1.0,
    fire: 2.61,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 2.88,
    mag: 1.0,
    fire: 2.88,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 3.15,
    mag: 1.0,
    fire: 3.15,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +5
  {
    phys: 3.42,
    mag: 1.0,
    fire: 3.42,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +6
  {
    phys: 3.69,
    mag: 1.0,
    fire: 3.69,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +7
  {
    phys: 3.96,
    mag: 1.0,
    fire: 3.96,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +8
  {
    phys: 4.23,
    mag: 1.0,
    fire: 4.23,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +9
  {
    phys: 4.5,
    mag: 1.0,
    fire: 4.5,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +10
];

/**
 * Get the bow fire upgrade multipliers for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBowFireUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return BOW_FIRE_UPGRADE_MULTIPLIERS[capped];
}

// Bow Chaos Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Chaos, 1 = Chaos +1, ..., 5 = Chaos +5)
// All values are multipliers (e.g., 1.1 = +10%)
export const BOW_CHAOS_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 2.5,
    mag: 1.0,
    fire: 2.7,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 2.8,
    mag: 1.0,
    fire: 3.04,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 3.1,
    mag: 1.0,
    fire: 3.38,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 3.4,
    mag: 1.0,
    fire: 3.72,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 3.7,
    mag: 1.0,
    fire: 4.06,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 4.0,
    mag: 1.0,
    fire: 4.4,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the bow chaos upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBowChaosUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return BOW_CHAOS_UPGRADE_MULTIPLIERS[capped];
}

// Bow Special (Twinkling) Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Special, 1 = Special +1, ..., 5 = Special +5)
// All values are multipliers (e.g., 1.1 = +10%)
export const BOW_SPECIAL_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.1,
    mag: 1.1,
    fire: 1.1,
    lght: 1.1,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 1.2,
    mag: 1.2,
    fire: 1.2,
    lght: 1.2,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 1.3,
    mag: 1.3,
    fire: 1.3,
    lght: 1.3,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 1.4,
    mag: 1.4,
    fire: 1.4,
    lght: 1.4,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 1.5,
    mag: 1.5,
    fire: 1.5,
    lght: 1.5,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the bow special (twinkling) upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBowSpecialUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return BOW_SPECIAL_UPGRADE_MULTIPLIERS[capped];
}

// Bow Boss (Demon) Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Boss, 1 = Boss +1, ..., 5 = Boss +5)
// All values are multipliers (e.g., 1.1 = +10%)
export const BOW_BOSS_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.1,
    mag: 1.1,
    fire: 1.1,
    lght: 1.1,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 1.2,
    mag: 1.2,
    fire: 1.2,
    lght: 1.2,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 1.3,
    mag: 1.3,
    fire: 1.3,
    lght: 1.3,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 1.4,
    mag: 1.4,
    fire: 1.4,
    lght: 1.4,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 1.5,
    mag: 1.5,
    fire: 1.5,
    lght: 1.5,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the bow boss (demon) upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getBowBossUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return BOW_BOSS_UPGRADE_MULTIPLIERS[capped];
}

// Crossbow Regular Upgrade Path Multipliers (for +0 to +15)
// Each entry corresponds to the upgrade level (0 = Regular, 1 = Regular +1, ..., 15 = Regular +15)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Regular path: +0 to +15 (2.5x multiplier at +15 for phys)
export const CROSSBOW_REGULAR_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 1.1,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 1.2,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 1.3,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 1.4,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 1.5,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +5
  {
    phys: 1.6,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +6
  {
    phys: 1.7,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +7
  {
    phys: 1.8,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +8
  {
    phys: 1.9,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +9
  {
    phys: 2.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +10
  {
    phys: 2.1,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +11
  {
    phys: 2.2,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +12
  {
    phys: 2.3,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +13
  {
    phys: 2.4,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +14
  {
    phys: 2.5,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +15
];

/**
 * Get the crossbow regular upgrade multipliers for a given upgrade level (0-15).
 * @param level The upgrade level (0-15, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getCrossbowRegularUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(15, Math.floor(level)));
  return CROSSBOW_REGULAR_UPGRADE_MULTIPLIERS[capped];
}

// Crossbow Crystal Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Crystal, 1 = Crystal +1, ..., 5 = Crystal +5)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Crystal path: +0 to +5 (6.2x multiplier at +5 for phys)
export const CROSSBOW_CRYSTAL_UPGRADE_MULTIPLIERS = [
  //  phys, mag, fire, lght, str, dex, int, fth
  {
    phys: 5.2,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +0
  {
    phys: 5.4,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +1
  {
    phys: 5.6,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +2
  {
    phys: 5.8,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +3
  {
    phys: 6.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +4
  {
    phys: 6.2,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // +5
];

/**
 * Get the crossbow crystal upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getCrossbowCrystalUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return CROSSBOW_CRYSTAL_UPGRADE_MULTIPLIERS[capped];
}

// Crossbow Lightning Upgrade Path Multipliers (for +0 to +5)
// Each entry corresponds to the upgrade level (0 = Lightning, 1 = Lightning +1, ..., 5 = Lightning +5)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Lightning path: +0 to +5 (3.3x multiplier at +5 for phys, 3.1x for lght)
export const CROSSBOW_LIGHTNING_UPGRADE_MULTIPLIERS = [
  {
    phys: 2.8,
    mag: 1.0,
    fire: 1.0,
    lght: 2.6,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Lightning
  {
    phys: 2.9,
    mag: 1.0,
    fire: 1.0,
    lght: 2.7,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Lightning +1
  {
    phys: 3.0,
    mag: 1.0,
    fire: 1.0,
    lght: 2.8,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Lightning +2
  {
    phys: 3.1,
    mag: 1.0,
    fire: 1.0,
    lght: 2.9,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Lightning +3
  {
    phys: 3.2,
    mag: 1.0,
    fire: 1.0,
    lght: 3.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Lightning +4
  {
    phys: 3.3,
    mag: 1.0,
    fire: 1.0,
    lght: 3.1,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Lightning +5
];

/**
 * Get the crossbow lightning upgrade multipliers for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getCrossbowLightningUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return CROSSBOW_LIGHTNING_UPGRADE_MULTIPLIERS[capped];
}

// Crossbow Magic Upgrade Path Multipliers (for +0 to +10)
// Each entry corresponds to the upgrade level (0 = Magic, 1 = Magic +1, ..., 10 = Magic +10)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Magic path: +0 to +10 (2.3x multiplier at +10 for phys, 2.28x for mag)
export const CROSSBOW_MAGIC_UPGRADE_MULTIPLIERS = [
  {
    phys: 1.9,
    mag: 1.88,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Magic
  {
    phys: 1.94,
    mag: 1.92,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Magic +1
  {
    phys: 1.98,
    mag: 1.96,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Magic +2
  {
    phys: 2.02,
    mag: 2.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Magic +3
  {
    phys: 2.06,
    mag: 2.04,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Magic +4
  {
    phys: 2.1,
    mag: 2.08,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Magic +5
  {
    phys: 2.14,
    mag: 2.12,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Magic +6
  {
    phys: 2.18,
    mag: 2.16,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Magic +7
  {
    phys: 2.22,
    mag: 2.2,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Magic +8
  {
    phys: 2.26,
    mag: 2.24,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Magic +9
  {
    phys: 2.3,
    mag: 2.28,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Magic +10
];

/**
 * Get the crossbow magic upgrade multipliers for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getCrossbowMagicUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return CROSSBOW_MAGIC_UPGRADE_MULTIPLIERS[capped];
}

// Crossbow Divine Upgrade Path Multipliers (for +0 to +10)
// Each entry corresponds to the upgrade level (0 = Divine, 1 = Divine +1, ..., 10 = Divine +10)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Divine path: +0 to +10 (2.1x multiplier at +10 for phys, 2.44x for mag)
export const CROSSBOW_DIVINE_UPGRADE_MULTIPLIERS = [
  {
    phys: 1.7,
    mag: 2.04,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Divine
  {
    phys: 1.74,
    mag: 2.08,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Divine +1
  {
    phys: 1.78,
    mag: 2.12,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Divine +2
  {
    phys: 1.82,
    mag: 2.16,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Divine +3
  {
    phys: 1.86,
    mag: 2.2,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Divine +4
  {
    phys: 1.9,
    mag: 2.24,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Divine +5
  {
    phys: 1.94,
    mag: 2.28,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Divine +6
  {
    phys: 1.98,
    mag: 2.32,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Divine +7
  {
    phys: 2.02,
    mag: 2.36,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Divine +8
  {
    phys: 2.06,
    mag: 2.4,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Divine +9
  {
    phys: 2.1,
    mag: 2.44,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Divine +10
];

/**
 * Get the crossbow divine upgrade multipliers for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getCrossbowDivineUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return CROSSBOW_DIVINE_UPGRADE_MULTIPLIERS[capped];
}

// Crossbow Fire Upgrade Path Multipliers (for +0 to +10)
// Each entry corresponds to the upgrade level (0 = Fire, 1 = Fire +1, ..., 10 = Fire +10)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on weapon data analysis from damageByPath objects
// Fire path: +0 to +10 (2.0x multiplier at +10 for both phys and fire)
export const CROSSBOW_FIRE_UPGRADE_MULTIPLIERS = [
  {
    phys: 1.8,
    mag: 1.0,
    fire: 1.8,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Fire
  {
    phys: 1.82,
    mag: 1.0,
    fire: 1.82,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Fire +1
  {
    phys: 1.84,
    mag: 1.0,
    fire: 1.84,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Fire +2
  {
    phys: 1.86,
    mag: 1.0,
    fire: 1.86,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Fire +3
  {
    phys: 1.88,
    mag: 1.0,
    fire: 1.88,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Fire +4
  {
    phys: 1.9,
    mag: 1.0,
    fire: 1.9,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Fire +5
  {
    phys: 1.92,
    mag: 1.0,
    fire: 1.92,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Fire +6
  {
    phys: 1.94,
    mag: 1.0,
    fire: 1.94,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Fire +7
  {
    phys: 1.96,
    mag: 1.0,
    fire: 1.96,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Fire +8
  {
    phys: 1.98,
    mag: 1.0,
    fire: 1.98,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Fire +9
  {
    phys: 2.0,
    mag: 1.0,
    fire: 2.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
  }, // Fire +10
];

/**
 * Get the crossbow fire upgrade multipliers for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth }
 */
export function getCrossbowFireUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return CROSSBOW_FIRE_UPGRADE_MULTIPLIERS[capped];
}

// Shield Regular Upgrade Path Multipliers (for +0 to +15)
// Each entry corresponds to the upgrade level (0 = Regular, 1 = Regular +1, ..., 15 = Regular +15)
// All values are multipliers (e.g., 1.1 = +10%)
// Based on actual Dark Souls shield upgrade mechanics:
// - Physical defense increases gradually (+5% per level)
// - Stability increases significantly (+3-5% per level, most important stat)
// - Elemental defenses remain mostly unchanged
// - Attack values are minimal for shields
export const SHIELD_REGULAR_UPGRADE_MULTIPLIERS = [
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.0,
  }, // Regular
  {
    phys: 1.02,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.05,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.03,
  }, // Regular +1
  {
    phys: 1.04,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.1,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.06,
  }, // Regular +2
  {
    phys: 1.06,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.15,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.09,
  }, // Regular +3
  {
    phys: 1.08,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.2,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.12,
  }, // Regular +4
  {
    phys: 1.1,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.25,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.15,
  }, // Regular +5
  {
    phys: 1.12,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.3,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.18,
  }, // Regular +6
  {
    phys: 1.14,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.35,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.21,
  }, // Regular +7
  {
    phys: 1.16,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.4,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.24,
  }, // Regular +8
  {
    phys: 1.18,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.45,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.27,
  }, // Regular +9
  {
    phys: 1.2,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.5,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.3,
  }, // Regular +10
  {
    phys: 1.22,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.55,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.33,
  }, // Regular +11
  {
    phys: 1.24,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.6,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.36,
  }, // Regular +12
  {
    phys: 1.26,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.65,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.39,
  }, // Regular +13
  {
    phys: 1.28,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.7,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.42,
  }, // Regular +14
  {
    phys: 1.3,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.75,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.45,
  }, // Regular +15
];

/**
 * Get the shield regular upgrade multipliers for a given upgrade level (0-15).
 * @param level The upgrade level (0-15, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth, physDef, magDef, fireDef, lghtDef, stability }
 */
export function getShieldRegularUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(15, Math.floor(level)));
  return SHIELD_REGULAR_UPGRADE_MULTIPLIERS[capped];
}

// Shield Crystal Upgrade Path Multipliers (for Crystal to Crystal +5)
// Each entry corresponds to the upgrade level (0 = Crystal, 1 = Crystal +1, ..., 5 = Crystal +5)
// Based on actual Dark Souls shield upgrade mechanics:
// - Physical defense decreases (-10% per level)
// - Stability increases significantly (+8-10% per level, most important stat)
// - Elemental defenses remain mostly unchanged
// - Attack values are minimal for shields
export const SHIELD_CRYSTAL_UPGRADE_MULTIPLIERS = [
  {
    phys: 1.05,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.9,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.35,
  }, // Crystal
  {
    phys: 1.07,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.8,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.45,
  }, // Crystal +1
  {
    phys: 1.09,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.7,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.55,
  }, // Crystal +2
  {
    phys: 1.11,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.6,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.65,
  }, // Crystal +3
  {
    phys: 1.13,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.5,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.75,
  }, // Crystal +4
  {
    phys: 1.15,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.4,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.85,
  }, // Crystal +5
];

/**
 * Get the crystal upgrade multipliers for shields for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth, physDef, magDef, fireDef, lghtDef, stability }
 */
export function getShieldCrystalUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return SHIELD_CRYSTAL_UPGRADE_MULTIPLIERS[capped];
}

// Shield Lightning Upgrade Path Multipliers (for Lightning to Lightning +5)
// Each entry corresponds to the upgrade level (0 = Lightning, 1 = Lightning +1, ..., 5 = Lightning +5)
// Based on actual Dark Souls shield upgrade mechanics:
// - Physical defense decreases (-10% per level)
// - Lightning defense increases significantly (+15-20% per level)
// - Stability increases moderately (+5-8% per level)
// - Attack values are minimal for shields
export const SHIELD_LIGHTNING_UPGRADE_MULTIPLIERS = [
  {
    phys: 1.05,
    mag: 1.0,
    fire: 1.0,
    lght: 1.1,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.9,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.15,
    stability: 1.05,
  }, // Lightning
  {
    phys: 1.07,
    mag: 1.0,
    fire: 1.0,
    lght: 1.12,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.8,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.3,
    stability: 1.1,
  }, // Lightning +1
  {
    phys: 1.09,
    mag: 1.0,
    fire: 1.0,
    lght: 1.14,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.7,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.45,
    stability: 1.15,
  }, // Lightning +2
  {
    phys: 1.11,
    mag: 1.0,
    fire: 1.0,
    lght: 1.16,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.6,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.6,
    stability: 1.2,
  }, // Lightning +3
  {
    phys: 1.13,
    mag: 1.0,
    fire: 1.0,
    lght: 1.18,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.5,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.75,
    stability: 1.25,
  }, // Lightning +4
  {
    phys: 1.15,
    mag: 1.0,
    fire: 1.0,
    lght: 1.2,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.4,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.9,
    stability: 1.3,
  }, // Lightning +5
];

/**
 * Get the lightning upgrade multipliers for shields for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth, physDef, magDef, fireDef, lghtDef, stability }
 */
export function getShieldLightningUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return SHIELD_LIGHTNING_UPGRADE_MULTIPLIERS[capped];
}

// Shield Magic Upgrade Path Multipliers (for Magic to Magic +10)
// Each entry corresponds to the upgrade level (0 = Magic, 1 = Magic +1, ..., 10 = Magic +10)
// Based on actual Dark Souls shield upgrade mechanics:
// - Physical defense decreases (-8% per level)
// - Magic defense increases significantly (+15-20% per level)
// - Stability increases moderately (+5-8% per level)
// - Attack values are minimal for shields
export const SHIELD_MAGIC_UPGRADE_MULTIPLIERS = [
  {
    phys: 1.05,
    mag: 1.1,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.92,
    magDef: 1.15,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.05,
  }, // Magic
  {
    phys: 1.07,
    mag: 1.12,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.84,
    magDef: 1.3,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.1,
  }, // Magic +1
  {
    phys: 1.09,
    mag: 1.14,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.76,
    magDef: 1.45,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.15,
  }, // Magic +2
  {
    phys: 1.11,
    mag: 1.16,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.68,
    magDef: 1.6,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.2,
  }, // Magic +3
  {
    phys: 1.13,
    mag: 1.18,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.6,
    magDef: 1.75,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.25,
  }, // Magic +4
  {
    phys: 1.15,
    mag: 1.2,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.52,
    magDef: 1.9,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.3,
  }, // Magic +5
  {
    phys: 1.17,
    mag: 1.22,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.44,
    magDef: 2.05,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.35,
  }, // Magic +6
  {
    phys: 1.19,
    mag: 1.24,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.36,
    magDef: 2.2,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.4,
  }, // Magic +7
  {
    phys: 1.21,
    mag: 1.26,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.28,
    magDef: 2.35,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.45,
  }, // Magic +8
  {
    phys: 1.23,
    mag: 1.28,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.2,
    magDef: 2.5,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.5,
  }, // Magic +9
  {
    phys: 1.25,
    mag: 1.3,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.12,
    magDef: 2.65,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.55,
  }, // Magic +10
];

/**
 * Get the magic upgrade multipliers for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth, physDef, magDef, fireDef, lghtDef, stability }
 */
export function getShieldMagicUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return SHIELD_MAGIC_UPGRADE_MULTIPLIERS[capped];
}

// Shield Divine Upgrade Path Multipliers (for Divine to Divine +10)
// Each entry corresponds to the upgrade level (0 = Divine, 1 = Divine +1, ..., 10 = Divine +10)
// Based on actual Dark Souls shield upgrade mechanics:
// - Physical defense decreases (-8% per level)
// - Magic defense increases significantly (+15-20% per level, similar to Magic)
// - Stability increases moderately (+5-8% per level)
// - Attack values are minimal for shields
export const SHIELD_DIVINE_UPGRADE_MULTIPLIERS = [
  {
    phys: 1.05,
    mag: 1.1,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.92,
    magDef: 1.15,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.05,
  }, // Divine
  {
    phys: 1.07,
    mag: 1.12,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.84,
    magDef: 1.3,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.1,
  }, // Divine +1
  {
    phys: 1.09,
    mag: 1.14,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.76,
    magDef: 1.45,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.15,
  }, // Divine +2
  {
    phys: 1.11,
    mag: 1.16,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.68,
    magDef: 1.6,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.2,
  }, // Divine +3
  {
    phys: 1.13,
    mag: 1.18,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.6,
    magDef: 1.75,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.25,
  }, // Divine +4
  {
    phys: 1.15,
    mag: 1.2,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.52,
    magDef: 1.9,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.3,
  }, // Divine +5
  {
    phys: 1.17,
    mag: 1.22,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.44,
    magDef: 2.05,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.35,
  }, // Divine +6
  {
    phys: 1.19,
    mag: 1.24,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.36,
    magDef: 2.2,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.4,
  }, // Divine +7
  {
    phys: 1.21,
    mag: 1.26,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.28,
    magDef: 2.35,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.45,
  }, // Divine +8
  {
    phys: 1.23,
    mag: 1.28,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.2,
    magDef: 2.5,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.5,
  }, // Divine +9
  {
    phys: 1.25,
    mag: 1.3,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.12,
    magDef: 2.65,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.55,
  }, // Divine +10
];

/**
 * Get the Divine upgrade multipliers for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth, physDef, magDef, fireDef, lghtDef, stability }
 */
export function getShieldDivineUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return SHIELD_DIVINE_UPGRADE_MULTIPLIERS[capped];
}

// Shield Fire Upgrade Path Multipliers (for Fire to Fire +10)
// Each entry corresponds to the upgrade level (0 = Fire, 1 = Fire +1, ..., 10 = Fire +10)
// Based on actual Dark Souls shield upgrade mechanics:
// - Physical defense decreases (-8% per level)
// - Fire defense increases significantly (+15-20% per level)
// - Stability increases moderately (+5-8% per level)
// - Attack values are minimal for shields
export const SHIELD_FIRE_UPGRADE_MULTIPLIERS = [
  {
    phys: 1.05,
    mag: 1.0,
    fire: 1.1,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.92,
    magDef: 1.0,
    fireDef: 1.15,
    lghtDef: 1.0,
    stability: 1.05,
  }, // Fire
  {
    phys: 1.07,
    mag: 1.0,
    fire: 1.12,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.84,
    magDef: 1.0,
    fireDef: 1.3,
    lghtDef: 1.0,
    stability: 1.1,
  }, // Fire +1
  {
    phys: 1.09,
    mag: 1.0,
    fire: 1.14,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.76,
    magDef: 1.0,
    fireDef: 1.45,
    lghtDef: 1.0,
    stability: 1.15,
  }, // Fire +2
  {
    phys: 1.11,
    mag: 1.0,
    fire: 1.16,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.68,
    magDef: 1.0,
    fireDef: 1.6,
    lghtDef: 1.0,
    stability: 1.2,
  }, // Fire +3
  {
    phys: 1.13,
    mag: 1.0,
    fire: 1.18,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.6,
    magDef: 1.0,
    fireDef: 1.75,
    lghtDef: 1.0,
    stability: 1.25,
  }, // Fire +4
  {
    phys: 1.15,
    mag: 1.0,
    fire: 1.2,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.52,
    magDef: 1.0,
    fireDef: 1.9,
    lghtDef: 1.0,
    stability: 1.3,
  }, // Fire +5
  {
    phys: 1.17,
    mag: 1.0,
    fire: 1.22,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.44,
    magDef: 1.0,
    fireDef: 2.05,
    lghtDef: 1.0,
    stability: 1.35,
  }, // Fire +6
  {
    phys: 1.19,
    mag: 1.0,
    fire: 1.24,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.36,
    magDef: 1.0,
    fireDef: 2.2,
    lghtDef: 1.0,
    stability: 1.4,
  }, // Fire +7
  {
    phys: 1.21,
    mag: 1.0,
    fire: 1.26,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.28,
    magDef: 1.0,
    fireDef: 2.35,
    lghtDef: 1.0,
    stability: 1.45,
  }, // Fire +8
  {
    phys: 1.23,
    mag: 1.0,
    fire: 1.28,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.2,
    magDef: 1.0,
    fireDef: 2.5,
    lghtDef: 1.0,
    stability: 1.5,
  }, // Fire +9
  {
    phys: 1.25,
    mag: 1.0,
    fire: 1.3,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 0.12,
    magDef: 1.0,
    fireDef: 2.65,
    lghtDef: 1.0,
    stability: 1.55,
  }, // Fire +10
];

/**
 * Get the Fire upgrade multipliers for shields for a given upgrade level (0-10).
 * @param level The upgrade level (0-10, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth, physDef, magDef, fireDef, lghtDef, stability }
 */
export function getShieldFireUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(10, Math.floor(level)));
  return SHIELD_FIRE_UPGRADE_MULTIPLIERS[capped];
}

// Shield Special (Twinkling) Upgrade Path Multipliers (for Special to Special +5)
// Each entry corresponds to the upgrade level (0 = Special, 1 = Special +1, ..., 5 = Special +5)
// All values are multipliers (e.g., 1.05 = +5%)
export const SHIELD_SPECIAL_UPGRADE_MULTIPLIERS = [
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.0,
  }, // Special
  {
    phys: 1.05,
    mag: 1.05,
    fire: 1.05,
    lght: 1.05,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.04,
  }, // Special +1
  {
    phys: 1.1,
    mag: 1.1,
    fire: 1.1,
    lght: 1.1,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.08,
  }, // Special +2
  {
    phys: 1.15,
    mag: 1.15,
    fire: 1.15,
    lght: 1.15,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.12,
  }, // Special +3
  {
    phys: 1.2,
    mag: 1.2,
    fire: 1.2,
    lght: 1.2,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.16,
  }, // Special +4
  {
    phys: 1.25,
    mag: 1.25,
    fire: 1.25,
    lght: 1.25,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.2,
  }, // Special +5
];

/**
 * Get the Special (Twinkling) upgrade multipliers for shields for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth, physDef, magDef, fireDef, lghtDef, stability }
 */
export function getShieldSpecialUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return SHIELD_SPECIAL_UPGRADE_MULTIPLIERS[capped];
}

// Shield Boss (Demon) Upgrade Path Multipliers (for Boss to Boss +5)
// Each entry corresponds to the upgrade level (0 = Boss, 1 = Boss +1, ..., 5 = Boss +5)
// All values are multipliers (e.g., 1.05 = +5%)
export const SHIELD_BOSS_UPGRADE_MULTIPLIERS = [
  {
    phys: 1.0,
    mag: 1.0,
    fire: 1.0,
    lght: 1.0,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.0,
  }, // Boss
  {
    phys: 1.05,
    mag: 1.05,
    fire: 1.05,
    lght: 1.05,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.05,
  }, // Boss +1
  {
    phys: 1.1,
    mag: 1.1,
    fire: 1.1,
    lght: 1.1,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.1,
  }, // Boss +2
  {
    phys: 1.15,
    mag: 1.15,
    fire: 1.15,
    lght: 1.15,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.15,
  }, // Boss +3
  {
    phys: 1.2,
    mag: 1.2,
    fire: 1.2,
    lght: 1.2,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.2,
  }, // Boss +4
  {
    phys: 1.25,
    mag: 1.25,
    fire: 1.25,
    lght: 1.25,
    str: 1.0,
    dex: 1.0,
    int: 1.0,
    fth: 1.0,
    physDef: 1.0,
    magDef: 1.0,
    fireDef: 1.0,
    lghtDef: 1.0,
    stability: 1.3,
  }, // Boss +5
];

/**
 * Get the Boss (Demon) upgrade multipliers for a given upgrade level (0-5).
 * @param level The upgrade level (0-5, capped)
 * @returns { phys, mag, fire, lght, str, dex, int, fth, physDef, magDef, fireDef, lghtDef, stability }
 */
export function getShieldBossUpgradeMultipliers(level: number) {
  const capped = Math.max(0, Math.min(5, Math.floor(level)));
  return SHIELD_BOSS_UPGRADE_MULTIPLIERS[capped];
}
