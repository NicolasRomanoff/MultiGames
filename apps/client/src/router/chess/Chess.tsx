import { ChessBoard } from "@/components/chess/ChessBoard";
import { PIECES } from "shared/constants";
import type { TBoard } from "shared/types";

const Chess = () => {
  const exampleBoard: TBoard = {
    "0-0": PIECES.PAWN,
    "0-1": PIECES.QUEEN,
    "0-2": PIECES.PAWN,
    "0-3": PIECES.PAWN,
    "0-4": PIECES.PAWN,
    "0-5": PIECES.PAWN,
    "0-6": PIECES.PAWN,
    "0-7": PIECES.PAWN,
    "1-0": PIECES.PAWN,
    "1-1": PIECES.PAWN,
    "1-2": PIECES.PAWN,
    "1-3": PIECES.PAWN,
    "1-4": PIECES.PAWN,
    "1-5": PIECES.PAWN,
    "1-6": PIECES.PAWN,
    "1-7": PIECES.PAWN,
    "2-0": PIECES.PAWN,
    "2-1": PIECES.PAWN,
    "2-2": PIECES.PAWN,
    "2-3": PIECES.PAWN,
    "2-4": PIECES.PAWN,
    "2-5": PIECES.PAWN,
    "2-6": PIECES.PAWN,
    "2-7": PIECES.PAWN,
    "3-0": PIECES.PAWN,
    "3-1": PIECES.PAWN,
    "3-2": PIECES.PAWN,
    "3-3": PIECES.PAWN,
    "3-4": PIECES.PAWN,
    "3-5": PIECES.PAWN,
    "3-6": PIECES.PAWN,
    "3-7": PIECES.PAWN,
    "4-0": PIECES.PAWN,
    "4-1": PIECES.PAWN,
    "4-2": PIECES.PAWN,
    "4-3": PIECES.PAWN,
    "4-4": PIECES.PAWN,
    "4-5": PIECES.PAWN,
    "4-6": PIECES.PAWN,
    "4-7": PIECES.PAWN,
    "5-0": PIECES.PAWN,
    "5-1": PIECES.PAWN,
    "5-2": PIECES.PAWN,
    "5-3": PIECES.PAWN,
    "5-4": PIECES.PAWN,
    "5-5": PIECES.PAWN,
    "5-6": PIECES.PAWN,
    "5-7": PIECES.PAWN,
    "6-0": PIECES.PAWN,
    "6-1": PIECES.PAWN,
    "6-2": PIECES.PAWN,
    "6-3": PIECES.PAWN,
    "6-4": PIECES.PAWN,
    "6-5": PIECES.PAWN,
    "6-6": PIECES.PAWN,
    "6-7": PIECES.PAWN,
    "7-0": PIECES.PAWN,
    "7-1": PIECES.PAWN,
    "7-2": PIECES.PAWN,
    "7-3": PIECES.PAWN,
    "7-4": PIECES.PAWN,
    "7-5": PIECES.PAWN,
    "7-6": PIECES.PAWN,
    "7-7": PIECES.PAWN,
  };
  return (
    <div className="flex w-full items-center justify-center">
      <ChessBoard board={exampleBoard} isSecondPlayer={false} />
      <ChessBoard board={exampleBoard} isSecondPlayer={true} />
    </div>
  );
};

export default Chess;
