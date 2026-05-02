import { useSocketContext } from "@/hooks/useSocketContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GAMES } from "shared/constants";
import type { TGamesSchema } from "shared/schemas";
import { EVENTS, handleSocketEvent } from "shared/socket";
import { Button } from "ui/components";
import { cn } from "ui/lib";

const Homepage = () => {
  const { socket } = useSocketContext();
  const [onMatchmaking, setOnMatchmaking] = useState<TGamesSchema | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleSocketEvent({
      socket,
      socketMethod: "on",
      event: EVENTS.JOIN,
      args: ({ roomName }) => {
        navigate(`/chess/${roomName}`);
      },
    });
    return () => {
      socket.off(EVENTS.JOIN);
    };
  }, [navigate, socket, onMatchmaking]);

  const handleJoinMatchmaking = (game: TGamesSchema) => {
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
    handleSocketEvent({
      socket,
      socketMethod: "emit",
      event: EVENTS.LEAVE,
      args: null,
    });
    socket.disconnect();
    setOnMatchmaking(null);
  };

  return (
    <div className="flex w-full items-center justify-center">
      {Object.values(GAMES).map((game) => {
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
