import type { ToolConfig } from "~/types/tools/tool";

export const config: ToolConfig = {
  title: "Starting Class Optimizer",
  description:
    "Find the optimal starting class for your desired character stats and equipment",
  icon: "public/weapons.png",
  category: "planner",
  order: 1,
  tags: ["starting-class-optimizer", "character-planner", "ds1", "planner"],
  version: "1.0.0",
  author: "Gold Phantom",
  lastUpdated: "2025-06-22",
  gameCategory: "ds1",
  seo: {
    title: "Starting Class Optimizer - Dark Souls Remastered | Gold Phantom",
    description:
      "Find the optimal starting class for your Dark Souls Remastered build. Compare all 10 starting classes and see which one requires the fewest soul levels to reach your desired stats and equipment requirements.",
    keywords: [
      "starting class",
      "optimizer",
      "character planner",
      "dark souls",
      "ds1",
      "build planner",
      "soul level calculator",
      "character optimization",
      "dark souls remastered",
      "starting class comparison",
    ],
    ogImage: "public/weapons.png",
  },
};
