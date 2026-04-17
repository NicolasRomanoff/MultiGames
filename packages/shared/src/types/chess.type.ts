import type { PIECES } from "../constants/chess.const.js";

export type TPiece = (typeof PIECES)[keyof typeof PIECES];

type TBoardIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type TBoard = Record<`${TBoardIndex}-${TBoardIndex}`, TPiece | null>;
