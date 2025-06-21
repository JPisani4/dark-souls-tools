import { ref, computed, watch } from "vue";
import { tools } from "~/tools";
import Fuse from "fuse.js";

export interface FilterState {
  game: string;
  category: string;
  search: string;
}

// Initialize Fuse for fuzzy search
const fuse = new Fuse(tools, {
  keys: ["title", "description", "tags"],
  threshold: 0.35, // typo tolerance
  minMatchCharLength: 2,
  ignoreLocation: true,
});

export const useToolFilters = () => {
  const route = useRoute();
  const router = useRouter();

  // Initialize filters from URL or defaults
  const filters = ref<FilterState>({
    game: (route.query.game as string) || "all",
    category: (route.query.category as string) || "all",
    search: (route.query.search as string) || "",
  });

  // Available filter options
  const availableGames = computed(() => {
    // Collect all unique games from all tools' gameCategories arrays
    const allGames = tools.flatMap((tool) => tool.gameCategories);
    const uniqueGames = [...new Set(allGames)];

    return [
      { id: "all", name: "All Games" },
      ...uniqueGames.map((game) => ({
        id: game,
        name: getGameDisplayName(game),
      })),
    ];
  });

  const availableCategories = computed(() => {
    const categories = [...new Set(tools.map((tool) => tool.category))];
    return [
      { id: "all", name: "All Categories" },
      ...categories.map((category) => ({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
      })),
    ];
  });

  // Filtered tools with fuzzy search
  const filteredTools = computed(() => {
    let filtered = tools;

    // Fuzzy search if search term is present
    if (filters.value.search) {
      const fuseResults = fuse.search(filters.value.search);
      filtered = fuseResults.map((result) => result.item);
    }

    // Game filter
    if (filters.value.game !== "all") {
      filtered = filtered.filter((tool) =>
        tool.gameCategories.includes(
          filters.value.game as "ds1" | "ds2" | "ds3" | "bb" | "er"
        )
      );
    }

    // Category filter
    if (filters.value.category !== "all") {
      filtered = filtered.filter(
        (tool) => tool.category === filters.value.category
      );
    }

    return filtered;
  });

  // Active filter count
  const activeFilterCount = computed(() => {
    let count = 0;
    if (filters.value.game !== "all") count++;
    if (filters.value.category !== "all") count++;
    if (filters.value.search) count++;
    return count;
  });

  // Update filters and sync with URL
  const updateFilters = (newFilters: Partial<FilterState>) => {
    filters.value = { ...filters.value, ...newFilters };
    syncWithURL();
  };

  // Clear all filters
  const clearFilters = () => {
    filters.value = {
      game: "all",
      category: "all",
      search: "",
    };
    syncWithURL();
  };

  // Sync filters with URL
  const syncWithURL = () => {
    const query: Record<string, string> = {};

    if (filters.value.game !== "all") query.game = filters.value.game;
    if (filters.value.category !== "all")
      query.category = filters.value.category;
    if (filters.value.search) query.search = filters.value.search;

    router.replace({ query });
  };

  // Initialize from URL on mount
  const initializeFromURL = () => {
    filters.value = {
      game: (route.query.game as string) || "all",
      category: (route.query.category as string) || "all",
      search: (route.query.search as string) || "",
    };
  };

  // Watch for route changes
  watch(
    () => route.query,
    () => {
      initializeFromURL();
    },
    { immediate: true }
  );

  // Helper function for game display names
  const getGameDisplayName = (gameCategory: string): string => {
    const gameNames: Record<string, string> = {
      ds1: "DS1",
      ds2: "DS2",
      ds3: "DS3",
      bb: "BB",
      er: "ER",
    };
    return gameNames[gameCategory] || gameCategory.toUpperCase();
  };

  return {
    filters,
    filteredTools,
    availableGames,
    availableCategories,
    activeFilterCount,
    updateFilters,
    clearFilters,
    initializeFromURL,
    getGameDisplayName,
  };
};
