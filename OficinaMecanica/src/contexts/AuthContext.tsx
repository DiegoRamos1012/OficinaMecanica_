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
  const checkTokenValidity = useCallback(async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem("@OficinaMecanica:token");

      if (!token) {
        logout();
        return false;
      }

      // Faz uma requisição para verificar a validade do token
      await api.get("/validate-token");
      return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      logout();
      return false;
    }
  }, [logout]); // logout como dependência porque é usado dentro da função

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("@OficinaMecanica:user");
      const token = localStorage.getItem("@OficinaMecanica:token");

      if (storedUser && token) {
        try {
          // Verifica se o token ainda é válido
          const isValid = await checkTokenValidity();

          if (isValid) {
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          // Mostra o erro de forma mais detalhada
          if (error instanceof Error) {
            console.error(`Erro ao validar token: ${error.message}`);
          } else {
            console.error("Erro desconhecido ao validar token");
          }
          logout();
        }
      }

      setLoading(false);
    };

    loadUser();
  }, [checkTokenValidity, logout]); // Agora é seguro incluir estas dependências

  async function login(email: string, password: string): Promise<boolean> {
    try {
      setLoading(true);

      // Faz requisição para a API de login
      const response = await api.post<AuthResponse>("/login", {
        email,
        password,
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

      // Faz requisição para a API de registro
      const response = await api.post<AuthResponse>("/register", {
        username,
        email,
        password,
      });

      const { user, token } = response.data;

      // Salva os dados no localStorage e no estado
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
