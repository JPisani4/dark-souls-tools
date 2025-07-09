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
import SmartTooltip from "../../../Common/SmartTooltip.vue";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { getAllWeapons } from "~/utils/games/ds1/weapons";
import { getAllShields } from "~/utils/games/ds1/shields";
import { getRandomTheme } from "~/utils/themes/colorSystem";
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
// Add a typeKey property to each item for grouping
const allItems = [
  ...allWeapons.map((item) => ({ ...item, typeKey: item.weaponType })),
  ...allShields.map((item) => ({ ...item, typeKey: item.shieldType })),
];

const {
  search,
  flatOptions,
  filteredItems,
  getUpgradePaths,
  getValidLevelsForPath,
} = useItemLookup(allItems, "typeKey", "name");

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
  <!-- Tool Card (Form) -->
  <UCard
    :class="[
      'border-l-4',
      sectionTheme.gradient,
      sectionTheme.darkGradient,
      sectionTheme.border,
    ]"
  >
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
            (val: number | undefined) =>
              (state.characterLevel = val?.toString() || '')
          "
        />
        <!-- Multiplayer Item Dropdown -->
        <SelectField
          :label="`${terminology.multiplayerItem || 'Multiplayer Item'} (optional)`"
          id="multiplayerItem"
          :options="multiplayerItems"
          :model-value="state.multiplayerItem"
          placeholder="All items"
          @update:model-value="
            (val: string | undefined) => (state.multiplayerItem = val ?? '')
          "
        />
        <!-- Password Checkbox -->
        <UCheckbox
          id="usePassword"
          :model-value="Boolean(state.usePassword)"
          @update:model-value="
            (val: boolean | 'indeterminate') => {
              state.usePassword = Boolean(val);
            }
          "
          :label="
            String(terminology.usePassword || 'Use Password') +
            ' (bypass level/weapon restrictions for some items)'
          "
        />
        <!-- Weapon-Related Inputs Grouped -->
        <div
          class="grid gap-2 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/30"
        >
          <div class="font-semibold text-sm mb-1 flex items-center gap-1">
            Weapon Level Range (optional)
            <SmartTooltip>
              <template #trigger>
                <Icon
                  name="i-heroicons-information-circle"
                  class="w-4 h-4 text-blue-500 cursor-pointer align-middle"
                />
              </template>
              Weapon Level is determined by the highest level weapon that has
              been in your possession (past and present), not just equipped.
            </SmartTooltip>
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

      <!-- Clear Button at bottom right -->
      <div class="flex justify-end">
        <UButton color="primary" variant="outline" @click.prevent="resetForm">
          <Icon name="i-heroicons-x-mark" class="w-4 h-4 mr-1" />
          Clear
        </UButton>
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
        <h3 class="text-md font-semibold text-center">
          Soul and Weapon Level ranges
        </h3>
      </template>
      <div class="p-4">
        <div class="overflow-x-auto">
          <table
            class="w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm"
          >
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {{ terminology.multiplayerItem || "Item" }}
                </th>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {{ terminology.levelRange || "Level Range" }}
                </th>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {{ terminology.weaponLevelRange || "Weapon Level Range" }}
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
            >
              <tr
                v-for="row in results"
                :key="row.item"
                class="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td
                  class="px-2 py-2 text-sm text-gray-900 dark:text-gray-100 break-words"
                >
                  {{ row.item }}
                </td>
                <td class="px-2 py-2 text-sm text-gray-900 dark:text-gray-100">
                  <span v-if="row.bypass">All*</span>
                  <span v-else-if="state.characterLevel.trim().length > 0"
                    >{{ row.minLevel }} – {{ row.maxLevel }}</span
                  >
                  <span v-else>—</span>
                </td>
                <td class="px-2 py-2 text-sm text-gray-900 dark:text-gray-100">
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
        </div>
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
          <!-- Moved to tooltip above -->
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
      <h3 class="text-md font-semibold text-center">Quick Reference</h3>
    </template>
    <div class="p-4 space-y-6">
      <div
        v-for="(ref, idx) in quickReference"
        :key="ref.title"
        :class="[
          'pb-4',
          idx !== quickReference.length - 1
            ? 'border-b border-gray-200 dark:border-gray-700'
            : '',
        ]"
      >
        <div class="font-semibold mb-2">
          {{ ref.title }}
          <span
            v-if="ref.superscriptType === 1"
            class="text-sm align-super ml-1"
            >¹</span
          >
          <span
            v-if="ref.superscriptType === 2"
            class="text-sm align-super ml-1"
            >²</span
          >
          <span
            v-if="ref.superscriptType === 12"
            class="text-sm align-super ml-1"
            >¹<span class="ml-1">²</span></span
          >
        </div>
        <div class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {{ ref.description }}
        </div>
      </div>
      <div
        class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 italic space-y-2"
      >
        <div>¹ Must be human to see this sign</div>
        <div>² Must be human to use this item</div>
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
