import { ChessBoard } from "@/components/chess/ChessBoard";
import { useSocketContext } from "@/hooks/useSocketContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { TBoardPreviewSchema, TBoardSchema } from "shared/schemas";
import { EVENTS, handleSocketEvent } from "shared/socket";

const Chess = () => {
  const { socket } = useSocketContext();
  const [isSecondPlayer, setIsSecondPlayer] = useState(false);
  const [board, setBoard] = useState<TBoardSchema | null>(null);
  const [previewBoard, setPreviewBoard] = useState<TBoardPreviewSchema>([]);
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
      args: ({ board, isSecondPlayer }) => {
        setBoard(board);
        setIsSecondPlayer(isSecondPlayer);
      },
    });
    handleSocketEvent({
      socket,
      socketMethod: "on",
      event: EVENTS.CHESS.PREVIEW,
      args: ({ preview }) => {
        setPreviewBoard(preview);
      },
    });
    return () => {
      socket.off(EVENTS.CHESS.BOARD);
      socket.off(EVENTS.CHESS.PREVIEW);
    };
  }, [socket, roomName]);

  return (
    <div className="flex w-full items-center justify-center">
      <ChessBoard
        board={board}
        previewBoard={previewBoard}
        isSecondPlayer={isSecondPlayer}
      />
    </div>
  );
};

export default Chess;
