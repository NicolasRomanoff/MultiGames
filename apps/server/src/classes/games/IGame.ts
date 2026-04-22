import type { TPositionSchema } from "shared/schemas";
import type { TGames } from "shared/types";
import type { IChessPiece } from "./chess/pieces/IChessPiece.js";

export interface IGame<TGame extends TGames> {
  getRoomName: () => string;
  sendState: () => void;
  getPiece: (
    piecePostion: TPositionSchema,
  ) => (TGame extends "chess" ? IChessPiece : never) | null;
}
