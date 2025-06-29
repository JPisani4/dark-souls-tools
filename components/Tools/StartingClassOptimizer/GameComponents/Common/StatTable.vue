<template>
  <div class="space-y-4">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Stat
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Value
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Soft Cap
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <tr
            v-for="(stat, statKey) in displayStats"
            :key="statKey"
            class="hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ formatStatName(statKey) }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <NumericInput
                  :model-value="stat === 1 ? '' : stat.toString()"
                  placeholder="10"
                  :min="filteredMinimumRequirements[statKey as keyof BaseStats]"
                  :max="99"
                  :class="[
                    'w-20',
                    !filteredStatValidation[statKey as keyof BaseStats]?.isValid
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                      : '',
                  ]"
                  @update:model-value="
                    (value) =>
                      updateStat(statKey as keyof CharacterStats, value)
                  "
                />
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <!-- Attunement Slot Buttons (only for attunement stat) -->
                <template v-if="statKey === 'attunement'">
                  <UButton
                    size="xs"
                    variant="outline"
                    :color="themeColor"
                    :disabled="!canIncreaseAttunementSlots"
                    :title="attunementSlotButtonTitle"
                    @click="increaseAttunementSlots"
                  >
                    <Icon :name="attunementSlotButtonIcon" class="w-4 h-4" />
                  </UButton>
                </template>

                <!-- Soft Cap Buttons (for all stats except attunement) -->
                <template v-if="statKey !== 'attunement'">
                  <UButton
                    size="xs"
                    variant="outline"
                    :color="themeColor"
                    :disabled="
                      !canIncreaseSoftCap(statKey as keyof CharacterStats)
                    "
                    :title="
                      getSoftCapButtonTitle(statKey as keyof CharacterStats)
                    "
                    @click="increaseToSoftCap(statKey as keyof CharacterStats)"
                  >
                    <Icon
                      :name="
                        getSoftCapButtonIcon(statKey as keyof CharacterStats)
                      "
                      class="w-4 h-4"
                    />
                  </UButton>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CharacterStats } from "~/types/game/ds1/characters";
import NumericInput from "../../../Common/NumericInput.vue";
import { computed } from "vue";
import {
  getNextAttunementSlotLevel,
  getAttunementSlots,
} from "~/utils/games/ds1/stats/attunementSlots";
import {
  getNextSoftCap,
  isAtMaxSoftCap,
  isAtSoftCap,
  getCurrentSoftCapTier,
  getSoftCaps,
} from "~/utils/games/ds1/stats/softCaps";
import { getRandomTheme } from "~/utils/themes/colorSystem";
import Icon from "~/components/Common/Icon.vue";

// Type for base stats only (excluding derived stats)
type BaseStats = Pick<
  CharacterStats,
  | "vitality"
  | "attunement"
  | "endurance"
  | "strength"
  | "dexterity"
  | "resistance"
  | "intelligence"
  | "faith"
>;

interface Props {
  stats: CharacterStats;
  minimumRequirements: CharacterStats;
  statValidation: Record<
    keyof CharacterStats,
    { isValid: boolean; error?: string }
  >;
  isTwoHanded: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:stat": [stat: keyof CharacterStats, value: number];
}>();

// Generate random theme color for this component
const themeColor = computed(() => {
  const theme = getRandomTheme();
  // Map theme colors to button colors - same logic as main component
  if (theme.icon.includes("blue")) return "info";
  if (theme.icon.includes("green")) return "success";
  if (theme.icon.includes("orange")) return "warning";
  if (theme.icon.includes("red")) return "error";
  return "primary";
});

// Filter out the level field and derived stats from displayed stats
const displayStats = computed(() => {
  const { level, hp, stamina, equipLoad, ...otherStats } = props.stats;
  return otherStats as BaseStats;
});

const updateStat = (stat: keyof CharacterStats, value: string) => {
  const numValue = parseInt(value, 10);
  if (!isNaN(numValue)) {
    emit("update:stat", stat, numValue);
  }
};

const formatStatName = (statKey: string) => {
  const statNames: Record<string, string> = {
    vitality: "Vitality",
    attunement: "Attunement",
    endurance: "Endurance",
    strength: "Strength",
    dexterity: "Dexterity",
    resistance: "Resistance",
    intelligence: "Intelligence",
    faith: "Faith",
  };
  return statNames[statKey] || statKey;
};

// Attunement slot button logic
const canIncreaseAttunementSlots = computed(() => {
  const currentAttunement = props.stats.attunement;
  const nextLevel = getNextAttunementSlotLevel(currentAttunement);
  return nextLevel !== null && nextLevel <= 99;
});

const attunementSlotButtonTitle = computed(() => {
  const currentAttunement = props.stats.attunement;
  const currentSlots = getAttunementSlots(currentAttunement);
  const nextLevel = getNextAttunementSlotLevel(currentAttunement);

  if (nextLevel === null) {
    return `Maximum attunement slots (${currentSlots}) reached`;
  }

  return `Increase to ${nextLevel} ATT for ${currentSlots + 1} attunement slots`;
});

const attunementSlotButtonIcon = computed(() => {
  const currentAttunement = props.stats.attunement;
  const currentSlots = getAttunementSlots(currentAttunement);
  const nextLevel = getNextAttunementSlotLevel(currentAttunement);

  if (nextLevel === null) {
    return "i-heroicons-check";
  }

  return "i-heroicons-arrow-up";
});

const increaseAttunementSlots = () => {
  const nextLevel = getNextAttunementSlotLevel(props.stats.attunement);
  if (nextLevel !== null) {
    emit("update:stat", "attunement", nextLevel);
  }
};

// Soft cap button logic
const canIncreaseSoftCap = (stat: keyof CharacterStats) => {
  return getNextSoftCap(stat, props.stats[stat], props.isTwoHanded) !== null;
};

const getSoftCapButtonTitle = (stat: keyof CharacterStats) => {
  const nextCap = getNextSoftCap(stat, props.stats[stat], props.isTwoHanded);
  if (nextCap === null) {
    // Special handling for Strength stat to clarify two-handed vs one-handed
    if (stat === "strength") {
      if (props.isTwoHanded) {
        return "Strength is at the two-handed soft cap (27). For one-handed soft cap, increase to 40.";
      } else {
        return "Strength is at the one-handed soft cap (40). For two-handed soft cap, enable two-handed mode and increase to 27.";
      }
    }
    return `${stat.charAt(0).toUpperCase() + stat.slice(1)} is at max soft cap`;
  }

  // Special handling for Strength stat to clarify which soft cap is being targeted
  if (stat === "strength") {
    if (props.isTwoHanded) {
      return `Increase Strength to ${nextCap} (two-handed soft cap)`;
    } else {
      return `Increase Strength to ${nextCap} (one-handed soft cap)`;
    }
  }

  return `Increase ${stat} to ${nextCap} (next soft cap)`;
};

const getSoftCapButtonColor = (stat: keyof CharacterStats) => {
  const nextCap = getNextSoftCap(stat, props.stats[stat], props.isTwoHanded);
  if (nextCap === null) return "green";
  return themeColor.value;
};

const getSoftCapButtonIcon = (stat: keyof CharacterStats) => {
  const nextCap = getNextSoftCap(stat, props.stats[stat], props.isTwoHanded);
  // Show checkmark when at soft cap, up arrow when can increase
  if (nextCap === null) {
    return "i-heroicons-check";
  }
  return "i-heroicons-arrow-up";
};

const increaseToSoftCap = (stat: keyof CharacterStats) => {
  const nextCap = getNextSoftCap(stat, props.stats[stat], props.isTwoHanded);
  if (nextCap !== null) {
    emit("update:stat", stat, nextCap);
  }
};

// Filter validation to only include displayed stats (exclude level)
const filteredStatValidation = computed(() => {
  // Ensure props.statValidation exists and has all required properties
  const validation = props.statValidation || {};

  const filteredValidation: Record<
    keyof BaseStats,
    { isValid: boolean; error?: string }
  > = {
    vitality: validation.vitality || { isValid: true },
    attunement: validation.attunement || { isValid: true },
    endurance: validation.endurance || { isValid: true },
    strength: validation.strength || { isValid: true },
    dexterity: validation.dexterity || { isValid: true },
    resistance: validation.resistance || { isValid: true },
    intelligence: validation.intelligence || { isValid: true },
    faith: validation.faith || { isValid: true },
  };

  return filteredValidation;
});

// Filter minimum requirements to only include displayed stats (exclude level)
const filteredMinimumRequirements = computed(() => {
  // Ensure props.minimumRequirements exists and has all required properties
  const requirements = props.minimumRequirements || {};

  return {
    vitality: requirements.vitality || 1,
    attunement: requirements.attunement || 1,
    endurance: requirements.endurance || 1,
    strength: requirements.strength || 1,
    dexterity: requirements.dexterity || 1,
    resistance: requirements.resistance || 1,
    intelligence: requirements.intelligence || 1,
    faith: requirements.faith || 1,
  } as BaseStats;
});
</script>
