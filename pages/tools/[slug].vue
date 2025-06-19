<script setup lang="ts">
import { tools } from "~/tools";
import { useRoute } from "vue-router";
import { computed, ref, defineAsyncComponent } from "vue";

const route = useRoute();
const slug = computed(() => (route.params.slug as string).toLowerCase());

const tool = tools.find((t) => t.slug === slug.value);

const ToolComponent = ref<any>(null);
const loading = ref(false);

// Define a set of color objects for light/dark mode
const spinnerColors = [
  { light: "text-blue-500", dark: "text-blue-300" },
  { light: "text-green-500", dark: "text-green-300" },
  { light: "text-red-500", dark: "text-red-300" },
  { light: "text-yellow-500", dark: "text-yellow-300" },
  { light: "text-purple-500", dark: "text-purple-300" },
  { light: "text-pink-500", dark: "text-pink-300" },
  { light: "text-teal-500", dark: "text-teal-300" },
  { light: "text-orange-500", dark: "text-orange-300" },
];
const spinnerColorObj =
  spinnerColors[Math.floor(Math.random() * spinnerColors.length)];
const isDark = computed(() => useColorMode().value === "dark");
const spinnerColorClass = computed(() =>
  isDark.value ? spinnerColorObj.dark : spinnerColorObj.light
);

if (tool) {
  loading.value = true;
  tool.loadComponent().then((mod) => {
    ToolComponent.value = defineAsyncComponent(() =>
      Promise.resolve(mod.default)
    );
    loading.value = false;
  });
} else {
  console.error(`Tool not found: ${slug.value}`);
}
</script>

<template>
  <div v-if="ToolComponent">
    <component :is="ToolComponent" />
  </div>

  <div v-else-if="loading">
    <div class="flex flex-col justify-center items-center h-48">
      <svg
        :class="`animate-spin h-16 w-16 ${spinnerColorClass} drop-shadow-lg`"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
      <span
        :class="`mt-4 text-lg font-semibold animate-pulse ${spinnerColorClass}`"
        >Loading...</span
      >
    </div>
  </div>

  <div v-else>
    <p class="text-center text-red-500">Tool not found: {{ slug }}</p>
  </div>
</template>
