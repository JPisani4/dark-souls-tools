<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useBaseTool } from "~/composables/useBaseTool";
import { getAllQuests } from "~/utils/games/ds1/quests";
import type { QuestState } from "~/types/game/ds1/quests";
import CheckboxField from "~/components/Tools/Common/forms/CheckboxField.vue";
import SummaryCard from "~/components/Tools/Common/display/SummaryCard.vue";
import CategoryChip from "~/components/Tools/Common/ui/CategoryChip.vue";
import { getThemeByIndex, THEME_COLORS } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";
import Icon from "~/components/Common/Icon.vue";
import SmartTooltip from "~/components/Tools/Common/SmartTooltip.vue";
import Fuse from "fuse.js";

// Tool state: completedSteps is a map of questId -> array of completed step IDs
interface NpcQuestTrackerState {
  completedSteps: Record<string, string[]>;
  expandedNpcId: string | null;
  search: string;
}

const initialState: NpcQuestTrackerState = {
  completedSteps: {},
  expandedNpcId: null,
  search: "",
};

interface NpcQuestTrackerResult {
  timestamp: Date;
  completedSteps: Record<string, string[]>;
  expandedNpcId: string | null;
  search: string;
}

const { state, setState, reset, error, setError, clearError } = useBaseTool<
  NpcQuestTrackerState,
  NpcQuestTrackerResult
>(
  {
    initialState,
    autoSave: true,
    autoSaveKey: "npc-quest-tracker-ds1",
    debounceMs: 500,
  },
  async (state) => {
    // Dummy calculation function - just return the state for auto-save to work
    return {
      timestamp: new Date(),
      ...state,
    };
  }
);

const allQuests = getAllQuests();

// Flatten all NPC quests into a single array for listing
const npcQuests = computed(() => {
  return Object.values(allQuests).flat();
});

// Filtered NPCs by search with fuzzy matching
const filteredNpcQuests = computed(() => {
  if (!state.search) return npcQuests.value;

  const searchTerm = state.search.toLowerCase();

  // Manual filtering to include rewards in search
  return npcQuests.value.filter((npc) => {
    // Check basic fields
    if (
      npc.name.toLowerCase().includes(searchTerm) ||
      npc.npcName.toLowerCase().includes(searchTerm) ||
      npc.description.toLowerCase().includes(searchTerm)
    ) {
      return true;
    }

    // Check rewards in requirements
    return npc.requirements.some((req) => {
      if (req.rewards && Array.isArray(req.rewards)) {
        return req.rewards.some((reward) =>
          reward.toLowerCase().includes(searchTerm)
        );
      }
      return false;
    });
  });
});

// Store a random theme for each NPC (stable per session)
const npcThemes = ref<Record<string, any>>({});

onMounted(() => {
  // Assign a random theme to each NPC if not already assigned
  npcQuests.value.forEach((npc, idx) => {
    if (!npcThemes.value[npc.id]) {
      // Use index for stable assignment per session
      npcThemes.value[npc.id] = getThemeByIndex(idx);
    }
  });
});

const expandNpc = (npcId: string) => {
  setState({ expandedNpcId: state.expandedNpcId === npcId ? null : npcId });
};

const resetAllProgress = () => {
  setState({ completedSteps: {} });
};

const resetNpcProgress = (npcId: string) => {
  setState({
    completedSteps: { ...state.completedSteps, [npcId]: [] },
  });
};

const getQuestProgress = (quest: QuestState) => {
  const completed = state.completedSteps[quest.id] || [];
  return {
    completed: completed.length,
    total: quest.requirements.length,
    percentage:
      quest.requirements.length > 0
        ? Math.round((completed.length / quest.requirements.length) * 100)
        : 0,
  };
};

const isStepCompleted = (questId: string, stepId: string) => {
  return (state.completedSteps[questId] || []).includes(stepId);
};

const toggleStepCompleted = (
  questId: string,
  stepId: string,
  checked: boolean
) => {
  const prev = state.completedSteps[questId] || [];
  let updated: string[];
  if (checked) {
    updated = [...new Set([...prev, stepId])];
  } else {
    updated = prev.filter((id) => id !== stepId);
  }
  setState({
    completedSteps: { ...state.completedSteps, [questId]: updated },
  });
};
</script>

<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <div
      class="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between"
    >
      <h1 class="text-2xl font-bold">NPC Quest Tracker</h1>
      <UInput
        v-model="state.search"
        placeholder="Search NPCs, rewards..."
        class="w-full sm:w-64"
      />
      <UButton @click="resetAllProgress" variant="outline" size="sm">
        Reset All Progress
      </UButton>
    </div>
    <div class="space-y-6">
      <div
        v-for="npc in filteredNpcQuests"
        :key="npc.id"
        :class="[
          'relative rounded-2xl p-0 shadow-md transition-all duration-200 bg-white dark:bg-gray-900',
          // Only apply lifting effect if not expanded
          state.expandedNpcId !== npc.id
            ? 'hover:scale-[1.01] focus-within:scale-[1.01]'
            : '',
          // Apply left border using theme system
          npcThemes[npc.id]?.border || 'border-l-blue-500',
        ]"
        style="min-height: 80px; border-left-width: 6px"
      >
        <!-- Card content -->
        <div
          class="flex items-center justify-between px-6 py-4 cursor-pointer select-none group relative"
          @click="expandNpc(npc.id)"
        >
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <span
              class="font-semibold text-lg text-gray-900 dark:text-white truncate max-w-[180px]"
              >{{ npc.name }}</span
            >
          </div>
          <div class="flex items-center gap-2">
            <span v-if="state.expandedNpcId === npc.id">[-]</span>
            <span v-else>[+]</span>
          </div>
          <!-- Reset button, only visible when expanded -->
          <UButton
            v-if="state.expandedNpcId === npc.id"
            @click.stop="resetNpcProgress(npc.id)"
            size="xs"
            color="warning"
            variant="soft"
            class="ml-2 z-20"
            :aria-label="'Reset Progress'"
            v-tooltip="'Reset Progress'"
            style="padding: 0.25rem; min-width: 1.75rem; min-height: 1.75rem"
          >
            <Icon name="i-heroicons-arrow-path" class="w-4 h-4" />
          </UButton>
        </div>
        <div
          v-if="state.expandedNpcId === npc.id"
          class="px-6 pb-6 pt-0 space-y-4 pt-6"
          style="padding-top: 2.5rem"
        >
          <SummaryCard
            :label="'Quest Progress'"
            :value="
              (state.completedSteps[npc.id]?.length || 0) +
              '/' +
              (npc.requirements.length || 0)
            "
            :subtitle="npc.description"
            :format="'number'"
            :icon="npcThemes[npc.id]?.icon || 'i-heroicons-user'"
            :theme="npcThemes[npc.id]"
          />
          <!-- Custom progress bar -->
          <div
            class="w-full h-3 rounded bg-gray-200 dark:bg-gray-800 mb-2 overflow-hidden"
          >
            <div
              class="h-3 rounded transition-all duration-300"
              :class="npcThemes[npc.id]?.iconBg || 'bg-blue-500'"
              :style="{
                width:
                  ((state.completedSteps[npc.id]?.length || 0) /
                    (npc.requirements.length || 1)) *
                    100 +
                  '%',
              }"
            ></div>
          </div>
          <div class="space-y-4">
            <div
              v-for="step in npc.requirements"
              :key="step.id"
              class="flex items-start gap-3 rounded-xl p-3 transition-all bg-white/80 dark:bg-gray-900/80 shadow-sm hover:bg-white/90 dark:hover:bg-gray-900/90 group"
            >
              <!-- Checkbox on the far left -->
              <div class="flex items-center mt-2 mr-2 z-10">
                <CheckboxField
                  :id="npc.id + '-' + step.id"
                  :label="''"
                  :model-value="isStepCompleted(npc.id, step.id)"
                  @update:model-value="
                    (checked) => toggleStepCompleted(npc.id, step.id, checked)
                  "
                  size="lg"
                  :class="
                    isStepCompleted(npc.id, step.id)
                      ? 'ring-2 ring-green-500 border-green-500'
                      : 'ring-2 ring-gray-300'
                  "
                />
              </div>
              <div class="flex-1 min-w-0">
                <div class="mb-2">
                  <div class="flex items-center gap-2 mb-1">
                    <div
                      class="font-semibold text-base text-gray-900 dark:text-white break-words max-w-full"
                      :title="step.name"
                    >
                      {{ step.name }}
                    </div>
                    <CategoryChip
                      v-if="step.optional"
                      category="optional"
                      display-name="Optional"
                      size="sm"
                    />
                  </div>
                  <!-- Location moved below the title for better reading order -->
                  <div
                    v-if="step.location"
                    class="mt-1 flex items-center gap-1"
                  >
                    <CategoryChip
                      :category="'location'"
                      :display-name="
                        step.location.length > 40
                          ? step.location.slice(0, 40) + '…'
                          : step.location
                      "
                      size="sm"
                    />
                    <!-- Info icon for location: tooltip on hover/focus, popover on click -->
                    <SmartTooltip v-if="step.location.length > 40">
                      <template #trigger>
                        <Icon
                          name="i-heroicons-information-circle"
                          class="w-4 h-4 text-info cursor-pointer flex-shrink-0"
                          tabindex="0"
                          aria-label="Show full location"
                        />
                      </template>
                      <div class="flex items-start gap-3">
                        <Icon
                          name="i-heroicons-map"
                          class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                        />
                        <div class="flex-1">
                          <div
                            class="font-medium text-gray-900 dark:text-white mb-2"
                          >
                            Location
                          </div>
                          <div
                            class="text-gray-700 dark:text-gray-300 leading-relaxed"
                          >
                            {{ step.location }}
                          </div>
                        </div>
                      </div>
                    </SmartTooltip>
                  </div>
                </div>
                <!-- Minimized view for completed steps -->
                <template v-if="isStepCompleted(npc.id, step.id)">
                  <div
                    class="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm font-semibold"
                  >
                    <Icon name="i-heroicons-check-solid" class="w-5 h-5" />
                    Completed
                  </div>
                </template>
                <!-- Expanded view for incomplete steps -->
                <template v-else>
                  <div
                    class="text-gray-700 dark:text-gray-200 text-sm mb-2 break-words"
                  >
                    {{ step.description }}
                  </div>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span
                      v-for="fail in step.failConditions || []"
                      :key="'fail-' + fail"
                      class="flex items-center gap-1"
                    >
                      <CategoryChip
                        category="fail"
                        :display-name="
                          fail.length > 32
                            ? 'Fail: ' + fail.slice(0, 32) + '…'
                            : 'Fail: ' + fail
                        "
                        size="sm"
                      />
                      <!-- Info icon for fail: tooltip on hover/focus, popover on click -->
                      <SmartTooltip v-if="fail.length > 32">
                        <template #trigger>
                          <Icon
                            name="i-heroicons-information-circle"
                            class="w-4 h-4 text-info cursor-pointer flex-shrink-0"
                            tabindex="0"
                            aria-label="Show full fail condition"
                          />
                        </template>
                        <div class="flex items-start gap-3">
                          <Icon
                            name="i-heroicons-exclamation-triangle"
                            class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                          />
                          <div class="flex-1">
                            <div
                              class="font-medium text-gray-900 dark:text-white mb-2"
                            >
                              Fail Condition
                            </div>
                            <div
                              class="text-gray-700 dark:text-gray-300 leading-relaxed"
                            >
                              {{ fail }}
                            </div>
                          </div>
                        </div>
                      </SmartTooltip>
                    </span>
                    <CategoryChip
                      v-for="reward in step.rewards || []"
                      :key="'reward-' + reward"
                      category="reward"
                      :display-name="'Reward: ' + reward"
                      size="sm"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="filteredNpcQuests.length === 0"
        class="text-center text-gray-500 py-8"
      >
        No NPCs found.
      </div>
    </div>
  </div>
</template>
