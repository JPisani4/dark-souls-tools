///
<reference types="vue/macros" />

<script lang="ts" setup>
import { useUpgradeSummary } from "~/composables/useUpgradeSummary";
import type { UpgradeSummaryProps } from "~/types/upgradeSummary";
import { getRandomTheme, ICONS } from "~/utils/constants";
import { watch, toRefs } from "vue";

const props = defineProps<
  UpgradeSummaryProps & {
    selectedTheme?: any;
    iconPath?: string;
    selectedMerchantId?: string;
  }
>();

const { materials, steps, selectedMerchantId } = toRefs(props);

const theme = props.selectedTheme || getRandomTheme();

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
</script>

<template>
  <section class="upgrade-summary mt-6 max-w-5xl mx-auto">
    <UCard>
      <template #header>
        <div class="flex items-center justify-center gap-2">
          <svg
            v-if="ICONS.BOOK_OPEN"
            :class="`w-6 h-6 ${theme.icon}`"
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

      <div class="flex flex-col items-center w-full">
        <!-- Summary Cards -->
        <SummaryCards
          :souls="props.souls"
          :purchase-cost="purchaseableCost"
          :findable-items-count="
            Object.keys(categorizedMaterials.findable).length
          "
          :theme="theme"
        />

        <!-- Materials Cards -->
        <MaterialsCards
          :purchaseable-materials="{ ...categorizedMaterials.purchaseable }"
          :findable-materials="{ ...categorizedMaterials.findable }"
          :selected-merchant="selectedMerchant"
          :purchaseable-cost="purchaseableCost"
          :total-potential-savings="totalPotentialSavings"
          :theme="theme"
        />

        <!-- Journey Card -->
        <JourneyCard
          :grouped-steps="[...groupedSteps]"
          :steps="[...props.steps]"
          :theme="theme"
          :icon-path="ICONS.ARROW_TRENDING_UP"
        />
      </div>
    </UCard>
  </section>
</template>
