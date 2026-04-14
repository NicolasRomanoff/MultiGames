import { serve } from "@hono/node-server";
import { matchmakingSchemas } from "core/schemas";
import { Hono } from "hono";
import { Server } from "socket.io";
import { handleMatchmaking } from "./socket/matchmaking.js";

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

server.on("connection", (socket) => {
  socket.on("matchmaking", async (game) => {
    const { data, success } = matchmakingSchemas.safeParse(game);
    if (!success) return socket.emit("error");

    await handleMatchmaking(server, socket, data.game);
  });
});
