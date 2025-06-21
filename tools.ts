/* AUTO-GENERATED FILE — DO NOT EDIT */
import type { Tool } from '~/types/tools/tool'

export const tools: Tool[] = [
  {
    title: "Soul Level Calculator",
    description: "Calculate the souls required to level up your character in Dark Souls",
    slug: "soul-level-calculator",
    icon: "public/soul-level-calculator-icon.png",
    category: "calculator",
    tags: ["souls","leveling","calculator","dark souls"],
    order: 1,
    loadComponent: () => import('~/components/Tools/soul-level-calculator/GameComponents/ds1/index.vue'),
    createdAt: new Date('2025-06-21T16:23:01.198Z'),
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
    createdAt: new Date('2025-06-21T16:23:01.198Z'),
    gameCategories: ["ds1"],
  }
]

export default tools
