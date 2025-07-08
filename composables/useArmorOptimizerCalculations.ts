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
  maskOfTheFather: boolean;
  armorUpgradeLevel: string;
  displayMode: string;
  sortPrimary: string;
  sortSecondary: string;
  sortDescending: boolean;
  searchQuery: string;
  maxDodgeRollPercent: number | null;
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

    // Filter out headgear if Mask of the Father is selected
    if (state.maskOfTheFather) {
      filteredArmor = filteredArmor.filter((item) => item.slot !== "head");
    }

    // Sort armor
    const sortedArmor = sortArmor(
      filteredArmor,
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

    // Upgrade armor sets if upgrade level > 0
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
          if (piece && piece.upgradePath) {
            const upgradedDefense = calculateUpgradedArmorDefense(
              piece.defense,
              piece.upgradePath,
              upgradeLevel
            );

            const upgradedPiece = {
              ...piece,
              defense: upgradedDefense,
              upgradedLevel: upgradeLevel,
            };

            upgradedPieces[slot] = upgradedPiece;

            // Add to totals
            Object.keys(upgradedTotalDefense).forEach((key) => {
              const k = key as keyof typeof upgradedTotalDefense;
              upgradedTotalDefense[k] += upgradedDefense[k] || 0;
            });
            upgradedTotalPoise += piece.effect?.poise || 0;
            upgradedTotalWeight += piece.weight;
          } else {
            // Piece doesn't have upgrade path, keep as is
            upgradedPieces[slot] = piece;
            Object.keys(upgradedTotalDefense).forEach((key) => {
              const k = key as keyof typeof upgradedTotalDefense;
              upgradedTotalDefense[k] += piece.defense[k] || 0;
            });
            upgradedTotalPoise += piece.effect?.poise || 0;
            upgradedTotalWeight += piece.weight;
          }
        });

        // Update the set with upgraded values
        upgradedSet.pieces = upgradedPieces;
        upgradedSet.totalDefense = upgradedTotalDefense;
        upgradedSet.totalPoise = upgradedTotalPoise;
        upgradedSet.totalWeight = upgradedTotalWeight;
        upgradedSet.upgradedLevel = upgradeLevel;

        return upgradedSet;
      });
    }

    let filteredSets = processedSets;

    // Apply search filter
    if (state.searchQuery) {
      filteredSets = processedSets.filter((set: any) =>
        set.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Filter out sets that have headgear if Mask of the Father is selected
    if (state.maskOfTheFather) {
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

  function calculateMixMatchArmor(
    armor: any[],
    characterStats: any,
    state: ArmorOptimizerState
  ): any[] {
    const slots = ["head", "chest", "hands", "legs"];
    const N = 3;
    let armorBySlot: Record<string, any[]> = {};
    if (state.maskOfTheFather) {
      // Head is always Mask of the Father
      const mask = getMaskOfTheFather(armor);
      armorBySlot.head = mask ? [mask] : [];
      // Other slots: top N per category + empty
      ["chest", "hands", "legs"].forEach((slot) => {
        armorBySlot[slot] = getTopNPerCategoryForSlot(
          armor,
          slot,
          state.sortPrimary,
          state.sortSecondary,
          state.sortDescending,
          N
        );
      });
    } else {
      // All slots: top N per category + empty
      slots.forEach((slot) => {
        armorBySlot[slot] = getTopNPerCategoryForSlot(
          armor,
          slot,
          state.sortPrimary,
          state.sortSecondary,
          state.sortDescending,
          N
        );
      });
    }

    // Generate all combinations
    const combinations: any[] = [];
    let generated = 0;
    function generateCombinations(current: any[], slotIndex: number) {
      if (slotIndex >= slots.length) {
        // At least one piece must be equipped
        if (current.some(Boolean)) {
          const pieces: Record<string, any> = {};
          let totalWeight = 0;
          let totalPoise = 0;
          const totalDefense: Record<string, number> = {
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
          slots.forEach((slot, i) => {
            if (current[i]) {
              pieces[slot] = current[i];
              totalWeight += current[i].weight;
              totalPoise += current[i].effect?.poise || 0;
              Object.keys(totalDefense).forEach((key) => {
                totalDefense[key] += current[i].defense[key] || 0;
              });
            }
          });
          combinations.push({
            id: `mixmatch-${combinations.length}`,
            name: `Mix ${combinations.length + 1}`,
            pieces,
            totalWeight,
            totalPoise,
            totalDefense,
            isCombination: true,
            slotsFilled: slots.filter((_, i) => current[i]).length,
          });
          generated++;
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

    // Apply search filter
    let filtered = combinations;
    if (state.searchQuery) {
      filtered = filtered.filter(
        (combo) =>
          combo.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          Object.values(combo.pieces).some((piece: any) =>
            piece?.name?.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
      );
    }

    // Apply dodge roll filter if set
    let maxDodgeRollPercent: number = 100;
    if (
      typeof state.maxDodgeRollPercent === "number" &&
      state.maxDodgeRollPercent !== null &&
      !isNaN(state.maxDodgeRollPercent) &&
      characterStats.equipLoad
    ) {
      maxDodgeRollPercent = state.maxDodgeRollPercent;
      const equippedWeight = characterStats.equippedWeight || 0;
      const totalEquipLoad = characterStats.equipLoad;
      filtered = filtered.filter((combo: any) => {
        const percent =
          ((equippedWeight + (combo.totalWeight || 0)) / totalEquipLoad) * 100;
        return percent <= maxDodgeRollPercent;
      });
    }

    // Sort combinations
    const sorted = sortArmorSets(
      filtered,
      state.sortPrimary,
      state.sortSecondary,
      state.sortDescending
    );

    // Return only the top 25 combinations
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

      // Calculate equipment weight
      const equipmentWeight = calculateEquipmentWeight(state.selectedEquipment);

      // Get ring effects and add Mask of the Father if selected
      let ringEffects = calculateRingEffects(state.selectedRings);

      // Add Mask of the Father as a virtual ring if selected
      if (state.maskOfTheFather) {
        ringEffects.push({
          name: "Mask of the Father",
          effect: {
            equipLoadBonus: 5, // 5% equip load bonus
            special: "mask-of-the-father",
          },
        });
      }

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

      // Calculate all derived stats including equipment and ring effects
      const characterStats = calculateAllDerivedStats(
        baseStats,
        [...weapons, ...catalysts, ...talismans], // Include catalysts and talismans as weapons
        shields,
        [], // armor array (empty for now)
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
