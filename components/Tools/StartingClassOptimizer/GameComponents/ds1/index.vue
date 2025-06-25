<script setup lang="ts">
import { computed } from "vue";
import { useToolLayout } from "~/composables/useToolLayout";
import { useSafeTheme } from "~/composables/useSafeTheme";
import { useStartingClassOptimizer } from "~/composables/useStartingClassOptimizer";
import HeroSection from "../../../Common/HeroSection.vue";
import FormSection from "../../../Common/forms/FormSection.vue";
import CategorizedItemSelector from "../Common/CategorizedItemSelector.vue";
import StatTable from "../Common/StatTable.vue";
import StartingClassResults from "../Common/StartingClassResults.vue";
import HowToUse from "../../../Common/HowToUse.vue";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import type { Weapon } from "~/types/game/ds1/weapons";
import type { Shield } from "~/types/game/ds1/shields";
import type { Sorcery } from "~/types/game/ds1/sorceries";
import type { Miracle } from "~/types/game/ds1/miracles";
import type { CharacterStats } from "~/types/game/ds1/characters";
import { getRandomTheme } from "~/utils/themes/colorSystem";
import { calculateRequiredAttunementSlots } from "~/utils/games/ds1/stats/startingClassOptimizer";
import { getAttunementLevelForSlots } from "~/utils/games/ds1/stats/attunementSlots";

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
  isShieldSelectionDisabled,
  isWeaponSelectionDisabled,
  hasRequiredTwoHandedWeapon,
  validation,
  weaponOptions,
  shieldOptions,
  sorceryOptions,
  miracleOptions,
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
  toggleTwoHanded,
} = useStartingClassOptimizer();

// Computed values
const hasSelectedItems = computed(() => {
  return (
    state.selectedItems.weapons.length > 0 ||
    state.selectedItems.shields.length > 0 ||
    state.selectedItems.sorceries.length > 0 ||
    state.selectedItems.miracles.length > 0
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
    state.selectedItems.weapons.length > 0 ||
    state.selectedItems.shields.length > 0 ||
    state.selectedItems.sorceries.length > 0 ||
    state.selectedItems.miracles.length > 0;

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
    };
  }
  return validation.value.errors;
});

// Transform minimumRequirements to include level
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
const handleAddWeapon = (item: Weapon | Shield | Sorcery | Miracle) => {
  if ("weaponType" in item) {
    addWeapon(item.name);
  }
};

const handleAddShield = (item: Weapon | Shield | Sorcery | Miracle) => {
  if ("shieldType" in item) {
    addShield(item.name);
  }
};

const handleAddSorcery = (item: Weapon | Shield | Sorcery | Miracle) => {
  if ("sorceryType" in item) {
    addSorcery(item.name);
  }
};

const handleAddMiracle = (item: Weapon | Shield | Sorcery | Miracle) => {
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

// Handle reset
const handleReset = () => {
  console.log("Reset button clicked");
  console.log("hasSelectedItems.value:", hasSelectedItems.value);
  console.log("Current state:", state.characterStats);

  if (hasSelectedItems.value) {
    console.log("Items selected, setting stats to minimum requirements");
    // If items are selected, set stats to minimum requirements (regardless of current values)
    const minReqs = minimumRequirements.value;

    // Calculate required attunement for spells
    const requiredAttunementSlots = calculateRequiredAttunementSlots(
      state.selectedItems.sorceries,
      state.selectedItems.miracles
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
    console.log("Setting stats to minimum requirements:", resetStats);
    state.characterStats = resetStats;
  } else {
    console.log("No items selected, clearing stats");
    // If no items are selected, clear all character stats (set to 1 which displays as empty)
    const clearedStats = {
      level: 6,
      vitality: 1,
      attunement: 1,
      endurance: 1,
      strength: 1,
      dexterity: 1,
      resistance: 1,
      intelligence: 1,
      faith: 1,
    };
    console.log("Setting stats to:", clearedStats);
    state.characterStats = clearedStats;
  }

  console.log("After reset, state is:", state.characterStats);
};

// How to Use steps for starting class optimizer
const howToUseSteps = [
  {
    type: "step" as const,
    title: "Select Equipment (Optional)",
    description:
      "Choose up to 2 weapons/shields total and any number of spells. The tool will automatically set minimum stat requirements.",
  },
  {
    type: "step" as const,
    title: "Adjust Stats (Optional)",
    description:
      "Modify character stats above minimum requirements. The tool will find the optimal starting class for your desired build.",
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
      "Enable to reduce strength requirements by 1.5x. Only works with one weapon OR one shield selected.",
  },
];
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
            @click="resetForm"
            class="font-medium shadow-sm hover:shadow-md transition-shadow"
          >
            <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
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
            :disabled="isTwoHandedDisabled"
            class="flex items-center gap-3 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2 -m-2"
            :class="
              isTwoHandedDisabled
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
            "
          >
            <UCheckbox
              :model-value="state.isTwoHanded"
              :disabled="isTwoHandedDisabled"
              @update:model-value="handleTwoHandedToggle"
              @click.stop
            />
            <div>
              <label
                class="text-sm font-medium cursor-pointer"
                :class="
                  isTwoHandedDisabled
                    ? 'text-gray-400 dark:text-gray-500'
                    : 'text-gray-900 dark:text-white'
                "
              >
                Two-Handed
              </label>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Reduces strength requirements by 1.5x (rounded down)
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
              :options="weaponOptions"
              :selected-items="state.selectedItems.weapons"
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
              :options="shieldOptions"
              :selected-items="state.selectedItems.shields"
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
              :options="sorceryOptions"
              :selected-items="state.selectedItems.sorceries"
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
              :options="miracleOptions"
              :selected-items="state.selectedItems.miracles"
              :max-items="10"
              :current-attunement="state.characterStats.attunement"
              @add="handleAddMiracle"
              @remove="handleRemoveMiracle"
              @increase-attunement="handleIncreaseAttunement"
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
              <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-1" />
              Reset
            </UButton>
          </div>
        </template>

        <StatTable
          :stats="state.characterStats"
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

    <!-- Instructions -->
    <HowToUse :steps="howToUseSteps" :theme="safeTheme" class="mt-8" />
  </div>
</template>
