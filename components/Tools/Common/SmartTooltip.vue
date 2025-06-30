<template>
  <div class="relative inline-block">
    <!-- Trigger -->
    <div @click.stop="toggle" @keydown.enter.stop.prevent="toggle" tabindex="0">
      <slot name="trigger" />
    </div>

    <!-- Popover Content -->
    <div
      v-if="isOpen"
      ref="popover"
      class="absolute z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 text-sm max-w-2xl whitespace-normal break-words"
      :class="
        isMobile
          ? 'fixed inset-4 m-auto max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] overflow-y-auto'
          : 'top-full left-0 mt-2 min-w-[280px] max-w-[calc(100vw-1rem)]'
      "
      :style="computedStyles"
      @click.stop
      @keydown.esc="close"
      tabindex="-1"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";

const isOpen = ref(false);
const popover = ref<HTMLElement | null>(null);
const trigger = ref<HTMLElement | null>(null);

const isMobile = computed(() => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
});

const computedStyles = computed(() => {
  if (isMobile.value) {
    return {};
  }

  // For desktop, ensure the tooltip doesn't overflow the viewport
  return {
    maxWidth: "calc(100vw - 2rem)",
    left: "0",
    right: "auto",
  };
});

function toggle() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      positionTooltip();
    });
  }
}

function close() {
  isOpen.value = false;
}

function positionTooltip() {
  if (!popover.value || isMobile.value) return;

  const rect = popover.value.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  // Check if tooltip would overflow right edge
  if (rect.right > viewportWidth - 16) {
    popover.value.style.left = "auto";
    popover.value.style.right = "0";
  }
}

function handleClickOutside(event: MouseEvent) {
  if (popover.value && !popover.value.contains(event.target as Node)) {
    close();
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === "Escape") close();
}

function handleResize() {
  if (isOpen.value) {
    nextTick(() => {
      positionTooltip();
    });
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleEscape);
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscape);
  window.removeEventListener("resize", handleResize);
});
</script>
