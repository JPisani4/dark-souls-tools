import { computed } from "vue";
import type { GameData } from "~/types/game";

export interface CoopLevelState {
  characterLevel: string;
  multiplayerItem: string;
  usePassword: boolean;
  selectedItem: any;
  selectedUpgradePath: string;
  selectedLevel: string;
}

export interface CoopLevelResult {
  item: string;
  minLevel: number;
  maxLevel: number;
  weaponMatchLevel: number | null;
  weaponLevelRange: [number, number] | null;
  bypass: boolean;
}

export function useCoopLevelCalculator(gameData: GameData) {
  // Get available levels for an upgrade path
  const getAvailableLevelsForPath = (upgradePath: string): number[] => {
    // This should be implemented in the game data
    const coopData = gameData.coopLevelRanges;
    if (!coopData) return [];

    const config = coopData.getUpgradePathConfig?.(upgradePath);
    if (!config) return [];
    return Array.from({ length: config.maxLevel + 1 }, (_, i) => i);
  };

  // Get display name for upgrade path
  const getUpgradePathDisplayName = (path: string): string => {
    const coopData = gameData.coopLevelRanges;
    if (!coopData) return path.charAt(0).toUpperCase() + path.slice(1);

    const config = coopData.getUpgradePathConfig?.(path);
    return config?.displayName || path.charAt(0).toUpperCase() + path.slice(1);
  };

  // Calculate results based on state
  const calculateResults = (state: CoopLevelState): CoopLevelResult[] => {
    const coopData = gameData.coopLevelRanges;
    if (!coopData) return [];

    const charLevel = parseInt(state.characterLevel);
    const hasCharacterLevel =
      !isNaN(charLevel) &&
      charLevel >= 1 &&
      charLevel <= gameData.config.mechanics.maxLevel;

    // Determine which items to show (filtered or all)
    const itemsToShow = state.multiplayerItem
      ? coopData.MULTIPLAYER_ITEMS.filter(
          (item) => item.value === state.multiplayerItem
        )
      : coopData.MULTIPLAYER_ITEMS;

    return itemsToShow.map((item) => {
      // Level range - only calculate if we have a character level
      let minLevel = 0;
      let maxLevel = 0;
      if (hasCharacterLevel) {
        [minLevel, maxLevel] = coopData.getLevelRange(item.value, charLevel);
      }

      // Weapon level logic
      let weaponMatchLevel: number | null = null;
      let weaponLevelRange: [number, number] | null = null;

      if (
        state.selectedItem &&
        state.selectedUpgradePath &&
        state.selectedLevel !== ""
      ) {
        weaponMatchLevel = coopData.getWeaponMatchLevel(
          state.selectedUpgradePath,
          parseInt(state.selectedLevel)
        );
        weaponLevelRange =
          weaponMatchLevel !== null
            ? coopData.getWeaponLevelRange(weaponMatchLevel)
            : null;
      }

      // Password logic
      const bypass = coopData.isPasswordBypass(item.value, state.usePassword);

      // Final range intersection (if weapon info and not bypassed)
      let finalWeaponLevelRange: [number, number] | null = weaponLevelRange;
      if (weaponLevelRange && !bypass) {
        finalWeaponLevelRange = weaponLevelRange;
      } else if (bypass) {
        finalWeaponLevelRange = null; // No weapon restriction
      }

      return {
        item: item.label,
        minLevel,
        maxLevel,
        weaponMatchLevel,
        weaponLevelRange: finalWeaponLevelRange,
        bypass,
      };
    });
  };

  // Get multiplayer items for dropdown
  const getMultiplayerItemOptions = () => {
    const coopData = gameData.coopLevelRanges;
    if (!coopData) return [];

    return coopData.MULTIPLAYER_ITEMS.map((item) => ({
      value: item.value,
      label: item.label,
    }));
  };

  // Get quick reference data
  const getQuickReference = () => {
    const coopData = gameData.coopLevelRanges;
    if (!coopData) return [];

    return coopData.MULTIPLAYER_ITEMS.map((item) => {
      let superscriptType: number | null = null;

      // Determine superscript type based on item
      if (item.value === "white-sign-soapstone") {
        superscriptType = 1;
      } else if (item.value === "red-sign-soapstone") {
        superscriptType = 12; // Both 1 and 2
      } else if (
        [
          "eye-of-death",
          "dragon-eye",
          "red-eye-orb",
          "cracked-red-eye-orb",
        ].includes(item.value)
      ) {
        superscriptType = 2;
      }

      return {
        title: item.label,
        description: item.description,
        showAsterisk: item.showAsterisk || false,
        superscriptType,
      };
    });
  };

  return {
    getAvailableLevelsForPath,
    getUpgradePathDisplayName,
    calculateResults,
    getMultiplayerItemOptions,
    getQuickReference,
  };
}
