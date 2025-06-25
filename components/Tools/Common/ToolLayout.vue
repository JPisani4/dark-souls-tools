<template>
  <div class="flex flex-col min-h-screen w-full">
    <!-- Hero section always on top -->
    <div>
      <slot name="hero" />
    </div>

    <!-- Mobile Sidebar Overlays - Backdrop for mobile sidebars -->
    <div
      v-if="$slots.sidebar && isLeftSidebarOpen"
      class="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="closeLeftSidebar"
    />
    <div
      v-if="$slots['right-sidebar'] && isRightSidebarOpen"
      class="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="closeRightSidebar"
    />

    <!-- Mobile Left Sidebar Drawer - Slides in from left on mobile -->
    <aside
      v-if="$slots.sidebar"
      :class="[
        'xl:hidden fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 p-6 overflow-y-auto overflow-x-hidden z-50 transform transition-transform duration-300 ease-in-out',
        isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'border-r border-gray-200 dark:border-gray-800',
      ]"
      aria-label="Mobile Left Sidebar"
    >
      <!-- Mobile Close Button -->
      <div class="flex justify-end mb-4">
        <UButton
          size="sm"
          variant="ghost"
          @click="closeLeftSidebar"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
        </UButton>
      </div>

      <!-- Sidebar Content -->
      <div class="space-y-4">
        <slot name="sidebar" />
      </div>
    </aside>

    <!-- Mobile Right Sidebar Drawer - Slides in from right on mobile -->
    <aside
      v-if="$slots['right-sidebar']"
      :class="[
        'xl:hidden fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 p-6 overflow-y-auto overflow-x-hidden z-50 transform transition-transform duration-300 ease-in-out',
        isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full',
        'border-l border-gray-200 dark:border-gray-800',
      ]"
      aria-label="Mobile Right Sidebar"
    >
      <!-- Mobile Close Button -->
      <div class="flex justify-start mb-4">
        <UButton
          size="sm"
          variant="ghost"
          @click="closeRightSidebar"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
        </UButton>
      </div>

      <!-- Sidebar Content -->
      <div class="space-y-4">
        <slot name="right-sidebar" />
      </div>
    </aside>

    <!-- Grid for sidebar and main content - Responsive layout system -->
    <div
      :class="[
        'grid flex-1 w-full items-stretch',
        // Dynamic grid layout based on which sidebars are present
        $slots.sidebar && $slots['right-sidebar']
          ? 'grid-cols-1 xl:grid-cols-[18rem_minmax(0,1fr)_18rem]'
          : $slots.sidebar
            ? 'grid-cols-1 xl:grid-cols-[18rem_minmax(0,1fr)_18rem]'
            : $slots['right-sidebar']
              ? 'grid-cols-1 xl:grid-cols-[18rem_minmax(0,1fr)_18rem]'
              : 'grid-cols-1',
      ]"
    >
      <!-- Desktop Left Sidebar - Always visible on xl+ screens -->
      <aside
        v-if="$slots.sidebar"
        :class="[
          'hidden xl:block bg-white dark:bg-gray-900 p-6 overflow-y-auto overflow-x-hidden z-20',
          $slots.sidebar && $slots.sidebar().length > 0
            ? 'border-r border-gray-200 dark:border-gray-800'
            : '',
        ]"
        aria-label="Desktop Left Sidebar"
      >
        <slot name="sidebar" />
      </aside>

      <!-- Invisible Left Sidebar Placeholder - When only right sidebar exists -->
      <aside
        v-else-if="$slots['right-sidebar']"
        class="hidden xl:block w-72"
        aria-hidden="true"
      ></aside>

      <!-- Main Content - Centered and constrained for optimal reading -->
      <main class="w-full max-w-4xl mx-auto px-4">
        <slot />
      </main>

      <!-- Desktop Right Sidebar - Always visible on xl+ screens -->
      <aside
        v-if="$slots['right-sidebar']"
        :class="[
          'hidden xl:block bg-white dark:bg-gray-900 p-6 overflow-y-auto overflow-x-hidden z-20',
          $slots['right-sidebar'] && $slots['right-sidebar']().length > 0
            ? 'border-l border-gray-200 dark:border-gray-800'
            : '',
        ]"
        aria-label="Desktop Right Sidebar"
      >
        <slot name="right-sidebar" />
      </aside>

      <!-- Invisible Right Sidebar Placeholder - When only left sidebar exists -->
      <aside
        v-else-if="$slots.sidebar"
        class="hidden xl:block w-72"
        aria-hidden="true"
      ></aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useMobileSidebar } from "~/composables/useMobileSidebar";
import { useToolLayout } from "~/composables/useToolLayout";
import type { Tool } from "~/types/tools/tool";
import type { GameId, GameData } from "~/types/game";

// SEO props
interface Props {
  title?: string;
  description?: string;
  iconPath?: string;
  iconName?: string;
  // New props for structured data
  tool?: Tool | null;
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
