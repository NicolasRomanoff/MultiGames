import type { TBoard } from "shared/types";
import { cn } from "ui/lib";
import { ChessSquare } from "./ChessSquare";

export const ChessBoard: React.FC<{
  board: TBoard;
  isSecondPlayer: boolean;
}> = ({ board, isSecondPlayer }) => {
  return (
    <div className={cn("grid grid-cols-20 grid-rows-20 size-150")}>
      {Array.from({ length: 100 }).map((_, i) => {
        const x = Math.floor(i / 10);
        const y = Math.floor(i % 10);
        const piece = board[`${x - 1}-${y - 1}` as keyof TBoard];
        return (
          <ChessSquare
            key={i}
            coords={{ x, y }}
            piece={piece}
            isSecondPlayer={isSecondPlayer}
          />
        );
      })}
    </div>
  );
};
