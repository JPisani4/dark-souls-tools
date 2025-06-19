<script lang="ts" setup>
import { ref } from "vue";
import { formatNumber } from "~/utils/formatters";
import type { GroupedStep, Step } from "~/types/upgradeSummary";
import { ICONS } from "~/utils/constants";

interface Props {
  groupedSteps: GroupedStep[];
  steps: Step[];
  theme?: any;
  iconPath?: string;
}

const props = defineProps<Props>();
const showDetailedSteps = ref(false);
</script>

<template>
  <UCard
    class="w-full max-w-2xl mx-auto text-center py-8 px-6 text-2xl border-l-4 border-l-blue-500"
  >
    <template #header>
      <h3 class="font-semibold flex items-center gap-2">
        <svg
          :class="`w-6 h-6 ${props.theme?.icon}`"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            :d="props.iconPath || ICONS.ARROW_TRENDING_UP"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
        Upgrade Steps
      </h3>
    </template>

    <!-- Summary View -->
    <div class="space-y-3 mb-4">
      <StepItem
        v-for="(group, groupIndex) in props.groupedSteps"
        :key="groupIndex"
        :step="group"
        :index="groupIndex"
        :show-materials="true"
        variant="summary"
      />
    </div>

    <!-- Detailed Steps (Collapsible) -->
    <div class="mt-4">
      <UButton
        color="info"
        variant="ghost"
        size="sm"
        class="w-full justify-start"
        @click="showDetailedSteps = !showDetailedSteps"
      >
        <UIcon
          :name="
            showDetailedSteps
              ? 'i-heroicons-chevron-up'
              : 'i-heroicons-chevron-down'
          "
          class="mr-2"
        />
        {{ showDetailedSteps ? "Hide" : "Show" }} detailed step-by-step
        breakdown
      </UButton>

      <div
        v-if="showDetailedSteps"
        class="mt-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-700 pl-4"
      >
        <StepItem
          v-for="(step, index) in props.steps"
          :key="index"
          :step="step"
          :index="index"
          :show-materials="true"
          variant="detailed"
        />
      </div>
    </div>
  </UCard>
</template>
