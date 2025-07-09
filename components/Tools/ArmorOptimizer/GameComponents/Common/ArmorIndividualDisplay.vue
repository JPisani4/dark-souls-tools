<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";
import ArmorCard from "./ArmorCard.vue";
import ArmorPagination from "./ArmorPagination.vue";
import { useArmorDisplayTheme } from "~/composables/useArmorDisplayTheme";

interface Props {
  armor: any[];
  expandedSlots: string[];
  expandedCategories: Record<string, string[]>;
  selectedArmorForComparison: string[];
  currentPages: Record<string, number>;
  itemsPerPage: number;
  paginationEnabled: boolean;
  expandedArmor: string[];
  sortPrimary?: string;
  sortSecondary?: string;
  sortDescending?: boolean;
  onToggleSlotExpansion: (slot: string) => void;
  onToggleCategoryExpansion: (slot: string, category: string) => void;
  onToggleArmorComparison: (armorName: string) => void;
  onToggleArmorExpansion: (armorName: string) => void;
  onPageChange: (slot: string, category: string, page: number) => void;
  onPreviousPage: (slot: string, category: string) => void;
  onNextPage: (slot: string, category: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  sortPrimary: "poise",
  sortSecondary: "weight",
  sortDescending: false,
});

const { headerStyles } = useArmorDisplayTheme();

const armorCategories = [
  "light-armor",
  "medium-armor",
  "heavy-armor",
  "special-armor",
];

// Filter slots based on Mask of the Father
const availableSlots = computed(() => {
  const slots = ["head", "chest", "hands", "legs"];
  return slots;
});

// Get slots that have items
const slotsWithItems = computed(() => {
  return availableSlots.value.filter((slot) => getTotalItemsForSlot(slot) > 0);
});

// Computed properties for armor organization
const armorBySlot = computed(() => {
  const slots = ["head", "chest", "hands", "legs"];
  const result: Record<string, any[]> = {};

  slots.forEach((slot) => {
    let items = (props.armor || []).filter((armor: any) => armor.slot === slot);
    // Safeguard: sort by _customScore if primary sort is 'custom' and present
    if (
      props.sortPrimary === "custom" &&
      items.length &&
      items[0]._customScore !== undefined
    ) {
      items = [...items].sort((a, b) =>
        props.sortDescending
          ? b._customScore - a._customScore
          : a._customScore - b._customScore
      );
    }
    result[slot] = items;
  });

  return result;
});

// Helper functions
const getPaginationKey = (slot: string, category: string): string => {
  return `${slot}-${category}`;
};

const getPaginatedArmor = (slot: string, category: string): any[] => {
  if (!props.paginationEnabled) {
    return (
      (armorBySlot.value[slot] as any[])?.filter(
        (a: any) => a.armorType === category
      ) || []
    );
  }

  const allArmor =
    (armorBySlot.value[slot] as any[])?.filter(
      (a: any) => a.armorType === category
    ) || [];

  const paginationKey = getPaginationKey(slot, category);
  const currentPage = props.currentPages[paginationKey] || 1;
  const startIndex = (currentPage - 1) * props.itemsPerPage;
  const endIndex = startIndex + props.itemsPerPage;

  return allArmor.slice(startIndex, endIndex);
};

const getTotalItems = (slot: string, category: string): number => {
  return (
    (armorBySlot.value[slot] as any[])?.filter(
      (a: any) => a.armorType === category
    )?.length || 0
  );
};

const getTotalItemsForSlot = (slot: string): number => {
  return (armorBySlot.value[slot] as any[])?.length || 0;
};

const getTotalPages = (slot: string, category: string): number => {
  if (!props.paginationEnabled) return 1;

  const allArmor =
    (armorBySlot.value[slot] as any[])?.filter(
      (a: any) => a.armorType === category
    ) || [];

  return Math.ceil(allArmor.length / props.itemsPerPage);
};

const getCurrentPage = (slot: string, category: string): number => {
  const paginationKey = getPaginationKey(slot, category);
  return props.currentPages[paginationKey] || 1;
};

const hasNextPage = (slot: string, category: string): boolean => {
  return getCurrentPage(slot, category) < getTotalPages(slot, category);
};

const hasPreviousPage = (slot: string, category: string): boolean => {
  return getCurrentPage(slot, category) > 1;
};

const isArmorExpanded = (armorName: string) => {
  return props.expandedArmor.includes(armorName);
};
</script>

<template>
  <div>
    <div v-for="slot in slotsWithItems" :key="slot" class="mb-8">
      <!-- Slot Collapsible -->
      <div
        class="rounded-lg shadow bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 cursor-pointer flex items-center px-4 py-3 mb-2 transition hover:shadow-md"
        @click="props.onToggleSlotExpansion(slot)"
      >
        <Icon
          :name="
            props.expandedSlots.includes(slot)
              ? 'i-heroicons-chevron-down'
              : 'i-heroicons-chevron-right'
          "
          class="w-5 h-5 text-gray-500 mr-2"
        />
        <h3
          class="text-lg font-semibold capitalize text-gray-900 dark:text-white flex-1"
        >
          {{ slot }}
        </h3>
        <span class="text-xs text-gray-500 dark:text-gray-400"
          >({{ getTotalItemsForSlot(slot) }} pieces)</span
        >
      </div>
      <div v-if="props.expandedSlots.includes(slot)" class="pl-2">
        <div v-for="category in armorCategories" :key="category" class="mb-4">
          <!-- Category Collapsible -->
          <div
            class="rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center px-3 py-2 mb-1 cursor-pointer transition hover:shadow"
            @click="props.onToggleCategoryExpansion(slot, category)"
          >
            <Icon
              :name="
                props.expandedCategories[slot]?.includes(category)
                  ? 'i-heroicons-chevron-down'
                  : 'i-heroicons-chevron-right'
              "
              class="w-4 h-4 text-gray-500 mr-2"
            />
            <span
              class="font-medium capitalize text-gray-800 dark:text-gray-200 flex-1"
              >{{ category.replace("-", " ") }}</span
            >
            <span class="ml-2 text-xs text-gray-500 dark:text-gray-400"
              >({{ getTotalItems(slot, category) }})</span
            >
          </div>
          <div
            v-if="props.expandedCategories[slot]?.includes(category)"
            class="pl-2"
          >
            <div class="flex flex-col gap-4">
              <ArmorCard
                v-for="armor in getPaginatedArmor(slot, category)"
                :key="armor.name"
                :armor="armor"
                :is-expanded="isArmorExpanded(armor.name)"
                :is-selected="
                  props.selectedArmorForComparison.includes(armor.name)
                "
                :sort-primary="props.sortPrimary"
                :sort-secondary="props.sortSecondary"
                show-checkbox
                @toggle-selection="props.onToggleArmorComparison(armor.name)"
                @toggle-expansion="props.onToggleArmorExpansion(armor.name)"
              >
                <template #staminaRegenPenalty>
                  {{ armor.staminaRegenReduction }}
                </template>
                <template #specialEffect>
                  {{ armor.effect }}
                </template>
              </ArmorCard>
            </div>
            <ArmorPagination
              v-if="
                props.paginationEnabled && getTotalPages(slot, category) > 1
              "
              :current-page="getCurrentPage(slot, category)"
              :total-pages="getTotalPages(slot, category)"
              :total-items="getTotalItems(slot, category)"
              :items-per-page="props.itemsPerPage"
              :has-previous="hasPreviousPage(slot, category)"
              :has-next="hasNextPage(slot, category)"
              @page-change="(page) => props.onPageChange(slot, category, page)"
              @previous="() => props.onPreviousPage(slot, category)"
              @next="() => props.onNextPage(slot, category)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
