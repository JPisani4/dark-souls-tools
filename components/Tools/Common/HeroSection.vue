<template>
  <div class="flex flex-row items-center justify-center gap-4 text-center mb-8">
    <div
      class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br rounded-full flex-shrink-0"
      :class="theme.bg"
    >
      <UIcon v-if="iconName" :name="iconName" class="w-6 h-6 text-white" />
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
    <div class="flex flex-col items-start justify-center">
      <h1
        :class="[
          'text-3xl md:text-4xl font-bold tracking-tight mb-1 text-left',
          variant === 'homepage'
            ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
            : 'text-gray-900 dark:text-white drop-shadow-sm',
        ]"
      >
        {{ title }}
      </h1>
      <p
        :class="[
          'text-base md:text-lg text-left',
          variant === 'homepage'
            ? 'text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]'
            : 'text-gray-700 dark:text-white/80 drop-shadow-sm',
        ]"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import type { ColorTheme } from "~/types/common";

export default defineComponent({
  name: "HeroSection",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    iconPath: {
      type: String,
      default: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    },
    iconName: {
      type: String,
      default: "",
    },
    theme: {
      type: Object as () => ColorTheme,
      required: true,
    },
    variant: {
      type: String,
      default: "default",
    },
  },
});
</script>
