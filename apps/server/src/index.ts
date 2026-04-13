import { serve } from "@hono/node-server";
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
  socket.on("chess", (msg) => {
    console.log("chess : ", msg);
  });
  socket.emit("ok", "ok");
});
