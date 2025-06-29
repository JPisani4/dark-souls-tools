// Weapon data for Dark Souls 1
// This file organizes weapons by category and provides utility functions

import type {
  Weapon,
  WeaponCategory,
  AllWeapons,
} from "~/types/game/ds1/weapons";

// Import weapon data by category
import { daggers } from "./daggers";
import { straightSwords } from "./straight-swords";
import { greatswords } from "./greatswords";
import { ultraGreatswords } from "./ultra-greatswords";
import { curvedSwords } from "./curved-swords";
import { curvedGreatswords } from "./curved-greatswords";
import { katanas } from "./katanas";
import { thrustingSwords } from "./piercing-swords";
import { axes } from "./axes";
import { greataxes } from "./greataxes";
import { hammers } from "./hammers";
import { greatHammers } from "./great-hammers";
import { spears } from "./spears";
import { halberds } from "./halberds";
import { whips } from "./whips";
import { fists } from "./fists";
import { bows } from "./bows";
import { greatbows } from "./greatbows";
import { crossbows } from "./crossbows";
import { catalysts } from "./catalysts";
import { talismans } from "./talismans";

// Weapon data organized by category
const weaponData: AllWeapons = {
  daggers,
  "straight-swords": straightSwords,
  greatswords,
  "ultra-greatswords": ultraGreatswords,
  "curved-swords": curvedSwords,
  "curved-greatswords": curvedGreatswords,
  katanas,
  "thrusting-swords": thrustingSwords,
  axes,
  greataxes,
  hammers,
  "great-hammers": greatHammers,
  spears,
  halberds,
  whips,
  fists,
  bows,
  greatbows,
  crossbows,
  catalysts,
  talismans,
};

// Get all weapons
export const getAllWeapons = (): AllWeapons => weaponData;

// Get weapons by category
export const getWeaponsByCategory = (category: WeaponCategory): Weapon[] => {
  return weaponData[category] || [];
};

// Get weapon by name
export const getWeaponByName = (name: string): Weapon | null => {
  for (const category of Object.values(weaponData)) {
    const weapon = category.find(
      (w) => w.name.toLowerCase() === name.toLowerCase()
    );
    if (weapon) return weapon;
  }
  return null;
};

// Get weapons by upgrade path
export const getWeaponsByUpgradePath = (upgradePath: string): Weapon[] => {
  const weapons: Weapon[] = [];
  for (const category of Object.values(weaponData)) {
    weapons.push(...category.filter((w) => w.upgradePath === upgradePath));
  }
  return weapons;
};

// Get weapons by requirements (find weapons that can be used with given stats)
export const getWeaponsByRequirements = (
  strength: number,
  dexterity: number,
  intelligence: number,
  faith: number
): Weapon[] => {
  const weapons: Weapon[] = [];
  for (const category of Object.values(weaponData)) {
    weapons.push(
      ...category.filter(
        (w) =>
          w.requirements.strength <= strength &&
          w.requirements.dexterity <= dexterity &&
          w.requirements.intelligence <= intelligence &&
          w.requirements.faith <= faith
      )
    );
  }
  return weapons;
};

// Get weapons by damage type
export const getWeaponsByDamageType = (
  damageType: keyof Weapon["damage"]
): Weapon[] => {
  const weapons: Weapon[] = [];
  for (const [, category] of Object.entries(weaponData)) {
    if (category) {
      weapons.push(
        ...(category as Weapon[]).filter((w) => w.damage[damageType] > 0)
      );
    }
  }
  return weapons;
};

// Get weapons by attack type
export const getWeaponsByAttackType = (
  attackType: keyof Weapon["attackType"]
): Weapon[] => {
  const weapons: Weapon[] = [];
  for (const category of Object.values(weaponData)) {
    weapons.push(...category.filter((w) => w.attackType[attackType]));
  }
  return weapons;
};

// Get weapon categories
export const getWeaponCategories = (): WeaponCategory[] => {
  return Object.keys(weaponData) as WeaponCategory[];
};

// Search weapons by name (partial match)
export const searchWeapons = (query: string): Weapon[] => {
  const weapons: Weapon[] = [];
  const lowerQuery = query.toLowerCase();

  for (const category of Object.values(weaponData)) {
    weapons.push(
      ...category.filter((w) => w.name.toLowerCase().includes(lowerQuery))
    );
  }

  return weapons;
};
