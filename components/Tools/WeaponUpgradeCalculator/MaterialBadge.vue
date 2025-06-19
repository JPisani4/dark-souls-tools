<script lang="ts" setup>
import { getMaterialColor, getMaterialBadgeColor } from "~/utils/upgradeColors";
import { formatMaterialName } from "~/utils/formatters";

interface Props {
  material: string;
  quantity: number;
  size?: "sm" | "md" | "lg";
  showQuantity?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  showQuantity: true,
});
</script>

<template>
  <UBadge
    :color="getMaterialBadgeColor(props.material)"
    variant="soft"
    :size="props.size"
  >
    <span :class="getMaterialColor(props.material)">
      {{ formatMaterialName(props.material) }}
    </span>
    <span v-if="props.showQuantity">: {{ props.quantity }}</span>
  </UBadge>
</template>
