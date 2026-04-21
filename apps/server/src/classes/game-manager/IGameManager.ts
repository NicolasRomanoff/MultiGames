import type { IGame } from "../games/IGame.js";

export interface IGameManager {
  addGame: (game: IGame) => void;
  findGame: (roomName: string) => IGame | undefined;
}
