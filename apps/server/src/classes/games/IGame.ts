import type { TGamesSchema, TPositionSchema } from "shared/schemas";
import type { ChessPiece } from "./chess/pieces/ChessPiece.js";

export interface IGame<TGame extends TGamesSchema> {
  getRoomName: () => string;
  sendState: () => void;
  getPiece: (
    piecePostion: TPositionSchema,
  ) => (TGame extends "chess" ? ChessPiece : never) | null;
  handleTimers: () => void;
}
