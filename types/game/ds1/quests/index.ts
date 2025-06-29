// Quest types for Dark Souls 1
// This defines the complete quest structure used throughout the application

export interface QuestRequirement {
  id: string;
  name: string;
  description: string;
  type: "step" | "requirement" | "fail-point" | "optional";
  isCompleted: boolean;
  optional?: boolean;
  location?: string;
  prerequisites?: string[]; // IDs of requirements that must be completed first
  failConditions?: string[]; // What happens if this step fails
  successConditions?: string[]; // What happens if this step succeeds
  rewards?: string[]; // IDs of rewards that are granted if this step is completed
  consequences?: string[]; // What happens if this step fails
  notes?: string;
  order: number; // For proper sequencing
}

export interface QuestReward {
  id: string;
  name: string;
  type: string;
  description: string;
  isObtained: boolean;
  location?: string;
  prerequisites?: string[]; // IDs of requirements that must be completed first
  notes?: string;
}

export interface QuestState {
  id: string;
  name: string;
  description: string;
  npcName: string;
  npcLocation: string;
  status: "not-started" | "in-progress" | "completed" | "failed";
  requirements: QuestRequirement[];
  rewards: QuestReward[];
  isExpanded: boolean;
  order: number;
  notes?: string;
  failConditions?: string[];
  successConditions?: string[];
}

export type QuestCategory =
  | "main-quest"
  | "side-quest"
  | "covenant"
  | "optional"
  | "secret";

export interface QuestCollection {
  [category: string]: QuestState[];
}

export type AllQuests = {
  [K in QuestCategory]: QuestState[];
};

// Helper functions for quest management
export const getQuestWithDefaults = (
  quest: Partial<QuestState>
): QuestState => {
  return {
    id: quest.id || "",
    name: quest.name || "",
    description: quest.description || "",
    npcName: quest.npcName || "",
    npcLocation: quest.npcLocation || "",
    status: quest.status || "not-started",
    requirements: quest.requirements || [],
    rewards: quest.rewards || [],
    isExpanded: quest.isExpanded || false,
    order: quest.order || 0,
    notes: quest.notes || "",
    failConditions: quest.failConditions || [],
    successConditions: quest.successConditions || [],
  };
};

export const getRequirementWithDefaults = (
  requirement: Partial<QuestRequirement>
): QuestRequirement => {
  return {
    id: requirement.id || "",
    name: requirement.name || "",
    description: requirement.description || "",
    type: requirement.type || "step",
    isCompleted: requirement.isCompleted || false,
    location: requirement.location || "",
    prerequisites: requirement.prerequisites || [],
    consequences: requirement.consequences || [],
    notes: requirement.notes || "",
    order: requirement.order || 0,
  };
};

export const getRewardWithDefaults = (
  reward: Partial<QuestReward>
): QuestReward => {
  return {
    id: reward.id || "",
    name: reward.name || "",
    type: reward.type || "other",
    description: reward.description || "",
    isObtained: reward.isObtained || false,
    location: reward.location || "",
    notes: reward.notes || "",
  };
};
