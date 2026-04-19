import type { DeepValues } from "../types/utils.type.js";
import type { events, EVENTS, socketMethod } from "./socket.const.js";

export type TEventValue = DeepValues<typeof EVENTS>;

export type TEvents = typeof events;

export type TSocketMethod = (typeof socketMethod)[number];
