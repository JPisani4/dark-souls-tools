import type {
  Achievement,
  AchievementRequirement,
} from "~/types/game/ds1/achievements";

export function formatLocation(location: string | string[]): string {
  if (Array.isArray(location)) {
    return location.join(" OR ");
  }
  return location;
}

export function formatAscendsFrom(ascendsFrom?: string[]): string | null {
  if (!ascendsFrom || ascendsFrom.length === 0) return null;
  return ascendsFrom.join(", ");
}

export function getCategoryDisplayName(
  category: string,
  displayNames?: Record<string, string>
): string {
  const defaultDisplayNames: Record<string, string> = {
    boss: "Boss Weapons",
    loot: "Loot",
    covenant: "Covenant Weapons",
    tail: "Tail Cutoffs",
    drop: "Enemy Drops",
    purchase: "Purchase",
    quest: "Quest Rewards",
    miracles: "Quest Rewards",
  };
  const names = displayNames || defaultDisplayNames;
  return (
    names[category] || category.charAt(0).toUpperCase() + category.slice(1)
  );
}

export function hasQuestRequirements(
  achievement: Achievement,
  category: string
): boolean {
  const categoryRequirements = achievement.requirements.filter(
    (req) => req.category === category
  );
  return categoryRequirements.some((req) => req.quest || req.logansQuest);
}

export function getQuestProgressionNote(
  achievement: Achievement,
  category: string
): string | null {
  const categoryRequirements = achievement.requirements.filter(
    (req) => req.category === category
  );
  const questRequirements = categoryRequirements.filter(
    (req) => req.quest || req.logansQuest
  );
  if (questRequirements.length === 0) return null;
  if (achievement.questNPC) {
    return `Note: Spells must be purchased from ${achievement.questNPC} to advance their questline.`;
  }
  const locations = new Set<string>();
  questRequirements.forEach((req) => {
    if (req.location) {
      if (Array.isArray(req.location)) {
        req.location.forEach((loc) => locations.add(loc));
      } else {
        locations.add(req.location);
      }
    }
  });
  const locationList = Array.from(locations);
  if (locationList.length === 0) return null;
  return `Note: Quest progression requirements must be purchased from: ${locationList.join(", ")}`;
}
