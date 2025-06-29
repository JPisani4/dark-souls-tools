// Ring data and utilities for Dark Souls 1
// This file provides access to all ring data and utility functions

import type { Ring, RingCategory, AllRings } from "~/types/game/ds1/rings";
import { statBoost } from "./stat-boost";
import { defense } from "./defensive";
import { offense } from "./offensive";
import { utility } from "./support";
import { covenant } from "./other";
import { special } from "./special";

// Combine all ring data
const ringData: AllRings = {
  "stat-boost": statBoost,
  defense: defense,
  offense: offense,
  utility: utility,
  covenant: covenant,
  special: special,
};

// Export the complete ring data
export const getAllRings = (): AllRings => ringData;

// Export rings by category
export const getRingsByCategory = (category: RingCategory): Ring[] => {
  return ringData[category] || [];
};

// Export rings by type
export const getRingsByType = (ringType: string): Ring[] => {
  return Object.values(ringData)
    .flat()
    .filter((ring) => ring.ringType === ringType);
};

// Export rings by requirements
export const getRingsByRequirements = (
  strength: number,
  dexterity: number,
  intelligence: number,
  faith: number
): Ring[] => {
  return Object.values(ringData)
    .flat()
    .filter((ring) => {
      return (
        ring.requirements.strength <= strength &&
        ring.requirements.dexterity <= dexterity &&
        ring.requirements.intelligence <= intelligence &&
        ring.requirements.faith <= faith
      );
    });
};

// Export rings by effect type
export const getRingsByEffectType = (
  effectType: keyof Ring["effect"]
): Ring[] => {
  return Object.values(ringData)
    .flat()
    .filter((ring) => {
      if (effectType === "statBonus") {
        return Object.keys(ring.effect.statBonus || {}).length > 0;
      }
      return ring.effect[effectType] !== undefined;
    });
};

// Export ring categories
export const getRingCategories = (): RingCategory[] => {
  return Object.keys(ringData) as RingCategory[];
};

// Search rings by name
export const searchRings = (query: string): Ring[] => {
  const searchTerm = query.toLowerCase();
  return Object.values(ringData)
    .flat()
    .filter((ring) => ring.name.toLowerCase().includes(searchTerm));
};

// Get ring by name
export const getRingByName = (name: string): Ring | null => {
  const found = Object.values(ringData)
    .flat()
    .find((ring) => ring.name === name);
  return found || null;
};

// Calculate total ring effects
export const calculateRingEffects = (rings: Ring[]) => {
  const totalEffects = {
    statBonus: {
      vitality: 0,
      attunement: 0,
      endurance: 0,
      strength: 0,
      dexterity: 0,
      resistance: 0,
      intelligence: 0,
      faith: 0,
    },
    equipLoadBonus: 0,
    staminaBonus: 0,
    staminaRegenBonus: 0,
    hpBonus: 0,
  };

  rings.forEach((ring) => {
    if (ring.effect.statBonus) {
      Object.keys(ring.effect.statBonus).forEach((stat) => {
        const statKey = stat as keyof typeof totalEffects.statBonus;
        totalEffects.statBonus[statKey] += ring.effect.statBonus![statKey] || 0;
      });
    }
    totalEffects.equipLoadBonus += ring.effect.equipLoadBonus || 0;
    totalEffects.staminaBonus += ring.effect.staminaBonus || 0;
    totalEffects.staminaRegenBonus += ring.effect.staminaRegenBonus || 0;
    totalEffects.hpBonus += ring.effect.hpBonus || 0;
  });

  return totalEffects;
};

// Calculate total ring weight
export const calculateRingWeight = (rings: Ring[]): number => {
  return rings.reduce((total, ring) => total + (ring.weight || 0), 0);
};
