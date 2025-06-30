<script setup lang="ts">
import { computed, ref } from "vue";
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
import Icon from "~/components/Common/Icon.vue";

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
  updateStat,
  updateStatsFromRequirements,
  resetForm,
  toggleTwoHanded,
  clearAllItems,
} = useStartingClassOptimizer();

// Add reset trigger counter
const resetTrigger = ref(0);

// Calculate derived stats with equipment
const derivedStats = computed(() => {
  return calculateAllDerivedStats(
    state.characterStats,
    state.selectedItems.weapons || [],
    state.selectedItems.shields || [],
    state.selectedItems.armor || [],
    state.selectedItems.rings || []
  );
});

// Computed values
const hasSelectedItems = computed(() => {
  return (
    (state.selectedItems.weapons?.length || 0) > 0 ||
    (state.selectedItems.shields?.length || 0) > 0 ||
    (state.selectedItems.sorceries?.length || 0) > 0 ||
    (state.selectedItems.miracles?.length || 0) > 0 ||
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
    (state.selectedItems.miracles?.length || 0) > 0;

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
    };
  }
  return validation.value.errors;
});

// Transform minimumRequirements to include level and derived stats
const minimumRequirementsWithLevel = computed(() => {
  const minReqs = minimumRequirements.value;
  return {
    level: state.characterStats.level, // Keep current level
    vitality: minReqs.vitality,
    attunement: minReqs.attunement,
    endurance: minReqs.endurance,
    strength: minReqs.strength,
    dexterity: minReqs.dexterity,
    resistance: minReqs.resistance,
    intelligence: minReqs.intelligence,
    faith: minReqs.faith,
    // Derived stats will be calculated
    hp: derivedStats.value.hp,
    stamina: derivedStats.value.stamina,
    equipLoad: derivedStats.value.equipLoad,
    maxHp: derivedStats.value.maxHp,
    maxStamina: derivedStats.value.maxStamina,
    staminaRegen: derivedStats.value.staminaRegen,
    dodgeRoll: derivedStats.value.dodgeRoll,
    equippedWeight: derivedStats.value.equippedWeight,
    equipLoadPercentage: derivedStats.value.equipLoadPercentage,
  };
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

// Handle item additions
const handleAddWeapon = (
  item: Weapon | Shield | Sorcery | Miracle | Ring | Armor
) => {
  if ("weaponType" in item) {
    addWeapon(item.name);
  }
};

const handleAddShield = (
  item: Weapon | Shield | Sorcery | Miracle | Ring | Armor
) => {
  if ("shieldType" in item) {
    addShield(item.name);
  }
};

const handleAddSorcery = (
  item: Weapon | Shield | Sorcery | Miracle | Ring | Armor
) => {
  if ("sorceryType" in item) {
    addSorcery(item.name);
  }
};

const handleAddMiracle = (
  item: Weapon | Shield | Sorcery | Miracle | Ring | Armor
) => {
  if ("miracleType" in item) {
    addMiracle(item.name);
  }
};

// Handle item removals
const handleRemoveWeapon = (index: number) => {
  removeWeapon(index);
};

const handleRemoveShield = (index: number) => {
  removeShield(index);
};

const handleRemoveSorcery = (index: number) => {
  removeSorcery(index);
};

const handleRemoveMiracle = (index: number) => {
  removeMiracle(index);
};

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
    state.selectedItems.weapons || [],
    state.selectedItems.shields || [],
    state.selectedItems.armor || [],
    state.selectedItems.rings || []
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
      state.selectedItems.miracles || []
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
</script>

<template>
  <!-- Hero Section -->
  <HeroSection
    v-if="gameData"
    :title="toolConfig?.title || 'Starting Class Optimizer'"
    :description="
      toolConfig?.description ||
      'Find the optimal starting class for your desired character stats and equipment'
    "
    :icon-path="toolConfig?.icon || 'i-heroicons-user-group'"
    :theme="safeTheme"
    :game-data="gameData"
    :icon-zoom="2"
  />

  <!-- Main Tool Content -->
  <div class="space-y-8">
    <!-- Item Selection Section -->
    <UCard :class="`border-l-4 ${randomTheme.border}`">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Equipment Selection</h2>
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
            class="font-medium shadow-sm hover:shadow-md transition-shadow"
          >
            <Icon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
            Clear All
          </UButton>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Two-handed toggle -->
        <div
          class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <button
            @click="handleTwoHandedToggle"
            :disabled="isTwoHandedDisabled || isTwoHandedLocked"
            class="flex items-center gap-3 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2 -m-2"
            :class="
              isTwoHandedDisabled || isTwoHandedLocked
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
            "
          >
            <UCheckbox
              :model-value="state.isTwoHanded"
              :disabled="isTwoHandedDisabled || isTwoHandedLocked"
              @update:model-value="handleTwoHandedToggle"
              @click.stop
            />
            <div>
              <label
                class="text-sm font-medium cursor-pointer"
                :class="
                  isTwoHandedDisabled || isTwoHandedLocked
                    ? 'text-gray-400 dark:text-gray-500'
                    : 'text-gray-900 dark:text-white'
                "
              >
                Two-Handed
                <span
                  v-if="isTwoHandedLocked"
                  class="text-xs text-amber-600 dark:text-amber-400 ml-1"
                >
                  (Required)
                </span>
              </label>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span v-if="isTwoHandedLocked">
                  Required for selected weapon(s)
                </span>
                <span v-else> Reduces Strength requirement by ~33% </span>
              </p>
            </div>
          </button>
        </div>

        <!-- Equipment Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Weapons -->
          <FormSection title="" :theme="safeTheme" layout="stack">
            <CategorizedItemSelector
              id="weapons"
              label="Weapons (optional)"
              placeholder="Select weapons..."
              :options="weaponOptions as any"
              :selected-items="state.selectedItems.weapons || []"
              :max-items="2"
              :disabled="isWeaponSelectionDisabled"
              @add="handleAddWeapon"
              @remove="handleRemoveWeapon"
            />
          </FormSection>

          <!-- Shields -->
          <FormSection title="" :theme="safeTheme" layout="stack">
            <CategorizedItemSelector
              id="shields"
              label="Shields (optional)"
              placeholder="Select shields..."
              :options="shieldOptions as any"
              :selected-items="state.selectedItems.shields || []"
              :max-items="2"
              :disabled="isShieldSelectionDisabled"
              @add="handleAddShield"
              @remove="handleRemoveShield"
            />
          </FormSection>

          <!-- Sorceries -->
          <FormSection title="" :theme="safeTheme" layout="stack">
            <CategorizedItemSelector
              id="sorceries"
              label="Sorceries (optional)"
              placeholder="Select sorceries..."
              :options="sorceryOptions as any"
              :selected-items="state.selectedItems.sorceries || []"
              :max-items="10"
              :current-attunement="state.characterStats.attunement"
              @add="handleAddSorcery"
              @remove="handleRemoveSorcery"
              @increase-attunement="handleIncreaseAttunement"
            />
          </FormSection>

          <!-- Miracles -->
          <FormSection title="" :theme="safeTheme" layout="stack">
            <CategorizedItemSelector
              id="miracles"
              label="Miracles (optional)"
              placeholder="Select miracles..."
              :options="miracleOptions as any"
              :selected-items="state.selectedItems.miracles || []"
              :max-items="10"
              :current-attunement="state.characterStats.attunement"
              @add="handleAddMiracle"
              @remove="handleRemoveMiracle"
              @increase-attunement="handleIncreaseAttunement"
            />
          </FormSection>
        </div>

        <!-- Armor and Rings Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Armor Selection -->
          <FormSection title="" :theme="safeTheme" layout="stack">
            <ArmorSelector
              :selected-armor="{
                head: state.selectedItems.armor?.find((a) => a.slot === 'head'),
                chest: state.selectedItems.armor?.find(
                  (a) => a.slot === 'chest'
                ),
                hands: state.selectedItems.armor?.find(
                  (a) => a.slot === 'hands'
                ),
                legs: state.selectedItems.armor?.find((a) => a.slot === 'legs'),
              }"
              :armor-options="armorOptions as any"
              :reset-trigger="resetTrigger"
              @update-armor="handleArmorUpdate"
              @clear-armor="handleClearArmor"
            />
          </FormSection>

          <!-- Ring Selection -->
          <FormSection title="" :theme="safeTheme" layout="stack">
            <RingSelector
              :selected-rings="state.selectedItems.rings || []"
              :ring-options="ringOptions as any"
              @update-rings="handleRingsUpdate"
              @clear-rings="handleClearRings"
            />
          </FormSection>
        </div>
      </div>
    </UCard>

    <!-- Character Stats and Results Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Character Stats Section -->
      <UCard :class="`border-l-4 ${randomTheme.border}`">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Character Stats</h2>
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
              @click="handleReset"
              class="font-medium shadow-sm hover:shadow-md transition-shadow"
            >
              <Icon name="i-heroicons-arrow-path" class="w-4 h-4 mr-1" />
              Reset
            </UButton>
          </div>
        </template>

        <StatTable
          :stats="derivedStats"
          :is-two-handed="state.isTwoHanded"
          :minimum-requirements="minimumRequirementsWithLevel"
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
        :stats="derivedStats"
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
