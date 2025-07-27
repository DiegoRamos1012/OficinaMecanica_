// useTheme.ts
// Este hook customizado fornece acesso ao contexto de tema da aplicação.
// Permite que componentes leiam e modifiquem o tema atual (light, dark ou system) de forma simples.

import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
