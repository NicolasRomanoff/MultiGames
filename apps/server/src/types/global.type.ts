import type { TGamesSchema } from "shared/schemas";
import type { IPlayer } from "../classes/player/IPlayer.js";

export type TGameInfo = {
  type: TGamesSchema;
  roomName: string;
  players: IPlayer[];
};
