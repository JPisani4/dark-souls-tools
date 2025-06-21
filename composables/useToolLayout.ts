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
  enablePerformanceMonitoring?: boolean;
  // New options for structured data
  tool?: Tool | null;
  gameId?: GameId | null;
  gameData?: GameData | null;
}

export function useToolLayout(options: ToolLayoutOptions) {
  // Theme management
  const selectedTheme = ref<ColorTheme>(getRandomTheme());

  // SEO setup
  useSeoMeta({
    title: options.title,
    ogTitle: options.title,
    twitterTitle: options.title,
    description: options.description,
    ogDescription: options.description,
    twitterDescription: options.description,
  });

  // Structured data setup
  const { structuredData } = useToolStructuredData({
    tool: options.tool || null,
    gameId: options.gameId || null,
    gameData: options.gameData || null,
  });

  // Add structured data to head if available
  if (structuredData.value) {
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(structuredData.value),
        },
      ],
    });
  }

  // Performance monitoring (optional)
  const showMetrics = computed(
    () =>
      options.enablePerformanceMonitoring &&
      process.env.NODE_ENV === "development"
  );
  const metrics = computed(() => getPerformanceMetrics());

  // Device detection for responsive design
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isUltraMobile = ref(false);

  // Initialize device detection
  if (process.client) {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      isUltraMobile.value = width < 480;
      isMobile.value = width < 768;
      isTablet.value = width >= 768 && width < 1024;
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
  }

  return {
    // Theme
    selectedTheme,

    // SEO
    title: options.title,
    description: options.description,
    iconPath: options.iconPath,
    iconName: options.iconName,

    // Structured Data
    structuredData,

    // Performance
    showMetrics,
    metrics,

    // Device detection
    isMobile,
    isTablet,
    isUltraMobile,
  };
}
