<script setup lang="ts">
import { computed, ref, nextTick, watch } from "vue";
import { useToolLayout } from "~/composables/useToolLayout";
import { useSafeTheme } from "~/composables/useSafeTheme";
import { useStartingClassOptimizer } from "~/composables/useStartingClassOptimizer";
import HeroSection from "../../../Common/HeroSection.vue";
import FormSection from "../../../Common/forms/FormSection.vue";
import CategorizedItemSelector from "../Common/CategorizedItemSelector.vue";
import StatTable from "../Common/StatTable.vue";
import StartingClassResults from "../Common/StartingClassResults.vue";
import DerivedStatsDisplay from "../Common/DerivedStatsDisplay.vue";
import ArmorSelector from "../Common/ArmorSelector.vue";
import RingSelector from "../Common/RingSelector.vue";
import DodgeRollReference from "../Common/DodgeRollReference.vue";
import HowToUse from "../../../Common/HowToUse.vue";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import type { Weapon } from "~/types/game/ds1/weapons";
import type { Shield } from "~/types/game/ds1/shields";
import type { Sorcery } from "~/types/game/ds1/sorceries";
import type { Miracle } from "~/types/game/ds1/miracles";
import type { Armor } from "~/types/game/ds1/armor";
import type { Ring } from "~/types/game/ds1/rings";
import type { CharacterStats } from "~/types/game/ds1/characters";
import { getRandomTheme } from "~/utils/themes/colorSystem";
import { calculateRequiredAttunementSlots } from "~/utils/games/ds1/stats/startingClassOptimizer";
import { getAttunementLevelForSlots } from "~/utils/games/ds1/stats/attunementSlots";
import {
  calculateAllDerivedStats,
  getNextEnduranceForBetterRoll,
  getMinEnduranceForRoll,
  DODGE_ROLLS,
  getDodgeRoll,
  calculateEquipmentBonuses,
} from "~/utils/games/ds1/stats/characterStats";
import { buildCompression, type BuildData } from "~/utils/buildCompression";
import Icon from "~/components/Common/Icon.vue";
import type { Pyromancy } from "~/types/game/ds1/pyromancies";

interface Props {
  gameData: GameData;
  toolConfig?: Tool;
  theme?: ColorTheme;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

// Generate random theme for this tool
const randomTheme = getRandomTheme();
const safeTheme = useSafeTheme(props.theme || randomTheme, props.variant);

// Get terminology from game config
const terminology = computed(() => props.gameData?.config?.terminology || {});

// Tool layout setup
useToolLayout({
  title:
    props.toolConfig?.config?.seo?.title ||
    props.toolConfig?.title ||
    "Starting Class Optimizer",
  description:
    props.toolConfig?.config?.seo?.description ||
    props.toolConfig?.description ||
    "Find the optimal starting class for your desired character stats and equipment",
  iconPath: props.toolConfig?.icon || "i-heroicons-user-group",
  tool: props.toolConfig,
  gameId: "ds1",
  gameData: props.gameData,
});

// Use the starting class optimizer composable
const {
  state,
  result,
  minimumRequirements,
  isTwoHandedDisabled,
  isTwoHandedLocked,
  isShieldSelectionDisabled,
  isWeaponSelectionDisabled,
  hasRequiredTwoHandedWeapon,
  validation,
  weaponOptions,
  shieldOptions,
  sorceryOptions,
  miracleOptions,
  armorOptions,
  ringOptions,
  addWeapon,
  removeWeapon,
  addShield,
  removeShield,
  addSorcery,
  removeSorcery,
  addMiracle,
  removeMiracle,
  addArmor,
  removeArmor,
  addRing,
  removeRing,
  addCatalyst,
  removeCatalyst,
  addTalisman,
  removeTalisman,
  catalystOptions,
  talismanOptions,
  toggleTwoHandedFor,
  updateStat,
  updateStatsFromRequirements,
  resetForm,
  toggleTwoHanded,
  clearAllItems,
  setState,
  derivedStats,
  pyromancyOptions,
  addPyromancy,
  removePyromancy,
} = useStartingClassOptimizer();

// Add reset trigger counter
const resetTrigger = ref(0);

// Computed values
const hasSelectedItems = computed(() => {
  return (
    (state.selectedItems.weapons?.length || 0) > 0 ||
    (state.selectedItems.shields?.length || 0) > 0 ||
    (state.selectedItems.sorceries?.length || 0) > 0 ||
    (state.selectedItems.miracles?.length || 0) > 0 ||
    (state.selectedItems.pyromancies?.length || 0) > 0 ||
    (state.selectedItems.armor?.length || 0) > 0 ||
    (state.selectedItems.rings?.length || 0) > 0
  );
});

const hasValidStats = computed(() => {
  return (
    validation.value.errors &&
    Object.values(validation.value.errors).every(
      (validation) => validation.isValid
    )
  );
});

const showResults = computed(() => {
  // Check if user has selected any items
  const hasSelectedItems =
    (state.selectedItems.weapons?.length || 0) > 0 ||
    (state.selectedItems.shields?.length || 0) > 0 ||
    (state.selectedItems.sorceries?.length || 0) > 0 ||
    (state.selectedItems.miracles?.length || 0) > 0 ||
    (state.selectedItems.pyromancies?.length || 0) > 0;

  // Check if user has modified any character stats from default values
  const hasModifiedStats = Object.entries(state.characterStats).some(
    ([key, value]) => {
      if (key === "level") return false; // Skip level as it's not user-editable
      return value > 1; // Default value is 1 for all stats except level
    }
  );

  // Show results if either items are selected or stats have been modified
  return hasSelectedItems || hasModifiedStats;
});

// Convert result to array for StartingClassResults component
const resultsArray = computed(() => {
  return result.value?.results || [];
});

// Transform validation to match StatTable expectations
const statValidation = computed(() => {
  if (!validation.value.errors) {
    // Return default validation object with all stats as valid
    return {
      level: { isValid: true },
      vitality: { isValid: true },
      attunement: { isValid: true },
      endurance: { isValid: true },
      strength: { isValid: true },
      dexterity: { isValid: true },
      resistance: { isValid: true },
      intelligence: { isValid: true },
      faith: { isValid: true },
      hp: { isValid: true },
      stamina: { isValid: true },
      equipLoad: { isValid: true },
      maxHp: { isValid: true },
      maxStamina: { isValid: true },
      staminaRegen: { isValid: true },
      dodgeRoll: { isValid: true },
      equippedWeight: { isValid: true },
      equipLoadPercentage: { isValid: true },
      movementSpeed: { isValid: true },
      weightClass: { isValid: true },
    };
  }
  return validation.value.errors;
});

// Share functionality
const shareUrl = ref<string>("");
const showShareConfirmation = ref(false);

// Computed property to always get the latest build data
const currentBuildData = computed((): BuildData => {
  return {
    stats: {
      vitality: state.characterStats.vitality,
      attunement: state.characterStats.attunement,
      endurance: state.characterStats.endurance,
      strength: state.characterStats.strength,
      dexterity: state.characterStats.dexterity,
      resistance: state.characterStats.resistance,
      intelligence: state.characterStats.intelligence,
      faith: state.characterStats.faith,
    },
    equipment: {
      weapons: state.selectedItems.weapons?.map((w) => w.name) || [],
      shields: state.selectedItems.shields?.map((s) => s.name) || [],
      sorceries: state.selectedItems.sorceries?.map((s) => s.name) || [],
      miracles: state.selectedItems.miracles?.map((m) => m.name) || [],
      pyromancies: state.selectedItems.pyromancies?.map((p) => p.name) || [],
      armor: state.selectedItems.armor?.map((a) => a.name) || [],
      rings: state.selectedItems.rings?.map((r) => r.name) || [],
    },
    settings: {
      isTwoHanded: state.isTwoHanded,
      twoHanded: {
        weapons: state.selectedItems.twoHanded.weapons,
        shields: state.selectedItems.twoHanded.shields,
        catalysts: state.selectedItems.twoHanded.catalysts,
        talismans: state.selectedItems.twoHanded.talismans,
      },
    },
  };
});

// Watch for changes in the build data and update the share URL automatically
watch(
  currentBuildData,
  (newBuildData) => {
    shareUrl.value = buildCompression.generateUrl(newBuildData);
  },
  { deep: true, immediate: true }
);

const generateShareUrl = () => {
  shareUrl.value = buildCompression.generateUrl(currentBuildData.value);
};

const copyShareUrl = async () => {
  try {
    // Try the modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareUrl.value);
      showShareConfirmation.value = true;
      setTimeout(() => {
        showShareConfirmation.value = false;
      }, 3000);
    } else {
      // Fallback for mobile/older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl.value;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        showShareConfirmation.value = true;
        setTimeout(() => {
          showShareConfirmation.value = false;
        }, 3000);
      } catch (err) {
        // If execCommand fails, show the URL in an alert
        alert(`Share URL: ${shareUrl.value}`);
      }

      document.body.removeChild(textArea);
    }
  } catch (error) {
    // Final fallback - show URL in alert
    alert(`Share URL: ${shareUrl.value}`);
  }
};

const loadFromUrl = async () => {
  const route = useRoute();
  const buildParam = route.query.b as string;

  if (buildParam) {
    const buildData = buildCompression.decode(buildParam);
    if (buildData) {
      // 1. Clear all items and reset state
      clearAllItems();
      await nextTick();

      // 2. Deduplicate and map names to objects for each equipment type
      const unique = (arr: string[]) => Array.from(new Set(arr));
      const weapons = unique(buildData.equipment.weapons)
        .map(
          (weaponName) =>
            weaponOptions.value.find((w) => w.item.name === weaponName)?.item
        )
        .filter((x): x is (typeof weaponOptions.value)[number]["item"] =>
          Boolean(x)
        ) as Weapon[];
      const shields = unique(buildData.equipment.shields)
        .map(
          (shieldName) =>
            shieldOptions.value.find((s) => s.item.name === shieldName)?.item
        )
        .filter((x): x is (typeof shieldOptions.value)[number]["item"] =>
          Boolean(x)
        ) as Shield[];
      const sorceries = unique(buildData.equipment.sorceries)
        .map(
          (sorceryName) =>
            sorceryOptions.value.find((s) => s.item.name === sorceryName)?.item
        )
        .filter((x): x is (typeof sorceryOptions.value)[number]["item"] =>
          Boolean(x)
        ) as Sorcery[];
      const miracles = unique(buildData.equipment.miracles)
        .map(
          (miracleName) =>
            miracleOptions.value.find((m) => m.item.name === miracleName)?.item
        )
        .filter((x): x is (typeof miracleOptions.value)[number]["item"] =>
          Boolean(x)
        ) as Miracle[];
      const pyromancies = unique(buildData.equipment.pyromancies || [])
        .map(
          (pyromancyName) =>
            pyromancyOptions.value.find((p) => p.item.name === pyromancyName)
              ?.item
        )
        .filter((x): x is (typeof pyromancyOptions.value)[number]["item"] =>
          Boolean(x)
        ) as Pyromancy[];
      const armor = unique(buildData.equipment.armor)
        .map(
          (armorName) =>
            armorOptions.value.find((a) => a.item.name === armorName)?.item
        )
        .filter((x): x is (typeof armorOptions.value)[number]["item"] =>
          Boolean(x)
        ) as Armor[];
      const rings = unique(buildData.equipment.rings)
        .map(
          (ringName) =>
            ringOptions.value.find((r) => r.item.name === ringName)?.item
        )
        .filter((x): x is (typeof ringOptions.value)[number]["item"] =>
          Boolean(x)
        ) as Ring[];

      // 3. Set all selected items at once (no duplicates)
      setState({
        selectedItems: {
          weapons,
          shields,
          catalysts: [],
          talismans: [],
          sorceries,
          miracles,
          pyromancies,
          armor,
          rings,
          twoHanded: {
            weapons: buildData.settings.twoHanded?.weapons || [],
            shields: buildData.settings.twoHanded?.shields || [],
            catalysts: buildData.settings.twoHanded?.catalysts || [],
            talismans: buildData.settings.twoHanded?.talismans || [],
          },
        },
      });
      await nextTick();

      // 4. Load stats - update all at once to avoid timing issues
      const newCharacterStats = {
        ...state.characterStats,
        vitality: buildData.stats.vitality,
        attunement: buildData.stats.attunement,
        endurance: buildData.stats.endurance,
        strength: buildData.stats.strength,
        dexterity: buildData.stats.dexterity,
        resistance: buildData.stats.resistance,
        intelligence: buildData.stats.intelligence,
        faith: buildData.stats.faith,
      };
      setState({ characterStats: newCharacterStats });
      await nextTick();

      // 5. Load settings - set two-handed state directly to avoid overwriting loaded stats
      if (buildData.settings.isTwoHanded !== state.isTwoHanded) {
        setState({ isTwoHanded: buildData.settings.isTwoHanded });
      }
    }
  }
};

// Load from URL on mount
onMounted(() => {
  loadFromUrl();
});

// Handle stat updates
const handleStatUpdate = (stat: keyof CharacterStats, value: number) => {
  updateStat(stat, value);
};

// Handle two-handed toggle
const handleTwoHandedToggle = () => {
  // Use the composable's toggleTwoHanded function which handles all the logic
  toggleTwoHanded();
};

// Handler wrappers for CategorizedItemSelector (item: Weapon | Shield | Sorcery | Miracle | Pyromancy | Ring | Armor) => void
function handleAddWeaponSelector(
  item: Weapon | Shield | Sorcery | Miracle | Pyromancy | Ring | Armor
) {
  if (
    "weaponType" in item &&
    item.weaponType !== "catalyst" &&
    item.weaponType !== "talisman"
  )
    addWeapon(item.name);
}
function handleAddShieldSelector(
  item: Weapon | Shield | Sorcery | Miracle | Pyromancy | Ring | Armor
) {
  if ("shieldType" in item) addShield(item.name);
}
function handleAddCatalystSelector(
  item: Weapon | Shield | Sorcery | Miracle | Pyromancy | Ring | Armor
) {
  if ("weaponType" in item && item.weaponType === "catalyst") {
    addCatalyst(item.name);
  }
}
function handleAddTalismanSelector(
  item: Weapon | Shield | Sorcery | Miracle | Pyromancy | Ring | Armor
) {
  if ("weaponType" in item && item.weaponType === "talisman") {
    addTalisman(item.name);
  }
}
function handleAddSorcerySelector(
  item: Weapon | Shield | Sorcery | Miracle | Pyromancy | Ring | Armor
) {
  if ("sorceryType" in item) addSorcery(item.name);
}
function handleAddMiracleSelector(
  item: Weapon | Shield | Sorcery | Miracle | Pyromancy | Ring | Armor
) {
  if ("miracleType" in item) addMiracle(item.name);
}

// Handle attunement increase requests
const handleIncreaseAttunement = (level: number) => {
  updateStat("attunement", level);
};

// Handle dodge roll optimization
const improveDodgeRoll = () => {
  const currentWeight = derivedStats.value.equippedWeight;
  const currentEndurance = state.characterStats.endurance;
  const currentPercentage = derivedStats.value.equipLoadPercentage;
  const hasDarkWoodGrainRing =
    derivedStats.value.dodgeRoll.includes("Dark Wood Grain");

  // Get the correct roll list
  const rolls = [...DODGE_ROLLS]
    .filter((r) =>
      hasDarkWoodGrainRing
        ? r.name.startsWith("Ninja Flip")
        : !r.name.startsWith("Ninja Flip")
    )
    .sort((a, b) => b.equipLoadThreshold - a.equipLoadThreshold);

  // Find the next roll threshold below the current percentage
  const nextRoll = rolls.find((r) => r.equipLoadThreshold < currentPercentage);
  if (!nextRoll) return;

  // Calculate equipment bonuses for the current equipment
  const equipmentBonuses = calculateEquipmentBonuses(
    (state.selectedItems.weapons || []) as any[],
    (state.selectedItems.shields || []) as any[],
    (state.selectedItems.armor || []) as any[],
    (state.selectedItems.rings || []) as any[]
  );

  // Calculate the minimum endurance needed for that threshold
  const minEndurance = getMinEnduranceForRoll(
    nextRoll.name,
    currentWeight,
    equipmentBonuses
  );
  if (minEndurance && minEndurance > currentEndurance) {
    updateStat("endurance", minEndurance);
  }
};

// Handle armor updates
const handleArmorUpdate = (armor: {
  head?: Armor;
  chest?: Armor;
  hands?: Armor;
  legs?: Armor;
}) => {
  const armorArray = Object.values(armor).filter(Boolean) as Armor[];
  state.selectedItems.armor = armorArray;
};

const handleClearArmor = () => {
  state.selectedItems.armor = [];
};

// Handle ring updates
const handleRingsUpdate = (rings: Ring[]) => {
  state.selectedItems.rings = rings;
};

const handleClearRings = () => {
  state.selectedItems.rings = [];
};

// Handle reset
const handleReset = () => {
  if (hasSelectedItems.value) {
    // If items are selected, set stats to minimum requirements (regardless of current values)
    const minReqs = minimumRequirements.value;

    // Calculate required attunement for spells
    const requiredAttunementSlots = calculateRequiredAttunementSlots(
      state.selectedItems.sorceries || [],
      state.selectedItems.miracles || [],
      state.selectedItems.pyromancies || []
    );
    const requiredAttunement = getAttunementLevelForSlots(
      requiredAttunementSlots
    );

    const resetStats = {
      level: state.characterStats.level, // Keep current level
      vitality: minReqs.vitality,
      attunement: Math.max(minReqs.attunement, requiredAttunement || 1),
      endurance: minReqs.endurance,
      strength: minReqs.strength,
      dexterity: minReqs.dexterity,
      resistance: minReqs.resistance,
      intelligence: minReqs.intelligence,
      faith: minReqs.faith,
    };

    // Update the state with the reset stats
    updateStat("vitality", resetStats.vitality);
    updateStat("attunement", resetStats.attunement);
    updateStat("endurance", resetStats.endurance);
    updateStat("strength", resetStats.strength);
    updateStat("dexterity", resetStats.dexterity);
    updateStat("resistance", resetStats.resistance);
    updateStat("intelligence", resetStats.intelligence);
    updateStat("faith", resetStats.faith);
  } else {
    // If no items are selected, clear all character stats (set to 1 which displays as empty)
    updateStat("vitality", 1);
    updateStat("attunement", 1);
    updateStat("endurance", 1);
    updateStat("strength", 1);
    updateStat("dexterity", 1);
    updateStat("resistance", 1);
    updateStat("intelligence", 1);
    updateStat("faith", 1);
  }
};

// Handle clear all
const handleClearAll = () => {
  clearAllItems();
  resetTrigger.value++;
};

// How to Use steps for starting class optimizer
const howToUseSteps = [
  {
    type: "step" as const,
    title: "Select Equipment",
    description:
      "Choose weapons, shields, spells, armor, and rings. The tool automatically sets minimum stat requirements and shows equipment effects.",
  },
  {
    type: "step" as const,
    title: "Adjust Stats",
    description:
      "Modify character stats above minimum requirements. The tool finds the optimal starting class for your desired build.",
  },
  {
    type: "step" as const,
    title: "View Results",
    description:
      "See all starting classes ranked by soul level investment needed to reach your target stats.",
  },
  {
    type: "tip" as const,
    title: "Two-Handed Mode",
    description:
      "Enable to reduce strength requirements by ~33%. Only works with one weapon OR one shield selected.",
  },
  {
    type: "tip" as const,
    title: "Equipment Effects",
    description:
      "Armor and rings show their effects (bonuses, special abilities) when selected. Effects are automatically calculated in derived stats.",
  },
];

// New computed property to determine if dodge roll can be improved
const canImproveDodgeRoll = computed(() => {
  const currentWeight = derivedStats.value.equippedWeight;
  const currentEndurance = state.characterStats.endurance;
  const currentDodgeRoll = derivedStats.value.dodgeRoll;

  // Check if dodge roll is not optimal
  if (currentDodgeRoll.includes("Dark Wood Grain")) {
    // If dodge roll is optimal, return false
    return false;
  }

  // Calculate the endurance needed to achieve a better dodge roll
  const nextEndurance = getNextEnduranceForBetterRoll(
    currentEndurance,
    currentWeight,
    currentDodgeRoll.includes("Dark Wood Grain")
  );

  // Check if next endurance is greater than current endurance and not null
  return nextEndurance !== null && nextEndurance > currentEndurance;
});

const SECTION_OPEN_STORAGE_KEY = "ds1-starting-class-section-open";

function getInitialSectionOpen() {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(SECTION_OPEN_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only use keys we expect, fallback to true if missing
        return {
          weapons: typeof parsed.weapons === "boolean" ? parsed.weapons : true,
          spells: typeof parsed.spells === "boolean" ? parsed.spells : true,
          armor: typeof parsed.armor === "boolean" ? parsed.armor : true,
          rings: typeof parsed.rings === "boolean" ? parsed.rings : true,
        };
      }
    } catch (e) {
      // Ignore parse errors, fallback to default
    }
  }
  return { weapons: true, spells: true, armor: true, rings: true };
}

const sectionOpen = ref(getInitialSectionOpen());

watch(
  sectionOpen,
  (val) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SECTION_OPEN_STORAGE_KEY, JSON.stringify(val));
    }
  },
  { deep: true }
);

function toggleSection(section: "weapons" | "spells" | "armor" | "rings") {
  sectionOpen.value[section] = !sectionOpen.value[section];
}

function handleClearWeapons() {
  setState({
    selectedItems: {
      ...state.selectedItems,
      weapons: [],
      shields: [],
      catalysts: [],
      talismans: [],
      twoHanded: {
        weapons: [],
        shields: [],
        catalysts: [],
        talismans: [],
      },
      sorceries: state.selectedItems.sorceries,
      miracles: state.selectedItems.miracles,
      armor: state.selectedItems.armor,
      rings: state.selectedItems.rings,
    },
  });
}
function handleClearSpells() {
  setState({
    selectedItems: {
      ...state.selectedItems,
      sorceries: [],
      miracles: [],
      pyromancies: [],
      weapons: state.selectedItems.weapons,
      shields: state.selectedItems.shields,
      catalysts: state.selectedItems.catalysts,
      talismans: state.selectedItems.talismans,
      armor: state.selectedItems.armor,
      rings: state.selectedItems.rings,
      twoHanded: state.selectedItems.twoHanded,
    },
  });
}

// Handler wrappers for remove
function handleRemoveWeapon(index: number) {
  removeWeapon(index);
}
function handleRemoveShield(index: number) {
  removeShield(index);
}
function handleRemoveCatalyst(index: number) {
  removeCatalyst(index);
}
function handleRemoveTalisman(index: number) {
  removeTalisman(index);
}
function handleRemoveSorcery(index: number) {
  removeSorcery(index);
}
function handleRemoveMiracle(index: number) {
  removeMiracle(index);
}

// For ArmorSelector and RingSelector, filter and cast options to only Armor and Ring
const armorOnlyOptions = computed(
  () =>
    armorOptions.value.filter((opt) => "armorType" in opt.item) as {
      value: string;
      label: string;
      category: string;
      item: Armor;
    }[]
);
const ringOnlyOptions = computed(
  () =>
    ringOptions.value.filter((opt) => "ringType" in opt.item) as {
      value: string;
      label: string;
      category: string;
      item: Ring;
    }[]
);

function handleAddPyromancySelector(
  item: Weapon | Shield | Sorcery | Miracle | Pyromancy | Ring | Armor
) {
  if ("pyromancyType" in item) addPyromancy(item.name);
}
function handleRemovePyromancy(index: number) {
  removePyromancy(index);
}
</script>

<template>
  <div class="space-y-8">
    <!-- Top Bar with Reset, Share -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex gap-2">
        <UButton
          size="sm"
          variant="solid"
          :color="
            randomTheme.icon.includes('blue')
              ? 'info'
              : randomTheme.icon.includes('green')
                ? 'success'
                : randomTheme.icon.includes('orange')
                  ? 'warning'
                  : randomTheme.icon.includes('red')
                    ? 'error'
                    : 'primary'
          "
          @click="handleClearAll"
        >
          <Icon name="i-heroicons-arrow-path" class="w-4 h-4 mr-1" />
          Reset
        </UButton>
        <UButton
          size="sm"
          variant="outline"
          :color="showShareConfirmation ? 'success' : 'secondary'"
          @click="copyShareUrl"
          :disabled="showShareConfirmation"
        >
          <Icon
            :name="
              showShareConfirmation ? 'i-heroicons-check' : 'i-heroicons-link'
            "
            class="w-4 h-4 mr-1"
          />
          {{ showShareConfirmation ? "Copied!" : "Share Build" }}
        </UButton>
      </div>
    </div>
    <!-- Custom Accordion for Equipment/Spell/Armor/Ring Selection -->
    <!-- Weapon/Shield Selection -->
    <div
      :class="[
        'mb-4',
        'rounded-lg',
        'overflow-hidden',
        'pl-4',
        randomTheme.border,
        'border-l-4',
        'bg-white',
        'dark:bg-gray-900',
        'shadow',
      ]"
    >
      <div
        class="flex items-center justify-between px-4 py-2 cursor-pointer select-none"
        @click="toggleSection('weapons')"
      >
        <div class="flex items-center gap-2">
          <Icon
            :name="
              sectionOpen.weapons
                ? 'i-heroicons-chevron-down'
                : 'i-heroicons-chevron-right'
            "
            class="w-5 h-5 text-gray-500"
          />
          <h2 class="text-lg font-semibold">
            Weapons/Shields Selection
            <span class="text-gray-500">(optional)</span>
          </h2>
        </div>
        <UButton
          v-if="
            state.selectedItems.weapons.length ||
            state.selectedItems.shields.length ||
            state.selectedItems.catalysts.length ||
            state.selectedItems.talismans.length
          "
          type="button"
          size="xs"
          variant="solid"
          color="success"
          class="rounded-md inline-flex items-center px-2.5 py-1.5 text-xs gap-1.5 text-inverted bg-success hover:bg-success/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success font-medium shadow-sm hover:shadow-md transition-shadow"
          @click.stop="handleClearWeapons"
        >
          <Icon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
          Clear
        </UButton>
      </div>
      <div v-if="sectionOpen.weapons" class="p-4 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Weapons -->
          <CategorizedItemSelector
            id="weapons"
            label="Weapons"
            placeholder="Select weapons..."
            :options="weaponOptions"
            :selected-items="state.selectedItems.weapons"
            :max-items="
              4 -
              (state.selectedItems.shields.length +
                state.selectedItems.catalysts.length +
                state.selectedItems.talismans.length)
            "
            :two-handed="state.selectedItems.twoHanded.weapons"
            @add="handleAddWeaponSelector"
            @remove="handleRemoveWeapon"
            @toggle-two-handed="
              (index) => {
                toggleTwoHandedFor('weapons', index);
              }
            "
          />
          <!-- Shields -->
          <CategorizedItemSelector
            id="shields"
            label="Shields"
            placeholder="Select shields..."
            :options="shieldOptions"
            :selected-items="state.selectedItems.shields"
            :max-items="
              4 -
              (state.selectedItems.weapons.length +
                state.selectedItems.catalysts.length +
                state.selectedItems.talismans.length)
            "
            :two-handed="state.selectedItems.twoHanded.shields"
            @add="handleAddShieldSelector"
            @remove="handleRemoveShield"
            @toggle-two-handed="
              (index) => {
                toggleTwoHandedFor('shields', index);
              }
            "
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Catalysts -->
          <CategorizedItemSelector
            id="catalysts"
            label="Catalysts"
            placeholder="Select catalysts..."
            :options="catalystOptions"
            :selected-items="state.selectedItems.catalysts"
            :max-items="
              4 -
              (state.selectedItems.weapons.length +
                state.selectedItems.shields.length +
                state.selectedItems.talismans.length)
            "
            :two-handed="state.selectedItems.twoHanded.catalysts"
            show-special-effects
            @add="handleAddCatalystSelector"
            @remove="handleRemoveCatalyst"
            @toggle-two-handed="
              (index) => {
                toggleTwoHandedFor('catalysts', index);
              }
            "
          />
          <!-- Talismans -->
          <CategorizedItemSelector
            id="talismans"
            label="Talismans"
            placeholder="Select talismans..."
            :options="talismanOptions"
            :selected-items="state.selectedItems.talismans"
            :max-items="
              4 -
              (state.selectedItems.weapons.length +
                state.selectedItems.shields.length +
                state.selectedItems.catalysts.length)
            "
            :two-handed="state.selectedItems.twoHanded.talismans"
            show-special-effects
            @add="handleAddTalismanSelector"
            @remove="handleRemoveTalisman"
            @toggle-two-handed="
              (index) => {
                toggleTwoHandedFor('talismans', index);
              }
            "
          />
        </div>
      </div>
    </div>
    <!-- Spell Selection -->
    <div
      :class="[
        'mb-4',
        'rounded-lg',
        'overflow-hidden',
        'pl-4',
        randomTheme.border,
        'border-l-4',
        'bg-white',
        'dark:bg-gray-900',
        'shadow',
      ]"
    >
      <div
        class="flex items-center justify-between px-4 py-2 cursor-pointer select-none"
        @click="toggleSection('spells')"
      >
        <div class="flex items-center gap-2">
          <Icon
            :name="
              sectionOpen.spells
                ? 'i-heroicons-chevron-down'
                : 'i-heroicons-chevron-right'
            "
            class="w-5 h-5 text-gray-500"
          />
          <h2 class="text-lg font-semibold">
            Spell Selection <span class="text-gray-500">(optional)</span>
          </h2>
        </div>
        <UButton
          v-if="
            state.selectedItems.sorceries.length ||
            state.selectedItems.miracles.length ||
            state.selectedItems.pyromancies.length
          "
          type="button"
          size="xs"
          variant="solid"
          color="success"
          class="rounded-md inline-flex items-center px-2.5 py-1.5 text-xs gap-1.5 text-inverted bg-success hover:bg-success/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success font-medium shadow-sm hover:shadow-md transition-shadow"
          @click.stop="handleClearSpells"
        >
          <Icon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
          Clear
        </UButton>
      </div>
      <div
        v-if="sectionOpen.spells"
        class="p-4 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <!-- Sorceries -->
        <CategorizedItemSelector
          id="sorceries"
          label="Sorceries"
          placeholder="Select sorceries..."
          :options="sorceryOptions"
          :selected-items="state.selectedItems.sorceries"
          :max-items="10"
          :current-attunement="state.characterStats.attunement"
          :selected-rings="state.selectedItems.rings"
          @add="handleAddSorcerySelector"
          @remove="handleRemoveSorcery"
          @increase-attunement="handleIncreaseAttunement"
        />
        <!-- Miracles -->
        <CategorizedItemSelector
          id="miracles"
          label="Miracles"
          placeholder="Select miracles..."
          :options="miracleOptions"
          :selected-items="state.selectedItems.miracles"
          :max-items="10"
          :current-attunement="state.characterStats.attunement"
          :selected-rings="state.selectedItems.rings"
          @add="handleAddMiracleSelector"
          @remove="handleRemoveMiracle"
          @increase-attunement="handleIncreaseAttunement"
        />
        <!-- Pyromancies -->
        <CategorizedItemSelector
          id="pyromancies"
          label="Pyromancies"
          placeholder="Select pyromancies..."
          :options="pyromancyOptions"
          :selected-items="state.selectedItems.pyromancies"
          :max-items="10"
          :current-attunement="state.characterStats.attunement"
          :selected-rings="state.selectedItems.rings"
          @add="handleAddPyromancySelector"
          @remove="handleRemovePyromancy"
          @increase-attunement="handleIncreaseAttunement"
        />
      </div>
    </div>
    <!-- Armor Selection -->
    <div
      :class="[
        'mb-4',
        'rounded-lg',
        'overflow-hidden',
        'pl-4',
        randomTheme.border,
        'border-l-4',
        'bg-white',
        'dark:bg-gray-900',
        'shadow',
      ]"
    >
      <div
        class="flex items-center justify-between px-4 py-2 cursor-pointer select-none"
        @click="toggleSection('armor')"
      >
        <div class="flex items-center gap-2">
          <Icon
            :name="
              sectionOpen.armor
                ? 'i-heroicons-chevron-down'
                : 'i-heroicons-chevron-right'
            "
            class="w-5 h-5 text-gray-500"
          />
          <h2 class="text-lg font-semibold">
            Armor Selection <span class="text-gray-500">(optional)</span>
          </h2>
        </div>
        <UButton
          v-if="state.selectedItems.armor.length > 0"
          type="button"
          size="xs"
          variant="solid"
          color="success"
          class="rounded-md inline-flex items-center px-2.5 py-1.5 text-xs gap-1.5 text-inverted bg-success hover:bg-success/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success font-medium shadow-sm hover:shadow-md transition-shadow"
          @click.stop="handleClearArmor"
        >
          <Icon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
          Clear
        </UButton>
      </div>
      <div v-if="sectionOpen.armor" class="p-4">
        <ArmorSelector
          :selected-armor="{
            head: state.selectedItems.armor?.find((a) => a.slot === 'head'),
            chest: state.selectedItems.armor?.find((a) => a.slot === 'chest'),
            hands: state.selectedItems.armor?.find((a) => a.slot === 'hands'),
            legs: state.selectedItems.armor?.find((a) => a.slot === 'legs'),
          }"
          :armor-options="armorOnlyOptions"
          :reset-trigger="resetTrigger"
          @update-armor="handleArmorUpdate"
          @clear-armor="handleClearArmor"
        />
      </div>
    </div>
    <!-- Ring Selection -->
    <div
      :class="[
        'mb-4',
        'rounded-lg',
        'overflow-hidden',
        'pl-4',
        randomTheme.border,
        'border-l-4',
        'bg-white',
        'dark:bg-gray-900',
        'shadow',
      ]"
    >
      <div
        class="flex items-center justify-between px-4 py-2 cursor-pointer select-none"
        @click="toggleSection('rings')"
      >
        <div class="flex items-center gap-2">
          <Icon
            :name="
              sectionOpen.rings
                ? 'i-heroicons-chevron-down'
                : 'i-heroicons-chevron-right'
            "
            class="w-5 h-5 text-gray-500"
          />
          <h2 class="text-lg font-semibold">
            Ring Selection <span class="text-gray-500">(optional)</span>
          </h2>
        </div>
        <UButton
          v-if="state.selectedItems.rings.length > 0"
          type="button"
          size="xs"
          variant="solid"
          color="success"
          class="rounded-md inline-flex items-center px-2.5 py-1.5 text-xs gap-1.5 text-inverted bg-success hover:bg-success/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success font-medium shadow-sm hover:shadow-md transition-shadow"
          @click.stop="handleClearRings"
        >
          <Icon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
          Clear
        </UButton>
      </div>
      <div v-if="sectionOpen.rings" class="p-4">
        <RingSelector
          :selected-rings="state.selectedItems.rings"
          :ring-options="ringOnlyOptions"
          @update-rings="handleRingsUpdate"
          @clear-rings="handleClearRings"
        />
      </div>
    </div>
    <!-- Character Stats and Results Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Character Stats Section -->
      <UCard :class="`border-l-4 ${randomTheme.border}`">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Character Stats</h2>
            <UButton
              size="xs"
              variant="solid"
              color="primary"
              class="ml-2"
              @click="handleReset"
            >
              <Icon name="i-heroicons-arrow-path" class="w-4 h-4 mr-1" />
              Reset
            </UButton>
          </div>
        </template>

        <StatTable
          :stats="derivedStats"
          :is-two-handed="state.isTwoHanded"
          :minimum-requirements="{
            ...state.characterStats,
            ...minimumRequirements,
          }"
          :stat-validation="statValidation"
          @update:stat="handleStatUpdate"
        />
      </UCard>

      <!-- Results Section -->
      <UCard v-if="showResults" :class="`border-l-4 ${randomTheme.border}`">
        <template #header>
          <h2 class="text-lg font-semibold">Starting Class Recommendations</h2>
        </template>

        <StartingClassResults :results="resultsArray" />
      </UCard>
    </div>

    <!-- Derived Stats Section -->
    <UCard :class="`border-l-4 ${randomTheme.border}`">
      <template #header>
        <h2 class="text-lg font-semibold">Derived Stats</h2>
      </template>

      <DerivedStatsDisplay
        :stats="derivedStats || {}"
        :can-improve-dodge-roll="canImproveDodgeRoll"
        @improve-dodge-roll="improveDodgeRoll"
      />
    </UCard>

    <!-- Dodge Roll Reference -->
    <UCard :class="`border-l-4 ${randomTheme.border}`">
      <template #header>
        <h2 class="text-lg font-semibold">Dodge Roll Reference</h2>
      </template>

      <DodgeRollReference />
    </UCard>

    <!-- Instructions -->
    <HowToUse :steps="howToUseSteps" :theme="safeTheme" class="mt-8" />
  </div>
</template>
