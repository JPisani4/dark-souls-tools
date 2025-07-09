import type { ToolConfig } from "~/types/tools/tool";

export const config: ToolConfig = {
  title: "Achievement Tracker",
  description: "Tracks your achievement progress through game cycles.",
  icon: "i-heroicons-trophy",
  category: "tracker",
  order: 15,
  tags: [
    "achievement",
    "tracker",
    "progress",
    "completion",
    "ds1",
    "dark souls",
    "remastered",
  ],
  version: "1.0.0",
  author: "Gold Phantom",
  lastUpdated: "2025-01-27",
  gameCategory: "ds1",
  seo: {
    title:
      "Dark Souls Remastered Achievement Tracker - Track All Achievements | Gold Phantom",
    description:
      "Track your achievement progress through all game cycles in Dark Souls Remastered. Never miss a rare weapon, spell, or boss soul. Plan your 100% completion efficiently.",
    keywords: [
      "dark souls remastered",
      "achievement tracker",
      "knight's honor",
      "wisdom of a sage",
      "bond of a pyromancer",
      "prayer of a maiden",
      "rare weapons",
      "sorceries",
      "pyromancies",
      "miracles",
      "quest progression",
      "boss weapons",
      "covenant weapons",
      "tail cutoffs",
      "ds1 achievements",
      "100% completion",
      "achievement guide",
      "gold phantom",
    ],
    ogImage: "/favicon.webp",
  },
};
