<template>
  <div class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <!-- Ninja Flip -->
      <div
        class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800"
      >
        <div class="flex items-center gap-2 mb-2">
          <Icon
            name="i-heroicons-arrow-up"
            class="w-4 h-4 text-purple-600 dark:text-purple-400"
          />
          <span class="text-sm font-medium text-purple-800 dark:text-purple-200"
            >Ninja Flip</span
          >
        </div>
        <p class="text-xs text-purple-700 dark:text-purple-300 mb-2">
          Fastest roll with most invincibility frames. Requires Dark Wood Grain
          Ring and ≤25% equip load.
        </p>
        <div class="text-xs text-purple-600 dark:text-purple-400 space-y-1">
          <div>
            <span class="font-medium">0%:</span> 19 frames total, 8 recovery
          </div>
          <div>
            <span class="font-medium">8.3%:</span> 20 frames total, 7 recovery
          </div>
          <div>
            <span class="font-medium">16.6%:</span> 21 frames total, 8 recovery
          </div>
          <div>
            <span class="font-medium">25%:</span> 22 frames total, 9 recovery
          </div>
        </div>
      </div>

      <!-- Fast Roll -->
      <div
        class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800"
      >
        <div class="flex items-center gap-2 mb-2">
          <Icon
            name="i-heroicons-arrow-up"
            class="w-4 h-4 text-green-600 dark:text-green-400"
          />
          <span class="text-sm font-medium text-green-800 dark:text-green-200"
            >Fast Roll</span
          >
        </div>
        <p class="text-xs text-green-700 dark:text-green-300 mb-2">
          Quick roll with good invincibility frames. Best for evading attacks.
          Requires ≤25% equip load.
        </p>
        <div class="text-xs text-green-600 dark:text-green-400 space-y-1">
          <div>
            <span class="font-medium">0%:</span> 21 frames total, 3 recovery
          </div>
          <div>
            <span class="font-medium">8.3%:</span> 22 frames total, 3 recovery
          </div>
          <div>
            <span class="font-medium">16.6%:</span> 23 frames total, 4 recovery
          </div>
          <div>
            <span class="font-medium">25%:</span> 24 frames total, 5 recovery
          </div>
        </div>
      </div>

      <!-- Mid Roll -->
      <div
        class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800"
      >
        <div class="flex items-center gap-2 mb-2">
          <Icon
            name="i-heroicons-minus"
            class="w-4 h-4 text-yellow-600 dark:text-yellow-400"
          />
          <span class="text-sm font-medium text-yellow-800 dark:text-yellow-200"
            >Mid Roll</span
          >
        </div>
        <p class="text-xs text-yellow-700 dark:text-yellow-300 mb-2">
          Medium speed roll with good invincibility frames. Balanced option.
          Requires 33.3-50% equip load.
        </p>
        <div class="text-xs text-yellow-600 dark:text-yellow-400 space-y-1">
          <div>
            <span class="font-medium">33.3%:</span> 31 frames total, 6 recovery
          </div>
          <div>
            <span class="font-medium">41.6%:</span> 32 frames total, 7 recovery
          </div>
          <div>
            <span class="font-medium">50%:</span> 33 frames total, 8 recovery
          </div>
        </div>
      </div>

      <!-- Fat Roll -->
      <div
        class="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800"
      >
        <div class="flex items-center gap-2 mb-2">
          <Icon
            name="i-heroicons-arrow-down"
            class="w-4 h-4 text-red-600 dark:text-red-400"
          />
          <span class="text-sm font-medium text-red-800 dark:text-red-200"
            >Fat Roll</span
          >
        </div>
        <p class="text-xs text-red-700 dark:text-red-300 mb-2">
          Slow roll with fewer invincibility frames. Poor for evasion. Occurs at
          >66.6% equip load.
        </p>
        <div class="text-xs text-red-600 dark:text-red-400 space-y-1">
          <div>
            <span class="font-medium">66.6%:</span> 46 frames total, 10 recovery
          </div>
          <div>
            <span class="font-medium">83.3%:</span> 47 frames total, 11 recovery
          </div>
          <div>
            <span class="font-medium">100%:</span> 48 frames total, 12 recovery
          </div>
        </div>
      </div>
    </div>

    <!-- Frame Explanation -->
    <div
      class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800"
    >
      <h5 class="text-xs font-medium text-blue-700 dark:text-blue-300 mb-2">
        Frame Breakdown:
      </h5>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-600 dark:text-blue-400"
      >
        <div>
          <span class="font-medium">Invincibility Frames:</span> Time during
          roll where you can't be hit
        </div>
        <div>
          <span class="font-medium">Recovery Frames:</span> Time after roll
          where you're vulnerable
        </div>
        <div>
          <span class="font-medium">Total Frames:</span> Complete animation
          duration
        </div>
        <div>
          <span class="font-medium">Lower % = Better:</span> Less equip load
          means faster recovery
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";
</script>
