<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
  >
    <div class="max-w-md w-full mx-auto text-center px-4">
      <!-- Error Icon -->
      <div class="mb-8">
        <div
          class="mx-auto w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-12 h-12 text-orange-600 dark:text-orange-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
      </div>

      <!-- Error Message -->
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Tool Loading Error
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Failed to load <span class="font-semibold">{{ toolTitle }}</span>
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">
        There was an error loading this tool. This might be a temporary issue.
      </p>

      <!-- Error Details (Development Only) -->
      <div v-if="showErrorDetails" class="mb-8">
        <details class="text-left">
          <summary
            class="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Error Details
          </summary>
          <div
            class="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs font-mono text-gray-800 dark:text-gray-200 overflow-auto"
          >
            {{ errorMessage }}
          </div>
        </details>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <UButton
          @click="retry"
          color="primary"
          size="lg"
          class="w-full"
          :loading="isRetrying"
        >
          <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2" />
          Try Again
        </UButton>

        <UButton to="/tools" variant="outline" size="lg" class="w-full">
          <UIcon name="i-heroicons-home" class="w-5 h-5 mr-2" />
          Browse Other Tools
        </UButton>
      </div>

      <!-- Contact Support -->
      <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Still having issues?
        </p>
        <UButton
          to="https://github.com/JPisani4/dark-souls-tools/issues"
          target="_blank"
          variant="ghost"
          size="sm"
          class="text-primary-600 dark:text-primary-400"
        >
          <UIcon name="i-simple-icons-github" class="w-4 h-4 mr-2" />
          Report Issue
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  toolTitle: string;
  errorMessage?: string;
  onRetry?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  errorMessage: "Unknown error occurred",
});

const emit = defineEmits<{
  retry: [];
}>();

const isRetrying = ref(false);

// Show error details in development
const showErrorDetails = computed(() => process.env.NODE_ENV === "development");

const retry = async () => {
  isRetrying.value = true;
  emit("retry");

  // Add a small delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 500));
  isRetrying.value = false;
};
</script>
