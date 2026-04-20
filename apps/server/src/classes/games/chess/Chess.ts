import { PIECES } from "shared/constants";
import type { TBoard, TPiece } from "shared/types";
import type { TGameInfo } from "../../../types/global.type.js";
import { Game } from "../Game.js";
import type { IChess } from "./IChess.js";

export class Chess extends Game implements IChess {
  private readonly board: TBoard;
  constructor(gameInfo: TGameInfo) {
    super(gameInfo);
    const pawnsLine = () =>
      Array.from({ length: 8 }).fill(PIECES.PAWN) as TPiece[];
    const otherPiecesLine = () =>
      Array.from([
        PIECES.ROOK,
        PIECES.KNIGHT,
        PIECES.BISHOP,
        PIECES.QUEEN,
        PIECES.KING,
        PIECES.BISHOP,
        PIECES.KNIGHT,
        PIECES.ROOK,
      ]);
    this.board = [
      otherPiecesLine(),
      pawnsLine(),
      [],
      [],
      [],
      [],
      pawnsLine(),
      otherPiecesLine(),
    ];
  }

  sendState: IChess["sendState"] = () => {
    for (const player of this.gameInfo.players) {
      player.socketHandler.sendChessState(this.board);
    }
  };

  fn: IChess["fn"] = () => {};
}
