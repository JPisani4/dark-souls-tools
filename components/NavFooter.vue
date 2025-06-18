<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    to: "https://github.com/JPisani4",
    target: "_blank",
  },
  {
    label: "Contact",
    icon: "",
    to: "mailto:x@y.com",
  },
]);
</script>

<template>
  <UNavigationMenu :items="items" variant="link" />

  <div>
    Dark Souls is a registered trademark of BANDAI NAMCO ENTERTAINMENT INC.
  </div>
</template>
