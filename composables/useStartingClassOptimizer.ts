import { ref, computed, watch, nextTick } from "vue";
import type { Weapon } from "~/types/game/ds1/weapons";
import type { Shield } from "~/types/game/ds1/shields";
import type { Sorcery } from "~/types/game/ds1/sorceries";
import type { Miracle } from "~/types/game/ds1/miracles";
import type {
  CharacterStats,
  StartingCharacter,
} from "~/types/game/ds1/characters";
import { getAllWeapons, getWeaponByName } from "~/utils/games/ds1/weapons";
import { getAllShields, getShieldByName } from "~/utils/games/ds1/shields";
import { getAllSorceries, getSorceryByName } from "~/utils/games/ds1/sorceries";
import { getAllMiracles, getMiracleByName } from "~/utils/games/ds1/miracles";
import { allCharacters } from "~/utils/games/ds1/characters";
import {
  getNextAttunementSlotLevel,
  getAttunementSlots,
  getAttunementLevelForSlots,
} from "~/utils/games/ds1/stats/attunementSlots";
import { getNextSoftCap, getSoftCaps } from "~/utils/games/ds1/stats/softCaps";
import { useBaseTool } from "./useBaseTool";
import {
  calculateMinimumRequirements,
  validateCharacterStats,
  isTwoHandedModeDisabled,
  isShieldSelectionDisabled as isShieldSelectionDisabledUtil,
  isWeaponSelectionDisabled as isWeaponSelectionDisabledUtil,
  hasRequiredTwoHandedWeapon as hasRequiredTwoHandedWeaponUtil,
  updateStatsFromRequirements as updateStatsFromRequirementsUtil,
  resetStatsToRequirements as resetStatsToRequirementsUtil,
  updateStatsForTwoHandedToggle as updateStatsForTwoHandedToggleUtil,
  resetStatsForRemovedItem as resetStatsForRemovedItemUtil,
  findOptimalStartingClass,
  findAllStartingClasses,
  calculateRequiredAttunementSlots,
  hasSufficientAttunementSlots,
} from "~/utils/games/ds1/stats/startingClassOptimizer";
import {
  DEFAULT_CHARACTER_STATS,
  AUTO_SAVE_KEYS,
  DEBOUNCE_DELAYS,
  VALIDATION_MESSAGES,
  STAT_MIN_VALUE,
  STAT_MAX_VALUE,
  STARTING_LEVEL_MIN,
  STARTING_LEVEL_MAX,
  TWO_HANDED_STRENGTH_MULTIPLIER,
} from "~/utils/constants";

export interface StartingClassOptimizerState {
  selectedItems: {
    weapons: Weapon[];
    shields: Shield[];
    sorceries: Sorcery[];
    miracles: Miracle[];
  };
  characterStats: CharacterStats;
  isTwoHanded: boolean;
  searchQueries: {
    weapons: string;
    shields: string;
    sorceries: string;
    miracles: string;
  };
}

export interface StartingClassResult {
  character: StartingCharacter;
  soulLevelNeeded: number;
  statDifferences: Partial<CharacterStats>;
  timestamp: Date;
}

export interface StartingClassResults {
  results: StartingClassResult[];
  timestamp: Date;
}

export interface ItemOption {
  value: string;
  label: string;
  category: string;
  item: Weapon | Shield | Sorcery | Miracle;
}

export interface StartingClassOptimizerValidation {
  isValid: boolean;
  errors: Record<keyof CharacterStats, { isValid: boolean; error?: string }>;
  warnings: string[];
}

export function useStartingClassOptimizer() {
  // Initialize state
  const initialState: StartingClassOptimizerState = {
    selectedItems: {
      weapons: [],
      shields: [],
      sorceries: [],
      miracles: [],
    },
    characterStats: { ...DEFAULT_CHARACTER_STATS },
    isTwoHanded: false,
    searchQueries: {
      weapons: "",
      shields: "",
      sorceries: "",
      miracles: "",
    },
  };

  // Validation rules
  const validationRules = {
    selectedItems: () => null,
    characterStats: (stats: CharacterStats) => {
      if (
        stats.level < STARTING_LEVEL_MIN ||
        stats.level > STARTING_LEVEL_MAX
      ) {
        return VALIDATION_MESSAGES.INVALID_LEVEL(
          STARTING_LEVEL_MIN,
          STARTING_LEVEL_MAX
        );
      }
      return null;
    },
    isTwoHanded: () => null,
    searchQueries: () => null,
  };

  // Calculation function
  const calculateOptimalStartingClass = async (
    state: StartingClassOptimizerState
  ): Promise<StartingClassResults> => {
    const { selectedItems, characterStats, isTwoHanded } = state;

    // Calculate minimum requirements
    const minimumRequirements = calculateMinimumRequirements(
      selectedItems.weapons,
      selectedItems.shields,
      selectedItems.sorceries,
      selectedItems.miracles,
      isTwoHanded
    );

    // Validate current stats
    const validation = validateCharacterStats(
      characterStats,
      minimumRequirements
    );

    if (!validation.isValid) {
      throw new Error("Character stats do not meet minimum requirements");
    }

    // Find all starting classes ranked by soul level investment
    const allClasses = findAllStartingClasses(
      characterStats,
      minimumRequirements
    );

    // Convert to StartingClassResult format
    const results = allClasses.map((classResult) => ({
      character: classResult.character,
      soulLevelNeeded: classResult.soulLevelNeeded,
      statDifferences: classResult.statDifferences,
      timestamp: new Date(),
    }));

    return {
      results,
      timestamp: new Date(),
    };
  };

  // Use base tool composable
  const baseTool = useBaseTool(
    {
      initialState,
      validationRules,
      autoSave: true,
      autoSaveKey: AUTO_SAVE_KEYS.STARTING_CLASS_OPTIMIZER,
      debounceMs: DEBOUNCE_DELAYS.AUTO_SAVE,
      enableAnalytics: true,
      enableErrorBoundary: true,
    },
    calculateOptimalStartingClass
  );

  // Get all available items
  const allWeapons = getAllWeapons();
  const allShields = getAllShields();
  const allSorceries = getAllSorceries();
  const allMiracles = getAllMiracles();

  // Auto-calculate when state changes
  watch(
    [
      () => baseTool.state.selectedItems,
      () => baseTool.state.characterStats,
      () => baseTool.state.isTwoHanded,
    ],
    async () => {
      // Only calculate if there are items selected or stats have been modified
      const hasSelectedItems =
        baseTool.state.selectedItems.weapons.length > 0 ||
        baseTool.state.selectedItems.shields.length > 0 ||
        baseTool.state.selectedItems.sorceries.length > 0 ||
        baseTool.state.selectedItems.miracles.length > 0;

      const hasModifiedStats = Object.entries(
        baseTool.state.characterStats
      ).some(([key, value]) => {
        if (key === "level") return false; // Skip level as it's not user-editable
        return value > 1; // Default value is 1 for all stats except level
      });

      if (hasSelectedItems || hasModifiedStats) {
        try {
          await baseTool.calculate();
        } catch (error) {
          // Silently handle calculation errors - they'll be shown in the UI
          console.warn("Calculation failed:", error);
        }
      } else {
        // Clear result if no items or modified stats
        baseTool.setState({});
      }
    },
    { deep: true }
  );

  // Computed properties
  const minimumRequirements = computed(() =>
    calculateMinimumRequirements(
      baseTool.state.selectedItems.weapons,
      baseTool.state.selectedItems.shields,
      baseTool.state.selectedItems.sorceries,
      baseTool.state.selectedItems.miracles,
      baseTool.state.isTwoHanded
    )
  );

  const validation = computed(() =>
    validateCharacterStats(
      baseTool.state.characterStats,
      minimumRequirements.value
    )
  );

  const isValid = computed(() => baseTool.isValid && validation.value.isValid);

  const hasChanges = computed(() => baseTool.hasChanges);

  const isTwoHandedDisabled = computed(() => {
    const hasWeapons = baseTool.state.selectedItems.weapons.length > 0;
    const hasShields = baseTool.state.selectedItems.shields.length > 0;
    const weaponCount = baseTool.state.selectedItems.weapons.length;
    const shieldCount = baseTool.state.selectedItems.shields.length;

    // Two-handed mode should be disabled when no weapons or shields are selected
    if (!hasWeapons && !hasShields) return true;

    // Two-handed mode should be disabled when both weapons and shields are selected
    // (can't use both weapons and shields in two-handed mode)
    if (hasWeapons && hasShields) return true;

    // Two-handed mode should be disabled when multiple weapons are selected
    if (weaponCount > 1) return true;

    // Two-handed mode should be disabled when multiple shields are selected
    if (shieldCount > 1) return true;

    // Two-handed mode should be enabled when exactly one weapon OR exactly one shield is selected
    return false;
  });

  const isShieldSelectionDisabled = computed(() => {
    // Shield selection should be disabled when the total number of weapons + shields reaches 2
    const totalWeaponsAndShields =
      baseTool.state.selectedItems.weapons.length +
      baseTool.state.selectedItems.shields.length;

    // If two-handed mode is enabled, only allow one weapon OR one shield, not both
    if (baseTool.state.isTwoHanded) {
      // In two-handed mode, you can only have one weapon OR one shield, not both
      return (
        baseTool.state.selectedItems.weapons.length > 0 ||
        baseTool.state.selectedItems.shields.length > 0
      );
    }

    return totalWeaponsAndShields >= 2;
  });

  const isWeaponSelectionDisabled = computed(() => {
    // Weapon selection should be disabled when the total number of weapons + shields reaches 2
    const totalWeaponsAndShields =
      baseTool.state.selectedItems.weapons.length +
      baseTool.state.selectedItems.shields.length;

    // If two-handed mode is enabled, only allow one weapon OR one shield, not both
    if (baseTool.state.isTwoHanded) {
      // In two-handed mode, you can only have one weapon OR one shield, not both
      return (
        baseTool.state.selectedItems.shields.length > 0 ||
        baseTool.state.selectedItems.weapons.length > 0
      );
    }

    return totalWeaponsAndShields >= 2;
  });

  const hasRequiredTwoHandedWeapon = computed(() =>
    hasRequiredTwoHandedWeaponUtil(
      baseTool.state.selectedItems.weapons,
      baseTool.state.selectedItems.shields,
      baseTool.state.characterStats
    )
  );

  const currentAttunementSlots = computed(() =>
    getAttunementSlots(baseTool.state.characterStats.attunement)
  );

  const totalRequiredAttunementSlots = computed(() =>
    calculateRequiredAttunementSlots(
      baseTool.state.selectedItems.sorceries,
      baseTool.state.selectedItems.miracles
    )
  );

  const attunementWarning = computed(() => {
    const current = currentAttunementSlots.value;
    const required = totalRequiredAttunementSlots.value;

    if (current < required) {
      return VALIDATION_MESSAGES.INSUFFICIENT_ATTUNEMENT(current, required);
    }
    return null;
  });

  // Filtered item options based on search queries
  const weaponOptions = computed(() =>
    createItemOptions(
      Object.values(allWeapons)
        .flat()
        .filter((weapon: Weapon) =>
          weapon.name
            .toLowerCase()
            .includes(baseTool.state.searchQueries.weapons.toLowerCase())
        ),
      "weapon"
    )
  );

  const shieldOptions = computed(() =>
    createItemOptions(
      Object.values(allShields)
        .flat()
        .filter((shield: Shield) =>
          shield.name
            .toLowerCase()
            .includes(baseTool.state.searchQueries.shields.toLowerCase())
        ),
      "shield"
    )
  );

  const sorceryOptions = computed(() =>
    createItemOptions(
      Object.values(allSorceries)
        .flat()
        .filter((sorcery: Sorcery) =>
          sorcery.name
            .toLowerCase()
            .includes(baseTool.state.searchQueries.sorceries.toLowerCase())
        ),
      "sorcery"
    )
  );

  const miracleOptions = computed(() =>
    createItemOptions(
      Object.values(allMiracles)
        .flat()
        .filter((miracle: Miracle) =>
          miracle.name
            .toLowerCase()
            .includes(baseTool.state.searchQueries.miracles.toLowerCase())
        ),
      "miracle"
    )
  );

  // Helper function to create item options
  const createItemOptions = (
    items: (Weapon | Shield | Sorcery | Miracle)[],
    category: string
  ): ItemOption[] => {
    return items.map((item) => {
      // Get the actual category from the item's type property
      let actualCategory = category;

      if ("weaponType" in item) {
        actualCategory = item.weaponType;
      } else if ("shieldType" in item) {
        actualCategory = item.shieldType;
      } else if ("sorceryType" in item) {
        actualCategory = item.sorceryType;
      } else if ("miracleType" in item) {
        actualCategory = item.miracleType;
      }

      return {
        value: item.name,
        label: item.name,
        category: actualCategory,
        item,
      };
    });
  };

  // Item management actions
  const addWeapon = (weaponName: string) => {
    const weapon = getWeaponByName(weaponName);
    if (weapon && baseTool.state.selectedItems.weapons.length < 2) {
      baseTool.setState({
        selectedItems: {
          ...baseTool.state.selectedItems,
          weapons: [...baseTool.state.selectedItems.weapons, weapon],
        },
      });

      // Auto-update stats from requirements after adding weapon
      nextTick(() => {
        updateStatsFromRequirements();
      });
    }
  };

  const removeWeapon = (index: number) => {
    const removedWeapon = baseTool.state.selectedItems.weapons[index];
    const newWeapons = baseTool.state.selectedItems.weapons.filter(
      (_, i) => i !== index
    );
    baseTool.setState({
      selectedItems: {
        ...baseTool.state.selectedItems,
        weapons: newWeapons,
      },
    });

    // Reset stats to minimum requirements after removing weapon
    nextTick(() => {
      const updatedStats = resetStatsForRemovedItemUtil(
        baseTool.state.characterStats,
        removedWeapon,
        {
          weapons: newWeapons,
          shields: baseTool.state.selectedItems.shields,
          sorceries: baseTool.state.selectedItems.sorceries,
          miracles: baseTool.state.selectedItems.miracles,
        },
        baseTool.state.isTwoHanded
      );

      // Ensure attunement is still sufficient for remaining spells
      const requiredSlots = calculateRequiredAttunementSlots(
        baseTool.state.selectedItems.sorceries,
        baseTool.state.selectedItems.miracles
      );
      const requiredAttunement = getAttunementLevelForSlots(requiredSlots);

      if (
        requiredAttunement !== null &&
        updatedStats.attunement < requiredAttunement
      ) {
        updatedStats.attunement = requiredAttunement;
      }

      baseTool.setState({
        characterStats: updatedStats,
      });
    });
  };

  const addShield = (shieldName: string) => {
    const shield = getShieldByName(shieldName);
    if (shield && baseTool.state.selectedItems.shields.length < 2) {
      baseTool.setState({
        selectedItems: {
          ...baseTool.state.selectedItems,
          shields: [...baseTool.state.selectedItems.shields, shield],
        },
      });

      // Auto-update stats from requirements after adding shield
      nextTick(() => {
        updateStatsFromRequirements();
      });
    }
  };

  const removeShield = (index: number) => {
    const removedShield = baseTool.state.selectedItems.shields[index];
    const newShields = baseTool.state.selectedItems.shields.filter(
      (_, i) => i !== index
    );
    baseTool.setState({
      selectedItems: {
        ...baseTool.state.selectedItems,
        shields: newShields,
      },
    });

    // Reset stats to minimum requirements after removing shield
    nextTick(() => {
      const updatedStats = resetStatsForRemovedItemUtil(
        baseTool.state.characterStats,
        removedShield,
        {
          weapons: baseTool.state.selectedItems.weapons,
          shields: newShields,
          sorceries: baseTool.state.selectedItems.sorceries,
          miracles: baseTool.state.selectedItems.miracles,
        },
        baseTool.state.isTwoHanded
      );

      // Ensure attunement is still sufficient for remaining spells
      const requiredSlots = calculateRequiredAttunementSlots(
        baseTool.state.selectedItems.sorceries,
        baseTool.state.selectedItems.miracles
      );
      const requiredAttunement = getAttunementLevelForSlots(requiredSlots);

      if (
        requiredAttunement !== null &&
        updatedStats.attunement < requiredAttunement
      ) {
        updatedStats.attunement = requiredAttunement;
      }

      baseTool.setState({
        characterStats: updatedStats,
      });
    });
  };

  const addSorcery = (sorceryName: string) => {
    const sorcery = getSorceryByName(sorceryName);
    if (sorcery && baseTool.state.selectedItems.sorceries.length < 10) {
      baseTool.setState({
        selectedItems: {
          ...baseTool.state.selectedItems,
          sorceries: [...baseTool.state.selectedItems.sorceries, sorcery],
        },
      });

      // Auto-update stats from requirements after adding sorcery
      nextTick(() => {
        // First update stats to meet minimum requirements
        updateStatsFromRequirements();

        // Then ensure attunement provides enough slots for all spells
        const requiredSlots = calculateRequiredAttunementSlots(
          baseTool.state.selectedItems.sorceries,
          baseTool.state.selectedItems.miracles
        );
        const requiredAttunement = getAttunementLevelForSlots(requiredSlots);

        if (
          requiredAttunement !== null &&
          baseTool.state.characterStats.attunement < requiredAttunement
        ) {
          baseTool.setState({
            characterStats: {
              ...baseTool.state.characterStats,
              attunement: requiredAttunement,
            },
          });
        }
      });
    }
  };

  const removeSorcery = (index: number) => {
    const removedSorcery = baseTool.state.selectedItems.sorceries[index];
    const newSorceries = baseTool.state.selectedItems.sorceries.filter(
      (_, i) => i !== index
    );
    baseTool.setState({
      selectedItems: {
        ...baseTool.state.selectedItems,
        sorceries: newSorceries,
      },
    });

    // Reset stats to minimum requirements after removing sorcery
    nextTick(() => {
      const updatedStats = resetStatsForRemovedItemUtil(
        baseTool.state.characterStats,
        removedSorcery,
        {
          weapons: baseTool.state.selectedItems.weapons,
          shields: baseTool.state.selectedItems.shields,
          sorceries: newSorceries,
          miracles: baseTool.state.selectedItems.miracles,
        },
        baseTool.state.isTwoHanded
      );

      // Ensure attunement is still sufficient for remaining spells
      const requiredSlots = calculateRequiredAttunementSlots(
        newSorceries,
        baseTool.state.selectedItems.miracles
      );
      const requiredAttunement = getAttunementLevelForSlots(requiredSlots);

      if (
        requiredAttunement !== null &&
        updatedStats.attunement < requiredAttunement
      ) {
        updatedStats.attunement = requiredAttunement;
      }

      baseTool.setState({
        characterStats: updatedStats,
      });
    });
  };

  const addMiracle = (miracleName: string) => {
    const miracle = getMiracleByName(miracleName);
    if (miracle && baseTool.state.selectedItems.miracles.length < 10) {
      baseTool.setState({
        selectedItems: {
          ...baseTool.state.selectedItems,
          miracles: [...baseTool.state.selectedItems.miracles, miracle],
        },
      });

      // Auto-update stats from requirements after adding miracle
      nextTick(() => {
        // First update stats to meet minimum requirements
        updateStatsFromRequirements();

        // Then ensure attunement provides enough slots for all spells
        const requiredSlots = calculateRequiredAttunementSlots(
          baseTool.state.selectedItems.sorceries,
          baseTool.state.selectedItems.miracles
        );
        const requiredAttunement = getAttunementLevelForSlots(requiredSlots);

        if (
          requiredAttunement !== null &&
          baseTool.state.characterStats.attunement < requiredAttunement
        ) {
          baseTool.setState({
            characterStats: {
              ...baseTool.state.characterStats,
              attunement: requiredAttunement,
            },
          });
        }
      });
    }
  };

  const removeMiracle = (index: number) => {
    const removedMiracle = baseTool.state.selectedItems.miracles[index];
    const newMiracles = baseTool.state.selectedItems.miracles.filter(
      (_, i) => i !== index
    );
    baseTool.setState({
      selectedItems: {
        ...baseTool.state.selectedItems,
        miracles: newMiracles,
      },
    });

    // Reset stats to minimum requirements after removing miracle
    nextTick(() => {
      const updatedStats = resetStatsForRemovedItemUtil(
        baseTool.state.characterStats,
        removedMiracle,
        {
          weapons: baseTool.state.selectedItems.weapons,
          shields: baseTool.state.selectedItems.shields,
          sorceries: baseTool.state.selectedItems.sorceries,
          miracles: newMiracles,
        },
        baseTool.state.isTwoHanded
      );

      // Ensure attunement is still sufficient for remaining spells
      const requiredSlots = calculateRequiredAttunementSlots(
        baseTool.state.selectedItems.sorceries,
        newMiracles
      );
      const requiredAttunement = getAttunementLevelForSlots(requiredSlots);

      if (
        requiredAttunement !== null &&
        updatedStats.attunement < requiredAttunement
      ) {
        updatedStats.attunement = requiredAttunement;
      }

      baseTool.setState({
        characterStats: updatedStats,
      });
    });
  };

  // Stat management actions
  const updateStat = (stat: keyof CharacterStats, value: number) => {
    const clampedValue = Math.max(
      STAT_MIN_VALUE,
      Math.min(STAT_MAX_VALUE, value)
    );
    baseTool.setState({
      characterStats: {
        ...baseTool.state.characterStats,
        [stat]: clampedValue,
      },
    });
  };

  const updateStatsFromRequirements = () => {
    const updatedStats = updateStatsFromRequirementsUtil(
      baseTool.state.characterStats,
      minimumRequirements.value
    );
    baseTool.setState({
      characterStats: updatedStats,
    });
  };

  const resetForm = () => {
    baseTool.reset();
  };

  const clearAllItems = () => {
    baseTool.setState({
      selectedItems: {
        weapons: [],
        shields: [],
        sorceries: [],
        miracles: [],
      },
      characterStats: { ...DEFAULT_CHARACTER_STATS },
      searchQueries: {
        weapons: "",
        shields: "",
        sorceries: "",
        miracles: "",
      },
    });
  };

  const toggleTwoHanded = () => {
    if (!isTwoHandedDisabled.value) {
      baseTool.setState({
        isTwoHanded: !baseTool.state.isTwoHanded,
      });

      // Update stats when two-handed state changes
      // Only affects strength stat since that's the only requirement that changes
      nextTick(() => {
        const updatedStats = updateStatsForTwoHandedToggleUtil(
          baseTool.state.characterStats,
          minimumRequirements.value
        );

        // Ensure attunement is still sufficient for remaining spells
        const requiredSlots = calculateRequiredAttunementSlots(
          baseTool.state.selectedItems.sorceries,
          baseTool.state.selectedItems.miracles
        );
        const requiredAttunement = getAttunementLevelForSlots(requiredSlots);

        if (
          requiredAttunement !== null &&
          updatedStats.attunement < requiredAttunement
        ) {
          updatedStats.attunement = requiredAttunement;
        }

        baseTool.setState({
          characterStats: updatedStats,
        });
      });
    }
  };

  // Utility functions
  const getNextAttunementLevel = () => {
    return getNextAttunementSlotLevel(baseTool.state.characterStats.attunement);
  };

  const getCurrentAttunementSlots = () => {
    return getAttunementSlots(baseTool.state.characterStats.attunement);
  };

  const getNextSoftCapLevel = (stat: keyof CharacterStats) => {
    return getNextSoftCap(
      stat,
      baseTool.state.characterStats[stat],
      baseTool.state.isTwoHanded
    );
  };

  const canIncreaseSoftCap = (stat: keyof CharacterStats) => {
    const nextCap = getNextSoftCapLevel(stat);
    return nextCap !== null && nextCap <= STAT_MAX_VALUE;
  };

  const increaseToNextAttunementSlot = () => {
    const nextLevel = getNextAttunementLevel();
    if (nextLevel !== null) {
      updateStat("attunement", nextLevel);
    }
  };

  const increaseToSoftCap = (stat: keyof CharacterStats) => {
    const nextCap = getNextSoftCapLevel(stat);
    if (nextCap !== null) {
      updateStat(stat, nextCap);
    }
  };

  return {
    // State from base tool
    state: baseTool.state,
    result: baseTool.result,
    loading: baseTool.loading,
    error: baseTool.error,

    // Computed properties
    isValid,
    hasChanges,
    isDirty: baseTool.isDirty,
    minimumRequirements,
    validation,
    isTwoHandedDisabled,
    isShieldSelectionDisabled,
    isWeaponSelectionDisabled,
    hasRequiredTwoHandedWeapon,
    currentAttunementSlots,
    totalRequiredAttunementSlots,
    attunementWarning,
    weaponOptions,
    shieldOptions,
    sorceryOptions,
    miracleOptions,

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
    addWeapon,
    removeWeapon,
    addShield,
    removeShield,
    addSorcery,
    removeSorcery,
    addMiracle,
    removeMiracle,
    updateStat,
    updateStatsFromRequirements,
    resetForm,
    clearAllItems,
    toggleTwoHanded,
    getNextAttunementLevel,
    getCurrentAttunementSlots,
    getNextSoftCapLevel,
    canIncreaseSoftCap,
    increaseToNextAttunementSlot,
    increaseToSoftCap,
  };
}
