<script setup lang="ts">
import { tools } from "~/tools";
import { useRoute } from "vue-router";
import { computed, ref, defineAsyncComponent } from "vue";

const route = useRoute();
const slug = computed(() => (route.params.slug as string).toLowerCase());

const tool = tools.find((t) => t.slug === slug.value);

const ToolComponent = ref<any>(null);

if (tool) {
  tool.loadComponent().then((mod) => {
    ToolComponent.value = defineAsyncComponent(() =>
      Promise.resolve(mod.default)
    );
  });
} else {
  console.error(`Tool not found: ${slug.value}`);
}
</script>

<template>
  <div v-if="ToolComponent">
    <component :is="ToolComponent" />
  </div>

  <div v-else>
    <p>Tool not found: {{ slug }}</p>
  </div>
</template>
