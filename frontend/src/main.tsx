import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReduxProvider from "./Store/ReduxProvider/ReduxProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </StrictMode>
);
