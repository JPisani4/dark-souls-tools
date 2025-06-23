// Index for all Dark Souls 1 starting characters
import { warrior } from "./warrior";
import { knight } from "./knight";
import { wanderer } from "./wanderer";
import { thief } from "./thief";
import { bandit } from "./bandit";
import { hunter } from "./hunter";
import { sorcerer } from "./sorcerer";
import { pyromancer } from "./pyromancer";
import { cleric } from "./cleric";
import { deprived } from "./deprived";
import type {
  CharacterClass,
  StartingCharacter,
} from "~/types/game/ds1/characters";

export const characterData: Record<CharacterClass, StartingCharacter> = {
  warrior,
  knight,
  wanderer,
  thief,
  bandit,
  hunter,
  sorcerer,
  pyromancer,
  cleric,
  deprived,
};

export const allCharacters: StartingCharacter[] = Object.values(characterData);
