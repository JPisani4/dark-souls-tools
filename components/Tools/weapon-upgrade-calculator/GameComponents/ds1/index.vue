<script setup lang="ts">
import { computed } from "vue";
import { useWeaponUpgradeForm } from "~/composables/useWeaponUpgradeForm";
import { useToolLayout } from "~/composables/useToolLayout";
import { useSafeTheme } from "~/composables/useSafeTheme";
import { getRandomTheme } from "~/utils/themes/colorSystem";
import SummaryCard from "../../../Common/display/SummaryCard.vue";
import ErrorBoundary from "../../../Common/ErrorBoundary.vue";
import HeroSection from "../../../Common/HeroSection.vue";
import UpgradeSummary from "~/components/Tools/weapon-upgrade-calculator/GameComponents/Common/UpgradeSummary.vue";
import NumberField from "../../../Common/forms/NumberField.vue";
import SelectField from "../../../Common/forms/SelectField.vue";
import FormSection from "../../../Common/forms/FormSection.vue";
import HowToUse from "../../../Common/HowToUse.vue";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";
import type { ColorTheme } from "~/utils/themes/colorSystem";
import Icon from "~/components/Common/Icon.vue";
import { useUpgradeSummary } from "~/composables/useUpgradeSummary";

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

// Generate random theme for the calculator and summary sections
const calculatorTheme = getRandomTheme();
const summaryTheme = getRandomTheme();

// Get terminology from game config
const terminology = computed(() => props.gameData?.config?.terminology || {});

// Tool layout setup
useToolLayout({
  title:
    props.toolConfig?.config?.seo?.title ||
    props.toolConfig?.title ||
    "Weapon Upgrade Calculator",
  description:
    props.toolConfig?.config?.seo?.description ||
    props.toolConfig?.description ||
    "Calculate the souls and materials needed to upgrade weapons",
  iconPath: props.toolConfig?.icon || "i-heroicons-cube",
  tool: props.toolConfig,
  gameId: "ds1",
  gameData: props.gameData,
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

// Check if both level fields have been entered
const hasBothLevels = computed(() => {
  return (
    state.currentLevel &&
    state.currentLevel.trim() !== "" &&
    state.desiredLevel &&
    state.desiredLevel.trim() !== ""
  );
});

// Calculate total cost including material costs when merchant is selected
const totalCost = computed(() => {
  if (!unwrappedResult.value || !unwrappedResult.value.souls) {
    return 0;
  }

  const reinforcementCost = unwrappedResult.value.souls;

  // If a merchant is selected, calculate material costs
  if (merchantIdString.value) {
    const { purchaseableCost } = useUpgradeSummary({
      materials: computed(() => unwrappedResult.value?.materials || {}),
      steps: computed(() => unwrappedResult.value?.steps || []),
      selectedMerchantId: merchantIdString,
    });

    return reinforcementCost + purchaseableCost.value;
  }

  return reinforcementCost;
});

// How to Use steps for weapon upgrade calculator
const howToUseSteps = [
  {
    type: "step" as const,
    title: "Enter Current Level",
    description: "Input your weapon's current upgrade level (0-14).",
  },
  {
    type: "step" as const,
    title: "Enter Desired Level",
    description: "Input the upgrade level you want to reach (1-15).",
  },
  {
    type: "step" as const,
    title: "Select Upgrade Path",
    description: "Choose your current weapon path and desired upgrade path.",
  },
  {
    type: "step" as const,
    title: "View Results",
    description: "See the total souls and materials needed for the upgrade.",
  },
  {
    type: "tip" as const,
    title: "Merchant Selection",
    description:
      "Select a merchant to see potential savings on material costs.",
  },
];
</script>

<template>
  <!-- Hero Section -->
  <HeroSection
    v-if="gameData"
    :title="toolConfig?.title || 'Weapon Upgrade Calculator'"
    :description="
      toolConfig?.description ||
      'Calculate the souls and materials needed to upgrade weapons'
    "
    :icon-path="toolConfig?.icon || 'public/weapon-upgrade-calculator-icon.png'"
    :theme="safeTheme"
    :game-data="gameData"
  />

  <ErrorBoundary
    :on-retry="clearForm"
    :on-reset="clearForm"
    @error="(error) => console.error('Weapon Upgrade Calculator Error:', error)"
  >
    <!-- Calculator Card with themed styling -->
    <UCard :class="`shadow-md rounded-xl border-l-4 ${calculatorTheme.border}`">
      <div class="space-y-6">
        <!-- Input Fields -->
        <FormSection title="" :theme="calculatorTheme">
          <NumberField
            :label="`Current ${terminology.level || 'Level'}`"
            id="currentLevel"
            :model-value="
              state.currentLevel ? parseInt(state.currentLevel) : undefined
            "
            placeholder="0"
            :min="0"
            :max="14"
            :theme="calculatorTheme"
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
            :theme="calculatorTheme"
            @update:model-value="
              (val) =>
                (state.desiredLevel =
                  val !== undefined && val !== null ? val.toString() : '')
            "
          />
        </FormSection>

        <!-- Weapon Path Selection -->
        <FormSection title="" :theme="calculatorTheme">
          <SelectField
            :label="terminology.currentWeaponPath || 'Current Weapon Path'"
            id="currentWeaponPath"
            :model-value="currentWeaponPathSelectModel"
            :options="currentWeaponPathItems"
            :placeholder="`Select current ${terminology.weapon?.toLowerCase() || 'weapon'} path`"
            :theme="calculatorTheme"
            @update:model-value="(val) => (currentWeaponPathSelectModel = val)"
          />
          <SelectField
            :label="terminology.desiredWeaponPath || 'Desired Weapon Path'"
            id="upgradePath"
            :model-value="upgradePathSelectModel"
            :options="upgradePathItems"
            :placeholder="`Select desired ${terminology.upgrade?.toLowerCase() || 'upgrade'} path`"
            :theme="calculatorTheme"
            @update:model-value="(val) => (upgradePathSelectModel = val)"
          />
        </FormSection>

        <!-- Merchant -->
        <FormSection title="" :theme="calculatorTheme">
          <SelectField
            :label="terminology.merchant || 'Merchant'"
            id="merchants"
            :model-value="merchantSelectModel"
            :options="merchantItems"
            :placeholder="`Select a ${terminology.merchant?.toLowerCase() || 'merchant'} (optional)`"
            :theme="calculatorTheme"
            @update:model-value="(val) => (merchantSelectModel = val)"
          />
        </FormSection>

        <!-- Clear Button -->
        <div class="flex justify-end">
          <UButton
            color="primary"
            variant="outline"
            @click.prevent="clearForm"
            :class="`${calculatorTheme.iconBg} ${calculatorTheme.hoverBg} text-white border-${calculatorTheme.border.split('-')[1]}-300 hover:border-${calculatorTheme.border.split('-')[1]}-400`"
          >
            <Icon name="i-heroicons-x-mark" class="w-4 h-4 mr-1" />
            Clear
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Upgrade Summary with themed styling -->
    <div v-if="unwrappedResult && hasBothLevels" class="mt-6">
      <UpgradeSummary
        :souls="unwrappedResult.souls"
        :materials="unwrappedResult.materials"
        :steps="unwrappedResult.steps"
        :selected-merchant-id="merchantIdString"
        :selected-theme="summaryTheme"
        :icon-path="
          toolConfig?.icon || 'public/weapon-upgrade-calculator-icon.png'
        "
        :terminology="terminology"
        :total-cost="totalCost"
      />
    </div>
  </ErrorBoundary>

  <!-- How to Use -->
  <HowToUse :steps="howToUseSteps" :theme="safeTheme" class="mt-8" />
</template>
