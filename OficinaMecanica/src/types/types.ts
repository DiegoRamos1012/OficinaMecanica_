// Tipos globais da aplicação
export type User = {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  avatar: string;
};
export interface AuthContextType {
  user: User | null;
  setUser?: (user: User | null) => void;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  checkTokenValidity: () => Promise<boolean>;
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

export interface Estoque {
  id: number;
  nome: string;
  codigo: string;
  descricao: string;
  categoria: string;
  quantidade: number;
  estoque_minimo: number;
  preco_unitario: number;
  preco_venda: number;
  fornecedor: string;
  status: string;
  observacoes: string;
  criado_em: string;
  atualizado_em: string;
  deleted_at?: string | null;
}

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataCadastro: string;
  qtdVeiculos: number;
  ultimaVisita: string;
}
