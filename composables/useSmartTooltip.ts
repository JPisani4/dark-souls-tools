import { ref, nextTick } from "vue";

export interface TooltipOptions {
  id: string;
  isMobile?: boolean;
  padding?: number;
}

export function useSmartTooltip() {
  const tooltipRefs = ref<Record<string, HTMLElement>>({});
  const tooltipStates = ref<Record<string, boolean>>({});

  const isMobile = () => {
    return window.innerWidth < 768; // md breakpoint
  };

  const toggleTooltip = (id: string) => {
    tooltipStates.value[id] = !tooltipStates.value[id];
    if (tooltipStates.value[id]) {
      nextTick(() => {
        positionTooltip(id);
      });
    }
  };

  const closeTooltip = (id: string) => {
    tooltipStates.value[id] = false;
    delete tooltipRefs.value[id];
  };

  const closeAllTooltips = () => {
    Object.keys(tooltipStates.value).forEach((key) => {
      tooltipStates.value[key] = false;
    });
    tooltipRefs.value = {};
  };

  const positionTooltip = (id: string) => {
    nextTick(() => {
      const tooltip = tooltipRefs.value[id];
      if (!tooltip) return;

      const mobile = isMobile();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const tooltipRect = tooltip.getBoundingClientRect();

      if (mobile) {
        // Mobile: Center on screen like a modal
        const left = Math.max(20, (viewportWidth - tooltipRect.width) / 2);
        const top = Math.max(20, (viewportHeight - tooltipRect.height) / 2);

        tooltip.style.position = "fixed";
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.style.transform = "none";
        tooltip.style.zIndex = "9999";
      } else {
        // Desktop: Position relative to trigger button
        const trigger = document.querySelector(
          `[data-tooltip-id="${id}"]`
        ) as HTMLElement;
        if (!trigger) return;

        const triggerRect = trigger.getBoundingClientRect();

        // Calculate position below the trigger, centered
        let left =
          triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        let top = triggerRect.bottom + 8; // 8px gap

        // Adjust horizontal position if tooltip goes off-screen
        if (left < 20) {
          left = 20; // Keep 20px from left edge
        } else if (left + tooltipRect.width > viewportWidth - 20) {
          left = viewportWidth - tooltipRect.width - 20; // Keep 20px from right edge
        }

        // If tooltip goes below viewport, position it above the trigger
        if (top + tooltipRect.height > viewportHeight - 20) {
          top = triggerRect.top - tooltipRect.height - 8;
        }

        tooltip.style.position = "fixed";
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.style.transform = "none";
        tooltip.style.zIndex = "9999";
      }
    });
  };

  const setTooltipRef = (id: string, element: HTMLElement | null) => {
    if (element) {
      tooltipRefs.value[id] = element;
    } else {
      delete tooltipRefs.value[id];
    }
  };

  return {
    tooltipStates,
    toggleTooltip,
    closeTooltip,
    closeAllTooltips,
    setTooltipRef,
    isMobile,
  };
}
