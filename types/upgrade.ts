// Weapon upgrade step from one level to the next
export type UpgradeStep = {
  from: number;
  to: number;
  souls: number;
  materials: Record<string, number>; // material.id -> quantity
};

// A full upgrade path (e.g., Regular, Fire, Magic, Boss)
export type UpgradePath = {
  id: string; // "regular", "fire", "magic", etc.
  name: string;
  steps: UpgradeStep[];
  ascendSteps?: AscendStep[];
};

// Upgrade material (e.g., Titanite Shard, Green Titanite)
export type Material = {
  id: string; // "titanite_shard", "green_titanite", etc.
  name: string;
  category:
    | "standard"
    | "green"
    | "red"
    | "blue"
    | "white"
    | "boss"
    | "dragon"
    | "special"
    | "soul";
  description?: string;
};

// Merchant who sells upgrade materials
export type Merchant = {
  id: string;
  name: string;
  materialPrices: Record<string, number>; // material.id -> price in souls
};

// Optional boss weapon path with unique logic
export type BossUpgrade = {
  baseUpgradeTo10: UpgradeStep[]; // steps for getting to +10 before boss ascension
  bossAscendStep: UpgradeStep; // +10 weapon -> boss weapon (e.g., soul cost + special material)
  bossSteps: UpgradeStep[]; // +0 boss weapon -> +5
};

// Extended type for upgrade paths that require an ascend step
export type UpgradePathWithAscend = UpgradePath & {
  ascendSteps: AscendStep[];
};

export interface AscendStep {
  from: number;
  to: number;
  souls: number;
  materials: Record<string, number>;
  basePath?: {
    pathId: string;
    requiredLevel: number;
  };
  requiresBaseWeapon?: boolean;
}
