import type { GameData } from "~/types/game";
import { soulCosts } from "./soulCosts";
import { upgradeCosts } from "./upgradeCosts";
import { upgradePaths } from "./upgradePaths";
import { merchants } from "./merchants";

const ds1GameData: GameData = {
  metadata: {
    id: "ds1",
    name: "Dark Souls",
    fullName: "Dark Souls: Remastered",
    shortName: "DS1",
    releaseYear: 2018,
    description:
      "The original Dark Souls experience, remastered for modern platforms",
    icon: "i-game-icons-sword-wound",
    color: "from-orange-500 to-red-600",
    isActive: true,
  },
  config: {
    terminology: {
      souls: "Souls",
      level: "Level",
      weapon: "Weapon",
      upgrade: "Upgrade",
      material: "Material",
      currentLevel: "Current Level",
      desiredLevel: "Desired Level",
      totalCost: "Total Souls Required",
      reinforcementCost: "Reinforcement Cost",
      materialCost: "Material Cost",
      purchaseable: "Purchaseable",
      findable: "Findable",
      merchant: "Merchant",
      upgradePath: "Upgrade Path",
      currentWeaponPath: "Current Weapon Path",
      desiredWeaponPath: "Desired Weapon Path",
    },
    mechanics: {
      maxLevel: 713,
      levelCap: 713,
      respecAvailable: false,
      infusionSystem: "titanite",
    },
    ui: {
      levelRange: { min: 1, max: 713 },
      showRespecOption: false,
      showInfusionPaths: true,
      showRightSidebar: false,
      customFields: [],
    },
  },
  soulCosts,
  upgradeCosts,
  upgradePaths,
  merchants,
  tools: [
    {
      id: "soul-level-calculator",
      name: "Soul Level Calculator",
      description: "Calculate the souls required to level up your character",
      category: "calculators",
      icon: "i-heroicons-calculator",
      isActive: true,
      gameId: "ds1",
    },
    {
      id: "weapon-upgrade-calculator",
      name: "Weapon Upgrade Calculator",
      description:
        "Calculate the souls and materials required to upgrade your weapon",
      category: "calculators",
      icon: "i-heroicons-wrench-screwdriver",
      isActive: true,
      gameId: "ds1",
    },
  ],
};

export default ds1GameData;
