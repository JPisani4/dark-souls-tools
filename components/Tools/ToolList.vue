<script setup lang="ts">
import { tools } from "~/tools";
</script>

<template>
  <UCard v-for="tool in tools" :key="tool.slug">
    <template #header
      ><NuxtLink :to="`/tools/${tool.slug}`">{{
        tool.title
      }}</NuxtLink></template
    >

    <p>{{ tool.description }}</p>
  </UCard>
</template>
