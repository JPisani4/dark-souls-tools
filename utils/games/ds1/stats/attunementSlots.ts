// Attunement slot mapping for Dark Souls 1
// This file maps attunement stat levels to the number of available attunement slots

export interface AttunementSlotMapping {
  attunementLevel: number;
  slots: number;
}

// Attunement stat levels and their corresponding slot counts
export const ATTUNEMENT_SLOT_MAPPING: AttunementSlotMapping[] = [
  { attunementLevel: 10, slots: 1 },
  { attunementLevel: 12, slots: 2 },
  { attunementLevel: 14, slots: 3 },
  { attunementLevel: 16, slots: 4 },
  { attunementLevel: 19, slots: 5 },
  { attunementLevel: 23, slots: 6 },
  { attunementLevel: 28, slots: 7 },
  { attunementLevel: 34, slots: 8 },
  { attunementLevel: 41, slots: 9 },
  { attunementLevel: 50, slots: 10 },
];

/**
 * Get the number of attunement slots available at a given attunement level
 * @param attunementLevel - The current attunement stat level
 * @returns The number of available attunement slots
 */
export function getAttunementSlots(attunementLevel: number): number {
  // Find the highest slot count where the required level is <= current level
  const mapping = ATTUNEMENT_SLOT_MAPPING.filter(
    (m) => m.attunementLevel <= attunementLevel
  ).sort((a, b) => b.slots - a.slots);

  return mapping.length > 0 ? mapping[0].slots : 0;
}

/**
 * Get the next attunement level that grants an additional slot
 * @param currentAttunement - The current attunement stat level
 * @returns The next attunement level that grants an additional slot, or null if at max
 */
export function getNextAttunementSlotLevel(
  currentAttunement: number
): number | null {
  const currentSlots = getAttunementSlots(currentAttunement);
  const nextMapping = ATTUNEMENT_SLOT_MAPPING.find(
    (m) => m.slots > currentSlots
  );

  return nextMapping ? nextMapping.attunementLevel : null;
}

/**
 * Get the attunement level required for a specific number of slots
 * @param desiredSlots - The number of attunement slots needed
 * @returns The minimum attunement level required, or null if invalid
 */
export function getAttunementLevelForSlots(
  desiredSlots: number
): number | null {
  const mapping = ATTUNEMENT_SLOT_MAPPING.find((m) => m.slots === desiredSlots);
  return mapping ? mapping.attunementLevel : null;
}

/**
 * Check if the current attunement level is at a slot breakpoint
 * @param attunementLevel - The current attunement stat level
 * @returns True if the level grants a new slot
 */
export function isAttunementSlotBreakpoint(attunementLevel: number): boolean {
  return ATTUNEMENT_SLOT_MAPPING.some(
    (m) => m.attunementLevel === attunementLevel
  );
}

/**
 * Get all attunement slot breakpoints
 * @returns Array of attunement levels that grant new slots
 */
export function getAttunementSlotBreakpoints(): number[] {
  return ATTUNEMENT_SLOT_MAPPING.map((m) => m.attunementLevel);
}
