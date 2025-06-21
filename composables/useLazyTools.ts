import { ref, computed } from "vue";
import type { Tool } from "~/types/tools/tool";

// Cache for loaded tool metadata
const toolMetadataCache = new Map<string, Tool>();

export function useLazyTools() {
  const tools = ref<Tool[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  // Load tool metadata on demand
  const loadToolMetadata = async (slug: string, gameId: string) => {
    const cacheKey = `${slug}-${gameId}`;

    if (toolMetadataCache.has(cacheKey)) {
      return toolMetadataCache.get(cacheKey)!;
    }

    try {
      const toolConfig = await import(
        /* webpackChunkName: "tool-metadata-[request]" */
        `~/components/Tools/${slug}/GameComponents/${gameId}/tool.config.ts`
      );

      const config = toolConfig.config || toolConfig.default;

      const tool: Tool = {
        title:
          config.title ||
          slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        description: config.description || `${slug} for ${gameId}`,
        slug,
        icon: config.icon || "",
        category: config.category || "calculator",
        tags: config.tags || [gameId, slug],
        order: config.order || 1,
        loadComponent: () =>
          import(
            /* webpackChunkName: "tool-[request]" */
            `~/components/Tools/${slug}/GameComponents/${gameId}/index.vue`
          ),
        createdAt: new Date(),
        gameCategories: [gameId as any],
      };

      toolMetadataCache.set(cacheKey, tool);
      return tool;
    } catch (err) {
      console.error(`Failed to load tool metadata for ${slug}/${gameId}:`, err);
      throw err;
    }
  };

  // Load all tools for a specific game
  const loadGameTools = async (gameId: string) => {
    loading.value = true;
    error.value = null;

    try {
      // This would be dynamically discovered based on file system
      // For now, we'll use a simple approach
      const toolSlugs = ["soul-level-calculator", "weapon-upgrade-calculator"];

      const toolPromises = toolSlugs.map((slug) =>
        loadToolMetadata(slug, gameId)
      );
      const loadedTools = await Promise.all(toolPromises);

      tools.value = loadedTools.sort(
        (a, b) => (a.order || 999) - (b.order || 999)
      );
      loading.value = false;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      loading.value = false;
    }
  };

  // Get all available tools (for backward compatibility)
  const getAllTools = computed(() => tools.value);

  // Clear cache
  const clearCache = () => {
    toolMetadataCache.clear();
    tools.value = [];
  };

  return {
    tools: getAllTools,
    loading,
    error,
    loadGameTools,
    loadToolMetadata,
    clearCache,
  };
}
