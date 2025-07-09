import { ref, computed, watch } from "vue";

// Stat keys for custom filter
const STAT_KEYS = [
  "poise",
  "weight",
  "totalDefense",
  "regularDefense",
  "strikeDefense",
  "slashDefense",
  "thrustDefense",
  "physical",
  "physicalDefense",
  "magicDefense",
  "fireDefense",
  "lightningDefense",
  "bleedResistance",
  "poisonResistance",
  "curseResistance",
  "status",
  "statusResistance",
];

export function useArmorOptimizerCustomFilter(options: {
  onUpdate: () => void;
  sortOptionsWithCategories: any[];
  displayMode: () => string;
}) {
  // Custom filter state
  const customFilter = ref({
    selectedStats: [],
    minValues: Object.fromEntries(STAT_KEYS.map((k) => [k, 0])),
    weights: Object.fromEntries(STAT_KEYS.map((k) => [k, 1])),
  });

  // Flat stat options for dropdowns
  const customFilterStatOptionsFlat = computed(() => {
    const optionsArr: any[] = [];
    options.sortOptionsWithCategories.forEach((category) => {
      category.options.forEach((option: any) => {
        optionsArr.push({
          label: option.label,
          value: option.value,
        });
      });
    });
    return optionsArr;
  });

  // Helper to flatten stat options for selectedStats
  function getFlatStatOptions() {
    return options.sortOptionsWithCategories.flatMap((cat: any) => cat.options);
  }

  function getStatLabel(stat: string): string {
    const found = getFlatStatOptions().find((opt) => opt.value === stat);
    return found ? found.label : stat;
  }

  function removeCustomStat(stat: string) {
    customFilter.value.selectedStats = customFilter.value.selectedStats.filter(
      (s) => s !== stat
    );
  }

  // Debounce helper
  function debounce(fn: (...args: any[]) => void, delay: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  }

  // Debounced calculation for custom filter
  const debouncedCustomFilterUpdate = debounce(() => {
    options.onUpdate();
  }, 250);

  // Watch for changes in custom filter and recalculate
  watch(
    () => [
      ...customFilter.value.selectedStats,
      ...customFilter.value.selectedStats.map(
        (stat) => customFilter.value.minValues[stat]
      ),
      ...customFilter.value.selectedStats.map(
        (stat) => customFilter.value.weights[stat]
      ),
      options.displayMode(),
    ],
    () => {
      debouncedCustomFilterUpdate();
    },
    { deep: true }
  );

  // Reset function for custom filter
  function resetCustomFilter() {
    customFilter.value = {
      selectedStats: [],
      minValues: Object.fromEntries(STAT_KEYS.map((k) => [k, 0])),
      weights: Object.fromEntries(STAT_KEYS.map((k) => [k, 1])),
    };
  }

  return {
    customFilter,
    customFilterStatOptionsFlat,
    getStatLabel,
    removeCustomStat,
    resetCustomFilter,
  };
}
