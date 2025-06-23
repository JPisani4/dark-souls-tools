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

  // Set page title and meta tags
  useHead({
    title: title,
    meta: [
      {
        name: "description",
        content: description,
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
        name: "twitter:title",
        content: title,
      },
      {
        name: "twitter:description",
        content: description,
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
