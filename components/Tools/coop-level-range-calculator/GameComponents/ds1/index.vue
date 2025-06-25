<script setup lang="ts">
import { computed, ref, reactive, onMounted, watch } from "vue";
import { useToolLayout } from "~/composables/useToolLayout";
import { useSafeTheme } from "~/composables/useSafeTheme";
import { useItemLookup } from "~/composables/useItemLookup";
import { useCoopLevelCalculator } from "~/composables/useCoopLevelCalculator";
import HeroSection from "../../../Common/HeroSection.vue";
import FormSection from "../../../Common/forms/FormSection.vue";
import NumberField from "../../../Common/forms/NumberField.vue";
import SelectField from "../../../Common/forms/SelectField.vue";
import HowToUse from "../../../Common/HowToUse.vue";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { getAllWeapons } from "~/utils/games/ds1/weapons";
import { getAllShields } from "~/utils/games/ds1/shields";
import { getRandomTheme } from "~/utils/themes/colorSystem";

interface Props {
  gameData: GameData;
  toolConfig?: Tool;
  theme?: ColorTheme;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const safeTheme = useSafeTheme(props.theme, props.variant);

// Get terminology from game config
const terminology = computed(() => props.gameData?.config?.terminology || {});

// --- State ---
const state = reactive({
  characterLevel: "",
  multiplayerItem: "",
  usePassword: false,
  selectedItem: null as any, // Weapon or Shield
  selectedUpgradePath: "",
  selectedLevel: "",
});

// Auto-save functionality
const STORAGE_KEY = "coop-level-calculator-state";

// Load saved state on mount
onMounted(() => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      // Only restore valid state
      if (parsed.characterLevel !== undefined)
        state.characterLevel = parsed.characterLevel;
      if (parsed.multiplayerItem !== undefined)
        state.multiplayerItem = parsed.multiplayerItem;
      if (parsed.usePassword !== undefined)
        state.usePassword = parsed.usePassword;
      if (parsed.selectedUpgradePath !== undefined)
        state.selectedUpgradePath = parsed.selectedUpgradePath;
      if (parsed.selectedLevel !== undefined)
        state.selectedLevel = parsed.selectedLevel;

      // Restore selected item if it exists
      if (parsed.selectedItemName) {
        const found = allItems.find(
          (item) => item.name === parsed.selectedItemName
        );
        if (found) state.selectedItem = found;
      }
    } catch (error) {
      console.warn("Failed to load saved state:", error);
    }
  }
});

// Save state whenever it changes
watch(
  state,
  (newState) => {
    const stateToSave = {
      characterLevel: newState.characterLevel,
      multiplayerItem: newState.multiplayerItem,
      usePassword: newState.usePassword,
      selectedItemName: newState.selectedItem?.name || null,
      selectedUpgradePath: newState.selectedUpgradePath,
      selectedLevel: newState.selectedLevel,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  },
  { deep: true }
);

// --- Weapon/Shield Lookup ---
const allWeapons = Object.values(getAllWeapons()).flat();
const allShields = Object.values(getAllShields()).flat();
const allItems = [...allWeapons, ...allShields];
const {
  search,
  flatOptions,
  filteredItems,
  getUpgradePaths,
  getValidLevelsForPath,
} = useItemLookup(
  allItems,
  "weaponType" in allWeapons[0] ? "weaponType" : "shieldType",
  "name"
);

// --- Co-op Level Calculator ---
const {
  getAvailableLevelsForPath,
  getUpgradePathDisplayName,
  calculateResults,
  getMultiplayerItemOptions,
  getQuickReference,
} = useCoopLevelCalculator(props.gameData);

// --- Computed Properties ---
const availableUpgradePaths = computed(() => {
  if (!state.selectedItem) return [];
  const paths = getUpgradePaths(state.selectedItem);
  return Array.from(new Set(paths)).filter(Boolean);
});

const availableLevels = computed(() => {
  if (!state.selectedUpgradePath) return [];
  return getAvailableLevelsForPath(state.selectedUpgradePath);
});

const results = computed(() => calculateResults(state));

const hasData = computed(() => {
  const hasCharacterLevel = state.characterLevel.trim().length > 0;
  const hasWeaponInfo =
    state.selectedItem &&
    state.selectedUpgradePath &&
    state.selectedLevel.trim().length > 0;

  return hasCharacterLevel || hasWeaponInfo;
});

// --- Handlers ---
function handleItemSelect(value: string) {
  const found = filteredItems.value.find((item) => item.name === value);
  state.selectedItem = found || null;
  state.selectedUpgradePath = "";
  state.selectedLevel = "";
}

function handleUpgradePathSelect(value: string) {
  state.selectedUpgradePath = value;
  state.selectedLevel = "";
}

function handleLevelSelect(value: number | undefined) {
  state.selectedLevel = value?.toString() || "";
}

function resetForm() {
  state.characterLevel = "";
  state.multiplayerItem = "";
  state.usePassword = false;
  state.selectedItem = null;
  state.selectedUpgradePath = "";
  state.selectedLevel = "";

  // Clear saved state
  localStorage.removeItem(STORAGE_KEY);
}

// --- How To Use Steps ---
const howToUseSteps = computed(() => [
  {
    type: "step",
    title: "Enter your character level",
    description: "Shows level-based matchmaking ranges.",
  },
  {
    type: "step",
    title: "Select a multiplayer item (optional)",
    description: "Filter results to a specific item.",
  },
  {
    type: "step",
    title: "Enter weapon info (optional)",
    description: "Shows weapon level matchmaking ranges.",
  },
  {
    type: "step",
    title: "Enable password (optional)",
    description: "Bypasses level/weapon restrictions for compatible items.",
  },
  {
    type: "tip",
    title: "Clear",
    description: "Reset all fields.",
  },
]);

// Get data from the calculator
const multiplayerItems = getMultiplayerItemOptions();
const quickReference = getQuickReference();

// --- Theme Colors for Results/Reference ---
const sectionTheme = getRandomTheme();

// Tool layout setup
useToolLayout({
  title:
    props.toolConfig?.config?.seo?.title ||
    props.toolConfig?.title ||
    "Co-op Level Range Calculator",
  description:
    props.toolConfig?.config?.seo?.description ||
    props.toolConfig?.description ||
    "Calculate co-op and invasion soul and weapon level ranges for all multiplayer items",
  iconPath: props.toolConfig?.icon || "i-heroicons-cube",
  tool: props.toolConfig,
  gameId: "ds1",
  gameData: props.gameData,
});
</script>

<template>
  <!-- Hero Section -->
  <HeroSection
    v-if="gameData"
    :title="toolConfig?.title || 'Co-op Level Range Calculator'"
    :description="
      toolConfig?.description ||
      'Calculate co-op and invasion soul and weapon level ranges for all multiplayer items'
    "
    :icon-path="toolConfig?.icon || 'i-heroicons-cube'"
    :theme="sectionTheme"
    :game-data="gameData"
  />

  <!-- Tool Card (Form) -->
  <UCard
    :class="[
      'border-l-4',
      sectionTheme.gradient,
      sectionTheme.darkGradient,
      sectionTheme.border,
    ]"
  >
    <template #header>
      <div class="flex items-center justify-end">
        <UButton color="primary" variant="outline" @click.prevent="resetForm">
          <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-1" />
          Clear
        </UButton>
      </div>
    </template>
    <div class="space-y-6">
      <!-- Input Fields -->
      <div class="grid gap-4">
        <!-- Character Level (required) -->
        <NumberField
          :label="terminology.characterLevel || 'Character Level'"
          id="characterLevel"
          :model-value="
            state.characterLevel ? parseInt(state.characterLevel) : undefined
          "
          placeholder="Enter your level..."
          :min="1"
          :max="gameData.config.mechanics.maxLevel"
          :theme="safeTheme"
          @update:model-value="
            (val) => (state.characterLevel = val?.toString() || '')
          "
        />
        <!-- Multiplayer Item Dropdown -->
        <SelectField
          :label="`${terminology.multiplayerItem || 'Multiplayer Item'} (optional)`"
          id="multiplayerItem"
          :options="multiplayerItems"
          :model-value="state.multiplayerItem"
          placeholder="All items"
          @update:model-value="(val) => (state.multiplayerItem = val)"
        />
        <!-- Password Checkbox -->
        <UCheckbox
          id="usePassword"
          :model-value="Boolean(state.usePassword)"
          @update:model-value="(val) => (state.usePassword = Boolean(val))"
          :label="
            String(terminology.usePassword || 'Use Password') +
            ' (bypass level/weapon restrictions for some items)'
          "
        />
        <!-- Weapon-Related Inputs Grouped -->
        <div
          class="grid gap-2 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/30"
        >
          <div class="font-semibold text-sm mb-1">
            Weapon Level Range (optional)
          </div>
          <!-- Weapon/Shield Dropdown -->
          <SelectField
            :label="terminology.weaponOrShield || 'Weapon or Shield'"
            id="itemSelect"
            :options="flatOptions"
            :model-value="state.selectedItem ? state.selectedItem.name : ''"
            placeholder="Select weapon or shield..."
            @update:model-value="handleItemSelect"
          />
          <!-- Upgrade Path Dropdown (filtered) -->
          <SelectField
            v-if="state.selectedItem"
            :label="terminology.upgradePathLabel || 'Upgrade Path'"
            id="upgradePathSelect"
            :options="
              availableUpgradePaths.map((path) => ({
                label: getUpgradePathDisplayName(path),
                value: path,
              }))
            "
            :model-value="state.selectedUpgradePath"
            placeholder="Select upgrade path..."
            @update:model-value="handleUpgradePathSelect"
          />
          <!-- Level Numeric Input (filtered) -->
          <NumberField
            v-if="state.selectedUpgradePath"
            :label="terminology.weaponShieldLevel || 'Weapon/Shield Level'"
            id="levelInput"
            :model-value="
              state.selectedLevel ? parseInt(state.selectedLevel) : undefined
            "
            :min="availableLevels.length > 0 ? Math.min(...availableLevels) : 0"
            :max="availableLevels.length > 0 ? Math.max(...availableLevels) : 0"
            placeholder="Enter level..."
            :theme="safeTheme"
            @update:model-value="handleLevelSelect"
          />
        </div>
      </div>
    </div>
  </UCard>

  <!-- Results Section (moved outside form) -->
  <div v-if="hasData" class="space-y-4 mt-8">
    <UCard
      :class="[
        'border-l-4',
        sectionTheme.gradient,
        sectionTheme.darkGradient,
        sectionTheme.border,
      ]"
    >
      <template #header>
        <h3 class="text-md font-semibold">Results</h3>
      </template>
      <div class="p-4">
        <table
          class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm"
        >
          <thead>
            <tr>
              <th class="px-4 py-2 text-left">
                {{ terminology.multiplayerItem || "Item" }}
              </th>
              <th class="px-4 py-2 text-left">
                {{ terminology.levelRange || "Level Range" }}
              </th>
              <th class="px-4 py-2 text-left">
                {{ terminology.weaponLevelRange || "Weapon Level Range" }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in results" :key="row.item">
              <td class="px-4 py-2">{{ row.item }}</td>
              <td class="px-4 py-2">
                <span v-if="row.bypass">All*</span>
                <span v-else-if="state.characterLevel.trim().length > 0"
                  >{{ row.minLevel }} – {{ row.maxLevel }}</span
                >
                <span v-else>—</span>
              </td>
              <td class="px-4 py-2">
                <span v-if="row.bypass">All*</span>
                <span v-else-if="row.weaponLevelRange">
                  {{ row.weaponLevelRange[0] }} –
                  {{ row.weaponLevelRange[1] }}
                </span>
                <span v-else>—</span>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Footnote about overleveled summons -->
        <div
          v-if="state.usePassword"
          class="mt-4 text-xs text-gray-600 dark:text-gray-400 italic"
        >
          *Overleveled summons (players outside of the normal ranges) will
          receive a debuff when paired with a lower-level host.
        </div>
        <!-- Weapon Level footnote -->
        <div
          v-if="
            state.selectedItem &&
            state.selectedUpgradePath &&
            state.selectedLevel
          "
          class="mt-2 text-xs text-gray-600 dark:text-gray-400 italic"
        >
          Weapon Level is determined by the highest level weapon that has been
          in your possession (past and present), not just equipped.
        </div>
      </div>
    </UCard>
  </div>

  <!-- Quick Reference Section (outside form) -->
  <UCard
    class="mt-8"
    :class="[
      'border-l-4',
      sectionTheme.gradient,
      sectionTheme.darkGradient,
      sectionTheme.border,
    ]"
  >
    <template #header>
      <h3 class="text-md font-semibold">Quick Reference</h3>
    </template>
    <div class="p-4 space-y-3">
      <div v-for="ref in quickReference" :key="ref.title" class="mb-2">
        <div class="font-semibold">
          {{ ref.title }}{{ ref.showAsterisk ? "*" : "" }}
        </div>
        <div class="text-gray-700 dark:text-gray-300">
          {{ ref.description }}
        </div>
      </div>
      <div class="mt-4 text-xs text-gray-600 dark:text-gray-400 italic">
        *Must be human
      </div>
    </div>
  </UCard>

  <!-- How To Use Section (at bottom) -->
  <HowToUse
    :steps="[
      {
        type: 'step',
        title: 'Enter your character level',
        description: 'Shows level-based matchmaking ranges.',
      },
      {
        type: 'step',
        title: 'Select a multiplayer item (optional)',
        description: 'Filter results to a specific item.',
      },
      {
        type: 'step',
        title: 'Enter weapon info (optional)',
        description: 'Shows weapon level matchmaking ranges.',
      },
      {
        type: 'step',
        title: 'Enable password (optional)',
        description: 'Bypasses level/weapon restrictions for compatible items.',
      },
      { type: 'tip', title: 'Clear', description: 'Reset all fields.' },
    ]"
    :theme="safeTheme"
    class="mt-8"
  />
</template>
