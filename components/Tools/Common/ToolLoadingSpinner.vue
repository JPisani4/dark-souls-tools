<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
  >
    <div class="flex flex-col items-center space-y-6">
      <!-- Spinner Icon -->
      <div class="relative flex h-16 w-16">
        <svg
          class="w-16 h-16 text-primary-600 dark:text-primary-400 animate-spin"
          fill="none"
          viewBox="0 0 32 32"
        >
          <path
            d="M30 16a14 14 0 0 0-14-14"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <!-- Loading Message -->
      <div class="text-center">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {{ messageToShow }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 text-base" v-if="toolTitle">
          Please wait while
          <span class="font-semibold">{{ toolTitle }}</span> loads…
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  toolTitle: string;
  message?: string;
}

const props = defineProps<Props>();

const messageToShow = computed(() =>
  props.message ? props.message : `Loading ${props.toolTitle}…`
);
</script>
