export const vitalityHp: Record<number, number> = {
  1: 400,
  2: 415,
  3: 433,
  4: 451,
  5: 471,
  6: 490,
  7: 511,
  8: 530,
  9: 552,
  10: 572,
  11: 594,
  12: 616,
  13: 638,
  14: 658,
  15: 682,
  16: 698,
  17: 718,
  18: 742,
  19: 766,
  20: 792,
  21: 821,
  22: 849,
  23: 878,
  24: 908,
  25: 938,
  26: 970,
  27: 1001,
  28: 1034,
  29: 1066,
  30: 1100,
  31: 1123,
  32: 1147,
  33: 1170,
  34: 1193,
  35: 1216,
  36: 1239,
  37: 1261,
  38: 1283,
  39: 1304,
  40: 1325,
  41: 1346,
  42: 1366,
  43: 1386,
  44: 1405,
  45: 1424,
  46: 1442,
  47: 1458,
  48: 1474,
  49: 1489,
  50: 1500,
  51: 1508,
  52: 1517,
  53: 1526,
  54: 1535,
  55: 1544,
  56: 1553,
  57: 1562,
  58: 1571,
  59: 1580,
  60: 1588,
  61: 1597,
  62: 1606,
  63: 1615,
  64: 1623,
  65: 1632,
  66: 1641,
  67: 1649,
  68: 1658,
  69: 1666,
  70: 1675,
  71: 1683,
  72: 1692,
  73: 1700,
  74: 1709,
  75: 1717,
  76: 1725,
  77: 1734,
  78: 1742,
  79: 1750,
  80: 1758,
  81: 1767,
  82: 1775,
  83: 1783,
  84: 1791,
  85: 1799,
  86: 1807,
  87: 1814,
  88: 1822,
  89: 1830,
  90: 1837,
  91: 1845,
  92: 1852,
  93: 1860,
  94: 1867,
  95: 1874,
  96: 1881,
  97: 1888,
  98: 1894,
  99: 1900,
};

// Cap the HP value at vitality 99 for levels beyond 99
const capValue = vitalityHp[99];
for (let vit = 100; vit <= 200; vit++) {
  vitalityHp[vit] = capValue;
}

export const vitalityHpGains: Record<number, number> = {
  1: 0, // No gain at level 1
  2: 15,
  3: 18,
  4: 18,
  5: 20,
  6: 19,
  7: 21,
  8: 19,
  9: 22,
  10: 20,
  11: 22,
  12: 22,
  13: 22,
  14: 20,
  15: 24,
  16: 16,
  17: 20,
  18: 24,
  19: 24,
  20: 26,
  21: 29,
  22: 28,
  23: 29,
  24: 30,
  25: 30,
  26: 32,
  27: 31,
  28: 33,
  29: 32,
  30: 34,
  31: 23,
  32: 24,
  33: 23,
  34: 23,
  35: 23,
  36: 23,
  37: 22,
  38: 22,
  39: 21,
  40: 21,
  41: 21,
  42: 20,
  43: 20,
  44: 19,
  45: 19,
  46: 18,
  47: 16,
  48: 16,
  49: 15,
  50: 11,
  51: 8,
  52: 9,
  53: 9,
  54: 9,
  55: 9,
  56: 9,
  57: 9,
  58: 9,
  59: 9,
  60: 8,
  61: 9,
  62: 9,
  63: 9,
  64: 8,
  65: 9,
  66: 9,
  67: 8,
  68: 9,
  69: 8,
  70: 9,
  71: 8,
  72: 9,
  73: 8,
  74: 9,
  75: 8,
  76: 8,
  77: 9,
  78: 8,
  79: 8,
  80: 8,
  81: 9,
  82: 8,
  83: 8,
  84: 8,
  85: 8,
  86: 8,
  87: 7,
  88: 8,
  89: 8,
  90: 7,
  91: 8,
  92: 7,
  93: 8,
  94: 7,
  95: 7,
  96: 7,
  97: 7,
  98: 6,
  99: 6,
};

// Cap the HP gain at 0 for levels beyond 99
for (let vit = 100; vit <= 200; vit++) {
  vitalityHpGains[vit] = 0;
}

/**
 * Get vitality to HP mapping for Dark Souls 1
 * @returns Record of vitality level to HP mapping
 */
export const getVitalityHp = (): Record<number, number> => {
  return vitalityHp;
};

/**
 * Get vitality to HP gain mapping for Dark Souls 1
 * @returns Record of vitality level to HP gain mapping
 */
export const getVitalityHpGains = (): Record<number, number> => {
  return vitalityHpGains;
};

/**
 * Calculate HP for a given vitality level
 * @param vitality - Character vitality level
 * @returns HP value for the given vitality level
 */
export const calculateHp = (vitality: number): number => {
  if (vitality < 1) return 400; // Minimum HP
  if (vitality > 99) return vitalityHp[99]; // Maximum HP
  return vitalityHp[vitality] || 400;
};

/**
 * Calculate HP gain for a given vitality level
 * @param vitality - Character vitality level
 * @returns HP gain for the given vitality level
 */
export const calculateHpGain = (vitality: number): number => {
  if (vitality < 1 || vitality > 99) return 0;
  return vitalityHpGains[vitality] || 0;
};

/**
 * Calculate total HP needed to reach a specific vitality level
 * @param currentVitality - Current vitality level
 * @param targetVitality - Target vitality level
 * @returns HP difference between current and target vitality, or null if invalid
 */
export const calculateHpDifference = (
  currentVitality: number,
  targetVitality: number
): number | null => {
  if (
    currentVitality < 1 ||
    targetVitality < 1 ||
    currentVitality > 99 ||
    targetVitality > 99 ||
    currentVitality >= targetVitality
  ) {
    return null;
  }

  return vitalityHp[targetVitality] - vitalityHp[currentVitality];
};

/**
 * Get the vitality level required to reach a specific HP value
 * @param targetHp - Target HP value
 * @returns Vitality level needed to reach target HP, or null if not achievable
 */
export const getVitalityForHp = (targetHp: number): number | null => {
  if (targetHp < 400) return null;
  if (targetHp >= vitalityHp[99]) return 99;

  for (let vit = 1; vit <= 99; vit++) {
    if (vitalityHp[vit] >= targetHp) {
      return vit;
    }
  }

  return null;
};
