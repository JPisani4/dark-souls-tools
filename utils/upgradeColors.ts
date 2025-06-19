import type { MaterialInfo } from "~/types/upgradeSummary";

// Material color mapping - single source of truth
export const MATERIAL_COLORS: Record<string, MaterialInfo> = {
  titanite_shard: {
    color: "text-yellow-700 dark:text-yellow-400",
    badgeColor: "warning",
  },
  large_titanite_shard: {
    color: "text-yellow-700 dark:text-yellow-400",
    badgeColor: "warning",
  },
  titanite_chunk: {
    color: "text-yellow-700 dark:text-yellow-400",
    badgeColor: "warning",
  },
  titanite_slab: {
    color: "text-yellow-700 dark:text-yellow-400",
    badgeColor: "warning",
  },
  green_titanite_shard: {
    color: "text-green-700 dark:text-green-500",
    badgeColor: "success",
  },
  blue_titanite_chunk: {
    color: "text-blue-700 dark:text-blue-400",
    badgeColor: "info",
  },
  blue_titanite_slab: {
    color: "text-blue-700 dark:text-blue-400",
    badgeColor: "info",
  },
  red_titanite_chunk: {
    color: "text-red-700 dark:text-red-500",
    badgeColor: "error",
  },
  red_titanite_slab: {
    color: "text-red-700 dark:text-red-500",
    badgeColor: "error",
  },
  white_titanite_chunk: {
    color: "text-gray-500 dark:text-gray-300",
    badgeColor: "neutral",
  },
  white_titanite_slab: {
    color: "text-gray-500 dark:text-gray-300",
    badgeColor: "neutral",
  },
  twinkling_titanite: {
    color: "text-purple-700 dark:text-purple-400",
    badgeColor: "secondary",
  },
  demon_titanite: {
    color: "text-red-800 dark:text-red-600",
    badgeColor: "error",
  },
  dragon_scale: {
    color: "text-orange-700 dark:text-orange-400",
    badgeColor: "warning",
  },
  // fallback generic mappings for color keywords
  green: { color: "text-green-700 dark:text-green-500", badgeColor: "success" },
  red: { color: "text-red-700 dark:text-red-500", badgeColor: "error" },
  blue: { color: "text-blue-700 dark:text-blue-400", badgeColor: "info" },
  white: { color: "text-gray-500 dark:text-gray-300", badgeColor: "neutral" },
  twinkling: {
    color: "text-purple-700 dark:text-purple-400",
    badgeColor: "secondary",
  },
  demon: { color: "text-red-800 dark:text-red-600", badgeColor: "error" },
  dragon: {
    color: "text-orange-700 dark:text-orange-400",
    badgeColor: "warning",
  },
  crystal: { color: "text-cyan-700 dark:text-cyan-400", badgeColor: "info" },
  large: {
    color: "text-yellow-700 dark:text-yellow-400",
    badgeColor: "warning",
  },
  chunk: {
    color: "text-yellow-700 dark:text-yellow-400",
    badgeColor: "warning",
  },
  slab: {
    color: "text-yellow-700 dark:text-yellow-400",
    badgeColor: "warning",
  },
  default: {
    color: "text-yellow-700 dark:text-yellow-400",
    badgeColor: "warning",
  },
};

// Path color mapping
export const PATH_COLORS: Record<string, string> = {
  regular: "text-yellow-700 dark:text-yellow-400",
  fire: "text-orange-600 dark:text-orange-400",
  chaos: "text-red-600 dark:text-red-400",
  lightning: "text-yellow-600 dark:text-yellow-400",
  magic: "text-blue-600 dark:text-blue-400",
  enchanted: "text-purple-600 dark:text-purple-400",
  divine: "text-green-600 dark:text-green-400",
  occult: "text-gray-600 dark:text-gray-400",
  crystal: "text-cyan-600 dark:text-cyan-400",
  raw: "text-yellow-600 dark:text-yellow-400",
};

// Utility functions for color handling
const BADGE_COLOR_MAP: Record<string, string> = {
  titanite_shard: "warning",
  large_titanite_shard: "warning",
  titanite_chunk: "warning",
  titanite_slab: "warning",
  green_titanite_shard: "success",
  blue_titanite_chunk: "info",
  blue_titanite_slab: "info",
  red_titanite_chunk: "error",
  red_titanite_slab: "error",
  white_titanite_chunk: "neutral",
  white_titanite_slab: "neutral",
  twinkling_titanite: "secondary",
  demon_titanite: "error",
  dragon_scale: "warning",
  green: "success",
  red: "error",
  blue: "info",
  white: "neutral",
  twinkling: "secondary",
  demon: "error",
  dragon: "warning",
  crystal: "info",
  large: "warning",
  chunk: "warning",
  slab: "warning",
  default: "warning",
};

export const getMaterialInfo = (materialName: string): MaterialInfo => {
  const name = materialName.toLowerCase();
  if (MATERIAL_COLORS[name]) return MATERIAL_COLORS[name];
  const key = Object.keys(MATERIAL_COLORS).find((color) =>
    name.includes(color)
  );
  return MATERIAL_COLORS[key || "default"];
};

export const getMaterialColor = (materialName: string): string =>
  getMaterialInfo(materialName).color;

export const getMaterialBadgeColor = (materialName: string): string => {
  const name = materialName.toLowerCase();
  if (BADGE_COLOR_MAP[name]) return BADGE_COLOR_MAP[name];
  const key = Object.keys(BADGE_COLOR_MAP).find((color) =>
    name.includes(color)
  );
  return BADGE_COLOR_MAP[key || "default"];
};

export const getPathColor = (pathName?: string): string => {
  const cleanName = pathName?.replace(/\s*\([^)]*\)/g, "") || "";
  return (
    PATH_COLORS[cleanName.toLowerCase()] || "text-gray-800 dark:text-gray-200"
  );
};

export const cleanPathName = (pathName?: string): string =>
  pathName?.replace(/\s*\([^)]*\)/g, "") || "Regular";
