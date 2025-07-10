<script setup lang="ts">
import type { Weapon } from "~/types/game/ds1/weapons";
import Icon from "~/components/Common/Icon.vue";
import SmartTooltip from "../../../Common/SmartTooltip.vue";

interface Props {
  weapon: Weapon & { rating: any };
  isExpanded: boolean;
  onToggleExpansion: () => void;
  getWeaponCategory: (weapon: any) => string;
  getEffectiveRequirements: (weapon: any) => any;
  hasAuxiliaryDamage: (weapon: any) => boolean;
  hasScaling: (weapon: any) => boolean;
  getMaxLevelForUpgradePath: (path: string) => number;
  state: any;
  isSelected?: boolean;
  onToggleSelection?: () => void;
  showCheckbox?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false,
  showCheckbox: true,
});

// Helper function to format weapon category name
const formatCategoryName = (category: string) => {
  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/s$/, "");
};
</script>

<template>
  <div
    :class="[
      'border rounded-lg p-4 transition-all duration-200',
      weapon.rating.meetsRequirements
        ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
        : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 opacity-60',
    ]"
  >
    <!-- Main Weapon Info - Clickable Section -->
    <div
      class="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded p-2 -m-2 transition-colors"
      @click="onToggleExpansion"
    >
      <div class="flex items-start gap-3 flex-1 min-w-0">
        <!-- Checkbox for comparison -->
        <div
          v-if="showCheckbox"
          class="flex-shrink-0"
          @click.stop="onToggleSelection?.()"
        >
          <input
            type="checkbox"
            :checked="isSelected"
            :aria-label="`Select ${weapon.name} for comparison`"
            class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
        </div>
        <div class="flex-1 min-w-0">
          <!-- Weapon Card Title -->
          <div class="mb-2">
            <div class="flex items-center gap-3 mb-1">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-lg text-gray-900 dark:text-white">
                  {{ weapon.name }}
                </h3>
                <!-- Special tooltip for Enchanted Club bug -->
                <SmartTooltip
                  v-if="
                    weapon.name === 'Club' &&
                    state.selectedUpgradePath === 'enchanted'
                  "
                  placement="top"
                >
                  <template #trigger>
                    <Icon
                      name="i-heroicons-exclamation-triangle"
                      class="w-4 h-4 text-orange-500 dark:text-orange-400 cursor-pointer"
                    />
                  </template>
                  <div class="max-w-xs space-y-2">
                    <div
                      class="font-semibold text-orange-600 dark:text-orange-400"
                    >
                      ⚠️ Known Game Bug
                    </div>
                    <div class="text-sm">
                      The Enchanted Club +1 has
                      <strong>lower damage</strong> than +0 due to a developer
                      oversight. This is the only weapon in the game with this
                      bug.
                    </div>
                    <div class="text-xs text-gray-400">
                      Damage progression: +0 (117/126) → +1 (113/121) → +2
                      (116/124)
                    </div>
                  </div>
                </SmartTooltip>
              </div>
              <span
                class="inline-flex items-center justify-center text-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 min-h-[2rem]"
              >
                {{ formatCategoryName(getWeaponCategory(weapon)) }}
              </span>
            </div>
            <div class="flex flex-wrap gap-3 text-sm">
              <span class="flex items-center gap-1">
                <span class="text-gray-600 dark:text-gray-400">Total AR:</span>
                <span
                  class="font-semibold"
                  :class="
                    weapon.rating.meetsRequirements
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400'
                  "
                >
                  {{ Math.round(weapon.rating.totalAttackRating) }}
                </span>
              </span>
              <span
                v-if="weapon.rating.magicAdjustment !== null"
                class="flex items-center gap-1"
              >
                <span class="text-purple-600 dark:text-purple-400"
                  >Mag Adj:</span
                >
                <span
                  class="font-semibold text-purple-600 dark:text-purple-400"
                >
                  {{ weapon.rating.magicAdjustment }}
                </span>
              </span>
              <span class="flex items-center gap-1">
                <span class="text-red-600 dark:text-red-400">Physical:</span>
                <span class="font-semibold text-red-600 dark:text-red-400">
                  {{ Math.round(weapon.rating.physical) }}
                </span>
              </span>
              <span class="flex items-center gap-1">
                <span class="text-blue-600 dark:text-blue-400">Magic:</span>
                <span class="font-semibold text-blue-600 dark:text-blue-400">
                  {{ Math.round(weapon.rating.magic) }}
                </span>
              </span>
              <span class="flex items-center gap-1">
                <span class="text-orange-600 dark:text-orange-400">Fire:</span>
                <span
                  class="font-semibold text-orange-600 dark:text-orange-400"
                >
                  {{ Math.round(weapon.rating.fire) }}
                </span>
              </span>
              <span class="flex items-center gap-1">
                <span class="text-yellow-600 dark:text-yellow-400"
                  >Lightning:</span
                >
                <span
                  class="font-semibold text-yellow-600 dark:text-yellow-400"
                >
                  {{ Math.round(weapon.rating.lightning) }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Expand Button -->
      <div class="flex items-center gap-3">
        <Icon
          :name="
            isExpanded ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'
          "
          class="w-4 h-4 text-gray-500"
        />
      </div>
    </div>

    <!-- Expanded Details -->
    <div
      v-if="isExpanded"
      class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
            Requirements
          </h4>
          <div class="space-y-1 text-gray-600 dark:text-gray-400">
            <div class="flex items-center gap-2">
              <span
                >Strength: {{ getEffectiveRequirements(weapon).strength }}</span
              >
              <span
                v-if="
                  state.isTwoHanded &&
                  weapon.requirements.strength >
                    getEffectiveRequirements(weapon).strength
                "
                class="text-xs text-blue-600 dark:text-blue-400"
              >
                (Two-handed)
              </span>
            </div>
            <div>
              Dexterity:
              {{ getEffectiveRequirements(weapon).dexterity }}
            </div>
            <div>
              Intelligence:
              {{ getEffectiveRequirements(weapon).intelligence }}
            </div>
            <div>Faith: {{ getEffectiveRequirements(weapon).faith }}</div>
          </div>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
            Details
          </h4>
          <div class="space-y-1 text-gray-600 dark:text-gray-400">
            <div>Weight: {{ weapon.weight }}</div>
            <div>Critical: {{ weapon.criticalDamage }}</div>
            <div v-if="weapon.upgradePath" class="flex items-center gap-2">
              <span>Upgrade Path:</span>
              <SmartTooltip placement="top">
                <template #trigger>
                  <Icon
                    name="i-heroicons-information-circle"
                    class="w-4 h-4 text-blue-500 dark:text-blue-300 cursor-pointer"
                  />
                </template>
                <div class="space-y-1">
                  <div
                    v-for="path in weapon.upgradePath
                      .split(',')
                      .map((p) => p.trim())"
                    :key="path"
                  >
                    {{ path.charAt(0).toUpperCase() + path.slice(1) }}
                  </div>
                </div>
              </SmartTooltip>
            </div>
            <div v-if="weapon.attackType" class="flex items-center gap-2">
              <span>Attack Type:</span>
              <SmartTooltip placement="top">
                <template #trigger>
                  <Icon
                    name="i-heroicons-information-circle"
                    class="w-4 h-4 text-blue-500 dark:text-blue-300 cursor-pointer"
                  />
                </template>
                <div class="space-y-1">
                  <div v-if="weapon.attackType.strike" class="text-sm">
                    Strike
                  </div>
                  <div v-if="weapon.attackType.slash" class="text-sm">
                    Slash
                  </div>
                  <div v-if="weapon.attackType.thrust" class="text-sm">
                    Thrust
                  </div>
                  <div v-if="weapon.attackType.regular" class="text-sm">
                    Regular
                  </div>
                </div>
              </SmartTooltip>
            </div>

            <!-- Auxiliary Damage -->
            <div
              v-if="hasAuxiliaryDamage(weapon)"
              class="flex items-center gap-2"
            >
              <span>Auxiliary Damage:</span>
              <SmartTooltip placement="top">
                <template #trigger>
                  <Icon
                    name="i-heroicons-information-circle"
                    class="w-4 h-4 text-blue-500 dark:text-blue-300 cursor-pointer"
                  />
                </template>
                <div class="space-y-1">
                  <div
                    v-if="weapon.auxillaryDamage.bleed > 0"
                    class="flex items-center gap-2"
                  >
                    <span class="capitalize">Bleed:</span>
                    <span class="font-semibold">{{
                      weapon.auxillaryDamage.bleed
                    }}</span>
                  </div>
                  <div
                    v-if="weapon.auxillaryDamage.poison > 0"
                    class="flex items-center gap-2"
                  >
                    <span class="capitalize">Poison:</span>
                    <span class="font-semibold">{{
                      weapon.auxillaryDamage.poison
                    }}</span>
                  </div>
                  <div
                    v-if="weapon.auxillaryDamage.toxic > 0"
                    class="flex items-center gap-2"
                  >
                    <span class="capitalize">Toxic:</span>
                    <span class="font-semibold">{{
                      weapon.auxillaryDamage.toxic
                    }}</span>
                  </div>
                  <div
                    v-if="weapon.auxillaryDamage.curse > 0"
                    class="flex items-center gap-2"
                  >
                    <span class="capitalize">Curse:</span>
                    <span class="font-semibold">{{
                      weapon.auxillaryDamage.curse
                    }}</span>
                  </div>
                  <div
                    v-if="weapon.auxillaryDamage.occult > 0"
                    class="flex items-center gap-2"
                  >
                    <span class="capitalize">Occult:</span>
                    <span class="font-semibold">{{
                      weapon.auxillaryDamage.occult
                    }}</span>
                  </div>
                  <div
                    v-if="weapon.auxillaryDamage.divine > 0"
                    class="flex items-center gap-2"
                  >
                    <span class="capitalize">Divine:</span>
                    <span class="font-semibold">{{
                      weapon.auxillaryDamage.divine
                    }}</span>
                  </div>
                </div>
              </SmartTooltip>
            </div>
          </div>
        </div>
      </div>

      <!-- Scaling Information -->
      <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
          Scaling
        </h4>
        <div
          v-if="hasScaling(weapon)"
          class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm"
        >
          <div
            v-if="weapon.rating.scalingInfo.scalingPercentages.strength > 0"
            class="flex items-center gap-2"
          >
            <span class="text-gray-600 dark:text-gray-400">Strength:</span>
            <span class="font-semibold text-blue-600 dark:text-blue-400">
              {{ weapon.rating.scalingInfo.scalingLetters.strength }}
              ({{
                Math.round(
                  weapon.rating.scalingInfo.scalingPercentages.strength
                )
              }}%)
            </span>
          </div>
          <div
            v-if="weapon.rating.scalingInfo.scalingPercentages.dexterity > 0"
            class="flex items-center gap-2"
          >
            <span class="text-gray-600 dark:text-gray-400">Dexterity:</span>
            <span class="font-semibold text-blue-600 dark:text-blue-400">
              {{ weapon.rating.scalingInfo.scalingLetters.dexterity }}
              ({{
                Math.round(
                  weapon.rating.scalingInfo.scalingPercentages.dexterity
                )
              }}%)
            </span>
          </div>
          <div
            v-if="weapon.rating.scalingInfo.scalingPercentages.intelligence > 0"
            class="flex items-center gap-2"
          >
            <span class="text-gray-600 dark:text-gray-400">Intelligence:</span>
            <span class="font-semibold text-blue-600 dark:text-blue-400">
              {{ weapon.rating.scalingInfo.scalingLetters.intelligence }}
              ({{
                Math.round(
                  weapon.rating.scalingInfo.scalingPercentages.intelligence
                )
              }}%)
            </span>
          </div>
          <div
            v-if="weapon.rating.scalingInfo.scalingPercentages.faith > 0"
            class="flex items-center gap-2"
          >
            <span class="text-gray-600 dark:text-gray-400">Faith:</span>
            <span class="font-semibold text-blue-600 dark:text-blue-400">
              {{ weapon.rating.scalingInfo.scalingLetters.faith }}
              ({{
                Math.round(weapon.rating.scalingInfo.scalingPercentages.faith)
              }}%)
            </span>
          </div>
        </div>
        <div
          v-else-if="
            weapon.weaponType === 'catalyst' || weapon.weaponType === 'talisman'
          "
          class="text-sm"
        >
          <div class="flex items-center gap-2">
            <span class="text-gray-600 dark:text-gray-400"> Scales with: </span>
            <span class="font-semibold text-purple-600 dark:text-purple-400">
              {{ weapon.weaponType === "catalyst" ? "Intelligence" : "Faith" }}
            </span>
          </div>
        </div>
        <div v-else class="text-sm text-gray-500 dark:text-gray-400">
          Does not scale
        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
          Base Damage
          <span v-if="weapon.rating.hasUpgradePath">
            (Level
            {{
              (() => {
                // Determine which upgrade path to use for display
                let upgradePath = "regular";
                if (
                  state.selectedUpgradePath &&
                  state.selectedUpgradePath !== "all"
                ) {
                  if (
                    weapon.upgradePath &&
                    weapon.upgradePath.includes(state.selectedUpgradePath)
                  ) {
                    upgradePath = state.selectedUpgradePath;
                  }
                } else if (weapon.upgradePath) {
                  upgradePath = weapon.upgradePath.split(",")[0].trim();
                }

                const maxLevel = getMaxLevelForUpgradePath(upgradePath);
                const weaponLevel = parseInt(state.weaponLevel) || 0;
                const effectiveLevel = Math.min(weaponLevel, maxLevel);

                return effectiveLevel;
              })()
            }})
          </span>
        </h4>
        <div class="flex gap-4 text-sm">
          <div class="flex items-center gap-1">
            <span class="text-gray-600 dark:text-gray-400">Total:</span>
            <span
              class="font-semibold text-lg"
              :class="
                weapon.rating.meetsRequirements
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-400'
              "
            >
              {{
                Math.round(
                  weapon.rating.basePhysical +
                    weapon.rating.baseMagic +
                    weapon.rating.baseFire +
                    weapon.rating.baseLightning
                )
              }}
            </span>
          </div>
          <div class="flex gap-3 text-xs">
            <span class="text-red-600 dark:text-red-400"
              >Physical: {{ Math.round(weapon.rating.basePhysical) }}</span
            >
            <span class="text-blue-600 dark:text-blue-400"
              >Magic: {{ Math.round(weapon.rating.baseMagic) }}</span
            >
            <span class="text-orange-600 dark:text-orange-400"
              >Fire: {{ Math.round(weapon.rating.baseFire) }}</span
            >
            <span class="text-yellow-600 dark:text-yellow-400"
              >Lightning: {{ Math.round(weapon.rating.baseLightning) }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
