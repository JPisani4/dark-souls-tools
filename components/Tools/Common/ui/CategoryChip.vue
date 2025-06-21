<template>
  <UBadge :color="badgeColor" variant="soft" :size="size" class="!px-2">
    <span class="whitespace-nowrap">
      {{ displayName }}
    </span>
  </UBadge>
</template>

<script setup lang="ts">
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";

interface Props {
  category: string;
  theme?: ColorTheme;
  variant?: string;
  size?: "sm" | "md" | "lg";
  displayName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
});

const safeTheme = useSafeTheme(props.theme, props.variant);

const getCategoryColor = (
  category: string
):
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "neutral" => {
  const colorMap: Record<
    string,
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "error"
    | "neutral"
  > = {
    weapon: "warning",
    armor: "info",
    consumable: "success",
    material: "neutral",
    ring: "primary",
    spell: "secondary",
    default: "neutral",
  };
  return colorMap[category.toLowerCase()] || colorMap.default;
};

const badgeColor = computed(() => getCategoryColor(props.category));
const displayName = computed(
  () =>
    props.displayName ||
    props.category.charAt(0).toUpperCase() + props.category.slice(1)
);
</script>
