import type { ToolConfig } from "~/types/tools/tool";

export const config: ToolConfig = {
  title: "Soul Level Calculator",
  description:
    "Calculate the souls required to level up your character in Dark Souls",
  icon: "public/soul_of_an_old_hero.png",
  category: "calculator",
  order: 1,
  tags: ["souls", "leveling", "calculator", "dark souls"],
  version: "1.0.0",
  author: "Gold Phantom",
  lastUpdated: "2025-01-20",
  gameCategory: "ds1",
  seo: {
    title: "Soul Level Calculator - Gold Phantom",
    description:
      "Calculate the exact number of souls needed to level up your character in Dark Souls",
    keywords: ["soul level", "calculator", "dark souls", "leveling", "souls"],
    ogImage: "public/soul_of_an_old_hero.png",
  },
};
