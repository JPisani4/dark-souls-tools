/* AUTO-GENERATED FILE — DO NOT EDIT */
import type { Tool } from '~/types/tools/tool'

export const tools: Tool[] = [
  {
    title: "Co-op Level Range Calculator",
    description: "Calculate co-op and invasion soul and weapon level ranges for all multiplayer items",
    slug: "coop-level-range-calculator",
    icon: "public/warrior-of-sunlight-covenant-dks.png",
    category: "calculator",
    tags: ["co-op","level range","multiplayer","weapon level","calculator","dark souls","remastered"],
    order: 1,
    loadComponent: () => import('~/components/Tools/coop-level-range-calculator/GameComponents/ds1/index.vue'),
    createdAt: new Date('2025-06-25T00:13:34.656Z'),
    gameCategories: ["ds1"],
    config: {
      "title": "Co-op Level Range Calculator",
      "description": "Calculate co-op and invasion soul and weapon level ranges for all multiplayer items",
      "icon": "public/warrior-of-sunlight-covenant-dks.png",
      "category": "calculator",
      "order": 1,
      "tags": [
        "co-op",
        "level range",
        "multiplayer",
        "weapon level",
        "calculator",
        "dark souls",
        "remastered"
      ],
      "version": "1.0.0",
      "author": "Gold Phantom",
      "lastUpdated": "2025-06-23",
      "gameCategory": "ds1",
      "seo": {
        "title": "Co-op Level Range Calculator - Dark Souls Remastered | Gold Phantom",
        "description": "Calculate co-op and invasion soul level ranges for Dark Souls Remastered. Find valid matchmaking ranges for all multiplayer items including White Sign Soapstone, Red Eye Orb, and covenant items. Includes weapon level matchmaking calculations.",
        "keywords": [
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
          "soul level range"
        ],
        "ogImage": "public/warrior-of-sunlight-covenant-dks.png"
      }
    },
  },
  {
    title: "Soul Level Calculator",
    description: "Calculate the souls required to level up your character",
    slug: "soul-level-calculator",
    icon: "public/soul-level-calculator-icon.png",
    category: "calculator",
    tags: ["souls","leveling","calculator","dark souls"],
    order: 1,
    loadComponent: () => import('~/components/Tools/soul-level-calculator/GameComponents/ds1/index.vue'),
    createdAt: new Date('2025-06-25T00:13:34.656Z'),
    gameCategories: ["ds1"],
    config: {
      "title": "Soul Level Calculator",
      "description": "Calculate the souls required to level up your character",
      "icon": "public/soul-level-calculator-icon.png",
      "category": "calculator",
      "order": 1,
      "tags": [
        "souls",
        "leveling",
        "calculator",
        "dark souls"
      ],
      "version": "1.0.0",
      "author": "Gold Phantom",
      "lastUpdated": "2025-01-20",
      "gameCategory": "ds1",
      "seo": {
        "title": "Soul Level Calculator - Dark Souls Remastered | Gold Phantom",
        "description": "Calculate exactly how many souls you need to level up in Dark Souls Remastered. Find the total souls required to reach any level from your current level. Perfect for planning your character progression and build optimization.",
        "keywords": [
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
          "rpg calculator"
        ],
        "ogImage": "public/soul-level-calculator-icon.png"
      }
    },
  },
  {
    title: "Starting Class Optimizer",
    description: "Find the optimal starting class for your desired character stats and equipment",
    slug: "starting-class-optimizer",
    icon: "public/weapons.png",
    category: "planner",
    tags: ["starting-class-optimizer","character-planner","ds1","planner"],
    order: 1,
    loadComponent: () => import('~/components/Tools/StartingClassOptimizer/GameComponents/ds1/index.vue'),
    createdAt: new Date('2025-06-25T00:13:34.656Z'),
    gameCategories: ["ds1"],
    config: {
      "title": "Starting Class Optimizer",
      "description": "Find the optimal starting class for your desired character stats and equipment",
      "icon": "public/weapons.png",
      "category": "planner",
      "order": 1,
      "tags": [
        "starting-class-optimizer",
        "character-planner",
        "ds1",
        "planner"
      ],
      "version": "1.0.0",
      "author": "Gold Phantom",
      "lastUpdated": "2025-06-22",
      "gameCategory": "ds1",
      "seo": {
        "title": "Starting Class Optimizer - Dark Souls Remastered | Gold Phantom",
        "description": "Find the optimal starting class for your Dark Souls Remastered build. Compare all 10 starting classes and see which one requires the fewest soul levels to reach your desired stats and equipment requirements.",
        "keywords": [
          "starting class",
          "optimizer",
          "character planner",
          "dark souls",
          "ds1",
          "build planner",
          "soul level calculator",
          "character optimization",
          "dark souls remastered",
          "starting class comparison"
        ],
        "ogImage": "public/weapons.png"
      }
    },
  },
  {
    title: "Weapon Upgrade Calculator",
    description: "Calculate the souls and materials needed to upgrade weapons",
    slug: "weapon-upgrade-calculator",
    icon: "public/weapon-upgrade-calculator-icon.png",
    category: "calculator",
    tags: ["weapons","upgrades","materials","calculator","dark souls"],
    order: 2,
    loadComponent: () => import('~/components/Tools/weapon-upgrade-calculator/GameComponents/ds1/index.vue'),
    createdAt: new Date('2025-06-25T00:13:34.656Z'),
    gameCategories: ["ds1"],
    config: {
      "title": "Weapon Upgrade Calculator",
      "description": "Calculate the souls and materials needed to upgrade weapons",
      "icon": "public/weapon-upgrade-calculator-icon.png",
      "category": "calculator",
      "order": 2,
      "tags": [
        "weapons",
        "upgrades",
        "materials",
        "calculator",
        "dark souls"
      ],
      "version": "1.0.0",
      "author": "Gold Phantom",
      "lastUpdated": "2025-01-20",
      "gameCategory": "ds1",
      "seo": {
        "title": "Weapon Upgrade Calculator - Dark Souls Remastered | Gold Phantom",
        "description": "Calculate the exact souls and materials needed to upgrade weapons in Dark Souls Remastered. Plan your weapon reinforcement from +0 to +15, including all upgrade paths like Fire, Magic, Lightning, and Divine. Find the cheapest merchant prices for materials.",
        "keywords": [
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
          "dark souls remastered"
        ],
        "ogImage": "public/weapon-upgrade-calculator-icon.png"
      }
    },
  }
]

export default tools
