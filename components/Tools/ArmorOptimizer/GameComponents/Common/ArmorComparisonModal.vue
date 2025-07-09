<script setup lang="ts">
import { computed } from "vue";
import Icon from "~/components/Common/Icon.vue";

const open = defineModel<boolean>("open");

interface Props {
  items: any[];
  mode: "individual" | "sets" | "mixmatch";
}

const props = defineProps<Props>();

console.log("ComparisonModal items:", props.items, "mode:", props.mode);

const closeModal = () => {
  open.value = false;
};

// Helper to get stat value for each mode
function getStat(item: any, stat: string, mode: string) {
  if (!item) return 0;
  let value = 0;
  if (mode === "individual") {
    if (stat === "poise") value = item.effect?.poise || 0;
    else if (stat === "weight") value = item.weight;
    else if (item.defense && stat in item.defense)
      value = item.defense[stat] || 0;
  } else {
    // sets or mixmatch
    if (stat === "poise") value = item.totalPoise || 0;
    else if (stat === "weight") value = item.totalWeight || 0;
    else if (item.totalDefense && stat in item.totalDefense)
      value = item.totalDefense[stat] || 0;
  }
  // Round to nearest tenth
  return Math.round(value * 10) / 10;
}

// Different stat rows for different modes
const getStatRows = (mode: string) => {
  const baseStats = [
    { label: "Weight", key: "weight" },
    { label: "Poise", key: "poise" },
    { label: "Regular", key: "normal" },
    { label: "Strike", key: "strike" },
    { label: "Slash", key: "slash" },
    { label: "Thrust", key: "thrust" },
    { label: "Magic", key: "magic" },
    { label: "Fire", key: "fire" },
    { label: "Lightning", key: "lightning" },
  ];

  const resistanceStats = [
    { label: "Bleed Resistance", key: "bleed" },
    { label: "Poison Resistance", key: "poison" },
    { label: "Curse Resistance", key: "curse" },
  ];

  return [...baseStats, ...resistanceStats];
};

// Helper to get item display name
const getItemDisplayName = (item: any, mode: string) => {
  if (mode === "individual") {
    return item.name;
  } else if (mode === "sets") {
    return item.name;
  } else {
    // mixmatch - use the same format as card titles
    if (item.pieces) {
      const slots = ["head", "chest", "hands", "legs"];
      const pieceNames = [];

      for (const slot of slots) {
        const piece = item.pieces[slot];
        if (piece && piece.name) {
          pieceNames.push(piece.name);
        } else {
          pieceNames.push("-");
        }
      }

      return pieceNames.join(" / ");
    }
    return `Mix ${item.id}`;
  }
};

// Helper to get item category/type
const getItemCategory = (item: any, mode: string) => {
  if (mode === "individual") {
    return item.slot || "Unknown";
  } else if (mode === "sets") {
    return "Complete Set";
  } else {
    // mixmatch - show which pieces are equipped
    if (item.pieces) {
      const slots = ["head", "chest", "hands", "legs"];
      const equippedPieces = slots.filter(
        (slot) => item.pieces[slot] && item.pieces[slot].name
      );

      if (equippedPieces.length === 0) {
        return "No Pieces";
      } else if (equippedPieces.length === 4) {
        return "All Slots";
      } else {
        return `${equippedPieces.length} Slots`;
      }
    }
    return "Custom Mix";
  }
};

// Helper to format category name
const formatCategoryName = (category: string) => {
  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/s$/, "");
};

// Helper to get stat color class
const getStatColorClass = (statKey: string) => {
  switch (statKey) {
    case "poise":
      return "text-green-600 dark:text-green-400";
    case "weight":
      return "text-blue-600 dark:text-blue-400";
    case "normal":
    case "strike":
    case "slash":
    case "thrust":
      return "text-red-600 dark:text-red-400";
    case "magic":
      return "text-purple-600 dark:text-purple-400";
    case "fire":
      return "text-orange-600 dark:text-orange-400";
    case "lightning":
      return "text-yellow-600 dark:text-yellow-400";
    case "bleed":
      return "text-pink-600 dark:text-pink-400";
    case "poison":
      return "text-emerald-600 dark:text-emerald-400";
    case "curse":
      return "text-violet-600 dark:text-violet-400";
    default:
      return "";
  }
};

function getStaminaRegen(item: any, mode: string) {
  if (!item) return 0;
  if (mode === "individual") return item.staminaRegenReduction || 0;
  if (mode === "sets") {
    if (!item.pieces) return 0;
    return Object.values(item.pieces).reduce(
      (sum, piece: any) => sum + (piece.staminaRegenReduction || 0),
      0
    );
  }
  if (mode === "mixmatch") {
    if (!item.pieces) return 0;
    return Object.values(item.pieces).reduce(
      (sum, piece: any) => sum + (piece.staminaRegenReduction || 0),
      0
    );
  }
  return 0;
}
function getSpecialEffect(item: any, mode: string) {
  if (!item) return "";
  if (mode === "individual") return item.specialEffect || "";
  if (mode === "sets" || mode === "mixmatch") {
    if (!item.pieces) return "";
    return Object.values(item.pieces)
      .map((piece: any) => piece.specialEffect)
      .filter(Boolean)
      .join(", ");
  }
  return "";
}
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
        <h3 class="text-lg font-semibold">Armor Comparison</h3>
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
                  v-for="item in props.items"
                  :key="item.name || item.id"
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  <div class="space-y-1">
                    <div class="font-semibold text-gray-900 dark:text-white">
                      {{ getItemDisplayName(item, props.mode) }}
                    </div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">
                      {{
                        formatCategoryName(getItemCategory(item, props.mode))
                      }}
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
            >
              <tr v-for="row in getStatRows(props.mode)" :key="row.key">
                <td
                  class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {{ row.label }}
                </td>
                <td
                  v-for="item in props.items"
                  :key="item.name || item.id + row.key"
                  class="px-4 py-3 text-sm text-gray-900 dark:text-white"
                >
                  <span :class="getStatColorClass(row.key)">
                    {{ getStat(item, row.key, props.mode) }}
                  </span>
                </td>
              </tr>
              <tr
                v-if="
                  props.items.some((item) => getStaminaRegen(item, props.mode))
                "
              >
                <td
                  class="px-4 py-3 text-sm font-medium text-yellow-600 dark:text-yellow-400 text-left"
                >
                  Stamina Regen
                </td>
                <td
                  v-for="item in props.items"
                  :key="item.name || item.id + '-stamina'"
                  class="px-4 py-3 text-sm text-yellow-600 dark:text-yellow-400"
                >
                  <span v-if="getStaminaRegen(item, props.mode)"
                    >-{{ getStaminaRegen(item, props.mode) }}</span
                  >
                </td>
              </tr>
              <tr
                v-if="
                  props.items.some((item) => getSpecialEffect(item, props.mode))
                "
              >
                <td
                  class="px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400 text-left"
                >
                  Special Effects
                </td>
                <td
                  v-for="item in props.items"
                  :key="item.name || item.id + '-special'"
                  class="px-4 py-3 text-sm text-green-600 dark:text-green-400 text-right"
                >
                  <span v-if="getSpecialEffect(item, props.mode)">{{
                    getSpecialEffect(item, props.mode)
                  }}</span>
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
