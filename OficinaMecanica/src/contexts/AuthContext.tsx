import { createContext, useState, type ReactNode, useEffect } from "react";
import type { User, AuthContextType } from "../types/types";

// Create the context with a default value but don't export as a named export
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: () => false,
  register: () => false,
  logout: () => {},
});

// Export the context only for the useAuth hook
export { AuthContext };

// Only export the provider component from this file
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth on initial load
    const storedUser = localStorage.getItem("@AutoRepair:user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  function login(email: string, password: string): boolean {
    // This is a mock implementation - you'd typically call an API here
    if (email === "example@999.com" && password === "admin123") {
      const user = {
        id: "1",
        username: "admin",
        name: "Administrador",
        email: "example@999.com",
        roles: ["admin"],
      };

      setUser(user);
      localStorage.setItem("@AutoRepair:user", JSON.stringify(user));
      return true;
    }

    return false;
  }

  function register(
    username: string,
    email: string,
    password: string
  ): boolean {
    try {
      // Em uma aplicação real, você enviaria esses dados para uma API
      // Para esta implementação de mock, vamos simular o registro bem-sucedido
      // e também fazer o login do usuário após o registro

      const userId = Date.now().toString(); // Simulando geração de ID único

      const newUser: User = {
        id: userId,
        username,
        name: username, // Usando username como name por simplicidade
        email,
        roles: ["user"], // Usuário padrão começa com role 'user'
      };

      // Salvar o usuário no localStorage
      // Em uma aplicação real, este usuário viria da resposta da API
      setUser(newUser);
      localStorage.setItem("@AutoRepair:user", JSON.stringify(newUser));

      // Em uma aplicação real, você também salvaria o password em um sistema de autenticação
      // Aqui apenas simulamos o armazenamento para fins de teste
      localStorage.setItem(
        `@AutoRepair:userCredentials:${email}`,
        JSON.stringify({ username, password })
      );

      return true;
    } catch (error) {
      console.error("Erro durante o registro:", error);
      return false;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("@AutoRepair:user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
