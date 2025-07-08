import { computed, ref } from "vue";

/**
 * Generic item option for dropdowns.
 */
export interface ItemOption<T = any> {
  value: string;
  label: string;
  category: string;
  item: T;
}

/**
 * Grouped options for dropdowns (with category headers).
 */
export interface GroupedOptions<T = any> {
  category: string;
  options: ItemOption<T>[];
}

/**
 * Generic composable for item lookup and dropdown option generation.
 * Supports weapons, shields, and is extendable for other item types.
 *
 * @param items - List of items (weapons, shields, etc.)
 * @param typeKey - The key to use for type/category grouping (e.g., 'weaponType', 'shieldType')
 * @param searchKey - The key to use for searching (e.g., 'name')
 */
export function useItemLookup<T extends Record<string, any>>(
  items: T[],
  typeKey: string = "category",
  searchKey: string = "name"
) {
  const search = ref("");

  // Filter items by search string
  const filteredItems = computed(() => {
    if (!search.value) return items;
    return items.filter((item) =>
      item[searchKey].toLowerCase().includes(search.value.toLowerCase())
    );
  });

  // Group items by category/type
  const groupedOptions = computed<GroupedOptions<T>[]>(() => {
    const groups: Record<string, ItemOption<T>[]> = {};
    filteredItems.value.forEach((item) => {
      const category = item[typeKey] || "Other";
      if (!groups[category]) groups[category] = [];
      groups[category].push({
        value: item[searchKey],
        label: item[searchKey],
        category,
        item,
      });
    });
    return Object.entries(groups).map(([category, options]) => ({
      category,
      options,
    }));
  });

  // Flat list of options with category headers (for dropdowns that support headers)
  const flatOptions = computed(() => {
    const opts: { value: string; label: string; disabled?: boolean }[] = [];
    groupedOptions.value.forEach((group) => {
      opts.push({
        value: `category-${group.category}`,
        label: `--- ${formatCategoryName(group.category)} ---`,
        disabled: true,
      });
      group.options.forEach((option) => {
        opts.push({ value: option.value, label: option.label });
      });
    });
    return opts;
  });

  // Utility: format category name for display
  function formatCategoryName(category: string) {
    return category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }

  // Get valid upgrade paths for a selected item (if applicable)
  function getUpgradePaths(item: T): string[] {
    if ("upgradePaths" in item) {
      const paths = item.upgradePaths;
      if (Array.isArray(paths)) {
        // If the array contains a single string with commas, split it
        if (
          paths.length === 1 &&
          typeof paths[0] === "string" &&
          paths[0].includes(",")
        ) {
          return paths[0].split(",").map((s) => s.trim());
        }
        // Otherwise, flatten and split any comma-separated strings
        return paths
          .flat(Infinity)
          .flatMap((v) =>
            typeof v === "string" ? v.split(",").map((s) => s.trim()) : []
          )
          .filter(Boolean);
      }
      if (typeof paths === "string") {
        // Split comma-separated string
        return paths.split(",").map((s) => s.trim());
      }
    }
    if ("upgradePath" in item && typeof item.upgradePath === "string") {
      // Split comma-separated string for upgradePath as well
      return item.upgradePath.split(",").map((s) => s.trim());
    }
    return [];
  }

  // Get valid levels for a selected upgrade path (if applicable)
  function getValidLevelsForPath(upgradePath: string): number[] {
    // This should be implemented per-game or per-item-type as needed
    // For DS1, you can map upgradePath to valid level ranges
    // Example: Regular: 0-15, Raw: 0-5, Unique: 0-5, etc.
    // This function can be extended as needed
    return [];
  }

  return {
    search,
    filteredItems,
    groupedOptions,
    flatOptions,
    getUpgradePaths,
    getValidLevelsForPath,
  };
}
