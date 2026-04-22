import { ChessContext } from "@/contexts/chess.context";
import { useState, type ComponentProps } from "react";
import { useParams } from "react-router";
import type {
  TBoardPreviewSchema,
  TBoardSchema,
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
