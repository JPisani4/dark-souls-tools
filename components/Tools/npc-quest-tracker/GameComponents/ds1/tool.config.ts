import type { ToolConfig } from "~/types/tools/tool";

export const config: ToolConfig = {
  title: "NPC Quest Tracker",
  description:
    "Track your progress through NPC questlines in Dark Souls Remastered. Mark steps as completed, view fail conditions, locations, and rewards for each NPC.",
  icon: "/warrior-of-sunlight-covenant-dks.png",
  category: "planner",
  order: 10,
  tags: ["npc", "quest", "tracker", "progress", "ds1"],
  gameCategory: "ds1",
};
