<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Tool } from "~/types/tools/tool";
import Icon from "~/components/Common/Icon.vue";
import ToolChips from "~/components/Common/ToolChips.vue";

interface Props {
  relatedTools: Tool[];
  currentToolSlug: string;
}

const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();

// Limit to 3 related tools maximum
const limitedRelatedTools = computed(() => {
  return props.relatedTools.slice(0, 3);
});

const goToTool = (tool: Tool) => {
  // Use the current game from the route
  const game = route.params.game;
  router.push(`/tools/${game}/${tool.slug}`);
};
</script>

<template>
  <div class="w-full max-w-4xl mx-auto py-6 px-4">
    <div class="border-t border-gray-200 dark:border-gray-800 pt-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          Related Tools
        </h2>
        <Icon
          name="i-heroicons-puzzle-piece"
          class="w-5 h-5 text-gray-400 dark:text-gray-500"
        />
      </div>

      <div
        v-if="limitedRelatedTools.length > 0"
        class="grid grid-cols-1 md:grid-cols-3 gap-3"
      >
        <UCard
          v-for="tool in limitedRelatedTools"
          :key="tool.slug"
          class="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-primary-300 dark:hover:ring-primary-600 bg-white dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800/90"
          @click="goToTool(tool)"
          @keydown.enter="goToTool(tool)"
          @keydown.space="goToTool(tool)"
          tabindex="0"
          role="button"
          :aria-label="`Open ${tool.title}`"
        >
          <div class="flex flex-col h-full">
            <!-- Tool Icon and Title -->
            <div class="flex items-start gap-3 mb-3">
              <div class="flex-shrink-0">
                <img
                  v-if="tool.icon && !tool.icon.startsWith('i-heroicons')"
                  :src="tool.icon"
                  :alt="tool.title"
                  class="w-8 h-8 rounded-md object-cover bg-gray-100 dark:bg-gray-700"
                />
                <Icon
                  v-else
                  name="i-heroicons-wrench-screwdriver"
                  class="w-8 h-8 text-gray-400 dark:text-gray-500"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                >
                  {{ tool.title }}
                </h3>
              </div>
            </div>

            <!-- Description -->
            <p
              class="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3 leading-relaxed"
            >
              {{ tool.description }}
            </p>

            <!-- Category and Game Chips -->
            <div class="mt-auto">
              <ToolChips
                :category="tool.category"
                :games="tool.gameCategories"
                class="justify-start"
              />
            </div>

            <!-- Hover indicator -->
            <div
              class="absolute inset-0 border-2 border-transparent group-hover:border-primary-200 dark:group-hover:border-primary-700 rounded-lg transition-colors pointer-events-none"
            />
          </div>
        </UCard>
      </div>

      <div v-else class="text-center py-8">
        <div class="flex flex-col items-center gap-3">
          <Icon
            name="i-heroicons-information-circle"
            class="w-8 h-8 text-gray-400 dark:text-gray-500"
          />
          <p class="text-sm text-gray-500 dark:text-gray-400">
            No related tools found
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
