<script setup lang="ts">
// 1. Vue imports
import { computed } from "vue";

// 2. Composable imports
import { useSafeTheme } from "~/composables/useSafeTheme";
import { useSoulLevelCalculator } from "~/composables/useSoulLevelCalculator";
import { useToolLayout } from "~/composables/useToolLayout";

// 3. Type imports
import type { ColorTheme } from "~/utils/themes/colorSystem";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";

// 4. Shared components
import FormSection from "../../../Common/forms/FormSection.vue";
import HeroSection from "../../../Common/HeroSection.vue";
import NumberField from "../../../Common/forms/NumberField.vue";
import ResultsTable from "../../../Common/display/ResultsTable.vue";
import SummaryCard from "../../../Common/display/SummaryCard.vue";
import CustomPagination from "../../../Common/CustomPagination.vue";

// 5. Props and types
interface Props {
  gameData: GameData;
  toolConfig?: Tool;
  theme?: ColorTheme;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

// 6. Theme setup
const safeTheme = useSafeTheme(props.theme, props.variant);

// 7. Tool layout
const { selectedTheme } = useToolLayout({
  title: props.toolConfig?.title || "Soul Level Calculator",
  description:
    props.toolConfig?.description ||
    "Calculate the souls required to level up your character",
  iconPath: props.toolConfig?.icon || "public/soul-level-calculator-icon.png",
  enablePerformanceMonitoring: true,
});

// 8. Game terminology
const terminology = computed(() => props.gameData?.config?.terminology || {});

// 9. Tool-specific logic
const {
  state,
  current,
  desired,
  tableRows,
  filteredLevelsCount,
  totalSoulsCost,
  resetForm,
  formatNumber,
  LEVEL_MIN,
  LEVEL_MAX,
  page,
  totalPages,
  pageSize,
  setPage,
} = useSoulLevelCalculator();

// 10. Computed properties
const tableColumns = computed(() => [
  {
    key: "level",
    label: terminology.value.level || "Level",
    format: "number" as const,
  },
  {
    key: "souls",
    label: `${terminology.value.souls || "Souls"} Required`,
    format: "number" as const,
  },
]);

const formattedTableData = computed(() =>
  tableRows.value.map((row) => ({
    level: row.level,
    souls: row.souls,
  }))
);
</script>

<template>
  <!-- Hero Section -->
  <HeroSection
    v-if="gameData"
    :title="toolConfig?.title || 'Soul Level Calculator'"
    :description="
      toolConfig?.description ||
      'Calculate the souls required to level up your character'
    "
    :icon-path="toolConfig?.icon || 'public/soul-level-calculator-icon.png'"
    :theme="safeTheme"
    :game-data="gameData"
  />

  <!-- Calculator Card -->
  <UCard>
    <template #header>
      <div class="flex items-center justify-center">
        <h3 class="text-lg font-semibold">
          {{ terminology.level || "Level" }} Calculator
        </h3>
      </div>
    </template>

    <div class="space-y-6">
      <!-- Input Fields -->
      <FormSection
        :title="`${terminology.level || 'Level'} Calculator`"
        :description="`Enter your current and desired ${terminology.level?.toLowerCase() || 'level'}s`"
        :theme="safeTheme"
      >
        <NumberField
          :label="terminology.currentLevel || 'Current Level'"
          id="currentLevel"
          :model-value="
            state.currentLevel ? parseInt(state.currentLevel) : undefined
          "
          placeholder=""
          :min="LEVEL_MIN"
          :max="LEVEL_MAX"
          :theme="safeTheme"
          @update:model-value="
            (val) =>
              (state.currentLevel =
                val !== undefined && val !== null ? val.toString() : '')
          "
        />
        <NumberField
          :label="terminology.desiredLevel || 'Desired Level'"
          id="desiredLevel"
          :model-value="
            state.desiredLevel ? parseInt(state.desiredLevel) : undefined
          "
          placeholder=""
          :min="LEVEL_MIN"
          :max="LEVEL_MAX"
          :theme="safeTheme"
          @update:model-value="
            (val) =>
              (state.desiredLevel =
                val !== undefined && val !== null ? val.toString() : '')
          "
        />
      </FormSection>

      <!-- Summary Card for Total Cost -->
      <SummaryCard
        v-if="totalSoulsCost && totalSoulsCost > 0"
        :value="totalSoulsCost"
        :label="terminology.totalCost || 'Total Souls Required'"
        :unit="terminology.souls || 'Souls'"
        :subtitle="'Calculation result'"
        :details="`${terminology.level || 'Level'} ${current} → ${desired} (${filteredLevelsCount} ${terminology.level?.toLowerCase() || 'level'}s)`"
        :theme="safeTheme"
        :terminology="terminology"
      />

      <!-- Clear Button -->
      <div class="flex justify-end">
        <UButton color="primary" variant="outline" @click.prevent="resetForm">
          <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-1" />
          Clear
        </UButton>
      </div>
    </div>
  </UCard>

  <!-- Results Table -->
  <ResultsTable
    v-if="filteredLevelsCount > 0"
    :columns="tableColumns"
    :data="formattedTableData"
    :theme="safeTheme"
    :terminology="terminology"
  />

  <!-- Pagination -->
  <div class="flex justify-center mt-4">
    <CustomPagination
      v-if="filteredLevelsCount > pageSize"
      :current-page="page"
      :total-pages="totalPages"
      :total-items="filteredLevelsCount"
      :page-size="pageSize"
      @update:currentPage="setPage"
    />
  </div>
</template>
