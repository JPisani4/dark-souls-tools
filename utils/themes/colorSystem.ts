// Centralized color and theme system for consistent styling across components
// This provides the foundation for easy expansion without hardcoding specific values

export interface ColorTheme {
  bg: string;
  icon: string;
  text: string;
  border: string;
  iconBg: string;
  hoverBg: string;
  gradient: string;
  darkGradient: string;
}

export interface BadgeColor {
  color: string;
  badgeColor:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "error"
    | "neutral";
}

// Core color palette - foundation for all components
export const THEME_COLORS: ColorTheme[] = [
  {
    bg: "from-blue-500 to-blue-600",
    icon: "i-heroicons-sparkles",
    text: "text-blue-700",
    border: "border-blue-500",
    iconBg: "bg-blue-500",
    hoverBg: "hover:bg-blue-600",
    gradient: "from-blue-100 to-blue-200",
    darkGradient: "dark:from-blue-900 dark:to-gray-900",
  },
  {
    bg: "from-green-500 to-green-600",
    icon: "i-heroicons-check-badge",
    text: "text-green-700",
    border: "border-green-500",
    iconBg: "bg-green-500",
    hoverBg: "hover:bg-green-600",
    gradient: "from-green-100 to-green-200",
    darkGradient: "dark:from-green-900 dark:to-gray-900",
  },
  {
    bg: "from-yellow-500 to-yellow-600",
    icon: "i-heroicons-star",
    text: "text-yellow-700",
    border: "border-yellow-500",
    iconBg: "bg-yellow-500",
    hoverBg: "hover:bg-yellow-600",
    gradient: "from-yellow-100 to-yellow-200",
    darkGradient: "dark:from-yellow-900 dark:to-gray-900",
  },
  {
    bg: "from-pink-500 to-pink-600",
    icon: "i-heroicons-heart",
    text: "text-pink-700",
    border: "border-pink-500",
    iconBg: "bg-pink-500",
    hoverBg: "hover:bg-pink-600",
    gradient: "from-pink-100 to-pink-200",
    darkGradient: "dark:from-pink-900 dark:to-gray-900",
  },
  {
    bg: "from-purple-500 to-purple-600",
    icon: "i-heroicons-link",
    text: "text-purple-700",
    border: "border-purple-500",
    iconBg: "bg-purple-500",
    hoverBg: "hover:bg-purple-600",
    gradient: "from-purple-100 to-purple-200",
    darkGradient: "dark:from-purple-900 dark:to-gray-900",
  },
  {
    bg: "from-orange-500 to-orange-600",
    icon: "i-heroicons-fire",
    text: "text-orange-700",
    border: "border-orange-500",
    iconBg: "bg-orange-500",
    hoverBg: "hover:bg-orange-600",
    gradient: "from-orange-100 to-orange-200",
    darkGradient: "dark:from-orange-900 dark:to-gray-900",
  },
  {
    bg: "from-teal-500 to-teal-600",
    icon: "i-heroicons-light-bulb",
    text: "text-teal-700",
    border: "border-teal-500",
    iconBg: "bg-teal-500",
    hoverBg: "hover:bg-teal-600",
    gradient: "from-teal-100 to-teal-200",
    darkGradient: "dark:from-teal-900 dark:to-gray-900",
  },
  {
    bg: "from-red-500 to-red-600",
    icon: "i-heroicons-exclamation-triangle",
    text: "text-red-700",
    border: "border-red-500",
    iconBg: "bg-red-500",
    hoverBg: "hover:bg-red-600",
    gradient: "from-red-100 to-red-200",
    darkGradient: "dark:from-red-900 dark:to-gray-900",
  },
];

// Default theme for fallback in components
export const DEFAULT_THEME: ColorTheme = THEME_COLORS[0];

// Utility functions for theme management
export const getRandomTheme = (): ColorTheme => {
  return THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
};

export const getThemeByIndex = (index: number): ColorTheme => {
  return THEME_COLORS[index % THEME_COLORS.length];
};

// Badge color system for consistent status/material indicators
export const BADGE_COLORS: Record<string, BadgeColor> = {
  // Default categories
  primary: { color: "text-blue-700 dark:text-blue-400", badgeColor: "primary" },
  secondary: {
    color: "text-purple-700 dark:text-purple-400",
    badgeColor: "secondary",
  },
  success: {
    color: "text-green-700 dark:text-green-500",
    badgeColor: "success",
  },
  info: { color: "text-blue-700 dark:text-blue-400", badgeColor: "info" },
  warning: {
    color: "text-yellow-700 dark:text-yellow-400",
    badgeColor: "warning",
  },
  error: { color: "text-red-700 dark:text-red-500", badgeColor: "error" },
  neutral: { color: "text-gray-500 dark:text-gray-300", badgeColor: "neutral" },

  // Common material patterns (expandable)
  default: {
    color: "text-yellow-700 dark:text-yellow-400",
    badgeColor: "warning",
  },
};

// Utility function to get badge color by key
export const getBadgeColor = (key: string): BadgeColor => {
  return BADGE_COLORS[key] || BADGE_COLORS.default;
};

// Form field styling constants
export const FORM_STYLES = {
  label: "block font-bold mb-2 text-sm",
  input: "w-full text-lg focus:ring-2 focus:ring-primary focus:border-primary",
  inputError:
    "w-full text-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 border-red-500",
  fieldSize: "xl" as const,
} as const;

// Component spacing and layout constants
export const LAYOUT_SPACING = {
  section: "space-y-6",
  form: "space-y-4",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  card: "p-6",
} as const;

export const GAME_COLORS = {
  ds1: "warning",
  ds2: "info",
  ds3: "neutral",
  bb: "error",
  er: "success",
} as const;

export const GAME_DISPLAY_NAMES = {
  ds1: "DS1",
  ds2: "DS2",
  ds3: "DS3",
  bb: "BB",
  er: "ER",
} as const;

// Utility functions
export const getThemeColor = (theme: keyof typeof THEME_COLORS) => {
  return THEME_COLORS[theme];
};

export const getGameColor = (game: keyof typeof GAME_COLORS) => {
  return GAME_COLORS[game];
};

export const getGameDisplayName = (game: keyof typeof GAME_DISPLAY_NAMES) => {
  return GAME_DISPLAY_NAMES[game];
};

// Tailwind color mapping for CSS-in-JS
export const TAILWIND_COLORS: Record<string, string> = {
  "text-blue-700": "#1d4ed8",
  "text-blue-600": "#2563eb",
  "text-purple-700": "#7c3aed",
  "text-purple-600": "#8b5cf6",
  "text-green-600": "#16a34a",
  "text-orange-600": "#ea580c",
  "text-red-600": "#dc2626",
  "text-yellow-600": "#ca8a04",
  "text-indigo-600": "#4f46e5",
  "text-primary": "#22d3ee",
};

export const getTailwindColor = (colorClass: string): string => {
  return TAILWIND_COLORS[colorClass] || "#22d3ee";
};
