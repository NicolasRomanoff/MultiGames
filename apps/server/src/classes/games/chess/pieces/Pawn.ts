import { COLORS, PIECES } from "shared/constants";
import type { TPositionSchema } from "shared/schemas";
import { ChessPiece } from "./ChessPiece.js";
import type { IChessPiece } from "./IChessPiece.js";

export class Pawn extends ChessPiece {
  protected type = PIECES.PAWN;
  private hasAlreadyMoved = false;

  move: IChessPiece["move"] = (to) => {
    this.hasAlreadyMoved = true;
    super.move(to);
  };

  getPreview: IChessPiece["getPreview"] = (board) => {
    const previewBoard: TPositionSchema[] = [];
    const direction = this.color === COLORS.WHITE ? -1 : 1;
    const y = this.position.y + direction;
    if (y < 0 || y > 7) return previewBoard;
    for (let x = this.position.x - 1; x <= this.position.x + 1; x++) {
      if (x < 0 || x > 7) continue;
      const pieceAtPosition = board[y][x];
      if (pieceAtPosition && pieceAtPosition.getColor() === this.color) {
        continue;
      }
      if (pieceAtPosition && this.position.x === x) continue;
      if (!pieceAtPosition && this.position.x !== x) continue; // En passant WIP
      if (
        !this.hasAlreadyMoved &&
        !pieceAtPosition &&
        this.position.x === x &&
        !board[y + direction][x]
      ) {
        previewBoard.push({ x, y: y + direction });
      }
      previewBoard.push({ x, y });
    }
    return previewBoard;
  };
}
