import type { GameId } from "~/types/game";

const componentCache = new Map<string, any>();
const gameDataCache = new Map<GameId, any>();

export function useToolCache() {
  const getCachedComponent = (slug: string, gameId: GameId) =>
    componentCache.get(`${slug}-${gameId}`) || null;

  const cacheComponent = (slug: string, gameId: GameId, component: any) => {
    componentCache.set(`${slug}-${gameId}`, component);
  };

  const getCachedGameData = (gameId: GameId) =>
    gameDataCache.get(gameId) || null;

  const cacheGameData = (gameId: GameId, data: any) => {
    gameDataCache.set(gameId, data);
  };

  return {
    getCachedComponent,
    cacheComponent,
    getCachedGameData,
    cacheGameData,
  };
}
