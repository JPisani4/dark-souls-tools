<script setup lang="ts">
import ToolLayout from "~/components/Tools/Common/ToolLayout.vue";
import { tools } from "~/tools";

// Get popular tools for navigation
const popularTools = tools.slice(0, 3);
</script>

<template>
  <ToolLayout
    title="Page Not Found - Gold Phantom"
    description="The page you're looking for doesn't exist. Browse our Soulsborne tools and calculators for Dark Souls Remastered."
    icon-name="i-heroicons-exclamation-triangle"
  >
    <template #hero>
      <div class="flex justify-center mb-8 px-4">
        <div class="flex flex-col items-center gap-3 text-center">
          <div
            class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex-shrink-0"
          >
            <UIcon
              name="i-heroicons-exclamation-triangle"
              class="w-6 h-6 text-white"
            />
          </div>
          <div class="flex flex-col items-center justify-center min-w-0">
            <h1
              class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1 text-center text-gray-900 dark:text-white drop-shadow-sm"
            >
              Page Not Found
            </h1>
            <p
              class="text-base sm:text-lg text-center text-gray-700 dark:text-white/80 drop-shadow-sm"
            >
              The page you're looking for doesn't exist
            </p>
          </div>
        </div>
      </div>
    </template>

    <div class="text-center max-w-2xl mx-auto">
      <!-- Error Message -->
      <div class="mb-8">
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Sorry, we couldn't find the page you were looking for. It might have
          been moved, deleted, or you entered the wrong URL.
        </p>
        <p class="text-gray-600 dark:text-gray-300">
          Try one of the popular tools below or head back to the homepage.
        </p>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UIcon name="i-heroicons-home" class="w-5 h-5 mr-2" />
          Go Home
        </NuxtLink>
        <NuxtLink
          to="/tools"
          class="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <UIcon name="i-heroicons-wrench-screwdriver" class="w-5 h-5 mr-2" />
          Browse Tools
        </NuxtLink>
      </div>

      <!-- Popular Tools -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Popular Tools
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="tool in popularTools"
            :key="tool.slug"
            :to="`/tools/ds1/${tool.slug}`"
            class="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <div class="flex items-center gap-3">
              <img
                v-if="tool.icon && tool.icon.startsWith('public/')"
                :src="tool.icon.replace('public/', '/')"
                :alt="tool.title"
                class="w-8 h-8 object-contain"
              />
              <div class="flex-1 text-left">
                <h3 class="font-medium text-gray-900 dark:text-white">
                  {{ tool.title }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ tool.description }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Help Section -->
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Need Help?
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          If you think this is an error, you can:
        </p>
        <ul class="text-left text-gray-600 dark:text-gray-300 space-y-2">
          <li class="flex items-start gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
            />
            <span>Check the URL for typos</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
            />
            <span>Use the search function to find what you're looking for</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
            />
            <span>Browse our tools by category</span>
          </li>
        </ul>
      </div>
    </div>
  </ToolLayout>
</template>
