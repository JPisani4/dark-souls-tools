<template>
  <div
    :class="[
      'rounded-lg p-4 sm:p-6 border bg-gradient-to-r flex flex-col',
      safeTheme.gradient && safeTheme.darkGradient
        ? `${safeTheme.gradient} ${safeTheme.darkGradient}`
        : 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
      safeTheme.border
        ? `border-${safeTheme.border.split('-')[1]}-200 dark:border-${safeTheme.border.split('-')[1]}-800`
        : 'border-gray-200 dark:border-gray-700',
    ]"
  >
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-1 gap-3"
    >
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <div
          v-if="icon || safeTheme.iconBg"
          :class="[
            'w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full flex-shrink-0',
            safeTheme.iconBg || 'bg-gray-500',
          ]"
        >
          <template v-if="icon">
            <Icon
              v-if="icon.startsWith('i-heroicons')"
              :name="icon"
              :class="`${iconSize} text-white`"
            />
            <picture
              v-else-if="icon.includes('.webp') || icon.includes('.png')"
            >
              <source
                v-if="icon.includes('.webp')"
                :srcset="icon"
                type="image/webp"
              />
              <img
                :src="
                  icon.includes('.png') ? icon : icon.replace('.webp', '.png')
                "
                :alt="`${label} icon`"
                :class="`${iconSize} object-contain`"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </template>
          <svg
            v-else-if="safeTheme.iconBg"
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-muted-foreground break-words">
            {{ label }}
          </p>
          <p
            :class="[
              'text-xl sm:text-2xl font-bold break-words',
              safeTheme.text
                ? safeTheme.text
                : 'bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent',
            ]"
          >
            {{ formatValue(value, format) }} {{ unit }}
          </p>
        </div>
      </div>
      <div v-if="subtitle || details" class="text-left sm:text-right min-w-0">
        <p v-if="subtitle" class="text-xs text-muted-foreground break-words">
          {{ subtitle }}
        </p>
        <p
          v-if="details"
          class="text-sm font-medium text-muted-foreground break-words"
        >
          {{ details }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";

interface Props {
  label: string;
  value: number | string;
  unit?: string;
  subtitle?: string;
  details?: string;
  icon?: string;
  iconSize?: string;
  theme?: ColorTheme;
  variant?: string;
  format?: "number" | "currency" | "percentage";
  terminology?: {
    souls?: string;
    level?: string;
    weapon?: string;
    upgrade?: string;
    material?: string;
    [key: string]: string | undefined;
  };
}

const props = withDefaults(defineProps<Props>(), {
  unit: "",
  format: "number",
  iconSize: "w-3 h-3",
});

const safeTheme = useSafeTheme(props.theme, props.variant);

const formatValue = (value: number | string, format?: string): string => {
  if (typeof value === "string") return value;

  switch (format) {
    case "number":
      return new Intl.NumberFormat().format(value);
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    case "percentage":
      return `${value}%`;
    default:
      return String(value);
  }
};
</script>
