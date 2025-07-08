import {
  getStatRating,
  getMagicStatRating,
  getHumanityScaling,
  getRegularUpgradeMultipliers,
  getCrystalUpgradeMultipliers,
  getLightningUpgradeMultipliers,
  getRawUpgradeMultipliers,
  getMagicUpgradeMultipliers,
  getEnchantedUpgradeMultipliers,
  getDivineUpgradeMultipliers,
  getOccultUpgradeMultipliers,
  getFireUpgradeMultipliers,
  getChaosUpgradeMultipliers,
  getSpecialUpgradeMultipliers,
  getBossUpgradeMultipliers,
  getDragonUpgradeMultipliers,
  getScalingLetterFromValue,
} from "~/utils/games/ds1/arTables";
import { getMagicAdjustment } from "~/utils/games/ds1/magAdj";
import type { Weapon } from "~/types/game/ds1/weapons";

export interface WeaponRating {
  totalAttackRating: number;
  physical: number;
  magic: number;
  fire: number;
  lightning: number;
  basePhysical: number;
  baseMagic: number;
  baseFire: number;
  baseLightning: number;
  magicAdjustment: number | null;
  meetsRequirements: boolean;
  hasUpgradePath: boolean;
  scalingInfo: {
    scalingPercentages: {
      strength: number;
      dexterity: number;
      intelligence: number;
      faith: number;
    };
    scalingLetters: {
      strength: string;
      dexterity: string;
      intelligence: string;
      faith: string;
    };
  };
}

export interface CharacterStats {
  strength: number;
  dexterity: number;
  intelligence: number;
  faith: number;
  humanity: number;
  weaponLevel: number;
  isTwoHanded: boolean;
}

// Get upgrade multiplier function based on path
export const getUpgradeMultipliers = (
  upgradePath: string,
  level: number,
  weapon?: Weapon
) => {
  const levelNum = Math.max(0, Math.min(15, level));

  switch (upgradePath) {
    case "regular":
      return getRegularUpgradeMultipliers(levelNum);
    case "crystal":
      return getCrystalUpgradeMultipliers(levelNum);
    case "lightning":
      return getLightningUpgradeMultipliers(levelNum);
    case "raw":
      return getRawUpgradeMultipliers(levelNum);
    case "magic":
      return getMagicUpgradeMultipliers(levelNum);
    case "enchanted":
      return getEnchantedUpgradeMultipliers(levelNum, weapon?.name);
    case "divine":
      return getDivineUpgradeMultipliers(levelNum);
    case "occult":
      return getOccultUpgradeMultipliers(levelNum);
    case "fire":
      return getFireUpgradeMultipliers(levelNum);
    case "chaos":
      return getChaosUpgradeMultipliers(levelNum);
    case "special":
      return getSpecialUpgradeMultipliers(levelNum);
    case "boss":
      return getBossUpgradeMultipliers(levelNum);
    case "dragon":
      return getDragonUpgradeMultipliers(levelNum);
    default:
      return getRegularUpgradeMultipliers(levelNum);
  }
};

// Get maximum level for upgrade path
export const getMaxLevelForUpgradePath = (upgradePath: string): number => {
  switch (upgradePath) {
    case "regular":
      return 15;
    case "crystal":
      return 5;
    case "lightning":
      return 5;
    case "raw":
      return 5;
    case "magic":
      return 10;
    case "enchanted":
      return 5;
    case "divine":
      return 10;
    case "occult":
      return 5;
    case "fire":
      return 10;
    case "chaos":
      return 5;
    case "special":
      return 5;
    case "boss":
      return 5;
    case "dragon":
      return 5;
    default:
      return 15;
  }
};

// Calculate weapon scaling using weapon's scaling object
export const calculateWeaponScaling = (
  weapon: Weapon,
  stats: CharacterStats,
  selectedUpgradePath?: string
) => {
  const effectiveStrength = stats.isTwoHanded
    ? stats.strength * 1.5
    : stats.strength;

  let physicalScaling = 0;
  let magicScaling = 0;
  let fireScaling = 0;
  let lightningScaling = 0;

  // Determine which upgrade path to use
  let upgradePath = "regular";
  if (selectedUpgradePath && selectedUpgradePath !== "all") {
    // Use the selected upgrade path if it's available for this weapon
    if (
      weapon.upgradePath &&
      weapon.upgradePath.includes(selectedUpgradePath)
    ) {
      upgradePath = selectedUpgradePath;
    }
  } else if (weapon.upgradePath) {
    // Use the first available upgrade path
    upgradePath = weapon.upgradePath.split(",")[0].trim();
  }

  // Get upgrade multipliers for the selected path
  const upgradeMultipliers = getUpgradeMultipliers(
    upgradePath,
    stats.weaponLevel,
    weapon
  );

  // Use weapon's scaling object if available
  if (weapon.scaling) {
    // Get the scaling values for the selected upgrade path
    const pathScaling = weapon.scaling[upgradePath];

    if (pathScaling) {
      // Get base damage values for the selected upgrade path
      let baseDamage = weapon.damage;
      if (weapon.damageByPath && weapon.damageByPath[upgradePath]) {
        baseDamage = weapon.damageByPath[upgradePath];
      }

      // Ensure baseDamage is defined
      if (!baseDamage) {
        baseDamage = { physical: 0, magic: 0, fire: 0, lightning: 0 };
      }

      // Calculate scaling based on weapon's scaling object
      if (pathScaling.strength && pathScaling.strength > 0) {
        const strengthRating = getStatRating(effectiveStrength);
        // Use upgraded base damage for scaling calculation
        const upgradedBasePhysical =
          baseDamage.physical * upgradeMultipliers.phys;
        physicalScaling =
          upgradedBasePhysical * strengthRating * pathScaling.strength;
      }

      if (pathScaling.dexterity && pathScaling.dexterity > 0) {
        const dexterityRating = getStatRating(stats.dexterity);
        const upgradedBasePhysical =
          baseDamage.physical * upgradeMultipliers.phys;
        physicalScaling +=
          upgradedBasePhysical * dexterityRating * pathScaling.dexterity;
      }

      if (pathScaling.intelligence && pathScaling.intelligence > 0) {
        const intelligenceRating = getMagicStatRating(stats.intelligence);
        const upgradedBaseMagic = baseDamage.magic * upgradeMultipliers.mag;
        magicScaling =
          upgradedBaseMagic * intelligenceRating * pathScaling.intelligence;
      }

      if (pathScaling.faith && pathScaling.faith > 0) {
        const faithRating = getMagicStatRating(stats.faith);
        const upgradedBaseMagic = baseDamage.magic * upgradeMultipliers.mag;
        magicScaling += upgradedBaseMagic * faithRating * pathScaling.faith;
      }
    }
  }

  return {
    physicalScaling,
    magicScaling,
    fireScaling,
    lightningScaling,
  };
};

// Calculate weapon scaling info for display
export const calculateWeaponScalingInfo = (
  weapon: Weapon,
  stats: CharacterStats,
  selectedUpgradePath?: string
) => {
  let scalingPercentages = {
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    faith: 0,
  };

  let scalingLetters = {
    strength: "-",
    dexterity: "-",
    intelligence: "-",
    faith: "-",
  };

  // Determine which upgrade path to use
  let upgradePath = "regular";
  if (selectedUpgradePath && selectedUpgradePath !== "all") {
    if (
      weapon.upgradePath &&
      weapon.upgradePath.includes(selectedUpgradePath)
    ) {
      upgradePath = selectedUpgradePath;
    }
  } else if (weapon.upgradePath) {
    upgradePath = weapon.upgradePath.split(",")[0].trim();
  }

  // Get upgrade multipliers for the selected path
  const upgradeMultipliers = getUpgradeMultipliers(
    upgradePath,
    stats.weaponLevel,
    weapon
  );

  // Use weapon's scaling object if available
  if (weapon.scaling) {
    const pathScaling = weapon.scaling[upgradePath];

    if (pathScaling) {
      // Apply upgrade multipliers to scaling values and display as percentages
      if (pathScaling.strength && pathScaling.strength > 0) {
        const scaledStrength = pathScaling.strength * upgradeMultipliers.str;
        scalingPercentages.strength = scaledStrength * 100;
        scalingLetters.strength = getScalingLetterFromValue(scaledStrength);
      }

      if (pathScaling.dexterity && pathScaling.dexterity > 0) {
        const scaledDexterity = pathScaling.dexterity * upgradeMultipliers.dex;
        scalingPercentages.dexterity = scaledDexterity * 100;
        scalingLetters.dexterity = getScalingLetterFromValue(scaledDexterity);
      }

      if (pathScaling.intelligence && pathScaling.intelligence > 0) {
        const scaledIntelligence =
          pathScaling.intelligence * upgradeMultipliers.int;
        scalingPercentages.intelligence = scaledIntelligence * 100;
        scalingLetters.intelligence =
          getScalingLetterFromValue(scaledIntelligence);
      }

      if (pathScaling.faith && pathScaling.faith > 0) {
        const scaledFaith = pathScaling.faith * upgradeMultipliers.fth;
        scalingPercentages.faith = scaledFaith * 100;
        scalingLetters.faith = getScalingLetterFromValue(scaledFaith);
      }
    }
  }

  return {
    scalingPercentages,
    scalingLetters,
  };
};

// Get effective requirements for a weapon
export const getEffectiveRequirements = (
  weapon: Weapon,
  isTwoHanded: boolean
) => {
  const requirements = weapon.requirements;
  const effectiveStrength = isTwoHanded
    ? Math.ceil(requirements.strength / 1.5)
    : requirements.strength;

  return {
    strength: effectiveStrength,
    dexterity: requirements.dexterity,
    intelligence: requirements.intelligence,
    faith: requirements.faith,
  };
};

// Get humanity scaling bonus
export const getHumanityScalingBonus = (weapon: any, humanity: number) => {
  if (!weapon.humanityScaling) return 0;

  const humanityScaling = getHumanityScaling(humanity);
  return weapon.humanityScaling * humanityScaling.phys;
};

// Main calculation function
export const calculateWeaponAttackRating = (
  weapon: Weapon,
  stats: CharacterStats,
  selectedUpgradePath?: string
): WeaponRating => {
  const effectiveStrength = stats.isTwoHanded
    ? stats.strength * 1.5
    : stats.strength;

  // Determine which upgrade path to use
  let upgradePath = "regular";
  if (selectedUpgradePath && selectedUpgradePath !== "all") {
    if (
      weapon.upgradePath &&
      weapon.upgradePath.includes(selectedUpgradePath)
    ) {
      upgradePath = selectedUpgradePath;
    }
  } else if (weapon.upgradePath) {
    upgradePath = weapon.upgradePath.split(",")[0].trim();
  }

  // Get upgrade multipliers for the selected path
  const upgradeMultipliers = getUpgradeMultipliers(
    upgradePath,
    stats.weaponLevel,
    weapon
  );

  // Get base damage values for the selected upgrade path
  let baseDamage = weapon.damage;
  if (weapon.damageByPath && weapon.damageByPath[upgradePath]) {
    baseDamage = weapon.damageByPath[upgradePath];
  }

  // Ensure baseDamage is defined
  if (!baseDamage) {
    baseDamage = { physical: 0, magic: 0, fire: 0, lightning: 0 };
  }

  // Calculate base damage with upgrades
  const basePhysical = baseDamage.physical * upgradeMultipliers.phys;
  const baseMagic = baseDamage.magic * upgradeMultipliers.mag;
  const baseFire = baseDamage.fire * upgradeMultipliers.fire;
  const baseLightning = baseDamage.lightning * upgradeMultipliers.lght;

  // Calculate scaling
  const scaling = calculateWeaponScaling(weapon, stats, selectedUpgradePath);

  // Calculate final damage values
  const physical = basePhysical + scaling.physicalScaling;
  const magic = baseMagic + scaling.magicScaling;
  const fire = baseFire + scaling.fireScaling;
  const lightning = baseLightning + scaling.lightningScaling;

  // Calculate total attack rating
  const totalAttackRating = physical + magic + fire + lightning;

  // Get magic adjustment
  const magicAdjustment = getMagicAdjustment(
    weapon.name,
    stats.intelligence,
    false
  );

  // Check if character meets requirements
  const requirements = getEffectiveRequirements(weapon, stats.isTwoHanded);
  const meetsRequirements =
    effectiveStrength >= requirements.strength &&
    stats.dexterity >= requirements.dexterity &&
    stats.intelligence >= requirements.intelligence &&
    stats.faith >= requirements.faith;

  // Calculate scaling info for display
  const scalingInfo = calculateWeaponScalingInfo(
    weapon,
    stats,
    selectedUpgradePath
  );

  return {
    totalAttackRating,
    physical,
    magic,
    fire,
    lightning,
    basePhysical,
    baseMagic,
    baseFire,
    baseLightning,
    magicAdjustment,
    meetsRequirements,
    hasUpgradePath: !!weapon.upgradePath,
    scalingInfo,
  };
};
