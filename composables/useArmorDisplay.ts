import { computed } from "vue";
import type { Ref } from "vue";

// Types for state and setState function
interface ArmorDisplayState {
  expandedSlots: string[];
  expandedCategories: Record<string, string[]>;
  expandedArmor: string[];
  expandedArmorSets: string[];
  selectedArmorForComparison: string[];
  selectedArmorSetsForComparison: string[];
  expandedSetCategories: string[];
  currentPages: Record<string, number>;
  itemsPerPage: number;
  paginationEnabled: boolean;
  // Mixmatch
  mixMatchPage?: number;
  mixMatchItemsPerPage?: number;
  expandedMixMatch?: string[];
  selectedMixMatchCombos?: string[];
}

type SetStateFn = (updates: Partial<ArmorDisplayState>) => void;

export function useArmorDisplay(
  state: Ref<ArmorDisplayState>,
  setState: SetStateFn
) {
  // --- Expansion logic ---
  const toggleSlotExpansion = (
    slot: string = "",
    category: string = "",
    page?: number,
    totalPages?: number
  ) => {
    const expanded = [...state.value.expandedSlots];
    const index = expanded.indexOf(slot);
    if (index > -1) {
      expanded.splice(index, 1);
    } else {
      expanded.push(slot);
    }
    setState({ expandedSlots: expanded });
  };

  const toggleCategoryExpansion = (
    slot: string = "",
    category: string = "",
    page?: number,
    totalPages?: number
  ) => {
    const current = state.value.expandedCategories[slot] || [];
    const newExpanded = [...current];
    const index = newExpanded.indexOf(category);
    if (index > -1) {
      newExpanded.splice(index, 1);
    } else {
      newExpanded.push(category);
    }
    setState({
      expandedCategories: {
        ...state.value.expandedCategories,
        [slot]: newExpanded,
      },
    });
  };

  const toggleArmorExpansion = (
    slot: string = "",
    category: string = "",
    page?: number,
    totalPages?: number
  ) => {
    const expanded = [...state.value.expandedArmor];
    const index = expanded.indexOf(category);
    if (index > -1) {
      expanded.splice(index, 1);
    } else {
      expanded.push(category);
    }
    setState({ expandedArmor: expanded });
  };

  const toggleArmorSetExpansion = (
    slot: string = "",
    category: string = "",
    page?: number,
    totalPages?: number
  ) => {
    const expanded = [...state.value.expandedArmorSets];
    const index = expanded.indexOf(category);
    if (index > -1) {
      expanded.splice(index, 1);
    } else {
      expanded.push(category);
    }
    setState({ expandedArmorSets: expanded });
  };

  const toggleSetCategoryExpansion = (
    slot: string = "",
    category: string = "",
    page?: number,
    totalPages?: number
  ) => {
    const expanded = [...state.value.expandedSetCategories];
    const index = expanded.indexOf(category);
    if (index > -1) {
      expanded.splice(index, 1);
    } else {
      expanded.push(category);
    }
    setState({ expandedSetCategories: expanded });
  };

  // --- Comparison logic ---
  const toggleArmorComparison = (
    slot: string = "",
    category: string = "",
    page?: number,
    totalPages?: number
  ) => {
    const selected = [...state.value.selectedArmorForComparison];
    const index = selected.indexOf(category);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(category);
    }
    setState({ selectedArmorForComparison: selected });
  };

  const toggleArmorSetComparison = (
    slot: string = "",
    category: string = "",
    page?: number,
    totalPages?: number
  ) => {
    const selected = [...state.value.selectedArmorSetsForComparison];
    const index = selected.indexOf(category);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(category);
    }
    setState({ selectedArmorSetsForComparison: selected });
  };

  // --- Pagination logic ---
  const getPaginationKey = (slot: string, category: string): string => {
    return `${slot}-${category}`;
  };

  const getCurrentPage = (slot: string, category: string): number => {
    const paginationKey = getPaginationKey(slot, category);
    return state.value.currentPages[paginationKey] || 1;
  };

  const goToPage = (
    slot: string = "",
    category: string = "",
    page?: number,
    totalPages?: number
  ) => {
    if (page === undefined || totalPages === undefined) return;
    if (page >= 1 && page <= totalPages) {
      const paginationKey = getPaginationKey(slot, category);
      setState({
        currentPages: {
          ...state.value.currentPages,
          [paginationKey]: page,
        },
      });
    }
  };

  const nextPage = (
    slot: string = "",
    category: string = "",
    page?: number,
    totalPages?: number
  ) => {
    if (page === undefined || totalPages === undefined) return;
    const current = getCurrentPage(slot, category);
    if (current < totalPages) {
      goToPage(slot, category, current + 1, totalPages);
    }
  };

  const previousPage = (
    slot: string = "",
    category: string = "",
    page?: number,
    totalPages?: number
  ) => {
    if (page === undefined || totalPages === undefined) return;
    const current = getCurrentPage(slot, category);
    if (current > 1) {
      goToPage(slot, category, current - 1, current);
    }
  };

  // --- Mixmatch logic ---
  const toggleMixMatchExpansion = (id: string) => {
    if (!state.value.expandedMixMatch) return;
    const expanded = [...state.value.expandedMixMatch];
    const idx = expanded.indexOf(id);
    if (idx > -1) {
      expanded.splice(idx, 1);
    } else {
      expanded.push(id);
    }
    setState({ expandedMixMatch: expanded });
  };

  const toggleMixMatchComboSelection = (id: string) => {
    if (!state.value.selectedMixMatchCombos) return;
    const selected = [...state.value.selectedMixMatchCombos];
    const idx = selected.indexOf(id);
    if (idx > -1) {
      selected.splice(idx, 1);
    } else {
      selected.push(id);
    }
    setState({ selectedMixMatchCombos: selected });
  };

  return {
    // Expansion
    toggleSlotExpansion,
    toggleCategoryExpansion,
    toggleArmorExpansion,
    toggleArmorSetExpansion,
    toggleSetCategoryExpansion,
    // Comparison
    toggleArmorComparison,
    toggleArmorSetComparison,
    // Pagination
    getCurrentPage,
    goToPage,
    nextPage,
    previousPage,
    // Mixmatch
    toggleMixMatchExpansion,
    toggleMixMatchComboSelection,
  };
}
