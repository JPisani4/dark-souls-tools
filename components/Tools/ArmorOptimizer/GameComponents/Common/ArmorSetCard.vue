<script setup lang="ts">
import { computed, ref } from "vue";
import { useArmorDisplayTheme } from "~/composables/useArmorDisplayTheme";
import Icon from "~/components/Common/Icon.vue";

interface Props {
  armorSet: any;
  isExpanded?: boolean;
  isSelected?: boolean;
  showCheckbox?: boolean;
  sortPrimary?: string;
  sortSecondary?: string;
  maskOfTheFather?: boolean;
  onToggleExpansion?: () => void;
  onToggleSelection?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  isExpanded: false,
  isSelected: false,
  showCheckbox: true,
  sortPrimary: "poise",
  sortSecondary: "weight",
  maskOfTheFather: false,
});

const emit = defineEmits<{
  toggleExpansion: [];
  toggleSelection: [];
}>();

const { cardStyles } = useArmorDisplayTheme();

// State for individual pieces expansion
const isPiecesExpanded = ref(false);

const handleToggleExpansion = () => {
  emit("toggleExpansion");
};

const handleToggleSelection = () => {
  emit("toggleSelection");
};

const togglePiecesExpansion = () => {
  isPiecesExpanded.value = !isPiecesExpanded.value;
};

// Calculate ratio based on sort values
const calculateRatio = (
  armorSet: any,
  primary: string | { label: string; value: string },
  secondary: string | { label: string; value: string }
): number => {
  // Defensive: extract .value if object
  const getKey = (k: any) =>
    typeof k === "object" && k !== null && "value" in k ? k.value : k;
  primary = getKey(primary);
  secondary = getKey(secondary);

  if (!armorSet || armorSet.totalWeight === 0) return 0;

  let primaryValue = 0;
  let secondaryValue = 0;

  // Calculate primary value
  switch (primary) {
    case "poise":
      primaryValue = armorSet.totalPoise || 0;
      break;
    case "weight":
      primaryValue = armorSet.totalWeight;
      break;
    case "totalDefense":
      primaryValue =
        (armorSet.totalDefense?.normal || 0) +
        (armorSet.totalDefense?.strike || 0) +
        (armorSet.totalDefense?.slash || 0) +
        (armorSet.totalDefense?.thrust || 0);
      break;
    case "regularDefense":
      primaryValue = armorSet.totalDefense?.normal || 0;
      break;
    case "strikeDefense":
      primaryValue = armorSet.totalDefense?.strike || 0;
      break;
    case "slashDefense":
      primaryValue = armorSet.totalDefense?.slash || 0;
      break;
    case "thrustDefense":
      primaryValue = armorSet.totalDefense?.thrust || 0;
      break;
    case "physical":
      primaryValue =
        (armorSet.totalDefense?.normal || 0) +
        (armorSet.totalDefense?.strike || 0) +
        (armorSet.totalDefense?.slash || 0) +
        (armorSet.totalDefense?.thrust || 0);
      break;
    case "physicalDefense":
      primaryValue = armorSet.totalDefense?.normal || 0;
      break;
    case "magicDefense":
      primaryValue = armorSet.totalDefense?.magic || 0;
      break;
    case "fireDefense":
      primaryValue = armorSet.totalDefense?.fire || 0;
      break;
    case "lightningDefense":
      primaryValue = armorSet.totalDefense?.lightning || 0;
      break;
    case "elemental":
      primaryValue =
        (armorSet.totalDefense?.magic || 0) +
        (armorSet.totalDefense?.fire || 0) +
        (armorSet.totalDefense?.lightning || 0);
      break;
    case "elementalDefense":
      primaryValue =
        (armorSet.totalDefense?.magic || 0) +
        (armorSet.totalDefense?.fire || 0) +
        (armorSet.totalDefense?.lightning || 0);
      break;
    case "bleedResistance":
      primaryValue = armorSet.totalDefense?.bleed || 0;
      break;
    case "poisonResistance":
      primaryValue = armorSet.totalDefense?.poison || 0;
      break;
    case "curseResistance":
      primaryValue = armorSet.totalDefense?.curse || 0;
      break;
    case "status":
      primaryValue =
        (armorSet.totalDefense?.bleed || 0) +
        (armorSet.totalDefense?.poison || 0) +
        (armorSet.totalDefense?.curse || 0);
      break;
    case "statusResistance":
      primaryValue =
        (armorSet.totalDefense?.bleed || 0) +
        (armorSet.totalDefense?.poison || 0) +
        (armorSet.totalDefense?.curse || 0);
      break;
    default:
      primaryValue = 0;
  }

  // If no secondary sort, return primary value
  if (!secondary || secondary === "" || secondary === "none") {
    return primaryValue;
  }

  // Calculate secondary value
  switch (secondary) {
    case "poise":
      secondaryValue = armorSet.totalPoise || 0;
      break;
    case "weight":
      secondaryValue = armorSet.totalWeight;
      break;
    case "totalDefense":
      secondaryValue =
        (armorSet.totalDefense?.normal || 0) +
        (armorSet.totalDefense?.strike || 0) +
        (armorSet.totalDefense?.slash || 0) +
        (armorSet.totalDefense?.thrust || 0);
      break;
    case "regularDefense":
      secondaryValue = armorSet.totalDefense?.normal || 0;
      break;
    case "strikeDefense":
      secondaryValue = armorSet.totalDefense?.strike || 0;
      break;
    case "slashDefense":
      secondaryValue = armorSet.totalDefense?.slash || 0;
      break;
    case "thrustDefense":
      secondaryValue = armorSet.totalDefense?.thrust || 0;
      break;
    case "physical":
      secondaryValue =
        (armorSet.totalDefense?.normal || 0) +
        (armorSet.totalDefense?.strike || 0) +
        (armorSet.totalDefense?.slash || 0) +
        (armorSet.totalDefense?.thrust || 0);
      break;
    case "physicalDefense":
      secondaryValue = armorSet.totalDefense?.normal || 0;
      break;
    case "magicDefense":
      secondaryValue = armorSet.totalDefense?.magic || 0;
      break;
    case "fireDefense":
      secondaryValue = armorSet.totalDefense?.fire || 0;
      break;
    case "lightningDefense":
      secondaryValue = armorSet.totalDefense?.lightning || 0;
      break;
    case "elemental":
      secondaryValue =
        (armorSet.totalDefense?.magic || 0) +
        (armorSet.totalDefense?.fire || 0) +
        (armorSet.totalDefense?.lightning || 0);
      break;
    case "elementalDefense":
      secondaryValue =
        (armorSet.totalDefense?.magic || 0) +
        (armorSet.totalDefense?.fire || 0) +
        (armorSet.totalDefense?.lightning || 0);
      break;
    case "bleedResistance":
      secondaryValue = armorSet.totalDefense?.bleed || 0;
      break;
    case "poisonResistance":
      secondaryValue = armorSet.totalDefense?.poison || 0;
      break;
    case "curseResistance":
      secondaryValue = armorSet.totalDefense?.curse || 0;
      break;
    case "status":
      secondaryValue =
        (armorSet.totalDefense?.bleed || 0) +
        (armorSet.totalDefense?.poison || 0) +
        (armorSet.totalDefense?.curse || 0);
      break;
    case "statusResistance":
      secondaryValue =
        (armorSet.totalDefense?.bleed || 0) +
        (armorSet.totalDefense?.poison || 0) +
        (armorSet.totalDefense?.curse || 0);
      break;
    default:
      secondaryValue = 0;
  }

  return secondaryValue !== 0 ? primaryValue / secondaryValue : 0;
};

// Get display labels for sort types
const getSortLabel = (sortType: string): string => {
  switch (sortType) {
    case "poise":
      return "Poise";
    case "weight":
      return "Weight";
    case "totalDefense":
      return "Total Defense";
    case "regularDefense":
      return "Regular Defense";
    case "strikeDefense":
      return "Strike Defense";
    case "slashDefense":
      return "Slash Defense";
    case "thrustDefense":
      return "Thrust Defense";
    case "physical":
      return "Total Physical Defense";
    case "physicalDefense":
      return "Physical Defense";
    case "magicDefense":
      return "Magic Defense";
    case "fireDefense":
      return "Fire Defense";
    case "lightningDefense":
      return "Lightning Defense";
    case "elemental":
      return "Total Elemental Defense";
    case "elementalDefense":
      return "Elemental Defense";
    case "bleedResistance":
      return "Bleed Resistance";
    case "poisonResistance":
      return "Poison Resistance";
    case "curseResistance":
      return "Curse Resistance";
    case "status":
      return "Total Status Resistance";
    case "statusResistance":
      return "Status Resistance";
    default:
      return sortType;
  }
};

// Add type guard
function isSortOptionObject(
  option: any
): option is { label: string; value: string } {
  return option && typeof option === "object" && "value" in option;
}

// Computed properties
const ratioValue = computed(() =>
  calculateRatio(props.armorSet, props.sortPrimary, props.sortSecondary)
);

const adjustedTotalWeight = computed(() => {
  // Only remove headgear weight if it's Mask of the Father
  const headPiece = (Object.values(props.armorSet.pieces) as any[]).find(
    (p) => p && p.slot === "head" && typeof p.weight === "number"
  );
  const headgearWeight =
    headPiece?.name === "Mask of the Father" ? headPiece?.weight || 0 : 0;
  return props.armorSet.totalWeight - headgearWeight;
});

const adjustedTotalPoise = computed(() => {
  // Only remove headgear poise if it's Mask of the Father
  const headPiece = (Object.values(props.armorSet.pieces) as any[]).find(
    (p) =>
      p && p.slot === "head" && p.effect && typeof p.effect.poise === "number"
  );
  const headgearPoise =
    headPiece?.name === "Mask of the Father"
      ? headPiece?.effect?.poise || 0
      : 0;
  return (props.armorSet.totalPoise || 0) - headgearPoise;
});

const adjustedTotalDefense = computed(() => {
  // Remove headgear defense from total
  const headPiece = (Object.values(props.armorSet.pieces) as any[]).find(
    (p) => p && p.slot === "head" && p.defense && typeof p.defense === "object"
  );
  const headgearDefense = headPiece?.defense || {};
  const result = { ...props.armorSet.totalDefense };
  Object.keys(result).forEach((key) => {
    result[key] = (result[key] || 0) - (headgearDefense[key] || 0);
  });
  return result;
});

const totalDefense = computed(() => {
  const defense = props.armorSet.totalDefense;
  return (
    (defense?.normal || 0) +
    (defense?.strike || 0) +
    (defense?.slash || 0) +
    (defense?.thrust || 0)
  );
});

const totalElementalDefense = computed(() => {
  const defense = props.armorSet.totalDefense;
  return (
    (defense?.magic || 0) + (defense?.fire || 0) + (defense?.lightning || 0)
  );
});

const armorPieces = computed(() => {
  if (!props.armorSet.pieces) return [];

  const pieces = [];
  const slots = ["head", "chest", "hands", "legs"];

  for (const slot of slots) {
    const piece = props.armorSet.pieces[slot];
    if (piece) {
      // Only disable if the head slot is actually Mask of the Father
      const isDisabled = slot === "head" && piece.name === "Mask of the Father";
      pieces.push({
        slot,
        armor: piece,
        isDisabled,
      });
    }
  }

  return pieces;
});

const totalStaminaRegenReduction = computed(() =>
  armorPieces.value.reduce(
    (sum, piece: any) =>
      sum +
      (piece.armor?.staminaRegenReduction || piece.staminaRegenReduction || 0),
    0
  )
);
const specialEffectsString = computed(() =>
  armorPieces.value
    .map((piece: any) => piece.armor?.specialEffect || piece.specialEffect)
    .filter(Boolean)
    .join(", ")
);
</script>

<template>
  <div
    :class="[
      cardStyles.base,
      isExpanded ? cardStyles.expanded : '',
      isSelected ? cardStyles.selected : '',
    ]"
  >
    <!-- Card Header -->
    <div
      class="flex items-center justify-between cursor-pointer"
      @click="handleToggleExpansion"
    >
      <div class="flex items-center gap-3 flex-1">
        <!-- Checkbox for comparison -->
        <div
          v-if="showCheckbox"
          class="flex-shrink-0"
          @click.stop="handleToggleSelection"
        >
          <input
            type="checkbox"
            :checked="isSelected"
            class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
        </div>

        <!-- Armor Set Name and Stats -->
        <div class="flex-1 min-w-0">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <h4
              class="text-lg font-semibold text-gray-900 dark:text-white truncate"
            >
              {{ armorSet.name }}
            </h4>
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="text-sm text-gray-600 dark:text-gray-400 flex-shrink-0"
              >
                ({{ armorPieces.length }} pieces)
              </span>
              <!-- Ratio Badge -->
              <span
                v-if="
                  sortPrimary &&
                  sortSecondary &&
                  sortSecondary !== '' &&
                  sortSecondary !== 'none'
                "
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 flex-shrink-0"
                :title="`${getSortLabel(isSortOptionObject(sortPrimary) ? sortPrimary.value : sortPrimary)} / ${getSortLabel(isSortOptionObject(sortSecondary) ? sortSecondary.value : sortSecondary)} ratio: ${ratioValue.toFixed(2)}`"
              >
                <span class="hidden sm:inline"
                  >{{
                    getSortLabel(
                      isSortOptionObject(sortPrimary)
                        ? sortPrimary.value
                        : sortPrimary
                    )
                  }}
                  /
                  {{
                    getSortLabel(
                      isSortOptionObject(sortSecondary)
                        ? sortSecondary.value
                        : sortSecondary
                    )
                  }}
                  ratio:&nbsp;{{ ratioValue.toFixed(2) }}</span
                ><span class="sm:hidden"
                  >Ratio:&nbsp;{{ ratioValue.toFixed(2) }}</span
                >
              </span>
            </div>
          </div>

          <!-- Key Stats -->
          <div class="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-sm">
            <div class="flex items-center gap-1 flex-shrink-0">
              <span class="text-gray-600 dark:text-gray-400">Weight:</span>
              <span class="font-semibold text-lg text-gray-900 dark:text-white">
                {{ adjustedTotalWeight.toFixed(1) }}
              </span>
            </div>

            <div class="flex items-center gap-1 flex-shrink-0">
              <span class="text-gray-600 dark:text-gray-400">Poise:</span>
              <span
                class="font-semibold text-lg text-blue-600 dark:text-blue-400"
              >
                {{ (adjustedTotalPoise || 0).toFixed(1) }}
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <div class="flex items-center gap-1 flex-shrink-0">
                <span class="text-blue-600 dark:text-blue-400">Regular:</span>
                <span class="font-semibold text-blue-600 dark:text-blue-400">
                  {{ (props.armorSet.totalDefense?.normal || 0).toFixed(1) }}
                </span>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <span class="text-orange-600 dark:text-orange-400"
                  >Strike:</span
                >
                <span
                  class="font-semibold text-orange-600 dark:text-orange-400"
                >
                  {{ (props.armorSet.totalDefense?.strike || 0).toFixed(1) }}
                </span>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <span class="text-red-600 dark:text-red-400">Slash:</span>
                <span class="font-semibold text-red-600 dark:text-red-400">
                  {{ (props.armorSet.totalDefense?.slash || 0).toFixed(1) }}
                </span>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <span class="text-purple-600 dark:text-purple-400"
                  >Thrust:</span
                >
                <span
                  class="font-semibold text-purple-600 dark:text-purple-400"
                >
                  {{ (props.armorSet.totalDefense?.thrust || 0).toFixed(1) }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <div class="flex items-center gap-1 flex-shrink-0">
                <span class="text-indigo-600 dark:text-indigo-400">Magic:</span>
                <span
                  class="font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  {{ (props.armorSet.totalDefense?.magic || 0).toFixed(1) }}
                </span>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <span class="text-yellow-600 dark:text-yellow-400">Fire:</span>
                <span
                  class="font-semibold text-yellow-600 dark:text-yellow-400"
                >
                  {{ (props.armorSet.totalDefense?.fire || 0).toFixed(1) }}
                </span>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <span class="text-cyan-600 dark:text-cyan-400">Lightning:</span>
                <span class="font-semibold text-cyan-600 dark:text-cyan-400">
                  {{ (props.armorSet.totalDefense?.lightning || 0).toFixed(1) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Expand/Collapse Icon -->
        <Icon
          :name="
            isExpanded ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'
          "
          class="w-5 h-5 text-gray-500 flex-shrink-0"
        />
      </div>
    </div>

    <!-- Expanded Content -->
    <div
      v-if="isExpanded"
      class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
    >
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
                (props.armorSet.totalDefense?.normal || 0).toFixed(1)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-orange-600 dark:text-orange-400">Strike:</span>
              <span
                class="font-semibold text-orange-600 dark:text-orange-400"
                >{{
                  (props.armorSet.totalDefense?.strike || 0).toFixed(1)
                }}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-red-600 dark:text-red-400">Slash:</span>
              <span class="font-semibold text-red-600 dark:text-red-400">{{
                (props.armorSet.totalDefense?.slash || 0).toFixed(1)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-purple-600 dark:text-purple-400">Thrust:</span>
              <span
                class="font-semibold text-purple-600 dark:text-purple-400"
                >{{
                  (props.armorSet.totalDefense?.thrust || 0).toFixed(1)
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
                  (props.armorSet.totalDefense?.magic || 0).toFixed(1)
                }}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-yellow-600 dark:text-yellow-400">Fire:</span>
              <span
                class="font-semibold text-yellow-600 dark:text-yellow-400"
                >{{ (props.armorSet.totalDefense?.fire || 0).toFixed(1) }}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-cyan-600 dark:text-cyan-400">Lightning:</span>
              <span class="font-semibold text-cyan-600 dark:text-cyan-400">{{
                (props.armorSet.totalDefense?.lightning || 0).toFixed(1)
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
                (props.armorSet.totalDefense?.bleed || 0).toFixed(1)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-green-600 dark:text-green-400">Poison:</span>
              <span class="font-semibold text-green-600 dark:text-green-400">{{
                (props.armorSet.totalDefense?.poison || 0).toFixed(1)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-purple-500 dark:text-purple-400">Curse:</span>
              <span
                class="font-semibold text-purple-500 dark:text-purple-400"
                >{{
                  (props.armorSet.totalDefense?.curse || 0).toFixed(1)
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
              <span>{{ adjustedTotalWeight.toFixed(1) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Total Poise:</span>
              <span>{{ (adjustedTotalPoise || 0).toFixed(1) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Total Defense:</span>
              <span>{{ totalDefense.toFixed(1) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Elemental:</span>
              <span>{{ totalElementalDefense.toFixed(1) }}</span>
            </div>
            <div
              v-if="totalStaminaRegenReduction"
              class="text-xs text-yellow-600 dark:text-yellow-400"
            >
              Stamina Regen: -{{ totalStaminaRegenReduction }}
            </div>
            <div v-if="specialEffectsString" class="flex justify-between mt-1">
              <span class="text-xs text-green-600 dark:text-green-400"
                >Special Effects:</span
              >
              <span class="text-xs text-green-600 dark:text-green-400">{{
                specialEffectsString
              }}</span>
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
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div
            v-for="piece in armorPieces"
            :key="piece.slot"
            :class="[
              'p-4 rounded-lg border',
              piece.isDisabled
                ? 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
            ]"
          >
            <!-- Piece Header -->
            <div class="flex items-center justify-between mb-3">
              <span
                :class="[
                  'text-sm font-semibold capitalize',
                  piece.isDisabled
                    ? 'text-gray-500 dark:text-gray-400'
                    : 'text-gray-900 dark:text-white',
                ]"
              >
                {{ piece.slot }}
                <span v-if="piece.isDisabled" class="text-xs ml-1"
                  >(Mask of the Father)</span
                >
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ piece.armor.weight.toFixed(1) }} weight
              </span>
            </div>

            <!-- Piece Name -->
            <div
              :class="[
                'text-sm font-medium mb-3',
                piece.isDisabled
                  ? 'text-gray-500 dark:text-gray-400'
                  : 'text-gray-900 dark:text-white',
              ]"
            >
              {{ piece.armor.name }}
              <span v-if="piece.isDisabled" class="text-xs ml-1 text-gray-400">
                (replaced with Mask of the Father)
              </span>
            </div>

            <!-- Piece Stats -->
            <div class="space-y-2 text-xs">
              <!-- Poise -->
              <div
                v-if="piece.armor.effect?.poise && !piece.isDisabled"
                class="flex justify-between"
              >
                <span class="text-gray-600 dark:text-gray-400">Poise:</span>
                <span class="font-semibold text-blue-600 dark:text-blue-400">
                  {{ piece.armor.effect.poise.toFixed(1) }}
                </span>
              </div>

              <!-- Physical Defense -->
              <div class="space-y-1">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Regular:</span>
                  <span class="font-semibold text-blue-600 dark:text-blue-400">
                    {{ (piece.armor.defense?.normal || 0).toFixed(1) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-orange-600 dark:text-orange-400"
                    >Strike:</span
                  >
                  <span
                    class="font-semibold text-orange-600 dark:text-orange-400"
                  >
                    {{ (piece.armor.defense?.strike || 0).toFixed(1) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-red-600 dark:text-red-400">Slash:</span>
                  <span class="font-semibold text-red-600 dark:text-red-400">
                    {{ (piece.armor.defense?.slash || 0).toFixed(1) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-purple-600 dark:text-purple-400"
                    >Thrust:</span
                  >
                  <span
                    class="font-semibold text-purple-600 dark:text-purple-400"
                  >
                    {{ (piece.armor.defense?.thrust || 0).toFixed(1) }}
                  </span>
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
                  >
                    {{ (piece.armor.defense?.magic || 0).toFixed(1) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-yellow-600 dark:text-yellow-400"
                    >Fire:</span
                  >
                  <span
                    class="font-semibold text-yellow-600 dark:text-yellow-400"
                  >
                    {{ (piece.armor.defense?.fire || 0).toFixed(1) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-cyan-600 dark:text-cyan-400"
                    >Lightning:</span
                  >
                  <span class="font-semibold text-cyan-600 dark:text-cyan-400">
                    {{ (piece.armor.defense?.lightning || 0).toFixed(1) }}
                  </span>
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
                  >
                    {{ (piece.armor.defense?.poison || 0).toFixed(1) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-red-500 dark:text-red-400">Bleed:</span>
                  <span class="font-semibold text-red-500 dark:text-red-400">
                    {{ (piece.armor.defense?.bleed || 0).toFixed(1) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-purple-500 dark:text-purple-400"
                    >Curse:</span
                  >
                  <span
                    class="font-semibold text-purple-500 dark:text-purple-400"
                  >
                    {{ (piece.armor.defense?.curse || 0).toFixed(1) }}
                  </span>
                </div>
                <div
                  v-if="piece.armor.staminaRegenReduction"
                  class="text-xs text-yellow-600 dark:text-yellow-400"
                >
                  Stamina Regen: -{{ piece.armor.staminaRegenReduction }}
                </div>
              </div>
              <div v-if="piece.armor.specialEffect">
                <span class="text-xs text-green-600 dark:text-green-400">{{
                  piece.armor.specialEffect
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
