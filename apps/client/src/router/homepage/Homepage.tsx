import { games } from "core/constants";
import type { TGames } from "core/types";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "ui/components";
import { cn } from "ui/lib";

const Homepage = () => {
  const socket = io("http://localhost:3000", {
    autoConnect: false,
    transports: ["websocket"],
  });
  const [onMatchmaking, setOnMatchmaking] = useState<TGames | null>(null);

  useEffect(() => {
    if (!onMatchmaking) {
      socket.disconnect();
      return;
    }
    socket.connect();
    socket.on("connect", () => {
      socket.emit("matchmaking", { game: onMatchmaking });
    });
  }, [socket, onMatchmaking]);

  useEffect(() => {
    socket.on("joining", (newRoom) => {
      console.log("newRoom : ", newRoom);
    });
    return () => {
      socket.off("joining");
      return;
    };
  }, [socket]);

  return (
    <div className="flex w-full items-center justify-center">
      {Object.values(games).map((game) => {
        return (
          <Button
            key={game}
            className={cn(onMatchmaking === game && "bg-secondary")}
            onClick={() => {
              if (onMatchmaking === game) setOnMatchmaking(null);
              else setOnMatchmaking(game);
            }}
          >
            {game}
          </Button>
        );
      })}
    </div>
  );
};

export default Homepage;
