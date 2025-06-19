<script lang="ts" setup>
import { getPathColor, cleanPathName } from "~/utils/upgradeColors";
import { formatNumber, formatStepDescription } from "~/utils/formatters";
import type { Step, GroupedStep } from "~/types/upgradeSummary";
import { computed } from "vue";

interface Props {
  step: Step | GroupedStep;
  index: number;
  showMaterials?: boolean;
  variant?: "summary" | "detailed";
}

const props = withDefaults(defineProps<Props>(), {
  showMaterials: true,
  variant: "summary",
});

const isGroupedStep = (step: Step | GroupedStep): step is GroupedStep =>
  "totalSouls" in step;

const getStepSouls = (step: Step | GroupedStep): number =>
  isGroupedStep(step) ? step.totalSouls : step.souls;

const reinforceSummary = computed(() => {
  if (props.step.type !== "reinforce") return "";
  const path = props.step.pathName ? `${props.step.pathName}: ` : "";
  const from = `+${props.step.from}`;
  const to = `+${props.step.to}`;
  const count =
    isGroupedStep(props.step) && props.step.count && props.step.count > 1
      ? `${props.step.count} steps, `
      : "";
  const souls = `${formatNumber(getStepSouls(props.step))} souls`;
  return `Reinforce ${path}${from} → ${to} (${count}${souls})`;
});
</script>

<template>
  <div class="flex items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
    <UBadge color="neutral" variant="soft" size="sm" class="mr-3">
      {{ props.index + 1 }}
    </UBadge>
    <span class="text-sm">
      <template v-if="props.step.type === 'reinforce'">
        Reinforce
        <span
          v-if="props.step.pathName"
          :class="getPathColor(props.step.pathName)"
        >
          {{ cleanPathName(props.step.pathName) }}
        </span>
        <span v-else :class="getPathColor('Regular')">Regular</span>
        +{{ props.step.from }} to +{{ props.step.to }}
        <UBadge
          v-if="
            isGroupedStep(props.step) &&
            props.step.count &&
            props.step.count > 1
          "
          color="neutral"
          variant="soft"
          size="sm"
          class="ml-1"
        >
          ×{{ props.step.count }}
        </UBadge>
      </template>
      <template v-else-if="props.step.type === 'ascend'">
        Ascend from
        <span :class="getPathColor(props.step.fromPathName)">{{
          cleanPathName(props.step.fromPathName)
        }}</span>
        +{{ props.step.from }} to
        <span :class="getPathColor(props.step.toPathName)">{{
          cleanPathName(props.step.toPathName)
        }}</span>
        +{{ props.step.to }}
      </template>
      <span class="text-gray-500 ml-2"
        >({{ formatNumber(getStepSouls(props.step)) }} souls)</span
      >
    </span>
  </div>

  <div
    v-if="
      props.showMaterials &&
      props.step.materials &&
      Object.keys(props.step.materials).length
    "
    class="ml-8 text-sm text-gray-600 dark:text-gray-400 flex flex-wrap gap-2"
    :class="props.variant === 'detailed' ? 'mt-1' : ''"
  >
    <MaterialBadge
      v-for="(qty, mat) in props.step.materials"
      :key="mat"
      :material="mat"
      :quantity="qty"
      size="md"
    />
  </div>
</template>
