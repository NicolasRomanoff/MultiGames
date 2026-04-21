import z from "zod";
import { COLORS, PIECES } from "../constants/chess.const.js";

export const colorsSchema = z.enum(COLORS);
export type TColorsSchema = z.infer<typeof colorsSchema>;

export const piecesSchema = z.union([
  z.enum(PIECES.WHITE),
  z.enum(PIECES.BLACK),
]);
export type TPiecesSchema = z.infer<typeof piecesSchema>;

export const boardSchema = z.array(z.array(z.union([piecesSchema, z.null()])));
export type TBoardSchema = z.infer<typeof boardSchema>;
