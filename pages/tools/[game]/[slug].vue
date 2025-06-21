<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useGameToolLoader } from "~/composables/useGameToolLoader";
import ToolLayout from "~/components/Tools/Common/ToolLayout.vue";
import { getRandomTheme } from "~/utils/constants";
import type { GameId } from "~/types/game";

// Extract route parameters for game and tool identification
const route = useRoute();
const gameId = computed(() => route.params.game as GameId);
const slug = computed(() => route.params.slug as string);

// Get a random theme for the tool to provide visual variety
const selectedTheme = getRandomTheme();

// Initialize the game tool loader with all necessary state and actions
const {
  loading,
  error,
  component: ToolComponent,
  tool,
  gameData,
  isLoading,
  hasError,
  hasComponent,
  hasTool,
  loadGameTool,
  retry,
  cleanup,
  initialized,
} = useGameToolLoader();

// Load tool on mount with the current game and slug
onMounted(() => {
  loadGameTool(gameId.value, slug.value);
});

// Cleanup on unmount to prevent memory leaks
onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <ToolLayout
    :title="tool?.title || 'Tool'"
    :description="tool?.description || 'Soulsborne tool'"
    :icon-path="tool?.icon"
    :tool="tool"
    :game-id="gameId"
    :game-data="gameData"
  >
    <template #sidebar />
    <template #right-sidebar />

    <!-- Tool Component (Success State) - Renders the actual tool when loaded -->
    <div v-if="hasComponent">
      <ErrorBoundary @error="(err: Error) => (error = err)">
        <component
          :is="ToolComponent"
          :game-data="gameData"
          :tool-config="tool"
          :theme="selectedTheme"
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
      @retry="retry"
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
        <UButton @click="retry" color="primary" size="lg">
          <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2" />
          Retry
        </UButton>
      </div>
    </div>
  </ToolLayout>
</template>
