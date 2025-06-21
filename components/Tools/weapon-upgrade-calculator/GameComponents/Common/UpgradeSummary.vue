///
<reference types="vue/macros" />

<script lang="ts" setup>
import { useUpgradeSummary } from "~/composables/useUpgradeSummary";
import type { UpgradeSummaryProps } from "~/types/game/upgradeSummary";
import { getRandomTheme, ICONS } from "~/utils/constants";
import { watch, toRefs } from "vue";
import { computed } from "vue";
import SummaryCards from "./SummaryCards.vue";
import MaterialsCards from "./MaterialsCards.vue";
import JourneyCard from "./JourneyCard.vue";
import { useSafeTheme } from "~/composables/useSafeTheme";
import type { ColorTheme } from "~/utils/themes/colorSystem";

const props = defineProps<
  UpgradeSummaryProps & {
    selectedTheme?: ColorTheme;
    iconPath?: string;
    selectedMerchantId?: string;
  }
>();

const { materials, steps, selectedMerchantId } = toRefs(props);

const theme = props.selectedTheme || getRandomTheme();
const safeTheme = useSafeTheme(theme);

const {
  selectedMerchant,
  categorizedMaterials,
  purchaseableCost,
  groupedSteps,
  totalPotentialSavings,
} = useUpgradeSummary({
  materials,
  steps,
  selectedMerchantId,
});

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat().format(value);
};
</script>

<template>
  <section class="upgrade-summary mt-6 w-full">
    <UCard>
      <template #header>
        <div class="flex items-center justify-center gap-2">
          <svg
            v-if="ICONS.BOOK_OPEN"
            :class="`w-6 h-6 ${safeTheme.icon}`"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              :d="ICONS.BOOK_OPEN"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
          <h2
            class="text-xl font-semibold text-center text-black dark:text-white"
          >
            Upgrade Summary
          </h2>
        </div>
      </template>

      <div class="flex flex-col w-full">
        <!-- Summary Cards -->
        <SummaryCards
          :souls="props.souls"
          :purchase-cost="purchaseableCost"
          :findable-items-count="
            Object.keys(categorizedMaterials.findable).length
          "
          :theme="safeTheme"
        />

        <!-- Materials Cards -->
        <MaterialsCards
          :purchaseable-materials="{ ...categorizedMaterials.purchaseable }"
          :findable-materials="{ ...categorizedMaterials.findable }"
          :selected-merchant="selectedMerchant"
          :purchaseable-cost="purchaseableCost"
          :total-potential-savings="totalPotentialSavings"
          :theme="safeTheme"
        />

        <!-- Journey Card -->
        <JourneyCard
          :grouped-steps="[...groupedSteps]"
          :steps="[...props.steps]"
          :theme="safeTheme"
          :icon-path="ICONS.ARROW_TRENDING_UP"
        />
      </div>
    </UCard>
  </section>
</template>
