/**
 * Application constants for better maintainability
 */

// Soul Level Calculator Constants
export const SOUL_LEVEL_MIN = 2;
export const SOUL_LEVEL_MAX = 713;
export const SOUL_LEVEL_PAGE_SIZE = 10;
export const SOUL_LEVEL_MOBILE_PAGE_SIZE = 10;
export const SOUL_LEVEL_TABLET_PAGE_SIZE = 10;
export const SOUL_LEVEL_ULTRA_MOBILE_PAGE_SIZE = 10;

// Starting Class Optimizer Constants
export const STARTING_LEVEL_MIN = 6;
export const STARTING_LEVEL_MAX = 99;
export const STAT_MIN_VALUE = 1;
export const STAT_MAX_VALUE = 99;
export const MAX_WEAPONS = 2;
export const MAX_SHIELDS = 2;
export const MAX_SORCERIES = 10;
export const MAX_MIRACLES = 10;
export const TWO_HANDED_STRENGTH_MULTIPLIER = 1.5;
export const MAX_ATTUNEMENT_SLOTS = 10;

// Default character stats (Deprived class minimum)
export const DEFAULT_CHARACTER_STATS = {
  level: STARTING_LEVEL_MIN,
  vitality: STAT_MIN_VALUE,
  attunement: STAT_MIN_VALUE,
  endurance: STAT_MIN_VALUE,
  strength: STAT_MIN_VALUE,
  dexterity: STAT_MIN_VALUE,
  resistance: STAT_MIN_VALUE,
  intelligence: STAT_MIN_VALUE,
  faith: STAT_MIN_VALUE,
} as const;

// Validation error messages
export const VALIDATION_MESSAGES = {
  MIN_REQUIREMENT: (stat: string, value: number) =>
    `Minimum ${stat} required: ${value}`,
  INVALID_LEVEL: (min: number, max: number) =>
    `Level must be between ${min} and ${max}`,
  INVALID_STAT: (min: number, max: number) =>
    `Stat must be between ${min} and ${max}`,
  INSUFFICIENT_ATTUNEMENT: (current: number, required: number) =>
    `Insufficient attunement slots: ${current} available, ${required} needed`,
  INVALID_LEVEL_RANGE: (current: number, desired: number) =>
    `Desired level (${desired}) must be higher than current level (${current})`,
  INVALID_WEAPON_REQUIREMENTS: (
    weapon: string,
    stat: string,
    required: number
  ) => `Weapon "${weapon}" requires ${stat} ${required}`,
  INVALID_SHIELD_REQUIREMENTS: (
    shield: string,
    stat: string,
    required: number
  ) => `Shield "${shield}" requires ${stat} ${required}`,
  INVALID_SPELL_REQUIREMENTS: (spell: string, stat: string, required: number) =>
    `Spell "${spell}" requires ${stat} ${required}`,
} as const;

// Theme constants
export const ICONS = {
  CURRENT_LEVEL: "M3 6h18M3 12h18",
  DESIRED_LEVEL: "M3 21h18M3 16h18M9 10l3-3m0 0l3 3m-3-3v8",
  ARROW_TRENDING_UP: "M3 17l6-6 4 4 8-8m0 0v5m0-5h-5",
  CALCULATOR: "i-heroicons-calculator",
  TABLE: "M3 6h18M3 10h18M3 14h18M3 18h18",
  SOULS:
    "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
  LEVEL: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  FIRE: "M12 2C7 10 12 22 12 22s5-12 0-20z",
  BOOK_OPEN:
    "M2.25 6.75C2.25 5.507 3.257 4.5 4.5 4.5c2.485 0 4.5 1.007 4.5 2.25v10.5c0 1.243-2.015 2.25-4.5 2.25-1.243 0-2.25-1.007-2.25-2.25V6.75zm0 0C2.25 5.507 3.257 4.5 4.5 4.5c2.485 0 4.5 1.007 4.5 2.25v10.5c0 1.243-2.015 2.25-4.5 2.25-1.243 0-2.25-1.007-2.25-2.25V6.75zm13.5 0c0-1.243 1.007-2.25 2.25-2.25 2.485 0 4.5 1.007 4.5 2.25v10.5c0 1.243-2.015 2.25-4.5 2.25-1.243 0-2.25-1.007-2.25-2.25V6.75zm0 0c0-1.243 1.007-2.25 2.25-2.25 2.485 0 4.5 1.007 4.5 2.25v10.5c0 1.243-2.015 2.25-4.5 2.25-1.243 0-2.25-1.007-2.25-2.25V6.75z",
  WEAPON: "i-heroicons-wrench-screwdriver",
  CHARACTER: "i-heroicons-user-group",
  STAR: "i-heroicons-star",
  ARROW_UP: "i-heroicons-arrow-up",
  CHECK: "i-heroicons-check",
  TRASH: "i-heroicons-trash",
  RESET: "i-heroicons-arrow-path",
  EXCLAMATION: "i-heroicons-exclamation-triangle",
  LIGHT_BULB: "i-heroicons-light-bulb",
  PLUS: "i-heroicons-plus",
  MINUS: "i-heroicons-minus",
  MAGNIFYING_GLASS: "i-heroicons-magnifying-glass",
  HAND_RAISED: "i-heroicons-hand-raised",
  SHIELD_CHECK: "i-heroicons-shield-check",
  SWORD: "i-heroicons-sparkles",
  BOOK: "i-heroicons-book-open",
  HEART: "i-heroicons-heart",
  BRAIN: "i-heroicons-cpu-chip",
  FLEX: "i-heroicons-fire",
  EYE: "i-heroicons-eye",
  HAND: "i-heroicons-hand-thumb-up",
} as const;

// Auto-save keys for tools
export const AUTO_SAVE_KEYS = {
  SOUL_LEVEL_CALCULATOR: "soul-level-calculator-state",
  WEAPON_UPGRADE_CALCULATOR: "weapon-upgrade-calculator-state",
  STARTING_CLASS_OPTIMIZER: "starting-class-optimizer-state",
} as const;

// Debounce delays
export const DEBOUNCE_DELAYS = {
  AUTO_SAVE: 1000,
  SEARCH: 300,
  RESIZE: 200,
} as const;

// Performance monitoring constants
export const PERFORMANCE_THRESHOLDS = {
  CALCULATION_TIMEOUT: 5000, // 5 seconds
  RENDER_TIMEOUT: 1000, // 1 second
  MEMORY_WARNING: 50 * 1024 * 1024, // 50MB
} as const;

// Error boundary constants
export const ERROR_BOUNDARY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  FALLBACK_MESSAGE: "Something went wrong. Please try refreshing the page.",
} as const;

// Re-export getRandomTheme from the theme system
export { getRandomTheme } from "~/utils/themes/colorSystem";
