import { randomUUID } from "crypto";
import type { IPlayer } from "../player/IPlayer.js";
import type { IPlayerManager } from "./IPlayerManager.js";

export class PlayerManager implements IPlayerManager {
  private readonly players: Set<IPlayer> = new Set();

  addPlayer: IPlayerManager["addPlayer"] = (player) => {
    this.players.add(player);
  };

  deletePlayer: IPlayerManager["deletePlayer"] = (player) => {
    this.players.delete(player);
  };

  getPlayers: IPlayerManager["getPlayers"] = () => this.players;

  findGame: IPlayerManager["findGame"] = (game) => {
    const arrayOfPlayers = Array.from(this.players);
    const players = arrayOfPlayers.filter(
      (player) => player.getGame() === game,
    );
    if (players.length < 2) return;

    const newRoomGame = `${game}-${randomUUID()}`;
    for (const player of players.slice(0, 2)) {
      player.socketHandler.join(newRoomGame);
      this.deletePlayer(player);
    }
  };
}
