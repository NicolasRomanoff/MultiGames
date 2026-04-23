import { PIECES } from "shared/constants";
import type { TPositionSchema } from "shared/schemas";
import type { TChessPreviewBoardSchema } from "../../../../types/global.type.js";
import { ChessPiece } from "./ChessPiece.js";
import type { IChessPiece } from "./IChessPiece.js";

export class Rook extends ChessPiece {
  protected type = PIECES.ROOK;
  private moveDone = 0;

  move: IChessPiece["move"] = (to) => {
    this.moveDone++;
    super.move(to);
  };

  getMoveDone = () => this.moveDone;

  getPreview: IChessPiece["getPreview"] = (board) => {
    const previewBoard: TChessPreviewBoardSchema = [];
    const check = (piece: IChessPiece | null, position: TPositionSchema) => {
      if (piece) {
        if (piece.getColor() !== this.color) {
          previewBoard.push({ position: { x: position.x, y: position.y } });
        }
        return true;
      }
      return false;
    };

    for (let x = this.position.x - 1; x >= 0; x--) {
      if (check(board[this.position.y][x], { x, y: this.position.y })) break;
      previewBoard.push({ position: { x, y: this.position.y } });
    }
    for (let x = this.position.x + 1; x <= 7; x++) {
      if (check(board[this.position.y][x], { x, y: this.position.y })) break;
      previewBoard.push({ position: { x, y: this.position.y } });
    }
    for (let y = this.position.y - 1; y >= 0; y--) {
      if (check(board[y][this.position.x], { x: this.position.x, y })) break;
      previewBoard.push({ position: { x: this.position.x, y } });
    }
    for (let y = this.position.y + 1; y <= 7; y++) {
      if (check(board[y][this.position.x], { x: this.position.x, y })) break;
      previewBoard.push({ position: { x: this.position.x, y } });
    }

    return previewBoard;
  };
}
