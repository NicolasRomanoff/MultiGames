import { PIECES } from "shared/constants";
import type { TPositionSchema } from "shared/schemas";
import type { TChessPreviewBoardSchema } from "../../../../types/global.type.js";
import { ChessPiece } from "./ChessPiece.js";

export class Bishop extends ChessPiece {
  protected type = PIECES.BISHOP;

  clone = () => new Bishop(this.color, this.position);

  getPreview: ChessPiece["getPreview"] = (board) => {
    const previewBoard: TChessPreviewBoardSchema = [];
    const check = (piece: ChessPiece | null, position: TPositionSchema) => {
      if (piece) {
        if (piece.getColor() !== this.color) {
          previewBoard.push({ position: { x: position.x, y: position.y } });
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
      previewBoard.push({ position: { x, y } });
    }
    for (
      let y = this.position.y - 1, x = this.position.x + 1;
      y >= 0 && x <= 7;
      y--, x++
    ) {
      if (check(board[y][x], { x, y })) break;
      previewBoard.push({ position: { x, y } });
    }
    for (
      let y = this.position.y - 1, x = this.position.x - 1;
      y >= 0 && x >= 0;
      y--, x--
    ) {
      if (check(board[y][x], { x, y })) break;
      previewBoard.push({ position: { x, y } });
    }
    for (
      let y = this.position.y + 1, x = this.position.x - 1;
      y <= 7 && x >= 0;
      y++, x--
    ) {
      if (check(board[y][x], { x, y })) break;
      previewBoard.push({ position: { x, y } });
    }
    return previewBoard;
  };
}
