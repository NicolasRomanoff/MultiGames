import { COLORS, PIECES } from "shared/constants";
import type {
  TBoardSchema,
  TColorsSchema,
  TPositionSchema,
} from "shared/schemas";
import { Bishop } from "./Bishop.js";
import { ChessPiece } from "./ChessPiece.js";
import { Rook } from "./Rook.js";

export class Queen extends ChessPiece {
  private readonly rook;
  private readonly bishop;

  constructor(color: TColorsSchema, position: TPositionSchema) {
    super(color, position);
    this.rook = new Rook(color, position);
    this.bishop = new Bishop(color, position);
  }

  getType = () =>
    this.color === COLORS.WHITE ? PIECES.WHITE.QUEEN : PIECES.BLACK.QUEEN;

  move = (to: TPositionSchema) => {
    this.rook.move(to);
    this.bishop.move(to);
  };

  getPreview = (board: TBoardSchema) => {
    const previewBoard: TPositionSchema[] = [];
    previewBoard.push(...this.rook.getPreview(board));
    previewBoard.push(...this.bishop.getPreview(board));
    return previewBoard;
  };
}
