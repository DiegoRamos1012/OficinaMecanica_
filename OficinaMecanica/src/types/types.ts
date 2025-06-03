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

export interface Produto {
  id: number;
  codigo: string;
  nome: string;
  categoria: string;
  quantidade: number;
  precoUnitario: number;
  fornecedor: string;
}

export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  proprietario: string;
  status: string;
  ultimaManutencao: string;
}

export interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  status: string;
  telefone: string;
}

// Interface para definir o tipo de cliente
export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataCadastro: string;
  qtdVeiculos: number;
  ultimaVisita: string;
}
