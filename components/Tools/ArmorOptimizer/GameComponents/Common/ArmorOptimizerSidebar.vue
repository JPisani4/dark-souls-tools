<script setup lang="ts">
import { computed, ref } from "vue";
import { useSafeTheme } from "~/composables/useSafeTheme";
import { useItemLookup } from "~/composables/useItemLookup";
import { getAllWeapons } from "~/utils/games/ds1/weapons";
import { getAllShields } from "~/utils/games/ds1/shields";
import { getAllRings } from "~/utils/games/ds1/rings";
import { getWeaponByName } from "~/utils/games/ds1/weapons";
import { getShieldByName } from "~/utils/games/ds1/shields";
import { getRingByName } from "~/utils/games/ds1/rings";
import {
  getArmorBySlot,
  getArmorCategories,
  getArmorByCategory,
} from "~/utils/games/ds1/armor";
import type { ComputedRef } from "vue";
import {
  calculateStamina,
  calculateEquipLoad,
} from "~/utils/games/ds1/stats/characterStats";
import NumberField from "../../../Common/forms/NumberField.vue";
import CheckboxField from "../../../Common/forms/CheckboxField.vue";
import FormSection from "../../../Common/forms/FormSection.vue";
import SelectField from "../../../Common/forms/SelectField.vue";
import Icon from "~/components/Common/Icon.vue";

interface Props {
  state: any;
  setState: (updates: any) => void;
  reset: () => void;
  theme?: any;
  variant?: string;
  characterStats?: any;
}

const props = defineProps<Props>();

// Provide default state if not provided
const defaultState = {
  endurance: "",
  selectedEquipment: {
    weapons: [],
    shields: [],
    catalysts: [],
    talismans: [],
  },
  selectedRings: [],
  armorUpgradeLevel: "0",
  displayMode: "individual",
  sortPrimary: "poise",
  sortSecondary: "weight",
  sortDescending: true,
  lockedArmor: {
    head: null,
    chest: null,
    hands: null,
    legs: null,
  },
};

const safeState = computed(() => props.state || defaultState);
const safeSetState = props.setState || (() => {});
const safeReset = props.reset || (() => {});

const safeTheme = useSafeTheme(props.theme, props.variant);

// Collapsible state
const expandedSections = ref<Record<string, boolean>>({
  rings: true,
  equipment: true,
  stats: false,
  armorLock: true,
});

// Reactive variables to track dropdown selections for clearing
const ringDropdownValue = ref("");
const weaponDropdownValue = ref("");
const shieldDropdownValue = ref("");
const catalystDropdownValue = ref("");
const talismanDropdownValue = ref("");

// Get equipment options with proper categorization using useItemLookup
const allWeapons = getAllWeapons();
const allShields = getAllShields();
const allRings = getAllRings();

// Create categorized options using useItemLookup
const weaponOptions = computed(() => {
  const weapons = Object.values(allWeapons)
    .flat()
    .filter(
      (weapon: any) =>
        weapon.weaponType !== "catalysts" && weapon.weaponType !== "talismans"
    );

  const { flatOptions } = useItemLookup(weapons, "weaponType", "name");
  return flatOptions.value;
});

const shieldOptions = computed(() => {
  const shields = Object.values(allShields).flat();
  const { flatOptions } = useItemLookup(shields, "shieldType", "name");
  return flatOptions.value;
});

const catalystOptions = computed(() => {
  const catalysts = allWeapons.catalysts || [];
  const { flatOptions } = useItemLookup(catalysts, "weaponType", "name");
  return flatOptions.value;
});

const talismanOptions = computed(() => {
  const talismans = allWeapons.talismans || [];
  const { flatOptions } = useItemLookup(talismans, "weaponType", "name");
  return flatOptions.value;
});

// Filter rings to only show those that affect endurance, equip load, stamina regen, or dodge rolls
const ringOptions = computed(() => {
  const rings = Object.values(allRings).flat();
  // List of rings to always include
  const alwaysInclude = [
    "Flame Stoneplate Ring",
    "Ring of Steel Protection",
    "Speckled Stoneplate Ring",
    "Spell Stoneplate Ring",
    "Thunder Stoneplate Ring",
    "Wolf Ring",
  ];
  // List of rings to always exclude
  const alwaysExclude = ["Dark Wood Grain Ring"];
  const filteredRings = rings.filter((ring: any) => {
    if (alwaysExclude.includes(ring.name)) return false;
    if (alwaysInclude.includes(ring.name)) return true;
    if (!ring.effect) return false;
    // Check for endurance, equip load, stamina regen, or dodge roll effects
    const hasEnduranceEffect =
      ring.effect.statBonus?.endurance || ring.effect.statBonus?.staminaBonus;
    const hasEquipLoadEffect =
      ring.effect.equipLoadBonus || ring.effect.statBonus?.equipLoadBonus;
    const hasStaminaRegenEffect = ring.effect.staminaRegenBonus;
    const hasDodgeRollEffect = ring.effect.special === "dark-wood-grain-ring";
    return (
      hasEnduranceEffect ||
      hasEquipLoadEffect ||
      hasStaminaRegenEffect ||
      hasDodgeRollEffect
    );
  });
  const { flatOptions } = useItemLookup(filteredRings, "ringType", "name");
  return flatOptions.value;
});

// Use character stats from main component if available, otherwise fall back to local calculations
const characterStats = computed(() => {
  const stats = props.characterStats || {};
  return stats;
});

// Calculate statistics using character stats from main component
const enduranceLevel = computed(() => parseInt(safeState.value.endurance) || 0);
const maxStamina = computed(
  () =>
    characterStats.value.maxStamina || calculateStamina(enduranceLevel.value)
);
const currentEquipLoad = computed(
  () => characterStats.value.equippedWeight || 0
);
const maxEquipLoad = computed(
  () =>
    characterStats.value.equipLoad || calculateEquipLoad(enduranceLevel.value)
);
const equipLoadPercentage = computed(
  () => characterStats.value.equipLoadPercentage || 0
);
const staminaRegen = computed(() => characterStats.value.staminaRegen || 45);

// Calculate total equipment count
const totalEquipmentCount = computed(() => {
  return (
    safeState.value.selectedEquipment.weapons.length +
    safeState.value.selectedEquipment.shields.length +
    safeState.value.selectedEquipment.catalysts.length +
    safeState.value.selectedEquipment.talismans.length
  );
});

// Equipment management functions
const addEquipment = (type: string, itemName: string) => {
  if (!itemName) return;

  const current = [...safeState.value.selectedEquipment[type]];
  if (totalEquipmentCount.value < 4 && !current.includes(itemName)) {
    current.push(itemName);
    safeSetState({
      selectedEquipment: {
        ...safeState.value.selectedEquipment,
        [type]: current,
      },
    });

    // Clear the appropriate dropdown
    if (type === "weapons") weaponDropdownValue.value = "";
    else if (type === "shields") shieldDropdownValue.value = "";
    else if (type === "catalysts") catalystDropdownValue.value = "";
    else if (type === "talismans") talismanDropdownValue.value = "";
  }
};

const removeEquipment = (type: string, index: number) => {
  const current = [...safeState.value.selectedEquipment[type]];
  current.splice(index, 1);
  safeSetState({
    selectedEquipment: {
      ...safeState.value.selectedEquipment,
      [type]: current,
    },
  });
};

const addRing = (ringName: string) => {
  if (!ringName) return;

  const current = [...safeState.value.selectedRings];
  if (current.length < 2 && !current.includes(ringName)) {
    current.push(ringName);
    safeSetState({ selectedRings: current });

    // Clear the ring dropdown
    ringDropdownValue.value = "";
  }
};

const removeRing = (index: number) => {
  const current = [...safeState.value.selectedRings];
  current.splice(index, 1);
  safeSetState({ selectedRings: current });
};

// Reset function for character setup section only
const resetCharacterSetup = () => {
  safeSetState({
    endurance: "",
    selectedEquipment: {
      weapons: [],
      shields: [],
      catalysts: [],
      talismans: [],
    },
    selectedRings: [],
    armorUpgradeLevel: "0",
    lockedArmor: {
      head: null,
      chest: null,
      hands: null,
      legs: null,
    },
  });
  // Clear dropdown values
  ringDropdownValue.value = "";
  weaponDropdownValue.value = "";
  shieldDropdownValue.value = "";
  catalystDropdownValue.value = "";
  talismanDropdownValue.value = "";
};

// Helper function to get item details
const getItemDetails = (itemName: string, type: string) => {
  if (type === "weapons" || type === "catalysts" || type === "talismans") {
    return getWeaponByName(itemName);
  } else if (type === "shields") {
    return getShieldByName(itemName);
  }
  return null;
};

const getRingDetails = (ringName: string) => {
  return getRingByName(ringName);
};

// Helper function to get armor details
const getArmorDetails = (armorName: string) => {
  return (
    getArmorBySlot("head")
      .concat(
        getArmorBySlot("chest"),
        getArmorBySlot("hands"),
        getArmorBySlot("legs")
      )
      .find((a) => a.name === armorName) || null
  );
};

// Helper to format category names
const formatCategoryName = (category: string) => {
  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .trim();
};

// Helper to create categorized options for a slot
function createCategorizedArmorOptions(slot: string) {
  const categories = getArmorCategories();
  const options: Array<{ label: string; value: string; disabled?: boolean }> =
    [];
  categories.forEach((category) => {
    // Add category header
    options.push({
      label: `--- ${formatCategoryName(category)} ---`,
      value: `category-${category}`,
      disabled: true,
    });
    // Add items in this category for the slot
    getArmorByCategory(category)
      .filter((a) => a.slot === slot)
      .forEach((a) => {
        options.push({ label: a.name, value: a.name });
      });
  });
  return options;
}

const armorLockSlots = ["head", "chest", "hands", "legs"];
const armorLockOptions: Record<
  string,
  ComputedRef<{ label: string; value: string; disabled?: boolean }[]>
> = {
  head: computed(() => createCategorizedArmorOptions("head")),
  chest: computed(() => createCategorizedArmorOptions("chest")),
  hands: computed(() => createCategorizedArmorOptions("hands")),
  legs: computed(() => createCategorizedArmorOptions("legs")),
};

const handleArmorLockChange = (slot: string, value: string | null) => {
  safeSetState({
    lockedArmor: {
      ...safeState.value.lockedArmor,
      [slot]: value || null,
    },
  });
};

// Toggle section expansion
const toggleSection = (section: string) => {
  expandedSections.value[section] = !expandedSections.value[section];
};

// Compact item display component
const CompactItemCard = defineComponent({
  props: {
    item: { type: String, required: true },
    type: { type: String, required: true },
    onRemove: { type: Function, required: true },
  },
  setup(props) {
    const details = computed(() =>
      props.type === "ring"
        ? getRingDetails(props.item)
        : getItemDetails(props.item, props.type)
    );
    const weight = computed(() => details.value?.weight);
    const effect = computed(() => {
      const itemDetails = details.value as any;
      return itemDetails?.effect?.special;
    });

    return { weight, effect };
  },
  template: `
    <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
      <div class="flex-1 min-w-0">
        <div class="truncate font-medium">{{ item }}</div>
        <div v-if="weight !== undefined" class="text-gray-600 dark:text-gray-400">
          {{ weight.toFixed(1) }} weight
        </div>
        <div v-if="effect" class="text-gray-600 dark:text-gray-400 truncate">
          {{ effect }}
        </div>
      </div>
      <UButton
        size="xs"
        color="error"
        variant="soft"
        @click="onRemove"
        class="flex-shrink-0 ml-2"
      >
        <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
      </UButton>
    </div>
  `,
});
</script>

<template>
  <UCard class="h-full">
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">Character Setup</h2>
        <UButton
          @click="resetCharacterSetup"
          color="success"
          variant="soft"
          size="sm"
          class="flex items-center gap-1"
        >
          <Icon name="i-heroicons-arrow-path" class="w-4 h-4" />
        </UButton>
      </div>
    </template>

    <div class="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      <!-- Endurance Input -->
      <NumberField
        label="Endurance"
        id="endurance"
        :model-value="
          safeState.endurance ? parseInt(safeState.endurance) : undefined
        "
        placeholder="Enter endurance..."
        :min="1"
        :max="99"
        :theme="safeTheme"
        @update:model-value="
          (val) => safeSetState({ endurance: val?.toString() || '' })
        "
      />

      <!-- Armor Upgrade Level -->
      <NumberField
        label="Armor Upgrade Level"
        id="armorUpgradeLevel"
        :model-value="
          safeState.armorUpgradeLevel
            ? parseInt(safeState.armorUpgradeLevel)
            : undefined
        "
        placeholder="0"
        :min="0"
        :max="10"
        :theme="safeTheme"
        @update:model-value="
          (val) => safeSetState({ armorUpgradeLevel: val?.toString() || '' })
        "
      />

      <!-- Rings Section -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg">
        <div
          class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          @click="toggleSection('rings')"
        >
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-down"
              :class="expandedSections.rings ? 'rotate-0' : '-rotate-90'"
              class="w-4 h-4 transition-transform"
            />
            <span class="font-medium"
              >Rings ({{ safeState.selectedRings.length }}/2)</span
            >
          </div>
        </div>

        <div v-if="expandedSections.rings" class="p-3 pt-0 space-y-2">
          <SelectField
            label=""
            id="rings"
            :options="ringOptions"
            placeholder="Select ring..."
            :theme="safeTheme"
            :model-value="ringDropdownValue"
            :disabled="safeState.selectedRings.length >= 2"
            @update:model-value="
              (val: string) => {
                ringDropdownValue = val;
                addRing(val);
              }
            "
          />
          <div v-if="safeState.selectedRings.length > 0" class="space-y-1">
            <div
              v-for="(ring, index) in safeState.selectedRings"
              :key="index"
              class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs"
            >
              <div class="flex-1 min-w-0">
                <div class="truncate font-medium">{{ ring }}</div>
                <div
                  v-if="getRingDetails(ring)?.weight !== undefined"
                  class="text-gray-600 dark:text-gray-400"
                >
                  {{ getRingDetails(ring)?.weight?.toFixed(1) }} weight
                </div>
                <div
                  v-if="getRingDetails(ring)?.effect?.special"
                  class="text-gray-600 dark:text-gray-400 truncate"
                >
                  {{ getRingDetails(ring)?.effect?.special }}
                </div>
              </div>
              <UButton
                size="xs"
                color="error"
                variant="soft"
                @click="removeRing(index)"
                class="flex-shrink-0 ml-2"
              >
                <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Equipment Section -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg">
        <div
          class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          @click="toggleSection('equipment')"
        >
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-down"
              :class="expandedSections.equipment ? 'rotate-0' : '-rotate-90'"
              class="w-4 h-4 transition-transform"
            />
            <span class="font-medium"
              >Equipment ({{ totalEquipmentCount }}/4)</span
            >
          </div>
        </div>

        <div v-if="expandedSections.equipment" class="p-3 pt-0 space-y-3">
          <!-- Weapons -->
          <div class="space-y-1">
            <SelectField
              label="Weapons"
              id="weapons"
              :options="weaponOptions"
              placeholder="Select weapon..."
              :theme="safeTheme"
              :disabled="totalEquipmentCount >= 4"
              :model-value="weaponDropdownValue"
              @update:model-value="
                (val: string) => {
                  weaponDropdownValue = val;
                  addEquipment('weapons', val);
                }
              "
            />
            <div
              v-if="safeState.selectedEquipment.weapons.length > 0"
              class="space-y-1"
            >
              <div
                v-for="(weapon, index) in safeState.selectedEquipment.weapons"
                :key="index"
                class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs"
              >
                <div class="flex-1 min-w-0">
                  <div class="truncate font-medium">{{ weapon }}</div>
                  <div
                    v-if="
                      getItemDetails(weapon, 'weapons')?.weight !== undefined
                    "
                    class="text-gray-600 dark:text-gray-400"
                  >
                    {{ getItemDetails(weapon, "weapons")?.weight?.toFixed(1) }}
                    weight
                  </div>
                  <div
                    v-if="
                      (getItemDetails(weapon, 'weapons') as any)?.effect
                        ?.special
                    "
                    class="text-gray-600 dark:text-gray-400 truncate"
                  >
                    {{
                      (getItemDetails(weapon, "weapons") as any)?.effect
                        ?.special
                    }}
                  </div>
                </div>
                <UButton
                  size="xs"
                  color="error"
                  variant="soft"
                  @click="removeEquipment('weapons', index)"
                  class="flex-shrink-0 ml-2"
                >
                  <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
                </UButton>
              </div>
            </div>
          </div>

          <!-- Shields -->
          <div class="space-y-1">
            <SelectField
              label="Shields"
              id="shields"
              :options="shieldOptions"
              placeholder="Select shield..."
              :theme="safeTheme"
              :disabled="totalEquipmentCount >= 4"
              :model-value="shieldDropdownValue"
              @update:model-value="
                (val: string) => {
                  shieldDropdownValue = val;
                  addEquipment('shields', val);
                }
              "
            />
            <div
              v-if="safeState.selectedEquipment.shields.length > 0"
              class="space-y-1"
            >
              <div
                v-for="(shield, index) in safeState.selectedEquipment.shields"
                :key="index"
                class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs"
              >
                <div class="flex-1 min-w-0">
                  <div class="truncate font-medium">{{ shield }}</div>
                  <div
                    v-if="
                      getItemDetails(shield, 'shields')?.weight !== undefined
                    "
                    class="text-gray-600 dark:text-gray-400"
                  >
                    {{ getItemDetails(shield, "shields")?.weight?.toFixed(1) }}
                    weight
                  </div>
                  <div
                    v-if="
                      (getItemDetails(shield, 'shields') as any)?.effect
                        ?.special
                    "
                    class="text-gray-600 dark:text-gray-400 truncate"
                  >
                    {{
                      (getItemDetails(shield, "shields") as any)?.effect
                        ?.special
                    }}
                  </div>
                </div>
                <UButton
                  size="xs"
                  color="error"
                  variant="soft"
                  @click="removeEquipment('shields', index)"
                  class="flex-shrink-0 ml-2"
                >
                  <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
                </UButton>
              </div>
            </div>
          </div>

          <!-- Catalysts -->
          <div class="space-y-1">
            <SelectField
              label="Catalysts"
              id="catalysts"
              :options="catalystOptions"
              placeholder="Select catalyst..."
              :theme="safeTheme"
              :disabled="totalEquipmentCount >= 4"
              :model-value="catalystDropdownValue"
              @update:model-value="
                (val: string) => {
                  catalystDropdownValue = val;
                  addEquipment('catalysts', val);
                }
              "
            />
            <div
              v-if="safeState.selectedEquipment.catalysts.length > 0"
              class="space-y-1"
            >
              <div
                v-for="(catalyst, index) in safeState.selectedEquipment
                  .catalysts"
                :key="index"
                class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs"
              >
                <div class="flex-1 min-w-0">
                  <div class="truncate font-medium">{{ catalyst }}</div>
                  <div
                    v-if="
                      getItemDetails(catalyst, 'catalysts')?.weight !==
                      undefined
                    "
                    class="text-gray-600 dark:text-gray-400"
                  >
                    {{
                      getItemDetails(catalyst, "catalysts")?.weight?.toFixed(1)
                    }}
                    weight
                  </div>
                  <div
                    v-if="
                      (getItemDetails(catalyst, 'catalysts') as any)?.effect
                        ?.special
                    "
                    class="text-gray-600 dark:text-gray-400 truncate"
                  >
                    {{
                      (getItemDetails(catalyst, "catalysts") as any)?.effect
                        ?.special
                    }}
                  </div>
                </div>
                <UButton
                  size="xs"
                  color="error"
                  variant="soft"
                  @click="removeEquipment('catalysts', index)"
                  class="flex-shrink-0 ml-2"
                >
                  <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
                </UButton>
              </div>
            </div>
          </div>

          <!-- Talismans -->
          <div class="space-y-1">
            <SelectField
              label="Talismans"
              id="talismans"
              :options="talismanOptions"
              placeholder="Select talisman..."
              :theme="safeTheme"
              :disabled="totalEquipmentCount >= 4"
              :model-value="talismanDropdownValue"
              @update:model-value="
                (val: string) => {
                  talismanDropdownValue = val;
                  addEquipment('talismans', val);
                }
              "
            />
            <div
              v-if="safeState.selectedEquipment.talismans.length > 0"
              class="space-y-1"
            >
              <div
                v-for="(talisman, index) in safeState.selectedEquipment
                  .talismans"
                :key="index"
                class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs"
              >
                <div class="flex-1 min-w-0">
                  <div class="truncate font-medium">{{ talisman }}</div>
                  <div
                    v-if="
                      getItemDetails(talisman, 'talismans')?.weight !==
                      undefined
                    "
                    class="text-gray-600 dark:text-gray-400"
                  >
                    {{
                      getItemDetails(talisman, "talismans")?.weight?.toFixed(1)
                    }}
                    weight
                  </div>
                  <div
                    v-if="
                      (getItemDetails(talisman, 'talismans') as any)?.effect
                        ?.special
                    "
                    class="text-gray-600 dark:text-gray-400 truncate"
                  >
                    {{
                      (getItemDetails(talisman, "talismans") as any)?.effect
                        ?.special
                    }}
                  </div>
                </div>
                <UButton
                  size="xs"
                  color="error"
                  variant="soft"
                  @click="removeEquipment('talismans', index)"
                  class="flex-shrink-0 ml-2"
                >
                  <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Armor Lock Section -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg">
        <div
          class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          @click="toggleSection('armorLock')"
        >
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-down"
              :class="expandedSections.armorLock ? 'rotate-0' : '-rotate-90'"
              class="w-4 h-4 transition-transform"
            />
            <span class="font-medium">Armor</span>
          </div>
        </div>
        <div v-if="expandedSections.armorLock" class="p-3 pt-0 space-y-2">
          <div v-for="slot in armorLockSlots" :key="slot" class="space-y-1">
            <SelectField
              :label="slot.charAt(0).toUpperCase() + slot.slice(1)"
              :id="`armor-lock-${slot}`"
              :options="armorLockOptions[slot].value"
              :placeholder="`Select ${slot.charAt(0).toUpperCase() + slot.slice(1)}`"
              :theme="safeTheme"
              :model-value="safeState.lockedArmor[slot]"
              clearable
              @update:model-value="
                (val: string | null) => handleArmorLockChange(slot, val)
              "
            />
            <div
              v-if="safeState.lockedArmor[slot]"
              class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs mt-1"
            >
              <div class="flex-1 min-w-0">
                <div class="truncate font-medium">
                  {{ safeState.lockedArmor[slot] }}
                  <span class="text-gray-400 ml-2">({{ slot }})</span>
                </div>
                <div
                  v-if="
                    getArmorDetails(safeState.lockedArmor[slot])?.weight !==
                    undefined
                  "
                  class="text-gray-600 dark:text-gray-400"
                >
                  {{
                    getArmorDetails(
                      safeState.lockedArmor[slot]
                    )?.weight?.toFixed(1)
                  }}
                  weight
                </div>
              </div>
              <UButton
                size="xs"
                color="error"
                variant="soft"
                @click="handleArmorLockChange(slot, null)"
                class="flex-shrink-0 ml-2"
              >
                <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg">
        <div
          class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          @click="toggleSection('stats')"
        >
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-down"
              :class="expandedSections.stats ? 'rotate-0' : '-rotate-90'"
              class="w-4 h-4 transition-transform"
            />
            <span class="font-medium">Statistics</span>
          </div>
        </div>

        <div v-if="expandedSections.stats" class="p-3 pt-0 space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Max Stamina:</span>
            <span class="font-medium">{{ maxStamina }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Equip Load:</span>
            <span class="font-medium"
              >{{ currentEquipLoad.toFixed(1) }} /
              {{ maxEquipLoad.toFixed(1) }}</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Equip Load %:</span>
            <span class="font-medium"
              >{{ equipLoadPercentage.toFixed(1) }}%</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Stamina Regen:</span>
            <span class="font-medium">{{ staminaRegen }}/sec</span>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
