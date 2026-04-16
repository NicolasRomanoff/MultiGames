import type { TGames } from "core/types";
import { randomUUID } from "crypto";
import type Player from "./Player.js";

class PlayerManager {
  private readonly players: Set<Player> = new Set();

  addPlayer = (player: Player) => {
    this.players.add(player);
  };

  deletePlayer = (player: Player) => {
    this.players.delete(player);
  };

  findGame = (game: TGames) => {
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

export default PlayerManager;
