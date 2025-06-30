<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Ring Selection
      </h3>
      <UButton
        size="sm"
        variant="solid"
        color="success"
        @click="clearRings"
        class="font-medium shadow-sm hover:shadow-md transition-shadow"
      >
        <Icon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
        Clear Rings
      </UButton>
    </div>

    <!-- Ring Selection using CategorizedItemSelector -->
    <CategorizedItemSelector
      id="rings"
      label="Rings (optional)"
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
      <div class="space-y-1 text-sm text-blue-600 dark:text-blue-200">
        <div v-if="totalHpBonus > 0">+{{ totalHpBonus }}% Max HP</div>
        <div v-if="totalStaminaBonus > 0">
          +{{ totalStaminaBonus }}% Max Stamina
        </div>
        <div v-if="totalStaminaRegenBonus > 0">
          +{{ totalStaminaRegenBonus }} Stamina Regen
        </div>
        <div v-if="totalEquipLoadBonus > 0">
          +{{ totalEquipLoadBonus }}% Equip Load
        </div>
        <div v-if="totalMiraclePower > 0">
          +{{ totalMiraclePower }}% Miracle Power
        </div>
        <div v-if="totalMagicDamage > 0">
          +{{ totalMagicDamage }}% Magic Damage
        </div>
        <div v-if="totalPoise > 0">+{{ totalPoise }} Poise</div>
        <div v-if="totalItemDiscovery > 0">
          +{{ totalItemDiscovery }}% Item Discovery
        </div>
        <div v-if="totalSoulGain > 0">+{{ totalSoulGain }}% Soul Gain</div>
        <div v-if="hasDarkWoodGrainRing" class="font-medium">
          Dark Wood Grain Ring: Enhanced dodge roll
        </div>
        <!-- Show special effects from rings -->
        <div v-for="ring in selectedRings" :key="ring.name">
          <div v-if="ring.effect?.special" class="font-medium">
            {{ ring.name }}:
            {{ getSpecialEffectDescription(ring.effect.special) }}
          </div>
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
import type { Armor } from "~/types/game/ds1/armor";
import Icon from "~/components/Common/Icon.vue";
import CategorizedItemSelector from "./CategorizedItemSelector.vue";

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
const addRing = (item: Weapon | Shield | Sorcery | Miracle | Ring | Armor) => {
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
</script>
