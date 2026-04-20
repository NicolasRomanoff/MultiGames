import type { TGames } from "shared/types";
import { describe, expect, it } from "vitest";
import { GameManager } from "../../../src/classes/game-manager/GameManager.js";
import type { IGameManager } from "../../../src/classes/game-manager/IGameManager.js";
import { Chess } from "../../../src/classes/games/chess/Chess.js";
import type { TGameInfo } from "../../../src/types/global.type.js";
import { getPlayerMock } from "../player/player.mock.js";

describe("GameManager", () => {
  const gameManager: IGameManager = new GameManager();

  it("createNewGame", () => {
    const chessGameInfo = {
      type: "chess",
      roomName: "roomName-test",
      players: [getPlayerMock(), getPlayerMock()],
    } as TGameInfo;

    const chessGame = GameManager.createNewGame(chessGameInfo);

    expect(chessGame).toBeInstanceOf(Chess);
  });

  it("add/find game", () => {
    const gameInfo = {
      type: "chess" as TGames,
      roomName: "roomName-test",
      players: [getPlayerMock(), getPlayerMock()],
    };
    const newGame = GameManager.createNewGame(gameInfo);

    gameManager.addGame(newGame);

    expect(gameManager.findGame(gameInfo.roomName)).toBe(newGame);
  });
});
