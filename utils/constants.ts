/**
 * Application constants for better maintainability
 */

// Soul Level Calculator Constants
export const SOUL_LEVEL_MIN = 1;
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
export const MAX_ARMOR_PIECES = 4; // head, chest, hands, legs
export const MAX_RINGS = 2;
export const TWO_HANDED_STRENGTH_MULTIPLIER = 1.5;
export const MAX_ATTUNEMENT_SLOTS = 10;

// Derived Stats Constants
export const BASE_HP = 300;
export const BASE_STAMINA = 80;
export const BASE_EQUIP_LOAD = 50;
export const HP_PER_VITALITY = 30;
export const STAMINA_PER_ENDURANCE = 2;
export const EQUIP_LOAD_PER_ENDURANCE = 1;
export const EQUIP_LOAD_START_LEVEL = 10;

// Dodge Roll Thresholds
export const FAST_ROLL_THRESHOLD = 25; // 25% equip load
export const MID_ROLL_THRESHOLD = 50; // 50% equip load
export const FAT_ROLL_THRESHOLD = 100; // 100% equip load

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
  // Derived stats will be calculated
  hp: BASE_HP,
  stamina: BASE_STAMINA,
  equipLoad: BASE_EQUIP_LOAD,
  // New derived stats
  maxHp: BASE_HP,
  maxStamina: BASE_STAMINA,
  staminaRegen: 45, // Base stamina regeneration
  dodgeRoll: "Fast Roll (0%)",
  equippedWeight: 0,
  equipLoadPercentage: 0,
} as const;

// Validation error messages
export const VALIDATION_MESSAGES = {
  // Existing function-based messages
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
  INVALID_ARMOR_REQUIREMENTS: (armor: string, stat: string, required: number) =>
    `Armor "${armor}" requires ${stat} ${required}`,
  INVALID_RING_REQUIREMENTS: (ring: string, stat: string, required: number) =>
    `Ring "${ring}" requires ${stat} ${required}`,
  OVERWEIGHT: (current: number, max: number) =>
    `Equip load exceeded: ${current}/${max} (${Math.round((current / max) * 100)}%)`,

  // New string-based messages
  required: "This field is required",
  invalid: "Invalid value",
  tooShort: "Value is too short",
  tooLong: "Value is too long",
  outOfRange: "Value is out of range",

  // Level validation
  levelTooLow: "Level must be at least {min}",
  levelTooHigh: "Level must be at most {max}",
  levelInvalid: "Level must be a valid number",

  // Soul validation
  soulsTooLow: "Souls must be at least {min}",
  soulsTooHigh: "Souls must be at most {max}",
  soulsInvalid: "Souls must be a valid number",

  // Stat validation
  statTooLow: "{stat} must be at least {min}",
  statTooHigh: "{stat} must be at most {max}",
  statInvalid: "{stat} must be a valid number",

  // Equipment validation
  weightTooHigh: "Total weight exceeds equip load capacity",
  equipLoadExceeded: "Equip load exceeded",
  requirementsNotMet: "Requirements not met",

  // Armor validation
  armorSlotOccupied: "Armor slot already occupied",
  armorNotFound: "Armor not found",
  armorInvalid: "Invalid armor selection",

  // Ring validation
  ringSlotOccupied: "Ring slot already occupied",
  ringNotFound: "Ring not found",
  ringInvalid: "Invalid ring selection",
  tooManyRings: "Maximum 2 rings can be equipped",

  // Shield validation
  shieldNotFound: "Shield not found",
  shieldInvalid: "Invalid shield selection",
  shieldRequirementsNotMet: "Shield requirements not met",

  // Weapon validation
  weaponNotFound: "Weapon not found",
  weaponInvalid: "Invalid weapon selection",
  weaponRequirementsNotMet: "Weapon requirements not met",

  // Magic validation
  spellNotFound: "Spell not found",
  spellInvalid: "Invalid spell selection",
  spellRequirementsNotMet: "Spell requirements not met",
  insufficientAttunementSlots: "Insufficient attunement slots",

  // Character validation
  characterNotFound: "Character not found",
  characterInvalid: "Invalid character selection",
  startingClassNotFound: "Starting class not found",

  // Dodge roll validation
  equipLoadTooHigh: "Equip load too high for desired roll type",
  enduranceTooLow: "Endurance too low for desired roll type",

  // Stamina validation
  staminaTooLow: "Stamina too low",
  staminaRegenTooLow: "Stamina regeneration too low",

  // HP validation
  hpTooLow: "HP too low",

  // Search validation
  searchTooShort: "Search query must be at least 2 characters",
  searchTooLong: "Search query must be at most 50 characters",
  noResults: "No results found",

  // Form validation
  formIncomplete: "Please complete all required fields",
  formInvalid: "Form contains invalid data",
  calculationFailed: "Calculation failed",

  // Network validation
  networkError: "Network error occurred",
  serverError: "Server error occurred",
  timeoutError: "Request timed out",

  // File validation
  fileTooLarge: "File is too large",
  fileTypeInvalid: "Invalid file type",
  fileNotFound: "File not found",

  // User validation
  userNotAuthenticated: "User not authenticated",
  userNotAuthorized: "User not authorized",
  sessionExpired: "Session expired",
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
  ARMOR: "i-heroicons-shield-check",
  RING: "i-heroicons-circle-stack",
  WEIGHT: "i-heroicons-scale",
  STAMINA: "i-heroicons-bolt",
  HP: "i-heroicons-heart",
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

// Game categories and display names
export const GAME_CATEGORIES = {
  ds1: "Dark Souls Remastered",
  ds2: "Dark Souls II",
  ds3: "Dark Souls III",
  bb: "Bloodborne",
  er: "Elden Ring",
} as const;

// Tool categories
export const TOOL_CATEGORIES = {
  calculator: "Calculator",
  database: "Database",
  planner: "Planner",
  analyzer: "Analyzer",
  generator: "Generator",
  utility: "Utility",
  reference: "Reference",
  custom: "Custom",
} as const;

// Icons for different item types
export const ITEM_ICONS = {
  // Weapons
  weapon: "i-heroicons-sword",
  sword: "i-heroicons-sword",
  axe: "i-heroicons-wrench-screwdriver",
  hammer: "i-heroicons-wrench-screwdriver",
  spear: "i-heroicons-arrow-up",
  bow: "i-heroicons-arrow-up",
  catalyst: "i-heroicons-sparkles",
  talisman: "i-heroicons-heart",

  // Armor
  armor: "i-heroicons-shield-check",
  head: "i-heroicons-user",
  chest: "i-heroicons-user",
  hands: "i-heroicons-hand-raised",
  legs: "i-heroicons-arrow-down",

  // Rings
  ring: "i-heroicons-circle-stack",

  // Shields
  shield: "i-heroicons-shield-check",

  // Magic
  sorcery: "i-heroicons-sparkles",
  miracle: "i-heroicons-heart",
  pyromancy: "i-heroicons-fire",

  // Stats
  level: "i-heroicons-academic-cap",
  souls: "i-heroicons-currency-dollar",
  vitality: "i-heroicons-heart",
  attunement: "i-heroicons-sparkles",
  endurance: "i-heroicons-bolt",
  strength: "i-heroicons-muscle",
  dexterity: "i-heroicons-arrow-up",
  resistance: "i-heroicons-shield-check",
  intelligence: "i-heroicons-academic-cap",
  faith: "i-heroicons-heart",

  // Equipment stats
  weight: "i-heroicons-scale",
  stamina: "i-heroicons-bolt",
  hp: "i-heroicons-heart",
  equipLoad: "i-heroicons-scale",
  staminaRegen: "i-heroicons-bolt",

  // Defense types
  physical: "i-heroicons-shield-check",
  magic: "i-heroicons-sparkles",
  fire: "i-heroicons-fire",
  lightning: "i-heroicons-bolt",
  bleed: "i-heroicons-droplet",
  poison: "i-heroicons-exclamation-triangle",
  curse: "i-heroicons-exclamation-triangle",

  // Upgrade materials
  titanite: "i-heroicons-cube",
  ember: "i-heroicons-fire",
  soul: "i-heroicons-currency-dollar",

  // Merchants
  merchant: "i-heroicons-user",

  // General
  search: "i-heroicons-magnifying-glass",
  filter: "i-heroicons-funnel",
  sort: "i-heroicons-arrow-up-down",
  reset: "i-heroicons-arrow-path",
  calculate: "i-heroicons-calculator",
  info: "i-heroicons-information-circle",
  warning: "i-heroicons-exclamation-triangle",
  error: "i-heroicons-x-circle",
  success: "i-heroicons-check-circle",
} as const;

// Limits and constraints
export const LIMITS = {
  // Character stats
  MAX_LEVEL: 99,
  MIN_LEVEL: 1,
  MAX_VITALITY: 99,
  MIN_VITALITY: 1,
  MAX_ATTUNEMENT: 99,
  MIN_ATTUNEMENT: 1,
  MAX_ENDURANCE: 99,
  MIN_ENDURANCE: 1,
  MAX_STRENGTH: 99,
  MIN_STRENGTH: 1,
  MAX_DEXTERITY: 99,
  MIN_DEXTERITY: 1,
  MAX_RESISTANCE: 99,
  MIN_RESISTANCE: 1,
  MAX_INTELLIGENCE: 99,
  MIN_INTELLIGENCE: 1,
  MAX_FAITH: 99,
  MIN_FAITH: 1,

  // Equipment
  MAX_WEAPONS: 10,
  MAX_SHIELDS: 5,
  MAX_ARMOR_SLOTS: 4, // head, chest, hands, legs
  MAX_RINGS: 2,
  MAX_SORCERIES: 10,
  MAX_MIRACLES: 10,

  // Search and display
  MAX_SEARCH_LENGTH: 50,
  MIN_SEARCH_LENGTH: 2,
  MAX_RESULTS_PER_PAGE: 20,
  MAX_PAGES: 100,

  // File uploads
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: [".png", ".jpg", ".jpeg", ".gif", ".webp"],

  // Network
  REQUEST_TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,

  // Cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  MAX_CACHE_SIZE: 100,

  // Performance
  DEBOUNCE_DELAY: 300, // 300ms
  THROTTLE_DELAY: 100, // 100ms
  ANIMATION_DURATION: 300, // 300ms

  // UI
  MAX_TOOLTIP_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_TITLE_LENGTH: 100,

  // Game specific
  MAX_SOULS: 999999999,
  MIN_SOULS: 0,
  MAX_WEIGHT: 999.9,
  MIN_WEIGHT: 0,
  MAX_DEFENSE: 999,
  MIN_DEFENSE: 0,
  MAX_POISE: 999,
  MIN_POISE: 0,
  MAX_STABILITY: 100,
  MIN_STABILITY: 0,
  MAX_STAMINA_REGEN: 100,
  MIN_STAMINA_REGEN: 0,
} as const;

// Default values
export const DEFAULTS = {
  // Character stats
  STARTING_LEVEL: 1,
  STARTING_VITALITY: 10,
  STARTING_ATTUNEMENT: 10,
  STARTING_ENDURANCE: 10,
  STARTING_STRENGTH: 10,
  STARTING_DEXTERITY: 10,
  STARTING_RESISTANCE: 10,
  STARTING_INTELLIGENCE: 10,
  STARTING_FAITH: 10,

  // Equipment
  DEFAULT_WEAPON: "None",
  DEFAULT_SHIELD: "None",
  DEFAULT_ARMOR: "None",
  DEFAULT_RING: "None",

  // Search
  DEFAULT_SEARCH: "",
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,

  // UI
  DEFAULT_THEME: "blue",
  DEFAULT_LANGUAGE: "en",
  DEFAULT_TIMEZONE: "UTC",

  // Game specific
  BASE_HP: 300,
  BASE_STAMINA: 80,
  BASE_EQUIP_LOAD: 50,
  BASE_STAMINA_REGEN: 45,
} as const;

// Error codes
export const ERROR_CODES = {
  // Network errors
  NETWORK_ERROR: "NETWORK_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",

  // Validation errors
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_INPUT: "INVALID_INPUT",
  MISSING_REQUIRED: "MISSING_REQUIRED",
  OUT_OF_RANGE: "OUT_OF_RANGE",

  // Game errors
  GAME_NOT_FOUND: "GAME_NOT_FOUND",
  TOOL_NOT_FOUND: "TOOL_NOT_FOUND",
  ITEM_NOT_FOUND: "ITEM_NOT_FOUND",
  CALCULATION_FAILED: "CALCULATION_FAILED",

  // User errors
  USER_NOT_AUTHENTICATED: "USER_NOT_AUTHENTICATED",
  USER_NOT_AUTHORIZED: "USER_NOT_AUTHORIZED",
  SESSION_EXPIRED: "SESSION_EXPIRED",

  // System errors
  SYSTEM_ERROR: "SYSTEM_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  CACHE_ERROR: "CACHE_ERROR",
  STORAGE_ERROR: "STORAGE_ERROR",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  // General
  SAVED: "Successfully saved",
  UPDATED: "Successfully updated",
  DELETED: "Successfully deleted",
  CREATED: "Successfully created",
  CALCULATED: "Calculation completed",

  // Equipment
  EQUIPMENT_EQUIPPED: "Equipment equipped",
  EQUIPMENT_UNEQUIPPED: "Equipment unequipped",
  EQUIPMENT_UPDATED: "Equipment updated",

  // Character
  CHARACTER_CREATED: "Character created",
  CHARACTER_UPDATED: "Character updated",
  CHARACTER_DELETED: "Character deleted",

  // Settings
  SETTINGS_SAVED: "Settings saved",
  SETTINGS_RESET: "Settings reset",

  // Search
  SEARCH_COMPLETED: "Search completed",
  FILTERS_APPLIED: "Filters applied",
  FILTERS_CLEARED: "Filters cleared",

  // Import/Export
  DATA_IMPORTED: "Data imported",
  DATA_EXPORTED: "Data exported",

  // Cache
  CACHE_CLEARED: "Cache cleared",
  CACHE_UPDATED: "Cache updated",
} as const;

// Warning messages
export const WARNING_MESSAGES = {
  // Equipment
  EQUIP_LOAD_HIGH: "Equip load is high",
  EQUIP_LOAD_CRITICAL: "Equip load is critical",
  WEIGHT_HIGH: "Total weight is high",

  // Stats
  STAT_LOW: "{stat} is low",
  STAT_HIGH: "{stat} is high",
  STAT_INEFFICIENT: "{stat} investment may be inefficient",

  // Performance
  PERFORMANCE_IMPACT: "This may impact performance",
  MEMORY_USAGE_HIGH: "Memory usage is high",

  // Data
  DATA_OUTDATED: "Data may be outdated",
  CACHE_STALE: "Cache is stale",

  // Network
  SLOW_CONNECTION: "Slow connection detected",
  UNSTABLE_CONNECTION: "Unstable connection detected",

  // Security
  INSECURE_CONNECTION: "Insecure connection",
  WEAK_PASSWORD: "Weak password",

  // General
  UNSAVED_CHANGES: "You have unsaved changes",
  CONFIRM_ACTION: "Are you sure you want to continue?",
  EXPERIMENTAL_FEATURE: "This is an experimental feature",
} as const;

// Info messages
export const INFO_MESSAGES = {
  // General
  LOADING: "Loading...",
  PROCESSING: "Processing...",
  CALCULATING: "Calculating...",
  SEARCHING: "Searching...",

  // Equipment
  EQUIPMENT_INFO: "Equipment information",
  STATS_INFO: "Statistics information",
  REQUIREMENTS_INFO: "Requirements information",

  // Character
  CHARACTER_INFO: "Character information",
  STARTING_CLASS_INFO: "Starting class information",

  // Game
  GAME_INFO: "Game information",
  TOOL_INFO: "Tool information",

  // Help
  HELP_AVAILABLE: "Help is available",
  TUTORIAL_AVAILABLE: "Tutorial is available",
  GUIDE_AVAILABLE: "Guide is available",

  // Updates
  UPDATE_AVAILABLE: "Update available",
  NEW_FEATURES: "New features available",
  BUG_FIXES: "Bug fixes applied",

  // Tips
  TIP_OF_THE_DAY: "Tip of the day",
  PRO_TIP: "Pro tip",
  HINT: "Hint",
} as const;

// Export all constants
export default {
  GAME_CATEGORIES,
  TOOL_CATEGORIES,
  ITEM_ICONS,
  VALIDATION_MESSAGES,
  LIMITS,
  DEFAULTS,
  ERROR_CODES,
  SUCCESS_MESSAGES,
  WARNING_MESSAGES,
  INFO_MESSAGES,
};
