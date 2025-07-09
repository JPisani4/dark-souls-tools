import type { ToolConfig } from "~/types/tools/tool";

export const config: ToolConfig = {
  title: "Weapon Upgrade Calculator",
  description: "Calculate the souls and materials needed to upgrade weapons",
  icon: "/weapon-upgrade-calculator-icon.png",
  category: "calculator",
  order: 2,
  tags: ["weapons", "upgrades", "materials", "calculator", "dark souls"],
  version: "1.0.0",
  author: "Gold Phantom",
  lastUpdated: "2025-01-20",
  gameCategory: "ds1",
  seo: {
    title: "Weapon Upgrade Calculator - Dark Souls Remastered | Gold Phantom",
    description:
      "Calculate the exact souls and materials needed to upgrade weapons in Dark Souls Remastered. Plan your weapon reinforcement from +0 to +15, including all upgrade paths like Fire, Magic, Lightning, and Divine. Find the cheapest merchant prices for materials.",
    keywords: [
      "weapon upgrade",
      "calculator",
      "dark souls",
      "upgrades",
      "materials",
      "titanite",
      "weapon reinforcement",
      "fire weapon",
      "magic weapon",
      "lightning weapon",
      "divine weapon",
      "weapon ascension",
      "upgrade path",
      "souls cost",
      "material cost",
      "merchant prices",
      "dark souls remastered",
    ],
    ogImage: "/favicon.webp",
  },
};
