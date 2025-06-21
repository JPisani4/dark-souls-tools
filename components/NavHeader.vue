<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { ref, onMounted, watch, nextTick } from "vue";

const colorMode = useColorMode();

const items = ref<NavigationMenuItem[]>([
  { label: "Home", to: "/" },
  {
    label: "Dark Souls Remastered",
    to: "/tools",
    children: [{ label: "Tools", to: "/tools?game=ds1" }],
  },
]);

function toggleColorMode(val: boolean) {
  colorMode.preference = val ? "dark" : "light";
}

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

// Mobile menu state
const isMobileMenuOpen = ref(false);
const expandedItems = ref<Set<string>>(new Set());

// Desktop dropdown state
const isDesktopDropdownOpen = ref(false);
const dropdownButtonRef = ref<HTMLButtonElement>();
const dropdownMenuRef = ref<HTMLDivElement>();

// Close mobile menu when clicking outside
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  expandedItems.value.clear();
};

// Close desktop dropdown
const closeDesktopDropdown = () => {
  isDesktopDropdownOpen.value = false;
};

// Handle dropdown navigation click
const handleDropdownNavClick = () => {
  closeDesktopDropdown();
};

// Keyboard navigation for desktop dropdown
const handleDropdownKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeDesktopDropdown();
    dropdownButtonRef.value?.focus();
  }
};

// Toggle dropdown with keyboard
const toggleDropdown = () => {
  isDesktopDropdownOpen.value = !isDesktopDropdownOpen.value;
  if (isDesktopDropdownOpen.value) {
    nextTick(() => {
      const firstLink = dropdownMenuRef.value?.querySelector("a");
      firstLink?.focus();
    });
  }
};

// Toggle mobile submenu
const toggleMobileSubmenu = (label: string) => {
  if (expandedItems.value.has(label)) {
    expandedItems.value.delete(label);
  } else {
    expandedItems.value.add(label);
  }
};

// Close mobile menu when route changes
watch(
  () => useRoute().path,
  () => {
    isMobileMenuOpen.value = false;
    expandedItems.value.clear();
  }
);

// Focus trap for mobile menu
const mobileMenuRef = ref<HTMLDivElement>();
const mobileMenuButtonRef = ref<HTMLButtonElement>();

// Handle mobile menu keyboard events
const handleMobileMenuKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeMobileMenu();
    mobileMenuButtonRef.value?.focus();
  }
};

// Focus trap for mobile menu
let focusTrapCleanup: (() => void) | null = null;

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      const cleanup = handleMobileMenuFocus();
      if (cleanup) {
        focusTrapCleanup = cleanup;
      }
    });
  } else {
    if (focusTrapCleanup) {
      focusTrapCleanup();
      focusTrapCleanup = null;
    }
  }
});

const handleMobileMenuFocus = () => {
  if (!mobileMenuRef.value) return;

  const focusableElements = mobileMenuRef.value.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  const handleTabKey = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  document.addEventListener("keydown", handleTabKey);

  // Cleanup
  return () => {
    document.removeEventListener("keydown", handleTabKey);
  };
};
</script>

<template>
  <header
    role="banner"
    class="sticky top-0 z-30 w-full bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-md mb-6"
  >
    <nav
      class="w-full flex items-center justify-between px-4 py-3"
      role="navigation"
      aria-label="Main navigation"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3 flex-shrink-0">
        <img
          src="/favicon.png"
          alt="Gold Phantom Icon"
          class="w-8 h-8 object-contain"
        />
        <NuxtLink
          to="/"
          class="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-primary transition-colors"
        >
          Gold Phantom
        </NuxtLink>
      </div>
      <!-- Desktop Navigation -->
      <div class="hidden md:flex flex-1 justify-center gap-4 items-center">
        <!-- Custom dropdown for DSR -->
        <div
          class="relative"
          @mouseenter="isDesktopDropdownOpen = true"
          @mouseleave="isDesktopDropdownOpen = false"
        >
          <button
            ref="dropdownButtonRef"
            class="mx-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-haspopup="menu"
            :aria-expanded="isDesktopDropdownOpen"
            @click="toggleDropdown"
            @keydown="handleDropdownKeydown"
            @keydown.enter="toggleDropdown"
            @keydown.space.prevent="toggleDropdown"
          >
            Dark Souls Remastered
            <UIcon name="i-heroicons-chevron-down" class="w-4 h-4" />
          </button>
          <div
            v-show="isDesktopDropdownOpen"
            ref="dropdownMenuRef"
            class="absolute left-0 top-full pt-1 w-48 z-50"
            role="menu"
            aria-label="Dark Souls Remastered tools"
            @keydown="handleDropdownKeydown"
          >
            <div
              class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
            >
              <NuxtLink
                to="/tools?game=ds1"
                class="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                role="menuitem"
                @click="handleDropdownNavClick"
              >
                Tools
              </NuxtLink>
            </div>
          </div>
        </div>
        <NuxtLink
          to="/tools"
          class="mx-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
        >
          All Tools
        </NuxtLink>
      </div>
      <!-- Dark Mode Toggle (skeleton until mounted) -->
      <div
        class="flex items-center gap-2 flex-shrink-0"
        style="min-width: 64px"
      >
        <template v-if="isMounted">
          <USwitch
            :model-value="colorMode.value === 'dark'"
            @update:model-value="toggleColorMode"
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
      <!-- Mobile Hamburger Button -->
      <button
        ref="mobileMenuButtonRef"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Toggle mobile menu"
        :aria-expanded="isMobileMenuOpen"
      >
        <UIcon
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
              <UIcon
                name="i-heroicons-x-mark"
                class="w-5 h-5 text-gray-700 dark:text-gray-300"
              />
            </button>
          </div>

          <!-- Navigation Links -->
          <div class="space-y-0">
            <!-- Dark Souls Remastered button -->
            <button
              @click="toggleMobileSubmenu('Dark Souls Remastered')"
              class="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              :aria-expanded="expandedItems.has('Dark Souls Remastered')"
            >
              <span>Dark Souls Remastered</span>
              <UIcon
                :name="
                  expandedItems.has('Dark Souls Remastered')
                    ? 'i-heroicons-chevron-up'
                    : 'i-heroicons-chevron-down'
                "
                class="w-4 h-4 transition-transform flex-shrink-0"
              />
            </button>

            <!-- Tools submenu item -->
            <NuxtLink
              v-if="expandedItems.has('Dark Souls Remastered')"
              to="/tools?game=ds1"
              class="block px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              @click="closeMobileMenu"
            >
              Tools
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
