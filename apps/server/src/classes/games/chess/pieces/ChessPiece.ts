import { PIECES } from "shared/constants";
import type {
  TColorsSchema,
  TPiecesSchema,
  TPositionSchema,
  TTypeAndColorSchema,
} from "shared/schemas";
import type {
  TChessBoardSchema,
  TChessPreviewBoardSchema,
  TPositionLabel,
  TTypeLabel,
} from "../../../../types/global.type.js";

export abstract class ChessPiece {
  protected abstract type: TPiecesSchema;

  constructor(
    protected readonly color: TColorsSchema,
    protected position: { x: number; y: number },
  ) {}

  abstract clone: () => ChessPiece;

  getType = (): TTypeAndColorSchema => {
    return { type: this.type, color: this.color };
  };

  getTypeLabel = (): TTypeLabel<TPiecesSchema> => {
    if (this.type === PIECES.PAWN) {
      return `${this.color}-${this.position.x}-pawn`;
    }
    return `${this.color}-${this.type}`;
  };

  getColor = (): TColorsSchema => {
    return this.color;
  };

  getPosition = (): TPositionSchema => {
    return this.position;
  };

  getPositionLabel = (): TPositionLabel => {
    return `y:${this.position.y}-x:${this.position.x}`;
  };

  move(to: TPositionSchema) {
    this.position = to;
  }

  abstract getPreview: (board: TChessBoardSchema) => TChessPreviewBoardSchema;
}
