import { beforeEach, describe, expect, it } from "vitest";
import type { IPlayer } from "../../../src/classes/player/IPlayer.js";
import { Player } from "../../../src/classes/player/Player.js";
import { getSocketHandlerMock } from "../socket-handler/socketHandler.mock.js";

describe("Player", () => {
  let player: IPlayer;

  beforeEach(() => {
    const socketHandlerMock = getSocketHandlerMock();
    player = new Player(socketHandlerMock);
  });

  it("get/set game", () => {
    const game = "chess";

    player.setGame(game);

    expect(player.getGame()).toBe(game);
  });
});
