<script setup lang="ts">
import ToolLayout from "~/components/Tools/Common/ToolLayout.vue";
import Home from "~/components/Home.vue";
import { useHead } from "#imports";

// Homepage-specific SEO
useHead({
  title: "Gold Phantom - Dark Souls Tools & Calculators",
  meta: [
    {
      name: "description",
      content:
        "Essential Dark Souls 1 tools and calculators for your playthrough. Calculate soul levels, optimize armor, track weapons, and more for Dark Souls Remastered.",
    },
    {
      name: "keywords",
      content:
        "dark souls 1, dark souls remastered, soul level calculator, armor optimizer, weapon calculator, dark souls tools, soulsborne calculator",
    },
    // Open Graph
    {
      property: "og:title",
      content: "Gold Phantom - Dark Souls Tools & Calculators",
    },
    {
      property: "og:description",
      content:
        "Essential Dark Souls 1 tools and calculators for your playthrough. Calculate soul levels, optimize armor, track weapons, and more for Dark Souls Remastered.",
    },
    // Twitter Card
    {
      name: "twitter:title",
      content: "Gold Phantom - Dark Souls Tools & Calculators",
    },
    {
      name: "twitter:description",
      content:
        "Essential Dark Souls 1 tools and calculators for your playthrough. Calculate soul levels, optimize armor, track weapons, and more for Dark Souls Remastered.",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.goldphantom.com/#website",
        url: "https://www.goldphantom.com",
        name: "Gold Phantom - Dark Souls Tools & Calculators",
        description:
          "Essential Dark Souls 1 tools and calculators for your playthrough. Calculate soul levels, optimize armor, track weapons, and more for Dark Souls Remastered.",
        publisher: {
          "@id": "https://www.goldphantom.com/#person",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://www.goldphantom.com/tools?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        about: [
          {
            "@type": "Thing",
            name: "Dark Souls 1",
            alternateName: "Dark Souls Remastered",
          },
          {
            "@type": "Thing",
            name: "Soulsborne Games",
          },
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      }),
    },
  ],
});
</script>

<template>
  <!-- Use the standard tool layout for consistent structure -->
  <ToolLayout
    title="Gold Phantom - Dark Souls Tools & Calculators"
    description="Essential Dark Souls 1 tools and calculators for your playthrough. Calculate soul levels, optimize armor, track weapons, and more for Dark Souls Remastered."
    icon-path="/favicon.png"
  >
    <!-- Empty hero slot - hero content is handled by the Home component -->
    <template #hero />
    <!-- Main homepage content -->
    <Home />
  </ToolLayout>
</template>
