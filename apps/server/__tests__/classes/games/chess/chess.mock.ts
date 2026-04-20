import { vi } from "vitest";
import type { IChess } from "../../../../src/classes/games/chess/IChess.js";

export const getChessMock = () => {
  return {
    fn: vi.fn(),
    getRoomName: vi.fn(),
    sendState: vi.fn(),
  } as IChess;
};
