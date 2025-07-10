<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
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
import SelectField from "../../../Common/forms/SelectField.vue";
import Icon from "~/components/Common/Icon.vue";

interface Props {
  state: any;
  setState: (updates: any) => void;
  theme?: any;
  variant?: string;
}

const props = defineProps<Props>();

const safeTheme = useSafeTheme(props.theme, props.variant);

// Collapsible state
const LOCAL_STORAGE_KEY = "armor-optimizer-equip-expanded";
const isExpanded = ref(true);

onMounted(() => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved !== null) {
    isExpanded.value = saved === "true";
  }
});

watch(isExpanded, (val) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, val ? "true" : "false");
});
// 1. Add a new ref for the search/filter section collapse
const isFilterExpanded = ref(true);

// Reset function for equipment configuration
const resetEquipmentConfig = () => {
  props.setState({
    selectedEquipment: {
      weapons: [],
      shields: [],
      catalysts: [],
      talismans: [],
    },
    selectedRings: [],
    lockedArmor: {
      head: null,
      chest: null,
      hands: null,
      legs: null,
    },
  });
  ringDropdownValue.value = "";
  weaponDropdownValue.value = "";
  shieldDropdownValue.value = "";
  catalystDropdownValue.value = "";
  talismanDropdownValue.value = "";
};

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
// 2. Sort dropdown options alphabetically within categories
function sortOptionsByCategory(
  options: Array<{ label: string; value: string; disabled?: boolean }>
) {
  const result = [];
  let currentCategory = null;
  let currentItems = [];
  for (const opt of options) {
    if (opt.disabled && opt.value.startsWith("category-")) {
      if (currentCategory) {
        // Sort previous category
        currentItems.sort((a, b) => a.label.localeCompare(b.label));
        result.push(...currentItems);
      }
      result.push(opt);
      currentCategory = opt.value;
      currentItems = [];
    } else {
      currentItems.push(opt);
    }
  }
  if (currentItems.length) {
    currentItems.sort((a, b) => a.label.localeCompare(b.label));
    result.push(...currentItems);
  }
  return result;
}

// Wrap computed options with sorting
const weaponOptions = computed(() => {
  const weapons = Object.values(allWeapons)
    .flat()
    .filter(
      (weapon: any) =>
        weapon.weaponType !== "catalysts" && weapon.weaponType !== "talismans"
    );

  const { flatOptions } = useItemLookup(weapons, "weaponType", "name");
  return sortOptionsByCategory(flatOptions.value);
});

const shieldOptions = computed(() => {
  const shields = Object.values(allShields).flat();
  const { flatOptions } = useItemLookup(shields, "shieldType", "name");
  return sortOptionsByCategory(flatOptions.value);
});

const catalystOptions = computed(() => {
  const catalysts = allWeapons.catalysts || [];
  const { flatOptions } = useItemLookup(catalysts, "weaponType", "name");
  return sortOptionsByCategory(flatOptions.value);
});

const talismanOptions = computed(() => {
  const talismans = allWeapons.talismans || [];
  const { flatOptions } = useItemLookup(talismans, "weaponType", "name");
  return sortOptionsByCategory(flatOptions.value);
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
  return sortOptionsByCategory(flatOptions.value);
});

// Calculate total equipment count
const totalEquipmentCount = computed(() => {
  return (
    props.state.selectedEquipment.weapons.length +
    props.state.selectedEquipment.shields.length +
    props.state.selectedEquipment.catalysts.length +
    props.state.selectedEquipment.talismans.length
  );
});

// Equipment management functions
const addEquipment = (type: string, itemName: string) => {
  if (!itemName) return;

  const current = [...props.state.selectedEquipment[type]];
  if (totalEquipmentCount.value < 4 && !current.includes(itemName)) {
    current.push(itemName);
    props.setState({
      selectedEquipment: {
        ...props.state.selectedEquipment,
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
  const current = [...props.state.selectedEquipment[type]];
  current.splice(index, 1);
  props.setState({
    selectedEquipment: {
      ...props.state.selectedEquipment,
      [type]: current,
    },
  });
};

const addRing = (ringName: string) => {
  if (!ringName) return;

  const current = [...props.state.selectedRings];
  if (current.length < 2 && !current.includes(ringName)) {
    current.push(ringName);
    props.setState({ selectedRings: current });

    // Clear the ring dropdown
    ringDropdownValue.value = "";
  }
};

const removeRing = (index: number) => {
  const current = [...props.state.selectedRings];
  current.splice(index, 1);
  props.setState({ selectedRings: current });
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
  let options: Array<{ label: string; value: string; disabled?: boolean }> = [];
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
  return sortOptionsByCategory(options);
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
  props.setState({
    lockedArmor: {
      ...props.state.lockedArmor,
      [slot]: value || null,
    },
  });
};

// Equipment type configuration
const equipmentTypes = computed(() => [
  {
    key: "weapons",
    label: "Weapons",
    options: weaponOptions.value,
    dropdownValue: weaponDropdownValue,
  },
  {
    key: "shields",
    label: "Shields",
    options: shieldOptions.value,
    dropdownValue: shieldDropdownValue,
  },
  {
    key: "catalysts",
    label: "Catalysts",
    options: catalystOptions.value,
    dropdownValue: catalystDropdownValue,
  },
  {
    key: "talismans",
    label: "Talismans",
    options: talismanOptions.value,
    dropdownValue: talismanDropdownValue,
  },
]);
</script>

<template>
  <UCard class="w-full">
    <template #header>
      <div
        class="flex items-center justify-between cursor-pointer select-none"
        @click="isExpanded = !isExpanded"
      >
        <div class="flex items-center gap-2">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Equipment Configuration
          </h2>
          <Icon
            :name="
              isExpanded ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'
            "
            class="w-5 h-5"
          />
        </div>
        <UButton
          @click.stop="resetEquipmentConfig"
          color="success"
          variant="soft"
          size="sm"
          class="flex items-center gap-1"
          aria-label="Reset equipment configuration"
        >
          <Icon name="i-heroicons-arrow-path" class="w-4 h-4" />
        </UButton>
      </div>
    </template>

    <div v-if="isExpanded" class="space-y-6">
      <!-- Rings Section -->
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-medium">Rings</h3>
          <div class="flex items-center gap-1">
            <div
              v-for="ring in props.state.selectedRings"
              :key="ring"
              class="w-2 h-2 bg-blue-500 rounded-full"
            ></div>
            <div
              v-for="i in 2 - props.state.selectedRings.length"
              :key="`empty-${i}`"
              class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"
            ></div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <SelectField
              label="Add Ring"
              id="rings"
              :options="ringOptions"
              placeholder="Select ring..."
              :theme="safeTheme"
              :model-value="ringDropdownValue"
              :disabled="props.state.selectedRings.length >= 2"
              @update:model-value="
                (val: string) => {
                  ringDropdownValue = val;
                  addRing(val);
                }
              "
            />
          </div>
          <div class="space-y-2">
            <div v-if="props.state.selectedRings.length > 0" class="space-y-2">
              <div
                v-for="(ring, index) in props.state.selectedRings"
                :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-sm">{{ ring }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">
                    <div v-if="getRingDetails(ring)?.weight !== undefined">
                      {{ getRingDetails(ring)?.weight?.toFixed(1) }} weight
                    </div>
                    <div v-if="getRingDetails(ring)?.effect?.special">
                      {{ getRingDetails(ring)?.effect?.special }}
                    </div>
                    <div v-else-if="getRingDetails(ring)?.description">
                      {{ getRingDetails(ring)?.description }}
                    </div>
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
      </div>

      <!-- Equipment & Armor Locks Side by Side -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Equipment Section -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-medium">Equipment</h3>
            <div class="flex items-center gap-1">
              <template v-for="i in 4" :key="i">
                <div
                  :class="[
                    'w-1.5 h-1.5 rounded-full',
                    i <= totalEquipmentCount
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600',
                  ]"
                ></div>
              </template>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="type in equipmentTypes"
              :key="type.key"
              class="space-y-2"
            >
              <SelectField
                :label="type.label"
                :id="type.key"
                :options="type.options"
                :placeholder="`Select ${type.label.toLowerCase()}...`"
                :theme="safeTheme"
                :disabled="totalEquipmentCount >= 4"
                :model-value="type.dropdownValue.value"
                role="combobox"
                @update:model-value="
                  (val: string) => {
                    if (type.key === 'weapons') weaponDropdownValue = val;
                    else if (type.key === 'shields') shieldDropdownValue = val;
                    else if (type.key === 'catalysts')
                      catalystDropdownValue = val;
                    else if (type.key === 'talismans')
                      talismanDropdownValue = val;
                    addEquipment(type.key, val);
                  }
                "
              />
              <div
                v-if="props.state.selectedEquipment[type.key].length > 0"
                class="space-y-1"
              >
                <div
                  v-for="(item, index) in props.state.selectedEquipment[
                    type.key
                  ]"
                  :key="index"
                  class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs"
                >
                  <div class="flex-1 min-w-0">
                    <div class="truncate font-medium">{{ item }}</div>
                    <div class="text-gray-600 dark:text-gray-400">
                      <div
                        v-if="
                          getItemDetails(item, type.key)?.weight !== undefined
                        "
                      >
                        {{ getItemDetails(item, type.key)?.weight?.toFixed(1) }}
                        weight
                      </div>
                      <!-- Shields: show effect.description if present -->
                      <template v-if="type.key === 'shields'">
                        <div
                          v-if="
                            getItemDetails(item, type.key) &&
                            (getItemDetails(item, type.key) as any).effect &&
                            (getItemDetails(item, type.key) as any).effect
                              .description
                          "
                        >
                          {{
                            (getItemDetails(item, type.key) as any).effect
                              .description
                          }}
                        </div>
                      </template>
                      <!-- Armor: show effect.description if present -->
                      <template v-if="type.key === 'armor'">
                        <div
                          v-if="
                            getItemDetails(item, type.key) &&
                            (getItemDetails(item, type.key) as any).effect &&
                            (getItemDetails(item, type.key) as any).effect
                              .description
                          "
                        >
                          {{
                            (getItemDetails(item, type.key) as any).effect
                              .description
                          }}
                        </div>
                      </template>
                    </div>
                  </div>
                  <UButton
                    size="xs"
                    color="error"
                    variant="soft"
                    @click="removeEquipment(type.key, index)"
                    class="flex-shrink-0 ml-1"
                  >
                    <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Armor Locks Section -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-medium">Armor Locks</h3>
            <div class="flex items-center gap-1">
              <div
                v-for="slot in armorLockSlots"
                :key="slot"
                class="w-2 h-2 rounded-full"
                :class="
                  props.state.lockedArmor[slot]
                    ? 'bg-purple-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                "
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="slot in armorLockSlots" :key="slot" class="space-y-2">
              <SelectField
                :label="slot.charAt(0).toUpperCase() + slot.slice(1)"
                :id="`armor-lock-${slot}`"
                :options="armorLockOptions[slot].value"
                :placeholder="`Select ${slot.charAt(0).toUpperCase() + slot.slice(1)}`"
                :theme="safeTheme"
                :model-value="props.state.lockedArmor[slot]"
                clearable
                @update:model-value="
                  (val: string | null) => handleArmorLockChange(slot, val)
                "
              />
              <div
                v-if="props.state.lockedArmor[slot]"
                class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs"
              >
                <div class="flex-1 min-w-0">
                  <div class="truncate font-medium">
                    {{ props.state.lockedArmor[slot] }}
                  </div>
                  <div class="text-gray-600 dark:text-gray-400">
                    <div
                      v-if="
                        getArmorDetails(props.state.lockedArmor[slot])
                          ?.weight !== undefined
                      "
                    >
                      {{
                        getArmorDetails(
                          props.state.lockedArmor[slot]
                        )?.weight?.toFixed(1)
                      }}
                      weight
                    </div>
                    <div
                      v-if="
                        getArmorDetails(props.state.lockedArmor[slot])?.effect
                          ?.description
                      "
                    >
                      {{
                        getArmorDetails(props.state.lockedArmor[slot])?.effect
                          ?.description
                      }}
                    </div>
                  </div>
                </div>
                <UButton
                  size="xs"
                  color="error"
                  variant="soft"
                  @click="handleArmorLockChange(slot, null)"
                  class="flex-shrink-0 ml-1"
                >
                  <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
