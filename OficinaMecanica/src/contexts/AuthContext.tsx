// AuthContext.tsx
// Este arquivo define o contexto de autenticação da aplicação.
// Fornece o AuthProvider, responsável por gerenciar o estado de autenticação do usuário,
// incluindo login, logout, registro, validação de token e persistência dos dados do usuário.
// O contexto é utilizado por toda a aplicação para acessar e modificar informações de autenticação.

//aa

import {
  createContext,
  useState,
  useCallback,
  type ReactNode,
  useEffect,
} from "react";
import type { User, AuthContextType } from "../types/types";
import api from "../services/api";

// Create the context with a default value but don't export as a named export
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  checkTokenValidity: async () => false,
});

// Export the context only for the useAuth hook
export { AuthContext };

// Interface para resposta da API de autenticação
interface AuthResponse {
  token: string;
  user: User;
}

// Only export the provider component from this file
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Usando useCallback para memoizar a função logout
  const logout = useCallback(() => {
    // Remove os dados do localStorage e limpa o estado
    localStorage.removeItem("@OficinaMecanica:token");
    localStorage.removeItem("@OficinaMecanica:user");
    setUser(null);
  }, []);

  // Transformando checkTokenValidity em callback
  // Use apenas no useEffect inicial do AuthProvider. Não chame em outros componentes.
  const checkTokenValidity = useCallback(async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem("@OficinaMecanica:token");
      if (!token) {
        logout();
        return false;
      }
      await api.get("/validate-token");
      return true;
    } catch {
      logout();
      return false;
    }
  }, [logout]); // logout como dependência porque é usado dentro da função

  useEffect(() => {
    let isMounted = true;
    const loadUser = async () => {
      const storedUser = localStorage.getItem("@OficinaMecanica:user");
      const token = localStorage.getItem("@OficinaMecanica:token");

      if (storedUser && token) {
        try {
          // Verifica se o token ainda é válido
          const isValid = await checkTokenValidity();

          if (isMounted && isValid) {
            setUser(JSON.parse(storedUser));
          }
        } catch {
          if (isMounted) logout();
        }
      }

      if (isMounted) setLoading(false);
    };

    loadUser();
    return () => {
      isMounted = false;
    };
  }, [checkTokenValidity, logout]);

  async function login(email: string, senha: string): Promise<boolean> {
    try {
      setLoading(true);

      // Faz requisição para a API de login
      const response = await api.post<AuthResponse>("/login", {
        email,
        senha,
      });
      const { user, token } = response.data;

      // Salva os dados no localStorage e no estado
      localStorage.setItem("@OficinaMecanica:token", token);
      localStorage.setItem("@OficinaMecanica:user", JSON.stringify(user));
      setUser(user);

      return true;
    } catch (_error) {
      console.error("Erro durante login:", _error);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function register(
    username: string,
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      setLoading(true);

      // Corrija aqui:
      const response = await api.post<AuthResponse>("/register", {
        nome: username,
        email: email,
        senha: password,
      });

      const { user, token } = response.data;

      localStorage.setItem("@OficinaMecanica:token", token);
      localStorage.setItem("@OficinaMecanica:user", JSON.stringify(user));
      setUser(user);

      return true;
    } catch (_error) {
      console.error("Erro durante o registro:", _error);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        checkTokenValidity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
