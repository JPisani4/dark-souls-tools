/* AUTO-GENERATED FILE — DO NOT EDIT */
import type { Tool } from '~/types/tools/tool'

export const tools: Tool[] = [
  {
    title: "Co-op Level Range Calculator",
    description: "Calculate valid co-op and invasion level ranges for all multiplayer items, including weapon level matchmaking, in Dark Souls Remastered.",
    slug: "coop-level-range-calculator",
    icon: "public/soul-level-calculator-icon.png",
    category: "calculator",
    tags: ["co-op","level range","multiplayer","weapon level","calculator","dark souls","remastered"],
    order: 1,
    loadComponent: () => import('~/components/Tools/coop-level-range-calculator/GameComponents/ds1/index.vue'),
    createdAt: new Date('2025-06-23T19:41:09.633Z'),
    gameCategories: ["ds1"],
  },
  {
    title: "Soul Level Calculator",
    description: "Calculate the souls required to level up your character in Dark Souls",
    slug: "soul-level-calculator",
    icon: "public/soul-level-calculator-icon.png",
    category: "calculator",
    tags: ["souls","leveling","calculator","dark souls"],
    order: 1,
    loadComponent: () => import('~/components/Tools/soul-level-calculator/GameComponents/ds1/index.vue'),
    createdAt: new Date('2025-06-23T19:41:09.634Z'),
    gameCategories: ["ds1"],
  },
  {
    title: "Starting Class Optimizer",
    description: "Find the optimal starting class for your desired character stats and equipment in Dark Souls",
    slug: "starting-class-optimizer",
    icon: "i-heroicons-user-group",
    category: "planner",
    tags: ["starting-class-optimizer","character-planner","ds1","planner"],
    order: 1,
    loadComponent: () => import('~/components/Tools/StartingClassOptimizer/GameComponents/ds1/index.vue'),
    createdAt: new Date('2025-06-23T19:41:09.634Z'),
    gameCategories: ["ds1"],
  },
  {
    title: "Weapon Upgrade Calculator",
    description: "Calculate the souls and materials needed to upgrade weapons in Dark Souls",
    slug: "weapon-upgrade-calculator",
    icon: "public/weapon-upgrade-calculator-icon.png",
    category: "calculator",
    tags: ["weapons","upgrades","materials","calculator","dark souls"],
    order: 2,
    loadComponent: () => import('~/components/Tools/weapon-upgrade-calculator/GameComponents/ds1/index.vue'),
    createdAt: new Date('2025-06-23T19:41:09.634Z'),
    gameCategories: ["ds1"],
  }
]

export default tools
