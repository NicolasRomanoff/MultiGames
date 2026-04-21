import { ChessBoard } from "@/components/chess/ChessBoard";
import { useSocketContext } from "@/hooks/useSocketContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { TBoardSchema } from "shared/schemas";
import { EVENTS, handleSocketEvent } from "shared/socket";

const Chess = () => {
  const { socket } = useSocketContext();
  const [board, setBoard] = useState<TBoardSchema | null>(null);
  const { roomName } = useParams();

  useEffect(() => {
    if (!roomName) return;
    handleSocketEvent({
      socket,
      socketMethod: "emit",
      event: EVENTS.CHESS.READY,
      args: { roomName },
    });
    handleSocketEvent({
      socket,
      socketMethod: "on",
      event: EVENTS.CHESS.BOARD,
      args: ({ board }) => {
        setBoard(board);
      },
    });
    return () => {
      socket.off(EVENTS.CHESS.BOARD);
    };
  }, [socket, roomName]);

  return (
    <div className="flex w-full items-center justify-center">
      <ChessBoard board={board} isSecondPlayer={false} />
      <ChessBoard board={board} isSecondPlayer={true} />
    </div>
  );
};

export default Chess;
