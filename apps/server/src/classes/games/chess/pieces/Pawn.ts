import { COLORS, PIECES } from "shared/constants";
import type { TPositionSchema } from "shared/schemas";
import {
  DIRECTIONS,
  MOVES,
  type TChessBoardSchema,
  type TChessPreviewBoardSchema,
  type TDirection,
} from "../../../../types/global.type.js";
import { ChessPiece } from "./ChessPiece.js";

const PAWNSTATE = {
  START: "start",
  ENPASSANT: MOVES.ENPASSANT,
  MOVED: "moved",
} as const;
type TPawnState = (typeof PAWNSTATE)[keyof typeof PAWNSTATE];

export class Pawn extends ChessPiece {
  protected type = PIECES.PAWN;
  private pawnState: TPawnState = PAWNSTATE.START;

  clone = () => {
    const clonePawn = new Pawn(this.color, this.position);
    clonePawn.pawnState = this.pawnState;
    return clonePawn;
  };

  move: ChessPiece["move"] = (to) => {
    this.pawnState = PAWNSTATE.MOVED;
    if (this.position.y + 2 === to.y) this.pawnState = PAWNSTATE.ENPASSANT;
    super.move(to);
  };

  updatePawnState = () => {
    if (this.pawnState !== PAWNSTATE.ENPASSANT) return;
    this.pawnState = PAWNSTATE.MOVED;
  };

  private doubleMove = (
    board: TChessBoardSchema,
    previewBoard: TChessPreviewBoardSchema,
    direction: 1 | -1,
  ) => {
    if (this.pawnState !== PAWNSTATE.START) return;
    const y = this.position.y + direction * 2;
    if (y < 0 || y > 7) return;
    if (board[y - direction][this.position.x]) return;
    if (board[y][this.position.x]) return;
    previewBoard.push({ position: { x: this.position.x, y } });
  };

  private enPassant = (
    board: TChessBoardSchema,
    previewBoard: TChessPreviewBoardSchema,
    direction: TDirection,
    x: TPositionSchema["x"],
  ) => {
    if (x < 0 || x > 7) return;
    const y = this.position.y + direction;
    if (y < 0 || y > 7) return;
    if (board[y][x]) return;
    const piece = board[this.position.y][x];
    if (!(piece instanceof Pawn)) return;
    if (piece.getColor() === this.color) return;
    if (piece.pawnState !== PAWNSTATE.ENPASSANT) return;
    previewBoard.push({ position: { x, y }, specialMove: MOVES.ENPASSANT });
  };

  getPreview = (board: TChessBoardSchema, onlyAttackMove: boolean = false) => {
    const previewBoard: TChessPreviewBoardSchema = [];
    const direction =
      this.color === COLORS.WHITE ? DIRECTIONS.UP : DIRECTIONS.DOWN;
    const y = this.position.y + direction;
    if (y < 0 || y > 7) return previewBoard;

    for (let x = this.position.x - 1; x <= this.position.x + 1; x++) {
      if (onlyAttackMove && this.position.x === x) continue;
      if (x < 0 || x > 7) continue;
      const pieceAtPosition = board[y][x];
      if (pieceAtPosition && pieceAtPosition.getColor() === this.color) {
        continue;
      }
      if (pieceAtPosition && this.position.x === x) continue;
      if (!onlyAttackMove && !pieceAtPosition && this.position.x !== x)
        continue;
      previewBoard.push({ position: { x, y } });
    }

    if (!onlyAttackMove) this.doubleMove(board, previewBoard, direction);
    this.enPassant(board, previewBoard, direction, this.position.x - 1);
    this.enPassant(board, previewBoard, direction, this.position.x + 1);

    return previewBoard;
  };
}
