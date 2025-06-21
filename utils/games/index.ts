import type { GameId, GameData, GameMetadata } from "~/types/game";

// Game metadata for all supported games
// This serves as the registry of available games and their display information
export const GAMES: Record<GameId, GameMetadata> = {
  ds1: {
    id: "ds1",
    name: "Dark Souls",
    fullName: "Dark Souls: Remastered",
    shortName: "DS1",
    releaseYear: 2018,
    description:
      "The original Dark Souls experience, remastered for modern platforms",
    icon: "i-game-icons-sword-wound",
    color: "from-orange-500 to-red-600",
    isActive: true,
  },
  ds2: {
    id: "ds2",
    name: "Dark Souls II",
    fullName: "Dark Souls II: Scholar of the First Sin",
    shortName: "DS2",
    releaseYear: 2015,
    description: "The second installment in the Dark Souls series",
    icon: "i-game-icons-sword-wound",
    color: "from-blue-500 to-purple-600",
    isActive: false, // Not implemented yet
  },
  ds3: {
    id: "ds3",
    name: "Dark Souls III",
    fullName: "Dark Souls III",
    shortName: "DS3",
    releaseYear: 2016,
    description: "The final chapter in the Dark Souls trilogy",
    icon: "i-game-icons-sword-wound",
    color: "from-gray-500 to-black",
    isActive: false, // Not implemented yet
  },
  bb: {
    id: "bb",
    name: "Bloodborne",
    fullName: "Bloodborne",
    shortName: "BB",
    releaseYear: 2015,
    description: "A gothic action RPG from FromSoftware",
    icon: "i-game-icons-sword-wound",
    color: "from-red-800 to-black",
    isActive: false, // Not implemented yet
  },
  er: {
    id: "er",
    name: "Elden Ring",
    fullName: "Elden Ring",
    shortName: "ER",
    releaseYear: 2022,
    description: "An action RPG set in a vast open world",
    icon: "i-game-icons-sword-wound",
    color: "from-yellow-500 to-orange-600",
    isActive: false, // Not implemented yet
  },
};

// Static imports for available games
// This approach is more build-friendly and avoids dynamic import issues
import ds1GameData from "./ds1/index";

// Registry of available game data modules
const GAME_DATA_MODULES: Record<string, GameData> = {
  ds1: ds1GameData,
};

// Get game metadata by ID
export function getGameMetadata(gameId: GameId): GameMetadata {
  return GAMES[gameId];
}

/**
 * Get available games based on static imports
 * This avoids dynamic import issues during build
 */
export function getAvailableGames(): GameId[] {
  return Object.keys(GAME_DATA_MODULES) as GameId[];
}

// Get all available game metadata
export function getAvailableGameMetadata(): GameMetadata[] {
  const availableGames = getAvailableGames();
  return availableGames.map((id) => GAMES[id]);
}

/**
 * Check if a game is available (has a data module)
 * @param gameId - The game identifier to check
 * @returns boolean - Whether the game data is available
 */
export function isGameAvailable(gameId: GameId): boolean {
  const availableGames = getAvailableGames();
  return availableGames.includes(gameId);
}

/**
 * Get game data by ID (static loading)
 * @param gameId - The game identifier
 * @returns GameData - The complete game data
 * @throws Error if game is not supported
 */
export function getGameData(gameId: GameId): GameData {
  const gameData = GAME_DATA_MODULES[gameId];
  if (!gameData) {
    throw new Error(`Game ${gameId} is not currently supported`);
  }
  return gameData;
}

// Get all available game data
export function getAllAvailableGameData(): GameData[] {
  const availableGames = getAvailableGames();
  return availableGames.map((game) => getGameData(game));
}

// Dark Souls: Remastered game data
export * from "./ds1";
