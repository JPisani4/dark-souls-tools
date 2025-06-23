import type { GameData } from "~/types/game";
import {
  MULTIPLAYER_ITEMS,
  getLevelRange,
  getWeaponMatchLevel,
  getWeaponLevelRange,
  isPasswordBypass,
  getUpgradePathConfig,
} from "./coopLevelRanges";

const erGameData: GameData = {
  metadata: {
    id: "er",
    name: "Elden Ring",
    fullName: "Elden Ring",
    shortName: "ER",
    releaseYear: 2022,
    description: "The latest FromSoftware action RPG",
    icon: "i-game-icons-ring",
    color: "from-yellow-500 to-orange-600",
    isActive: true,
  },
  config: {
    terminology: {
      souls: "Runes",
      level: "Level",
      weapon: "Weapon",
      upgrade: "Upgrade",
      material: "Material",
      currentLevel: "Current Level",
      desiredLevel: "Desired Level",
      totalCost: "Total Runes Required",
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
      respecAvailable: true,
      infusionSystem: "ash-of-war",
    },
    ui: {
      levelRange: { min: 1, max: 713 },
      showRespecOption: true,
      showInfusionPaths: true,
      showRightSidebar: false,
      customFields: [],
    },
  },
  // Note: These would be populated with actual ER data
  soulCosts: {},
  upgradeCosts: {},
  upgradePaths: {},
  merchants: {},
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
      id: "coop-level-range-calculator",
      name: "Co-op Level Range Calculator",
      description:
        "Calculate valid co-op and invasion level ranges for all multiplayer items, including weapon level matchmaking, in Elden Ring.",
      category: "calculators",
      icon: "i-heroicons-users",
      isActive: true,
      gameId: "er",
    },
  ],
};

export default erGameData;
