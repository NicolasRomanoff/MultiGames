import { SocketContext } from "@/contexts/socket.context";
import { useContext } from "react";

export const useSocketContext = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return ctx;
};
