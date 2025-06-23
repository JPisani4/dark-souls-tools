import {
  reactive,
  computed,
  ref,
  watch,
  type ComputedRef,
  onUnmounted,
  shallowRef,
} from "vue";
import { useBaseTool } from "./useBaseTool";
import type {
  SoulLevelCalculatorState,
  SoulLevelCalculatorResult,
} from "~/types/soulLevelCalculator";

// Import utilities
import { soulCostCumulative, soulCosts } from "~/utils/games/ds1/soulCosts";
import { parseLevel, isValidLevel } from "~/utils/validation/inputSanitizers";
import {
  safeErrorLog,
  startPerformanceMeasure,
  endPerformanceMeasure,
  debounce,
} from "~/utils/performance";
import {
  ICONS,
  getRandomTheme,
  SOUL_LEVEL_MIN,
  SOUL_LEVEL_MAX,
  SOUL_LEVEL_PAGE_SIZE,
  SOUL_LEVEL_MOBILE_PAGE_SIZE,
  SOUL_LEVEL_TABLET_PAGE_SIZE,
  SOUL_LEVEL_ULTRA_MOBILE_PAGE_SIZE,
  AUTO_SAVE_KEYS,
  DEBOUNCE_DELAYS,
  VALIDATION_MESSAGES,
} from "~/utils/constants";
import type { ColorTheme, ValidationResult } from "~/types/common";

export interface SoulLevelState {
  currentLevel: string;
  desiredLevel: string;
}

export interface SoulLevelResult {
  level: number;
  souls: number;
  timestamp: Date;
}

export interface SoulLevelValidation {
  isValid: boolean;
  error?: string;
}

// Memoized number formatter for performance
const numberFormatter = new Intl.NumberFormat("en-US");

// Cache for parsed values to avoid repeated parsing
const parseCache = new Map<string, number | null>();

/**
 * Composable for soul level calculator functionality
 * Provides state management, validation, and calculations for soul level requirements
 */
export const useSoulLevelCalculator = () => {
  // Initialize state
  const initialState: SoulLevelState = {
    currentLevel: "",
    desiredLevel: "",
  };

  // Validation rules
  const validationRules = {
    currentLevel: (value: string) => {
      const level = parseLevel(value);
      if (!isValidLevel(level)) {
        return VALIDATION_MESSAGES.INVALID_LEVEL(
          SOUL_LEVEL_MIN,
          SOUL_LEVEL_MAX
        );
      }
      return null;
    },
    desiredLevel: (value: string) => {
      const level = parseLevel(value);
      if (!isValidLevel(level)) {
        return VALIDATION_MESSAGES.INVALID_LEVEL(
          SOUL_LEVEL_MIN,
          SOUL_LEVEL_MAX
        );
      }
      return null;
    },
  };

  // Calculation function
  const calculateSoulLevel = async (
    state: SoulLevelState
  ): Promise<SoulLevelResult> => {
    const currentLevel = parseLevel(state.currentLevel);
    const desiredLevel = parseLevel(state.desiredLevel);

    if (!isValidLevel(currentLevel) || !isValidLevel(desiredLevel)) {
      throw new Error("Invalid level values");
    }

    if (currentLevel! >= desiredLevel!) {
      throw new Error(
        VALIDATION_MESSAGES.INVALID_LEVEL_RANGE(currentLevel!, desiredLevel!)
      );
    }

    let totalSouls = 0;

    for (let level = currentLevel!; level < desiredLevel!; level++) {
      const cost = soulCosts[level];
      if (cost === undefined) {
        throw new Error(`Soul cost not found for level ${level}`);
      }
      totalSouls += cost;
    }

    return {
      level: desiredLevel!,
      souls: totalSouls,
      timestamp: new Date(),
    };
  };

  // Use base tool composable
  const baseTool = useBaseTool(
    {
      initialState,
      validationRules,
      autoSave: true,
      autoSaveKey: AUTO_SAVE_KEYS.SOUL_LEVEL_CALCULATOR,
      debounceMs: DEBOUNCE_DELAYS.AUTO_SAVE,
      enableAnalytics: true,
      enableErrorBoundary: true,
    },
    calculateSoulLevel
  );

  // Device detection for responsive design
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isUltraMobile = ref(false);

  // Initialize device detection
  if (process.client) {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      isUltraMobile.value = width < 480;
      isMobile.value = width < 768;
      isTablet.value = width >= 768 && width < 1024;
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
  }

  // Computed properties
  const pageSize = computed(() => {
    if (isUltraMobile.value) return SOUL_LEVEL_ULTRA_MOBILE_PAGE_SIZE;
    if (isMobile.value) return SOUL_LEVEL_MOBILE_PAGE_SIZE;
    if (isTablet.value) return SOUL_LEVEL_TABLET_PAGE_SIZE;
    return SOUL_LEVEL_PAGE_SIZE;
  });

  const currentPage = ref(1);

  // Parse current and desired levels
  const current = computed(() => {
    const level = parseLevel(baseTool.state.currentLevel);
    return level || 0;
  });

  const desired = computed(() => {
    const level = parseLevel(baseTool.state.desiredLevel);
    return level || 0;
  });

  // Calculate total souls cost
  const totalSoulsCost = computed(() => {
    if (!baseTool.result.value) return 0;
    return baseTool.result.value.souls;
  });

  // Generate table rows for display
  const tableRows = computed(() => {
    if (!baseTool.result.value || current.value >= desired.value) return [];

    const rows = [];
    let cumulativeSouls = 0;

    for (let level = current.value; level < desired.value; level++) {
      const cost = soulCosts[level];
      if (cost !== undefined) {
        cumulativeSouls += cost;
        rows.push({
          level: level + 1, // Show the level being reached
          souls: cumulativeSouls,
        });
      }
    }

    return rows;
  });

  // Count of filtered levels
  const filteredLevelsCount = computed(() => {
    if (current.value >= desired.value) return 0;
    return desired.value - current.value;
  });

  // Generate level data for table display
  const generateLevelData = (
    startLevel: number,
    count: number
  ): SoulLevelResult[] => {
    const results: SoulLevelResult[] = [];
    let cumulativeSouls = 0;

    for (let i = 0; i < count && startLevel + i <= SOUL_LEVEL_MAX; i++) {
      const level = startLevel + i;
      const cost = soulCosts[level];

      if (cost !== undefined) {
        cumulativeSouls += cost;
        results.push({
          level,
          souls: cumulativeSouls,
          timestamp: new Date(),
        });
      }
    }

    return results;
  };

  // Pagination
  const totalPages = computed(() => {
    const result = baseTool.result.value;
    if (!result) return 0;
    const totalLevels = result.level - SOUL_LEVEL_MIN;
    return Math.ceil(totalLevels / pageSize.value);
  });

  const paginatedData = computed(() => {
    const result = baseTool.result.value;
    if (!result) return [];

    const startLevel =
      SOUL_LEVEL_MIN + (currentPage.value - 1) * pageSize.value;
    const count = Math.min(pageSize.value, result.level - startLevel);

    return generateLevelData(startLevel, count);
  });

  // Watch for state changes and trigger calculation
  watch(
    [() => baseTool.state.currentLevel, () => baseTool.state.desiredLevel],
    ([currentLevel, desiredLevel]) => {
      // Debug: log watcher firing and input values
      if (typeof window !== "undefined") {
        console.log("[SoulLevelCalculator] Watcher fired:", {
          currentLevel,
          desiredLevel,
        });
      }
      if (currentLevel && desiredLevel) {
        const currentNum = parseLevel(currentLevel);
        const desiredNum = parseLevel(desiredLevel);

        if (
          isValidLevel(currentNum) &&
          isValidLevel(desiredNum) &&
          currentNum! < desiredNum!
        ) {
          if (typeof window !== "undefined") {
            console.log("[SoulLevelCalculator] Triggering calculation", {
              currentNum,
              desiredNum,
            });
          }
          baseTool.calculate().then(() => {
            if (typeof window !== "undefined") {
              console.log(
                "[SoulLevelCalculator] Calculation result:",
                baseTool.result.value
              );
            }
          });
        } else {
          if (typeof window !== "undefined") {
            console.log("[SoulLevelCalculator] Validation failed", {
              currentNum,
              desiredNum,
            });
          }
        }
      }
    },
    { immediate: false }
  );

  // Debug: log errors
  watch(
    () => baseTool.error.value,
    (err) => {
      if (err && typeof window !== "undefined") {
        console.error("[SoulLevelCalculator] Error:", err);
      }
    }
  );

  // Actions
  const setPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
      currentPage.value = newPage;
    }
  };

  const resetForm = () => {
    baseTool.reset();
    currentPage.value = 1;
  };

  const formatNumber = (num: number) => numberFormatter.format(num);

  return {
    // State from base tool
    state: baseTool.state,
    result: baseTool.result,
    loading: baseTool.loading,
    error: baseTool.error,

    // Computed properties
    isValid: baseTool.isValid,
    hasChanges: baseTool.hasChanges,
    isDirty: baseTool.isDirty,
    pageSize,
    currentPage,
    totalPages,
    paginatedData,
    isMobile,
    isTablet,
    isUltraMobile,

    // Additional computed properties for the component
    current,
    desired,
    totalSoulsCost,
    tableRows,
    filteredLevelsCount,

    // Actions from base tool
    calculate: baseTool.calculate,
    reset: baseTool.reset,
    setState: baseTool.setState,
    setError: baseTool.setError,
    clearError: baseTool.clearError,
    saveToStorage: baseTool.saveToStorage,
    loadFromStorage: baseTool.loadFromStorage,
    clearStorage: baseTool.clearStorage,

    // Custom actions
    setPage,
    resetForm,
    formatNumber,
  };
};
