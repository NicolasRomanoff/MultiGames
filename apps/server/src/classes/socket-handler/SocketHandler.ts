import type { TBoardSchema } from "shared/schemas";
import { EVENTS, handleSocketEvent } from "shared/socket";
import type { Socket } from "socket.io";
import type { ISocketHandler } from "./ISocketHandler.js";

export class SocketHandler implements ISocketHandler {
  constructor(private readonly socket: Socket) {}

  join: ISocketHandler["join"] = (room) => {
    this.socket.join(room);
    handleSocketEvent({
      socket: this.socket,
      socketMethod: "emit",
      event: EVENTS.JOIN,
      args: { roomName: room },
    });
  };

  sendChessState: ISocketHandler["sendChessState"] = (board: TBoardSchema) => {
    handleSocketEvent({
      socket: this.socket,
      socketMethod: "emit",
      event: EVENTS.CHESS.BOARD,
      args: { board },
    });
  };
}
