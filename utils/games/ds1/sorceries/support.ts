import type { Sorcery } from "~/types/game/ds1/sorceries";

export const support: Sorcery[] = [
  {
    icon: "/sorceries/utility/fall-control.png",
    name: "Fall Control",
    sorceryType: "support",
    uses: 10,
    requirements: {
      intelligence: 15,
      attunement: 1,
    },
    attunementSlots: 1,
    effect: {
      buff: "fall_damage_reduction",
      duration: 60,
    },
    description: "Reduces fall damage for a short time.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/magic-weapon/magic-shield.png",
    name: "Magic Shield",
    sorceryType: "support",
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
    sorceryType: "support",
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
  {
    icon: "/sorceries/utility/hush.png",
    name: "Hush",
    sorceryType: "support",
    uses: 6,
    requirements: {
      intelligence: 15,
    },
    attunementSlots: 1,
    effect: {
      buff: "silent_movement",
      duration: 60,
    },
    description: "Makes your movement silent, allowing stealth.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/utility/hidden-body.png",
    name: "Hidden Body",
    sorceryType: "support",
    uses: 3,
    requirements: {
      intelligence: 14,
    },
    attunementSlots: 1,
    effect: {
      buff: "invisibility",
      duration: 60,
    },
    description: "Makes you nearly invisible to enemies.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/utility/hidden-weapon.png",
    name: "Hidden Weapon",
    sorceryType: "support",
    uses: 3,
    requirements: {
      intelligence: 14,
    },
    attunementSlots: 1,
    effect: {
      buff: "weapon_invisibility",
      duration: 60,
    },
    description: "Makes your weapon invisible to other players.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/utility/repair.png",
    name: "Repair",
    sorceryType: "support",
    uses: 1,
    requirements: {
      intelligence: 14,
    },
    attunementSlots: 1,
    effect: {
      buff: "repair_equipment",
      duration: 0,
    },
    description: "Repairs your equipped weapons and armor.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/utility/cast-light.png",
    name: "Cast Light",
    sorceryType: "support",
    uses: 3,
    requirements: {
      intelligence: 14,
    },
    attunementSlots: 1,
    effect: {
      buff: "light_source",
      duration: 300,
    },
    description: "Creates a light source around the caster.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/utility/aural-decoy.png",
    name: "Aural Decoy",
    sorceryType: "support",
    uses: 20,
    requirements: {
      intelligence: 10,
    },
    attunementSlots: 1,
    effect: {
      buff: "sound_decoy",
      duration: 30,
      range: 20,
    },
    description: "Creates a sound that attracts enemy attention.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/special/chameleon.png",
    name: "Chameleon",
    sorceryType: "support",
    uses: 11,
    requirements: {
      intelligence: 14,
    },
    attunementSlots: 1,
    effect: {
      buff: "disguise",
      duration: 300,
    },
    description:
      "Transforms you into an object to hide from enemies and players.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/utility/resist-curse.png",
    name: "Resist Curse",
    sorceryType: "support",
    uses: 4,
    requirements: {
      intelligence: 16,
    },
    attunementSlots: 1,
    effect: {
      buff: "resist_curse",
      duration: 30,
    },
    description: "Resists the effects of curses.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
  {
    icon: "/sorceries/utility/remedy.png",
    name: "Remedy",
    sorceryType: "support",
    uses: 4,
    requirements: {
      intelligence: 16,
    },
    attunementSlots: 1,
    effect: {
      buff: "remedy",
      duration: 30,
    },
    description: "Removes all negative effects from the caster.",
    location: "Griggs of Vinheim in Lower Undead Burg",
  },
];
