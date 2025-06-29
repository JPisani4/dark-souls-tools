import type {
  Armor,
  ArmorSet,
  ArmorCategory,
  AllArmorSets,
} from "~/types/game/ds1/armor";
import { lightArmor } from "./light-armor";
import { mediumArmor } from "./medium-armor";
import { heavyArmor } from "./heavy-armor";

// Helper to group armor pieces by set name
function groupArmorSets(
  armorList: Armor[],
  armorType: ArmorCategory
): ArmorSet[] {
  const setsMap: Record<string, Armor[]> = {};
  for (const piece of armorList) {
    if (piece.set) {
      if (!setsMap[piece.set]) setsMap[piece.set] = [];
      setsMap[piece.set].push(piece);
    }
  }
  return Object.entries(setsMap).map(([setName, pieces]) => {
    const bySlot: any = {};
    for (const p of pieces) bySlot[p.slot] = p;
    const totalWeight = pieces.reduce((sum, p) => sum + p.weight, 0);
    const totalDefense = {
      normal: 0,
      strike: 0,
      slash: 0,
      thrust: 0,
      magic: 0,
      fire: 0,
      lightning: 0,
      bleed: 0,
      poison: 0,
      curse: 0,
    };
    let totalPoise = 0;
    for (const p of pieces) {
      for (const k in totalDefense) totalDefense[k] += p.defense[k];
      totalPoise += p.effect.poise || 0;
    }
    return {
      id: setName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      name: setName,
      description: undefined,
      armorType,
      pieces: bySlot,
      totalWeight,
      totalDefense,
      totalPoise,
    };
  });
}

const lightArmorSets = groupArmorSets(lightArmor, "light-armor");
const mediumArmorSets = groupArmorSets(mediumArmor, "medium-armor");
const heavyArmorSets = groupArmorSets(heavyArmor, "heavy-armor");

const armorSetData: AllArmorSets = {
  "light-armor": lightArmorSets,
  "medium-armor": mediumArmorSets,
  "heavy-armor": heavyArmorSets,
};

export const getAllArmorSets = (): AllArmorSets => armorSetData;
export const getArmorSetsByCategory = (category: ArmorCategory): ArmorSet[] =>
  armorSetData[category] || [];
export const getArmorSetById = (id: string): ArmorSet | null =>
  Object.values(armorSetData)
    .flat()
    .find((set) => set.id === id) || null;
export const getArmorSetByName = (name: string): ArmorSet | null =>
  Object.values(armorSetData)
    .flat()
    .find((set) => set.name === name) || null;
export const getArmorSetsByType = (armorType: string): ArmorSet[] =>
  Object.values(armorSetData)
    .flat()
    .filter((set) => set.armorType === armorType);
export const searchArmorSets = (query: string): ArmorSet[] => {
  const searchTerm = query.toLowerCase();
  return Object.values(armorSetData)
    .flat()
    .filter((set) => set.name.toLowerCase().includes(searchTerm));
};
export const getArmorSetOptions = (): Array<{
  value: string;
  label: string;
  category: string;
}> =>
  Object.values(armorSetData)
    .flat()
    .map((set) => ({ value: set.id, label: set.name, category: set.armorType }))
    .sort((a, b) => a.label.localeCompare(b.label));
export const getArmorSetOptionsByCategory = (
  category: ArmorCategory
): Array<{ value: string; label: string }> =>
  armorSetData[category]
    ?.map((set) => ({ value: set.id, label: set.name }))
    .sort((a, b) => a.label.localeCompare(b.label)) || [];
export const getArmorPiecesFromSet = (
  setId: string
): { head?: any; chest?: any; hands?: any; legs?: any } =>
  getArmorSetById(setId)?.pieces || {};
export const calculateArmorSetStats = (setId: string) => {
  const armorSet = getArmorSetById(setId);
  if (!armorSet) return null;
  return {
    totalWeight: armorSet.totalWeight,
    totalDefense: armorSet.totalDefense,
    totalPoise: armorSet.totalPoise,
  };
};
export const getArmorSetsByWeightRange = (
  minWeight: number,
  maxWeight: number
): ArmorSet[] =>
  Object.values(armorSetData)
    .flat()
    .filter(
      (set) => set.totalWeight >= minWeight && set.totalWeight <= maxWeight
    );
export const getArmorSetsByPoiseRange = (
  minPoise: number,
  maxPoise: number
): ArmorSet[] =>
  Object.values(armorSetData)
    .flat()
    .filter((set) => set.totalPoise >= minPoise && set.totalPoise <= maxPoise);
export const getArmorSetsByDefenseType = (
  defenseType: keyof ArmorSet["totalDefense"]
): ArmorSet[] =>
  Object.values(armorSetData)
    .flat()
    .filter((set) => set.totalDefense[defenseType] > 0)
    .sort((a, b) => b.totalDefense[defenseType] - a.totalDefense[defenseType]);
