import { ChessBoard } from "@/components/chess/ChessBoard";
import { Pendulum } from "@/components/chess/Pendulum";
import { useChessContext } from "@/hooks/useChessContext";
import { useSocketContext } from "@/hooks/useSocketContext";
import { subMilliseconds } from "date-fns";
import { useEffect } from "react";
import { COLORS } from "shared/constants";
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
    setTimers,
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
    handleSocketEvent({
      socket,
      socketMethod: "on",
      event: EVENTS.CHESS.TIMERS,
      args: setTimers,
    });
    return () => {
      socket.off(EVENTS.CHESS.BOARD);
      socket.off(EVENTS.CHESS.PREVIEW);
      socket.off(EVENTS.CHESS.WANTPROMOTE);
      socket.off(EVENTS.CHESS.TIMERS);
    };
  }, [
    socket,
    roomName,
    isSecondPlayer,
    setIsSecondPlayer,
    setBoard,
    setPreviewBoard,
    setPromote,
    setTimers,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          [prev.colorToPlay]: subMilliseconds(prev[prev.colorToPlay], 10),
        };
      });
    }, 10);
    return () => clearInterval(interval);
  }, [setTimers]);

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Pendulum color={isSecondPlayer ? COLORS.WHITE : COLORS.BLACK} />
      <ChessBoard />
      <Pendulum color={isSecondPlayer ? COLORS.BLACK : COLORS.WHITE} />
    </div>
  );
};

export default Chess;
