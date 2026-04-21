import { useSocketContext } from "@/hooks/useSocketContext";
import { NOTATIONS, pieceIcons } from "@/lib/constants/chess.const";
import { Dot } from "lucide-react";
import { useParams } from "react-router";
import type { TPiecesSchema } from "shared/schemas";
import { EVENTS, handleSocketEvent } from "shared/socket";
import { reverseString } from "shared/utils";
import { cn } from "ui/lib";

export const ChessSquare: React.FC<{
  coords: { x: number; y: number };
  piece: TPiecesSchema | null;
  preview?: boolean;
  isSecondPlayer: boolean;
}> = ({ coords, piece, preview = false, isSecondPlayer }) => {
  const { socket } = useSocketContext();
  const { roomName } = useParams();
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

  const handleChessSquare = () => {
    if (!roomName || !piece) return;
    handleSocketEvent({
      socket,
      socketMethod: "emit",
      event: EVENTS.CHESS.SELECTION,
      args: { roomName, piecePosition: { x: coords.x - 1, y: coords.y - 1 } },
    });
  };

  return (
    <button
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
      onClick={handleChessSquare}
    >
      {!!notation && <p className="text-2xl">{notation}</p>}
      {!!piece && pieceIcons[piece]}
      {preview && (
        <div className="absolute size-full">
          <Dot color="red" opacity={0.5} className="size-full" />
        </div>
      )}
    </button>
  );
};
