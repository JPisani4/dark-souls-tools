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
    const currentUrl = `https://www.goldphantom.com/tools/${options.gameId}/${options.tool.slug}`;

    return {
      "@context": "https://schema.org",
      "@graph": [
        // Software Application schema
        {
          "@type": "SoftwareApplication",
          "@id": `${currentUrl}#software`,
          name: `${options.tool.title} - ${currentGame}`,
          description: `${options.tool.description} (${currentGame} version)`,
          url: currentUrl,
          applicationCategory: "Calculator",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
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
        },
        // WebPage schema
        {
          "@type": "WebPage",
          "@id": `${currentUrl}#webpage`,
          url: currentUrl,
          name: `${options.tool.title} - ${currentGame}`,
          description: `${options.tool.description} (${currentGame} version)`,
          isPartOf: {
            "@id": "https://www.goldphantom.com/#website",
          },
          about: {
            "@id": `${currentUrl}#software`,
          },
          mainEntity: {
            "@id": `${currentUrl}#software`,
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.goldphantom.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tools",
                item: "https://www.goldphantom.com/tools",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: currentGame,
                item: `https://www.goldphantom.com/tools?game=${options.gameId}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: options.tool.title,
                item: currentUrl,
              },
            ],
          },
        },
        // HowTo schema for calculator tools
        ...(options.tool.category === "calculator"
          ? [
              {
                "@type": "HowTo",
                "@id": `${currentUrl}#howto`,
                name: `How to use ${options.tool.title}`,
                description: `Step-by-step guide for using ${options.tool.title} in ${currentGame}`,
                about: {
                  "@id": `${currentUrl}#software`,
                },
                step: [
                  {
                    "@type": "HowToStep",
                    name: "Enter your current values",
                    text: "Input your current character stats, weapon levels, or other relevant information.",
                  },
                  {
                    "@type": "HowToStep",
                    name: "Set your target values",
                    text: "Specify your desired target values for the calculation.",
                  },
                  {
                    "@type": "HowToStep",
                    name: "View results",
                    text: "Review the calculated results and recommendations.",
                  },
                ],
              },
            ]
          : []),
        // FAQ schema for common questions
        {
          "@type": "FAQPage",
          "@id": `${currentUrl}#faq`,
          mainEntity: [
            {
              "@type": "Question",
              name: `What is ${options.tool.title}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${options.tool.description} This tool is specifically designed for ${currentGame} and helps players optimize their gameplay experience.`,
              },
            },
            {
              "@type": "Question",
              name: `How accurate is ${options.tool.title}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${options.tool.title} uses official game data and mechanics to provide accurate calculations. All values are based on the actual game files and community-verified information.`,
              },
            },
            {
              "@type": "Question",
              name: `Is ${options.tool.title} free to use?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, all tools on Gold Phantom are completely free to use. No registration or payment required.",
              },
            },
            {
              "@type": "Question",
              name: `Does ${options.tool.title} work on mobile?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, all tools are fully responsive and work perfectly on mobile devices, tablets, and desktop computers.",
              },
            },
          ],
        },
      ],
    };
  });

  return {
    structuredData,
  };
}
