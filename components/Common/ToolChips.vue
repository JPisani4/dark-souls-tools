<template>
  <div class="flex flex-wrap gap-2 mt-2 justify-center">
    <UBadge v-if="popular" color="primary" variant="soft" size="sm"
      >Popular</UBadge
    >
    <UBadge v-if="category" color="info" variant="soft" size="sm">{{
      category
    }}</UBadge>
    <UBadge
      v-for="game in games"
      :key="game"
      color="secondary"
      variant="soft"
      size="sm"
      >{{ getGameDisplayName(game) }}</UBadge
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  popular?: boolean;
  category?: string;
  games?: string[];
}

const props = defineProps<Props>();

const getGameDisplayName = (game: string): string => {
  const gameNames: Record<string, string> = {
    ds1: "DS1",
    ds2: "DS2",
    ds3: "DS3",
    bb: "BB",
    er: "ER",
  };
  return gameNames[game] || game.toUpperCase();
};
</script>
