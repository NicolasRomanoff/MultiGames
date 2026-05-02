import z from "zod";
import { COLORS, PIECES, PROMOTEPIECES } from "../constants/chess.const.js";
import { chessRoomNameSchema } from "./global.schema.js";

export const positionSchema = z.object({
  x: z.number().min(0).max(7),
  y: z.number().min(0).max(7),
});
export type TPositionSchema = z.infer<typeof positionSchema>;

export const colorsSchema = z.enum(COLORS);
export type TColorsSchema = z.infer<typeof colorsSchema>;

export const piecesSchema = z.enum(PIECES);
export type TPiecesSchema = z.infer<typeof piecesSchema>;

export const promotePiecesSchema = z.enum(PROMOTEPIECES);
export type TPromotePiecesSchema = z.infer<typeof promotePiecesSchema>;

export const wantPromoteSchema = z.object({
  position: positionSchema,
  to: positionSchema,
});
export type TWantPromoteSchema = z.infer<typeof wantPromoteSchema>;

export const promoteSchema = z.object({
  roomName: chessRoomNameSchema,
  position: positionSchema,
  to: positionSchema,
  select: promotePiecesSchema,
});
export type TPromoteSchema = z.infer<typeof promoteSchema>;

const typeAndColorSchema = z.object({
  type: piecesSchema,
  color: colorsSchema,
});
export type TTypeAndColorSchema = z.infer<typeof typeAndColorSchema>;

export const chessTimers = z.object({
  white: z.coerce.date<Date>(),
  black: z.coerce.date<Date>(),
  colorToPlay: colorsSchema,
});
export type TChessTimers = z.infer<typeof chessTimers>;

export const winnerSchema = z.union([colorsSchema, z.literal("pat")]);
export type TWinnerSchema = z.infer<typeof winnerSchema>;

export const boardSchema = z.array(
  z.array(z.union([typeAndColorSchema, z.null()])),
);
export type TBoardSchema = z.infer<typeof boardSchema>;

export const boardPreviewSchema = z.array(positionSchema);
export type TBoardPreviewSchema = z.infer<typeof boardPreviewSchema>;
