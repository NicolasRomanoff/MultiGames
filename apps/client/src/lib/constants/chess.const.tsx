import {
  ChessBishop,
  ChessKing,
  ChessKnight,
  ChessPawn,
  ChessQueen,
  ChessRook,
} from "lucide-react";
import { PIECES } from "shared/constants";

export const pieceIcons = {
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
