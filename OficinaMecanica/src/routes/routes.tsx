import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Login from "../Pages/Autenticação/Login";
import Register from "../Pages/Autenticação/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Estoque from "../Pages/Estoque/Estoque";
import Funcionarios from "../Pages/Funcionários/Funcionarios";
import Clientes from "../Pages/Clientes/Clientes";
import Veiculos from "../Pages/Veículos/Veiculos";
import Settings from "../Pages/Configurações/Settings";

// Protected route component that checks authentication
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Public route that redirects to dashboard if already authenticated
export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

// Rotas principais - Adicione rotas novas aqui
const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/estoque", element: <Estoque /> },
  { path: "/funcionarios", element: <Funcionarios /> },
  { path: "/clientes", element: <Clientes /> },
  { path: "/veiculos", element: <Veiculos /> },
  { path: "/settings", element: <Settings /> },
];

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute>{element}</ProtectedRoute>}
        />
      ))}
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
