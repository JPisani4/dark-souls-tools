import { ref } from "vue";
import { upgradePathsManifest } from "~/utils/upgradePaths";
import { merchants } from "~/utils/upgradeCosts";
import type {
  UpgradePath,
  UpgradePathWithAscend,
  AscendStep,
} from "@/types/upgrade";

function mergeMaterials(
  base: Record<string, number>,
  addition: Record<string, number>
) {
  for (const key in addition) {
    base[key] = (base[key] || 0) + addition[key];
  }
}

function findUpgradePath(pathId: string): UpgradePath | undefined {
  return upgradePathsManifest.find((p) => p.id === pathId);
}

function findAscendStepTo(
  path: UpgradePath,
  fromPathId: string
): AscendStep | undefined {
  if (!("ascendSteps" in path) || !path.ascendSteps) return undefined;
  return path.ascendSteps.find(
    (step) => step.basePath && step.basePath.pathId === fromPathId
  );
}

// Recursive function to build the full upgrade and ascension journey
function buildUpgradeJourney({
  pathId,
  fromLevel,
  toLevel,
  includeAscension,
  currentWeaponPathId,
  currentLevel,
}: {
  pathId: string;
  fromLevel: number;
  toLevel: number;
  includeAscension: boolean;
  currentWeaponPathId?: string;
  currentLevel: number;
}): { steps: any[]; materials: Record<string, number>; souls: number } {
  const path = findUpgradePath(pathId);
  if (!path) return { steps: [], materials: {}, souls: 0 };
  let steps: any[] = [];
  let materials: Record<string, number> = {};
  let souls = 0;

  // If ascension is included and this path has a base path (ascendStep), handle recursively
  let ascendStep: AscendStep | undefined;
  let basePathId: string | undefined;
  let baseRequiredLevel: number | undefined;
  if (
    includeAscension &&
    "ascendSteps" in path &&
    path.ascendSteps &&
    path.ascendSteps.length > 0
  ) {
    if (path.ascendSteps.length > 1) {
      if (pathId === "chaos") {
        ascendStep = path.ascendSteps.find(
          (step) => step.basePath?.pathId === "fire"
        );
      } else {
        ascendStep = path.ascendSteps[0];
      }
    } else {
      ascendStep = path.ascendSteps[0];
    }
    if (ascendStep && ascendStep.basePath) {
      basePathId = ascendStep.basePath.pathId;
      baseRequiredLevel = ascendStep.basePath.requiredLevel;
    }
  }

  // If there is a base path, recursively build its journey first
  if (basePathId && baseRequiredLevel !== undefined) {
    // 1. Upgrade base path from fromLevel to baseRequiredLevel
    const baseResult = buildUpgradeJourney({
      pathId: basePathId,
      fromLevel,
      toLevel: baseRequiredLevel,
      includeAscension,
      currentWeaponPathId,
      currentLevel,
    });
    steps = steps.concat(baseResult.steps);
    mergeMaterials(materials, baseResult.materials);
    souls += baseResult.souls;
    // 2. Add the ascension step
    if (ascendStep) {
      const basePath = findUpgradePath(basePathId);
      souls += ascendStep.souls;
      mergeMaterials(materials, ascendStep.materials);
      steps.push({
        type: "ascend",
        fromPathName: basePath?.name || "Regular",
        toPathName: path.name,
        from: ascendStep.from,
        to: ascendStep.to,
        souls: ascendStep.souls,
        materials: ascendStep.materials,
      });
    }
    // 3. Upgrade this path from 0 to toLevel
    fromLevel = 0;
  }

  // Add upgrade steps for this path
  if (path.steps && path.steps.length > 0) {
    for (const step of path.steps) {
      if (step.from >= fromLevel && step.from < toLevel) {
        souls += step.souls;
        // Add to global materials for total calculation
        mergeMaterials(materials, step.materials);
        // Create step with its own materials copy
        steps.push({
          type: "reinforce",
          pathName: path.name,
          from: step.from,
          to: step.to,
          souls: step.souls,
          materials: { ...step.materials }, // Create a copy of materials for this step
        });
      }
    }
  }

  return { steps, materials, souls };
}

export function useUpgradeCalculator() {
  const result = ref<null | {
    souls: number;
    purchaseCost?: number;
    materials: Record<string, number>;
    steps: any[];
  }>(null);

  function calculate({
    currentLevel,
    desiredLevel,
    selectedPathId,
    selectedMerchantId,
    includeAscension,
    currentWeaponPathId,
  }: {
    currentLevel: number;
    desiredLevel: number;
    selectedPathId: string;
    selectedMerchantId: string;
    includeAscension: boolean;
    currentWeaponPathId: string;
  }) {
    const merchant = merchants.find((v) => v.id === selectedMerchantId);
    // merchant can be undefined if not selected

    let steps = [];
    let materials = {};
    let souls = 0;

    if (currentWeaponPathId === selectedPathId || !includeAscension) {
      // Only reinforce steps for the current path (no ascension)
      const journey = buildUpgradeJourney({
        pathId: currentWeaponPathId,
        fromLevel: currentLevel,
        toLevel: desiredLevel,
        includeAscension: false,
        currentLevel,
      });
      steps = journey.steps;
      materials = journey.materials;
      souls = journey.souls;
    } else {
      // Only include ascension if includeAscension is true
      // Robust: Only include steps from current path/level to ascension, then ascension, then desired path
      // 1. Find the ascension step from currentWeaponPathId to selectedPathId
      const currentPath = findUpgradePath(currentWeaponPathId);
      const desiredPath = findUpgradePath(selectedPathId);
      if (
        !currentPath ||
        !desiredPath ||
        !("ascendSteps" in desiredPath) ||
        !desiredPath.ascendSteps
      ) {
        result.value = null;
        return;
      }
      const ascendStep = desiredPath.ascendSteps.find(
        (step) => step.basePath && step.basePath.pathId === currentWeaponPathId
      );
      if (!ascendStep) {
        result.value = null;
        return;
      }
      // 2. Build journey on current path from currentLevel to ascension requiredLevel
      const toAscendLevel = ascendStep.basePath.requiredLevel;
      const baseJourney = buildUpgradeJourney({
        pathId: currentWeaponPathId,
        fromLevel: currentLevel,
        toLevel: toAscendLevel,
        includeAscension: false,
        currentLevel,
      });
      // 3. Add the ascension step
      const basePath = findUpgradePath(currentWeaponPathId);
      const ascendStepObj = {
        type: "ascend",
        fromPathName: basePath?.name || "Regular",
        toPathName: desiredPath.name,
        from: ascendStep.from,
        to: ascendStep.to,
        souls: ascendStep.souls,
        materials: ascendStep.materials,
      };
      // 4. Build journey on desired path from 0 to desiredLevel
      const desiredJourney = buildUpgradeJourney({
        pathId: selectedPathId,
        fromLevel: 0,
        toLevel: desiredLevel,
        includeAscension: false,
        currentLevel: 0,
      });
      // Combine all steps/materials/souls
      steps = [...baseJourney.steps, ascendStepObj, ...desiredJourney.steps];
      materials = {};
      souls = 0;
      for (const step of steps) {
        souls += step.souls;
        mergeMaterials(materials, step.materials);
      }
    }

    let purchaseCost = 0;
    for (const [material, qty] of Object.entries(materials)) {
      const price = merchant ? (merchant.materialPrices[material] ?? 0) : 0;
      purchaseCost += price * qty;
    }

    result.value = {
      souls,
      materials: { ...materials },
      steps: [...steps],
      purchaseCost,
    };
  }

  return {
    result,
    calculate,
  };
}
