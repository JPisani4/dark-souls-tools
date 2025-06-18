export interface ToolMeta {
  title: string;
  description: string;
}

export interface Tool {
  title: string;
  description: string;
  slug: string;
  icon?: string;
  loadComponent: () => Promise<any>;
}
