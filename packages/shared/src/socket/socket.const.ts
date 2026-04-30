import z, { ZodType } from "zod";
import {
  boardPreviewSchema,
  boardSchema,
  chessTimers,
  positionSchema,
  promoteSchema,
  wantPromoteSchema,
  winnerSchema,
} from "../schemas/chess.schema.js";
import {
  GamesSchema,
  chessRoomNameSchema,
  roomNameSchema,
} from "../schemas/global.schema.js";
import type { TEventValue } from "./socket.type.js";

export const EVENTS = {
  MATCHMAKING: "matchmaking",
  JOIN: "join",
  LEAVE: "leave",
  CHESS: {
    READY: "chess-ready",
    BOARD: "chess-board",
    SELECTION: "chess-selection",
    PREVIEW: "chess-preview",
    MOVE: "chess-move",
    WANTPROMOTE: "chess-wantpromote",
    PROMOTE: "chess-promote",
    TIMERS: "chess-timers",
    WINNER: "chess-winner",
  },
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
  [EVENTS.MATCHMAKING]: createEvent(z.object({ game: GamesSchema })),
  [EVENTS.JOIN]: createEvent(z.object({ roomName: roomNameSchema })),
  [EVENTS.LEAVE]: createEvent(z.null()),
  [EVENTS.CHESS.READY]: createEvent(
    z.object({ roomName: chessRoomNameSchema }),
  ),
  [EVENTS.CHESS.BOARD]: createEvent(
    z.object({ board: boardSchema, isSecondPlayer: z.boolean() }),
  ),
  [EVENTS.CHESS.SELECTION]: createEvent(
    z.object({ roomName: chessRoomNameSchema, piecePosition: positionSchema }),
  ),
  [EVENTS.CHESS.PREVIEW]: createEvent(
    z.object({ preview: boardPreviewSchema }),
  ),
  [EVENTS.CHESS.MOVE]: createEvent(
    z.object({
      roomName: chessRoomNameSchema,
      position: positionSchema,
      to: positionSchema,
    }),
  ),
  [EVENTS.CHESS.WANTPROMOTE]: createEvent(wantPromoteSchema),
  [EVENTS.CHESS.PROMOTE]: createEvent(promoteSchema),
  [EVENTS.CHESS.TIMERS]: createEvent(chessTimers),
  [EVENTS.CHESS.WINNER]: createEvent(z.object({ winner: winnerSchema })),
} as const satisfies Record<TEventValue, unknown>;

export const socketMethod = ["on", "emit"] as const;
