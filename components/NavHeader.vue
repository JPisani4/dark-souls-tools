<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { ref, onMounted } from "vue";

const colorMode = useColorMode();

const items = ref<NavigationMenuItem[]>([
  { label: "Home", to: "/" },
  { label: "Tools", to: "/tools" },
]);

function toggleColorMode(val: boolean) {
  colorMode.preference = val ? "dark" : "light";
}

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <header
    class="sticky top-0 z-30 w-full bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-md"
  >
    <nav class="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
      <div class="flex items-center gap-3">
        <UIcon name="i-heroicons-fire" class="text-2xl text-primary" />
        <NuxtLink
          to="/"
          class="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-primary transition-colors"
        >
          Dark Souls Tools
        </NuxtLink>
      </div>
      <UNavigationMenu
        :items="items"
        variant="link"
        class="flex-1 justify-center"
      />
      <div v-if="isMounted" class="flex items-center gap-2">
        <USwitch
          :model-value="colorMode.value === 'dark'"
          @update:model-value="toggleColorMode"
          aria-label="Toggle dark mode"
        />
        <span class="text-xs text-gray-500 dark:text-gray-400">
          <span v-if="colorMode.value === 'dark'">☀</span>
          <span v-else>🌙</span>
        </span>
      </div>
    </nav>
  </header>
</template>
