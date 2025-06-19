/* AUTO-GENERATED FILE — DO NOT EDIT */
import type { Tool } from '~/types/tool'

export const tools: Tool[] = [
  {
    title: "Soul Level Calculator",
    description: "Calculates number of souls needed to reach a specific level.",
    slug: "soul-level-calculator",
    loadComponent: () => import('~/components/Tools/SoulLevelCalculator/Index.vue'),
  },
  {
    title: "Weapon Upgrade Calculator",
    description: "Calculates number of souls needed to reinforce a weapon to a specific level or path.",
    slug: "weapon-upgrade-calculator",
    loadComponent: () => import('~/components/Tools/WeaponUpgradeCalculator/Index.vue'),
  }
]
