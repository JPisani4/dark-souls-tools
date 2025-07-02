// Pyromancy data and utilities for Dark Souls 1
// This file provides access to all pyromancy data and utility functions

import type {
  Pyromancy,
  PyromancyCategory,
  AllPyromancies,
} from "~/types/game/ds1/pyromancies";
import { offensive } from "./offensive";
import { support } from "./support";
import { status } from "./status";
import { special } from "./special";

// Combine all pyromancy data
const pyromancyData: AllPyromancies = {
  offensive,
  support,
  status,
  special,
};

// Export the complete pyromancy data
export const getAllPyromancies = (): AllPyromancies => pyromancyData;

// Get pyromancies by category
export const getPyromanciesByCategory = (
  category: PyromancyCategory
): Pyromancy[] => {
  return pyromancyData[category] || [];
};

// Get pyromancy by name
export const getPyromancyByName = (name: string): Pyromancy | null => {
  for (const category of Object.values(pyromancyData)) {
    const pyromancy = category.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (pyromancy) return pyromancy;
  }
  return null;
};

// Get pyromancies by type (fire, poison, toxic, acid, physical, support)
export const getPyromanciesByType = (type: string): Pyromancy[] => {
  const pyromancies: Pyromancy[] = [];
  for (const category of Object.values(pyromancyData)) {
    pyromancies.push(...category.filter((p) => p.type === type));
  }
  return pyromancies;
};

// Get pyromancies by affinity
export const getPyromanciesByAffinity = (affinity: string): Pyromancy[] => {
  const pyromancies: Pyromancy[] = [];
  for (const category of Object.values(pyromancyData)) {
    pyromancies.push(...category.filter((p) => p.affinity === affinity));
  }
  return pyromancies;
};

// Get pyromancies by covenant
export const getPyromanciesByCovenant = (covenant: string): Pyromancy[] => {
  const pyromancies: Pyromancy[] = [];
  for (const category of Object.values(pyromancyData)) {
    pyromancies.push(...category.filter((p) => p.covenant === covenant));
  }
  return pyromancies;
};

// Get pyromancies by effect type
export const getPyromanciesByEffectType = (
  effectType: keyof Pyromancy["effect"]
): Pyromancy[] => {
  const pyromancies: Pyromancy[] = [];
  for (const category of Object.values(pyromancyData)) {
    pyromancies.push(...category.filter((p) => p.effect[effectType]));
  }
  return pyromancies;
};

// Get pyromancy categories
export const getPyromancyCategories = (): PyromancyCategory[] => {
  return Object.keys(pyromancyData) as PyromancyCategory[];
};

// Search pyromancies by name
export const searchPyromancies = (query: string): Pyromancy[] => {
  const pyromancies: Pyromancy[] = [];
  const searchTerm = query.toLowerCase();

  for (const category of Object.values(pyromancyData)) {
    pyromancies.push(
      ...category.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm)
      )
    );
  }

  return pyromancies;
};
