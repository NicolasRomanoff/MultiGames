import { EVENTS, games } from "core/constants";
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
    socket.on("connect", () => {
      socket.emit(EVENTS.MATCHMAKING, { game: onMatchmaking });
    });
    socket.on(EVENTS.JOIN, (newRoom) => {
      console.log("newRoom : ", newRoom);
    });
    return () => {
      socket.off("connect");
      socket.off(EVENTS.JOIN);
      return;
    };
  }, [socket, onMatchmaking]);

  return (
    <div className="flex w-full items-center justify-center">
      {Object.values(games).map((game) => {
        return (
          <Button
            key={game}
            className={cn(onMatchmaking === game && "bg-secondary")}
            onClick={
              onMatchmaking === game
                ? undefined
                : () => {
                    socket.disconnect();
                    socket.connect();
                    setOnMatchmaking(game);
                  }
            }
            disabled={onMatchmaking === game}
          >
            {game}
          </Button>
        );
      })}
    </div>
  );
};

export default Homepage;
