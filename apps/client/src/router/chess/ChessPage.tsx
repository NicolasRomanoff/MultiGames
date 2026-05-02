import { ChessProvider } from "@/providers/chess.provider";
import Chess from "./Chess";

export const ChessPage = () => {
  return (
    <ChessProvider>
      <Chess />
    </ChessProvider>
  );
};
