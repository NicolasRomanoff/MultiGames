import { NOTATIONS, pieceIcons } from "@/lib/constants/chess.const";
import { createElement } from "react";
import type { TPiece } from "shared/types";
import { reverseString } from "shared/utils";
import { cn } from "ui/lib";

export const ChessSquare: React.FC<{
  coords: { x: number; y: number };
  piece: TPiece | null;
  isSecondPlayer: boolean;
}> = ({ coords, piece, isSecondPlayer }) => {
  let color = "border";
  if (coords.y >= 1 && coords.y <= 8 && coords.x >= 1 && coords.x <= 8) {
    color = (coords.y + coords.x) % 2 ? "black" : "white";
  }

  let notation = null;
  if (coords.x === 9 && coords.y >= 1 && coords.y <= 8) {
    notation = isSecondPlayer
      ? reverseString(NOTATIONS.ALPHABETICS)[coords.y - 1]
      : NOTATIONS.ALPHABETICS[coords.y - 1];
  } else if (!coords.y && coords.x >= 1 && coords.x <= 8) {
    notation = isSecondPlayer
      ? NOTATIONS.NUMBERS[coords.x - 1]
      : reverseString(NOTATIONS.NUMBERS)[coords.x - 1];
  }

  return (
    <div
      className={cn("flex col-span-2 row-span-2", {
        "bg-black": color === "black",
        "bg-white": color === "white",
        "bg-gray-500": color === "border",
        "row-start-2 row-end-2": !coords.x,
        "row-start-19 row-end-19": coords.x === 9,
        "col-start-2 col-end-2": !coords.y,
        "col-start-19 col-end-19": coords.y === 9,
        "rounded-tl-full": !coords.x && !coords.y,
        "rounded-tr-full": !coords.x && coords.y === 9,
        "rounded-bl-full": coords.x === 9 && !coords.y,
        "rounded-br-full": coords.x === 9 && coords.y === 9,
        "justify-center items-center": !!notation,
      })}
    >
      {!!notation && <p className="text-2xl">{notation}</p>}
      {!!piece &&
        createElement(pieceIcons[piece], {
          color: "green",
        })}
    </div>
  );
};
