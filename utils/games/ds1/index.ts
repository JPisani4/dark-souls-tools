import type { GameData } from "~/types/game";
import { soulCosts } from "./soulCosts";
import { upgradeCosts, merchants as merchantsArray } from "./upgradeCosts";
import { upgradePaths as upgradePathsObject } from "./upgradePaths";
import * as stats from "./stats";
import * as quests from "./quests";
import * as enduranceStamina from "./enduranceStamina";
import {
  MULTIPLAYER_ITEMS,
  getLevelRange,
  getWeaponMatchLevel,
  getWeaponLevelRange,
  isPasswordBypass,
  getUpgradePathConfig,
} from "./coopLevelRanges";

// Convert merchants array to object format expected by GameData
const merchants = Object.fromEntries(
  merchantsArray.map((merchant) => [
    merchant.id,
    {
      name: merchant.name,
      location: "Various", // Default location since not provided in upgradeCosts
      items: Object.entries(merchant.materialPrices).map(
        ([material, price]) => ({
          name: material,
          cost: price,
        })
      ),
    },
  ])
);

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
      characterLevel: "Character Level",
      weaponLevel: "Weapon Level",
      shieldLevel: "Shield Level",
      levelRange: "Level Range",
      weaponLevelRange: "Weapon Level Range",
      multiplayerItem: "Multiplayer Item",
      usePassword: "Use Password",
      weaponShieldMatchmaking: "Weapon/Shield Matchmaking",
      weaponOrShield: "Weapon or Shield",
      upgradePathLabel: "Upgrade Path",
      weaponShieldLevel: "Weapon/Shield Level",
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
  upgradePaths: upgradePathsObject as any, // Type assertion to handle interface mismatch
  merchants,
  coopLevelRanges: {
    MULTIPLAYER_ITEMS,
    getLevelRange,
    getWeaponMatchLevel,
    getWeaponLevelRange,
    isPasswordBypass,
    getUpgradePathConfig,
  },
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

// Export stats utilities
export { stats };

// Export quest utilities
export { quests };

// Export vitality HP utilities
// Removed to avoid naming conflicts - import directly from ./vitalityHp instead

// Export endurance stamina utilities
export { enduranceStamina };

// Export pyromancy utilities
export * as pyromancies from "./pyromancies";
