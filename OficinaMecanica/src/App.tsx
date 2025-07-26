import { BrowserRouter } from "react-router-dom";
import { Providers } from "./contexts/Providers";
import { Suspense, lazy } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./styles.css";
import { ProgressSpinner } from "primereact/progressspinner";

const AppRoutes = lazy(() => import("./routes/routes"));

console.log(
  "Bem vindo ao meu projeto de Oficina Mecânica! (Status: Em desenvolvimento)"
);
console.log(
  "Repositório Frontend: https://github.com/DiegoRamos1012/OficinaMecanica"
);
console.log(
  "Repositório Backend: https://github.com/DiegoRamos1012/oficina_backend"
);

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <ProgressSpinner style={{ width: 60, height: 60 }} />
              <span style={{ marginTop: 24, fontSize: 18 }}>Carregando...</span>
            </div>
          }
        >
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
