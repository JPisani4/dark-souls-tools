import { ref } from "vue";

export function useArmorExpansion() {
  // Expanded slots (e.g., head, chest, hands, legs)
  const expandedSlots = ref<string[]>([]);
  // Expanded categories per slot (e.g., light-armor, medium-armor, etc.)
  const expandedCategories = ref<Record<string, string[]>>({});
  // Expanded individual armor pieces
  const expandedArmor = ref<string[]>([]);
  // Expanded armor sets
  const expandedArmorSets = ref<string[]>([]);
  // Expanded set categories
  const expandedSetCategories = ref<string[]>([]);

  // Toggle slot expansion
  function toggleSlotExpansion(slot: string) {
    const idx = expandedSlots.value.indexOf(slot);
    if (idx > -1) expandedSlots.value.splice(idx, 1);
    else expandedSlots.value.push(slot);
  }

  // Toggle category expansion within a slot
  function toggleCategoryExpansion(slot: string, category: string) {
    const current = expandedCategories.value[slot] || [];
    const idx = current.indexOf(category);
    if (idx > -1) current.splice(idx, 1);
    else current.push(category);
    expandedCategories.value[slot] = [...current];
  }

  // Toggle individual armor expansion
  function toggleArmorExpansion(armorName: string) {
    const idx = expandedArmor.value.indexOf(armorName);
    if (idx > -1) expandedArmor.value.splice(idx, 1);
    else expandedArmor.value.push(armorName);
  }

  // Toggle armor set expansion
  function toggleArmorSetExpansion(armorSetName: string) {
    const idx = expandedArmorSets.value.indexOf(armorSetName);
    if (idx > -1) expandedArmorSets.value.splice(idx, 1);
    else expandedArmorSets.value.push(armorSetName);
  }

  // Toggle set category expansion
  function toggleSetCategoryExpansion(category: string) {
    const idx = expandedSetCategories.value.indexOf(category);
    if (idx > -1) expandedSetCategories.value.splice(idx, 1);
    else expandedSetCategories.value.push(category);
  }

  return {
    expandedSlots,
    expandedCategories,
    expandedArmor,
    expandedArmorSets,
    expandedSetCategories,
    toggleSlotExpansion,
    toggleCategoryExpansion,
    toggleArmorExpansion,
    toggleArmorSetExpansion,
    toggleSetCategoryExpansion,
  };
}
