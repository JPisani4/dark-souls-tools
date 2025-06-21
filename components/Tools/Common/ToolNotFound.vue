<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
  >
    <div class="max-w-md w-full mx-auto text-center px-4">
      <!-- 404 Icon -->
      <div class="mb-8">
        <div
          class="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-12 h-12 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
            />
          </svg>
        </div>
      </div>

      <!-- Error Message -->
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Tool Not Found
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-2">
        The tool
        <span
          class="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
          >{{ slug }}</span
        >
        <span v-if="gameId"> for {{ getGameName(gameId) }}</span>
        doesn't exist.
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">
        It might have been moved, renamed, or doesn't exist yet.
      </p>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <UButton to="/tools" color="primary" size="lg" class="w-full">
          <UIcon name="i-heroicons-home" class="w-5 h-5 mr-2" />
          Browse All Tools
        </UButton>

        <UButton to="/" variant="outline" size="lg" class="w-full">
          <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
          Go Home
        </UButton>
      </div>

      <!-- Available Tools Preview -->
      <div class="mt-12">
        <h3
          class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide"
        >
          Available Tools
        </h3>
        <div class="grid grid-cols-1 gap-3">
          <NuxtLink
            v-for="tool in availableTools"
            :key="tool.slug"
            :to="`/tools/${gameId || 'ds1'}/${tool.slug}`"
            class="block p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
          >
            <div class="text-left">
              <h4 class="font-medium text-gray-900 dark:text-white">
                {{ tool.title }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {{ tool.description }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tools } from "~/tools";
import type { GameId } from "~/types/game";
import { GAMES } from "~/utils/games";

interface Props {
  slug: string;
  gameId?: GameId;
}

const props = defineProps<Props>();

// Get available tools for suggestions
const availableTools = computed(() => tools.slice(0, 3)); // Show first 3 tools

// Get game name for display
const getGameName = (gameId: GameId) => {
  return GAMES[gameId]?.name || gameId.toUpperCase();
};
</script>
