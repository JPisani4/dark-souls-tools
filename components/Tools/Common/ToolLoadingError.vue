<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
  >
    <div class="max-w-md w-full mx-auto text-center px-4">
      <!-- Error Icon -->
      <div class="mb-8">
        <picture>
          <source
            srcset="/warrior-of-sunlight-covenant-dks.webp"
            type="image/webp"
          />
          <img
            src="/warrior-of-sunlight-covenant-dks.png"
            alt="Error Icon"
            class="mx-auto w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center object-contain"
            loading="lazy"
            decoding="async"
            width="96"
            height="96"
          />
        </picture>
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
          <Icon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2" />
          Try Again
        </UButton>

        <UButton to="/tools" variant="outline" size="lg" class="w-full">
          <Icon name="i-heroicons-home" class="w-5 h-5 mr-2" />
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
          <Icon name="i-heroicons-code-bracket" class="w-4 h-4 mr-2" />
          Report Issue
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";

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
