import { ChessContext } from "@/contexts/chess.context";
import { useState, type ComponentProps } from "react";
import { useParams } from "react-router";
import type {
  TBoardPreviewSchema,
  TBoardSchema,
  TChessRoomNameSchema,
  TPositionSchema,
} from "shared/schemas";

export const ChessProvider: React.FC<ComponentProps<"div">> = ({
  children,
}) => {
  const { roomName } = useParams();
  const [isSecondPlayer, setIsSecondPlayer] = useState(false);
  const [board, setBoard] = useState<TBoardSchema | null>(null);
  const [previewBoard, setPreviewBoard] = useState<TBoardPreviewSchema>([]);
  const [positionSelected, setPositionSelected] =
    useState<TPositionSchema | null>(null);

  const isChessRoomName = (
    roomName: unknown,
  ): roomName is TChessRoomNameSchema => {
    return typeof roomName === "string" && roomName.startsWith("chess-");
  };

  if (!isChessRoomName(roomName)) return;

  return (
    <ChessContext
      value={{
        roomName,
        isSecondPlayer,
        setIsSecondPlayer,
        board,
        setBoard,
        previewBoard,
        setPreviewBoard,
        positionSelected,
        setPositionSelected,
      }}
    >
      {children}
    </ChessContext>
  );
};
