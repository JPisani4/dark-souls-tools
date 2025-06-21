import { computed } from "vue";
import { DEFAULT_THEME } from "~/utils/themes/colorSystem";
import type { ColorTheme } from "~/utils/themes/colorSystem";

export function useSafeTheme(theme?: ColorTheme, variant?: string) {
  return computed(() => {
    // If variant is 'unstyled', return an empty object (or customize as needed)
    if (variant === "unstyled") {
      // You can return a minimal theme or an empty object, depending on your needs
      return {} as ColorTheme;
    }
    // Check for all required properties
    const t = theme;
    if (
      !t ||
      !t.border ||
      !t.iconBg ||
      !t.gradient ||
      !t.darkGradient ||
      !t.text ||
      !t.icon
    ) {
      return DEFAULT_THEME;
    }
    return t;
  });
}
