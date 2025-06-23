// Game-specific types for Dark Souls: Remastered
// This defines the core game system interfaces used throughout the application

// Game identifier type - used for routing and game selection
export type GameId = "ds1" | "ds2" | "ds3" | "bb" | "er";

// Game metadata for display and identification
export interface GameMetadata {
  id: GameId;
  name: string;
  fullName: string;
  shortName: string;
  releaseYear: number;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

// Game configuration for UI behavior and mechanics
export interface GameConfig {
  terminology: {
    souls: string;
    level: string;
    weapon: string;
    upgrade: string;
    material: string;
    [key: string]: string;
  };
  mechanics: {
    maxLevel: number;
    levelCap?: number;
    respecAvailable: boolean;
    infusionSystem?: string;
    [key: string]: any;
  };
  ui: {
    levelRange: { min: number; max: number };
    showRespecOption?: boolean;
    showInfusionPaths?: boolean;
    showRightSidebar?: boolean;
    customFields?: string[];
    [key: string]: any;
  };
}

// Complete game data structure - combines all game-specific information
export interface GameData {
  metadata: GameMetadata;
  config: GameConfig;
  soulCosts: SoulCosts;
  upgradeCosts: UpgradeCosts;
  upgradePaths: UpgradePaths;
  merchants: Merchants;
  [key: string]: any;
}

// Soul cost mapping for level progression
export interface SoulCosts {
  [level: number]: number;
}

// Upgrade cost mapping for different upgrade paths
export interface UpgradeCosts {
  [path: string]: {
    [level: number]: number;
  };
}

// Individual upgrade path definition
export interface UpgradePath {
  maxLevel: number;
  materials: string[];
  costs: number[];
}

// Complete upgrade paths for all weapon types
export interface UpgradePaths {
  [path: string]: UpgradePath;
}

// Merchant information for material purchasing
export interface Merchant {
  name: string;
  location: string;
  items: {
    name: string;
    cost: number;
    quantity?: number;
  }[];
}

// All merchants in the game
export interface Merchants {
  [merchantId: string]: Merchant;
}

// Re-export upgrade types for easy importing
export * from "./upgrade";
export * from "./upgradeSummary";

// Re-export weapon types for easy importing
export * from "./ds1/weapons";

// Re-export miracle types for easy importing
export * from "./ds1/miracles";

// Re-export sorcery types for easy importing
export * from "./ds1/sorceries";

// Re-export shield types for easy importing
export * from "./ds1/shields";
