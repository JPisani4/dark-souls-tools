import type { Miracle } from "~/types/game/ds1/miracles";

export const buff: Miracle[] = [
  {
    icon: "/miracles/buff/sunlight-blade.png",
    name: "Sunlight Blade",
    miracleType: "weapon buff",
    uses: 1,
    requirements: {
      faith: 30,
    },
    attunementSlots: 1,
    effect: {
      buff: "lightning_weapon",
      duration: 60,
    },
    description: "Temporarily imbues your weapon with lightning damage.",
    location: "Gwynevere in Anor Londo",
  },
  {
    icon: "/miracles/buff/darkmoon-blade.png",
    name: "Darkmoon Blade",
    miracleType: "weapon buff",
    uses: 1,
    requirements: {
      faith: 30,
    },
    attunementSlots: 1,
    effect: {
      buff: "magic_weapon",
      duration: 60,
    },
    description: "Temporarily imbues your weapon with magic damage.",
    location: "Blade of the Darkmoon covenant reward",
  },
];
