// Achievement types for Dark Souls 1
// This defines the complete achievement structure used throughout the application

export interface AchievementRequirement {
  id: string;
  name: string;
  category: string;
  cost?: number;
  quest?: boolean;
  price?: number;
  logansQuest?: boolean;
  dropRate?: string;
  ascendsFrom?: string[];
  bossSoul?: string;
  description?: string;
  location?: string | string[];
  tail?: string;
  isOptional?: boolean;
  notes?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirements: AchievementRequirement[];
  isSecret?: boolean;
  ngRequired?: boolean;
  totalRequired: number;
  notes?: string;
}

// Achievement category types for organization
export type AchievementCategory =
  | "weapons"
  | "magic"
  | "pyromancy"
  | "miracles"
  | "covenants"
  | "bosses"
  | "exploration"
  | "multiplayer";

// Collection of achievements by category
export interface AchievementCollection {
  [category: string]: Achievement[];
}

// All achievements in the game
export type AllAchievements = {
  [K in AchievementCategory]: Achievement[];
};

// Utility function to get achievement with default values
export const getAchievementWithDefaults = (
  achievement: Partial<Achievement>
): Achievement => {
  return {
    id: achievement.id || "",
    name: achievement.name || "",
    description: achievement.description || "",
    icon: achievement.icon || "",
    category: achievement.category || "weapons",
    requirements: achievement.requirements || [],
    isSecret: achievement.isSecret || false,
    ngRequired: achievement.ngRequired || false,
    totalRequired: achievement.totalRequired || 0,
    notes: achievement.notes,
  };
};

// Utility function to get requirement with default values
export const getRequirementWithDefaults = (
  requirement: Partial<AchievementRequirement>
): AchievementRequirement => {
  return {
    id: requirement.id || "",
    name: requirement.name || "",
    category: requirement.category || "weapons",
    description: requirement.description,
    location: requirement.location,
    isOptional: requirement.isOptional || false,
    notes: requirement.notes,
  };
};
