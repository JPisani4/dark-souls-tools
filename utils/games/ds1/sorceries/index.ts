// Sorcery data and utilities for Dark Souls 1
// This file provides access to all sorcery data and utility functions

import type {
  Sorcery,
  SorceryCategory,
  AllSorceries,
} from "~/types/game/ds1/sorceries";
import { offensive } from "./offensive";
import { weaponBuff } from "./weapon-buff";
import { support } from "./support";

// Combine all sorcery data
const sorceryData: AllSorceries = {
  offensive: offensive,
  "weapon-buff": weaponBuff,
  support,
};

// Export the complete sorcery data
export const getAllSorceries = (): AllSorceries => sorceryData;

// Get sorceries by category
export const getSorceriesByCategory = (
  category: SorceryCategory
): Sorcery[] => {
  return sorceryData[category] || [];
};

// Get sorcery by name
export const getSorceryByName = (name: string): Sorcery | null => {
  for (const category of Object.values(sorceryData)) {
    const sorcery = category.find(
      (s) => s.name.toLowerCase() === name.toLowerCase()
    );
    if (sorcery) return sorcery;
  }
  return null;
};

// Get sorceries by intelligence requirement
export const getSorceriesByIntelligenceRequirement = (
  intelligence: number
): Sorcery[] => {
  const sorceries: Sorcery[] = [];
  for (const category of Object.values(sorceryData)) {
    sorceries.push(
      ...category.filter((s) => s.requirements.intelligence <= intelligence)
    );
  }
  return sorceries;
};

// Get sorceries by covenant
export const getSorceriesByCovenant = (covenant: string): Sorcery[] => {
  const sorceries: Sorcery[] = [];
  for (const category of Object.values(sorceryData)) {
    sorceries.push(...category.filter((s) => s.covenant === covenant));
  }
  return sorceries;
};

// Get sorceries by effect type
export const getSorceriesByEffectType = (
  effectType: keyof Sorcery["effect"]
): Sorcery[] => {
  const sorceries: Sorcery[] = [];
  for (const category of Object.values(sorceryData)) {
    sorceries.push(...category.filter((s) => s.effect[effectType]));
  }
  return sorceries;
};

// Get sorcery categories
export const getSorceryCategories = (): SorceryCategory[] => {
  return Object.keys(sorceryData) as SorceryCategory[];
};

// Search sorceries by name
export const searchSorceries = (query: string): Sorcery[] => {
  const sorceries: Sorcery[] = [];
  const searchTerm = query.toLowerCase();

  for (const category of Object.values(sorceryData)) {
    sorceries.push(
      ...category.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm) ||
          s.description.toLowerCase().includes(searchTerm)
      )
    );
  }

  return sorceries;
};
