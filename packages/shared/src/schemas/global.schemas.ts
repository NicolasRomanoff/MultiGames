import z from "zod";
import { games } from "../constants/global.const.js";

export const matchmakingSchemas = z.object({ game: z.enum(games) });
