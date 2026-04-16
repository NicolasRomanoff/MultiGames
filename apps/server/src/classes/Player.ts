import type { TGames } from "core/types";
import type SocketHandler from "./SocketHandler.js";

class Player {
  private game: TGames | null = null;

  constructor(public readonly socketHandler: SocketHandler) {}

  getGame = () => this.game;

  setGame = (game: TGames | null) => {
    this.game = game;
  };
}

export default Player;
