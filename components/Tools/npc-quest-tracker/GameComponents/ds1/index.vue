<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useBaseTool } from "~/composables/useBaseTool";
import { useToolLayout } from "~/composables/useToolLayout";
import { getAllQuests } from "~/utils/games/ds1/quests";
import type { QuestState, QuestReward } from "~/types/game/ds1/quests";
import CheckboxField from "~/components/Tools/Common/forms/CheckboxField.vue";
import SummaryCard from "~/components/Tools/Common/display/SummaryCard.vue";
import CategoryChip from "~/components/Tools/Common/ui/CategoryChip.vue";
import { getThemeByIndex, THEME_COLORS } from "~/utils/themes/colorSystem";
import { useSafeTheme } from "~/composables/useSafeTheme";
import Icon from "~/components/Common/Icon.vue";
import SmartTooltip from "~/components/Tools/Common/SmartTooltip.vue";
import Fuse from "fuse.js";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import HowToUse from "~/components/Tools/Common/HowToUse.vue";

interface Props {
  gameData: GameData;
  toolConfig?: Tool;
  theme?: ColorTheme;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

// Tool layout setup
useToolLayout({
  title:
    props.toolConfig?.config?.seo?.title ||
    props.toolConfig?.title ||
    "NPC Quest Tracker",
  description:
    props.toolConfig?.config?.seo?.description ||
    props.toolConfig?.description ||
    "Track your progress through NPC questlines in Dark Souls Remastered",
  iconPath: props.toolConfig?.icon || "i-heroicons-user-group",
  tool: props.toolConfig,
  gameId: "ds1",
  gameData: props.gameData,
});

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

// Helper to find the step where a reward is obtained
function getRewardStepInfo(npc: QuestState, reward: QuestReward) {
  if (!npc || !reward) return null;
  const step = npc.requirements.find(
    (req: any) =>
      Array.isArray(req.rewards) && req.rewards.includes(reward.name)
  );
  if (!step) return null;
  return {
    stepName: step.name,
    location: step.location || null,
  };
}

// Helper to get rewards with step info for display
function getNpcRewardDisplay(npc: QuestState) {
  if (!npc || !npc.rewards) return [];
  return npc.rewards.map((reward) => ({
    reward,
    stepInfo: getRewardStepInfo(npc, reward),
  }));
}

const safeTheme = useSafeTheme(props.theme, props.variant);

const howToUseSteps = [
  {
    type: "step" as const,
    title: "Search for an NPC or questline",
    description:
      "Use the search bar to quickly find NPCs, questlines, or specific rewards.",
  },
  {
    type: "step" as const,
    title: "Expand an NPC to view quest steps",
    description:
      "Click on an NPC card to expand and view all quest steps, locations, fail conditions, and rewards.",
  },
  {
    type: "step" as const,
    title: "Mark steps as completed",
    description:
      "Check off each quest step as you complete it. Your progress is saved automatically in your browser.",
  },
  {
    type: "step" as const,
    title: "Reset progress",
    description:
      "Use the 'Reset All Progress' button to clear all quest progress, or the reset icon on an expanded NPC to reset just that NPC's questline.",
  },
  {
    type: "tip" as const,
    title: "Track fail conditions",
    description:
      "Pay attention to fail conditions listed for each step to avoid missing out on rewards or quest progression.",
    icon: "i-heroicons-exclamation-triangle",
  },
  {
    type: "tip" as const,
    title: "Hover for details",
    description:
      "Hover over info icons to see full details for locations, prerequisites, or fail conditions that are truncated.",
    icon: "i-heroicons-information-circle",
  },
];
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
          <!-- Total Quest Rewards Section -->
          <div
            v-if="npc.rewards && npc.rewards.length"
            class="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-100/60 dark:bg-gray-800/40 p-3 mb-2"
          >
            <div
              class="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2"
            >
              Total Quest Rewards
            </div>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="item in getNpcRewardDisplay(npc)"
                :key="item.reward.id"
                class="flex flex-col items-start min-w-[120px] max-w-xs bg-transparent rounded p-2 border border-gray-100 dark:border-gray-800"
              >
                <div class="flex items-center gap-2 mb-0.5">
                  <span
                    class="font-medium text-gray-900 dark:text-white text-sm"
                    >{{ item.reward.name }}</span
                  >
                  <span
                    v-if="item.reward.type"
                    class="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    >{{ item.reward.type }}</span
                  >
                </div>
                <div
                  v-if="item.reward.description"
                  class="text-xs text-gray-600 dark:text-gray-400 mt-0.5"
                >
                  {{ item.reward.description }}
                </div>
                <div
                  v-if="item.stepInfo && item.stepInfo.stepName"
                  class="text-xs text-gray-500 dark:text-gray-400 mt-0.5"
                >
                  Step: {{ item.stepInfo.stepName }}
                </div>
                <div
                  v-if="item.reward.location"
                  class="text-xs text-gray-500 dark:text-gray-400 mt-0.5"
                >
                  {{ item.reward.location }}
                </div>
              </div>
            </div>
          </div>
          <!-- End Total Quest Rewards Section -->
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
                    <!-- Prerequisites display, filter out kebab-case -->
                    <span
                      v-for="prereq in (step.prerequisites || []).filter(
                        (p) => !p.includes('-')
                      )"
                      :key="'prereq-' + prereq"
                      class="flex items-center gap-1"
                    >
                      <CategoryChip
                        category="info"
                        :display-name="
                          ('Prerequisite: ' + prereq).length > 20
                            ? 'Prerequisite: ' + prereq.slice(0, 20) + '…'
                            : 'Prerequisite: ' + prereq
                        "
                        size="sm"
                      />
                      <SmartTooltip
                        v-if="('Prerequisite: ' + prereq).length > 20"
                      >
                        <template #trigger>
                          <Icon
                            name="i-heroicons-information-circle"
                            class="w-4 h-4 text-info cursor-pointer flex-shrink-0"
                            tabindex="0"
                            aria-label="Show full prerequisite"
                          />
                        </template>
                        <div class="flex items-start gap-3">
                          <Icon
                            name="i-heroicons-academic-cap"
                            class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                          />
                          <div class="flex-1">
                            <div
                              class="font-medium text-gray-900 dark:text-white mb-2"
                            >
                              Prerequisite
                            </div>
                            <div
                              class="text-gray-700 dark:text-gray-300 leading-relaxed"
                            >
                              {{ prereq }}
                            </div>
                          </div>
                        </div>
                      </SmartTooltip>
                    </span>
                    <!-- Fail conditions -->
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
                    <!-- Rewards badges on a new line -->
                    <div
                      v-if="step.rewards && step.rewards.length"
                      class="w-full mt-2 flex flex-wrap gap-2"
                    >
                      <CategoryChip
                        v-for="reward in step.rewards"
                        :key="'reward-' + reward"
                        category="reward"
                        :display-name="'Reward: ' + reward"
                        size="sm"
                      />
                    </div>
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
    <!-- How To Use Section -->
    <HowToUse :steps="howToUseSteps" :theme="safeTheme" class="mt-10" />
  </div>
</template>
