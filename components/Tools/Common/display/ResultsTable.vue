<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody
        class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
      >
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
          >
            <slot :name="column.key" :row="row" :value="row[column.key]">
              {{ formatValue(row[column.key], column.format) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty state -->
    <div v-if="data.length === 0" class="text-center py-8">
      <Icon
        name="i-heroicons-table-cells"
        class="w-6 h-6 text-gray-400 mx-auto mb-4"
      />
      <p class="text-gray-500 dark:text-gray-400">{{ emptyMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";

interface Column {
  key: string;
  label: string;
  format?: "number" | "currency" | "percentage" | "text";
}

interface Props {
  columns: Column[];
  data: Record<string, any>[];
  emptyMessage?: string;
  theme?: ColorTheme;
  variant?: string;
  terminology?: {
    souls?: string;
    level?: string;
    weapon?: string;
    upgrade?: string;
    material?: string;
    [key: string]: string | undefined;
  };
}

const props = withDefaults(defineProps<Props>(), {
  emptyMessage: "No data available",
  variant: "default",
});

const safeTheme = useSafeTheme(props.theme, props.variant);

const formatValue = (value: string | number, format?: string): string => {
  if (typeof value === "string") return value;

  switch (format) {
    case "number":
      return new Intl.NumberFormat().format(value);
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    case "percentage":
      return `${value}%`;
    default:
      return String(value);
  }
};
</script>
