import { useChessContext } from "@/hooks/useChessContext";
import { useSocketContext } from "@/hooks/useSocketContext";
import { getIconByPiece } from "@/lib/utils/chess.utils";
import { PROMOTEPIECES } from "shared/constants";
import type { TPromotePiecesSchema } from "shared/schemas";
import { EVENTS, handleSocketEvent } from "shared/socket";
import { Popover, PopoverContent, PopoverTrigger } from "ui/components";

export const PromotePopover = () => {
  const { socket } = useSocketContext();
  const { roomName, promote, setPromote } = useChessContext();

  const handlePromote = (select: TPromotePiecesSchema) => {
    if (!roomName || !promote) return;
    handleSocketEvent({
      socket,
      socketMethod: "emit",
      event: EVENTS.CHESS.PROMOTE,
      args: { roomName, ...promote, select },
    });
    setPromote(null);
  };

  return (
    <Popover open>
      <PopoverTrigger />
      <PopoverContent className="grid grid-cols-4">
        {Object.values(PROMOTEPIECES).map((type) => (
          <button key={type} onClick={() => handlePromote(type)}>
            {getIconByPiece({ type, color: "black" })}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
