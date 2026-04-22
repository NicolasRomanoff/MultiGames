import type { TGamesSchema, TPositionSchema } from "shared/schemas";
import type { IChessPiece } from "./chess/pieces/IChessPiece.js";

export interface IGame<TGame extends TGamesSchema> {
  getRoomName: () => string;
  sendState: () => void;
  getPiece: (
    piecePostion: TPositionSchema,
  ) => (TGame extends "chess" ? IChessPiece : never) | null;
}
