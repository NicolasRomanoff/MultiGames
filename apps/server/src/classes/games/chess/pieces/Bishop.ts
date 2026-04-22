import { PIECES } from "shared/constants";
import type { TPositionSchema } from "shared/schemas";
import { ChessPiece } from "./ChessPiece.js";
import type { IChessPiece } from "./IChessPiece.js";

export class Bishop extends ChessPiece {
  protected type = PIECES.BISHOP;

  getPreview: IChessPiece["getPreview"] = (board) => {
    const previewBoard: TPositionSchema[] = [];
    const check = (piece: IChessPiece | null, position: TPositionSchema) => {
      if (piece) {
        if (piece.getColor() !== this.color) {
          previewBoard.push({ x: position.x, y: position.y });
        }
        return true;
      }
      return false;
    };
    for (
      let y = this.position.y + 1, x = this.position.x + 1;
      y <= 7 && x <= 7;
      y++, x++
    ) {
      if (check(board[y][x], { x, y })) break;
      previewBoard.push({ x, y });
    }
    for (
      let y = this.position.y - 1, x = this.position.x + 1;
      y >= 0 && x <= 7;
      y--, x++
    ) {
      if (check(board[y][x], { x, y })) break;
      previewBoard.push({ x, y });
    }
    for (
      let y = this.position.y - 1, x = this.position.x - 1;
      y >= 0 && x >= 0;
      y--, x--
    ) {
      if (check(board[y][x], { x, y })) break;
      previewBoard.push({ x, y });
    }
    for (
      let y = this.position.y + 1, x = this.position.x - 1;
      y <= 7 && x >= 0;
      y++, x--
    ) {
      if (check(board[y][x], { x, y })) break;
      previewBoard.push({ x, y });
    }
    return previewBoard;
  };
}
