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
  maskOfTheFather: boolean;
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
}

export interface ArmorOptimizerResult {
  calculatedArmor: any[];
  armorSets: any[];
  mixMatchResults: any[];
  characterStats: any;
  timestamp: Date;
}
