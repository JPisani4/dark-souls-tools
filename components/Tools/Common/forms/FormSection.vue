<template>
  <div :class="sectionClasses">
    <div v-if="title" class="mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="text-sm text-gray-600 dark:text-gray-400 mt-1"
      >
        {{ description }}
      </p>
    </div>
    <div :class="contentClasses">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LAYOUT_SPACING } from "~/utils/themes/colorSystem";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";

interface Props {
  title: string;
  description?: string;
  theme?: ColorTheme;
  variant?: string;
  layout?: "grid" | "stack" | "inline";
  spacing?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  description: "",
  variant: "default",
  layout: "grid",
  spacing: "md",
});

const safeTheme = useSafeTheme(props.theme, props.variant);

const sectionClasses = computed(() => [LAYOUT_SPACING.section]);

const contentClasses = computed(() => {
  const baseClasses = [];

  switch (props.layout) {
    case "grid":
      baseClasses.push(LAYOUT_SPACING.grid);
      break;
    case "stack":
      baseClasses.push(LAYOUT_SPACING.form);
      break;
    case "inline":
      baseClasses.push("flex flex-wrap gap-4 items-end");
      break;
  }

  return baseClasses;
});
</script>
