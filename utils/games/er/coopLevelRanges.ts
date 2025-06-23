/**
 * Elden Ring Co-op Level Range Calculator Data
 * Example of how the same data-driven approach works for different games
 */

// Elden Ring has different formulas and ranges
export const MULTIPLAYER_ITEM_FORMULAS = {
  // Elden Ring uses different formulas
  "tarnished-furled-finger": (x: number) => [
    Math.floor(x - (10 + 0.1 * x)),
    Math.ceil(x + (10 + 0.1 * x)),
  ],
  "duelist-furled-finger": (x: number) => [
    Math.floor(x - (10 + 0.1 * x)),
    Math.ceil(x + (10 + 0.1 * x)),
  ],
  "bloody-finger": (x: number) => [
    Math.floor(x - 0.1 * x),
    Math.ceil(x + (20 + 0.1 * x)),
  ],
  "recusant-finger": (x: number) => [
    Math.floor(x - 0.1 * x),
    Math.ceil(x + (20 + 0.1 * x)),
  ],
  // Add more ER-specific items here
} as const;

// Elden Ring has different weapon level matchmaking
export const WEAPON_LEVEL_MATCHMAKING = [
  { level: 0, range: [0, 3] },
  { level: 1, range: [0, 4] },
  { level: 2, range: [0, 5] },
  { level: 3, range: [0, 6] },
  { level: 4, range: [0, 8] },
  { level: 5, range: [0, 10] },
  { level: 6, range: [1, 12] },
  { level: 7, range: [2, 14] },
  { level: 8, range: [3, 16] },
  { level: 9, range: [4, 18] },
  { level: 10, range: [5, 20] },
  { level: 11, range: [6, 22] },
  { level: 12, range: [7, 24] },
  { level: 13, range: [8, 25] },
  { level: 14, range: [9, 25] },
  { level: 15, range: [10, 25] },
  { level: 16, range: [11, 25] },
  { level: 17, range: [12, 25] },
  { level: 18, range: [13, 25] },
  { level: 19, range: [14, 25] },
  { level: 20, range: [15, 25] },
  { level: 21, range: [16, 25] },
  { level: 22, range: [17, 25] },
  { level: 23, range: [18, 25] },
  { level: 24, range: [19, 25] },
  { level: 25, range: [20, 25] },
] as const;

// Elden Ring has different upgrade paths
export const UPGRADE_PATH_CONFIGS = {
  regular: {
    maxLevel: 25, // ER goes to +25, not +15
    weaponLevelOffset: 0,
    displayName: "Regular",
  },
  // ER has different infusion paths
  heavy: {
    maxLevel: 25,
    weaponLevelOffset: 0,
    displayName: "Heavy",
  },
  keen: {
    maxLevel: 25,
    weaponLevelOffset: 0,
    displayName: "Keen",
  },
  quality: {
    maxLevel: 25,
    weaponLevelOffset: 0,
    displayName: "Quality",
  },
  fire: {
    maxLevel: 25,
    weaponLevelOffset: 0,
    displayName: "Fire",
  },
  lightning: {
    maxLevel: 25,
    weaponLevelOffset: 0,
    displayName: "Lightning",
  },
  sacred: {
    maxLevel: 25,
    weaponLevelOffset: 0,
    displayName: "Sacred",
  },
  magic: {
    maxLevel: 25,
    weaponLevelOffset: 0,
    displayName: "Magic",
  },
  cold: {
    maxLevel: 25,
    weaponLevelOffset: 0,
    displayName: "Cold",
  },
  poison: {
    maxLevel: 25,
    weaponLevelOffset: 0,
    displayName: "Poison",
  },
  blood: {
    maxLevel: 25,
    weaponLevelOffset: 0,
    displayName: "Blood",
  },
  occult: {
    maxLevel: 25,
    weaponLevelOffset: 0,
    displayName: "Occult",
  },
  // Add more ER-specific paths
} as const;

// Elden Ring multiplayer items
export const MULTIPLAYER_ITEMS = [
  {
    value: "tarnished-furled-finger",
    label: "Tarnished's Furled Finger",
    description:
      "Allows you to place a golden summon sign for co-op. Standard co-op range. Password matchmaking bypasses level/weapon restrictions.",
    passwordBypass: true,
  },
  {
    value: "duelist-furled-finger",
    label: "Duelist's Furled Finger",
    description:
      "Places a red summon sign for PvP duels. Standard co-op range. Password matchmaking bypasses level/weapon restrictions.",
    passwordBypass: true,
  },
  {
    value: "bloody-finger",
    label: "Bloody Finger",
    description:
      "Invade another player's world as a red phantom. Wider invasion range.",
    passwordBypass: false,
  },
  {
    value: "recusant-finger",
    label: "Recusant Finger",
    description:
      "Invade another player's world as a red phantom. Wider invasion range.",
    passwordBypass: false,
  },
  // Add more ER-specific items
] as const;

// Same utility functions, but using ER data
export function getUpgradePathConfig(path: string) {
  return UPGRADE_PATH_CONFIGS[path as keyof typeof UPGRADE_PATH_CONFIGS];
}

export function getAvailableLevels(upgradePath: string): number[] {
  const config = getUpgradePathConfig(upgradePath);
  if (!config) return [];
  return Array.from({ length: config.maxLevel + 1 }, (_, i) => i);
}

export function getWeaponMatchLevel(
  upgradePath: string,
  level: number
): number | null {
  const config = getUpgradePathConfig(upgradePath);
  if (!config) return null;
  return level + config.weaponLevelOffset;
}

export function getWeaponLevelRange(
  weaponLevel: number
): [number, number] | null {
  const entry = WEAPON_LEVEL_MATCHMAKING.find(
    (row) => row.level === weaponLevel
  );
  return entry ? ([...entry.range] as [number, number]) : null;
}

export function getLevelRange(
  item: string,
  charLevel: number
): [number, number] {
  const formula =
    MULTIPLAYER_ITEM_FORMULAS[item as keyof typeof MULTIPLAYER_ITEM_FORMULAS];
  if (!formula) return [1, 713]; // ER max level is 713
  const [min, max] = formula(charLevel);
  return [Math.max(1, Math.min(713, min)), Math.max(1, Math.min(713, max))];
}

export function isPasswordBypass(item: string, usePassword: boolean): boolean {
  const itemData = MULTIPLAYER_ITEMS.find((i) => i.value === item);
  return usePassword && itemData?.passwordBypass === true;
}
