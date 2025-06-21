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
  gameId: string;
  theme?: ColorTheme;
  variant?: string;
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
});

const safeTheme = useSafeTheme(props.theme, props.variant);

const getGameColor = (
  gameId: string
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
    ds1: "warning",
    ds2: "info",
    ds3: "neutral",
    bb: "error",
    er: "success",
  };
  return colorMap[gameId] || "neutral";
};

const getGameDisplayName = (gameId: string) => {
  const nameMap: Record<string, string> = {
    ds1: "DS1",
    ds2: "DS2",
    ds3: "DS3",
    bb: "BB",
    er: "ER",
  };
  return nameMap[gameId] || gameId.toUpperCase();
};

const badgeColor = computed(() => getGameColor(props.gameId));
const displayName = computed(() => getGameDisplayName(props.gameId));
</script>
