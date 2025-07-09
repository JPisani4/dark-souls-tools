import type { ToolConfig } from "~/types/tools/tool";

export const config: ToolConfig = {
  title: "NPC Quest Tracker",
  description: "Tracks your progress through NPC questlines.",
  icon: "i-heroicons-user-group",
  category: "tracker",
  order: 10,
  tags: [
    "npc",
    "quest",
    "tracker",
    "progress",
    "ds1",
    "dark souls",
    "remastered",
    "questline",
  ],
  version: "1.0.0",
  author: "Gold Phantom",
  lastUpdated: "2025-01-27",
  gameCategory: "ds1",
  seo: {
    title:
      "Dark Souls Remastered NPC Quest Tracker - Complete All Questlines | Gold Phantom",
    description:
      "Complete Dark Souls Remastered NPC quest tracker. Track Siegmeyer, Solaire, Big Hat Logan, Reah, and other NPC questlines. Avoid fail conditions, find locations, and get all rewards.",
    keywords: [
      "dark souls remastered",
      "npc quest tracker",
      "siegmeyer quest",
      "solaire quest",
      "big hat logan quest",
      "reah quest",
      "questline guide",
      "npc locations",
      "fail conditions",
      "quest rewards",
      "ds1 quests",
      "side quests",
      "quest progression",
      "gold phantom",
    ],
    ogImage: "/warrior-of-sunlight-covenant-dks.webp",
  },
};
