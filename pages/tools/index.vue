<script setup lang="ts">
import ToolLayout from "~/components/Tools/Common/ToolLayout.vue";
import ToolList from "~/components/Tools/Common/ToolList.vue";
import ToolFilterSidebar from "~/components/Tools/Common/ToolFilterSidebar.vue";
import { useToolFilters } from "~/composables/useToolFilters";
import { getRandomTheme } from "~/utils/constants";

const selectedTheme = getRandomTheme();
const {
  filters,
  availableGames,
  availableCategories,
  updateFilters,
  clearFilters,
} = useToolFilters();
</script>

<template>
  <ToolLayout>
    <template #hero>
      <div class="flex justify-center mb-8 px-4">
        <div class="flex flex-col items-center gap-3 text-center">
          <div
            class="from-purple-400 to-pink-500 inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br rounded-full flex-shrink-0"
          >
            <span
              class="iconify i-game-icons:sword-wound w-6 h-6 text-white"
              aria-hidden="true"
            ></span>
          </div>
          <div class="flex flex-col items-center justify-center min-w-0">
            <h1
              class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1 text-center text-gray-900 dark:text-white drop-shadow-sm"
            >
              Souls Tools
            </h1>
            <p
              class="text-base sm:text-lg text-center text-gray-700 dark:text-white/80 drop-shadow-sm"
            >
              Essential tools for your Souls playthrough
            </p>
          </div>
        </div>
      </div>
    </template>
    <template #sidebar>
      <ToolFilterSidebar
        :filters="filters"
        :available-games="availableGames"
        :available-categories="availableCategories"
        @update:filters="updateFilters"
        @clear="clearFilters"
      />
    </template>
    <ToolList />
  </ToolLayout>
</template>
