import type { TGames } from "shared/types";
import { v4 as uuidv4 } from "uuid";
import type { ISocketHandler } from "../socket-handler/ISocketHandler.js";
import type { IPlayer } from "./IPlayer.js";

export class Player implements IPlayer {
  private id = uuidv4();
  private game: TGames | null = null;

  constructor(public readonly socketHandler: ISocketHandler) {}

  getId: IPlayer["getId"] = () => this.id;

  getGame: IPlayer["getGame"] = () => this.game;

  setGame: IPlayer["setGame"] = (game) => {
    this.game = game;
  };
}
