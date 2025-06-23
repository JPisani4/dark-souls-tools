import { upgradePathsManifest } from "~/utils/games/ds1/upgradePaths";
import { merchants } from "~/utils/games/ds1/upgradeCosts";
import { reactive, computed, ref, watch } from "vue";
import { useUpgradeSummary } from "./useUpgradeSummary";
import { useMaterialAnalysis } from "./useMaterialAnalysis";
import { useBaseTool } from "./useBaseTool";
import type {
  UpgradePath,
  Material,
  Merchant,
  UpgradePathWithAscend,
  AscendStep,
} from "~/types/game/upgrade";
import {
  AUTO_SAVE_KEYS,
  DEBOUNCE_DELAYS,
  VALIDATION_MESSAGES,
} from "~/utils/constants";

export interface UpgradeCalculatorState {
  currentLevel: number;
  desiredLevel: number;
  selectedPathId: string;
  selectedMerchantId: string;
  currentWeaponPathId: string;
}

export interface UpgradeCalculatorResult {
  souls: number;
  materials: Record<string, number>;
  steps: any[];
  purchaseCost: number;
  timestamp: Date;
}

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
  currentWeaponPathId,
  currentLevel,
  skipBasePath = false,
}: {
  pathId: string;
  fromLevel: number;
  toLevel: number;
  currentWeaponPathId?: string;
  currentLevel: number;
  skipBasePath?: boolean;
}): { steps: any[]; materials: Record<string, number>; souls: number } {
  const path = findUpgradePath(pathId);
  if (!path) return { steps: [], materials: {}, souls: 0 };
  let steps: any[] = [];
  let materials: Record<string, number> = {};
  let souls = 0;

  // If this path has a base path (ascendStep), handle recursively (unless skipBasePath is true)
  let ascendStep: AscendStep | undefined;
  let basePathId: string | undefined;
  let baseRequiredLevel: number | undefined;
  if (
    !skipBasePath &&
    "ascendSteps" in path &&
    path.ascendSteps &&
    path.ascendSteps.length > 0
  ) {
    if (path.ascendSteps.length > 1) {
      // For multi-step ascensions, always prefer the intermediate path over direct ascension from Regular
      // The intermediate path represents a more complete progression
      ascendStep =
        path.ascendSteps.find(
          (step) => step.basePath && step.basePath.pathId !== "regular"
        ) || path.ascendSteps[0];
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
      currentWeaponPathId,
      currentLevel,
      skipBasePath: true, // Prevent further recursion
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
  // Initialize state
  const initialState: UpgradeCalculatorState = {
    currentLevel: 0,
    desiredLevel: 0,
    selectedPathId: "",
    selectedMerchantId: "",
    currentWeaponPathId: "",
  };

  // Validation rules
  const validationRules = {
    currentLevel: (value: number) => {
      if (value < 0 || value > 15) {
        return "Current level must be between 0 and 15";
      }
      return null;
    },
    desiredLevel: (value: number) => {
      if (value < 0 || value > 15) {
        return "Desired level must be between 0 and 15";
      }
      return null;
    },
    selectedPathId: (value: string) => {
      if (!value) {
        return "Please select an upgrade path";
      }
      return null;
    },
    selectedMerchantId: (value: string) => {
      // Allow empty merchant selection (optional)
      return null;
    },
    currentWeaponPathId: (value: string) => {
      if (!value) {
        return "Please select a current weapon path";
      }
      return null;
    },
  };

  // Calculation function
  const calculateUpgrade = async (
    state: UpgradeCalculatorState
  ): Promise<UpgradeCalculatorResult> => {
    const {
      currentLevel,
      desiredLevel,
      selectedPathId,
      selectedMerchantId,
      currentWeaponPathId,
    } = state;

    const merchant = selectedMerchantId
      ? merchants.find((v) => v.id === selectedMerchantId)
      : null;

    let steps: any[] = [];
    let materials: Record<string, number> = {};
    let souls = 0;

    if (currentWeaponPathId === selectedPathId) {
      // Only reinforce steps for the current path (no ascension)
      const journey = buildUpgradeJourney({
        pathId: currentWeaponPathId,
        fromLevel: currentLevel,
        toLevel: desiredLevel,
        currentWeaponPathId,
        currentLevel,
      });
      steps = journey.steps;
      materials = journey.materials;
      souls = journey.souls;
    } else {
      // Special handling for multi-step ascensions
      const selectedPath = findUpgradePath(selectedPathId);
      const isMultiStepAscension =
        selectedPath &&
        "ascendSteps" in selectedPath &&
        selectedPath.ascendSteps &&
        selectedPath.ascendSteps.length > 1;

      if (
        isMultiStepAscension &&
        selectedPath &&
        "ascendSteps" in selectedPath &&
        selectedPath.ascendSteps
      ) {
        // For multi-step ascensions, find the longest/most complete chain
        // This means finding the ascend step that requires the highest level
        const intermediateStep = selectedPath.ascendSteps.reduce(
          (best, current) => {
            if (!best) return current;
            if (!current.basePath || !best.basePath) return best;

            // Prefer the step that requires a higher level (more complete path)
            if (current.basePath.requiredLevel > best.basePath.requiredLevel) {
              return current;
            }

            // If levels are equal, prefer non-starting base paths
            if (
              current.basePath.requiredLevel === best.basePath.requiredLevel
            ) {
              // Check if current is a more advanced path than best
              const currentPath = findUpgradePath(current.basePath.pathId);
              const bestPath = findUpgradePath(best.basePath.pathId);

              // Prefer paths that have their own ascend steps (more advanced)
              const currentHasAscendSteps =
                currentPath &&
                "ascendSteps" in currentPath &&
                currentPath.ascendSteps &&
                currentPath.ascendSteps.length > 0;
              const bestHasAscendSteps =
                bestPath &&
                "ascendSteps" in bestPath &&
                bestPath.ascendSteps &&
                bestPath.ascendSteps.length > 0;

              if (currentHasAscendSteps && !bestHasAscendSteps) {
                return current;
              }
            }

            return best;
          },
          undefined as AscendStep | undefined
        );

        if (intermediateStep && intermediateStep.basePath) {
          const intermediatePathId = intermediateStep.basePath.pathId;
          const requiredLevel = intermediateStep.basePath.requiredLevel;

          // Find the direct ascension step from current path to intermediate path
          const directToIntermediate = selectedPath.ascendSteps.find(
            (step) =>
              step.basePath && step.basePath.pathId === currentWeaponPathId
          );

          if (directToIntermediate) {
            // 1. Upgrade current path to required level for intermediate ascension
            const currentJourney = buildUpgradeJourney({
              pathId: currentWeaponPathId,
              fromLevel: currentLevel,
              toLevel: requiredLevel,
              currentWeaponPathId,
              currentLevel,
              skipBasePath: true,
            });
            steps = steps.concat(currentJourney.steps);
            mergeMaterials(materials, currentJourney.materials);
            souls += currentJourney.souls;

            // 2. Ascend current path to intermediate path
            const intermediatePath = findUpgradePath(intermediatePathId);
            const currentPath = findUpgradePath(currentWeaponPathId);
            steps.push({
              type: "ascend",
              fromPathName: currentPath?.name || currentWeaponPathId,
              toPathName: intermediatePath?.name || intermediatePathId,
              from: directToIntermediate.from,
              to: directToIntermediate.to,
              souls: directToIntermediate.souls,
              materials: directToIntermediate.materials,
            });
            souls += directToIntermediate.souls;
            mergeMaterials(materials, directToIntermediate.materials);

            // 3. Upgrade intermediate path to required level for final ascension
            const intermediateJourney = buildUpgradeJourney({
              pathId: intermediatePathId,
              fromLevel: 0,
              toLevel: requiredLevel,
              currentWeaponPathId,
              currentLevel: 0,
              skipBasePath: true,
            });
            steps = steps.concat(intermediateJourney.steps);
            mergeMaterials(materials, intermediateJourney.materials);
            souls += intermediateJourney.souls;

            // 4. Ascend intermediate path to final path
            steps.push({
              type: "ascend",
              fromPathName: intermediatePath?.name || intermediatePathId,
              toPathName: selectedPath.name,
              from: intermediateStep.from,
              to: intermediateStep.to,
              souls: intermediateStep.souls,
              materials: intermediateStep.materials,
            });
            souls += intermediateStep.souls;
            mergeMaterials(materials, intermediateStep.materials);

            // 5. Upgrade final path to desired level
            const finalJourney = buildUpgradeJourney({
              pathId: selectedPathId,
              fromLevel: 0,
              toLevel: desiredLevel,
              currentWeaponPathId,
              currentLevel: 0,
              skipBasePath: true,
            });
            steps = steps.concat(finalJourney.steps);
            mergeMaterials(materials, finalJourney.materials);
            souls += finalJourney.souls;
          }
        }
      } else {
        // Use the existing ascension chain logic for other cases
        const ascensionChain = findAscensionChain(
          currentWeaponPathId,
          selectedPathId
        );

        if (!ascensionChain) {
          throw new Error("No valid ascension path found");
        }

        // Build the complete journey through the ascension chain
        let currentPathId = ascensionChain[0];
        let currentLevelInChain = currentLevel;

        for (let i = 0; i < ascensionChain.length - 1; i++) {
          const fromPathId = ascensionChain[i];
          const toPathId = ascensionChain[i + 1];

          // Find the ascension step between these two paths
          const fromPath = findUpgradePath(fromPathId);
          const toPath = findUpgradePath(toPathId);

          if (
            !fromPath ||
            !toPath ||
            !("ascendSteps" in toPath) ||
            !toPath.ascendSteps
          ) {
            throw new Error("Invalid ascension path configuration");
          }

          const ascendStep = toPath.ascendSteps.find(
            (step) => step.basePath && step.basePath.pathId === fromPathId
          );

          if (!ascendStep || !ascendStep.basePath) {
            throw new Error("Ascension step not found");
          }

          // 1. Upgrade current path to required level for ascension
          const toAscendLevel = ascendStep.basePath.requiredLevel;
          const baseJourney = buildUpgradeJourney({
            pathId: fromPathId,
            fromLevel: currentLevelInChain,
            toLevel: toAscendLevel,
            currentWeaponPathId,
            currentLevel: currentLevelInChain,
            skipBasePath: true, // Prevent recursive base path building
          });

          steps = steps.concat(baseJourney.steps);
          mergeMaterials(materials, baseJourney.materials);
          souls += baseJourney.souls;

          // 2. Add the ascension step
          const ascendStepObj = {
            type: "ascend",
            fromPathName: fromPath.name,
            toPathName: toPath.name,
            from: ascendStep.from,
            to: ascendStep.to,
            souls: ascendStep.souls,
            materials: ascendStep.materials,
          };

          steps.push(ascendStepObj);
          souls += ascendStep.souls;
          mergeMaterials(materials, ascendStep.materials);

          // 3. Prepare for next iteration
          currentPathId = toPathId;
          currentLevelInChain = 0; // Ascension resets level to 0
        }

        // 4. Upgrade the final path to desired level
        const finalJourney = buildUpgradeJourney({
          pathId: selectedPathId,
          fromLevel: 0,
          toLevel: desiredLevel,
          currentWeaponPathId,
          currentLevel: 0,
          skipBasePath: true, // Prevent recursive base path building
        });

        steps = steps.concat(finalJourney.steps);
        mergeMaterials(materials, finalJourney.materials);
        souls += finalJourney.souls;
      }
    }

    let purchaseCost = 0;
    for (const [material, qty] of Object.entries(materials)) {
      const price = merchant ? (merchant.materialPrices[material] ?? 0) : 0;
      purchaseCost += price * (qty as number);
    }

    return {
      souls,
      materials: { ...materials },
      steps: [...steps],
      purchaseCost,
      timestamp: new Date(),
    };
  };

  // Use base tool composable
  const baseTool = useBaseTool(
    {
      initialState,
      validationRules,
      autoSave: true,
      autoSaveKey: AUTO_SAVE_KEYS.WEAPON_UPGRADE_CALCULATOR,
      debounceMs: DEBOUNCE_DELAYS.AUTO_SAVE,
      enableAnalytics: true,
      enableErrorBoundary: true,
    },
    calculateUpgrade
  );

  // Helper function to find the complete ascension chain
  function findAscensionChain(
    fromPathId: string,
    toPathId: string,
    visited: Set<string> = new Set()
  ): string[] | null {
    if (fromPathId === toPathId) return [fromPathId];
    if (visited.has(fromPathId)) return null; // Prevent cycles

    visited.add(fromPathId);

    // Check if the target path has an ascension step from the current path
    const toPath = findUpgradePath(toPathId);
    if (toPath && "ascendSteps" in toPath && toPath.ascendSteps) {
      const directAscendStep = toPath.ascendSteps.find(
        (step) => step.basePath && step.basePath.pathId === fromPathId
      );
      if (directAscendStep) {
        // Check if there's a longer path available (prefer intermediate steps)
        let longestChain: string[] | null = null;

        for (const ascendStep of toPath.ascendSteps) {
          if (
            ascendStep.basePath &&
            ascendStep.basePath.pathId !== fromPathId
          ) {
            const intermediatePathId = ascendStep.basePath.pathId;
            const chain = findAscensionChain(
              fromPathId,
              intermediatePathId,
              new Set(visited)
            );
            if (chain && chain.length > 1) {
              // Only consider chains with intermediate steps
              const fullChain = [...chain, toPathId];
              if (!longestChain || fullChain.length > longestChain.length) {
                longestChain = fullChain;
              }
            }
          }
        }

        // Return the longest chain if found, otherwise return direct path
        return longestChain || [fromPathId, toPathId];
      }
    }

    // Check for indirect ascension through other paths
    // Look at all paths that can ascend to the target path
    if (toPath && "ascendSteps" in toPath && toPath.ascendSteps) {
      let longestChain: string[] | null = null;

      for (const ascendStep of toPath.ascendSteps) {
        if (ascendStep.basePath) {
          const intermediatePathId = ascendStep.basePath.pathId;
          const chain = findAscensionChain(
            fromPathId,
            intermediatePathId,
            new Set(visited)
          );
          if (chain) {
            const fullChain = [...chain, toPathId];
            if (!longestChain || fullChain.length > longestChain.length) {
              longestChain = fullChain;
            }
          }
        }
      }

      return longestChain;
    }

    return null;
  }

  return {
    // State from base tool
    state: baseTool.state,
    result: baseTool.result,
    loading: baseTool.loading,
    error: baseTool.error,

    // Computed properties
    isValid: baseTool.isValid,
    hasChanges: baseTool.hasChanges,
    isDirty: baseTool.isDirty,

    // Actions from base tool
    calculate: baseTool.calculate,
    reset: baseTool.reset,
    setState: baseTool.setState,
    setError: baseTool.setError,
    clearError: baseTool.clearError,
    saveToStorage: baseTool.saveToStorage,
    loadFromStorage: baseTool.loadFromStorage,
    clearStorage: baseTool.clearStorage,
  };
}
