import { createServer } from "node:http";
import { Server, type Socket as ServerSocket } from "socket.io";
import { io as ioc, type Socket as ClientSocket } from "socket.io-client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { handleMatchmaking } from "../../src/socket/matchmaking.js";

const PORT = 3000;

type TClient = {
  id: number;
  clientSocket?: ClientSocket;
  serverSocket?: ServerSocket;
};

const initClientSockets = async (
  server: Server,
  nbOfClients: number,
): Promise<TClient[]> => {
  const clients: TClient[] = Array.from({ length: nbOfClients }).map(
    (_, i) => ({ id: i }),
  );
  server.on("connection", (serverSocket) => {
    const id = serverSocket.handshake.auth.id;
    const client = clients.find((client) => client.id === id);
    if (!client) return;
    client.serverSocket = serverSocket;
  });
  await Promise.all(
    clients.map((client) => {
      return new Promise<void>((resolve) => {
        const clientSocket = ioc(`http://localhost:${PORT}`, {
          auth: { id: client.id },
        });
        clientSocket.on("connect", resolve);
        client.clientSocket = clientSocket;
      });
    }),
  );
  return clients;
};

const resetSockets = (server: Server, clients: TClient[]) => {
  server.removeAllListeners("connection");
  for (const client of clients) {
    client.serverSocket = undefined;
    if (!client.clientSocket) continue;
    client.clientSocket.removeAllListeners();
    client.clientSocket.disconnect();
    client.clientSocket = undefined;
  }
};

const runTestWithClientSockets = async <T>(
  server: Server,
  nbOfClients: number,
  test: (clients: TClient[]) => Promise<T>,
) => {
  const clients = await initClientSockets(server, nbOfClients);
  await test(clients);
  resetSockets(server, clients);
};

describe("sockets", () => {
  let server: Server;

  beforeAll(() => {
    const httpServer = createServer();
    server = new Server(httpServer);
    httpServer.listen(PORT);
  });

  afterAll(() => {
    server.close();
  });

  it("should join matchmaking", async () => {
    const nbOfClients = 2;
    await runTestWithClientSockets(server, nbOfClients, async (clients) => {
      const game = "chess";
      await Promise.all(
        clients.map((client) => {
          return new Promise<void>((resolve) => {
            client.serverSocket!.on("matchmaking", async (game) => {
              await handleMatchmaking(server, client.serverSocket!, game);
              resolve();
            });
            client.clientSocket!.emit("matchmaking", game);
          });
        }),
      );
      const rooms = server.sockets.adapter.rooms;
      expect("chess").toEqual(game);
    });
  });
});
