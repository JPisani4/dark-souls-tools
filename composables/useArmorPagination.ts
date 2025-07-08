import { ref } from "vue";

export function useArmorPagination(itemsPerPageDefault = 5) {
  // Current page per slot/category or set/category
  const currentPages = ref<Record<string, number>>({});
  // Items per page
  const itemsPerPage = ref(itemsPerPageDefault);
  // Pagination enabled
  const paginationEnabled = ref(true);

  // Helper to get pagination key
  function getPaginationKey(...args: string[]): string {
    return args.join("-");
  }

  // Get current page for a key
  function getCurrentPage(key: string): number {
    return currentPages.value[key] || 1;
  }

  // Set current page for a key
  function setCurrentPage(key: string, page: number) {
    currentPages.value[key] = page;
  }

  // Reset all pages to 1
  function resetAllPages() {
    Object.keys(currentPages.value).forEach((key) => {
      currentPages.value[key] = 1;
    });
  }

  return {
    currentPages,
    itemsPerPage,
    paginationEnabled,
    getPaginationKey,
    getCurrentPage,
    setCurrentPage,
    resetAllPages,
  };
}
