import { serve } from "@hono/node-server";
import { matchmakingSchemas } from "core/schemas";
import { Hono } from "hono";
import { Server } from "socket.io";
import Player from "./classes/Player.js";
import PlayerManager from "./classes/PlayerManager.js";
import SocketHandler from "./classes/SocketHandler.js";

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

  socket.on("matchmaking", async (game) => {
    const { data, success } = matchmakingSchemas.safeParse(game);
    if (!success) return;

    player.setGame(data.game);
    playerManager.findGame(data.game);
  });

  socket.on("disconnect", () => {
    playerManager.deletePlayer(player);
  });
});
