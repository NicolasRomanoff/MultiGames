import type {
  TColorsSchema,
  TPositionSchema,
  TTypeAndColorSchema,
} from "shared/schemas";
import type {
  TChessBoardSchema,
  TChessPreviewBoardSchema,
  TPositionLabel,
} from "../../../../types/global.type.js";

export interface IChessPiece {
  getType: () => TTypeAndColorSchema;
  getColor: () => TColorsSchema;
  getPosition: () => TPositionSchema;
  getPositionLabel: () => TPositionLabel;
  move: (to: TPositionSchema) => void;
  getPreview: (board: TChessBoardSchema) => TChessPreviewBoardSchema;
}
