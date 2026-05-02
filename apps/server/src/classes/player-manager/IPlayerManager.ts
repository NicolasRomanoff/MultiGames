import type { TGamesSchema } from "shared/schemas";
import type { TGameInfo } from "../../types/global.type.js";
import type { IPlayer } from "../player/IPlayer.js";

export interface IPlayerManager {
  addPlayer: (player: IPlayer) => void;
  deletePlayer: (player: IPlayer) => void;
  getPlayers: () => Set<IPlayer>;
  findGame: (game: TGamesSchema) => TGameInfo | null;
}
