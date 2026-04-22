import { COLORS, PIECES } from "shared/constants";
import type { TBoardSchema, TPositionSchema } from "shared/schemas";
import { whatColor } from "shared/utils";
import { ChessPiece } from "./ChessPiece.js";

export class Pawn extends ChessPiece {
  private hasAlreadyMoved = false;

  getType = () =>
    this.color === COLORS.WHITE ? PIECES.WHITE.PAWN : PIECES.BLACK.PAWN;

  move = (to: TPositionSchema) => {
    this.hasAlreadyMoved = true;
    super.move(to);
  };

  getPreview = (board: TBoardSchema) => {
    const previewBoard: TPositionSchema[] = [];
    const direction = this.color === COLORS.WHITE ? -1 : 1;
    const y = this.position.y + direction;
    if (y < 0 || y > 7) return previewBoard;
    for (let x = this.position.x - 1; x <= this.position.x + 1; x++) {
      if (x < 0 || x > 7) continue;
      const pieceAtPosition = board[y][x];
      if (pieceAtPosition && whatColor(pieceAtPosition) === this.color) {
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
