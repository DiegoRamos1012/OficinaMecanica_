// User type definition
export type User = {
  id: string;
  nome: string; // agora refletindo o backend
  email: string;
  cargo: string;
  imagemPerfil: string;
  // Remova username, name, roles, profileImage se não usados
};

// Auth context interface
export interface AuthContextType {
  user: User | null;
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
  criado_em: string;      // ou Date, se preferir
  atualizado_em: string;  // ou Date
  deleted_at?: string | null; // pode ser null ou string, se usar soft delete
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
