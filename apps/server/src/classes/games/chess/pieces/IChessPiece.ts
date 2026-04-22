import type {
  TBoardPreviewSchema,
  TBoardSchema,
  TColorsSchema,
  TPositionSchema,
  TTypeAndColorSchema,
} from "shared/schemas";

export interface IChessPiece {
  getType: () => TTypeAndColorSchema;
  getColor: () => TColorsSchema;
  move: (to: TPositionSchema) => void;
  getPreview: (board: TBoardSchema) => TBoardPreviewSchema;
}
