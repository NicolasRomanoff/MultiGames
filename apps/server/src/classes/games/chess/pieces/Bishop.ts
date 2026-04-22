import { COLORS, PIECES } from "shared/constants";
import type {
  TBoardSchema,
  TPiecesSchema,
  TPositionSchema,
} from "shared/schemas";
import { whatColor } from "shared/utils";
import { ChessPiece } from "./ChessPiece.js";

export class Bishop extends ChessPiece {
  getType = () =>
    this.color === COLORS.WHITE ? PIECES.WHITE.BISHOP : PIECES.BLACK.BISHOP;

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
