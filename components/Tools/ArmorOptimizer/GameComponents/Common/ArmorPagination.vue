<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";
import { useArmorDisplayTheme } from "~/composables/useArmorDisplayTheme";

interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const props = defineProps<Props>();

const { paginationStyles } = useArmorDisplayTheme();

const startItem = (props.currentPage - 1) * props.itemsPerPage + 1;
const endItem = Math.min(
  props.currentPage * props.itemsPerPage,
  props.totalItems
);

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  const start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(props.totalPages, start + maxVisible - 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-2 sm:gap-0"
  >
    <div
      class="order-2 sm:order-1 flex justify-center sm:justify-start text-sm text-gray-600 dark:text-gray-400"
    >
      <span>
        Showing {{ startItem }} - {{ endItem }} of {{ totalItems }} items
      </span>
    </div>

    <div class="order-1 sm:order-2 flex items-center justify-center gap-2">
      <!-- Previous Page Button -->
      <UButton
        :disabled="!hasPrevious"
        @click="onPrevious"
        variant="ghost"
        size="sm"
      >
        <Icon name="i-heroicons-chevron-left" class="w-4 h-4" />
      </UButton>

      <!-- Page Numbers -->
      <UButton
        v-for="page in visiblePages"
        :key="page"
        :variant="currentPage === page ? 'solid' : 'ghost'"
        size="sm"
        @click="onPageChange(page)"
      >
        {{ page }}
      </UButton>

      <!-- Next Page Button -->
      <UButton :disabled="!hasNext" @click="onNext" variant="ghost" size="sm">
        <Icon name="i-heroicons-chevron-right" class="w-4 h-4" />
      </UButton>
    </div>
  </div>
</template>
