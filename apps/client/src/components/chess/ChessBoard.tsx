import type { TBoardPreviewSchema, TBoardSchema } from "shared/schemas";
import { cn } from "ui/lib";
import { ChessSquare } from "./ChessSquare";

export const ChessBoard: React.FC<{
  board: TBoardSchema | null;
  previewBoard: TBoardPreviewSchema;
  isSecondPlayer: boolean;
}> = ({ board, previewBoard, isSecondPlayer }) => {
  return (
    <div className={cn("grid grid-cols-20 grid-rows-20 size-150")}>
      {Array.from({ length: 100 }).map((_, i) => {
        const x = Math.floor(i % 10);
        const y = Math.floor(i / 10);
        const isBorder = !x || x > 8 || !y || y > 8;
        const piece = board && !isBorder ? board[y - 1][x - 1] : null;
        return (
          <ChessSquare
            key={i}
            coords={{ x, y }}
            piece={piece}
            preview={!!previewBoard.find((p) => p.x === x - 1 && p.y === y - 1)}
            isSecondPlayer={isSecondPlayer}
          />
        );
      })}
    </div>
  );
};
