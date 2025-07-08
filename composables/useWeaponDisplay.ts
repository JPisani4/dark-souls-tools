import { computed } from "vue";
import type { WeaponCalculatorState } from "./useWeaponAttackRatingCalculator";

export function useWeaponDisplay(
  weaponsWithRatings: any,
  state: WeaponCalculatorState,
  setState: (updates: Partial<WeaponCalculatorState>) => void
) {
  // Pagination - 10 weapons per page
  const weaponsPerPage = 10;
  const totalPages = computed(() => {
    if (!weaponsWithRatings.value) return 0;
    return Math.ceil(weaponsWithRatings.value.length / weaponsPerPage);
  });

  const paginatedWeapons = computed(() => {
    if (!weaponsWithRatings.value) return [];
    const start = (state.currentPage - 1) * weaponsPerPage;
    const end = start + weaponsPerPage;
    return weaponsWithRatings.value.slice(start, end);
  });

  // Toggle weapon expansion
  const toggleWeaponExpansion = (weaponName: string) => {
    const expanded = [...state.expandedWeapons];
    const index = expanded.indexOf(weaponName);

    if (index > -1) {
      expanded.splice(index, 1);
    } else {
      expanded.push(weaponName);
    }

    setState({ expandedWeapons: expanded });
  };

  const isWeaponExpanded = (weaponName: string) => {
    return state.expandedWeapons.includes(weaponName);
  };

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryName: string) => {
    const expanded = [...state.expandedCategories];
    const index = expanded.indexOf(categoryName);

    if (index > -1) {
      expanded.splice(index, 1);
    } else {
      expanded.push(categoryName);
    }

    setState({ expandedCategories: expanded });
  };

  const isCategoryExpanded = (categoryName: string) => {
    return state.expandedCategories.includes(categoryName);
  };

  // Initialize all categories as collapsed by default
  const initializeExpandedCategories = () => {
    // Don't expand any categories by default
    setState({ expandedCategories: [] });
  };

  return {
    // Pagination
    weaponsPerPage,
    totalPages,
    paginatedWeapons,

    // Expansion state
    toggleWeaponExpansion,
    isWeaponExpanded,
    toggleCategoryExpansion,
    isCategoryExpanded,
    initializeExpandedCategories,
  };
}
