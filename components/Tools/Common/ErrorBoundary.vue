<template>
  <div
    v-if="error"
    class="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
  >
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0">
        <svg
          class="w-6 h-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          ></path>
        </svg>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-red-800 dark:text-red-200">
          Something went wrong
        </h3>
        <p class="mt-1 text-sm text-red-700 dark:text-red-300">
          {{
            error.message || "An unexpected error occurred. Please try again."
          }}
        </p>
        <div class="mt-4 flex gap-3">
          <UButton
            size="sm"
            variant="outline"
            @click="retry"
            class="text-red-700 border-red-300 hover:bg-red-100 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-900/30"
          >
            Try Again
          </UButton>
          <UButton
            size="sm"
            variant="ghost"
            @click="reset"
            class="text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900/30"
          >
            Reset
          </UButton>
        </div>
      </div>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";
import type { AppError } from "~/types/common";

interface Props {
  onRetry?: () => void;
  onReset?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  onRetry: undefined,
  onReset: undefined,
});

const emit = defineEmits<{
  error: [error: Error];
}>();

const error = ref<Error | null>(null);

onErrorCaptured((err: unknown, instance, info) => {
  const appError: Error = err instanceof Error ? err : new Error(String(err));

  error.value = appError;
  emit("error", appError);

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error("ErrorBoundary caught error:", err);
    console.error("Error context:", info);
  }

  return false; // Prevent error from propagating
});

const retry = () => {
  error.value = null;
  if (props.onRetry) {
    props.onRetry();
  }
};

const reset = () => {
  error.value = null;
  if (props.onReset) {
    props.onReset();
  }
};
</script>
