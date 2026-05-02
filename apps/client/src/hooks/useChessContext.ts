import { ChessContext } from "@/contexts/chess.context";
import { useContext } from "react";

export const useChessContext = () => {
  const ctx = useContext(ChessContext);
  if (!ctx) {
    throw new Error("useChessContext must be used within a ChessProvider");
  }
  return ctx;
};
