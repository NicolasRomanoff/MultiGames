import { ChessBoard } from "@/components/chess/ChessBoard";
import { useChessContext } from "@/hooks/useChessContext";
import { useSocketContext } from "@/hooks/useSocketContext";
import { useEffect } from "react";
import { EVENTS, handleSocketEvent } from "shared/socket";

const Chess = () => {
  const { socket } = useSocketContext();
  const {
    roomName,
    isSecondPlayer,
    setIsSecondPlayer,
    setBoard,
    setPreviewBoard,
    setPromote,
  } = useChessContext();

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
      args: ({ board, isSecondPlayer: newIsSecondPlayer }) => {
        const newBoard = newIsSecondPlayer
          ? board.reverse().map((b) => b.reverse())
          : board;
        setBoard(newBoard);
        setIsSecondPlayer(newIsSecondPlayer);
      },
    });
    handleSocketEvent({
      socket,
      socketMethod: "on",
      event: EVENTS.CHESS.PREVIEW,
      args: ({ preview }) => {
        const newPreview = isSecondPlayer
          ? preview.map((p) => ({ x: -(p.x - 7), y: -(p.y - 7) }))
          : preview;
        setPreviewBoard(newPreview);
      },
    });
    handleSocketEvent({
      socket,
      socketMethod: "on",
      event: EVENTS.CHESS.WANTPROMOTE,
      args: setPromote,
    });
    return () => {
      socket.off(EVENTS.CHESS.BOARD);
      socket.off(EVENTS.CHESS.PREVIEW);
      socket.off(EVENTS.CHESS.WANTPROMOTE);
    };
  }, [
    socket,
    roomName,
    isSecondPlayer,
    setIsSecondPlayer,
    setBoard,
    setPreviewBoard,
    setPromote,
  ]);

  return (
    <div className="flex w-full items-center justify-center">
      <ChessBoard />
    </div>
  );
};

export default Chess;
