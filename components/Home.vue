<script setup lang="ts">
import HeroSection from "./Tools/Common/HeroSection.vue";
import { ICONS, getRandomTheme } from "~/utils/constants";
import { computed } from "vue";

const selectedTheme = getRandomTheme();

const [fromClass, toClass] = selectedTheme.bg.split(" ");

const colorMap = [
  {
    border: "border-blue-500",
    text: "text-blue-700",
    iconBg: "bg-blue-500",
    gradient: "from-blue-100 to-blue-200",
    darkGradient: "dark:from-blue-900 dark:to-gray-900",
    icon: "i-heroicons-sparkles",
  },
  {
    border: "border-purple-500",
    text: "text-purple-700",
    iconBg: "bg-purple-500",
    gradient: "from-purple-100 to-purple-200",
    darkGradient: "dark:from-purple-900 dark:to-gray-900",
    icon: "i-heroicons-link",
  },
  {
    border: "border-green-500",
    text: "text-green-700",
    iconBg: "bg-green-500",
    gradient: "from-green-100 to-green-200",
    darkGradient: "dark:from-green-900 dark:to-gray-900",
    icon: "i-heroicons-check-badge",
  },
  {
    border: "border-yellow-500",
    text: "text-yellow-700",
    iconBg: "bg-yellow-500",
    gradient: "from-yellow-100 to-yellow-200",
    darkGradient: "dark:from-yellow-900 dark:to-gray-900",
    icon: "i-heroicons-star",
  },
  {
    border: "border-pink-500",
    text: "text-pink-700",
    iconBg: "bg-pink-500",
    gradient: "from-pink-100 to-pink-200",
    darkGradient: "dark:from-pink-900 dark:to-gray-900",
    icon: "i-heroicons-heart",
  },
  {
    border: "border-indigo-500",
    text: "text-indigo-700",
    iconBg: "bg-indigo-500",
    gradient: "from-indigo-100 to-indigo-200",
    darkGradient: "dark:from-indigo-900 dark:to-gray-900",
    icon: "i-heroicons-light-bulb",
  },
];

// Map Tailwind text color classes to hex values for hero shadow
const tailwindColorMap = {
  "text-blue-700": "#1d4ed8",
  "text-blue-600": "#2563eb",
  "text-purple-700": "#7c3aed",
  "text-purple-600": "#8b5cf6",
  "text-green-600": "#16a34a",
  "text-orange-600": "#ea580c",
  "text-red-600": "#dc2626",
  "text-yellow-600": "#ca8a04",
  "text-indigo-600": "#4f46e5",
  "text-primary": "#22d3ee", // fallback
};

const heroShadowColor = computed(() => {
  const iconClass = selectedTheme?.icon;
  if (iconClass && tailwindColorMap[iconClass]) {
    return tailwindColorMap[iconClass];
  }
  return "#22d3ee";
});

// Add colorMap shadow color mapping
const cardShadowColorMap: Record<string, string> = {
  "border-blue-500": "#3b82f6",
  "border-purple-500": "#a21caf",
};

// Randomize color for each card
const updatesColor = colorMap[Math.floor(Math.random() * colorMap.length)];
const linksColor = colorMap[Math.floor(Math.random() * colorMap.length)];
</script>

<template>
  <UContainer class="max-w-3xl mx-auto flex flex-col items-center">
    <div
      :class="'w-full mb-12 p-0 md:p-14 rounded-3xl relative flex flex-col items-center mt-8 overflow-hidden'"
      :style="{
        boxShadow: `0 0 12px 3px ${heroShadowColor}, 0 6px 24px 0 rgba(0,0,0,0.10)`,
      }"
    >
      <!-- Hero background overlay -->
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
              url(&quot;/background-blur.jpg&quot;),
              url(&quot;/background.jpg&quot;);
          "
        ></div>
        <div
          :class="`w-full h-full bg-gradient-to-br ${fromClass} ${toClass} to-transparent opacity-5 dark:opacity-10 absolute`"
        ></div>
      </div>
      <HeroSection
        :title="'Dark Souls Tools'"
        :description="'Useful tools for your Dark Souls playthrough and build.'"
        icon-name="i-heroicons-fire"
        :theme="selectedTheme"
        variant="homepage"
        class="mb-0 z-10"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 w-full mb-8">
      <!-- Latest Updates Section -->
      <UCard
        :class="`shadow-md rounded-xl bg-gradient-to-br ${updatesColor.gradient} ${updatesColor.darkGradient} w-full h-full p-0 border-l-4 ${updatesColor.border}`"
      >
        <div class="flex flex-row items-center gap-4 px-6 pt-6 pb-2">
          <div
            :class="`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br ${updatesColor.iconBg}`"
          >
            <UIcon name="i-heroicons-calendar" class="text-white text-xl" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Latest Updates
          </h2>
        </div>
        <div class="flex flex-col items-start px-6 pb-6 pt-2 w-full">
          <ul class="divide-y divide-gray-200 dark:divide-gray-700 w-full">
            <li class="py-3">
              <div class="flex items-center gap-2">
                <span
                  :class="`text-[10px] font-medium ${updatesColor.text} bg-white border ${updatesColor.border} rounded-full px-1.5 h-5 flex items-center min-w-0 whitespace-nowrap overflow-hidden leading-none text-center`"
                  aria-label="Update date"
                  >June 2025</span
                >
                <span
                  class="text-lg md:text-xl font-bold text-gray-900 dark:text-white"
                  >Soul Level Calculator Tool</span
                >
              </div>
              <div
                class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-1"
              >
                <span class="text-sm text-gray-700 dark:text-gray-300"
                  >Calculates number of souls needed to reach a specific
                  level.</span
                >
                <NuxtLink
                  to="/tools/soul-level-calculator"
                  :class="`inline-flex items-center justify-center px-2.5 py-2 rounded-md ${updatesColor.iconBg} text-white hover:opacity-80 transition shadow-sm w-9 h-9`"
                  aria-label="Open tool"
                >
                  <UIcon name="i-heroicons-arrow-right" class="w-5 h-5" />
                </NuxtLink>
              </div>
            </li>
            <li class="py-3">
              <div class="flex items-center gap-2">
                <span
                  :class="`text-[10px] font-medium ${updatesColor.text} bg-white border ${updatesColor.border} rounded-full px-1.5 h-5 flex items-center min-w-0 whitespace-nowrap overflow-hidden leading-none text-center`"
                  aria-label="Update date"
                  >June 2025</span
                >
                <span
                  class="text-lg md:text-xl font-bold text-gray-900 dark:text-white"
                  >Weapon Upgrade Calculator</span
                >
              </div>
              <div
                class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-1"
              >
                <span class="text-sm text-gray-700 dark:text-gray-300"
                  >Calculates number of souls needed to reinforce a weapon to a
                  specific level or path.
                </span>
                <NuxtLink
                  to="/tools/weapon-upgrade-calculator"
                  :class="`inline-flex items-center justify-center px-2.5 py-2 rounded-md ${updatesColor.iconBg} text-white hover:opacity-80 transition shadow-sm w-9 h-9`"
                  aria-label="Open tool"
                >
                  <UIcon name="i-heroicons-arrow-right" class="w-5 h-5" />
                </NuxtLink>
              </div>
            </li>
          </ul>
        </div>
      </UCard>

      <!-- Useful Links Section -->
      <UCard
        :class="`shadow-md rounded-xl bg-gradient-to-br ${linksColor.gradient} ${linksColor.darkGradient} w-full h-full p-0 border-l-4 ${linksColor.border}`"
      >
        <div class="flex flex-row items-center gap-4 px-6 pt-6 pb-2">
          <div
            :class="`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br ${linksColor.iconBg}`"
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
