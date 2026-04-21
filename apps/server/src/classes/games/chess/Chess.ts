import { PIECES } from "shared/constants";
import type { TBoardSchema } from "shared/schemas";
import type { TGameInfo } from "../../../types/global.type.js";
import { Game } from "../Game.js";
import type { IChess } from "./IChess.js";

export class Chess extends Game implements IChess {
  private readonly board: TBoardSchema;
  constructor(gameInfo: TGameInfo) {
    super(gameInfo);
    const whitePawnsLine = Array.from({ length: 8 }, () => PIECES.WHITE.PAWN);
    const blackPawnsLine = Array.from({ length: 8 }, () => PIECES.BLACK.PAWN);
    const whitePiecesLine = [
      PIECES.WHITE.ROOK,
      PIECES.WHITE.KNIGHT,
      PIECES.WHITE.BISHOP,
      PIECES.WHITE.QUEEN,
      PIECES.WHITE.KING,
      PIECES.WHITE.BISHOP,
      PIECES.WHITE.KNIGHT,
      PIECES.WHITE.ROOK,
    ];
    const blackPiecesLine = [
      PIECES.BLACK.ROOK,
      PIECES.BLACK.KNIGHT,
      PIECES.BLACK.BISHOP,
      PIECES.BLACK.QUEEN,
      PIECES.BLACK.KING,
      PIECES.BLACK.BISHOP,
      PIECES.BLACK.KNIGHT,
      PIECES.BLACK.ROOK,
    ];
    const fillBoard = () => Array.from({ length: 8 }, () => null);
    this.board = [
      blackPiecesLine,
      blackPawnsLine,
      fillBoard(),
      fillBoard(),
      fillBoard(),
      fillBoard(),
      whitePawnsLine,
      whitePiecesLine,
    ];
  }

  sendState: IChess["sendState"] = () => {
    for (const player of this.gameInfo.players) {
      player.socketHandler.sendChessState(this.board);
    }
  };

  fn: IChess["fn"] = () => {};
}
