import type { TBoardSchema } from "shared/schemas";

export interface ISocketHandler {
  join: (room: string) => void;
  sendChessState: (board: TBoardSchema) => void;
}
