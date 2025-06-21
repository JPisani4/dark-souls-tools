<template>
  <div :class="themeClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";

interface Props {
  theme?: ColorTheme;
  variant?: string;
  applyBackground?: boolean;
  applyText?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  applyBackground: false,
  applyText: false,
});

const safeTheme = useSafeTheme(props.theme, props.variant);

const themeClasses = computed(() => {
  const classes = [];

  if (props.applyBackground && safeTheme.value.gradient) {
    classes.push(
      `bg-gradient-to-br ${safeTheme.value.gradient} ${safeTheme.value.darkGradient}`
    );
  }

  if (props.applyText && safeTheme.value.text) {
    classes.push(safeTheme.value.text);
  }

  return classes;
});
</script>
