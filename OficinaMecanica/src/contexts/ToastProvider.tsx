// ToastProvider.tsx
// Este arquivo implementa o ToastProvider, responsável por fornecer o contexto de Toast (notificações) para toda a aplicação.
// Permite exibir mensagens de toast de sucesso, erro, info ou alerta a partir de qualquer componente.

import { useRef } from "react";
import { Toast } from "primereact/toast";
import { ToastContext } from "./ToastContext";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastRef = useRef<Toast>(null);

  const showToast = (
    msg: string,
    severity: "success" | "error" | "info" | "warn" = "success"
  ) => {
    toastRef.current?.show({
      severity,
      summary:
        severity === "success"
          ? "Sucesso"
          : severity === "error"
          ? "Erro"
          : undefined,
      detail: msg,
      life: 3000,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
}
