import type { Socket } from "socket.io";

class SocketHandler {
  constructor(private readonly socket: Socket) {}

  join = (room: string) => {
    this.socket.join(room);
    this.socket.emit("join", room);
  };
}

export default SocketHandler;
