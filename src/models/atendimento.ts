export interface Atendimento {
  _id: string;
  createdAt: string;
  updatedAt: string;
  contato: Contato;
  endereco: Endereco;
  tecnico: Tecnico;
  descricao: string;
  data: string;
  cliente: Cliente;
}

interface Cliente {
  cnpj_cpf: string;
  nome: string;
  _id: string;
}

interface Tecnico {
  nome: string;
  _id: string;
}

interface Endereco {
  rua: string;
  bairro: string;
  estado: string;
  cidade: string;
  cep: string;
  _id: string;
  ponto_referencia: string;
  complemento: string;
}

interface Contato {
  telefone: string;
  nome: string;
  _id: string;
  observacao: string;
  email: string;
}
