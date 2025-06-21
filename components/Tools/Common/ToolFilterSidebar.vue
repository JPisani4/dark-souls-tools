<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { FilterState } from "~/composables/useToolFilters";

interface Props {
  filters: FilterState;
  availableGames: Array<{ id: string; name: string }>;
  availableCategories: Array<{ id: string; name: string }>;
  isMobile?: boolean;
}

interface Emits {
  (e: "update:filters", filters: FilterState): void;
  (e: "clear"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const localFilters = ref<FilterState>({ ...props.filters });
const searchText = ref("");
const isInitialized = ref(false);

// Debounced search
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
const debouncedSearch = (value: string) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    localFilters.value.search = value;
    emit("update:filters", { ...localFilters.value });
  }, 300);
};

// Initialize searchText from props on mount
onMounted(() => {
  searchText.value = props.filters.search || "";
  isInitialized.value = true;
});

// Watch searchText changes and trigger debounced search
watch(searchText, (newValue) => {
  if (isInitialized.value) {
    debouncedSearch(newValue);
  }
});

// Only update searchText from props if it's a significant change (like clearing all filters)
watch(
  () => props.filters.search,
  (newSearch) => {
    // Only update if the change is significant (empty string or very different)
    if (
      !isInitialized.value ||
      newSearch === "" ||
      Math.abs(newSearch.length - searchText.value.length) > 1
    ) {
      searchText.value = newSearch || "";
    }
  }
);

// Update other local filters when props change
watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value.game = newFilters.game;
    localFilters.value.category = newFilters.category;
    // Don't update search here to avoid conflicts
  },
  { deep: true }
);

// Handle filter changes
const updateFilter = (key: keyof FilterState, value: string) => {
  localFilters.value[key] = value;
  if (key === "search") {
    searchText.value = value;
    debouncedSearch(value);
  } else {
    emit("update:filters", { ...localFilters.value });
  }
};

// Clear all filters
const clearAll = () => {
  localFilters.value = {
    game: "all",
    category: "all",
    search: "",
  };
  searchText.value = "";
  emit("clear");
};

// Active filter count
const activeCount = computed(() => {
  let count = 0;
  if (localFilters.value.game !== "all") count++;
  if (localFilters.value.category !== "all") count++;
  if (localFilters.value.search) count++;
  return count;
});
</script>

<template>
  <div :class="['bg-white dark:bg-gray-800', isMobile ? 'w-full' : 'w-64']">
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Filter Tools
        </h3>
      </div>

      <!-- Search -->
      <div>
        <label
          for="search"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Search
        </label>
        <UInput
          id="search"
          v-model="searchText"
          placeholder="Search tools..."
          icon="i-heroicons-magnifying-glass"
          class="w-full"
        />
      </div>

      <!-- Game Filter -->
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Game
        </label>
        <div class="space-y-2">
          <UButton
            v-for="game in availableGames"
            :key="game.id"
            :variant="localFilters.game === game.id ? 'solid' : 'outline'"
            :color="localFilters.game === game.id ? 'primary' : 'neutral'"
            size="sm"
            @click="updateFilter('game', game.id)"
            class="w-full justify-start"
          >
            {{ game.name }}
          </UButton>
        </div>
      </div>

      <!-- Category Filter -->
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Category
        </label>
        <div class="space-y-2">
          <UButton
            v-for="category in availableCategories"
            :key="category.id"
            :variant="
              localFilters.category === category.id ? 'solid' : 'outline'
            "
            :color="
              localFilters.category === category.id ? 'primary' : 'neutral'
            "
            size="sm"
            @click="updateFilter('category', category.id)"
            class="w-full justify-start"
          >
            {{ category.name }}
          </UButton>
        </div>
      </div>

      <!-- Active Filters Summary with prominent clear button -->
      <div
        v-if="activeCount > 0"
        class="pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ activeCount }} filter{{ activeCount !== 1 ? "s" : "" }} active
          </span>
          <UButton
            @click="clearAll"
            color="error"
            variant="outline"
            size="sm"
            icon="i-heroicons-x-mark"
            class="font-medium"
          >
            Clear All
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
