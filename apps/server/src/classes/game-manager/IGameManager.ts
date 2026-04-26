import type { TGamesSchema, TRoomNameSchema } from "shared/schemas";
import type { Chess } from "../games/chess/Chess.js";
import type { IGame } from "../games/IGame.js";

export type GameMap = {
  "chess-": Chess;
};

export type TGameFromRoomName<TRoomName extends string> = {
  [TPrefix in keyof GameMap]: TRoomName extends `${TPrefix}${string}`
    ? GameMap[TPrefix]
    : never;
}[keyof GameMap];

export interface IGameManager {
  addGame: (game: IGame<TGamesSchema>) => void;
  findGame: <TRoomName extends TRoomNameSchema>(
    roomName: TRoomName,
  ) => TGameFromRoomName<TRoomName> | undefined;
  clearGameManagerInterval: () => void;
}
