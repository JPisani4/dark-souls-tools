<template>
  <div class="space-y-6">
    <!-- Ring Selection using CategorizedItemSelector -->
    <CategorizedItemSelector
      id="rings"
      label="Select Rings"
      placeholder="Select rings..."
      :options="ringOptions"
      :selected-items="selectedRings"
      :max-items="2"
      @add="addRing"
      @remove="removeRing"
    />

    <!-- Ring Effects Summary -->
    <div
      v-if="selectedRings.length > 0"
      class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4"
    >
      <h4 class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
        Ring Effects
      </h4>
      <ul class="space-y-1 mt-2">
        <li
          v-for="(value, key) in combinedEffects"
          :key="key"
          class="text-blue-600 dark:text-blue-400"
        >
          <span>
            {{
              EFFECT_DISPLAY_NAMES[String(key)] ||
              (typeof key === "string"
                ? key.charAt(0).toUpperCase() + key.slice(1)
                : key)
            }}
            <template v-if="key === 'attunementSlots'"> +{{ value }} </template>
            <template v-else-if="PERCENTAGE_KEYS.includes(String(key))">
              <span v-if="value < 0">{{ value }}%</span
              ><span v-else>+{{ value }}%</span>
            </template>
            <template v-else>
              <span v-if="value < 0">{{ value }}</span
              ><span v-else>+{{ value }}</span>
            </template>
          </span>
        </li>
      </ul>
      <!-- Special/unique effects: list individually -->
      <div v-for="ring in selectedRings" :key="ring.name + '-special'">
        <div
          v-if="ring.effect?.special"
          class="font-medium text-blue-600 dark:text-blue-400"
        >
          {{ ring.name }}:
          {{ getSpecialEffectDescription(ring.effect.special) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ring } from "~/types/game/ds1/rings";
import type { Weapon } from "~/types/game/ds1/weapons";
import type { Shield } from "~/types/game/ds1/shields";
import type { Sorcery } from "~/types/game/ds1/sorceries";
import type { Miracle } from "~/types/game/ds1/miracles";
import type { Pyromancy } from "~/types/game/ds1/pyromancies";
import type { Armor } from "~/types/game/ds1/armor";
import Icon from "~/components/Common/Icon.vue";
import CategorizedItemSelector from "./CategorizedItemSelector.vue";
import { computed } from "vue";

interface Props {
  selectedRings: Ring[];
  ringOptions: Array<{
    value: string;
    label: string;
    category: string;
    item: Ring;
  }>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  updateRings: [rings: Ring[]];
  clearRings: [];
}>();

// Computed properties for ring effects
const totalHpBonus = computed(() => {
  const multipliers = props.selectedRings.map((ring) => {
    let bonus = 0;
    if (ring.effect) {
      bonus += ring.effect.hpBonus || 0;
      if (ring.effect.statBonus) {
        bonus += ring.effect.statBonus.maxHp || 0;
      }
    }
    return 1 + bonus / 100;
  });

  // Apply multipliers multiplicatively
  const totalMultiplier = multipliers.reduce(
    (total, multiplier) => total * multiplier,
    1
  );
  return Math.round((totalMultiplier - 1) * 100);
});

const totalStaminaBonus = computed(() => {
  const multipliers = props.selectedRings.map((ring) => {
    let bonus = 0;
    if (ring.effect) {
      bonus += ring.effect.staminaBonus || 0;
      if (ring.effect.statBonus) {
        bonus += ring.effect.statBonus.staminaBonus || 0;
      }
    }
    return 1 + bonus / 100;
  });

  // Apply multipliers multiplicatively
  const totalMultiplier = multipliers.reduce(
    (total, multiplier) => total * multiplier,
    1
  );
  return Math.round((totalMultiplier - 1) * 100);
});

const totalStaminaRegenBonus = computed(() => {
  return props.selectedRings.reduce((total, ring) => {
    return total + (ring.effect?.staminaRegenBonus || 0);
  }, 0);
});

const totalEquipLoadBonus = computed(() => {
  const multipliers = props.selectedRings.map((ring) => {
    let bonus = 0;
    if (ring.effect) {
      bonus += ring.effect.equipLoadBonus || 0;
      if (ring.effect.statBonus) {
        bonus += ring.effect.statBonus.equipLoadBonus || 0;
      }
    }
    return 1 + bonus / 100;
  });

  // Apply multipliers multiplicatively
  const totalMultiplier = multipliers.reduce(
    (total, multiplier) => total * multiplier,
    1
  );
  return Math.round((totalMultiplier - 1) * 100);
});

const totalMiraclePower = computed(() => {
  const multipliers = props.selectedRings.map((ring) => {
    const bonus = ring.effect?.statBonus?.miraclePower || 0;
    return 1 + bonus / 100;
  });

  // Apply multipliers multiplicatively
  const totalMultiplier = multipliers.reduce(
    (total, multiplier) => total * multiplier,
    1
  );
  return Math.round((totalMultiplier - 1) * 100);
});

const totalMagicDamage = computed(() => {
  const multipliers = props.selectedRings.map((ring) => {
    const bonus = ring.effect?.statBonus?.magicDamage || 0;
    return 1 + bonus / 100;
  });

  // Apply multipliers multiplicatively
  const totalMultiplier = multipliers.reduce(
    (total, multiplier) => total * multiplier,
    1
  );
  return Math.round((totalMultiplier - 1) * 100);
});

const totalPoise = computed(() => {
  return props.selectedRings.reduce((total, ring) => {
    return total + (ring.effect?.statBonus?.poise || 0);
  }, 0);
});

const totalItemDiscovery = computed(() => {
  const multipliers = props.selectedRings.map((ring) => {
    const bonus = ring.effect?.statBonus?.itemDiscovery || 0;
    return 1 + bonus / 100;
  });

  // Apply multipliers multiplicatively
  const totalMultiplier = multipliers.reduce(
    (total, multiplier) => total * multiplier,
    1
  );
  return Math.round((totalMultiplier - 1) * 100);
});

const totalSoulGain = computed(() => {
  const multipliers = props.selectedRings.map((ring) => {
    const bonus = ring.effect?.statBonus?.soulGain || 0;
    return 1 + bonus / 100;
  });

  // Apply multipliers multiplicatively
  const totalMultiplier = multipliers.reduce(
    (total, multiplier) => total * multiplier,
    1
  );
  return Math.round((totalMultiplier - 1) * 100);
});

const hasDarkWoodGrainRing = computed(() => {
  return props.selectedRings.some(
    (ring) => ring.effect?.special === "dark-wood-grain-ring"
  );
});

// Special effect mapping for readable descriptions
const getSpecialEffectDescription = (specialKey: string): string => {
  const effectMap: Record<string, string> = {
    "dark-wood-grain-ring": "Enhanced dodge roll (ninja flip)",
    abyss_walking: "Allows walking in the Abyss",
    understand_quelaan: "Understand Quelaan's speech",
    invisibility: "Makes player transparent and un-targetable",
    double_damage: "Player receives double damage",
    silent_movement: "Silent movement (reduces enemy detection)",
    no_fall_damage: "Prevents fall damage",
    walk_on_lava: "Allows walking on lava",
    move_freely_in_water: "Move freely in water",
    restores_hp_on_kill: "Restores HP when killing enemies",
    prevents_soul_loss: "Prevents soul loss on death",
    prevents_soul_loss_and_curse: "Prevents soul loss and curse on death",
    forest_invasion: "Enables Forest Hunter invasions",
    dark_anor_londo_invasion: "Enables Dark Anor Londo invasions",
  };
  return effectMap[specialKey] || specialKey;
};

// Functions
const addRing = (
  item: Weapon | Shield | Sorcery | Miracle | Pyromancy | Ring | Armor
) => {
  if ("ringType" in item) {
    const ring = item as Ring;
    const updatedRings = [...props.selectedRings, ring];
    emit("updateRings", updatedRings);
  }
};

const removeRing = (index: number) => {
  const updatedRings = [...props.selectedRings];
  updatedRings.splice(index, 1);
  emit("updateRings", updatedRings);
};

const clearRings = () => {
  emit("clearRings");
};

// Mapping from effect keys to user-friendly display names
const EFFECT_DISPLAY_NAMES: Record<string, string> = {
  vitality: "Vitality",
  attunement: "Attunement",
  endurance: "Endurance",
  strength: "Strength",
  dexterity: "Dexterity",
  resistance: "Resistance",
  intelligence: "Intelligence",
  faith: "Faith",
  phsyicalDefense: "Physical Defense", // handle typo
  physicalDefense: "Physical Defense",
  magicDefense: "Magic Defense",
  fireDefense: "Fire Defense",
  lightningDefense: "Lightning Defense",
  bleedResist: "Bleed Resistance",
  poisonResist: "Poison Resistance",
  curseResist: "Curse Resistance",
  attackPower: "Attack Power",
  defense: "Defense",
  magicEffectLength: "Magic Effect Length",
  magicDamage: "Magic Damage",
  miracleUses: "Miracle Uses",
  maxHp: "Max HP",
  miraclePower: "Miracle Power",
  counterDamage: "Counter Damage",
  poise: "Poise",
  bowRange: "Bow Range",
  criticalDamage: "Critical Damage",
  durability: "Durability",
  itemDiscovery: "Item Discovery",
  soulGain: "Soul Gain",
  staminaBonus: "Stamina Bonus",
  staminaRegenBonus: "Stamina Regen Bonus",
  equipLoadBonus: "Equip Load Bonus",
  attunementSlots: "Attunement Slot",
  hpBonus: "HP Bonus",
  special: "Special",
};

// Keys that should always be displayed as percentages
const PERCENTAGE_KEYS = [
  "maxHp",
  "staminaBonus",
  "equipLoadBonus",
  "soulGain",
  "miraclePower",
  "magicDamage",
  "bleedResist",
  "poisonResist",
  "curseResist",
  "bowRange",
  "durability",
  "defense",
  "attackPower",
  "counterDamage",
  "criticalDamage",
  "magicEffectLength",
  "miracleSynergy",
  // Add more if needed
];

// Utility to extract and combine all displayable effects from selected rings
function getCombinedRingEffects(rings: Ring[]): Record<string, number> {
  // Define which effects are multiplicative percentages
  const multiplicativeKeys = [
    "maxHp",
    "staminaBonus",
    "equipLoadBonus",
    "soulGain",
    "miraclePower",
    "magicDamage",
    // Add more if needed
  ];
  // Sum for additive, multiply for multiplicative
  const combined: Record<string, number> = {};
  // For multiplicative, store as array of multipliers
  const multipliers: Record<string, number[]> = {};

  for (const ring of rings) {
    // Top-level effect fields
    if (ring.effect) {
      for (const key of Object.keys(ring.effect)) {
        const value = (ring.effect as any)[key];
        if (typeof value === "number" && value !== 0) {
          if (multiplicativeKeys.includes(key)) {
            if (!multipliers[key]) multipliers[key] = [];
            multipliers[key].push(1 + value / 100);
          } else {
            combined[key] = (combined[key] || 0) + value;
          }
        }
      }
      // Nested statBonus
      if (ring.effect.statBonus) {
        for (const [key, value] of Object.entries(ring.effect.statBonus)) {
          if (typeof value === "number" && value !== 0) {
            if (multiplicativeKeys.includes(key)) {
              if (!multipliers[key]) multipliers[key] = [];
              multipliers[key].push(1 + value / 100);
            } else {
              combined[key] = (combined[key] || 0) + value;
            }
          }
        }
      }
    }
  }
  // Now combine multiplicative effects
  for (const key of Object.keys(multipliers)) {
    const totalMultiplier = multipliers[key].reduce((a, b) => a * b, 1);
    // Convert back to percentage
    combined[key] = Math.round((totalMultiplier - 1) * 100);
  }
  return combined;
}

// Compute combined effects for the selected rings
const combinedEffects = computed(() =>
  getCombinedRingEffects(props.selectedRings)
);
</script>
