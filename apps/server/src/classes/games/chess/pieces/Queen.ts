import { PIECES } from "shared/constants";
import type { TColorsSchema, TPositionSchema } from "shared/schemas";
import { Bishop } from "./Bishop.js";
import { ChessPiece } from "./ChessPiece.js";
import type { IChessPiece } from "./IChessPiece.js";
import { Rook } from "./Rook.js";

export class Queen extends ChessPiece {
  protected type = PIECES.QUEEN;
  private readonly rook;
  private readonly bishop;

  constructor(color: TColorsSchema, position: TPositionSchema) {
    super(color, position);
    this.rook = new Rook(color, position);
    this.bishop = new Bishop(color, position);
  }

  move: IChessPiece["move"] = (to) => {
    this.rook.move(to);
    this.bishop.move(to);
  };

  getPreview: IChessPiece["getPreview"] = (board) => {
    const previewBoard: TPositionSchema[] = [];
    previewBoard.push(...this.rook.getPreview(board));
    previewBoard.push(...this.bishop.getPreview(board));
    return previewBoard;
  };
}
