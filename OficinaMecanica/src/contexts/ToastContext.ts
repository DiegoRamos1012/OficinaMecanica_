// ToastContext.ts
// Este arquivo define o contexto de Toast (notificações) da aplicação.
// Permite exibir mensagens de toast (sucesso, erro, info, alerta) em qualquer parte da aplicação.

import { createContext } from "react";

interface ToastContextProps {
  showToast: (
    msg: string,
    severity?: "success" | "error" | "info" | "warn"
  ) => void;
}

export const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
});
