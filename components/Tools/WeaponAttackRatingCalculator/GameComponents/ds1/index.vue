<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useToolLayout } from "~/composables/useToolLayout";
import { useSafeTheme } from "~/composables/useSafeTheme";
import { useWeaponAttackRatingCalculator } from "~/composables/useWeaponAttackRatingCalculator";
import { useWeaponFilters } from "~/composables/useWeaponFilters";
import { useWeaponDisplay } from "~/composables/useWeaponDisplay";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import TextField from "../../../Common/forms/TextField.vue";
import SelectField from "../../../Common/forms/SelectField.vue";
import CustomPagination from "../../../Common/CustomPagination.vue";
import Icon from "~/components/Common/Icon.vue";
import WeaponCard from "../Common/WeaponCard.vue";
import HowToUse from "../../../Common/HowToUse.vue";
import WeaponComparisonModal from "../Common/WeaponComparisonModal.vue";

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

// Tool layout setup
useToolLayout({
  title:
    props.toolConfig?.config?.seo?.title ||
    props.toolConfig?.title ||
    "Weapon Attack Rating Calculator",
  description:
    props.toolConfig?.config?.seo?.description ||
    props.toolConfig?.description ||
    "Calculate and compare weapon attack ratings based on your character stats",
  iconPath: props.toolConfig?.icon || "i-heroicons-sword",
  tool: props.toolConfig,
  gameId: "ds1",
  gameData: props.gameData,
});

// Use the main weapon calculator composable
const {
  state,
  weapons,
  weaponCategories,
  upgradePaths,
  weaponsWithRatings,
  hasWeaponsWithUpgradePaths,
  setState,
  resetForm,
  resetCharacterStats,
  error,
  setError,
  clearError,
  calculateWeaponAttackRating,
  getEffectiveRequirements,
  getMaxLevelForUpgradePath,
} = useWeaponAttackRatingCalculator();

// Use the weapon filters composable - pass weaponsWithRatings instead of weapons
const {
  filteredWeapons,
  weaponsWithRatings: filteredWeaponsWithRatings,
  categoryOptions,
  sortOptions,
  handleCategoryChange,
  handleUpgradePathChange,
  resetFilters,
  getSortValue,
  hasAuxiliaryDamage,
  hasScaling,
  getWeaponCategory,
} = useWeaponFilters(weaponsWithRatings, state, setState);

// Use the weapon display composable
const {
  weaponsPerPage,
  totalPages,
  paginatedWeapons,
  toggleWeaponExpansion,
  isWeaponExpanded,
  toggleCategoryExpansion,
  isCategoryExpanded,
  initializeExpandedCategories,
} = useWeaponDisplay(filteredWeaponsWithRatings, state, setState);

// Selection state for comparison
const selectedWeaponsForComparison = ref<string[]>([]);

// Comparison modal state
const showComparisonModal = ref(false);

const openComparisonModal = () => {
  showComparisonModal.value = true;
};

const closeComparisonModal = () => {
  showComparisonModal.value = false;
};

// Toggle weapon selection for comparison
const toggleWeaponSelection = (weaponName: string) => {
  const selected = [...selectedWeaponsForComparison.value];
  const index = selected.indexOf(weaponName);
  if (index > -1) {
    selected.splice(index, 1);
  } else {
    selected.push(weaponName);
  }
  selectedWeaponsForComparison.value = selected;
};

// Get selected weapons for comparison
const getComparisonWeapons = () => {
  return selectedWeaponsForComparison.value
    .map((name) =>
      filteredWeaponsWithRatings.value.find((weapon) => weapon.name === name)
    )
    .filter(Boolean);
};

// Upgrade path options for filter
const upgradePathOptions = computed(() => [
  { label: "All Upgrade Paths", value: "all" },
  ...upgradePaths.value.map((path) => ({
    label: path.charAt(0).toUpperCase() + path.slice(1),
    value: path,
  })),
]);

// Assign upgradePathOptions.value to a local variable for use in computed
const upgradePathOptionsList = upgradePathOptions.value;
const selectedUpgradePathModelValue = computed(() => {
  return upgradePathOptionsList.find(
    (opt) => opt.value === state.selectedUpgradePath
  )
    ? state.selectedUpgradePath
    : "all";
});

// Initialize expanded categories on mount
onMounted(() => {
  initializeExpandedCategories();
});

// Detect mobile (simple approach, can be replaced with a composable if available)
const isMobile = ref(false);
if (typeof window !== "undefined") {
  onMounted(() => {
    isMobile.value = window.innerWidth < 640;
    window.addEventListener("resize", () => {
      isMobile.value = window.innerWidth < 640;
    });
  });
}

// Expose state and functions for sidebar component
defineExpose({
  state,
  setState,
  resetForm,
  resetCharacterStats,
  upgradePaths,
  hasWeaponsWithUpgradePaths,
});

// How to use steps for the weapon attack rating calculator
const howToUseSteps = computed(() => [
  {
    type: "step" as const,
    title: "Enter Your Character Stats",
    description:
      "Input your character's Strength, Dexterity, Intelligence, and Faith stats in the sidebar. These values determine weapon scaling bonuses.",
  },
  {
    type: "step" as const,
    title: "Set Weapon Level and Conditions",
    description:
      "Choose your weapon upgrade level, humanity level, and whether you're two-handing the weapon. These affect the final attack rating.",
  },
  {
    type: "step" as const,
    title: "Filter and Search Weapons",
    description:
      "Use the search bar to find specific weapons, filter by weapon category (swords, axes, etc.), or select a specific upgrade path.",
  },
  {
    type: "step" as const,
    title: "Review Attack Ratings",
    description:
      "View calculated attack ratings for each weapon, including total attack power, individual damage types, and scaling bonuses.",
  },
  {
    type: "tip" as const,
    title: "Pro Tip",
    description:
      "Compare weapons by expanding their details to see requirements, scaling grades, and individual damage breakdowns. Sort by attack rating to find the most powerful weapons for your build.",
    icon: "i-heroicons-light-bulb",
  },
]);
</script>

<template>
  <div class="space-y-6">
    <!-- Filters and Search -->
    <UCard>
      <template #header>
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <h3 class="text-lg font-semibold">Filters & Search</h3>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500"
              >{{ filteredWeaponsWithRatings.length }} weapons found</span
            >
            <UButton size="sm" variant="outline" @click="resetFilters">
              <Icon name="i-heroicons-arrow-path" class="w-3 h-3 mr-1" />
              Reset
            </UButton>
          </div>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextField
          label="Search Weapons"
          id="search"
          :model-value="state.search"
          placeholder="Search by weapon name..."
          :theme="safeTheme"
          @update:model-value="
            (val: string) => setState({ search: val, currentPage: 1 })
          "
        />

        <SelectField
          label="Weapon Category"
          id="category"
          :model-value="state.selectedCategory || 'all'"
          :options="categoryOptions"
          :theme="safeTheme"
          @update:model-value="handleCategoryChange"
        />

        <SelectField
          label="Upgrade Path"
          id="upgradePath"
          :model-value="selectedUpgradePathModelValue"
          :options="upgradePathOptions"
          :theme="safeTheme"
          @update:model-value="handleUpgradePathChange"
        />
      </div>
    </UCard>

    <!-- Results -->
    <UCard>
      <template #header>
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <h3 class="text-lg font-semibold">Weapon Attack Ratings</h3>
          <div class="flex items-center gap-2">
            <template v-if="isMobile">
              <SelectField
                id="sortBy"
                :model-value="state.sortBy"
                :options="sortOptions"
                :theme="safeTheme"
                class="text-xs py-1.5"
                @update:model-value="(val: string) => setState({ sortBy: val })"
              />
            </template>
            <template v-else>
              <USelectMenu
                :model-value="state.sortBy"
                :items="sortOptions"
                value-key="value"
                label-key="label"
                placeholder="Sort by"
                size="sm"
                class="w-full sm:w-48"
                @update:model-value="
                  (value: string) => setState({ sortBy: value })
                "
              />
            </template>
            <UButton
              size="sm"
              variant="outline"
              @click="setState({ sortDescending: !state.sortDescending })"
              :aria-label="
                state.sortDescending ? 'Sort ascending' : 'Sort descending'
              "
            >
              <Icon
                :name="
                  state.sortDescending
                    ? 'i-heroicons-arrow-down'
                    : 'i-heroicons-arrow-up'
                "
                class="w-4 h-4"
              />
            </UButton>
            <UButton
              v-if="selectedWeaponsForComparison.length > 0"
              size="sm"
              color="primary"
              @click="openComparisonModal"
            >
              Compare Selected ({{ selectedWeaponsForComparison.length }})
            </UButton>
          </div>
        </div>
      </template>

      <div class="space-y-4">
        <!-- Individual Weapons -->
        <div
          v-for="weapon in paginatedWeapons"
          :key="`${weapon.name}-${state.strength}-${state.dexterity}-${state.intelligence}-${state.faith}-${state.weaponLevel}-${state.humanity}-${state.isTwoHanded}`"
          class="relative"
        >
          <WeaponCard
            :weapon="weapon"
            :is-expanded="isWeaponExpanded(weapon.name)"
            :on-toggle-expansion="() => toggleWeaponExpansion(weapon.name)"
            :get-weapon-category="getWeaponCategory"
            :get-effective-requirements="getEffectiveRequirements"
            :has-auxiliary-damage="hasAuxiliaryDamage"
            :has-scaling="hasScaling"
            :get-max-level-for-upgrade-path="getMaxLevelForUpgradePath"
            :state="state"
            :is-selected="selectedWeaponsForComparison.includes(weapon.name)"
            :on-toggle-selection="() => toggleWeaponSelection(weapon.name)"
            show-checkbox
          />
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredWeaponsWithRatings.length === 0"
          class="text-center py-8"
        >
          <Icon
            name="i-heroicons-calculator"
            class="w-12 h-12 text-gray-400 mx-auto mb-4"
          />
          <p class="text-gray-500 dark:text-gray-400">
            No weapons found matching your criteria.
          </p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-6">
          <div class="flex justify-center">
            <CustomPagination
              :current-page="state.currentPage"
              :total-pages="totalPages"
              :total-items="filteredWeaponsWithRatings.length"
              :page-size="weaponsPerPage"
              @update:current-page="(page) => setState({ currentPage: page })"
            />
          </div>
        </div>
      </div>
    </UCard>

    <!-- How to Use Section -->
    <HowToUse :steps="howToUseSteps" :theme="safeTheme" />

    <!-- Weapon Comparison Modal -->
    <WeaponComparisonModal
      v-model:open="showComparisonModal"
      :weapons="getComparisonWeapons()"
    />
  </div>
</template>
