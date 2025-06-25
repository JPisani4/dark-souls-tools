<template>
  <div class="space-y-4">
    <div v-if="results.length === 0" class="text-center py-8">
      <Icon
        name="i-heroicons-user-group"
        class="w-12 h-12 text-gray-400 mx-auto mb-4"
      />
      <p class="text-gray-500 dark:text-gray-400">
        No starting class data available
      </p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Class Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Soul Level
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <tr
            v-for="(result, index) in results"
            :key="`${result.character.class}-${index}`"
            class="hover:bg-gray-50 dark:hover:bg-gray-800"
            :class="{
              'bg-green-50 dark:bg-green-900/20': index === 0,
            }"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ result.character.name }}
                </span>
                <Icon
                  v-if="index === 0"
                  name="i-heroicons-star"
                  :class="`w-4 h-4 ml-2 ${starColorClass}`"
                />
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm font-medium text-gray-900 dark:text-white">
                {{ result.soulLevelNeeded }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StartingClassResult } from "~/composables/useStartingClassOptimizer";
import { computed } from "vue";
import { getRandomTheme } from "~/utils/themes/colorSystem";
import Icon from "~/components/Common/Icon.vue";

interface Props {
  results: StartingClassResult[];
}

const props = defineProps<Props>();

// Generate theme color for the star icon
const starColorClass = computed(() => {
  const theme = getRandomTheme();
  if (theme.icon.includes("blue")) return "text-blue-600 dark:text-blue-400";
  if (theme.icon.includes("green")) return "text-green-600 dark:text-green-400";
  if (theme.icon.includes("orange"))
    return "text-orange-600 dark:text-orange-400";
  if (theme.icon.includes("red")) return "text-red-600 dark:text-red-400";
  return "text-primary-600 dark:text-primary-400";
});
</script>
