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

// Cache for available games to avoid repeated dynamic imports
let availableGamesCache: GameId[] | null = null;

// Get game metadata by ID
export function getGameMetadata(gameId: GameId): GameMetadata {
  return GAMES[gameId];
}

/**
 * Dynamically discover available games by attempting to import their data modules
 * This allows for lazy loading of game data and prevents errors for unimplemented games
 */
export async function getAvailableGames(): Promise<GameId[]> {
  if (availableGamesCache) {
    return availableGamesCache;
  }

  const availableGames: GameId[] = [];

  // Try to import each game's data module
  for (const gameId of Object.keys(GAMES) as GameId[]) {
    try {
      await import(`./${gameId}/index`);
      availableGames.push(gameId);
    } catch (error) {
      // Game data module doesn't exist, skip it
      console.debug(`Game data module not found for ${gameId}:`, error);
    }
  }

  availableGamesCache = availableGames;
  return availableGames;
}

// Get all available game metadata
export async function getAvailableGameMetadata(): Promise<GameMetadata[]> {
  const availableGames = await getAvailableGames();
  return availableGames.map((id) => GAMES[id]);
}

/**
 * Check if a game is available (has a data module)
 * @param gameId - The game identifier to check
 * @returns Promise<boolean> - Whether the game data is available
 */
export async function isGameAvailable(gameId: GameId): Promise<boolean> {
  const availableGames = await getAvailableGames();
  return availableGames.includes(gameId);
}

/**
 * Get game data by ID (dynamic loading)
 * @param gameId - The game identifier
 * @returns Promise<GameData> - The complete game data
 * @throws Error if game is not supported
 */
export async function getGameData(gameId: GameId): Promise<GameData> {
  try {
    // Dynamic import based on game ID
    const gameModule = await import(`./${gameId}/index`);
    return gameModule.default;
  } catch (error) {
    throw new Error(`Game ${gameId} is not currently supported`);
  }
}

// Get all available game data
export async function getAllAvailableGameData(): Promise<GameData[]> {
  const availableGames = await getAvailableGames();
  const gameDataPromises = availableGames.map((game) => getGameData(game));
  return Promise.all(gameDataPromises);
}

// Clear the cache (useful for development when adding new games)
export function clearAvailableGamesCache(): void {
  availableGamesCache = null;
}

// Clear cache on module load to ensure fresh detection
clearAvailableGamesCache();

// Dark Souls: Remastered game data
export * from "./ds1";
