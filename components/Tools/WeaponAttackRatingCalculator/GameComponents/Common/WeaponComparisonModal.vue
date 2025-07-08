<script setup lang="ts">
import { computed } from "vue";
import Icon from "~/components/Common/Icon.vue";
import type { Weapon } from "~/types/game/ds1/weapons";

const open = defineModel<boolean>("open");

interface Props {
  weapons: (Weapon & { rating: any })[];
}

const props = defineProps<Props>();

const closeModal = () => {
  open.value = false;
};

// Helper to get stat value
function getStat(weapon: any, stat: string) {
  if (!weapon) return 0;

  switch (stat) {
    case "totalAR":
      return Math.round(weapon.rating.totalAttackRating);
    case "physical":
      return Math.round(weapon.rating.physical);
    case "magic":
      return Math.round(weapon.rating.magic);
    case "fire":
      return Math.round(weapon.rating.fire);
    case "lightning":
      return Math.round(weapon.rating.lightning);
    case "weight":
      return weapon.weight;
    case "critical":
      return weapon.criticalDamage;
    case "strength":
      return weapon.requirements.strength;
    case "dexterity":
      return weapon.requirements.dexterity;
    case "intelligence":
      return weapon.requirements.intelligence;
    case "faith":
      return weapon.requirements.faith;
    default:
      return 0;
  }
}

const statRows = [
  { label: "Total AR", key: "totalAR" },
  { label: "Physical", key: "physical" },
  { label: "Magic", key: "magic" },
  { label: "Fire", key: "fire" },
  { label: "Lightning", key: "lightning" },
  { label: "Weight", key: "weight" },
  { label: "Critical", key: "critical" },
  { label: "Strength Req", key: "strength" },
  { label: "Dexterity Req", key: "dexterity" },
  { label: "Intelligence Req", key: "intelligence" },
  { label: "Faith Req", key: "faith" },
];

// Helper to format weapon category name
const formatCategoryName = (category: string) => {
  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/s$/, "");
};

// Get weapon category
const getWeaponCategory = (weapon: any) => {
  return weapon.weaponType || "unknown";
};
</script>

<template>
  <div
    v-if="open"
    @click.self="closeModal"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-900/95"
  >
    <div
      class="bg-white dark:bg-gray-900 p-8 max-w-[1200px] w-full rounded-lg shadow-lg max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Weapon Comparison</h3>
        <button
          @click="closeModal"
          class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          <Icon name="i-heroicons-x-mark" class="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <div class="space-y-4">
        <!-- Comparison Table -->
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Stat
                </th>
                <th
                  v-for="weapon in props.weapons"
                  :key="weapon.name"
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  <div class="space-y-1">
                    <div class="font-semibold text-gray-900 dark:text-white">
                      {{ weapon.name }}
                    </div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">
                      {{ formatCategoryName(getWeaponCategory(weapon)) }}
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
            >
              <tr v-for="row in statRows" :key="row.key">
                <td
                  class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {{ row.label }}
                </td>
                <td
                  v-for="weapon in props.weapons"
                  :key="weapon.name + row.key"
                  class="px-4 py-3 text-sm text-gray-900 dark:text-white"
                >
                  <span
                    :class="{
                      'text-green-600 dark:text-green-400':
                        row.key === 'totalAR' &&
                        weapon.rating.meetsRequirements,
                      'text-red-600 dark:text-red-400': row.key === 'physical',
                      'text-blue-600 dark:text-blue-400': row.key === 'magic',
                      'text-orange-600 dark:text-orange-400':
                        row.key === 'fire',
                      'text-yellow-600 dark:text-yellow-400':
                        row.key === 'lightning',
                    }"
                  >
                    {{ getStat(weapon, row.key) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Close Button -->
        <div class="flex justify-end pt-4">
          <UButton @click="closeModal" color="primary" size="sm">
            Close
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
