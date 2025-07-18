<template>
  <div class="w-full max-w-2xl mx-auto text-center py-12">
    <div
      v-if="icon"
      :class="`w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full ${safeTheme.iconBg || 'bg-gray-100 dark:bg-gray-800'}`"
    >
      <template v-if="/\.(png|jpe?g|gif|svg|webp)$/i.test(icon)">
        <picture>
          <source
            v-if="icon.endsWith('.png')"
            :srcset="icon.replace('.png', '.webp')"
            type="image/webp"
          />
          <img
            :src="icon"
            :alt="title + ' icon'"
            class="w-full h-full object-contain rounded-full"
            loading="lazy"
            decoding="async"
            width="96"
            height="96"
          />
        </picture>
      </template>
      <Icon v-else :name="icon" class="w-3 h-3 text-gray-400" />
    </div>
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
      {{ title }}
    </h3>
    <p class="text-gray-500 dark:text-gray-400 mb-4">
      {{ description }}
    </p>
    <div v-if="$slots.actions" class="flex justify-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";

interface Props {
  title: string;
  description: string;
  icon?: string;
  theme?: ColorTheme;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const safeTheme = useSafeTheme(props.theme, props.variant);
</script>
