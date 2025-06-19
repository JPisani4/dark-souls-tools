<template>
  <div
    v-if="totalPages > 1"
    class="flex justify-center items-center gap-2 select-text"
  >
    <!-- Previous button -->
    <button
      @click="handlePageChange(Math.max(1, currentPage - 1))"
      :disabled="currentPage === 1"
      class="pagination-button inline-flex items-center justify-center w-8 h-8 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors duration-150 select-text"
      type="button"
    >
      ←
    </button>

    <!-- Page numbers -->
    <template v-for="pageNum in visiblePages" :key="pageNum">
      <button
        v-if="pageNum !== '...'"
        @click="handlePageChange(Number(pageNum))"
        :class="[
          'pagination-button inline-flex items-center justify-center w-8 h-8 text-sm font-medium border rounded-md transition-colors duration-150 select-text',
          currentPage === pageNum
            ? 'bg-primary text-primary-foreground border-primary'
            : 'hover:bg-muted',
        ]"
        type="button"
      >
        {{ pageNum }}
      </button>
      <span
        v-else
        class="inline-flex items-center justify-center w-8 h-8 text-sm text-muted-foreground select-text"
      >
        ...
      </span>
    </template>

    <!-- Next button -->
    <button
      @click="handlePageChange(Math.min(totalPages, currentPage + 1))"
      :disabled="currentPage === totalPages"
      class="pagination-button inline-flex items-center justify-center w-8 h-8 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors duration-150 select-text"
      type="button"
    >
      →
    </button>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "CustomPagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:currentPage"],
  setup(props, { emit }) {
    const handlePageChange = (newPage: number) => {
      if (
        newPage >= 1 &&
        newPage <= props.totalPages &&
        newPage !== props.currentPage
      ) {
        emit("update:currentPage", newPage);
      }
    };

    const visiblePages = computed(() => {
      const pages: (number | string)[] = [];
      const current = props.currentPage;
      const total = props.totalPages;

      if (total <= 7) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // Show first page, last page, current page, and pages around current
        pages.push(1);

        if (current > 3) {
          pages.push("...");
        }

        for (
          let i = Math.max(2, current - 1);
          i <= Math.min(total - 1, current + 1);
          i++
        ) {
          if (!pages.includes(i)) {
            pages.push(i);
          }
        }

        if (current < total - 2) {
          pages.push("...");
        }

        if (total > 1) {
          pages.push(total);
        }
      }

      return pages;
    });

    return {
      visiblePages,
      handlePageChange,
    };
  },
});
</script>
