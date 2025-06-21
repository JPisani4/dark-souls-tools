<script setup lang="ts">
import NavHeader from "~/components/NavHeader.vue";
import NavFooter from "~/components/NavFooter.vue";
</script>

<template>
  <div>
    <!-- Skip to main content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only absolute left-2 top-2 z-50 bg-primary text-white px-4 py-2 rounded shadow focus:outline-none"
    >
      Skip to main content
    </a>
    <NavHeader />
    <main id="main-content" tabindex="-1" role="main">
      <NuxtPage />
    </main>
    <NavFooter />
  </div>
</template>
