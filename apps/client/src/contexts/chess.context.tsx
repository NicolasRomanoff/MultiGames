import { createContext } from "react";
import type {
  TBoardPreviewSchema,
  TBoardSchema,
  TChessRoomNameSchema,
  TChessTimers,
  TPositionSchema,
  TWantPromoteSchema,
} from "shared/schemas";

type TChessContext = {
  roomName: TChessRoomNameSchema | undefined;
  isSecondPlayer: boolean;
  setIsSecondPlayer: (isSecondPlayer: boolean) => void;
  board: TBoardSchema | null;
  setBoard: (board: TBoardSchema | null) => void;
  previewBoard: TBoardPreviewSchema;
  setPreviewBoard: (previewBoard: TBoardPreviewSchema) => void;
  positionSelected: TPositionSchema | null;
  setPositionSelected: (selectedPiece: TPositionSchema | null) => void;
  promote: TWantPromoteSchema | null;
  setPromote: (promote: TWantPromoteSchema | null) => void;
  timers: TChessTimers | null;
  setTimers: (
    timers:
      | TChessTimers
      | ((prev: TChessTimers | null) => TChessTimers | null)
      | null,
  ) => void;
};

export const ChessContext = createContext<TChessContext | null>(null);
