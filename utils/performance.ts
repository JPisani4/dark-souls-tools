/**
 * Performance optimization utilities
 */

// Generic cache entry type
interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

// Memoization cache for expensive computations
const memoCache = new Map<string, CacheEntry<unknown>>();

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Memoize expensive computations with cache expiration
 * @param key - Unique cache key
 * @param fn - Function to memoize
 * @param duration - Cache duration in milliseconds
 * @returns Memoized result
 */
export function memoize<T>(
  key: string,
  fn: () => T,
  duration: number = CACHE_DURATION
): T {
  const now = Date.now();
  const cached = memoCache.get(key) as CacheEntry<T> | undefined;

  if (cached && now - cached.timestamp < duration) {
    return cached.value;
  }

  const result = fn();
  memoCache.set(key, { value: result, timestamp: now });
  return result;
}

/**
 * Clear expired cache entries
 */
export function clearExpiredCache(): void {
  const now = Date.now();
  for (const [key, entry] of memoCache.entries()) {
    if (now - entry.timestamp > CACHE_DURATION) {
      memoCache.delete(key);
    }
  }
}

/**
 * Performance utilities for monitoring and optimizing application performance
 */

// Performance monitoring
let performanceMetrics: Record<string, number[]> = {};

/**
 * Safe error logging with performance context
 */
export const safeErrorLog = (error: unknown, context: string) => {
  if (process.env.NODE_ENV === "development") {
    console.error(`[${context}] Error:`, error);
  }
};

/**
 * Start performance measurement
 */
export const startPerformanceMeasure = (name: string) => {
  if (process.client && window.performance) {
    performance.mark(`${name}-start`);
  }
};

/**
 * End performance measurement and log results
 */
export const endPerformanceMeasure = (name: string) => {
  if (process.client && window.performance) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    const measure = performance.getEntriesByName(name)[0];
    if (measure) {
      if (!performanceMetrics[name]) {
        performanceMetrics[name] = [];
      }
      performanceMetrics[name].push(measure.duration);

      // Keep only last 10 measurements
      if (performanceMetrics[name].length > 10) {
        performanceMetrics[name].shift();
      }
    }
  }
};

/**
 * Get performance metrics
 */
export const getPerformanceMetrics = () => {
  return performanceMetrics;
};

/**
 * Clear performance metrics
 */
export const clearPerformanceMetrics = () => {
  performanceMetrics = {};
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Check if device is mobile for performance optimizations
 */
export const isMobileDevice = (): boolean => {
  if (!process.client) return false;
  return window.innerWidth < 768;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (!process.client) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Clean up cache periodically
if (typeof window !== "undefined") {
  setInterval(clearExpiredCache, CACHE_DURATION);
}
