<script lang="ts" setup>
/// <reference types="vue/macros" />

interface Props {
  souls: number;
  purchaseCost?: number;
  findableItemsCount: number;
  theme?: any;
}

const props = defineProps<Props>();

const formatNumber = (num: number): string => num.toLocaleString();
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full max-w-2xl mx-auto place-items-center"
  >
    <UCard
      :class="`w-full max-w-2xl mx-auto text-center py-8 px-6 text-2xl border-l-4 ${props.theme?.icon || 'border-blue-500'}`"
    >
      <div
        class="inline-block rounded-full px-4 py-1 mb-2 font-semibold text-black dark:text-white"
        :class="props.theme?.icon ? `${props.theme.icon} bg-opacity-80` : ''"
      >
        Reinforcement Cost
      </div>
      <div class="text-3xl font-extrabold mb-1" :class="props.theme?.icon">
        {{ formatNumber(props.souls) }}
      </div>
      <div class="text-base font-medium mb-2 text-black/60 dark:text-white/70">
        Souls
      </div>
    </UCard>
    <UCard
      :class="`w-full max-w-2xl mx-auto text-center py-8 px-6 text-2xl border-l-4 ${props.theme?.icon || 'border-green-500'}`"
    >
      <div
        class="inline-block rounded-full px-4 py-1 mb-2 font-semibold text-black dark:text-white"
        :class="props.theme?.icon ? `${props.theme.icon} bg-opacity-80` : ''"
      >
        Upgrade Material Cost
      </div>
      <div class="text-3xl font-extrabold mb-1" :class="props.theme?.icon">
        {{ formatNumber(props.purchaseCost ?? 0) }}
      </div>
      <div class="text-base font-medium mb-2 text-black/60 dark:text-white/70">
        Souls
      </div>
    </UCard>
  </div>
</template>
