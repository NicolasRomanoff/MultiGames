import {
  ChessBishop,
  ChessKing,
  ChessKnight,
  ChessPawn,
  ChessQueen,
  ChessRook,
  type LucideProps,
} from "lucide-react";
import type { JSX } from "react";
import { PIECES } from "shared/constants";
import type { TPiecesSchema } from "shared/schemas";

const whiteProps: LucideProps = {
  className: "size-full",
  color: "white",
};
const blackProps: LucideProps = {
  className: "size-full",
  color: "black",
};

export const pieceIcons: Record<TPiecesSchema, JSX.Element> = {
  [PIECES.WHITE.PAWN]: <ChessPawn {...whiteProps} />,
  [PIECES.WHITE.BISHOP]: <ChessBishop {...whiteProps} />,
  [PIECES.WHITE.KING]: <ChessKing {...whiteProps} />,
  [PIECES.WHITE.KNIGHT]: <ChessKnight {...whiteProps} />,
  [PIECES.WHITE.QUEEN]: <ChessQueen {...whiteProps} />,
  [PIECES.WHITE.ROOK]: <ChessRook {...whiteProps} />,
  [PIECES.BLACK.PAWN]: <ChessPawn {...blackProps} />,
  [PIECES.BLACK.BISHOP]: <ChessBishop {...blackProps} />,
  [PIECES.BLACK.KING]: <ChessKing {...blackProps} />,
  [PIECES.BLACK.KNIGHT]: <ChessKnight {...blackProps} />,
  [PIECES.BLACK.QUEEN]: <ChessQueen {...blackProps} />,
  [PIECES.BLACK.ROOK]: <ChessRook {...blackProps} />,
};

export const NOTATIONS = {
  NUMBERS: "12345678",
  ALPHABETICS: "abcdefgh",
};
