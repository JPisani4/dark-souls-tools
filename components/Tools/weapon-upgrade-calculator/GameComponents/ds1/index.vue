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
  <ErrorBoundary
    :on-retry="clearForm"
    :on-reset="clearForm"
    @error="(error) => console.error('Weapon Upgrade Calculator Error:', error)"
  >
    <!-- Main Calculator Section -->
    <main role="main" aria-labelledby="tool-title">
      <!-- Calculator Card with themed styling -->
      <section aria-labelledby="calculator-title" class="mb-8">
        <UCard
          :class="`shadow-md rounded-xl border-l-4 ${calculatorTheme.border}`"
        >
          <template #header>
            <h2 id="calculator-title" class="sr-only">
              Weapon Upgrade Calculator
            </h2>
          </template>

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
                aria-describedby="current-level-help"
                @update:model-value="
                  (val) =>
                    (state.currentLevel =
                      val !== undefined && val !== null ? val.toString() : '')
                "
              />
              <div id="current-level-help" class="sr-only">
                Enter your weapon's current upgrade level between 0 and 14
              </div>

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
                aria-describedby="desired-level-help"
                @update:model-value="
                  (val) =>
                    (state.desiredLevel =
                      val !== undefined && val !== null ? val.toString() : '')
                "
              />
              <div id="desired-level-help" class="sr-only">
                Enter the upgrade level you want to reach between 1 and
                {{ maxLevelForSelectedPath }}
              </div>
            </FormSection>

            <!-- Weapon Path Selection -->
            <FormSection title="" :theme="calculatorTheme">
              <SelectField
                :label="
                  terminology.currentWeaponPath || 'Select Current Weapon Path'
                "
                id="currentWeaponPath"
                :model-value="currentWeaponPathSelectModel"
                :options="currentWeaponPathItems"
                :placeholder="`Select current ${terminology.weapon?.toLowerCase() || 'weapon'} path`"
                :theme="calculatorTheme"
                aria-describedby="current-path-help"
                @update:model-value="
                  (val: string) => (currentWeaponPathSelectModel = val)
                "
              />
              <div id="current-path-help" class="sr-only">
                Select your weapon's current upgrade path
              </div>

              <SelectField
                :label="
                  terminology.desiredWeaponPath || 'Select Desired Weapon Path'
                "
                id="upgradePath"
                :model-value="upgradePathSelectModel"
                :options="upgradePathItems"
                :placeholder="`Select desired ${terminology.upgrade?.toLowerCase() || 'upgrade'} path`"
                :theme="calculatorTheme"
                aria-describedby="desired-path-help"
                @update:model-value="
                  (val: string) => (upgradePathSelectModel = val)
                "
              />
              <div id="desired-path-help" class="sr-only">
                Select the upgrade path you want to reach
              </div>
            </FormSection>

            <!-- Merchant -->
            <FormSection title="" :theme="calculatorTheme">
              <SelectField
                :label="terminology.merchant || 'Select Merchant (optional)'"
                id="merchants"
                :model-value="merchantSelectModel"
                :options="merchantItems"
                :placeholder="`Select a ${terminology.merchant?.toLowerCase() || 'merchant'} (optional)`"
                :theme="calculatorTheme"
                aria-describedby="merchant-help"
                @update:model-value="
                  (val: string) => (merchantSelectModel = val)
                "
              />
              <div id="merchant-help" class="sr-only">
                Optional: Select a merchant to see potential savings on material
                costs
              </div>
            </FormSection>

            <!-- Clear Button -->
            <div class="flex justify-end">
              <UButton
                color="success"
                variant="outline"
                @click.prevent="clearForm"
                aria-label="Clear all form fields and reset calculator"
              >
                <Icon
                  name="i-heroicons-x-mark"
                  class="w-4 h-4 mr-1"
                  aria-hidden="true"
                />
                Clear
              </UButton>
            </div>
          </div>
        </UCard>
      </section>

      <!-- Upgrade Summary Section -->
      <section
        v-if="unwrappedResult && hasBothLevels"
        aria-labelledby="summary-title"
        aria-live="polite"
        aria-atomic="true"
        class="mt-6"
      >
        <h3 id="summary-title" class="sr-only">Upgrade Summary</h3>
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
      </section>
    </main>
  </ErrorBoundary>

  <!-- How to Use -->
  <aside aria-labelledby="how-to-use-title" class="mt-8">
    <HowToUse :steps="howToUseSteps" :theme="safeTheme" />
  </aside>
</template>
