import type { Pyromancy } from "~/types/game/ds1/pyromancies";

const status: Pyromancy[] = [
  {
    icon: "/pyromancies/poison-mist.png",
    name: "Poison Mist",
    pyromancyType: "status",
    uses: 3,
    requirements: {},
    attunementSlots: 1,
    effect: {
      poisonDamage: 50,
      range: 8,
      area: 6,
      statusEffect: "poison",
    },
    description:
      "Breathe out a cloud of mist that gives Poison status to enemies who touch it",
    location: "Eingyi, Blighttown",
    type: "poison",
    affinity: "poison",
  },
  {
    icon: "/pyromancies/toxic-mist.png",
    name: "Toxic Mist",
    pyromancyType: "status",
    uses: 1,
    requirements: {},
    attunementSlots: 1,
    effect: {
      toxicDamage: 100,
      range: 8,
      area: 6,
      statusEffect: "toxic",
    },
    description:
      "Breathe out a cloud of mist that gives Toxic status to enemies who touch it",
    location: "Eingyi",
    type: "toxic",
    affinity: "toxic",
  },
  {
    icon: "/pyromancies/acid-surge.png",
    name: "Acid Surge",
    pyromancyType: "status",
    uses: 2,
    requirements: {},
    attunementSlots: 1,
    effect: {
      acidDamage: 30,
      range: 6,
      area: 4,
      weaponDegradation: true,
      armorDegradation: true,
      statusEffect: "acid",
    },
    description:
      "Breathe forth an acidic cloud that damages the weapons and armors of an enemy",
    location: "Painted World of Ariamis",
    type: "acid",
    affinity: "acid",
  },
];

export default status;
