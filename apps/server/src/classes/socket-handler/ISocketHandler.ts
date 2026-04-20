import type { TBoard } from "shared/types";

export interface ISocketHandler {
  join: (room: string) => void;
  sendChessState: (board: TBoard) => void;
}
