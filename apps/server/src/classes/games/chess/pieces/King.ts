import { COLORS, PIECES } from "shared/constants";
import type {
  TBoardSchema,
  TColorsSchema,
  TPiecesSchema,
  TPositionSchema,
} from "shared/schemas";
import { ChessPiece } from "./ChessPiece.js";

const whatColor = (piece: TPiecesSchema): TColorsSchema => {
  if ((Object.values(PIECES.WHITE) as string[]).includes(piece)) return "white";
  return "black";
};

export class King extends ChessPiece {
  private hasAlreadyMoved = false;

  getType = () =>
    this.color === COLORS.WHITE ? PIECES.WHITE.KING : PIECES.BLACK.KING;

  getColor = () => this.color;

  canMove = (board: TBoardSchema, to: TPositionSchema) => {
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

  getPreview = (board: TBoardSchema) => {
    const previewBoard = [];
    for (let y = this.position.y - 1; y <= this.position.y + 1; y++) {
      for (let x = this.position.x - 1; x <= this.position.x + 1; x++) {
        if (x < 0 || y < 0) continue;
        if (x > 7 || y > 7) continue;
        if (this.position.x === x && this.position.y === y) continue;
        const pieceAtPosition = board[y][x];
        if (pieceAtPosition && whatColor(pieceAtPosition) === this.color)
          continue;
        previewBoard.push({ x, y });
      }
    }
    return previewBoard;
  };

  castling = () => {
    if (this.hasAlreadyMoved) return;
  };
}
