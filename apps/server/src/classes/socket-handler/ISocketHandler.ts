import type { TBoardPreviewSchema, TBoardSchema } from "shared/schemas";

export interface ISocketHandler {
  join: (room: string) => void;
  sendChessState: ({
    isSecondPlayer,
    board,
  }: {
    isSecondPlayer: boolean;
    board: TBoardSchema;
  }) => void;

  sendChessPreview: (piecePreview: TBoardPreviewSchema) => void;
}
