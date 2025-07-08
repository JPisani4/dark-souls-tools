// Sort options with categories
export const sortOptionsWithCategories = [
  {
    label: "General",
    options: [
      { label: "Poise", value: "poise" },
      { label: "Weight", value: "weight" },
      { label: "Total Defense", value: "totalDefense" },
    ],
  },
  {
    label: "Physical Defense",
    options: [
      { label: "Total Physical Defense", value: "physical" },
      { label: "Regular Defense", value: "regularDefense" },
      { label: "Strike Defense", value: "strikeDefense" },
      { label: "Slash Defense", value: "slashDefense" },
      { label: "Thrust Defense", value: "thrustDefense" },
    ],
  },
  {
    label: "Elemental Defense",
    options: [
      { label: "Total Elemental Defense", value: "elemental" },
      { label: "Magic Defense", value: "magicDefense" },
      { label: "Fire Defense", value: "fireDefense" },
      { label: "Lightning Defense", value: "lightningDefense" },
    ],
  },
  {
    label: "Status Resistance",
    options: [
      { label: "Total Status Resistance", value: "status" },
      { label: "Bleed Resistance", value: "bleedResistance" },
      { label: "Poison Resistance", value: "poisonResistance" },
      { label: "Curse Resistance", value: "curseResistance" },
    ],
  },
];

// Helper to get label for a sort type
export function getSortLabel(sortType: string): string {
  switch (sortType) {
    case "poise":
      return "Poise";
    case "weight":
      return "Weight";
    case "totalDefense":
      return "Total Defense";
    case "regularDefense":
      return "Regular Defense";
    case "strikeDefense":
      return "Strike Defense";
    case "slashDefense":
      return "Slash Defense";
    case "thrustDefense":
      return "Thrust Defense";
    case "physical":
      return "Total Physical Defense";
    case "physicalDefense":
      return "Physical Defense";
    case "magicDefense":
      return "Magic Defense";
    case "fireDefense":
      return "Fire Defense";
    case "lightningDefense":
      return "Lightning Defense";
    case "elemental":
      return "Total Elemental Defense";
    case "elementalDefense":
      return "Elemental Defense";
    case "bleedResistance":
      return "Bleed Resistance";
    case "poisonResistance":
      return "Poison Resistance";
    case "curseResistance":
      return "Curse Resistance";
    case "status":
      return "Total Status Resistance";
    case "statusResistance":
      return "Status Resistance";
    default:
      return sortType;
  }
}

// Ratio calculation for armor or set objects
export function calculateRatio(
  obj: any,
  primary: string,
  secondary: string,
  isSet: boolean = false
): number {
  if (!obj) return 0;
  const prefix = isSet ? "totalDefense" : "defense";
  const poiseKey = isSet ? "totalPoise" : "effect.poise";
  const weightKey = isSet ? "totalWeight" : "weight";

  let primaryValue = 0;
  let secondaryValue = 0;

  // Calculate primary value
  switch (primary) {
    case "poise":
      primaryValue = isSet ? obj.totalPoise || 0 : obj.effect?.poise || 0;
      break;
    case "weight":
      primaryValue = obj[weightKey] || 0;
      break;
    case "totalDefense":
      primaryValue =
        (obj[prefix]?.normal || 0) +
        (obj[prefix]?.strike || 0) +
        (obj[prefix]?.slash || 0) +
        (obj[prefix]?.thrust || 0);
      break;
    case "regularDefense":
      primaryValue = obj[prefix]?.normal || 0;
      break;
    case "strikeDefense":
      primaryValue = obj[prefix]?.strike || 0;
      break;
    case "slashDefense":
      primaryValue = obj[prefix]?.slash || 0;
      break;
    case "thrustDefense":
      primaryValue = obj[prefix]?.thrust || 0;
      break;
    case "physical":
      primaryValue =
        (obj[prefix]?.normal || 0) +
        (obj[prefix]?.strike || 0) +
        (obj[prefix]?.slash || 0) +
        (obj[prefix]?.thrust || 0);
      break;
    case "physicalDefense":
      primaryValue = obj[prefix]?.normal || 0;
      break;
    case "magicDefense":
      primaryValue = obj[prefix]?.magic || 0;
      break;
    case "fireDefense":
      primaryValue = obj[prefix]?.fire || 0;
      break;
    case "lightningDefense":
      primaryValue = obj[prefix]?.lightning || 0;
      break;
    case "elemental":
    case "elementalDefense":
      primaryValue =
        (obj[prefix]?.magic || 0) +
        (obj[prefix]?.fire || 0) +
        (obj[prefix]?.lightning || 0);
      break;
    case "bleedResistance":
      primaryValue = obj[prefix]?.bleed || 0;
      break;
    case "poisonResistance":
      primaryValue = obj[prefix]?.poison || 0;
      break;
    case "curseResistance":
      primaryValue = obj[prefix]?.curse || 0;
      break;
    case "status":
    case "statusResistance":
      primaryValue =
        (obj[prefix]?.bleed || 0) +
        (obj[prefix]?.poison || 0) +
        (obj[prefix]?.curse || 0);
      break;
    default:
      primaryValue = 0;
  }

  // If no secondary sort, return primary value
  if (!secondary || secondary === "" || secondary === "none") {
    return primaryValue;
  }

  // Calculate secondary value
  switch (secondary) {
    case "poise":
      secondaryValue = isSet ? obj.totalPoise || 0 : obj.effect?.poise || 0;
      break;
    case "weight":
      secondaryValue = obj[weightKey] || 0;
      break;
    case "totalDefense":
      secondaryValue =
        (obj[prefix]?.normal || 0) +
        (obj[prefix]?.strike || 0) +
        (obj[prefix]?.slash || 0) +
        (obj[prefix]?.thrust || 0);
      break;
    case "regularDefense":
      secondaryValue = obj[prefix]?.normal || 0;
      break;
    case "strikeDefense":
      secondaryValue = obj[prefix]?.strike || 0;
      break;
    case "slashDefense":
      secondaryValue = obj[prefix]?.slash || 0;
      break;
    case "thrustDefense":
      secondaryValue = obj[prefix]?.thrust || 0;
      break;
    case "physical":
      secondaryValue =
        (obj[prefix]?.normal || 0) +
        (obj[prefix]?.strike || 0) +
        (obj[prefix]?.slash || 0) +
        (obj[prefix]?.thrust || 0);
      break;
    case "physicalDefense":
      secondaryValue = obj[prefix]?.normal || 0;
      break;
    case "magicDefense":
      secondaryValue = obj[prefix]?.magic || 0;
      break;
    case "fireDefense":
      secondaryValue = obj[prefix]?.fire || 0;
      break;
    case "lightningDefense":
      secondaryValue = obj[prefix]?.lightning || 0;
      break;
    case "elemental":
    case "elementalDefense":
      secondaryValue =
        (obj[prefix]?.magic || 0) +
        (obj[prefix]?.fire || 0) +
        (obj[prefix]?.lightning || 0);
      break;
    case "bleedResistance":
      secondaryValue = obj[prefix]?.bleed || 0;
      break;
    case "poisonResistance":
      secondaryValue = obj[prefix]?.poison || 0;
      break;
    case "curseResistance":
      secondaryValue = obj[prefix]?.curse || 0;
      break;
    case "status":
    case "statusResistance":
      secondaryValue =
        (obj[prefix]?.bleed || 0) +
        (obj[prefix]?.poison || 0) +
        (obj[prefix]?.curse || 0);
      break;
    default:
      secondaryValue = 0;
  }

  return secondaryValue !== 0 ? primaryValue / secondaryValue : 0;
}
