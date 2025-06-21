import { ref, computed, watch, onUnmounted } from "vue";
import type { Tool } from "~/types/tools/tool";

export interface ToolLoadingState {
  loading: boolean;
  error: Error | null;
  component: any;
  tool: Tool | null;
}

export function useToolLoader() {
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const component = ref<any>(null);
  const tool = ref<Tool | null>(null);
  const loadingTimeout = ref<NodeJS.Timeout | null>(null);
  const initialized = ref(false);

  // Computed states for easy template usage
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);
  const hasComponent = computed(() => component.value !== null);
  const hasTool = computed(() => tool.value !== null);

  // Load tool by slug
  const loadToolBySlug = async (slug: string, tools: Tool[]) => {
    error.value = null;
    loading.value = true;
    initialized.value = false;
    const foundTool = tools.find((t) => t.slug === slug.toLowerCase());

    if (!foundTool) {
      error.value = new Error(`Tool not found: ${slug}`);
      tool.value = null;
      loading.value = false;
      initialized.value = true;
      return;
    }

    await loadTool(foundTool);
    initialized.value = true;
  };

  // Load specific tool
  const loadTool = async (targetTool: Tool) => {
    loading.value = true;
    error.value = null;
    tool.value = targetTool;

    try {
      // Set a timeout for loading (10 seconds)
      const timeoutPromise = new Promise((_, reject) => {
        loadingTimeout.value = setTimeout(() => {
          reject(new Error("Loading timeout - tool took too long to load"));
        }, 10000);
      });

      // Load the component
      const loadPromise = targetTool.loadComponent();

      const mod: any = await Promise.race([loadPromise, timeoutPromise]);

      if (loadingTimeout.value) {
        clearTimeout(loadingTimeout.value);
        loadingTimeout.value = null;
      }

      component.value = mod.default;
      loading.value = false;
    } catch (err) {
      if (loadingTimeout.value) {
        clearTimeout(loadingTimeout.value);
        loadingTimeout.value = null;
      }

      error.value = err instanceof Error ? err : new Error(String(err));
      loading.value = false;

      // Log error in development
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to load tool:", err);
      }
    }
  };

  // Retry loading
  const retry = async () => {
    if (tool.value) {
      component.value = null;
      await loadTool(tool.value);
    }
  };

  // Reset state
  const reset = () => {
    loading.value = false;
    error.value = null;
    component.value = null;
    tool.value = null;

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

    // Computed
    isLoading,
    hasError,
    hasComponent,
    hasTool,

    // Actions
    loadToolBySlug,
    loadTool,
    retry,
    reset,
    cleanup,

    initialized,
  };
}
