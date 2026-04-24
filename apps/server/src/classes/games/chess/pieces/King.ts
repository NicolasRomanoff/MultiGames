import { PIECES } from "shared/constants";
import {
  DIRECTIONS,
  type TChessBoardSchema,
  type TChessPreviewBoardSchema,
  type TDirection,
  type TThreatenedCases,
} from "../../../../types/global.type.js";
import { Chess } from "../Chess.js";
import { ChessPiece } from "./ChessPiece.js";
import type { IChessPiece } from "./IChessPiece.js";
import { Rook } from "./Rook.js";

export class King extends ChessPiece {
  protected type = PIECES.KING;
  private moveDone = 0;

  move: IChessPiece["move"] = (to) => {
    this.moveDone++;
    super.move(to);
  };

  private castling = (
    board: TChessBoardSchema,
    previewBoard: TChessPreviewBoardSchema,
    threatenedCases: TThreatenedCases,
    direction: TDirection,
  ) => {
    if (this.moveDone) return;

    const rook = board[this.position.y][direction === DIRECTIONS.RIGHT ? 7 : 0];
    if (!rook || !(rook instanceof Rook)) return;
    if (rook.getMoveDone()) return;

    for (
      let x = this.position.x + direction;
      direction === DIRECTIONS.RIGHT ? x < 7 : x > 1;
      direction === DIRECTIONS.RIGHT ? x++ : x--
    ) {
      const piece = board[this.position.y][x];
      if (piece) return;
      const isCaseAttacked = threatenedCases.get(this.getPositionLabel());
      if (isCaseAttacked) return;
    }
    previewBoard.push({
      position: { x: this.position.x + direction * 2, y: this.position.y },
      specialMove: "castling",
    });
  };

  getPreview: IChessPiece["getPreview"] = (
    board,
    onlyAttackMove: boolean = false,
  ) => {
    const previewBoard: TChessPreviewBoardSchema = [];
    for (let y = this.position.y - 1; y <= this.position.y + 1; y++) {
      for (let x = this.position.x - 1; x <= this.position.x + 1; x++) {
        if (x < 0 || x > 7) continue;
        if (y < 0 || y > 7) continue;
        if (this.position.x === x && this.position.y === y) continue;
        const pieceAtPosition = board[y][x];
        if (pieceAtPosition && pieceAtPosition.getColor() === this.color) {
          continue;
        }
        previewBoard.push({ position: { x, y } });
      }
    }

    if (!onlyAttackMove) {
      const threatenedCases = Chess.getThreatenedCases(board, this.color);
      const isKingAttacked = threatenedCases.get(this.getPositionLabel());
      if (isKingAttacked) return previewBoard;
      this.castling(board, previewBoard, threatenedCases, DIRECTIONS.RIGHT);
      this.castling(board, previewBoard, threatenedCases, DIRECTIONS.LEFT);
    }

    return previewBoard;
  };
}
