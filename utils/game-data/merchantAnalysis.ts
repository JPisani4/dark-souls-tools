import { merchants } from "~/utils/game-data/upgradeCosts";
import type {
  Merchant,
  BetterPrice,
  MaterialSavings,
} from "~/types/game/upgradeSummary";

export const findAllBetterPrices = (
  materialId: string,
  selectedMerchant: Merchant | null
): BetterPrice[] => {
  if (!selectedMerchant) return [];

  const currentPrice = selectedMerchant.materialPrices[materialId] ?? 0;

  return merchants
    .map((merchant: Merchant) => {
      const price = merchant.materialPrices[materialId];
      return price && price < currentPrice
        ? { merchant, price, savings: currentPrice - price }
        : null;
    })
    .filter((item): item is BetterPrice => item !== null)
    .sort((a, b) => a.price - b.price);
};

export const findMerchantsForMaterial = (
  materialId: string,
  selectedMerchant: Merchant | null
) => {
  if (!selectedMerchant) {
    // Return all merchants who sell this material
    return merchants
      .map((merchant: Merchant) => {
        const price = merchant.materialPrices[materialId];
        return price ? { merchant, price } : null;
      })
      .filter(
        (item): item is { merchant: Merchant; price: number } => item !== null
      )
      .sort((a, b) => a.price - b.price);
  }

  return merchants
    .map((merchant: Merchant) => {
      const price = merchant.materialPrices[materialId];
      return price ? { merchant, price } : null;
    })
    .filter(
      (item): item is { merchant: Merchant; price: number } => item !== null
    )
    .sort((a, b) => a.price - b.price);
};

export const getMaterialSavings = (
  materialId: string,
  qty: number,
  selectedMerchant: Merchant | null
): MaterialSavings | null => {
  if (!selectedMerchant) return null;

  const currentPrice = selectedMerchant.materialPrices[materialId] ?? 0;
  const betterMerchants = findAllBetterPrices(materialId, selectedMerchant);

  if (betterMerchants.length === 0) return null;

  const totalSavings =
    betterMerchants.reduce((sum, item) => sum + item.savings, 0) * qty;
  return { totalSavings, betterMerchants, currentPrice };
};

export const calculateTotalPotentialSavings = (
  purchaseableMaterials: Record<string, number>,
  selectedMerchant: Merchant | null
): number => {
  if (!selectedMerchant) return 0;

  return Object.entries(purchaseableMaterials).reduce(
    (total, [material, qty]) => {
      const savings = getMaterialSavings(
        material,
        qty as number,
        selectedMerchant
      );
      return total + (savings?.totalSavings || 0);
    },
    0
  );
};
