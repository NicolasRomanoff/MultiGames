import type { IGame } from "../IGame.js";

export interface IChess extends IGame {
  fn: () => void;
}
