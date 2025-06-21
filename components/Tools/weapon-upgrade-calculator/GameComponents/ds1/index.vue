<script setup lang="ts">
import { computed } from "vue";
import { useWeaponUpgradeForm } from "~/composables/useWeaponUpgradeForm";
import { useToolLayout } from "~/composables/useToolLayout";
import { useSafeTheme } from "~/composables/useSafeTheme";
import SummaryCard from "../../../Common/display/SummaryCard.vue";
import ErrorBoundary from "../../../Common/ErrorBoundary.vue";
import HeroSection from "../../../Common/HeroSection.vue";
import UpgradeSummary from "~/components/Tools/weapon-upgrade-calculator/GameComponents/Common/UpgradeSummary.vue";
import NumberField from "../../../Common/forms/NumberField.vue";
import SelectField from "../../../Common/forms/SelectField.vue";
import FormSection from "../../../Common/forms/FormSection.vue";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";
import type { ColorTheme } from "~/utils/themes/colorSystem";

interface Props {
  gameData: GameData;
  toolConfig?: Tool;
  theme?: ColorTheme;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const safeTheme = useSafeTheme(props.theme, props.variant);

// Get terminology from game config
const terminology = computed(() => props.gameData?.config?.terminology || {});

// Tool layout setup
const { selectedTheme } = useToolLayout({
  title: props.toolConfig?.title || "Weapon Upgrade Calculator",
  description:
    props.toolConfig?.description ||
    "Calculate souls and materials needed to reinforce weapons",
  iconPath: props.toolConfig?.icon || "public/titanite_chunk.png",
  enablePerformanceMonitoring: true,
});

// Form logic
const {
  state,
  unwrappedResult,
  maxLevelForSelectedPath,
  merchantIdString,
  upgradePathItems,
  merchantItems,
  currentWeaponPathItems,
  upgradePathSelectModel,
  merchantSelectModel,
  currentWeaponPathSelectModel,
  clearForm,
} = useWeaponUpgradeForm();
</script>

<template>
  <!-- Hero Section -->
  <HeroSection
    v-if="gameData"
    :title="toolConfig?.title || 'Weapon Upgrade Calculator'"
    :description="
      toolConfig?.description ||
      'Calculate souls and materials needed to reinforce weapons'
    "
    :icon-path="toolConfig?.icon || 'public/titanite_chunk.png'"
    :theme="safeTheme"
    :game-data="gameData"
  />

  <ErrorBoundary
    :on-retry="clearForm"
    :on-reset="clearForm"
    @error="(error) => console.error('Weapon Upgrade Calculator Error:', error)"
  >
    <!-- Calculator Card -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-center gap-2">
          <h2 class="text-lg font-semibold">
            {{ terminology.weapon || "Weapon" }}
            {{ terminology.upgrade || "Upgrade" }} Calculator
          </h2>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Input Fields -->
        <FormSection title="" :theme="safeTheme">
          <NumberField
            :label="`Current ${terminology.level || 'Level'}`"
            id="currentLevel"
            :model-value="
              state.currentLevel ? parseInt(state.currentLevel) : undefined
            "
            placeholder="0"
            :min="0"
            :max="14"
            :theme="safeTheme"
            @update:model-value="
              (val) =>
                (state.currentLevel =
                  val !== undefined && val !== null ? val.toString() : '')
            "
          />
          <NumberField
            :label="`Desired ${terminology.level || 'Level'}`"
            id="desiredLevel"
            :model-value="
              state.desiredLevel ? parseInt(state.desiredLevel) : undefined
            "
            placeholder="5"
            :min="1"
            :max="maxLevelForSelectedPath"
            :theme="safeTheme"
            @update:model-value="
              (val) =>
                (state.desiredLevel =
                  val !== undefined && val !== null ? val.toString() : '')
            "
          />
        </FormSection>

        <!-- Weapon Path Selection -->
        <FormSection title="" :theme="safeTheme">
          <SelectField
            :label="terminology.currentWeaponPath || 'Current Weapon Path'"
            id="currentWeaponPath"
            :model-value="currentWeaponPathSelectModel"
            :options="currentWeaponPathItems"
            :theme="safeTheme"
            @update:model-value="(val) => (currentWeaponPathSelectModel = val)"
          />
          <SelectField
            :label="terminology.desiredWeaponPath || 'Desired Weapon Path'"
            id="upgradePath"
            :model-value="upgradePathSelectModel"
            :options="upgradePathItems"
            :theme="safeTheme"
            @update:model-value="(val) => (upgradePathSelectModel = val)"
          />
        </FormSection>

        <!-- Merchant -->
        <FormSection title="" :theme="safeTheme">
          <SelectField
            :label="terminology.merchant || 'Merchant'"
            id="merchants"
            :model-value="merchantSelectModel"
            :options="merchantItems"
            :placeholder="`Select a ${terminology.merchant?.toLowerCase() || 'merchant'} (optional)`"
            :theme="safeTheme"
            @update:model-value="(val) => (merchantSelectModel = val)"
          />
        </FormSection>

        <!-- Clear Button -->
        <div class="flex justify-end">
          <UButton color="primary" variant="outline" @click.prevent="clearForm">
            <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-1" />
            Clear
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Summary Card for Total Cost -->
    <SummaryCard
      v-if="unwrappedResult && unwrappedResult.souls > 0"
      :label="`Total ${terminology.souls || 'Souls'} Required`"
      :value="unwrappedResult.souls"
      :unit="terminology.souls || 'Souls'"
      subtitle="Calculation result"
      :details="`${terminology.level || 'Level'} ${state.currentLevel} → ${state.desiredLevel} (${unwrappedResult.steps.length} steps)`"
      :theme="safeTheme"
      :terminology="terminology"
      class="mt-6"
    />

    <!-- Upgrade Summary -->
    <UpgradeSummary
      v-if="unwrappedResult"
      :souls="unwrappedResult.souls"
      :materials="unwrappedResult.materials"
      :steps="unwrappedResult.steps"
      :selected-merchant-id="merchantIdString"
      :selected-theme="safeTheme"
      :icon-path="toolConfig?.icon || 'public/titanite_chunk.png'"
      :terminology="terminology"
    />
  </ErrorBoundary>
</template>
