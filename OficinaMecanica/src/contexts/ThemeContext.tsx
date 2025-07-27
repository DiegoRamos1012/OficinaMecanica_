// ThemeContext.tsx
// Este arquivo define o contexto de tema da aplicação.
// Permite acessar e modificar o tema atual (light, dark ou system) em qualquer componente.

import { createContext } from "react";
import type { Theme } from "./ThemeProvider";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);
