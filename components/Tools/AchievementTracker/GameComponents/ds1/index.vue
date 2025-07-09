<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useBaseTool } from "~/composables/useBaseTool";
import { useToolLayout } from "~/composables/useToolLayout";
import {
  getAllAchievements,
  getAchievementProgress,
} from "~/utils/games/ds1/achievements";
import type {
  Achievement,
  AchievementRequirement,
} from "~/types/game/ds1/achievements";
import CheckboxField from "~/components/Tools/Common/forms/CheckboxField.vue";
import SummaryCard from "~/components/Tools/Common/display/SummaryCard.vue";
import CategoryChip from "~/components/Tools/Common/ui/CategoryChip.vue";
import { getThemeByIndex } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";
import Icon from "~/components/Common/Icon.vue";
import SmartTooltip from "~/components/Tools/Common/SmartTooltip.vue";
import Fuse from "fuse.js";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import HowToUse from "~/components/Tools/Common/HowToUse.vue";
import { DEFAULT_THEME } from "~/utils/themes/colorSystem";

interface Props {
  gameData: GameData;
  toolConfig?: Tool;
  theme?: ColorTheme;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

// Tool layout setup
useToolLayout({
  title:
    props.toolConfig?.config?.seo?.title ||
    props.toolConfig?.title ||
    "Achievement Tracker",
  description:
    props.toolConfig?.config?.seo?.description ||
    props.toolConfig?.description ||
    "Track your progress through Dark Souls Remastered achievements",
  iconPath: props.toolConfig?.icon || "i-heroicons-trophy",
  tool: props.toolConfig,
  gameId: "ds1",
  gameData: props.gameData,
});

// Tool state: completedRequirements is now a map of achievementId -> cycle -> array of completed requirement IDs
interface AchievementTrackerState {
  completedRequirements: Record<string, Record<number, string[]>>;
  currentCycle: Record<string, number>;
  expandedAchievementIds: string[];
  expandedCategoryIds: Record<string, string[]>; // achievementId -> array of expanded category names
  search: string;
}

const initialState: AchievementTrackerState = {
  completedRequirements: {},
  currentCycle: {},
  expandedAchievementIds: [],
  expandedCategoryIds: {},
  search: "",
};

const { state, setState, reset, error, setError, clearError } = useBaseTool<
  AchievementTrackerState,
  { timestamp: Date }
>(
  {
    initialState,
    autoSave: true,
    autoSaveKey: "achievement-tracker-ds1",
    debounceMs: 500,
  },
  async (state) => {
    // Dummy calculation function - just return the state for auto-save to work
    return {
      timestamp: new Date(),
      ...state,
    };
  }
);

const allAchievements = getAllAchievements();

// Flatten all achievements into a single array for listing
const achievements = computed(() => {
  return Object.values(allAchievements).flat();
});

// Filtered achievements by search with fuzzy matching
const filteredAchievements = computed(() => {
  if (!state.search) return achievements.value;

  // Use fuzzy search for better typo tolerance
  const fuse = new Fuse(achievements.value, {
    keys: ["name", "description"],
    threshold: 0.35, // typo tolerance
    minMatchCharLength: 2,
    ignoreLocation: true,
  });

  const fuseResults = fuse.search(state.search);
  return fuseResults.map((result) => result.item);
});

// Store a random theme for each achievement (stable per session)
const achievementThemes = ref<Record<string, any>>({});

onMounted(() => {
  // Assign a random theme to each achievement if not already assigned
  achievements.value.forEach((achievement, idx) => {
    if (!achievementThemes.value[achievement.id]) {
      // Use index for stable assignment per session
      achievementThemes.value[achievement.id] = getThemeByIndex(idx);
    }
  });
});

const expandAchievement = (achievementId: string) => {
  const newExpandedIds = [...state.expandedAchievementIds];
  const index = newExpandedIds.indexOf(achievementId);
  if (index > -1) {
    newExpandedIds.splice(index, 1);
  } else {
    newExpandedIds.push(achievementId);
  }
  setState({ expandedAchievementIds: newExpandedIds });
};

const toggleCategory = (achievementId: string, category: string) => {
  const currentExpanded = state.expandedCategoryIds[achievementId] || [];
  const newExpanded = [...currentExpanded];

  const index = newExpanded.indexOf(category);
  if (index > -1) {
    newExpanded.splice(index, 1);
  } else {
    newExpanded.push(category);
  }

  setState({
    expandedCategoryIds: {
      ...state.expandedCategoryIds,
      [achievementId]: newExpanded,
    },
  });
};

const isCategoryExpanded = (achievementId: string, category: string) => {
  return (state.expandedCategoryIds[achievementId] || []).includes(category);
};

const resetAllProgress = () => {
  setState({
    completedRequirements: {},
    currentCycle: {},
  });
};

const resetAchievementProgress = (achievementId: string) => {
  setState({
    completedRequirements: {
      ...state.completedRequirements,
      [achievementId]: {},
    },
    currentCycle: {
      ...state.currentCycle,
      [achievementId]: 0,
    },
  });
};

const resetCategoryProgress = (achievementId: string, category: string) => {
  const achievement = achievements.value.find((a) => a.id === achievementId);
  if (!achievement) return;

  const categoryRequirements = achievement.requirements.filter(
    (req) => req.category === category
  );
  const categoryIds = categoryRequirements.map((req) => req.id);

  const currentCompleted = state.completedRequirements[achievementId] || {};
  const updatedCompleted = Object.fromEntries(
    Object.entries(currentCompleted).map(([cycle, completed]) => [
      cycle,
      completed.filter((id) => !categoryIds.includes(id)),
    ])
  );

  setState({
    completedRequirements: {
      ...state.completedRequirements,
      [achievementId]: updatedCompleted,
    },
  });
};

const getAchievementProgressData = (achievement: Achievement) => {
  const currentCycle = getCurrentCycle(achievement.id);
  const completedUpToCycle = getCompletedUpToCycle(
    achievement.id,
    currentCycle
  );
  return getAchievementProgress(achievement.id, completedUpToCycle);
};

// Update getCategoryProgress to show cumulative progress up to and including the current cycle
const getCategoryProgress = (achievement: Achievement, category: string) => {
  const categoryRequirements = achievement.requirements.filter(
    (req) => req.category === category
  );
  const currentCycle = getCurrentCycle(achievement.id);
  const completedUpToCycle = getCompletedUpToCycle(
    achievement.id,
    currentCycle
  );
  const categoryCompleted = categoryRequirements.filter((req) =>
    completedUpToCycle.includes(req.id)
  );

  return {
    completed: categoryCompleted.length,
    total: categoryRequirements.length,
    percentage:
      categoryRequirements.length > 0
        ? Math.round(
            (categoryCompleted.length / categoryRequirements.length) * 100
          )
        : 0,
  };
};

// Update getCategoryTotalCost to only sum costs for requirements remaining in the current cycle
const getCategoryTotalCost = (achievement: Achievement, category: string) => {
  // Only consider requirements for the current cycle (not completed in previous cycles)
  const requirements = getRequirementsForCurrentCycle(achievement, category);

  let totalCost = 0;
  let hasCostRange = false;
  let minCost = 0;
  let maxCost = 0;

  requirements.forEach((req) => {
    const cost = req.price || req.cost;

    if (typeof cost === "number") {
      totalCost += cost;
      minCost += cost;
      maxCost += cost;
    } else if (typeof cost === "object" && cost !== null) {
      // Handle cost object with multiple sources
      const costs = Object.values(cost).filter(
        (val) => typeof val === "number"
      );
      if (costs.length > 0) {
        const min = Math.min(...costs);
        const max = Math.max(...costs);
        minCost += min;
        maxCost += max;
        totalCost += min; // Use minimum for total display
        hasCostRange = true;
      }
    }
  });

  return {
    total: totalCost,
    min: minCost,
    max: maxCost,
    hasRange: hasCostRange,
    display: hasCostRange
      ? `${minCost.toLocaleString()} - ${maxCost.toLocaleString()}`
      : totalCost.toLocaleString(),
  };
};

const isRequirementCompleted = (
  achievementId: string,
  requirementId: string
) => {
  const currentCycle = getCurrentCycle(achievementId);
  const completedForCycle =
    (state.completedRequirements[achievementId] || {})[currentCycle] ?? [];
  return completedForCycle.includes(requirementId);
};

const toggleRequirementCompleted = (
  achievementId: string,
  requirementId: string,
  checked: boolean
) => {
  const currentCycle = getCurrentCycle(achievementId);
  const prev =
    (state.completedRequirements[achievementId] || {})[currentCycle] ?? [];
  let updated: string[];
  if (checked) {
    updated = [...new Set([...prev, requirementId])];
  } else {
    updated = prev.filter((id) => id !== requirementId);
  }
  setState({
    completedRequirements: {
      ...state.completedRequirements,
      [achievementId]: {
        ...(state.completedRequirements[achievementId] ?? {}),
        [currentCycle]: updated,
      },
    },
  });
};

const getRequirementCategories = (achievement: Achievement) => {
  const categories = new Set(
    achievement.requirements.map((req) => req.category)
  );
  return Array.from(categories).sort();
};

const getRequirementsByCategory = (
  achievement: Achievement,
  category: string
) => {
  return achievement.requirements.filter((req) => req.category === category);
};

const formatLocation = (location: string | string[]) => {
  if (Array.isArray(location)) {
    return location.join(" OR ");
  }
  return location;
};

const getCategoryDisplayName = (category: string) => {
  const displayNames: Record<string, string> = {
    boss: "Boss Weapons",
    loot: "Loot",
    covenant: "Covenant Weapons",
    tail: "Tail Cutoffs",
    drop: "Enemy Drops",
    purchase: "Purchase",
    quest: "Quest Rewards",
    miracles: "Quest Rewards",
  };
  return (
    displayNames[category] ||
    category.charAt(0).toUpperCase() + category.slice(1)
  );
};

const formatAscendsFrom = (ascendsFrom: string[] | undefined) => {
  if (!ascendsFrom || ascendsFrom.length === 0) return null;
  return ascendsFrom.join(", ");
};

const hasQuestRequirements = (achievement: Achievement, category: string) => {
  const categoryRequirements = achievement.requirements.filter(
    (req) => req.category === category
  );
  return categoryRequirements.some((req) => req.quest || req.logansQuest);
};

const getQuestProgressionNote = (
  achievement: Achievement,
  category: string
) => {
  const categoryRequirements = achievement.requirements.filter(
    (req) => req.category === category
  );

  const questRequirements = categoryRequirements.filter(
    (req) => req.quest || req.logansQuest
  );

  if (questRequirements.length === 0) return null;

  // Use the questNPC from the achievement if available
  if (achievement.questNPC) {
    return `Note: Spells must be purchased from ${achievement.questNPC} to advance their questline.`;
  }

  // Fallback to location-based note if no questNPC is specified
  const locations = new Set<string>();
  questRequirements.forEach((req) => {
    if (req.location) {
      if (Array.isArray(req.location)) {
        req.location.forEach((loc) => locations.add(loc));
      } else {
        locations.add(req.location);
      }
    }
  });

  const locationList = Array.from(locations);

  if (locationList.length === 0) return null;

  return `Note: Quest progression requirements must be purchased from: ${locationList.join(", ")}`;
};

// Cycle navigation helpers
const getCurrentCycle = (achievementId: string) => {
  return state.currentCycle[achievementId] ?? 0;
};

const setCurrentCycle = (achievementId: string, cycle: number) => {
  setState({
    currentCycle: {
      ...state.currentCycle,
      [achievementId]: cycle,
    },
  });
};

const goToNextCycle = (achievementId: string) => {
  setCurrentCycle(achievementId, getCurrentCycle(achievementId) + 1);
};

const goToPreviousCycle = (achievementId: string) => {
  const current = getCurrentCycle(achievementId);
  if (current > 0) {
    setCurrentCycle(achievementId, current - 1);
  }
};

// Helper: Get requirements for the current cycle (not completed in previous cycles)
const getRequirementsForCurrentCycle = (
  achievement: Achievement,
  category: string
) => {
  const allRequirements = achievement.requirements.filter(
    (req) => req.category === category
  );
  const achievementCompleted =
    state.completedRequirements[achievement.id] || {};
  const currentCycle = getCurrentCycle(achievement.id);
  // Gather all completed IDs from previous cycles
  let completedInPreviousCycles = new Set<string>();
  for (let i = 0; i < currentCycle; i++) {
    (achievementCompleted[i] ?? []).forEach((id) =>
      completedInPreviousCycles.add(id)
    );
  }
  // Only show requirements not completed in previous cycles
  return allRequirements.filter(
    (req) => !completedInPreviousCycles.has(req.id)
  );
};

// Helper: Get completed IDs for a specific cycle
const getCompletedForCycle = (achievementId: string, cycle: number) => {
  return state.completedRequirements[achievementId]?.[cycle] ?? [];
};

// Helper: Get all completed IDs up to and including the current cycle
const getCompletedUpToCycle = (achievementId: string, cycle: number) => {
  const completed = state.completedRequirements[achievementId] || {};
  let allCompleted: string[] = [];
  for (let i = 0; i <= cycle; i++) {
    allCompleted = allCompleted.concat(completed[i] ?? []);
  }
  return allCompleted;
};

// Helper: Is achievement fully completed across all cycles?
const isAchievementFullyCompleted = (achievement: Achievement) => {
  const completed = state.completedRequirements[achievement.id] || {};
  const allCompleted = Object.values(completed).flat();
  return (
    getAchievementProgress(achievement.id, allCompleted).percentage === 100
  );
};

// Helper: Is the current cycle fully completed for this achievement?
const isCurrentCycleCompleted = (achievement: Achievement) => {
  const currentCycle = getCurrentCycle(achievement.id);
  const completed = getCompletedForCycle(achievement.id, currentCycle);
  return getAchievementProgress(achievement.id, completed).percentage === 100;
};

// Helper: Get the highest created cycle for an achievement
const getLastCreatedCycle = (achievementId: string) => {
  const cycles = Object.keys(
    state.completedRequirements[achievementId] || {}
  ).map(Number);
  return cycles.length > 0 ? Math.max(...cycles) : 0;
};

// Update isNextCycleDisabled to also prevent creating a new cycle if the current cycle is at 100% completion, regardless of navigation
const isNextCycleDisabled = (achievement: Achievement) => {
  const currentCycle = getCurrentCycle(achievement.id);
  const lastCreatedCycle = getLastCreatedCycle(achievement.id);
  // Only disable if on the last created cycle AND it is 100% complete
  return (
    currentCycle === lastCreatedCycle && isCurrentCycleCompleted(achievement)
  );
};
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <div
      class="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between"
    >
      <h1 class="text-2xl font-bold">Achievement Tracker</h1>
      <UInput
        v-model="state.search"
        placeholder="Search achievements..."
        class="w-full sm:w-64"
      />
      <UButton @click="resetAllProgress" variant="outline" size="sm">
        Reset All Progress
      </UButton>
    </div>

    <div class="space-y-6">
      <div
        v-for="achievement in filteredAchievements"
        :key="achievement.id"
        :class="[
          'relative rounded-2xl p-0 shadow-md transition-all duration-200 bg-white dark:bg-gray-900',
          // Only apply lifting effect if not expanded
          !state.expandedAchievementIds.includes(achievement.id)
            ? 'hover:scale-[1.01] focus-within:scale-[1.01]'
            : '',
          // Apply left border using theme system
          achievementThemes[achievement.id]?.border || 'border-l-blue-500',
        ]"
        style="min-height: 80px; border-left-width: 6px"
      >
        <!-- Card content -->
        <div
          class="flex items-center justify-between px-6 py-4 cursor-pointer select-none group relative"
          @click="expandAchievement(achievement.id)"
        >
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <div class="min-w-0 flex-1">
              <span
                class="font-semibold text-lg text-gray-900 dark:text-white truncate block"
              >
                {{ achievement.name }}
              </span>
              <span
                class="text-sm text-gray-600 dark:text-gray-400 truncate block"
              >
                {{ achievement.description }}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="state.expandedAchievementIds.includes(achievement.id)"
              >[-]</span
            >
            <span v-else>[+]</span>
          </div>
          <!-- Reset button, only visible when expanded -->
          <UButton
            v-if="state.expandedAchievementIds.includes(achievement.id)"
            @click.stop="resetAchievementProgress(achievement.id)"
            size="xs"
            color="warning"
            variant="soft"
            class="ml-2 z-20"
            :aria-label="'Reset Progress'"
            v-tooltip="'Reset Progress'"
            style="padding: 0.25rem; min-width: 1.75rem; min-height: 1.75rem"
          >
            <Icon name="i-heroicons-arrow-path" class="w-4 h-4" />
          </UButton>
        </div>

        <div
          v-if="state.expandedAchievementIds.includes(achievement.id)"
          class="px-6 pb-6 pt-0 space-y-4 pt-6"
          style="padding-top: 2.5rem"
        >
          <!-- Cycle Navigation and Badge -->
          <div class="flex items-center gap-4 mb-4">
            <UButton
              @click.stop="goToPreviousCycle(achievement.id)"
              size="sm"
              variant="outline"
              :disabled="getCurrentCycle(achievement.id) === 0"
            >
              Previous Cycle
            </UButton>
            <span
              class="text-sm font-semibold px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
            >
              {{
                getCurrentCycle(achievement.id) === 0
                  ? "New Game"
                  : `New Game +${getCurrentCycle(achievement.id)}`
              }}
            </span>
            <UButton
              @click.stop="goToNextCycle(achievement.id)"
              size="sm"
              variant="outline"
              :disabled="isNextCycleDisabled(achievement)"
            >
              Next Cycle
            </UButton>
          </div>
          <!-- Main Progress Summary -->
          <SummaryCard
            :label="'Achievement Progress'"
            :value="
              getAchievementProgressData(achievement).completed +
              '/' +
              getAchievementProgressData(achievement).total
            "
            :subtitle="achievement.description"
            :icon="achievement.icon"
            :theme="achievementThemes[achievement.id]"
          />

          <!-- Main progress bar -->
          <div
            class="w-full h-3 rounded bg-gray-200 dark:bg-gray-800 mb-2 overflow-hidden"
          >
            <div
              class="h-3 rounded transition-all duration-300"
              :class="
                achievementThemes[achievement.id]?.iconBg || 'bg-blue-500'
              "
              :style="{
                width: getAchievementProgressData(achievement).percentage + '%',
              }"
            ></div>
          </div>

          <!-- Category Groups -->
          <div class="space-y-6">
            <div
              v-for="category in getRequirementCategories(achievement)"
              :key="category"
              class="space-y-3"
            >
              <!-- Category Header with Progress -->
              <div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <button
                      @click="toggleCategory(achievement.id, category)"
                      class="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors"
                    >
                      <Icon
                        :name="
                          isCategoryExpanded(achievement.id, category)
                            ? 'i-heroicons-chevron-down'
                            : 'i-heroicons-chevron-right'
                        "
                        class="w-4 h-4 text-gray-600 dark:text-gray-400"
                      />
                      <h4
                        class="text-lg font-semibold text-gray-900 dark:text-white"
                      >
                        {{ getCategoryDisplayName(category) }}
                      </h4>
                      <span class="text-sm text-gray-600 dark:text-gray-400">
                        ({{
                          getCategoryProgress(achievement, category).completed
                        }}/{{
                          getCategoryProgress(achievement, category).total
                        }})
                      </span>
                    </button>
                  </div>
                  <UButton
                    @click="resetCategoryProgress(achievement.id, category)"
                    size="sm"
                    color="warning"
                    variant="solid"
                    class="text-xs font-medium"
                  >
                    Reset Category
                  </UButton>
                </div>
                <span
                  v-if="getCategoryTotalCost(achievement, category).total > 0"
                  class="inline-block mt-2 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded"
                >
                  Total:
                  {{ getCategoryTotalCost(achievement, category).display }}
                  Souls
                </span>
              </div>

              <!-- Category Progress Bar -->
              <div
                class="w-full h-2 rounded bg-gray-200 dark:bg-gray-800 overflow-hidden"
              >
                <div
                  class="h-2 rounded transition-all duration-300"
                  :class="
                    achievementThemes[achievement.id]?.iconBg || 'bg-blue-500'
                  "
                  :style="{
                    width:
                      getCategoryProgress(achievement, category).percentage +
                      '%',
                  }"
                ></div>
              </div>

              <!-- Requirements in this category (collapsible) -->
              <div
                v-if="isCategoryExpanded(achievement.id, category)"
                class="space-y-3"
              >
                <!-- Quest Progression Note -->
                <div
                  v-if="getQuestProgressionNote(achievement, category)"
                  class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3"
                >
                  <div class="flex items-start gap-2">
                    <Icon
                      name="i-heroicons-information-circle"
                      class="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0"
                    />
                    <p class="text-sm text-indigo-800 dark:text-indigo-200">
                      {{ getQuestProgressionNote(achievement, category) }}
                    </p>
                  </div>
                </div>
                <div
                  v-for="requirement in getRequirementsForCurrentCycle(
                    achievement,
                    category
                  )"
                  :key="requirement.id"
                  class="flex items-start gap-3 rounded-xl p-3 transition-all bg-white/80 dark:bg-gray-900/80 shadow-sm hover:bg-white/90 dark:hover:bg-gray-900/90 group"
                >
                  <!-- Checkbox on the far left -->
                  <div class="flex items-center mt-2 mr-2 z-10">
                    <CheckboxField
                      :id="achievement.id + '-' + requirement.id"
                      :label="''"
                      :model-value="
                        isRequirementCompleted(achievement.id, requirement.id)
                      "
                      @update:model-value="
                        (checked) =>
                          toggleRequirementCompleted(
                            achievement.id,
                            requirement.id,
                            checked
                          )
                      "
                      size="lg"
                      :class="
                        isRequirementCompleted(achievement.id, requirement.id)
                          ? 'ring-2 ring-green-500 border-green-500'
                          : 'ring-2 ring-gray-300'
                      "
                    />
                  </div>

                  <!-- Requirement details -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <div class="flex-1 min-w-0">
                        <h5
                          class="font-medium text-gray-900 dark:text-white mb-1 flex items-center gap-2"
                        >
                          {{ requirement.name ?? "" }}
                          <!-- NG+ badge and info icon with tooltip -->
                          <template
                            v-if="
                              requirement.newGamePlus !== undefined &&
                              requirement.newGamePlus > 0
                            "
                          >
                            <span
                              class="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-2 py-1 rounded font-semibold ml-2"
                              style="display: inline-block"
                            >
                              NG+{{ requirement.newGamePlus }}
                            </span>
                            <SmartTooltip placement="top">
                              <template #trigger>
                                <Icon
                                  name="i-heroicons-information-circle"
                                  class="w-4 h-4 text-orange-500 dark:text-orange-300 ml-1 cursor-pointer align-middle"
                                  style="vertical-align: middle"
                                />
                              </template>
                              NG+{{ requirement.newGamePlus }} is required as
                              this soul can only be obtained once per cycle
                              unless another player drops it for you.
                            </SmartTooltip>
                          </template>
                        </h5>

                        <!-- AscendsFrom information for boss weapons -->
                        <div
                          v-if="
                            requirement.ascendsFrom &&
                            requirement.ascendsFrom.length > 0
                          "
                          class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2"
                        >
                          <Icon
                            name="i-heroicons-arrow-up"
                            class="w-4 h-4 flex-shrink-0 mt-0.5"
                          />
                          <div class="flex-1 min-w-0">
                            <div class="flex flex-wrap items-center gap-2 mt-1">
                              <span class="font-medium">Ascends from:</span>
                              <span
                                v-for="weapon in requirement.ascendsFrom ?? []"
                                :key="weapon"
                                class="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-xs font-medium"
                              >
                                +10 {{ weapon }}
                              </span>
                            </div>
                          </div>
                        </div>

                        <!-- Location information -->
                        <div
                          v-if="requirement.location"
                          class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2"
                        >
                          <Icon
                            name="i-heroicons-map"
                            class="w-4 h-4 flex-shrink-0 mt-0.5"
                          />
                          <div class="flex-1 min-w-0">
                            <span class="block break-words">
                              {{ formatLocation(requirement.location ?? "") }}
                            </span>
                          </div>
                        </div>

                        <!-- Additional details -->
                        <div class="flex flex-wrap gap-2">
                          <span
                            v-if="requirement.dropRate"
                            class="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded"
                          >
                            Drop rate: {{ requirement.dropRate }}
                          </span>
                          <span
                            v-if="
                              (requirement.price || requirement.cost) &&
                              category === 'purchase'
                            "
                            class="block sm:inline text-xs mt-1 sm:mt-0 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 font-semibold px-2 py-1 rounded"
                          >
                            <template
                              v-if="
                                typeof (
                                  requirement.price || requirement.cost
                                ) === 'object' &&
                                (requirement.price || requirement.cost)
                              "
                            >
                              {{
                                Math.min(
                                  ...Object.values(
                                    (requirement.price || requirement.cost) ??
                                      {}
                                  ).filter(
                                    (v): v is number => typeof v === "number"
                                  )
                                ).toLocaleString()
                              }}
                              -
                              {{
                                Math.max(
                                  ...Object.values(
                                    (requirement.price || requirement.cost) ??
                                      {}
                                  ).filter(
                                    (v): v is number => typeof v === "number"
                                  )
                                ).toLocaleString()
                              }}
                              Souls
                            </template>
                            <template v-else>
                              {{
                                typeof (
                                  requirement.price || requirement.cost
                                ) === "number"
                                  ? (
                                      requirement.price || requirement.cost
                                    ).toLocaleString()
                                  : ""
                              }}
                              Souls
                            </template>
                          </span>
                          <span
                            v-if="requirement.bossSoul"
                            class="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-1 rounded"
                          >
                            {{ requirement.bossSoul ?? "" }}
                          </span>
                          <span
                            v-if="requirement.tail"
                            class="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-2 py-1 rounded"
                          >
                            Tail: {{ requirement.tail ?? "" }}
                          </span>
                          <span
                            v-if="requirement.quest || requirement.logansQuest"
                            class="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded"
                          >
                            Quest Progression
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="filteredAchievements.length === 0"
        class="text-center text-gray-500 py-8"
      >
        No achievements found.
      </div>
    </div>

    <!-- Move HowToUse to the bottom -->
    <div class="mt-10">
      <HowToUse
        :theme="DEFAULT_THEME"
        :steps="[
          {
            type: 'step',
            title: 'Check off requirements',
            description:
              'Check off achievement requirements as you obtain them in your current playthrough (cycle).',
          },
          {
            type: 'step',
            title: 'Advance to next cycle',
            description:
              'When you reach a requirement that can only be obtained in a new game cycle (e.g., boss soul weapons), click Next Cycle to move to the next cycle (NG+1, NG+2, etc.).',
          },
          {
            type: 'tip',
            title: 'Progress tracking',
            description:
              'Each cycle only shows requirements you have not completed in previous cycles, but your progress bar always shows your total progress.',
          },
          {
            type: 'tip',
            title: 'Cycle navigation',
            description:
              'You can freely move back and forth between cycles to review or update your progress.',
          },
          {
            type: 'tip',
            title: 'Persistence',
            description:
              'Progress is saved automatically and will persist between visits.',
          },
          {
            type: 'tip',
            title: 'Resetting',
            description:
              'Use the Reset buttons to clear progress for an individual achievement or all achievements and cycles.',
          },
        ]"
      />
    </div>
  </div>
</template>
