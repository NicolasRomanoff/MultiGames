import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "ui/style.css";
import { SocketProvider } from "./providers/socket.provider.tsx";
import { ChessPage } from "./router/chess/ChessPage.tsx";
import Homepage from "./router/homepage/Homepage.tsx";
import BaseLayout from "./router/layout/BaseLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/chess/:roomName" element={<ChessPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  </StrictMode>,
);
