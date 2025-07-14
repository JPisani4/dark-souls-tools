<template>
  <div
    :class="[
      'relative rounded-2xl p-0 shadow-md transition-all duration-200 bg-white dark:bg-gray-900',
      borderClass,
      'min-h-[80px] border-l-[6px] mb-6',
      !expanded &&
        'hover:scale-[1.01] focus-within:scale-[1.01] hover:bg-white/90 dark:hover:bg-gray-900/90',
    ]"
    role="article"
    :aria-labelledby="`achievement-${achievement.id}-title`"
  >
    <!-- Header: clickable for expand/collapse -->
    <button
      :id="`achievement-${achievement.id}-header`"
      class="flex items-center justify-between px-6 py-4 group relative cursor-pointer select-none w-full text-left"
      @click="$emit('toggle-expand')"
      :aria-expanded="expanded"
      :aria-controls="`achievement-${achievement.id}-content`"
      :aria-describedby="`achievement-${achievement.id}-description`"
      type="button"
    >
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <div class="min-w-0 flex-1">
          <h3
            :id="`achievement-${achievement.id}-title`"
            class="font-semibold text-lg text-gray-900 dark:text-white truncate block"
          >
            {{ achievement.name }}
          </h3>
          <p
            :id="`achievement-${achievement.id}-description`"
            class="text-sm text-gray-600 dark:text-gray-400 truncate block"
          >
            {{ achievement.description }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2 ml-2">
        <span
          class="text-sm font-medium text-gray-500 dark:text-gray-400"
          aria-hidden="true"
        >
          {{ expanded ? "[-]" : "[+]" }}
        </span>
        <span @click.stop>
          <slot name="reset">
            <ResetButton
              @click.stop="$emit('reset')"
              :aria-label="`Reset progress for ${achievement.name}`"
            />
          </slot>
        </span>
      </div>
    </button>

    <!-- Expanded content -->
    <div
      v-if="expanded"
      :id="`achievement-${achievement.id}-content`"
      role="region"
      :aria-labelledby="`achievement-${achievement.id}-title`"
    >
      <!-- Progress Card at top -->
      <div class="flex items-center justify-between gap-4 px-6 pt-2 pb-2">
        <div class="flex-1">
          <slot name="progress-card">
            <div class="flex items-center gap-3">
              <div class="flex flex-col gap-1">
                <span
                  class="text-primary-600 dark:text-primary-400 text-lg font-bold leading-tight"
                  aria-label="Progress percentage"
                >
                  {{ progress.percentage }}%
                </span>
                <span
                  class="text-gray-900 dark:text-white text-base font-semibold leading-tight"
                  aria-label="Progress count"
                >
                  {{ progress.completed }}/{{ progress.total }}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <ProgressBar
                  :value="progress.percentage"
                  color="bg-blue-500"
                  class="flex-1 min-w-0"
                  :aria-label="`Progress: ${progress.percentage}% (${progress.completed} of ${progress.total} completed)`"
                />
              </div>
            </div>
          </slot>
        </div>
      </div>

      <!-- Cycle navigation -->
      <div class="flex items-center gap-2 px-6 pb-2 mt-3">
        <UButton
          size="xs"
          variant="outline"
          @click.stop="$emit('prev-cycle')"
          class="!px-2 !py-1 text-xs"
          :aria-label="`Previous cycle for ${achievement.name}`"
        >
          Prev
        </UButton>
        <span
          class="text-xs font-semibold text-primary-600 dark:text-primary-400 px-2"
          aria-label="Current cycle"
        >
          Cycle: {{ cycle }}
        </span>
        <UButton
          size="xs"
          variant="outline"
          @click.stop="$emit('next-cycle')"
          class="!px-2 !py-1 text-xs"
          :aria-label="`Next cycle for ${achievement.name}`"
        >
          Next
        </UButton>
      </div>

      <!-- Slot for categories/requirements -->
      <div class="px-6 pb-4 mt-3">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Achievement } from "~/types/game/ds1/achievements";
import { computed } from "vue";
import ProgressBar from "~/components/Tools/Common/ProgressBar.vue";
import ResetButton from "~/components/Tools/Common/ResetButton.vue";

const props = defineProps<{
  achievement: Achievement;
  expanded: boolean;
  borderColor: string;
  progress: { completed: number; total: number; percentage: number };
  cycle: number;
}>();

const borderClass = computed(() => `border-${props.borderColor}-500`);
</script>
