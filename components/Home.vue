<script setup lang="ts">
import HeroSection from "./Tools/Common/HeroSection.vue";
import { tools } from "~/tools";
import { ref, computed } from "vue";
import { getRandomTheme } from "~/utils/themes/colorSystem";

// Generate random theme for the hero section
const selectedTheme = getRandomTheme();

// Extract gradient classes for dynamic styling
const [fromClass, toClass] = selectedTheme.bg.split(" ");

// Simplified color mapping for hero shadow effects
const tailwindColorMap: Record<string, string> = {
  "text-blue-700": "#1d4ed8",
  "text-blue-600": "#2563eb",
  "text-purple-700": "#7c3aed",
  "text-purple-600": "#8b5cf6",
  "text-green-600": "#16a34a",
  "text-orange-600": "#ea580c",
  "text-red-600": "#dc2626",
  "text-yellow-600": "#ca8a04",
  "text-indigo-600": "#4f46e5",
  "text-primary": "#22d3ee",
};

// Compute hero shadow color based on theme icon
const heroShadowColor = computed(() => {
  const iconClass = selectedTheme?.icon;
  return tailwindColorMap[iconClass] || "#22d3ee";
});

// Generate themes for different sections to maintain visual variety
const updatesTheme = getRandomTheme();
const linksTheme = getRandomTheme();

// Get latest tools for updates section (tools created in last 30 days)
const latestTools = computed(() => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return tools
    .filter((tool) => tool.createdAt && tool.createdAt > thirtyDaysAgo)
    .sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.getTime() - a.createdAt.getTime();
    })
    .slice(0, 2);
});

// Map game categories to display names for better UX
const getGameDisplayName = (gameCategory: string): string => {
  const gameNames: Record<string, string> = {
    ds1: "DS1",
    ds2: "DS2",
    ds3: "DS3",
    bb: "BB",
    er: "ER",
  };
  return gameNames[gameCategory] || gameCategory.toUpperCase();
};
</script>

<template>
  <UContainer class="max-w-3xl mx-auto flex flex-col items-center">
    <!-- Hero Section with dynamic background and shadow effects -->
    <div
      :class="'w-full mb-12 p-8 md:p-14 rounded-3xl relative flex flex-col items-center justify-center min-h-[200px] mt-8 overflow-hidden'"
      :style="{
        boxShadow: `0 0 12px 3px ${heroShadowColor}, 0 6px 24px 0 rgba(0,0,0,0.10)`,
      }"
    >
      <!-- Hero background overlay with gradient and image -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div
          class="w-full h-full bg-cover bg-center absolute"
          style="
            background-image:
              linear-gradient(
                to bottom right,
                rgba(30, 41, 59, 0.3),
                rgba(0, 0, 0, 0.2)
              ),
              url(&quot;/homepage_hero_background.png&quot;);
          "
        ></div>
        <div
          :class="`w-full h-full bg-gradient-to-br ${fromClass} ${toClass} to-transparent opacity-5 dark:opacity-10 absolute`"
        ></div>
      </div>
      <HeroSection
        :title="'Gold Phantom'"
        :description="'A library of helpful tools for your soulsborne playthrough'"
        :icon-path="'/favicon.png'"
        :theme="selectedTheme"
        variant="homepage"
        class="mb-0 z-10"
      />
    </div>

    <!-- Main content grid with updates and links sections -->
    <div class="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 w-full mb-8">
      <!-- Latest Updates Section - Shows recently added tools -->
      <UCard
        :class="`shadow-md rounded-xl bg-gradient-to-br ${updatesTheme.gradient} ${updatesTheme.darkGradient} w-full h-full p-0 border-l-4 ${updatesTheme.border}`"
      >
        <div class="flex flex-row items-center gap-4 px-6 pt-6 pb-2">
          <div
            :class="`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br ${updatesTheme.iconBg}`"
          >
            <UIcon name="i-heroicons-calendar" class="text-white text-xl" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Tools
          </h2>
        </div>
        <div class="flex flex-col items-start px-6 pb-6 pt-2 w-full">
          <ul
            v-if="latestTools.length > 0"
            class="divide-y divide-gray-200 dark:divide-gray-700 w-full"
          >
            <li v-for="tool in latestTools" :key="tool.slug" class="py-3">
              <div class="flex items-center gap-2">
                <span
                  :class="`text-[10px] font-medium ${updatesTheme.text} bg-white border ${updatesTheme.border} rounded-full px-1.5 h-5 flex items-center min-w-0 whitespace-nowrap overflow-hidden leading-none text-center`"
                  aria-label="Game category"
                  >{{ getGameDisplayName(tool.gameCategories[0]) }}</span
                >
                <span
                  class="text-lg md:text-xl font-bold text-gray-900 dark:text-white"
                  >{{ tool.title }}</span
                >
              </div>
              <div
                class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-1"
              >
                <span class="text-sm text-gray-700 dark:text-gray-300">{{
                  tool.description
                }}</span>
                <NuxtLink
                  :to="`/tools?search=${encodeURIComponent(tool.title)}`"
                  :class="`inline-flex items-center justify-center px-2.5 py-2 rounded-md ${updatesTheme.iconBg} text-white hover:opacity-80 transition shadow-sm w-9 h-9`"
                  aria-label="Search for tool"
                >
                  <UIcon name="i-heroicons-arrow-right" class="w-5 h-5" />
                </NuxtLink>
              </div>
            </li>
          </ul>
          <div v-else class="py-6 text-center w-full">
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              No new tools added recently. Check back soon for updates!
            </p>
          </div>
        </div>
      </UCard>

      <!-- Useful Links Section - External resources for players -->
      <UCard
        :class="`shadow-md rounded-xl bg-gradient-to-br ${linksTheme.gradient} ${linksTheme.darkGradient} w-full h-full p-0 border-l-4 ${linksTheme.border}`"
      >
        <div class="flex flex-row items-center gap-4 px-6 pt-6 pb-2">
          <div
            :class="`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br ${linksTheme.iconBg}`"
          >
            <UIcon name="i-heroicons-link" class="text-white text-xl" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Useful Links
          </h2>
        </div>
        <div class="flex flex-col items-start px-6 pb-6 pt-2 w-full">
          <ul class="divide-y divide-gray-200 dark:divide-gray-700 w-full">
            <li class="py-3">
              <NuxtLink
                to="https://darksouls.wikidot.com/"
                target="_blank"
                class="flex items-center gap-2 text-base font-medium text-blue-700 dark:text-blue-300 hover:underline hover:text-blue-900 transition"
              >
                WikiDot
                <UIcon
                  name="i-heroicons-arrow-top-right-on-square"
                  class="w-4 h-4"
                />
              </NuxtLink>
              <div class="text-sm text-gray-700 dark:text-gray-300 mt-1">
                A wiki for various information.
              </div>
            </li>
            <li class="py-3">
              <NuxtLink
                to="https://darksouls.wiki.fextralife.com/Dark+Souls+Wiki"
                target="_blank"
                class="flex items-center gap-2 text-base font-medium text-blue-700 dark:text-blue-300 hover:underline hover:text-blue-900 transition"
              >
                FextraLife
                <UIcon
                  name="i-heroicons-arrow-top-right-on-square"
                  class="w-4 h-4"
                />
              </NuxtLink>
              <div class="text-sm text-gray-700 dark:text-gray-300 mt-1">
                A wiki for various information.
              </div>
            </li>
          </ul>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
