import { vi } from "vitest";
import type { IPlayer } from "../../../src/classes/player/IPlayer.js";
import { getSocketHandlerMock } from "../socket-handler/socketHandler.mock.js";

export const getPlayerMock = () => {
  return {
    getGame: vi.fn(),
    setGame: vi.fn(),
    socketHandler: getSocketHandlerMock(),
  } as IPlayer;
};
