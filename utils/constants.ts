/**
 * Application constants for better maintainability
 */

// Soul Level Calculator Constants
export const SOUL_LEVEL_MIN = 2;
export const SOUL_LEVEL_MAX = 713;
export const SOUL_LEVEL_PAGE_SIZE = 5;
export const SOUL_LEVEL_MOBILE_PAGE_SIZE = 5;
export const SOUL_LEVEL_TABLET_PAGE_SIZE = 5;
export const SOUL_LEVEL_ULTRA_MOBILE_PAGE_SIZE = 5;

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

// Re-export getRandomTheme from the theme system
export { getRandomTheme } from "~/utils/themes/colorSystem";
