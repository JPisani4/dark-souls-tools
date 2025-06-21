<template>
  <div>
    <div class="flex items-center justify-center gap-x-4">
      <!-- Pagination Controls -->
      <!-- Previous Button -->
      <div>
        <UButton
          :disabled="currentPage <= 1"
          size="sm"
          variant="outline"
          @click="goToPage(currentPage - 1)"
          class="flex items-center gap-1"
        >
          <UIcon name="i-heroicons-chevron-left" class="w-4 h-4" />
          Previous
        </UButton>
      </div>

      <!-- Page Numbers -->
      <div class="flex items-center gap-1">
        <template v-for="page in visiblePages" :key="page">
          <UButton
            v-if="page !== '...'"
            :variant="page === currentPage ? 'solid' : 'outline'"
            size="sm"
            @click="goToPage(page)"
            class="min-w-[2.5rem]"
          >
            {{ page }}
          </UButton>
          <span v-else class="px-2 text-gray-500">...</span>
        </template>
      </div>

      <!-- Next Button -->
      <div>
        <UButton
          :disabled="currentPage >= totalPages"
          size="sm"
          variant="outline"
          @click="goToPage(currentPage + 1)"
          class="flex items-center gap-1"
        >
          Next
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
        </UButton>
      </div>
    </div>
    <div class="flex justify-center mt-2">
      <span class="text-sm text-gray-700 dark:text-gray-300">
        Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  maxVisiblePages?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5,
});

const emit = defineEmits<{
  "update:currentPage": [page: number];
}>();

const startItem = computed(() => {
  return (props.currentPage - 1) * props.pageSize + 1;
});

const endItem = computed(() => {
  return Math.min(props.currentPage * props.pageSize, props.totalItems);
});

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const maxVisible = props.maxVisiblePages;
  const total = props.totalPages;
  const current = props.currentPage;

  if (total <= maxVisible) {
    // Show all pages if total is less than max visible
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (current > 3) {
      pages.push("...");
    }

    // Show pages around current page
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== total) {
        pages.push(i);
      }
    }

    if (current < total - 2) {
      pages.push("...");
    }

    // Always show last page
    if (total > 1) {
      pages.push(total);
    }
  }

  return pages;
});

const goToPage = (page: number | string) => {
  const pageNum = typeof page === "string" ? parseInt(page, 10) : page;
  if (
    pageNum >= 1 &&
    pageNum <= props.totalPages &&
    pageNum !== props.currentPage
  ) {
    emit("update:currentPage", pageNum);
  }
};
</script>
