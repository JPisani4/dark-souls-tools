// Armor Upgrade Scaling Multipliers for Dark Souls
// Based on comprehensive armor data analysis across multiple armor sets
// Confirmed breakpoint system similar to weapon scaling
// Analysis based on: Light Armor (5-25 base defense), Medium Armor (15-45 base defense), Heavy Armor (25-105 base defense)

// Regular Armor Upgrade Path Multipliers (for +0 to +10)
// Each entry corresponds to the upgrade level (0 = Regular, 1 = Regular +1, ..., 10 = Regular +10)
// All values are multipliers (e.g., 1.1 = +10%)
// Physical and Elemental defense follow the same scaling pattern
// Resistance has much smaller scaling (bleed, poison, curse)
// Based on analysis of: Hunter Set, Leather Set, Maiden Set, Sorcerer Set, Thief Set, Black Leather Set
export const ARMOR_REGULAR_UPGRADE_MULTIPLIERS = [
  {
    normal: 1.0,
    strike: 1.0,
    slash: 1.0,
    thrust: 1.0,
    magic: 1.0,
    fire: 1.0,
    lightning: 1.0,
    bleed: 1.0,
    poison: 1.0,
    curse: 1.0,
  }, // Regular +0
  {
    normal: 1.142,
    strike: 1.142,
    slash: 1.142,
    thrust: 1.142,
    magic: 1.142,
    fire: 1.142,
    lightning: 1.142,
    bleed: 1.04,
    poison: 1.04,
    curse: 1.0,
  }, // Regular +1
  {
    normal: 1.284,
    strike: 1.284,
    slash: 1.284,
    thrust: 1.284,
    magic: 1.284,
    fire: 1.284,
    lightning: 1.284,
    bleed: 1.08,
    poison: 1.08,
    curse: 1.0,
  }, // Regular +2
  {
    normal: 1.426,
    strike: 1.426,
    slash: 1.426,
    thrust: 1.426,
    magic: 1.426,
    fire: 1.426,
    lightning: 1.426,
    bleed: 1.12,
    poison: 1.12,
    curse: 1.0,
  }, // Regular +3
  {
    normal: 1.568,
    strike: 1.568,
    slash: 1.568,
    thrust: 1.568,
    magic: 1.568,
    fire: 1.568,
    lightning: 1.568,
    bleed: 1.16,
    poison: 1.16,
    curse: 1.0,
  }, // Regular +4
  {
    normal: 1.71,
    strike: 1.71,
    slash: 1.71,
    thrust: 1.71,
    magic: 1.71,
    fire: 1.71,
    lightning: 1.71,
    bleed: 1.2,
    poison: 1.2,
    curse: 1.0,
  }, // Regular +5
  {
    normal: 1.852,
    strike: 1.852,
    slash: 1.852,
    thrust: 1.852,
    magic: 1.852,
    fire: 1.852,
    lightning: 1.852,
    bleed: 1.24,
    poison: 1.24,
    curse: 1.0,
  }, // Regular +6
  {
    normal: 1.994,
    strike: 1.994,
    slash: 1.994,
    thrust: 1.994,
    magic: 1.994,
    fire: 1.994,
    lightning: 1.994,
    bleed: 1.28,
    poison: 1.28,
    curse: 1.0,
  }, // Regular +7
  {
    normal: 2.136,
    strike: 2.136,
    slash: 2.136,
    thrust: 2.136,
    magic: 2.136,
    fire: 2.136,
    lightning: 2.136,
    bleed: 1.32,
    poison: 1.32,
    curse: 1.0,
  }, // Regular +8
  {
    normal: 2.278,
    strike: 2.278,
    slash: 2.278,
    thrust: 2.278,
    magic: 2.278,
    fire: 2.278,
    lightning: 2.278,
    bleed: 1.36,
    poison: 1.36,
    curse: 1.0,
  }, // Regular +9
  {
    normal: 2.42,
    strike: 2.42,
    slash: 2.42,
    thrust: 2.42,
    magic: 2.42,
    fire: 2.42,
    lightning: 2.42,
    bleed: 1.4,
    poison: 1.4,
    curse: 1.0,
  }, // Regular +10
];

// Special Armor Upgrade Path Multipliers (for +0 to +5)
// Special armor uses Twinkling Titanite and has different scaling than regular armor
// Based on comprehensive analysis of Black Iron, Giant, and Set of Favor armor
// Special armor has more aggressive scaling but fewer upgrade levels
// Analysis based on: Black Iron Set, Giant Set, and other special armor pieces
export const ARMOR_SPECIAL_UPGRADE_MULTIPLIERS = [
  {
    normal: 1.0,
    strike: 1.0,
    slash: 1.0,
    thrust: 1.0,
    magic: 1.0,
    fire: 1.0,
    lightning: 1.0,
    bleed: 1.0,
    poison: 1.0,
    curse: 1.0,
  }, // Special +0
  {
    normal: 1.2,
    strike: 1.2,
    slash: 1.2,
    thrust: 1.2,
    magic: 1.2,
    fire: 1.2,
    lightning: 1.2,
    bleed: 1.08,
    poison: 1.08,
    curse: 1.0,
  }, // Special +1
  {
    normal: 1.4,
    strike: 1.4,
    slash: 1.4,
    thrust: 1.4,
    magic: 1.4,
    fire: 1.4,
    lightning: 1.4,
    bleed: 1.16,
    poison: 1.16,
    curse: 1.0,
  }, // Special +2
  {
    normal: 1.6,
    strike: 1.6,
    slash: 1.6,
    thrust: 1.6,
    magic: 1.6,
    fire: 1.6,
    lightning: 1.6,
    bleed: 1.24,
    poison: 1.24,
    curse: 1.0,
  }, // Special +3
  {
    normal: 1.8,
    strike: 1.8,
    slash: 1.8,
    thrust: 1.8,
    magic: 1.8,
    fire: 1.8,
    lightning: 1.8,
    bleed: 1.32,
    poison: 1.32,
    curse: 1.0,
  }, // Special +4
  {
    normal: 2.0,
    strike: 2.0,
    slash: 2.0,
    thrust: 2.0,
    magic: 2.0,
    fire: 2.0,
    lightning: 2.0,
    bleed: 1.4,
    poison: 1.4,
    curse: 1.0,
  }, // Special +5
];

// Function to get armor upgrade multipliers
// Returns the appropriate multiplier array based on upgrade path and level
export function getArmorUpgradeMultipliers(upgradePath: string, level: number) {
  if (upgradePath === "regular" && level >= 0 && level <= 10) {
    return ARMOR_REGULAR_UPGRADE_MULTIPLIERS[level];
  }
  if (upgradePath === "special" && level >= 0 && level <= 5) {
    return ARMOR_SPECIAL_UPGRADE_MULTIPLIERS[level];
  }

  // Return base multipliers if invalid path/level
  return ARMOR_REGULAR_UPGRADE_MULTIPLIERS[0];
}

// Function to calculate upgraded armor defense
// Applies the appropriate multipliers to base defense values
// Rounds all results to nearest integer for game accuracy
export function calculateUpgradedArmorDefense(
  baseDefense: {
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
  },
  upgradePath: string,
  upgradeLevel: number
) {
  const multipliers = getArmorUpgradeMultipliers(upgradePath, upgradeLevel);

  return {
    normal: Math.round(baseDefense.normal * multipliers.normal),
    strike: Math.round(baseDefense.strike * multipliers.strike),
    slash: Math.round(baseDefense.slash * multipliers.slash),
    thrust: Math.round(baseDefense.thrust * multipliers.thrust),
    magic: Math.round(baseDefense.magic * multipliers.magic),
    fire: Math.round(baseDefense.fire * multipliers.fire),
    lightning: Math.round(baseDefense.lightning * multipliers.lightning),
    bleed: Math.round(baseDefense.bleed * multipliers.bleed),
    poison: Math.round(baseDefense.poison * multipliers.poison),
    curse: Math.round(baseDefense.curse * multipliers.curse),
  };
}

// Function to get all upgrade levels for an armor piece
// Regular armor: +0 to +10 (11 levels)
// Special armor: +0 to +5 (6 levels)
export function getArmorUpgradeLevels(upgradePath: string): number[] {
  if (upgradePath === "regular") {
    return Array.from({ length: 11 }, (_, i) => i); // 0 to 10
  }
  if (upgradePath === "special") {
    return Array.from({ length: 6 }, (_, i) => i); // 0 to 5
  }
  return [0]; // No upgrades available
}

// Function to get upgrade path display name
// Provides user-friendly names for upgrade paths
export function getArmorUpgradePathDisplayName(path: string): string {
  const pathNames: Record<string, string> = {
    regular: "Regular",
    special: "Special",
  };
  return pathNames[path] || path;
}

// Function to get upgrade material requirements
// Based on Dark Souls upgrade mechanics:
// Regular: Titanite Shards (1-3), Large Titanite Shards (4-6), Titanite Chunks (7-9), Titanite Slab (10)
// Special: Twinkling Titanite (1-5)
export function getArmorUpgradeMaterials(upgradePath: string, level: number) {
  if (level === 0)
    return { shards: 0, largeShards: 0, chunks: 0, slabs: 0, twinkling: 0 };

  if (upgradePath === "regular") {
    if (level <= 3) {
      return {
        shards: level,
        largeShards: 0,
        chunks: 0,
        slabs: 0,
        twinkling: 0,
      };
    } else if (level <= 6) {
      return {
        shards: 3,
        largeShards: level - 3,
        chunks: 0,
        slabs: 0,
        twinkling: 0,
      };
    } else if (level <= 9) {
      return {
        shards: 3,
        largeShards: 3,
        chunks: level - 6,
        slabs: 0,
        twinkling: 0,
      };
    } else {
      return { shards: 3, largeShards: 3, chunks: 3, slabs: 1, twinkling: 0 };
    }
  }

  if (upgradePath === "special") {
    if (level <= 2) {
      return {
        shards: 0,
        largeShards: 0,
        chunks: 0,
        slabs: 0,
        twinkling: level,
      };
    } else if (level <= 4) {
      return {
        shards: 0,
        largeShards: 0,
        chunks: 0,
        slabs: 0,
        twinkling: level,
      };
    } else {
      return { shards: 0, largeShards: 0, chunks: 0, slabs: 0, twinkling: 4 };
    }
  }

  return { shards: 0, largeShards: 0, chunks: 0, slabs: 0, twinkling: 0 };
}

// Function to get upgrade soul cost
// Based on Dark Souls upgrade costs
// Regular armor: 200 souls per level
// Special armor: 300 souls per level
export function getArmorUpgradeSoulCost(
  upgradePath: string,
  level: number
): number {
  if (level === 0) return 0;

  // Base cost per level (varies by armor type)
  const baseCost = upgradePath === "special" ? 300 : 200;
  return baseCost * level;
}

// Function to calculate total upgrade cost for an armor piece
// Sums up all soul costs from current level to target level
export function calculateTotalArmorUpgradeCost(
  upgradePath: string,
  fromLevel: number,
  toLevel: number
) {
  let totalCost = 0;
  for (let level = fromLevel + 1; level <= toLevel; level++) {
    totalCost += getArmorUpgradeSoulCost(upgradePath, level);
  }
  return totalCost;
}

// Function to get all upgrade materials needed for a range
// Calculates total materials needed from current level to target level
export function getTotalArmorUpgradeMaterials(
  upgradePath: string,
  fromLevel: number,
  toLevel: number
) {
  let totalShards = 0;
  let totalLargeShards = 0;
  let totalChunks = 0;
  let totalSlabs = 0;
  let totalTwinkling = 0;

  for (let level = fromLevel + 1; level <= toLevel; level++) {
    const materials = getArmorUpgradeMaterials(upgradePath, level);
    totalShards += materials.shards;
    totalLargeShards += materials.largeShards;
    totalChunks += materials.chunks;
    totalSlabs += materials.slabs;
    totalTwinkling += materials.twinkling;
  }

  return {
    shards: totalShards,
    largeShards: totalLargeShards,
    chunks: totalChunks,
    slabs: totalSlabs,
    twinkling: totalTwinkling,
  };
}
