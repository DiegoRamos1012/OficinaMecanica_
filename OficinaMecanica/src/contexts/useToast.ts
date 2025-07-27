// useToast.ts
// Este hook customizado fornece acesso ao contexto de Toast (notificações).
// Permite que componentes exibam mensagens de toast em qualquer parte da aplicação.

import { useContext } from "react";
import { ToastContext } from "./ToastContext";

export function useToast() {
  return useContext(ToastContext);
}
