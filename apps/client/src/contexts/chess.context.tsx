import { createContext } from "react";
import type {
  TBoardPreviewSchema,
  TBoardSchema,
  TChessRoomNameSchema,
  TPositionSchema,
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
};

export const ChessContext = createContext<TChessContext | null>(null);
