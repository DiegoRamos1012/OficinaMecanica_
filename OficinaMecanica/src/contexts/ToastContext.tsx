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
