import { ref, computed, watch } from "vue";
import { useArmorOptimizerCalculations } from "./useArmorOptimizerCalculations";
import { getAllArmor } from "~/utils/games/ds1/armor";
import { getFullMixMatchCombinationCount } from "./useArmorOptimizerCalculations";

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
  selectedArmorForComparison: string[];
  expandedSlots: string[];
  expandedCategories: Record<string, string[]>;
  currentPages: Record<string, number>;
  calculatedArmor?: any[];
  itemsPerPage: number;
  paginationEnabled: boolean;
  expandedArmor: string[];
  expandedArmorSets: string[];
  selectedArmorSetsForComparison: string[];
  expandedSetCategories: string[];
  maxDodgeRollPercent: number | null;
  // Mixmatch
  mixMatchPage?: number;
  mixMatchItemsPerPage?: number;
  expandedMixMatch?: string[];
  selectedMixMatchCombos?: string[];
}

export interface ArmorOptimizerResult {
  calculatedArmor: any[];
  armorSets: any[];
  mixMatchResults: any[];
  characterStats: any;
  timestamp: Date;
}

export function useArmorOptimizer(options: {
  initialState: ArmorOptimizerState;
  autoSaveKey?: string;
  debounceMs?: number;
}) {
  const state = ref<ArmorOptimizerState>({ ...options.initialState });
  const error = ref<Error | null>(null);
  const result = ref<ArmorOptimizerResult | null>(null);

  // Calculation logic
  const armorCalcs = useArmorOptimizerCalculations();
  const {
    calculateResults,
    calculateMixMatchArmor,
    calculateArmorWithUpgrades,
  } = armorCalcs;

  // Calculation function
  const calculate = async () => {
    try {
      let res = await calculateResults(state.value);
      // Mixmatch mode logic
      if (state.value.displayMode === "mixmatch") {
        // For now, just use the top 25 combos
        const allArmor = getAllArmor();
        const upgradeLevel = parseInt(state.value.armorUpgradeLevel) || 0;
        const calculatedArmor = calculateArmorWithUpgrades(
          allArmor,
          upgradeLevel
        );
        const combos = calculateMixMatchArmor(
          calculatedArmor,
          res.characterStats,
          state.value
        );
        res.calculatedArmor = combos.slice(0, 25);
      }
      result.value = res;
      error.value = null;
    } catch (err) {
      error.value = err as Error;
      result.value = {
        calculatedArmor: [],
        armorSets: [],
        mixMatchResults: [],
        characterStats: {},
        timestamp: new Date(),
      };
    }
  };

  // setState helper
  const setState = (updates: Partial<ArmorOptimizerState>) => {
    state.value = { ...state.value, ...updates };
  };

  // reset helper
  const reset = () => {
    state.value = { ...options.initialState };
    error.value = null;
    result.value = null;
  };

  // Watch for state changes and trigger calculation
  watch(
    () => [
      state.value.endurance,
      state.value.armorUpgradeLevel,
      state.value.displayMode,
      state.value.searchQuery,
      state.value.sortPrimary,
      state.value.sortSecondary,
      state.value.sortDescending,
      state.value.maskOfTheFather,
      state.value.selectedEquipment,
      state.value.selectedRings,
      state.value.maxDodgeRollPercent,
    ],
    () => {
      calculate();
    },
    { deep: true }
  );

  // Expose characterStats as computed
  const characterStats = computed(() => {
    return result.value?.characterStats || {};
  });

  // Expose full mixmatch combination count
  const fullMixMatchCombinationCount = computed(() => {
    const allArmor = getAllArmor();
    const flattenedArmor = Object.values(allArmor).flat();
    return getFullMixMatchCombinationCount(
      flattenedArmor,
      state.value.maskOfTheFather
    );
  });

  return {
    state,
    setState,
    reset,
    error,
    result,
    calculate,
    characterStats,
    fullMixMatchCombinationCount,
  };
}
