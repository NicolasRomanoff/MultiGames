import type { TBoardSchema } from "shared/schemas";

export interface IChessPiece {
  canMove: (board: TBoardSchema, to: { x: number; y: number }) => void;
}
