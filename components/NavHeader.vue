<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Icon from "~/components/Common/Icon.vue";

const colorMode = useColorMode();
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

// Mobile menu state
const isMobileMenuOpen = ref(false);
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
const mobileMenuRef = ref<HTMLDivElement>();
const mobileMenuButtonRef = ref<HTMLButtonElement>();

// Close mobile menu when route changes
watch(
  () => useRoute().path,
  () => {
    isMobileMenuOpen.value = false;
  }
);

// Handle mobile menu keyboard events
const handleMobileMenuKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeMobileMenu();
    mobileMenuButtonRef.value?.focus();
  }
};
</script>

<template>
  <header
    role="banner"
    class="sticky top-0 z-30 w-full bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-md mb-6"
  >
    <nav
      class="relative w-full flex items-center justify-between px-4 py-3"
      role="navigation"
      aria-label="Main navigation"
    >
      <!-- Left: Logo + Site Name -->
      <div class="flex items-center gap-3 flex-shrink-0 min-w-[170px]">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <NuxtImg
            src="/favicon.webp"
            alt="Gold Phantom Icon"
            class="w-8 h-8 object-contain"
            format="webp"
          />
          <span
            class="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-primary transition-colors group-hover:text-primary"
          >
            Gold Phantom
          </span>
        </NuxtLink>
      </div>
      <!-- Center: Navigation Links (absolutely centered) -->
      <div
        class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-4 items-center z-10 pointer-events-auto"
      >
        <NuxtLink
          to="/tools?game=ds1"
          class="mx-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        >
          Dark Souls Remastered
        </NuxtLink>
        <NuxtLink
          to="/tools"
          class="mx-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        >
          All Tools
        </NuxtLink>
      </div>
      <!-- Right: Dark Mode Toggle -->
      <div
        class="flex items-center gap-2 flex-shrink-0 min-w-[64px] justify-end ml-auto"
      >
        <template v-if="isMounted">
          <USwitch
            :model-value="colorMode.value === 'dark'"
            @update:model-value="
              (val) => (colorMode.preference = val ? 'dark' : 'light')
            "
            aria-label="Toggle dark mode"
            tabindex="0"
          />
          <span class="text-xs text-gray-500 dark:text-gray-400">
            <span v-if="colorMode.value === 'dark'">☀</span>
            <span v-else>🌙</span>
          </span>
        </template>
        <template v-else>
          <div
            class="w-9 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
          ></div>
          <span class="text-xs text-gray-400">☀</span>
        </template>
      </div>
      <!-- Mobile Hamburger Button (absolute right) -->
      <button
        ref="mobileMenuButtonRef"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ml-auto"
        aria-label="Toggle mobile menu"
        :aria-expanded="isMobileMenuOpen"
      >
        <Icon
          :name="isMobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
          class="w-6 h-6 text-gray-700 dark:text-gray-300"
        />
      </button>
    </nav>
  </header>

  <!-- Mobile Menu Overlay (outside header to avoid stacking context issues) -->
  <Teleport to="body">
    <div
      v-if="isMobileMenuOpen"
      ref="mobileMenuRef"
      class="fixed inset-0 z-[9999] md:hidden"
      @click="closeMobileMenu"
      @keydown="handleMobileMenuKeydown"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50"></div>

      <!-- Menu Content -->
      <div
        class="absolute top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-xl z-[10000]"
        @click.stop
      >
        <div class="p-6 space-y-6">
          <!-- Mobile Menu Header -->
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Menu
            </h3>
            <button
              @click="closeMobileMenu"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Close mobile menu"
            >
              <Icon
                name="i-heroicons-x-mark"
                class="w-5 h-5 text-gray-700 dark:text-gray-300"
              />
            </button>
          </div>

          <!-- Navigation Links -->
          <div class="space-y-2">
            <NuxtLink
              to="/tools?game=ds1"
              class="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              @click="closeMobileMenu"
            >
              Dark Souls Remastered
            </NuxtLink>
            <NuxtLink
              to="/tools"
              class="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              @click="closeMobileMenu"
            >
              All Tools
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
