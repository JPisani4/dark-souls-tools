<template>
  <FormField :label="label" :id="id" :error="error" :help="help" :size="size">
    <NumericInput
      :id="id"
      :model-value="displayValue"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :step="step"
      :class="inputClasses"
      @update:model-value="handleUpdate"
    />
  </FormField>
</template>

<script setup lang="ts">
import type { ColorTheme } from "~/utils/themes/colorSystem";
import { FORM_STYLES } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";
import FormField from "./FormField.vue";
import NumericInput from "../NumericInput.vue";

interface Props {
  label: string;
  id: string;
  modelValue?: number;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
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
  variant: "default",
  required: false,
  disabled: false,
  error: "",
  help: "",
  size: "md",
  step: 1,
});

const emit = defineEmits<{
  "update:modelValue": [value: number | undefined];
}>();

const safeTheme = useSafeTheme(props.theme, props.variant);

const displayValue = computed(() => {
  if (props.modelValue === undefined || props.modelValue === null) {
    return "";
  }
  return props.modelValue.toString();
});

const handleUpdate = (value: string) => {
  if (value === "" || value === null || value === undefined) {
    emit("update:modelValue", undefined);
  } else {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      emit("update:modelValue", numValue);
    }
  }
};

const inputClasses = computed(() => [
  props.error ? FORM_STYLES.inputError : FORM_STYLES.input,
]);
</script>
