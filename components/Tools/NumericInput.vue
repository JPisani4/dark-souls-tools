<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { onlyAllowNumbers, sanitizeOnPaste } from "~/utils/inputSanitizers";

export default defineComponent({
  name: "NumericInput",
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    id: String,
    placeholder: String,
    min: [String, Number],
    max: [String, Number],
    step: [String, Number],
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
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
        emit("update:modelValue", "");
        return;
      }

      // Validate against max value if provided
      if (props.max !== undefined) {
        const maxNum =
          typeof props.max === "string" ? parseInt(props.max, 10) : props.max;
        const valNum = parseInt(val, 10);

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
    };

    const onPaste = (e: ClipboardEvent) => {
      sanitizeOnPaste(e);
    };

    return {
      internalValue,
      onKeyDown,
      onPaste,
    };
  },
});
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
    @keydown="onKeyDown"
    @paste="onPaste"
    @input="(e) => {}"
    size="xl"
  />
</template>
