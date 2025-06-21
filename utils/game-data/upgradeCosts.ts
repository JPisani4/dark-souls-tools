import type { Material, Merchant } from "~/types/game/upgrade";

// Materials
export const materials: Material[] = [
  {
    id: "titanite_shard",
    name: "Titanite Shard",
    category: "standard",
  },
  {
    id: "large_titanite_shard",
    name: "Large Titanite Shard",
    category: "standard",
  },
  {
    id: "titanite_chunk",
    name: "Titanite Chunk",
    category: "standard",
  },
  {
    id: "titanite_slab",
    name: "Titanite Slab",
    category: "standard",
  },
  {
    id: "green_titanite_shard",
    name: "Green Titanite Shard",
    category: "green",
  },
  {
    id: "blue_titanite_chunk",
    name: "Blue Titanite Chunk",
    category: "blue",
  },
  {
    id: "blue_titanite_slab",
    name: "Blue Titanite Slab",
    category: "blue",
  },
  {
    id: "red_titanite_chunk",
    name: "Red Titanite Chunk",
    category: "red",
  },
  {
    id: "red_titanite_slab",
    name: "Red Titanite Slab",
    category: "red",
  },
  {
    id: "white_titanite_chunk",
    name: "White Titanite Chunk",
    category: "white",
  },
  {
    id: "white_titanite_slab",
    name: "White Titanite Slab",
    category: "white",
  },
  {
    id: "twinkling_titanite",
    name: "Twinkling Titanite",
    category: "special",
  },
  {
    id: "demon_titanite",
    name: "Demon Titanite",
    category: "boss",
  },
  {
    id: "dragon_scale",
    name: "Dragon Scale",
    category: "dragon",
  },
  {
    id: "boss_soul",
    name: "Boss Soul",
    category: "soul",
  },
];

// Merchants
export const merchants: Merchant[] = [
  {
    id: "crestfallen_merchant",
    name: "Crestfallen Merchant",
    materialPrices: {
      titanite_shard: 1000,
      large_titanite_shard: 4000,
      green_titanite_shard: 5000,
    },
  },
  {
    id: "giant_blacksmith",
    name: "Giant Blacksmith",
    materialPrices: {
      titanite_shard: 800,
      large_titanite_shard: 3800,
      green_titanite_shard: 4800,
      twinkling_titanite: 8000,
    },
  },
  {
    id: "hawkeye_gough",
    name: "Hawkeye Gough",
    materialPrices: {
      titanite_shard: 800,
      large_titanite_shard: 3800,
      green_titanite_shard: 4800,
    },
  },
  {
    id: "blacksmith_andre",
    name: "Blacksmith Andre",
    materialPrices: {
      titanite_shard: 800,
    },
  },
  {
    id: "blacksmith_vamos",
    name: "Blacksmith Vamos",
    materialPrices: {
      titanite_shard: 800,
    },
  },
];
