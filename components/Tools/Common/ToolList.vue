<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useToolFilters } from "~/composables/useToolFilters";
import { useMediaQuery } from "@vueuse/core";
import type { Tool } from "~/types/tools/tool";
import type { FilterState } from "~/composables/useToolFilters";
import type { GameId } from "~/types/game";
import GameSelectionOverlay from "./GameSelectionOverlay.vue";
import FilterModal from "./FilterModal.vue";
import ToolChips from "../../Common/ToolChips.vue";
import { THEME_COLORS, getThemeByIndex } from "~/utils/themes/colorSystem";
import Icon from "~/components/Common/Icon.vue";

// Use the filtering composable
const {
  filters,
  filteredTools,
  availableGames,
  availableCategories,
  activeFilterCount,
  updateFilters,
  clearFilters,
} = useToolFilters();

// Detect if we're on desktop (md and up) with a default value to prevent SSR issues
const isDesktop = ref(false);
const mediaQuery = useMediaQuery("(min-width: 768px)");

// Modal state for mobile
const showFilterModal = ref(false);

// Game selection overlay state
const showGameSelection = ref(false);
const selectedTool = ref<Tool | null>(null);

// Update isDesktop when media query resolves, but don't wait for it
onMounted(() => {
  // Set initial value based on window width if available
  if (process.client && window.innerWidth >= 768) {
    isDesktop.value = true;
  }

  // Then update based on media query
  watch(
    mediaQuery,
    (value) => {
      isDesktop.value = value;
    },
    { immediate: true }
  );
});

// Prevent modal from showing during SSR/hydration
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

// Define a palette of Tailwind border, text/icon, and lighter gradient colors for both light and dark mode
const colorMap = [
  {
    border: "border-blue-500",
    text: "text-blue-700",
    iconBg: "bg-blue-500",
    hoverBg: "hover:bg-blue-600",
    gradient: "from-blue-100 to-blue-200",
    darkGradient: "dark:from-blue-900 dark:to-gray-900",
  },
  {
    border: "border-green-500",
    text: "text-green-700",
    iconBg: "bg-green-500",
    hoverBg: "hover:bg-green-600",
    gradient: "from-green-100 to-green-200",
    darkGradient: "dark:from-green-900 dark:to-gray-900",
  },
  {
    border: "border-yellow-500",
    text: "text-yellow-700",
    iconBg: "bg-yellow-500",
    hoverBg: "hover:bg-yellow-600",
    gradient: "from-yellow-100 to-yellow-200",
    darkGradient: "dark:from-yellow-900 dark:to-gray-900",
  },
  {
    border: "border-pink-500",
    text: "text-pink-700",
    iconBg: "bg-pink-500",
    hoverBg: "hover:bg-pink-600",
    gradient: "from-pink-100 to-pink-200",
    darkGradient: "dark:from-pink-900 dark:to-gray-900",
  },
  {
    border: "border-purple-500",
    text: "text-purple-700",
    iconBg: "bg-purple-500",
    hoverBg: "hover:bg-purple-600",
    gradient: "from-purple-100 to-purple-200",
    darkGradient: "dark:from-purple-900 dark:to-gray-900",
  },
  {
    border: "border-orange-500",
    text: "text-orange-700",
    iconBg: "bg-orange-500",
    hoverBg: "hover:bg-orange-600",
    gradient: "from-orange-100 to-orange-200",
    darkGradient: "dark:from-orange-900 dark:to-gray-900",
  },
  {
    border: "border-teal-500",
    text: "text-teal-700",
    iconBg: "bg-teal-500",
    hoverBg: "hover:bg-teal-600",
    gradient: "from-teal-100 to-teal-200",
    darkGradient: "dark:from-teal-900 dark:to-gray-900",
  },
  {
    border: "border-red-500",
    text: "text-red-700",
    iconBg: "bg-red-500",
    hoverBg: "hover:bg-red-600",
    gradient: "from-red-100 to-red-200",
    darkGradient: "dark:from-red-900 dark:to-gray-900",
  },
];

// Memoized color assignment function - stable colors per tool
const getToolColor = (toolSlug: string) => {
  // Use a simple hash function to get consistent color for each tool
  let hash = 0;
  for (let i = 0; i < toolSlug.length; i++) {
    const char = toolSlug.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return colorMap[Math.abs(hash) % colorMap.length];
};

// Memoized tool colors - stable per tool
const toolColors = computed(() =>
  filteredTools.value.map((tool) => getToolColor(tool.slug))
);

// Handle filter updates from sidebar/modal
const handleFilterUpdate = (newFilters: FilterState) => {
  updateFilters(newFilters);
};

// Handle filter clear
const handleFilterClear = () => {
  clearFilters();
};

// Get the current game filter
const route = useRoute();
const currentGameFilter = computed(() => route.query.game as string);

// Handle tool action button click
const handleToolAction = (tool: Tool) => {
  const availableGames = tool.gameCategories;
  const currentFilter = currentGameFilter.value;

  // If only one game available, navigate directly
  if (availableGames.length === 1) {
    navigateToTool(tool, availableGames[0]);
    return;
  }

  // If filtered to a specific game and that game is available, navigate directly
  if (currentFilter && availableGames.includes(currentFilter as GameId)) {
    navigateToTool(tool, currentFilter as GameId);
    return;
  }

  // Otherwise, show game selection overlay
  selectedTool.value = tool;
  showGameSelection.value = true;
};

// Navigate to a specific tool and game
const navigateToTool = (tool: Tool, game: GameId) => {
  navigateTo(`/tools/${game}/${tool.slug}`);
};

// Handle game selection from overlay
const handleGameSelection = (game: string) => {
  if (selectedTool.value) {
    navigateToTool(selectedTool.value, game as GameId);
  }
  showGameSelection.value = false;
  selectedTool.value = null;
};

// Close game selection overlay
const closeGameSelection = () => {
  showGameSelection.value = false;
  selectedTool.value = null;
};
</script>

<template>
  <section class="py-12">
    <div>
      <!-- Results Count and Filter Button (mobile) -->
      <div class="xl:hidden mb-6 flex items-center justify-between px-4">
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ filteredTools.length }} tool{{
            filteredTools.length !== 1 ? "s" : ""
          }}
        </span>
        <div class="flex items-center gap-2">
          <UButton
            v-if="activeFilterCount > 0"
            @click="clearFilters"
            color="error"
            variant="outline"
            size="sm"
          >
            <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
            Clear
          </UButton>
          <UButton
            @click="showFilterModal = true"
            color="primary"
            variant="outline"
            :class="activeFilterCount > 0 ? 'ring-2 ring-primary-500' : ''"
          >
            <Icon name="i-heroicons-funnel" class="w-4 h-4" />
            Filter
            <span v-if="activeFilterCount > 0" class="ml-1 text-xs">
              ({{ activeFilterCount }})
            </span>
          </UButton>
        </div>
      </div>
      <!-- Tools Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UCard
          v-for="(tool, i) in filteredTools"
          :key="tool.slug"
          :class="`relative h-full flex flex-col justify-between shadow-md rounded-xl border-l-8 ${toolColors[i].border} bg-gradient-to-br ${toolColors[i].gradient} ${toolColors[i].darkGradient} overflow-hidden`"
        >
          <template #header>
            <div
              class="flex items-center gap-3 justify-center mb-2 mt-2 relative z-10"
            >
              <div
                :class="`w-12 h-12 flex items-center justify-center rounded-full shadow overflow-hidden ${toolColors[i].iconBg}`"
              >
                <picture
                  v-if="
                    tool.icon && /\.(png|jpe?g|gif|svg|webp)$/i.test(tool.icon)
                  "
                >
                  <source
                    v-if="tool.icon.endsWith('.png')"
                    :srcset="
                      tool.icon
                        .replace('.png', '.webp')
                        .replace(/^public\//, '/')
                    "
                    type="image/webp"
                  />
                  <img
                    :src="tool.icon.replace(/^public\//, '/')"
                    alt="icon"
                    class="w-8 h-8 object-contain rounded-full scale-125"
                    :style="
                      tool.slug === 'starting-class-optimizer'
                        ? { transform: 'scale(1.5)' }
                        : undefined
                    "
                    loading="lazy"
                    decoding="async"
                    width="32"
                    height="32"
                  />
                </picture>
                <Icon
                  v-else
                  :name="tool.icon || 'i-heroicons-cube'"
                  class="w-3 h-3 text-white"
                  :style="
                    tool.slug === 'starting-class-optimizer'
                      ? { transform: 'scale(1.5)' }
                      : undefined
                  "
                />
              </div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ tool.title }}
              </h2>
            </div>
            <ToolChips
              :popular="i === 0"
              :category="tool.category"
              :games="tool.gameCategories"
            />
          </template>
          <div
            class="flex flex-1 items-center justify-center pb-6 pt-2 relative z-10"
          >
            <p
              class="text-base font-medium text-gray-700 dark:text-gray-200 text-center leading-relaxed"
            >
              {{ tool.description }}
            </p>
          </div>

          <!-- Action Button -->
          <div class="absolute bottom-4 right-4 z-20">
            <UButton
              @click="handleToolAction(tool)"
              :class="`shadow-lg hover:shadow-xl transition-shadow ${toolColors[i].iconBg} ${toolColors[i].hoverBg} text-white`"
              variant="solid"
              size="sm"
              :aria-label="`Open ${tool.title}`"
            >
              <Icon name="i-heroicons-arrow-right" class="w-4 h-4" />
            </UButton>
          </div>

          <!-- Game Selection Overlay (per card) -->
          <GameSelectionOverlay
            v-if="selectedTool && selectedTool.slug === tool.slug"
            :is-open="showGameSelection"
            :games="tool.gameCategories"
            :tool-title="tool.title"
            :border="toolColors[i].border"
            :gradient="toolColors[i].gradient"
            :dark-gradient="toolColors[i].darkGradient"
            :icon-bg="toolColors[i].iconBg"
            :hover-bg="toolColors[i].hoverBg"
            @close="closeGameSelection"
            @select="handleGameSelection"
          />
        </UCard>
      </div>
      <!-- Empty State -->
      <div
        v-if="filteredTools.length === 0"
        class="w-full max-w-2xl mx-auto text-center py-12"
      >
        <Icon
          name="i-heroicons-magnifying-glass"
          class="w-24 h-24 text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No tools found
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">
          Try adjusting your filters or search terms.
        </p>
        <UButton @click="clearFilters" color="primary" variant="outline"
          >Clear all filters</UButton
        >
      </div>
    </div>
  </section>

  <!-- Filter Modal for all <xl screens -->
  <FilterModal
    :is-open="showFilterModal"
    :filters="filters"
    :available-games="availableGames"
    :available-categories="availableCategories"
    @close="showFilterModal = false"
    @update:filters="handleFilterUpdate"
    @clear="handleFilterClear"
  />
</template>
