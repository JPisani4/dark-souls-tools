/* AUTO-GENERATED FILE — DO NOT EDIT */
import type { Tool } from "~/types/tools/tool";

export const tools: Tool[] = [
  {
    title: "Co-op Level Range Calculator",
    description:
      "Calculate co-op and invasion soul and weapon level ranges for all multiplayer items",
    slug: "coop-level-range-calculator",
    icon: "/warrior-of-sunlight-covenant-dks.png",
    category: "calculator",
    tags: [
      "co-op",
      "level range",
      "multiplayer",
      "weapon level",
      "calculator",
      "dark souls",
      "remastered",
    ],
    order: 1,
    loadComponent: () =>
      import(
        "~/components/Tools/coop-level-range-calculator/GameComponents/ds1/index.vue"
      ),
    createdAt: new Date("2025-07-02T23:46:14.263Z"),
    gameCategories: ["ds1"],
    config: {
      title: "Co-op Level Range Calculator",
      description:
        "Calculate co-op and invasion soul and weapon level ranges for all multiplayer items",
      icon: "/warrior-of-sunlight-covenant-dks.png",
      category: "calculator",
      order: 1,
      tags: [
        "co-op",
        "level range",
        "multiplayer",
        "weapon level",
        "calculator",
        "dark souls",
        "remastered",
      ],
      version: "1.0.0",
      author: "Gold Phantom",
      lastUpdated: "2025-06-23",
      gameCategory: "ds1",
      seo: {
        title:
          "Co-op Level Range Calculator - Dark Souls Remastered | Gold Phantom",
        description:
          "Calculate co-op and invasion soul level ranges for Dark Souls Remastered. Find valid matchmaking ranges for all multiplayer items including White Sign Soapstone, Red Eye Orb, and covenant items. Includes weapon level matchmaking calculations.",
        keywords: [
          "co-op",
          "level range",
          "multiplayer",
          "weapon level",
          "calculator",
          "dark souls",
          "remastered",
          "matchmaking",
          "invasion",
          "summon",
          "white sign soapstone",
          "red eye orb",
          "covenant",
          "multiplayer calculator",
          "soul level range",
        ],
        ogImage: "/warrior-of-sunlight-covenant-dks.png",
      },
    },
  },
  {
    title: "Soul Level Calculator",
    description: "Calculate the souls required to level up your character",
    slug: "soul-level-calculator",
    icon: "/soul-level-calculator-icon.png",
    category: "calculator",
    tags: ["souls", "leveling", "calculator", "dark souls"],
    order: 1,
    loadComponent: () =>
      import(
        "~/components/Tools/soul-level-calculator/GameComponents/ds1/index.vue"
      ),
    createdAt: new Date("2025-07-02T23:46:14.263Z"),
    gameCategories: ["ds1"],
    config: {
      title: "Soul Level Calculator",
      description: "Calculate the souls required to level up your character",
      icon: "/soul-level-calculator-icon.png",
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
        ogImage: "/soul-level-calculator-icon.png",
      },
    },
  },
  {
    title: "Starting Class Optimizer",
    description:
      "Find the optimal starting class for your desired character stats and equipment",
    slug: "starting-class-optimizer",
    icon: "/weapons.png",
    category: "planner",
    tags: ["starting-class-optimizer", "character-planner", "ds1", "planner"],
    order: 1,
    loadComponent: () =>
      import(
        "~/components/Tools/StartingClassOptimizer/GameComponents/ds1/index.vue"
      ),
    createdAt: new Date("2025-07-02T23:46:14.263Z"),
    gameCategories: ["ds1"],
    config: {
      title: "Starting Class Optimizer",
      description:
        "Find the optimal starting class for your desired character stats and equipment",
      icon: "/weapons.png",
      category: "planner",
      order: 1,
      tags: ["starting-class-optimizer", "character-planner", "ds1", "planner"],
      version: "1.0.0",
      author: "Gold Phantom",
      lastUpdated: "2025-06-22",
      gameCategory: "ds1",
      seo: {
        title:
          "Starting Class Optimizer - Dark Souls Remastered | Gold Phantom",
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
        ogImage: "/weapons.png",
      },
    },
  },
  {
    title: "Weapon Upgrade Calculator",
    description: "Calculate the souls and materials needed to upgrade weapons",
    slug: "weapon-upgrade-calculator",
    icon: "/weapon-upgrade-calculator-icon.png",
    category: "calculator",
    tags: ["weapons", "upgrades", "materials", "calculator", "dark souls"],
    order: 2,
    loadComponent: () =>
      import(
        "~/components/Tools/weapon-upgrade-calculator/GameComponents/ds1/index.vue"
      ),
    createdAt: new Date("2025-07-02T23:46:14.263Z"),
    gameCategories: ["ds1"],
    config: {
      title: "Weapon Upgrade Calculator",
      description:
        "Calculate the souls and materials needed to upgrade weapons",
      icon: "/weapon-upgrade-calculator-icon.png",
      category: "calculator",
      order: 2,
      tags: ["weapons", "upgrades", "materials", "calculator", "dark souls"],
      version: "1.0.0",
      author: "Gold Phantom",
      lastUpdated: "2025-01-20",
      gameCategory: "ds1",
      seo: {
        title:
          "Weapon Upgrade Calculator - Dark Souls Remastered | Gold Phantom",
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
        ogImage: "/weapon-upgrade-calculator-icon.png",
      },
    },
  },
  {
    title: "NPC Quest Tracker",
    description:
      "Track your progress through NPC questlines in Dark Souls Remastered. Mark steps as completed, view fail conditions, locations, and rewards for each NPC.",
    slug: "npc-quest-tracker",
    icon: "i-heroicons-user-group",
    category: "planner",
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
    order: 10,
    loadComponent: () =>
      import(
        "~/components/Tools/npc-quest-tracker/GameComponents/ds1/index.vue"
      ),
    createdAt: new Date("2025-07-02T23:46:14.263Z"),
    gameCategories: ["ds1"],
    config: {
      title: "NPC Quest Tracker",
      description:
        "Track your progress through NPC questlines in Dark Souls Remastered. Mark steps as completed, view fail conditions, locations, and rewards for each NPC.",
      icon: "i-heroicons-user-group",
      category: "planner",
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
    },
  },
  {
    title: "Achievement Tracker",
    description:
      "Track your progress through Dark Souls Remastered achievements. Mark requirements as completed, view progress by category, and monitor your completion percentage for each achievement.",
    slug: "achievement-tracker",
    icon: "i-heroicons-trophy",
    category: "planner",
    tags: [
      "achievement",
      "tracker",
      "progress",
      "completion",
      "ds1",
      "dark souls",
      "remastered",
    ],
    order: 15,
    loadComponent: () =>
      import(
        "~/components/Tools/AchievementTracker/GameComponents/ds1/index.vue"
      ),
    createdAt: new Date("2025-07-02T23:46:14.263Z"),
    gameCategories: ["ds1"],
    config: {
      title: "Achievement Tracker",
      description:
        "Track your progress through Dark Souls Remastered achievements. Mark requirements as completed, view progress by category, and monitor your completion percentage for each achievement.",
      icon: "i-heroicons-trophy",
      category: "planner",
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
          "Complete Dark Souls Remastered achievement tracker. Track Knight's Honor, Wisdom of a Sage, Bond of a Pyromancer, and Prayer of a Maiden achievements. Monitor progress, mark completed requirements, and get quest guidance.",
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
        ogImage: "/weapon-upgrade-calculator-icon.webp",
      },
    },
  },
];

export default tools;
