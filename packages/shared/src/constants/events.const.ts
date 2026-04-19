export const EVENTS = {
  MATCHMAKING: "matchmaking",
  JOIN: "join",
  LEAVE: "leave",
  CHESS: { READY: "chess-ready", BOARD: "chess-board" },
  CHECKERS: { READY: "checkers-ready" },
  CONNECT4: { READY: "connect4-ready" },
} as const;
