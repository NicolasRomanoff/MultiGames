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

  sendChessState: ISocketHandler["sendChessState"] = ({
    isSecondPlayer,
    board,
  }) => {
    handleSocketEvent({
      socket: this.socket,
      socketMethod: "emit",
      event: EVENTS.CHESS.BOARD,
      args: { isSecondPlayer, board },
    });
  };

  sendChessPreview: ISocketHandler["sendChessPreview"] = (preview) => {
    handleSocketEvent({
      socket: this.socket,
      socketMethod: "emit",
      event: EVENTS.CHESS.PREVIEW,
      args: { preview },
    });
  };

  sendPromoteSuggest: ISocketHandler["sendPromoteSuggest"] = (position, to) => {
    handleSocketEvent({
      socket: this.socket,
      socketMethod: "emit",
      event: EVENTS.CHESS.WANTPROMOTE,
      args: { position, to },
    });
  };

  sendChessTimers: ISocketHandler["sendChessTimers"] = (timers) => {
    handleSocketEvent({
      socket: this.socket,
      socketMethod: "emit",
      event: EVENTS.CHESS.TIMERS,
      args: timers,
    });
  };
}
