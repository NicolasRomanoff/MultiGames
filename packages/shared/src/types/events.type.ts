import type z from "zod";
import { EVENTS } from "../constants/events.const.js";
import type { AllValuesOfObject } from "./utils.type.js";

export type TSocketMethods = {
  emit: z.ZodObject;
  on: z.ZodFunction;
};

export type TEventValue = AllValuesOfObject<typeof EVENTS>;
