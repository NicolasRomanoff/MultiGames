import type { TGameInfo } from "../../types/global.type.js";
import { Chess } from "../games/chess/Chess.js";
import type { IChess } from "../games/chess/IChess.js";
import type { IGameManager } from "./IGameManager.js";

export class GameManager implements IGameManager {
  private readonly games: Set<IChess> = new Set();

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

  findGame: IGameManager["findGame"] = (roomName) => {
    const games = Array.from(this.games);
    return games.find((game) => game.getRoomName() === roomName);
  };
}
