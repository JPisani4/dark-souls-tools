import { ref, computed, onMounted } from "vue";
import { useSeoMeta, useHead } from "#imports";
import { getRandomTheme } from "~/utils/constants";
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

  // Use enhanced SEO metadata from tool config if available
  const seoTitle = computed(() => {
    return tool?.config?.seo?.title || title;
  });

  const seoDescription = computed(() => {
    return tool?.config?.seo?.description || description;
  });

  const seoKeywords = computed(() => {
    return (
      tool?.config?.seo?.keywords ||
      tool?.tags?.join(", ") ||
      "soulsborne, calculator, dark souls, gaming tools"
    );
  });

  const seoImage = computed(() => {
    const ogImage = tool?.config?.seo?.ogImage;
    if (ogImage) {
      // Convert relative paths to absolute URLs
      if (ogImage.startsWith("/")) {
        return `https://www.goldphantom.com${ogImage}`;
      }
      if (ogImage.startsWith("public/")) {
        return `https://www.goldphantom.com/${ogImage.replace("public/", "")}`;
      }
      return ogImage;
    }

    // Fallback to icon path
    if (iconPath) {
      // Convert relative paths to absolute URLs
      if (iconPath.startsWith("/")) {
        return `https://www.goldphantom.com${iconPath}`;
      }
      if (iconPath.startsWith("public/")) {
        return `https://www.goldphantom.com/${iconPath.replace("public/", "")}`;
      }
      return iconPath;
    }
    // Fallback to default hero image
    return "https://www.goldphantom.com/soulsborne-tools-hero.png";
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
        content:
          tool?.config?.lastUpdated ||
          tool?.createdAt?.toISOString() ||
          new Date().toISOString(),
      },
      {
        property: "article:modified_time",
        content:
          tool?.config?.lastUpdated ||
          tool?.createdAt?.toISOString() ||
          new Date().toISOString(),
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
