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
