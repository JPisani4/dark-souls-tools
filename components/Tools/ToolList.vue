<script setup lang="ts">
import { tools } from "~/tools";
import { ref } from "vue";

// Define a palette of Tailwind border, text/icon, and lighter gradient colors for both light and dark mode
const colorMap = [
  {
    border: "border-blue-500",
    text: "text-blue-700",
    iconBg: "bg-blue-500",
    gradient: "from-blue-100 to-blue-200",
    darkGradient: "dark:from-blue-900 dark:to-gray-900",
  },
  {
    border: "border-green-500",
    text: "text-green-700",
    iconBg: "bg-green-500",
    gradient: "from-green-100 to-green-200",
    darkGradient: "dark:from-green-900 dark:to-gray-900",
  },
  {
    border: "border-yellow-500",
    text: "text-yellow-700",
    iconBg: "bg-yellow-500",
    gradient: "from-yellow-100 to-yellow-200",
    darkGradient: "dark:from-yellow-900 dark:to-gray-900",
  },
  {
    border: "border-pink-500",
    text: "text-pink-700",
    iconBg: "bg-pink-500",
    gradient: "from-pink-100 to-pink-200",
    darkGradient: "dark:from-pink-900 dark:to-gray-900",
  },
  {
    border: "border-purple-500",
    text: "text-purple-700",
    iconBg: "bg-purple-500",
    gradient: "from-purple-100 to-purple-200",
    darkGradient: "dark:from-purple-900 dark:to-gray-900",
  },
  {
    border: "border-orange-500",
    text: "text-orange-700",
    iconBg: "bg-orange-500",
    gradient: "from-orange-100 to-orange-200",
    darkGradient: "dark:from-orange-900 dark:to-gray-900",
  },
  {
    border: "border-teal-500",
    text: "text-teal-700",
    iconBg: "bg-teal-500",
    gradient: "from-teal-100 to-teal-200",
    darkGradient: "dark:from-teal-900 dark:to-gray-900",
  },
  {
    border: "border-red-500",
    text: "text-red-700",
    iconBg: "bg-red-500",
    gradient: "from-red-100 to-red-200",
    darkGradient: "dark:from-red-900 dark:to-gray-900",
  },
];

// Assign a random color to each tool (stable per render)
const toolColors = ref(
  tools.map(() => colorMap[Math.floor(Math.random() * colorMap.length)])
);
</script>

<template>
  <section
    class="flex flex-col items-center w-full py-12 bg-gray-50 dark:bg-gray-900 min-h-screen"
  >
    <div class="w-full max-w-2xl mx-auto mb-10 text-center">
      <h1
        class="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white"
      >
        Tools
      </h1>
      <span
        class="inline-block px-4 py-1 rounded-full text-gray-700 dark:text-gray-200 text-base font-medium mb-2"
      >
        Explore a set of calculators and helpers for Dark Souls.
      </span>
      <hr
        class="border-t border-gray-300 dark:border-gray-700 w-24 mx-auto mt-2"
      />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-5xl px-4"
    >
      <UCard
        v-for="(tool, i) in tools"
        :key="tool.slug"
        :class="`relative h-full flex flex-col justify-between shadow-md rounded-xl border-l-8 ${toolColors[i].border} bg-gradient-to-br ${toolColors[i].gradient} ${toolColors[i].darkGradient} overflow-hidden`"
      >
        <!-- Overlay for readability -->
        <div
          class="absolute inset-0 pointer-events-none"
          :class="'bg-white/70 dark:bg-gray-950/80'"
        />
        <template #header>
          <div
            class="flex items-center gap-3 justify-center mb-2 mt-2 relative z-10"
          >
            <div
              :class="`w-10 h-10 flex items-center justify-center rounded-full shadow ${toolColors[i].iconBg}`"
            >
              <UIcon name="i-heroicons-cube" class="text-white text-xl" />
            </div>
            <h2 :class="`text-xl font-semibold text-gray-900 dark:text-white`">
              <NuxtLink
                :to="`/tools/${tool.slug}`"
                class="underline hover:text-primary transition-colors"
              >
                {{ tool.title }}
              </NuxtLink>
            </h2>
            <UBadge v-if="i === 0" color="primary" variant="soft" size="sm"
              >Popular</UBadge
            >
          </div>
        </template>
        <div
          class="flex flex-1 items-center justify-center px-4 pb-6 pt-2 relative z-10"
        >
          <p
            class="text-base font-medium text-gray-700 dark:text-gray-200 text-center leading-relaxed"
          >
            {{ tool.description }}
          </p>
        </div>
      </UCard>
    </div>
  </section>
</template>
