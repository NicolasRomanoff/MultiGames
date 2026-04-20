import type { IChess } from "../games/chess/IChess.js";

export interface IGameManager {
  addGame: (game: IChess) => void;
  findGame: (roomName: string) => IChess | undefined;
}
