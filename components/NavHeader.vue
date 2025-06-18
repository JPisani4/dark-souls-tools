<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
  {
    label: "Home",
    icon: "",
    to: "/",
  },
  {
    label: "Tools",
    icon: "",
    to: "/tools",
  },
]);
</script>

<template>
  <UNavigationMenu :items="items" variant="link" />
</template>
