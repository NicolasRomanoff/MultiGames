import GameManager from "./GameManager.js";
import PlayerManager from "./PlayerManager.js";

class Manager {
  public playerManager: PlayerManager;
  public gameManager: GameManager;

  constructor() {
    this.playerManager = new PlayerManager();
    this.gameManager = new GameManager();
  }
}

export default Manager;
