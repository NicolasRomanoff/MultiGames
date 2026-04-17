import { Server as HttpServer, createServer } from "http";
import { EVENTS } from "shared/constants";
import { Server, Socket as ServerSocket } from "socket.io";
import { Socket as ClientSocket, io } from "socket.io-client";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { ISocketHandler } from "../../../src/classes/socket-handler/ISocketHandler.js";
import { SocketHandler } from "../../../src/classes/socket-handler/SocketHandler.js";

const PORT = 3000;

describe("PlayerManager", () => {
  const httpServer: HttpServer = createServer();
  let server: Server;
  let clientSocket: ClientSocket;
  let serverSocket: ServerSocket;
  let socketHandler: ISocketHandler;

  beforeAll(() => {
    httpServer.listen(PORT);
  });

  beforeEach(async () => {
    server = new Server(httpServer);

    await new Promise<void>((resolve) => {
      server.once("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket = io(`http://localhost:${PORT}`);
      clientSocket.once("connect", resolve);
    });

    socketHandler = new SocketHandler(serverSocket);
  });

  afterEach(() => {
    server.close();
  });

  it("join", async () => {
    const roomName = "room-test";

    socketHandler.join(roomName);
    let emitResult = "";
    await new Promise<void>((resolve) => {
      clientSocket.on(EVENTS.JOIN, (room) => {
        emitResult = room;
        resolve();
      });
    });

    const room = server.sockets.adapter.rooms.get(roomName);
    expect(room?.has(serverSocket.id)).toBeTruthy();
    expect(emitResult).toBe(roomName);
  });
});
