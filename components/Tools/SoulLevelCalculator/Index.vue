<script lang="ts">
import { useSeoMeta } from "#imports";
import { useSoulLevelCalculator } from "~/composables/useSoulLevelCalculator";
import { ICONS } from "~/utils/constants";
import { getPerformanceMetrics } from "~/utils/performance";
import HeroSection from "../Common/HeroSection.vue";
import TotalCostDisplay from "../Common/TotalCostDisplay.vue";
import CustomPagination from "../Common/CustomPagination.vue";
import FormFieldWithIcon from "../Common/FormFieldWithIcon.vue";

const pageTitle = "Soul Level Calculator";

export default defineComponent({
  name: "SoulLevelCalculator",
  components: {
    HeroSection,
    TotalCostDisplay,
    CustomPagination,
    FormFieldWithIcon,
  },
  setup() {
    useSeoMeta({
      title: pageTitle,
      ogTitle: pageTitle,
      twitterTitle: pageTitle,
    });

    const {
      state,
      selectedTheme,
      current,
      desired,
      validation,
      page,
      totalPages,
      tableRows,
      filteredLevelsCount,
      totalSoulsCost,
      setPage,
      resetForm,
      formatNumber,
      isMobile,
      isTablet,
      pageSize,
      LEVEL_MIN,
      LEVEL_MAX,
    } = useSoulLevelCalculator();

    // Performance monitoring
    const showMetrics = computed(() => process.env.NODE_ENV === "development");
    const metrics = computed(() => getPerformanceMetrics());
    const deviceType = computed(() => {
      if (isMobile.value) return "Mobile";
      if (isTablet.value) return "Tablet";
      return "Desktop";
    });

    return {
      state,
      selectedTheme,
      current,
      desired,
      validation,
      page,
      totalPages,
      tableRows,
      filteredLevelsCount,
      totalSoulsCost,
      setPage,
      resetForm,
      formatNumber,
      isMobile,
      isTablet,
      pageSize,
      LEVEL_MIN,
      LEVEL_MAX,
      pageTitle,
      ICONS,
      showMetrics,
      metrics,
      deviceType,
    };
  },
});

export const meta = {
  title: "Soul Level Calculator",
  description: "Calculates number of souls needed to reach a specific level.",
};
</script>

<template>
  <UContainer>
    <section class="p-4 max-w-3xl mx-auto">
      <!-- Hero Section -->
      <HeroSection
        :title="pageTitle"
        description="Calculate the souls required to level up your character"
        :icon-path="ICONS.CURRENT_LEVEL"
        :theme="selectedTheme"
        variant="default"
      />

      <!-- Calculator Card -->
      <UCard class="mb-6">
        <template #header>
          <div class="flex items-center justify-center gap-2">
            <svg
              class="w-7 h-7"
              :class="selectedTheme.icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="ICONS.CALCULATOR"
              ></path>
            </svg>
            <h2 class="text-lg font-semibold">Level Calculator</h2>
          </div>
        </template>

        <div class="space-y-6">
          <!-- Input Fields -->
          <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFieldWithIcon
              v-model="state.currentLevel"
              label="Current Level"
              id="currentLevel"
              placeholder="Enter current level"
              :min="LEVEL_MIN"
              :max="LEVEL_MAX"
              :icon-path="ICONS.CURRENT_LEVEL"
              :icon-color-class="selectedTheme.icon"
            />
            <FormFieldWithIcon
              v-model="state.desiredLevel"
              label="Desired Level"
              id="desiredLevel"
              placeholder="Enter desired level"
              :min="LEVEL_MIN"
              :max="LEVEL_MAX"
              :icon-path="ICONS.DESIRED_LEVEL"
              :icon-color-class="selectedTheme.icon"
            />
          </form>

          <!-- Total Cost Display -->
          <TotalCostDisplay
            v-if="totalSoulsCost && totalSoulsCost > 0"
            :cost="totalSoulsCost"
            label="Total Souls Required"
            unit="Souls"
            :subtitle="`Level ${current} → ${desired}`"
            :details="`${filteredLevelsCount} levels to upgrade`"
            :theme="selectedTheme"
          />
        </div>
      </UCard>

      <!-- Results Table -->
      <UCard v-if="filteredLevelsCount > 0" class="mt-4">
        <template #header>
          <div class="flex items-center justify-center gap-2">
            <svg
              class="w-7 h-7"
              :class="selectedTheme.icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="ICONS.TABLE"
              ></path>
            </svg>
            <h3 class="text-lg font-semibold">Soul Requirements by Level</h3>
          </div>
        </template>
        <div class="overflow-x-auto table-container">
          <table class="min-w-full divide-y divide-default select-text">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider select-text"
                >
                  Level
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider select-text"
                >
                  Souls Required
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-default">
              <tr
                v-for="row in tableRows"
                :key="row.level"
                class="hover:bg-muted/30 transition-colors duration-150 group select-text"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground select-text cursor-text"
                >
                  {{ row.level }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground font-mono group-hover:text-foreground transition-colors duration-150 select-text cursor-text"
                >
                  {{ formatNumber(row.souls) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template #footer>
          <CustomPagination
            :current-page="page"
            :total-pages="totalPages"
            @update:current-page="setPage"
          />
        </template>
      </UCard>
    </section>
  </UContainer>
</template>
