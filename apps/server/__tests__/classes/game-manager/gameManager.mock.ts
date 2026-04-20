import { vi } from "vitest";
import type { IGameManager } from "../../../src/classes/game-manager/IGameManager.js";

export const getGameManagerMock = () => {
  return {
    addGame: vi.fn(),
    findGame: vi.fn(),
  } as IGameManager;
};
