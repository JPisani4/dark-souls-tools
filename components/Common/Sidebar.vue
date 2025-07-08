<template>
  <div class="flex w-full min-h-screen">
    <!-- Left sidebar (visible when side === 'left') -->
    <div
      v-if="side === 'left'"
      class="hidden md:block w-72 sticky top-14 bg-white dark:bg-gray-900 p-6 overflow-y-auto overflow-x-hidden z-20"
      aria-label="Sidebar"
    >
      <slot name="sidebar" />
    </div>

    <!-- Invisible left placeholder (when side === 'right') -->
    <div
      v-if="side === 'right'"
      class="hidden md:block w-72"
      aria-hidden="true"
    ></div>

    <main class="flex-1 flex justify-center">
      <div class="w-full">
        <slot />
      </div>
    </main>

    <!-- Right sidebar (visible when side === 'right') -->
    <div
      v-if="side === 'right'"
      class="hidden md:block w-72 sticky top-14 bg-white dark:bg-gray-900 p-6 overflow-y-auto z-20"
      aria-label="Sidebar"
    >
      <slot name="sidebar" />
    </div>

    <!-- Invisible right placeholder (when side === 'left') -->
    <div
      v-if="side === 'left'"
      class="hidden md:block w-72"
      aria-hidden="true"
    ></div>
  </div>
  <UModal v-model="showMobile" class="md:hidden z-50">
    <div class="w-full max-w-xs bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <slot name="sidebar" />
    </div>
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
