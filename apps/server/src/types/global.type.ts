import { positionSchema, type TGamesSchema } from "shared/schemas";
import z from "zod";
import { ChessPiece } from "../classes/games/chess/pieces/ChessPiece.js";
import type { IPlayer } from "../classes/player/IPlayer.js";

export type TGameInfo = {
  type: TGamesSchema;
  roomName: string;
  players: IPlayer[];
};

export const DIRECTIONS = {
  UP: -1,
  DOWN: 1,
  RIGHT: 1,
  LEFT: -1,
} as const;
export type TDirection = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];

export const chessBoardSchema = z.array(
  z.array(z.union([z.instanceof(ChessPiece), z.null()])),
);
export type TChessBoardSchema = z.infer<typeof chessBoardSchema>;

export const MOVES = {
  ENPASSANT: "en-passant",
  CASTLING: "castling",
} as const;

export const chessPreview = z.object({
  position: positionSchema,
  specialMove: z.enum(MOVES).optional(),
});
export type TChessPreview = z.infer<typeof chessPreview>;

export const chessPreviewBoardSchema = z.array(chessPreview);
export type TChessPreviewBoardSchema = z.infer<typeof chessPreviewBoardSchema>;
