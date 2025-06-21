import { ref, readonly, computed } from "vue";

// Global state for mobile sidebars
const isLeftSidebarOpen = ref(false);
const isRightSidebarOpen = ref(false);

export function useMobileSidebar(side: "left" | "right" = "left") {
  const isOpen = computed(() =>
    side === "left" ? isLeftSidebarOpen.value : isRightSidebarOpen.value
  );

  const toggleSidebar = () => {
    if (side === "left") {
      isLeftSidebarOpen.value = !isLeftSidebarOpen.value;
    } else {
      isRightSidebarOpen.value = !isRightSidebarOpen.value;
    }
  };

  const closeSidebar = () => {
    if (side === "left") {
      isLeftSidebarOpen.value = false;
    } else {
      isRightSidebarOpen.value = false;
    }
  };

  const openSidebar = () => {
    if (side === "left") {
      isLeftSidebarOpen.value = true;
    } else {
      isRightSidebarOpen.value = true;
    }
  };

  return {
    isMobileSidebarOpen: readonly(isOpen),
    toggleSidebar,
    closeSidebar,
    openSidebar,
  };
}
