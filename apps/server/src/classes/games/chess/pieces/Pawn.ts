import { COLORS, PIECES } from "shared/constants";
import type { TPositionSchema } from "shared/schemas";
import type {
  TChessBoardSchema,
  TChessPreviewBoardSchema,
} from "../../../../types/global.type.js";
import { ChessPiece } from "./ChessPiece.js";
import type { IChessPiece } from "./IChessPiece.js";

export class Pawn extends ChessPiece {
  protected type = PIECES.PAWN;
  private moveDone = 0;

  move: IChessPiece["move"] = (to) => {
    this.moveDone++;
    super.move(to);
  };

  private doubleMove = (
    board: TChessBoardSchema,
    previewBoard: TChessPreviewBoardSchema,
    direction: 1 | -1,
  ) => {
    if (this.moveDone) return;
    const y = this.position.y + direction * 2;
    if (y < 0 || y > 7) return;
    if (board[y - direction][this.position.x]) return;
    if (board[y][this.position.x]) return;
    previewBoard.push({ position: { x: this.position.x, y } });
  };

  private enPassant = (
    board: TChessBoardSchema,
    previewBoard: TChessPreviewBoardSchema,
    direction: 1 | -1,
    x: TPositionSchema["x"],
  ) => {
    if (x < 0 || x > 7) return;
    const y = this.position.y + direction;
    if (y < 0 || y > 7) return;
    if (board[y][x]) return;
    const piece = board[this.position.y][x];
    if (!(piece instanceof Pawn)) return;
    if (piece.getColor() === this.color) return;
    if (piece.moveDone !== 1) return;
    previewBoard.push({ position: { x, y }, specialMove: "en-passant" });
  };

  getPreview = (board: TChessBoardSchema, onlyAttack: boolean = false) => {
    const previewBoard: TChessPreviewBoardSchema = [];
    const direction = this.color === COLORS.WHITE ? -1 : 1;
    const y = this.position.y + direction;
    if (y < 0 || y > 7) return previewBoard;

    for (let x = this.position.x - 1; x <= this.position.x + 1; x++) {
      if (onlyAttack && this.position.x === x) continue;
      if (x < 0 || x > 7) continue;
      const pieceAtPosition = board[y][x];
      if (pieceAtPosition && pieceAtPosition.getColor() === this.color) {
        continue;
      }
      if (pieceAtPosition && this.position.x === x) continue;
      if (!onlyAttack && !pieceAtPosition && this.position.x !== x) continue;
      previewBoard.push({ position: { x, y } });
    }

    if (!onlyAttack) this.doubleMove(board, previewBoard, direction);
    this.enPassant(board, previewBoard, direction, this.position.x - 1);
    this.enPassant(board, previewBoard, direction, this.position.x + 1);

    return previewBoard;
  };
}
