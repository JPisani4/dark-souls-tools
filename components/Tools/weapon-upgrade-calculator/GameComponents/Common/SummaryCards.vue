<script lang="ts" setup>
import SummaryCard from "../../../Common/display/SummaryCard.vue";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";

interface Props {
  souls: number;
  purchaseCost: number;
  findableItemsCount: number;
  theme?: ColorTheme;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const safeTheme = useSafeTheme(props.theme, props.variant);

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat().format(value);
};
</script>

<template>
  <div
    :class="[
      'mb-8 w-full',
      props.souls > 0 && (props.purchaseCost ?? 0) > 0
        ? 'grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch'
        : 'flex flex-col md:flex-row gap-6',
    ]"
  >
    <!-- Reinforcement Cost -->
    <div
      v-if="props.souls > 0"
      :class="[
        props.souls > 0 && (props.purchaseCost ?? 0) > 0 ? 'h-full' : 'flex-1',
      ]"
    >
      <SummaryCard
        label="Reinforcement Cost"
        :value="props.souls"
        unit="Souls"
        :theme="safeTheme"
        icon="i-heroicons-wrench-screwdriver"
        icon-size="w-10 h-10"
        :class="[
          'h-full',
          props.souls > 0 && (props.purchaseCost ?? 0) > 0 ? '' : 'w-full',
        ]"
      />
    </div>

    <!-- Material Cost -->
    <div
      v-if="(props.purchaseCost ?? 0) > 0"
      :class="[
        props.souls > 0 && (props.purchaseCost ?? 0) > 0 ? 'h-full' : 'flex-1',
      ]"
    >
      <SummaryCard
        label="Material Cost"
        :value="props.purchaseCost ?? 0"
        unit="Souls"
        :theme="safeTheme"
        icon="/weapon-upgrade-calculator-icon.webp"
        icon-size="w-10 h-10"
        :class="[
          'h-full',
          props.souls > 0 && (props.purchaseCost ?? 0) > 0 ? '' : 'w-full',
        ]"
      />
    </div>
  </div>
</template>
