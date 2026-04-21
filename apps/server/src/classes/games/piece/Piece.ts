import type { TBoardPreviewSchema } from "shared/schemas";

export abstract class Piece {
  constructor(protected position: { x: number; y: number }) {}

  abstract getType: () => string;
  abstract canMove: (board: [][], to: { x: number; y: number }) => void;
  abstract getPreview: (board: [][]) => TBoardPreviewSchema;
}
