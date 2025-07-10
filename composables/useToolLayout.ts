import { ref, computed, onMounted } from "vue";
import { useSeoMeta, useHead } from "#imports";
import { getRandomTheme } from "~/utils/themes/colorSystem";
import { getPerformanceMetrics } from "~/utils/performance";
import { useToolStructuredData } from "~/composables/useToolStructuredData";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import type { Tool } from "~/types/tools/tool";
import type { GameId, GameData } from "~/types/game";

export interface ToolLayoutOptions {
  title: string;
  description: string;
  iconPath?: string;
  iconName?: string;
  // New options for structured data
  tool?: Tool | null;
  gameId?: GameId | null;
  gameData?: GameData | null;
}

export function useToolLayout(options: ToolLayoutOptions) {
  const { title, description, iconPath, iconName, tool, gameId, gameData } =
    options;

  // Get current route for URL
  const route = useRoute();
  const currentUrl = computed(() => {
    if (process.client) {
      return window.location.href;
    }
    return `https://www.goldphantom.com${route.path}`;
  });

  // Enhanced SEO metadata for tool pages
  const seoTitle = computed(() => {
    if (tool?.title) {
      return `${tool.title} - Dark Souls 1 Tool - Gold Phantom`;
    }
    return (
      tool?.config?.seo?.title || (tool?.title || title) + " - Gold Phantom"
    );
  });

  const seoDescription = computed(() => {
    if (tool?.description) {
      return `${tool.description} for Dark Souls 1 and Dark Souls Remastered. Free online tool.`;
    }
    return tool?.config?.seo?.description || tool?.description || description;
  });

  const seoKeywords = computed(() => {
    const baseKeywords =
      tool?.tags?.join(", ") || "dark souls 1, dark souls remastered";
    const toolSpecific = tool?.title
      ? `${tool.title.toLowerCase()}, ${tool.category?.toLowerCase()}`
      : "";
    return `${baseKeywords}, ${toolSpecific}, soulsborne calculator, gaming tools`
      .replace(/,\s*,/g, ",")
      .replace(/^,\s*/, "")
      .replace(/\s*,$/, "");
  });

  // Use favicon for OG image always
  const seoImage = computed(() => {
    return "https://www.goldphantom.com/favicon.webp";
  });

  // Enhanced SEO metadata for social media embeds
  useHead({
    title: seoTitle.value,
    meta: [
      // Basic meta tags
      {
        name: "description",
        content: seoDescription.value,
      },
      {
        name: "keywords",
        content: seoKeywords.value,
      },
      {
        name: "author",
        content: tool?.config?.author || "Gold Phantom",
      },

      // Open Graph tags (Facebook, Discord, LinkedIn)
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: seoTitle.value,
      },
      {
        property: "og:description",
        content: seoDescription.value,
      },
      {
        property: "og:url",
        content: currentUrl.value,
      },
      {
        property: "og:site_name",
        content: "Gold Phantom",
      },
      {
        property: "og:image",
        content: seoImage.value,
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:image:alt",
        content: `${seoTitle.value} - Gold Phantom`,
      },
      {
        property: "og:locale",
        content: "en_US",
      },
      {
        property: "og:updated_time",
        content: tool?.config?.lastUpdated || new Date().toISOString(),
      },

      // Twitter Card tags
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:site",
        content: "@goldphantom",
      },
      {
        name: "twitter:creator",
        content: "@goldphantom",
      },
      {
        name: "twitter:title",
        content: seoTitle.value,
      },
      {
        name: "twitter:description",
        content: seoDescription.value,
      },
      {
        name: "twitter:image",
        content: seoImage.value,
      },
      {
        name: "twitter:image:alt",
        content: `${seoTitle.value} - Gold Phantom`,
      },

      // Additional social media tags
      {
        name: "theme-color",
        content: "#1e293b",
      },
      {
        name: "msapplication-TileColor",
        content: "#1e293b",
      },

      // Article-specific tags for better categorization
      {
        property: "article:author",
        content: "Gold Phantom",
      },
      {
        property: "article:published_time",
        content: tool?.config?.lastUpdated || new Date().toISOString(),
      },
      {
        property: "article:modified_time",
        content: tool?.config?.lastUpdated || new Date().toISOString(),
      },
      {
        property: "article:section",
        content: tool?.category || "Gaming Tools",
      },
      {
        property: "article:tag",
        content: seoKeywords.value,
      },
    ],
    link: [
      // Canonical URL
      {
        rel: "canonical",
        href: currentUrl.value,
      },
    ],
    script: tool
      ? [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "@id": `${currentUrl.value}#tool`,
              name: tool.title,
              description: tool.description,
              url: currentUrl.value,
              applicationCategory: tool.category || "Gaming Tool",
              operatingSystem: "Web Browser",
              browserRequirements: "JavaScript enabled",
              softwareVersion: "1.0",
              datePublished:
                tool.config?.lastUpdated || new Date().toISOString(),
              dateModified:
                tool.config?.lastUpdated || new Date().toISOString(),
              author: {
                "@type": "Person",
                name: "Gold Phantom",
                url: "https://www.goldphantom.com",
              },
              publisher: {
                "@type": "Organization",
                name: "Gold Phantom",
                url: "https://www.goldphantom.com",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: currentUrl.value,
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
              featureList: tool.tags || [],
              screenshot:
                tool.icon || "https://www.goldphantom.com/favicon.webp",
            }),
          },
        ]
      : [],
  });

  // Set up structured data if tool and game data are provided
  if (tool && gameId && gameData) {
    useToolStructuredData({
      tool,
      gameId,
      gameData,
    });
  }

  // Removed all performance monitoring code
  // Removed device type detection
  // Removed performance metrics tracking
  // Removed resize event listeners
  // Removed performance measurement functions

  return {
    title,
    description,
    iconPath,
    iconName,
  };
}
