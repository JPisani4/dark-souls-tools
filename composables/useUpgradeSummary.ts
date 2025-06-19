import type { Ref } from "vue";
import { computed } from "vue";
import { merchants } from "~/utils/upgradeCosts";
import { calculateTotalPotentialSavings } from "~/utils/merchantAnalysis";
import type { Merchant, Step, GroupedStep } from "~/types/upgradeSummary";

export function useUpgradeSummary({
  materials,
  steps,
  selectedMerchantId,
}: {
  materials: Ref<Record<string, number>>;
  steps: Ref<Step[]>;
  selectedMerchantId: Ref<string | undefined>;
}) {
  // Memoized merchant lookup
  const selectedMerchant = computed((): Merchant | null => {
    if (!selectedMerchantId.value) return null;
    return (
      merchants.find((m: Merchant) => m.id === selectedMerchantId.value) || null
    );
  });

  // Material categorization (no cache)
  const categorizedMaterials = computed(() => {
    const purchaseable: Record<string, number> = {};
    const findable: Record<string, number> = {};

    Object.entries(materials.value).forEach(([material, qty]) => {
      // If any merchant sells this material, it's purchaseable
      const isPurchaseable = merchants.some(
        (m) =>
          m.materialPrices[material] !== undefined &&
          m.materialPrices[material] > 0
      );
      if (isPurchaseable) {
        purchaseable[material] = qty as number;
      } else {
        findable[material] = qty as number;
      }
    });

    return { purchaseable, findable };
  });

  // Cost calculation (no cache)
  const purchaseableCost = computed((): number => {
    if (!selectedMerchant.value) return 0;
    return Object.entries(categorizedMaterials.value.purchaseable).reduce(
      (total, [material, qty]) => {
        const price = selectedMerchant.value!.materialPrices[material] ?? 0;
        return total + price * (qty as number);
      },
      0
    );
  });

  // Grouping logic (no cache)
  const groupedSteps = computed((): GroupedStep[] => {
    const groups: GroupedStep[] = [];
    let currentGroup: GroupedStep | null = null;

    const pushCurrentGroup = () => {
      if (currentGroup) {
        groups.push({ ...currentGroup, totalSouls: currentGroup.souls });
      }
    };

    const createNewGroup = (step: Step): GroupedStep => ({
      type: step.type,
      from: step.from,
      to: step.to,
      souls: step.souls,
      materials: { ...step.materials },
      pathName: step.pathName,
      fromPathName: step.fromPathName,
      toPathName: step.toPathName,
      totalSouls: step.souls,
      count: 1,
    });

    const extendCurrentGroup = (step: Step) => {
      if (!currentGroup) return;
      currentGroup.to = step.to;
      currentGroup.souls += step.souls;
      currentGroup.totalSouls += step.souls;
      currentGroup.count = (currentGroup.count || 1) + 1;
      Object.entries(step.materials).forEach(([mat, qty]) => {
        currentGroup!.materials[mat] =
          (currentGroup!.materials[mat] || 0) + (qty as number);
      });
    };

    for (const step of steps.value) {
      if (step.type === "ascend") {
        pushCurrentGroup();
        currentGroup = createNewGroup(step);
      } else if (step.type === "reinforce") {
        if (
          currentGroup?.type === "reinforce" &&
          step.from === currentGroup.to
        ) {
          extendCurrentGroup(step);
        } else {
          pushCurrentGroup();
          currentGroup = createNewGroup(step);
        }
      }
    }
    pushCurrentGroup();
    return groups;
  });

  // Savings calculation (no cache)
  const totalPotentialSavings = computed((): number => {
    return calculateTotalPotentialSavings(
      categorizedMaterials.value.purchaseable,
      selectedMerchant.value
    );
  });

  return {
    selectedMerchant,
    categorizedMaterials,
    purchaseableCost,
    groupedSteps,
    totalPotentialSavings,
  };
}
