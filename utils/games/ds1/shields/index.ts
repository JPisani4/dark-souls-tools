// Shield data and utilities for Dark Souls 1
// This file provides access to all shield data and utility functions

import type {
  Shield,
  ShieldCategory,
  AllShields,
} from "~/types/game/ds1/shields";
import { smallShields } from "./small-shields";
import { standardShields } from "./standard-shields";
import { greatshields } from "./greatshields";

// Combine all shield data
const shieldData: AllShields = {
  "small-shields": smallShields,
  "standard-shields": standardShields,
  greatshields,
};

// Export the complete shield data
export const getAllShields = (): AllShields => shieldData;

// Get shields by category
export const getShieldsByCategory = (category: ShieldCategory): Shield[] => {
  return shieldData[category] || [];
};

// Get shield by name
export const getShieldByName = (name: string): Shield | null => {
  for (const category of Object.values(shieldData)) {
    const shield = category.find(
      (s) => s.name.toLowerCase() === name.toLowerCase()
    );
    if (shield) return shield;
  }
  return null;
};

// Get shields by strength requirement
export const getShieldsByStrengthRequirement = (strength: number): Shield[] => {
  const shields: Shield[] = [];
  for (const category of Object.values(shieldData)) {
    shields.push(
      ...category.filter((s) => s.requirements.strength <= strength)
    );
  }
  return shields;
};

// Get shields by upgrade path
export const getShieldsByUpgradePath = (upgradePath: string): Shield[] => {
  const shields: Shield[] = [];
  for (const category of Object.values(shieldData)) {
    shields.push(...category.filter((s) => s.upgradePath === upgradePath));
  }
  return shields;
};

// Get shields by defense type
export const getShieldsByDefenseType = (
  defenseType: keyof Shield["defense"]
): Shield[] => {
  const shields: Shield[] = [];
  for (const category of Object.values(shieldData)) {
    shields.push(...category.filter((s) => s.defense[defenseType] > 0));
  }
  return shields;
};

// Get shields by effect type
export const getShieldsByEffectType = (
  effectType: keyof Shield["effect"]
): Shield[] => {
  const shields: Shield[] = [];
  for (const category of Object.values(shieldData)) {
    shields.push(...category.filter((s) => s.effect[effectType]));
  }
  return shields;
};

// Get shield categories
export const getShieldCategories = (): ShieldCategory[] => {
  return Object.keys(shieldData) as ShieldCategory[];
};

// Search shields by name
export const searchShields = (query: string): Shield[] => {
  const shields: Shield[] = [];
  const searchTerm = query.toLowerCase();

  for (const category of Object.values(shieldData)) {
    shields.push(
      ...category.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm) ||
          s.shieldType.toLowerCase().includes(searchTerm)
      )
    );
  }

  return shields;
};
