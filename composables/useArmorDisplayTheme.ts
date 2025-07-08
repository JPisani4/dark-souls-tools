import { getRandomTheme } from "~/utils/themes/colorSystem";

export interface ArmorDisplayTheme {
  bg: string;
  icon: string;
  text: string;
  border: string;
  iconBg: string;
  hoverBg: string;
  gradient: string;
  darkGradient: string;
}

export function useArmorDisplayTheme() {
  const selectedTheme = getRandomTheme();

  // Defense type colors for consistent styling
  const defenseColors = {
    normal: "text-gray-800 dark:text-gray-200",
    strike: "text-amber-600 dark:text-amber-400",
    slash: "text-red-600 dark:text-red-400",
    thrust: "text-indigo-600 dark:text-indigo-400",
    magic: "text-blue-600 dark:text-blue-400",
    fire: "text-orange-600 dark:text-orange-400",
    lightning: "text-yellow-600 dark:text-yellow-400",
    bleed: "text-red-600 dark:text-red-400",
    poison: "text-green-600 dark:text-green-400",
    curse: "text-purple-600 dark:text-purple-400",
  };

  // Stat colors
  const statColors = {
    weight: "text-blue-600 dark:text-blue-400",
    poise: "text-green-600 dark:text-green-400",
  };

  // Card styling
  const cardStyles = {
    base: "border rounded-lg p-4 transition-all duration-200 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
    expanded: "border-gray-300 dark:border-gray-600",
    selected: "border-primary dark:border-primary",
  };

  // Button styling
  const buttonStyles = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary:
      "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700",
    ghost:
      "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
  };

  // Header styling
  const headerStyles = {
    slot: "flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
    category:
      "flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors",
  };

  // Pagination styling
  const paginationStyles = {
    container:
      "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mt-2",
    button: "p-1",
    pageButton: "w-8 h-8 p-0 text-xs",
  };

  return {
    selectedTheme,
    defenseColors,
    statColors,
    cardStyles,
    buttonStyles,
    headerStyles,
    paginationStyles,
  };
}
