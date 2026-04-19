import z from "zod";
import { EVENTS } from "../constants/events.const.js";
import type { TEventValue, TSocketMethods } from "../types/events.type.js";

const events: Record<TEventValue, TSocketMethods> = {
  [EVENTS.MATCHMAKING]: { emit: z.object(), on: z.function() },
  [EVENTS.JOIN]: { emit: z.object(), on: z.function() },
  [EVENTS.LEAVE]: { emit: z.object(), on: z.function() },
  [EVENTS.CHESS.READY]: { emit: z.object(), on: z.function() },
  [EVENTS.CHESS.BOARD]: { emit: z.object(), on: z.function() },
  [EVENTS.CHECKERS.READY]: { emit: z.object(), on: z.function() },
  [EVENTS.CONNECT4.READY]: { emit: z.object(), on: z.function() },
} as const;

type TSocketMethod<T extends keyof TSocketMethods> =
  (typeof events)[keyof typeof events][T];

export const getSocketEvent = <T extends keyof TSocketMethods>(
  event: TEventValue,
  socketMethod: T,
): [TEventValue, TSocketMethod<T>] => {
  return [event, events[event][socketMethod]];
};
