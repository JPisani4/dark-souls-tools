import { ref, computed, onMounted } from "vue";
import { useBaseTool } from "~/composables/useBaseTool";
import Fuse from "fuse.js";
import {
  getAllAchievements,
  getAchievementProgress,
} from "~/utils/games/ds1/achievements";
import { getThemeByIndex } from "~/utils/themes/colorSystem";
import type {
  Achievement,
  AchievementRequirement,
  AchievementCategory,
} from "~/types/game/ds1/achievements";

export interface AchievementTrackerState {
  completedRequirements: Record<string, Record<number, string[]>>;
  currentCycle: Record<string, number>;
  expandedAchievementIds: string[];
  expandedCategoryIds: Record<string, string[]>;
  search: string;
}

export function useAchievementTracker() {
  const initialState: AchievementTrackerState = {
    completedRequirements: {},
    currentCycle: {},
    expandedAchievementIds: [],
    expandedCategoryIds: {},
    search: "",
  };

  const { state, setState, reset } = useBaseTool<
    AchievementTrackerState,
    { timestamp: Date }
  >(
    {
      initialState,
      autoSave: true,
      autoSaveKey: "achievement-tracker-ds1",
      debounceMs: 500,
    },
    async (state) => ({ timestamp: new Date(), ...state })
  );

  const allAchievements = getAllAchievements();
  const achievements = computed<Achievement[]>(() =>
    Object.values(allAchievements).flat()
  );

  // Fuzzy search
  const filteredAchievements = computed<Achievement[]>(() => {
    if (!state.search) return achievements.value;
    const fuse = new Fuse(achievements.value, {
      keys: ["name", "description"],
      threshold: 0.35,
      minMatchCharLength: 2,
      ignoreLocation: true,
    });
    return fuse.search(state.search).map((result) => result.item);
  });

  // Theme assignment
  const achievementThemes = ref<Record<string, any>>({});
  onMounted(() => {
    achievements.value.forEach((achievement, idx) => {
      if (!achievementThemes.value[achievement.id]) {
        achievementThemes.value[achievement.id] = getThemeByIndex(idx);
      }
    });
  });

  // Expansion
  function expandAchievement(achievementId: string) {
    const newExpandedIds = [...state.expandedAchievementIds];
    const index = newExpandedIds.indexOf(achievementId);
    if (index > -1) {
      newExpandedIds.splice(index, 1);
    } else {
      newExpandedIds.push(achievementId);
    }
    setState({ expandedAchievementIds: newExpandedIds });
  }

  function toggleCategory(achievementId: string, category: string) {
    const currentExpanded = state.expandedCategoryIds[achievementId] || [];
    const newExpanded = [...currentExpanded];
    const index = newExpanded.indexOf(category);
    if (index > -1) {
      newExpanded.splice(index, 1);
    } else {
      newExpanded.push(category);
    }
    setState({
      expandedCategoryIds: {
        ...state.expandedCategoryIds,
        [achievementId]: newExpanded,
      },
    });
  }

  function isCategoryExpanded(achievementId: string, category: string) {
    return (state.expandedCategoryIds[achievementId] || []).includes(category);
  }

  // Reset
  function resetAllProgress() {
    setState({ completedRequirements: {}, currentCycle: {} });
  }
  function resetAchievementProgress(achievementId: string) {
    setState({
      completedRequirements: {
        ...state.completedRequirements,
        [achievementId]: {},
      },
      currentCycle: {
        ...state.currentCycle,
        [achievementId]: 0,
      },
    });
  }
  function resetCategoryProgress(achievementId: string, category: string) {
    const achievement = achievements.value.find((a) => a.id === achievementId);
    if (!achievement) return;
    const categoryRequirements = achievement.requirements.filter(
      (req) => req.category === category
    );
    const categoryIds = categoryRequirements.map((req) => req.id);
    const currentCompleted = state.completedRequirements[achievementId] || {};
    const updatedCompleted = Object.fromEntries(
      Object.entries(currentCompleted).map(([cycle, completed]) => [
        cycle,
        completed.filter((id) => !categoryIds.includes(id)),
      ])
    );
    setState({
      completedRequirements: {
        ...state.completedRequirements,
        [achievementId]: updatedCompleted,
      },
    });
  }

  // Progress
  function getAchievementProgressData(achievement: Achievement) {
    const currentCycle = getCurrentCycle(achievement.id);
    const completedUpToCycle = getCompletedUpToCycle(
      achievement.id,
      currentCycle
    );
    return getAchievementProgress(achievement.id, completedUpToCycle);
  }
  function getCategoryProgress(achievement: Achievement, category: string) {
    const categoryRequirements = achievement.requirements.filter(
      (req) => req.category === category
    );
    const currentCycle = getCurrentCycle(achievement.id);
    const completedUpToCycle = getCompletedUpToCycle(
      achievement.id,
      currentCycle
    );
    const categoryCompleted = categoryRequirements.filter((req) =>
      completedUpToCycle.includes(req.id)
    );
    return {
      completed: categoryCompleted.length,
      total: categoryRequirements.length,
      percentage:
        categoryRequirements.length > 0
          ? Math.round(
              (categoryCompleted.length / categoryRequirements.length) * 100
            )
          : 0,
    };
  }

  // Requirement completion
  function isRequirementCompleted(
    achievementId: string,
    requirementId: string
  ) {
    const currentCycle = getCurrentCycle(achievementId);
    const completedForCycle =
      (state.completedRequirements[achievementId] || {})[currentCycle] ?? [];
    return completedForCycle.includes(requirementId);
  }
  function toggleRequirementCompleted(
    achievementId: string,
    requirementId: string,
    checked: boolean
  ) {
    const currentCycle = getCurrentCycle(achievementId);
    const prev =
      (state.completedRequirements[achievementId] || {})[currentCycle] ?? [];
    let updated: string[];
    if (checked) {
      updated = [...new Set([...prev, requirementId])];
    } else {
      updated = prev.filter((id) => id !== requirementId);
    }
    setState({
      completedRequirements: {
        ...state.completedRequirements,
        [achievementId]: {
          ...(state.completedRequirements[achievementId] ?? {}),
          [currentCycle]: updated,
        },
      },
    });
  }

  // Category helpers
  function getRequirementCategories(achievement: Achievement) {
    const categories = new Set(
      achievement.requirements.map((req) => req.category)
    );
    return Array.from(categories).sort();
  }
  function getRequirementsByCategory(
    achievement: Achievement,
    category: string
  ) {
    return achievement.requirements.filter((req) => req.category === category);
  }

  // Cycle navigation
  function getCurrentCycle(achievementId: string) {
    return state.currentCycle[achievementId] ?? 0;
  }
  function setCurrentCycle(achievementId: string, cycle: number) {
    setState({
      currentCycle: {
        ...state.currentCycle,
        [achievementId]: cycle,
      },
    });
  }
  function goToNextCycle(achievementId: string) {
    setCurrentCycle(achievementId, getCurrentCycle(achievementId) + 1);
  }
  function goToPreviousCycle(achievementId: string) {
    const current = getCurrentCycle(achievementId);
    if (current > 0) {
      setCurrentCycle(achievementId, current - 1);
    }
  }
  function getRequirementsForCurrentCycle(
    achievement: Achievement,
    category: string
  ) {
    const allRequirements = achievement.requirements.filter(
      (req) => req.category === category
    );
    const achievementCompleted =
      state.completedRequirements[achievement.id] || {};
    const currentCycle = getCurrentCycle(achievement.id);
    let completedInPreviousCycles = new Set<string>();
    for (let i = 0; i < currentCycle; i++) {
      (achievementCompleted[i] ?? []).forEach((id) =>
        completedInPreviousCycles.add(id)
      );
    }
    return allRequirements.filter(
      (req) => !completedInPreviousCycles.has(req.id)
    );
  }
  function getCompletedForCycle(achievementId: string, cycle: number) {
    return state.completedRequirements[achievementId]?.[cycle] ?? [];
  }
  function getCompletedUpToCycle(achievementId: string, cycle: number) {
    const completed = state.completedRequirements[achievementId] || {};
    let allCompleted: string[] = [];
    for (let i = 0; i <= cycle; i++) {
      allCompleted = allCompleted.concat(completed[i] ?? []);
    }
    return allCompleted;
  }
  function isAchievementFullyCompleted(achievement: Achievement) {
    const completed = state.completedRequirements[achievement.id] || {};
    const allCompleted = Object.values(completed).flat();
    return (
      getAchievementProgress(achievement.id, allCompleted).percentage === 100
    );
  }
  function isCurrentCycleCompleted(achievement: Achievement) {
    const currentCycle = getCurrentCycle(achievement.id);
    const completed = getCompletedForCycle(achievement.id, currentCycle);
    return getAchievementProgress(achievement.id, completed).percentage === 100;
  }
  function getLastCreatedCycle(achievementId: string) {
    const cycles = Object.keys(
      state.completedRequirements[achievementId] || {}
    ).map(Number);
    return cycles.length > 0 ? Math.max(...cycles) : 0;
  }
  function isNextCycleDisabled(achievement: Achievement) {
    const currentCycle = getCurrentCycle(achievement.id);
    const lastCreatedCycle = getLastCreatedCycle(achievement.id);
    return (
      currentCycle === lastCreatedCycle && isCurrentCycleCompleted(achievement)
    );
  }

  return {
    state,
    setState,
    reset,
    achievements,
    filteredAchievements,
    achievementThemes,
    expandAchievement,
    toggleCategory,
    isCategoryExpanded,
    resetAllProgress,
    resetAchievementProgress,
    resetCategoryProgress,
    getAchievementProgressData,
    getCategoryProgress,
    isRequirementCompleted,
    toggleRequirementCompleted,
    getRequirementCategories,
    getRequirementsByCategory,
    getCurrentCycle,
    goToNextCycle,
    goToPreviousCycle,
    getRequirementsForCurrentCycle,
    isNextCycleDisabled,
  };
}
