import { ref, computed, onUnmounted } from "vue";
import type { Tool } from "~/types/tools/tool";
import type { GameId, GameData } from "~/types/game";
import { tools } from "~/tools";
import { getGameData, isGameAvailable } from "~/utils/games";

/**
 * Composable for loading game-specific tools with their associated game data
 * Handles tool discovery, game compatibility, and dynamic component loading
 */
export function useGameToolLoader() {
  // Core state management
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const component = ref<any>(null);
  const tool = ref<Tool | null>(null);
  const gameData = ref<GameData | null>(null);
  const loadingTimeout = ref<NodeJS.Timeout | null>(null);
  const initialized = ref(false);

  // Computed states for easy template usage
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);
  const hasComponent = computed(() => component.value !== null);
  const hasTool = computed(() => tool.value !== null);

  /**
   * Loads a tool for a specific game, including tool validation and game data loading
   * @param gameId - The game identifier (ds1, ds2, etc.)
   * @param slug - The tool slug to load
   */
  const loadGameTool = async (gameId: GameId, slug: string) => {
    error.value = null;
    loading.value = true;
    initialized.value = false;

    try {
      // Find the tool by slug
      const foundTool = tools.find((t) => t.slug === slug.toLowerCase());

      if (!foundTool) {
        error.value = new Error(`Tool not found: ${slug}`);
        tool.value = null;
        gameData.value = null;
        loading.value = false;
        initialized.value = true;
        return;
      }

      // Check if tool supports the requested game
      if (!foundTool.gameCategories.includes(gameId)) {
        error.value = new Error(
          `Tool ${foundTool.title} does not support game: ${gameId}`
        );
        tool.value = null;
        gameData.value = null;
        loading.value = false;
        initialized.value = true;
        return;
      }

      tool.value = foundTool;

      // Check if game is available before loading data
      const gameAvailable = isGameAvailable(gameId);
      if (!gameAvailable) {
        error.value = new Error(`Game ${gameId} is not currently supported`);
        tool.value = null;
        gameData.value = null;
        loading.value = false;
        initialized.value = true;
        return;
      }

      // Load game data
      try {
        gameData.value = getGameData(gameId);
      } catch (gameDataError) {
        error.value = new Error(
          `Failed to load game data for ${gameId}: ${gameDataError instanceof Error ? gameDataError.message : String(gameDataError)}`
        );
        loading.value = false;
        initialized.value = true;
        return;
      }

      // Set a timeout for loading the component (10 seconds)
      const timeoutPromise = new Promise((_, reject) => {
        loadingTimeout.value = setTimeout(() => {
          reject(
            new Error("Loading timeout - tool component took too long to load")
          );
        }, 10000);
      });

      // Load the component
      const loadPromise = foundTool.loadComponent();

      const mod: any = await Promise.race([loadPromise, timeoutPromise]);

      if (loadingTimeout.value) {
        clearTimeout(loadingTimeout.value);
        loadingTimeout.value = null;
      }

      component.value = mod.default;
      loading.value = false;
      initialized.value = true;
    } catch (err) {
      if (loadingTimeout.value) {
        clearTimeout(loadingTimeout.value);
        loadingTimeout.value = null;
      }

      error.value = err instanceof Error ? err : new Error(String(err));
      loading.value = false;
      initialized.value = true;

      // Log error in development
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to load game tool:", err);
      }
    }
  };

  // Retry loading
  const retry = async () => {
    if (tool.value) {
      component.value = null;
      const gameId = gameData.value?.metadata.id;
      if (gameId) {
        await loadGameTool(gameId, tool.value.slug);
      }
    }
  };

  // Reset state
  const reset = () => {
    loading.value = false;
    error.value = null;
    component.value = null;
    tool.value = null;
    gameData.value = null;

    if (loadingTimeout.value) {
      clearTimeout(loadingTimeout.value);
      loadingTimeout.value = null;
    }
  };

  // Cleanup function for onUnmounted
  const cleanup = () => {
    if (loadingTimeout.value) {
      clearTimeout(loadingTimeout.value);
      loadingTimeout.value = null;
    }
  };

  return {
    // State
    loading,
    error,
    component,
    tool,
    gameData,

    // Computed
    isLoading,
    hasError,
    hasComponent,
    hasTool,

    // Actions
    loadGameTool,
    retry,
    reset,
    cleanup,

    initialized,
  };
}
