<template>
  <div class="flex justify-center mb-8 px-4">
    <div class="flex flex-col items-center gap-3 text-center">
      <div
        class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br rounded-full flex-shrink-0"
        :class="safeTheme.bg"
      >
        <UIcon v-if="iconName" :name="iconName" class="w-6 h-6 text-white" />
        <img
          v-else-if="iconPath && /\.(png|jpe?g|gif|svg)$/i.test(iconPath)"
          :src="iconPath.replace(/^public\//, '/')"
          :alt="`${title} icon`"
          class="w-10 h-10 object-contain"
        />
        <svg
          v-else
          class="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
        <h1
          v-if="variant === 'homepage'"
          :class="[
            'text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1 text-center',
            'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]',
          ]"
        >
          {{ title }}
        </h1>
        <h2
          v-else
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
            variant === 'homepage'
              ? 'text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]'
              : 'text-gray-700 dark:text-white/80 drop-shadow-sm',
          ]"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ColorTheme } from "~/utils/themes/colorSystem";
import type { GameData } from "~/types/game";
import { useSafeTheme } from "~/composables/useSafeTheme";

interface Props {
  title: string;
  description: string;
  iconPath?: string;
  iconName?: string;
  theme?: ColorTheme;
  variant?: string;
  gameData?: GameData;
}

const props = withDefaults(defineProps<Props>(), {
  iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  iconName: "",
  variant: "default",
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
