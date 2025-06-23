import type { Sorcery } from "~/types/game/ds1/sorceries";

export const magicWeapon: Sorcery[] = [
  {
    icon: "/sorceries/magic-weapon/magic-weapon.png",
    name: "Magic Weapon",
    sorceryType: "magic-weapon",
    uses: 5,
    requirements: {
      intelligence: 10,
    },
    attunementSlots: 1,
    effect: {
      buff: "magic_weapon",
      duration: 60,
    },
    description: "Temporarily imbues your weapon with magic damage.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/magic-weapon/great-magic-weapon.png",
    name: "Great Magic Weapon",
    sorceryType: "magic-weapon",
    uses: 3,
    requirements: {
      intelligence: 15,
    },
    attunementSlots: 1,
    effect: {
      buff: "magic_weapon",
      duration: 90,
    },
    description: "Enhanced version of Magic Weapon with longer duration.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/magic-weapon/crystal-magic-weapon.png",
    name: "Crystal Magic Weapon",
    sorceryType: "magic-weapon",
    uses: 3,
    requirements: {
      intelligence: 25,
    },
    attunementSlots: 1,
    effect: {
      buff: "magic_weapon",
      duration: 120,
    },
    description: "Crystal version of Magic Weapon with maximum duration.",
    location: "Big Hat Logan in The Duke's Archives",
  },
  {
    icon: "/sorceries/magic-weapon/magic-shield.png",
    name: "Magic Shield",
    sorceryType: "magic-weapon",
    uses: 5,
    requirements: {
      intelligence: 10,
    },
    attunementSlots: 1,
    effect: {
      buff: "magic_shield",
      duration: 60,
    },
    description: "Temporarily increases your shield's magic defense.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/magic-weapon/strong-magic-shield.png",
    name: "Strong Magic Shield",
    sorceryType: "magic-weapon",
    uses: 3,
    requirements: {
      intelligence: 15,
    },
    attunementSlots: 1,
    effect: {
      buff: "magic_shield",
      duration: 90,
    },
    description: "Enhanced version of Magic Shield with longer duration.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
];
