import { serve } from "@hono/node-server";
import { EVENTS } from "core/constants";
import { matchmakingSchemas } from "core/schemas";
import { Hono } from "hono";
import { Server } from "socket.io";
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

server.on("connection", (socket) => {
  const socketHandler = new SocketHandler(socket);
  const player = new Player(socketHandler);
  playerManager.addPlayer(player);

  socket.on(EVENTS.MATCHMAKING, async (game) => {
    const { data, success } = matchmakingSchemas.safeParse(game);
    if (!success) return;

    player.setGame(data.game);
    playerManager.findGame(data.game);
  });

  socket.on(EVENTS.LEAVE, () => {
    playerManager.deletePlayer(player);
  });

  socket.on("disconnect", () => {
    playerManager.deletePlayer(player);
  });
});
