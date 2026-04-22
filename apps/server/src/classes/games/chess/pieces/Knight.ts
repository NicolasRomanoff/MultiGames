import { PIECES } from "shared/constants";
import type { TPositionSchema } from "shared/schemas";
import { ChessPiece } from "./ChessPiece.js";
import type { IChessPiece } from "./IChessPiece.js";

export class Knight extends ChessPiece {
  protected type = PIECES.KNIGHT;

  getPreview: IChessPiece["getPreview"] = (board) => {
    const previewBoard: TPositionSchema[] = [];
    const possiblePositions = new Set([
      { x: this.position.x + 1, y: this.position.y + 2 },
      { x: this.position.x + 2, y: this.position.y + 1 },
      { x: this.position.x + 2, y: this.position.y - 1 },
      { x: this.position.x + 1, y: this.position.y - 2 },
      { x: this.position.x - 1, y: this.position.y - 2 },
      { x: this.position.x - 2, y: this.position.y - 1 },
      { x: this.position.x - 2, y: this.position.y + 1 },
      { x: this.position.x - 1, y: this.position.y + 2 },
    ]);
    for (const position of possiblePositions) {
      if (position.x < 0 || position.x > 7) continue;
      if (position.y < 0 || position.y > 7) continue;
      const pieceAtPosition = board[position.y][position.x];
      if (pieceAtPosition && pieceAtPosition.getColor() === this.color) {
        continue;
      }
      previewBoard.push(position);
    }

    return previewBoard;
  };
}
