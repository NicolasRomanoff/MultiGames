import { PIECES } from "shared/constants";
import type { TPositionSchema } from "shared/schemas";
import { ChessPiece } from "./ChessPiece.js";
import type { IChessPiece } from "./IChessPiece.js";

export class King extends ChessPiece {
  protected type = PIECES.KING;
  private hasAlreadyMoved = false;

  move: IChessPiece["move"] = (to) => {
    this.hasAlreadyMoved = true;
    super.move(to);
  };

  getPreview: IChessPiece["getPreview"] = (board) => {
    const previewBoard: TPositionSchema[] = [];
    for (let y = this.position.y - 1; y <= this.position.y + 1; y++) {
      for (let x = this.position.x - 1; x <= this.position.x + 1; x++) {
        if (x < 0 || x > 7) continue;
        if (y < 0 || y > 7) continue;
        if (this.position.x === x && this.position.y === y) continue;
        const pieceAtPosition = board[y][x];
        if (pieceAtPosition && pieceAtPosition.getColor() === this.color) {
          continue;
        }
        previewBoard.push({ x, y });
      }
    }
    return previewBoard;
  };

  castling = () => {
    if (this.hasAlreadyMoved) return;
  };
}
