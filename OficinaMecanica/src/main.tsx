import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { addLocale } from "primereact/api";
import App from "./App.tsx";
import ptBR from "./utils/locales.ts";
import "./styles.css";

addLocale("pt", ptBR);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
