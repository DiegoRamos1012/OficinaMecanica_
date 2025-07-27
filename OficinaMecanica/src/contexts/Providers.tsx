// Providers.tsx
// Este arquivo centraliza e empacota todos os Providers de contexto da aplicação.
// Permite que qualquer componente filho tenha acesso aos contextos de tema, toast e autenticação.

import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
