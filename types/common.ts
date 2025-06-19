// Color theme interface for consistent styling across tools
export interface ColorTheme {
  bg: string;
  icon: string;
  text: string;
}

// Pagination state for reusable pagination components
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

// Generic table row interface with better type safety
export interface TableRow<T = Record<string, unknown>> {
  id: string | number;
  data: T;
}

// Tool metadata for SEO and navigation
export interface ToolMeta {
  title: string;
  description: string;
  icon?: string;
}

// Validation result interface for form validation
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  warnings?: string[];
}

// Form field configuration for reusable form components
export interface FormFieldConfig<T = unknown> {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  iconPath?: string;
  validation?: (value: T) => ValidationResult;
}

// Icon configuration for consistent icon usage
export interface IconConfig {
  path: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

// Theme configuration for tool styling
export interface ThemeConfig {
  theme: ColorTheme;
  variant?: "default" | "success" | "warning" | "error";
}

// Generic form field value type
export type FormFieldValue = string | number | boolean | null | undefined;

// Simple form data interface
export interface FormData {
  [key: string]: FormFieldValue;
}

// Error handling interface
export interface AppError {
  message: string;
  code?: string;
  context?: string;
  timestamp: number;
}

// Loading state interface
export interface LoadingState {
  isLoading: boolean;
  error?: AppError;
  retry?: () => void;
}
