<script setup lang="ts">
import { computed, ref } from "vue";
import Icon from "~/components/Common/Icon.vue";
import { useArmorDisplayTheme } from "~/composables/useArmorDisplayTheme";

interface Props {
  item: any; // armor piece, set, or mixmatch combo
  mode: "individual" | "sets" | "mixmatch";
  slot?: string; // for individual pieces in sets/mixmatch
}

const props = defineProps<Props>();
const { defenseColors, statColors, cardStyles } = useArmorDisplayTheme();

// State for individual pieces expansion
const isPiecesExpanded = ref(false);

const togglePiecesExpansion = () => {
  isPiecesExpanded.value = !isPiecesExpanded.value;
};

const slots = ["head", "chest", "hands", "legs"];

const isPiece = computed(() => {
  if (props.mode === "individual") return true;
  if ((props.mode === "sets" || props.mode === "mixmatch") && props.slot)
    return true;
  return false;
});
const piece = computed(() => {
  if (props.mode === "individual") return props.item;
  if (
    (props.mode === "sets" || props.mode === "mixmatch") &&
    props.slot &&
    props.item?.pieces
  ) {
    return props.item.pieces[props.slot];
  }
  return null;
});

const setOrCombo = computed(() => {
  if (props.mode === "sets" || props.mode === "mixmatch") return props.item;
  return null;
});

const statGrid = [
  { key: "normal", label: "Regular", color: defenseColors.normal },
  { key: "strike", label: "Strike", color: defenseColors.strike },
  { key: "slash", label: "Slash", color: defenseColors.slash },
  { key: "thrust", label: "Thrust", color: defenseColors.thrust },
  { key: "magic", label: "Magic", color: defenseColors.magic },
  { key: "fire", label: "Fire", color: defenseColors.fire },
  { key: "lightning", label: "Lightning", color: defenseColors.lightning },
  { key: "bleed", label: "Bleed", color: defenseColors.bleed },
  { key: "poison", label: "Poison", color: defenseColors.poison },
  { key: "curse", label: "Curse", color: defenseColors.curse },
];
</script>

<template>
  <!-- Individual Piece Card -->
  <div
    v-if="isPiece && piece"
    class="border rounded-lg p-4 transition-all duration-200 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 mb-2"
  >
    <!-- Main Armor Info -->
    <div class="flex items-center justify-between">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <h5
              class="text-lg font-semibold text-gray-900 dark:text-white truncate"
            >
              {{ piece.name }}
            </h5>
          </div>
        </div>

        <!-- Key Stats -->
        <div class="flex items-center gap-4 mt-2 text-sm">
          <div class="flex items-center gap-1">
            <span class="text-gray-600 dark:text-gray-400">Weight:</span>
            <span
              class="font-semibold text-lg text-blue-600 dark:text-blue-400"
              >{{ piece.weight }}</span
            >
          </div>
          <div class="flex items-center gap-1">
            <span class="text-gray-600 dark:text-gray-400">Poise:</span>
            <span
              class="font-semibold text-lg text-green-600 dark:text-green-400"
              >{{ piece.effect?.poise || 0 }}</span
            >
          </div>
        </div>

        <!-- Physical Defense Stats -->
        <div class="flex items-center gap-3 text-xs mt-1">
          <div class="flex items-center gap-1">
            <span class="text-gray-600 dark:text-gray-400">Regular:</span>
            <span class="font-semibold text-gray-800 dark:text-gray-200">{{
              piece.defense?.normal || 0
            }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-amber-600 dark:text-amber-400">Strike:</span>
            <span class="font-semibold text-amber-600 dark:text-amber-400">{{
              piece.defense?.strike || 0
            }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-red-600 dark:text-red-400">Slash:</span>
            <span class="font-semibold text-red-600 dark:text-red-400">{{
              piece.defense?.slash || 0
            }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-indigo-600 dark:text-indigo-400">Thrust:</span>
            <span class="font-semibold text-indigo-600 dark:text-indigo-400">{{
              piece.defense?.thrust || 0
            }}</span>
          </div>
        </div>

        <!-- Elemental Defense Stats -->
        <div class="flex items-center gap-3 text-xs mt-1">
          <div class="flex items-center gap-1">
            <span class="text-blue-600 dark:text-blue-400">Magic:</span>
            <span class="font-semibold text-blue-600 dark:text-blue-400">{{
              piece.defense?.magic || 0
            }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-orange-600 dark:text-orange-400">Fire:</span>
            <span class="font-semibold text-orange-600 dark:text-orange-400">{{
              piece.defense?.fire || 0
            }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-green-600 dark:text-green-400">Poison:</span>
            <span class="font-semibold text-green-600 dark:text-green-400">{{
              piece.defense?.poison || 0
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Expanded Details -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <!-- Defense Stats -->
        <div>
          <h6 class="font-semibold text-gray-900 dark:text-white mb-2">
            Defense
          </h6>
          <div class="grid grid-cols-3 gap-4 text-sm">
            <!-- Row 1: Regular | Magic | Bleed -->
            <div class="flex items-center gap-1">
              <span class="text-gray-600 dark:text-gray-400">Regular:</span>
              <span class="font-semibold text-gray-800 dark:text-gray-200">{{
                piece.defense?.normal || 0
              }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-blue-600 dark:text-blue-400">Magic:</span>
              <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                piece.defense?.magic || 0
              }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-red-600 dark:text-red-400">Bleed:</span>
              <span class="font-semibold text-red-600 dark:text-red-400">{{
                piece.defense?.bleed || 0
              }}</span>
            </div>
            <!-- Row 2: Strike | Fire | Poison -->
            <div class="flex items-center gap-1">
              <span class="text-amber-600 dark:text-amber-400">Strike:</span>
              <span class="font-semibold text-amber-600 dark:text-amber-400">{{
                piece.defense?.strike || 0
              }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-orange-600 dark:text-orange-400">Fire:</span>
              <span
                class="font-semibold text-orange-600 dark:text-orange-400"
                >{{ piece.defense?.fire || 0 }}</span
              >
            </div>
            <div class="flex items-center gap-1">
              <span class="text-green-600 dark:text-green-400">Poison:</span>
              <span class="font-semibold text-green-600 dark:text-green-400">{{
                piece.defense?.poison || 0
              }}</span>
            </div>
            <!-- Row 3: Slash | Lightning | Curse -->
            <div class="flex items-center gap-1">
              <span class="text-red-600 dark:text-red-400">Slash:</span>
              <span class="font-semibold text-red-600 dark:text-red-400">{{
                piece.defense?.slash || 0
              }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-yellow-600 dark:text-yellow-400"
                >Lightning:</span
              >
              <span
                class="font-semibold text-yellow-600 dark:text-yellow-400"
                >{{ piece.defense?.lightning || 0 }}</span
              >
            </div>
            <div class="flex items-center gap-1">
              <span class="text-purple-600 dark:text-purple-400">Curse:</span>
              <span
                class="font-semibold text-purple-600 dark:text-purple-400"
                >{{ piece.defense?.curse || 0 }}</span
              >
            </div>
            <!-- Row 4: Thrust | empty | empty -->
            <div class="flex items-center gap-1">
              <span class="text-indigo-600 dark:text-indigo-400">Thrust:</span>
              <span
                class="font-semibold text-indigo-600 dark:text-indigo-400"
                >{{ piece.defense?.thrust || 0 }}</span
              >
            </div>
            <div></div>
            <div></div>
          </div>
        </div>

        <!-- Details -->
        <div>
          <h6 class="font-semibold text-gray-900 dark:text-white mb-2">
            Details
          </h6>
          <div class="space-y-1 text-gray-600 dark:text-gray-400">
            <div>Weight: {{ piece.weight }}</div>
            <div>Poise: {{ piece.effect?.poise || 0 }}</div>
            <div>Type: {{ piece.armorType }}</div>
            <div v-if="piece.upgradePath">
              Upgrade Path: {{ piece.upgradePath }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Set or MixMatch Card -->
  <div
    v-else-if="setOrCombo"
    class="border rounded-lg p-4 transition-all duration-200 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 mb-2"
  >
    <!-- Card Header -->
    <div class="flex items-center justify-between cursor-pointer">
      <div class="flex items-center gap-3 flex-1">
        <!-- Armor Set Name and Stats -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 sm:gap-3">
            <h4
              class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate"
            >
              {{
                mode === "mixmatch"
                  ? slots
                      .map((slot) => setOrCombo?.pieces?.[slot]?.name || "-")
                      .join(" / ")
                  : setOrCombo?.name || "Unknown"
              }}
            </h4>
            <span
              class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-shrink-0"
            >
              ({{ Object.keys(setOrCombo?.pieces || {}).length }} pieces)
            </span>
          </div>

          <!-- Key Stats -->
          <div class="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-sm">
            <div class="flex items-center gap-1">
              <span class="text-gray-600 dark:text-gray-400">Weight:</span>
              <span
                class="font-semibold text-base sm:text-lg text-gray-900 dark:text-white"
                >{{ setOrCombo?.totalWeight?.toFixed(1) || "0.0" }}</span
              >
            </div>
            <div class="flex items-center gap-1">
              <span class="text-gray-600 dark:text-gray-400">Poise:</span>
              <span
                class="font-semibold text-base sm:text-lg text-blue-600 dark:text-blue-400"
                >{{ setOrCombo?.totalPoise?.toFixed(1) || "0.0" }}</span
              >
            </div>
          </div>

          <!-- Physical Defense Stats -->
          <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs mt-1">
            <div class="flex items-center gap-1">
              <span class="text-blue-600 dark:text-blue-400">Regular:</span>
              <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                setOrCombo?.totalDefense?.normal?.toFixed(1) || "0.0"
              }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-orange-600 dark:text-orange-400">Strike:</span>
              <span
                class="font-semibold text-orange-600 dark:text-orange-400"
                >{{
                  setOrCombo?.totalDefense?.strike?.toFixed(1) || "0.0"
                }}</span
              >
            </div>
            <div class="flex items-center gap-1">
              <span class="text-red-600 dark:text-red-400">Slash:</span>
              <span class="font-semibold text-red-600 dark:text-red-400">{{
                setOrCombo?.totalDefense?.slash?.toFixed(1) || "0.0"
              }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-purple-600 dark:text-purple-400">Thrust:</span>
              <span
                class="font-semibold text-purple-600 dark:text-purple-400"
                >{{
                  setOrCombo?.totalDefense?.thrust?.toFixed(1) || "0.0"
                }}</span
              >
            </div>
          </div>

          <!-- Elemental Defense Stats -->
          <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs mt-1">
            <div class="flex items-center gap-1">
              <span class="text-indigo-600 dark:text-indigo-400">Magic:</span>
              <span
                class="font-semibold text-indigo-600 dark:text-indigo-400"
                >{{
                  setOrCombo?.totalDefense?.magic?.toFixed(1) || "0.0"
                }}</span
              >
            </div>
            <div class="flex items-center gap-1">
              <span class="text-yellow-600 dark:text-yellow-400">Fire:</span>
              <span
                class="font-semibold text-yellow-600 dark:text-yellow-400"
                >{{ setOrCombo?.totalDefense?.fire?.toFixed(1) || "0.0" }}</span
              >
            </div>
            <div class="flex items-center gap-1">
              <span class="text-cyan-600 dark:text-cyan-400">Lightning:</span>
              <span class="font-semibold text-cyan-600 dark:text-cyan-400">{{
                setOrCombo?.totalDefense?.lightning?.toFixed(1) || "0.0"
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Expanded Content -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <!-- Defense Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <!-- Physical Defense -->
        <div class="space-y-2">
          <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Physical Defense
          </h5>
          <div class="space-y-1 text-xs">
            <div class="flex justify-between">
              <span class="text-blue-600 dark:text-blue-400">Normal:</span>
              <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                setOrCombo?.totalDefense?.normal?.toFixed(1) || "0.0"
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-orange-600 dark:text-orange-400">Strike:</span>
              <span
                class="font-semibold text-orange-600 dark:text-orange-400"
                >{{
                  setOrCombo?.totalDefense?.strike?.toFixed(1) || "0.0"
                }}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-red-600 dark:text-red-400">Slash:</span>
              <span class="font-semibold text-red-600 dark:text-red-400">{{
                setOrCombo?.totalDefense?.slash?.toFixed(1) || "0.0"
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-purple-600 dark:text-purple-400">Thrust:</span>
              <span
                class="font-semibold text-purple-600 dark:text-purple-400"
                >{{
                  setOrCombo?.totalDefense?.thrust?.toFixed(1) || "0.0"
                }}</span
              >
            </div>
          </div>
        </div>

        <!-- Elemental Defense -->
        <div class="space-y-2">
          <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Elemental Defense
          </h5>
          <div class="space-y-1 text-xs">
            <div class="flex justify-between">
              <span class="text-indigo-600 dark:text-indigo-400">Magic:</span>
              <span
                class="font-semibold text-indigo-600 dark:text-indigo-400"
                >{{
                  setOrCombo?.totalDefense?.magic?.toFixed(1) || "0.0"
                }}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-yellow-600 dark:text-yellow-400">Fire:</span>
              <span
                class="font-semibold text-yellow-600 dark:text-yellow-400"
                >{{ setOrCombo?.totalDefense?.fire?.toFixed(1) || "0.0" }}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-cyan-600 dark:text-cyan-400">Lightning:</span>
              <span class="font-semibold text-cyan-600 dark:text-cyan-400">{{
                setOrCombo?.totalDefense?.lightning?.toFixed(1) || "0.0"
              }}</span>
            </div>
          </div>
        </div>

        <!-- Status Resistance -->
        <div class="space-y-2">
          <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Status Resistance
          </h5>
          <div class="space-y-1 text-xs">
            <div class="flex justify-between">
              <span class="text-red-500 dark:text-red-400">Bleed:</span>
              <span class="font-semibold text-red-500 dark:text-red-400">{{
                setOrCombo?.totalDefense?.bleed?.toFixed(1) || "0.0"
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-green-600 dark:text-green-400">Poison:</span>
              <span class="font-semibold text-green-600 dark:text-green-400">{{
                setOrCombo?.totalDefense?.poison?.toFixed(1) || "0.0"
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-purple-500 dark:text-purple-400">Curse:</span>
              <span
                class="font-semibold text-purple-500 dark:text-purple-400"
                >{{
                  setOrCombo?.totalDefense?.curse?.toFixed(1) || "0.0"
                }}</span
              >
            </div>
          </div>
        </div>

        <!-- Set Summary -->
        <div class="space-y-2">
          <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Set Summary
          </h5>
          <div class="space-y-1 text-xs">
            <div class="flex justify-between">
              <span>Total Weight:</span>
              <span>{{ setOrCombo.totalWeight?.toFixed(1) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Total Poise:</span>
              <span>{{ setOrCombo.totalPoise?.toFixed(1) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Total Defense:</span>
              <span>{{
                (
                  (setOrCombo.totalDefense?.normal || 0) +
                  (setOrCombo.totalDefense?.strike || 0) +
                  (setOrCombo.totalDefense?.slash || 0) +
                  (setOrCombo.totalDefense?.thrust || 0)
                ).toFixed(1)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span>Elemental:</span>
              <span>{{
                (
                  (setOrCombo.totalDefense?.magic || 0) +
                  (setOrCombo.totalDefense?.fire || 0) +
                  (setOrCombo.totalDefense?.lightning || 0)
                ).toFixed(1)
              }}</span>
            </div>
            <div
              v-if="setOrCombo.totalStaminaRegenReduction"
              class="flex justify-between"
            >
              <span class="text-xs text-yellow-600 dark:text-yellow-400"
                >Stamina Regen:</span
              >
              <span class="text-xs text-yellow-600 dark:text-yellow-400"
                >-{{ setOrCombo.totalStaminaRegenReduction }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Individual Armor Pieces -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
        <UButton
          variant="ghost"
          size="sm"
          class="mb-3 w-full justify-between"
          @click="togglePiecesExpansion"
        >
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Individual Pieces
          </span>
          <Icon
            :name="
              isPiecesExpanded
                ? 'i-heroicons-chevron-down'
                : 'i-heroicons-chevron-right'
            "
            class="w-4 h-4"
          />
        </UButton>
        <div
          v-if="isPiecesExpanded"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <div
            v-for="slot in slots"
            :key="slot"
            class="p-3 sm:p-4 rounded-lg border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 min-w-0"
          >
            <!-- Piece Header -->
            <div class="flex items-center justify-between mb-3 gap-2">
              <span
                class="text-sm font-semibold capitalize text-gray-900 dark:text-white truncate"
                >{{ slot }}</span
              >
              <span
                class="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0"
                >{{
                  setOrCombo.pieces?.[slot]?.weight?.toFixed(1) || 0
                }}
                weight</span
              >
            </div>

            <!-- Piece Name -->
            <div
              class="text-sm font-medium mb-3 text-gray-900 dark:text-white truncate"
            >
              {{ setOrCombo.pieces?.[slot]?.name || "Empty" }}
            </div>

            <!-- Piece Stats -->
            <div v-if="setOrCombo.pieces?.[slot]" class="space-y-2 text-xs">
              <!-- Poise -->
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Poise:</span>
                <span class="font-semibold text-blue-600 dark:text-blue-400">{{
                  setOrCombo.pieces[slot].effect?.poise?.toFixed(1) || 0
                }}</span>
              </div>

              <!-- Physical Defense -->
              <div class="space-y-1">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Regular:</span>
                  <span
                    class="font-semibold text-blue-600 dark:text-blue-400"
                    >{{
                      setOrCombo.pieces[slot].defense?.normal?.toFixed(1) || 0
                    }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-orange-600 dark:text-orange-400"
                    >Strike:</span
                  >
                  <span
                    class="font-semibold text-orange-600 dark:text-orange-400"
                    >{{
                      setOrCombo.pieces[slot].defense?.strike?.toFixed(1) || 0
                    }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-red-600 dark:text-red-400">Slash:</span>
                  <span class="font-semibold text-red-600 dark:text-red-400">{{
                    setOrCombo.pieces[slot].defense?.slash?.toFixed(1) || 0
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-purple-600 dark:text-purple-400"
                    >Thrust:</span
                  >
                  <span
                    class="font-semibold text-purple-600 dark:text-purple-400"
                    >{{
                      setOrCombo.pieces[slot].defense?.thrust?.toFixed(1) || 0
                    }}</span
                  >
                </div>
              </div>

              <!-- Elemental Defense -->
              <div class="space-y-1">
                <div class="flex justify-between">
                  <span class="text-indigo-600 dark:text-indigo-400"
                    >Magic:</span
                  >
                  <span
                    class="font-semibold text-indigo-600 dark:text-indigo-400"
                    >{{
                      setOrCombo.pieces[slot].defense?.magic?.toFixed(1) || 0
                    }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-yellow-600 dark:text-yellow-400"
                    >Fire:</span
                  >
                  <span
                    class="font-semibold text-yellow-600 dark:text-yellow-400"
                    >{{
                      setOrCombo.pieces[slot].defense?.fire?.toFixed(1) || 0
                    }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-cyan-600 dark:text-cyan-400"
                    >Lightning:</span
                  >
                  <span
                    class="font-semibold text-cyan-600 dark:text-cyan-400"
                    >{{
                      setOrCombo.pieces[slot].defense?.lightning?.toFixed(1) ||
                      0
                    }}</span
                  >
                </div>
              </div>

              <!-- Status Resistance -->
              <div class="space-y-1">
                <div class="flex justify-between">
                  <span class="text-green-600 dark:text-green-400"
                    >Poison:</span
                  >
                  <span
                    class="font-semibold text-green-600 dark:text-green-400"
                    >{{
                      setOrCombo.pieces[slot].defense?.poison?.toFixed(1) || 0
                    }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-red-500 dark:text-red-400">Bleed:</span>
                  <span class="font-semibold text-red-500 dark:text-red-400">{{
                    setOrCombo.pieces[slot].defense?.bleed?.toFixed(1) || 0
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-purple-500 dark:text-purple-400"
                    >Curse:</span
                  >
                  <span
                    class="font-semibold text-purple-500 dark:text-purple-400"
                    >{{
                      setOrCombo.pieces[slot].defense?.curse?.toFixed(1) || 0
                    }}</span
                  >
                </div>
                <div
                  v-if="setOrCombo.pieces[slot].staminaRegenReduction"
                  class="flex justify-between"
                >
                  <span class="text-xs text-yellow-600 dark:text-yellow-400"
                    >Stamina Regen:</span
                  >
                  <span class="text-xs text-yellow-600 dark:text-yellow-400"
                    >-{{ setOrCombo.pieces[slot].staminaRegenReduction }}</span
                  >
                </div>
              </div>
            </div>

            <div v-else class="text-xs text-gray-400 italic">Empty</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
