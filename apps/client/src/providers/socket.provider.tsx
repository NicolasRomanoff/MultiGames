import { SocketContext } from "@/contexts/socket.context";
import { type ComponentProps } from "react";
import { io } from "socket.io-client";
import { env } from "../lib/utils/env.utils";

export const SocketProvider: React.FC<ComponentProps<"div">> = ({
  children,
}) => {
  const socket = io(`${env.PUBLIC_SERVER_URL}:${env.PUBLIC_SERVER_PORT}`, {
    transports: ["websocket"],
  });

  return <SocketContext value={{ socket }}>{children}</SocketContext>;
};
