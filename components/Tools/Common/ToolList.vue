<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { THEME_COLORS } from "~/utils/themes/colorSystem";
import { useToolFilters } from "~/composables/useToolFilters";
import type { Tool } from "~/types/tools/tool";
import type { FilterState } from "~/composables/useToolFilters";
import type { GameId } from "~/types/game";
import ToolChips from "../../Common/ToolChips.vue";
import Icon from "~/components/Common/Icon.vue";
import { useRoute } from "vue-router";
import SelectField from "./forms/SelectField.vue";
import { useMediaQuery } from "@vueuse/core";

const {
  filters,
  filteredTools,
  availableGames,
  availableCategories,
  activeFilterCount,
  updateFilters,
  clearFilters,
} = useToolFilters();

const searchInput = ref(filters.value.search || "");
watch(searchInput, (val) => {
  updateFilters({ ...filters.value, search: val });
});

const isDesktop = useMediaQuery("(min-width: 768px)");

const handleGameChange = (value: string) => {
  updateFilters({ ...filters.value, game: value });
};
const handleCategoryChange = (value: string) => {
  updateFilters({ ...filters.value, category: value });
};
const handleClear = () => {
  clearFilters();
  searchInput.value = "";
};

// Generate a random color/gradient for each tool card on every refresh
const gradients = [
  "from-blue-100 to-blue-200 dark:from-blue-900 dark:to-gray-900",
  "from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-gray-900",
  "from-pink-100 to-pink-200 dark:from-pink-900 dark:to-gray-900",
  "from-purple-100 to-purple-200 dark:from-purple-900 dark:to-gray-900",
  "from-orange-100 to-orange-200 dark:from-orange-900 dark:to-gray-900",
  "from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-gray-900",
  "from-teal-100 to-teal-200 dark:from-teal-900 dark:to-gray-900",
  "from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800",
];
function getRandomGradients(count: number) {
  const shuffled = [...gradients].sort(() => Math.random() - 0.5);
  return Array.from(
    { length: count },
    (_, i) => shuffled[i % gradients.length]
  );
}
const toolGradients = ref(getRandomGradients(filteredTools.value.length));
watch(filteredTools, (tools) => {
  toolGradients.value = getRandomGradients(tools.length);
});

const route = useRoute();
const currentGameFilter = computed(() => route.query.game as string);
const handleToolClick = (tool: Tool) => {
  const availableGames = tool.gameCategories;
  const currentFilter = currentGameFilter.value;
  if (availableGames.length === 1) {
    navigateTo(`/tools/${availableGames[0]}/${tool.slug}`);
    return;
  }
  if (currentFilter && availableGames.includes(currentFilter as GameId)) {
    navigateTo(`/tools/${currentFilter}/${tool.slug}`);
    return;
  }
  navigateTo(`/tools/${availableGames[0]}/${tool.slug}`);
};

const handleKeyDown = (e: KeyboardEvent, tool: Tool) => {
  if (e.key === "Enter" || e.key === " ") {
    handleToolClick(tool);
  }
};

// Add hoveredIndex state and getHoverShadow function
const hoveredIndex = ref<number | null>(null);
function getHoverShadow(gradient: string | undefined) {
  if (!gradient) return "0 8px 32px 0 rgba(30,41,59,0.18)"; // fallback
  if (gradient.includes("blue")) return "0 8px 32px 0 rgba(59,130,246,0.25)";
  if (gradient.includes("emerald")) return "0 8px 32px 0 rgba(16,185,129,0.22)";
  if (gradient.includes("pink")) return "0 8px 32px 0 rgba(236,72,153,0.22)";
  if (gradient.includes("purple")) return "0 8px 32px 0 rgba(139,92,246,0.22)";
  if (gradient.includes("orange")) return "0 8px 32px 0 rgba(251,146,60,0.22)";
  if (gradient.includes("yellow")) return "0 8px 32px 0 rgba(250,204,21,0.22)";
  if (gradient.includes("teal")) return "0 8px 32px 0 rgba(20,184,166,0.22)";
  return "0 8px 32px 0 rgba(30,41,59,0.18)"; // slate/gray fallback
}
</script>

<template>
  <section class="py-8">
    <!-- Persistent Filter/Search Bar -->
    <div
      class="w-full max-w-4xl mx-auto mb-8 flex flex-col md:flex-row md:items-end gap-4 px-2"
    >
      <div class="flex-1 flex flex-col gap-2">
        <label for="search" class="sr-only">Search tools</label>
        <div class="relative">
          <input
            id="search"
            v-model="searchInput"
            type="search"
            placeholder="Search tools..."
            class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 pr-10 text-base focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            autocomplete="off"
            aria-label="Search tools"
          />
          <Icon
            name="i-heroicons-magnifying-glass"
            class="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
      <div class="flex gap-2 flex-wrap w-full md:w-auto items-end">
        <SelectField
          id="game-select"
          :model-value="filters.game"
          :options="availableGames.map((g) => ({ label: g.name, value: g.id }))"
          @update:model-value="handleGameChange"
          label="Filter by Game"
          class="min-w-[120px]"
        />
        <SelectField
          id="category-select"
          :model-value="filters.category"
          :options="
            availableCategories.map((c) => ({ label: c.name, value: c.id }))
          "
          @update:model-value="handleCategoryChange"
          label="Filter by Category"
          class="min-w-[120px]"
        />
        <template v-if="activeFilterCount > 0">
          <label class="sr-only">&nbsp;</label>
          <button
            @click="handleClear"
            class="border border-red-300 dark:border-red-700 bg-white dark:bg-gray-900 px-1 py-0 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 focus:ring-2 focus:ring-red-500 focus:outline-none transition flex items-center gap-0 leading-none h-6 min-h-0 rounded"
            style="line-height: 1; min-height: 0; height: 1.5rem"
            aria-label="Clear all filters"
          >
            <Icon
              name="i-heroicons-x-mark"
              class="w-3 h-3 inline align-middle"
            />
            <span class="pl-0.5">Clear</span>
          </button>
        </template>
      </div>
    </div>

    <!-- Tools List/Grid -->
    <section
      class="w-full max-w-4xl mx-auto"
      aria-labelledby="available-tools-title"
    >
      <h2 id="available-tools-title" class="sr-only">Available Tools</h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        role="region"
        aria-label="Available tools"
      >
        <a
          v-for="(tool, i) in filteredTools"
          :key="tool.slug"
          :href="
            availableGames.length === 1
              ? `/tools/${tool.gameCategories[0]}/${tool.slug}`
              : `/tools/${tool.gameCategories[0]}/${tool.slug}`
          "
          role="article"
          tabindex="0"
          class="tool-card group flex flex-col items-center rounded-2xl shadow-md p-3 transition-all duration-150 hover:-translate-y-1 focus:-translate-y-1 cursor-pointer outline-none focus:ring-2 focus:ring-primary-500 min-h-[220px] bg-gradient-to-br"
          :class="toolGradients[i]"
          :style="{
            boxShadow: `0 2px 8px 0 rgba(0,0,0,0.08), 0 1.5px 6px 0 rgba(0,0,0,0.04)`,
            '--hover-shadow': getHoverShadow(toolGradients[i]),
          }"
          @mouseenter="hoveredIndex = i"
          @mouseleave="hoveredIndex = null"
          @focus="hoveredIndex = i"
          @blur="hoveredIndex = null"
          :aria-label="`Open ${tool.title}`"
        >
          <!-- Icon/Image -->
          <div
            class="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 shadow mb-2 mt-1"
          >
            <NuxtImg
              v-if="tool.icon && /\.(png|jpe?g|gif|svg|webp)$/i.test(tool.icon)"
              :src="tool.icon.replace(/^public\//, '/')"
              :alt="tool.title + ' icon'"
              class="w-10 h-10 object-contain rounded-full"
              format="webp"
              loading="lazy"
              decoding="async"
              width="40"
              height="40"
            />
            <Icon
              v-else
              :name="tool.icon || 'i-heroicons-sparkles'"
              class="w-10 h-10 text-primary"
              aria-hidden="true"
            />
          </div>
          <div class="flex flex-col items-center gap-1 w-full">
            <span
              class="text-lg font-semibold text-gray-900 dark:text-white text-center truncate w-full"
              >{{ tool.title }}</span
            >
            <span class="flex flex-row gap-2 justify-center w-full">
              <span
                class="inline-block text-xs rounded-full px-2 py-0.5 bg-primary/10 text-primary font-medium max-w-[110px] truncate"
                >{{ tool.gameCategories[0] }}</span
              >
              <span
                v-if="tool.category"
                class="inline-block text-xs rounded-full px-2 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium max-w-[110px] truncate"
                >{{ tool.category }}</span
              >
            </span>
            <span
              class="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-1 max-w-full overflow-hidden"
              >{{ tool.description }}</span
            >
          </div>
        </a>
      </div>
    </section>

    <!-- Empty State -->
    <div
      v-if="filteredTools.length === 0"
      class="w-full max-w-2xl mx-auto text-center py-16"
    >
      <Icon
        name="i-heroicons-magnifying-glass"
        class="w-20 h-20 text-gray-400 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No tools found
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        Try adjusting your filters or search terms.
      </p>
      <button
        @click="handleClear"
        class="rounded-lg border border-primary-300 dark:border-primary-700 bg-white dark:bg-gray-900 px-4 py-2 text-base text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900 focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
        aria-label="Clear all filters"
      >
        Clear all filters
      </button>
    </div>
  </section>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.tool-card:hover,
.tool-card:focus {
  box-shadow:
    var(--hover-shadow),
    0 2px 8px 0 rgba(0, 0, 0, 0.08),
    0 1.5px 6px 0 rgba(0, 0, 0, 0.04) !important;
}
</style>
