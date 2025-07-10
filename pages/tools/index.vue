<script setup lang="ts">
import ToolLayout from "~/components/Tools/Common/ToolLayout.vue";
import ToolList from "~/components/Tools/Common/ToolList.vue";
import ToolFilterSidebar from "~/components/Tools/Common/ToolFilterSidebar.vue";
import { useToolFilters } from "~/composables/useToolFilters";
import { getRandomTheme } from "~/utils/constants";
import { useHead } from "#imports";
import { tools } from "~/tools";

const selectedTheme = getRandomTheme();
const {
  filters,
  availableGames,
  availableCategories,
  updateFilters,
  clearFilters,
} = useToolFilters();

// Tools index page-specific SEO
useHead({
  title: "Dark Souls Tools & Calculators - Gold Phantom",
  meta: [
    {
      name: "description",
      content:
        "Browse all Dark Souls 1 tools and calculators. Find soul level calculators, armor optimizers, weapon calculators, and more for Dark Souls Remastered.",
    },
    {
      name: "keywords",
      content:
        "dark souls tools, dark souls 1 calculators, soul level calculator, armor optimizer, weapon calculator, dark souls remastered tools",
    },
    // Open Graph
    {
      property: "og:title",
      content: "Dark Souls Tools & Calculators - Gold Phantom",
    },
    {
      property: "og:description",
      content:
        "Browse all Dark Souls 1 tools and calculators. Find soul level calculators, armor optimizers, weapon calculators, and more for Dark Souls Remastered.",
    },
    // Twitter Card
    {
      name: "twitter:title",
      content: "Dark Souls Tools & Calculators - Gold Phantom",
    },
    {
      name: "twitter:description",
      content:
        "Browse all Dark Souls 1 tools and calculators. Find soul level calculators, armor optimizers, weapon calculators, and more for Dark Souls Remastered.",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://www.goldphantom.com/tools#collection",
        url: "https://www.goldphantom.com/tools",
        name: "Dark Souls Tools & Calculators",
        description:
          "Browse all Dark Souls 1 tools and calculators. Find soul level calculators, armor optimizers, weapon calculators, and more for Dark Souls Remastered.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: tools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "SoftwareApplication",
              "@id": `https://www.goldphantom.com/tools/ds1/${tool.slug}#tool`,
              name: tool.title,
              description: tool.description,
              url: `https://www.goldphantom.com/tools/ds1/${tool.slug}`,
              applicationCategory: tool.category || "Gaming Tool",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
            },
          })),
        },
        about: [
          {
            "@type": "Thing",
            name: "Dark Souls 1",
            alternateName: "Dark Souls Remastered",
          },
        ],
      }),
    },
  ],
});
</script>

<template>
  <ToolLayout
    title="Dark Souls Tools & Calculators"
    description="Browse all Dark Souls 1 tools and calculators. Find soul level calculators, armor optimizers, weapon calculators, and more for Dark Souls Remastered."
    icon-path="/favicon.webp"
  >
    <template #hero>
      <div class="flex justify-center mb-8 px-4">
        <div class="flex flex-col items-center gap-3 text-center">
          <div
            class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex-shrink-0 overflow-hidden"
          >
            <NuxtImg
              src="/favicon.webp"
              alt="Soulsborne Tools Icon"
              class="w-12 h-12 object-contain rounded-full"
              format="webp"
              loading="lazy"
              decoding="async"
              width="48"
              height="48"
            />
          </div>
          <div class="flex flex-col items-center justify-center min-w-0">
            <h1
              class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1 text-center text-gray-900 dark:text-white drop-shadow-sm"
            >
              Soulsborne Tools
            </h1>
            <p
              class="text-base sm:text-lg text-center text-gray-700 dark:text-white/80 drop-shadow-sm"
            >
              Essential Tools & Calculators
            </p>
          </div>
        </div>
      </div>
    </template>
    <!-- Sidebar slot intentionally left empty: filtering is now handled in ToolList -->
    <template #sidebar></template>
    <template #right-sidebar></template>
    <ToolList />
  </ToolLayout>
</template>
