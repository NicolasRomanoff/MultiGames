import { COLORS } from "shared/constants";
import type { TPositionSchema } from "shared/schemas";
import z from "zod";
import type { TGameInfo } from "../../../types/global.type.js";
import type { IPlayer } from "../../player/IPlayer.js";
import { Game } from "../Game.js";
import type { IGame } from "../IGame.js";
import { Bishop } from "./pieces/Bishop.js";
import { ChessPiece } from "./pieces/ChessPiece.js";
import { King } from "./pieces/King.js";
import { Knight } from "./pieces/Knight.js";
import { Pawn } from "./pieces/Pawn.js";
import { Queen } from "./pieces/Queen.js";
import { Rook } from "./pieces/Rook.js";

const _chessBoardSchema = z.array(
  z.array(z.union([z.instanceof(ChessPiece), z.null()])),
);

export class Chess extends Game<"chess"> implements IGame<"chess"> {
  private readonly board: z.infer<typeof _chessBoardSchema>;
  constructor(gameInfo: TGameInfo) {
    super(gameInfo);
    const whitePawnsLine = Array.from(
      { length: 8 },
      (_, x) => new Pawn(COLORS.WHITE, { x, y: 6 }),
    );
    const blackPawnsLine = Array.from(
      { length: 8 },
      (_, x) => new Pawn(COLORS.BLACK, { x, y: 1 }),
    );
    const whitePiecesLine = [
      new Rook(COLORS.WHITE, { x: 0, y: 7 }),
      new Knight(COLORS.WHITE, { x: 1, y: 7 }),
      new Bishop(COLORS.WHITE, { x: 2, y: 7 }),
      new Queen(COLORS.WHITE, { x: 3, y: 7 }),
      new King(COLORS.WHITE, { x: 4, y: 7 }),
      new Bishop(COLORS.WHITE, { x: 5, y: 7 }),
      new Knight(COLORS.WHITE, { x: 6, y: 7 }),
      new Rook(COLORS.WHITE, { x: 7, y: 7 }),
    ];
    const blackPiecesLine = [
      new Rook(COLORS.BLACK, { x: 0, y: 0 }),
      new Knight(COLORS.BLACK, { x: 1, y: 0 }),
      new Bishop(COLORS.BLACK, { x: 2, y: 0 }),
      new Queen(COLORS.BLACK, { x: 3, y: 0 }),
      new King(COLORS.BLACK, { x: 4, y: 0 }),
      new Bishop(COLORS.BLACK, { x: 5, y: 0 }),
      new Knight(COLORS.BLACK, { x: 6, y: 0 }),
      new Rook(COLORS.BLACK, { x: 7, y: 0 }),
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

  private getBoardDTO = () => {
    return this.board.map((pieces) =>
      pieces.map((piece) => (piece ? piece.getType() : null)),
    );
  };

  sendState: IGame<"chess">["sendState"] = () => {
    const board = this.getBoardDTO();
    this.gameInfo.players[0].socketHandler.sendChessState({
      board,
      isSecondPlayer: false,
    });
    this.gameInfo.players[1].socketHandler.sendChessState({
      board,
      isSecondPlayer: true,
    });
  };

  getBoard = () => this.getBoardDTO();

  getPlayerColor = (player: IPlayer) => {
    if (this.gameInfo.players[0].getId() === player.getId()) {
      return COLORS.WHITE;
    }
    return COLORS.BLACK;
  };

  getPiece: IGame<"chess">["getPiece"] = (piecePosition) => {
    const piece = this.board[piecePosition.y][piecePosition.x];
    return piece;
  };

  movePiece = (position: TPositionSchema, to: TPositionSchema) => {
    const piece = this.board[position.y][position.x];
    if (!piece) return;
    this.board[position.y][position.x] = null;
    this.board[to.y][to.x] = piece;
    piece.move(to);
  };
}
