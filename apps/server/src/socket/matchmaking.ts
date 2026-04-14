import type { TGames } from "core/types";
import { randomUUID } from "crypto";
import type { Server, Socket } from "socket.io";

export const handleMatchmaking = async (
  server: Server,
  socket: Socket,
  game: TGames,
) => {
  await socket.join(game);
  const clients = server.sockets.adapter.rooms.get(game);
  if (clients && clients.size >= 2) {
    const clientsArray = Array.from(clients);
    const client1 = clientsArray[0];
    const client2 = clientsArray[1];
    server.sockets.in(client1).in(client2).socketsLeave(game);

    const newRoom = `${game}-${randomUUID()}`;
    server.sockets.in(client1).in(client2).socketsJoin(newRoom);
    server.sockets.in(newRoom).emit("joining", newRoom);
  }
};
