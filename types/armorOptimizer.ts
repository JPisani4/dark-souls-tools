// Types for ArmorOptimizer

export interface ArmorOptimizerState {
  endurance: string;
  selectedEquipment: {
    weapons: string[];
    shields: string[];
    catalysts: string[];
    talismans: string[];
  };
  selectedRings: string[];
  armorUpgradeLevel: string;
  displayMode: string;
  sortPrimary: string;
  sortSecondary: string;
  sortDescending: boolean;
  searchQuery: string;
  selectedArmorForComparison: string[];
  expandedSlots: string[];
  expandedCategories: Record<string, string[]>;
  currentPages: Record<string, number>;
  calculatedArmor?: any[];
  itemsPerPage: number;
  paginationEnabled: boolean;
  expandedArmor: string[];
  expandedArmorSets: string[];
  selectedArmorSetsForComparison: string[];
  expandedSetCategories: string[];
  maxDodgeRollPercent: number | null;
  lockedArmor: Record<string, string | null>;
  customFilter?: {
    selectedStats: string[];
    minValues: Record<string, number>;
    weights: Record<string, number>;
  };
  // Mixmatch
  mixMatchPage?: number;
  mixMatchItemsPerPage?: number;
  expandedMixMatch?: string[];
  selectedMixMatchCombos?: string[];
}

export interface ArmorOptimizerResult {
  calculatedArmor: any[];
  armorSets: any[];
  mixMatchResults: any[];
  characterStats: any;
  timestamp: Date;
}
