<template>
  <FormField :label="label" :id="id" :error="error" :help="help" :size="size">
    <UCheckbox
      :id="id"
      :model-value="modelValue"
      :class="inputClasses"
      :disabled="disabled"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </FormField>
</template>

<script setup lang="ts">
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { FORM_STYLES } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";
import FormField from "./FormField.vue";

interface Props {
  label: string;
  id: string;
  modelValue?: boolean;
  theme?: ColorTheme;
  variant?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  help?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  required: false,
  disabled: false,
  error: "",
  help: "",
  size: "md",
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const safeTheme = useSafeTheme(props.theme, props.variant);

const inputClasses = computed(() => [
  props.error ? FORM_STYLES.inputError : FORM_STYLES.input,
  props.disabled
    ? "!opacity-60 !bg-gray-100 dark:!bg-gray-800 !border-gray-300 dark:!border-gray-600 !text-gray-500 dark:!text-gray-400 !cursor-not-allowed pointer-events-none disabled-checkbox"
    : "",
]);
</script>

<style scoped>
.disabled-checkbox {
  cursor: not-allowed !important;
}

.disabled-checkbox:hover {
  cursor: not-allowed !important;
}

.disabled-checkbox * {
  cursor: not-allowed !important;
}
</style>
