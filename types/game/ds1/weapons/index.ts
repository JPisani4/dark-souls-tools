// Weapon types for Dark Souls 1
// This defines the complete weapon structure used throughout the application

export interface WeaponRequirements {
  strength: number;
  dexterity: number;
  intelligence: number;
  faith: number;
}

export interface AttackType {
  strike?: boolean;
  slash?: boolean;
  thrust?: boolean;
  regular?: boolean;
}

export interface WeaponDamage {
  physical: number;
  magic: number;
  fire: number;
  lightning: number;
  magicAdjust?: number;
}

export interface AuxillaryDamage {
  bleed: number;
  poison: number;
  toxic: number;
  curse: number;
  occult: number;
  divine: number;
}

export interface Weapon {
  icon: string;
  name: string;
  weaponType: string;
  attackType: AttackType;
  requirements: WeaponRequirements;
  weaponArt?: boolean;
  criticalDamage: number;
  weight: number;
  damage: WeaponDamage;
  auxillaryDamage: AuxillaryDamage;
  upgradePath?: string;
  twoHanded?: boolean;
  requiredTwoHanded?: boolean;
}

// Weapon category types for organization
export type WeaponCategory =
  | "daggers"
  | "straight-swords"
  | "greatswords"
  | "ultra-greatswords"
  | "curved-swords"
  | "curved-greatswords"
  | "katanas"
  | "thrusting-swords"
  | "axes"
  | "greataxes"
  | "hammers"
  | "great-hammers"
  | "spears"
  | "halberds"
  | "whips"
  | "fists"
  | "bows"
  | "greatbows"
  | "crossbows"
  | "catalysts"
  | "talismans";

// Collection of weapons by category
export interface WeaponCollection {
  [category: string]: Weapon[];
}

// All weapons in the game
export type AllWeapons = {
  [K in WeaponCategory]: Weapon[];
};

// Utility function to get weapon with default values
export const getWeaponWithDefaults = (weapon: Partial<Weapon>): Weapon => {
  return {
    icon: weapon.icon || "",
    name: weapon.name || "",
    weaponType: weapon.weaponType || "",
    attackType: weapon.attackType || { regular: true },
    requirements: weapon.requirements || {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
    },
    criticalDamage: weapon.criticalDamage || 100,
    weight: weapon.weight || 0,
    damage: weapon.damage || { physical: 0, magic: 0, fire: 0, lightning: 0 },
    auxillaryDamage: weapon.auxillaryDamage || {
      bleed: 0,
      poison: 0,
      toxic: 0,
      curse: 0,
      occult: 0,
      divine: 0,
    },
    upgradePath: weapon.upgradePath,
    twoHanded: weapon.twoHanded ?? true, // Default to false if not specified
    requiredTwoHanded: weapon.requiredTwoHanded ?? false,
  };
};

// Utility function to get just the twoHanded value with default
export const getTwoHandedValue = (
  weapon: Weapon | Partial<Weapon>
): boolean => {
  return weapon.twoHanded ?? false;
};
