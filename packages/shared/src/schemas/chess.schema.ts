import z from "zod";
import { COLORS, PIECES } from "../constants/chess.const.js";

export const positionSchema = z.object({
  x: z.number().min(0).max(7),
  y: z.number().min(0).max(7),
});
export type TPositionSchema = z.infer<typeof positionSchema>;

export const colorsSchema = z.enum(COLORS);
export type TColorsSchema = z.infer<typeof colorsSchema>;

export const piecesSchema = z.enum(PIECES);
export type TPiecesSchema = z.infer<typeof piecesSchema>;

const typeAndColorSchema = z.object({
  type: piecesSchema,
  color: colorsSchema,
});
export type TTypeAndColorSchema = z.infer<typeof typeAndColorSchema>;

export const boardSchema = z.array(
  z.array(z.union([typeAndColorSchema, z.null()])),
);
export type TBoardSchema = z.infer<typeof boardSchema>;

export const boardPreviewSchema = z.array(positionSchema);
export type TBoardPreviewSchema = z.infer<typeof boardPreviewSchema>;
