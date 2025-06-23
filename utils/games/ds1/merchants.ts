import type {
  Merchant,
  BetterPrice,
  MaterialSavings,
} from "~/types/game/upgradeSummary";
import { merchants as originalMerchants } from "./upgradeCosts";

// Export merchants in the new format
export const merchants: Record<
  string,
  {
    name: string;
    location: string;
    materials: Record<string, { price: number }>;
  }
> = {
  crestfallen_merchant: {
    name: "Crestfallen Merchant",
    location: "Undead Burg",
    materials: {
      titanite_shard: { price: 1000 },
      large_titanite_shard: { price: 4000 },
      green_titanite_shard: { price: 5000 },
    },
  },
  giant_blacksmith: {
    name: "Giant Blacksmith",
    location: "Anor Londo",
    materials: {
      titanite_shard: { price: 800 },
      large_titanite_shard: { price: 3800 },
      green_titanite_shard: { price: 4800 },
      twinkling_titanite: { price: 8000 },
    },
  },
  hawkeye_gough: {
    name: "Hawkeye Gough",
    location: "Oolacile Township",
    materials: {
      titanite_shard: { price: 800 },
      large_titanite_shard: { price: 3800 },
      green_titanite_shard: { price: 4800 },
    },
  },
  blacksmith_andre: {
    name: "Blacksmith Andre",
    location: "Undead Parish",
    materials: {
      titanite_shard: { price: 800 },
    },
  },
  blacksmith_vamos: {
    name: "Blacksmith Vamos",
    location: "Catacombs",
    materials: {
      titanite_shard: { price: 800 },
    },
  },
};

// Analysis functions (keeping for backward compatibility)
export const findAllBetterPrices = (
  materialId: string,
  selectedMerchant: Merchant | null
): BetterPrice[] => {
  if (!selectedMerchant) return [];

  const currentPrice = selectedMerchant.materialPrices[materialId] ?? 0;

  return originalMerchants
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
    return originalMerchants
      .map((merchant: Merchant) => {
        const price = merchant.materialPrices[materialId];
        return price ? { merchant, price } : null;
      })
      .filter(
        (item): item is { merchant: Merchant; price: number } => item !== null
      )
      .sort((a, b) => a.price - b.price);
  }

  return originalMerchants
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

  // Only consider the best (cheapest) price, not sum of all cheaper prices
  const bestPrice = betterMerchants[0].price;
  const savingsPerUnit = currentPrice - bestPrice;
  const totalSavings = savingsPerUnit * qty;

  return {
    totalSavings,
    betterMerchants,
    currentPrice,
  };
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
