<template>
  <UButton
    @click="$emit('click', $event)"
    color="error"
    variant="outline"
    size="sm"
    :aria-label="ariaLabel || 'Reset'"
  >
    <Icon name="i-heroicons-arrow-path" class="w-4 h-4" aria-hidden="true" />
  </UButton>
</template>

<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";

interface Props {
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: "Reset",
});
</script>
