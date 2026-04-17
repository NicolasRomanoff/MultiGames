import type { TGames } from "shared/types";
import type { IPlayer } from "../player/IPlayer.js";

export interface IPlayerManager {
  addPlayer: (player: IPlayer) => void;
  deletePlayer: (player: IPlayer) => void;
  getPlayers: () => Set<IPlayer>;
  findGame: (game: TGames) => void;
}
