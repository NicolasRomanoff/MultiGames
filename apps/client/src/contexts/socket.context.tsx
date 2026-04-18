import { createContext } from "react";
import { type Socket } from "socket.io-client";

type TSocketContext = { socket: Socket };

export const SocketContext = createContext<TSocketContext | null>(null);
