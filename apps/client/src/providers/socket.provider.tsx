import { SocketContext } from "@/contexts/socket.context";
import { type ComponentProps } from "react";
import { io } from "socket.io-client";

export const SocketProvider: React.FC<ComponentProps<"div">> = ({
  children,
}) => {
  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });

  return <SocketContext value={{ socket }}>{children}</SocketContext>;
};
