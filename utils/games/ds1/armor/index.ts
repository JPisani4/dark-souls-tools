// Armor data and utilities for Dark Souls 1
// This file provides access to all armor data and utility functions

import type { Armor, ArmorCategory, AllArmor } from "~/types/game/ds1/armor";
import { lightArmor } from "./light-armor";
import { mediumArmor } from "./medium-armor";
import { heavyArmor } from "./heavy-armor";
import { specialArmor } from "./special-armor";
import {
  getAllArmorSets,
  getArmorSetsByCategory,
  getArmorSetById,
  getArmorSetByName,
  getArmorSetsByType,
  searchArmorSets,
  getArmorSetOptions,
  getArmorSetOptionsByCategory,
  getArmorPiecesFromSet,
  calculateArmorSetStats,
  getArmorSetsByWeightRange,
  getArmorSetsByPoiseRange,
  getArmorSetsByDefenseType,
} from "./armor-sets";

// Import armor set functionality
export * from "./armor-sets";

// Combine all armor data
const armorData: AllArmor = {
  "light-armor": lightArmor,
  "medium-armor": mediumArmor,
  "heavy-armor": heavyArmor,
  "special-armor": specialArmor,
};

// Export the complete armor data
export const getAllArmor = (): AllArmor => armorData;

// Export armor by category
export const getArmorByCategory = (category: ArmorCategory): Armor[] => {
  return armorData[category] || [];
};

// Export armor by slot
export const getArmorBySlot = (
  slot: "head" | "chest" | "hands" | "legs"
): Armor[] => {
  return Object.values(armorData)
    .flat()
    .filter((armor) => armor.slot === slot);
};

// Export armor by type
export const getArmorByType = (armorType: string): Armor[] => {
  return Object.values(armorData)
    .flat()
    .filter((armor) => armor.armorType === armorType);
};

// Export armor by defense type
export const getArmorByDefenseType = (
  defenseType: keyof Armor["defense"]
): Armor[] => {
  return Object.values(armorData)
    .flat()
    .filter((armor) => armor.defense[defenseType] > 0)
    .sort((a, b) => b.defense[defenseType] - a.defense[defenseType]);
};

// Export armor categories
export const getArmorCategories = (): ArmorCategory[] => {
  return Object.keys(armorData) as ArmorCategory[];
};

// Search armor by name
export const searchArmor = (query: string): Armor[] => {
  const searchTerm = query.toLowerCase();
  return Object.values(armorData)
    .flat()
    .filter((armor) => armor.name.toLowerCase().includes(searchTerm));
};

// Get armor by name
export const getArmorByName = (name: string): Armor | null => {
  const allArmor = Object.values(armorData).flat();
  return allArmor.find((armor) => armor.name === name) || null;
};

// Calculate total armor weight
export const calculateArmorWeight = (armor: Armor[]): number => {
  return armor.reduce((total, piece) => total + piece.weight, 0);
};

// Calculate total armor defense
export const calculateArmorDefense = (armor: Armor[]) => {
  const totalDefense = {
    normal: 0,
    strike: 0,
    slash: 0,
    thrust: 0,
    magic: 0,
    fire: 0,
    lightning: 0,
    bleed: 0,
    poison: 0,
    curse: 0,
  };

  armor.forEach((piece) => {
    totalDefense.normal += piece.defense.normal;
    totalDefense.strike += piece.defense.strike;
    totalDefense.slash += piece.defense.slash;
    totalDefense.thrust += piece.defense.thrust;
    totalDefense.magic += piece.defense.magic;
    totalDefense.fire += piece.defense.fire;
    totalDefense.lightning += piece.defense.lightning;
    totalDefense.bleed += piece.defense.bleed;
    totalDefense.poison += piece.defense.poison;
    totalDefense.curse += piece.defense.curse;
  });

  return totalDefense;
};

// Calculate total poise
export const calculateTotalPoise = (armor: Armor[]): number => {
  return armor.reduce((total, piece) => total + (piece.effect.poise || 0), 0);
};

// Get armor by set name
export const getArmorBySet = (setName: string): Armor[] => {
  return Object.values(armorData)
    .flat()
    .filter((armor) => armor.set === setName);
};

// Get all available armor sets
export const getAvailableArmorSets = (): string[] => {
  const sets = new Set<string>();
  Object.values(armorData)
    .flat()
    .forEach((armor) => {
      if (armor.set) {
        sets.add(armor.set);
      }
    });
  return Array.from(sets).sort();
};
