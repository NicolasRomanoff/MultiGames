import { PIECES } from "shared/constants";
import type {
  TBoardSchema,
  TPositionSchema,
  TTypeAndColorSchema,
} from "shared/schemas";
import { ChessPiece } from "./ChessPiece.js";

export class Rook extends ChessPiece {
  protected type = PIECES.ROOK;
  private hasAlreadyMoved = false;

  move = (to: TPositionSchema) => {
    this.hasAlreadyMoved = true;
    super.move(to);
  };

  getPreview = (board: TBoardSchema) => {
    const previewBoard: TPositionSchema[] = [];
    const check = (
      piece: TTypeAndColorSchema | null,
      position: TPositionSchema,
    ) => {
      if (piece) {
        if (piece.color !== this.color) {
          previewBoard.push({ x: position.x, y: position.y });
        }
        return true;
      }
      return false;
    };

    for (let x = this.position.x - 1; x >= 0; x--) {
      if (check(board[this.position.y][x], { x, y: this.position.y })) break;
      previewBoard.push({ x, y: this.position.y });
    }
    for (let x = this.position.x + 1; x <= 7; x++) {
      if (check(board[this.position.y][x], { x, y: this.position.y })) break;
      previewBoard.push({ x, y: this.position.y });
    }
    for (let y = this.position.y - 1; y >= 0; y--) {
      if (check(board[y][this.position.x], { x: this.position.x, y })) break;
      previewBoard.push({ x: this.position.x, y });
    }
    for (let y = this.position.y + 1; y <= 7; y++) {
      if (check(board[y][this.position.x], { x: this.position.x, y })) break;
      previewBoard.push({ x: this.position.x, y });
    }

    return previewBoard;
  };
}
