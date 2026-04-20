import type { Socket as ServerSocket } from "socket.io";
import type { Socket as ClientSocket } from "socket.io-client";
import z from "zod";
import { events } from "./socket.const.js";
import type { TEvents, TEventValue, TSocketMethod } from "./socket.type.js";

export const handleSocketEvent = <
  S extends TSocketMethod,
  E extends TEventValue,
>({
  socket,
  socketMethod,
  event,
  args,
}: {
  socket: ClientSocket | ServerSocket;
  socketMethod: S;
  event: E;
  args: z.infer<TEvents[E][S]>;
}) => {
  const schema = events[event][socketMethod];
  const { data, success } = schema.safeParse(args);
  if (!success) {
    console.log("Error zod : handleSocketEvent");
    return;
  }

  socket[socketMethod](event, data);
};
