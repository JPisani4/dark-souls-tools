/**
 * Shared formatting utilities for consistent number and text formatting
 */

export const formatNumber = (num: number): string => num.toLocaleString();

export const formatCurrency = (num: number, currency = "souls"): string =>
  `${formatNumber(num)} ${currency}`;

export const formatMaterialName = (key: string): string =>
  key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export const formatMerchantList = (
  merchants: Array<{ merchant: { name: string }; price: number }>
): string =>
  merchants
    .map((m) => `${m.merchant.name} (${formatNumber(m.price)})`)
    .join(", ");

export const formatBetterMerchants = (
  betterMerchants: Array<{
    merchant: { name: string };
    price: number;
    savings: number;
  }>
): string =>
  betterMerchants
    .map((m) => `${m.merchant.name} (${formatNumber(m.price)})`)
    .join(", ");

export const formatStepDescription = (step: {
  type: string;
  from: number;
  to: number;
  pathName?: string;
  fromPathName?: string;
  toPathName?: string;
}): string => {
  if (step.type === "reinforce") {
    return `Reinforce ${step.pathName ? `${step.pathName} ` : ""}+${step.from} to +${step.to}`;
  } else if (step.type === "ascend") {
    const fromPath =
      step.fromPathName?.replace(/\s*\([^)]*\)/g, "") || "Regular";
    const toPath = step.toPathName?.replace(/\s*\([^)]*\)/g, "") || "Regular";
    return `Ascend from ${fromPath} +${step.from} to ${toPath} +${step.to}`;
  }
  return "";
};
