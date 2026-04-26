import type {
  TBoardPreviewSchema,
  TBoardSchema,
  TChessTimers,
  TPositionSchema,
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
  sendPromoteSuggest: (position: TPositionSchema, to: TPositionSchema) => void;
  sendChessTimers: (timers: TChessTimers) => void;
}
