import type { UpgradePath, UpgradePathWithAscend } from "~/types/game/upgrade";

// Regular Upgrade Path
export const regularUpgradePath: UpgradePath = {
  id: "regular",
  name: "Regular (+0 to +15)",
  steps: [
    { from: 0, to: 1, souls: 200, materials: { titanite_shard: 1 } },
    { from: 1, to: 2, souls: 200, materials: { titanite_shard: 1 } },
    { from: 2, to: 3, souls: 200, materials: { titanite_shard: 2 } },
    { from: 3, to: 4, souls: 200, materials: { titanite_shard: 2 } },
    { from: 4, to: 5, souls: 200, materials: { titanite_shard: 3 } },
    { from: 5, to: 6, souls: 200, materials: { large_titanite_shard: 1 } },
    { from: 6, to: 7, souls: 200, materials: { large_titanite_shard: 1 } },
    { from: 7, to: 8, souls: 200, materials: { large_titanite_shard: 2 } },
    { from: 8, to: 9, souls: 200, materials: { large_titanite_shard: 2 } },
    { from: 9, to: 10, souls: 200, materials: { large_titanite_shard: 3 } },
    { from: 10, to: 11, souls: 200, materials: { titanite_chunk: 1 } },
    { from: 11, to: 12, souls: 200, materials: { titanite_chunk: 1 } },
    { from: 12, to: 13, souls: 200, materials: { titanite_chunk: 2 } },
    { from: 13, to: 14, souls: 200, materials: { titanite_chunk: 3 } },
    { from: 14, to: 15, souls: 200, materials: { titanite_slab: 1 } },
  ],
};

// Crystal Upgrade Path
export const crystalUpgradePath: UpgradePathWithAscend = {
  id: "crystal",
  name: "Crystal (+0 to +5)",
  ascendSteps: [
    {
      from: 10,
      to: 0,
      souls: 200,
      materials: {
        titanite_chunk: 1,
      },
      basePath: {
        pathId: "regular",
        requiredLevel: 10,
      },
    },
  ],
  steps: [
    { from: 0, to: 1, souls: 200, materials: { titanite_chunk: 1 } },
    { from: 1, to: 2, souls: 200, materials: { titanite_chunk: 1 } },
    { from: 2, to: 3, souls: 200, materials: { titanite_chunk: 2 } },
    { from: 3, to: 4, souls: 200, materials: { titanite_chunk: 3 } },
    { from: 4, to: 5, souls: 200, materials: { titanite_slab: 1 } },
  ],
};

// Raw Upgrade Path
export const rawUpgradePath: UpgradePathWithAscend = {
  id: "raw",
  name: "Raw (+0 to +5)",
  ascendSteps: [
    {
      from: 5,
      to: 0,
      souls: 200,
      materials: {
        large_titanite_shard: 1,
      },
      basePath: {
        pathId: "regular",
        requiredLevel: 5,
      },
    },
  ],
  steps: [
    { from: 0, to: 1, souls: 200, materials: { titanite_shard: 1 } },
    { from: 1, to: 2, souls: 200, materials: { titanite_shard: 1 } },
    { from: 2, to: 3, souls: 200, materials: { titanite_shard: 2 } },
    { from: 3, to: 4, souls: 200, materials: { titanite_shard: 2 } },
    { from: 4, to: 5, souls: 200, materials: { titanite_shard: 3 } },
  ],
};

// Lightning Upgrade Path
export const lightningUpgradePath: UpgradePathWithAscend = {
  id: "lightning",
  name: "Lightning (+0 to +5)",
  ascendSteps: [
    {
      from: 10,
      to: 0,
      souls: 200,
      materials: {
        titanite_chunk: 1,
      },
      basePath: {
        pathId: "regular",
        requiredLevel: 10,
      },
    },
  ],
  steps: [
    { from: 0, to: 1, souls: 200, materials: { titanite_chunk: 1 } },
    { from: 1, to: 2, souls: 200, materials: { titanite_chunk: 2 } },
    { from: 2, to: 3, souls: 200, materials: { titanite_chunk: 2 } },
    { from: 3, to: 4, souls: 200, materials: { titanite_chunk: 3 } },
    { from: 4, to: 5, souls: 200, materials: { titanite_slab: 1 } },
  ],
};

// Magic Upgrade Path
export const magicUpgradePath: UpgradePathWithAscend = {
  id: "magic",
  name: "Magic (+0 to +10)",
  ascendSteps: [
    {
      from: 5,
      to: 0,
      souls: 200,
      materials: {
        green_titanite_shard: 1,
      },
      basePath: {
        pathId: "regular",
        requiredLevel: 5,
      },
    },
  ],
  steps: [
    { from: 0, to: 1, souls: 200, materials: { green_titanite_shard: 1 } },
    { from: 1, to: 2, souls: 200, materials: { green_titanite_shard: 1 } },
    { from: 2, to: 3, souls: 200, materials: { green_titanite_shard: 2 } },
    { from: 3, to: 4, souls: 200, materials: { green_titanite_shard: 2 } },
    { from: 4, to: 5, souls: 200, materials: { green_titanite_shard: 3 } },
    { from: 5, to: 6, souls: 200, materials: { blue_titanite_chunk: 1 } },
    { from: 6, to: 7, souls: 200, materials: { blue_titanite_chunk: 1 } },
    { from: 7, to: 8, souls: 200, materials: { blue_titanite_chunk: 2 } },
    { from: 8, to: 9, souls: 200, materials: { blue_titanite_chunk: 3 } },
    { from: 9, to: 10, souls: 200, materials: { blue_titanite_slab: 1 } },
  ],
};

// Enchanted Upgrade Path
export const enchantedUpgradePath: UpgradePathWithAscend = {
  id: "enchanted",
  name: "Enchanted (+0 to +5)",
  ascendSteps: [
    {
      from: 5,
      to: 0,
      souls: 200,
      materials: {
        green_titanite_shard: 1,
      },
      basePath: {
        pathId: "regular",
        requiredLevel: 5,
      },
    },
    {
      from: 5,
      to: 0,
      souls: 200,
      materials: {
        blue_titanite_chunk: 1,
      },
      basePath: {
        pathId: "magic",
        requiredLevel: 5,
      },
    },
  ],
  steps: [
    { from: 0, to: 1, souls: 200, materials: { blue_titanite_chunk: 1 } },
    { from: 1, to: 2, souls: 200, materials: { blue_titanite_chunk: 1 } },
    { from: 2, to: 3, souls: 200, materials: { blue_titanite_chunk: 2 } },
    { from: 3, to: 4, souls: 200, materials: { blue_titanite_chunk: 3 } },
    { from: 4, to: 5, souls: 200, materials: { blue_titanite_slab: 1 } },
  ],
};

// Divine Upgrade Path
export const divineUpgradePath: UpgradePathWithAscend = {
  id: "divine",
  name: "Divine (+0 to +10)",
  ascendSteps: [
    {
      from: 5,
      to: 0,
      souls: 200,
      materials: {
        green_titanite_shard: 1,
      },
      basePath: {
        pathId: "regular",
        requiredLevel: 5,
      },
    },
  ],
  steps: [
    { from: 0, to: 1, souls: 200, materials: { green_titanite_shard: 1 } },
    { from: 1, to: 2, souls: 200, materials: { green_titanite_shard: 1 } },
    { from: 2, to: 3, souls: 200, materials: { green_titanite_shard: 2 } },
    { from: 3, to: 4, souls: 200, materials: { green_titanite_shard: 2 } },
    { from: 4, to: 5, souls: 200, materials: { green_titanite_shard: 3 } },
    { from: 5, to: 6, souls: 200, materials: { white_titanite_chunk: 1 } },
    { from: 6, to: 7, souls: 200, materials: { white_titanite_chunk: 1 } },
    { from: 7, to: 8, souls: 200, materials: { white_titanite_chunk: 2 } },
    { from: 8, to: 9, souls: 200, materials: { white_titanite_chunk: 3 } },
    { from: 9, to: 10, souls: 200, materials: { white_titanite_slab: 1 } },
  ],
};

// Fire Upgrade Path
export const fireUpgradePath: UpgradePathWithAscend = {
  id: "fire",
  name: "Fire (+0 to +10)",
  ascendSteps: [
    {
      from: 5,
      to: 0,
      souls: 200,
      materials: {
        green_titanite_shard: 1,
      },
      basePath: {
        pathId: "regular",
        requiredLevel: 5,
      },
    },
  ],
  steps: [
    { from: 0, to: 1, souls: 200, materials: { green_titanite_shard: 1 } },
    { from: 1, to: 2, souls: 200, materials: { green_titanite_shard: 1 } },
    { from: 2, to: 3, souls: 200, materials: { green_titanite_shard: 2 } },
    { from: 3, to: 4, souls: 200, materials: { green_titanite_shard: 2 } },
    { from: 4, to: 5, souls: 200, materials: { green_titanite_shard: 3 } },
    { from: 5, to: 6, souls: 200, materials: { red_titanite_chunk: 1 } },
    { from: 6, to: 7, souls: 200, materials: { red_titanite_chunk: 1 } },
    { from: 7, to: 8, souls: 200, materials: { red_titanite_chunk: 2 } },
    { from: 8, to: 9, souls: 200, materials: { red_titanite_chunk: 3 } },
    { from: 9, to: 10, souls: 200, materials: { red_titanite_slab: 1 } },
  ],
};

// Occult Upgrade Path
export const occultUpgradePath: UpgradePathWithAscend = {
  id: "occult",
  name: "Occult (+0 to +5)",
  ascendSteps: [
    {
      from: 5,
      to: 0,
      souls: 200,
      materials: { green_titanite_shard: 1 },
      basePath: {
        pathId: "regular",
        requiredLevel: 5,
      },
    },
    {
      from: 5,
      to: 0,
      souls: 200,
      materials: { white_titanite_chunk: 1 },
      basePath: {
        pathId: "divine",
        requiredLevel: 5,
      },
    },
  ],
  steps: [
    { from: 0, to: 1, souls: 200, materials: { white_titanite_chunk: 1 } },
    { from: 1, to: 2, souls: 200, materials: { white_titanite_chunk: 1 } },
    { from: 2, to: 3, souls: 200, materials: { white_titanite_chunk: 2 } },
    { from: 3, to: 4, souls: 200, materials: { white_titanite_chunk: 3 } },
    { from: 4, to: 5, souls: 200, materials: { white_titanite_slab: 1 } },
  ],
};

// Chaos Upgrade Path
export const chaosUpgradePath: UpgradePathWithAscend = {
  id: "chaos",
  name: "Chaos (+0 to +5)",
  ascendSteps: [
    {
      from: 5,
      to: 0,
      souls: 200,
      materials: { green_titanite_shard: 1 },
      basePath: {
        pathId: "regular",
        requiredLevel: 5,
      },
    },
    {
      from: 5,
      to: 0,
      souls: 200,
      materials: { red_titanite_chunk: 1 },
      basePath: {
        pathId: "fire",
        requiredLevel: 5,
      },
    },
  ],
  steps: [
    { from: 0, to: 1, souls: 200, materials: { red_titanite_chunk: 1 } },
    { from: 1, to: 2, souls: 200, materials: { red_titanite_chunk: 1 } },
    { from: 2, to: 3, souls: 200, materials: { red_titanite_chunk: 2 } },
    { from: 3, to: 4, souls: 200, materials: { red_titanite_chunk: 3 } },
    { from: 4, to: 5, souls: 200, materials: { red_titanite_slab: 1 } },
  ],
};

// Boss Upgrade Path
export const bossUpgradePath: UpgradePathWithAscend = {
  id: "boss",
  name: "Boss (+0 to +5)",
  ascendSteps: [
    {
      from: 10,
      to: 0,
      souls: 5000,
      materials: { boss_soul: 1 },
      basePath: {
        pathId: "regular",
        requiredLevel: 5,
      },
    },
  ],
  steps: [
    { from: 0, to: 1, souls: 5000, materials: { demon_titanite: 1 } },
    { from: 1, to: 2, souls: 5000, materials: { demon_titanite: 1 } },
    { from: 2, to: 3, souls: 5000, materials: { demon_titanite: 2 } },
    { from: 3, to: 4, souls: 5000, materials: { demon_titanite: 2 } },
    { from: 4, to: 5, souls: 5000, materials: { demon_titanite: 4 } },
  ],
};

// Special Upgrade Path
export const specialUpgradePath: UpgradePath = {
  id: "special",
  name: "Special (+0 to +5)",
  steps: [
    { from: 0, to: 1, souls: 2000, materials: { twinkling_titanite: 1 } },
    { from: 1, to: 2, souls: 2000, materials: { twinkling_titanite: 1 } },
    { from: 2, to: 3, souls: 2000, materials: { twinkling_titanite: 2 } },
    { from: 3, to: 4, souls: 2000, materials: { twinkling_titanite: 2 } },
    { from: 4, to: 5, souls: 2000, materials: { twinkling_titanite: 4 } },
  ],
};

// Dragon Upgrade Path
export const dragonUpgradePath: UpgradePath = {
  id: "dragon",
  name: "Dragon (+0 to +5)",
  steps: [
    { from: 0, to: 1, souls: 10000, materials: { dragon_scale: 1 } },
    { from: 1, to: 2, souls: 10000, materials: { dragon_scale: 1 } },
    { from: 2, to: 3, souls: 10000, materials: { dragon_scale: 2 } },
    { from: 3, to: 4, souls: 10000, materials: { dragon_scale: 2 } },
    { from: 4, to: 5, souls: 10000, materials: { dragon_scale: 4 } },
  ],
};

// Export a manifest array with all paths
type AnyUpgradePath = UpgradePath | UpgradePathWithAscend;

export const upgradePathsManifest: AnyUpgradePath[] = [
  regularUpgradePath,
  crystalUpgradePath,
  rawUpgradePath,
  lightningUpgradePath,
  magicUpgradePath,
  enchantedUpgradePath,
  divineUpgradePath,
  fireUpgradePath,
  occultUpgradePath,
  chaosUpgradePath,
  bossUpgradePath,
  specialUpgradePath,
  dragonUpgradePath,
];

// Export upgradePaths as an object for GameData compatibility
export const upgradePaths = Object.fromEntries(
  upgradePathsManifest.map((path) => [path.id, path])
);
