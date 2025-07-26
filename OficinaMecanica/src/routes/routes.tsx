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

// Main routes component
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

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
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/estoque"
        element={
          <ProtectedRoute>
            <Estoque />
          </ProtectedRoute>
        }
      />
      <Route
        path="/funcionarios"
        element={
          <ProtectedRoute>
            <Funcionarios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clientes"
        element={
          <ProtectedRoute>
            <Clientes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/veiculos"
        element={
          <ProtectedRoute>
            <Veiculos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
};

export default AppRoutes;
