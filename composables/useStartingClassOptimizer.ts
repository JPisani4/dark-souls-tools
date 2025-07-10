import { ref, computed, watch, nextTick, onMounted } from "vue";
import type { Weapon } from "~/types/game/ds1/weapons";
import type { Shield } from "~/types/game/ds1/shields";
import type { Sorcery } from "~/types/game/ds1/sorceries";
import type { Miracle } from "~/types/game/ds1/miracles";
import type { Armor } from "~/types/game/ds1/armor";
import type { Ring } from "~/types/game/ds1/rings";
import type {
  CharacterStats,
  StartingCharacter,
} from "~/types/game/ds1/characters";
import type { ItemOption } from "~/types/common";
import { getAllWeapons, getWeaponByName } from "~/utils/games/ds1/weapons";
import { getAllShields, getShieldByName } from "~/utils/games/ds1/shields";
import { getAllSorceries, getSorceryByName } from "~/utils/games/ds1/sorceries";
import { getAllMiracles, getMiracleByName } from "~/utils/games/ds1/miracles";
import { getAllArmor, getArmorByName } from "~/utils/games/ds1/armor";
import { getAllRings, getRingByName } from "~/utils/games/ds1/rings";
import { allCharacters } from "~/utils/games/ds1/characters";
import {
  getAttunementSlots,
  getAttunementLevelForSlots,
  getNextAttunementSlotLevel,
} from "~/utils/games/ds1/stats/attunementSlots";
import { calculateAllDerivedStats } from "~/utils/games/ds1/stats/characterStats";
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
  findAllStartingClasses,
  calculateRequiredAttunementSlots,
  hasSufficientAttunementSlots,
} from "~/utils/games/ds1/stats/startingClassOptimizer";
import {
  DEFAULT_CHARACTER_STATS as RAW_DEFAULT_CHARACTER_STATS,
  AUTO_SAVE_KEYS,
  DEBOUNCE_DELAYS,
  VALIDATION_MESSAGES,
  STAT_MIN_VALUE,
  STAT_MAX_VALUE,
  STARTING_LEVEL_MIN,
  STARTING_LEVEL_MAX,
  TWO_HANDED_STRENGTH_MULTIPLIER,
} from "~/utils/constants";
import type { Pyromancy } from "~/types/game/ds1/pyromancies";
import {
  getAllPyromancies,
  getPyromancyByName,
} from "~/utils/games/ds1/pyromancies";

// Use the DEFAULT_CHARACTER_STATS from constants with proper typing
const DEFAULT_CHARACTER_STATS: CharacterStats = {
  ...RAW_DEFAULT_CHARACTER_STATS,
  movementSpeed: (RAW_DEFAULT_CHARACTER_STATS as any).movementSpeed || "Normal",
  weightClass: (RAW_DEFAULT_CHARACTER_STATS as any).weightClass || "Normal",
};

// Cache for precomputed options to improve mobile performance
interface OptionsCache {
  weapons: ItemOption[];
  shields: ItemOption[];
  catalysts: ItemOption[];
  talismans: ItemOption[];
  sorceries: ItemOption[];
  miracles: ItemOption[];
  pyromancies: ItemOption[];
  armor: ItemOption[];
  rings: ItemOption[];
  isInitialized: boolean;
}

// Global cache instance
const optionsCache: OptionsCache = {
  weapons: [],
  shields: [],
  catalysts: [],
  talismans: [],
  sorceries: [],
  miracles: [],
  pyromancies: [],
  armor: [],
  rings: [],
  isInitialized: false,
};

// Initialize the cache with all options
const initializeOptionsCache = () => {
  if (optionsCache.isInitialized) return;

  // Get all items
  const allWeapons = getAllWeapons();
  const allShields = getAllShields();
  const allSorceries = getAllSorceries();
  const allMiracles = getAllMiracles();
  const allArmor = getAllArmor();
  const allRings = getAllRings();

  // Precompute all options
  optionsCache.weapons = createItemOptions(
    Object.values(allWeapons).flat(),
    "weapon"
  );
  optionsCache.shields = createItemOptions(
    Object.values(allShields).flat(),
    "shield"
  );
  optionsCache.catalysts = createItemOptions(
    Object.values(allWeapons)
      .flat()
      .filter((item) => item.weaponType === "catalyst"),
    "catalyst"
  );
  optionsCache.talismans = createItemOptions(
    Object.values(allWeapons)
      .flat()
      .filter((item) => item.weaponType === "talisman"),
    "talisman"
  );
  optionsCache.sorceries = createItemOptions(
    Object.values(allSorceries).flat(),
    "sorcery"
  );
  optionsCache.miracles = createItemOptions(
    Object.values(allMiracles).flat(),
    "miracle"
  );
  optionsCache.armor = createItemOptions(
    Object.values(allArmor).flat(),
    "armor"
  );
  optionsCache.rings = createItemOptions(
    Object.values(allRings).flat(),
    "ring"
  );
  optionsCache.pyromancies = createItemOptions(
    Object.values(getAllPyromancies()).flat(),
    "pyromancy"
  );

  optionsCache.isInitialized = true;
};

// Helper function to create item options (moved outside the composable for caching)
const createItemOptions = (
  items: (Weapon | Shield | Sorcery | Miracle | Armor | Ring | Pyromancy)[],
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
    } else if ("armorType" in item) {
      actualCategory = item.armorType;
    } else if ("ringType" in item) {
      actualCategory = item.ringType;
    }

    return {
      value: item.name,
      label: item.name,
      category: actualCategory,
      item,
    };
  });
};

// Debounced search function for better performance
const debouncedSearch = (
  query: string,
  options: ItemOption[]
): ItemOption[] => {
  if (!query.trim()) return options;

  const searchTerm = query.toLowerCase();
  return options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm)
  );
};

// Cache for search results to avoid repeated filtering
const searchCache = new Map<string, ItemOption[]>();

// Optimized search with caching
const optimizedSearch = (
  query: string,
  options: ItemOption[]
): ItemOption[] => {
  if (!query.trim()) return options;

  const cacheKey = `${query}:${options.length}`;
  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey)!;
  }

  const results = debouncedSearch(query, options);
  searchCache.set(cacheKey, results);

  // Limit cache size to prevent memory leaks
  if (searchCache.size > 100) {
    const firstKey = searchCache.keys().next().value;
    if (typeof firstKey === "string") {
      searchCache.delete(firstKey);
    }
  }

  return results;
};

export interface StartingClassOptimizerState {
  selectedItems: {
    weapons: Weapon[];
    shields: Shield[];
    catalysts: Weapon[];
    talismans: Weapon[];
    sorceries: Sorcery[];
    miracles: Miracle[];
    pyromancies: Pyromancy[];
    armor: Armor[];
    rings: Ring[];
    twoHanded: {
      weapons: boolean[];
      shields: boolean[];
      catalysts: boolean[];
      talismans: boolean[];
    };
  };
  characterStats: CharacterStats;
  isTwoHanded: boolean;
  searchQueries: {
    weapons: string;
    shields: string;
    catalysts: string;
    talismans: string;
    sorceries: string;
    miracles: string;
    pyromancies: string;
    armor: string;
    rings: string;
  };
  version?: string; // For state migration tracking
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

export interface StartingClassOptimizerValidation {
  isValid: boolean;
  errors: Record<keyof CharacterStats, { isValid: boolean; error?: string }>;
  warnings: string[];
}

export function useStartingClassOptimizer() {
  // Initialize the options cache on first use
  initializeOptionsCache();

  // Initialize state
  const initialState: StartingClassOptimizerState = {
    selectedItems: {
      weapons: [],
      shields: [],
      catalysts: [],
      talismans: [],
      sorceries: [],
      miracles: [],
      pyromancies: [],
      armor: [],
      rings: [],
      twoHanded: {
        weapons: [],
        shields: [],
        catalysts: [],
        talismans: [],
      },
    },
    characterStats: { ...DEFAULT_CHARACTER_STATS },
    isTwoHanded: false,
    searchQueries: {
      weapons: "",
      shields: "",
      catalysts: "",
      talismans: "",
      sorceries: "",
      miracles: "",
      pyromancies: "",
      armor: "",
      rings: "",
    },
    version: "1.0.0", // Current state schema version
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
    version: () => null,
  };

  // Calculation function
  const calculateOptimalStartingClass = async (
    state: StartingClassOptimizerState
  ): Promise<StartingClassResults> => {
    const { selectedItems, characterStats } = state;

    // Calculate minimum requirements using per-item two-handed states
    const minimumRequirements =
      calculateMinimumRequirementsWithPerItemTwoHanded(
        selectedItems.weapons,
        selectedItems.shields,
        selectedItems.sorceries,
        selectedItems.miracles,
        selectedItems.pyromancies,
        selectedItems.twoHanded,
        selectedItems.rings
      );

    // Validate current stats
    const validation = validateCharacterStats(
      characterStats,
      minimumRequirements
    );

    if (!validation.isValid) {
      throw new Error("Character stats do not meet minimum requirements");
    }

    // Calculate derived stats with equipment
    const statsWithDerived = calculateAllDerivedStats(
      characterStats,
      selectedItems.weapons,
      selectedItems.shields,
      selectedItems.armor,
      selectedItems.rings
    );

    // Find all starting classes ranked by soul level investment
    const allClasses = findAllStartingClasses(
      statsWithDerived,
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

  // State migration logic to handle cached state without twoHanded property
  onMounted(() => {
    // Comprehensive state migration to handle any missing properties
    const migrateState = () => {
      const currentState = baseTool.state;
      let needsMigration = false;
      const migratedState: Partial<StartingClassOptimizerState> = {};

      // Check if state needs migration based on version
      const currentVersion = currentState.version || "0.0.0";
      const targetVersion = "1.0.0";

      if (currentVersion !== targetVersion) {
        needsMigration = true;
      }

      // Check and migrate selectedItems structure
      if (currentState.selectedItems) {
        const selectedItems = currentState.selectedItems;
        const migratedSelectedItems: any = { ...selectedItems };

        // Ensure all required arrays exist
        const requiredArrays = [
          "weapons",
          "shields",
          "catalysts",
          "talismans",
          "sorceries",
          "miracles",
          "pyromancies",
          "armor",
          "rings",
        ] as const;
        requiredArrays.forEach((arrayName) => {
          if (!Array.isArray(selectedItems[arrayName])) {
            (migratedSelectedItems as any)[arrayName] = [];
            needsMigration = true;
          }
        });

        // Migrate twoHanded property if missing
        if (!selectedItems.twoHanded) {
          migratedSelectedItems.twoHanded = {
            weapons: new Array(selectedItems.weapons?.length || 0).fill(false),
            shields: new Array(selectedItems.shields?.length || 0).fill(false),
            catalysts: new Array(selectedItems.catalysts?.length || 0).fill(
              false
            ),
            talismans: new Array(selectedItems.talismans?.length || 0).fill(
              false
            ),
          };
          needsMigration = true;
        }

        // Ensure twoHanded arrays match the length of their corresponding item arrays
        if (selectedItems.twoHanded) {
          const twoHanded = selectedItems.twoHanded;
          const arraysToCheck = [
            "weapons",
            "shields",
            "catalysts",
            "talismans",
          ];

          arraysToCheck.forEach((arrayName) => {
            const itemArray = (selectedItems as any)[arrayName];
            const twoHandedArray = (twoHanded as any)[arrayName];

            if (Array.isArray(itemArray) && Array.isArray(twoHandedArray)) {
              if (twoHandedArray.length !== itemArray.length) {
                // Extend or truncate the twoHanded array to match
                const newLength = itemArray.length;
                const newArray = new Array(newLength).fill(false);

                // Copy existing values up to the minimum length
                const minLength = Math.min(twoHandedArray.length, newLength);
                for (let i = 0; i < minLength; i++) {
                  newArray[i] = twoHandedArray[i];
                }

                (migratedSelectedItems.twoHanded as any)[arrayName] = newArray;
                needsMigration = true;
              }
            }
          });
        }

        if (needsMigration) {
          migratedState.selectedItems = migratedSelectedItems;
        }
      }

      // Check and migrate characterStats
      if (!currentState.characterStats) {
        migratedState.characterStats = { ...DEFAULT_CHARACTER_STATS };
        needsMigration = true;
      }

      // Check and migrate searchQueries
      if (!currentState.searchQueries) {
        migratedState.searchQueries = {
          weapons: "",
          shields: "",
          catalysts: "",
          talismans: "",
          sorceries: "",
          miracles: "",
          pyromancies: "",
          armor: "",
          rings: "",
        };
        needsMigration = true;
      }

      // Apply migration if needed
      if (needsMigration) {
        migratedState.version = targetVersion;
        baseTool.setState(migratedState);
      }
    };

    // Run migration
    migrateState();
  });

  // All items are now precomputed in the cache for better performance

  // Auto-calculate when state changes
  watch(
    [
      () => baseTool.state.selectedItems,
      () => baseTool.state.characterStats,
      () => baseTool.state.selectedItems?.twoHanded?.weapons || [],
      () => baseTool.state.selectedItems?.twoHanded?.shields || [],
      () => baseTool.state.selectedItems?.twoHanded?.catalysts || [],
      () => baseTool.state.selectedItems?.twoHanded?.talismans || [],
    ],
    async () => {
      // Only calculate if there are items selected or stats have been modified
      const hasSelectedItems =
        (baseTool.state.selectedItems?.weapons?.length || 0) > 0 ||
        (baseTool.state.selectedItems?.shields?.length || 0) > 0 ||
        (baseTool.state.selectedItems?.sorceries?.length || 0) > 0 ||
        (baseTool.state.selectedItems?.miracles?.length || 0) > 0 ||
        (baseTool.state.selectedItems?.armor?.length || 0) > 0 ||
        (baseTool.state.selectedItems?.rings?.length || 0) > 0;

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
        }
      } else {
        // Clear result if no items or modified stats
        baseTool.setState({});
      }
    },
    { deep: true }
  );

  // Helper: Apply per-item two-handed logic to weapons/catalysts/talismans
  function applyPerItemTwoHanded(
    items: Weapon[],
    twoHanded: boolean[]
  ): Weapon[] {
    return items.map((item, idx) => {
      if (twoHanded[idx]) {
        // Clone the item and reduce strength requirement by 33%
        const newReq = { ...item.requirements };
        newReq.strength = Math.ceil((newReq.strength * 2) / 3); // ~33% reduction
        return { ...item, requirements: newReq };
      }
      return item;
    });
  }

  // Helper: Calculate minimum requirements using per-item two-handed states
  function calculateMinimumRequirementsWithPerItemTwoHanded(
    weapons: Weapon[],
    shields: Shield[],
    sorceries: Sorcery[],
    miracles: Miracle[],
    pyromancies: Pyromancy[],
    twoHanded: {
      weapons: boolean[];
      shields: boolean[];
      catalysts: boolean[];
      talismans: boolean[];
    },
    rings: Ring[]
  ): MinimumRequirements {
    let minReqs = {
      vitality: STAT_MIN_VALUE,
      attunement: STAT_MIN_VALUE,
      endurance: STAT_MIN_VALUE,
      strength: STAT_MIN_VALUE,
      dexterity: STAT_MIN_VALUE,
      resistance: STAT_MIN_VALUE,
      intelligence: STAT_MIN_VALUE,
      faith: STAT_MIN_VALUE,
    };

    // Weapons
    weapons.forEach((item, idx) => {
      const is2H = twoHanded.weapons[idx];
      const reqs = calculateItemRequirements(item, is2H, weapons);
      Object.keys(reqs).forEach((key) => {
        const statKey = key as keyof typeof minReqs;
        minReqs[statKey] = Math.max(minReqs[statKey], reqs[statKey] || 0);
      });
    });

    // Shields
    shields.forEach((item, idx) => {
      const is2H = twoHanded.shields[idx];
      const reqs = calculateItemRequirements(item, is2H, weapons);
      Object.keys(reqs).forEach((key) => {
        const statKey = key as keyof typeof minReqs;
        minReqs[statKey] = Math.max(minReqs[statKey], reqs[statKey] || 0);
      });
    });

    // Spells
    sorceries.forEach((item) => {
      const reqs = calculateItemRequirements(item, false, []);
      Object.keys(reqs).forEach((key) => {
        const statKey = key as keyof typeof minReqs;
        minReqs[statKey] = Math.max(minReqs[statKey], reqs[statKey] || 0);
      });
    });
    miracles.forEach((item) => {
      const reqs = calculateItemRequirements(item, false, []);
      Object.keys(reqs).forEach((key) => {
        const statKey = key as keyof typeof minReqs;
        minReqs[statKey] = Math.max(minReqs[statKey], reqs[statKey] || 0);
      });
    });
    pyromancies.forEach((item) => {
      const reqs = calculateItemRequirements(item, false, []);
      Object.keys(reqs).forEach((key) => {
        const statKey = key as keyof typeof minReqs;
        minReqs[statKey] = Math.max(minReqs[statKey], reqs[statKey] || 0);
      });
    });

    // Attunement slots from rings
    const requiredSlots = calculateRequiredAttunementSlots(
      sorceries,
      miracles,
      pyromancies
    );
    const ringSlots = getAttunementSlotsFromRings(rings);
    const slotsNeededFromStat = Math.max(0, requiredSlots - ringSlots);
    minReqs.attunement =
      slotsNeededFromStat > 0
        ? getAttunementLevelForSlots(slotsNeededFromStat) || STAT_MIN_VALUE
        : STAT_MIN_VALUE;

    return minReqs;
  }

  // Computed properties
  const allEquippedWeaponLikes = computed(() => [
    ...(baseTool.state.selectedItems?.weapons || []),
    ...(baseTool.state.selectedItems?.catalysts || []),
    ...(baseTool.state.selectedItems?.talismans || []),
  ]);
  const allTwoHandedStates = computed(() => [
    ...(baseTool.state.selectedItems?.twoHanded?.weapons || []),
    ...(baseTool.state.selectedItems?.twoHanded?.catalysts || []),
    ...(baseTool.state.selectedItems?.twoHanded?.talismans || []),
  ]);

  const minimumRequirements = computed(() => {
    // For each weapon-like, use its twoHanded state
    let minReqs = {
      vitality: STAT_MIN_VALUE,
      attunement: STAT_MIN_VALUE,
      endurance: STAT_MIN_VALUE,
      strength: STAT_MIN_VALUE,
      dexterity: STAT_MIN_VALUE,
      resistance: STAT_MIN_VALUE,
      intelligence: STAT_MIN_VALUE,
      faith: STAT_MIN_VALUE,
    };

    // Explicitly reference the twoHanded arrays to ensure reactivity
    const weaponTwoHanded =
      baseTool.state.selectedItems?.twoHanded?.weapons || [];
    const catalystTwoHanded =
      baseTool.state.selectedItems?.twoHanded?.catalysts || [];
    const talismanTwoHanded =
      baseTool.state.selectedItems?.twoHanded?.talismans || [];
    const shieldTwoHanded =
      baseTool.state.selectedItems?.twoHanded?.shields || [];

    // Weapons
    (baseTool.state.selectedItems?.weapons || []).forEach((item, idx) => {
      const is2H = weaponTwoHanded[idx];
      const reqs = calculateItemRequirements(
        item,
        is2H,
        baseTool.state.selectedItems?.weapons || []
      );
      Object.keys(reqs).forEach((key) => {
        const statKey = key as keyof typeof minReqs;
        minReqs[statKey] = Math.max(minReqs[statKey], reqs[statKey] || 0);
      });
    });

    // Catalysts
    (baseTool.state.selectedItems?.catalysts || []).forEach((item, idx) => {
      const is2H = catalystTwoHanded[idx];
      const reqs = calculateItemRequirements(
        item,
        is2H,
        baseTool.state.selectedItems.weapons
      );
      Object.keys(reqs).forEach((key) => {
        const statKey = key as keyof typeof minReqs;
        minReqs[statKey] = Math.max(minReqs[statKey], reqs[statKey] || 0);
      });
    });

    // Talismans
    baseTool.state.selectedItems.talismans.forEach((item, idx) => {
      const is2H = talismanTwoHanded[idx];
      const reqs = calculateItemRequirements(
        item,
        is2H,
        baseTool.state.selectedItems.weapons
      );
      Object.keys(reqs).forEach((key) => {
        const statKey = key as keyof typeof minReqs;
        minReqs[statKey] = Math.max(minReqs[statKey], reqs[statKey] || 0);
      });
    });

    // Shields
    (baseTool.state.selectedItems?.shields || []).forEach((item, idx) => {
      const is2H = shieldTwoHanded[idx];
      const reqs = calculateItemRequirements(
        item,
        is2H,
        baseTool.state.selectedItems?.weapons || []
      );
      Object.keys(reqs).forEach((key) => {
        const statKey = key as keyof typeof minReqs;
        minReqs[statKey] = Math.max(minReqs[statKey], reqs[statKey] || 0);
      });
    });

    // Spells
    (baseTool.state.selectedItems?.sorceries || []).forEach((item) => {
      const reqs = calculateItemRequirements(item, false, []);
      Object.keys(reqs).forEach((key) => {
        const statKey = key as keyof typeof minReqs;
        minReqs[statKey] = Math.max(minReqs[statKey], reqs[statKey] || 0);
      });
    });
    (baseTool.state.selectedItems?.miracles || []).forEach((item) => {
      const reqs = calculateItemRequirements(item, false, []);
      Object.keys(reqs).forEach((key) => {
        const statKey = key as keyof typeof minReqs;
        minReqs[statKey] = Math.max(minReqs[statKey], reqs[statKey] || 0);
      });
    });
    (baseTool.state.selectedItems?.pyromancies || []).forEach((item) => {
      const reqs = calculateItemRequirements(item, false, []);
      Object.keys(reqs).forEach((key) => {
        const statKey = key as keyof typeof minReqs;
        minReqs[statKey] = Math.max(minReqs[statKey], reqs[statKey] || 0);
      });
    });

    // Attunement slots from rings
    const requiredSlots = calculateRequiredAttunementSlots(
      baseTool.state.selectedItems?.sorceries || [],
      baseTool.state.selectedItems?.miracles || [],
      baseTool.state.selectedItems?.pyromancies || []
    );
    const ringSlots = getAttunementSlotsFromRings(
      baseTool.state.selectedItems?.rings || []
    );
    const slotsNeededFromStat = Math.max(0, requiredSlots - ringSlots);
    minReqs.attunement =
      slotsNeededFromStat > 0
        ? getAttunementLevelForSlots(slotsNeededFromStat) || STAT_MIN_VALUE
        : STAT_MIN_VALUE;

    // Force reactivity by explicitly referencing the twoHanded arrays
    // This ensures the computed property re-evaluates when any twoHanded state changes
    weaponTwoHanded.length;
    catalystTwoHanded.length;
    talismanTwoHanded.length;
    shieldTwoHanded.length;

    return minReqs;
  });

  const validation = computed(() =>
    validateCharacterStats(
      baseTool.state.characterStats,
      minimumRequirements.value
    )
  );

  const isValid = computed(() => baseTool.isValid && validation.value.isValid);

  const hasChanges = computed(() => baseTool.hasChanges);

  const isTwoHandedDisabled = computed(() => {
    const hasWeapons = (baseTool.state.selectedItems?.weapons?.length || 0) > 0;
    const hasShields = (baseTool.state.selectedItems?.shields?.length || 0) > 0;
    const hasCatalysts =
      (baseTool.state.selectedItems?.catalysts?.length || 0) > 0;
    const hasTalismans =
      (baseTool.state.selectedItems?.talismans?.length || 0) > 0;
    const weaponCount = baseTool.state.selectedItems?.weapons?.length || 0;
    const shieldCount = baseTool.state.selectedItems?.shields?.length || 0;
    const catalystCount = baseTool.state.selectedItems?.catalysts?.length || 0;
    const talismanCount = baseTool.state.selectedItems?.talismans?.length || 0;

    // Two-handed mode should be disabled when no weapon-like items are selected
    if (!hasWeapons && !hasShields && !hasCatalysts && !hasTalismans)
      return true;

    // Two-handed mode should be disabled when multiple types of weapon-like items are selected
    // (can't use both weapons and shields in two-handed mode, etc.)
    const weaponLikeTypes = [
      hasWeapons,
      hasShields,
      hasCatalysts,
      hasTalismans,
    ].filter(Boolean).length;
    if (weaponLikeTypes > 1) return true;

    // Two-handed mode should be disabled when multiple items of the same type are selected
    if (
      weaponCount > 1 ||
      shieldCount > 1 ||
      catalystCount > 1 ||
      talismanCount > 1
    )
      return true;

    // Two-handed mode should be enabled when exactly one weapon-like item is selected
    return false;
  });

  // Check if two-handed mode should be locked due to required two-handed items
  const isTwoHandedLocked = computed(() => {
    const weapons = baseTool.state.selectedItems?.weapons || [];
    const catalysts = baseTool.state.selectedItems?.catalysts || [];
    const talismans = baseTool.state.selectedItems?.talismans || [];

    // Check if any weapon-like item requires two-handed mode
    const hasRequiredTwoHandedWeapon = weapons.some(
      (weapon) => weapon.requiredTwoHanded === true
    );
    const hasRequiredTwoHandedCatalyst = catalysts.some(
      (catalyst) => catalyst.requiredTwoHanded === true
    );
    const hasRequiredTwoHandedTalisman = talismans.some(
      (talisman) => talisman.requiredTwoHanded === true
    );

    return (
      hasRequiredTwoHandedWeapon ||
      hasRequiredTwoHandedCatalyst ||
      hasRequiredTwoHandedTalisman
    );
  });

  const isShieldSelectionDisabled = computed(() => {
    // Shield selection should be disabled when the total number of weapon-like items reaches 4
    const totalWeaponLikeItems =
      (baseTool.state.selectedItems?.weapons?.length || 0) +
      (baseTool.state.selectedItems?.shields?.length || 0) +
      (baseTool.state.selectedItems?.catalysts?.length || 0) +
      (baseTool.state.selectedItems?.talismans?.length || 0);

    // If two-handed mode is enabled, only allow one weapon-like item
    if (baseTool.state.isTwoHanded) {
      // In two-handed mode, you can only have one weapon-like item
      return (
        (baseTool.state.selectedItems?.weapons?.length || 0) > 0 ||
        (baseTool.state.selectedItems?.shields?.length || 0) > 0 ||
        (baseTool.state.selectedItems?.catalysts?.length || 0) > 0 ||
        (baseTool.state.selectedItems?.talismans?.length || 0) > 0
      );
    }

    return totalWeaponLikeItems >= 4;
  });

  const isWeaponSelectionDisabled = computed(() => {
    // Weapon selection should be disabled when the total number of weapon-like items reaches 4
    const totalWeaponLikeItems =
      (baseTool.state.selectedItems?.weapons?.length || 0) +
      (baseTool.state.selectedItems?.shields?.length || 0) +
      (baseTool.state.selectedItems?.catalysts?.length || 0) +
      (baseTool.state.selectedItems?.talismans?.length || 0);

    // If two-handed mode is enabled, only allow one weapon-like item
    if (baseTool.state.isTwoHanded) {
      // In two-handed mode, you can only have one weapon-like item
      return (
        (baseTool.state.selectedItems?.shields?.length || 0) > 0 ||
        (baseTool.state.selectedItems?.weapons?.length || 0) > 0 ||
        (baseTool.state.selectedItems?.catalysts?.length || 0) > 0 ||
        (baseTool.state.selectedItems?.talismans?.length || 0) > 0
      );
    }

    return totalWeaponLikeItems >= 4;
  });

  const hasRequiredTwoHandedWeapon = computed(() => {
    // Check if any weapon-like item requires two-handed mode
    const weapons = baseTool.state.selectedItems?.weapons || [];
    const catalysts = baseTool.state.selectedItems?.catalysts || [];
    const talismans = baseTool.state.selectedItems?.talismans || [];

    const hasRequiredTwoHandedWeapon = weapons.some(
      (weapon) => weapon.requiredTwoHanded === true
    );
    const hasRequiredTwoHandedCatalyst = catalysts.some(
      (catalyst) => catalyst.requiredTwoHanded === true
    );
    const hasRequiredTwoHandedTalisman = talismans.some(
      (talisman) => talisman.requiredTwoHanded === true
    );

    return (
      hasRequiredTwoHandedWeapon ||
      hasRequiredTwoHandedCatalyst ||
      hasRequiredTwoHandedTalisman
    );
  });

  const currentAttunementSlots = computed(() =>
    getAttunementSlots(baseTool.state.characterStats.attunement)
  );

  const totalRequiredAttunementSlots = computed(() =>
    calculateRequiredAttunementSlots(
      baseTool.state.selectedItems.sorceries,
      baseTool.state.selectedItems.miracles,
      baseTool.state.selectedItems.pyromancies
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

  // Computed: total attunement slots (stat + rings)
  const getAttunementSlotsFromRings = (
    rings: { effect?: { attunementSlots?: number } }[] = []
  ) =>
    (rings || []).reduce(
      (sum: number, ring) => sum + (Number(ring.effect?.attunementSlots) || 0),
      0
    );

  const totalAttunementSlots = computed(() => {
    const statSlots = getAttunementSlots(
      Number(baseTool.state.characterStats.attunement) || 0
    );
    const ringSlots = getAttunementSlotsFromRings(
      baseTool.state.selectedItems.rings || []
    );
    return statSlots + ringSlots;
  });

  // Filtered item options based on search queries (now using cached and optimized search)
  const weaponOptions = computed(() =>
    optimizedSearch(
      baseTool.state.searchQueries?.weapons || "",
      optionsCache.weapons
    )
  );

  const shieldOptions = computed(() =>
    optimizedSearch(
      baseTool.state.searchQueries?.shields || "",
      optionsCache.shields
    )
  );

  const catalystOptions = computed(() =>
    optimizedSearch(
      baseTool.state.searchQueries?.catalysts || "",
      optionsCache.catalysts
    )
  );

  const talismanOptions = computed(() =>
    optimizedSearch(
      baseTool.state.searchQueries?.talismans || "",
      optionsCache.talismans
    )
  );

  const sorceryOptions = computed(() =>
    optimizedSearch(
      baseTool.state.searchQueries?.sorceries || "",
      optionsCache.sorceries
    )
  );

  const miracleOptions = computed(() =>
    optimizedSearch(
      baseTool.state.searchQueries?.miracles || "",
      optionsCache.miracles
    )
  );

  const pyromancyOptions = computed(() =>
    optimizedSearch(
      baseTool.state.searchQueries?.pyromancies || "",
      optionsCache.pyromancies
    )
  );

  const armorOptions = computed(() =>
    optimizedSearch(
      baseTool.state.searchQueries?.armor || "",
      optionsCache.armor
    )
  );

  const ringOptions = computed(() =>
    optimizedSearch(
      baseTool.state.searchQueries?.rings || "",
      optionsCache.rings
    )
  );

  // Item management actions
  const addWeapon = (weaponName: string | undefined) => {
    if (!weaponName || typeof weaponName !== "string") return;
    const weapon = getWeaponByName(weaponName);
    if (weapon && baseTool.state.selectedItems.weapons.length < 4) {
      baseTool.setState({
        selectedItems: {
          ...baseTool.state.selectedItems,
          weapons: [...baseTool.state.selectedItems.weapons, weapon],
          twoHanded: {
            ...baseTool.state.selectedItems.twoHanded,
            weapons: [...baseTool.state.selectedItems.twoHanded.weapons, false],
          },
        },
      });

      // Auto-enable two-handed mode if the weapon requires it
      if (weapon.requiredTwoHanded === true && !baseTool.state.isTwoHanded) {
        baseTool.setState({
          isTwoHanded: true,
        });
      }

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
        twoHanded: {
          ...baseTool.state.selectedItems.twoHanded,
          weapons: baseTool.state.selectedItems.twoHanded.weapons.filter(
            (_, i) => i !== index
          ),
        },
      },
    });

    // Check if we need to reset two-handed mode after removing the weapon
    const hasRemainingRequiredTwoHandedWeapons = newWeapons.some(
      (weapon) => weapon.requiredTwoHanded === true
    );

    // If the removed weapon required two-handed mode and no other weapons require it,
    // reset the two-handed state to false
    if (
      removedWeapon.requiredTwoHanded === true &&
      !hasRemainingRequiredTwoHandedWeapons &&
      baseTool.state.isTwoHanded
    ) {
      baseTool.setState({
        isTwoHanded: false,
      });
    }

    // Let the reactive minimumRequirements computed property handle stat updates
    nextTick(() => {
      updateStatsFromRequirements();
    });
  };

  const addShield = (shieldName: string | undefined) => {
    if (!shieldName || typeof shieldName !== "string") return;
    const shield = getShieldByName(shieldName);
    if (shield && baseTool.state.selectedItems.shields.length < 4) {
      baseTool.setState({
        selectedItems: {
          ...baseTool.state.selectedItems,
          shields: [...baseTool.state.selectedItems.shields, shield],
          twoHanded: {
            ...baseTool.state.selectedItems.twoHanded,
            shields: [...baseTool.state.selectedItems.twoHanded.shields, false],
          },
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
        twoHanded: {
          ...baseTool.state.selectedItems.twoHanded,
          shields: baseTool.state.selectedItems.twoHanded.shields.filter(
            (_, i) => i !== index
          ),
        },
      },
    });

    // Let the reactive minimumRequirements computed property handle stat updates
    nextTick(() => {
      updateStatsFromRequirements();
    });
  };

  // Utility: Update attunement stat to minimum needed for current spells and rings
  const updateAttunementStatForSlots = () => {
    const requiredSlots = calculateRequiredAttunementSlots(
      baseTool.state.selectedItems.sorceries,
      baseTool.state.selectedItems.miracles,
      baseTool.state.selectedItems.pyromancies
    );
    const ringSlots = getAttunementSlotsFromRings(
      baseTool.state.selectedItems.rings || []
    );
    const slotsNeededFromStat = Math.max(0, requiredSlots - ringSlots);
    const minAttunement =
      slotsNeededFromStat > 0
        ? getAttunementLevelForSlots(slotsNeededFromStat) || STAT_MIN_VALUE
        : STAT_MIN_VALUE;
    // Only update if different
    if (baseTool.state.characterStats.attunement !== minAttunement) {
      baseTool.setState({
        characterStats: {
          ...baseTool.state.characterStats,
          attunement: minAttunement,
        },
      });
    }
  };

  // --- NEW: Watcher to keep attunement stat in sync with spells and rings ---
  watch(
    [
      () => baseTool.state.selectedItems.sorceries,
      () => baseTool.state.selectedItems.miracles,
      () => baseTool.state.selectedItems.pyromancies,
      () => baseTool.state.selectedItems.rings,
      () => baseTool.state.characterStats.attunement,
    ],
    () => {
      updateAttunementStatForSlots();
    },
    { deep: true }
  );

  const addSorcery = (sorceryName: string | undefined) => {
    if (!sorceryName || typeof sorceryName !== "string") return;
    const sorcery = getSorceryByName(sorceryName);
    if (sorcery && baseTool.state.selectedItems.sorceries.length < 10) {
      baseTool.setState({
        selectedItems: {
          ...baseTool.state.selectedItems,
          sorceries: [...baseTool.state.selectedItems.sorceries, sorcery],
        },
      });
      nextTick(() => {
        updateStatsFromRequirements();
        updateAttunementStatForSlots();
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
    nextTick(() => {
      updateStatsFromRequirements();
      updateAttunementStatForSlots();
    });
  };

  const addMiracle = (miracleName: string | undefined) => {
    if (!miracleName || typeof miracleName !== "string") return;
    const miracle = getMiracleByName(miracleName);
    if (miracle && baseTool.state.selectedItems.miracles.length < 10) {
      baseTool.setState({
        selectedItems: {
          ...baseTool.state.selectedItems,
          miracles: [...baseTool.state.selectedItems.miracles, miracle],
        },
      });
      nextTick(() => {
        updateStatsFromRequirements();
        updateAttunementStatForSlots();
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
    nextTick(() => {
      updateStatsFromRequirements();
      updateAttunementStatForSlots();
    });
  };

  // Armor management actions
  const addArmor = (armorName: string | undefined) => {
    if (!armorName || typeof armorName !== "string") return;
    const armor = getArmorByName(armorName);
    if (armor) {
      baseTool.setState({
        selectedItems: {
          ...baseTool.state.selectedItems,
          armor: [...baseTool.state.selectedItems.armor, armor],
        },
      });
    }
  };

  const removeArmor = (index: number) => {
    const newArmor = baseTool.state.selectedItems.armor.filter(
      (_, i) => i !== index
    );
    baseTool.setState({
      selectedItems: {
        ...baseTool.state.selectedItems,
        armor: newArmor,
      },
    });
  };

  // Ring management actions
  const addRing = (ringName: string | undefined) => {
    if (!ringName || typeof ringName !== "string") return;
    const ring = getRingByName(ringName);
    if (ring && baseTool.state.selectedItems.rings.length < 2) {
      baseTool.setState({
        selectedItems: {
          ...baseTool.state.selectedItems,
          rings: [...baseTool.state.selectedItems.rings, ring],
        },
      });
      nextTick(() => {
        updateAttunementStatForSlots();
      });
    }
  };

  const removeRing = (index: number) => {
    const newRings = baseTool.state.selectedItems.rings.filter(
      (_, i) => i !== index
    );
    baseTool.setState({
      selectedItems: {
        ...baseTool.state.selectedItems,
        rings: newRings,
      },
    });
    nextTick(() => {
      updateAttunementStatForSlots();
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
    const updatedStats = { ...baseTool.state.characterStats };
    const minReqs = minimumRequirements.value;
    const statKeys: (keyof CharacterStats & keyof typeof minReqs)[] = [
      "vitality",
      "attunement",
      "endurance",
      "strength",
      "dexterity",
      "resistance",
      "intelligence",
      "faith",
    ];
    for (const stat of statKeys) {
      // Always ensure stats meet minimum requirements (both raising and lowering)
      updatedStats[stat] = minReqs[stat];
    }
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
        catalysts: [],
        talismans: [],
        sorceries: [],
        miracles: [],
        pyromancies: [],
        armor: [],
        rings: [],
        twoHanded: {
          weapons: [],
          shields: [],
          catalysts: [],
          talismans: [],
        },
      },
      characterStats: { ...DEFAULT_CHARACTER_STATS },
      isTwoHanded: false,
      searchQueries: {
        weapons: "",
        shields: "",
        catalysts: "",
        talismans: "",
        sorceries: "",
        miracles: "",
        pyromancies: "",
        armor: "",
        rings: "",
      },
    });
  };

  const toggleTwoHanded = () => {
    // Don't allow toggling if two-handed mode is locked due to required items
    if (isTwoHandedLocked.value) {
      return;
    }

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
          baseTool.state.selectedItems.miracles,
          baseTool.state.selectedItems.pyromancies
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
    // Only apply soft caps to numeric stats, not derived stats
    const numericStats = [
      "vitality",
      "attunement",
      "endurance",
      "strength",
      "dexterity",
      "resistance",
      "intelligence",
      "faith",
    ] as const;
    if (!numericStats.includes(stat as any)) {
      return null;
    }

    return getNextSoftCap(
      stat,
      baseTool.state.characterStats[stat] as number,
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

  const addCatalyst = (catalystName: string | undefined) => {
    if (!catalystName) return;
    const catalyst = optionsCache.catalysts.find(
      (c) => c.value === catalystName
    )?.item as Weapon | undefined;
    if (!catalyst) return;
    if (
      baseTool.state.selectedItems.weapons.length +
        baseTool.state.selectedItems.shields.length +
        baseTool.state.selectedItems.catalysts.length >=
      4
    )
      return;
    baseTool.setState({
      selectedItems: {
        ...baseTool.state.selectedItems,
        catalysts: [...baseTool.state.selectedItems.catalysts, catalyst],
        twoHanded: {
          ...baseTool.state.selectedItems.twoHanded,
          catalysts: [
            ...baseTool.state.selectedItems.twoHanded.catalysts,
            false,
          ],
        },
      },
    });

    // Auto-enable two-handed mode if the catalyst requires it
    if (catalyst.requiredTwoHanded === true && !baseTool.state.isTwoHanded) {
      baseTool.setState({
        isTwoHanded: true,
      });
    }

    nextTick(() => {
      updateStatsFromRequirements();
    });
  };

  const removeCatalyst = (index: number) => {
    const removedCatalyst = baseTool.state.selectedItems.catalysts[index];
    const newCatalysts = baseTool.state.selectedItems.catalysts.filter(
      (_, i) => i !== index
    );
    baseTool.setState({
      selectedItems: {
        ...baseTool.state.selectedItems,
        catalysts: newCatalysts,
        twoHanded: {
          ...baseTool.state.selectedItems.twoHanded,
          catalysts: baseTool.state.selectedItems.twoHanded.catalysts.filter(
            (_, i) => i !== index
          ),
        },
      },
    });

    // Check if we need to reset two-handed mode after removing the catalyst
    const hasRemainingRequiredTwoHandedCatalysts = newCatalysts.some(
      (catalyst) => catalyst.requiredTwoHanded === true
    );

    // If the removed catalyst required two-handed mode and no other catalysts require it,
    // reset the two-handed state to false
    if (
      removedCatalyst.requiredTwoHanded === true &&
      !hasRemainingRequiredTwoHandedCatalysts &&
      baseTool.state.isTwoHanded
    ) {
      baseTool.setState({
        isTwoHanded: false,
      });
    }

    nextTick(() => {
      updateStatsFromRequirements();
    });
  };

  const addTalisman = (talismanName: string | undefined) => {
    if (!talismanName) return;
    const talisman = optionsCache.talismans.find(
      (t) => t.value === talismanName
    )?.item as Weapon | undefined;
    if (!talisman) return;
    if (
      baseTool.state.selectedItems.weapons.length +
        baseTool.state.selectedItems.shields.length +
        baseTool.state.selectedItems.talismans.length >=
      4
    )
      return;
    baseTool.setState({
      selectedItems: {
        ...baseTool.state.selectedItems,
        talismans: [...baseTool.state.selectedItems.talismans, talisman],
        twoHanded: {
          ...baseTool.state.selectedItems.twoHanded,
          talismans: [
            ...baseTool.state.selectedItems.twoHanded.talismans,
            false,
          ],
        },
      },
    });

    // Auto-enable two-handed mode if the talisman requires it
    if (talisman.requiredTwoHanded === true && !baseTool.state.isTwoHanded) {
      baseTool.setState({
        isTwoHanded: true,
      });
    }

    nextTick(() => {
      updateStatsFromRequirements();
    });
  };

  const removeTalisman = (index: number) => {
    const removedTalisman = baseTool.state.selectedItems.talismans[index];
    const newTalismans = baseTool.state.selectedItems.talismans.filter(
      (_, i) => i !== index
    );
    baseTool.setState({
      selectedItems: {
        ...baseTool.state.selectedItems,
        talismans: newTalismans,
        twoHanded: {
          ...baseTool.state.selectedItems.twoHanded,
          talismans: baseTool.state.selectedItems.twoHanded.talismans.filter(
            (_, i) => i !== index
          ),
        },
      },
    });

    // Check if we need to reset two-handed mode after removing the talisman
    const hasRemainingRequiredTwoHandedTalismans = newTalismans.some(
      (talisman) => talisman.requiredTwoHanded === true
    );

    // If the removed talisman required two-handed mode and no other talismans require it,
    // reset the two-handed state to false
    if (
      removedTalisman.requiredTwoHanded === true &&
      !hasRemainingRequiredTwoHandedTalismans &&
      baseTool.state.isTwoHanded
    ) {
      baseTool.setState({
        isTwoHanded: false,
      });
    }

    nextTick(() => {
      updateStatsFromRequirements();
    });
  };

  const toggleTwoHandedFor = (
    type: "weapons" | "shields" | "catalysts" | "talismans",
    index: number
  ) => {
    baseTool.setState({
      selectedItems: {
        ...baseTool.state.selectedItems,
        twoHanded: {
          ...baseTool.state.selectedItems.twoHanded,
          [type]: baseTool.state.selectedItems.twoHanded[type].map(
            (value, i) => (i === index ? !value : value)
          ),
        },
      },
    });
    // Update stats from requirements after state has been updated
    nextTick(() => {
      updateStatsFromRequirements();
    });
  };

  // Patch: When calling calculateAllDerivedStats, use all weapon-like items (including catalysts/talismans)
  const derivedStats = computed(() => {
    const stats = calculateAllDerivedStats(
      baseTool.state.characterStats,
      allEquippedWeaponLikes.value,
      baseTool.state.selectedItems.shields,
      baseTool.state.selectedItems.armor,
      baseTool.state.selectedItems.rings
    );
    return stats || { ...DEFAULT_CHARACTER_STATS };
  });

  // Add pyromancy
  const addPyromancy = (pyromancyName: string | undefined) => {
    if (!pyromancyName || typeof pyromancyName !== "string") return;
    const pyromancy = getPyromancyByName(pyromancyName);
    if (pyromancy && baseTool.state.selectedItems.pyromancies.length < 10) {
      baseTool.setState({
        selectedItems: {
          ...baseTool.state.selectedItems,
          pyromancies: [...baseTool.state.selectedItems.pyromancies, pyromancy],
        },
      });
      nextTick(() => {
        updateStatsFromRequirements();
        updateAttunementStatForSlots();
      });
    }
  };

  const removePyromancy = (index: number) => {
    const newPyromancies = baseTool.state.selectedItems.pyromancies.filter(
      (_, i) => i !== index
    );
    baseTool.setState({
      selectedItems: {
        ...baseTool.state.selectedItems,
        pyromancies: newPyromancies,
      },
    });
    nextTick(() => {
      updateStatsFromRequirements();
      updateAttunementStatForSlots();
    });
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
    isTwoHandedLocked,
    isShieldSelectionDisabled,
    isWeaponSelectionDisabled,
    hasRequiredTwoHandedWeapon,
    currentAttunementSlots,
    totalRequiredAttunementSlots,
    attunementWarning,
    weaponOptions,
    shieldOptions,
    catalystOptions,
    talismanOptions,
    sorceryOptions,
    miracleOptions,
    pyromancyOptions,
    armorOptions,
    ringOptions,
    totalAttunementSlots,

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
    addArmor,
    removeArmor,
    addRing,
    removeRing,
    addCatalyst,
    removeCatalyst,
    addTalisman,
    removeTalisman,
    toggleTwoHandedFor,
    derivedStats,
    addPyromancy,
    removePyromancy,
  };
}
