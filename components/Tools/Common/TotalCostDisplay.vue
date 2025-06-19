<template>
  <div
    v-if="cost > 0"
    class="rounded-lg p-6 border bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/20 border-primary-200 dark:border-primary-800"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-gradient-to-br rounded-full flex items-center justify-center"
          :class="theme.bg"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            ></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">{{ label }}</p>
          <p
            class="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
            :class="theme.text"
          >
            {{ formatNumber(cost) }} {{ unit }}
          </p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-xs text-muted-foreground">{{ subtitle }}</p>
        <p class="text-sm font-medium text-muted-foreground">{{ details }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { ColorTheme } from "~/types/common";

// Memoized number formatter for performance
const numberFormatter = new Intl.NumberFormat();

export default defineComponent({
  name: "TotalCostDisplay",
  props: {
    cost: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      default: "Total Cost",
    },
    unit: {
      type: String,
      default: "Souls",
    },
    subtitle: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    theme: {
      type: Object as () => ColorTheme,
      required: true,
    },
  },
  setup() {
    const formatNumber = (num: number) => numberFormatter.format(num);

    return {
      formatNumber,
    };
  },
});
</script>
