<script lang="ts" setup>
import { getMaterialColor, getMaterialBadgeColor } from "~/utils/upgradeColors";
import { formatMaterialName, formatNumber } from "~/utils/formatters";
import {
  findMerchantsForMaterial,
  getMaterialSavings,
} from "~/utils/merchantAnalysis";
import { formatMerchantList, formatBetterMerchants } from "~/utils/formatters";
import type { Merchant } from "~/types/upgradeSummary";

interface Props {
  material: string;
  quantity: number;
  selectedMerchant: Merchant | null;
  variant?: "purchaseable" | "findable";
  showPrice?: boolean;
  inlineQuantity?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "purchaseable",
  showPrice: true,
  inlineQuantity: false,
});

const hasBetterPrices = computed(
  () =>
    props.variant === "purchaseable" &&
    getMaterialSavings(props.material, props.quantity, props.selectedMerchant)
);

const hasMerchants = computed(
  () =>
    props.variant === "findable" &&
    findMerchantsForMaterial(props.material, props.selectedMerchant).length > 0
);

const showAllMerchantsForPurchase = computed(
  () => props.variant === "purchaseable" && !props.selectedMerchant
);
const allMerchants = computed(() =>
  showAllMerchantsForPurchase.value
    ? findMerchantsForMaterial(props.material, null)
    : []
);

const showOtherMerchants = computed(() => {
  if (!props.selectedMerchant) return false;
  // If the selected merchant does not sell this material
  const selectedPrice = props.selectedMerchant.materialPrices[props.material];
  if (selectedPrice) return false;
  // Find all other merchants who do sell it
  const others = findMerchantsForMaterial(props.material, null).filter(
    (m) => m.merchant.id !== props.selectedMerchant?.id
  );
  return others.length > 0;
});
const otherMerchants = computed(() =>
  findMerchantsForMaterial(props.material, null).filter(
    (m) => m.merchant.id !== props.selectedMerchant?.id
  )
);

const BADGE_BG_MAP: Record<string, string> = {
  warning: "bg-yellow-50 dark:bg-yellow-900/20",
  success: "bg-green-50 dark:bg-green-900/20",
  info: "bg-blue-50 dark:bg-blue-900/20",
  error: "bg-red-50 dark:bg-red-900/20",
  neutral: "bg-gray-50 dark:bg-gray-800",
  secondary: "bg-purple-50 dark:bg-purple-900/20",
  default: "bg-gray-50 dark:bg-gray-800",
};

const badgeColor = getMaterialBadgeColor(props.material);
const bgClass = BADGE_BG_MAP[badgeColor] || BADGE_BG_MAP.default;
</script>

<template>
  <div class="p-2 rounded-lg" :class="bgClass">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
      <span
        :class="getMaterialColor(props.material) + ' text-base'"
        class="font-medium flex items-center"
      >
        {{ formatMaterialName(props.material) }}
        <template v-if="props.inlineQuantity">
          <UBadge color="neutral" variant="soft" size="sm" class="ml-2">
            ×{{ props.quantity }}
          </UBadge>
        </template>
      </span>
      <template v-if="!props.inlineQuantity">
        <UBadge color="neutral" variant="soft" size="sm">
          ×{{ props.quantity }}
        </UBadge>
      </template>
      <span
        v-if="
          props.showPrice &&
          props.selectedMerchant &&
          (props.selectedMerchant.materialPrices[props.material] ?? 0) > 0
        "
        class="text-sm text-gray-600 dark:text-gray-400"
      >
        {{
          formatNumber(
            props.selectedMerchant.materialPrices[props.material] ?? 0
          )
        }}
        each
      </span>
    </div>

    <!-- Show all merchants and prices if no merchant is selected -->
    <div
      v-if="showAllMerchantsForPurchase && allMerchants.length > 0"
      class="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded mt-2 text-center"
    >
      <div>
        <span class="font-semibold flex items-center gap-1 justify-center">
          <UIcon name="i-heroicons-light-bulb" class="text-base" />
          Available for purchase from:
        </span>
      </div>
      <ul class="list-disc pl-6 mt-1 text-left mx-auto max-w-xs">
        <li v-for="m in allMerchants" :key="m.merchant.name">
          {{ m.merchant.name.trim() }} ({{ formatNumber(m.price) }})
        </li>
      </ul>
    </div>

    <!-- Show all merchants and prices if selected merchant does not sell this material -->
    <div
      v-if="showOtherMerchants && otherMerchants.length > 0"
      class="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded mt-2 text-center"
    >
      <div>
        <span class="font-semibold flex items-center gap-1 justify-center">
          <UIcon name="i-heroicons-light-bulb" class="text-base" />
          Available for purchase from:
        </span>
      </div>
      <ul class="list-disc pl-6 mt-1 text-left mx-auto max-w-xs">
        <li v-for="m in otherMerchants" :key="m.merchant.name">
          {{ m.merchant.name.trim() }} ({{ formatNumber(m.price) }})
        </li>
      </ul>
    </div>

    <!-- Better prices info -->
    <div
      v-if="hasBetterPrices"
      class="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded mt-2"
    >
      <div class="text-center">
        <span class="font-semibold flex items-center gap-1 justify-center">
          <UIcon name="i-heroicons-light-bulb" class="text-base" />
          Cheaper at:
        </span>
      </div>
      <div class="flex justify-center">
        <ul class="list-disc pl-6 mt-1">
          <li
            v-for="m in getMaterialSavings(
              props.material,
              props.quantity,
              props.selectedMerchant
            )?.betterMerchants || []"
            :key="m.merchant.name"
          >
            {{ m.merchant.name.trim() }} ({{ formatNumber(m.price) }})
          </li>
        </ul>
      </div>
    </div>

    <!-- Available merchants info (if merchant is selected, original logic) -->
    <div
      v-if="hasMerchants"
      class="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded"
    >
      💰 Buy from:
      {{
        formatMerchantList(
          findMerchantsForMaterial(props.material, props.selectedMerchant)
        )
      }}
    </div>
  </div>
</template>
