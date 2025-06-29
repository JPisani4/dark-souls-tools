import type { CharacterStats } from "~/types/game/ds1/characters";
import type { Weapon } from "~/types/game/ds1/weapons";
import type { Shield } from "~/types/game/ds1/shields";
import type { Sorcery } from "~/types/game/ds1/sorceries";
import type { Miracle } from "~/types/game/ds1/miracles";
import {
  STAT_MIN_VALUE,
  STAT_MAX_VALUE,
  TWO_HANDED_STRENGTH_MULTIPLIER,
  VALIDATION_MESSAGES,
} from "~/utils/constants";
import { getAttunementLevelForSlots } from "./attunementSlots";
import { allCharacters } from "~/utils/games/ds1/characters";

export interface MinimumRequirements {
  vitality: number;
  attunement: number;
  endurance: number;
  strength: number;
  dexterity: number;
  resistance: number;
  intelligence: number;
  faith: number;
}

export interface CharacterValidation {
  isValid: boolean;
  errors: Record<keyof CharacterStats, { isValid: boolean; error?: string }>;
  warnings: string[];
}

export interface OptimalStartingClass {
  character: any;
  soulLevelNeeded: number;
  statDifferences: Partial<CharacterStats>;
}

/**
 * Calculate minimum requirements for selected items
 */
export function calculateMinimumRequirements(
  weapons: Weapon[],
  shields: Shield[],
  sorceries: Sorcery[],
  miracles: Miracle[],
  isTwoHanded: boolean
): MinimumRequirements {
  const requirements: MinimumRequirements = {
    vitality: STAT_MIN_VALUE,
    attunement: STAT_MIN_VALUE,
    endurance: STAT_MIN_VALUE,
    strength: STAT_MIN_VALUE,
    dexterity: STAT_MIN_VALUE,
    resistance: STAT_MIN_VALUE,
    intelligence: STAT_MIN_VALUE,
    faith: STAT_MIN_VALUE,
  };

  // Calculate weapon requirements
  weapons.forEach((weapon) => {
    if (weapon.requirements) {
      // Only apply two-handed strength reduction if the weapon can be used one-handed
      // Weapons with twoHanded: false (like greatbows) always require full strength
      const shouldApplyTwoHandedReduction =
        isTwoHanded && weapon.twoHanded !== false;

      requirements.strength = Math.max(
        requirements.strength,
        shouldApplyTwoHandedReduction
          ? Math.ceil(
              (weapon.requirements.strength || 0) /
                TWO_HANDED_STRENGTH_MULTIPLIER
            )
          : weapon.requirements.strength || 0
      );
      requirements.dexterity = Math.max(
        requirements.dexterity,
        weapon.requirements.dexterity || 0
      );
      requirements.intelligence = Math.max(
        requirements.intelligence,
        weapon.requirements.intelligence || 0
      );
      requirements.faith = Math.max(
        requirements.faith,
        weapon.requirements.faith || 0
      );
    }
  });

  // Calculate shield requirements
  shields.forEach((shield) => {
    if (shield.requirements) {
      // Apply two-handed strength multiplier to shields when two-handed mode is enabled
      // and no weapons are selected (only shields can be two-handed)
      const shouldApplyTwoHanded = isTwoHanded && weapons.length === 0;

      requirements.strength = Math.max(
        requirements.strength,
        shouldApplyTwoHanded
          ? Math.ceil(
              (shield.requirements.strength || 0) /
                TWO_HANDED_STRENGTH_MULTIPLIER
            )
          : shield.requirements.strength || 0
      );
      requirements.dexterity = Math.max(
        requirements.dexterity,
        shield.requirements.dexterity || 0
      );
      requirements.intelligence = Math.max(
        requirements.intelligence,
        shield.requirements.intelligence || 0
      );
      requirements.faith = Math.max(
        requirements.faith,
        shield.requirements.faith || 0
      );
    }
  });

  // Calculate sorcery requirements
  sorceries.forEach((sorcery) => {
    if (sorcery.requirements) {
      requirements.intelligence = Math.max(
        requirements.intelligence,
        sorcery.requirements.intelligence || 0
      );
      requirements.faith = Math.max(
        requirements.faith,
        sorcery.requirements.faith || 0
      );
    }
  });

  // Calculate miracle requirements
  miracles.forEach((miracle) => {
    if (miracle.requirements) {
      requirements.intelligence = Math.max(
        requirements.intelligence,
        miracle.requirements.intelligence || 0
      );
      requirements.faith = Math.max(
        requirements.faith,
        miracle.requirements.faith || 0
      );
    }
  });

  return requirements;
}

/**
 * Validate character stats against minimum requirements
 */
export function validateCharacterStats(
  stats: CharacterStats,
  requirements: MinimumRequirements
): CharacterValidation {
  const errors: Record<
    keyof CharacterStats,
    { isValid: boolean; error?: string }
  > = {
    level: { isValid: true },
    vitality: { isValid: true },
    attunement: { isValid: true },
    endurance: { isValid: true },
    strength: { isValid: true },
    dexterity: { isValid: true },
    resistance: { isValid: true },
    intelligence: { isValid: true },
    faith: { isValid: true },
  };

  const warnings: string[] = [];

  // Validate each stat
  Object.keys(requirements).forEach((statKey) => {
    const key = statKey as keyof MinimumRequirements;
    const required = requirements[key];
    const current = stats[key];

    if (current < required) {
      errors[key] = {
        isValid: false,
        error: VALIDATION_MESSAGES.MIN_REQUIREMENT(statKey, required),
      };
    }
  });

  const isValid = Object.values(errors).every((error) => error.isValid);

  return { isValid, errors, warnings };
}

/**
 * Check if two-handed mode is disabled based on weapon/shield requirements
 */
export function isTwoHandedModeDisabled(
  weapons: Weapon[],
  shields: Shield[],
  currentStats: CharacterStats
): boolean {
  // If no weapons or shields are selected, two-handed mode is disabled
  if (weapons.length === 0 && shields.length === 0) return true;

  // If both weapons and shields are selected, two-handed mode is disabled
  if (weapons.length > 0 && shields.length > 0) return true;

  // Check weapon requirements if weapons are selected
  if (weapons.length > 0) {
    return weapons.some((weapon) => {
      if (!weapon.requirements) return false;

      // Only apply two-handed strength reduction if the weapon can be used one-handed
      // Weapons with twoHanded: false (like greatbows) always require full strength
      const shouldApplyTwoHandedReduction = weapon.twoHanded !== false;
      const requiredStrength = shouldApplyTwoHandedReduction
        ? Math.ceil(
            weapon.requirements.strength / TWO_HANDED_STRENGTH_MULTIPLIER
          )
        : weapon.requirements.strength;

      return currentStats.strength < requiredStrength;
    });
  }

  // Check shield requirements if only shields are selected
  if (shields.length > 0) {
    return shields.some((shield) => {
      if (!shield.requirements) return false;

      const twoHandedStrength = Math.ceil(
        shield.requirements.strength / TWO_HANDED_STRENGTH_MULTIPLIER
      );

      return currentStats.strength < twoHandedStrength;
    });
  }

  return false;
}

/**
 * Check if shield selection is disabled
 */
export function isShieldSelectionDisabled(
  weapons: Weapon[],
  isTwoHanded: boolean
): boolean {
  return isTwoHanded && weapons.length > 0;
}

/**
 * Check if weapon selection is disabled
 */
export function isWeaponSelectionDisabled(
  shields: Shield[],
  isTwoHanded: boolean
): boolean {
  return isTwoHanded && shields.length > 0;
}

/**
 * Check if weapon/shield has required two-handed strength
 */
export function hasRequiredTwoHandedWeapon(
  weapons: Weapon[],
  shields: Shield[],
  currentStats: CharacterStats
): boolean {
  // If no weapons or shields are selected, return false
  if (weapons.length === 0 && shields.length === 0) return false;

  // If both weapons and shields are selected, two-handed mode is not possible
  if (weapons.length > 0 && shields.length > 0) return false;

  // Check weapon requirements if weapons are selected
  if (weapons.length > 0) {
    return weapons.every((weapon) => {
      if (!weapon.requirements) return true;

      const twoHandedStrength = Math.ceil(
        weapon.requirements.strength / TWO_HANDED_STRENGTH_MULTIPLIER
      );

      return currentStats.strength >= twoHandedStrength;
    });
  }

  // Check shield requirements if only shields are selected
  if (shields.length > 0) {
    return shields.every((shield) => {
      if (!shield.requirements) return true;

      const twoHandedStrength = Math.ceil(
        shield.requirements.strength / TWO_HANDED_STRENGTH_MULTIPLIER
      );

      return currentStats.strength >= twoHandedStrength;
    });
  }

  return false;
}

/**
 * Update stats to meet minimum requirements
 */
export function updateStatsFromRequirements(
  currentStats: CharacterStats,
  requirements: MinimumRequirements
): CharacterStats {
  return {
    ...currentStats,
    vitality: Math.max(currentStats.vitality, requirements.vitality),
    attunement: Math.max(currentStats.attunement, requirements.attunement),
    endurance: Math.max(currentStats.endurance, requirements.endurance),
    strength: Math.max(currentStats.strength, requirements.strength),
    dexterity: Math.max(currentStats.dexterity, requirements.dexterity),
    resistance: Math.max(currentStats.resistance, requirements.resistance),
    intelligence: Math.max(
      currentStats.intelligence,
      requirements.intelligence
    ),
    faith: Math.max(currentStats.faith, requirements.faith),
  };
}

/**
 * Update stats when two-handed mode changes
 * Only affects strength stat since that's the only requirement that changes
 */
export function updateStatsForTwoHandedToggle(
  currentStats: CharacterStats,
  requirements: MinimumRequirements
): CharacterStats {
  return {
    ...currentStats,
    // Update strength to match the new requirements (which already account for two-handed mode)
    strength: requirements.strength,
  };
}

/**
 * Reset stats to minimum requirements
 */
export function resetStatsToRequirements(
  currentStats: CharacterStats,
  requirements: MinimumRequirements
): CharacterStats {
  return {
    ...currentStats,
    vitality: requirements.vitality,
    attunement: requirements.attunement,
    endurance: requirements.endurance,
    strength: requirements.strength,
    dexterity: requirements.dexterity,
    resistance: requirements.resistance,
    intelligence: requirements.intelligence,
    faith: requirements.faith,
  };
}

/**
 * Find optimal starting class
 */
export function findOptimalStartingClass(
  targetStats: CharacterStats,
  requirements: MinimumRequirements
): OptimalStartingClass {
  const characterArray = allCharacters;
  let optimalCharacter: any = null;
  let minSoulLevel = Infinity;
  let optimalStatDifferences: Partial<CharacterStats> = {};

  characterArray.forEach((character) => {
    const statDifferences: Partial<CharacterStats> = {};
    let totalStatIncreases = 0;

    // Calculate stat differences and total increases needed
    Object.keys(targetStats).forEach((statKey) => {
      if (statKey === "level") return;
      const key = statKey as keyof CharacterStats;
      const targetValue = targetStats[key];
      const startingValue = character.stats[key];
      const difference = targetValue - startingValue;

      if (difference > 0) {
        statDifferences[key] = difference;
        totalStatIncreases += difference;
      }
    });

    // Calculate soul level needed as the starting level plus the total stat increases needed
    const soulLevelNeeded = character.startingLevel + totalStatIncreases;

    // Update optimal character if this one requires fewer souls
    if (soulLevelNeeded < minSoulLevel) {
      minSoulLevel = soulLevelNeeded;
      optimalCharacter = character;
      optimalStatDifferences = statDifferences;
    }
  });

  if (!optimalCharacter) {
    throw new Error("No optimal starting class found");
  }

  return {
    character: optimalCharacter,
    soulLevelNeeded: minSoulLevel,
    statDifferences: optimalStatDifferences,
  };
}

/**
 * Find all starting classes ranked by soul level investment
 */
export function findAllStartingClasses(
  targetStats: CharacterStats,
  requirements: MinimumRequirements
): OptimalStartingClass[] {
  const characterArray = allCharacters;
  const classResults: OptimalStartingClass[] = [];

  characterArray.forEach((character) => {
    const statDifferences: Partial<CharacterStats> = {};
    let totalStatIncreases = 0;

    // Calculate stat differences and total increases needed
    Object.keys(targetStats).forEach((statKey) => {
      if (statKey === "level") return;
      const key = statKey as keyof CharacterStats;
      const targetValue = targetStats[key];
      const startingValue = character.stats[key];
      const difference = targetValue - startingValue;

      if (difference > 0) {
        statDifferences[key] = difference;
        totalStatIncreases += difference;
      }
    });

    // Calculate soul level needed as the starting level plus the total stat increases needed
    const soulLevelNeeded = character.startingLevel + totalStatIncreases;

    classResults.push({
      character: character,
      soulLevelNeeded: soulLevelNeeded,
      statDifferences: statDifferences,
    });
  });

  // Sort by soul level needed (ascending - best first)
  return classResults.sort((a, b) => a.soulLevelNeeded - b.soulLevelNeeded);
}

/**
 * Calculate total attunement slots needed for spells
 */
export function calculateRequiredAttunementSlots(
  sorceries: Sorcery[],
  miracles: Miracle[]
): number {
  const sorcerySlots = sorceries.reduce(
    (total, sorcery) => total + sorcery.attunementSlots,
    0
  );
  const miracleSlots = miracles.reduce(
    (total, miracle) => total + miracle.attunementSlots,
    0
  );
  const totalSlots = sorcerySlots + miracleSlots;
  return Math.min(totalSlots, 10); // Maximum 10 slots
}

/**
 * Check if current attunement provides enough slots
 */
export function hasSufficientAttunementSlots(
  currentAttunement: number,
  requiredSlots: number
): boolean {
  const currentSlots = getAttunementSlots(currentAttunement);
  return currentSlots >= requiredSlots;
}

/**
 * Get attunement slots for a given attunement level
 */
function getAttunementSlots(attunement: number): number {
  if (attunement < 10) return 0;
  if (attunement < 12) return 1;
  if (attunement < 14) return 2;
  if (attunement < 16) return 3;
  if (attunement < 19) return 4;
  if (attunement < 23) return 5;
  if (attunement < 28) return 6;
  if (attunement < 34) return 7;
  if (attunement < 41) return 8;
  if (attunement < 50) return 9;
  return 10;
}

/**
 * Calculate requirements for a specific item
 */
export function calculateItemRequirements(
  item: Weapon | Shield | Sorcery | Miracle,
  isTwoHanded: boolean,
  weapons: Weapon[] = []
): Partial<MinimumRequirements> {
  const requirements: Partial<MinimumRequirements> = {};

  if ("weaponType" in item) {
    // Weapon
    if (item.requirements) {
      // Only apply two-handed strength reduction if the weapon can be used one-handed
      // Weapons with twoHanded: false (like greatbows) always require full strength
      const shouldApplyTwoHandedReduction =
        isTwoHanded && item.twoHanded !== false;

      requirements.strength = shouldApplyTwoHandedReduction
        ? Math.ceil(
            (item.requirements.strength || 0) / TWO_HANDED_STRENGTH_MULTIPLIER
          )
        : item.requirements.strength || 0;
      requirements.dexterity = item.requirements.dexterity || 0;
      requirements.intelligence = item.requirements.intelligence || 0;
      requirements.faith = item.requirements.faith || 0;
    }
  } else if ("shieldType" in item) {
    // Shield
    if (item.requirements) {
      const shouldApplyTwoHanded = isTwoHanded && weapons.length === 0;
      requirements.strength = shouldApplyTwoHanded
        ? Math.ceil(
            (item.requirements.strength || 0) / TWO_HANDED_STRENGTH_MULTIPLIER
          )
        : item.requirements.strength || 0;
      requirements.dexterity = item.requirements.dexterity || 0;
      requirements.intelligence = item.requirements.intelligence || 0;
      requirements.faith = item.requirements.faith || 0;
    }
  } else if ("sorceryType" in item) {
    // Sorcery
    if (item.requirements) {
      requirements.intelligence = item.requirements.intelligence || 0;
      requirements.faith = item.requirements.faith || 0;
    }
    // Add attunement requirement
    requirements.attunement =
      getAttunementLevelForSlots(item.attunementSlots) || 1;
  } else if ("miracleType" in item) {
    // Miracle
    if (item.requirements) {
      requirements.intelligence = item.requirements.intelligence || 0;
      requirements.faith = item.requirements.faith || 0;
    }
    // Add attunement requirement
    requirements.attunement =
      getAttunementLevelForSlots(item.attunementSlots) || 1;
  }

  return requirements;
}

/**
 * Calculate requirements for a collection of items
 */
export function calculateItemsRequirements(
  items: (Weapon | Shield | Sorcery | Miracle)[],
  isTwoHanded: boolean,
  weapons: Weapon[] = []
): MinimumRequirements {
  const requirements: MinimumRequirements = {
    vitality: STAT_MIN_VALUE,
    attunement: STAT_MIN_VALUE,
    endurance: STAT_MIN_VALUE,
    strength: STAT_MIN_VALUE,
    dexterity: STAT_MIN_VALUE,
    resistance: STAT_MIN_VALUE,
    intelligence: STAT_MIN_VALUE,
    faith: STAT_MIN_VALUE,
  };

  items.forEach((item) => {
    const itemReqs = calculateItemRequirements(item, isTwoHanded, weapons);
    Object.keys(itemReqs).forEach((key) => {
      const statKey = key as keyof MinimumRequirements;
      requirements[statKey] = Math.max(
        requirements[statKey],
        itemReqs[statKey] || 0
      );
    });
  });

  return requirements;
}

/**
 * Reset only the stats that were affected by removing an item
 */
export function resetStatsForRemovedItem(
  currentStats: CharacterStats,
  removedItem: Weapon | Shield | Sorcery | Miracle,
  remainingItems: {
    weapons: Weapon[];
    shields: Shield[];
    sorceries: Sorcery[];
    miracles: Miracle[];
  },
  isTwoHanded: boolean
): CharacterStats {
  // Calculate requirements for the removed item
  const removedItemReqs = calculateItemRequirements(
    removedItem,
    isTwoHanded,
    remainingItems.weapons
  );

  // Calculate requirements for remaining items
  const allRemainingItems = [
    ...remainingItems.weapons,
    ...remainingItems.shields,
    ...remainingItems.sorceries,
    ...remainingItems.miracles,
  ];
  const remainingReqs = calculateItemsRequirements(
    allRemainingItems,
    isTwoHanded,
    remainingItems.weapons
  );

  // Only reset stats that were actually required by the removed item
  const updatedStats = { ...currentStats };

  Object.keys(removedItemReqs).forEach((key) => {
    const statKey = key as keyof MinimumRequirements;
    const removedValue = removedItemReqs[statKey] || 0;
    const remainingValue = remainingReqs[statKey] || 0;

    // If the removed item required this stat and the remaining items require less,
    // reset to the remaining requirement
    if (removedValue > 0 && currentStats[statKey] === removedValue) {
      updatedStats[statKey] = remainingValue;
    }
  });

  // Special handling for attunement - recalculate based on remaining spells
  if ("sorceryType" in removedItem || "miracleType" in removedItem) {
    const requiredSlots = calculateRequiredAttunementSlots(
      remainingItems.sorceries,
      remainingItems.miracles
    );
    const requiredAttunement = getAttunementLevelForSlots(requiredSlots);

    if (requiredAttunement !== null) {
      updatedStats.attunement = requiredAttunement;
    }
  }

  return updatedStats;
}
