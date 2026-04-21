import type { TPositionSchema } from "shared/schemas";
import type { Piece } from "./piece/Piece.js";

export interface IGame {
  getRoomName: () => string;
  sendState: () => void;
  getPiece: (piecePostion: TPositionSchema) => Piece | null;
}
