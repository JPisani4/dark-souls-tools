<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="modalRef"
      class="fixed inset-0 z-[9999] xl:hidden"
      @click="$emit('close')"
      @keydown="handleKeydown"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50"></div>

      <!-- Modal Content -->
      <div
        class="absolute top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-xl z-[10000]"
        @click.stop
      >
        <div class="flex flex-col h-full">
          <!-- Modal Header -->
          <div
            class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Filter Tools
            </h3>
            <button
              ref="closeButtonRef"
              @click="$emit('close')"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Close filter modal"
            >
              <UIcon
                name="i-heroicons-x-mark"
                class="w-5 h-5 text-gray-700 dark:text-gray-300"
              />
            </button>
          </div>

          <!-- Filter Content -->
          <div class="flex-1 overflow-y-auto">
            <ToolFilterSidebar
              :filters="filters"
              :available-games="availableGames"
              :available-categories="availableCategories"
              :is-mobile="true"
              @update:filters="$emit('update:filters', $event)"
              @clear="$emit('clear')"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, nextTick, onUnmounted } from "vue";
import ToolFilterSidebar from "./ToolFilterSidebar.vue";
import type { FilterState } from "~/composables/useToolFilters";

interface Props {
  isOpen: boolean;
  filters: FilterState;
  availableGames: Array<{ id: string; name: string }>;
  availableCategories: Array<{ id: string; name: string }>;
}

interface Emits {
  (e: "close"): void;
  (e: "update:filters", filters: FilterState): void;
  (e: "clear"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Focus management
const modalRef = ref<HTMLDivElement>();
const closeButtonRef = ref<HTMLButtonElement>();

// Focus trap
let focusTrapCleanup: (() => void) | null = null;

// Focus trap implementation
const setupFocusTrap = () => {
  if (!modalRef.value) return;

  const focusableElements = modalRef.value.querySelectorAll(
    'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  const handleTabKey = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  document.addEventListener("keydown", handleTabKey);

  return () => {
    document.removeEventListener("keydown", handleTabKey);
  };
};

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return;

  if (e.key === "Escape") {
    emit("close");
  }
};

// Watch for modal open/close to manage focus
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        // Focus the close button when modal opens
        closeButtonRef.value?.focus();

        // Setup focus trap
        const cleanup = setupFocusTrap();
        if (cleanup) {
          focusTrapCleanup = cleanup;
        }
      });
    } else {
      // Cleanup focus trap
      if (focusTrapCleanup) {
        focusTrapCleanup();
        focusTrapCleanup = null;
      }
    }
  }
);

onUnmounted(() => {
  if (focusTrapCleanup) {
    focusTrapCleanup();
  }
});
</script>
