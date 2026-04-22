import { vi } from "vitest";
import type { ISocketHandler } from "../../../src/classes/socket-handler/ISocketHandler.js";

export const getSocketHandlerMock = () => {
  return {
    join: vi.fn(),
    sendChessState: vi.fn(),
    sendChessPreview: vi.fn(),
  } as ISocketHandler;
};
