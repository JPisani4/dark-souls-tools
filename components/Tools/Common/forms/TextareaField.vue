<template>
  <FormField :label="label" :id="id" :error="error" :help="help" :size="size">
    <UTextarea
      :id="id"
      :model-value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
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
  modelValue?: string;
  placeholder?: string;
  rows?: number;
  theme?: ColorTheme;
  variant?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  help?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  rows: 3,
  variant: "default",
  required: false,
  disabled: false,
  error: "",
  help: "",
  size: "md",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const safeTheme = useSafeTheme(props.theme, props.variant);

const inputClasses = computed(() => [
  props.error ? FORM_STYLES.inputError : FORM_STYLES.input,
]);
</script>
