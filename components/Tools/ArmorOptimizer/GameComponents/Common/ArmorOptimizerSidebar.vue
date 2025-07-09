<script setup lang="ts">
import { computed, ref } from "vue";
import { useSafeTheme } from "~/composables/useSafeTheme";
import {
  calculateStamina,
  calculateEquipLoad,
} from "~/utils/games/ds1/stats/characterStats";
import NumberField from "../../../Common/forms/NumberField.vue";
import Icon from "~/components/Common/Icon.vue";

interface Props {
  state: any;
  setState: (updates: any) => void;
  reset: () => void;
  theme?: any;
  variant?: string;
  characterStats?: any;
}

const props = defineProps<Props>();

// Provide default state if not provided
const defaultState = {
  endurance: "",
  armorUpgradeLevel: "0",
};

const safeState = computed(() => props.state || defaultState);
const safeSetState = props.setState || (() => {});
const safeReset = props.reset || (() => {});

const safeTheme = useSafeTheme(props.theme, props.variant);

// Use character stats from main component if available, otherwise fall back to local calculations
const characterStats = computed(() => {
  const stats = props.characterStats || {};
  return stats;
});

// Calculate statistics using character stats from main component
const enduranceLevel = computed(() => parseInt(safeState.value.endurance) || 0);
const maxStamina = computed(
  () =>
    characterStats.value.maxStamina || calculateStamina(enduranceLevel.value)
);
const currentEquipLoad = computed(
  () => characterStats.value.equippedWeight || 0
);
const maxEquipLoad = computed(
  () =>
    characterStats.value.equipLoad || calculateEquipLoad(enduranceLevel.value)
);
const equipLoadPercentage = computed(
  () => characterStats.value.equipLoadPercentage || 0
);
const staminaRegen = computed(() => characterStats.value.staminaRegen || 45);

// Reset function for character setup section only
const resetCharacterSetup = () => {
  safeSetState({
    endurance: "",
    armorUpgradeLevel: "0",
  });
};
</script>

<template>
  <UCard class="h-full">
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">Character Setup</h2>
        <UButton
          @click="resetCharacterSetup"
          color="success"
          variant="soft"
          size="sm"
          class="flex items-center gap-1"
        >
          <Icon name="i-heroicons-arrow-path" class="w-4 h-4" />
        </UButton>
      </div>
    </template>

    <div class="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      <!-- Quick Stats Bar - Always visible for quick reference -->
      <div
        class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-3 rounded-lg border border-blue-200 dark:border-gray-600"
      >
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="text-center">
            <div class="text-gray-600 dark:text-gray-400 text-xs">
              Equip Load
            </div>
            <div
              class="font-semibold text-lg"
              :class="
                equipLoadPercentage > 100
                  ? 'text-red-600'
                  : equipLoadPercentage > 80
                    ? 'text-yellow-600'
                    : 'text-green-600'
              "
            >
              {{ equipLoadPercentage.toFixed(1) }}%
            </div>
            <div class="text-xs text-gray-500">
              {{ currentEquipLoad.toFixed(1) }} / {{ maxEquipLoad.toFixed(1) }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-gray-600 dark:text-gray-400 text-xs">Stamina</div>
            <div class="font-semibold text-lg">{{ maxStamina }}</div>
            <div class="text-xs text-gray-500">{{ staminaRegen }}/sec</div>
          </div>
        </div>
      </div>

      <!-- Core Settings - Aligned horizontally -->
      <div class="space-y-3">
        <NumberField
          label="Endurance"
          id="endurance"
          :model-value="
            safeState.endurance ? parseInt(safeState.endurance) : undefined
          "
          placeholder="Enter endurance..."
          :min="1"
          :max="99"
          :theme="safeTheme"
          @update:model-value="
            (val) => safeSetState({ endurance: val?.toString() || '' })
          "
        />
        <NumberField
          label="Armor Upgrade"
          id="armorUpgradeLevel"
          :model-value="
            safeState.armorUpgradeLevel
              ? parseInt(safeState.armorUpgradeLevel)
              : undefined
          "
          placeholder="0"
          :min="0"
          :max="10"
          :theme="safeTheme"
          @update:model-value="
            (val) => safeSetState({ armorUpgradeLevel: val?.toString() || '' })
          "
        />
      </div>
    </div>
  </UCard>
</template>
