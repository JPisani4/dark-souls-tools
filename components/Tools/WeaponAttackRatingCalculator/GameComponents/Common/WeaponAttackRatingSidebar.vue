<script setup lang="ts">
import { computed, ref } from "vue";
import { useSafeTheme } from "~/composables/useSafeTheme";
import { getRandomTheme } from "~/utils/themes/colorSystem";
import NumberField from "../../../Common/forms/NumberField.vue";
import CheckboxField from "../../../Common/forms/CheckboxField.vue";
import FormSection from "../../../Common/forms/FormSection.vue";
import SelectField from "../../../Common/forms/SelectField.vue";
import Icon from "~/components/Common/Icon.vue";

interface Props {
  state?: {
    strength: string;
    dexterity: string;
    intelligence: string;
    faith: string;
    humanity: string;
    weaponLevel: string;
    isTwoHanded: boolean;
    selectedUpgradePath?: string;
  };
  setState?: (updates: Partial<Props["state"]>) => void;
  resetForm?: () => void;
  theme?: any;
  variant?: string;
  showWeaponLevel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  showWeaponLevel: true,
});

// Provide default state if not provided
const defaultState = {
  strength: "16",
  dexterity: "16",
  intelligence: "10",
  faith: "10",
  humanity: "0",
  weaponLevel: "0",
  isTwoHanded: false,
  selectedUpgradePath: "",
};

const safeState = computed(() => props.state || defaultState);
const safeSetState = computed(() => props.setState || (() => {}));
const safeResetForm = computed(() => props.resetForm || (() => {}));

const safeTheme = useSafeTheme(props.theme, props.variant);
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="flex-1 flex justify-center">
          <h2 class="text-lg font-semibold">Character Stats</h2>
        </div>
        <UButton
          size="sm"
          variant="outline"
          @click="safeResetForm"
          :aria-label="'Reset character stats'"
        >
          <Icon name="i-heroicons-arrow-path" class="w-4 h-4" />
        </UButton>
      </div>
    </template>

    <div class="space-y-4">
      <!-- Stat Inputs - Full Width -->
      <div class="grid grid-cols-2 gap-4">
        <NumberField
          label="Strength"
          id="strength"
          :model-value="
            safeState.strength ? parseInt(safeState.strength) : undefined
          "
          placeholder="16"
          :min="1"
          :max="99"
          :theme="safeTheme"
          @update:model-value="
            (val) => safeSetState({ strength: val?.toString() || '' })
          "
        />

        <NumberField
          label="Dexterity"
          id="dexterity"
          :model-value="
            safeState.dexterity ? parseInt(safeState.dexterity) : undefined
          "
          placeholder="16"
          :min="1"
          :max="99"
          :theme="safeTheme"
          @update:model-value="
            (val) => safeSetState({ dexterity: val?.toString() || '' })
          "
        />

        <NumberField
          label="Intelligence"
          id="intelligence"
          :model-value="
            safeState.intelligence
              ? parseInt(safeState.intelligence)
              : undefined
          "
          placeholder="10"
          :min="1"
          :max="99"
          :theme="safeTheme"
          @update:model-value="
            (val) => safeSetState({ intelligence: val?.toString() || '' })
          "
        />

        <NumberField
          label="Faith"
          id="faith"
          :model-value="safeState.faith ? parseInt(safeState.faith) : undefined"
          placeholder="10"
          :min="1"
          :max="99"
          :theme="safeTheme"
          @update:model-value="
            (val) => safeSetState({ faith: val?.toString() || '' })
          "
        />
      </div>
      <!-- Subtle divider below the first four stat fields -->
      <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>
      <div class="grid grid-cols-2 gap-4 items-end">
        <div class="flex flex-col h-full justify-end">
          <NumberField
            v-if="showWeaponLevel"
            label="Weapon Level"
            id="weaponLevel"
            :model-value="
              safeState.weaponLevel
                ? parseInt(safeState.weaponLevel)
                : undefined
            "
            placeholder="0"
            :min="0"
            :max="15"
            :theme="safeTheme"
            @update:model-value="
              (val) => safeSetState({ weaponLevel: val?.toString() || '' })
            "
          />
        </div>
        <div class="flex flex-col h-full justify-end">
          <NumberField
            label="Humanity"
            id="humanity"
            :model-value="
              safeState.humanity ? parseInt(safeState.humanity) : undefined
            "
            placeholder="0"
            :min="0"
            :max="10"
            :theme="safeTheme"
            @update:model-value="
              (val) => safeSetState({ humanity: val?.toString() || '' })
            "
          />
        </div>
      </div>

      <!-- Two-Handed Checkbox -->
      <div class="mt-4">
        <CheckboxField
          id="isTwoHanded"
          label="Two-Handed"
          :model-value="safeState.isTwoHanded"
          @update:model-value="(val) => safeSetState({ isTwoHanded: val })"
          :theme="safeTheme"
        />
      </div>
    </div>
  </UCard>
</template>
