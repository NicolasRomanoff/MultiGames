import type { TGames } from "shared/types";
import type { ISocketHandler } from "../socket-handler/ISocketHandler.js";

export interface IPlayer {
  socketHandler: ISocketHandler;
  getId: () => string;
  getGame: () => TGames | null;
  setGame: (game: TGames | null) => void;
}
