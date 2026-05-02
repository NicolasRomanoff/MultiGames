import type { TGamesSchema } from "shared/schemas";
import type { TGameInfo } from "../../types/global.type.js";
import type { IGame } from "./IGame.js";

export abstract class Game<TGame extends TGamesSchema> implements IGame<TGame> {
  constructor(protected readonly gameInfo: TGameInfo) {
    if (Math.floor(Math.random() * 2)) gameInfo.players.reverse();
  }

  getRoomName: IGame<TGame>["getRoomName"] = () => this.gameInfo.roomName;
  abstract sendState: IGame<TGame>["sendState"];
  abstract getPiece: IGame<TGame>["getPiece"];
  abstract handleTimers: IGame<TGame>["handleTimers"];
  abstract getIsDone: IGame<TGame>["getIsDone"];
}
