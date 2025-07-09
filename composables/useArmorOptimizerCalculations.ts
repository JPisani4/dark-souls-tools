import {
  getAllArmor,
  getAllArmorSets,
  getArmorCategories,
} from "~/utils/games/ds1/armor";
import { calculateUpgradedArmorDefense } from "~/utils/games/ds1/armorScaling";
import { getAllWeapons } from "~/utils/games/ds1/weapons";
import { getAllShields, getShieldByName } from "~/utils/games/ds1/shields";
import { getAllRings, getRingByName } from "~/utils/games/ds1/rings";
import { getWeaponByName } from "~/utils/games/ds1/weapons";
import { calculateAllDerivedStats } from "~/utils/games/ds1/stats/characterStats";
import type { ArmorOptimizerResult } from "~/types/armorOptimizer";

export interface ArmorOptimizerState {
  endurance: string;
  selectedEquipment: {
    weapons: string[];
    shields: string[];
    catalysts: string[];
    talismans: string[];
  };
  selectedRings: string[];
  armorUpgradeLevel: string;
  displayMode: string;
  sortPrimary: string;
  sortSecondary: string;
  sortDescending: boolean;
  searchQuery: string;
  maxDodgeRollPercent: number | null;
  lockedArmor: Record<string, string | null>;
  customFilter?: {
    selectedStats: string[];
    minValues: Record<string, number>;
    weights: Record<string, number>;
  };
}

// Helper to compute total possible combinations for a full search
function getFullMixMatchCombinationCount(
  armor: any[],
  maskOfTheFather: boolean
) {
  const slots = ["head", "chest", "hands", "legs"];
  const counts = slots.map(
    (slot) => armor.filter((item) => item.slot === slot).length
  );
  if (maskOfTheFather) {
    // Head is always 1 (the mask)
    return 1 * (counts[1] + 1) * (counts[2] + 1) * (counts[3] + 1);
  } else {
    // Each slot: all pieces + empty
    return (
      (counts[0] + 1) * (counts[1] + 1) * (counts[2] + 1) * (counts[3] + 1)
    );
  }
}

// Add type guard for sort options
function getSortKey(option: any): string {
  return option && typeof option === "object" && "value" in option
    ? option.value
    : option;
}

// Returns the number of possible mixmatch combinations using top N per category per slot (plus empty)
function getRestrictedMixMatchCombinationCount(
  armor: any[],
  N: number,
  maskOfTheFather: boolean
) {
  const slots = ["head", "chest", "hands", "legs"];
  const categories = getArmorCategories();
  // For each slot, count the number of unique pieces in the top N per category (plus empty)
  const counts = slots.map((slot) => {
    let pieces = [];
    for (const category of categories) {
      const catArmor = armor.filter(
        (item) => item.slot === slot && item.armorType === category
      );
      pieces.push(...catArmor.slice(0, N));
    }
    // Deduplicate by name
    const seen = new Set();
    const deduped = pieces.filter((item) => {
      if (!item) return false;
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    });
    // Always include empty
    return 1 + deduped.length;
  });
  if (maskOfTheFather) {
    // Head is always 1 (the mask)
    return 1 * counts[1] * counts[2] * counts[3];
  } else {
    return counts[0] * counts[1] * counts[2] * counts[3];
  }
}

function getRingStatBonuses(ringEffects: any[]): Record<string, number> {
  // Sum up relevant statBonus values from all selected rings
  const bonuses = {
    magic: 0,
    fire: 0,
    lightning: 0,
    poise: 0,
    strike: 0,
    slash: 0,
    thrust: 0,
    normal: 0,
  };
  ringEffects.forEach((ring) => {
    const sb = ring.effect?.statBonus || {};
    // Defensive rings use these keys
    if (sb.magicDefense) bonuses.magic += sb.magicDefense;
    if (sb.fireDefense) bonuses.fire += sb.fireDefense;
    if (sb.lightningDefense) bonuses.lightning += sb.lightningDefense;
    if (sb.poise) bonuses.poise += sb.poise;
    // Ring of Steel Protection (+50 Strike, Slash, Thrust)
    if (sb.strikeDefense) bonuses.strike += sb.strikeDefense;
    if (sb.slashDefense) bonuses.slash += sb.slashDefense;
    if (sb.thrustDefense) bonuses.thrust += sb.thrustDefense;
    // Some rings may use 'phsyicalDefense' or 'physicalDefense' for all physical
    if (sb.phsyicalDefense) {
      bonuses.strike += sb.phsyicalDefense;
      bonuses.slash += sb.phsyicalDefense;
      bonuses.thrust += sb.phsyicalDefense;
      bonuses.normal += sb.phsyicalDefense;
    }
    if (sb.physicalDefense) {
      bonuses.strike += sb.physicalDefense;
      bonuses.slash += sb.physicalDefense;
      bonuses.thrust += sb.physicalDefense;
      bonuses.normal += sb.physicalDefense;
    }
  });
  return bonuses;
}

export function useArmorOptimizerCalculations() {
  // Helper functions
  function calculateEquipmentWeight(
    equipment: ArmorOptimizerState["selectedEquipment"]
  ): number {
    let totalWeight = 0;

    // Add weapon weights
    equipment.weapons.forEach((weaponName) => {
      const weapon = getWeaponByName(weaponName);
      if (weapon) {
        totalWeight += weapon.weight;
      }
    });

    // Add shield weights
    equipment.shields.forEach((shieldName) => {
      const shield = getShieldByName(shieldName);
      if (shield) {
        totalWeight += shield.weight;
      }
    });

    // Add catalyst/talisman weights
    equipment.catalysts.forEach((catalystName) => {
      const catalyst = getWeaponByName(catalystName);
      if (catalyst) {
        totalWeight += catalyst.weight;
      }
    });

    equipment.talismans.forEach((talismanName) => {
      const talisman = getWeaponByName(talismanName);
      if (talisman) {
        totalWeight += talisman.weight;
      }
    });

    return totalWeight;
  }

  function getEquipmentItems(itemNames: string[], type: string): any[] {
    return itemNames
      .map((name) => {
        if (
          type === "weapons" ||
          type === "catalysts" ||
          type === "talismans"
        ) {
          return getWeaponByName(name);
        } else if (type === "shields") {
          return getShieldByName(name);
        }
        return null;
      })
      .filter(Boolean);
  }

  function calculateRingEffects(ringNames: string[]): any[] {
    return ringNames
      .map((name) => {
        const ring = getRingByName(name);
        return ring;
      })
      .filter(Boolean);
  }

  function calculateArmorWithUpgrades(
    allArmor: any,
    upgradeLevel: number
  ): any[] {
    const flattenedArmor = Object.values(allArmor).flat();

    if (flattenedArmor.length === 0) {
      return [];
    }

    const result = flattenedArmor.map((armor: any) => {
      if (upgradeLevel > 0 && armor.upgradePath) {
        const upgradedDefense = calculateUpgradedArmorDefense(
          armor.defense,
          armor.upgradePath,
          upgradeLevel
        );
        return {
          ...(armor || {}),
          defense: upgradedDefense,
          upgradedLevel: upgradeLevel,
        };
      }
      return armor;
    });

    return result;
  }

  function sortArmor(
    armor: any[],
    primary: string | { label: string; value: string },
    secondary: string | { label: string; value: string },
    descending: boolean
  ): any[] {
    const primaryKey = getSortKey(primary);
    const secondaryKey = getSortKey(secondary);
    return armor.sort((a, b) => {
      // Helper function to get value for a given sort type
      const getValue = (armor: any, sortType: string): number => {
        switch (sortType) {
          case "poise":
            return armor.effect?.poise || 0;
          case "weight":
            return armor.weight;
          case "totalDefense":
            return (
              (armor.defense?.normal || 0) +
              (armor.defense?.strike || 0) +
              (armor.defense?.slash || 0) +
              (armor.defense?.thrust || 0)
            );
          case "regularDefense":
            return armor.defense?.normal || 0;
          case "strikeDefense":
            return armor.defense?.strike || 0;
          case "slashDefense":
            return armor.defense?.slash || 0;
          case "thrustDefense":
            return armor.defense?.thrust || 0;
          case "physical":
            return (
              (armor.defense?.normal || 0) +
              (armor.defense?.strike || 0) +
              (armor.defense?.slash || 0) +
              (armor.defense?.thrust || 0)
            );
          case "physicalDefense":
            return armor.defense?.normal || 0;
          case "magicDefense":
            return armor.defense?.magic || 0;
          case "fireDefense":
            return armor.defense?.fire || 0;
          case "lightningDefense":
            return armor.defense?.lightning || 0;
          case "elemental":
            return (
              (armor.defense?.magic || 0) +
              (armor.defense?.fire || 0) +
              (armor.defense?.lightning || 0)
            );
          case "elementalDefense":
            return (
              (armor.defense?.magic || 0) +
              (armor.defense?.fire || 0) +
              (armor.defense?.lightning || 0)
            );
          case "bleedResistance":
            return armor.defense?.bleed || 0;
          case "poisonResistance":
            return armor.defense?.poison || 0;
          case "curseResistance":
            return armor.defense?.curse || 0;
          case "status":
            return (
              (armor.defense?.bleed || 0) +
              (armor.defense?.poison || 0) +
              (armor.defense?.curse || 0)
            );
          case "statusResistance":
            return (
              (armor.defense?.bleed || 0) +
              (armor.defense?.poison || 0) +
              (armor.defense?.curse || 0)
            );
          default:
            return 0;
        }
      };

      // If no secondary sort is selected, just sort by primary value
      if (!secondaryKey || secondaryKey === "" || secondaryKey === "none") {
        const aValue = getValue(a, primaryKey);
        const bValue = getValue(b, primaryKey);
        const comparison = aValue - bValue;
        return descending ? -comparison : comparison;
      }

      // Calculate primary and secondary values
      const aPrimaryValue = getValue(a, primaryKey);
      const bPrimaryValue = getValue(b, primaryKey);
      const aSecondaryValue = getValue(a, secondaryKey);
      const bSecondaryValue = getValue(b, secondaryKey);

      // Calculate ratio (primary/secondary)
      const aRatio =
        aSecondaryValue !== 0 ? aPrimaryValue / aSecondaryValue : 0;
      const bRatio =
        bSecondaryValue !== 0 ? bPrimaryValue / bSecondaryValue : 0;

      // Compare ratios
      const ratioComparison = aRatio - bRatio;

      if (ratioComparison !== 0) {
        return descending ? -ratioComparison : ratioComparison;
      }

      // If ratios are equal, use primary value as tiebreaker
      const primaryComparison = aPrimaryValue - bPrimaryValue;
      return descending ? -primaryComparison : primaryComparison;
    });
  }

  function sortArmorSets(
    armorSets: any[],
    primary: string | { label: string; value: string },
    secondary: string | { label: string; value: string },
    descending: boolean
  ): any[] {
    const primaryKey = getSortKey(primary);
    const secondaryKey = getSortKey(secondary);
    return armorSets.sort((a, b) => {
      // Helper function to get value for a given sort type
      const getValue = (armorSet: any, sortType: string): number => {
        switch (sortType) {
          case "poise":
            return armorSet.totalPoise || 0;
          case "weight":
            return armorSet.totalWeight || 0;
          case "totalDefense":
            return armorSet.totalDefense
              ? (armorSet.totalDefense.normal || 0) +
                  (armorSet.totalDefense.strike || 0) +
                  (armorSet.totalDefense.slash || 0) +
                  (armorSet.totalDefense.thrust || 0)
              : 0;
          case "regularDefense":
            return armorSet.totalDefense?.normal || 0;
          case "strikeDefense":
            return armorSet.totalDefense?.strike || 0;
          case "slashDefense":
            return armorSet.totalDefense?.slash || 0;
          case "thrustDefense":
            return armorSet.totalDefense?.thrust || 0;
          case "physical":
            return armorSet.totalDefense
              ? (armorSet.totalDefense.normal || 0) +
                  (armorSet.totalDefense.strike || 0) +
                  (armorSet.totalDefense.slash || 0) +
                  (armorSet.totalDefense.thrust || 0)
              : 0;
          case "physicalDefense":
            return armorSet.totalDefense?.normal || 0;
          case "magicDefense":
            return armorSet.totalDefense?.magic || 0;
          case "fireDefense":
            return armorSet.totalDefense?.fire || 0;
          case "lightningDefense":
            return armorSet.totalDefense?.lightning || 0;
          case "elemental":
            return armorSet.totalDefense
              ? (armorSet.totalDefense.magic || 0) +
                  (armorSet.totalDefense.fire || 0) +
                  (armorSet.totalDefense.lightning || 0)
              : 0;
          case "elementalDefense":
            return armorSet.totalDefense
              ? (armorSet.totalDefense.magic || 0) +
                  (armorSet.totalDefense.fire || 0) +
                  (armorSet.totalDefense.lightning || 0)
              : 0;
          case "bleedResistance":
            return armorSet.totalDefense?.bleed || 0;
          case "poisonResistance":
            return armorSet.totalDefense?.poison || 0;
          case "curseResistance":
            return armorSet.totalDefense?.curse || 0;
          case "status":
            return armorSet.totalDefense
              ? (armorSet.totalDefense.bleed || 0) +
                  (armorSet.totalDefense.poison || 0) +
                  (armorSet.totalDefense.curse || 0)
              : 0;
          case "statusResistance":
            return armorSet.totalDefense
              ? (armorSet.totalDefense.bleed || 0) +
                  (armorSet.totalDefense.poison || 0) +
                  (armorSet.totalDefense.curse || 0)
              : 0;
          default:
            return 0;
        }
      };

      // If no secondary sort is selected, just sort by primary value
      if (!secondaryKey || secondaryKey === "" || secondaryKey === "none") {
        const aValue = getValue(a, primaryKey);
        const bValue = getValue(b, primaryKey);
        const comparison = aValue - bValue;
        return descending ? -comparison : comparison;
      }

      // Calculate primary and secondary values
      const aPrimaryValue = getValue(a, primaryKey);
      const bPrimaryValue = getValue(b, primaryKey);
      const aSecondaryValue = getValue(a, secondaryKey);
      const bSecondaryValue = getValue(b, secondaryKey);

      // Calculate ratio (primary/secondary)
      const aRatio =
        aSecondaryValue !== 0 ? aPrimaryValue / aSecondaryValue : 0;
      const bRatio =
        bSecondaryValue !== 0 ? bPrimaryValue / bSecondaryValue : 0;

      // Compare ratios
      const ratioComparison = aRatio - bRatio;

      if (ratioComparison !== 0) {
        return descending ? -ratioComparison : ratioComparison;
      }

      // If ratios are equal, use primary value as tiebreaker
      const primaryComparison = aPrimaryValue - bPrimaryValue;
      return descending ? -primaryComparison : primaryComparison;
    });
  }

  function calculateIndividualArmor(
    armor: any[],
    characterStats: any,
    state: ArmorOptimizerState
  ): any[] {
    let filteredArmor = armor;

    // Apply search filter to entire dataset
    if (state.searchQuery) {
      filteredArmor = armor.filter((item) =>
        item.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Armor lock: if a slot is locked, only show that piece for that slot
    if (state.lockedArmor) {
      const locked = state.lockedArmor;
      filteredArmor = filteredArmor.filter((item) => {
        if (locked[item.slot] && locked[item.slot] !== item.name) return false;
        return true;
      });
    }

    // Get ring stat bonuses
    const ringEffects = calculateRingEffects(state.selectedRings);
    const ringBonuses = getRingStatBonuses(ringEffects);

    // Add ring bonuses to each armor piece's displayed stats
    const armorWithBonuses = filteredArmor.map((item) => {
      const newItem = { ...item };
      if (newItem.defense) {
        newItem.defense = { ...newItem.defense };
        newItem.defense.magic =
          (newItem.defense.magic || 0) + ringBonuses.magic;
        newItem.defense.fire = (newItem.defense.fire || 0) + ringBonuses.fire;
        newItem.defense.lightning =
          (newItem.defense.lightning || 0) + ringBonuses.lightning;
        newItem.defense.strike =
          (newItem.defense.strike || 0) + ringBonuses.strike;
        newItem.defense.slash =
          (newItem.defense.slash || 0) + ringBonuses.slash;
        newItem.defense.thrust =
          (newItem.defense.thrust || 0) + ringBonuses.thrust;
        newItem.defense.normal =
          (newItem.defense.normal || 0) + ringBonuses.normal;
      }
      if (newItem.effect) {
        newItem.effect = { ...newItem.effect };
        newItem.effect.poise = (newItem.effect.poise || 0) + ringBonuses.poise;
      }
      return newItem;
    });

    // Sort armor
    const sortedArmor = sortArmor(
      armorWithBonuses,
      state.sortPrimary,
      state.sortSecondary,
      state.sortDescending
    );

    return sortedArmor;
  }

  function calculateArmorSets(
    allArmorSets: any,
    characterStats: any,
    state: ArmorOptimizerState
  ): any[] {
    // Get upgrade level
    const upgradeLevel = parseInt(state.armorUpgradeLevel) || 0;

    // Flatten all armor sets
    const allSets = Object.values(allArmorSets).flat() as any[];

    if (allSets.length === 0) {
      return [];
    }

    // Get ring stat bonuses
    const ringEffects = calculateRingEffects(state.selectedRings);
    const ringBonuses = getRingStatBonuses(ringEffects);

    let processedSets = allSets;
    if (upgradeLevel > 0) {
      processedSets = allSets.map((set: any) => {
        // Create a copy of the set
        const upgradedSet = { ...set };

        // Upgrade each piece in the set
        const upgradedPieces: any = {};
        let upgradedTotalDefense = {
          normal: 0,
          strike: 0,
          slash: 0,
          thrust: 0,
          magic: 0,
          fire: 0,
          lightning: 0,
          bleed: 0,
          poison: 0,
          curse: 0,
        };
        let upgradedTotalPoise = 0;
        let upgradedTotalWeight = 0;

        // Process each piece in the set
        Object.entries(set.pieces).forEach(([slot, piece]: [string, any]) => {
          let usePiece = piece;
          // If lockedArmor for this slot, use that piece instead
          if (state.lockedArmor && state.lockedArmor[slot]) {
            const locked = getArmorByName(state.lockedArmor[slot]);
            if (locked) usePiece = locked;
          }
          if (usePiece && usePiece.upgradePath) {
            const upgradedDefense = calculateUpgradedArmorDefense(
              usePiece.defense,
              usePiece.upgradePath,
              upgradeLevel
            );
            const upgradedPiece = {
              ...usePiece,
              defense: upgradedDefense,
              upgradedLevel: upgradeLevel,
            };
            upgradedPieces[slot] = upgradedPiece;
            // Add to totals
            Object.keys(upgradedTotalDefense).forEach((key) => {
              const k = key as keyof typeof upgradedTotalDefense;
              upgradedTotalDefense[k] += upgradedDefense[k] || 0;
            });
            upgradedTotalPoise += usePiece.effect?.poise || 0;
            upgradedTotalWeight += usePiece.weight;
          } else if (usePiece) {
            // Piece doesn't have upgrade path, keep as is
            upgradedPieces[slot] = usePiece;
            Object.keys(upgradedTotalDefense).forEach((key) => {
              const k = key as keyof typeof upgradedTotalDefense;
              upgradedTotalDefense[k] += usePiece.defense[k] || 0;
            });
            upgradedTotalPoise += usePiece.effect?.poise || 0;
            upgradedTotalWeight += usePiece.weight;
          }
        });

        // Add ring bonuses to set totals
        upgradedTotalDefense.magic += ringBonuses.magic;
        upgradedTotalDefense.fire += ringBonuses.fire;
        upgradedTotalDefense.lightning += ringBonuses.lightning;
        upgradedTotalDefense.strike += ringBonuses.strike;
        upgradedTotalDefense.slash += ringBonuses.slash;
        upgradedTotalDefense.thrust += ringBonuses.thrust;
        upgradedTotalDefense.normal += ringBonuses.normal;
        upgradedTotalPoise += ringBonuses.poise;

        // Update the set with upgraded values
        upgradedSet.pieces = upgradedPieces;
        upgradedSet.totalDefense = upgradedTotalDefense;
        upgradedSet.totalPoise = upgradedTotalPoise;
        upgradedSet.totalWeight = upgradedTotalWeight;
        upgradedSet.upgradedLevel = upgradeLevel;

        return upgradedSet;
      });
    } else {
      // Add ring bonuses to non-upgraded sets and forcibly use lockedArmor
      processedSets = allSets.map((set: any) => {
        const newSet = { ...set };
        const newPieces: any = { ...set.pieces };
        // Forcibly use lockedArmor for each slot if set
        for (const slot of ["head", "chest", "hands", "legs"]) {
          if (state.lockedArmor && state.lockedArmor[slot]) {
            const locked = getArmorByName(state.lockedArmor[slot]);
            if (locked) newPieces[slot] = locked;
          }
        }
        newSet.pieces = newPieces;
        // Recalculate totals
        let totalDefense = {
          normal: 0,
          strike: 0,
          slash: 0,
          thrust: 0,
          magic: 0,
          fire: 0,
          lightning: 0,
          bleed: 0,
          poison: 0,
          curse: 0,
        };
        let totalPoise = 0;
        let totalWeight = 0;
        for (const slot of ["head", "chest", "hands", "legs"]) {
          const piece = newPieces[slot];
          if (piece) {
            Object.keys(totalDefense).forEach((key) => {
              const k = key as keyof typeof totalDefense;
              totalDefense[k] += piece.defense[k] || 0;
            });
            totalPoise += piece.effect?.poise || 0;
            totalWeight += piece.weight;
          }
        }
        // Add ring bonuses
        totalDefense.magic += ringBonuses.magic;
        totalDefense.fire += ringBonuses.fire;
        totalDefense.lightning += ringBonuses.lightning;
        totalDefense.strike += ringBonuses.strike;
        totalDefense.slash += ringBonuses.slash;
        totalDefense.thrust += ringBonuses.thrust;
        totalDefense.normal += ringBonuses.normal;
        totalPoise += ringBonuses.poise;
        newSet.totalDefense = totalDefense;
        newSet.totalPoise = totalPoise;
        newSet.totalWeight = totalWeight;
        return newSet;
      });
    }

    let filteredSets = processedSets;

    // Apply search filter
    if (state.searchQuery) {
      filteredSets = processedSets.filter((set: any) =>
        set.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // (Do not filter out sets that don't originally include the locked piece)

    // Filter out sets that have headgear if Mask of the Father is selected
    if (false) {
      // Removed maskOfTheFather check
      // Don't filter out sets - let the display components handle the head slot display
    }

    // Apply dodge roll filter if set
    if (
      typeof state.maxDodgeRollPercent === "number" &&
      state.maxDodgeRollPercent !== null &&
      characterStats.equipLoad
    ) {
      const equippedWeight = characterStats.equippedWeight || 0;
      const totalEquipLoad = characterStats.equipLoad;
      const maxPercent = state.maxDodgeRollPercent ?? 100;
      filteredSets = filteredSets.filter((set: any) => {
        const percent =
          ((equippedWeight + (set.totalWeight || 0)) / totalEquipLoad) * 100;
        return percent <= maxPercent;
      });
    }

    // Sort armor sets
    const sortedSets = sortArmorSets(
      filteredSets,
      state.sortPrimary,
      state.sortSecondary,
      state.sortDescending
    );

    return sortedSets;
  }

  // Helper to get top N for a slot (plus empty)
  function getTopNArmorForSlot(
    armor: any[],
    slot: string,
    primary: string,
    secondary: string,
    descending: boolean,
    N: number,
    useAll: boolean = false // new param
  ) {
    const slotArmor = armor.filter((item) => item.slot === slot);
    // Always include empty
    const emptyPiece = null;
    if (useAll) {
      // Use all pieces for this slot (plus empty)
      return [emptyPiece, ...slotArmor];
    }
    // Sort by stat/ratio
    // If no custom sort, default to total defense
    const sortPrimary = primary === "custom" ? "totalDefense" : primary;
    const sorted = sortArmor(slotArmor, sortPrimary, secondary, descending);
    // Top N plus empty
    return [emptyPiece, ...sorted.slice(0, N)];
  }

  // Helper to get top N for a slot (no empty, for Mask of the Father)
  function getTopNArmorForSlotNoEmpty(
    armor: any[],
    slot: string,
    primary: string,
    secondary: string,
    descending: boolean,
    N: number
  ) {
    const slotArmor = armor.filter((item) => item.slot === slot);
    const sorted = sortArmor(slotArmor, primary, secondary, descending);
    return sorted.slice(0, N);
  }

  // Helper to get the Mask of the Father armor object
  function getMaskOfTheFather(armor: any[]): any | null {
    return armor.find((a) => a.name === "Mask of the Father");
  }

  function getTopNPerCategoryForSlot(
    armor: any[],
    slot: string,
    primary: string,
    secondary: string,
    descending: boolean,
    N: number
  ) {
    // Get all categories
    const categories = getArmorCategories();
    let pieces: any[] = [];
    for (const category of categories) {
      // Get all armor in this category and slot
      const catArmor = armor.filter(
        (item) => item.slot === slot && item.armorType === category
      );
      // If no custom sort, default to total defense
      const sortPrimary = primary === "custom" ? "totalDefense" : primary;
      const sorted = sortArmor(catArmor, sortPrimary, secondary, descending);
      pieces.push(...sorted.slice(0, N));
    }
    // Deduplicate by name (in case of overlap)
    const seen = new Set();
    const deduped = pieces.filter((item) => {
      if (!item) return false;
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    });
    // Always include empty
    return [null, ...deduped];
  }

  // Helper to check if an armor piece meets custom filter min values
  function meetsCustomFilter(
    item: any,
    selectedStats: string[],
    minValues: Record<string, number>
  ): boolean {
    return selectedStats.every((stat: string) => {
      const v =
        item.totalDefense?.[stat] ?? item.defense?.[stat] ?? item[stat] ?? 0;
      return v >= (minValues[stat] || 0);
    });
  }

  function getTopNPerCategoryForSlotFiltered(
    armor: any[],
    slot: string,
    N: number,
    customFilterStats: string[],
    customFilterMinValues: Record<string, number>
  ): any[] {
    const categories = getArmorCategories();
    let pieces = [];
    for (const category of categories) {
      // Get all armor in this category and slot
      let catArmor = armor.filter(
        (item) => item.slot === slot && item.armorType === category
      );
      // Apply custom filter min values if any
      if (customFilterStats.length > 0) {
        catArmor = catArmor.filter((item) =>
          meetsCustomFilter(item, customFilterStats, customFilterMinValues)
        );
      }
      // Sort by totalDefense descending for pool selection
      const sorted = sortArmor(catArmor, "totalDefense", "none", true);
      pieces.push(...sorted.slice(0, N));
    }
    // Deduplicate by name (in case of overlap)
    const seen = new Set();
    const deduped = pieces.filter((item) => {
      if (!item) return false;
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    });
    // Always include empty
    return [null, ...deduped];
  }

  function calculateMixMatchArmor(
    armor: any[],
    characterStats: any,
    state: ArmorOptimizerState
  ): any[] {
    const slots: string[] = ["head", "chest", "hands", "legs"];
    const N = 3;
    // Stat key mapping from filter UI to armor data
    const statKeyMap: Record<string, string> = {
      poise: "poise",
      weight: "weight",
      totalDefense: "totalDefense", // handled as sum
      regularDefense: "normal",
      strikeDefense: "strike",
      slashDefense: "slash",
      thrustDefense: "thrust",
      physical: "physical", // handled as sum
      physicalDefense: "normal",
      magicDefense: "magic",
      fireDefense: "fire",
      lightningDefense: "lightning",
      bleedResistance: "bleed",
      poisonResistance: "poison",
      curseResistance: "curse",
      status: "status", // handled as sum
      statusResistance: "statusResistance", // handled as sum
      magic: "magic",
      fire: "fire",
      lightning: "lightning",
      bleed: "bleed",
      poison: "poison",
      curse: "curse",
    };
    // Use custom filter settings for pool filtering
    const customFilterStats: string[] = state.customFilter?.selectedStats || [];
    const customFilterMinValues: Record<string, number> =
      state.customFilter?.minValues || {};
    const customFilterWeights: Record<string, number> =
      state.customFilter?.weights || {};
    // --- Pool Construction ---
    // For each slot, for each category, select top N by the user's selected filter stats (weighted sum if multiple, or first stat if only one), defaulting to total physical defense
    function getArmorScoreForFilter(item: any): number {
      if (customFilterStats.length === 0) {
        // Default: total physical defense
        return (
          (item.defense?.normal || 0) +
          (item.defense?.strike || 0) +
          (item.defense?.slash || 0) +
          (item.defense?.thrust || 0)
        );
      } else if (customFilterStats.length === 1) {
        // Single stat: use that stat
        const stat = customFilterStats[0];
        const mapped = statKeyMap[stat] || stat;
        if (stat === "poise") return item.effect?.poise || 0;
        if (stat === "weight") return item.weight || 0;
        if (stat === "totalDefense" || stat === "physical") {
          return (
            (item.defense?.normal || 0) +
            (item.defense?.strike || 0) +
            (item.defense?.slash || 0) +
            (item.defense?.thrust || 0)
          );
        }
        if (stat === "status" || stat === "statusResistance") {
          return (
            (item.defense?.bleed || 0) +
            (item.defense?.poison || 0) +
            (item.defense?.curse || 0)
          );
        }
        return item.defense?.[mapped] || 0;
      } else {
        // Weighted sum
        let score = 0;
        for (const stat of customFilterStats) {
          const w = customFilterWeights[stat] || 1;
          const mapped = statKeyMap[stat] || stat;
          let v = 0;
          if (stat === "poise") v = item.effect?.poise || 0;
          else if (stat === "weight") v = item.weight || 0;
          else if (stat === "totalDefense" || stat === "physical") {
            v =
              (item.defense?.normal || 0) +
              (item.defense?.strike || 0) +
              (item.defense?.slash || 0) +
              (item.defense?.thrust || 0);
          } else if (stat === "status" || stat === "statusResistance") {
            v =
              (item.defense?.bleed || 0) +
              (item.defense?.poison || 0) +
              (item.defense?.curse || 0);
          } else {
            v = item.defense?.[mapped] || 0;
          }
          score += w * v;
        }
        return score;
      }
    }
    const getTopNPerCategoryForSlot = (
      armor: any[],
      slot: string,
      N: number
    ) => {
      const categories = getArmorCategories();
      let pieces: any[] = [];
      for (const category of categories) {
        const catArmor = armor.filter(
          (item) => item.slot === slot && item.armorType === category
        );
        const sorted = catArmor.sort(
          (a: any, b: any) =>
            getArmorScoreForFilter(b) - getArmorScoreForFilter(a)
        );
        pieces.push(...sorted.slice(0, N));
      }
      // Deduplicate by name
      const seen = new Set();
      const deduped = pieces.filter((item) => {
        if (!item) return false;
        if (seen.has(item.name)) return false;
        seen.add(item.name);
        return true;
      });
      // Always include empty
      return [null, ...deduped];
    };
    let armorBySlot: Record<string, any[]> = {};
    for (const slot of slots) {
      const lockedName = state.lockedArmor?.[slot];
      if (lockedName) {
        // Use only the locked piece for this slot (from the upgraded armor array)
        const slotArmor = armor.filter((item) => item.slot === slot);
        const lockedPiece = slotArmor.find((item) => item.name === lockedName);
        armorBySlot[slot] = lockedPiece ? [lockedPiece] : [null];
      } else {
        // Not locked: use top N per category
        armorBySlot[slot] = getTopNPerCategoryForSlot(armor, slot, N);
      }
      // If the pool for this slot is empty (no valid pieces), return []
      if (!armorBySlot[slot] || armorBySlot[slot].length === 0) {
        return [];
      }
    }
    // --- Combination Generation (cartesian product) ---
    const combinations: any[] = [];
    const ringEffects = calculateRingEffects(state.selectedRings);
    const ringBonuses: { [key: string]: number } =
      getRingStatBonuses(ringEffects);
    function getStatValue(
      stat: string,
      totalDefense: any,
      totalPoise: number,
      totalWeight: number
    ) {
      const mapped = statKeyMap[stat] || stat;
      switch (stat) {
        case "poise":
          return totalPoise;
        case "weight":
          return totalWeight;
        case "totalDefense":
        case "physical":
          return (
            (totalDefense["normal"] || 0) +
            (totalDefense["strike"] || 0) +
            (totalDefense["slash"] || 0) +
            (totalDefense["thrust"] || 0)
          );
        case "status":
        case "statusResistance":
          return (
            (totalDefense["bleed"] || 0) +
            (totalDefense["poison"] || 0) +
            (totalDefense["curse"] || 0)
          );
        default:
          return totalDefense[mapped] || 0;
      }
    }
    // Recursive cartesian product
    function generateCombinations(current: any[], slotIndex: number) {
      if (slotIndex >= slots.length) {
        if (current.some(Boolean)) {
          const pieces: Record<string, any> = {};
          let totalWeight = 0;
          let totalPoise = 0;
          const totalDefense: { [key: string]: number } = {
            normal: 0,
            strike: 0,
            slash: 0,
            thrust: 0,
            magic: 0,
            fire: 0,
            lightning: 0,
            bleed: 0,
            poison: 0,
            curse: 0,
          };
          let totalStaminaRegenReduction = 0;
          slots.forEach((slot: string, i: number) => {
            if (current[i]) {
              pieces[slot] = current[i];
              totalWeight += current[i].weight;
              totalPoise += current[i].effect?.poise || 0;
              Object.keys(totalDefense).forEach((key: string) => {
                totalDefense[key] += current[i].defense[key] || 0;
              });
              totalStaminaRegenReduction +=
                current[i].staminaRegenReduction || 0;
            }
          });
          // Add ring bonuses
          totalDefense["magic"] += ringBonuses["magic"];
          totalDefense["fire"] += ringBonuses["fire"];
          totalDefense["lightning"] += ringBonuses["lightning"];
          totalDefense["strike"] += ringBonuses["strike"];
          totalDefense["slash"] += ringBonuses["slash"];
          totalDefense["thrust"] += ringBonuses["thrust"];
          totalDefense["normal"] += ringBonuses["normal"];
          totalPoise += ringBonuses["poise"];
          // Equip load filter (if set)
          let valid = true;
          if (
            typeof state.maxDodgeRollPercent === "number" &&
            state.maxDodgeRollPercent !== null &&
            !isNaN(state.maxDodgeRollPercent) &&
            characterStats.equipLoad
          ) {
            const equippedWeight = characterStats.equippedWeight || 0;
            const totalEquipLoad = characterStats.equipLoad;
            const percent =
              ((equippedWeight + (totalWeight || 0)) / totalEquipLoad) * 100;
            if (percent > state.maxDodgeRollPercent) valid = false;
          }
          // Custom filter min values for the whole combo (if any)
          if (valid && customFilterStats.length > 0) {
            valid = customFilterStats.every((stat: string) => {
              const v = getStatValue(
                stat,
                totalDefense,
                totalPoise,
                totalWeight
              );
              return v >= (customFilterMinValues[stat] || 0);
            });
          }
          if (valid) {
            // Calculate custom score if custom filter is active
            let _customScore = 0;
            if (customFilterStats.length > 0) {
              customFilterStats.forEach((stat) => {
                const w = customFilterWeights[stat] || 1;
                const v = getStatValue(
                  stat,
                  totalDefense,
                  totalPoise,
                  totalWeight
                );
                _customScore += w * v;
              });
            }
            combinations.push({
              id: `mixmatch-${combinations.length}`,
              name: `Mix ${combinations.length + 1}`,
              pieces,
              totalWeight,
              totalPoise,
              totalDefense,
              totalStaminaRegenReduction,
              isCombination: true,
              slotsFilled: slots.filter((_: any, i: number) => current[i])
                .length,
              _customScore,
            });
          }
        }
        return;
      }
      const slot = slots[slotIndex];
      const items = armorBySlot[slot];
      for (const item of items) {
        generateCombinations([...current, item], slotIndex + 1);
      }
    }
    generateCombinations([], 0);
    // --- Sorting and Slicing ---
    let sorted: any[] = [];
    if (customFilterStats.length > 0) {
      sorted = combinations.sort(
        (a: any, b: any) => b._customScore - a._customScore
      );
    } else {
      sorted = combinations.sort((a: any, b: any) => {
        const aDef =
          (a.totalDefense.normal || 0) +
          (a.totalDefense.strike || 0) +
          (a.totalDefense.slash || 0) +
          (a.totalDefense.thrust || 0);
        const bDef =
          (b.totalDefense.normal || 0) +
          (b.totalDefense.strike || 0) +
          (b.totalDefense.slash || 0) +
          (b.totalDefense.thrust || 0);
        return bDef - aDef;
      });
    }
    return sorted.slice(0, 25);
  }

  function calculateResults(state: ArmorOptimizerState) {
    try {
      const endurance = parseInt(state.endurance) || 20;
      const upgradeLevel = parseInt(state.armorUpgradeLevel) || 0;

      // Always calculate results even with empty endurance (use default)
      const effectiveEndurance = endurance || 20;

      // Get all armor data
      const allArmor = getAllArmor();
      const allArmorSets = getAllArmorSets();

      // Debug: Check if armor data is actually loaded
      const totalArmorPieces = Object.values(allArmor).flat().length;

      if (totalArmorPieces === 0) {
        return {
          calculatedArmor: [],
          armorSets: [],
          mixMatchResults: [],
          characterStats: {},
          timestamp: new Date(),
        };
      }

      // Get actual equipment items for stats calculation
      const weapons = getEquipmentItems(
        state.selectedEquipment.weapons,
        "weapons"
      );
      const shields = getEquipmentItems(
        state.selectedEquipment.shields,
        "shields"
      );
      const catalysts = getEquipmentItems(
        state.selectedEquipment.catalysts,
        "catalysts"
      );
      const talismans = getEquipmentItems(
        state.selectedEquipment.talismans,
        "talismans"
      );

      // Get currently equipped armor pieces from lockedArmor
      const equippedArmor = [
        state.lockedArmor.head,
        state.lockedArmor.chest,
        state.lockedArmor.hands,
        state.lockedArmor.legs,
      ]
        .map((name) => name && getArmorByName(name))
        .filter(Boolean);

      // Calculate equipment weight
      const equipmentWeight = calculateEquipmentWeight(state.selectedEquipment);

      // Get ring effects and add Mask of the Father if selected
      let ringEffects = calculateRingEffects(state.selectedRings);

      // Add Mask of the Father as a virtual ring if selected
      // Removed maskOfTheFather logic

      const baseStats = {
        level: 1,
        endurance: effectiveEndurance,
        vitality: 20,
        attunement: 10,
        strength: 20,
        dexterity: 20,
        resistance: 10,
        intelligence: 10,
        faith: 10,
        hp: 0,
        stamina: 0,
        equipLoad: 0,
        maxHp: 0,
        maxStamina: 0,
        staminaRegen: 0,
        dodgeRoll: "",
        equippedWeight: equipmentWeight,
        equipLoadPercentage: 0,
        movementSpeed: "",
        weightClass: "",
      };

      // Calculate all derived stats including equipment and ring/armor effects
      const characterStats = calculateAllDerivedStats(
        baseStats,
        [...weapons, ...catalysts, ...talismans], // weapons
        shields,
        equippedArmor, // armor array (now includes equipped pieces)
        ringEffects
      );

      // Calculate armor with upgrades
      const calculatedArmor = calculateArmorWithUpgrades(
        allArmor,
        upgradeLevel
      );

      // Prepare result object
      let result: ArmorOptimizerResult = {
        calculatedArmor: [],
        armorSets: [],
        mixMatchResults: [],
        characterStats,
        timestamp: new Date(),
      };

      // Filter and sort armor based on display mode
      switch (state.displayMode) {
        case "individual":
          result.calculatedArmor = calculateIndividualArmor(
            calculatedArmor,
            characterStats,
            state
          );
          break;
        case "sets":
          result.armorSets = calculateArmorSets(
            allArmorSets,
            characterStats,
            state
          );
          break;
        case "mixmatch":
          result.mixMatchResults = calculateMixMatchArmor(
            calculatedArmor,
            characterStats,
            state
          );
          break;
        default:
          result.calculatedArmor = calculateIndividualArmor(
            calculatedArmor,
            characterStats,
            state
          );
      }

      return result;
    } catch (err) {
      return {
        calculatedArmor: [],
        armorSets: [],
        mixMatchResults: [],
        characterStats: {},
        timestamp: new Date(),
      };
    }
  }

  return {
    calculateResults,
    calculateIndividualArmor,
    calculateArmorSets,
    calculateMixMatchArmor,
    sortArmor,
    sortArmorSets,
    calculateArmorWithUpgrades,
  };
}

export {
  getFullMixMatchCombinationCount,
  getRestrictedMixMatchCombinationCount,
};
