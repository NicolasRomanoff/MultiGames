import { COLORS, PIECES } from "shared/constants";
import type {
  TBoardSchema,
  TPiecesSchema,
  TPositionSchema,
} from "shared/schemas";
import { whatColor } from "shared/utils";
import { ChessPiece } from "./ChessPiece.js";

export class Rook extends ChessPiece {
  private hasAlreadyMoved = false;

  getType = () =>
    this.color === COLORS.WHITE ? PIECES.WHITE.ROOK : PIECES.BLACK.ROOK;

  move = (to: TPositionSchema) => {
    this.hasAlreadyMoved = true;
    super.move(to);
  };

  getPreview = (board: TBoardSchema) => {
    const previewBoard: TPositionSchema[] = [];
    const check = (piece: TPiecesSchema | null, position: TPositionSchema) => {
      if (piece) {
        if (whatColor(piece) !== this.color) {
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
