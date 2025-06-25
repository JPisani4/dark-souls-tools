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
    createdAt: new Date('2025-06-24T23:51:51.067Z'),
    gameCategories: ["ds1"],
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
    createdAt: new Date('2025-06-24T23:51:51.068Z'),
    gameCategories: ["ds1"],
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
    createdAt: new Date('2025-06-24T23:51:51.068Z'),
    gameCategories: ["ds1"],
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
    createdAt: new Date('2025-06-24T23:51:51.068Z'),
    gameCategories: ["ds1"],
  }
]

export default tools
