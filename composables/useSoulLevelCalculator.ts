import {
  reactive,
  computed,
  ref,
  watch,
  type ComputedRef,
  onUnmounted,
  shallowRef,
} from "vue";
import { soulCostCumulative, soulCosts } from "~/utils/soulCosts";
import { parseLevel } from "~/utils/inputSanitizers";
import {
  safeErrorLog,
  startPerformanceMeasure,
  endPerformanceMeasure,
  debounce,
} from "~/utils/performance";
import {
  SOUL_LEVEL_MIN,
  SOUL_LEVEL_MAX,
  SOUL_LEVEL_PAGE_SIZE,
  SOUL_LEVEL_MOBILE_PAGE_SIZE,
  SOUL_LEVEL_TABLET_PAGE_SIZE,
  SOUL_LEVEL_ULTRA_MOBILE_PAGE_SIZE,
  getRandomTheme,
} from "~/utils/constants";
import type { ColorTheme, ValidationResult } from "~/types/common";

export interface SoulLevelState {
  currentLevel: string;
  desiredLevel: string;
}

export interface SoulLevelResult {
  level: number;
  souls: number;
}

export interface SoulLevelValidation {
  isValid: boolean;
  error?: string;
}

// Memoized number formatter for performance
const numberFormatter = new Intl.NumberFormat();

// Cache for parsed values to avoid repeated parsing
const parseCache = new Map<string, number | null>();

/**
 * Composable for soul level calculator functionality
 * Provides state management, validation, and calculations for soul level requirements
 */
export const useSoulLevelCalculator = () => {
  // Theme state - memoized to prevent unnecessary re-renders
  const selectedTheme = ref<ColorTheme>(getRandomTheme());

  // Mobile detection with debounced resize handler
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isUltraMobile = ref(false);

  // Initialize mobile detection with cleanup
  let resizeHandler: (() => void) | null = null;

  if (process.client) {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      isUltraMobile.value = width < 480;
      isMobile.value = width < 768;
      isTablet.value = width >= 768 && width < 1024;
    };

    updateDeviceType();
    resizeHandler = debounce(updateDeviceType, 200); // Increased debounce for better performance
    window.addEventListener("resize", resizeHandler);
  }

  // Cleanup resize listener
  onUnmounted(() => {
    if (resizeHandler) {
      window.removeEventListener("resize", resizeHandler);
    }
  });

  // Form state
  const state = reactive<SoulLevelState>({
    currentLevel: "",
    desiredLevel: "",
  });

  // Optimized parsing with caching
  const parseWithCache = (value: string): number | null => {
    if (!value) return null;
    const cacheKey = value.trim();
    if (parseCache.has(cacheKey)) {
      return parseCache.get(cacheKey)!;
    }
    const result = parseLevel(cacheKey);
    parseCache.set(cacheKey, result);
    // Limit cache size to prevent memory leaks
    if (parseCache.size > 100) {
      const firstKey = parseCache.keys().next().value;
      if (firstKey) parseCache.delete(firstKey);
    }
    return result;
  };

  // Parsed values with validation - memoized for performance
  const current = computed(() => parseWithCache(state.currentLevel));
  const desired = computed(() => parseWithCache(state.desiredLevel));

  // Validation logic - ultra-optimized with early returns and memoization
  const validation = computed<SoulLevelValidation>(() => {
    const currentVal = current.value;
    const desiredVal = desired.value;

    if (!currentVal || !desiredVal) {
      return {
        isValid: false,
        error: "Please enter both current and desired levels",
      };
    }

    if (currentVal < SOUL_LEVEL_MIN || currentVal > SOUL_LEVEL_MAX) {
      return {
        isValid: false,
        error: `Current level must be between ${SOUL_LEVEL_MIN} and ${SOUL_LEVEL_MAX}`,
      };
    }

    if (desiredVal < SOUL_LEVEL_MIN || desiredVal > SOUL_LEVEL_MAX) {
      return {
        isValid: false,
        error: `Desired level must be between ${SOUL_LEVEL_MIN} and ${SOUL_LEVEL_MAX}`,
      };
    }

    if (desiredVal <= currentVal) {
      return {
        isValid: false,
        error: "Desired level must be higher than current level",
      };
    }

    return { isValid: true };
  });

  // Total souls calculation - optimized with early returns
  const totalSoulsCost = computed(() => {
    if (!validation.value.isValid) return null;

    const currentVal = current.value;
    const desiredVal = desired.value;

    if (!currentVal || !desiredVal) return null;

    try {
      return soulCostCumulative[desiredVal] - soulCostCumulative[currentVal];
    } catch (error) {
      safeErrorLog(error, "SoulLevelCalculator.totalSoulsCost");
      return null;
    }
  });

  // Pagination state
  const page = ref(1);

  // Dynamic page size based on device - ultra-optimized
  const pageSize = computed(() => {
    if (isUltraMobile.value) return SOUL_LEVEL_ULTRA_MOBILE_PAGE_SIZE;
    if (isMobile.value) return SOUL_LEVEL_MOBILE_PAGE_SIZE;
    if (isTablet.value) return SOUL_LEVEL_TABLET_PAGE_SIZE;
    return SOUL_LEVEL_PAGE_SIZE;
  });

  // Lazy data generation - only create what's needed
  const generateLevelData = (
    startLevel: number,
    count: number
  ): SoulLevelResult[] => {
    const results: SoulLevelResult[] = new Array(count);
    for (let i = 0; i < count; i++) {
      const level = startLevel + i;
      results[i] = {
        level,
        souls: soulCosts[level] || 0,
      };
    }
    return results;
  };

  // All filtered levels - ultra-optimized with lazy evaluation and memoization
  const allFilteredLevels = computed<SoulLevelResult[]>(() => {
    if (!validation.value.isValid) return [];

    const currentVal = current.value;
    const desiredVal = desired.value;

    if (!currentVal || !desiredVal) return [];

    const levelsCount = desiredVal - currentVal;
    if (levelsCount <= 0) return [];

    try {
      return generateLevelData(currentVal + 1, levelsCount);
    } catch (error) {
      safeErrorLog(error, "SoulLevelCalculator.allFilteredLevels");
      return [];
    }
  });

  // Pagination calculations - optimized
  const totalPages = computed(() => {
    const length = allFilteredLevels.value.length;
    const size = pageSize.value;
    return Math.max(1, Math.ceil(length / size));
  });

  // Lazy-loaded table rows - only render current page with performance monitoring
  const tableRows = computed(() => {
    startPerformanceMeasure("table-rows-computation");

    const start = (page.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    const rows = allFilteredLevels.value.slice(start, end);

    endPerformanceMeasure("table-rows-computation");
    return rows;
  });

  // Expose filtered levels count for display
  const filteredLevelsCount = computed(() => allFilteredLevels.value.length);

  // Watchers for pagination reset - optimized
  watch([current, desired], () => {
    page.value = 1;
  });

  watch(totalPages, (newTotal: number) => {
    if (page.value > newTotal) {
      page.value = 1;
    }
  });

  // Actions - optimized without debug logging
  const setPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
      page.value = newPage;
    }
  };

  const resetForm = () => {
    state.currentLevel = "";
    state.desiredLevel = "";
    page.value = 1;
    // Clear parse cache on reset
    parseCache.clear();
  };

  // Utility function for number formatting
  const formatNumber = (num: number) => numberFormatter.format(num);

  return {
    // State
    state,
    selectedTheme,
    isMobile,
    isTablet,
    isUltraMobile,

    // Computed values
    current,
    desired,
    validation,
    totalSoulsCost,
    page,
    totalPages,
    tableRows,
    filteredLevelsCount,
    pageSize,

    // Actions
    setPage,
    resetForm,

    // Utilities
    formatNumber,

    // Constants
    LEVEL_MIN: SOUL_LEVEL_MIN,
    LEVEL_MAX: SOUL_LEVEL_MAX,
    PAGE_SIZE: SOUL_LEVEL_PAGE_SIZE,
  };
};
