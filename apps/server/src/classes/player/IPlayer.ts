import type { TGamesSchema } from "shared/schemas";
import type { ISocketHandler } from "../socket-handler/ISocketHandler.js";

export interface IPlayer {
  socketHandler: ISocketHandler;
  getId: () => string;
  getGame: () => TGamesSchema | null;
  setGame: (game: TGamesSchema | null) => void;
}
