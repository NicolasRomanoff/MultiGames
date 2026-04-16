import { EVENTS } from "core/constants";
import type { Socket } from "socket.io";

class SocketHandler {
  constructor(private readonly socket: Socket) {}

  join = (room: string) => {
    this.socket.join(room);
    this.socket.emit(EVENTS.JOIN, room);
  };
}

export default SocketHandler;
