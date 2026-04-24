import { PIECES } from "shared/constants";
import type { TColorsSchema, TPositionSchema } from "shared/schemas";
import type { TChessPreviewBoardSchema } from "../../../../types/global.type.js";
import { Bishop } from "./Bishop.js";
import { ChessPiece } from "./ChessPiece.js";
import { Rook } from "./Rook.js";

export class Queen extends ChessPiece {
  protected type = PIECES.QUEEN;
  private readonly rook;
  private readonly bishop;

  clone = () => new Queen(this.color, this.position);

  constructor(color: TColorsSchema, position: TPositionSchema) {
    super(color, position);
    this.rook = new Rook(color, position);
    this.bishop = new Bishop(color, position);
  }

  move: ChessPiece["move"] = (to) => {
    this.rook.move(to);
    this.bishop.move(to);
    super.move(to);
  };

  getPreview: ChessPiece["getPreview"] = (board) => {
    const previewBoard: TChessPreviewBoardSchema = [];
    previewBoard.push(...this.rook.getPreview(board));
    previewBoard.push(...this.bishop.getPreview(board));
    return previewBoard;
  };
}
