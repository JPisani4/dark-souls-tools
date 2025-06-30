<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Armor Selection
      </h3>
      <UButton
        size="sm"
        variant="solid"
        color="success"
        @click="clearArmor"
        class="font-medium shadow-sm hover:shadow-md transition-shadow"
      >
        <Icon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
        Clear Armor
      </UButton>
    </div>

    <!-- Armor Set Selection -->
    <div class="space-y-4">
      <SelectField
        label="Armor Set"
        id="armor-set"
        :model-value="selectedArmorSet"
        :options="armorSetOptions"
        placeholder="Select an armor set (optional)"
        @update:model-value="onArmorSetChange"
      />
    </div>

    <!-- Individual Armor Slots -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Head -->
      <div class="space-y-2">
        <SelectField
          label="Head"
          id="armor-head"
          :model-value="selectedArmor.head?.name"
          :options="headArmorOptions"
          placeholder="Select head armor"
          @update:model-value="(value) => selectArmor('head', value)"
        />
        <div
          v-if="selectedArmor.head"
          class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-medium text-gray-900 dark:text-white truncate"
              >
                {{ selectedArmor.head.name }}
              </p>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {{ selectedArmor.head.weight }} weight
              </p>
              <div
                v-if="
                  selectedArmor.head.effect?.special ||
                  selectedArmor.head.effect?.description ||
                  selectedArmor.head.effect?.equipLoadBonus ||
                  selectedArmor.head.effect?.staminaRegenBonus ||
                  selectedArmor.head.effect?.poise ||
                  selectedArmor.head.special
                "
                class="text-xs text-blue-600 dark:text-blue-400 mt-1 space-y-1"
              >
                <p v-if="selectedArmor.head.effect?.description">
                  {{ selectedArmor.head.effect.description }}
                </p>
                <p
                  v-else-if="
                    selectedArmor.head.special &&
                    getSpecialArmorEffectDescription(selectedArmor.head.name)
                  "
                >
                  {{
                    getSpecialArmorEffectDescription(selectedArmor.head.name)
                  }}
                </p>
                <p v-if="selectedArmor.head.effect?.equipLoadBonus">
                  +{{ selectedArmor.head.effect.equipLoadBonus }}% Equip Load
                </p>
                <p v-if="selectedArmor.head.effect?.staminaRegenBonus">
                  +{{ selectedArmor.head.effect.staminaRegenBonus }} Stamina
                  Regen
                </p>
                <p v-if="selectedArmor.head.effect?.poise">
                  +{{ selectedArmor.head.effect.poise }} Poise
                </p>
                <p
                  v-if="
                    selectedArmor.head.effect?.special &&
                    !selectedArmor.head.effect?.description
                  "
                >
                  {{ selectedArmor.head.effect.special }}
                </p>
              </div>
            </div>
            <UButton
              size="sm"
              variant="ghost"
              color="error"
              @click="removeArmor('head')"
              class="text-red-600 hover:text-red-700 ml-2 flex-shrink-0"
            >
              <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>

      <!-- Chest -->
      <div class="space-y-2">
        <SelectField
          label="Chest"
          id="armor-chest"
          :model-value="selectedArmor.chest?.name"
          :options="chestArmorOptions"
          placeholder="Select chest armor"
          @update:model-value="(value) => selectArmor('chest', value)"
        />
        <div
          v-if="selectedArmor.chest"
          class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-medium text-gray-900 dark:text-white truncate"
              >
                {{ selectedArmor.chest.name }}
              </p>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {{ selectedArmor.chest.weight }} weight
              </p>
              <div
                v-if="
                  selectedArmor.chest.effect?.special ||
                  selectedArmor.chest.effect?.description ||
                  selectedArmor.chest.effect?.equipLoadBonus ||
                  selectedArmor.chest.effect?.staminaRegenBonus ||
                  selectedArmor.chest.effect?.poise ||
                  selectedArmor.chest.special
                "
                class="text-xs text-blue-600 dark:text-blue-400 mt-1 space-y-1"
              >
                <p v-if="selectedArmor.chest.effect?.description">
                  {{ selectedArmor.chest.effect.description }}
                </p>
                <p
                  v-else-if="
                    selectedArmor.chest.special &&
                    getSpecialArmorEffectDescription(selectedArmor.chest.name)
                  "
                >
                  {{
                    getSpecialArmorEffectDescription(selectedArmor.chest.name)
                  }}
                </p>
                <p v-if="selectedArmor.chest.effect?.equipLoadBonus">
                  +{{ selectedArmor.chest.effect.equipLoadBonus }}% Equip Load
                </p>
                <p v-if="selectedArmor.chest.effect?.staminaRegenBonus">
                  +{{ selectedArmor.chest.effect.staminaRegenBonus }} Stamina
                  Regen
                </p>
                <p v-if="selectedArmor.chest.effect?.poise">
                  +{{ selectedArmor.chest.effect.poise }} Poise
                </p>
                <p
                  v-if="
                    selectedArmor.chest.effect?.special &&
                    !selectedArmor.chest.effect?.description
                  "
                >
                  {{ selectedArmor.chest.effect.special }}
                </p>
              </div>
            </div>
            <UButton
              size="sm"
              variant="ghost"
              color="error"
              @click="removeArmor('chest')"
              class="text-red-600 hover:text-red-700 ml-2 flex-shrink-0"
            >
              <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>

      <!-- Hands -->
      <div class="space-y-2">
        <SelectField
          label="Hands"
          id="armor-hands"
          :model-value="selectedArmor.hands?.name"
          :options="handsArmorOptions"
          placeholder="Select hand armor"
          @update:model-value="(value) => selectArmor('hands', value)"
        />
        <div
          v-if="selectedArmor.hands"
          class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-medium text-gray-900 dark:text-white truncate"
              >
                {{ selectedArmor.hands.name }}
              </p>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {{ selectedArmor.hands.weight }} weight
              </p>
              <div
                v-if="
                  selectedArmor.hands.effect?.special ||
                  selectedArmor.hands.effect?.description ||
                  selectedArmor.hands.effect?.equipLoadBonus ||
                  selectedArmor.hands.effect?.staminaRegenBonus ||
                  selectedArmor.hands.effect?.poise ||
                  selectedArmor.hands.special
                "
                class="text-xs text-blue-600 dark:text-blue-400 mt-1 space-y-1"
              >
                <p v-if="selectedArmor.hands.effect?.description">
                  {{ selectedArmor.hands.effect.description }}
                </p>
                <p
                  v-else-if="
                    selectedArmor.hands.special &&
                    getSpecialArmorEffectDescription(selectedArmor.hands.name)
                  "
                >
                  {{
                    getSpecialArmorEffectDescription(selectedArmor.hands.name)
                  }}
                </p>
                <p v-if="selectedArmor.hands.effect?.equipLoadBonus">
                  +{{ selectedArmor.hands.effect.equipLoadBonus }}% Equip Load
                </p>
                <p v-if="selectedArmor.hands.effect?.staminaRegenBonus">
                  +{{ selectedArmor.hands.effect.staminaRegenBonus }} Stamina
                  Regen
                </p>
                <p v-if="selectedArmor.hands.effect?.poise">
                  +{{ selectedArmor.hands.effect.poise }} Poise
                </p>
                <p
                  v-if="
                    selectedArmor.hands.effect?.special &&
                    !selectedArmor.hands.effect?.description
                  "
                >
                  {{ selectedArmor.hands.effect.special }}
                </p>
              </div>
            </div>
            <UButton
              size="sm"
              variant="ghost"
              color="error"
              @click="removeArmor('hands')"
              class="text-red-600 hover:text-red-700 ml-2 flex-shrink-0"
            >
              <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>

      <!-- Legs -->
      <div class="space-y-2">
        <SelectField
          label="Legs"
          id="armor-legs"
          :model-value="selectedArmor.legs?.name"
          :options="legsArmorOptions"
          placeholder="Select leg armor"
          @update:model-value="(value) => selectArmor('legs', value)"
        />
        <div
          v-if="selectedArmor.legs"
          class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-medium text-gray-900 dark:text-white truncate"
              >
                {{ selectedArmor.legs.name }}
              </p>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {{ selectedArmor.legs.weight }} weight
              </p>
              <div
                v-if="
                  selectedArmor.legs.effect?.special ||
                  selectedArmor.legs.effect?.description ||
                  selectedArmor.legs.effect?.equipLoadBonus ||
                  selectedArmor.legs.effect?.staminaRegenBonus ||
                  selectedArmor.legs.effect?.poise ||
                  selectedArmor.legs.special
                "
                class="text-xs text-blue-600 dark:text-blue-400 mt-1 space-y-1"
              >
                <p v-if="selectedArmor.legs.effect?.description">
                  {{ selectedArmor.legs.effect.description }}
                </p>
                <p
                  v-else-if="
                    selectedArmor.legs.special &&
                    getSpecialArmorEffectDescription(selectedArmor.legs.name)
                  "
                >
                  {{
                    getSpecialArmorEffectDescription(selectedArmor.legs.name)
                  }}
                </p>
                <p v-if="selectedArmor.legs.effect?.equipLoadBonus">
                  +{{ selectedArmor.legs.effect.equipLoadBonus }}% Equip Load
                </p>
                <p v-if="selectedArmor.legs.effect?.staminaRegenBonus">
                  +{{ selectedArmor.legs.effect.staminaRegenBonus }} Stamina
                  Regen
                </p>
                <p v-if="selectedArmor.legs.effect?.poise">
                  +{{ selectedArmor.legs.effect.poise }} Poise
                </p>
                <p
                  v-if="
                    selectedArmor.legs.effect?.special &&
                    !selectedArmor.legs.effect?.description
                  "
                >
                  {{ selectedArmor.legs.effect.special }}
                </p>
              </div>
            </div>
            <UButton
              size="sm"
              variant="ghost"
              color="error"
              @click="removeArmor('legs')"
              class="text-red-600 hover:text-red-700 ml-2 flex-shrink-0"
            >
              <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Total Weight Display -->
    <div
      v-if="totalWeight > 0"
      class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4"
    >
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm font-medium text-blue-700 dark:text-blue-300">
          Total Armor Weight
        </span>
        <span class="text-lg font-bold text-blue-900 dark:text-blue-100">
          {{ totalWeight }}
        </span>
      </div>

      <!-- Total Poise Display -->
      <div v-if="totalPoise > 0" class="flex items-center justify-between mb-3">
        <span class="text-sm font-medium text-blue-700 dark:text-blue-300">
          Total Poise
        </span>
        <span class="text-lg font-bold text-blue-900 dark:text-blue-100">
          {{ totalPoise }}
        </span>
      </div>

      <!-- Armor Effects Display -->
      <div
        v-if="hasAnyArmor"
        class="border-t border-blue-200 dark:border-blue-800 pt-3"
      >
        <h4 class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
          Armor Effects
        </h4>
        <div class="space-y-1">
          <template v-if="dedupedArmorEffects.length > 0">
            <p
              v-for="effect in dedupedArmorEffects"
              :key="effect"
              class="text-xs text-blue-600 dark:text-blue-400"
            >
              {{ effect }}
            </p>
          </template>
          <p v-else class="text-xs text-blue-400 dark:text-blue-500 italic">
            No special effects from equipped armor.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Armor } from "~/types/game/ds1/armor";
import type { ArmorSet } from "~/types/game/ds1/armor";
import type { Weapon } from "~/types/game/ds1/weapons";
import type { Shield } from "~/types/game/ds1/shields";
import type { Sorcery } from "~/types/game/ds1/sorceries";
import type { Miracle } from "~/types/game/ds1/miracles";
import type { Ring } from "~/types/game/ds1/rings";
import SelectField from "~/components/Tools/Common/forms/SelectField.vue";
import Icon from "~/components/Common/Icon.vue";
import { getAllArmorSets } from "~/utils/games/ds1/armor/armor-sets";

interface Props {
  selectedArmor: {
    head?: Armor;
    chest?: Armor;
    hands?: Armor;
    legs?: Armor;
  };
  armorOptions: Array<{
    value: string;
    label: string;
    category: string;
    item: Armor;
  }>;
  resetTrigger?: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  updateArmor: [
    armor: { head?: Armor; chest?: Armor; hands?: Armor; legs?: Armor },
  ];
  clearArmor: [];
}>();

// Get all armor sets
const allArmorSets = getAllArmorSets();

// Helper function to create categorized options
const createCategorizedOptions = (
  slot: "head" | "chest" | "hands" | "legs"
) => {
  const slotOptions = props.armorOptions.filter(
    (option) => option.item.slot === slot
  );

  // Group by category
  const grouped: Record<string, typeof slotOptions> = {};
  slotOptions.forEach((option) => {
    if (!grouped[option.category]) {
      grouped[option.category] = [];
    }
    grouped[option.category].push(option);
  });

  // Create options with category headers
  const options: Array<{ value: string; label: string; disabled?: boolean }> =
    [];

  // Add category headers and items
  Object.entries(grouped).forEach(([category, categoryOptions]) => {
    // Add category header (disabled/unselectable)
    options.push({
      value: `category-${category}`,
      label: `--- ${formatCategoryName(category)} ---`,
      disabled: true,
    });

    // Add items in this category (without category text)
    categoryOptions.forEach((option) => {
      options.push({
        value: option.value,
        label: option.item.name,
      });
    });
  });

  return options;
};

// Format category name for display
const formatCategoryName = (category: string) => {
  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .trim();
};

// Computed properties for armor options by slot with categories
const headArmorOptions = computed(() => createCategorizedOptions("head"));
const chestArmorOptions = computed(() => createCategorizedOptions("chest"));
const handsArmorOptions = computed(() => createCategorizedOptions("hands"));
const legsArmorOptions = computed(() => createCategorizedOptions("legs"));

// Armor set options
const armorSetOptions = computed(() => {
  const sets = Object.values(allArmorSets).flat();

  // Group by category
  const grouped: Record<string, typeof sets> = {};
  sets.forEach((set) => {
    if (!grouped[set.armorType]) {
      grouped[set.armorType] = [];
    }
    grouped[set.armorType].push(set);
  });

  // Create options with category headers
  const options: Array<{ value: string; label: string; disabled?: boolean }> =
    [];

  // Add category headers and items
  Object.entries(grouped).forEach(([category, categorySets]) => {
    // Add category header (disabled/unselectable)
    options.push({
      value: `category-${category}`,
      label: `--- ${formatCategoryName(category)} ---`,
      disabled: true,
    });

    // Add items in this category
    categorySets.forEach((set) => {
      options.push({
        value: set.id,
        label: set.name,
      });
    });
  });

  return options;
});

// Selected armor set
const selectedArmorSet = ref<string | undefined>();

// Watch for reset trigger to clear armor set selection
watch(
  () => props.resetTrigger,
  (newValue) => {
    if (newValue !== undefined) {
      selectedArmorSet.value = undefined;
    }
  }
);

// Watch for changes in selected armor and clear armor set if all armor is removed
watch(
  () => props.selectedArmor,
  (newArmor) => {
    const hasAnyArmor =
      newArmor.head || newArmor.chest || newArmor.hands || newArmor.legs;
    if (!hasAnyArmor) {
      selectedArmorSet.value = undefined;
    }
  },
  { deep: true }
);

// Total weight calculation
const totalWeight = computed(() => {
  return Object.values(props.selectedArmor).reduce((total, armor) => {
    return total + (armor?.weight || 0);
  }, 0);
});

// Total poise calculation
const totalPoise = computed(() => {
  return Object.values(props.selectedArmor).reduce((total, armor) => {
    return total + (armor?.effect?.poise || 0);
  }, 0);
});

// Add a computed to check if any armor is equipped
const hasAnyArmor = computed(() => {
  return !!(
    props.selectedArmor.head ||
    props.selectedArmor.chest ||
    props.selectedArmor.hands ||
    props.selectedArmor.legs
  );
});

// Enhanced: Collect all armor effects, deduplicate, and include all effect types (except poise)
const dedupedArmorEffects = computed(() => {
  const effects: string[] = [];
  Object.values(props.selectedArmor).forEach((armor) => {
    if (!armor) return;
    // Description
    if (armor.effect?.description) {
      effects.push(`${armor.name}: ${armor.effect.description}`);
    }
    // Special effect mapping
    else if (armor.special && getSpecialArmorEffectDescription(armor.name)) {
      effects.push(
        `${armor.name}: ${getSpecialArmorEffectDescription(armor.name)}`
      );
    }
    // Special field
    else if (armor.effect?.special && !armor.effect?.description) {
      effects.push(`${armor.name}: ${armor.effect.special}`);
    }
    // Equip Load Bonus
    if (armor.effect?.equipLoadBonus) {
      effects.push(
        `${armor.name}: +${armor.effect.equipLoadBonus}% Equip Load`
      );
    }
    // Stamina Regen Bonus
    if (armor.effect?.staminaRegenBonus) {
      effects.push(
        `${armor.name}: +${armor.effect.staminaRegenBonus} Stamina Regen`
      );
    }
    // Do NOT include poise in the summary effects
  });
  // Deduplicate
  return [...new Set(effects)];
});

// Special effect mapping for armor pieces
const getSpecialArmorEffectDescription = (armorName: string): string => {
  const effectMap: Record<string, string> = {
    "Crown of Dusk": "Increases magic damage by 20%",
    "Crown of the Dark Sun": "Increases magic damage by 20%",
    "Moonlight Helm": "Increases magic damage by 20%",
    "Symbol of Avarice":
      "Increases Item Discovery by 200. Increases Souls received by 20%. Depletes 5 HP per second.",
    "Sunlight Maggot": "Acts as a light source",
    "Egg Head": "Consumes half of your acquired souls",
    "Mask of the Father": "Increases equip load by 5%",
    "Mask of the Mother": "Increases maximum HP by 10%",
    "Mask of the Child":
      "Increases stamina regeneration by 10 points per second",
  };
  return effectMap[armorName] || "";
};

// Functions
const selectArmor = (
  slot: "head" | "chest" | "hands" | "legs",
  armorName: string
) => {
  // Ignore category headers
  if (armorName.startsWith("category-")) {
    return;
  }

  const armor = props.armorOptions.find(
    (option) => option.value === armorName
  )?.item;
  if (armor) {
    const updatedArmor = { ...props.selectedArmor, [slot]: armor };
    emit("updateArmor", updatedArmor);
  }
};

const removeArmor = (slot: "head" | "chest" | "hands" | "legs") => {
  const updatedArmor = { ...props.selectedArmor };
  delete updatedArmor[slot];
  emit("updateArmor", updatedArmor);
};

const onArmorSetChange = (setId: string) => {
  // Ignore category headers
  if (setId.startsWith("category-")) {
    return;
  }

  selectedArmorSet.value = setId;
  const armorSet = Object.values(allArmorSets)
    .flat()
    .find((set) => set.id === setId);
  if (armorSet) {
    emit("updateArmor", armorSet.pieces);
  }
};

const clearArmor = () => {
  selectedArmorSet.value = undefined;
  emit("clearArmor");
};
</script>
