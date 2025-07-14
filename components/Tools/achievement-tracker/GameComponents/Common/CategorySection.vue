<template>
  <div class="mb-2">
    <!-- Header: clickable area for expand/collapse -->
    <div class="flex items-center justify-between">
      <button
        :id="`category-${achievement.id}-${category}-header`"
        class="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors flex-1 text-left"
        @click="$emit('toggle-expand')"
        type="button"
        :aria-expanded="expanded"
        :aria-controls="`category-${achievement.id}-${category}-content`"
        :aria-describedby="`category-${achievement.id}-${category}-progress`"
      >
        <Icon
          :name="
            expanded ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-right'
          "
          class="w-4 h-4 text-gray-600 dark:text-gray-400"
          aria-hidden="true"
        />
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ displayName }}
        </h4>
        <span
          :id="`category-${achievement.id}-${category}-progress`"
          class="text-sm text-gray-600 dark:text-gray-400"
          aria-label="Progress for this category"
        >
          ({{ progress.completed }}/{{ progress.total }})
        </span>
      </button>
      <ResetButton
        class="ml-2"
        @click.stop="$emit('reset')"
        :aria-label="`Reset progress for ${displayName} category`"
      />
    </div>

    <!-- Progress bar below header -->
    <div
      class="w-full h-2 rounded bg-gray-200 dark:bg-gray-800 overflow-hidden mt-2"
      role="progressbar"
      :aria-valuenow="progress.percentage"
      :aria-valuemin="0"
      :aria-valuemax="100"
      :aria-labelledby="`category-${achievement.id}-${category}-progress`"
    >
      <div
        class="h-2 rounded transition-all duration-300 bg-blue-500"
        :style="{ width: Math.min(progress.percentage, 100) + '%' }"
      ></div>
    </div>

    <!-- Slot for requirements -->
    <div
      v-if="expanded"
      :id="`category-${achievement.id}-${category}-content`"
      class="space-y-3 mt-3"
      role="region"
      :aria-labelledby="`category-${achievement.id}-${category}-header`"
    >
      <!-- Top badges/notes -->
      <div
        v-if="totalSoulCost > 0 || questNote"
        class="mb-2 flex flex-col gap-2"
      >
        <div class="flex flex-wrap gap-2 items-center">
          <span
            v-if="totalSoulCost > 0"
            class="inline-block text-xs font-semibold px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
            aria-label="Total soul cost for this category"
          >
            Total Soul Cost: {{ totalSoulCost.toLocaleString() }}
          </span>
        </div>
        <div
          v-if="questNote"
          class="text-xs text-yellow-700 dark:text-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 rounded px-2 py-1 font-medium"
          role="alert"
          aria-live="polite"
        >
          {{ questNote }}
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";
import ResetButton from "~/components/Tools/Common/ResetButton.vue";
import { computed } from "vue";
import { getQuestProgressionNote } from "~/utils/achievementTracker/achievementUtils";
import type {
  Achievement,
  AchievementRequirement,
} from "~/types/game/ds1/achievements";

const props = defineProps<{
  category: string;
  displayName: string;
  progress: { completed: number; total: number; percentage: number };
  expanded: boolean;
  requirements: AchievementRequirement[];
  achievement: Achievement;
}>();

const isPurchaseCategory = computed(() => props.category === "purchase");
const totalSoulCost = computed(() => {
  if (!isPurchaseCategory.value) return 0;
  return props.requirements.reduce((sum, req) => {
    if (typeof req.cost === "number") return sum + req.cost;
    if (typeof req.price === "number") return sum + req.price;
    if (typeof req.cost === "object" && req.cost !== null) {
      return (
        sum +
        Object.values(req.cost).reduce(
          (s, v) => s + (typeof v === "number" ? v : 0),
          0
        )
      );
    }
    return sum;
  }, 0);
});
const questNote = computed(() =>
  getQuestProgressionNote(props.achievement, props.category)
);
</script>
