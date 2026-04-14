import { serve } from "@hono/node-server";
import { matchmakingSchemas } from "core/schemas";
import { randomUUID } from "crypto";
import { Hono } from "hono";
import { Server } from "socket.io";

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

const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("matchmaking", async (game) => {
    const { data, success } = matchmakingSchemas.safeParse(game);
    if (!success) return socket.emit("error");

    await socket.join(data.game);
    const clients = io.sockets.adapter.rooms.get(data.game);
    if (clients && clients.size >= 2) {
      const clientsArray = Array.from(clients);
      const client1 = clientsArray[0];
      const client2 = clientsArray[1];
      io.sockets.in(client1).in(client2).socketsLeave(data.game);

      const newRoom = `${data.game}-${randomUUID()}`;
      io.sockets.in(client1).in(client2).socketsJoin(newRoom);
      io.sockets.in(newRoom).emit("joining", newRoom);
    }
  });
});
