<template>
  <UFormField
    :label="label"
    :size="size"
    :ui="{ label: labelClasses }"
    :id="id"
  >
    <div class="flex items-center gap-2">
      <Icon
        v-if="icon"
        :name="icon"
        class="w-5 h-5 text-gray-400 flex-shrink-0"
      />
      <slot />
    </div>
    <template #error v-if="error">
      <span class="text-red-600 text-sm mt-1">{{ error }}</span>
    </template>
    <template #help v-if="help">
      <span class="text-gray-500 text-sm mt-1">{{ help }}</span>
    </template>
  </UFormField>
</template>

<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";
import { FORM_STYLES } from "~/utils/themes/colorSystem";

interface Props {
  label: string;
  id: string;
  icon?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  help?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  required: false,
  disabled: false,
  error: "",
  size: "md",
});

const labelClasses = computed(() => FORM_STYLES.label);
</script>
