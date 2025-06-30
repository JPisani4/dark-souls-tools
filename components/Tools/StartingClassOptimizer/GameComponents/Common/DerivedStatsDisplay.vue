<template>
  <div class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Max HP -->
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Max HP
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ stats.maxHp }}
            </p>
          </div>
          <Icon name="i-heroicons-heart" class="w-24 h-24 text-red-500" />
        </div>
      </div>

      <!-- Max Stamina -->
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Max Stamina
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ stats.maxStamina }}
            </p>
          </div>
          <Icon name="i-heroicons-bolt" class="w-24 h-24 text-yellow-500" />
        </div>
      </div>

      <!-- Stamina Regen -->
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Stamina Regen
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ stats.staminaRegen }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">per second</p>
          </div>
          <Icon
            name="i-heroicons-arrow-path"
            class="w-24 h-24 text-green-500"
          />
        </div>
      </div>

      <!-- Equip Load -->
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Equip Load
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ stats.equippedWeight }}/{{ stats.equipLoad }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ Math.round(stats.equipLoadPercentage) }}%
            </p>
          </div>
          <Icon name="i-heroicons-briefcase" class="w-24 h-24 text-blue-500" />
        </div>
      </div>

      <!-- Dodge Roll - Spans 2 columns -->
      <div
        class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:col-span-2 lg:col-span-2"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Dodge Roll
            </p>
            <p class="text-lg font-bold text-gray-900 dark:text-white">
              {{ stats.dodgeRoll }}
            </p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <Icon
              name="i-heroicons-arrow-up"
              class="w-24 h-24 text-purple-500"
            />
            <UButton
              v-if="canImproveDodgeRoll"
              size="sm"
              variant="outline"
              @click="improveDodgeRoll"
              class="text-xs whitespace-nowrap"
            >
              Better Roll
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CharacterStats } from "~/types/game/ds1/characters";
import Icon from "~/components/Common/Icon.vue";

interface Props {
  stats: CharacterStats;
  canImproveDodgeRoll?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  canImproveDodgeRoll: false,
});

const emit = defineEmits<{
  improveDodgeRoll: [];
}>();

const improveDodgeRoll = () => {
  emit("improveDodgeRoll");
};
</script>
