import type { TColorsSchema } from "shared/schemas";
import type { IChessPiece } from "./IChessPiece.js";

export abstract class ChessPiece implements IChessPiece {
  constructor(
    protected readonly color: TColorsSchema,
    protected position: { x: number; y: number },
  ) {}
  abstract canMove: IChessPiece["canMove"];
}
