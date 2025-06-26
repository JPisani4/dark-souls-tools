import { reactive, computed, watch, onMounted, ref } from "vue";
import { upgradePathsManifest } from "~/utils/games/ds1/upgradePaths";
import { merchants } from "~/utils/games/ds1/upgradeCosts";
import { useUpgradeCalculator } from "~/composables/useUpgradeCalculator";

export interface WeaponUpgradeFormState {
  currentLevel: string;
  desiredLevel: string;
  selectedPathId: string | undefined;
  selectedMerchantId: string | undefined;
  currentWeaponPathId: string | undefined;
}

export interface SelectOption {
  label: string;
  value: string;
}

export function useWeaponUpgradeForm() {
  // Use the existing upgrade calculator which already has auto-save functionality
  const {
    state: calculatorState,
    result,
    calculate,
    setState,
    reset: resetCalculator,
    loadFromStorage,
  } = useUpgradeCalculator();

  // Local state for form management
  const state = reactive<WeaponUpgradeFormState>({
    currentLevel: "",
    desiredLevel: "",
    selectedPathId: undefined,
    selectedMerchantId: undefined,
    currentWeaponPathId: undefined,
  });

  // Flag to prevent watcher interference during clearing
  const isClearing = ref(false);

  // Load saved state on initialization
  onMounted(() => {
    // Load the saved state from the calculator
    loadFromStorage();

    // Sync form state with loaded calculator state
    if (calculatorState.currentLevel >= 0) {
      state.currentLevel = calculatorState.currentLevel.toString();
    }
    if (calculatorState.desiredLevel > 0) {
      state.desiredLevel = calculatorState.desiredLevel.toString();
    }
    if (calculatorState.selectedPathId) {
      state.selectedPathId = calculatorState.selectedPathId;
    }
    if (calculatorState.selectedMerchantId) {
      state.selectedMerchantId = calculatorState.selectedMerchantId;
    }
    if (calculatorState.currentWeaponPathId) {
      state.currentWeaponPathId = calculatorState.currentWeaponPathId;
    }
  });

  // Results
  const unwrappedResult = computed(() => result.value);

  // Computed properties
  const maxLevelForSelectedPath = computed(() => {
    if (!state.selectedPathId) return 15;
    const selectedPath = upgradePathsManifest.find(
      (path) => path.id === state.selectedPathId
    );
    if (
      !selectedPath ||
      !selectedPath.steps ||
      selectedPath.steps.length === 0
    ) {
      return 15;
    }
    return Math.max(...selectedPath.steps.map((step) => step.to));
  });

  const isAtMaxLevel = computed(() => {
    if (!state.desiredLevel || !state.selectedPathId) return false;
    const desired = parseInt(state.desiredLevel, 10);
    return !isNaN(desired) && desired === maxLevelForSelectedPath.value;
  });

  const merchantIdString = computed(() => state.selectedMerchantId ?? "");

  // Select options
  const upgradePathItems = computed<SelectOption[]>(() => {
    if (!state.currentWeaponPathId) {
      return upgradePathsManifest.map((path) => ({
        label: path.name,
        value: path.id,
      }));
    }

    const validPaths: string[] = [];

    // Always include the current path (can upgrade within same path)
    validPaths.push(state.currentWeaponPathId);

    // Find paths that can be ascended to from the current path
    upgradePathsManifest.forEach((path) => {
      if ("ascendSteps" in path && path.ascendSteps) {
        // Check if any ascension step can ascend from the current path
        const canAscendFromCurrent = path.ascendSteps.some(
          (step) =>
            step.basePath && step.basePath.pathId === state.currentWeaponPathId
        );
        if (canAscendFromCurrent) {
          validPaths.push(path.id);
        }
      }
    });

    return upgradePathsManifest
      .filter((path) => validPaths.includes(path.id))
      .map((path) => ({
        label: path.name,
        value: path.id,
      }));
  });

  const merchantItems = computed<SelectOption[]>(() =>
    merchants.map((merchant) => ({
      label: merchant.name,
      value: merchant.id,
    }))
  );

  const currentWeaponPathItems = computed<SelectOption[]>(() => {
    // If no desired path is selected, show all available paths
    if (!state.selectedPathId) {
      return upgradePathsManifest.map((path) => ({
        label: path.name,
        value: path.id,
      }));
    }

    const validPaths: string[] = [];

    // Always include the selected path (can upgrade within same path)
    validPaths.push(state.selectedPathId);

    // Find paths that can ascend to the selected path
    const selectedPath = upgradePathsManifest.find(
      (path) => path.id === state.selectedPathId
    );
    if (
      selectedPath &&
      "ascendSteps" in selectedPath &&
      selectedPath.ascendSteps
    ) {
      // Add all base paths that can ascend to the selected path
      selectedPath.ascendSteps.forEach((step) => {
        if (step.basePath && step.basePath.pathId) {
          validPaths.push(step.basePath.pathId);
        }
      });
    }

    return upgradePathsManifest
      .filter((path) => validPaths.includes(path.id))
      .map((path) => ({
        label: path.name,
        value: path.id,
      }));
  });

  // Select models with two-way binding
  const upgradePathSelectModel = computed<string | undefined>({
    get() {
      return state.selectedPathId;
    },
    set(val: string | undefined) {
      state.selectedPathId = val;
    },
  });

  const merchantSelectModel = computed<string | undefined>({
    get() {
      return state.selectedMerchantId;
    },
    set(val: string | undefined) {
      state.selectedMerchantId = val;
    },
  });

  const currentWeaponPathSelectModel = computed<string | undefined>({
    get() {
      return state.currentWeaponPathId;
    },
    set(val: string | undefined) {
      state.currentWeaponPathId = val;
    },
  });

  // Validation and auto-correction
  const validateAndCorrectLevel = (level: string, maxLevel: number): string => {
    const parsedValue = parseInt(level, 10);
    if (!isNaN(parsedValue) && parsedValue > maxLevel) {
      return maxLevel.toString();
    }
    return level;
  };

  // Watchers for validation and auto-correction
  watch(
    () => state.selectedPathId,
    (newSelectedPathId) => {
      if (newSelectedPathId && state.currentWeaponPathId) {
        // Check if the current weapon path is still valid for the selected upgrade path
        const validPaths = currentWeaponPathItems.value.map(
          (item) => item.value
        );
        if (!validPaths.includes(state.currentWeaponPathId)) {
          // Reset to the selected path if the current weapon path is no longer valid
          state.currentWeaponPathId = newSelectedPathId;
        }
      }

      // Also validate desired level when path changes
      if (newSelectedPathId && state.desiredLevel) {
        state.desiredLevel = validateAndCorrectLevel(
          state.desiredLevel,
          maxLevelForSelectedPath.value
        );
      }
    }
  );

  watch(
    () => state.desiredLevel,
    (newValue: string) => {
      if (newValue && state.selectedPathId) {
        state.desiredLevel = validateAndCorrectLevel(
          newValue,
          maxLevelForSelectedPath.value
        );
      }
    }
  );

  // Reset selected path when current weapon path changes
  watch(
    () => state.currentWeaponPathId,
    (newCurrentPathId) => {
      if (newCurrentPathId && state.selectedPathId) {
        // Check if the currently selected path is still valid
        const validPaths = upgradePathItems.value.map((item) => item.value);
        if (!validPaths.includes(state.selectedPathId)) {
          // Reset to the current path if the selected path is no longer valid
          state.selectedPathId = newCurrentPathId;
        }
      }
    }
  );

  // Type conversion watchers
  watch(
    () => state.currentLevel,
    (val: string | unknown) => {
      if (typeof val !== "string") {
        state.currentLevel = val ? String(val) : "";
      }
    }
  );

  watch(
    () => state.desiredLevel,
    (val: string | unknown) => {
      if (typeof val !== "string") {
        state.desiredLevel = val ? String(val) : "";
      }
    }
  );

  // Watcher to sync form state with calculator state and trigger calculations
  watch(
    [
      () => state.currentLevel,
      () => state.desiredLevel,
      () => state.selectedPathId,
      () => state.selectedMerchantId,
      () => state.currentWeaponPathId,
    ],
    ([
      currentLevel,
      desiredLevel,
      selectedPathId,
      selectedMerchantId,
      currentWeaponPathId,
    ]) => {
      if (
        !selectedPathId ||
        currentLevel === "" ||
        desiredLevel === "" ||
        !currentWeaponPathId
      ) {
        return;
      }

      const current = parseInt(currentLevel, 10);
      const desired = parseInt(desiredLevel, 10);
      if (isNaN(current) || isNaN(desired)) {
        return;
      }

      // Update the calculator state
      setState({
        currentLevel: current,
        desiredLevel: desired,
        selectedPathId: selectedPathId,
        selectedMerchantId: selectedMerchantId || "",
        currentWeaponPathId: currentWeaponPathId,
      });

      // Trigger calculation
      calculate();
    },
    { immediate: true }
  );

  // Watcher to sync calculator state back to form state (for loaded saved state)
  watch(
    [
      () => calculatorState.currentLevel,
      () => calculatorState.desiredLevel,
      () => calculatorState.selectedPathId,
      () => calculatorState.selectedMerchantId,
      () => calculatorState.currentWeaponPathId,
    ],
    ([
      currentLevel,
      desiredLevel,
      selectedPathId,
      selectedMerchantId,
      currentWeaponPathId,
    ]) => {
      // Skip if we're in the middle of clearing
      if (isClearing.value) return;

      // Only update form state if it's different and not empty
      if (currentLevel >= 0 && state.currentLevel !== currentLevel.toString()) {
        state.currentLevel = currentLevel.toString();
      }
      if (desiredLevel > 0 && state.desiredLevel !== desiredLevel.toString()) {
        state.desiredLevel = desiredLevel.toString();
      }
      if (selectedPathId && state.selectedPathId !== selectedPathId) {
        state.selectedPathId = selectedPathId;
      }
      if (
        selectedMerchantId &&
        state.selectedMerchantId !== selectedMerchantId
      ) {
        state.selectedMerchantId = selectedMerchantId;
      }
      if (
        currentWeaponPathId &&
        state.currentWeaponPathId !== currentWeaponPathId
      ) {
        state.currentWeaponPathId = currentWeaponPathId;
      }
    }
  );

  // Actions
  const clearForm = () => {
    // Set clearing flag to prevent watcher interference
    isClearing.value = true;

    // Reset the calculator state
    resetCalculator();

    // Reset the form state
    state.currentLevel = "";
    state.desiredLevel = "";
    state.selectedPathId = undefined;
    state.selectedMerchantId = undefined;
    state.currentWeaponPathId = undefined;

    // Reset the clearing flag after a short delay to allow the reset to complete
    setTimeout(() => {
      isClearing.value = false;
    }, 100);
  };

  return {
    // State
    state,

    // Results
    unwrappedResult,

    // Computed
    maxLevelForSelectedPath,
    isAtMaxLevel,
    merchantIdString,

    // Select options
    upgradePathItems,
    merchantItems,
    currentWeaponPathItems,

    // Select models
    upgradePathSelectModel,
    merchantSelectModel,
    currentWeaponPathSelectModel,

    // Actions
    clearForm,
  };
}
