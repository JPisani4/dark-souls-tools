import type { Component } from "vue";

// Metadata for tool information and display
export interface ToolMeta {
  title: string;
  description: string;
  version?: string;
  author?: string;
  lastUpdated?: string;
}

// Core tool interface - defines the structure of all tools in the application
export interface Tool {
  title: string;
  description: string;
  slug: string;
  icon: string;
  category: string;
  tags: string[];
  order: number;
  // Dynamic component loading for code splitting
  loadComponent: () => Promise<Component>;
  config?: ToolConfig;
  isLoaded?: boolean;
  isEnabled?: boolean;
  lastAccessed?: Date;
  createdAt: Date;
  // Supported games for this tool
  gameCategories: ("ds1" | "ds2" | "ds3" | "bb" | "er")[];
}

// Configuration for tool behavior and display
export interface ToolConfig {
  title: string;
  description: string;
  icon?: string;
  category?: string;
  order?: number;
  tags?: string[];
  version?: string;
  author?: string;
  lastUpdated?: string;
  gameCategory?: "ds1" | "ds2" | "ds3" | "bb" | "er";
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
  [key: string]: any;
}

// Tool categories for organization and filtering
export type ToolCategory =
  | "calculator"
  | "database"
  | "planner"
  | "analyzer"
  | "generator"
  | "utility"
  | "reference"
  | "custom";

// State management for tool loading and data
export interface ToolState {
  isLoading: boolean;
  isLoaded: boolean;
  error: Error | null;
  data: any;
  lastUpdated: Date;
}
