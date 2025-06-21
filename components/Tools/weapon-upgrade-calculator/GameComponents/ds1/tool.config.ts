import type { ToolConfig } from "~/types/tools/tool";

export const config: ToolConfig = {
  title: "Weapon Upgrade Calculator",
  description:
    "Calculate the souls and materials needed to upgrade weapons in Dark Souls",
  icon: "public/weapon-upgrade-calculator-icon.png",
  category: "calculator",
  order: 2,
  tags: ["weapons", "upgrades", "materials", "calculator", "dark souls"],
  version: "1.0.0",
  author: "Gold Phantom",
  lastUpdated: "2025-01-20",
  gameCategory: "ds1",
  seo: {
    title: "Weapon Upgrade Calculator - Gold Phantom",
    description:
      "Calculate the exact souls and materials needed to upgrade weapons in Dark Souls",
    keywords: [
      "weapon upgrade",
      "calculator",
      "dark souls",
      "upgrades",
      "materials",
    ],
    ogImage: "public/weapon-upgrade-calculator-icon.png",
  },
};
