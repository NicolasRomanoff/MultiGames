import { createServer } from "node:http";
import { Server, type Socket as ServerSocket } from "socket.io";
import { io as ioc, type Socket as ClientSocket } from "socket.io-client";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { handleMatchmaking } from "../../src/socket/matchmaking.js";

const PORT = 3000;
const MAX_CLIENTS = 2;

type TClient = {
  id: number;
  clientSocket?: ClientSocket;
  serverSocket?: ServerSocket;
};

describe("sockets", () => {
  let server: Server;
  const clients: TClient[] = Array.from({ length: MAX_CLIENTS }).map(
    (_, i) => ({
      id: i,
    }),
  );

  beforeAll(() => {
    const httpServer = createServer();
    server = new Server(httpServer);
    httpServer.listen(PORT);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async () => {
    await new Promise<void>((resolve) => {
      const checkInit = () => {
        if (
          clients.every(
            (client) => client.clientSocket?.connected && client.serverSocket,
          )
        ) {
          resolve();
        }
      };

      server.on("connection", (socket) => {
        const clientId = Number(socket.handshake.auth.clientId);
        const client = clients.find((client) => client.id === clientId);
        if (!client) return;
        client.serverSocket = socket;
        checkInit();
      });

      for (const client of clients) {
        const clientSocket = ioc(`http://localhost:${PORT}`, {
          auth: {
            clientId: client.id,
          },
        });
        client.clientSocket = clientSocket;
        clientSocket.once("connect", () => {
          checkInit();
        });
      }
    });
  });

  afterEach(() => {
    server.removeAllListeners("connection");
    for (const client of clients) {
      client.serverSocket = undefined;
      if (!client.clientSocket) continue;
      client.clientSocket.removeAllListeners();
      client.clientSocket.disconnect();
      client.clientSocket = undefined;
    }
  });

  it("should join matchmaking", async () => {
    const game = "chess";
    await Promise.all(
      clients.map(
        (client) =>
          new Promise<void>((resolve) => {
            client.serverSocket!.on("matchmaking", async (game) => {
              await handleMatchmaking(server, client.serverSocket!, game);
              resolve();
            });
            client.clientSocket!.emit("matchmaking", game);
          }),
      ),
    );

    console.log(server.sockets.adapter.rooms);
    expect(game).toEqual(game);
  });
});
