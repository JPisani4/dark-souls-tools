<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";
import { useArmorDisplayTheme } from "~/composables/useArmorDisplayTheme";

interface Props {
  armor: any;
  isExpanded?: boolean;
  isSelected?: boolean;
  showCheckbox?: boolean;
  sortPrimary?: string;
  sortSecondary?: string;
  onToggleExpansion?: () => void;
  onToggleSelection?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  isExpanded: false,
  isSelected: false,
  showCheckbox: true,
  sortPrimary: "poise",
  sortSecondary: "weight",
});

const emit = defineEmits<{
  toggleExpansion: [];
  toggleSelection: [];
}>();

const { defenseColors, statColors, cardStyles } = useArmorDisplayTheme();

const handleToggleExpansion = () => {
  emit("toggleExpansion");
};

const handleToggleSelection = () => {
  emit("toggleSelection");
};

// Calculate ratio based on sort values
const calculateRatio = (
  armor: any,
  primary: string | { label: string; value: string },
  secondary: string | { label: string; value: string }
): number => {
  // Defensive: extract .value if object
  const getKey = (k: any) =>
    typeof k === "object" && k !== null && "value" in k ? k.value : k;
  primary = getKey(primary);
  secondary = getKey(secondary);

  if (!armor || armor.weight === 0) return 0;

  let primaryValue = 0;
  let secondaryValue = 0;

  // Calculate primary value
  switch (primary) {
    case "poise":
      primaryValue = armor.effect?.poise || 0;
      break;
    case "weight":
      primaryValue = armor.weight;
      break;
    case "totalDefense":
      primaryValue =
        (armor.defense?.normal || 0) +
        (armor.defense?.strike || 0) +
        (armor.defense?.slash || 0) +
        (armor.defense?.thrust || 0);
      break;
    case "regularDefense":
      primaryValue = armor.defense?.normal || 0;
      break;
    case "strikeDefense":
      primaryValue = armor.defense?.strike || 0;
      break;
    case "slashDefense":
      primaryValue = armor.defense?.slash || 0;
      break;
    case "thrustDefense":
      primaryValue = armor.defense?.thrust || 0;
      break;
    case "physical":
      primaryValue =
        (armor.defense?.normal || 0) +
        (armor.defense?.strike || 0) +
        (armor.defense?.slash || 0) +
        (armor.defense?.thrust || 0);
      break;
    case "physicalDefense":
      primaryValue = armor.defense?.normal || 0;
      break;
    case "magicDefense":
      primaryValue = armor.defense?.magic || 0;
      break;
    case "fireDefense":
      primaryValue = armor.defense?.fire || 0;
      break;
    case "lightningDefense":
      primaryValue = armor.defense?.lightning || 0;
      break;
    case "elemental":
      primaryValue =
        (armor.defense?.magic || 0) +
        (armor.defense?.fire || 0) +
        (armor.defense?.lightning || 0);
      break;
    case "elementalDefense":
      primaryValue =
        (armor.defense?.magic || 0) +
        (armor.defense?.fire || 0) +
        (armor.defense?.lightning || 0);
      break;
    case "bleedResistance":
      primaryValue = armor.defense?.bleed || 0;
      break;
    case "poisonResistance":
      primaryValue = armor.defense?.poison || 0;
      break;
    case "curseResistance":
      primaryValue = armor.defense?.curse || 0;
      break;
    case "status":
      primaryValue =
        (armor.defense?.bleed || 0) +
        (armor.defense?.poison || 0) +
        (armor.defense?.curse || 0);
      break;
    case "statusResistance":
      primaryValue =
        (armor.defense?.bleed || 0) +
        (armor.defense?.poison || 0) +
        (armor.defense?.curse || 0);
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
      secondaryValue = armor.effect?.poise || 0;
      break;
    case "weight":
      secondaryValue = armor.weight;
      break;
    case "totalDefense":
      secondaryValue =
        (armor.defense?.normal || 0) +
        (armor.defense?.strike || 0) +
        (armor.defense?.slash || 0) +
        (armor.defense?.thrust || 0);
      break;
    case "regularDefense":
      secondaryValue = armor.defense?.normal || 0;
      break;
    case "strikeDefense":
      secondaryValue = armor.defense?.strike || 0;
      break;
    case "slashDefense":
      secondaryValue = armor.defense?.slash || 0;
      break;
    case "thrustDefense":
      secondaryValue = armor.defense?.thrust || 0;
      break;
    case "physical":
      secondaryValue =
        (armor.defense?.normal || 0) +
        (armor.defense?.strike || 0) +
        (armor.defense?.slash || 0) +
        (armor.defense?.thrust || 0);
      break;
    case "physicalDefense":
      secondaryValue = armor.defense?.normal || 0;
      break;
    case "magicDefense":
      secondaryValue = armor.defense?.magic || 0;
      break;
    case "fireDefense":
      secondaryValue = armor.defense?.fire || 0;
      break;
    case "lightningDefense":
      secondaryValue = armor.defense?.lightning || 0;
      break;
    case "elemental":
      secondaryValue =
        (armor.defense?.magic || 0) +
        (armor.defense?.fire || 0) +
        (armor.defense?.lightning || 0);
      break;
    case "elementalDefense":
      secondaryValue =
        (armor.defense?.magic || 0) +
        (armor.defense?.fire || 0) +
        (armor.defense?.lightning || 0);
      break;
    case "bleedResistance":
      secondaryValue = armor.defense?.bleed || 0;
      break;
    case "poisonResistance":
      secondaryValue = armor.defense?.poison || 0;
      break;
    case "curseResistance":
      secondaryValue = armor.defense?.curse || 0;
      break;
    case "status":
      secondaryValue =
        (armor.defense?.bleed || 0) +
        (armor.defense?.poison || 0) +
        (armor.defense?.curse || 0);
      break;
    case "statusResistance":
      secondaryValue =
        (armor.defense?.bleed || 0) +
        (armor.defense?.poison || 0) +
        (armor.defense?.curse || 0);
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
</script>

<template>
  <div
    :class="[
      cardStyles.base,
      props.isExpanded && cardStyles.expanded,
      props.isSelected && cardStyles.selected,
    ]"
  >
    <!-- Main Armor Info - Clickable Section -->
    <div
      class="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded p-2 -m-2 transition-colors"
      @click="handleToggleExpansion"
    >
      <div class="flex-1 min-w-0">
        <div class="flex items-start gap-2 sm:gap-3">
          <input
            v-if="showCheckbox"
            type="checkbox"
            :checked="isSelected"
            @change="handleToggleSelection"
            @click.stop
            class="w-4 h-4 text-primary flex-shrink-0 mt-1"
          />
          <div class="flex-1 min-w-0">
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <h5
                class="text-lg font-semibold text-gray-900 dark:text-white truncate"
              >
                {{ armor.name }}
              </h5>
              <!-- Ratio Badge -->
              <span
                v-if="
                  sortPrimary &&
                  sortSecondary &&
                  sortSecondary !== '' &&
                  sortSecondary !== 'none'
                "
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 flex-shrink-0"
                :title="`${getSortLabel(isSortOptionObject(sortPrimary) ? sortPrimary.value : sortPrimary)} / ${getSortLabel(isSortOptionObject(sortSecondary) ? sortSecondary.value : sortSecondary)} ratio: ${calculateRatio(armor, isSortOptionObject(sortPrimary) ? sortPrimary.value : sortPrimary, isSortOptionObject(sortSecondary) ? sortSecondary.value : sortSecondary).toFixed(2)}`"
              >
                <span class="hidden sm:inline">
                  {{
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
                  ratio:
                </span>
                <span class="sm:hidden">Ratio:</span>
                {{
                  calculateRatio(
                    armor,
                    isSortOptionObject(sortPrimary)
                      ? sortPrimary.value
                      : sortPrimary,
                    isSortOptionObject(sortSecondary)
                      ? sortSecondary.value
                      : sortSecondary
                  ).toFixed(2)
                }}
              </span>
            </div>

            <!-- Key Stats -->
            <div
              class="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-sm"
            >
              <div class="flex items-center gap-1 flex-shrink-0">
                <span class="text-gray-600 dark:text-gray-400">Weight:</span>
                <span :class="`font-semibold text-lg ${statColors.weight}`">
                  {{ armor.weight }}
                </span>
              </div>

              <div class="flex items-center gap-1 flex-shrink-0">
                <span class="text-gray-600 dark:text-gray-400">Poise:</span>
                <span :class="`font-semibold text-lg ${statColors.poise}`">
                  {{ armor.effect?.poise || 0 }}
                </span>
              </div>

              <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                <div class="flex items-center gap-1 flex-shrink-0">
                  <span class="text-gray-600 dark:text-gray-400">Regular:</span>
                  <span :class="`font-semibold ${defenseColors.normal}`">
                    {{ armor.defense?.normal || 0 }}
                  </span>
                </div>
                <div class="flex items-center gap-1 flex-shrink-0">
                  <span :class="`${defenseColors.strike}`">Strike:</span>
                  <span :class="`font-semibold ${defenseColors.strike}`">
                    {{ armor.defense?.strike || 0 }}
                  </span>
                </div>
                <div class="flex items-center gap-1 flex-shrink-0">
                  <span :class="`${defenseColors.slash}`">Slash:</span>
                  <span :class="`font-semibold ${defenseColors.slash}`">
                    {{ armor.defense?.slash || 0 }}
                  </span>
                </div>
                <div class="flex items-center gap-1 flex-shrink-0">
                  <span :class="`${defenseColors.thrust}`">Thrust:</span>
                  <span :class="`font-semibold ${defenseColors.thrust}`">
                    {{ armor.defense?.thrust || 0 }}
                  </span>
                </div>
              </div>
              <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                <div class="flex items-center gap-1 flex-shrink-0">
                  <span :class="`${defenseColors.magic}`">Magic:</span>
                  <span :class="`font-semibold ${defenseColors.magic}`">
                    {{ armor.defense?.magic || 0 }}
                  </span>
                </div>
                <div class="flex items-center gap-1 flex-shrink-0">
                  <span :class="`${defenseColors.fire}`">Fire:</span>
                  <span :class="`font-semibold ${defenseColors.fire}`">
                    {{ armor.defense?.fire || 0 }}
                  </span>
                </div>
                <div class="flex items-center gap-1 flex-shrink-0">
                  <span :class="`${defenseColors.lightning}`">Lightning:</span>
                  <span :class="`font-semibold ${defenseColors.lightning}`">
                    {{ armor.defense?.lightning || 0 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expand Button -->
      <div class="flex items-center gap-3 flex-shrink-0">
        <Icon
          :name="
            isExpanded ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'
          "
          class="w-4 h-4 text-gray-500"
        />
      </div>
    </div>

    <!-- Expanded Details -->
    <div
      v-if="isExpanded"
      class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
    >
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
              <span :class="`font-semibold ${defenseColors.normal}`">
                {{ armor.defense?.normal || 0 }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <span :class="`${defenseColors.magic}`">Magic:</span>
              <span :class="`font-semibold ${defenseColors.magic}`">
                {{ armor.defense?.magic || 0 }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <span :class="`${defenseColors.bleed}`">Bleed:</span>
              <span :class="`font-semibold ${defenseColors.bleed}`">
                {{ armor.defense?.bleed || 0 }}
              </span>
            </div>

            <!-- Row 2: Strike | Fire | Poison -->
            <div class="flex items-center gap-1">
              <span :class="`${defenseColors.strike}`">Strike:</span>
              <span :class="`font-semibold ${defenseColors.strike}`">
                {{ armor.defense?.strike || 0 }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <span :class="`${defenseColors.fire}`">Fire:</span>
              <span :class="`font-semibold ${defenseColors.fire}`">
                {{ armor.defense?.fire || 0 }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <span :class="`${defenseColors.poison}`">Poison:</span>
              <span :class="`font-semibold ${defenseColors.poison}`">
                {{ armor.defense?.poison || 0 }}
              </span>
            </div>

            <!-- Row 3: Slash | Lightning | Curse -->
            <div class="flex items-center gap-1">
              <span :class="`${defenseColors.slash}`">Slash:</span>
              <span :class="`font-semibold ${defenseColors.slash}`">
                {{ armor.defense?.slash || 0 }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <span :class="`${defenseColors.lightning}`">Lightning:</span>
              <span :class="`font-semibold ${defenseColors.lightning}`">
                {{ armor.defense?.lightning || 0 }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <span :class="`${defenseColors.curse}`">Curse:</span>
              <span :class="`font-semibold ${defenseColors.curse}`">
                {{ armor.defense?.curse || 0 }}
              </span>
            </div>

            <!-- Row 4: Thrust | empty | empty -->
            <div class="flex items-center gap-1">
              <span :class="`${defenseColors.thrust}`">Thrust:</span>
              <span :class="`font-semibold ${defenseColors.thrust}`">
                {{ armor.defense?.thrust || 0 }}
              </span>
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
            <div>Weight: {{ armor.weight }}</div>
            <div v-if="armor.effect?.poise">
              Poise: {{ armor.effect.poise }}
            </div>
            <div v-if="armor.armorType">
              Type: {{ armor.armorType.replace("-", " ") }}
            </div>
            <div v-if="armor.upgradePath">
              Upgrade Path: {{ armor.upgradePath }}
            </div>
            <div v-if="armor.upgradedLevel">
              Upgrade Level: +{{ armor.upgradedLevel }}
            </div>
            <div v-if="armor.effect?.special">
              Special: {{ armor.effect.special }}
            </div>
            <div v-if="armor.effect?.description">
              Effect: {{ armor.effect.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
