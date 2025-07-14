<template>
  <div
    class="flex items-start gap-3 rounded-xl p-3 transition-all bg-white/80 dark:bg-gray-900/80 shadow-sm hover:bg-white/90 dark:hover:bg-gray-900/90 group"
    role="listitem"
  >
    <!-- Checkbox -->
    <div class="flex items-center mt-2 mr-2 z-10">
      <button
        :id="'req-' + requirement.id"
        role="checkbox"
        type="button"
        :aria-checked="checked"
        @click="$emit('toggle')"
        @keydown.space.prevent="$emit('toggle')"
        @keydown.enter.prevent="$emit('toggle')"
        class="rounded border-2 border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none w-6 h-6 flex items-center justify-center transition-colors duration-150 bg-white dark:bg-gray-900"
        :class="
          checked
            ? 'border-green-500 bg-green-100 dark:bg-green-900/30'
            : 'border-gray-300'
        "
        :data-state="checked ? 'checked' : 'unchecked'"
        :aria-label="`Mark ${requirement.name} as ${checked ? 'incomplete' : 'completed'}`"
      >
        <span
          v-if="checked"
          data-state="checked"
          style="pointer-events: none"
          class="flex items-center justify-center w-full h-full text-inverted bg-primary"
          aria-hidden="true"
        >
          <Icon
            name="i-heroicons-check"
            class="w-4 h-4 text-white"
            aria-hidden="true"
          />
        </span>
      </button>
    </div>

    <!-- Main Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1 min-w-0">
          <h5
            class="font-semibold text-base sm:text-lg text-gray-900 dark:text-white mb-1 flex items-center gap-2 flex-wrap"
          >
            {{ requirement.name }}
            <!-- NG+ badge -->
            <span
              v-if="requirement.newGamePlus"
              class="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-2 py-1 rounded font-semibold ml-1"
              aria-label="New Game Plus requirement"
            >
              NG+{{ requirement.newGamePlus }}
            </span>
            <!-- Info icon for notes -->
            <span
              v-if="requirement.notes"
              class="relative inline-block ml-1 align-middle"
            >
              <button
                type="button"
                @mouseenter="showNote = true"
                @mouseleave="showNote = false"
                @focus="showNote = true"
                @blur="showNote = false"
                @keydown.escape="showNote = false"
                class="inline-block w-4 h-4 text-blue-500 dark:text-blue-300 cursor-pointer align-middle focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                :aria-label="`Show notes for ${requirement.name}`"
                :aria-describedby="
                  showNote ? `note-${requirement.id}` : undefined
                "
              >
                <Icon
                  name="i-heroicons-information-circle"
                  class="w-4 h-4"
                  aria-hidden="true"
                />
              </button>
              <div
                v-if="showNote"
                :id="`note-${requirement.id}`"
                class="absolute z-20 left-1/2 -translate-x-1/2 mt-2 w-64 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow text-xs text-gray-700 dark:text-gray-200"
                style="min-width: 180px"
                role="tooltip"
                aria-live="polite"
              >
                {{ requirement.notes }}
              </div>
            </span>
          </h5>

          <!-- Metadata rows -->
          <div
            v-if="requirement.ascendsFrom"
            class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1 flex-wrap"
          >
            <span class="font-medium">Ascends from:</span>
            <span>{{ formatAscendsFrom(requirement.ascendsFrom) }}</span>
          </div>

          <div
            v-if="requirement.location"
            class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1 flex-wrap"
          >
            <span class="font-medium">Location:</span>
            <span>{{ formatLocation(requirement.location) }}</span>
          </div>

          <div
            v-if="requirement.cost || requirement.price"
            class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1 flex-wrap"
          >
            <span class="font-medium">Cost:</span>
            <span>
              {{
                typeof requirement.cost === "number"
                  ? requirement.cost.toLocaleString()
                  : typeof requirement.price === "number"
                    ? requirement.price.toLocaleString()
                    : "Varies"
              }}
              souls
            </span>
          </div>

          <div class="flex flex-wrap gap-2 mb-1 mt-1">
            <span
              v-if="requirement.bossSoul"
              class="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-1 rounded"
              aria-label="Boss soul requirement"
            >
              {{ requirement.bossSoul }}
            </span>
            <span
              v-if="requirement.tail"
              class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
              aria-label="Tail cut requirement"
            >
              Tail
            </span>
            <span
              v-if="requirement.dropRate"
              class="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded"
              aria-label="Drop rate information"
            >
              {{ requirement.dropRate }}
            </span>
            <span
              v-if="requirement.quest || requirement.logansQuest"
              class="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded"
              aria-label="Quest requirement"
            >
              Quest
            </span>
            <span
              v-if="requirement.isOptional"
              class="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
              aria-label="Optional requirement"
            >
              Optional
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AchievementRequirement } from "~/types/game/ds1/achievements";
import Icon from "~/components/Common/Icon.vue";
import { ref } from "vue";
import {
  formatLocation,
  formatAscendsFrom,
} from "~/utils/achievementTracker/achievementUtils";

const props = defineProps<{
  requirement: AchievementRequirement;
  checked: boolean;
}>();

const showNote = ref(false);
</script>
