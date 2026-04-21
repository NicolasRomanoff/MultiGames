import type { TGameInfo } from "../../types/global.type.js";
import type { IGame } from "./IGame.js";

export abstract class Game implements IGame {
  constructor(protected readonly gameInfo: TGameInfo) {
    if (Math.floor(Math.random() * 2)) gameInfo.players.reverse();
  }

  getRoomName: IGame["getRoomName"] = () => this.gameInfo.roomName;
  abstract sendState: IGame["sendState"];
  abstract getPiece: IGame["getPiece"];
}
