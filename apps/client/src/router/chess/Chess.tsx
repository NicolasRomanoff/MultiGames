import { ChessBoard } from "@/components/chess/ChessBoard";
import { useSocketContext } from "@/hooks/useSocketContext";
import { useEffect, useState } from "react";
import { PIECES } from "shared/constants";
import { EVENTS } from "shared/socket";
import type { TBoard } from "shared/types";
import z from "zod";

const boardSchema = z.array(z.array(z.union([z.enum(PIECES), z.null()])));

const Chess = () => {
  const { socket } = useSocketContext();
  const [board, setBoard] = useState<TBoard | null>(null);

  useEffect(() => {
    socket.emit(EVENTS.CHESS.READY, () => {});
    socket.on(EVENTS.CHESS.BOARD, (board) => {
      const { data, success } = boardSchema.safeParse(board);
      if (!success) return;
      setBoard(data);
    });
    return () => {
      socket.off(EVENTS.CHESS.BOARD);
    };
  }, [socket]);

  return (
    <div className="flex w-full items-center justify-center">
      <ChessBoard board={board} isSecondPlayer={false} />
      <ChessBoard board={board} isSecondPlayer={true} />
    </div>
  );
};

export default Chess;
