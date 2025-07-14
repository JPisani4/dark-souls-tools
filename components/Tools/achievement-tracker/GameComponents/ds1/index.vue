<script setup lang="ts">
import { useAchievementTracker } from "~/composables/achievementTracker/useAchievementTracker";
import AchievementCard from "~/components/Tools/achievement-tracker/GameComponents/Common/AchievementCard.vue";
import CategorySection from "~/components/Tools/achievement-tracker/GameComponents/Common/CategorySection.vue";
import RequirementItem from "~/components/Tools/achievement-tracker/GameComponents/Common/RequirementItem.vue";
import ResetButton from "~/components/Tools/Common/ResetButton.vue";
import { getCategoryDisplayName } from "~/utils/achievementTracker/achievementUtils";
import HowToUse from "~/components/Tools/Common/HowToUse.vue";
import { getRandomTheme } from "~/utils/themes/colorSystem";
import steps from "~/components/Tools/achievement-tracker/GameComponents/Common/achievementHowToSteps";
import { useToolLayout } from "~/composables/useToolLayout";
import tools from "~/tools";

const theme = getRandomTheme();

// SEO/meta/layout support
const achievementTrackerTool = tools.find(
  (t) => t.slug === "achievement-tracker"
);
useToolLayout({
  title: achievementTrackerTool?.config?.title || "Achievement Tracker",
  description:
    achievementTrackerTool?.config?.description ||
    "Tracks your achievement progress through game cycles.",
  iconPath: achievementTrackerTool?.config?.icon,
  tool: achievementTrackerTool,
});

const {
  state,
  setState,
  reset,
  achievements,
  filteredAchievements,
  achievementThemes,
  expandAchievement,
  toggleCategory,
  isCategoryExpanded,
  resetAllProgress,
  resetAchievementProgress,
  resetCategoryProgress,
  getAchievementProgressData,
  getCategoryProgress,
  isRequirementCompleted,
  toggleRequirementCompleted,
  getRequirementCategories,
  getRequirementsByCategory,
  getCurrentCycle,
  goToNextCycle,
  goToPreviousCycle,
  getRequirementsForCurrentCycle,
  isNextCycleDisabled,
} = useAchievementTracker();

const handleSearch = (e: Event) => {
  setState({ search: (e.target as HTMLInputElement).value });
};
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <!-- Search and Reset Section -->
    <div
      class="mb-6 flex flex-row flex-wrap gap-2 items-center justify-between"
    >
      <div class="relative flex-1 min-w-0">
        <label for="achievement-search" class="sr-only"
          >Search achievements</label
        >
        <input
          id="achievement-search"
          type="text"
          placeholder="Search achievements..."
          class="w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors px-2.5 py-1.5 text-sm gap-1.5 text-highlighted bg-default ring ring-inset ring-accented focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          autocomplete="off"
          :value="state.search"
          @input="handleSearch"
          aria-describedby="search-results-announcement"
        />
        <div
          id="search-results-announcement"
          class="sr-only"
          aria-live="polite"
        >
          {{ filteredAchievements.length }} achievements found
        </div>
      </div>
      <div class="ml-2 flex-shrink-0">
        <ResetButton
          @click="resetAllProgress"
          aria-label="Reset all achievement progress"
        />
      </div>
    </div>

    <!-- Achievements List -->
    <div
      class="space-y-6"
      role="region"
      aria-label="Achievement list"
      aria-live="polite"
    >
      <AchievementCard
        v-for="achievement in filteredAchievements"
        :key="achievement.id"
        :achievement="achievement"
        :expanded="state.expandedAchievementIds.includes(achievement.id)"
        :borderColor="
          achievementThemes[achievement.id]?.border?.split('-')[1] || 'blue'
        "
        :progress="getAchievementProgressData(achievement)"
        :cycle="getCurrentCycle(achievement.id)"
        @toggle-expand="() => expandAchievement(achievement.id)"
        @reset="() => resetAchievementProgress(achievement.id)"
        @prev-cycle="() => goToPreviousCycle(achievement.id)"
        @next-cycle="() => goToNextCycle(achievement.id)"
      >
        <template #default>
          <div
            v-for="category in getRequirementCategories(achievement)"
            :key="category"
          >
            <CategorySection
              :category="category"
              :displayName="getCategoryDisplayName(category)"
              :progress="getCategoryProgress(achievement, category)"
              :expanded="isCategoryExpanded(achievement.id, category)"
              :requirements="
                getRequirementsForCurrentCycle(achievement, category)
              "
              :achievement="achievement"
              @toggle-expand="() => toggleCategory(achievement.id, category)"
              @reset="() => resetCategoryProgress(achievement.id, category)"
            >
              <template #default>
                <div
                  v-for="req in getRequirementsForCurrentCycle(
                    achievement,
                    category
                  )"
                  :key="req.id"
                >
                  <RequirementItem
                    :requirement="req"
                    :checked="isRequirementCompleted(achievement.id, req.id)"
                    @toggle="
                      () =>
                        toggleRequirementCompleted(
                          achievement.id,
                          req.id,
                          !isRequirementCompleted(achievement.id, req.id)
                        )
                    "
                  />
                </div>
              </template>
            </CategorySection>
          </div>
        </template>
      </AchievementCard>
    </div>

    <!-- Empty State -->
    <div
      v-if="filteredAchievements.length === 0"
      class="text-center py-12"
      role="status"
      aria-live="polite"
    >
      <Icon
        name="i-heroicons-trophy"
        class="w-12 h-12 text-gray-400 mx-auto mb-4"
        aria-hidden="true"
      />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No achievements found
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        {{
          state.search
            ? "Try adjusting your search terms."
            : "No achievements available."
        }}
      </p>
    </div>

    <!-- How to Use Section -->
    <div class="mt-10">
      <HowToUse :steps="steps" :theme="theme" />
    </div>
  </div>
</template>
