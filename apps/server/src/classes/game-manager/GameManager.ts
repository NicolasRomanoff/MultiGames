import type { TRoomNameSchema } from "shared/schemas";
import type { TGameInfo } from "../../types/global.type.js";
import { Chess } from "../games/chess/Chess.js";
import type { IGame } from "../games/IGame.js";
import type { IGameManager, TGameFromRoomName } from "./IGameManager.js";

export class GameManager implements IGameManager {
  private readonly games: Set<IGame<"chess" | "checkers" | "connect4">> =
    new Set();
  private readonly interval = setInterval(() => {
    for (const game of this.games) {
      game.handleTimers();
      if (game.getIsDone()) {
        this.games.delete(game);
      }
    }
  }, 1000);

  static createNewGame = (gameInfo: TGameInfo) => {
    switch (gameInfo.type) {
      case "chess":
        return new Chess(gameInfo);
    }
    throw new Error("createNewGame: WIP");
  };

  addGame: IGameManager["addGame"] = (game) => {
    this.games.add(game);
  };

  findGame<TRoomName extends TRoomNameSchema>(
    roomName: TRoomName,
  ): TGameFromRoomName<TRoomName> | undefined {
    const games = Array.from(this.games);
    return games.find((game) => game.getRoomName() === roomName) as
      | TGameFromRoomName<TRoomName>
      | undefined;
  }

  clearGameManagerInterval: IGameManager["clearGameManagerInterval"] = () => {
    clearInterval(this.interval);
  };
}
