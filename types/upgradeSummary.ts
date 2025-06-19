export interface Merchant {
  id: string;
  name: string;
  materialPrices: Record<string, number>;
}

export interface Step {
  type: string;
  from: number;
  to: number;
  souls: number;
  materials: Record<string, number>;
  pathName?: string;
  fromPathName?: string;
  toPathName?: string;
}

export interface MaterialInfo {
  color: string;
  badgeColor: string;
}

export interface GroupedStep {
  type: string;
  from: number;
  to: number;
  souls: number;
  materials: Record<string, number>;
  pathName?: string;
  fromPathName?: string;
  toPathName?: string;
  totalSouls: number;
  count?: number;
}

export interface BetterPrice {
  merchant: Merchant;
  price: number;
  savings: number;
}

export interface MaterialSavings {
  totalSavings: number;
  betterMerchants: BetterPrice[];
  currentPrice: number;
}

export interface UpgradeSummaryProps {
  souls: number;
  materials: Record<string, number>;
  steps: Step[];
  purchaseCost?: number;
  selectedMerchantId?: string;
}
