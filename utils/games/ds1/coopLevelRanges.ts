/**
 * DS1 Co-op Level Range Calculator Data
 * All calculations are data-driven and configurable
 */

// Multiplayer item formulas for level range calculation
export const MULTIPLAYER_ITEM_FORMULAS = {
  // White Sign Soapstone, Eye of Death, Dragon Eye, Red Sign Soapstone: x - (10 + 0.1x), x + (10 + 0.1x)
  "white-sign-soapstone": (x: number) => [
    Math.floor(x - (10 + 0.1 * x)),
    Math.ceil(x + (10 + 0.1 * x)),
  ],
  "eye-of-death": (x: number) => [
    Math.floor(x - (10 + 0.1 * x)),
    Math.ceil(x + (10 + 0.1 * x)),
  ],
  "dragon-eye": (x: number) => [
    Math.floor(x - (10 + 0.1 * x)),
    Math.ceil(x + (10 + 0.1 * x)),
  ],
  "red-sign-soapstone": (x: number) => [
    Math.floor(x - (10 + 0.1 * x)),
    Math.ceil(x + (10 + 0.1 * x)),
  ],
  // Red Eye Orb, Cracked Red Eye Orb, Blue Eye Orb: x - 0.1x, x + (20 + 0.1x)
  "red-eye-orb": (x: number) => [
    Math.floor(x - 0.1 * x),
    Math.ceil(x + (20 + 0.1 * x)),
  ],
  "cracked-red-eye-orb": (x: number) => [
    Math.floor(x - 0.1 * x),
    Math.ceil(x + (20 + 0.1 * x)),
  ],
  "blue-eye-orb": (x: number) => [
    Math.floor(x - 0.1 * x),
    Math.ceil(x + (20 + 0.1 * x)),
  ],
  // Cat Covenant Ring, Darkmoon Blade Covenant Ring: x - (20 + 0.2x), x + 0.1x
  "cat-covenant-ring": (x: number) => [
    Math.floor(x - (20 + 0.2 * x)),
    Math.ceil(x + 0.1 * x),
  ],
  "darkmoon-blade-covenant-ring": (x: number) => [
    Math.floor(x - (20 + 0.2 * x)),
    Math.ceil(x + 0.1 * x),
  ],
} as const;

// Weapon level matchmaking table
export const WEAPON_LEVEL_MATCHMAKING = [
  { level: 0, range: [0, 5] },
  { level: 1, range: [0, 6] },
  { level: 2, range: [0, 7] },
  { level: 3, range: [0, 8] },
  { level: 4, range: [0, 10] },
  { level: 5, range: [0, 11] },
  { level: 6, range: [1, 12] },
  { level: 7, range: [2, 13] },
  { level: 8, range: [3, 14] },
  { level: 9, range: [4, 15] },
  { level: 10, range: [4, 15] },
  { level: 11, range: [5, 15] },
  { level: 12, range: [6, 15] },
  { level: 13, range: [7, 15] },
  { level: 14, range: [8, 15] },
  { level: 15, range: [9, 15] },
] as const;

// Upgrade path configurations
export const UPGRADE_PATH_CONFIGS = {
  regular: {
    maxLevel: 15,
    weaponLevelOffset: 0, // No offset
    displayName: "Regular",
  },
  raw: {
    maxLevel: 5,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Raw",
  },
  fire: {
    maxLevel: 10,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Fire",
  },
  divine: {
    maxLevel: 10,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Divine",
  },
  magic: {
    maxLevel: 10,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Magic",
  },
  unique: {
    maxLevel: 5,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Unique",
  },
  crystal: {
    maxLevel: 5,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Crystal",
  },
  chaos: {
    maxLevel: 5,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Chaos",
  },
  lightning: {
    maxLevel: 5,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Lightning",
  },
  occult: {
    maxLevel: 5,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Occult",
  },
  enchanted: {
    maxLevel: 5,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Enchanted",
  },
  // Boss and special weapons are treated as "unique" for weapon level matchmaking
  boss: {
    maxLevel: 5,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Boss",
    matchmakingCategory: "unique", // Map to unique for matchmaking
  },
  special: {
    maxLevel: 5,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Special",
    matchmakingCategory: "unique", // Map to unique for matchmaking
  },
  // Dragon weapons are also treated as "unique" for weapon level matchmaking
  dragon: {
    maxLevel: 5,
    weaponLevelOffset: 5, // Add 5 to upgrade level
    displayName: "Dragon",
    matchmakingCategory: "unique", // Map to unique for matchmaking
  },
} as const;

// Multiplayer items metadata
export const MULTIPLAYER_ITEMS = [
  {
    value: "white-sign-soapstone",
    label: "White Sign Soapstone",
    description:
      "Creates a white summon sign that another player can use to summon you into their world for cooperative play.",
    passwordBypass: true,
    showAsterisk: true,
  },
  {
    value: "red-sign-soapstone",
    label: "Red Sign Soapstone",
    description:
      "Creates a red summon sign that another player can use to summon you into their world for PvP. The winner of the battle will receive souls and a humanity point.",
    passwordBypass: true,
    showAsterisk: true,
  },
  {
    value: "eye-of-death",
    label: "Eye of Death",
    description:
      "Infect three other players' worlds with the Gravelord Curse and leave your Gravelord Soul Sign to lure them into your world. If defeated, you gain additional Eyes of Death.",
    passwordBypass: false,
    showAsterisk: true,
  },
  {
    value: "dragon-eye",
    label: "Dragon Eye",
    description:
      "Allows you to lay a Dragon Soul Sign, in order to be summoned as a hostile Dragon Spirit in another player's world for PvP. The winner is awarded one Dragon Scale and Souls.",
    passwordBypass: false,
  },
  {
    value: "red-eye-orb",
    label: "Red Eye Orb",
    description:
      "Allows for infinite invasions of other players. If the invader successfully kills the host, they will be rewarded with a humanity.",
    passwordBypass: false,
    showAsterisk: true,
  },
  {
    value: "cracked-red-eye-orb",
    label: "Cracked Red Eye Orb",
    description:
      "Same as the Red Eye Orb but is lost after a successful invasion.",
    passwordBypass: false,
    showAsterisk: true,
  },
  {
    value: "blue-eye-orb",
    label: "Blue Eye Orb",
    description:
      "Allows for infinite invasions of other players who have been logged in the Book of Guilty, having acquired Sin by receiving Indictments.",
    passwordBypass: false,
  },
  {
    value: "darkmoon-blade-covenant-ring",
    label: "Darkmoon Blade Covenant Ring",
    description:
      "Allows you to be automatically summoned to invade other players in darkened Anor Londo. If the invader successfully kills the host, they will be rewarded with a Souvenir of Reprisal. If the Host manages to kill the invader, they will receive Souls as a reward.",
    passwordBypass: false,
  },
  {
    value: "cat-covenant-ring",
    label: "Cat Covenant Ring",
    description:
      "Allows you to be automatically summoned anytime from almost any place in your world into the world of another player to help them fend off human invaders in the Darkroot Garden. If the invader is defeated, you will be rewarded with souls depending on the invader's soul level as well as a random upgrade material.",
    passwordBypass: false,
  },
] as const;

// Utility functions
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

  // For boss and special weapons, use the unique matchmaking category
  const matchmakingCategory =
    (config as any).matchmakingCategory || upgradePath;
  const matchmakingConfig = getUpgradePathConfig(matchmakingCategory);

  if (!matchmakingConfig) return null;

  // Unique weapons (boss/special) have an additional offset equal to their level
  // This accounts for the "skipped" levels in their progression
  const baseOffset = matchmakingConfig.weaponLevelOffset;
  const uniqueOffset = matchmakingCategory === "unique" ? level : 0;

  return level + baseOffset + uniqueOffset;
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
  if (!formula) return [1, 713];
  const [min, max] = formula(charLevel);
  return [Math.max(1, Math.min(713, min)), Math.max(1, Math.min(713, max))];
}

export function isPasswordBypass(item: string, usePassword: boolean): boolean {
  const itemData = MULTIPLAYER_ITEMS.find((i) => i.value === item);
  return usePassword && itemData?.passwordBypass === true;
}
