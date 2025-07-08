<template>
  <FormField
    :label="label || ''"
    :id="id"
    :error="error"
    :help="help"
    :size="size"
    :disabled="disabled"
  >
    <!-- Mobile: Use native select for better keyboard handling -->
    <select
      v-if="isMobile"
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      :multiple="multiple"
      :class="[inputClasses, 'w-full']"
      @change="
        (event: Event) => {
          if (multiple) {
            const select = event.target as HTMLSelectElement;
            const selectedValues = Array.from(select.selectedOptions).map(
              (option) => option.value
            );
            $emit('update:modelValue', selectedValues);
          } else {
            $emit(
              'update:modelValue',
              (event.target as HTMLSelectElement).value
            );
          }
        }
      "
    >
      <option value="" disabled v-if="!multiple">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>

    <!-- Desktop: Use USelectMenu for better UX -->
    <USelectMenu
      v-else
      :id="id"
      :model-value="modelValue"
      :items="options"
      :value-key="valueKey"
      :label-key="labelKey"
      :disabled-key="disabledKey"
      :placeholder="placeholder"
      :disabled="disabled"
      :multiple="multiple"
      :class="[inputClasses, 'w-full']"
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
  label?: string;
  id: string;
  modelValue?: string | string[];
  placeholder?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  valueKey?: "value" | "label";
  labelKey?: "value" | "label";
  disabledKey?: "disabled";
  theme?: ColorTheme;
  variant?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  help?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;
  multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Select an option",
  valueKey: "value",
  labelKey: "label",
  disabledKey: "disabled",
  variant: "default",
  required: false,
  disabled: false,
  error: "",
  help: "",
  size: "md",
  multiple: false,
});

const safeTheme = useSafeTheme(props.theme, props.variant);

// Detect mobile device for better dropdown handling
const isMobile = computed(() => {
  if (process.client) {
    return (
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }
  return false;
});

const inputClasses = computed(() => [
  props.error ? FORM_STYLES.inputError : FORM_STYLES.input,
  props.disabled
    ? "!opacity-60 !bg-gray-100 dark:!bg-gray-800 !border-gray-300 dark:!border-gray-600 !text-gray-500 dark:!text-gray-400 !cursor-not-allowed pointer-events-none disabled-select"
    : "",
  props.class || "",
]);
</script>

<style scoped>
.disabled-select {
  cursor: not-allowed !important;
}

.disabled-select:hover {
  cursor: not-allowed !important;
}

.disabled-select * {
  cursor: not-allowed !important;
}

/* Mobile select styling */
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em;
  padding-right: 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  min-height: 2.5rem;
}

/* Multiple select styling */
select[multiple] {
  background-image: none;
  padding-right: 0.75rem;
  min-height: 2.5rem;
  max-height: 2.5rem;
  overflow-y: auto;
}

/* Allow custom classes to override default styling */
select.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

select.py-1\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}

select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

/* Dark mode mobile select */
.dark select {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23d1d5db' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  border-color: #4b5563;
}

.dark select:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 1px #60a5fa;
}

/* Style disabled options in native select */
select option:disabled {
  color: #9ca3af !important;
  background-color: #f3f4f6 !important;
  font-style: italic;
  cursor: not-allowed;
  pointer-events: none;
  user-select: none;
}

.dark select option:disabled {
  color: #6b7280 !important;
  background-color: #374151 !important;
}

/* Style disabled options in USelectMenu (desktop) */
:deep(.u-select-menu-option[data-disabled="true"]) {
  color: #9ca3af !important;
  background-color: #f3f4f6 !important;
  font-style: italic;
  cursor: not-allowed !important;
  pointer-events: none !important;
  user-select: none !important;
}

.dark :deep(.u-select-menu-option[data-disabled="true"]) {
  color: #6b7280 !important;
  background-color: #374151 !important;
}

:deep(.u-select-menu-option[data-disabled="true"]:hover) {
  background-color: #f3f4f6 !important;
  cursor: not-allowed !important;
}

.dark :deep(.u-select-menu-option[data-disabled="true"]:hover) {
  background-color: #374151 !important;
  cursor: not-allowed !important;
}
</style>
