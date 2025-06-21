import { computed } from "vue";
import type { Tool } from "~/types/tools/tool";
import type { GameId, GameData } from "~/types/game";

export interface ToolStructuredDataOptions {
  tool: Tool | null;
  gameId: GameId | null;
  gameData: GameData | null;
}

export function useToolStructuredData(options: ToolStructuredDataOptions) {
  const gameNames: Record<GameId, string> = {
    ds1: "Dark Souls: Remastered",
    ds2: "Dark Souls 2",
    ds3: "Dark Souls 3",
    bb: "Bloodborne",
    er: "Elden Ring",
  };

  const structuredData = computed(() => {
    if (!options.tool || !options.gameId || !options.gameData) {
      return null;
    }

    const currentGame = gameNames[options.gameId];
    const toolConfig = options.tool.config;

    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${options.tool.title} - ${currentGame}`,
      description: `${options.tool.description} (${currentGame} version)`,
      url: `https://www.goldphantom.com/tools/${options.gameId}/${options.tool.slug}`,
      applicationCategory: "Calculator",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@id": "https://www.goldphantom.com/#person",
      },
      creator: {
        "@id": "https://www.goldphantom.com/#person",
      },
      softwareVersion: toolConfig?.version || "1.0.0",
      datePublished:
        toolConfig?.lastUpdated ||
        options.tool.createdAt.toISOString().split("T")[0],
      dateModified:
        toolConfig?.lastUpdated ||
        options.tool.createdAt.toISOString().split("T")[0],
      screenshot: options.tool.icon?.replace(
        /^public\//,
        "https://www.goldphantom.com/"
      ),
      featureList: [
        options.tool.description,
        `Support for ${currentGame}`,
        "Real-time calculations",
        "Mobile responsive design",
        "Game-specific mechanics and costs",
      ],
      keywords: [
        ...options.tool.tags,
        options.gameId,
        currentGame.toLowerCase(),
        "soulsborne",
        "calculator",
      ],
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Supported Games",
          value:
            "Dark Souls: Remastered, Dark Souls 2, Dark Souls 3, Bloodborne, Elden Ring",
        },
        {
          "@type": "PropertyValue",
          name: "Current Game",
          value: currentGame,
        },
        {
          "@type": "PropertyValue",
          name: "Tool Category",
          value: options.tool.category,
        },
      ],
    };
  });

  return {
    structuredData,
  };
}
