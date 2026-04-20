import z, { ZodType } from "zod";
import { games } from "../constants/global.const.js";
import { boardSchema } from "../schemas/chess.schema.js";
import type { TEventValue } from "./socket.type.js";

export const EVENTS = {
  MATCHMAKING: "matchmaking",
  JOIN: "join",
  LEAVE: "leave",
  CHESS: { READY: "chess-ready", BOARD: "chess-board" },
} as const;

const createEvent = <TSchema extends ZodType>(dataSchema: TSchema) => {
  return {
    emit: dataSchema,
    on: z.function({
      input: [dataSchema],
      output: z.void(),
    }),
  };
};

export const events = {
  [EVENTS.MATCHMAKING]: createEvent(z.object({ game: z.enum(games) })),
  [EVENTS.JOIN]: createEvent(z.object({ roomName: z.string() })),
  [EVENTS.LEAVE]: createEvent(z.null()),
  [EVENTS.CHESS.READY]: createEvent(z.object({ roomName: z.string() })),
  [EVENTS.CHESS.BOARD]: createEvent(z.object({ board: boardSchema })),
} as const satisfies Record<TEventValue, unknown>;

export const socketMethod = ["on", "emit"] as const;
