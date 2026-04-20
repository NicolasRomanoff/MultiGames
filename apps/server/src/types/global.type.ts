import type { TGames } from "shared/types";
import type { IPlayer } from "../classes/player/IPlayer.js";

export type TGameInfo = {
  type: TGames;
  roomName: string;
  players: IPlayer[];
};
