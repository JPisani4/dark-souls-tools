<script lang="ts">
/// <reference types="vue/macros" />
import { defineComponent, reactive, computed, watch, ref } from "vue";
import { upgradePathsManifest } from "../../../utils/upgradePaths";
import { merchants } from "../../../utils/upgradeCosts";
import { useUpgradeCalculator } from "~/composables/useUpgradeCalculator";
import UpgradeSummary from "./UpgradeSummary.vue";
import { ICONS, getRandomTheme } from "~/utils/constants";
import HeroSection from "../Common/HeroSection.vue";

export default defineComponent({
  name: "UpgradeCalculator",
  components: {
    HeroSection,
    UpgradeSummary,
  },
  setup() {
    type SelectItem = { label: string; value: string };

    const state = reactive<{
      currentLevel: string;
      desiredLevel: string;
      selectedPathId: string | undefined;
      selectedMerchantId: string | undefined;
      includeAscension: boolean;
      currentWeaponPathId: string | undefined;
    }>({
      currentLevel: "",
      desiredLevel: "",
      selectedPathId: undefined,
      selectedMerchantId: undefined,
      includeAscension: true,
      currentWeaponPathId: "regular",
    });

    // Helper: get all valid ascension targets for a given path
    function getAscensionTargets(pathId: string) {
      return upgradePathsManifest
        .filter((target) => {
          if ("ascendSteps" in target && Array.isArray(target.ascendSteps)) {
            return target.ascendSteps.some(
              (step) => step.basePath && step.basePath.pathId === pathId
            );
          }
          return false;
        })
        .map((target) => target.id);
    }

    // Filter Upgrade Path options based on current weapon path
    const upgradePathItems = computed<{ label: string; value: string }[]>(
      () => {
        if (!state.currentWeaponPathId) {
          return upgradePathsManifest.map((path) => ({
            label: path.name,
            value: path.id,
          }));
        }
        // Only show self and valid ascension targets
        const validIds = [
          state.currentWeaponPathId,
          ...getAscensionTargets(state.currentWeaponPathId),
        ];
        return upgradePathsManifest
          .filter((path) => validIds.includes(path.id))
          .map((path) => ({ label: path.name, value: path.id }));
      }
    );

    const upgradePathSelectModel = computed<string | undefined>({
      get() {
        return state.selectedPathId;
      },
      set(val: string | undefined) {
        state.selectedPathId = val;
      },
    });

    const merchantItems = computed<{ label: string; value: string }[]>(() =>
      merchants.map((merchant) => ({
        label: merchant.name,
        value: merchant.id,
      }))
    );

    // Get the maximum level for the selected upgrade path
    const maxLevelForSelectedPath = computed(() => {
      if (!state.selectedPathId) return 15; // Default to Regular max

      const selectedPath = upgradePathsManifest.find(
        (path) => path.id === state.selectedPathId
      );

      if (
        !selectedPath ||
        !selectedPath.steps ||
        selectedPath.steps.length === 0
      ) {
        return 15; // Default fallback
      }

      // Find the highest 'to' level in the steps
      return Math.max(...selectedPath.steps.map((step) => step.to));
    });

    // Check if desired level is at maximum
    const isAtMaxLevel = computed(() => {
      if (!state.desiredLevel || !state.selectedPathId) return false;
      const desired = parseInt(state.desiredLevel, 10);
      return !isNaN(desired) && desired === maxLevelForSelectedPath.value;
    });

    const { result, calculate } = useUpgradeCalculator();
    const unwrappedResult = computed(() => result.value);

    const selectedTheme = ref(getRandomTheme());
    const pageTitle = "Weapon Upgrade Calculator";
    const pageDescription =
      "Calculate the souls and materials required to upgrade your weapon";

    const merchantIdString = computed(() => state.selectedMerchantId ?? "");

    // Watch all relevant inputs and recalculate automatically
    watch(
      [
        () => state.currentLevel,
        () => state.desiredLevel,
        () => state.selectedPathId,
        () => merchantIdString.value,
        () => state.includeAscension,
        () => state.currentWeaponPathId,
      ],
      ([
        currentLevel,
        desiredLevel,
        selectedPathId,
        merchantId,
        includeAscension,
        currentWeaponPathId,
      ]) => {
        if (
          !selectedPathId ||
          currentLevel === "" ||
          desiredLevel === "" ||
          !currentWeaponPathId
        ) {
          result.value = null;
          return;
        }

        const current = parseInt(state.currentLevel, 10);
        const desired = parseInt(state.desiredLevel, 10);

        if (isNaN(current) || isNaN(desired)) {
          result.value = null;
          return;
        }

        calculate({
          currentLevel: current,
          desiredLevel: desired,
          selectedPathId: state.selectedPathId ?? "",
          selectedMerchantId: merchantId,
          includeAscension: state.includeAscension,
          currentWeaponPathId: state.currentWeaponPathId ?? "",
        });
      },
      { immediate: true }
    );

    // Watch for path changes and reset desired level if it exceeds the new maximum
    watch(
      () => state.selectedPathId,
      (newPathId: string | undefined) => {
        if (newPathId && state.desiredLevel) {
          const currentDesired = parseInt(state.desiredLevel, 10);
          const maxLevel = maxLevelForSelectedPath.value;

          if (!isNaN(currentDesired) && currentDesired > maxLevel) {
            state.desiredLevel = maxLevel.toString();
          }
        }
      }
    );

    // Watch desired level and clamp to maximum if needed
    watch(
      () => state.desiredLevel,
      (newValue: string) => {
        if (newValue && state.selectedPathId) {
          const maxLevel = maxLevelForSelectedPath.value;
          const parsedValue = parseInt(newValue, 10);
          if (!isNaN(parsedValue) && parsedValue > maxLevel) {
            state.desiredLevel = maxLevel.toString();
          }
        }
      }
    );

    // Computed setter/getter for merchant select menu to always store string
    const merchantSelectModel = computed<string | undefined>({
      get() {
        return state.selectedMerchantId;
      },
      set(val: string | undefined) {
        state.selectedMerchantId = val;
      },
    });

    const currentWeaponPathSelectModel = computed<string | undefined>({
      get() {
        return state.currentWeaponPathId;
      },
      set(val: string | undefined) {
        state.currentWeaponPathId = val;
      },
    });

    // Filter Current Weapon Path options based on selected upgrade path
    const currentWeaponPathItems = computed<{ label: string; value: string }[]>(
      () => {
        if (!state.selectedPathId) {
          return upgradePathsManifest.map((path) => ({
            label: path.name,
            value: path.id,
          }));
        }
        const selected = upgradePathsManifest.find(
          (path) => path.id === state.selectedPathId
        );
        const validIds = new Set<string>();
        if (selected && Array.isArray(selected.ascendSteps)) {
          selected.ascendSteps.forEach((step) => {
            if (step.basePath && step.basePath.pathId) {
              validIds.add(step.basePath.pathId);
            }
          });
        }
        // Always allow direct reinforcement
        validIds.add(state.selectedPathId);
        return upgradePathsManifest
          .filter((path) => validIds.has(path.id))
          .map((path) => ({ label: path.name, value: path.id }));
      }
    );

    function clearForm() {
      state.currentLevel = "";
      state.desiredLevel = "";
      state.selectedPathId = undefined;
      state.selectedMerchantId = undefined;
      state.includeAscension = true;
      state.currentWeaponPathId = "regular";
    }

    // Ensure currentLevel and desiredLevel are always strings
    watch(
      () => state.currentLevel,
      (val: unknown) => {
        if (typeof val !== "string") {
          state.currentLevel = val ? String(val) : "";
        }
      }
    );
    watch(
      () => state.desiredLevel,
      (val: unknown) => {
        if (typeof val !== "string") {
          state.desiredLevel = val ? String(val) : "";
        }
      }
    );

    function getThemeColor():
      | "primary"
      | "secondary"
      | "success"
      | "info"
      | "warning"
      | "error"
      | "neutral" {
      // Extracts the color name from the icon class, e.g., 'text-blue-600' -> 'blue'
      const iconClass = selectedTheme.value?.icon || "";
      const match = iconClass.match(/text-(\w+)-/);
      const color = match ? match[1] : "primary";
      // Map Tailwind color to Nuxt UI color
      const nuxtUiColors = [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "neutral",
      ];
      if (nuxtUiColors.includes(color as any)) return color as any;
      // Map common Tailwind colors to Nuxt UI colors
      if (color === "blue") return "primary";
      if (color === "green") return "success";
      if (color === "red") return "error";
      if (color === "yellow") return "warning";
      if (color === "gray" || color === "slate" || color === "zinc")
        return "neutral";
      if (color === "teal" || color === "cyan") return "info";
      if (color === "orange") return "warning";
      if (color === "purple" || color === "indigo") return "secondary";
      return "primary";
    }

    return {
      state,
      result,
      merchantItems,
      upgradePathItems,
      maxLevelForSelectedPath,
      isAtMaxLevel,
      selectedTheme,
      pageTitle,
      pageDescription,
      ICONS,
      merchantIdString,
      merchantSelectModel,
      upgradePathSelectModel,
      currentWeaponPathSelectModel,
      currentWeaponPathItems,
      clearForm,
      getThemeColor,
      unwrappedResult,
    };
  },
});

export const meta = {
  title: "Weapon Upgrade Calculator",
  description:
    "Calculates number of souls needed to reinforce a weapon to a specific level or path.",
};
</script>

<template>
  <UContainer>
    <section class="p-4 max-w-3xl mx-auto">
      <!-- Hero Section -->
      <HeroSection
        :title="pageTitle"
        :description="pageDescription"
        :icon-path="ICONS.CALCULATOR"
        :theme="selectedTheme"
        variant="default"
      />
      <UCard>
        <form class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Current Level (col 1, row 1) -->
          <div class="md:col-span-2 flex flex-col gap-2">
            <UFormField
              label="Current Level"
              :size="'xl'"
              :ui="{ label: 'block font-bold mb-1' }"
              id="currentLevel"
            >
              <NumericInput
                id="currentLevel"
                v-model="state.currentLevel"
                placeholder="0"
                min="0"
                max="14"
                class="w-full text-lg"
              />
            </UFormField>
            <UFormField
              label="Current Weapon Path"
              :size="'xl'"
              :ui="{ label: 'block font-bold mb-1' }"
              id="currentWeaponPath"
            >
              <USelectMenu
                id="currentWeaponPath"
                :model-value="currentWeaponPathSelectModel"
                @update:model-value="
                  (val) => (currentWeaponPathSelectModel = val)
                "
                :items="currentWeaponPathItems"
                value-key="value"
                label-key="label"
                class="w-full"
              />
            </UFormField>
          </div>
          <!-- Desired Level (col 2, row 1) -->
          <div class="md:col-span-2 flex flex-col gap-2">
            <UFormField
              label="Desired Level"
              :hint="'Max: +' + maxLevelForSelectedPath"
              :size="'xl'"
              :ui="{ label: 'block font-bold mb-1' }"
              id="desiredLevel"
            >
              <NumericInput
                id="desiredLevel"
                v-model="state.desiredLevel"
                placeholder="5"
                min="1"
                :max="maxLevelForSelectedPath"
                step="1"
                class="w-full text-lg"
              />
            </UFormField>
            <UFormField
              label="Upgrade Path"
              :size="'xl'"
              :ui="{ label: 'block font-bold mb-1' }"
              id="upgradePath"
            >
              <USelectMenu
                id="upgradePath"
                :model-value="upgradePathSelectModel"
                @update:model-value="(val) => (upgradePathSelectModel = val)"
                :items="upgradePathItems"
                value-key="value"
                label-key="label"
                class="w-full"
              />
            </UFormField>
          </div>
          <!-- Merchant and Include Ascension Cost in a single row -->
          <div class="md:col-span-4 flex flex-row items-center gap-4">
            <UFormField
              label="Merchant (optional)"
              :size="'xl'"
              :ui="{ label: 'block font-bold mb-1' }"
              id="merchants"
              class="w-1/2"
            >
              <USelectMenu
                id="merchants"
                :model-value="merchantSelectModel"
                @update:model-value="(val) => (merchantSelectModel = val)"
                :items="merchantItems"
                value-key="value"
                label-key="label"
                class="w-full"
                placeholder="Select a merchant (optional)"
              />
            </UFormField>
            <div class="w-1/2 flex justify-center">
              <UCheckbox
                v-model="state.includeAscension"
                label="Include Ascension Cost"
                :color="getThemeColor()"
              />
            </div>
          </div>
          <!-- Clear Button (full width below form fields) -->
          <div class="md:col-span-4 flex justify-end mt-2">
            <UButton
              :color="getThemeColor()"
              variant="outline"
              @click.prevent="clearForm"
            >
              Clear
            </UButton>
          </div>
        </form>
      </UCard>
      <UpgradeSummary
        v-if="unwrappedResult"
        :souls="unwrappedResult.souls"
        :materials="unwrappedResult.materials"
        :steps="unwrappedResult.steps"
        :selected-merchant-id="merchantIdString"
        :selected-theme="selectedTheme"
        :icon-path="ICONS.CALCULATOR"
      />
    </section>
  </UContainer>
</template>
