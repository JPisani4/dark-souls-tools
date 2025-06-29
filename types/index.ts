// Types Index
// This file exports all type definitions for easy discovery and importing

// Tool Types - Core tool system interfaces
export type {
  Tool,
  ToolConfig,
  ToolMeta,
  ToolCategory,
  ToolState,
} from "./tools/tool";

// Game Types - Game-specific data structures for upgrades and materials
export type {
  UpgradePath,
  Material,
  UpgradeStep,
  Merchant,
  BossUpgrade,
  UpgradePathWithAscend,
  AscendStep,
} from "./game/upgrade";

// Upgrade Summary Types - Results and analysis interfaces
export type {
  Step,
  MaterialInfo,
  GroupedStep,
  BetterPrice,
  MaterialSavings,
  UpgradeSummaryProps,
} from "./game/upgradeSummary";

// Quest Types - Quest tracking and NPC questline interfaces
export type {
  QuestState,
  QuestRequirement,
  QuestReward,
  QuestCategory,
  QuestCollection,
  AllQuests,
} from "./game/ds1/quests";

// Common Types - Shared interfaces used across the application
export * from "./common";
