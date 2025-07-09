// Quest data for Dark Souls 1
// This file contains all NPC questlines with their requirements and rewards

import type {
  QuestState,
  QuestCategory,
  AllQuests,
} from "~/types/game/ds1/quests";

// Siegmeyer of Catarina Questline
const siegmeyerQuest: QuestState = {
  id: "siegmeyer-of-catarina",
  name: "Siegmeyer of Catarina",
  description: "Help the onion knight throughout his journey",
  npcName: "Siegmeyer of Catarina",
  npcLocation: "Sen's Fortress",
  status: "not-started",
  order: 1,
  requirements: [
    {
      id: "meet-siegmeyer-sens",
      name: "Meet Siegmeyer in front of Sen's Fortress",
      description: "Exhaust his dialogue.",
      type: "step",
      optional: true,
      isCompleted: false,
      location: "Sen's Fortress, in front of the main gate.",
      order: 1,
    },
    {
      id: "help-siegmeyer-sens",
      name: "Help Siegmeyer in Sen's Fortress",
      description:
        "Exhaust his dialogue and redirect the rolling boulders away from the slope nearest to him.",
      type: "step",
      isCompleted: false,
      location:
        "Sitting at the edge of a cliff, down from where the first rolling boulders are encountered, near the Shotel.",
      prerequisites: ["meet-siegmeyer-sens"],
      order: 2,
    },
    {
      id: "help-siegmeyer-anor-londo",
      name: "Help Siegmeyer in Anor Londo",
      description:
        "Exhaust his dialogue, kill all three Silver Knights in the room in front of him, then exhaust his dialogue again.",
      type: "step",
      isCompleted: false,
      location:
        "When you reach the high courtyard with a Silver Knight (sword) and a Silver Knight (greatbow), go through the doorway guarded by the Silver Knight (sword). He will be standing in front of the window.",
      prerequisites: ["help-siegmeyer-sens"],
      rewards: ["Tiny Being's Ring"],
      order: 3,
    },
    {
      id: "meet-siegmeyer-firelink",
      name: "Meet Siegmeyer at Firelink Shrine",
      description:
        "He will ask you if you were the undead who opened the gates at Sen's Fortress, answer yes then exhaust his dialogue.",
      type: "step",
      isCompleted: false,
      location: "Firelink Shrine",
      prerequisites: ["help-siegmeyer-anor-londo"],
      order: 4,
    },
    {
      id: "help-siegmeyer-blighttown",
      name: "Help Siegmeyer in Blighttown",
      description:
        "Talk to him to wake him up. He'll ask for some moss clumps. Say yes to give him 3 Purple Moss Clumps.",
      type: "step",
      isCompleted: false,
      location:
        "In the swamp, near the entrance to the area with the Server and lots of Giant Leeches.",
      prerequisites: ["help-siegmeyer-anor-londo"],
      rewards: ["Pierce Shield"],
      order: 5,
    },
    {
      id: "help-sieglinde-of-catarina",
      name: "Help Sieglinde of Catarina",
      description:
        "Kill the Golden Crystal Golem to free her, and talk to her. Choose either answer.",
      type: "step",
      isCompleted: false,
      location:
        "Her Golden Crystal Golem is in the middle of the garden in front of Crystal Cave's entrance, the garden with lots of other Crystal Golems.",
      prerequisites: ["meet-siegmeyer-firelink"],
      order: 6,
    },
    {
      id: "meet-sieglinde-firelink-one",
      name: "Meet Sieglinde at Firelink Shrine",
      description:
        "Speak with her. She will again ask if you have seen her father, reply yes.",
      type: "step",
      isCompleted: false,
      location: "Firelink Shrine",
      prerequisites: ["help-sieglinde-of-catarina"],
      order: 7,
    },
    {
      id: "help-siegmeyer-lost-izalith",
      name: "Help Siegmeyer in Lost Izalith",
      description:
        "Talk to him to trigger an event where he rushes down the hole to kill the Chaos Eaters.",
      type: "step",
      isCompleted: false,
      location:
        "In front of the Demon Ruins shortcut, down from where you fight Kirk and the Daughter of Chaos, there's an area with a crumbling floor. Walk around the back to see Siegmeyer overlooking a large hole with four Chaos Eaters below.",
      prerequisites: ["help-siegmeyer-blighttown"],
      failConditions: [
        "If the four Chaos Eaters are defeated before Siegmeyer leaps down, he will give you the Speckled Stoneplate Ring and his story will not continue.",
        "If he survives the fight with less than 50% health, he appears to die from poison and drops the Speckled Stoneplate Ring and Humanity x3.",
      ],
      successConditions: [
        "If he survives the fight with equal or more than 50% health",
      ],
      order: 8,
    },
    {
      id: "meet-sieglinde-firelink-two",
      name: "Meet Sieglinde at Firelink Shrine",
      description:
        "Speak with her. She will tell you that she has found her father and that he went off to one last adventure.",
      type: "step",
      isCompleted: false,
      location: "Firelink Shrine",
      prerequisites: ["help-sieglinde-of-catarina"],
      order: 9,
    },
    {
      id: "meet-sieglinde-ash-lake",
      name: "Meet Sieglinde at Ash Lake",
      description: "Exhaust her dialogue.",
      type: "step",
      isCompleted: false,
      location: "She and Siegmeyer will be near the first bonfire.",
      prerequisites: ["help-siegmeyer-lost-izalith"],
      rewards: ["Titanite Slab"],
      order: 10,
    },
  ],
  rewards: [
    {
      id: "tiny-beings-ring",
      name: "Tiny Being's Ring",
      type: "ring",
      description: "Increases maximum hit points by 5%",
      isObtained: false,
      prerequisites: ["help-siegmeyer-anor-londo"],
    },
    {
      id: "emit-force",
      name: "Emit Force",
      type: "miracle",
      description:
        "Fires an orb of force that creates a shockwave on impact that causes damage, and can knock down or stun enemies.",
      isObtained: false,
      prerequisites: ["meet-siegmeyer-firelink"],
    },
    {
      id: "pierce-shield",
      name: "Pierce Shield",
      type: "shield",
      description: "Shield from the Catarina set",
      isObtained: false,
      prerequisites: ["help-siegmeyer-blighttown"],
    },
    {
      id: "speckled-stoneplate-ring",
      name: "Speckled Stoneplate Ring",
      type: "ring",
      description: "Boosts your Magic, Fire, and Lightning defense by 25 each.",
      isObtained: false,
      prerequisites: [
        "help-siegmeyer-lost-izalith",
        "Kill Siegmeyer",
        "Fail Siegmeyer's quest in the Lost Izalith",
      ],
    },
    {
      id: "titanite-slab",
      name: "Titanite Slab",
      type: "upgrade material",
      description: "Rare upgrade material.",
      isObtained: false,
      prerequisites: ["meet-sieglinde-firelink-two"],
    },
  ],
  failConditions: ["Siegmeyer or Sieglinde dies"],
  isExpanded: false,
};

// Solaire of Astora Questline
const solaireQuest: QuestState = {
  id: "solaire-of-astora",
  name: "Solaire of Astora",
  description: "Help the warrior of sunlight find his sun",
  npcName: "Solaire of Astora",
  npcLocation: "Undead Burg",
  status: "not-started",
  order: 2,
  requirements: [
    {
      id: "meet-solaire-burg",
      name: "Meet Solaire in Undead Burg",
      description:
        "Talk to him at the bridge and accept his offer in order to get a White Sign Soapstone for online multiplayer play",
      type: "step",
      isCompleted: false,
      location:
        "He is in the area at the opposite end of the bridge on which the Hellkite Dragon is perched.",
      rewards: ["White Sign Soapstone"],
      order: 1,
    },
    {
      id: "meet-solaire-anor-londo",
      name: "Meet Solaire in Anor Londo",
      description: "Exhaust his dialogue",
      type: "step",
      isCompleted: false,
      location:
        "You'll find him next to the first bonfire after the two Silver Knight archers",
      prerequisites: ["meet-solaire-burg"],
      order: 2,
    },
    {
      id: "meet-solaire-sunlight-altar",
      name: "Meet Solaire at the Sunlight Altar",
      description: "Exhaust his dialogue",
      type: "step",
      isCompleted: false,
      optional: true,
      location:
        "The Sunlight Altar in the Undead Berg, near the Hellkite Dragon",
      prerequisites: ["meet-solaire-anor-londo"],
      order: 3,
    },
    {
      id: "meet-solaire-before-lost-izalith",
      name: "Meet Solaire before Lost Izalith",
      description: "Exhaust his dialogue",
      type: "step",
      isCompleted: false,
      optional: true,
      location:
        "After the Centipede Demon boss fight, Solaire can be found in Demon Ruins, sitting near the bonfire after the boss room.",
      prerequisites: ["meet-solaire-anor-londo"],
      failConditions: [
        "Entering Lost Izalith here will make Solaire attack you in front of the Bed of Chaos boss fog if the red-eyed chaos bug is still alive.",
      ],
      order: 4,
    },
    {
      id: "activate-shortcut-to-lost-izalith",
      name: "Activate Shortcut to Lost Izalith",
      description:
        "In order to open this doorway, you must be a Chaos Servant +2 (costs 30 Humanity) and then must touch the door itself.",
      type: "fail-point",
      isCompleted: false,
      location:
        "This shortcut can be found right before the Demon Firesage boss room by climbing down some large roots you can access through the large hole in the wall.",
      order: 5,
    },
    {
      id: "save-solaire-maggot",
      name: "Save Solaire from the Sunlight Maggot",
      description:
        "There are nine Chaos Bugs in the shortcut area: eight normal, respawning ones, and one with glowing red-eyes. Kill the one with glowing red-eyes.",
      type: "fail-point",
      isCompleted: false,
      location: "Lost Izalith shortcut",
      prerequisites: ["activate-shortcut-to-lost-izalith"],
      order: 6,
    },
  ],
  failConditions: [
    "Killing Solaire at any point",
    "Not preventing solaire from going insane",
    "killing The Fair Lady before you activate the shortcut to the Lost Izalith",
  ],
  isExpanded: false,
  rewards: [
    {
      id: "white-soapstone",
      name: "White Soapstone",
      type: "item",
      description:
        "Creates a white soul sign that another player can use to summon you into their world for cooperative play.",
      isObtained: false,
    },
  ],
};

// Reah of Thorolund Questline
const reahQuest: QuestState = {
  id: "reah-of-thorolund",
  name: "Reah of Thorolund",
  description: "Help the cleric and her companions",
  npcName: "Reah of Thorolund",
  npcLocation: "Firelink Shrine",
  status: "not-started",
  order: 5,
  requirements: [
    {
      id: "meet-reah-firelink",
      name: "Meet Reah at Firelink Shrine",
      description: "Speak with Reah or defeat Pinwheel.",
      type: "step",
      isCompleted: false,
      location: "Undead Parish, church",
      prerequisites: ["Defeating Capra Demon"],
      order: 1,
    },
    {
      id: "meet-reah-tomb",
      name: "Meet Reah in Tomb of the Giants",
      description:
        "She requests you to free her friends. After killing them, talk to her, and she will give you the Replenishment Miracle.",
      type: "step",
      isCompleted: false,
      location: "She lies in the pit which Patches kicks you down.",
      prerequisites: ["meet-reah-firelink"],
      rewards: ["Replenishment"],
      order: 2,
    },
    {
      id: "meet-reah-parish",
      name: "Meet Reah at the Undead Parish church",
      description:
        "Buy all of her miracles and divine blessing or kill Petrus.",
      type: "step",
      isCompleted: false,
      location: "Undead Parish, church",
      prerequisites: ["meet-reah-tomb"],
      failConditions: [
        "Defeating two bosses before either killing Petrus or buying all of her miracles and divine blessing",
      ],
      order: 3,
    },
    {
      id: "meet-reah-dukes-archives",
      name: "Meet Hollowed Reah in the Duke's Archives",
      description:
        "If you purchase all of her miracles before she dies, a Channeler kidnaps her, and she can be found Hollowed in a cell of the prison tower. Her cell door requires the Archive Tower Extra Key.",
      type: "step",
      isCompleted: false,
      location: "She lies in the pit which Patches kicks you down.",
      prerequisites: ["meet-reah-parish"],
      order: 4,
    },
  ],
  rewards: [
    {
      id: "replenishment",
      name: "Replenishment",
      type: "miracle",
      description: "A miracle that gradually restores HP",
      isObtained: false,
    },
  ],
  failConditions: [
    "Killing Reah at any point",
    "Not saving Reah from Petrus or buying all of her miracles and divine blessing",
  ],
  isExpanded: false,
};

// Knight Lautrec Questline
const lautrecQuest: QuestState = {
  id: "knight-lautrec",
  name: "Knight Lautrec",
  description: "Help Knight Lautrec throughout his journey",
  npcName: "Knight Lautrec",
  npcLocation: "Undead Parish",
  status: "not-started",
  order: 4,
  requirements: [
    {
      id: "help-lautrec-parish",
      name: "Help Lautrec in Undead Parish",
      description:
        "Open his cell and exhaust his dialogue. The cell can be opened using the Mystery Key or a Master Key.",
      type: "step",
      isCompleted: false,
      optional: true,
      location:
        "Locked in a cell located on the upper floor of the church. Before climbing the ladder that leads to the Bell Gargoyles, continue counter-clockwise around the top floor. After fighting a Balder Knight, there is a broken door that can be smashed, revealing a staircase. Go up the stairs to find Lautrec's cell.",
      order: 1,
    },
    {
      id: "meet-lautrec-firelink",
      name: "Meet Lautrec at Firelink Shrine",
      description: "Exhaust his dialogue.",
      type: "step",
      isCompleted: false,
      location: "Sitting opposite of Firekeeper Anastacia of Astora.",
      prerequisites: ["help-lautrec-parish", "Defeat the Bell Gargoyles"],
      rewards: ["Sunlight Medal"],
      order: 2,
    },
    {
      id: "lautrec-kills-firekeeper",
      name: "Lautrec Kills Firekeeper Anastacia of Astora",
      description: "Lautrec kills Anastacia of Astora.",
      type: "step",
      isCompleted: false,
      location: "Below Firelink Shrine",
      prerequisites: [
        "Ring both bells of awakening or collect the Undead Parish and Blighttown Firekeeper Souls",
      ],
      rewards: ["Black Eye Orb", "Dingy Set"],
      order: 3,
    },
    {
      id: "invade-lautrec-anor-londo",
      name: "Invade Lautrec in Anor Londo",
      description: "Invade using the Black Eye Orb and defeat him",
      type: "step",
      isCompleted: false,
      location: "Grand hall outside of the Ornstein and Smough boss room.",
      prerequisites: ["lautrec-kills-firekeeper"],
      order: 4,
    },
    {
      id: "return-fire-keeper-soul",
      name: "Return Firekeeper Soul",
      description: "Return the Firekeeper Soul to Firelink Shrine",
      type: "step",
      isCompleted: false,
      location: "Below Firelink Shrine",
      prerequisites: ["invade-lautrec-anor-londo"],
      order: 4,
    },
  ],
  rewards: [
    {
      id: "sunlight-medal",
      name: "Sunlight Medal",
      type: "item",
      description:
        "Given to the Altar of Sunlight in order to rank up in the Warrior of Sunlight Covenant",
      isObtained: false,
    },
    {
      id: "dingy-set",
      name: "Dingy Set",
      type: "armor set",
      description: "Fire Keeper Anastacia of Astora's set",
      isObtained: false,
    },
    {
      id: "black-eye-orb",
      name: "Black Eye Orb",
      type: "item",
      description: "An item that enables you to invade Lautrec in Anor Londo",
      isObtained: false,
    },
  ],
  failConditions: ["Lautrec is killed at any point"],
  isExpanded: false,
};

// Patches the Hyena Questline
const patchesQuest: QuestState = {
  id: "patches-the-hyena",
  name: "Patches the Hyena",
  description: "Help Patches the Hyena throughout his journey",
  npcName: "Patches the Hyena",
  npcLocation: "The Catacombs",
  status: "not-started",
  order: 5,
  requirements: [
    {
      id: "meet-patches-catacombs",
      name: "Meet Patches in The Catacombs",
      description:
        "He may try to flip the bridge the first time you walk across it. If you said 'Yes' that you are a cleric, the next time you talk to him, he becomes hostile. If you said 'no' that you are not a cleric, the next time you talk to him, he asks if his trickery caused you any trouble. If you answer 'Yes', he gives you a Humanity. Any other response nets you nothing.",
      type: "step",
      isCompleted: false,
      optional: true,
      location: "He stands next to the lever of the second spiked bridge.",
      prerequisites: [
        "Reah of Thorolund and her company has not moved to the Catacombs",
        "Pinwheel is alive",
      ],
      rewards: ["Humanity"],
      order: 1,
    },
    {
      id: "meet-patches-tomb",
      name: "Meet Patches in The Tomb of the Giants",
      description:
        "If you have not talked to him in the Catacombs, he will ask if you are a Cleric. He points to treasure visible from his position, and if you walk towards the ledge to take a closer look, he will kick you down into the pit. If you said 'yes' that you are a cleric, the next time you talk to him, he becomes hostile. If you said 'No' that you are not a cleric, the next time you talk to him, he asks for your forgiveness. If you answer 'No', he gives you a Twin Humanities. If you do choose to forgive him by saying 'Yes', he will deploy prism stones further along the passage that highlights the route to a hidden bonfire.",
      type: "step",
      isCompleted: false,
      location: "Standing above a pit near the first bonfire.",
      rewards: ["Twin Humanities"],
      order: 2,
    },
    {
      id: "meet-patches-firelink",
      name: "Meet Patches at Firelink Shrine",
      description: "Acts as a new merchant.",
      type: "step",
      isCompleted: false,
      location:
        "He squats down by a wall closest to the Catacombs after you have killed Gravelord Nito",
      order: 3,
    },
  ],
  rewards: [
    {
      id: "humanity",
      name: "Humanity",
      type: "item",
      isObtained: false,
    },
    {
      id: "twin-humanities",
      name: "Twin Humanities",
      type: "item",
      isObtained: false,
    },
  ],
  failConditions: [
    "Killing Patches at any point",
    "Telling Patches that you're a cleric",
  ],
  isExpanded: false,
};

// Big Hat Logan's Questline
const logansQuest: QuestState = {
  id: "logans",
  name: "Big Hat Logan",
  description: "Help Big Hat Logan on his journey",
  npcName: "Big Hat Logan",
  npcLocation: "Sen's Fortress",
  status: "not-started",
  order: 6,
  requirements: [
    {
      id: "help-logans-sens",
      name: "Help Big Hat Logan in Sen's Fortress",
      description:
        "Open his cell with either the Cage Key or the Master Key. Exhaust his dialogue.",
      type: "step",
      isCompleted: false,
      location:
        "In a hidden area behind a sleeping Serpent Soldier. You need to adjust the boulder dispatch machine so that it will smash the wall with the Serpent Soldier leaning against it.",
      order: 1,
    },
    {
      id: "meet-logan-firelink",
      name: "Meet Big Hat Logan at Firelink Shrine",
      description: "Exhaust his dialogue",
      type: "step",
      isCompleted: false,
      location: "Firelink Shrine",
      prerequisites: ["help-logans-sens", "15+ Intelligence"],
      order: 2,
    },
    {
      id: "help-logan-dukes-archives",
      name: "Help Big Hat Logan in the Duke's Archives",
      description:
        "Unlock his cell and exhaust his dialogue. You'll need to get the Archive Tower Giant Cell Key to unlock the cell, it's located behind the removable bookshelves leading to the Crystal Caves, right after the second bonfire. It's in the treasure chest closest to the lever that opens the descending staircase.",
      type: "step",
      isCompleted: false,
      location:
        "He is trapped behind bars in the lower level of the prison area you reach after your first encounter with Seath the Scaleless, guarded by several Pisacas.",
      prerequisites: ["meet-logan-firelink"],
      order: 3,
    },
    {
      id: "meet-logan-dukes-archives-one",
      name: "Meet Big Hat Logan in the Duke's Archives 1",
      description:
        "Defeat Seath the Scaleless and buy all of his sorceries, talk to him several times, and you'll notice that he's clearly gone mad.",
      type: "step",
      isCompleted: false,
      location:
        "In a small room with the chest containing a Blue Titanite Chunk. The room entrance is near the tall ladder and the shortcut lever.",
      prerequisites: ["help-logan-dukes-archives"],
      order: 4,
    },
    {
      id: "meet-logan-dukes-archives-two",
      name: "Meet Big Hat Logan in the Duke's Archives 2",
      description:
        "Defeat him and he'll drop the Big Hat, his Tin Crystallization Catalyst, and the White Dragon Breath spell. Also go back to the area where he was before, where he sells his spells, as there is a new chest containing the rest of his armor set, the Big Hat's set, and Logan's Catalyst.",
      type: "step",
      isCompleted: false,
      location: "Seath the Scaleless' first encounter room",
      prerequisites: ["meet-logan-dukes-archives-one"],
      rewards: [
        "Big Hat",
        "Tin Crystallization Catalyst",
        "White Dragon Breath",
        "Logan's Catalyst",
        "Big Hat's Set",
      ],
      order: 5,
    },
  ],
  failConditions: [
    "Killing Big Hat Logan at any point",
    "Not buying all of his sorceries in The Duke's Archives",
  ],
  isExpanded: false,
  rewards: [
    {
      id: "big-hat",
      name: "Big Hat",
      type: "armor",
      description: "Big Hat Logan's set",
      isObtained: false,
      location: "Seath the Scaleless' first encounter room",
    },
    {
      id: "tin-crystallization-catalyst",
      name: "Tin Crystallization Catalyst",
      type: "catalyst",
      description: "Halves your sorceries. 315 Magic Adjustment",
      isObtained: false,
      location: "Seath the Scaleless' first encounter room",
    },
    {
      id: "white-dragon-breath",
      name: "White Dragon Breath",
      type: "sorcery",
      description:
        "Fires laser in viewing direction, but angled downward. Will spawn crystal spikes that follow the terrain along its direction, even after hitting the ground.",
      isObtained: false,
      location: "Seath the Scaleless' first encounter room",
    },
    {
      id: "logans-catalyst",
      name: "Logan's Catalyst",
      type: "catalyst",
      description: "250 Magic Adjustment",
      isObtained: false,
      location:
        "In a small room with the chest containing a Blue Titanite Chunk. The room entrance is near the tall ladder and the shortcut lever.",
    },
    {
      id: "big-hats-set",
      name: "Big Hat's Set",
      type: "armor set",
      description: "Big Hat Logan's set",
      isObtained: false,
      location:
        "In a small room with the chest containing a Blue Titanite Chunk. The room entrance is near the tall ladder and the shortcut lever.",
    },
  ],
};

// Dusk of Oolacile's Questline
const duskQuest: QuestState = {
  id: "dusk",
  name: "Dusk of Oolacile",
  description: "Help Dusk of Oolacile on her journey",
  npcName: "Dusk of Oolacile",
  npcLocation: "Darkroot Basin",
  status: "not-started",
  order: 7,
  requirements: [
    {
      id: "kill-hydra",
      name: "Kill the Hydra",
      description: "Kill the Hydra in the Darkroot Basin.",
      type: "step",
      isCompleted: false,
      location: "Darkroot Basin lake",
      order: 1,
    },
    {
      id: "kill-golden-crystal-golem",
      name: "Kill the Golden Crystal Golem",
      description: "Kill the Golden Crystal Golem in the Darkroot Basin.",
      type: "step",
      isCompleted: false,
      location:
        "Travel along the lake by the waterfall all the way back to the alcove.",
      order: 2,
      prerequisites: ["kill-hydra"],
    },
    {
      id: "meet-dusk-darkroot",
      name: "Meet Dusk of Oolacile in Darkroot Basin",
      description:
        "Dusk will thank you for freeing her and asks you if you need her magic. Answer 'Yes' and she will tell you that you can summon her to buy magic spells from her.",
      type: "step",
      isCompleted: false,
      location:
        "Travel along the lake by the waterfall all the way back to the alcove.",
      order: 3,
      prerequisites: ["kill-golden-crystal-golem"],
    },
    {
      id: "summon-dusk-darkroot",
      name: "Summon Dusk of Oolacile in Darkroot Basin",
      description: "Summon Dusk and exhaust her dialogue.",
      type: "step",
      isCompleted: false,
      location:
        "Her summon sign is right at the edge of the lake where the Hydra was located, a few feet away from the corpse holding the Knight Set",
      order: 4,
      rewards: ["Antiquated Armor Set"],
      prerequisites: ["meet-dusk-darkroot"],
    },
    {
      id: "meet-dusk-chasm",
      name: "Meet Dusk of Oolacile in the Chasm",
      description: "Exhaust her dialogue.",
      type: "step",
      isCompleted: false,
      location:
        "She appears in the bossroom after defeating Manus, Father of the Abyss",
      order: 4,
      prerequisites: ["Defeat Manus, Father of the Abyss"],
    },
  ],
  failConditions: [
    "Killing Big Hat Logan at any point",
    "Not buying all of his sorceries in The Duke's Archives",
  ],
  isExpanded: false,
  rewards: [
    {
      id: "antiquated-armor-set",
      name: "Antiquated Armor Set",
      type: "armor set",
      description: "Dusk of Oolacile's set",
      isObtained: false,
      location:
        "After being summoned for the first time, travel along the lake by the waterfall all the way back to the alcove.",
    },
  ],
};

// Dusk of Oolacile's Questline
const kirkQuest: QuestState = {
  id: "kirk",
  name: "Kirk, Knight of Thorns",
  description: "Defeat invader Kirk, Knight of Thorns three times",
  npcName: "Kirk, Knight of Thorns",
  npcLocation: "The Depths",
  status: "not-started",
  order: 8,
  requirements: [
    {
      id: "defeat-depths",
      name: "Defeat him in The Depths",
      description: "Kirk will invade you in The Depths, defeat him.",
      type: "step",
      isCompleted: false,
      location:
        "Once you have reached the bottom of the sewers from the water fall drop you will see him invade. This should be directly next to the basilisk area.",
      order: 1,
      prerequisites: [
        "defeat-depths",
        "Must be in Human form",
        "Must not have defeated the area boss",
      ],
    },
    {
      id: "defeat-demon-ruins",
      name: "Defeat him in the Demon ruins",
      description: "Kirk will invade you in the Demon ruins, defeat him.",
      type: "step",
      isCompleted: false,
      location:
        "You will find him after defeating the Ceaseless Discharge.  Make your way to the now cooled lava ground, continue to the next area. You will go down some stairs on the side of a cliff and as you do this he will invade.",
      order: 2,
      prerequisites: [
        "defeat-depths",
        "Must be in Human form",
        "Must not have defeated the area boss",
        "Must have placed the Lordvessel on the Firelink Altar",
      ],
    },
    {
      id: "defeat-lost-izalith",
      name: "Defeat him in Lost Izalith",
      description: "Kirk will invade you in Lost Izalith, defeat him.",
      type: "step",
      isCompleted: false,
      location:
        "You will find him just outside the doorway to the Bed of Chaos boss, where you fight the Daughter of Chaos.",
      order: 3,
      prerequisites: [
        "defeat-demon-ruins",
        "Must be in Human form",
        "Must not have defeated the area boss",
      ],
    },
    {
      id: "loot-set-of-thorns",
      name: "Loot the Set of Thorns",
      description: "Go to Kirk's corpse and loot his Set of Thorns.",
      type: "step",
      isCompleted: false,
      location:
        "His corpse can be found in the back of the Daughter of Chaos bonfire chamber in Quelaag's Domain.",
      order: 4,
      prerequisites: ["defeat-lost-izalith"],
    },
  ],
  failConditions: ["Not defeating him in all three unqiue locations"],
  isExpanded: false,
  rewards: [
    {
      id: "set-of-thorns",
      name: "Set of Thorns",
      type: "armor set",
      description: "Kirk, Knight of Thorns armor set",
      isObtained: false,
      location:
        "On his corpse which can be found in the back of the Daughter of Chaos bonfire chamber in Quelaag's Domain.",
    },
    {
      id: "barbed-straight-sword",
      name: "Barbed Straight Sword",
      type: "weapon",
      description: "Kirk, Knight of Thorns weapon",
      isObtained: false,
      location:
        "Possible drop from Kirk after defeating him at any of the three invasion locations.",
    },
    {
      id: "spiked-shield",
      name: "Spiked Shield",
      type: "shield",
      description: "Kirk, Knight of Thorns shield",
      isObtained: false,
      location:
        "Possible drop from Kirk after defeating him at any of the three invasion locations.",
    },
  ],
};

// Quest data organized by category
const questData: AllQuests = {
  "main-quest": [siegmeyerQuest, solaireQuest],
  "side-quest": [
    lautrecQuest,
    reahQuest,
    patchesQuest,
    duskQuest,
    logansQuest,
    kirkQuest,
  ],
  covenant: [],
  optional: [],
  secret: [],
};

// Get all quests
export const getAllQuests = (): AllQuests => questData;

// Get quests by category
export const getQuestsByCategory = (category: QuestCategory): QuestState[] => {
  return questData[category] || [];
};

// Get quest by ID
export const getQuestById = (id: string): QuestState | null => {
  for (const category of Object.values(questData)) {
    const quest = category.find((q) => q.id === id);
    if (quest) return quest;
  }
  return null;
};

// Get quests by NPC name
export const getQuestsByNpcName = (npcName: string): QuestState[] => {
  const quests: QuestState[] = [];
  for (const category of Object.values(questData)) {
    quests.push(...category.filter((q) => q.npcName === npcName));
  }
  return quests;
};

// Get quests by status
export const getQuestsByStatus = (
  status: QuestState["status"]
): QuestState[] => {
  const quests: QuestState[] = [];
  for (const category of Object.values(questData)) {
    quests.push(...category.filter((q) => q.status === status));
  }
  return quests;
};

// Get quest categories
export const getQuestCategories = (): QuestCategory[] => {
  return Object.keys(questData) as QuestCategory[];
};

// Search quests
export const searchQuests = (query: string): QuestState[] => {
  const quests: QuestState[] = [];
  const lowerQuery = query.toLowerCase();

  for (const category of Object.values(questData)) {
    quests.push(
      ...category.filter(
        (q) =>
          q.name.toLowerCase().includes(lowerQuery) ||
          q.npcName.toLowerCase().includes(lowerQuery) ||
          q.description.toLowerCase().includes(lowerQuery)
      )
    );
  }

  return quests;
};

// Get quest progress
export const getQuestProgress = (
  questId: string,
  completedRequirements: string[]
): { completed: number; total: number; percentage: number } => {
  const quest = getQuestById(questId);
  if (!quest) return { completed: 0, total: 0, percentage: 0 };

  const total = quest.requirements.length;
  const completed = quest.requirements.filter((req) =>
    completedRequirements.includes(req.id)
  ).length;

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
};
