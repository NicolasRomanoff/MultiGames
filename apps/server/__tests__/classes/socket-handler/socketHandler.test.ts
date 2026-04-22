import { createServer, Server as HttpServer } from "http";
import { EVENTS, handleSocketEvent } from "shared/socket";
import { Server, Socket as ServerSocket } from "socket.io";
import { Socket as ClientSocket, io } from "socket.io-client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { ISocketHandler } from "../../../src/classes/socket-handler/ISocketHandler.js";
import { SocketHandler } from "../../../src/classes/socket-handler/SocketHandler.js";

const PORT = 3000;

describe("PlayerManager", () => {
  let httpServer: HttpServer;
  let server: Server;
  let clientSocket: ClientSocket;
  let serverSocket: ServerSocket;
  let socketHandler: ISocketHandler;

  beforeEach(async () => {
    httpServer = createServer();
    httpServer.listen(PORT);
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

  afterEach(async () => {
    clientSocket.removeAllListeners();
    clientSocket.disconnect();
    server.removeAllListeners();
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
    await new Promise<void>((resolve) => {
      httpServer.close(() => resolve());
    });
  });

  it("join", async () => {
    const roomName = "chess-test";

    socketHandler.join(roomName);
    let emitResult = "";
    await new Promise<void>((resolve) => {
      handleSocketEvent({
        socket: clientSocket,
        socketMethod: "on",
        event: EVENTS.JOIN,
        args: ({ roomName }) => {
          emitResult = roomName;
          resolve();
        },
      });
    });

    const room = server.sockets.adapter.rooms.get(roomName);
    expect(room?.has(serverSocket.id)).toBeTruthy();
    expect(emitResult).toBe(roomName);
  });

  it("sendChessState first player", async () => {
    const board = Array.from({ length: 8 }).map(() =>
      Array.from({ length: 8 }).map(() => null),
    );

    socketHandler.sendChessState({
      isSecondPlayer: false,
      board,
    });
    let emitResult = null;
    await new Promise<void>((resolve) => {
      handleSocketEvent({
        socket: clientSocket,
        socketMethod: "on",
        event: EVENTS.CHESS.BOARD,
        args: ({ isSecondPlayer, board }) => {
          emitResult = { isSecondPlayer, board: structuredClone(board) };
          resolve();
        },
      });
    });

    expect(emitResult).toEqual({ isSecondPlayer: false, board });
  });
});
