<script setup lang="ts">
import { ref } from "vue";
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    to: "https://github.com/JPisani4/dark-souls-tools",
    target: "_blank",
  },
  {
    label: "Contact",
    icon: "i-heroicons-envelope",
    to: "mailto:contact@goldphantom.com",
  },
]);
</script>

<template>
  <footer
    class="w-full bg-white/80 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-md mt-8"
  >
    <div class="max-w-3xl mx-auto flex flex-col items-center py-6 px-4">
      <div class="flex items-center gap-4 mb-2">
        <UNavigationMenu :items="items" variant="link" />
      </div>
      <div
        class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 text-center"
      >
        <span>
          Dark Souls is a registered trademark of BANDAI NAMCO ENTERTAINMENT
          INC. This project is not affiliated with or endorsed by BANDAI NAMCO.
        </span>
      </div>
    </div>
  </footer>
</template>
