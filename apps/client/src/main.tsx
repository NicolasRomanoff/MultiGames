import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "ui/style.css";
import Chess from "./router/chess/Chess.tsx";
import Homepage from "./router/homepage/Homepage.tsx";
import BaseLayout from "./router/layout/BaseLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/chess/:roomName" element={<Chess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
