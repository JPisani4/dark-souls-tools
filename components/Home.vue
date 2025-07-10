<script setup lang="ts">
import HeroSection from "./Tools/Common/HeroSection.vue";
import { tools } from "~/tools";
import { ref, computed } from "vue";
import { getRandomTheme } from "~/utils/themes/colorSystem";
// Expanded Tailwind color mapping for all theme colors
const TAILWIND_HEX: Record<string, string> = {
  "blue-500": "#3b82f6",
  "green-500": "#22c55e",
  "yellow-500": "#eab308",
  "pink-500": "#ec4899",
  "purple-500": "#a21caf",
  "orange-500": "#f97316",
  "teal-500": "#14b8a6",
  "red-500": "#ef4444",
  // fallback
  default: "#22d3ee",
};
import Icon from "~/components/Common/Icon.vue";
import { useRouter } from "vue-router";
import type { Tool } from "~/types/tools/tool";

const router = useRouter();

// Featured tools (top 3 most important)
const featuredToolSlugs = [
  "starting-class-optimizer",
  "weapon-attack-rating-calculator",
  "armor-optimizer",
];
const featuredTools = computed<Tool[]>(() =>
  (tools as Tool[])
    .filter((tool) => featuredToolSlugs.includes(tool.slug))
    .slice(0, 3)
);

// Theme for hero section
const selectedTheme = getRandomTheme();
const [fromClass, toClass] = selectedTheme.bg.split(" ");
const heroShadowColor = computed(() => {
  const iconClass = selectedTheme?.icon;
  return (
    {
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
    }[iconClass] || "#22d3ee"
  );
});

// Game display names
const getGameDisplayName = (gameCategory: string): string => {
  const gameNames: Record<string, string> = {
    ds1: "Dark Souls 1",
    ds2: "Dark Souls 2",
    ds3: "Dark Souls 3",
    bb: "Bloodborne",
    er: "Elden Ring",
  };
  return gameNames[gameCategory] || gameCategory.toUpperCase();
};

// Feedback/contact
const contactEmail = "contact@goldphantom.com";
const githubUrl = "https://github.com/JPisani4/dark-souls-tools/issues";

function goToTools() {
  router.push("/tools");
}

// Extract the color part from selectedTheme.border (e.g., 'border-blue-500' -> 'blue-500')
const borderColorClass = selectedTheme.border.replace("border-", "");
const accentColor = TAILWIND_HEX[borderColorClass] || TAILWIND_HEX["default"];
</script>

<template>
  <UContainer class="max-w-3xl mx-auto flex flex-col items-center" role="main">
    <!-- Hero Section -->
    <div
      :class="'w-full mb-12 p-8 md:p-14 rounded-3xl relative flex flex-col items-center justify-center min-h-[200px] mt-8 overflow-hidden'"
      :style="{
        boxShadow: `0 0 12px 3px ${accentColor}, 0 6px 24px 0 rgba(0,0,0,0.10)`,
      }"
      aria-labelledby="homepage-hero-title"
    >
      <div class="absolute inset-0 z-0 pointer-events-none">
        <NuxtImg
          src="/soulsborne-tools-hero.webp"
          alt="Soulsborne tools hero background with dark fantasy aesthetic"
          class="w-full h-full object-cover object-center absolute"
          format="webp"
          preload
          style="z-index: 0; inset: 0; position: absolute"
          aria-hidden="true"
        />
        <div
          :class="`w-full h-full bg-gradient-to-br ${fromClass} ${toClass} to-transparent opacity-5 dark:opacity-10 absolute`"
          aria-hidden="true"
        ></div>
      </div>
      <HeroSection
        :title="'Gold Phantom'"
        :description="'Essential Soulsborne Tools & Calculators'"
        :icon-path="'/favicon.webp'"
        :theme="selectedTheme"
        variant="homepage"
        class="mb-0 z-10"
        id="homepage-hero-title"
      />
      <div class="z-10 mt-4 flex flex-col items-center">
        <p
          class="text-lg text-center max-w-xl mb-4 inline-block rounded-xl px-3 py-1 text-white/90"
          :style="`${$colorMode.value === 'dark' ? 'background:rgba(0,0,0,0.10);' : 'background:rgba(0,0,0,0.04);'}`"
        >
          A collection of helpful, modern tools for your Soulsborne playthrough
        </p>
        <UButton
          size="xl"
          @click="goToTools"
          class="pop-btn focus:outline focus:ring focus:ring-primary"
        >
          Browse Tools
        </UButton>
      </div>
    </div>

    <!-- Featured Tools -->
    <section
      class="w-full mb-10"
      :style="{ '--accent-color': accentColor }"
      aria-labelledby="featured-tools-title"
    >
      <h2
        id="featured-tools-title"
        class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center"
      >
        Featured Tools
      </h2>
      <div class="flex flex-col gap-4">
        <UCard
          v-for="tool in featuredTools"
          :key="tool.slug"
          as="a"
          :href="`/tools/${tool.gameCategories[0]}/${tool.slug}`"
          :aria-label="`${tool.title} (${getGameDisplayName(tool.gameCategories[0])})`"
          class="featured-card flex flex-row items-center gap-4 p-4 cursor-pointer border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 min-h-[80px] transition-all duration-150 focus:outline focus:ring focus:ring-primary"
          :style="{ '--accent-color': accentColor }"
        >
          <div class="flex flex-col flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-0.5 min-w-0 flex-wrap">
              <template
                v-if="
                  tool.icon &&
                  (tool.icon.endsWith('.png') ||
                    tool.icon.endsWith('.jpg') ||
                    tool.icon.endsWith('.webp'))
                "
              >
                <NuxtImg
                  :src="tool.icon"
                  :alt="tool.title + ' icon'"
                  class="featured-icon w-7 h-7 flex-shrink-0 object-contain"
                  style="width: 28px; height: 28px"
                  format="webp"
                  loading="lazy"
                  decoding="async"
                />
              </template>
              <template v-else>
                <Icon
                  :name="tool.icon || 'i-heroicons-sparkles'"
                  class="featured-icon w-7 h-7 flex-shrink-0 text-primary transition-colors duration-150"
                  aria-hidden="true"
                />
              </template>
              <span
                class="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-[60vw] sm:max-w-xs md:max-w-sm"
                >{{ tool.title }}</span
              >
              <span
                class="inline-block text-xs rounded-full px-2 py-0.5 bg-primary/10 text-primary font-medium flex-shrink-0 max-w-[110px] truncate"
                >{{ getGameDisplayName(tool.gameCategories[0]) }}</span
              >
              <span
                v-if="tool.category"
                class="inline-block text-xs rounded-full px-2 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium flex-shrink-0 max-w-[110px] truncate"
                >{{ tool.category }}</span
              >
            </div>
            <div
              class="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-1 max-w-full overflow-hidden"
            >
              {{ tool.description }}
            </div>
          </div>
        </UCard>
      </div>
      <div class="w-full flex justify-center mt-8">
        <UButton
          size="xl"
          variant="solid"
          class="pop-btn px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-150 focus:outline focus:ring focus:ring-primary"
          @click="goToTools"
        >
          View All Tools
        </UButton>
      </div>
    </section>

    <!-- About Gold Phantom / Jolly Co-operation Section -->
    <section
      class="w-full max-w-2xl mx-auto mb-20"
      aria-labelledby="about-gold-phantom-title"
    >
      <div
        class="rounded-2xl bg-white/80 dark:bg-gray-900/80 shadow-md p-8 flex flex-col items-center"
      >
        <h2
          id="about-gold-phantom-title"
          class="text-xl font-bold text-gray-900 dark:text-white mb-2"
        >
          About Gold Phantom
        </h2>
        <p class="text-gray-700 dark:text-gray-300 text-center mb-4">
          Gold Phantom was born out of frustration with the limited and
          scattered tools available for Dark Souls Remastered. I wanted a single
          place with every useful calculator and feature I wished existed built
          for players, by a player, in the spirit of
          <span class="font-semibold">jolly cooperation</span>.
        </p>
        <p class="text-gray-700 dark:text-gray-300 text-center mb-4">
          Have ideas or feedback? Reach out via
          <a
            :href="`mailto:${contactEmail}`"
            class="text-primary underline hover:opacity-80 focus:outline focus:ring focus:ring-primary"
            >email</a
          >
          or
          <a
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary underline hover:opacity-80 focus:outline focus:ring focus:ring-primary"
            >GitHub</a
          >
          your suggestions help make these tools better for everyone.
        </p>
      </div>
    </section>
  </UContainer>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featured-card {
  transition:
    box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.15s;
}
.featured-card:hover {
  box-shadow:
    0 8px 32px 0 var(--accent-color, #22d3ee33),
    0 2px 8px 0 rgba(0, 0, 0, 0.1);
  border-color: var(--accent-color, #22d3ee);
  transform: translateY(-2px) scale(1.03);
}
.featured-card:hover .featured-icon {
  color: var(--accent-color, #22d3ee);
}

.pop-btn {
  transition:
    box-shadow 0.15s,
    transform 0.15s,
    background 0.15s,
    color 0.15s;
}
/* Force a slightly darker green background on the homepage hero Browse Tools button on hover, overriding Nuxt UI's UButton styles */
.pop-btn:hover,
.pop-btn:focus-visible {
  background: #16a34a !important; /* Tailwind green-600 */
  color: #fff !important;
  box-shadow:
    0 8px 32px 0 rgba(34, 211, 238, 0.15),
    0 2px 8px 0 rgba(0, 0, 0, 0.1);
  transform: translateY(-2px) scale(1.03);
}
</style>
