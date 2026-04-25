import { COLORS, PROMOTEPIECES } from "shared/constants";
import type {
  TColorsSchema,
  TPiecesSchema,
  TPositionSchema,
  TPromotePiecesSchema,
} from "shared/schemas";
import {
  MOVES,
  type TChessBoardSchema,
  type TChessPreviewBoardSchema,
  type TGameInfo,
  type TPositionLabel,
  type TThreatenedCases,
  type TTypeLabel,
} from "../../../types/global.type.js";
import type { IPlayer } from "../../player/IPlayer.js";
import { Game } from "../Game.js";
import type { IGame } from "../IGame.js";
import { Bishop } from "./pieces/Bishop.js";
import type { ChessPiece } from "./pieces/ChessPiece.js";
import { King } from "./pieces/King.js";
import { Knight } from "./pieces/Knight.js";
import { Pawn } from "./pieces/Pawn.js";
import { Queen } from "./pieces/Queen.js";
import { Rook } from "./pieces/Rook.js";

export class Chess extends Game<"chess"> implements IGame<"chess"> {
  private readonly board: TChessBoardSchema;
  private readonly pieces: Map<TTypeLabel<TPiecesSchema>, ChessPiece> =
    new Map();
  private colorToPlay: TColorsSchema = COLORS.WHITE;

  constructor(gameInfo: TGameInfo) {
    super(gameInfo);
    const whitePawnsLine = Array.from({ length: 8 }, (_, x) => {
      const pawn = new Pawn(COLORS.WHITE, { x, y: 6 });
      this.pieces.set(pawn.getTypeLabel(), pawn);
      return pawn;
    });
    const blackPawnsLine = Array.from({ length: 8 }, (_, x) => {
      const pawn = new Pawn(COLORS.BLACK, { x, y: 1 });
      this.pieces.set(pawn.getTypeLabel(), pawn);
      return pawn;
    });
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
    for (const piece of whitePiecesLine) {
      this.pieces.set(piece.getTypeLabel(), piece);
    }
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
    for (const piece of blackPiecesLine) {
      this.pieces.set(piece.getTypeLabel(), piece);
    }
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

  getBoard = () => this.board;

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

  private updateAllPawnState = (color: TColorsSchema) => {
    for (let x = 0; x <= 7; x++) {
      const pawn = this.pieces.get(`${color}-${x}-pawn`);
      if (!(pawn instanceof Pawn)) throw new Error("Invalid board");
      pawn.updatePawnState();
    }
  };

  static getThreatenedCases = (
    board: TChessBoardSchema,
    threatenedColor: TColorsSchema,
  ): TThreatenedCases => {
    const allThreatenedCases = new Map<TPositionLabel, TPositionSchema>();
    // WIP javascript for
    for (let y = 0; y <= 7; y++) {
      for (let x = 0; x <= 7; x++) {
        const pieceAtPosition = board[y][x];
        if (!pieceAtPosition) continue;
        if (pieceAtPosition.getColor() === threatenedColor) continue;

        let previews = [];
        if (
          pieceAtPosition instanceof Pawn ||
          pieceAtPosition instanceof King
        ) {
          previews = pieceAtPosition.getPreview(board, true);
        } else {
          previews = pieceAtPosition.getPreview(board);
        }

        const previewsPosition = previews.map((preview) => preview.position);
        for (const preview of previewsPosition) {
          allThreatenedCases.set(`y:${preview.y}-x:${preview.x}`, preview);
        }
      }
    }
    return allThreatenedCases;
  };

  private cloneBoard = () => {
    const clone: TChessBoardSchema = [];
    for (const row of this.board) {
      const cloneRow: TChessBoardSchema[number] = [];
      for (const piece of row) {
        cloneRow.push(piece?.clone() || null);
      }
      clone.push(cloneRow);
    }
    return clone;
  };

  removeCheckPosition = (
    piece: ChessPiece,
    piecePreview: TChessPreviewBoardSchema,
  ): TChessPreviewBoardSchema => {
    const newPiecePreview: TChessPreviewBoardSchema = [];
    const piecePosition = piece.getPosition();
    const pieceColor = piece.getColor();
    for (const preview of piecePreview) {
      const tmpBoard = this.cloneBoard();
      tmpBoard[piecePosition.y][piecePosition.x] = null;
      tmpBoard[preview.position.y][preview.position.x] = piece;
      if (piece instanceof King && piece.getColor() === pieceColor) {
        tmpBoard[preview.position.y][preview.position.x] = null;
      }
      const threatenedCases = Chess.getThreatenedCases(tmpBoard, pieceColor);
      if (piece instanceof King && piece.getColor() === pieceColor) {
        const isKingMenaced = threatenedCases.get(
          `y:${preview.position.y}-x:${preview.position.x}`,
        );
        if (isKingMenaced) continue;
        newPiecePreview.push(preview);
      }
      const king = this.pieces.get(`${pieceColor}-king`);
      if (!king) throw new Error("Invalid board");
      if (threatenedCases.get(king.getPositionLabel())) continue;
      newPiecePreview.push(preview);
    }
    return newPiecePreview;
  };

  movePiece = (position: TPositionSchema, to: TPositionSchema) => {
    const piece = this.board[position.y][position.x];
    if (!piece) return false;
    const previewBoard = piece.getPreview(this.board);
    const movePreview = previewBoard.find(
      (preview) => preview.position.x === to.x && preview.position.y === to.y,
    );
    if (!movePreview) return false;
    switch (movePreview.specialMove) {
      case MOVES.ENPASSANT:
        this.board[position.y][to.x] = null;
        break;
      case MOVES.CASTLING:
        if (position.x > to.x) {
          const rook = this.board[position.y][0];
          this.board[to.y][to.x + 1] = rook;
          this.board[position.y][0] = null;
          rook?.move({ x: to.x + 1, y: to.y });
        } else {
          const rook = this.board[position.y][7];
          this.board[to.y][to.x - 1] = rook;
          this.board[position.y][7] = null;
          rook?.move({ x: to.x - 1, y: to.y });
        }
        break;
      case MOVES.PROMOTE: {
        const pawn = this.board[position.y][position.x];
        if (!pawn) return false;
        const playerIsWhite = pawn.getColor() === COLORS.WHITE;
        const player = playerIsWhite
          ? this.gameInfo.players[0]
          : this.gameInfo.players[1];
        player.socketHandler.sendPromoteSuggest(position, to);
        return false;
      }
    }
    this.board[position.y][position.x] = null;
    this.board[to.y][to.x] = piece;
    piece.move(to);
    this.updateAllPawnState(
      piece.getColor() === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE,
    );
    return true;
  };

  private createNewPiecePromote = (
    type: TPromotePiecesSchema,
    color: TColorsSchema,
    position: TPositionSchema,
  ) => {
    switch (type) {
      case PROMOTEPIECES.BISHOP:
        return new Bishop(color, position);
      case PROMOTEPIECES.KNIGHT:
        return new Knight(color, position);
      case PROMOTEPIECES.QUEEN:
        return new Queen(color, position);
      case PROMOTEPIECES.ROOK:
        return new Rook(color, position);
    }
  };

  promote = (
    position: TPositionSchema,
    to: TPositionSchema,
    select: TPromotePiecesSchema,
  ) => {
    const piece = this.board[position.y][position.x];
    if (!piece) return;
    const previewBoard = piece.getPreview(this.board);
    const movePreview = previewBoard.find(
      (preview) => preview.position.x === to.x && preview.position.y === to.y,
    );
    if (!movePreview) return;
    this.board[position.y][position.x] = null;
    const newPiece = this.createNewPiecePromote(select, piece.getColor(), to);
    this.board[to.y][to.x] = newPiece;
    this.updateAllPawnState(
      piece.getColor() === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE,
    );
  };

  getColorToPlay = () => this.colorToPlay;

  switchPlayerToPlay = () => {
    this.colorToPlay =
      this.colorToPlay === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
  };
}
