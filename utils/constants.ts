/**
 * Application constants for better maintainability
 */

// Cache durations
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// UI constants
export const UI_CONSTANTS = {
  BADGE_SIZES: {
    SMALL: "sm",
    MEDIUM: "md",
    LARGE: "lg",
  },
  CARD_BORDERS: {
    PURCHASEABLE: "border-l-4 border-l-green-500",
    FINDABLE: "border-l-4 border-l-orange-500",
    JOURNEY: "border-l-4 border-l-blue-500",
  },
  COLORS: {
    GREEN: "text-green-600 dark:text-green-400",
    ORANGE: "text-orange-600 dark:text-orange-400",
    BLUE: "text-blue-600 dark:text-blue-400",
  },
} as const;

// Material categories
export const MATERIAL_CATEGORIES = {
  PURCHASEABLE: "purchaseable",
  FINDABLE: "findable",
} as const;

// Step variants
export const STEP_VARIANTS = {
  SUMMARY: "summary",
  DETAILED: "detailed",
} as const;

// Material item variants
export const MATERIAL_ITEM_VARIANTS = {
  PURCHASEABLE: "purchaseable",
  FINDABLE: "findable",
} as const;

// Default values
export const DEFAULTS = {
  BADGE_SIZE: "md",
  SHOW_QUANTITY: true,
  SHOW_PRICE: true,
  SHOW_MATERIALS: true,
  STEP_VARIANT: "summary",
  MATERIAL_VARIANT: "purchaseable",
} as const;

// Soul Level Calculator Constants
export const SOUL_LEVEL_MIN = 2;
export const SOUL_LEVEL_MAX = 713;
export const SOUL_LEVEL_PAGE_SIZE = 5;
export const SOUL_LEVEL_MOBILE_PAGE_SIZE = 3;
export const SOUL_LEVEL_TABLET_PAGE_SIZE = 4;
export const SOUL_LEVEL_ULTRA_MOBILE_PAGE_SIZE = 2;

// Icon paths for form fields and UI elements - simplified for performance
export const ICONS = {
  CURRENT_LEVEL: "M3 6h18M3 12h18",
  DESIRED_LEVEL: "M3 21h18M3 16h18M9 10l3-3m0 0l3 3m-3-3v8",
  ARROW_TRENDING_UP: "M3 17l6-6 4 4 8-8m0 0v5m0-5h-5",
  CALCULATOR:
    "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  TABLE: "M3 6h18M3 10h18M3 14h18M3 18h18",
  SOULS:
    "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
  LEVEL: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  FIRE: "M12 2C7 10 12 22 12 22s5-12 0-20z",
  BOOK_OPEN:
    "M2.25 6.75C2.25 5.507 3.257 4.5 4.5 4.5c2.485 0 4.5 1.007 4.5 2.25v10.5c0 1.243-2.015 2.25-4.5 2.25-1.243 0-2.25-1.007-2.25-2.25V6.75zm0 0C2.25 5.507 3.257 4.5 4.5 4.5c2.485 0 4.5 1.007 4.5 2.25v10.5c0 1.243-2.015 2.25-4.5 2.25-1.243 0-2.25-1.007-2.25-2.25V6.75zm13.5 0c0-1.243 1.007-2.25 2.25-2.25 2.485 0 4.5 1.007 4.5 2.25v10.5c0 1.243-2.015 2.25-4.5 2.25-1.243 0-2.25-1.007-2.25-2.25V6.75zm0 0c0-1.243 1.007-2.25 2.25-2.25 2.485 0 4.5 1.007 4.5 2.25v10.5c0 1.243-2.015 2.25-4.5 2.25-1.243 0-2.25-1.007-2.25-2.25V6.75z",
} as const;

// Color themes for tools
export const COLOR_THEMES = [
  {
    bg: "from-blue-400 to-purple-500",
    icon: "text-blue-600",
    text: "from-blue-600 to-purple-600",
  },
  {
    bg: "from-green-400 to-teal-500",
    icon: "text-green-600",
    text: "from-green-600 to-teal-600",
  },
  {
    bg: "from-red-400 to-pink-500",
    icon: "text-red-600",
    text: "from-red-600 to-pink-600",
  },
  {
    bg: "from-yellow-400 to-orange-500",
    icon: "text-yellow-600",
    text: "from-yellow-600 to-orange-600",
  },
  {
    bg: "from-indigo-400 to-blue-500",
    icon: "text-indigo-600",
    text: "from-indigo-600 to-blue-600",
  },
  {
    bg: "from-purple-400 to-pink-500",
    icon: "text-purple-600",
    text: "from-purple-600 to-pink-600",
  },
] as const;

export const getRandomTheme = () =>
  COLOR_THEMES[Math.floor(Math.random() * COLOR_THEMES.length)];
