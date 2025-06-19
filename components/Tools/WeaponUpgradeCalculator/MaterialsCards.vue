<script lang="ts" setup>
import { formatCurrency } from "~/utils/formatters";
import type { Merchant } from "~/types/upgradeSummary";
import { getMaterialColor, getMaterialBadgeColor } from "~/utils/upgradeColors";

interface Props {
  purchaseableMaterials: Record<string, number>;
  findableMaterials: Record<string, number>;
  selectedMerchant: Merchant | null;
  purchaseableCost: number;
  totalPotentialSavings: number;
  theme?: any;
}

const props = defineProps<Props>();

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
</script>

<template>
  <div>
    <div
      :class="[
        'mb-6 max-w-2xl mx-auto',
        Object.keys(purchaseableMaterials).length > 0 &&
        Object.keys(findableMaterials).length > 0
          ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
          : 'flex justify-center',
      ]"
    >
      <!-- Purchaseable Materials Card -->
      <UCard
        v-if="Object.keys(purchaseableMaterials).length > 0"
        :class="`w-full text-center py-8 px-6 text-2xl border-l-4 ${theme?.icon || 'border-l-green-500'}`"
      >
        <template #header>
          <div class="flex flex-col items-center w-full">
            <div class="flex justify-center w-full">
              <h3
                class="font-semibold flex items-center gap-2 text-center text-black dark:text-white"
                :class="
                  theme?.icon
                    ? `${theme.icon} bg-opacity-80 bg-white dark:bg-gray-900 rounded-full px-4 py-1`
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
                <UIcon
                  name="i-heroicons-currency-dollar"
                  class="text-sm mr-1 align-middle"
                />
                Save {{ formatCurrency(totalPotentialSavings) }}
              </UBadge>
            </div>
          </div>
        </template>

        <div class="space-y-3">
          <MaterialItem
            v-for="(qty, material) in purchaseableMaterials"
            :key="material"
            :material="material"
            :quantity="qty"
            :selected-merchant="selectedMerchant ? selectedMerchant : null"
            variant="purchaseable"
            :show-price="true"
          />
        </div>
      </UCard>

      <!-- Findable Materials Card -->
      <UCard
        v-if="Object.keys(findableMaterials).length > 0"
        :class="`w-full text-center py-8 px-6 text-2xl border-l-4 ${theme?.icon || 'border-l-orange-500'}`"
      >
        <template #header>
          <div class="flex justify-center w-full">
            <h3
              class="font-semibold flex items-center gap-2 text-center text-black dark:text-white"
              :class="
                theme?.icon
                  ? `${theme.icon} bg-opacity-80 bg-white dark:bg-gray-900 rounded-full px-4 py-1`
                  : ''
              "
            >
              Unavailable for Purchase
            </h3>
          </div>
        </template>

        <div class="space-y-3">
          <MaterialItem
            v-for="(qty, material) in findableMaterials"
            :key="material"
            :material="material"
            :quantity="qty"
            :selected-merchant="selectedMerchant"
            variant="findable"
            :show-price="false"
            inline-quantity
          />
        </div>
      </UCard>
    </div>
  </div>
</template>
