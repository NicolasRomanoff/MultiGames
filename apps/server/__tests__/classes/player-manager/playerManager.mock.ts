import { vi } from "vitest";
import type { IPlayerManager } from "../../../src/classes/player-manager/IPlayerManager.js";

export const getPlayerManagerMock = () => {
  return {
    addPlayer: vi.fn(),
    deletePlayer: vi.fn(),
    getPlayers: vi.fn(),
    findGame: vi.fn(),
  } as IPlayerManager;
};
