import { PIECES } from "../constants/chess.const.js";

export type TPiece = (typeof PIECES)[keyof typeof PIECES];
