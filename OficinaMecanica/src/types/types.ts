// User type definition
export type User = {
  id: string;
  username: string;
  email: string;
  name: string;
  roles: string[];
};

// Auth context interface
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
}
