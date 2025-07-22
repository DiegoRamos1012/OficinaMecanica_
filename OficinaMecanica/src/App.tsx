import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/routes";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./styles.css";
import { useEffect } from "react";

// Verifica o tema escolhido pelo usuário no LocalStorage e o aplica ao entrar no sistema
function App() {
  useEffect(() => {
    const theme = localStorage.getItem("app-theme") || "light";
    document.body.classList.remove("theme-light", "theme-dark");
    if (theme === "dark") {
      document.body.classList.add("theme-dark");
    } else if (theme === "light") {
      document.body.classList.add("theme-light");
    } else if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.body.classList.add(prefersDark ? "theme-dark" : "theme-light");
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
