import { reactive, computed, watch } from "vue";
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
  // State
  const state = reactive<WeaponUpgradeFormState>({
    currentLevel: "",
    desiredLevel: "",
    selectedPathId: undefined,
    selectedMerchantId: undefined,
    currentWeaponPathId: undefined,
  });

  // Calculator integration
  const { result, calculate, setState } = useUpgradeCalculator();
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

  // Watchers
  watch(
    [
      () => state.currentLevel,
      () => state.desiredLevel,
      () => state.selectedPathId,
      () => merchantIdString.value,
      () => state.currentWeaponPathId,
    ],
    ([
      currentLevel,
      desiredLevel,
      selectedPathId,
      merchantId,
      currentWeaponPathId,
    ]) => {
      if (
        !selectedPathId ||
        currentLevel === "" ||
        desiredLevel === "" ||
        !currentWeaponPathId
      ) {
        // Don't set result.value directly - let the base tool handle it
        return;
      }
      const current = parseInt(state.currentLevel, 10);
      const desired = parseInt(state.desiredLevel, 10);
      if (isNaN(current) || isNaN(desired)) {
        // Don't set result.value directly - let the base tool handle it
        return;
      }

      // Set the state in the calculator first, then call calculate
      setState({
        currentLevel: current,
        desiredLevel: desired,
        selectedPathId: state.selectedPathId ?? "",
        selectedMerchantId: merchantId,
        currentWeaponPathId: state.currentWeaponPathId ?? "",
      });

      // Now call calculate without parameters
      calculate();
    },
    { immediate: true }
  );

  // Set default values when form initializes
  watch(
    () => upgradePathItems.value,
    (items) => {
      // Set default desired path if none is selected and items are available
      if (!state.selectedPathId && items.length > 0) {
        state.selectedPathId = items[0].value;
      }
    },
    { immediate: true }
  );

  watch(
    () => currentWeaponPathItems.value,
    (items) => {
      // Set default current weapon path if none is selected and items are available
      if (!state.currentWeaponPathId && items.length > 0) {
        state.currentWeaponPathId = items[0].value;
      }
    },
    { immediate: true }
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

  // Reset current weapon path when desired upgrade path changes
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

  // Actions
  const clearForm = () => {
    state.currentLevel = "";
    state.desiredLevel = "";
    state.selectedPathId = undefined;
    state.selectedMerchantId = undefined;
    state.currentWeaponPathId = undefined;
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
