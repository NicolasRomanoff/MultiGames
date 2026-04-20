import { beforeEach, describe, expect, it, vi } from "vitest";
import type { IPlayerManager } from "../../../src/classes/player-manager/IPlayerManager.js";
import { PlayerManager } from "../../../src/classes/player-manager/PlayerManager.js";
import { Player } from "../../../src/classes/player/Player.js";
import { getPlayerMock } from "../player/player.mock.js";
import { getSocketHandlerMock } from "../socket-handler/socketHandler.mock.js";

describe("PlayerManager", () => {
  let playerManager: IPlayerManager;

  beforeEach(() => {
    playerManager = new PlayerManager();
  });

  it("get players / add player", () => {
    const player = getPlayerMock();

    playerManager.addPlayer(player);

    expect(playerManager.getPlayers()).toBeTypeOf("object");
    expect(playerManager.getPlayers().size).toBe(1);
    expect(playerManager.getPlayers().has(player)).toBeTruthy();
  });

  it("delete player", () => {
    const player = getPlayerMock();

    playerManager.addPlayer(player);
    playerManager.deletePlayer(player);

    expect(playerManager.getPlayers()).toBeTypeOf("object");
    expect(playerManager.getPlayers().size).toBe(0);
    expect(playerManager.getPlayers().has(player)).toBeFalsy();
  });

  it("find game with 1 player", () => {
    const game = "chess";
    const player = new Player(getSocketHandlerMock());
    player.setGame(game);
    playerManager.addPlayer(player);

    const result = playerManager.findGame(game);

    expect(player.socketHandler.join).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("find game with 2 players", () => {
    const game = "chess";
    vi.spyOn(playerManager, "deletePlayer");
    const player1 = new Player(getSocketHandlerMock());
    const player2 = new Player(getSocketHandlerMock());
    player1.setGame(game);
    player2.setGame(game);
    playerManager.addPlayer(player1);
    playerManager.addPlayer(player2);

    const result = playerManager.findGame(game);

    expect(player1.socketHandler.join).toHaveBeenCalled();
    expect(player2.socketHandler.join).toHaveBeenCalled();
    expect(playerManager.deletePlayer).toHaveBeenCalledTimes(2);
    expect(result?.type).toBe(game);
    expect(result?.roomName).toBeTypeOf("string");
    expect(result?.players).toEqual([player1, player2]);
  });
});
