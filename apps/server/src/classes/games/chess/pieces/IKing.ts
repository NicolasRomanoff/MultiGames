import type { IChessPiece } from "./IChessPiece.js";

export interface IKing extends IChessPiece {
  castling: () => void;
}
