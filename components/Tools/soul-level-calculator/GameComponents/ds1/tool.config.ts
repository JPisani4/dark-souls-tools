import type { ToolConfig } from "~/types/tools/tool";

export const config: ToolConfig = {
  title: "Soul Level Calculator",
  description: "Calculate the souls required to level up your character",
  icon: "public/soul-level-calculator-icon.png",
  category: "calculator",
  order: 1,
  tags: ["souls", "leveling", "calculator", "dark souls"],
  version: "1.0.0",
  author: "Gold Phantom",
  lastUpdated: "2025-01-20",
  gameCategory: "ds1",
  seo: {
    title: "Soul Level Calculator - Dark Souls Remastered | Gold Phantom",
    description:
      "Calculate exactly how many souls you need to level up in Dark Souls Remastered. Find the total souls required to reach any level from your current level. Perfect for planning your character progression and build optimization.",
    keywords: [
      "soul level",
      "calculator",
      "dark souls",
      "leveling",
      "souls",
      "character progression",
      "soul cost",
      "level up",
      "dark souls remastered",
      "souls calculator",
      "character building",
      "rpg calculator",
    ],
    ogImage: "public/soul-level-calculator-icon.png",
  },
};
