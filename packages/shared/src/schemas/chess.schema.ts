import z from "zod";
import { PIECES } from "../constants/chess.const.js";

export const boardSchema = z.array(
  z.array(z.union([z.enum(PIECES), z.null()])),
);
export type TBoardSchema = z.infer<typeof boardSchema>;
