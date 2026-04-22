import type {
  TBoardPreviewSchema,
  TColorsSchema,
  TPositionSchema,
  TTypeAndColorSchema,
} from "shared/schemas";
import type { TChessBoardSchema } from "../Chess.js";

export interface IChessPiece {
  getType: () => TTypeAndColorSchema;
  getColor: () => TColorsSchema;
  move: (to: TPositionSchema) => void;
  getPreview: (board: TChessBoardSchema) => TBoardPreviewSchema;
}
