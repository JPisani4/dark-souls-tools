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

  // Process image path for social media
  const socialImage = computed(() => {
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
    title: title,
    meta: [
      // Basic meta tags
      {
        name: "description",
        content: description,
      },
      {
        name: "keywords",
        content:
          tool?.tags?.join(", ") ||
          "soulsborne, calculator, dark souls, gaming tools",
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
        content: title,
      },
      {
        property: "og:description",
        content: description,
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
        content: socialImage.value,
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
        content: `${title} - Gold Phantom`,
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
        content: title,
      },
      {
        name: "twitter:description",
        content: description,
      },
      {
        name: "twitter:image",
        content: socialImage.value,
      },
      {
        name: "twitter:image:alt",
        content: `${title} - Gold Phantom`,
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
        content: tool?.tags?.join(", ") || "soulsborne, calculator, dark souls",
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
