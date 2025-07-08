<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";
import ArmorSetCard from "../Common/ArmorSetCard.vue";
import ArmorPagination from "./ArmorPagination.vue";
import { useArmorDisplayTheme } from "~/composables/useArmorDisplayTheme";

interface Props {
  armorSets: any[];
  expandedCategories: string[];
  selectedArmorSetsForComparison: string[];
  currentPages: Record<string, number>;
  itemsPerPage: number;
  paginationEnabled: boolean;
  expandedArmorSets: string[];
  sortPrimary?: string;
  sortSecondary?: string;
  maskOfTheFather?: boolean;
  sortDescending?: boolean;
  onToggleCategoryExpansion: (category: string) => void;
  onToggleArmorSetComparison: (armorSetName: string) => void;
  onToggleArmorSetExpansion: (armorSetName: string) => void;
  onPageChange: (category: string, page: number) => void;
  onPreviousPage: (category: string) => void;
  onNextPage: (category: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  sortPrimary: "poise",
  sortSecondary: "weight",
  maskOfTheFather: false,
  sortDescending: false,
});

const { headerStyles } = useArmorDisplayTheme();

const armorCategories = [
  "light-armor",
  "medium-armor",
  "heavy-armor",
  "special-armor",
];

// Get categories that have items
const categoriesWithItems = computed(() => {
  return armorCategories.filter(
    (category) => getTotalItemsForCategory(category) > 0
  );
});

// Computed properties for armor sets organization
const armorSetsByCategory = computed(() => {
  const result: Record<string, any[]> = {};

  armorCategories.forEach((category) => {
    let sets = (props.armorSets || []).filter(
      (set: any) => set.armorType === category
    );
    // Safeguard: sort by _customScore if primary sort is 'custom' and present
    if (
      props.sortPrimary === "custom" &&
      sets.length &&
      sets[0]._customScore !== undefined
    ) {
      sets = [...sets].sort((a, b) =>
        props.sortDescending
          ? b._customScore - a._customScore
          : a._customScore - b._customScore
      );
    }
    result[category] = sets;
  });

  return result;
});

// Helper functions
const getPaginationKey = (category: string): string => {
  return `sets-${category}`;
};

const getPaginatedArmorSets = (category: string): any[] => {
  if (!props.paginationEnabled) {
    return armorSetsByCategory.value[category] || [];
  }

  const allSets = armorSetsByCategory.value[category] || [];
  const paginationKey = getPaginationKey(category);
  const currentPage = props.currentPages[paginationKey] || 1;
  const startIndex = (currentPage - 1) * props.itemsPerPage;
  const endIndex = startIndex + props.itemsPerPage;

  return allSets.slice(startIndex, endIndex);
};

const getTotalItems = (category: string): number => {
  return armorSetsByCategory.value[category]?.length || 0;
};

const getTotalItemsForCategory = (category: string): number => {
  return armorSetsByCategory.value[category]?.length || 0;
};

const getTotalPages = (category: string): number => {
  if (!props.paginationEnabled) return 1;

  const allSets = armorSetsByCategory.value[category] || [];
  return Math.ceil(allSets.length / props.itemsPerPage);
};

const getCurrentPage = (category: string): number => {
  const paginationKey = getPaginationKey(category);
  return props.currentPages[paginationKey] || 1;
};

const hasNextPage = (category: string): boolean => {
  return getCurrentPage(category) < getTotalPages(category);
};

const hasPreviousPage = (category: string): boolean => {
  return getCurrentPage(category) > 1;
};

const isArmorSetExpanded = (armorSetName: string) => {
  return props.expandedArmorSets.includes(armorSetName);
};
</script>

<template>
  <div class="space-y-6">
    <!-- Armor Sets by Category -->
    <div
      v-for="category in categoriesWithItems"
      :key="category"
      class="space-y-4"
    >
      <!-- Category Header -->
      <div
        :class="headerStyles.category"
        @click="onToggleCategoryExpansion(category)"
      >
        <div class="flex items-center gap-3">
          <h3
            class="text-lg font-medium text-gray-900 dark:text-white capitalize"
          >
            {{ category.replace("-", " ") }} Sets
          </h3>
          <span class="text-sm text-gray-600 dark:text-gray-400">
            ({{ getTotalItemsForCategory(category) }} sets)
          </span>
        </div>
        <Icon
          :name="
            expandedCategories.includes(category)
              ? 'i-heroicons-chevron-up'
              : 'i-heroicons-chevron-down'
          "
          class="w-5 h-5 text-gray-500"
        />
      </div>

      <!-- Armor Set Cards -->
      <div v-if="expandedCategories.includes(category)" class="space-y-4">
        <ArmorSetCard
          v-for="armorSet in getPaginatedArmorSets(category)"
          :key="armorSet.id"
          :armor-set="armorSet"
          :is-expanded="isArmorSetExpanded(armorSet.name)"
          :is-selected="selectedArmorSetsForComparison.includes(armorSet.name)"
          :sort-primary="sortPrimary"
          :sort-secondary="sortSecondary"
          :mask-of-the-father="maskOfTheFather"
          @toggle-expansion="onToggleArmorSetExpansion(armorSet.name)"
          @toggle-selection="onToggleArmorSetComparison(armorSet.name)"
        />

        <!-- Pagination Controls -->
        <ArmorPagination
          v-if="paginationEnabled && getTotalItems(category) > itemsPerPage"
          :current-page="getCurrentPage(category)"
          :total-pages="getTotalPages(category)"
          :total-items="getTotalItems(category)"
          :items-per-page="itemsPerPage"
          :has-previous="hasPreviousPage(category)"
          :has-next="hasNextPage(category)"
          @page-change="(page) => onPageChange(category, page)"
          @previous="onPreviousPage(category)"
          @next="onNextPage(category)"
        />
      </div>
    </div>
  </div>
</template>
