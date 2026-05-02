import z from "zod";
import { GAMES } from "../constants/global.const.js";

export const GamesSchema = z.enum(GAMES);
export type TGamesSchema = z.infer<typeof GamesSchema>;

export const chessRoomNameSchema = z.custom<`chess-${string}`>((roomName) => {
  if (typeof roomName !== "string") return false;
  if (roomName.startsWith("chess-")) return true;
});
export type TChessRoomNameSchema = z.infer<typeof chessRoomNameSchema>;

export const roomNameSchema = z.union([chessRoomNameSchema]);
export type TRoomNameSchema = z.infer<typeof roomNameSchema>;
