import { computed, reactive } from "vue";
import { useBaseTool } from "./useBaseTool";
import { getAllWeapons, getWeaponCategories } from "~/utils/games/ds1/weapons";
import {
  calculateWeaponAttackRating,
  getEffectiveRequirements,
  getMaxLevelForUpgradePath,
  type WeaponRating,
  type CharacterStats,
} from "~/utils/games/ds1/weaponCalculations";
import type { Weapon } from "~/types/game/ds1/weapons";

// Tool state interface
export interface WeaponCalculatorState {
  strength: string;
  dexterity: string;
  intelligence: string;
  faith: string;
  humanity: string;
  weaponLevel: string;
  isTwoHanded: boolean;
  search: string;
  selectedCategory: string;
  selectedUpgradePath: string;
  currentPage: number;
  expandedWeapons: string[];
  expandedCategories: string[];
  sortBy: string;
  sortDescending: boolean;
}

const initialState: WeaponCalculatorState = {
  strength: "16",
  dexterity: "16",
  intelligence: "10",
  faith: "10",
  humanity: "0",
  weaponLevel: "0",
  isTwoHanded: false,
  search: "",
  selectedCategory: "",
  selectedUpgradePath: "",
  currentPage: 1,
  expandedWeapons: [],
  expandedCategories: [],
  sortBy: "totalAttackRating",
  sortDescending: true,
};

// Calculate weapon attack rating using imported function
const calculateWeaponRating = (
  weapon: Weapon,
  state: WeaponCalculatorState
): WeaponRating & { hasUpgradePath: boolean } => {
  // Convert state to CharacterStats format
  const characterStats: CharacterStats = {
    strength: parseInt(state.strength) || 0,
    dexterity: parseInt(state.dexterity) || 0,
    intelligence: parseInt(state.intelligence) || 0,
    faith: parseInt(state.faith) || 0,
    humanity: parseInt(state.humanity) || 0,
    weaponLevel: parseInt(state.weaponLevel) || 0,
    isTwoHanded: state.isTwoHanded,
  };

  // Use the imported calculation function
  const rating = calculateWeaponAttackRating(
    weapon,
    characterStats,
    state.selectedUpgradePath
  );

  return rating;
};

export function useWeaponAttackRatingCalculator() {
  // Use base tool for state management
  const { state, setState, reset, error, setError, clearError } = useBaseTool<
    WeaponCalculatorState,
    { timestamp: Date }
  >(
    {
      initialState,
      autoSave: true,
      autoSaveKey: "weapon-attack-rating-calculator-ds1",
      debounceMs: 300,
    },
    async (state) => {
      return {
        timestamp: new Date(),
        ...state,
      };
    }
  );

  // Get all weapons and categories
  const allWeapons = getAllWeapons();
  const weaponCategories = getWeaponCategories();

  // Load weapons immediately to ensure they're available
  const initialWeapons = allWeapons ? Object.values(allWeapons).flat() : [];

  // Flatten all weapons into a single array
  const weapons = computed(() => {
    return initialWeapons;
  });

  // Get unique upgrade paths
  const upgradePaths = computed(() => {
    if (!initialWeapons.length) return [];

    const paths = new Set<string>();
    initialWeapons.forEach((weapon) => {
      if (weapon.upgradePath) {
        // Handle comma-separated upgrade paths
        const weaponPaths = weapon.upgradePath
          .split(",")
          .map((path) => path.trim());
        weaponPaths.forEach((path) => {
          if (path) {
            paths.add(path);
          }
        });
      }
    });
    return Array.from(paths).sort();
  });

  // Calculate weapons with attack ratings
  const weaponsWithRatings = computed(() => {
    if (!initialWeapons.length) return [];

    return initialWeapons.map((weapon) => {
      const rating = calculateWeaponRating(weapon, state);
      return {
        ...weapon,
        rating,
      };
    });
  });

  // Check if there are weapons with upgrade paths
  const hasWeaponsWithUpgradePaths = computed(() => {
    if (!weaponsWithRatings.value) return false;

    return weaponsWithRatings.value.some(
      (weapon) => weapon.rating.hasUpgradePath
    );
  });

  // Reset form
  const resetForm = () => {
    setState({
      strength: "16",
      dexterity: "16",
      intelligence: "10",
      faith: "10",
      humanity: "0",
      weaponLevel: "0",
      isTwoHanded: false,
      search: "",
      selectedCategory: "",
      selectedUpgradePath: "",
      currentPage: 1,
      expandedWeapons: [],
      expandedCategories: [],
      sortBy: "totalAttackRating",
      sortDescending: true,
    });
  };

  // Reset character stats only
  const resetCharacterStats = () => {
    setState({
      strength: "",
      dexterity: "",
      intelligence: "",
      faith: "",
      humanity: "",
      weaponLevel: "",
      isTwoHanded: false,
    });
  };

  return {
    // State
    state,
    weapons,
    weaponCategories,
    upgradePaths,
    weaponsWithRatings,
    hasWeaponsWithUpgradePaths,

    // Actions
    setState,
    reset,
    resetForm,
    resetCharacterStats,
    error,
    setError,
    clearError,

    // Utility functions
    calculateWeaponAttackRating: (weapon: Weapon) =>
      calculateWeaponRating(weapon, state),
    getEffectiveRequirements: (weapon: Weapon) =>
      getEffectiveRequirements(weapon, state.isTwoHanded),
    getMaxLevelForUpgradePath,
  };
}
