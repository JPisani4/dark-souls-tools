<script lang="ts" setup>
import { formatCurrency } from "~/utils/ui/formatters";
import { computed } from "vue";
import {
  getMaterialColor,
  getMaterialBadgeColor,
} from "~/utils/ui/upgradeColors";
import MaterialBadge from "./MaterialBadge.vue";
import type { Merchant } from "~/types/game/upgradeSummary";
import {
  findAllBetterPrices,
  findMerchantsForMaterial,
} from "~/utils/games/ds1/merchantAnalysis";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";
import Icon from "~/components/Common/Icon.vue";

interface Props {
  purchaseableMaterials: Record<string, number>;
  findableMaterials: Record<string, number>;
  selectedMerchant: Merchant | null;
  purchaseableCost: number;
  totalPotentialSavings: number;
  theme?: ColorTheme;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const safeTheme = useSafeTheme(props.theme, props.variant);

const purchaseableDominantMaterial = Object.keys(
  props.purchaseableMaterials
)[0];
const findableDominantMaterial = Object.keys(props.findableMaterials)[0];

const purchaseableBadge = purchaseableDominantMaterial
  ? getMaterialBadgeColor(purchaseableDominantMaterial)
  : "default";
const findableBadge = findableDominantMaterial
  ? getMaterialBadgeColor(findableDominantMaterial)
  : "default";

// Get better prices for each material
const getBetterPrices = (material: string) => {
  return findAllBetterPrices(material, props.selectedMerchant);
};

// Get all merchants that sell a material
const getMerchantsForMaterial = (material: string) => {
  return findMerchantsForMaterial(material, props.selectedMerchant);
};
</script>

<template>
  <div>
    <div
      :class="[
        'mb-6 w-full',
        Object.keys(purchaseableMaterials).length > 0 &&
        Object.keys(findableMaterials).length > 0
          ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
          : 'flex flex-col md:flex-row gap-6',
      ]"
    >
      <!-- Purchaseable Materials Card -->
      <div v-if="Object.keys(purchaseableMaterials).length > 0" class="flex-1">
        <UCard
          :class="`w-full text-center py-8 px-6 text-2xl border-l-4 ${safeTheme?.border || 'border-l-green-500'}`"
        >
          <template #header>
            <div class="flex flex-col items-center w-full">
              <div class="flex justify-center w-full">
                <h3
                  class="font-semibold flex items-center gap-2 text-center text-black dark:text-white"
                  :class="
                    safeTheme?.icon
                      ? `${safeTheme.icon} bg-opacity-80 bg-white dark:bg-gray-900 rounded-full px-4 py-1`
                      : ''
                  "
                >
                  Purchaseable
                </h3>
              </div>
              <div
                v-if="totalPotentialSavings > 0 && selectedMerchant"
                class="mt-2 flex justify-center"
              >
                <UBadge
                  color="info"
                  variant="soft"
                  size="sm"
                  class="text-sm px-2 py-1"
                >
                  <Icon
                    name="i-heroicons-currency-dollar"
                    class="text-sm mr-1 align-middle"
                  />
                  Save {{ formatCurrency(totalPotentialSavings) }}
                </UBadge>
              </div>
            </div>
          </template>

          <div class="space-y-3">
            <div
              v-for="(qty, material) in purchaseableMaterials"
              :key="material"
              class="p-2 bg-gray-50 dark:bg-gray-800 rounded"
            >
              <!-- Material and Price Row -->
              <div class="flex items-center justify-between mb-2">
                <MaterialBadge
                  :material="material"
                  :quantity="qty"
                  size="md"
                  :show-quantity="true"
                />
                <div
                  v-if="
                    selectedMerchant &&
                    selectedMerchant.materialPrices[material]
                  "
                  class="text-sm text-gray-600 dark:text-gray-400"
                >
                  {{
                    formatCurrency(
                      (selectedMerchant.materialPrices[material] || 0) * qty
                    )
                  }}
                </div>
              </div>

              <!-- Merchant Comparison Info -->
              <div v-if="selectedMerchant" class="text-xs space-y-1">
                <!-- Cheaper at merchants -->
                <div
                  v-if="getBetterPrices(material).length > 0"
                  class="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded"
                >
                  <div class="font-medium mb-1">Cheaper at:</div>
                  <div class="space-y-1">
                    <div
                      v-for="betterPrice in getBetterPrices(material)"
                      :key="betterPrice.merchant.id"
                      class="flex justify-between items-center"
                    >
                      <span class="text-gray-700 dark:text-gray-300">
                        {{ betterPrice.merchant.name }}
                      </span>
                      <div class="text-right">
                        <div
                          class="text-green-700 dark:text-green-300 font-medium"
                        >
                          {{ formatCurrency(betterPrice.price) }}
                        </div>
                        <div class="text-green-600 dark:text-green-400 text-xs">
                          save {{ formatCurrency(betterPrice.savings) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Available for purchase at merchants (only when no merchant selected) -->
              <div v-if="!selectedMerchant" class="text-xs space-y-1">
                <div
                  v-if="getMerchantsForMaterial(material).length > 0"
                  class="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded"
                >
                  <div class="font-medium mb-1">Available for Purchase at:</div>
                  <div class="space-y-1">
                    <div
                      v-for="merchantInfo in getMerchantsForMaterial(material)"
                      :key="merchantInfo.merchant.id"
                      class="flex justify-between items-center"
                    >
                      <span class="text-gray-700 dark:text-gray-300">
                        {{ merchantInfo.merchant.name }}
                      </span>
                      <span
                        class="text-blue-700 dark:text-blue-300 font-medium"
                      >
                        {{ formatCurrency(merchantInfo.price) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Available for purchase at merchants (when selected merchant doesn't sell this material) -->
              <div
                v-if="
                  selectedMerchant && !selectedMerchant.materialPrices[material]
                "
                class="text-xs space-y-1"
              >
                <div
                  v-if="getMerchantsForMaterial(material).length > 0"
                  class="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded"
                >
                  <div class="font-medium mb-1">Available for Purchase at:</div>
                  <div class="space-y-1">
                    <div
                      v-for="merchantInfo in getMerchantsForMaterial(material)"
                      :key="merchantInfo.merchant.id"
                      class="flex justify-between items-center"
                    >
                      <span class="text-gray-700 dark:text-gray-300">
                        {{ merchantInfo.merchant.name }}
                      </span>
                      <span
                        class="text-blue-700 dark:text-blue-300 font-medium"
                      >
                        {{ formatCurrency(merchantInfo.price) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Findable Materials Card -->
      <div v-if="Object.keys(findableMaterials).length > 0" class="flex-1">
        <UCard
          :class="`w-full text-center py-8 px-6 text-2xl border-l-4 ${safeTheme?.border || 'border-l-orange-500'}`"
        >
          <template #header>
            <div class="flex justify-center w-full">
              <h3
                class="font-semibold flex items-center gap-2 text-center text-black dark:text-white"
                :class="
                  safeTheme?.icon
                    ? `${safeTheme.icon} bg-opacity-80 bg-white dark:bg-gray-900 rounded-full px-4 py-1`
                    : ''
                "
              >
                Unavailable for Purchase
              </h3>
            </div>
          </template>

          <div class="space-y-3">
            <div
              v-for="(qty, material) in findableMaterials"
              :key="material"
              class="flex items-center justify-center p-2 bg-gray-50 dark:bg-gray-800 rounded"
            >
              <MaterialBadge
                :material="material"
                :quantity="qty"
                size="md"
                :show-quantity="true"
              />
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
