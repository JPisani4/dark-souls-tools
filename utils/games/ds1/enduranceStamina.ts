export const enduranceStamina: Record<number, number> = {
  8: 89,
  9: 90,
  10: 91,
  11: 93,
  12: 95,
  13: 97,
  14: 98,
  15: 100,
  16: 102,
  17: 104,
  18: 106,
  19: 108,
  20: 110,
  21: 112,
  22: 115,
  23: 117,
  24: 119,
  25: 121,
  26: 124,
  27: 126,
  28: 129,
  29: 131,
  30: 133,
  31: 136,
  32: 139,
  33: 141,
  34: 144,
  35: 146,
  36: 149,
  37: 152,
  38: 154,
  39: 157,
  40: 160,
};

// Cap the stamina value at endurance 40 for levels beyond 40
const capValue = enduranceStamina[40];
for (let end = 41; end <= 200; end++) {
  enduranceStamina[end] = capValue;
}

export const enduranceStaminaGains: Record<number, number> = {
  8: 0, // No gain at level 8 (minimum)
  9: 1,
  10: 1,
  11: 2,
  12: 2,
  13: 2,
  14: 1,
  15: 2,
  16: 2,
  17: 2,
  18: 2,
  19: 2,
  20: 2,
  21: 2,
  22: 3,
  23: 2,
  24: 2,
  25: 2,
  26: 3,
  27: 2,
  28: 3,
  29: 2,
  30: 2,
  31: 3,
  32: 3,
  33: 2,
  34: 3,
  35: 2,
  36: 3,
  37: 3,
  38: 2,
  39: 3,
  40: 3,
};

// Cap the stamina gain at 0 for levels beyond 40
for (let end = 41; end <= 200; end++) {
  enduranceStaminaGains[end] = 0;
}

/**
 * Get endurance to stamina mapping for Dark Souls 1
 * @returns Record of endurance level to stamina mapping
 */
export const getEnduranceStamina = (): Record<number, number> => {
  return enduranceStamina;
};

/**
 * Get endurance to stamina gain mapping for Dark Souls 1
 * @returns Record of endurance level to stamina gain mapping
 */
export const getEnduranceStaminaGains = (): Record<number, number> => {
  return enduranceStaminaGains;
};

/**
 * Calculate stamina for a given endurance level
 * @param endurance - Character endurance level
 * @returns Stamina value for the given endurance level
 */
export const calculateStamina = (endurance: number): number => {
  if (endurance < 8) return 89; // Minimum stamina
  if (endurance > 40) return enduranceStamina[40]; // Maximum stamina
  return enduranceStamina[endurance] || 89;
};

/**
 * Calculate stamina gain for a given endurance level
 * @param endurance - Character endurance level
 * @returns Stamina gain for the given endurance level
 */
export const calculateStaminaGain = (endurance: number): number => {
  if (endurance < 8 || endurance > 40) return 0;
  return enduranceStaminaGains[endurance] || 0;
};

/**
 * Calculate total stamina needed to reach a specific endurance level
 * @param currentEndurance - Current endurance level
 * @param targetEndurance - Target endurance level
 * @returns Stamina difference between current and target endurance, or null if invalid
 */
export const calculateStaminaDifference = (
  currentEndurance: number,
  targetEndurance: number
): number | null => {
  if (
    currentEndurance < 8 ||
    targetEndurance < 8 ||
    currentEndurance > 40 ||
    targetEndurance > 40 ||
    currentEndurance >= targetEndurance
  ) {
    return null;
  }

  return enduranceStamina[targetEndurance] - enduranceStamina[currentEndurance];
};

/**
 * Get the endurance level required to reach a specific stamina value
 * @param targetStamina - Target stamina value
 * @returns Endurance level needed to reach target stamina, or null if not achievable
 */
export const getEnduranceForStamina = (
  targetStamina: number
): number | null => {
  if (targetStamina < 89) return null;
  if (targetStamina >= enduranceStamina[40]) return 40;

  for (let end = 8; end <= 40; end++) {
    if (enduranceStamina[end] >= targetStamina) {
      return end;
    }
  }

  return null;
};
