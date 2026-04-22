import type { TGames } from "shared/types";
import type { IGame } from "../games/IGame.js";

export interface IGameManager<T extends TGames> {
  addGame: (game: IGame<T>) => void;
  findGame: (roomName: string) => IGame<T> | undefined;
}
