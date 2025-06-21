<template>
  <div class="flex w-full min-h-screen">
    <aside
      v-if="side === 'left'"
      class="hidden md:block w-72 sticky top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 overflow-y-auto overflow-x-hidden z-20"
      aria-label="Sidebar"
    >
      <slot name="sidebar" />
    </aside>
    <main class="flex-1 flex justify-center">
      <div class="w-full">
        <slot />
      </div>
    </main>
    <aside
      v-if="side === 'right'"
      class="hidden md:block w-72 sticky top-0 h-screen bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-6 overflow-y-auto z-20"
      aria-label="Sidebar"
    >
      <slot name="sidebar" />
    </aside>
  </div>
  <UModal v-model="showMobile" class="md:hidden z-50">
    <aside
      class="w-full max-w-xs bg-white dark:bg-gray-900 p-6 overflow-y-auto"
    >
      <slot name="sidebar" />
    </aside>
  </UModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  side: {
    type: String,
    default: "left",
    validator: (val: string) => ["left", "right"].includes(val),
  },
});
const showMobile = ref(false);
// Optionally expose a method to open sidebar on mobile
// Use provide/inject or event bus if needed
</script>
