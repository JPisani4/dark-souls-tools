<template>
  <div class="space-y-4">
    <!-- Item Selection Dropdown -->
    <div class="w-full">
      <SelectField
        :id="id"
        :label="label"
        :placeholder="placeholder"
        :options="selectOptions"
        :model-value="selectedValue"
        :disabled="isMaxSelected || disabled"
        class="w-full"
        @update:model-value="handleSelection"
      />
    </div>

    <!-- Selected Items Display -->
    <div v-if="selectedItems.length > 0" class="space-y-2">
      <div
        v-for="(item, index) in selectedItems"
        :key="`${item.name}-${index}`"
        class="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
      >
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <p class="font-medium text-gray-900 dark:text-white">
              {{ item.name }}
            </p>
            <span
              class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
            >
              {{ getItemCategory(item) }}
            </span>
          </div>

          <!-- Stat Requirements -->
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span class="font-medium">Requirements:</span>
            {{ formatRequirements(item) }}
          </div>

          <!-- Additional Info for Spells -->
          <div
            v-if="isSpell(item)"
            class="text-xs text-gray-500 dark:text-gray-400"
          >
            {{ (item as Sorcery | Miracle).attunementSlots }} attunement slot{{
              (item as Sorcery | Miracle).attunementSlots !== 1 ? "s" : ""
            }}
          </div>

          <!-- Additional Info for Weapons/Shields -->
          <div
            v-else-if="hasAdditionalInfo(item)"
            class="text-xs text-gray-500 dark:text-gray-400"
          >
            {{ getAdditionalInfo(item) }}
          </div>
        </div>

        <UButton
          size="sm"
          variant="ghost"
          color="error"
          @click="$emit('remove', index)"
          class="text-red-600 hover:text-red-700 ml-2 flex-shrink-0"
        >
          <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
        </UButton>
      </div>
    </div>

    <!-- Attunement Slot Warning -->
    <div
      v-if="showAttunementWarning"
      class="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
    >
      <div class="flex items-start gap-2">
        <Icon
          name="i-heroicons-exclamation-triangle"
          class="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
        />
        <div class="text-sm flex-1">
          <p class="font-medium text-amber-800 dark:text-amber-200 mb-2">
            Insufficient Attunement Slots
          </p>
          <p class="text-amber-700 dark:text-amber-300 mb-3">
            You have {{ availableAttunementSlots }} attunement slot{{
              availableAttunementSlots !== 1 ? "s" : ""
            }}
            but need {{ requiredAttunementSlots }} for your selected spells.
          </p>
          <UButton
            size="sm"
            variant="solid"
            color="primary"
            @click="handleIncreaseAttunement"
            class="text-white"
          >
            <Icon name="i-heroicons-arrow-up" class="w-3 h-3 mr-1" />
            Increase Attunement to {{ requiredAttunementLevel }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Weapon } from "~/types/game/ds1/weapons";
import type { Shield } from "~/types/game/ds1/shields";
import type { Sorcery } from "~/types/game/ds1/sorceries";
import type { Miracle } from "~/types/game/ds1/miracles";
import SelectField from "../../../Common/forms/SelectField.vue";
import {
  getAttunementSlots,
  getAttunementLevelForSlots,
} from "~/utils/games/ds1/stats/attunementSlots";
import Icon from "~/components/Common/Icon.vue";

interface Props {
  id: string;
  label: string;
  placeholder: string;
  options: Array<{
    value: string;
    label: string;
    category: string;
    item: Weapon | Shield | Sorcery | Miracle;
  }>;
  selectedItems: (Weapon | Shield | Sorcery | Miracle)[];
  maxItems?: number;
  disabled?: boolean;
  currentAttunement?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxItems: 2,
  disabled: false,
  currentAttunement: 1,
});

const emit = defineEmits<{
  add: [item: Weapon | Shield | Sorcery | Miracle];
  remove: [index: number];
  increaseAttunement: [level: number];
}>();

const selectedValue = ref<string>("");

// Check if max items are selected
const isMaxSelected = computed(() => {
  return props.selectedItems.length >= props.maxItems;
});

// Check if an item is a spell (sorcery or miracle)
const isSpell = (item: Weapon | Shield | Sorcery | Miracle): boolean => {
  return "sorceryType" in item || "miracleType" in item;
};

// Calculate total attunement slots required by selected spells
const requiredAttunementSlots = computed(() => {
  return props.selectedItems.filter(isSpell).reduce((total, item) => {
    const spell = item as Sorcery | Miracle;
    return total + (spell.attunementSlots || 1);
  }, 0);
});

// Get available attunement slots
const availableAttunementSlots = computed(() => {
  return getAttunementSlots(props.currentAttunement);
});

// Check if attunement is limiting spell selection
const isAttunementLimited = computed(() => {
  return requiredAttunementSlots.value > availableAttunementSlots.value;
});

// Show attunement warning
const showAttunementWarning = computed(() => {
  return isAttunementLimited.value && props.selectedItems.some(isSpell);
});

// Get required attunement level for current spells
const requiredAttunementLevel = computed(() => {
  return getAttunementLevelForSlots(requiredAttunementSlots.value) || 1;
});

// Handle increasing attunement to required level
const handleIncreaseAttunement = () => {
  emit("increaseAttunement", requiredAttunementLevel.value);
};

// Check if an item is already selected
const isItemSelected = (itemName: string) => {
  return props.selectedItems.some((item) => item.name === itemName);
};

// Create select options with categorized structure
const selectOptions = computed(() => {
  const options: Array<{ value: string; label: string }> = [];

  // Group options by category
  const grouped: Record<string, typeof props.options> = {};

  props.options.forEach((option) => {
    if (!grouped[option.category]) {
      grouped[option.category] = [];
    }
    grouped[option.category].push(option);
  });

  // Add category headers and items
  Object.entries(grouped).forEach(([category, categoryOptions]) => {
    // Add category header
    options.push({
      value: `category-${category}`,
      label: `--- ${formatCategoryName(category)} ---`,
    });

    // Add items in this category
    categoryOptions.forEach((option) => {
      if (!isItemSelected(option.value)) {
        const itemLabel = `${option.item.name} (${formatRequirements(option.item)})`;

        // Add attunement slot info for spells
        const finalLabel = isSpell(option.item)
          ? `${itemLabel} - ${(option.item as Sorcery | Miracle).attunementSlots || 1} slot${((option.item as Sorcery | Miracle).attunementSlots || 1) !== 1 ? "s" : ""}`
          : itemLabel;

        options.push({
          value: option.value,
          label: finalLabel,
        });
      }
    });
  });

  return options;
});

// Handle item selection
const handleSelection = (value: string) => {
  if (
    value &&
    !value.startsWith("category-") &&
    !isMaxSelected.value &&
    !props.disabled
  ) {
    const option = props.options.find((opt) => opt.value === value);
    if (option) {
      emit("add", option.item);
      selectedValue.value = ""; // Reset selection
    }
  }
};

// Get item category for display
const getItemCategory = (item: Weapon | Shield | Sorcery | Miracle) => {
  const option = props.options.find((opt) => opt.item.name === item.name);
  const category = option?.category || "Unknown";
  return formatCategoryName(category);
};

// Format category name for display
const formatCategoryName = (category: string) => {
  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .trim();
};

// Format requirements for display
const formatRequirements = (item: Weapon | Shield | Sorcery | Miracle) => {
  const req = item.requirements;
  const requirements = [];

  // Handle different requirement types
  if ("strength" in req && req.strength > 0)
    requirements.push(`STR ${req.strength}`);
  if ("dexterity" in req && req.dexterity > 0)
    requirements.push(`DEX ${req.dexterity}`);
  if ("intelligence" in req && req.intelligence && req.intelligence > 0)
    requirements.push(`INT ${req.intelligence}`);
  if ("faith" in req && req.faith && req.faith > 0)
    requirements.push(`FTH ${req.faith}`);

  return requirements.length > 0 ? requirements.join(", ") : "No requirements";
};

// Check if an item has additional info
const hasAdditionalInfo = (
  item: Weapon | Shield | Sorcery | Miracle
): boolean => {
  // Removed additional info display for cleaner UI
  return false;
};

// Get additional info for an item
const getAdditionalInfo = (
  item: Weapon | Shield | Sorcery | Miracle
): string => {
  // Removed additional info display for cleaner UI
  return "";
};
</script>
