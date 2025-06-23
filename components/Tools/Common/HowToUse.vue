<template>
  <UCard :class="`border-l-4 ${theme.border}`">
    <template #header>
      <h2 class="text-lg font-semibold">How to Use</h2>
    </template>

    <div class="space-y-4 text-sm text-gray-600 dark:text-gray-400">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flex items-start gap-3"
      >
        <div
          class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          :class="
            step.type === 'tip'
              ? 'bg-amber-100 dark:bg-amber-900/30'
              : 'bg-blue-100 dark:bg-blue-900/30'
          "
        >
          <span
            v-if="step.type === 'step'"
            class="text-xs font-medium"
            :class="'text-blue-600 dark:text-blue-400'"
          >
            {{ index + 1 }}
          </span>
          <UIcon
            v-else-if="step.type === 'tip'"
            :name="step.icon || 'i-heroicons-light-bulb'"
            class="w-3 h-3 text-amber-600 dark:text-amber-400"
          />
        </div>
        <div>
          <p class="font-medium text-gray-900 dark:text-white mb-1">
            {{ step.title }}
          </p>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { ColorTheme } from "~/utils/themes/colorSystem";

interface Step {
  type: "step" | "tip";
  title: string;
  description: string;
  icon?: string;
}

interface Props {
  steps: Step[];
  theme: ColorTheme;
}

defineProps<Props>();
</script>
