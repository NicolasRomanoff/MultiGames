import { PIECES } from "../constants/chess.const.js";
import type { TColorsSchema, TPiecesSchema } from "../schemas/chess.schema.js";

export const whatColor = (piece: TPiecesSchema): TColorsSchema => {
  if ((Object.values(PIECES.WHITE) as string[]).includes(piece)) return "white";
  return "black";
};
