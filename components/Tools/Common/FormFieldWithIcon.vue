<template>
  <UFormField
    :label="label"
    :size="size"
    :ui="{ label: 'block font-bold mb-2 text-sm' }"
    :id="id"
  >
    <div class="relative">
      <div
        class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
      >
        <svg
          :class="`w-7 h-7 mr-2 ${iconColorClass}`"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="iconPath"
          />
        </svg>
      </div>
      <NumericInput
        :id="id"
        :model-value="modelValue"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        class="w-full text-lg pl-10 focus:ring-2 focus:ring-primary focus:border-primary"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </div>
  </UFormField>
</template>

<script lang="ts">
export default defineComponent({
  name: "FormFieldWithIcon",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    iconPath: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 999,
    },
    size: {
      type: String as () => "xs" | "sm" | "md" | "lg" | "xl",
      default: "xl",
    },
    iconColorClass: {
      type: String,
      default: "text-muted-foreground",
    },
  },
  emits: ["update:modelValue"],
});
</script>
