<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Tool } from "~/types/tools/tool";
import Icon from "~/components/Common/Icon.vue";
import ToolChips from "~/components/Common/ToolChips.vue";
import { useMobileSidebar } from "~/composables/useMobileSidebar";

interface Props {
  relatedTools: Tool[];
  currentToolSlug: string;
}

const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();
const { closeSidebar } = useMobileSidebar("left");

const goToTool = (tool: Tool) => {
  // Use the current game from the route
  const game = route.params.game;
  closeSidebar(); // Close the mobile sidebar if open
  router.push(`/tools/${game}/${tool.slug}`);
};
</script>

<template>
  <div>
    <h2
      class="text-lg font-bold mb-4 text-gray-900 dark:text-white text-center"
    >
      Related Tools
    </h2>
    <div
      v-if="relatedTools.length > 0"
      class="divide-y divide-gray-100 dark:divide-gray-800"
    >
      <NuxtLink
        v-for="tool in relatedTools"
        :key="tool.slug"
        :to="`/tools/${route.params.game}/${tool.slug}`"
        class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/60 hover:shadow transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        tabindex="0"
        role="button"
        :aria-label="`Open ${tool.title}`"
        @click.native="closeSidebar()"
        target="_self"
      >
        <div class="flex-1 min-w-0 text-center">
          <div class="flex flex-col items-center gap-2">
            <span
              class="font-semibold text-base text-gray-900 dark:text-white whitespace-normal break-words line-clamp-2 text-center"
              >{{ tool.title }}</span
            >
          </div>
          <ToolChips
            :category="tool.category"
            :games="tool.gameCategories"
            class="mt-1 justify-center"
          />
          <p
            class="text-sm text-gray-600 dark:text-gray-300 whitespace-normal break-words line-clamp-3 mt-1 text-center"
          >
            {{ tool.description }}
          </p>
        </div>
      </NuxtLink>
    </div>
    <div
      v-else
      class="text-gray-500 dark:text-gray-400 text-sm mt-6 text-center"
    >
      No related tools found.
    </div>
  </div>
</template>
