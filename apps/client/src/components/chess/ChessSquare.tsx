import { useChessContext } from "@/hooks/useChessContext";
import { useSocketContext } from "@/hooks/useSocketContext";
import { NOTATIONS } from "@/lib/constants/chess.const";
import { getIconByPiece } from "@/lib/utils/chess.utils";
import { Dot } from "lucide-react";
import type { TTypeAndColorSchema } from "shared/schemas";
import { EVENTS, handleSocketEvent } from "shared/socket";
import { reverseString } from "shared/utils";
import { cn } from "ui/lib";

export const ChessSquare: React.FC<{
  coords: { x: number; y: number };
  piece: TTypeAndColorSchema | null;
}> = ({ coords, piece }) => {
  const { socket } = useSocketContext();
  const {
    roomName,
    isSecondPlayer,
    previewBoard,
    setPreviewBoard,
    positionSelected,
    setPositionSelected,
  } = useChessContext();

  let color = "border";
  if (coords.y >= 1 && coords.y <= 8 && coords.x >= 1 && coords.x <= 8) {
    color = (coords.y + coords.x) % 2 ? "black" : "white";
  }

  let notation = null;
  if (!coords.x && coords.y >= 1 && coords.y <= 8) {
    notation = isSecondPlayer
      ? NOTATIONS.ALPHABETICS[coords.y - 1]
      : reverseString(NOTATIONS.ALPHABETICS)[coords.y - 1];
  } else if (coords.y === 9 && coords.x >= 1 && coords.x <= 8) {
    notation = isSecondPlayer
      ? reverseString(NOTATIONS.NUMBERS)[coords.x - 1]
      : NOTATIONS.NUMBERS[coords.x - 1];
  }

  const preview = previewBoard.find(
    (p) => p.x === coords.x - 1 && p.y === coords.y - 1,
  );

  const handleSelectPiece = () => {
    if (!roomName) return;
    if (
      positionSelected &&
      positionSelected.x === coords.x &&
      positionSelected.y === coords.y
    ) {
      return;
    }
    setPositionSelected({ x: coords.x, y: coords.y });
    setPreviewBoard([]);
    if (!piece) return;
    const piecePosition = {
      x: isSecondPlayer ? -(coords.x - 8) : coords.x - 1,
      y: isSecondPlayer ? -(coords.y - 8) : coords.y - 1,
    };
    handleSocketEvent({
      socket,
      socketMethod: "emit",
      event: EVENTS.CHESS.SELECTION,
      args: { roomName, piecePosition },
    });
  };

  const handlePlayPiece = () => {
    if (!roomName) return;
    setPreviewBoard([]);
    if (!positionSelected) return;
    const position = {
      x: isSecondPlayer ? -(positionSelected.x - 8) : positionSelected.x - 1,
      y: isSecondPlayer ? -(positionSelected.y - 8) : positionSelected.y - 1,
    };
    const to = {
      x: isSecondPlayer ? -(coords.x - 8) : coords.x - 1,
      y: isSecondPlayer ? -(coords.y - 8) : coords.y - 1,
    };
    handleSocketEvent({
      socket,
      socketMethod: "emit",
      event: EVENTS.CHESS.MOVE,
      args: { roomName, position, to },
    });
    setPositionSelected(null);
  };

  return (
    <div
      className={cn("relative flex col-span-2 row-span-2", {
        "bg-gray-700": color === "black",
        "bg-gray-300": color === "white",
        "bg-gray-500": color === "border",
        "row-start-2 row-end-2": !coords.y,
        "row-start-19 row-end-19": coords.y === 9,
        "col-start-2 col-end-2": !coords.x,
        "col-start-19 col-end-19": coords.x === 9,
        "rounded-tl-full": !coords.x && !coords.y,
        "rounded-bl-full": !coords.x && coords.y === 9,
        "rounded-tr-full": coords.x === 9 && !coords.y,
        "rounded-br-full": coords.x === 9 && coords.y === 9,
        "justify-center items-center": !!notation,
      })}
    >
      <button className="absolute size-full" onClick={handleSelectPiece} />
      {!!notation && <p className="text-2xl">{notation}</p>}
      {!!piece && getIconByPiece(piece)}
      {!!preview && (
        <button className="absolute size-full" onClick={handlePlayPiece}>
          <Dot color="red" opacity={0.5} className="size-full" />
        </button>
      )}
    </div>
  );
};
