<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import { useAsyncData } from "#app";
import ToolLayout from "~/components/Tools/Common/ToolLayout.vue";
import { getRandomTheme } from "~/utils/constants";
import type { GameId } from "~/types/game";
import Icon from "~/components/Common/Icon.vue";
import { tools } from "~/tools";
import HeroSection from "~/components/Tools/Common/HeroSection.vue";
import RelatedToolsSection from "~/components/Tools/Common/RelatedToolsSection.vue";
import WeaponAttackRatingSidebar from "~/components/Tools/WeaponAttackRatingCalculator/GameComponents/Common/WeaponAttackRatingSidebar.vue";
import ArmorOptimizerSidebar from "~/components/Tools/ArmorOptimizer/GameComponents/Common/ArmorOptimizerSidebar.vue";
import { getGameData, isGameAvailable } from "~/utils/games";
import type { Tool } from "~/types/tools/tool";
import type { GameData } from "~/types/game";

// Utility: Deeply remove all functions from an object
function stripFunctions(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(stripFunctions);
  } else if (obj && typeof obj === "object") {
    const result: any = {};
    for (const key in obj) {
      if (typeof obj[key] !== "function") {
        result[key] = stripFunctions(obj[key]);
      }
    }
    return result;
  }
  return obj;
}

// SSR-safe route params
const route = useRoute();
const gameId = computed(() => route.params.game as GameId);
const slug = computed(() => route.params.slug as string);

// Synchronously fetch tool config and game data for SSR/meta tags
const { data: ssrData, error: ssrError } = await useAsyncData<{
  tool: Omit<Tool, "loadComponent">;
  gameData: GameData;
} | null>(`tool-meta-${gameId.value}-${slug.value}`, () => {
  const foundTool = tools.find(
    (t) =>
      t.slug === slug.value.toLowerCase() &&
      t.gameCategories.includes(gameId.value)
  );
  if (!foundTool) return Promise.resolve(null);
  if (!isGameAvailable(gameId.value)) return Promise.resolve(null);
  const gameData = getGameData(gameId.value);
  // Deeply remove all functions from tool and gameData
  const serializableTool = stripFunctions(foundTool);
  const serializableGameData = stripFunctions(gameData);
  return Promise.resolve({
    tool: serializableTool,
    gameData: serializableGameData,
  });
});

const tool = ref<
  (Omit<Tool, "loadComponent"> & { loadComponent?: () => Promise<any> }) | null
>(ssrData.value?.tool || null);
const gameData = computed(() => ssrData.value?.gameData || null);

// Computed: tool object for ToolLayout (never includes loadComponent)
const toolForLayout = computed(() => {
  if (!tool.value) return null;
  // Remove loadComponent if present
  const { loadComponent, ...plainTool } = tool.value;
  return plainTool;
});

// Ref to access the tool component instance
const toolComponentRef = ref();
// Ref to access the sidebar component
const sidebarRef = ref();

// Async load the tool component only after SSR/meta tags are set
const ToolComponent = ref<any>(null);
const loading = ref(false);
const hasComponent = ref(false);
const hasTool = computed(() => !!tool.value);
const initialized = ref(false);
const isLoading = ref(false);
const hasError = ref(false);
const error = ref<Error | null>(null);

// Watcher: re-link loadComponent on client as soon as tool is hydrated
watch(
  tool,
  (val) => {
    if (process.client && val && typeof val.loadComponent !== "function") {
      const realTool = tools.find(
        (t) =>
          t.slug === slug.value.toLowerCase() &&
          t.gameCategories.includes(gameId.value)
      );
      if (realTool) {
        val.loadComponent = realTool.loadComponent;
      }
    }
    // Only call loadComponent if the function is present
    if (val && typeof val.loadComponent === "function") {
      loadComponent();
    }
  },
  { immediate: true }
);

async function loadComponent() {
  if (!tool.value || typeof tool.value.loadComponent !== "function") return;
  loading.value = true;
  try {
    const mod = await tool.value.loadComponent();
    ToolComponent.value = mod.default;
    hasComponent.value = true;
    initialized.value = true;
    isLoading.value = false;
    hasError.value = false;
    error.value = null;
  } catch (err: any) {
    hasComponent.value = false;
    initialized.value = true;
    isLoading.value = false;
    hasError.value = true;
    error.value = err instanceof Error ? err : new Error(String(err));
  } finally {
    loading.value = false;
  }
}

// Get a random theme for the tool to provide visual variety
const selectedTheme = getRandomTheme();

// Compute related tools based on shared game and category/tags
const relatedTools = computed(() => {
  if (!tool.value) return [];
  const currentSlug = slug.value;
  const currentGame = gameId.value;
  const currentCategory = tool.value.category;
  const currentTags = tool.value.tags || [];
  return tools
    .filter(
      (t) =>
        t.slug !== currentSlug &&
        t.gameCategories.includes(currentGame) &&
        (t.category === currentCategory ||
          t.tags.some((tag) => currentTags.includes(tag)))
    )
    .slice(0, 3); // Limit to 3 related tools
});

// SSR meta tags via ToolLayout (no change needed)
</script>

<template>
  <ToolLayout
    :title="tool?.title || 'Tool'"
    :description="tool?.description || 'Soulsborne tool'"
    :icon-path="tool?.icon"
    :tool="toolForLayout"
    :game-id="gameId"
    :game-data="gameData || undefined"
  >
    <!-- Hero Section at the top -->
    <template #hero>
      <HeroSection
        :title="tool?.title || 'Tool'"
        :description="tool?.description || ''"
        :icon-path="
          tool && tool.icon && !tool.icon.startsWith('i-heroicons')
            ? tool.icon
            : undefined
        "
        :icon-name="
          tool && tool.icon && tool.icon.startsWith('i-heroicons')
            ? tool.icon
            : undefined
        "
        :theme="selectedTheme"
        :game-data="gameData || undefined"
      />
    </template>

    <!-- Sidebar content for weapon attack rating calculator -->
    <template #sidebar>
      <WeaponAttackRatingSidebar
        v-if="
          slug === 'weapon-attack-rating-calculator' &&
          hasComponent &&
          toolComponentRef
        "
        ref="sidebarRef"
        :state="toolComponentRef.state"
        :set-state="toolComponentRef.setState"
        :reset-form="toolComponentRef.resetCharacterStats"
        :theme="selectedTheme"
        :show-weapon-level="toolComponentRef.hasWeaponsWithUpgradePaths"
      />

      <!-- Sidebar content for armor optimizer -->
      <ArmorOptimizerSidebar
        v-if="slug === 'armor-optimizer' && hasComponent && toolComponentRef"
        ref="sidebarRef"
        :state="toolComponentRef.state"
        :set-state="toolComponentRef.setState"
        :reset="toolComponentRef.reset"
        :theme="selectedTheme"
        :character-stats="toolComponentRef.characterStats"
      />
    </template>

    <!-- Main Content -->
    <template #default>
      <!-- Main tool content -->
      <!-- Tool Component (Success State) - Renders the actual tool when loaded -->
      <div v-if="hasComponent && gameData && tool">
        <ErrorBoundary @error="(err: Error) => (error = err)">
          <component
            :is="ToolComponent"
            ref="toolComponentRef"
            :game-data="gameData"
            :tool-config="tool"
            :theme="selectedTheme"
            :sidebar-ref="sidebarRef"
          />
        </ErrorBoundary>
      </div>
      <!-- Loading State - Show immediately if not initialized or loading -->
      <ToolLoadingSpinner
        v-else-if="!initialized || isLoading"
        :tool-title="tool?.title || ''"
      />
      <!-- Tool Not Found State - When tool exists but doesn't support the game -->
      <ToolNotFound
        v-else-if="initialized && !isLoading && !hasTool"
        :slug="slug"
        :game-id="gameId"
      />
      <!-- Loading Error State - When tool exists but failed to load -->
      <ToolLoadingError
        v-else-if="hasError && hasTool"
        :tool-title="tool && tool.title ? tool.title : ''"
        :error-message="error && error.message ? error.message : ''"
        @retry="loadComponent"
      />
      <!-- Fallback Error State - Unexpected errors with retry option -->
      <div v-else>
        <div class="text-center">
          <div class="mb-6">
            <div
              class="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Unexpected Error
          </h1>
          <p class="text-gray-600 dark:text-gray-300 mb-8">
            Something unexpected happened. Please try refreshing the page.
          </p>
          <UButton @click="loadComponent" color="primary" size="lg">
            <Icon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2" />
            Retry
          </UButton>
        </div>
      </div>

      <!-- Related Tools Section at bottom of page -->
      <RelatedToolsSection
        v-if="relatedTools.length > 0"
        :related-tools="relatedTools"
        :current-tool-slug="slug"
      />
    </template>
  </ToolLayout>
</template>
