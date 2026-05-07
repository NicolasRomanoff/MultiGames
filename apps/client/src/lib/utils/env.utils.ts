import z from "zod";

export const env = {
  PUBLIC_SERVER_URL: z.parse(z.url(), import.meta.env.PUBLIC_SERVER_URL),
  PUBLIC_SERVER_PORT: z.parse(
    z.coerce.number(),
    import.meta.env.PUBLIC_SERVER_PORT,
  ),
};
