import {
  reactive,
  computed,
  ref,
  watch,
  onMounted,
  onUnmounted,
  toRefs,
} from "vue";
import type { ToolState } from "~/types/tools/tool";

// Base tool state interface
export interface BaseToolState {
  [key: string]: any;
}

// Base tool result interface
export interface BaseToolResult {
  [key: string]: any;
  timestamp: Date;
}

// Base tool options
export interface BaseToolOptions<TState extends BaseToolState = BaseToolState> {
  initialState: TState;
  validationRules?: Record<keyof TState, (value: any) => string | null>;
  autoSave?: boolean;
  autoSaveKey?: string;
  debounceMs?: number;
  enableAnalytics?: boolean;
  enableErrorBoundary?: boolean;
}

// Base tool return type
export interface BaseToolReturn<
  TState extends BaseToolState,
  TResult extends BaseToolResult,
> {
  // State
  state: TState | import("vue").Reactive<TState>;
  result: import("vue").ComputedRef<TResult | null>;
  loading: import("vue").ComputedRef<boolean>;
  error: import("vue").ComputedRef<Error | null>;

  // Computed
  isValid: boolean;
  hasChanges: boolean;
  isDirty: boolean;

  // Actions
  calculate: () => Promise<void>;
  reset: () => void;
  setState: (updates: Partial<TState>) => void;
  setError: (error: Error | null) => void;
  clearError: () => void;

  // Utilities
  saveToStorage: () => void;
  loadFromStorage: () => void;
  clearStorage: () => void;
}

export function useBaseTool<
  TState extends BaseToolState,
  TResult extends BaseToolResult,
>(
  options: BaseToolOptions<TState>,
  calculationFn: (state: TState) => Promise<TResult>
): BaseToolReturn<TState, TResult> {
  // State
  const state = reactive<TState>({ ...options.initialState });
  const result = ref<TResult | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const originalState = ref<TState>({ ...options.initialState });
  const lastSavedState = ref<string>("");

  // Validation
  const validationErrors = ref<Record<keyof TState, string | null>>({} as any);

  // Computed properties
  const isValid = computed(() => {
    if (!options.validationRules) return true;

    for (const [key, validator] of Object.entries(options.validationRules)) {
      const error = validator((state as any)[key]);
      if (error) {
        validationErrors.value[key as keyof TState] = error;
        return false;
      } else {
        validationErrors.value[key as keyof TState] = null;
      }
    }
    return true;
  });

  const hasChanges = computed(() => {
    return JSON.stringify(state) !== JSON.stringify(originalState.value);
  });

  const isDirty = computed(() => {
    return hasChanges.value || result.value !== null;
  });

  // Actions
  const calculate = async () => {
    if (!isValid.value) {
      error.value = new Error(
        "Please fix validation errors before calculating"
      );
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const stateCopy = { ...state } as TState;
      const calculatedResult = await calculationFn(stateCopy);
      result.value = calculatedResult;

      // Track analytics if enabled
      if (options.enableAnalytics) {
        trackCalculation(stateCopy, calculatedResult);
      }

      // Auto-save if enabled
      if (options.autoSave) {
        saveToStorage();
      }
    } catch (err) {
      error.value =
        err instanceof Error ? err : new Error("Calculation failed");

      // Track error if analytics enabled
      if (options.enableAnalytics) {
        trackError(err);
      }
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    // Reset state to original
    Object.assign(state, originalState.value);

    // Clear results and errors
    result.value = null;
    error.value = null;
    validationErrors.value = {} as any;

    // Clear storage
    if (options.autoSave) {
      clearStorage();
    }
  };

  const setState = (updates: Partial<TState>) => {
    Object.assign(state, updates);
  };

  const setError = (newError: Error | null) => {
    error.value = newError;
  };

  const clearError = () => {
    error.value = null;
  };

  // Storage utilities
  const saveToStorage = () => {
    if (!options.autoSaveKey) return;

    try {
      const data = {
        state: { ...state },
        result: result.value,
        timestamp: new Date().toISOString(),
      };

      const serialized = JSON.stringify(data);
      if (serialized !== lastSavedState.value) {
        localStorage.setItem(options.autoSaveKey, serialized);
        lastSavedState.value = serialized;
      }
    } catch (err) {
      console.warn("Failed to save tool state:", err);
    }
  };

  const loadFromStorage = () => {
    if (!options.autoSaveKey) return;

    try {
      const stored = localStorage.getItem(options.autoSaveKey);
      if (stored) {
        const data = JSON.parse(stored);

        // Only load if data is recent (within 24 hours)
        const timestamp = new Date(data.timestamp);
        const now = new Date();
        const hoursDiff =
          (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          Object.assign(state, data.state);
          result.value = data.result;
          lastSavedState.value = stored;
        } else {
          // Clear old data
          clearStorage();
        }
      }
    } catch (err) {
      console.warn("Failed to load tool state:", err);
      clearStorage();
    }
  };

  const clearStorage = () => {
    if (!options.autoSaveKey) return;

    try {
      localStorage.removeItem(options.autoSaveKey);
      lastSavedState.value = "";
    } catch (err) {
      console.warn("Failed to clear tool state:", err);
    }
  };

  // Analytics tracking
  const trackCalculation = (state: TState, result: TResult) => {
    if (options.enableAnalytics) {
      // Analytics tracking logic here
      // console.log("Tool calculation tracked:", { state, result, timestamp: new Date() });
    }
  };

  const trackError = (error: any) => {
    // Implement error tracking here
    // Removed console.error to prevent browser console logs
  };

  // Auto-save watcher
  let saveTimeout: NodeJS.Timeout | null = null;

  if (options.autoSave && options.debounceMs) {
    watch(
      state,
      () => {
        if (saveTimeout) {
          clearTimeout(saveTimeout);
        }

        saveTimeout = setTimeout(() => {
          saveToStorage();
        }, options.debounceMs);
      },
      { deep: true }
    );
  }

  // Lifecycle hooks
  onMounted(() => {
    // Load from storage on mount
    if (options.autoSave) {
      loadFromStorage();
    }
  });

  onUnmounted(() => {
    // Save on unmount
    if (options.autoSave) {
      saveToStorage();
    }

    // Clear timeout
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
  });

  return {
    // State
    state,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),

    // Computed
    isValid: isValid.value,
    hasChanges: hasChanges.value,
    isDirty: isDirty.value,

    // Actions
    calculate,
    reset,
    setState,
    setError,
    clearError,

    // Utilities
    saveToStorage,
    loadFromStorage,
    clearStorage,
  };
}
