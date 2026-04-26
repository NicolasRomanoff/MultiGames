import { useChessContext } from "@/hooks/useChessContext";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { type ComponentProps } from "react";
import type { TColorsSchema } from "shared/schemas";

export const Pendulum: React.FC<
  ComponentProps<"div"> & { color: TColorsSchema }
> = ({ color }) => {
  const { timers } = useChessContext();

  return (
    <div className="flex bg-white">
      <Clock />
      {!!timers && format(timers[color], "mm:ss.S")}
    </div>
  );
};
