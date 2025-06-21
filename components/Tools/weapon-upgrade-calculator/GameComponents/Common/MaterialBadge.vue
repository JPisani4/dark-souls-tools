<script lang="ts" setup>
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";
import {
  getMaterialColor,
  getMaterialBadgeColor,
} from "~/utils/ui/upgradeColors";
import { formatMaterialName } from "~/utils/ui/formatters";

interface Props {
  material: string;
  quantity: number;
  size?: "sm" | "md" | "lg";
  theme?: ColorTheme;
  variant?: string;
  showQuantity?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  variant: "default",
  showQuantity: true,
});

const safeTheme = useSafeTheme(props.theme, props.variant);

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat().format(value);
};
</script>

<template>
  <UBadge
    :color="
      getMaterialBadgeColor(props.material) as
        | 'primary'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | 'error'
        | 'neutral'
    "
    variant="soft"
    :size="props.size"
    class="!px-2"
  >
    <span class="whitespace-nowrap">
      <span :class="getMaterialColor(props.material)">
        {{ formatMaterialName(props.material) }}
      </span>
      <span v-if="props.showQuantity">&nbsp;×{{ props.quantity }}</span>
    </span>
  </UBadge>
</template>
