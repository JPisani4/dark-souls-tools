<template>
  <div class="flex flex-col min-h-screen w-full">
    <!-- Hero section always on top -->
    <div>
      <slot name="hero" />
    </div>

    <!-- Below Hero Slot -->
    <div>
      <slot name="below-hero" />
    </div>

    <!-- Mobile Sidebar Overlays - Backdrop for mobile sidebars -->
    <div
      v-if="$slots.sidebar && isLeftSidebarOpen"
      class="2xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="closeLeftSidebar"
    />
    <div
      v-if="$slots['right-sidebar'] && isRightSidebarOpen"
      class="2xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="closeRightSidebar"
    />

    <!-- Mobile Left Sidebar Drawer - Slides in from left on mobile -->
    <aside
      v-if="$slots.sidebar"
      :class="[
        '2xl:hidden fixed left-0 top-0 w-80 max-w-[85vw] h-full bg-white dark:bg-gray-900 overflow-y-auto overflow-x-hidden z-50 transform transition-transform duration-300 ease-in-out',
        isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'border-r border-gray-200 dark:border-gray-800',
      ]"
      aria-label="Mobile Left Sidebar"
    >
      <!-- Mobile Close Button -->
      <div class="flex justify-end p-6 pb-4">
        <UButton
          size="sm"
          variant="ghost"
          @click="closeLeftSidebar"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
        </UButton>
      </div>

      <!-- Sidebar Content -->
      <div class="px-6 pb-6 space-y-6">
        <slot name="sidebar" />
      </div>
    </aside>

    <!-- Mobile Right Sidebar Drawer - Slides in from right on mobile -->
    <aside
      v-if="$slots['right-sidebar']"
      :class="[
        '2xl:hidden fixed right-0 top-0 w-80 max-w-[85vw] h-full bg-white dark:bg-gray-900 overflow-y-auto overflow-x-hidden z-50 transform transition-transform duration-300 ease-in-out',
        isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full',
        'border-l border-gray-200 dark:border-gray-800',
      ]"
      aria-label="Mobile Right Sidebar"
    >
      <!-- Mobile Close Button -->
      <div class="flex justify-start p-6 pb-4">
        <UButton
          size="sm"
          variant="ghost"
          @click="closeRightSidebar"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
        </UButton>
      </div>

      <!-- Sidebar Content -->
      <div class="px-6 pb-6 space-y-6">
        <slot name="right-sidebar" />
      </div>
    </aside>

    <!-- Grid for sidebar and main content - Responsive layout system -->
    <div class="flex flex-1 w-full items-start">
      <!-- Desktop Left Sidebar - Sticky on the left edge -->
      <aside
        class="hidden 2xl:block w-72 sticky top-14 bg-white dark:bg-gray-900 p-6 overflow-y-auto overflow-x-hidden z-20"
        aria-label="Desktop Left Sidebar"
      >
        <template v-if="$slots.sidebar">
          <slot name="sidebar" />
        </template>
        <template v-else>
          <div aria-hidden="true" class="w-full" />
        </template>
      </aside>

      <!-- Main Content - Full width for tools that need it -->
      <main
        class="flex-1 w-full px-4"
        :aria-labelledby="props.title ? 'tool-title' : undefined"
      >
        <slot />
      </main>

      <!-- Desktop Right Sidebar - Sticky on the right edge -->
      <aside
        class="hidden 2xl:block w-72 sticky top-14 bg-white dark:bg-gray-900 p-6 overflow-y-auto overflow-x-hidden z-20"
        aria-label="Desktop Right Sidebar"
      >
        <template v-if="$slots['right-sidebar']">
          <slot name="right-sidebar" />
        </template>
        <template v-else>
          <div aria-hidden="true" class="w-full" />
        </template>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useMobileSidebar } from "~/composables/useMobileSidebar";
import { useToolLayout } from "~/composables/useToolLayout";
// import type { Tool } from "~/types/tools/tool";
import type { GameId, GameData } from "~/types/game";
import Icon from "~/components/Common/Icon.vue";

// SEO props
interface Props {
  title?: string;
  description?: string;
  iconPath?: string;
  iconName?: string;
  // New props for structured data
  tool?: any;
  gameId?: GameId | null;
  gameData?: GameData | null;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  description: "",
  iconPath: "",
  iconName: "",
  tool: null,
  gameId: null,
  gameData: null,
});

// SEO setup - only if title and description are provided
if (props.title && props.description) {
  useToolLayout({
    title: props.title,
    description: props.description,
    iconPath: props.iconPath,
    iconName: props.iconName,
    tool: props.tool,
    gameId: props.gameId,
    gameData: props.gameData,
  });
}

// Mobile sidebar state management for both sides
const {
  isMobileSidebarOpen: isLeftSidebarOpen,
  closeSidebar: closeLeftSidebar,
  openSidebar: openLeftSidebar,
} = useMobileSidebar("left");
const {
  isMobileSidebarOpen: isRightSidebarOpen,
  closeSidebar: closeRightSidebar,
} = useMobileSidebar("right");

// Keyboard support for accessibility
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    if (isLeftSidebarOpen.value) closeLeftSidebar();
    if (isRightSidebarOpen.value) closeRightSidebar();
  }
};

// Close sidebars when screen size changes to desktop
const handleResize = () => {
  if (window.innerWidth >= 1280) {
    closeLeftSidebar();
    closeRightSidebar();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("resize", handleResize);
});
</script>
