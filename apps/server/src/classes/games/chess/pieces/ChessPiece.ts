import type {
  TColorsSchema,
  TPiecesSchema,
  TPositionSchema,
} from "shared/schemas";
import type { IChessPiece } from "./IChessPiece.js";

export abstract class ChessPiece implements IChessPiece {
  protected abstract type: TPiecesSchema;

  constructor(
    protected readonly color: TColorsSchema,
    protected position: { x: number; y: number },
  ) {}

  getType: IChessPiece["getType"] = () => {
    return { type: this.type, color: this.color };
  };

  getColor: IChessPiece["getColor"] = () => {
    return this.color;
  };

  move(to: TPositionSchema) {
    this.position = to;
  }

  abstract getPreview: IChessPiece["getPreview"];
}
