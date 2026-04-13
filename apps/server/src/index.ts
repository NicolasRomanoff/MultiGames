import { serve } from "@hono/node-server";
import { games } from "core/constants";
import { Hono } from "hono";
import { Server } from "socket.io";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const httpServer = serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("connection");
  {
    Object.keys(games).map((game) => {
      return socket.on(game, (msg) => console.log(game, msg));
    });
  }
  // socket.on("chess", (msg) => {
  //   console.log("chess : ", msg);
  // });
  // socket.emit("ok", "ok");
});
