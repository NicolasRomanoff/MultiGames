import type { PIECES } from "../constants/chess.const.js";

export type TPiece = (typeof PIECES)[keyof typeof PIECES];

export type TBoard = (TPiece | null)[][];
