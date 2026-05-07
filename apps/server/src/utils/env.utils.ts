import * as dotenv from "dotenv";
import z from "zod";

dotenv.config({ path: "../../.env" });

export const env = {
  PUBLIC_SERVER_URL: z.parse(z.url(), process.env.PUBLIC_SERVER_URL),
  PUBLIC_SERVER_PORT: z.parse(
    z.coerce.number(),
    process.env.PUBLIC_SERVER_PORT,
  ),
};
