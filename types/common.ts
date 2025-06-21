// Color theme interface for consistent styling across tools
export interface ColorTheme {
  bg: string;
  icon: string;
  text: string;
}

// Validation result interface for form validation
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  warnings?: string[];
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
