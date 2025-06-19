import { computed, ref } from "vue";
import {
  findMerchantsForMaterial,
  getMaterialSavings,
} from "~/utils/merchantAnalysis";
import type { Merchant } from "~/types/upgradeSummary";

interface MaterialAnalysisCache {
  [key: string]: {
    merchants: Array<{ merchant: Merchant; price: number }>;
    savings: any;
    timestamp: number;
  };
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useMaterialAnalysis() {
  const cache = ref<MaterialAnalysisCache>({});

  const getCacheKey = (
    material: string,
    quantity: number,
    merchantId: string | null
  ) => `${material}-${quantity}-${merchantId}`;

  const isCacheValid = (timestamp: number) =>
    Date.now() - timestamp < CACHE_DURATION;

  const getCachedAnalysis = (
    material: string,
    quantity: number,
    selectedMerchant: Merchant | null
  ) => {
    const key = getCacheKey(material, quantity, selectedMerchant?.id || null);
    const cached = cache.value[key];

    if (cached && isCacheValid(cached.timestamp)) {
      return cached;
    }

    return null;
  };

  const setCachedAnalysis = (
    material: string,
    quantity: number,
    selectedMerchant: Merchant | null,
    merchants: Array<{ merchant: Merchant; price: number }>,
    savings: any
  ) => {
    const key = getCacheKey(material, quantity, selectedMerchant?.id || null);
    cache.value[key] = {
      merchants,
      savings,
      timestamp: Date.now(),
    };
  };

  const analyzeMaterial = (
    material: string,
    quantity: number,
    selectedMerchant: Merchant | null
  ) => {
    const cached = getCachedAnalysis(material, quantity, selectedMerchant);

    if (cached) {
      return {
        merchants: cached.merchants,
        savings: cached.savings,
      };
    }

    const merchants = findMerchantsForMaterial(material, selectedMerchant);
    const savings = getMaterialSavings(material, quantity, selectedMerchant);

    setCachedAnalysis(material, quantity, selectedMerchant, merchants, savings);

    return { merchants, savings };
  };

  const clearCache = () => {
    cache.value = {};
  };

  return {
    analyzeMaterial,
    clearCache,
  };
}
