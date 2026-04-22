import { COLORS, PIECES } from "shared/constants";
import type { TBoardSchema, TPositionSchema } from "shared/schemas";
import { whatColor } from "shared/utils";
import { ChessPiece } from "./ChessPiece.js";

export class King extends ChessPiece {
  private hasAlreadyMoved = false;

  getType = () =>
    this.color === COLORS.WHITE ? PIECES.WHITE.KING : PIECES.BLACK.KING;

  move = (to: TPositionSchema) => {
    this.hasAlreadyMoved = true;
    super.move(to);
  };

  getPreview = (board: TBoardSchema) => {
    const previewBoard: TPositionSchema[] = [];
    for (let y = this.position.y - 1; y <= this.position.y + 1; y++) {
      for (let x = this.position.x - 1; x <= this.position.x + 1; x++) {
        if (x < 0 || x > 7) continue;
        if (y < 0 || y > 7) continue;
        if (this.position.x === x && this.position.y === y) continue;
        const pieceAtPosition = board[y][x];
        if (pieceAtPosition && whatColor(pieceAtPosition) === this.color) {
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
