import { EVENTS } from "shared/constants";
import type { Socket } from "socket.io";
import type { ISocketHandler } from "./ISocketHandler.js";

export class SocketHandler implements ISocketHandler {
  constructor(private readonly socket: Socket) {}

  join: ISocketHandler["join"] = (room) => {
    this.socket.join(room);
    this.socket.emit(EVENTS.JOIN, room);
  };
}
