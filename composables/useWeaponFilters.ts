import { computed } from "vue";
import Fuse from "fuse.js";
import type { Weapon } from "~/types/game/ds1/weapons";
import type { WeaponCalculatorState } from "./useWeaponAttackRatingCalculator";

// Create mapping from weapon types to category names
const weaponTypeToCategory = {
  dagger: "daggers",
  "straight-sword": "straight-swords",
  greatsword: "greatswords",
  "ultra-greatsword": "ultra-greatswords",
  "curved-sword": "curved-swords",
  "curved-greatsword": "curved-greatswords",
  katana: "katanas",
  "thrusting-sword": "thrusting-swords",
  axe: "axes",
  greataxe: "greataxes",
  hammer: "hammers",
  "great-hammer": "great-hammers",
  spear: "spears",
  halberd: "halberds",
  whip: "whips",
  fist: "fists",
  bow: "bows",
  greatbow: "greatbows",
  crossbow: "crossbows",
  catalyst: "catalysts",
  talisman: "talismans",
  flame: "flames",
};

// Sorting options with categories
const sortOptionsWithCategories = [
  {
    label: "General",
    options: [
      { label: "Total Attack Rating", value: "totalAttackRating" },
      { label: "Total Base Damage", value: "totalBaseDamage" },
      { label: "Magic Adjust", value: "magicAdjust" },
      { label: "Weapon Type", value: "weaponType" }, // NEW
    ],
  },
  {
    label: "Base",
    options: [
      { label: "Base Physical Damage", value: "basePhysical" },
      { label: "Base Magic Damage", value: "baseMagic" },
      { label: "Base Fire Damage", value: "baseFire" },
      { label: "Base Lightning Damage", value: "baseLightning" },
    ],
  },
  {
    label: "Scaled",
    options: [
      { label: "Scaled Physical Damage", value: "scaledPhysical" },
      { label: "Scaled Magic Damage", value: "scaledMagic" },
      { label: "Scaled Fire Damage", value: "scaledFire" },
      { label: "Scaled Lightning Damage", value: "scaledLightning" },
    ],
  },
  {
    label: "Scaling",
    options: [
      { label: "Strength Scaling", value: "strengthScaling" },
      { label: "Dexterity Scaling", value: "dexterityScaling" },
      { label: "Intelligence Scaling", value: "intelligenceScaling" },
      { label: "Faith Scaling", value: "faithScaling" },
    ],
  },
];

// Create categorized options for dropdowns
const createCategorizedOptions = (categories: any[]) => {
  const options: any[] = [];

  categories.forEach((category) => {
    // Add category header (disabled)
    options.push({
      label: `--- ${category.label} ---`,
      value: `category-${category.label.toLowerCase().replace(/\s+/g, "-")}`,
      disabled: true,
    });

    // Add category options
    category.options.forEach((option: any) => {
      options.push({
        label: option.label,
        value: option.value,
      });
    });
  });

  return options;
};

// Get sort value for a weapon
const getSortValue = (weapon: any, sortBy: string) => {
  switch (sortBy) {
    case "totalAttackRating":
      return weapon.rating.totalAttackRating;
    case "totalBaseDamage":
      return (
        weapon.rating.basePhysical +
        weapon.rating.baseMagic +
        weapon.rating.baseFire +
        weapon.rating.baseLightning
      );
    case "basePhysical":
      return weapon.rating.basePhysical;
    case "baseMagic":
      return weapon.rating.baseMagic;
    case "baseFire":
      return weapon.rating.baseFire;
    case "baseLightning":
      return weapon.rating.baseLightning;
    case "scaledPhysical":
      return weapon.rating.physical;
    case "scaledMagic":
      return weapon.rating.magic;
    case "scaledFire":
      return weapon.rating.fire;
    case "scaledLightning":
      return weapon.rating.lightning;
    case "strengthScaling":
      return weapon.rating.scalingInfo.scalingPercentages.strength;
    case "dexterityScaling":
      return weapon.rating.scalingInfo.scalingPercentages.dexterity;
    case "intelligenceScaling":
      return weapon.rating.scalingInfo.scalingPercentages.intelligence;
    case "faithScaling":
      return weapon.rating.scalingInfo.scalingPercentages.faith;
    case "magicAdjust":
      return weapon.rating.magicAdjustment || 0;
    case "weaponType":
      // Use weaponType string for sorting
      return weapon.weaponType || "";
    default:
      return weapon.rating.totalAttackRating;
  }
};

// Check if weapon has any auxiliary damage
const hasAuxiliaryDamage = (weapon: Weapon): boolean => {
  if (!weapon.auxillaryDamage) return false;

  return (
    weapon.auxillaryDamage.bleed > 0 ||
    weapon.auxillaryDamage.poison > 0 ||
    weapon.auxillaryDamage.toxic > 0 ||
    weapon.auxillaryDamage.curse > 0 ||
    weapon.auxillaryDamage.occult > 0 ||
    weapon.auxillaryDamage.divine > 0
  );
};

// Helper function to check if weapon has any scaling
const hasScaling = (weapon: any) => {
  const scaling = weapon.rating.scalingInfo.scalingPercentages;
  return (
    scaling.strength > 0 ||
    scaling.dexterity > 0 ||
    scaling.intelligence > 0 ||
    scaling.faith > 0
  );
};

// Helper function to get weapon category
const getWeaponCategory = (weapon: any) => {
  for (const [type, category] of Object.entries(weaponTypeToCategory)) {
    if (weapon.weaponType === type) {
      return category;
    }
  }
  return "other";
};

export function useWeaponFilters(
  weaponsWithRatings: any, // Changed: now expects weapons with ratings
  state: WeaponCalculatorState,
  setState: (updates: Partial<WeaponCalculatorState>) => void
) {
  // Filter and search weapons that already have ratings
  const filteredWeapons = computed(() => {
    if (!weaponsWithRatings.value) return [];

    let filtered = weaponsWithRatings.value;

    // Apply category filter
    if (state.selectedCategory) {
      filtered = filtered.filter((weapon: any) => {
        const weaponCategory =
          weaponTypeToCategory[
            weapon.weaponType as keyof typeof weaponTypeToCategory
          ];
        return weaponCategory === state.selectedCategory;
      });
    }

    // Apply upgrade path filter
    if (state.selectedUpgradePath) {
      filtered = filtered.filter((weapon: any) => {
        if (!weapon.upgradePath) return false;
        // Handle comma-separated upgrade paths
        const weaponPaths = weapon.upgradePath
          .split(",")
          .map((path: string) => path.trim());
        return weaponPaths.includes(state.selectedUpgradePath);
      });
    }

    // Apply filter for equippable weapons only
    if (state.filterEquippableOnly) {
      filtered = filtered.filter(
        (weapon: any) => weapon.rating.meetsRequirements
      );
    }

    // Apply search filter with fuzzy matching, but prioritize exact match
    if (state.search) {
      // Check for exact match first
      const exact = filtered.find(
        (w: any) => w.name.toLowerCase() === state.search.toLowerCase()
      );
      if (exact) {
        filtered = [exact];
      } else {
        const fuse = new Fuse(filtered, {
          keys: ["name", "weaponType"],
          threshold: 0.2, // Lowered threshold for stricter matching
          minMatchCharLength: 2,
          ignoreLocation: true,
          useExtendedSearch: false,
        });
        filtered = fuse.search(state.search).map((result) => result.item);
      }
    }

    return filtered;
  });

  // Sort weapons based on current sort settings
  const weaponsWithRatingsSorted = computed(() => {
    if (!filteredWeapons.value) return [];

    const sorted = [...filteredWeapons.value];

    // Sort weapons based on current sort settings
    return sorted.sort((a: any, b: any) => {
      const aValue = getSortValue(a, state.sortBy);
      const bValue = getSortValue(b, state.sortBy);

      if (state.sortDescending) {
        return bValue - aValue;
      } else {
        return aValue - bValue;
      }
    });
  });

  // Category options for filter
  const categoryOptions = computed(() => [
    { label: "All Categories", value: "all" },
    ...Object.values(weaponTypeToCategory).map((category) => ({
      label: category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      value: category,
    })),
  ]);

  // Handle filter changes
  const handleCategoryChange = (value: string) => {
    setState({
      selectedCategory: value === "all" ? "" : value,
      currentPage: 1,
    });
  };

  const handleUpgradePathChange = (value: string) => {
    setState({
      selectedUpgradePath: value === "all" ? "" : value,
      currentPage: 1,
    });
  };

  // Reset filters only (not character stats)
  const resetFilters = () => {
    setState({
      search: "",
      selectedCategory: "",
      selectedUpgradePath: "",
      currentPage: 1,
      expandedWeapons: [],
      expandedCategories: [],
    });
  };

  // Handler for equippable filter
  const handleEquippableFilterChange = (value: boolean) => {
    setState({ filterEquippableOnly: value, currentPage: 1 });
  };

  return {
    // Computed
    filteredWeapons,
    weaponsWithRatings: weaponsWithRatingsSorted, // Return the sorted version
    categoryOptions,
    sortOptions: createCategorizedOptions(sortOptionsWithCategories),

    // Actions
    handleCategoryChange,
    handleUpgradePathChange,
    resetFilters,
    handleEquippableFilterChange, // NEW

    // Utility functions
    getSortValue,
    hasAuxiliaryDamage,
    hasScaling,
    getWeaponCategory,
    weaponTypeToCategory,
  };
}
