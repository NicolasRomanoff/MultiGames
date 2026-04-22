import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { EVENTS, handleSocketEvent } from "shared/socket";
import { Server } from "socket.io";
import { GameManager } from "./classes/game-manager/GameManager.js";
import { PlayerManager } from "./classes/player-manager/PlayerManager.js";
import { Player } from "./classes/player/Player.js";
import { SocketHandler } from "./classes/socket-handler/SocketHandler.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const httpServer = serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

const server = new Server(httpServer);
const playerManager = new PlayerManager();
const gameManager = new GameManager();

server.on("connection", (socket) => {
  const socketHandler = new SocketHandler(socket);
  const player = new Player(socketHandler);
  playerManager.addPlayer(player);

  handleSocketEvent({
    socket,
    socketMethod: "on",
    event: EVENTS.MATCHMAKING,
    args: ({ game }) => {
      player.setGame(game);
      const gameInfo = playerManager.findGame(game);
      if (gameInfo) {
        const newGame = GameManager.createNewGame(gameInfo);
        gameManager.addGame(newGame);
      }
    },
  });

  handleSocketEvent({
    socket,
    socketMethod: "on",
    event: EVENTS.LEAVE,
    args: () => {
      playerManager.deletePlayer(player);
    },
  });

  handleSocketEvent({
    socket,
    socketMethod: "on",
    event: EVENTS.CHESS.READY,
    args: ({ roomName }) => {
      const game = gameManager.findGame(roomName);
      if (!game) return;
      game.sendState();
    },
  });

  handleSocketEvent({
    socket,
    socketMethod: "on",
    event: EVENTS.CHESS.SELECTION,
    args: ({ roomName, piecePosition }) => {
      const game = gameManager.findGame(roomName);
      if (!game) return;
      const chessPiece = game.getPiece(piecePosition);
      if (!chessPiece) return;
      if (game.getPlayerColor(player) !== chessPiece.getColor()) return;
      const piecePreview = chessPiece.getPreview(game.getBoard());
      player.socketHandler.sendChessPreview(piecePreview);
    },
  });

  handleSocketEvent({
    socket,
    socketMethod: "on",
    event: EVENTS.CHESS.MOVE,
    args: ({ roomName, position, to }) => {
      const game = gameManager.findGame(roomName);
      if (!game) return;
      const chessPiece = game.getPiece(position);
      if (!chessPiece) return;
      if (game.getPlayerColor(player) !== chessPiece.getColor()) return;
      game.movePiece(position, to);
      game.sendState();
    },
  });

  socket.on("disconnect", () => {
    playerManager.deletePlayer(player);
  });
});
