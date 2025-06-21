<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[9999] xl:hidden" @click="$emit('close')">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50"></div>

      <!-- Modal Content -->
      <div
        class="absolute top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-xl z-[10000]"
        @click.stop
      >
        <div class="flex flex-col h-full">
          <!-- Modal Header -->
          <div
            class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Filter Tools
            </h3>
            <button
              @click="$emit('close')"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close filter modal"
            >
              <UIcon
                name="i-heroicons-x-mark"
                class="w-5 h-5 text-gray-700 dark:text-gray-300"
              />
            </button>
          </div>

          <!-- Filter Content -->
          <div class="flex-1 overflow-y-auto">
            <ToolFilterSidebar
              :filters="filters"
              :available-games="availableGames"
              :available-categories="availableCategories"
              :is-mobile="true"
              @update:filters="$emit('update:filters', $event)"
              @clear="$emit('clear')"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import ToolFilterSidebar from "./ToolFilterSidebar.vue";
import type { FilterState } from "~/composables/useToolFilters";

interface Props {
  filters: FilterState;
  availableGames: Array<{ id: string; name: string }>;
  availableCategories: Array<{ id: string; name: string }>;
}

interface Emits {
  (e: "close"): void;
  (e: "update:filters", filters: FilterState): void;
  (e: "clear"): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
