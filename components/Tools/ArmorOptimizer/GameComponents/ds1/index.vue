<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useBaseTool } from "~/composables/useBaseTool";
import { useToolLayout } from "~/composables/useToolLayout";
import { useSafeTheme } from "~/composables/useSafeTheme";
import { useArmorOptimizerCalculations } from "~/composables/useArmorOptimizerCalculations";
import { useArmorDisplayTheme } from "~/composables/useArmorDisplayTheme";
import ArmorIndividualDisplay from "../Common/ArmorIndividualDisplay.vue";
import ArmorSetsDisplay from "../Common/ArmorSetsDisplay.vue";
import Icon from "~/components/Common/Icon.vue";
import SelectField from "~/components/Tools/Common/forms/SelectField.vue";
import HowToUse from "~/components/Tools/Common/HowToUse.vue";
import { getRandomTheme } from "~/utils/themes/colorSystem";
import { getArmorByName, getAllArmor } from "~/utils/games/ds1/armor";
import { DODGE_ROLLS } from "~/utils/games/ds1/stats/characterStats";
import {
  getFullMixMatchCombinationCount,
  getRestrictedMixMatchCombinationCount,
} from "~/composables/useArmorOptimizerCalculations";
import ArmorCompareCard from "../Common/ArmorCompareCard.vue";
import ArmorComparisonModal from "../Common/ArmorComparisonModal.vue";
import EquipmentConfiguration from "../Common/EquipmentConfiguration.vue";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { ref as vueRef } from "vue";

interface Props {
  gameData: GameData;
  toolConfig?: Tool;
  theme?: ColorTheme;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

// Tool layout setup
useToolLayout({
  title:
    props.toolConfig?.config?.seo?.title ||
    props.toolConfig?.title ||
    "Armor Optimizer",
  description:
    props.toolConfig?.config?.seo?.description ||
    props.toolConfig?.description ||
    "Optimize your armor selection based on endurance level and equipment",
  iconPath: props.toolConfig?.icon || "i-heroicons-shield-check",
  tool: props.toolConfig,
  gameId: "ds1",
  gameData: props.gameData,
});

// Tool state interface
interface ArmorOptimizerState {
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
  selectedArmorForComparison: string[];
  expandedSlots: string[];
  expandedCategories: Record<string, string[]>;
  currentPages: Record<string, number>;
  calculatedArmor?: any[];
  // Pagination settings
  itemsPerPage: number;
  paginationEnabled: boolean;
  // Armor expansion state
  expandedArmor: string[];
  // Armor sets state
  expandedArmorSets: string[];
  selectedArmorSetsForComparison: string[];
  expandedSetCategories: string[];
  maxDodgeRollPercent: number | null;
  // Custom filter state
  customFilter: {
    selectedStats: string[];
    minValues: Record<string, number>;
    weights: Record<string, number>;
  };
  // UI state
  showCustomFilter: boolean;
  // Armor lock state
  lockedArmor: {
    head: string | null;
    chest: string | null;
    hands: string | null;
    legs: string | null;
  };
  expandedSetPieces: Record<string, boolean>;
  expandedMixMatch: string[];
  expandedMixMatchPieces: string[];
}

// Tool result interface
interface ArmorOptimizerResult {
  calculatedArmor: any[];
  armorSets: any[];
  mixMatchResults: any[];
  characterStats: any;
  timestamp: Date;
}

const initialState: ArmorOptimizerState = {
  endurance: "",
  selectedEquipment: {
    weapons: [],
    shields: [],
    catalysts: [],
    talismans: [],
  },
  selectedRings: [],
  armorUpgradeLevel: "0",
  displayMode: "individual",
  sortPrimary: "poise",
  sortSecondary: "none",
  sortDescending: true,
  searchQuery: "",
  selectedArmorForComparison: [],
  expandedSlots: [],
  expandedCategories: {},
  currentPages: {},
  itemsPerPage: 5,
  paginationEnabled: true,
  expandedArmor: [],
  // Armor sets state
  expandedArmorSets: [],
  selectedArmorSetsForComparison: [],
  expandedSetCategories: [],
  maxDodgeRollPercent: null,
  // Custom filter state
  customFilter: {
    selectedStats: [],
    minValues: {
      poise: 0,
      weight: 0,
      totalDefense: 0,
      regularDefense: 0,
      strikeDefense: 0,
      slashDefense: 0,
      thrustDefense: 0,
      physical: 0,
      physicalDefense: 0,
      magicDefense: 0,
      fireDefense: 0,
      lightningDefense: 0,
      bleedResistance: 0,
      poisonResistance: 0,
      curseResistance: 0,
      status: 0,
      statusResistance: 0,
    },
    weights: {
      poise: 1,
      weight: 1,
      totalDefense: 1,
      regularDefense: 1,
      strikeDefense: 1,
      slashDefense: 1,
      thrustDefense: 1,
      physical: 1,
      physicalDefense: 1,
      magicDefense: 1,
      fireDefense: 1,
      lightningDefense: 1,
      bleedResistance: 1,
      poisonResistance: 1,
      curseResistance: 1,
      status: 1,
      statusResistance: 1,
    },
  },
  // UI state
  showCustomFilter: false,
  // Armor lock state
  lockedArmor: {
    head: null,
    chest: null,
    hands: null,
    legs: null,
  },
  expandedSetPieces: {},
  expandedMixMatch: [],
  expandedMixMatchPieces: [],
};

// Generate random theme for the tool
const selectedTheme = getRandomTheme();

// Use base tool composable
const {
  state,
  setState,
  reset,
  error,
  setError,
  clearError,
  result,
  calculate,
} = useBaseTool<ArmorOptimizerState, ArmorOptimizerResult>(
  {
    initialState,
    autoSave: true,
    autoSaveKey: "armor-optimizer-ds1",
    debounceMs: 100,
  },
  async (state) => {
    try {
      const armorCalcs = useArmorOptimizerCalculations();
      const {
        calculateResults,
        calculateMixMatchArmor,
        calculateArmorWithUpgrades,
      } = armorCalcs;
      // Run the normal calculation
      let res = await calculateResults(state);
      // Apply custom filter logic in all modes if active
      const selectedStats = state.customFilter.selectedStats.length
        ? state.customFilter.selectedStats
        : [];
      // Update custom filter logic to use weighted sum for scoring
      if (selectedStats.length > 0) {
        // Get all armor and upgrade them
        const allArmor = getAllArmor();
        const upgradeLevel = parseInt(state.armorUpgradeLevel) || 0;
        const calculatedArmor = calculateArmorWithUpgrades(
          allArmor,
          upgradeLevel
        );
        // Use the correct result array for the current mode
        let arr = [];
        if (state.displayMode === "mixmatch") {
          arr = calculateMixMatchArmor(
            calculatedArmor,
            res.characterStats,
            state
          );
        } else if (state.displayMode === "sets") {
          arr = res.armorSets;
        } else {
          arr = res.calculatedArmor;
        }

        // Apply custom filter logic based on display mode
        if (state.displayMode === "mixmatch") {
          // For mixmatch mode: filter by min values (existing behavior)
          let filtered = arr;
          if (selectedStats.length > 0) {
            filtered = arr.filter((item) =>
              selectedStats.every(
                (stat) =>
                  getComboStatValue(item, stat) >=
                  (state.customFilter.minValues[
                    stat as keyof typeof state.customFilter.minValues
                  ] || 0)
              )
            );
            // Always set _customScore for all items when custom filter is active
            filtered = filtered.map((item) => {
              let score = 0;
              selectedStats.forEach((stat) => {
                const w = state.customFilter.weights[stat] || 1;
                const v = getComboStatValue(item, stat);
                score += w * v;
              });
              return { ...item, _customScore: score };
            });
            // Debug: log name, _customScore, and stat values if primary sort is 'custom'
            if (state.sortPrimary === "custom") {
              console.log(
                "Custom Sort Debug:",
                filtered.map((item) => ({
                  name: item.name || item.id,
                  _customScore: item._customScore,
                  ...Object.fromEntries(
                    selectedStats.map((stat) => [
                      stat,
                      getComboStatValue(item, stat),
                    ])
                  ),
                }))
              );
              // Sort by weighted sum if primary sort is 'custom'
              filtered = filtered.sort(
                (a, b) => b._customScore - a._customScore
              );
              // Reverse if sortDescending is false
              if (!state.sortDescending) {
                filtered = filtered.slice().reverse();
              }
              // Debug: log the sorted array
              console.log(
                "Sorted Array Debug:",
                filtered.map((item) => ({
                  name: item.name || item.id,
                  _customScore: item._customScore,
                }))
              );
            }
          }
          res.mixMatchResults = filtered;
        } else {
          // For individual pieces and complete sets: use custom filter for sorting only (no filtering)
          let processed = arr;
          if (selectedStats.length > 0) {
            // Calculate custom scores for all items (no filtering)
            processed = arr.map((item) => {
              let score = 0;
              selectedStats.forEach((stat) => {
                const w = state.customFilter.weights[stat] || 1;
                const v = getComboStatValue(item, stat);
                score += w * v;
              });
              return { ...item, _customScore: score };
            });

            // Sort by custom score if primary sort is 'custom'
            if (state.sortPrimary === "custom") {
              processed = processed.sort(
                (a, b) => b._customScore - a._customScore
              );
              // Reverse if sortDescending is false
              if (!state.sortDescending) {
                processed = processed.slice().reverse();
              }
            }
          }

          // Replace the result array for the current mode
          if (state.displayMode === "sets") {
            res.armorSets = processed;
          } else {
            res.calculatedArmor = processed;
          }
        }
      }
      return res;
    } catch (err) {
      setError(err as Error);
      return {
        calculatedArmor: [],
        armorSets: [],
        mixMatchResults: [],
        characterStats: {},
        timestamp: new Date(),
      };
    }
  }
);

// Watch for result changes and update state
watch(
  result,
  (newResult) => {
    if (newResult) {
      if (state.displayMode === "sets") {
        setState({
          calculatedArmor: Array.isArray(newResult.armorSets)
            ? newResult.armorSets
            : [],
        });
      } else if (state.displayMode === "mixmatch") {
        setState({
          calculatedArmor: Array.isArray(newResult.mixMatchResults)
            ? newResult.mixMatchResults
            : [],
        });
      } else if (state.displayMode === "individual") {
        setState({
          calculatedArmor: Array.isArray(newResult.calculatedArmor)
            ? newResult.calculatedArmor
            : [],
        });
      }
    }
  },
  { immediate: true }
);

// Ensure correct data is shown when switching display modes
watch(
  () => state.displayMode,
  (newMode) => {
    if (result.value) {
      if (newMode === "sets") {
        setState({
          calculatedArmor: Array.isArray(result.value.armorSets)
            ? result.value.armorSets
            : [],
        });
      } else if (newMode === "mixmatch") {
        setState({
          calculatedArmor: Array.isArray(result.value.mixMatchResults)
            ? result.value.mixMatchResults
            : [],
        });
      } else if (newMode === "individual") {
        setState({
          calculatedArmor: Array.isArray(result.value.calculatedArmor)
            ? result.value.calculatedArmor
            : [],
        });
      }
    }
  }
);

// Computed property for character stats to ensure they're reactive
const characterStats = computed(() => {
  const stats = result.value?.characterStats || {};
  return stats;
});

// Expose characterStats for parent component access
defineExpose({
  characterStats,
  state,
  setState,
  reset,
});

// Automatically recalculate results when relevant state changes
watch(
  () => [
    state.maxDodgeRollPercent,
    state.displayMode,
    state.endurance,
    state.selectedEquipment,
    state.selectedRings,
    state.armorUpgradeLevel,
    state.customFilter,
    state.searchQuery,
    state.sortPrimary,
    state.sortSecondary,
    state.sortDescending,
    state.lockedArmor, // <-- Added to trigger recalc on armor lock changes
    // Add more if needed
  ],
  () => {
    calculate();
  },
  { deep: true }
);

// Trigger calculation on mount
onMounted(() => {
  calculate();
  // Load selected armor for comparison
  const savedArmor = localStorage.getItem(SELECTED_ARMOR_FOR_COMPARISON_KEY);
  if (savedArmor) {
    try {
      const arr = JSON.parse(savedArmor);
      if (Array.isArray(arr)) {
        persistentSelectedArmorForComparison.value = arr;
        setState({ selectedArmorForComparison: arr });
      }
    } catch {}
  }
  // Load selected armor sets for comparison
  const savedSets = localStorage.getItem(
    SELECTED_ARMOR_SETS_FOR_COMPARISON_KEY
  );
  if (savedSets) {
    try {
      const arr = JSON.parse(savedSets);
      if (Array.isArray(arr)) {
        persistentSelectedArmorSetsForComparison.value = arr;
        setState({ selectedArmorSetsForComparison: arr });
      }
    } catch {}
  }
  // Load selected mixmatch combos for comparison
  const savedMixMatch = localStorage.getItem(SELECTED_MIXMATCH_COMBOS_KEY);
  if (savedMixMatch) {
    try {
      const arr = JSON.parse(savedMixMatch);
      if (Array.isArray(arr)) {
        persistentSelectedMixMatchCombos.value = arr;
      }
    } catch {}
  }
});

// UI state management
const toggleSlotExpansion = (slot: string) => {
  const expanded = [...state.expandedSlots];
  const index = expanded.indexOf(slot);
  if (index > -1) {
    expanded.splice(index, 1);
  } else {
    expanded.push(slot);
  }
  setState({ expandedSlots: expanded });
};

const toggleCategoryExpansion = (slot: string, category: string) => {
  const current = state.expandedCategories[slot] || [];
  const newExpanded = [...current];
  const index = newExpanded.indexOf(category);
  if (index > -1) {
    newExpanded.splice(index, 1);
  } else {
    newExpanded.push(category);
  }
  setState({
    expandedCategories: {
      ...state.expandedCategories,
      [slot]: newExpanded,
    },
  });
};

// Persistent selection state for comparison
const persistentSelectedArmorForComparison = ref<string[]>([]);
const persistentSelectedArmorSetsForComparison = ref<string[]>([]);
const persistentSelectedMixMatchCombos = ref<string[]>([]);

// LocalStorage keys
const SELECTED_ARMOR_FOR_COMPARISON_KEY =
  "armor-optimizer-selectedArmorForComparison";
const SELECTED_ARMOR_SETS_FOR_COMPARISON_KEY =
  "armor-optimizer-selectedArmorSetsForComparison";
const SELECTED_MIXMATCH_COMBOS_KEY = "armor-optimizer-selectedMixMatchCombos";

// Update persistent selection on user action
const toggleArmorComparison = (armorName: string) => {
  const selected = [...persistentSelectedArmorForComparison.value];
  const index = selected.indexOf(armorName);
  if (index > -1) {
    selected.splice(index, 1);
  } else {
    selected.push(armorName);
  }
  persistentSelectedArmorForComparison.value = selected;
  setState({ selectedArmorForComparison: selected });
};
const toggleArmorSetComparison = (armorSetName: string) => {
  const selected = [...persistentSelectedArmorSetsForComparison.value];
  const index = selected.indexOf(armorSetName);
  if (index > -1) {
    selected.splice(index, 1);
  } else {
    selected.push(armorSetName);
  }
  persistentSelectedArmorSetsForComparison.value = selected;
  setState({ selectedArmorSetsForComparison: selected });
};
const toggleMixMatchComboSelection = (id: string) => {
  const selected = [...persistentSelectedMixMatchCombos.value];
  const index = selected.indexOf(id);
  if (index > -1) {
    selected.splice(index, 1);
  } else {
    selected.push(id);
  }
  persistentSelectedMixMatchCombos.value = selected;
};

// Filtered compare pools for current results
const visibleSelectedArmorForComparison = computed(() => {
  const current = (state.calculatedArmor || [])
    .map((item: any) => item.name)
    .filter((name: string) =>
      persistentSelectedArmorForComparison.value.includes(name)
    );
  // Keep state in sync for UI
  setState({ selectedArmorForComparison: current });
  return current;
});
const visibleSelectedArmorSetsForComparison = computed(() => {
  const current = (state.calculatedArmor || [])
    .map((item: any) => item.name)
    .filter((name: string) =>
      persistentSelectedArmorSetsForComparison.value.includes(name)
    );
  setState({ selectedArmorSetsForComparison: current });
  return current;
});
const visibleSelectedMixMatchCombos = computed(() => {
  const current = (paginatedMixMatchResults.value || [])
    .map((item: any) => item.id)
    .filter((id: string) =>
      persistentSelectedMixMatchCombos.value.includes(id)
    );
  return current;
});

// Use visibleSelected... in the compare button/modal and for the count
// In the template, replace selectedArmorForComparison, selectedArmorSetsForComparison, and selectedMixMatchCombos with their visibleSelected... counterparts for display and comparison purposes.

// Armor expansion functions
const toggleArmorExpansion = (armorName: string) => {
  const expanded = [...state.expandedArmor];
  const index = expanded.indexOf(armorName);
  if (index > -1) {
    expanded.splice(index, 1);
  } else {
    expanded.push(armorName);
  }
  setState({ expandedArmor: expanded });
};

// Armor sets expansion functions
const toggleArmorSetExpansion = (armorSetName: string) => {
  const expanded = [...state.expandedArmorSets];
  const index = expanded.indexOf(armorSetName);
  if (index > -1) {
    expanded.splice(index, 1);
  } else {
    expanded.push(armorSetName);
  }
  setState({ expandedArmorSets: expanded });
};

const toggleSetCategoryExpansion = (category: string) => {
  const expanded = [...state.expandedSetCategories];
  const index = expanded.indexOf(category);
  if (index > -1) {
    expanded.splice(index, 1);
  } else {
    expanded.push(category);
  }
  setState({ expandedSetCategories: expanded });
};

// Pagination helper functions
const getPaginationKey = (slot: string, category: string): string => {
  return `${slot}-${category}`;
};

const getTotalItems = (slot: string, category: string): number => {
  const armorBySlot = computed(() => {
    if (!state.calculatedArmor) return {};

    const slots = ["head", "chest", "hands", "legs"];
    const result: Record<string, any[]> = {};

    slots.forEach((slot) => {
      result[slot] = (state.calculatedArmor || []).filter(
        (armor: any) => armor.slot === slot
      );
    });

    return result;
  });

  return (
    (armorBySlot.value[slot] as any[])?.filter(
      (a: any) => a.armorType === category
    )?.length || 0
  );
};

const getTotalPages = (slot: string, category: string): number => {
  if (!state.paginationEnabled) return 1;

  const allArmor = getTotalItems(slot, category);
  return Math.ceil(allArmor / state.itemsPerPage);
};

const getCurrentPage = (slot: string, category: string): number => {
  const paginationKey = getPaginationKey(slot, category);
  return state.currentPages[paginationKey] || 1;
};

const hasNextPage = (slot: string, category: string): boolean => {
  return getCurrentPage(slot, category) < getTotalPages(slot, category);
};

const hasPreviousPage = (slot: string, category: string): boolean => {
  return getCurrentPage(slot, category) > 1;
};

// Pagination navigation functions
const nextPage = (slot: string, category: string) => {
  if (hasNextPage(slot, category)) {
    const paginationKey = getPaginationKey(slot, category);
    setState({
      currentPages: {
        ...state.currentPages,
        [paginationKey]: getCurrentPage(slot, category) + 1,
      },
    });
  }
};

const previousPage = (slot: string, category: string) => {
  if (hasPreviousPage(slot, category)) {
    const paginationKey = getPaginationKey(slot, category);
    setState({
      currentPages: {
        ...state.currentPages,
        [paginationKey]: getCurrentPage(slot, category) - 1,
      },
    });
  }
};

const goToPage = (slot: string, category: string, page: number) => {
  const totalPages = getTotalPages(slot, category);
  if (page >= 1 && page <= totalPages) {
    const paginationKey = getPaginationKey(slot, category);
    setState({
      currentPages: {
        ...state.currentPages,
        [paginationKey]: page,
      },
    });
  }
};

// Armor sets pagination functions
const goToSetPage = (category: string, page: number) => {
  const paginationKey = `sets-${category}`;
  setState({
    currentPages: {
      ...state.currentPages,
      [paginationKey]: page,
    },
  });
};

const nextSetPage = (category: string) => {
  const paginationKey = `sets-${category}`;
  const currentPage = state.currentPages[paginationKey] || 1;
  setState({
    currentPages: {
      ...state.currentPages,
      [paginationKey]: currentPage + 1,
    },
  });
};

const previousSetPage = (category: string) => {
  const paginationKey = `sets-${category}`;
  const currentPage = state.currentPages[paginationKey] || 1;
  if (currentPage > 1) {
    setState({
      currentPages: {
        ...state.currentPages,
        [paginationKey]: currentPage - 1,
      },
    });
  }
};

// Reset pagination when filters change
watch(
  () => [
    state.searchQuery,
    state.sortPrimary,
    state.sortSecondary,
    state.sortDescending,
  ],
  () => {
    // Reset all pagination to page 1 when filters change
    const newCurrentPages: Record<string, number> = {};
    Object.keys(state.currentPages).forEach((key) => {
      newCurrentPages[key] = 1;
    });
    setState({ currentPages: newCurrentPages });
  }
);

// Comparison modal state
const showComparisonModal = ref(false);

const openComparisonModal = () => {
  showComparisonModal.value = true;
};

const closeComparisonModal = () => {
  showComparisonModal.value = false;
};

// Get selected items for comparison based on display mode
const getComparisonItems = () => {
  if (state.displayMode === "individual") {
    return state.selectedArmorForComparison
      .map((name) => getArmorByName(name))
      .filter(Boolean);
  } else if (state.displayMode === "sets") {
    return state.selectedArmorSetsForComparison
      .map((name) =>
        (state.calculatedArmor || []).find((set) => set.name === name)
      )
      .filter(Boolean);
  } else if (state.displayMode === "mixmatch") {
    return visibleSelectedMixMatchCombos.value
      .map((id) => {
        const combo = (state.calculatedArmor || []).find(
          (combo) => combo.id === id
        );
        if (!combo) return null;
        // Patch in totalStaminaRegenReduction for comparison modal
        const totalStaminaRegenReduction = [
          "head",
          "chest",
          "hands",
          "legs",
        ].reduce(
          (sum, slot) =>
            sum + (combo.pieces?.[slot]?.staminaRegenReduction || 0),
          0
        );
        return { ...combo, totalStaminaRegenReduction };
      })
      .filter(Boolean);
  }
  return [];
};

// Display mode options
const displayModeOptions = [
  { label: "Individual Pieces", value: "individual" },
  { label: "Complete Sets", value: "sets" },
  { label: "Mix and Match", value: "mixmatch" },
];

// Sorting options with categories
const sortOptionsWithCategories = [
  {
    label: "General",
    options: [
      { label: "Custom", value: "custom" },
      { label: "Poise", value: "poise" },
      { label: "Weight", value: "weight" },
      { label: "Total Defense", value: "totalDefense" },
    ],
  },
  {
    label: "Physical Defense",
    options: [
      { label: "Total Physical Defense", value: "physical" },
      { label: "Regular Defense", value: "regularDefense" },
      { label: "Strike Defense", value: "strikeDefense" },
      { label: "Slash Defense", value: "slashDefense" },
      { label: "Thrust Defense", value: "thrustDefense" },
    ],
  },
  {
    label: "Elemental Defense",
    options: [
      { label: "Total Elemental Defense", value: "elemental" },
      { label: "Magic Defense", value: "magicDefense" },
      { label: "Fire Defense", value: "fireDefense" },
      { label: "Lightning Defense", value: "lightningDefense" },
    ],
  },
  {
    label: "Status Resistance",
    options: [
      { label: "Total Status Resistance", value: "status" },
      { label: "Bleed Resistance", value: "bleedResistance" },
      { label: "Poison Resistance", value: "poisonResistance" },
      { label: "Curse Resistance", value: "curseResistance" },
    ],
  },
];

// Create categorized options for dropdowns
const createCategorizedOptions = (categories: any[], includeNone = false) => {
  const options: any[] = [];

  if (includeNone) {
    options.push({ label: "None", value: "none" });
  }

  categories.forEach((category) => {
    // Add category header (disabled)
    options.push({
      label: `--- ${category.label} ---`,
      value: `category-${category.label.toLowerCase().replace(/\s+/g, "-")}`,
      disabled: true,
    });

    // Add category options
    category.options.forEach((option: any) => {
      options.push({
        label: option.label,
        value: option.value,
      });
    });
  });

  return options;
};

const sortOptions = createCategorizedOptions(sortOptionsWithCategories);
const secondarySortOptions = createCategorizedOptions(
  sortOptionsWithCategories,
  true
);

// Categorize DODGE_ROLLS for dropdown
const dodgeRollCategories = ["Fast Roll", "Mid Roll", "Fat Roll"];
const categorizedDodgeRollOptions: Array<{
  label: string;
  value: number | string | null;
  disabled?: boolean;
}> = [
  { label: "Show all", value: "all" },
  ...dodgeRollCategories.flatMap((cat) => [
    {
      label: `--- ${cat} ---`,
      value: `category-${cat.replace(/\s+/g, "-").toLowerCase()}`,
      disabled: true,
    },
    ...DODGE_ROLLS.filter((r) => r.name.startsWith(cat)).map((r) => ({
      label: `${r.name.replace(/ \(.+\)/, "")} (≤${r.equipLoadThreshold}%)`,
      value: r.equipLoadThreshold,
    })),
  ]),
];

// Theme
const safeTheme = useSafeTheme(selectedTheme, "default");

// Add mixmatch pagination state
const mixMatchPage = ref(1);
const mixMatchItemsPerPage = 5;

// Watch for changes to mixmatch results and reset page if needed
watch(
  () => [
    state.calculatedArmor,
    state.displayMode,
    state.searchQuery,
    state.sortPrimary,
    state.sortSecondary,
    state.sortDescending,
    state.maxDodgeRollPercent,
  ],
  () => {
    mixMatchPage.value = 1;
  }
);

// Compute sorted and paginated mixmatch results
const sortedMixMatchResults = computed(() => {
  if (state.displayMode !== "mixmatch" || !state.calculatedArmor) return [];
  // Sort all valid combinations by user sort
  return sortArmorSets(
    state.calculatedArmor,
    state.sortPrimary,
    state.sortSecondary,
    state.sortDescending
  );
});

const paginatedMixMatchResults = computed(() => {
  const sorted = sortedMixMatchResults.value;
  const top25 = sorted.slice(0, 25);
  const start = (mixMatchPage.value - 1) * mixMatchItemsPerPage;
  const end = start + mixMatchItemsPerPage;
  return top25.slice(start, end);
});

const mixMatchTotalPages = computed(() => {
  const sorted = sortedMixMatchResults.value;
  return Math.max(
    1,
    Math.ceil(Math.min(sorted.length, 25) / mixMatchItemsPerPage)
  );
});

const goToMixMatchPage = (page: number) => {
  if (page >= 1 && page <= mixMatchTotalPages.value) {
    mixMatchPage.value = page;
  }
};
const nextMixMatchPage = () => {
  if (mixMatchPage.value < mixMatchTotalPages.value) mixMatchPage.value++;
};
const previousMixMatchPage = () => {
  if (mixMatchPage.value > 1) mixMatchPage.value--;
};

// Collapsible state for mixmatch cards
const toggleMixMatchExpansion = (id: string) => {
  const expanded = [...state.expandedMixMatch];
  const idx = expanded.indexOf(id);
  if (idx > -1) {
    expanded.splice(idx, 1);
  } else {
    expanded.push(id);
  }
  setState({ expandedMixMatch: expanded });
};

// Collapsible state for individual pieces in mixmatch
const toggleMixMatchPiecesExpansion = (comboId: string) => {
  const current = Array.isArray(state.expandedMixMatchPieces)
    ? state.expandedMixMatchPieces
    : [];
  const expanded = current.includes(comboId)
    ? current.filter((id) => id !== comboId)
    : [...current, comboId];
  setState({ expandedMixMatchPieces: expanded });
};

// Compute the full search combination count for disclaimer
const fullMixMatchCombinationCount = computed(() => {
  // Use the upgraded armor list for accurate count
  const allArmor = getAllArmor();
  const flattenedArmor = Object.values(allArmor).flat();
  return getFullMixMatchCombinationCount(flattenedArmor, false);
});
// Add restricted (top 3) mixmatch combination count for disclaimer
const restrictedMixMatchCombinationCount = computed(() => {
  const allArmor = getAllArmor();
  const flattenedArmor = Object.values(allArmor).flat();
  return getRestrictedMixMatchCombinationCount(flattenedArmor, 3, false);
});

// Add state for selected mix and match combos
const selectedMixMatchCombos = ref<string[]>([]);

// Helper to calculate ratio for a combo
function calculateComboRatio(
  combo: any,
  primary: string,
  secondary: string
): number {
  if (!combo) return 0;
  let primaryValue = 0;
  let secondaryValue = 0;
  // Calculate primary value
  switch (primary) {
    case "poise":
      primaryValue = combo.totalPoise || 0;
      break;
    case "weight":
      primaryValue = combo.totalWeight || 0;
      break;
    case "totalDefense":
      primaryValue =
        (combo.totalDefense?.normal || 0) +
        (combo.totalDefense?.strike || 0) +
        (combo.totalDefense?.slash || 0) +
        (combo.totalDefense?.thrust || 0);
      break;
    case "regularDefense":
      primaryValue = combo.totalDefense?.normal || 0;
      break;
    case "strikeDefense":
      primaryValue = combo.totalDefense?.strike || 0;
      break;
    case "slashDefense":
      primaryValue = combo.totalDefense?.slash || 0;
      break;
    case "thrustDefense":
      primaryValue = combo.totalDefense?.thrust || 0;
      break;
    case "physical":
      primaryValue =
        (combo.totalDefense?.normal || 0) +
        (combo.totalDefense?.strike || 0) +
        (combo.totalDefense?.slash || 0) +
        (combo.totalDefense?.thrust || 0);
      break;
    case "physicalDefense":
      primaryValue = combo.totalDefense?.normal || 0;
      break;
    case "magicDefense":
      primaryValue = combo.totalDefense?.magic || 0;
      break;
    case "fireDefense":
      primaryValue = combo.totalDefense?.fire || 0;
      break;
    case "lightningDefense":
      primaryValue = combo.totalDefense?.lightning || 0;
      break;
    case "elemental":
      primaryValue =
        (combo.totalDefense?.magic || 0) +
        (combo.totalDefense?.fire || 0) +
        (combo.totalDefense?.lightning || 0);
      break;
    case "elementalDefense":
      primaryValue =
        (combo.totalDefense?.magic || 0) +
        (combo.totalDefense?.fire || 0) +
        (combo.totalDefense?.lightning || 0);
      break;
    case "bleedResistance":
      primaryValue = combo.totalDefense?.bleed || 0;
      break;
    case "poisonResistance":
      primaryValue = combo.totalDefense?.poison || 0;
      break;
    case "curseResistance":
      primaryValue = combo.totalDefense?.curse || 0;
      break;
    case "status":
      primaryValue =
        (combo.totalDefense?.bleed || 0) +
        (combo.totalDefense?.poison || 0) +
        (combo.totalDefense?.curse || 0);
      break;
    case "statusResistance":
      primaryValue =
        (combo.totalDefense?.bleed || 0) +
        (combo.totalDefense?.poison || 0) +
        (combo.totalDefense?.curse || 0);
      break;
    default:
      primaryValue = 0;
  }
  // If no secondary sort, return primary value
  if (!secondary || secondary === "" || secondary === "none") {
    return primaryValue;
  }
  // Calculate secondary value
  switch (secondary) {
    case "poise":
      secondaryValue = combo.totalPoise || 0;
      break;
    case "weight":
      secondaryValue = combo.totalWeight || 0;
      break;
    case "totalDefense":
      secondaryValue =
        (combo.totalDefense?.normal || 0) +
        (combo.totalDefense?.strike || 0) +
        (combo.totalDefense?.slash || 0) +
        (combo.totalDefense?.thrust || 0);
      break;
    case "regularDefense":
      secondaryValue = combo.totalDefense?.normal || 0;
      break;
    case "strikeDefense":
      secondaryValue = combo.totalDefense?.strike || 0;
      break;
    case "slashDefense":
      secondaryValue = combo.totalDefense?.slash || 0;
      break;
    case "thrustDefense":
      secondaryValue = combo.totalDefense?.thrust || 0;
      break;
    case "physical":
      secondaryValue =
        (combo.totalDefense?.normal || 0) +
        (combo.totalDefense?.strike || 0) +
        (combo.totalDefense?.slash || 0) +
        (combo.totalDefense?.thrust || 0);
      break;
    case "physicalDefense":
      secondaryValue = combo.totalDefense?.normal || 0;
      break;
    case "magicDefense":
      secondaryValue = combo.totalDefense?.magic || 0;
      break;
    case "fireDefense":
      secondaryValue = combo.totalDefense?.fire || 0;
      break;
    case "lightningDefense":
      secondaryValue = combo.totalDefense?.lightning || 0;
      break;
    case "elemental":
      secondaryValue =
        (combo.totalDefense?.magic || 0) +
        (combo.totalDefense?.fire || 0) +
        (combo.totalDefense?.lightning || 0);
      break;
    case "elementalDefense":
      secondaryValue =
        (combo.totalDefense?.magic || 0) +
        (combo.totalDefense?.fire || 0) +
        (combo.totalDefense?.lightning || 0);
      break;
    case "bleedResistance":
      secondaryValue = combo.totalDefense?.bleed || 0;
      break;
    case "poisonResistance":
      secondaryValue = combo.totalDefense?.poison || 0;
      break;
    case "curseResistance":
      secondaryValue = combo.totalDefense?.curse || 0;
      break;
    case "status":
      secondaryValue =
        (combo.totalDefense?.bleed || 0) +
        (combo.totalDefense?.poison || 0) +
        (combo.totalDefense?.curse || 0);
      break;
    case "statusResistance":
      secondaryValue =
        (combo.totalDefense?.bleed || 0) +
        (combo.totalDefense?.poison || 0) +
        (combo.totalDefense?.curse || 0);
      break;
    default:
      secondaryValue = 0;
  }
  if (secondaryValue === 0) return primaryValue;
  return primaryValue / secondaryValue;
}

function getSortLabel(sortType: string): string {
  switch (sortType) {
    case "poise":
      return "Poise";
    case "weight":
      return "Weight";
    case "totalDefense":
      return "Total Defense";
    case "regularDefense":
      return "Regular Defense";
    case "strikeDefense":
      return "Strike Defense";
    case "slashDefense":
      return "Slash Defense";
    case "thrustDefense":
      return "Thrust Defense";
    case "physical":
      return "Total Physical Defense";
    case "physicalDefense":
      return "Physical Defense";
    case "magicDefense":
      return "Magic Defense";
    case "fireDefense":
      return "Fire Defense";
    case "lightningDefense":
      return "Lightning Defense";
    case "elemental":
      return "Total Elemental Defense";
    case "elementalDefense":
      return "Elemental Defense";
    case "bleedResistance":
      return "Bleed Resistance";
    case "poisonResistance":
      return "Poison Resistance";
    case "curseResistance":
      return "Curse Resistance";
    case "status":
      return "Total Status Resistance";
    case "statusResistance":
      return "Status Resistance";
    default:
      return sortType;
  }
}

// Debounce helper
function debounce(fn: (...args: any[]) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// Computed property for custom filter stat options (only stat options, no group headers)
const customFilterStatOptionsFlat = computed(() => {
  const options: any[] = [];
  sortOptionsWithCategories.forEach((category) => {
    category.options.forEach((option: any) => {
      options.push({
        label: option.label,
        value: option.value,
      });
    });
  });
  return options;
});

// Helper to get stat value from a combo
function getComboStatValue(combo: any, stat: string): number {
  // Debug: log the structure of the first item to understand the data format
  if (combo && !combo.totalDefense && combo.defense) {
    console.log("Individual piece structure:", combo);
  }

  switch (stat) {
    case "poise":
      return combo.totalPoise || combo.effect?.poise || 0;
    case "weight":
      return combo.totalWeight || combo.weight || 0;
    case "totalDefense":
      return (
        (combo.totalDefense?.normal || combo.defense?.normal || 0) +
        (combo.totalDefense?.strike || combo.defense?.strike || 0) +
        (combo.totalDefense?.slash || combo.defense?.slash || 0) +
        (combo.totalDefense?.thrust || combo.defense?.thrust || 0)
      );
    case "regularDefense":
      return combo.totalDefense?.normal || combo.defense?.normal || 0;
    case "strikeDefense":
      return combo.totalDefense?.strike || combo.defense?.strike || 0;
    case "slashDefense":
      return combo.totalDefense?.slash || combo.defense?.slash || 0;
    case "thrustDefense":
      return combo.totalDefense?.thrust || combo.defense?.thrust || 0;
    case "physical":
      return (
        (combo.totalDefense?.normal || combo.defense?.normal || 0) +
        (combo.totalDefense?.strike || combo.defense?.strike || 0) +
        (combo.totalDefense?.slash || combo.defense?.slash || 0) +
        (combo.totalDefense?.thrust || combo.defense?.thrust || 0)
      );
    case "physicalDefense":
      return combo.totalDefense?.normal || combo.defense?.normal || 0;
    case "magicDefense":
      return combo.totalDefense?.magic || combo.defense?.magic || 0;
    case "fireDefense":
      return combo.totalDefense?.fire || combo.defense?.fire || 0;
    case "lightningDefense":
      return combo.totalDefense?.lightning || combo.defense?.lightning || 0;
    case "bleedResistance":
      return combo.totalDefense?.bleed || combo.defense?.bleed || 0;
    case "poisonResistance":
      return combo.totalDefense?.poison || combo.defense?.poison || 0;
    case "curseResistance":
      return combo.totalDefense?.curse || combo.defense?.curse || 0;
    case "status":
      return (
        (combo.totalDefense?.bleed || combo.defense?.bleed || 0) +
        (combo.totalDefense?.poison || combo.defense?.poison || 0) +
        (combo.totalDefense?.curse || combo.defense?.curse || 0)
      );
    case "statusResistance":
      return (
        (combo.totalDefense?.bleed || combo.defense?.bleed || 0) +
        (combo.totalDefense?.poison || combo.defense?.poison || 0) +
        (combo.totalDefense?.curse || combo.defense?.curse || 0)
      );
    default:
      return 0;
  }
}

// Debounced calculation for custom filter
const debouncedCustomFilterUpdate = debounce(() => {
  calculate();
}, 250);

// Watch for changes in custom filter and recalculate
watch(
  () => [
    ...state.customFilter.selectedStats,
    ...state.customFilter.selectedStats.map(
      (stat) => state.customFilter.minValues[stat]
    ),
    ...state.customFilter.selectedStats.map(
      (stat) => state.customFilter.weights[stat]
    ),
    state.displayMode,
  ],
  () => {
    debouncedCustomFilterUpdate();
  },
  { deep: true }
);

// Helper to flatten stat options for selectedStats
function getFlatStatOptions() {
  // Use the same options as the sort dropdowns
  return sortOptionsWithCategories.flatMap((cat: any) => cat.options);
}

function getStatLabel(stat: string): string {
  const found = getFlatStatOptions().find((opt) => opt.value === stat);
  return found ? found.label : stat;
}

function removeCustomStat(stat: string) {
  state.customFilter.selectedStats = state.customFilter.selectedStats.filter(
    (s) => s !== stat
  );
}

// Reset function for search and filter section only
function resetSearchAndFilter() {
  setState({
    searchQuery: "",
    displayMode: "individual",
    maxDodgeRollPercent: null,
    sortPrimary: "poise",
    sortSecondary: "none",
    sortDescending: true,
  });
  // Reset custom filter with proper structure
  state.customFilter = {
    selectedStats: [],
    minValues: {
      poise: 0,
      weight: 0,
      totalDefense: 0,
      regularDefense: 0,
      strikeDefense: 0,
      slashDefense: 0,
      thrustDefense: 0,
      physical: 0,
      physicalDefense: 0,
      magicDefense: 0,
      fireDefense: 0,
      lightningDefense: 0,
      bleedResistance: 0,
      poisonResistance: 0,
      curseResistance: 0,
      status: 0,
      statusResistance: 0,
    },
    weights: {
      poise: 1,
      weight: 1,
      totalDefense: 1,
      regularDefense: 1,
      strikeDefense: 1,
      slashDefense: 1,
      thrustDefense: 1,
      physical: 1,
      physicalDefense: 1,
      magicDefense: 1,
      fireDefense: 1,
      lightningDefense: 1,
      bleedResistance: 1,
      poisonResistance: 1,
      curseResistance: 1,
      status: 1,
      statusResistance: 1,
    },
  };
}

// How to Use steps for the reusable component
const howToUseSteps = computed(() => [
  {
    type: "step" as const,
    title: "Set your endurance level",
    description:
      "Enter your character's endurance stat to calculate equip load and dodge roll capabilities.",
  },
  {
    type: "step" as const,
    title: "Choose display mode",
    description:
      "Select Individual Pieces, Complete Sets, or Mix and Match to see different armor combinations.",
  },
  {
    type: "step" as const,
    title: "Set sorting criteria",
    description:
      "Choose primary and secondary stats to sort results by your preferred attributes.",
  },
  {
    type: "step" as const,
    title: "Filter and sort results",
    description:
      "Use search, dodge roll filters, or advanced custom filters. In Individual Pieces and Complete Sets modes, custom filters sort all items by your weighted preferences.",
  },
  {
    type: "step" as const,
    title: "Compare selections",
    description:
      "Select multiple items and use the Compare button to see detailed side-by-side stats.",
  },
  {
    type: "step" as const,
    title: "Expand for details",
    description:
      "Click on armor cards to see individual piece stats and detailed breakdowns.",
  },
  {
    type: "tip" as const,
    title: "Use ratio sorting",
    description:
      "Find the best value armor by sorting by defense/weight ratios for optimal protection per weight unit.",
    icon: "i-heroicons-chart-bar",
  },
  {
    type: "tip" as const,
    title: "Custom filter",
    description:
      "Select multiple stats, set minimum values, and assign weights to create custom scoring systems.",
    icon: "i-heroicons-funnel",
  },
  {
    type: "tip" as const,
    title: "Dodge roll filter",
    description:
      "Filter armor by maximum equip load percentage to maintain your preferred dodge roll type.",
    icon: "i-heroicons-shield-check",
  },
  {
    type: "tip" as const,
    title: "Equipment integration",
    description:
      "Include weapons, shields, rings, and other equipment to see their impact on total equip load.",
    icon: "i-heroicons-squares-2x2",
  },
]);

// Get sortArmorSets from the composable instance
const { sortArmorSets } = useArmorOptimizerCalculations();

// Add ref for searchFilterExpanded
const SEARCH_FILTER_LOCAL_STORAGE_KEY = "armor-optimizer-searchfilter-expanded";
const searchFilterExpanded = vueRef(true);

onMounted(() => {
  const saved = localStorage.getItem(SEARCH_FILTER_LOCAL_STORAGE_KEY);
  if (saved !== null) {
    searchFilterExpanded.value = saved === "true";
  }
});

watch(searchFilterExpanded, (val) => {
  localStorage.setItem(SEARCH_FILTER_LOCAL_STORAGE_KEY, val ? "true" : "false");
});

// Handler to toggle individual pieces expansion for a set
function onToggleSetPiecesExpansion(armorSetName: string) {
  setState({
    expandedSetPieces: {
      ...state.expandedSetPieces,
      [armorSetName]: !state.expandedSetPieces[armorSetName],
    },
  });
}

// Expand/Collapse All handlers
function expandAllCollapsibles() {
  if (state.displayMode === "individual") {
    const slots = ["head", "chest", "hands", "legs"];
    const categories = [
      "light-armor",
      "medium-armor",
      "heavy-armor",
      "special-armor",
    ];
    const armor = state.calculatedArmor || [];
    const slotsWithItems = slots.filter((slot) =>
      armor.some((a) => a.slot === slot)
    );
    const expandedCategories: Record<string, string[]> = {};
    slotsWithItems.forEach((slot) => {
      expandedCategories[slot] = categories.filter((cat) =>
        armor.some((a) => a.slot === slot && a.armorType === cat)
      );
    });
    setState({
      expandedSlots: slotsWithItems,
      expandedCategories,
      expandedArmor: armor.map((item: any) => item.name),
    });
  } else if (state.displayMode === "sets") {
    setState({
      expandedArmorSets: (state.calculatedArmor || []).map(
        (set: any) => set.name
      ),
      expandedSetPieces: Object.fromEntries(
        (state.calculatedArmor || []).map((set: any) => [set.name, true])
      ),
    });
  } else if (state.displayMode === "mixmatch") {
    setState({
      expandedMixMatch: (state.calculatedArmor || []).map(
        (combo: any) => combo.id
      ),
      expandedMixMatchPieces: (state.calculatedArmor || []).map(
        (combo: any) => combo.id
      ),
    });
  }
}
function collapseAllCollapsibles() {
  if (state.displayMode === "individual") {
    setState({ expandedSlots: [], expandedCategories: {}, expandedArmor: [] });
  } else if (state.displayMode === "sets") {
    setState({ expandedArmorSets: [], expandedSetPieces: {} });
  } else if (state.displayMode === "mixmatch") {
    setState({ expandedMixMatch: [], expandedMixMatchPieces: [] });
  }
}

// Select/Unselect All handlers
function selectAllResults() {
  if (state.displayMode === "individual") {
    const allNames = (state.calculatedArmor || []).map(
      (item: any) => item.name
    );
    persistentSelectedArmorForComparison.value = allNames;
    setState({ selectedArmorForComparison: allNames });
  } else if (state.displayMode === "sets") {
    const allNames = (state.calculatedArmor || []).map((set: any) => set.name);
    persistentSelectedArmorSetsForComparison.value = allNames;
    setState({ selectedArmorSetsForComparison: allNames });
  } else if (state.displayMode === "mixmatch") {
    const allIds = (state.calculatedArmor || []).map((combo: any) => combo.id);
    persistentSelectedMixMatchCombos.value = allIds;
  }
}
function unselectAllResults() {
  if (state.displayMode === "individual") {
    persistentSelectedArmorForComparison.value = [];
    setState({ selectedArmorForComparison: [] });
  } else if (state.displayMode === "sets") {
    persistentSelectedArmorSetsForComparison.value = [];
    setState({ selectedArmorSetsForComparison: [] });
  } else if (state.displayMode === "mixmatch") {
    persistentSelectedMixMatchCombos.value = [];
  }
}

// Watch and persist changes to localStorage
watch(persistentSelectedArmorForComparison, (val) => {
  localStorage.setItem(SELECTED_ARMOR_FOR_COMPARISON_KEY, JSON.stringify(val));
});
watch(persistentSelectedArmorSetsForComparison, (val) => {
  localStorage.setItem(
    SELECTED_ARMOR_SETS_FOR_COMPARISON_KEY,
    JSON.stringify(val)
  );
});
watch(persistentSelectedMixMatchCombos, (val) => {
  localStorage.setItem(SELECTED_MIXMATCH_COMBOS_KEY, JSON.stringify(val));
});
</script>

<template>
  <!-- Main Content -->
  <div class="space-y-6">
    <!-- Equipment Configuration Section -->
    <EquipmentConfiguration
      :state="state"
      :set-state="setState"
      :theme="selectedTheme"
    />

    <!-- Search and Filter Section -->
    <UCard class="w-full">
      <template #header>
        <div
          class="flex items-center justify-between cursor-pointer select-none"
          @click="searchFilterExpanded = !searchFilterExpanded"
        >
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Search and Filter
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Find and organize armor pieces
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Icon
              :name="
                searchFilterExpanded
                  ? 'i-heroicons-chevron-up'
                  : 'i-heroicons-chevron-down'
              "
              class="w-5 h-5"
            />
            <UButton
              @click.stop="resetSearchAndFilter"
              color="success"
              variant="soft"
              size="sm"
              class="flex items-center gap-1"
            >
              <Icon name="i-heroicons-arrow-path" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </template>

      <div v-show="searchFilterExpanded" class="space-y-4">
        <!-- Search Bar -->
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <UInput
              v-model="state.searchQuery"
              placeholder="Search armor..."
              class="w-full"
            />
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
          <!-- Display Mode -->
          <div>
            <SelectField
              label="Display Mode"
              id="displayMode"
              :model-value="state.displayMode"
              :options="displayModeOptions"
              placeholder="Select display mode"
              :theme="selectedTheme"
              @update:model-value="
                (val: string) => setState({ displayMode: val })
              "
            />
          </div>

          <!-- Dodge Roll Filter Dropdown -->
          <div>
            <SelectField
              label="Max Dodge Roll"
              id="maxDodgeRollPercent"
              :model-value="state.maxDodgeRollPercent?.toString() || 'all'"
              :options="
                categorizedDodgeRollOptions.map((option) => ({
                  ...option,
                  value: option.value?.toString() || '',
                }))
              "
              placeholder="Show all"
              :theme="selectedTheme"
              :disabled="!['sets', 'mixmatch'].includes(state.displayMode)"
              @update:model-value="
                (val: string) =>
                  setState({
                    maxDodgeRollPercent:
                      val && val !== 'all' ? parseFloat(val) : null,
                  })
              "
            />
          </div>
        </div>

        <!-- Advanced Custom Filter Toggle (moved to bottom) -->
        <div class="mb-2 mt-4">
          <UButton
            color="primary"
            size="md"
            class="w-full sm:w-auto font-semibold flex items-center gap-2"
            @click="state.showCustomFilter = !state.showCustomFilter"
          >
            <Icon name="i-heroicons-funnel" class="w-5 h-5" />
            Custom Filter
            <Icon
              :name="
                state.showCustomFilter
                  ? 'i-heroicons-chevron-up'
                  : 'i-heroicons-chevron-down'
              "
              class="w-4 h-4 ml-1"
            />
          </UButton>
        </div>

        <!-- Custom Filter Section (collapsible, collapsed by default) -->
        <div>
          <div
            v-show="state.showCustomFilter"
            class="p-4 rounded bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-4"
          >
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <p v-if="state.displayMode === 'mixmatch'">
                <strong>Mix and Match Mode:</strong> Filters out items below
                minimum values, then sorts by weighted scores.
              </p>
              <p v-else>
                <strong>Individual Pieces & Complete Sets:</strong> Shows all
                items sorted by your custom weighted scores. Set Primary Sort to
                "Custom" to use these weights.
              </p>
            </div>
            <SelectField
              label="Select stats to filter and weight"
              id="customFilterStats"
              :model-value="state.customFilter.selectedStats"
              :options="customFilterStatOptionsFlat"
              placeholder="Select stats..."
              :theme="selectedTheme"
              :multiple="true"
              @update:model-value="
                (val: string | string[]) => {
                  let stats: string[] = [];
                  if (Array.isArray(val)) {
                    stats = val;
                  } else if (typeof val === 'string') {
                    stats = val ? val.split(',').filter((s) => s.trim()) : [];
                  }
                  setState({
                    customFilter: {
                      ...state.customFilter,
                      selectedStats: stats,
                    },
                    sortPrimary: 'custom',
                    sortSecondary: 'none',
                  });
                }
              "
            />
            <div class="space-y-3">
              <div
                v-for="stat in state.customFilter.selectedStats"
                :key="stat"
                class="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                <div class="flex items-center gap-2 min-w-0 flex-1">
                  <span
                    class="text-sm font-medium text-gray-900 dark:text-white truncate"
                  >
                    {{ getStatLabel(stat) }}
                  </span>
                  <UButton
                    size="xs"
                    variant="ghost"
                    color="neutral"
                    class="flex-shrink-0"
                    @click="removeCustomStat(stat)"
                    :aria-label="`Remove ${getStatLabel(stat)}`"
                  >
                    <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
                  </UButton>
                </div>
                <div
                  class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto"
                >
                  <div class="flex flex-col gap-1">
                    <label
                      class="text-xs text-gray-500 dark:text-gray-400"
                      :for="`min-${stat}`"
                      :class="{
                        'opacity-50': state.displayMode !== 'mixmatch',
                      }"
                      >Min
                      {{
                        state.displayMode !== "mixmatch"
                          ? "(Mix & Match only)"
                          : ""
                      }}</label
                    >
                    <UInput
                      v-model.number="state.customFilter.minValues[stat]"
                      type="number"
                      :id="`min-${stat}`"
                      placeholder="Min value"
                      class="w-full sm:w-24"
                      :disabled="state.displayMode !== 'mixmatch'"
                      :aria-label="`Minimum ${getStatLabel(stat)}`"
                    />
                  </div>
                  <div class="flex flex-col gap-1">
                    <label
                      class="text-xs text-gray-500 dark:text-gray-400"
                      :for="`weight-${stat}`"
                      >Weight</label
                    >
                    <UInput
                      v-model.number="state.customFilter.weights[stat]"
                      type="number"
                      :id="`weight-${stat}`"
                      placeholder="Weight"
                      class="w-full sm:w-24"
                      :aria-label="`Weight for ${getStatLabel(stat)}`"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Expand/Collapse All buttons -->
    <div
      v-if="state.calculatedArmor && state.calculatedArmor.length > 0"
      class="flex gap-2 mb-2"
    >
      <UButton
        @click="expandAllCollapsibles"
        size="sm"
        color="primary"
        variant="soft"
        >Expand All</UButton
      >
      <UButton
        @click="collapseAllCollapsibles"
        size="sm"
        color="primary"
        variant="soft"
        >Collapse All</UButton
      >
      <UButton @click="selectAllResults" size="sm" color="info" variant="soft"
        >Select All</UButton
      >
      <UButton @click="unselectAllResults" size="sm" color="info" variant="soft"
        >Unselect All</UButton
      >
    </div>

    <!-- Results Section -->
    <UCard class="w-full">
      <template #header>
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Armor Results
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{
                state.displayMode === "individual"
                  ? "Individual Pieces"
                  : state.displayMode === "sets"
                    ? "Complete Sets"
                    : "Mix and Match"
              }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2 sm:gap-4">
            <!-- Primary Sort -->
            <div class="flex-shrink-0">
              <SelectField
                label="Primary Sort"
                id="sortPrimary"
                :model-value="state.sortPrimary"
                :options="sortOptions"
                placeholder="Select primary sort"
                :theme="selectedTheme"
                size="sm"
                class="w-32 sm:w-48"
                @update:model-value="
                  (val: string) => setState({ sortPrimary: val })
                "
              />
            </div>

            <!-- "to" text -->
            <div class="flex items-end h-8 flex-shrink-0">
              <span class="text-xs text-gray-600 dark:text-gray-400">to</span>
            </div>

            <!-- Secondary Sort -->
            <div class="flex-shrink-0">
              <SelectField
                label="Secondary Sort"
                id="sortSecondary"
                :model-value="state.sortSecondary"
                :options="secondarySortOptions"
                placeholder="Select secondary sort"
                :theme="selectedTheme"
                size="sm"
                class="w-32 sm:w-48"
                @update:model-value="
                  (val: string) => setState({ sortSecondary: val })
                "
              />
            </div>

            <!-- "ratio" text -->
            <div class="flex items-end h-8 flex-shrink-0">
              <span class="text-xs text-gray-600 dark:text-gray-400"
                >ratio</span
              >
            </div>

            <!-- Sort Direction Toggle Button -->
            <div class="flex-shrink-0">
              <label
                class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                &nbsp;
              </label>
              <UButton
                size="sm"
                variant="outline"
                @click="setState({ sortDescending: !state.sortDescending })"
                :aria-label="
                  state.sortDescending ? 'Sort ascending' : 'Sort descending'
                "
              >
                <Icon
                  :name="
                    state.sortDescending
                      ? 'i-heroicons-arrow-down'
                      : 'i-heroicons-arrow-up'
                  "
                  class="w-4 h-4"
                />
              </UButton>
            </div>

            <!-- Compare Button for all display modes -->
            <div class="flex-shrink-0">
              <label
                class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                &nbsp;
              </label>
              <UButton
                v-if="
                  (state.displayMode === 'individual' &&
                    visibleSelectedArmorForComparison.length > 0) ||
                  (state.displayMode === 'sets' &&
                    visibleSelectedArmorSetsForComparison.length > 0) ||
                  (state.displayMode === 'mixmatch' &&
                    visibleSelectedMixMatchCombos.length > 0)
                "
                @click="openComparisonModal"
                color="primary"
                variant="solid"
                size="sm"
              >
                Compare Selected (
                {{
                  state.displayMode === "individual"
                    ? visibleSelectedArmorForComparison.length
                    : state.displayMode === "sets"
                      ? visibleSelectedArmorSetsForComparison.length
                      : visibleSelectedMixMatchCombos.length
                }}
                )
              </UButton>
            </div>
          </div>
        </div>
      </template>

      <!-- Results Display -->
      <div
        v-if="state.calculatedArmor && state.calculatedArmor.length > 0"
        class="space-y-6"
      >
        <!-- Individual Display Mode -->
        <ArmorIndividualDisplay
          v-if="state.displayMode === 'individual'"
          :armor="state.calculatedArmor"
          :expanded-slots="state.expandedSlots"
          :expanded-categories="state.expandedCategories"
          :selected-armor-for-comparison="state.selectedArmorForComparison"
          :current-pages="state.currentPages"
          :items-per-page="state.itemsPerPage"
          :pagination-enabled="state.paginationEnabled"
          :expanded-armor="state.expandedArmor"
          :sort-primary="state.sortPrimary"
          :sort-secondary="state.sortSecondary"
          :sort-descending="state.sortDescending"
          @toggle-slot-expansion="toggleSlotExpansion"
          @toggle-category-expansion="toggleCategoryExpansion"
          @toggle-armor-comparison="toggleArmorComparison"
          @toggle-armor-expansion="toggleArmorExpansion"
          @page-change="goToPage"
          @previous-page="previousPage"
          @next-page="nextPage"
        />

        <!-- Sets Display Mode -->
        <ArmorSetsDisplay
          v-else-if="state.displayMode === 'sets'"
          :armor-sets="state.calculatedArmor"
          :expanded-categories="state.expandedSetCategories"
          :selected-armor-sets-for-comparison="
            state.selectedArmorSetsForComparison
          "
          :current-pages="state.currentPages"
          :items-per-page="state.itemsPerPage"
          :pagination-enabled="state.paginationEnabled"
          :expanded-armor-sets="state.expandedArmorSets"
          :sort-primary="state.sortPrimary"
          :sort-secondary="state.sortSecondary"
          :sort-descending="state.sortDescending"
          :expanded-set-pieces="state.expandedSetPieces"
          :on-toggle-set-pieces-expansion="onToggleSetPiecesExpansion"
          @toggle-category-expansion="toggleSetCategoryExpansion"
          @toggle-armor-set-comparison="toggleArmorSetComparison"
          @toggle-armor-set-expansion="toggleArmorSetExpansion"
          @page-change="goToSetPage"
          @previous-page="previousSetPage"
          @next-page="nextSetPage"
          @toggle-set-pieces-expansion="onToggleSetPiecesExpansion"
        />

        <!-- Mix and Match Display Mode -->
        <div v-else-if="state.displayMode === 'mixmatch'" class="space-y-0">
          <div v-if="paginatedMixMatchResults.length > 0">
            <div
              v-for="combo in paginatedMixMatchResults"
              :key="combo.id"
              class="border rounded-lg p-4 transition-all duration-200 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 mb-4"
            >
              <!-- Card Header -->
              <div
                class="flex items-start justify-between cursor-pointer"
                @click="toggleMixMatchExpansion(combo.id)"
              >
                <div class="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                  <!-- Checkbox for comparison -->
                  <div class="flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      :checked="
                        persistentSelectedMixMatchCombos.includes(combo.id)
                      "
                      @click.stop
                      @change.stop="toggleMixMatchComboSelection(combo.id)"
                      class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                  </div>
                  <!-- Combo Name and Stats -->
                  <div class="flex-1 min-w-0">
                    <div class="flex flex-col gap-2">
                      <h4
                        class="text-lg font-semibold text-gray-900 dark:text-white truncate"
                        :title="
                          ['head', 'chest', 'hands', 'legs']
                            .map((slot) => combo.pieces[slot]?.name || '-')
                            .join(' / ')
                        "
                      >
                        {{
                          ["head", "chest", "hands", "legs"]
                            .map((slot) => {
                              const name = combo.pieces[slot]?.name || "-";
                              return name.length > 12
                                ? name.slice(0, 12) + "…"
                                : name;
                            })
                            .join(" / ")
                        }}
                      </h4>
                      <div class="flex flex-wrap items-center gap-2">
                        <span
                          class="text-sm text-gray-600 dark:text-gray-400 flex-shrink-0"
                        >
                          ({{ combo.slotsFilled }} pieces)
                        </span>
                        <!-- Ratio Badge -->
                        <span
                          v-if="
                            state.sortPrimary &&
                            state.sortSecondary &&
                            state.sortSecondary !== '' &&
                            state.sortSecondary !== 'none'
                          "
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 flex-shrink-0"
                          :title="`${getSortLabel(state.sortPrimary)} / ${getSortLabel(state.sortSecondary)} ratio: ${calculateComboRatio(combo, state.sortPrimary, state.sortSecondary).toFixed(2)}`"
                        >
                          <span class="hidden sm:inline"
                            >{{ getSortLabel(state.sortPrimary) }} /
                            {{ getSortLabel(state.sortSecondary) }}
                            ratio:&nbsp;{{
                              calculateComboRatio(
                                combo,
                                state.sortPrimary,
                                state.sortSecondary
                              ).toFixed(2)
                            }}</span
                          ><span class="sm:hidden"
                            >Ratio:&nbsp;{{
                              calculateComboRatio(
                                combo,
                                state.sortPrimary,
                                state.sortSecondary
                              ).toFixed(2)
                            }}</span
                          >
                        </span>
                      </div>
                      <!-- Key Stats Row -->
                      <div
                        class="flex flex-wrap items-center gap-2 sm:gap-4 text-sm"
                      >
                        <div class="flex items-center gap-1 flex-shrink-0">
                          <span class="text-gray-600 dark:text-gray-400"
                            >Weight:</span
                          ><span
                            class="font-semibold text-lg text-gray-900 dark:text-white"
                            >{{ combo.totalWeight.toFixed(1) }}</span
                          >
                        </div>
                        <div class="flex items-center gap-1 flex-shrink-0">
                          <span class="text-gray-600 dark:text-gray-400"
                            >Poise:</span
                          >
                          <span
                            class="font-semibold text-lg text-blue-600 dark:text-blue-400"
                            >{{ combo.totalPoise.toFixed(1) }}</span
                          >
                        </div>
                        <div
                          class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs"
                        >
                          <div class="flex items-center gap-1 flex-shrink-0">
                            <span class="text-blue-600 dark:text-blue-400"
                              >Regular:</span
                            >
                            <span
                              class="font-semibold text-blue-600 dark:text-blue-400"
                              >{{ combo.totalDefense.normal.toFixed(1) }}</span
                            >
                          </div>
                          <div class="flex items-center gap-1 flex-shrink-0">
                            <span class="text-orange-600 dark:text-orange-400"
                              >Strike:</span
                            >
                            <span
                              class="font-semibold text-orange-600 dark:text-orange-400"
                              >{{ combo.totalDefense.strike.toFixed(1) }}</span
                            >
                          </div>
                          <div class="flex items-center gap-1 flex-shrink-0">
                            <span class="text-red-600 dark:text-red-400"
                              >Slash:</span
                            >
                            <span
                              class="font-semibold text-red-600 dark:text-red-400"
                              >{{ combo.totalDefense.slash.toFixed(1) }}</span
                            >
                          </div>
                          <div class="flex items-center gap-1 flex-shrink-0">
                            <span class="text-purple-600 dark:text-purple-400"
                              >Thrust:</span
                            >
                            <span
                              class="font-semibold text-purple-600 dark:text-purple-400"
                              >{{ combo.totalDefense.thrust.toFixed(1) }}</span
                            >
                          </div>
                        </div>
                        <div
                          class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs"
                        >
                          <div class="flex items-center gap-1 flex-shrink-0">
                            <span class="text-indigo-600 dark:text-indigo-400"
                              >Magic:</span
                            >
                            <span
                              class="font-semibold text-indigo-600 dark:text-indigo-400"
                              >{{ combo.totalDefense.magic.toFixed(1) }}</span
                            >
                          </div>
                          <div class="flex items-center gap-1 flex-shrink-0">
                            <span class="text-yellow-600 dark:text-yellow-400"
                              >Fire:</span
                            >
                            <span
                              class="font-semibold text-yellow-600 dark:text-yellow-400"
                              >{{ combo.totalDefense.fire.toFixed(1) }}</span
                            >
                          </div>
                          <div class="flex items-center gap-1 flex-shrink-0">
                            <span class="text-cyan-600 dark:text-cyan-400"
                              >Lightning:</span
                            >
                            <span
                              class="font-semibold text-cyan-600 dark:text-cyan-400"
                              >{{
                                combo.totalDefense.lightning.toFixed(1)
                              }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Expand/Collapse Icon -->
                <div class="flex-shrink-0">
                  <Icon
                    :name="
                      Array.isArray(state.expandedMixMatch) &&
                      state.expandedMixMatch.includes(combo.id)
                        ? 'i-heroicons-chevron-up'
                        : 'i-heroicons-chevron-down'
                    "
                    class="w-5 h-5 text-gray-500"
                  />
                </div>
              </div>
              <!-- Expanded Content -->
              <div
                v-if="
                  Array.isArray(state.expandedMixMatch) &&
                  state.expandedMixMatch.includes(combo.id)
                "
                class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <!-- Defense Stats Grid -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <!-- Physical Defense -->
                  <div class="space-y-2">
                    <h5
                      class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Physical Defense
                    </h5>
                    <div class="space-y-1 text-xs">
                      <div class="flex justify-between">
                        <span class="text-blue-600 dark:text-blue-400"
                          >Normal:</span
                        ><span
                          class="font-semibold text-blue-600 dark:text-blue-400"
                          >{{ combo.totalDefense.normal.toFixed(1) }}</span
                        >
                      </div>
                      <div class="flex justify-between">
                        <span class="text-orange-600 dark:text-orange-400"
                          >Strike:</span
                        ><span
                          class="font-semibold text-orange-600 dark:text-orange-400"
                          >{{ combo.totalDefense.strike.toFixed(1) }}</span
                        >
                      </div>
                      <div class="flex justify-between">
                        <span class="text-red-600 dark:text-red-400"
                          >Slash:</span
                        ><span
                          class="font-semibold text-red-600 dark:text-red-400"
                          >{{ combo.totalDefense.slash.toFixed(1) }}</span
                        >
                      </div>
                      <div class="flex justify-between">
                        <span class="text-purple-600 dark:text-purple-400"
                          >Thrust:</span
                        ><span
                          class="font-semibold text-purple-600 dark:text-purple-400"
                          >{{ combo.totalDefense.thrust.toFixed(1) }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <!-- Elemental Defense -->
                  <div class="space-y-2">
                    <h5
                      class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Elemental Defense
                    </h5>
                    <div class="space-y-1 text-xs">
                      <div class="flex justify-between">
                        <span class="text-indigo-600 dark:text-indigo-400"
                          >Magic:</span
                        ><span
                          class="font-semibold text-indigo-600 dark:text-indigo-400"
                          >{{ combo.totalDefense.magic.toFixed(1) }}</span
                        >
                      </div>
                      <div class="flex justify-between">
                        <span class="text-yellow-600 dark:text-yellow-400"
                          >Fire:</span
                        ><span
                          class="font-semibold text-yellow-600 dark:text-yellow-400"
                          >{{ combo.totalDefense.fire.toFixed(1) }}</span
                        >
                      </div>
                      <div class="flex justify-between">
                        <span class="text-cyan-600 dark:text-cyan-400"
                          >Lightning:</span
                        ><span
                          class="font-semibold text-cyan-600 dark:text-cyan-400"
                          >{{ combo.totalDefense.lightning.toFixed(1) }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <!-- Status Resistance -->
                  <div class="space-y-2">
                    <h5
                      class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Status Resistance
                    </h5>
                    <div class="space-y-1 text-xs">
                      <div class="flex justify-between">
                        <span class="text-red-500 dark:text-red-400"
                          >Bleed:</span
                        ><span
                          class="font-semibold text-red-500 dark:text-red-400"
                          >{{ combo.totalDefense.bleed.toFixed(1) }}</span
                        >
                      </div>
                      <div class="flex justify-between">
                        <span class="text-green-600 dark:text-green-400"
                          >Poison:</span
                        ><span
                          class="font-semibold text-green-600 dark:text-green-400"
                          >{{ combo.totalDefense.poison.toFixed(1) }}</span
                        >
                      </div>
                      <div class="flex justify-between">
                        <span class="text-purple-500 dark:text-purple-400"
                          >Curse:</span
                        ><span
                          class="font-semibold text-purple-500 dark:text-purple-400"
                          >{{ combo.totalDefense.curse.toFixed(1) }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <!-- Set Summary -->
                  <div class="space-y-2">
                    <h5
                      class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Set Summary
                    </h5>
                    <div class="space-y-1 text-xs">
                      <div class="flex justify-between">
                        <span>Total Weight:</span
                        ><span>{{ combo.totalWeight.toFixed(1) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Total Poise:</span
                        ><span>{{ combo.totalPoise.toFixed(1) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Total Defense:</span
                        ><span>{{
                          (
                            combo.totalDefense.normal +
                            combo.totalDefense.strike +
                            combo.totalDefense.slash +
                            combo.totalDefense.thrust
                          ).toFixed(1)
                        }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Elemental:</span>
                        <span>{{
                          (
                            combo.totalDefense.magic +
                            combo.totalDefense.fire +
                            combo.totalDefense.lightning
                          ).toFixed(1)
                        }}</span>
                      </div>
                      <div
                        v-if="combo.totalStaminaRegenReduction"
                        class="flex justify-between"
                      >
                        <span
                          class="text-xs text-yellow-600 dark:text-yellow-400"
                          >Stamina Regen:</span
                        >
                        <span
                          class="text-xs text-yellow-600 dark:text-yellow-400"
                          >-{{ combo.totalStaminaRegenReduction }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Individual Armor Pieces -->
                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <UButton
                    variant="ghost"
                    size="sm"
                    class="mb-3 w-full justify-between"
                    @click="toggleMixMatchPiecesExpansion(combo.id)"
                  >
                    <span
                      class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Individual Pieces
                    </span>
                    <Icon
                      :name="
                        Array.isArray(state.expandedMixMatchPieces) &&
                        state.expandedMixMatchPieces.includes(combo.id)
                          ? 'i-heroicons-chevron-down'
                          : 'i-heroicons-chevron-right'
                      "
                      class="w-4 h-4"
                    />
                  </UButton>
                  <div
                    v-if="
                      Array.isArray(state.expandedMixMatchPieces) &&
                      state.expandedMixMatchPieces.includes(combo.id)
                    "
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    <div
                      v-for="slot in ['head', 'chest', 'hands', 'legs']"
                      :key="slot"
                      class="p-4 rounded-lg border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                      <!-- Piece Header -->
                      <div class="flex items-center justify-between mb-3">
                        <span
                          class="text-sm font-semibold capitalize text-gray-900 dark:text-white"
                          >{{ slot }}</span
                        >
                        <span
                          v-if="combo.pieces && combo.pieces[slot]"
                          class="text-xs text-gray-500 dark:text-gray-400"
                          >{{ (combo.pieces[slot].weight ?? 0).toFixed(1) }}
                          weight
                        </span>
                      </div>
                      <!-- Piece Name -->
                      <div
                        v-if="combo.pieces && combo.pieces[slot]"
                        class="text-sm font-medium mb-3 text-gray-900 dark:text-white"
                      >
                        {{ combo.pieces[slot].name }}
                      </div>
                      <div v-else class="text-xs text-gray-400 italic">
                        Empty
                      </div>
                      <!-- Piece Stats -->
                      <div
                        v-if="combo.pieces && combo.pieces[slot]"
                        class="space-y-2 text-xs"
                      >
                        <!-- Poise -->
                        <div class="flex justify-between">
                          <span class="text-gray-600 dark:text-gray-400"
                            >Poise:</span
                          ><span
                            class="font-semibold text-blue-600 dark:text-blue-400"
                            >{{
                              (combo.pieces[slot].effect?.poise ?? 0).toFixed(1)
                            }}</span
                          >
                        </div>
                        <!-- Physical Defense -->
                        <div class="space-y-1">
                          <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400"
                              >Regular:</span
                            ><span
                              class="font-semibold text-blue-600 dark:text-blue-400"
                              >{{
                                (
                                  combo.pieces[slot].defense?.normal ?? 0
                                ).toFixed(1)
                              }}</span
                            >
                          </div>
                          <div class="flex justify-between">
                            <span class="text-orange-600 dark:text-orange-400"
                              >Strike:</span
                            ><span
                              class="font-semibold text-orange-600 dark:text-orange-400"
                              >{{
                                (
                                  combo.pieces[slot].defense?.strike ?? 0
                                ).toFixed(1)
                              }}</span
                            >
                          </div>
                          <div class="flex justify-between">
                            <span class="text-red-600 dark:text-red-400"
                              >Slash:</span
                            ><span
                              class="font-semibold text-red-600 dark:text-red-400"
                              >{{
                                (
                                  combo.pieces[slot].defense?.slash ?? 0
                                ).toFixed(1)
                              }}</span
                            >
                          </div>
                          <div class="flex justify-between">
                            <span class="text-purple-600 dark:text-purple-400"
                              >Thrust:</span
                            ><span
                              class="font-semibold text-purple-600 dark:text-purple-400"
                              >{{
                                (
                                  combo.pieces[slot].defense?.thrust ?? 0
                                ).toFixed(1)
                              }}</span
                            >
                          </div>
                        </div>
                        <!-- Elemental Defense -->
                        <div class="space-y-1">
                          <div class="flex justify-between">
                            <span class="text-indigo-600 dark:text-indigo-400"
                              >Magic:</span
                            ><span
                              class="font-semibold text-indigo-600 dark:text-indigo-400"
                              >{{
                                (
                                  combo.pieces[slot].defense?.magic ?? 0
                                ).toFixed(1)
                              }}</span
                            >
                          </div>
                          <div class="flex justify-between">
                            <span class="text-yellow-600 dark:text-yellow-400"
                              >Fire:</span
                            ><span
                              class="font-semibold text-yellow-600 dark:text-yellow-400"
                              >{{
                                (combo.pieces[slot].defense?.fire ?? 0).toFixed(
                                  1
                                )
                              }}</span
                            >
                          </div>
                          <div class="flex justify-between">
                            <span class="text-cyan-600 dark:text-cyan-400"
                              >Lightning:</span
                            ><span
                              class="font-semibold text-cyan-600 dark:text-cyan-400"
                              >{{
                                (
                                  combo.pieces[slot].defense?.lightning ?? 0
                                ).toFixed(1)
                              }}</span
                            >
                          </div>
                        </div>
                        <!-- Status Resistance -->
                        <div class="space-y-1">
                          <div class="flex justify-between">
                            <span class="text-green-600 dark:text-green-400"
                              >Poison:</span
                            ><span
                              class="font-semibold text-green-600 dark:text-green-400"
                              >{{
                                (
                                  combo.pieces[slot].defense?.poison ?? 0
                                ).toFixed(1)
                              }}</span
                            >
                          </div>
                          <div class="flex justify-between">
                            <span class="text-red-500 dark:text-red-400"
                              >Bleed:</span
                            ><span
                              class="font-semibold text-red-500 dark:text-red-400"
                              >{{
                                (
                                  combo.pieces[slot].defense?.bleed ?? 0
                                ).toFixed(1)
                              }}</span
                            >
                          </div>
                          <div class="flex justify-between">
                            <span class="text-purple-500 dark:text-purple-400"
                              >Curse:</span
                            ><span
                              class="font-semibold text-purple-500 dark:text-purple-400"
                              >{{
                                (
                                  combo.pieces[slot].defense?.curse ?? 0
                                ).toFixed(1)
                              }}</span
                            >
                          </div>
                        </div>
                        <div
                          v-if="combo.pieces[slot].staminaRegenReduction"
                          class="flex justify-between text-xs text-yellow-600 dark:text-yellow-400"
                        >
                          <span>Stamina Regen:</span>
                          <span class="font-semibold"
                            >-{{
                              combo.pieces[slot].staminaRegenReduction
                            }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Pagination Controls -->
            <div
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-2 sm:gap-0"
            >
              <div
                class="order-2 sm:order-1 flex justify-center sm:justify-start text-sm text-gray-600 dark:text-gray-400"
              >
                Showing {{ (mixMatchPage - 1) * mixMatchItemsPerPage + 1 }} -
                {{
                  Math.min(
                    mixMatchPage * mixMatchItemsPerPage,
                    state.calculatedArmor.length
                  )
                }}
                of {{ state.calculatedArmor.length }} combinations
              </div>
              <div
                class="order-1 sm:order-2 flex items-center justify-center gap-2"
              >
                <UButton
                  :disabled="mixMatchPage === 1"
                  @click="previousMixMatchPage"
                  variant="ghost"
                  size="sm"
                >
                  <Icon name="i-heroicons-chevron-left" class="w-4 h-4" />
                </UButton>
                <UButton
                  v-for="page in mixMatchTotalPages"
                  :key="page"
                  :variant="mixMatchPage === page ? 'solid' : 'ghost'"
                  size="sm"
                  @click="goToMixMatchPage(page)"
                >
                  {{ page }}
                </UButton>
                <UButton
                  :disabled="mixMatchPage === mixMatchTotalPages"
                  @click="nextMixMatchPage"
                  variant="ghost"
                  size="sm"
                >
                  <Icon name="i-heroicons-chevron-right" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12">
            <Icon
              name="i-heroicons-shield-check"
              class="w-12 h-12 text-gray-400 mx-auto mb-4"
            />
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No valid combinations found
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria, character stats, or dodge roll
              filter.
            </p>
          </div>
        </div>
      </div>
    </UCard>
    <!-- Top 3 Performance Disclaimer: only show for mixmatch mode -->
    <div
      v-if="state.displayMode === 'mixmatch'"
      class="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center"
    >
      <span>
        These results are generated from the top 3 pieces per category per slot
        for your chosen filter.<br />
        A full unrestricted search would require evaluating
        <b>{{ fullMixMatchCombinationCount.toLocaleString() }}</b>
        possible combinations, while this restricted search only considers about
        <b>{{ restrictedMixMatchCombinationCount.toLocaleString() }}</b>
        combinations. This makes the tool much faster while still providing
        accurate (95%+) results.
      </span>
    </div>
  </div>

  <!-- Comparison Modal -->
  <ArmorComparisonModal
    v-model:open="showComparisonModal"
    :items="getComparisonItems()"
    :mode="state.displayMode as 'individual' | 'sets' | 'mixmatch'"
  />

  <!-- How to Use Section -->
  <HowToUse :steps="howToUseSteps" :theme="selectedTheme" class="mt-6" />
</template>
