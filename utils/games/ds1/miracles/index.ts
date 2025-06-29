// Miracle data and utilities for Dark Souls 1
// This file provides access to all miracle data and utility functions

import type {
  Miracle,
  MiracleCategory,
  AllMiracles,
} from "~/types/game/ds1/miracles";
import { healing } from "./healing";
import { offensive } from "./offensive";
import { buff } from "./weapon-buff";
import { special } from "./support";

// Combine all miracle data
const miracleData: AllMiracles = {
  healing,
  offensive,
  buff,
  special,
};

// Export the complete miracle data
export const getAllMiracles = (): AllMiracles => miracleData;

// Get miracles by category
export const getMiraclesByCategory = (category: MiracleCategory): Miracle[] => {
  return miracleData[category] || [];
};

// Get miracle by name
export const getMiracleByName = (name: string): Miracle | null => {
  for (const category of Object.values(miracleData)) {
    const miracle = category.find(
      (m) => m.name.toLowerCase() === name.toLowerCase()
    );
    if (miracle) return miracle;
  }
  return null;
};

// Get miracles by faith requirement
export const getMiraclesByFaithRequirement = (faith: number): Miracle[] => {
  const miracles: Miracle[] = [];
  for (const category of Object.values(miracleData)) {
    miracles.push(...category.filter((m) => m.requirements.faith <= faith));
  }
  return miracles;
};

// Get miracles by effect type
export const getMiraclesByEffectType = (
  effectType: keyof Miracle["effect"]
): Miracle[] => {
  const miracles: Miracle[] = [];
  for (const category of Object.values(miracleData)) {
    miracles.push(...category.filter((m) => m.effect[effectType]));
  }
  return miracles;
};

// Get miracle categories
export const getMiracleCategories = (): MiracleCategory[] => {
  return Object.keys(miracleData) as MiracleCategory[];
};

// Search miracles by name
export const searchMiracles = (query: string): Miracle[] => {
  const miracles: Miracle[] = [];
  const searchTerm = query.toLowerCase();

  for (const category of Object.values(miracleData)) {
    miracles.push(
      ...category.filter(
        (m) =>
          m.name.toLowerCase().includes(searchTerm) ||
          m.description.toLowerCase().includes(searchTerm)
      )
    );
  }

  return miracles;
};
