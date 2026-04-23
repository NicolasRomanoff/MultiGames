import type {
  TColorsSchema,
  TPositionSchema,
  TTypeAndColorSchema,
} from "shared/schemas";
import type {
  TChessBoardSchema,
  TChessPreviewBoardSchema,
} from "../../../../types/global.type.js";

export interface IChessPiece {
  getType: () => TTypeAndColorSchema;
  getColor: () => TColorsSchema;
  move: (to: TPositionSchema) => void;
  getPreview: (board: TChessBoardSchema) => TChessPreviewBoardSchema;
}
