<script setup lang="ts">
import { ref, watch, computed } from "vue";
import {
  onlyAllowNumbers,
  sanitizeOnPaste,
} from "~/utils/validation/inputSanitizers";

interface Props {
  modelValue: string | number;
  id?: string;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  disabled: false,
  "aria-invalid": false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const internalValue = ref(props.modelValue);

// Optimized watcher - only update when values actually differ
watch(
  () => props.modelValue,
  (val) => {
    if (val !== internalValue.value) {
      internalValue.value = val;
    }
  }
);

// Optimized validation - only run when value changes
watch(internalValue, (val) => {
  if (val === "" || val === null || typeof val === "undefined") {
    // Allow empty values instead of converting to minimum
    emit("update:modelValue", "");
    return;
  }

  // Validate against max value if provided
  if (props.max !== undefined) {
    const maxNum =
      typeof props.max === "string" ? parseInt(props.max, 10) : props.max;
    const valNum = parseInt(String(val), 10);

    if (!isNaN(maxNum) && !isNaN(valNum) && valNum > maxNum) {
      const correctedValue = maxNum.toString();
      internalValue.value = correctedValue;
      emit("update:modelValue", correctedValue);
      return;
    }
  }

  emit("update:modelValue", String(val));
});

const onKeyDown = (e: KeyboardEvent) => {
  onlyAllowNumbers(e);

  // Enhanced keyboard navigation
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    const currentValue = parseInt(String(internalValue.value), 10) || 0;
    const step = parseInt(String(props.step), 10) || 1;
    const newValue =
      e.key === "ArrowUp" ? currentValue + step : currentValue - step;

    // Respect min/max constraints
    const minNum =
      props.min !== undefined ? parseInt(String(props.min), 10) : -Infinity;
    const maxNum =
      props.max !== undefined ? parseInt(String(props.max), 10) : Infinity;

    if (newValue >= minNum && newValue <= maxNum) {
      internalValue.value = newValue.toString();
      emit("update:modelValue", newValue.toString());
    }
  }
};

const onPaste = (e: ClipboardEvent) => {
  sanitizeOnPaste(e);
};

const inputClasses = computed(() => [
  props.disabled
    ? "!opacity-60 !bg-gray-100 dark:!bg-gray-800 !border-gray-300 dark:!border-gray-600 !text-gray-500 dark:!text-gray-400 !cursor-not-allowed pointer-events-none disabled-input"
    : "",
]);
</script>

<template>
  <UInput
    :id="id"
    v-model="internalValue"
    type="number"
    inputmode="numeric"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :aria-label="props['aria-label']"
    :aria-describedby="props['aria-describedby']"
    :aria-invalid="props['aria-invalid']"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="internalValue"
    role="spinbutton"
    :class="inputClasses"
    @keydown="onKeyDown"
    @paste="onPaste"
    @input="() => {}"
    size="xl"
  />
</template>

<style scoped>
.disabled-input {
  cursor: not-allowed !important;
}

.disabled-input:hover {
  cursor: not-allowed !important;
}

.disabled-input * {
  cursor: not-allowed !important;
}
</style>
