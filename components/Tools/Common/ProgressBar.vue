<template>
  <div class="w-full">
    <div
      class="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5"
      role="progressbar"
      :aria-valuenow="value"
      :aria-valuemin="0"
      :aria-valuemax="100"
      :aria-label="ariaLabel || `${value}% complete`"
    >
      <div
        :class="['h-2.5 rounded-full transition-all', colorClass]"
        :style="{ width: value + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  value: number;
  label?: string;
  color?: string;
  ariaLabel?: string;
}
const props = withDefaults(defineProps<Props>(), {
  color: "bg-primary-500",
  ariaLabel: "",
});
const colorClass = computed(() => props.color || "bg-primary-500");
</script>

<style scoped></style>
