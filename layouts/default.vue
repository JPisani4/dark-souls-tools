<script setup lang="ts">
import NavHeader from "~/components/NavHeader.vue";
import NavFooter from "~/components/NavFooter.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavHeader />

    <main class="flex-1 container mx-auto">
      <NuxtPage />
    </main>

    <NavFooter />
  </div>
</template>
