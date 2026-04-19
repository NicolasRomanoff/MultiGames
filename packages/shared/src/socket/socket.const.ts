import z from "zod";
import { games } from "../constants/global.const.js";

export const EVENTS = {
  MATCHMAKING: "matchmaking",
  JOIN: "join",
  LEAVE: "leave",
  CHESS: { READY: "chess-ready", BOARD: "chess-board" },
  CHECKERS: { READY: "checkers-ready" },
  CONNECT4: { READY: "connect4-ready" },
} as const;

export const events = {
  [EVENTS.MATCHMAKING]: {
    emit: z.object({ game: z.enum(games) }),
    on: z.function({
      input: [z.object({ game: z.enum(games) })],
      output: z.void(),
    }),
  },
  [EVENTS.JOIN]: { emit: z.object({}), on: z.function() },
  [EVENTS.LEAVE]: { emit: z.object({}), on: z.function() },
  [EVENTS.CHESS.READY]: { emit: z.object({}), on: z.function() },
  [EVENTS.CHESS.BOARD]: { emit: z.object({}), on: z.function() },
  [EVENTS.CHECKERS.READY]: { emit: z.object({}), on: z.function() },
  [EVENTS.CONNECT4.READY]: { emit: z.object({}), on: z.function() },
} as const;

export const socketMethod = ["on", "emit"] as const;
