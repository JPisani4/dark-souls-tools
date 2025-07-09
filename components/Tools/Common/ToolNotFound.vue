<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
    aria-live="polite"
  >
    <div class="max-w-md w-full mx-auto text-center px-4">
      <!-- 404 Icon -->
      <div class="mb-8">
        <picture>
          <source
            srcset="/warrior-of-sunlight-covenant-dks.webp"
            type="image/webp"
          />
          <img
            src="/warrior-of-sunlight-covenant-dks.png"
            alt="404 Icon"
            class="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center object-contain"
            loading="lazy"
            decoding="async"
            width="96"
            height="96"
            aria-hidden="true"
          />
        </picture>
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
          <Icon name="i-heroicons-home" class="w-5 h-5 mr-2" />
          Browse All Tools
        </UButton>

        <UButton to="/" variant="outline" size="lg" class="w-full">
          <Icon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
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
import Icon from "~/components/Common/Icon.vue";
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
