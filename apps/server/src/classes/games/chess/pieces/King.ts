import { PIECES } from "shared/constants";
import type { TColorsSchema, TPiecesSchema } from "shared/schemas";
import { ChessPiece } from "./ChessPiece.js";
import type { IKing } from "./IKing.js";

const whatColor = (piece: TPiecesSchema): TColorsSchema => {
  if ((Object.values(PIECES.WHITE) as string[]).includes(piece)) return "white";
  return "black";
};

export abstract class King extends ChessPiece implements IKing {
  private hasAlreadyMoved = false;

  canMove: IKing["canMove"] = (board, to) => {
    const pieceAtPosition = board[to.x][to.y];
    if (pieceAtPosition && whatColor(pieceAtPosition) === this.color) {
      return false;
    }
    if (to.x > this.position.x + 1) return false;
    if (to.x < this.position.x - 1) return false;
    if (to.y > this.position.y + 1) return false;
    if (to.y < this.position.y - 1) return false;
    return true;
  };

  castling: IKing["castling"] = () => {
    if (this.hasAlreadyMoved) return;
  };
}
