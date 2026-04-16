import type { TGames } from "core/types";
import type { ISocketHandler } from "../socket-handler/ISocketHandler.js";
import type { IPlayer } from "./IPlayer.js";

export class Player implements IPlayer {
  private game: TGames | null = null;

  constructor(public readonly socketHandler: ISocketHandler) {}

  getGame: IPlayer["getGame"] = () => this.game;

  setGame: IPlayer["setGame"] = (game) => {
    this.game = game;
  };
}
