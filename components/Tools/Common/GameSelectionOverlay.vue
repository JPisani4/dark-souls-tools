<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div
      v-if="isOpen"
      :class="[
        'absolute inset-0 z-30 flex items-center justify-center',
        border,
        gradient,
        darkGradient,
        'bg-black/60 backdrop-blur-lg rounded-xl',
      ]"
      @click="handleBackdropClick"
    >
      <div
        class="relative w-full h-full flex flex-col items-center justify-center"
      >
        <div
          class="w-full flex-1 flex flex-col items-center justify-center p-6"
        >
          <div class="text-center mb-6">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
              Choose Game
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Select which game version to open
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button
              v-for="game in games"
              :key="game"
              @click="selectGame(game)"
              :class="`group relative bg-gray-100 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 ${iconBg} focus:ring-opacity-50`"
              :aria-label="`Open ${toolTitle} for ${getGameDisplayName(game)}`"
            >
              <!-- Game Logo -->
              <div
                class="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="getGameIcon(game)"
                  :src="getGameIcon(game)"
                  :alt="`${getGameDisplayName(game)} icon`"
                  class="w-full h-full object-cover"
                />
                <UIcon
                  v-else
                  name="i-heroicons-gamepad-20-solid"
                  class="w-6 h-6 text-gray-600 dark:text-gray-300"
                />
              </div>

              <!-- Game Name -->
              <div class="text-center">
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ getGameDisplayName(game) }}
                </span>
              </div>

              <!-- Hover effect -->
              <div
                :class="`absolute inset-0 rounded-lg border-2 border-transparent group-hover:${iconBg.replace('bg-', 'border-')} transition-colors`"
              ></div>
            </button>
          </div>
        </div>
        <div class="absolute bottom-4 left-4">
          <UButton
            @click="close"
            :class="`shadow ${iconBg} ${hoverBg} text-white`"
            variant="solid"
            size="sm"
            icon="i-heroicons-arrow-left"
            :aria-label="'Back'"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean;
  games: string[];
  toolTitle: string;
  border: string;
  gradient: string;
  darkGradient: string;
  iconBg: string;
  hoverBg: string;
}

interface Emits {
  (e: "close"): void;
  (e: "select", game: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const router = useRouter();

const getGameDisplayName = (game: string): string => {
  const gameNames: Record<string, string> = {
    ds1: "DS1",
    ds2: "DS2",
    ds3: "DS3",
    bb: "BB",
    er: "ER",
  };
  return gameNames[game] || game.toUpperCase();
};

const getGameIcon = (game: string): string | undefined => {
  const gameIcons: Record<string, string> = {
    ds1: "/Dark_Souls_Remastered_Icon.png",
    // Add more game icons as they become available
    // ds2: "/Dark_Souls_2_Icon.png",
    // ds3: "/Dark_Souls_3_Icon.png",
    // bb: "/Bloodborne_Icon.png",
    // er: "/Elden_Ring_Icon.png",
  };
  return gameIcons[game] || undefined;
};

const selectGame = (game: string) => {
  emit("select", game);
};

const close = () => {
  emit("close");
};

const handleBackdropClick = () => {
  close();
};

// Keyboard navigation
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!props.isOpen) return;

    if (e.key === "Escape") {
      close();
    }
  };

  document.addEventListener("keydown", handleKeydown);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
  });
});
</script>
