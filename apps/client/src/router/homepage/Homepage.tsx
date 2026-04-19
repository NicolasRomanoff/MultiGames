import { useSocketContext } from "@/hooks/useSocketContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { games } from "shared/constants";
import { EVENTS, handleSocketEvent } from "shared/socket";
import type { TGames } from "shared/types";
import { Button } from "ui/components";
import { cn } from "ui/lib";

const Homepage = () => {
  const { socket } = useSocketContext();
  const [onMatchmaking, setOnMatchmaking] = useState<TGames | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on(EVENTS.JOIN, (roomName) => {
      navigate(`/chess/${roomName}`);
    });
    return () => {
      socket.off(EVENTS.JOIN);
    };
  }, [navigate, socket, onMatchmaking]);

  const handleJoinMatchmaking = (game: TGames) => {
    socket.connect();
    handleSocketEvent({
      socket,
      socketMethod: "emit",
      event: EVENTS.MATCHMAKING,
      args: { game },
    });
    setOnMatchmaking(game);
  };

  const handleCancelMatchmaking = () => {
    socket.emit(EVENTS.LEAVE);
    socket.disconnect();
    setOnMatchmaking(null);
  };

  return (
    <div className="flex w-full items-center justify-center">
      {Object.values(games).map((game) => {
        return (
          <Button
            key={game}
            className={cn(onMatchmaking === game && "bg-secondary")}
            onClick={() => handleJoinMatchmaking(game)}
            disabled={onMatchmaking === game}
          >
            {game}
          </Button>
        );
      })}
      <Button onClick={handleCancelMatchmaking}>Cancel</Button>
    </div>
  );
};

export default Homepage;
