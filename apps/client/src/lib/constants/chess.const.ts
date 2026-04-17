import {
  ChessBishop,
  ChessKing,
  ChessKnight,
  ChessPawn,
  ChessQueen,
  ChessRook,
  type LucideIcon,
} from "lucide-react";
import { PIECES } from "shared/constants";
import type { TPiece } from "shared/types";

export const pieceIcons: Record<TPiece, LucideIcon> = {
  [PIECES.PAWN]: ChessPawn,
  [PIECES.BISHOP]: ChessBishop,
  [PIECES.KING]: ChessKing,
  [PIECES.KNIGHT]: ChessKnight,
  [PIECES.QUEEN]: ChessQueen,
  [PIECES.ROOK]: ChessRook,
};

export const NOTATIONS = {
  NUMBERS: "12345678",
  ALPHABETICS: "abcdefgh",
};
