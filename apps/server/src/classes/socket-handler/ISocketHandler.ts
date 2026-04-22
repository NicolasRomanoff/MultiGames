import type {
  TBoardPreviewSchema,
  TBoardSchema,
  TRoomNameSchema,
} from "shared/schemas";

export interface ISocketHandler {
  join: (room: TRoomNameSchema) => void;
  sendChessState: ({
    isSecondPlayer,
    board,
  }: {
    isSecondPlayer: boolean;
    board: TBoardSchema;
  }) => void;

  sendChessPreview: (piecePreview: TBoardPreviewSchema) => void;
}
