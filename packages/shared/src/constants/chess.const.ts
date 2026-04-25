export const COLORS = {
  WHITE: "white",
  BLACK: "black",
} as const;

export const PIECES = {
  PAWN: "pawn",
  ROOK: "rook",
  KNIGHT: "knight",
  BISHOP: "bishop",
  QUEEN: "queen",
  KING: "king",
} as const;

export const PROMOTEPIECES = {
  ROOK: PIECES.ROOK,
  KNIGHT: PIECES.KNIGHT,
  BISHOP: PIECES.BISHOP,
  QUEEN: PIECES.QUEEN,
} as const;
