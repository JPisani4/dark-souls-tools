<template>
  <div class="flex justify-center mb-8 px-4">
    <div class="flex flex-col items-center gap-3 text-center">
      <div
        class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br rounded-full flex-shrink-0 overflow-hidden"
        :class="safeTheme.bg"
      >
        <Icon
          v-if="iconName"
          :name="iconName"
          class="w-3 h-3 text-white"
          :style="
            props.iconZoom !== 1
              ? { transform: `scale(${props.iconZoom})` }
              : undefined
          "
        />
        <picture
          v-else-if="iconPath && /\.(png|jpe?g|gif|svg|webp)$/i.test(iconPath)"
        >
          <source
            v-if="iconPath.endsWith('.png')"
            :srcset="
              iconPath.replace('.png', '.webp').replace(/^public\//, '/')
            "
            type="image/webp"
          />
          <img
            :src="iconPath.replace(/^public\//, '/')"
            :alt="`${title} icon`"
            class="w-12 h-12 object-contain rounded-full"
            :style="
              props.iconZoom !== 1
                ? { transform: `scale(${props.iconZoom})` }
                : undefined
            "
            loading="lazy"
            decoding="async"
            width="48"
            height="48"
          />
        </picture>
        <svg
          v-else
          class="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          :style="
            props.iconZoom !== 1
              ? { transform: `scale(${props.iconZoom})` }
              : undefined
          "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="iconPath"
          ></path>
        </svg>
      </div>
      <div class="flex flex-col items-center justify-center min-w-0">
        <div
          v-if="variant === 'homepage'"
          class="flex flex-col items-center gap-2"
        >
          <span
            class="inline-block rounded-2xl px-5 py-1.5 max-w-xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-0 text-center"
            :style="`${$colorMode?.value === 'dark' ? 'background:rgba(0,0,0,0.16);' : 'background:rgba(0,0,0,0.06);'}`"
          >
            {{ title }}
          </span>
          <span
            class="inline-block rounded-xl px-3 py-0.5 max-w-xl text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] text-base sm:text-lg text-center"
            :style="`${$colorMode?.value === 'dark' ? 'background:rgba(0,0,0,0.10);' : 'background:rgba(0,0,0,0.04);'}`"
          >
            {{ description }}
          </span>
        </div>
        <template v-else>
          <h2
            :class="[
              'text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1 text-center',
              'text-gray-900 dark:text-white drop-shadow-sm',
            ]"
          >
            {{ title }}
          </h2>
          <p
            :class="[
              'text-base sm:text-lg text-center',
              'max-w-xl',
              'text-gray-700 dark:text-white/80 drop-shadow-sm',
            ]"
          >
            {{ description }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ColorTheme } from "~/utils/themes/colorSystem";
import type { GameData } from "~/types/game";
import { useSafeTheme } from "~/composables/useSafeTheme";
import Icon from "~/components/Common/Icon.vue";

interface Props {
  title: string;
  description: string;
  iconPath?: string;
  iconName?: string;
  theme?: ColorTheme;
  variant?: string;
  gameData?: GameData;
  /**
   * Optional zoom factor for the icon (1 = normal, 2 = 2x, etc). Only used for special cases.
   */
  iconZoom?: number;
}

const props = withDefaults(defineProps<Props>(), {
  iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  iconName: "",
  variant: "default",
  iconZoom: 1,
});

const safeTheme = useSafeTheme(props.theme, props.variant);

const getGameBadgeColor = (gameId: string) => {
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
</script>
