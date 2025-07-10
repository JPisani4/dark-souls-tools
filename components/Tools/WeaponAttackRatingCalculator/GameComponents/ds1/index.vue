<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue";
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
import CheckboxField from "../../../Common/forms/CheckboxField.vue";

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
  handleEquippableFilterChange,
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

const SELECTED_WEAPONS_KEY = "weapon-ar-selected-weapons";
const persistentSelectedWeaponsForComparison = ref<string[]>([]);

// Load selection from localStorage on mount
onMounted(() => {
  initializeExpandedCategories();
  // Load filtersOpen from localStorage
  const saved = localStorage.getItem(FILTERS_OPEN_KEY);
  if (saved !== null) {
    filtersOpen.value = saved === "true";
  }
  const savedSelection = localStorage.getItem(SELECTED_WEAPONS_KEY);
  if (savedSelection) {
    try {
      persistentSelectedWeaponsForComparison.value = JSON.parse(savedSelection);
    } catch {}
  }
});

// Watch and persist selection to localStorage
watch(
  persistentSelectedWeaponsForComparison,
  (val) => {
    localStorage.setItem(SELECTED_WEAPONS_KEY, JSON.stringify(val));
  },
  { deep: true }
);

// Comparison modal state
const showComparisonModal = ref(false);

const openComparisonModal = () => {
  showComparisonModal.value = true;
};

const closeComparisonModal = () => {
  showComparisonModal.value = false;
};

// Toggle weapon selection for comparison (persistent)
const toggleWeaponSelection = (weaponName: string) => {
  const selected = [...persistentSelectedWeaponsForComparison.value];
  const index = selected.indexOf(weaponName);
  if (index > -1) {
    selected.splice(index, 1);
  } else {
    selected.push(weaponName);
  }
  persistentSelectedWeaponsForComparison.value = selected;
};

// Computed: visible selected weapons for comparison (on current page)
const visibleSelectedWeaponsForComparison = computed(() => {
  return paginatedWeapons.value
    .map((w: { name: string }) => w.name)
    .filter((name: string) =>
      persistentSelectedWeaponsForComparison.value.includes(name)
    );
});

// Get visible selected weapon objects for comparison modal
const getVisibleComparisonWeapons = () => {
  return paginatedWeapons.value.filter((weapon: { name: string }) =>
    persistentSelectedWeaponsForComparison.value.includes(weapon.name)
  );
};

// Expand All Weapons (across all filtered weapons)
const expandAllWeapons = () => {
  const allWeaponNames = filteredWeaponsWithRatings.value.map(
    (w: { name: string }) => w.name
  );
  setState({ expandedWeapons: allWeaponNames });
};

// Collapse All Weapons
const collapseAllWeapons = () => {
  setState({ expandedWeapons: [] });
};

// Select All Weapons (across all filtered weapons, persistent)
const selectAllWeapons = () => {
  const allWeaponNames = filteredWeaponsWithRatings.value.map(
    (w: { name: string }) => w.name
  );
  persistentSelectedWeaponsForComparison.value = Array.from(
    new Set([
      ...persistentSelectedWeaponsForComparison.value,
      ...allWeaponNames,
    ])
  );
};

// Unselect All Weapons (across all filtered weapons, persistent)
const unselectAllWeapons = () => {
  const allWeaponNames = filteredWeaponsWithRatings.value.map(
    (w: { name: string }) => w.name
  );
  persistentSelectedWeaponsForComparison.value =
    persistentSelectedWeaponsForComparison.value.filter(
      (name) => !allWeaponNames.includes(name)
    );
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

// Collapsible Filters & Search state (persisted)
const FILTERS_OPEN_KEY = "weapon-ar-filters-open";
const filtersOpen = ref(true);

function toggleFiltersOpen() {
  filtersOpen.value = !filtersOpen.value;
  localStorage.setItem(FILTERS_OPEN_KEY, filtersOpen.value ? "true" : "false");
}

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
  <!-- Main Calculator Section -->
  <main role="main" aria-labelledby="tool-title">
    <!-- Filters and Search Section -->
    <section aria-labelledby="filters-title" class="mb-6">
      <UCard>
        <template #header>
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer select-none"
            @click="toggleFiltersOpen"
            @keydown.enter="toggleFiltersOpen"
            @keydown.space.prevent="toggleFiltersOpen"
            role="button"
            tabindex="0"
            :aria-expanded="filtersOpen"
            :aria-controls="'filters-content'"
          >
            <div class="flex items-center gap-2">
              <h2 id="filters-title" class="text-lg font-semibold">
                Filters & Search
              </h2>
              <Icon
                :name="
                  filtersOpen
                    ? 'i-heroicons-chevron-up'
                    : 'i-heroicons-chevron-down'
                "
                class="w-4 h-4"
                aria-hidden="true"
              />
            </div>
            <div class="flex items-center gap-2">
              <span
                class="text-sm text-gray-700 dark:text-gray-300 font-medium"
                aria-live="polite"
              >
                {{ filteredWeaponsWithRatings.length }} weapons found
              </span>
              <UButton
                size="sm"
                variant="outline"
                @click.stop="resetFilters"
                aria-label="Reset all filters to default values"
              >
                <Icon
                  name="i-heroicons-arrow-path"
                  class="w-4 h-4"
                  aria-hidden="true"
                />
              </UButton>
            </div>
          </div>
        </template>
        <div
          v-show="filtersOpen"
          id="filters-content"
          aria-labelledby="filters-title"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField
              label="Search Weapons"
              id="search"
              :model-value="state.search"
              placeholder="Search by weapon name..."
              :theme="safeTheme"
              aria-describedby="search-help"
              @update:model-value="
                (val: string) => setState({ search: val, currentPage: 1 })
              "
            />
            <div id="search-help" class="sr-only">
              Enter weapon name to filter results
            </div>

            <SelectField
              label="Weapon Category (filter by weapon type)"
              id="category"
              :model-value="state.selectedCategory || 'all'"
              :options="categoryOptions"
              :theme="safeTheme"
              aria-describedby="category-help"
              @update:model-value="handleCategoryChange"
            />
            <div id="category-help" class="sr-only">
              Filter weapons by category type
            </div>

            <SelectField
              label="Upgrade Path (filter by weapon upgrade type)"
              id="upgradePath"
              :model-value="selectedUpgradePathModelValue"
              :options="upgradePathOptions"
              :theme="safeTheme"
              aria-describedby="upgrade-path-help"
              @update:model-value="handleUpgradePathChange"
            />
            <div id="upgrade-path-help" class="sr-only">
              Filter weapons by upgrade path
            </div>
          </div>
          <!-- Equippable Only Checkbox -->
          <div class="mt-4">
            <CheckboxField
              id="equippableOnly"
              label="Equipable"
              :model-value="state.filterEquippableOnly"
              :theme="safeTheme"
              aria-describedby="equippable-help"
              @update:model-value="handleEquippableFilterChange"
            />
            <div id="equippable-help" class="sr-only">
              Show only weapons you can currently equip with your stats
            </div>
          </div>
        </div>
      </UCard>
    </section>

    <!-- Bulk Actions Section -->
    <section
      v-if="paginatedWeapons.length > 0"
      aria-labelledby="bulk-actions-title"
      class="mb-2"
    >
      <h2 id="bulk-actions-title" class="sr-only">Bulk Actions</h2>
      <div class="flex gap-2">
        <UButton
          @click="expandAllWeapons"
          size="sm"
          color="primary"
          variant="soft"
          aria-label="Expand all weapon details"
        >
          Expand All
        </UButton>
        <UButton
          @click="collapseAllWeapons"
          size="sm"
          color="primary"
          variant="soft"
          aria-label="Collapse all weapon details"
        >
          Collapse All
        </UButton>
        <UButton
          @click="selectAllWeapons"
          size="sm"
          color="info"
          variant="soft"
          aria-label="Select all weapons for comparison"
        >
          Select All
        </UButton>
        <UButton
          @click="unselectAllWeapons"
          size="sm"
          color="info"
          variant="soft"
          aria-label="Unselect all weapons from comparison"
        >
          Unselect All
        </UButton>
      </div>
    </section>

    <!-- Results Section -->
    <section
      aria-labelledby="results-title"
      aria-live="polite"
      aria-atomic="true"
    >
      <UCard>
        <template #header>
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <h2 id="results-title" class="text-lg font-semibold">
              Weapon Attack Ratings
            </h2>
            <div class="flex items-center gap-2">
              <template v-if="isMobile">
                <SelectField
                  id="sortBy"
                  label="Sort weapons by attack rating"
                  :model-value="state.sortBy"
                  :options="sortOptions"
                  :theme="safeTheme"
                  class="text-xs py-1.5"
                  aria-describedby="sort-help"
                  @update:model-value="
                    (val: string) => setState({ sortBy: val })
                  "
                />
                <div id="sort-help" class="sr-only">
                  Choose how to sort the weapon results
                </div>
              </template>
              <template v-else>
                <USelectMenu
                  :model-value="state.sortBy"
                  :items="sortOptions"
                  value-key="value"
                  label-key="label"
                  placeholder="Sort weapons by attack rating"
                  size="sm"
                  class="w-full sm:w-48"
                  aria-label="Sort weapons by attack rating"
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
                  aria-hidden="true"
                />
              </UButton>
              <UButton
                v-if="visibleSelectedWeaponsForComparison.length > 0"
                size="sm"
                color="primary"
                @click="openComparisonModal"
                :aria-label="`Compare ${visibleSelectedWeaponsForComparison.length} selected weapons`"
              >
                Compare Selected ({{
                  visibleSelectedWeaponsForComparison.length
                }})
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
              :is-selected="
                persistentSelectedWeaponsForComparison.includes(weapon.name)
              "
              :on-toggle-selection="() => toggleWeaponSelection(weapon.name)"
              show-checkbox
            />
          </div>

          <!-- Empty State -->
          <div
            v-if="filteredWeaponsWithRatings.length === 0"
            class="text-center py-8"
            role="status"
            aria-live="polite"
          >
            <Icon
              name="i-heroicons-calculator"
              class="w-12 h-12 text-gray-400 mx-auto mb-4"
              aria-hidden="true"
            />
            <p class="text-gray-500 dark:text-gray-400">
              No weapons found matching your criteria.
            </p>
          </div>

          <!-- Pagination -->
          <nav
            v-if="totalPages > 1"
            aria-labelledby="pagination-title"
            class="mt-6"
          >
            <h3 id="pagination-title" class="sr-only">Results Navigation</h3>
            <div class="flex justify-center">
              <CustomPagination
                :current-page="state.currentPage"
                :total-pages="totalPages"
                :total-items="filteredWeaponsWithRatings.length"
                :page-size="weaponsPerPage"
                @update:current-page="(page) => setState({ currentPage: page })"
              />
            </div>
          </nav>
        </div>
      </UCard>
    </section>

    <!-- How to Use Section -->
    <aside aria-labelledby="how-to-use-title">
      <HowToUse :steps="howToUseSteps" :theme="safeTheme" />
    </aside>

    <!-- Weapon Comparison Modal -->
    <WeaponComparisonModal
      v-model:open="showComparisonModal"
      :weapons="getVisibleComparisonWeapons()"
    />
  </main>
</template>
