import type {
  TBoardPreviewSchema,
  TBoardSchema,
  TColorsSchema,
  TPiecesSchema,
  TPositionSchema,
} from "shared/schemas";
import { Piece } from "../../piece/Piece.js";

export abstract class ChessPiece extends Piece {
  constructor(
    protected readonly color: TColorsSchema,
    protected position: { x: number; y: number },
  ) {
    super(position);
  }

  abstract getType: () => TPiecesSchema;
  getColor() {
    return this.color;
  }
  move(to: TPositionSchema) {
    this.position = to;
  }
  abstract getPreview: (board: TBoardSchema) => TBoardPreviewSchema;
}
